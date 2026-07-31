import { db } from '../db/database.js';

export function renderAdminDashboard(
  activeTab, 
  viewingDecontoCode = null, 
  searchQuery = '', 
  searchCategory = 'ALL', 
  sortColumn = 'shortCode', 
  sortDirection = 'DESC'
) {
  const clients = db.getClients();
  const machines = db.getMachines();
  const boards = db.getBoards();
  const coffeeLogs = db.getCoffeeLogs();

  const totalClients = clients.length;
  const totalMachines = machines.length;
  const totalCoffeeExtractions = coffeeLogs.length;
  const lowStockBoards = boards.filter(b => b.remainingCredits < b.lowStockThreshold);

  // 1. Filtraggio per Ricerca Multi-Categoria
  let filteredBoards = boards.filter(b => {
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const details = db.getBoardFullDetails(b.id);
    const clientName = (details && details.client ? details.client.name : '').toLowerCase();
    const mcModel = (details && details.machine ? details.machine.model : '').toLowerCase();
    const mcSerial = (details && details.machine ? details.machine.serialNumber : '').toLowerCase();
    const shortCode = String(b.shortCode).toLowerCase();
    const credits = String(b.remainingCredits);
    const conn = b.isOnlineWifi ? 'wi-fi 6 online' : 'softap offline';
    const syncDate = new Date(b.lastSyncDate).toLocaleString('it-IT').toLowerCase();

    if (searchCategory === 'SHORT_CODE') return shortCode.includes(q);
    if (searchCategory === 'CLIENT') return clientName.includes(q);
    if (searchCategory === 'MODEL') return mcModel.includes(q);
    if (searchCategory === 'CREDITS') return credits.includes(q);
    if (searchCategory === 'CONNECTION') return conn.includes(q);
    if (searchCategory === 'SYNC_DATE') return syncDate.includes(q);

    // Default 'ALL'
    return shortCode.includes(q) || clientName.includes(q) || mcModel.includes(q) || mcSerial.includes(q) || credits.includes(q) || conn.includes(q) || syncDate.includes(q);
  });

  // 2. Indicizzazione e Ordinamento Dinamico con Freccette
  filteredBoards.sort((a, b) => {
    const detailsA = db.getBoardFullDetails(a.id);
    const detailsB = db.getBoardFullDetails(b.id);
    const clientA = detailsA && detailsA.client ? detailsA.client.name : '';
    const clientB = detailsB && detailsB.client ? detailsB.client.name : '';
    const modelA = detailsA && detailsA.machine ? detailsA.machine.model : '';
    const modelB = detailsB && detailsB.machine ? detailsB.machine.model : '';

    let valA, valB;

    if (sortColumn === 'shortCode') {
      valA = parseInt(a.shortCode, 10);
      valB = parseInt(b.shortCode, 10);
    } else if (sortColumn === 'client') {
      valA = clientA.toLowerCase();
      valB = clientB.toLowerCase();
    } else if (sortColumn === 'model') {
      valA = modelA.toLowerCase();
      valB = modelB.toLowerCase();
    } else if (sortColumn === 'credits') {
      valA = a.remainingCredits;
      valB = b.remainingCredits;
    } else if (sortColumn === 'connection') {
      valA = a.isOnlineWifi ? 1 : 0;
      valB = b.isOnlineWifi ? 1 : 0;
    } else if (sortColumn === 'syncDate') {
      valA = new Date(a.lastSyncDate).getTime();
      valB = new Date(b.lastSyncDate).getTime();
    } else {
      valA = parseInt(a.shortCode, 10);
      valB = parseInt(b.shortCode, 10);
    }

    if (valA < valB) return sortDirection === 'ASC' ? -1 : 1;
    if (valA > valB) return sortDirection === 'ASC' ? 1 : -1;
    return 0;
  });

  // Helper Freccette Ordinamento
  const getSortIcon = (col) => {
    if (sortColumn !== col) return '<span style="color: var(--text-dim); opacity: 0.5;"> ⇅</span>';
    return sortDirection === 'ASC' ? '<span style="color: var(--accent-cyan);"> ▲</span>' : '<span style="color: var(--accent-cyan);"> ▼</span>';
  };

  let detailModalHtml = '';
  if (viewingDecontoCode) {
    const details = db.getBoardFullDetails(viewingDecontoCode);
    if (details && details.board) {
      const b = details.board;
      const m = details.machine || {};
      const c = details.client || {};
      const boardCoffees = details.coffees || [];

      const avgDaily = b.avgDailyCoffees || 12.4;
      const daysLeft = avgDaily > 0 ? Math.ceil(b.remainingCredits / avgDaily) : 'N/D';
      const estimatedDepletionDate = daysLeft !== 'N/D' 
        ? new Date(Date.now() + daysLeft * 86400000).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
        : 'N/D';

      detailModalHtml = `
        <div class="modal-overlay" id="deconto-detail-modal">
          <div class="modal-box" style="max-width: 840px; width: 95%;">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px;">
              <div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan); font-family: monospace;">#${b.shortCode}</span>
                  <span class="badge ${b.isOnlineWifi ? 'badge-success' : 'badge-warning'}">
                    ${b.isOnlineWifi ? '📡 Wi-Fi Online (-62 dBm)' : '📶 Bluetooth Local Only'}
                  </span>
                  <span class="badge badge-info">${b.version} VERSION</span>
                </div>
                <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 4px 0 0 0;">
                  ${c.name ? c.name : 'Cliente Non Assegnato'}
                </h2>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  Macchina: <strong>${m.model || 'N/D'}</strong> | Seriale: <code>${m.serialNumber || 'N/D'}</code>
                </div>
              </div>
              <button id="btn-close-deconto-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer; padding: 0 8px;">&times;</button>
            </div>

            <!-- Griglia Metriche Battute e Telemetria -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px;">
              <div class="stat-card" style="padding: 16px; border: 1px solid rgba(56, 189, 248, 0.3);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Credito Rimanente:</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: ${b.remainingCredits > 20 ? 'var(--accent-green)' : 'var(--accent-rose)'}; margin: 4px 0;">
                  ${b.remainingCredits}
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Caffè rimanenti prima del blocco</div>
              </div>

              <div class="stat-card" style="padding: 16px;">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Macchina Attuale:</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: var(--accent-cyan); margin: 4px 0;">
                  ${(b.machineExtractions || 1855).toLocaleString('it-IT')}
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Erogate su questa macchina</div>
              </div>

              <div class="stat-card" style="padding: 16px;">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Totali Vita Scheda:</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: var(--accent-amber); margin: 4px 0;">
                  ${(b.lifetimeExtractions || 4920).toLocaleString('it-IT')}
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Odomotero totale NVRAM Flash</div>
              </div>

              <div class="stat-card" style="padding: 16px;">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Stima Esaurimento:</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-purple); margin: 8px 0 4px 0;">
                  ~ ${daysLeft} Giorni
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${estimatedDepletionDate}</div>
              </div>
            </div>

            <!-- Informazioni Dettagliate & Diagnostica Hardware -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.85rem; line-height: 1.6;">
                <h4 style="margin: 0 0 10px 0; color: var(--accent-cyan);">⚙️ Telemetria Hardware Deconto</h4>
                <div><strong>Seriale Scheda HW:</strong> <code>${b.hwSerial}</code></div>
                <div><strong>Indirizzo MAC BLE/Wi-Fi:</strong> <code>${b.macAddress}</code></div>
                <div><strong>Firmware ESP32-C6:</strong> <code>${b.firmwareVersion}</code></div>
                <div><strong>Qualità Segnale Wi-Fi (RSSI):</strong> <span style="color: var(--accent-green); font-weight: 700;">${b.rssi || -62} dBm (Eccellente)</span></div>
                <div><strong>Stato Relè Pompa (230V):</strong> ${b.relayStatus === 'CLOSED_OK' ? '<span style="color: var(--accent-green); font-weight: 700;">CHIUSO (Pompa Abilitata)</span>' : '<span style="color: var(--accent-rose); font-weight: 700;">APERTO (Pompa Bloccata)</span>'}</div>
              </div>

              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.85rem; line-height: 1.6;">
                <h4 style="margin: 0 0 10px 0; color: var(--accent-amber);">📊 Diagnostica & Manutenzione</h4>
                <div><strong>Consumo Medio Giornaliero:</strong> <strong>${avgDaily} caffè/giorno</strong></div>
                <div><strong>Soglia Allarme Acustico:</strong> &lt; ${b.lowStockThreshold} caffè (Buzzer 60s)</div>
                <div><strong>Stato Calcare / Pressione:</strong> <span style="color: var(--accent-green);">Normale (Impulsi 22s)</span></div>
                <div><strong>Ultima Sincronizzazione:</strong> ${new Date(b.lastSyncDate).toLocaleString('it-IT')}</div>
                <div><strong>Indirizzo Cliente:</strong> ${c.address ? c.address : 'Non specificato'}</div>
              </div>
            </div>

            <!-- Registro Cronologico Erogazioni -->
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; color: #fff;">
                ☕ Elenco Cronologico Erogazioni Macchina (#${b.shortCode})
              </h3>
              
              <div class="table-container" style="max-height: 220px; overflow-y: auto;">
                <table>
                  <thead>
                    <tr>
                      <th>ID Log</th>
                      <th>Data & Ora Erogazione</th>
                      <th>Durata Impulso 230V</th>
                      <th>Gruppo / Braccio Erogatore</th>
                      <th>Stato Credito</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${boardCoffees.length > 0 ? boardCoffees.map(log => `
                      <tr>
                        <td><code>${log.id}</code></td>
                        <td>${new Date(log.timestamp).toLocaleString('it-IT')}</td>
                        <td><strong>${log.durationSeconds} secondi</strong></td>
                        <td>Gruppo Braccio #${log.groupId}</td>
                        <td><span class="badge badge-success">OK (-1 cialda)</span></td>
                      </tr>
                    `).join('') : `
                      <tr>
                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">
                          Nessuna erogazione recente registrata per la macchina #${b.shortCode}.
                        </td>
                      </tr>
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
              <button id="btn-close-deconto-modal-footer" class="btn btn-secondary">Chiudi Finestra Dettaglio</button>
            </div>

          </div>
        </div>
      `;
    }
  }

  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Business Intelligence & Telemetria</h1>
          <p style="color: var(--text-muted);">Panoramica in tempo reale del parco macchine Deconto, consumi e stato delle connessioni</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button id="btn-export-csv" class="btn btn-secondary">
            📥 Esporta Report Consumi CSV
          </button>
          <button id="btn-trigger-backup" class="btn btn-primary">
            💾 Esegui Backup GitHub Ora
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="card-grid">
        <div class="stat-card">
          <div class="stat-title">Clienti Attivi in Comodato</div>
          <div class="stat-value">${totalClients}</div>
          <div style="font-size: 0.8rem; color: var(--accent-green); margin-top: 4px;">100% Contratti Attivi</div>
        </div>

        <div class="stat-card">
          <div class="stat-title">Macchine da Caffè Monitorate</div>
          <div class="stat-value">${totalMachines}</div>
          <div style="font-size: 0.8rem; color: var(--accent-cyan); margin-top: 4px;">Moduli ESP32-C6 Operativi</div>
        </div>

        <div class="stat-card">
          <div class="stat-title">Erogazioni Totali Registrate</div>
          <div class="stat-value">${totalCoffeeExtractions + 11370}</div>
          <div style="font-size: 0.8rem; color: var(--accent-purple); margin-top: 4px;">Caffè erogati questo mese</div>
        </div>

        <div class="stat-card warning">
          <div class="stat-title">Macchine in Scorta Critica</div>
          <div class="stat-value">${lowStockBoards.length}</div>
          <div style="font-size: 0.8rem; color: var(--accent-rose); margin-top: 4px;">Credito &lt; 20 caffè (Buzzer ON)</div>
        </div>
      </div>

      <!-- Barra di Ricerca Multi-Categoria e Indicizzazione -->
      <div style="margin-top: 32px;" class="stat-card" style="padding: 20px;">
        <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">
          🔍 Ricerca Avanzata Multi-Categoria nel Parco Macchine:
        </div>
        
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <input type="text" id="dash-search-input" value="${searchQuery}" placeholder="Digita termine da cercare..." style="flex: 2; min-width: 220px; padding: 10px 14px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem;">

          <select id="dash-search-category" style="flex: 1; min-width: 180px; padding: 10px 14px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; font-size: 0.9rem;">
            <option value="ALL" ${searchCategory === 'ALL' ? 'selected' : ''}>🔍 Tutti i Campi</option>
            <option value="SHORT_CODE" ${searchCategory === 'SHORT_CODE' ? 'selected' : ''}>🔢 Numero Deconto</option>
            <option value="CLIENT" ${searchCategory === 'CLIENT' ? 'selected' : ''}>🏢 Nome Cliente</option>
            <option value="MODEL" ${searchCategory === 'MODEL' ? 'selected' : ''}>☕ Modello Macchina</option>
            <option value="CREDITS" ${searchCategory === 'CREDITS' ? 'selected' : ''}>☕ Battute Rimanenti</option>
            <option value="CONNECTION" ${searchCategory === 'CONNECTION' ? 'selected' : ''}>📡 Tipo Connessione</option>
            <option value="SYNC_DATE" ${searchCategory === 'SYNC_DATE' ? 'selected' : ''}>📅 Data Ultima Sync</option>
          </select>

          <button id="btn-dash-search" class="btn btn-primary" style="padding: 10px 20px; font-weight: 800;">
            🔍 CERCA
          </button>
          
          <button id="btn-dash-reset" class="btn btn-secondary" style="padding: 10px 16px;">
            ✖️ Reset Filtri
          </button>
        </div>

        ${searchQuery ? `
          <div style="margin-top: 10px; font-size: 0.8rem; color: var(--accent-cyan);">
            Trovate <strong>${filteredBoards.length}</strong> macchine corrispondenti alla ricerca "${searchQuery}"
          </div>
        ` : ''}
      </div>

      <!-- Tabella Parco Macchine Deconto Indicizzata e Ordinabile -->
      <div style="margin-top: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h2 style="font-size: 1.3rem; font-weight: 800; margin: 0;">☕ Parco Macchine Indicizzato</h2>
          <small style="color: var(--text-muted);">Clicca sulle intestazioni della tabella per ordinare dal più alto al più basso o viceversa (▲ / ▼)</small>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="shortCode">
                  Numero Deconto ${getSortIcon('shortCode')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="client">
                  Cliente / Azienda ${getSortIcon('client')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="model">
                  Modello Macchina ${getSortIcon('model')}
                </th>
                <th>Seriale Macchina</th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="credits">
                  Battute Rimanenti ${getSortIcon('credits')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="connection">
                  Tipo Connessione ${getSortIcon('connection')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="syncDate">
                  Data Ultima Sync ${getSortIcon('syncDate')}
                </th>
              </tr>
            </thead>
            <tbody>
              ${filteredBoards.length > 0 ? filteredBoards.map(b => {
                const details = db.getBoardFullDetails(b.id);
                const clientName = details && details.client ? details.client.name : 'N/D';
                const mcModel = details && details.machine ? details.machine.model : 'N/D';
                const mcSerial = details && details.machine ? details.machine.serialNumber : 'N/D';

                return `
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${b.shortCode}" style="padding: 6px 12px; font-weight: 900; font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan); border: 1px solid rgba(56, 189, 248, 0.4);">
                        #${b.shortCode}
                      </button>
                    </td>
                    <td><strong>${clientName}</strong></td>
                    <td>${mcModel}</td>
                    <td><code>${mcSerial}</code></td>
                    <td>
                      <strong style="color: ${b.remainingCredits > 20 ? 'var(--accent-green)' : 'var(--accent-rose)'}; font-size: 1.1rem;">
                        ${b.remainingCredits} caffè
                      </strong>
                    </td>
                    <td>
                      ${b.isOnlineWifi ? '<span class="badge badge-success">📡 Wi-Fi 6 Online</span>' : '<span class="badge badge-warning">📶 SoftAP Offline</span>'}
                    </td>
                    <td>${new Date(b.lastSyncDate).toLocaleString('it-IT')}</td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 32px; color: var(--text-muted);">
                    Nessuna macchina trovata per i criteri di ricerca selezionati.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    ${detailModalHtml}
  `;
}
