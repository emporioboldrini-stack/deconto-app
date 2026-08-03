import { db } from '../db/database.js';

export function renderRefillsHistoryPanel(filters = {}) {
  const refillLogs = db.getRefillLogs();
  const clients = db.getClients();
  const boards = db.getBoards();
  const machines = db.getMachines();
  const users = db.getUsers();

  const filterBoard = (filters.boardCode || '').trim().toLowerCase();
  const filterClient = (filters.clientName || '').trim().toLowerCase();
  const filterDate = (filters.date || '').trim();

  // Filtra dinamicamente i log di ricarica
  const filteredLogs = refillLogs.filter(log => {
    // 1. Filtro Deconto
    if (filterBoard && !log.shortCode.toLowerCase().includes(filterBoard)) {
      return false;
    }

    // Trova cliente per determinare associazione
    const board = boards.find(b => b.id === log.boardId || b.shortCode === log.shortCode);
    const mc = board && board.machineId ? machines.find(m => m.id === board.machineId) : null;
    const client = mc && mc.clientId ? clients.find(c => c.id === mc.clientId) : null;
    const clientName = client ? client.name.toLowerCase() : 'magazzino';

    // 2. Filtro Cliente
    if (filterClient && !clientName.includes(filterClient)) {
      return false;
    }

    // 3. Filtro Data (YYYY-MM-DD)
    if (filterDate) {
      const logDate = log.timestamp.split('T')[0]; // Ottieni YYYY-MM-DD
      if (logDate !== filterDate) {
        return false;
      }
    }

    return true;
  });

  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0 0 8px 0;">📜 Storico Ricariche Deconto</h1>
        <p style="color: var(--text-muted); margin: 0;">Tracciamento e registro di tutte le ricariche caffè (accrediti e decrementi di assistenza) effettuate sul parco macchine.</p>
      </div>

      <!-- Barra dei Filtri di Ricerca -->
      <div class="stat-card" style="padding: 20px; border: 1px solid var(--border-subtle); margin-bottom: 24px; background: rgba(0,0,0,0.2);">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 16px; align-items: flex-end;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">📟 Filtra per N. Deconto:</label>
            <input type="text" id="filter-refill-board" value="${filters.boardCode || ''}" placeholder="Es. 3467" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">🏢 Filtra per Cliente:</label>
            <input type="text" id="filter-refill-client" value="${filters.clientName || ''}" placeholder="Es. Brambilla" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">📅 Filtra per Data:</label>
            <input type="date" id="filter-refill-date" value="${filters.date || ''}" style="width: 100%; padding: 8px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div>
            <button id="btn-reset-refill-filters" class="btn btn-secondary" style="padding: 10px 20px; font-weight: 700; height: 38px;">
              🧹 Reset Filtri
            </button>
          </div>
        </div>
      </div>

      <!-- Tabella Storico -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Data & Ora</th>
              <th>N. Deconto</th>
              <th>Cliente Ricevente</th>
              <th>Operatore / Esecutore</th>
              <th>Canale Ricarica</th>
              <th style="text-align: right;">Variazione Crediti</th>
            </tr>
          </thead>
          <tbody>
            ${filteredLogs.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">
                  Nessuna ricarica trovata corrispondente ai filtri impostati.
                </td>
              </tr>
            ` : filteredLogs.map(log => {
              // Trova cliente
              const board = boards.find(b => b.id === log.boardId || b.shortCode === log.shortCode);
              const mc = board && board.machineId ? machines.find(m => m.id === board.machineId) : null;
              const client = mc && mc.clientId ? clients.find(c => c.id === mc.clientId) : null;

              // Trova operatore
              let operatorName = 'N/D';
              if (log.operatorType === 'CLIENT_DIY') {
                operatorName = `👤 Cliente (Fai-da-Te)`;
              } else {
                const op = users.find(u => u.id === log.operatorId || u.username === log.operatorId);
                if (op) {
                  const roleLabel = op.role === 'ADMIN' ? 'Amministratore' : (op.role === 'UFFICIO' ? 'Ufficio' : 'Agente ADR');
                  operatorName = `👩‍💻 ${op.name} (${roleLabel})`;
                } else {
                  operatorName = `Codice: ${log.operatorId}`;
                }
              }

              // Formatta data
              const dateObj = new Date(log.timestamp);
              const formattedDate = dateObj.toLocaleDateString('it-IT', {
                day: '2-digit', month: '2-digit', year: 'numeric'
              }) + ' ' + dateObj.toLocaleTimeString('it-IT', {
                hour: '2-digit', minute: '2-digit', second: '2-digit'
              });

              const isPositive = log.creditsAdded >= 0;
              const badgeStyle = isPositive 
                ? 'background: rgba(34, 197, 94, 0.1); color: var(--accent-green); border: 1px solid rgba(34, 197, 94, 0.25);'
                : 'background: rgba(239, 68, 68, 0.1); color: var(--accent-rose); border: 1px solid rgba(239, 68, 68, 0.25);';

              const methodLabel = log.method === 'CLOUD_DIRECT' ? '💻 CLOUD DIRECT (Ufficio)' : (log.method === 'WHATSAPP_OTP_BLE' ? '💬 WHATSAPP OTP BLE' : '🚚 ADR BLE PHYSICAL');

              return `
                <tr>
                  <td><strong style="color: #fff;">${formattedDate}</strong></td>
                  <td><span class="badge badge-info" style="font-family: monospace;">📟 #${log.shortCode}</span></td>
                  <td>
                    ${client 
                      ? `<strong>🏢 ${client.name}</strong><br><small style="color: var(--text-muted);">${client.city}</small>`
                      : '<span class="badge badge-secondary">📦 MAGAZZINO</span>'}
                  </td>
                  <td><span style="font-size: 0.9rem;">${operatorName}</span></td>
                  <td>
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-dim);">${methodLabel}</span>
                    ${log.tokenOtp ? `<br><small style="color: var(--accent-amber); font-family: monospace;">${log.tokenOtp}</small>` : ''}
                  </td>
                  <td style="text-align: right;">
                    <span class="badge" style="font-size: 1.05rem; font-weight: 900; ${badgeStyle}">
                      ${isPositive ? '+' : ''}${log.creditsAdded} cr
                    </span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
