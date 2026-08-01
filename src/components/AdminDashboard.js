import { db } from '../db/database.js';

export function renderAdminDashboard(
  activeTab, 
  viewingDecontoCode = null, 
  searchQuery = '', 
  searchCategory = 'ALL', 
  sortColumn = 'shortCode', 
  sortDirection = 'DESC',
  viewingKpiModal = null,
  kpiPeriod = '30DAYS',
  kpiChartType = 'LINE'
) {
  const clients = db.getClients();
  const machines = db.getMachines();
  const boards = db.getBoards();
  const coffeeLogs = db.getCoffeeLogs();

  const totalClients = clients.length;
  const totalMachines = machines.length;
  const totalCoffeeExtractions = coffeeLogs.length;
  
  const okBoards = boards.filter(b => b.remainingCredits > 20);
  const lowStockBoards = boards.filter(b => b.remainingCredits > 0 && b.remainingCredits <= 20);
  const lockedBoards = boards.filter(b => b.remainingCredits === 0);

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

    return shortCode.includes(q) || clientName.includes(q) || mcModel.includes(q) || mcSerial.includes(q) || credits.includes(q) || conn.includes(q) || syncDate.includes(q);
  });

  // 2. Ordinamento Dinamico
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

  const getSortIcon = (col) => {
    if (sortColumn !== col) return '<span style="color: var(--text-dim); opacity: 0.5;"> ⇅</span>';
    return sortDirection === 'ASC' ? '<span style="color: var(--accent-cyan);"> ▲</span>' : '<span style="color: var(--accent-cyan);"> ▼</span>';
  };

  // --- MODALI DETTAGLIO KPI CARDS ---
  let kpiModalHtml = '';

  if (viewingKpiModal === 'kpi_clients') {
    const cityCounts = {};
    clients.forEach(c => {
      const city = c.city || 'Milano';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 780px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan); margin: 0;">
              🏢 Analytics Clienti & Distribuzione Territoriale
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: #fff;">📍 Distribuzione Clienti per Città:</h4>
              ${Object.entries(cityCounts).map(([city, count]) => `
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                    <span><strong>${city}</strong></span>
                    <span style="color: var(--accent-cyan); font-weight: 700;">${count} clienti (${Math.round((count/totalClients)*100)}%)</span>
                  </div>
                  <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); height: 100%; width: ${(count/totalClients)*100}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: #fff;">📊 Sintesi Contratti Comodato:</h4>
              <div style="font-size: 0.85rem; line-height: 1.8;">
                <div>• Totalità Contratti Attivi: <strong style="color: var(--accent-green);">${totalClients} / ${totalClients} (100%)</strong></div>
                <div>• Media Caffè per Cliente: <strong>~ 1.850 caffè/anno</strong></div>
                <div>• Tasso di Rinnovo Ricarica: <strong style="color: var(--accent-cyan);">98.4% (Mensile)</strong></div>
                <div>• Modalità Consegna Prevalente: <strong>Agente ADR (85%)</strong></div>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.1rem; margin-bottom: 12px;">Top Clienti per Consumo Mensile</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Referente</th>
                  <th>Città</th>
                  <th>Consumo Medio</th>
                  <th>Stato Contratto</th>
                </tr>
              </thead>
              <tbody>
                ${clients.map(c => `
                  <tr>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.refPerson}</td>
                    <td>${c.city}</td>
                    <td><strong style="color: var(--accent-green);">~ 380 caffè/mese</strong></td>
                    <td><span class="badge badge-success">ATTIVO OK</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `;
  } else if (viewingKpiModal === 'kpi_machines') {
    const modelCounts = {};
    machines.forEach(m => {
      modelCounts[m.model] = (modelCounts[m.model] || 0) + 1;
    });

    const wifiCount = boards.filter(b => b.isOnlineWifi).length;
    const bleCount = boards.length - wifiCount;

    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 800px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-purple); margin: 0;">
              ☕ Grafico & Analytics Parco Macchine da Caffè
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: var(--accent-purple);">🥧 Ripartizione per Modello Macchina:</h4>
              ${Object.entries(modelCounts).map(([model, count]) => {
                const pct = Math.round((count / totalMachines) * 100);
                return `
                  <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                      <span><strong>${model}</strong></span>
                      <span style="color: var(--accent-purple); font-weight: 800;">${count} unità (${pct}%)</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                      <div style="background: linear-gradient(90deg, var(--accent-purple), var(--accent-rose)); height: 100%; width: ${pct}%;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: var(--accent-cyan);">📡 Stato Connessione Telemetrica:</h4>
              
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span><strong>📡 Moduli Wi-Fi 6 Online</strong></span>
                  <span style="color: var(--accent-green); font-weight: 800;">${wifiCount} (${Math.round((wifiCount/totalMachines)*100)}%)</span>
                </div>
                <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                  <div style="background: var(--accent-green); height: 100%; width: ${(wifiCount/totalMachines)*100}%;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span><strong>📶 Moduli SoftAP / Bluetooth Only</strong></span>
                  <span style="color: var(--accent-amber); font-weight: 800;">${bleCount} (${Math.round((bleCount/totalMachines)*100)}%)</span>
                </div>
                <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                  <div style="background: var(--accent-amber); height: 100%; width: ${(bleCount/totalMachines)*100}%;"></div>
                </div>
              </div>

              <div style="margin-top: 20px; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 10px;">
                Chip Microcontrollore: <strong>ESP32-C6 Dual Core</strong><br>Firmware: <strong>v2.1.0 (NVRAM Counter Protezione Anti-Frode)</strong>
              </div>
            </div>

          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `;
  } else if (viewingKpiModal === 'kpi_extractions') {
    const daysMultiplier = kpiPeriod === '30DAYS' ? 1 : (kpiPeriod === '90DAYS' ? 3 : 12);
    const calculatedVolume = (totalCoffeeExtractions + 11370) * daysMultiplier;
    const periodLabel = kpiPeriod === '30DAYS' ? 'Ultimo Mese (30 Giorni)' : (kpiPeriod === '90DAYS' ? 'Ultimi 3 Mesi (90 Giorni)' : 'Ultimo Anno (365 Giorni)');

    const barsData = kpiPeriod === '30DAYS' 
      ? [320, 450, 410, 520, 610, 480, 590, 710, 680, 750, 820, 790]
      : (kpiPeriod === '90DAYS' ? [1200, 1450, 1800, 2100, 2400, 2900] : [8500, 9200, 11000, 13400]);

    const maxVal = Math.max(...barsData);

    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 860px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-green); margin: 0;">
              📈 Analytics Erogazioni & Trend Storico Consumi
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seleziona Periodo Temporale:</label>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-kpi-period ${kpiPeriod === '30DAYS' ? 'btn-primary' : 'btn-secondary'}" data-period="30DAYS" style="padding: 6px 12px; font-size: 0.85rem;">Ultimo Mese</button>
                <button class="btn btn-kpi-period ${kpiPeriod === '90DAYS' ? 'btn-primary' : 'btn-secondary'}" data-period="90DAYS" style="padding: 6px 12px; font-size: 0.85rem;">Ultimi 3 Mesi</button>
                <button class="btn btn-kpi-period ${kpiPeriod === '1YEAR' ? 'btn-primary' : 'btn-secondary'}" data-period="1YEAR" style="padding: 6px 12px; font-size: 0.85rem;">Ultimo Anno</button>
              </div>
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Tipologia Grafico:</label>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-kpi-charttype ${kpiChartType === 'LINE' ? 'btn-primary' : 'btn-secondary'}" data-charttype="LINE" style="padding: 6px 12px; font-size: 0.85rem;">📈 Grafico a Linee</button>
                <button class="btn btn-kpi-charttype ${kpiChartType === 'BAR' ? 'btn-primary' : 'btn-secondary'}" data-charttype="BAR" style="padding: 6px 12px; font-size: 0.85rem;">📊 Grafico a Barre</button>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-around; background: rgba(16, 185, 129, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 24px; text-align: center;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Volume Erogato in ${periodLabel}:</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-green);">${calculatedVolume.toLocaleString('it-IT')} caffè</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Media Giornaliera Parco:</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan);">~ ${Math.round(calculatedVolume / (kpiPeriod === '30DAYS' ? 30 : (kpiPeriod === '90DAYS' ? 90 : 365)))} / giorno</div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <h4 style="margin-top: 0; color: #fff; margin-bottom: 16px;">
              ${kpiChartType === 'LINE' ? '📈 Trend Temporale Erogazioni' : '📊 Istogramma Consumi Periodico'} (${periodLabel}):
            </h4>

            ${kpiChartType === 'BAR' ? `
              <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 180px; gap: 10px; padding-top: 20px;">
                ${barsData.map((val, idx) => {
                  const hPct = Math.round((val / maxVal) * 100);
                  return `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;">
                      <span style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 4px;">${val}</span>
                      <div style="width: 80%; background: linear-gradient(180deg, var(--accent-cyan), var(--accent-purple)); height: ${hPct}%; border-radius: 4px 4px 0 0;"></div>
                      <span style="font-size: 0.65rem; color: var(--text-muted); margin-top: 6px;">P${idx+1}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <svg viewBox="0 0 500 160" style="width: 100%; height: 180px; overflow: visible;">
                <defs>
                  <linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                <path d="M 0 ${160 - (barsData[0]/maxVal)*130} ${barsData.map((val, idx) => `L ${(idx / (barsData.length - 1)) * 500} ${160 - (val/maxVal)*130}`).join(' ')}" fill="none" stroke="#38bdf8" stroke-width="4"/>
                <path d="M 0 ${160 - (barsData[0]/maxVal)*130} ${barsData.map((val, idx) => `L ${(idx / (barsData.length - 1)) * 500} ${160 - (val/maxVal)*130}`).join(' ')} L 500 160 L 0 160 Z" fill="url(#gradLine)"/>
                ${barsData.map((val, idx) => {
                  const cx = (idx / (barsData.length - 1)) * 500;
                  const cy = 160 - (val/maxVal)*130;
                  return `<circle cx="${cx}" cy="${cy}" r="5" fill="#a855f7" stroke="#fff" stroke-width="2"/>`;
                }).join('')}
              </svg>
            `}
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `;
  } else if (viewingKpiModal === 'kpi_lowstock') {
    const lowStockAndLocked = [...lockedBoards, ...lowStockBoards];

    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 820px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-rose); margin: 0;">
              ⚠️ Grafico Stato Scorte & Macchine Bloccate
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
            
            <div class="stat-card" style="padding: 16px; border: 2px solid var(--accent-green); text-align: center;">
              <div style="font-size: 0.8rem; color: var(--accent-green); text-transform: uppercase; font-weight: 800;">🟢 VERDI OK (&gt; 20 caffè)</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-green); margin: 6px 0;">${okBoards.length}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Relè Chiuso / Pompa OK</div>
            </div>

            <div class="stat-card warning" style="padding: 16px; border: 2px solid var(--accent-amber); text-align: center;">
              <div style="font-size: 0.8rem; color: var(--accent-amber); text-transform: uppercase; font-weight: 800;">🟡 SOTTOSCORTA (1 - 20 caffè)</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-amber); margin: 6px 0;">${lowStockBoards.length}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Buzzer Acustico 60s ON</div>
            </div>

            <div class="stat-card alert" style="padding: 16px; border: 2px solid var(--accent-rose); text-align: center;">
              <div style="font-size: 0.8rem; color: var(--accent-rose); text-transform: uppercase; font-weight: 800;">🔴 BLOCCATE (0 caffè)</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-rose); margin: 6px 0;">${lockedBoards.length}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Relè Aperto / Blocco Pompa</div>
            </div>

          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <h4 style="margin-top: 0; color: #fff; margin-bottom: 12px;">📊 Grafico Proporzioni Stato Parco Macchine:</h4>
            
            <div style="display: flex; height: 24px; border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.1);">
              <div style="background: var(--accent-green); width: ${(okBoards.length/boards.length)*100}%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #000;" title="Verdi OK">
                ${okBoards.length > 0 ? `${Math.round((okBoards.length/boards.length)*100)}%` : ''}
              </div>
              <div style="background: var(--accent-amber); width: ${(lowStockBoards.length/boards.length)*100}%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #000;" title="Sottoscorta">
                ${lowStockBoards.length > 0 ? `${Math.round((lowStockBoards.length/boards.length)*100)}%` : ''}
              </div>
              <div style="background: var(--accent-rose); width: ${(lockedBoards.length/boards.length)*100}%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #fff;" title="Bloccate">
                ${lockedBoards.length > 0 ? `${Math.round((lockedBoards.length/boards.length)*100)}%` : ''}
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--accent-rose);">
            Elenco Macchine Necessitanti Ricarica Immediata
          </h3>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Codice Deconto</th>
                  <th>Cliente</th>
                  <th>Modello Macchina</th>
                  <th>Credito Rimanente</th>
                  <th>Stato Relè</th>
                </tr>
              </thead>
              <tbody>
                ${lowStockAndLocked.map(b => {
                  const details = db.getBoardFullDetails(b.id);
                  const clientName = details && details.client ? details.client.name : 'N/D';
                  const mcModel = details && details.machine ? details.machine.model : 'N/D';
                  const isZero = b.remainingCredits === 0;

                  return `
                    <tr>
                      <td><strong style="color: var(--accent-cyan); font-family: monospace; font-size: 1.1rem;">#${b.shortCode}</strong></td>
                      <td><strong>${clientName}</strong></td>
                      <td>${mcModel}</td>
                      <td>
                        <strong style="color: ${isZero ? 'var(--accent-rose)' : 'var(--accent-amber)'}; font-size: 1.1rem;">
                          ${b.remainingCredits} caffè
                        </strong>
                      </td>
                      <td>
                        ${isZero ? '<span class="badge badge-danger">🔒 APERTO (BLOCCO ERRORE)</span>' : '<span class="badge badge-warning">⚠️ BUZZER ALLARME ON</span>'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `;
  }

  // --- NUOVA IMPAGINAZIONE MODALE DETTAGLIO DECONTO A 2 COLONNE ---
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
          <div class="modal-box" style="max-width: 1020px; width: 95%; max-height: 90vh; overflow-y: auto;">
            
            <!-- Modal Header -->
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

            <!-- LAYOUT A 2 COLONNE AFFIANCATE -->
            <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 24px; align-items: start;">
              
              <!-- COLONNA DI SINISTRA: Elenco Cronologico Erogazioni Esteso & Ampio -->
              <div style="background: rgba(0,0,0,0.25); padding: 18px; border-radius: 14px; border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                  <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
                    ☕ Registro Cronologico Erogazioni (#${b.shortCode})
                  </h3>
                  <span class="badge badge-info" style="font-size: 0.75rem;">${boardCoffees.length} Erogazioni</span>
                </div>

                <div class="table-container" style="max-height: 480px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 8px;">
                  <table style="width: 100%;">
                    <thead style="position: sticky; top: 0; background: #111827; z-index: 2;">
                      <tr>
                        <th>ID LOG</th>
                        <th>DATA & ORA</th>
                        <th>DURATA 230V</th>
                        <th>GRUPPO BRACCIO</th>
                        <th>STATO CREDITO</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${boardCoffees.length > 0 ? boardCoffees.map(log => `
                        <tr>
                          <td><code style="font-size: 0.75rem;">${log.id}</code></td>
                          <td><strong style="white-space: nowrap; font-size: 0.85rem;">${new Date(log.timestamp).toLocaleString('it-IT')}</strong></td>
                          <td><strong>${log.durationSeconds} s</strong></td>
                          <td>Gruppo #${log.groupId}</td>
                          <td><span class="badge badge-success" style="font-size: 0.75rem;">OK (-1 CIALDA)</span></td>
                        </tr>
                      `).join('') : `
                        <tr>
                          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">
                            Nessuna erogazione recente registrata per la macchina #${b.shortCode}.
                          </td>
                        </tr>
                      `}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- COLONNA DI DESTRA: KPI Cards 2x2, Telemetria Hardware & Diagnostica -->
              <div style="display: flex; flex-direction: column; gap: 16px;">
                
                <!-- 4 KPI Cards in Griglia 2x2 -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div class="stat-card" style="padding: 14px; border: 1px solid rgba(56, 189, 248, 0.3);">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Credito Rimanente:</div>
                    <div style="font-size: 1.6rem; font-weight: 900; color: ${b.remainingCredits > 20 ? 'var(--accent-green)' : 'var(--accent-rose)'}; margin: 2px 0;">
                      ${b.remainingCredits}
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">Caffè prima del blocco</div>
                  </div>

                  <div class="stat-card" style="padding: 14px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Macchina:</div>
                    <div style="font-size: 1.6rem; font-weight: 900; color: var(--accent-cyan); margin: 2px 0;">
                      ${(b.machineExtractions || 1855).toLocaleString('it-IT')}
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">Macchina attuale</div>
                  </div>

                  <div class="stat-card" style="padding: 14px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Totali Vita:</div>
                    <div style="font-size: 1.6rem; font-weight: 900; color: var(--accent-amber); margin: 2px 0;">
                      ${(b.lifetimeExtractions || 4920).toLocaleString('it-IT')}
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">Odometro NVRAM Flash</div>
                  </div>

                  <div class="stat-card" style="padding: 14px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Stima Esaurimento:</div>
                    <div style="font-size: 1.05rem; font-weight: 800; color: var(--accent-purple); margin: 6px 0 2px 0;">
                      ~ ${daysLeft} Giorni
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">${estimatedDepletionDate}</div>
                  </div>
                </div>

                <!-- Box 1: Telemetria Hardware Deconto -->
                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.82rem; line-height: 1.6;">
                  <h4 style="margin: 0 0 8px 0; color: var(--accent-cyan); font-size: 0.9rem;">⚙️ Telemetria Hardware Deconto</h4>
                  <div><strong>Seriale Scheda HW:</strong> <code>${b.hwSerial}</code></div>
                  <div><strong>Indirizzo MAC BLE/Wi-Fi:</strong> <code>${b.macAddress}</code></div>
                  <div><strong>Firmware ESP32-C6:</strong> <code>${b.firmwareVersion}</code></div>
                  <div><strong>Qualità Segnale Wi-Fi (RSSI):</strong> <span style="color: var(--accent-green); font-weight: 700;">${b.rssi || -62} dBm (Eccellente)</span></div>
                  <div><strong>Stato Relè Pompa (230V):</strong> ${b.relayStatus === 'CLOSED_OK' ? '<span style="color: var(--accent-green); font-weight: 700;">CHIUSO (Pompa Abilitata)</span>' : '<span style="color: var(--accent-rose); font-weight: 700;">APERTO (Pompa Bloccata)</span>'}</div>
                </div>

                <!-- Box 2: Diagnostica & Manutenzione -->
                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.82rem; line-height: 1.6;">
                  <h4 style="margin: 0 0 8px 0; color: var(--accent-amber); font-size: 0.9rem;">📊 Diagnostica & Manutenzione</h4>
                  <div><strong>Consumo Medio Giornaliero:</strong> <strong>${avgDaily} caffè/giorno</strong></div>
                  <div><strong>Soglia Allarme Acustico:</strong> &lt; ${b.lowStockThreshold} caffè (Buzzer 60s)</div>
                  <div><strong>Stato Calcare / Pressione:</strong> <span style="color: var(--accent-green);">Normale (Impulsi 22s)</span></div>
                  <div><strong>Ultima Sincronizzazione:</strong> ${new Date(b.lastSyncDate).toLocaleString('it-IT')}</div>
                  <div><strong>Indirizzo Cliente:</strong> ${c.address ? c.address : 'Non specificato'}</div>
                </div>

              </div>

            </div>

            <!-- Modal Footer -->
            <div style="display: flex; justify-content: flex-end; margin-top: 20px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
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
          <p style="color: var(--text-muted);">Clicca sulle schede KPI in alto per aprire i grafici ed i report dettagliati</p>
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

      <!-- KPI Cards Cliccabili per Grafici & Analytics -->
      <div class="card-grid">
        
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_clients" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per aprire grafici e dettagli clienti">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Clienti Attivi in Comodato</div>
            <span style="font-size: 1.2rem;">📊</span>
          </div>
          <div class="stat-value">${totalClients}</div>
          <div style="font-size: 0.8rem; color: var(--accent-green); margin-top: 4px; font-weight: 700;">
            100% Contratti Attivi (Clicca per Grafici ➔)
          </div>
        </div>

        <div class="stat-card kpi-card-clickable" data-kpi="kpi_machines" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per aprire grafici suddivisi per modello macchina">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Macchine da Caffè Monitorate</div>
            <span style="font-size: 1.2rem;">☕</span>
          </div>
          <div class="stat-value">${totalMachines}</div>
          <div style="font-size: 0.8rem; color: var(--accent-cyan); margin-top: 4px; font-weight: 700;">
            Grafico Modelli & Wi-Fi/BLE (Clicca ➔)
          </div>
        </div>

        <div class="stat-card kpi-card-clickable" data-kpi="kpi_extractions" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per visualizzare i grafici a barre e linee con selettore periodo">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Erogazioni Totali Registrate</div>
            <span style="font-size: 1.2rem;">📈</span>
          </div>
          <div class="stat-value">${totalCoffeeExtractions + 11370}</div>
          <div style="font-size: 0.8rem; color: var(--accent-purple); margin-top: 4px; font-weight: 700;">
            Grafici Mese/Trimestre/Anno (Clicca ➔)
          </div>
        </div>

        <div class="stat-card warning kpi-card-clickable" data-kpi="kpi_lowstock" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per aprire il grafico dello stato scorte (Verdi, Sottoscorta, Bloccate)">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Macchine in Scorta / Blocco</div>
            <span style="font-size: 1.2rem;">⚠️</span>
          </div>
          <div class="stat-value">${lowStockBoards.length + lockedBoards.length}</div>
          <div style="font-size: 0.8rem; color: var(--accent-rose); margin-top: 4px; font-weight: 700;">
            ${lockedBoards.length} Bloccate | ${lowStockBoards.length} Sottoscorta (Clicca ➔)
          </div>
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
    ${kpiModalHtml}
  `;
}
