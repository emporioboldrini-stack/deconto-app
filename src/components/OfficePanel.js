import { db } from '../db/database.js';

export function renderOfficePanel(activeTab, editingId = null) {
  const clients = db.getClients();
  const machines = db.getMachines();
  const boards = db.getBoards();
  const refills = db.getRefillLogs();

  let modalHtml = '';

  // 1. Modale Modifica Cliente (Step 3: Installa / Assegna Macchina al Cliente)
  if (activeTab === 'clients' && editingId) {
    const cli = clients.find(c => c.id === editingId);
    if (cli) {
      const assignedMcs = machines.filter(m => m.clientId === cli.id);
      modalHtml = `
        <div class="modal-overlay" id="edit-client-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">🏢 Modifica Cliente: ${cli.name}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-client">
              <input type="hidden" id="edit-client-id" value="${cli.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ragione Sociale / Nome Cliente:*</label>
                <input type="text" id="edit-cli-name" value="${cli.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Referente:</label>
                  <input type="text" id="edit-cli-ref" value="${cli.refPerson || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
                  <input type="text" id="edit-cli-phone" value="${cli.phone || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Città:</label>
                  <input type="text" id="edit-cli-city" value="${cli.city || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Indirizzo Sede:</label>
                  <input type="text" id="edit-cli-address" value="${cli.address || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <!-- Step 3: Installa / Assegna Macchina da Caffè al Cliente -->
              <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 16px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
                <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 6px;">
                  ☕ Step 3: Installa / Assegna Macchina a Questo Cliente:
                </label>
                <select id="edit-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA NUOVA MACCHINA (Mantieni Configurazione Attuale)</option>
                  ${machines.map(m => {
                    const board = boards.find(b => b.machineId === m.id);
                    const boardLabel = board ? ` [Deconto #${board.shortCode}]` : ' [Senza Deconto]';
                    const ownerLabel = m.clientId === cli.id ? ' (Già In Uso Qui)' : (m.clientId ? ' (In Uso Altrove)' : ' (📦 In Scorta)');
                    return `<option value="${m.id}" ${m.clientId === cli.id ? 'selected' : ''}>☕ ${m.serialNumber} - ${m.model}${boardLabel}${ownerLabel}</option>`;
                  }).join('')}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-client" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Scheda Cliente</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  // 2. Modale Modifica Macchina (Step 2: Associa Scheda Deconto & Assegna a Cliente)
  if (activeTab === 'machines' && editingId) {
    const mc = machines.find(m => m.id === editingId);
    if (mc) {
      const currentBoard = boards.find(b => b.machineId === mc.id);
      modalHtml = `
        <div class="modal-overlay" id="edit-machine-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">☕ Modifica Macchina: ${mc.serialNumber}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-machine">
              <input type="hidden" id="edit-mc-id" value="${mc.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina:*</label>
                <input type="text" id="edit-mc-serial" value="${mc.serialNumber}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Marca / Produttore:</label>
                  <input type="text" id="edit-mc-brand" value="${mc.brand || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Modello Macchina:</label>
                  <input type="text" id="edit-mc-model" value="${mc.model || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <!-- Step 2: Associa Scheda Deconto alla Macchina -->
              <div style="margin-bottom: 16px; background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
                <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 6px;">
                  📟 Step 2: Associa / Monta Scheda Deconto:
                </label>
                <select id="edit-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA SCHEDA DECONTO (Macchina Standalone)</option>
                  ${boards.map(b => {
                    const assignedMc = machines.find(m => m.id === b.machineId);
                    const labelState = b.machineId === mc.id ? ' (Già Montata Qui)' : (assignedMc ? ` (Montata su ${assignedMc.serialNumber})` : ' (📦 LIBERA A BANCO)');
                    return `<option value="${b.id}" ${b.machineId === mc.id ? 'selected' : ''}>📟 Deconto #${b.shortCode} (${b.remainingCredits} crediti)${labelState}</option>`;
                  }).join('')}
                </select>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">🏢 Assegna a Cliente Finale:</label>
                <select id="edit-mc-client" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 IN SCORTA MAGAZZINO (Nessun Cliente)</option>
                  ${clients.map(c => `<option value="${c.id}" ${mc.clientId === c.id ? 'selected' : ''}>🏢 ${c.name} (${c.city})</option>`).join('')}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-mc" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Macchina</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  // 3. Modale Modifica Scheda Deconto
  if (activeTab === 'deconto_boards' && editingId) {
    const b = boards.find(x => x.id === editingId || x.shortCode === editingId);
    if (b) {
      modalHtml = `
        <div class="modal-overlay" id="edit-board-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">📟 Modifica Scheda Deconto #${b.shortCode}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-board">
              <input type="hidden" id="edit-board-id" value="${b.id}">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice 4 Cifre (ShortCode):*</label>
                  <input type="text" id="edit-board-shortcode" value="${b.shortCode}" maxlength="4" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-cyan); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Hardware HW:</label>
                  <input type="text" id="edit-board-hwserial" value="${b.hwSerial || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Credito Caffè:</label>
                  <input type="number" id="edit-board-credits" value="${b.remainingCredits}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Soglia Buzzer:</label>
                  <input type="number" id="edit-board-threshold" value="${b.lowStockThreshold || 20}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-amber); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Versione Board:</label>
                  <select id="edit-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                    <option value="BASIC" ${b.version === 'BASIC' ? 'selected' : ''}>BASIC</option>
                    <option value="PRO" ${b.version === 'PRO' ? 'selected' : ''}>PRO</option>
                  </select>
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Monta su Macchina da Caffè:</label>
                <select id="edit-board-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 SCHEDA A BANCO / MAGAZZINO (Non Montata)</option>
                  ${machines.map(m => {
                    const owner = clients.find(c => c.id === m.clientId);
                    return `<option value="${m.id}" ${b.machineId === m.id ? 'selected' : ''}>☕ ${m.serialNumber} - ${m.model} (${owner ? owner.name : 'In Scorta'})</option>`;
                  }).join('')}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-board" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Scheda Deconto</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  // --- VISTA 1: 🏢 ANAGRAFICA CLIENTE ---
  if (activeTab === 'clients') {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">🏢 Anagrafica Clienti</h1>
            <p style="color: var(--text-muted);">Step 3 del Flusso: Registra o assegna macchine da caffè ai clienti in comodato d'uso</p>
          </div>
          <button id="btn-toggle-add-client" class="btn btn-primary">
            ➕ Nuovo Cliente
          </button>
        </div>

        <!-- Form Nuovo Cliente -->
        <div id="add-client-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Creazione Nuovo Cliente Anagrafico:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ragione Sociale / Nome Cliente:*</label>
              <input type="text" id="new-cli-name" placeholder="Es. Bar Nuova Italia" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Referente Principale:</label>
              <input type="text" id="new-cli-ref" placeholder="Es. Marco Bianchi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:*</label>
              <input type="text" id="new-cli-phone" placeholder="+39 02 5551234" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email Cliente:</label>
              <input type="email" id="new-cli-email" placeholder="info@barnuovaitalia.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Città:</label>
              <input type="text" id="new-cli-city" placeholder="Milano" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Indirizzo Sede:</label>
              <input type="text" id="new-cli-address" placeholder="Via Roma 15" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>

          <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
            <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
              ☕ Installa Subito una Macchina da Caffè a Questo Cliente (Opzionale):
            </label>
            <select id="new-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="">📦 CREA SOLO CLIENTE ANAGRAFICO (Nessuna Macchina per Ora)</option>
              ${machines.map(m => {
                const board = boards.find(b => b.machineId === m.id);
                const boardLabel = board ? ` [Deconto #${board.shortCode}]` : ' [Senza Deconto]';
                return `<option value="${m.id}">☕ ${m.serialNumber} - ${m.model}${boardLabel} (${m.clientId ? 'In Uso Altrove' : '📦 In Scorta'})</option>`;
              }).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-client" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-client" class="btn btn-primary">💾 Salva Cliente in Anagrafica</button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Ragione Sociale / Nome</th>
                <th>Referente & Contatti</th>
                <th>Città / Indirizzo</th>
                <th>Macchine & Deconti Installati</th>
                <th>Stato</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${clients.map(c => {
                const assignedMcs = machines.filter(m => m.clientId === c.id);
                return `
                  <tr>
                    <td><strong style="font-family: monospace; color: var(--accent-cyan);">${c.id}</strong></td>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.refPerson}<br><small style="color: var(--text-muted);">${c.phone}</small></td>
                    <td>${c.city || 'N/D'}<br><small style="color: var(--text-muted);">${c.address || ''}</small></td>
                    <td>
                      ${assignedMcs.length > 0 
                        ? assignedMcs.map(m => {
                            const b = boards.find(board => board.machineId === m.id);
                            return `<div style="margin-bottom: 4px;"><span class="badge badge-info">☕ ${m.serialNumber}</span> ${b ? `<span class="badge badge-success">📟 Deconto #${b.shortCode} (${b.remainingCredits} cr)</span>` : '<span style="color: var(--text-muted); font-size: 0.75rem;">(Senza Deconto)</span>'}</div>`;
                          }).join('')
                        : '<span class="badge badge-warning">📦 Nessuna Macchina Installata</span>'}
                    </td>
                    <td><span class="badge ${c.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}">${c.status}</span></td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-client-standalone" data-id="${c.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
                        </button>
                        <button class="btn btn-secondary btn-del-client-standalone" data-id="${c.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      ${modalHtml}
    `;
  }

  // --- VISTA 2: ☕ ANAGRAFICA PARCO MACCHINE ---
  if (activeTab === 'machines') {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">☕ Parco Macchine da Caffè</h1>
            <p style="color: var(--text-muted);">Step 2 del Flusso: Associa le Schede Deconto alle Macchine ed assegna al cliente</p>
          </div>
          <button id="btn-toggle-add-machine" class="btn btn-primary">
            ➕ Nuova Macchina da Caffè
          </button>
        </div>

        <!-- Form Nuova Macchina -->
        <div id="add-machine-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-purple);">
          <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 16px;">➕ Registrazione Nuova Macchina da Caffè:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Seriale Macchina (SN):*</label>
              <input type="text" id="new-mc-serial" placeholder="Es. SN-MC-2026-9988" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Marca / Produttore:</label>
              <input type="text" id="new-mc-brand" placeholder="Es. Didiesse / Faber / Spinel" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Modello Macchina:*</label>
              <input type="text" id="new-mc-model" placeholder="Es. Frog Revolution 1G" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div style="background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
              <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 4px;">
                📟 Step 2: Associa subito una Scheda Deconto (Opzionale):
              </label>
              <select id="new-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                <option value="">📦 NESSUNA SCHEDA DECONTO (Macchina Senza Controllo)</option>
                ${boards.map(b => {
                  const assignedMc = machines.find(m => m.id === b.machineId);
                  const labelState = assignedMc ? ` (Montata su ${assignedMc.serialNumber})` : ' (📦 LIBERA A BANCO)';
                  return `<option value="${b.id}">📟 Deconto #${b.shortCode} (${b.remainingCredits} crediti)${labelState}</option>`;
                }).join('')}
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">🏢 Assegna subito a Cliente (Opzionale):</label>
              <select id="new-mc-client" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                <option value="">📦 LASCIA IN SCORTA MAGAZZINO</option>
                ${clients.map(c => `<option value="${c.id}">🏢 ${c.name} (${c.city})</option>`).join('')}
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-machine" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-machine" class="btn btn-primary">💾 Salva Macchina in Parco</button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Seriale Macchina</th>
                <th>Marca & Modello</th>
                <th>Stato Allocazione</th>
                <th>Cliente Assegnato</th>
                <th>Scheda Deconto Montata</th>
                <th>Data Installazione</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${machines.map(m => {
                const owner = clients.find(c => c.id === m.clientId);
                const board = boards.find(b => b.machineId === m.id);
                return `
                  <tr>
                    <td><strong style="font-family: monospace; font-size: 1.05rem; color: var(--accent-purple);">${m.serialNumber}</strong></td>
                    <td><strong>${m.model}</strong><br><small style="color: var(--text-muted);">${m.brand || 'N/D'}</small></td>
                    <td>
                      ${m.status === 'INSTALLED' 
                        ? '<span class="badge badge-success">🟢 IN USO PRESSO CLIENTE</span>' 
                        : '<span class="badge badge-warning">📦 IN SCORTA MAGAZZINO</span>'}
                    </td>
                    <td>${owner ? `<strong>🏢 ${owner.name}</strong><br><small style="color: var(--text-muted);">${owner.city}</small>` : '<span style="color: var(--text-muted);">Nessuno (Magazzino)</span>'}</td>
                    <td>${board ? `<span class="badge badge-info">📟 Deconto #${board.shortCode} (${board.remainingCredits} cr)</span>` : '<span class="badge badge-warning">Senza Deconto</span>'}</td>
                    <td>${m.installDate || 'N/D'}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-machine-standalone" data-id="${m.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-purple);">
                          ✏️ Modifica / Collega
                        </button>
                        <button class="btn btn-secondary btn-del-machine-standalone" data-id="${m.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      ${modalHtml}
    `;
  }

  // --- VISTA 3: 📟 ANAGRAFICA SCHEDE DECONTO ---
  if (activeTab === 'deconto_boards') {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">📟 Registro Schede Deconto (ESP32-C6)</h1>
            <p style="color: var(--text-muted);">Step 1 del Flusso: Crea le nuove schede Deconto a banco/magazzino ed impostane i crediti</p>
          </div>
          <button id="btn-toggle-add-board" class="btn btn-primary" style="font-size: 1rem; font-weight: 800; padding: 12px 20px;">
            ➕ NUOVA SCHEDA DECONTO
          </button>
        </div>

        <!-- Form Nuova Scheda Deconto -->
        <div id="add-board-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan); background: linear-gradient(135deg, #0f172a, #1e293b);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Registrazione Nuova Scheda Hardware Deconto:</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.85rem; color: #fff; font-weight: 700; display: block; margin-bottom: 6px;">Codice 4 Cifre (ShortCode):*</label>
              <input type="text" id="new-board-code" placeholder="Es. 9902" maxlength="4" style="width: 100%; padding: 12px; background: var(--bg-primary); color: var(--accent-cyan); border: 2px solid var(--accent-cyan); border-radius: 8px; font-weight: 900; font-size: 1.2rem; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Seriale Hardware HW:</label>
              <input type="text" id="new-board-hwserial" placeholder="Es. DC-HW-9902" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Crediti Iniziali Caffè:</label>
              <input type="number" id="new-board-credits" value="200" style="width: 100%; padding: 12px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 8px; font-weight: 900; font-size: 1.1rem;">
            </div>
            <div>
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Versione Modulo:</label>
              <select id="new-board-version" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
                <option value="BASIC">BASIC</option>
                <option value="PRO">PRO (Wi-Fi + BLE)</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Monta subito su Macchina da Caffè (Opzionale):</label>
            <select id="new-board-machine" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">📦 LASCIA SCHEDA LIBERA A BANCO / MAGAZZINO (Disponibile per il montaggio futuro)</option>
              ${machines.map(m => {
                const owner = clients.find(c => c.id === m.clientId);
                return `<option value="${m.id}">☕ ${m.serialNumber} - ${m.model} (${owner ? owner.name : 'In Scorta'})</option>`;
              }).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-board" class="btn btn-secondary" style="padding: 10px 20px;">Annulla</button>
            <button id="btn-save-new-board" class="btn btn-primary" style="padding: 10px 24px; font-size: 1rem; font-weight: 800;">💾 CREA SCHEDA DECONTO</button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Codice Deconto</th>
                <th>Seriale HW & MAC</th>
                <th>Credito Residuo</th>
                <th>Stato Assegnazione</th>
                <th>Macchina Collegata</th>
                <th>Cliente Finale</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${boards.map(b => {
                const mc = machines.find(m => m.id === b.machineId);
                const owner = mc ? clients.find(c => c.id === mc.clientId) : null;
                return `
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${b.shortCode}" style="font-family: monospace; font-weight: 900; font-size: 1.15rem; color: var(--accent-cyan); padding: 6px 12px;">
                        #${b.shortCode}
                      </button>
                    </td>
                    <td><strong>${b.hwSerial || 'N/D'}</strong><br><small style="color: var(--text-muted); font-family: monospace;">${b.macAddress || ''}</small></td>
                    <td><strong style="font-size: 1.25rem; color: ${b.remainingCredits > 20 ? 'var(--accent-green)' : 'var(--accent-rose)'};">${b.remainingCredits}</strong> cialde</td>
                    <td>
                      ${mc 
                        ? '<span class="badge badge-success">🟢 MONTATA SU MACCHINA</span>' 
                        : '<span class="badge badge-warning">📦 LIBERA A BANCO</span>'}
                    </td>
                    <td>${mc ? `<span class="badge badge-info">☕ ${mc.serialNumber}</span>` : '<span style="color: var(--text-muted);">Nessuna</span>'}</td>
                    <td>${owner ? `<strong>🏢 ${owner.name}</strong>` : '<span style="color: var(--text-muted);">N/D</span>'}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-board-standalone" data-id="${b.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
                        </button>
                        <button class="btn btn-secondary btn-del-board-standalone" data-id="${b.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      ${modalHtml}
    `;
  }

  // Generatore OTP WhatsApp
  if (activeTab === 'otp_generator') {
    return `
      <div>
        <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">🔑 Generatore Ricariche Fai-da-Te OTP</h1>
        <div class="stat-card" style="padding: 24px; max-width: 600px;">
          <div style="margin-bottom: 16px;">
            <label style="font-weight: 700; display: block; margin-bottom: 6px;">Seleziona Scheda Deconto:</label>
            <select id="otp-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              ${boards.map(b => `<option value="${b.shortCode}">Deconto #${b.shortCode} (${b.remainingCredits} crediti)</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-weight: 700; display: block; margin-bottom: 6px;">Taglio Ricarica (Cialde):</label>
            <select id="otp-credits-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="100">+100 Cialde</option>
              <option value="200" selected>+200 Cialde</option>
              <option value="500">+500 Cialde</option>
            </select>
          </div>
          <button id="btn-generate-otp" class="btn btn-primary" style="width: 100%; padding: 12px;">🔑 Genera Token & Link Ricarica</button>
          
          <div style="margin-top: 20px; background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px;">
            <div>Token OTP: <strong id="otp-code-val" style="color: var(--accent-cyan); font-family: monospace;">---</strong></div>
            <div style="word-break: break-all; margin-top: 6px; font-size: 0.8rem; color: var(--text-muted);" id="otp-link-val">---</div>
            <div style="display: flex; gap: 10px; margin-top: 12px;">
              <button id="btn-send-whatsapp" class="btn btn-success" style="flex: 1;">💬 Invia via WhatsApp</button>
              <button id="btn-copy-otp-link" class="btn btn-secondary" style="flex: 1;">📋 Copia Link</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `<div>Seleziona una voce del menu per proseguire.</div>`;
}
