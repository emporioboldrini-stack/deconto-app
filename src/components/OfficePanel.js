import { db } from '../db/database.js';
import { ITALIAN_CITIES } from '../data/italianCities.js';

// Tipologie cliente standard
const CLIENT_TYPES = [
  { value: 'Bar',                   label: '☕ Bar',                      color: '#f59e0b' },
  { value: 'Ristorante',            label: '🍽️ Ristorante',              color: '#ef4444' },
  { value: 'Hotel',                 label: '🏨 Hotel',                   color: '#8b5cf6' },
  { value: 'Azienda/Ufficio',       label: '🏢 Azienda / Ufficio',       color: '#38bdf8' },
  { value: 'Fabbrica/SitoProduttivo', label: '🏭 Fabbrica / Sito produttivo', color: '#10b981' },
  { value: 'Palestra/Sport',        label: '💪 Palestra / Sport',        color: '#22c55e' },
  { value: 'Negozio/Retail',        label: '🛍️ Negozio / Retail',       color: '#f97316' },
  { value: 'Struttura Sanitaria',   label: '🏥 Struttura Sanitaria',     color: '#06b6d4' },
  { value: 'Scuola/Università',     label: '🎓 Scuola / Università',     color: '#a78bfa' },
  { value: 'Altro',                 label: '📌 Altro',                   color: '#6b7280' },
];

function clientTypeBadge(type) {
  const t = CLIENT_TYPES.find(x => x.value === type) || CLIENT_TYPES.find(x => x.value === 'Altro');
  return `<span class="badge" style="background: ${t.color}22; color: ${t.color}; border: 1px solid ${t.color}55; font-weight: 700; white-space: nowrap;">${t.label}</span>`;
}

