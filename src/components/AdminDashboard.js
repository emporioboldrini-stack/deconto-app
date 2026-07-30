import { db } from '../db/database.js';
import { githubBackupService } from '../services/githubBackup.js';

export function renderAdminDashboard(activeTab) {
  const clients = db.getClients();
  const machines = db.getMachines();
  const boards = db.getBoards();
  const refills = db.getRefillLogs();
  const coffees = db.getCoffeeLogs();
  const backups = db.getBackupLogs();

  const totalCreditsInField = boards.reduce((acc, b) => acc + b.remainingCredits, 0);
  const totalRefillsCount = refills.length;
  const totalCoffeesExtracted = coffees.length + 14820; // + Offset storico demo
  const lowStockCount = boards.filter(b => b.remainingCredits < b.lowStockThreshold && b.remainingCredits > 0).length;
  const lockedCount = boards.filter(b => b.remainingCredits <= 0).length;

  if (activeTab === 'backups') {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">🐙 Pipeline Backup Automatico GitHub</h1>
            <p style="color: var(--text-muted);">Snapshot del Database versionati quotidianamente su repository privato</p>
          </div>
          <button id="btn-trigger-backup" class="btn btn-primary">
            ⚡ Esegui Backup Adesso
          </button>
        </div>

        <div class="card-grid" style="margin-bottom: 24px;">
          <div class="stat-card success">
            <div class="stat-label">Repository GitHub Target</div>
            <div class="stat-value" style="font-size: 1.2rem; color: var(--accent-cyan);">deconto-org/deconto-db-backups</div>
            <div class="stat-desc">Accesso crittografato SSH / SSH Key</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Frequenza Backup</div>
            <div class="stat-value">Quotidiana</div>
            <div class="stat-desc">Ogni notte alle 03:00 UTC</div>
          </div>
          <div class="stat-card success">
            <div class="stat-label">Ultimo Backup</div>
            <div class="stat-value" style="font-size: 1.1rem; color: var(--accent-green);">
              ${backups.length > 0 ? new Date(backups[0].timestamp).toLocaleString('it-IT') : 'N/D'}
            </div>
            <div class="stat-desc">Commit: <code>${backups.length > 0 ? backups[0].commitHash : 'N/D'}</code></div>
          </div>
        </div>

        <div class="table-container">
          <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle);">
            📜 Storico Commit & Backup GitHub
          </div>
          <table>
            <thead>
              <tr>
                <th>ID Backup</th>
                <th>Data & Ora</th>
                <th>Repository</th>
                <th>Commit Hash</th>
                <th>Record Salvati</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              ${backups.map(b => `
                <tr>
                  <td><code>${b.id}</code></td>
                  <td>${new Date(b.timestamp).toLocaleString('it-IT')}</td>
                  <td><code>${b.repo}</code></td>
                  <td><code>${b.commitHash}</code></td>
                  <td>${b.recordCount} entità DB</td>
                  <td><span class="badge badge-success">✓ SUCCESS</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (activeTab === 'maintenance') {
    // Macchine con durata erogazione anomala (> 30s) -> Calcare / Pompa usata
    const anomalousCoffees = coffees.filter(c => c.durationSeconds > 30);

    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🛠️ Telemetria & Manutenzione Predittiva</h1>
          <p style="color: var(--text-muted);">Rilevamento automatico di anomalie nella durata delle erogazioni (indizio di calcare o pompe ostruite)</p>
        </div>

        <div class="card-grid" style="margin-bottom: 24px;">
          <div class="stat-card warning">
            <div class="stat-label">Allarmi Calcare / Ostruzioni</div>
            <div class="stat-value" style="color: var(--accent-amber);">${anomalousCoffees.length}</div>
            <div class="stat-desc">Macchine che richiedono decalcificazione</div>
          </div>
          <div class="stat-card success">
            <div class="stat-label">Tempo Medio Erogazione</div>
            <div class="stat-value">22.4 sec</div>
            <div class="stat-desc">Parametro ottimale: 20-25 secondi</div>
          </div>
        </div>

        <div class="table-container">
          <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle);">
            ⚠️ Segnalazioni di Manutenzione Predittiva
          </div>
          <table>
            <thead>
              <tr>
                <th>Cliente / Ubicazione</th>
                <th>Codice Deconto</th>
                <th>Seriale Macchina</th>
                <th>Durata Rilevata</th>
                <th>Anomalia Presunta</th>
                <th>Azione Consigliata</th>
              </tr>
            </thead>
            <tbody>
              ${anomalousCoffees.map(log => {
                const details = db.getBoardFullDetails(log.boardId);
                return `
                  <tr>
                    <td><strong>${details.client ? details.client.name : 'N/D'}</strong><br><small style="color: var(--text-muted);">${details.client ? details.client.city : ''}</small></td>
                    <td><span class="badge badge-info">${details.board.shortCode}</span></td>
                    <td><code>${details.machine ? details.machine.serialNumber : 'N/D'}</code></td>
                    <td><strong style="color: var(--accent-rose);">${log.durationSeconds} secondi</strong></td>
                    <td><span class="badge badge-warning">Calcare / Ostruzione Filtro</span></td>
                    <td><button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">📅 Programma Visita Tecnico</button></td>
                  </tr>
                `;
              }).join('')}
              ${anomalousCoffees.length === 0 ? '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">Nessuna anomalia manutentiva rilevata al momento.</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Vista Dashboard BI Standard
  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Dashboard Esecutiva BI</h1>
        <p style="color: var(--text-muted);">Panoramica in tempo reale del parco macchine e dei consumi erogati</p>
      </div>

      <!-- Stat Cards -->
      <div class="card-grid">
        <div class="stat-card">
          <div class="stat-label">Clienti Attivi</div>
          <div class="stat-value">${clients.length}</div>
          <div class="stat-desc">Macchine in comodato d'uso</div>
        </div>
        <div class="stat-card success">
          <div class="stat-label">Caffè Erogati Totali</div>
          <div class="stat-value" style="color: var(--accent-green);">${totalCoffeesExtracted.toLocaleString()}</div>
          <div class="stat-desc">Conteggiati da schede Deconto</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">Macchine Sottoscorta (&lt;20)</div>
          <div class="stat-value" style="color: var(--accent-amber);">${lowStockCount}</div>
          <div class="stat-desc">Avviso acustico 60s attivo</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-label">Macchine in Blocco (0)</div>
          <div class="stat-value" style="color: var(--accent-rose);">${lockedCount}</div>
          <div class="stat-desc">Relè aperto - Erogazione disattivata</div>
        </div>
      </div>

      <!-- Tabella Stato Parco Macchine -->
      <div class="table-container">
        <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <span>☕ Stato Dispositivi Deconto sul Campo</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Chip HW: ESP32-C6</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Codice</th>
              <th>Cliente & Indirizzo</th>
              <th>Seriale Macchina</th>
              <th>Crediti Residui</th>
              <th>Stato Relè</th>
              <th>Connessione</th>
              <th>Ultimo Sync</th>
            </tr>
          </thead>
          <tbody>
            ${boards.map(b => {
              const details = db.getBoardFullDetails(b.id);
              const isLocked = b.remainingCredits <= 0;
              const isLow = b.remainingCredits < b.lowStockThreshold && !isLocked;

              return `
                <tr>
                  <td><span class="badge badge-info">3467: ${b.shortCode}</span></td>
                  <td>
                    <strong>${details.client ? details.client.name : 'Non Assegnato'}</strong><br>
                    <small style="color: var(--text-muted);">${details.client ? details.client.address : ''}</small>
                  </td>
                  <td><code>${details.machine ? details.machine.serialNumber : 'N/D'}</code></td>
                  <td>
                    <strong style="font-size: 1.1rem; color: ${isLocked ? 'var(--accent-rose)' : (isLow ? 'var(--accent-amber)' : 'var(--accent-green)')}">
                      ${b.remainingCredits} caffè
                    </strong>
                  </td>
                  <td>
                    ${isLocked 
                      ? '<span class="badge badge-danger">🔒 APERTO (BLOCCO)</span>' 
                      : '<span class="badge badge-success">🔓 CHIUSO (OK)</span>'}
                  </td>
                  <td>
                    ${b.isOnlineWifi 
                      ? '<span class="badge badge-success">🌐 Wi-Fi 6 Online</span>' 
                      : '<span class="badge badge-info">📡 Offline (BLE Only)</span>'}
                  </td>
                  <td><small style="color: var(--text-muted);">${new Date(b.lastSyncDate).toLocaleDateString('it-IT')}</small></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
