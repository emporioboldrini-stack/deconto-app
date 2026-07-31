import { db } from '../db/database.js';

export function renderOfficePanel(activeTab, editingClientId = null) {
  const clients = db.getClients();
  const boards = db.getBoards();
  const refills = db.getRefillLogs();

  const canCreate = db.hasPermission('canCreateClients');
  const canEdit = db.hasPermission('canEditClients');
  const canDelete = db.hasPermission('canDeleteClients');

  let editClientModalHtml = '';
  if (editingClientId) {
    const clientToEdit = clients.find(c => c.id === editingClientId);
    const machineToEdit = clientToEdit ? db.getMachines().find(m => m.clientId === clientToEdit.id) : null;
    const boardToEdit = machineToEdit ? db.getBoards().find(b => b.machineId === machineToEdit.id) : null;

    if (clientToEdit) {
      editClientModalHtml = `
        <div class="modal-overlay" id="edit-client-modal">
          <div class="modal-box" style="max-width: 680px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
                ✏️ Modifica Scheda Cliente & Impostazioni Macchina
              </h2>
              <button id="btn-close-edit-client-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>

            <form id="edit-client-form">
              <input type="hidden" id="edit-client-id" value="${clientToEdit.id}">

              <!-- Sezione 1: Anagrafica Cliente -->
              <h4 style="color: var(--accent-cyan); margin: 0 0 12px 0;">1. Dati Anagrafici Cliente & Contatti:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ragione Sociale / Cliente:*</label>
                  <input type="text" id="edit-cli-name" value="${clientToEdit.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Persona di Riferimento:*</label>
                  <input type="text" id="edit-cli-ref" value="${clientToEdit.refPerson}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / WhatsApp:*</label>
                  <input type="text" id="edit-cli-phone" value="${clientToEdit.phone}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Città:</label>
                  <input type="text" id="edit-cli-city" value="${clientToEdit.city || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Indirizzo Completo:</label>
                  <input type="text" id="edit-cli-address" value="${clientToEdit.address || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <!-- Sezione 2: Macchina da Caffè -->
              <h4 style="color: var(--accent-purple); margin: 16px 0 12px 0;">2. Configurazione Macchina da Caffè:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Modello Macchina da Caffè:</label>
                  <input type="text" id="edit-cli-mc-model" value="${machineToEdit ? machineToEdit.model : ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina (Targhetta):</label>
                  <input type="text" id="edit-cli-mc-serial" value="${machineToEdit ? machineToEdit.serialNumber : ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
                </div>
              </div>

              <!-- Sezione 3: Dispositivo Deconto -->
              <h4 style="color: var(--accent-amber); margin: 16px 0 12px 0;">3. Crediti & Scheda Deconto IoT:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Deconto (4 cifre):</label>
                  <input type="text" id="edit-cli-shortcode" value="${boardToEdit ? boardToEdit.shortCode : ''}" maxlength="4" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Crediti Rimanenti (Caffè):</label>
                  <input type="number" id="edit-cli-credits" value="${boardToEdit ? boardToEdit.remainingCredits : 200}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Soglia Buzzer (Caffè):</label>
                  <input type="number" id="edit-cli-threshold" value="${boardToEdit ? boardToEdit.lowStockThreshold : 20}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Versione Hardware:</label>
                  <select id="edit-cli-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                    <option value="BASIC" ${boardToEdit && boardToEdit.version === 'BASIC' ? 'selected' : ''}>BASIC (1 Braccio)</option>
                    <option value="PRO" ${boardToEdit && boardToEdit.version === 'PRO' ? 'selected' : ''}>PRO (Multi Braccio)</option>
                  </select>
                </div>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-client" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">💾 Salva Tutte le Modifiche Scheda</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  if (activeTab === 'qr_generator') {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🖨️ Generatore Etichette Adesive QR Code</h1>
          <p style="color: var(--text-muted);">Crea e stampa l'etichetta fisica da incollare sulla macchina da caffè</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div class="stat-card" style="padding: 24px;">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">1. Configura Etichetta:</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Seleziona Scheda Deconto / Cliente:</label>
              <select id="qr-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                ${boards.map(b => {
                  const details = db.getBoardFullDetails(b.id);
                  return `<option value="${b.shortCode}">${b.shortCode} - ${details.client ? details.client.name : 'N/D'} (${details.machine ? details.machine.serialNumber : ''})</option>`;
                }).join('')}
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Formato di Stampa:</label>
              <select id="qr-format-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                <option value="THERMAL_50x30">Etichetta Termica Adesiva 50x30mm (Singola)</option>
                <option value="A4_SHEET">Foglio A4 Etichette Multi-Adesive (12 per foglio)</option>
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Intestazione Personalizzata:</label>
              <input type="text" id="qr-header-input" value="DECONTO IoT System - Comodato Gratuito" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
            </div>

            <button id="btn-print-qr" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 14px; font-size: 1rem;">
              🖨️ Stampa Etichetta Termica Ora
            </button>
          </div>

          <div>
            <h3 style="margin-top: 0; color: var(--text-muted);">Anteprima Stampa Etichetta:</h3>
            
            <div id="qr-sticker-preview" style="background: #ffffff; color: #000000; padding: 24px; border-radius: 12px; font-family: monospace; border: 3px dashed #000; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <div id="lbl-header-title" style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 12px;">
                ☕ DECONTO COFFEE CONTROL ☕
              </div>
              
              <div id="lbl-short-code-display" style="font-size: 3.2rem; font-weight: 900; letter-spacing: 4px; margin: 6px 0; color: #000;">
                3467
              </div>
              
              <div style="display: flex; justify-content: center; margin: 12px 0;">
                <svg width="120" height="120" viewBox="0 0 100 100" style="border: 2px solid #000; padding: 4px; background: #fff;">
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="10" y="10" width="30" height="30" fill="#000"/>
                  <rect x="15" y="15" width="20" height="20" fill="#fff"/>
                  <rect x="20" y="20" width="10" height="10" fill="#000"/>
                  <rect x="60" y="10" width="30" height="30" fill="#000"/>
                  <rect x="65" y="15" width="20" height="20" fill="#fff"/>
                  <rect x="70" y="20" width="10" height="10" fill="#000"/>
                  <rect x="10" y="60" width="30" height="30" fill="#000"/>
                  <rect x="15" y="65" width="20" height="20" fill="#fff"/>
                  <rect x="20" y="70" width="10" height="10" fill="#000"/>
                  <rect x="50" y="50" width="15" height="15" fill="#000"/>
                  <rect x="70" y="70" width="15" height="15" fill="#000"/>
                </svg>
              </div>

              <div style="font-size: 0.75rem; text-align: left; background: #f0f0f0; padding: 8px; border-radius: 4px; border: 1px solid #ccc; line-height: 1.4;">
                <div><strong>SERIALE MACCHINA:</strong> <span id="lbl-mc-sn">SN-MC-2026-9912</span></div>
                <div><strong>SERIALE DECONTO:</strong> <span id="lbl-hw-sn">DC-HW-8841</span></div>
                <div><strong>CHIP HW:</strong> ESP32-C6 (BLE + Wi-Fi 6)</div>
              </div>

              <div style="font-size: 0.65rem; color: #555; margin-top: 8px;">
                Per assistenza o ricarica rapida scansiona il QR Code o inserisci il codice 3467
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (activeTab === 'otp_generator') {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🔑 Generazione Ricariche Fai-da-Te (OTP)</h1>
          <p style="color: var(--text-muted);">Genera il token monouso firmato ed invialo direttamente al cliente via WhatsApp o Email</p>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="stat-card" style="padding: 24px;">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">1. Dettagli Ricarica Spedita:</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Seleziona Cliente & Macchina:</label>
              <select id="otp-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                ${boards.map(b => {
                  const details = db.getBoardFullDetails(b.id);
                  return `<option value="${b.shortCode}">${details.client ? details.client.name : 'N/D'} (Deconto #${b.shortCode})</option>`;
                }).join('')}
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Numero Caffè da Accreditare:</label>
              <select id="otp-credits-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                <option value="100">+ 100 Caffè</option>
                <option value="150">+ 150 Caffè</option>
                <option value="200" selected>+ 200 Caffè (Standard Courier)</option>
                <option value="300">+ 300 Caffè</option>
                <option value="500">+ 500 Caffè</option>
              </select>
            </div>

            <button id="btn-generate-otp" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              ✨ Genera Token OTP & Link WhatsApp
            </button>
          </div>

          <div id="otp-result-card" class="stat-card success" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 style="margin-top: 0; color: var(--accent-green);">Link Ricarica WhatsApp Pronto!</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Invialo al cliente: quando clicca dal suo smartphone il credito viene accreditato via Web Bluetooth.</p>

              <div style="background: var(--bg-primary); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); margin: 16px 0;">
                <div style="font-size: 0.8rem; color: var(--text-muted);">Token OTP Firmato:</div>
                <div id="otp-code-val" style="font-size: 1.3rem; font-weight: 800; color: var(--accent-amber); font-family: monospace;">OTP-9981-X79K2</div>
                
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 12px;">Link WhatsApp Cliente:</div>
                <div id="otp-link-val" style="font-size: 0.85rem; color: var(--accent-cyan); word-break: break-all; margin-top: 4px;">
                  https://deconto-vending-app.web.app/?short=3467&otp=OTP-9981-X79K2&c=200
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 12px;">
              <button id="btn-send-whatsapp" class="btn btn-success" style="flex: 1;">
                💬 Invia via WhatsApp
              </button>
              <button id="btn-copy-otp-link" class="btn btn-secondary" style="flex: 1;">
                📋 Copia Link
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (activeTab === 'refills_history') {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">📋 Storico Ricariche Accreditate</h1>
          <p style="color: var(--text-muted);">Registro di tutte le ricariche effettuate da ADR, Clienti Fai-da-Te e da Ufficio</p>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Ricarica</th>
                <th>Data & Ora</th>
                <th>Deconto ID</th>
                <th>Caffè Accreditati</th>
                <th>Modalità / Operatore</th>
                <th>Token OTP Monouso</th>
              </tr>
            </thead>
            <tbody>
              ${refills.map(r => `
                <tr>
                  <td><code>${r.id}</code></td>
                  <td>${new Date(r.timestamp).toLocaleString('it-IT')}</td>
                  <td><span class="badge badge-info">${r.shortCode}</span></td>
                  <td><strong style="color: var(--accent-green); font-size: 1.1rem;">+${r.creditsAdded} caffè</strong></td>
                  <td>
                    ${r.operatorType === 'ADR' ? '<span class="badge badge-warning">🚚 ADR (BLE sul Posto)</span>' : (r.operatorType === 'CLIENT_DIY' ? '<span class="badge badge-success">📱 Cliente Fai-da-Te (OTP)</span>' : '<span class="badge badge-info">👩‍💻 Ufficio Cloud</span>')}
                  </td>
                  <td><code>${r.tokenOtp}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Vista Gestione Anagrafica Clienti
  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">🏢 Anagrafica Clienti & Parco Macchine</h1>
          <p style="color: var(--text-muted);">
            ${canCreate 
              ? 'Gestione contratti in comodato d\'uso e associazione dispositivi Deconto' 
              : 'Consultazione parco macchine ed anagrafica clienti (Modalità Lettura)'}
          </p>
        </div>
        
        ${canCreate ? `
          <button id="btn-toggle-add-client" class="btn btn-primary">
            ➕ Nuovo Cliente & Macchina
          </button>
        ` : `
          <span class="badge badge-info">👁️ Modalità Solo Lettura</span>
        `}
      </div>

      <!-- Form Nuovo Cliente -->
      ${canCreate ? `
        <div id="add-client-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Registrazione Nuovo Cliente & Scheda Deconto:</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ragione Sociale / Cliente:*</label>
              <input type="text" id="new-cli-name" placeholder="Es. Bar Splendid" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Persona di Riferimento:*</label>
              <input type="text" id="new-cli-ref" placeholder="Es. Marco Rossi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:*</label>
              <input type="text" id="new-cli-phone" placeholder="Es. +39 333 1234567" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Città & Indirizzo:</label>
              <input type="text" id="new-cli-city" placeholder="Es. Milano, Via Torino 5" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Modello Macchina:</label>
              <input type="text" id="new-cli-mc-model" placeholder="Es. Faber Slot Plast 1G" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice Deconto (4 cifre):</label>
              <input type="text" id="new-cli-code" placeholder="Es. 8812" maxlength="4" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Credito Iniziale:</label>
              <input type="number" id="new-cli-credits" value="200" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800;">
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-client" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-client" class="btn btn-primary">💾 Salva Cliente & Assegna Deconto</button>
          </div>
        </div>
      ` : ''}

      <!-- Tabella Clienti (Con Tasto Modifica Completo) -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Cliente / Azienda</th>
              <th>Referente & Contatti</th>
              <th>Città</th>
              <th>Modello Macchina</th>
              <th>Seriale Macchina</th>
              <th>Deconto ID</th>
              <th>Credito Attuale</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            ${clients.map(c => {
              const machine = db.getMachines().find(m => m.clientId === c.id);
              const board = machine ? db.getBoards().find(b => b.machineId === machine.id) : null;

              return `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td>${c.refPerson}<br><small style="color: var(--text-muted);">${c.phone}</small></td>
                  <td>${c.city}</td>
                  <td><strong>${machine ? machine.model : 'N/D'}</strong></td>
                  <td><code>${machine ? machine.serialNumber : 'N/D'}</code></td>
                  <td>${board ? `<span class="badge badge-info">${board.shortCode}</span>` : 'Non Assegnato'}</td>
                  <td>
                    ${board ? `<strong style="color: ${board.remainingCredits > 20 ? 'var(--accent-green)' : 'var(--accent-rose)'}">${board.remainingCredits} caffè</strong>` : 'N/D'}
                  </td>
                  <td>
                    <div style="display: flex; gap: 6px;">
                      ${canEdit ? `
                        <button class="btn btn-secondary btn-edit-client" data-id="${c.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
                        </button>
                      ` : ''}
                      ${canDelete ? `
                        <button class="btn btn-secondary btn-del-client" data-id="${c.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Rimuovi
                        </button>
                      ` : ''}
                      ${!canEdit && !canDelete ? `
                        <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 0.8rem;" disabled>👁️ Lettura</button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ${editClientModalHtml}
  `;
}