function clientTypeSelect(id, selectedValue) {
  return `<select id="${id}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
    ${CLIENT_TYPES.map(t => `<option value="${t.value}" ${selectedValue === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
  </select>`;
}

const MACHINE_MODELS = ["Ciao", "Jessica", "Frog", "Slot Plast", "Aroma", "Terry", "Pinocchio", "Altro"];
const PRODUCTION_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

function machineModelSelect(id, selectedValue) {
  return `<select id="${id}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
    ${MACHINE_MODELS.map(m => `<option value="${m}" ${selectedValue === m ? 'selected' : ''}>${m}</option>`).join('')}
  </select>`;
}

function productionYearSelect(id, selectedValue) {
  return `<select id="${id}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
    ${PRODUCTION_YEARS.map(y => `<option value="${y}" ${selectedValue === y ? 'selected' : ''}>${y}</option>`).join('')}
  </select>`;
}

export function renderOfficePanel(activeTab = 'clients', editingId = null) {
  const clients = db.getClients();
  const machines = db.getMachines();
  const boards = db.getBoards();
  const refillLogs = db.getRefillLogs();

  let modalHtml = '';

  // 1. Modale Modifica Cliente Standalone
  if (activeTab === 'clients' && editingId) {
    const c = clients.find(x => x.id === editingId);
    if (c) {
      const currentMc = machines.find(m => m.clientId === c.id);
      modalHtml = `
        <div class="modal-overlay" id="edit-client-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">✏️ Modifica Cliente: ${c.name}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-client">
              <input type="hidden" id="edit-client-id" value="${c.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ragione Sociale / Nome:*</label>
                <input type="text" id="edit-cli-name" value="${c.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">🏷️ Tipologia Cliente:</label>
                ${clientTypeSelect('edit-cli-type', c.clientType || 'Altro')}
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Referente:</label>
                  <input type="text" id="edit-cli-ref" value="${c.refPerson || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono:</label>
                  <input type="text" id="edit-cli-phone" value="${c.phone || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">📍 Città:</label>
                  <input type="text" id="edit-cli-city" value="${c.city || ''}" list="cities-list-edit"
                    placeholder="Digita per cercare... (es. Fir)"
                    style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;"
                    autocomplete="off">
                  <datalist id="cities-list-edit">
                    ${ITALIAN_CITIES.map(city => `<option value="${city}">`).join('')}
                  </datalist>
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Indirizzo:</label>
                  <input type="text" id="edit-cli-address" value="${c.address || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
                <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
                  ☕ Step 3: Macchina da Caffè Installata a Questo Cliente:
                </label>
                <select id="edit-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA MACCHINA (Cliente senza erogatore)</option>
                  ${machines.map(m => {
                    const board = boards.find(b => b.machineId === m.id);
                    const isOther = m.clientId && m.clientId !== c.id;
                    return `<option value="${m.id}" ${currentMc && currentMc.id === m.id ? 'selected' : ''}>☕ ${m.serialNumber} - ${m.model} ${board ? `(Deconto #${board.shortCode})` : ''} ${isOther ? '(⚠️ Già in uso)' : ''}</option>`;
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

  // 2. Modale Modifica Macchina Standalone
  if (activeTab === 'machines' && editingId) {
    const mc = machines.find(x => x.id === editingId);
    if (mc) {
      const assignedBoard = boards.find(b => b.machineId === mc.id);
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
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina (SN):*</label>
                <input type="text" id="edit-mc-serial" value="${mc.serialNumber}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Marca / Produttore:</label>
                  <input type="text" id="edit-mc-brand" value="${mc.brand || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Modello Macchina:*</label>
                  ${machineModelSelect('edit-mc-model', mc.model || 'Ciao')}
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">📅 Anno Produzione:*</label>
                  ${productionYearSelect('edit-mc-year', mc.productionYear || '2026')}
                </div>
              </div>

              <div style="margin-bottom: 16px; background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
                <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 4px;">
                  📟 Step 2: Scheda Deconto Collegata alla Macchina:
                </label>
                <select id="edit-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA SCHEDA DECONTO (Non controllata)</option>
                  ${boards.map(b => `<option value="${b.id}" ${assignedBoard && assignedBoard.id === b.id ? 'selected' : ''}>📟 Deconto #${b.shortCode} (${b.remainingCredits} cr) ${b.machineId && b.machineId !== mc.id ? '(⚠️ Montata altrove)' : ''}</option>`).join('')}
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

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Credito Caffè Residuo:</label>
                  <input type="number" id="edit-board-credits" value="${b.remainingCredits}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Versione Board:</label>
                  <select id="edit-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;" onchange="const gcRow = document.getElementById('edit-board-groupcount-row'); gcRow.style.display = this.value === 'PRO' ? 'block' : 'none';">
                    <option value="BASIC" ${b.version === 'BASIC' ? 'selected' : ''}>🟢 BASIC — Monogruppo</option>
                    <option value="PRO" ${b.version === 'PRO' ? 'selected' : ''}>🔵 PRO — Multigruppo</option>
                  </select>
                </div>
              </div>
              <div id="edit-board-groupcount-row" style="display: ${b.version === 'PRO' ? 'block' : 'none'}; margin-bottom: 16px; background: rgba(129,140,248,0.1); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--accent-purple);">
                <label style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; display: block; margin-bottom: 6px;">🔵 PRO — Numero Bracci/Gruppi (2-4):</label>
                <select id="edit-board-groupcount" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-purple); border: 1px solid var(--accent-purple); border-radius: 6px; font-weight: 800;">
                  <option value="2" ${(b.groupCount || 2) === 2 ? 'selected' : ''}>2 Gruppi</option>
                  <option value="3" ${(b.groupCount || 2) === 3 ? 'selected' : ''}>3 Gruppi</option>
                  <option value="4" ${(b.groupCount || 2) === 4 ? 'selected' : ''}>4 Gruppi (Max)</option>
                </select>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">⚠️ Contatore crediti unico condiviso per tutti i gruppi.</div>
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
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ragione Sociale / Nome Cliente:*</label>
              <input type="text" id="new-cli-name" placeholder="Es. Bar Centrale Srl" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">🏷️ Tipologia Cliente:</label>
              ${clientTypeSelect('new-cli-type', 'Bar')}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome Referente:</label>
              <input type="text" id="new-cli-ref" placeholder="Es. Mario Rossi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
              <input type="text" id="new-cli-phone" placeholder="+39 02 112233" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email Cliente:</label>
              <input type="email" id="new-cli-email" placeholder="info@barcentrale.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">📍 Città:</label>
              <input type="text" id="new-cli-city" list="cities-list-new"
                placeholder="Digita per cercare... (es. Mil)"
                style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;"
                autocomplete="off">
              <datalist id="cities-list-new">
                ${ITALIAN_CITIES.map(city => `<option value="${city}">`).join('')}
              </datalist>
            </div>
          </div>

          <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
            <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
              ☕ Step 3: Installa subito una Macchina da Caffè a questo Cliente (Opzionale):
            </label>
            <select id="new-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="">📦 NESSUNA MACCHINA (Registra solo Cliente Anagrafico)</option>
              ${machines.map(m => {
                const board = boards.find(b => b.machineId === m.id);
                return `<option value="${m.id}">☕ ${m.serialNumber} - ${m.model} ${board ? `(Deconto #${board.shortCode})` : '(Senza Deconto)'} ${m.clientId ? '(⚠️ Già installata altrove)' : ''}</option>`;
              }).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-client" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-client" class="btn btn-primary">💾 Salva Cliente ed Installa Macchina</button>
          </div>
        </div>

        <!-- Tabella Clienti -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Ragione Sociale / Nome</th>
                <th>Tipologia</th>
                <th>Referente & Contatti</th>
                <th>Città / Indirizzo</th>
                <th>Macchine & Deconti Installati</th>
                <th>Stato Calcolato</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${clients.map(c => {
                const assignedMcs = machines.filter(m => m.clientId === c.id);
                const statusObj = db.calculateClientStatus(c);
                return `
                  <tr>
                    <td><strong style="font-family: monospace; color: var(--accent-cyan);">${c.id}</strong></td>
                    <td><strong>${c.name}</strong></td>
                    <td>${clientTypeBadge(c.clientType || 'Altro')}</td>
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
                    <td>${statusObj.badgeHtml}</td>
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
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Seriale Macchina (SN):*</label>
              <input type="text" id="new-mc-serial" placeholder="Es. SN-MC-2026-9988" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Marca / Produttore:</label>
              <input type="text" id="new-mc-brand" placeholder="Es. Spinel / Faber" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Modello Macchina:*</label>
              ${machineModelSelect('new-mc-model', 'Ciao')}
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">📅 Anno Produzione:*</label>
              ${productionYearSelect('new-mc-year', '2026')}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div style="background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
              <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 4px;">
                📟 Step 2: Associa subito una Scheda Deconto (Opzionale):
              </label>
              <select id="new-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                <option value="">📦 NESSUNA SCHEDA DECONTO (Macchina Senza Controllo)</option>
                ${boards.map(b => `<option value="${b.id}">📟 Deconto #${b.shortCode} (${b.remainingCredits} cr) ${b.machineId ? '(⚠️ Montata su altra macchina)' : ''}</option>`).join('')}
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">🏢 Assegna subito a Cliente (Opzionale):</label>
              <select id="new-mc-client" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                <option value="">📦 IN SCORTA MAGAZZINO (Libera per installazione)</option>
                ${clients.map(c => `<option value="${c.id}">🏢 ${c.name} (${c.city})</option>`).join('')}
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-machine" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-machine" class="btn btn-primary">💾 Salva Macchina da Caffè</button>
          </div>
        </div>

        <!-- Tabella Macchine -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Seriale Macchina</th>
                <th>Marca & Modello</th>
                <th>Anno Prod.</th>
                <th>Scheda Deconto Collegata</th>
                <th>Cliente Assegnato</th>
                <th>Stato Operativo</th>
                <th>Azioni Macchina</th>
              </tr>
            </thead>
            <tbody>
              ${machines.map(m => {
                const b = boards.find(board => board.machineId === m.id);
                const owner = clients.find(c => c.id === m.clientId);
                const statusObj = b ? db.calculateBoardStatus(b) : { badgeHtml: '<span class="badge badge-secondary">📦 SCORTA</span>' };
                return `
                  <tr>
                    <td><strong style="font-family: monospace; color: var(--accent-cyan);">${m.serialNumber}</strong></td>
                    <td><strong>${m.brand || ''} ${m.model}</strong></td>
                    <td><span class="badge" style="background: rgba(255,255,255,0.06); color: #fff; border: 1px solid var(--border-subtle);">${m.productionYear || '2026'}</span></td>
                    <td>
                      ${b 
                        ? `<button class="btn btn-secondary btn-deconto-detail" data-code="${b.shortCode}" style="padding: 4px 8px; font-size: 0.8rem; font-weight: 800; color: var(--accent-cyan);">📟 #${b.shortCode} (${b.remainingCredits} cr)</button>`
                        : '<span style="color: var(--text-muted); font-size: 0.8rem;">(Nessuna Scheda)</span>'}
                    </td>
                    <td>
                      ${owner 
                        ? `<strong style="color: #fff;">🏢 ${owner.name}</strong><br><small style="color: var(--text-muted);">${owner.city}</small>` 
                        : '<span class="badge badge-secondary">📦 MAGAZZINO</span>'}
                    </td>
                    <td>${statusObj.badgeHtml}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-machine-standalone" data-id="${m.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
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
  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📟 Anagrafica Schede Hardware Deconto</h1>
          <p style="color: var(--text-muted);">Step 1 del Flusso: Crea e gestisci le schede hardware ESP32-C6 col loro codice a 4 cifre</p>
        </div>
        <button id="btn-toggle-add-board" class="btn btn-primary">
          ➕ Nuova Scheda Deconto
        </button>
      </div>

      <!-- Form Nuova Scheda Deconto -->
      <div id="add-board-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Creazione Nuova Scheda Hardware Deconto:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice 4 Cifre (ShortCode):*</label>
            <input type="text" id="new-board-code" maxlength="4" placeholder="Es. 9902" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-cyan); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace; font-size: 1.1rem;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Seriale HW (Opzionale):</label>
            <input type="text" id="new-board-hwserial" placeholder="Es. DC-HW-9902" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Crediti Cialde Iniziali:*</label>
            <input type="number" id="new-board-credits" value="200" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Versione Hardware:</label>
            <select id="new-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;" onchange="document.getElementById('new-board-groupcount-row').style.display = this.value === 'PRO' ? 'block' : 'none'">
              <option value="BASIC">🟢 BASIC — Monogruppo (1 tasto erogazione)</option>
              <option value="PRO">🔵 PRO — Multigruppo (2-4 bracci, contatore condiviso)</option>
            </select>
          </div>
        </div>

        <!-- Riga Gruppi PRO (nascosta di default) -->
        <div id="new-board-groupcount-row" style="display: none; margin-bottom: 16px; background: rgba(129,140,248,0.1); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--accent-purple);">
          <label style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; display: block; margin-bottom: 6px;">🔵 PRO — Numero di Bracci/Gruppi Erogazione (2-4):</label>
          <select id="new-board-groupcount" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-purple); border: 1px solid var(--accent-purple); border-radius: 6px; font-weight: 800;">
            <option value="2">2 Gruppi</option>
            <option value="3">3 Gruppi</option>
            <option value="4">4 Gruppi (Max)</option>
          </select>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">⚠️ Il contatore crediti è unico e condiviso per tutti i gruppi.</div>
        </div>

        <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
          <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
            ☕ Step 1: Monta subito su una Macchina da Caffè (Opzionale):
          </label>
          <select id="new-board-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            <option value="">📦 SCHEDA A BANCO (Non Montata / Magazzino)</option>
            ${machines.map(m => {
              const owner = clients.find(c => c.id === m.clientId);
              return `<option value="${m.id}">☕ ${m.serialNumber} - ${m.model} (${owner ? owner.name : 'In Scorta'})</option>`;
            }).join('')}
          </select>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="btn-cancel-add-board" class="btn btn-secondary">Annulla</button>
          <button id="btn-save-new-board" class="btn btn-primary">💾 Registra Nuova Scheda Deconto</button>
        </div>
      </div>

      <!-- Tabella Schede Deconto -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Codice 4 Cifre</th>
              <th>Versione</th>
              <th>Seriale HW & MAC</th>
              <th>Credito Residuo</th>
              <th>Macchina Collegata</th>
              <th>Cliente Finale</th>
              <th>Stato Calcolato</th>
              <th>Azioni Scheda</th>
            </tr>
          </thead>
          <tbody>
            ${boards.map(b => {
              const mc = machines.find(m => m.id === b.machineId);
              const owner = mc ? clients.find(c => c.id === mc.clientId) : null;
              const statusObj = db.calculateBoardStatus(b);
              return `
                <tr>
                  <td>
                    <button class="btn btn-secondary btn-deconto-detail" data-code="${b.shortCode}" style="padding: 6px 12px; font-size: 1rem; font-weight: 900; color: var(--accent-cyan); font-family: monospace;">
                      📟 #${b.shortCode}
                    </button>
                  </td>
                  <td>
                    ${ b.version === 'PRO'
                      ? `<span class="badge" style="background: rgba(129,140,248,0.2); color: var(--accent-purple); border: 1px solid var(--accent-purple); font-weight: 800;">🔵 PRO</span><br><small style="color: var(--text-muted);">${b.groupCount || 2} Gruppi · Contatore Condiviso</small>`
                      : `<span class="badge" style="background: rgba(52,211,153,0.15); color: var(--accent-green); border: 1px solid var(--accent-green); font-weight: 800;">🟢 BASIC</span><br><small style="color: var(--text-muted);">1 Gruppo Monogruppo</small>`
                    }
                  </td>
                  <td><strong>${b.hwSerial || 'DC-HW-DEF'}</strong><br><small style="color: var(--text-muted); font-family: monospace;">${b.macAddress || ''}</small></td>
                  <td><strong style="font-size: 1.1rem; color: ${b.remainingCredits <= 0 ? 'var(--accent-rose)' : 'var(--accent-green)'};">${b.remainingCredits} cialde</strong></td>
                  <td>
                    ${mc 
                      ? `<strong style="color: #fff;">☕ ${mc.serialNumber}</strong><br><small style="color: var(--text-muted);">${mc.model}</small>` 
                      : '<span class="badge badge-secondary">📦 A BANCO</span>'}
                  </td>
                  <td>
                    ${owner 
                      ? `<strong style="color: #fff;">🏢 ${owner.name}</strong><br><small style="color: var(--text-muted);">${owner.city}</small>` 
                      : '<span class="badge badge-secondary">📦 LIBERA</span>'}
                  </td>
                  <td>${statusObj.badgeHtml}</td>
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
