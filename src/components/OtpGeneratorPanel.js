import { db } from '../db/database.js';

export function renderOtpGeneratorPanel(generatedLink = null, generatedOtp = null) {
  const clients = db.getClients();
  const boards = db.getBoards();

  // Trova le schede associate a macchine installate per facilitare l'associazione
  const activeBoards = boards.filter(b => b.machineId);

  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0 0 8px 0;">🔑 Generatore OTP WhatsApp & Link Ricarica</h1>
        <p style="color: var(--text-muted); margin: 0;">Genera codici OTP e link di accreditamento fai-da-te da inviare ai clienti via WhatsApp.</p>
      </div>

      <div class="stat-card" style="padding: 28px; border: 1px solid var(--border-subtle); margin-bottom: 32px; background: rgba(0,0,0,0.2);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 20px; font-weight: 800;">⚙️ Configura Ricarica Fai-da-Te</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">🏢 Seleziona Cliente:*</label>
            <select id="otp-client-select" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">-- Scegli un Cliente --</option>
              ${clients.map(c => `<option value="${c.id}">${c.name} (${c.city})</option>`).join('')}
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">📟 Seleziona Scheda Deconto:*</label>
            <select id="otp-board-select" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">-- Scegli una Scheda --</option>
              ${activeBoards.map(b => {
                const mc = db.getMachines().find(m => m.id === b.machineId);
                const owner = mc ? clients.find(c => c.id === mc.clientId) : null;
                return `<option value="${b.shortCode}">📟 Deconto #${b.shortCode} ${owner ? `(${owner.name})` : ''}</option>`;
              }).join('')}
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">☕ Quantità Caffè da Ricaricare:*</label>
            <select id="otp-credits-input" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="50">+50 Caffè</option>
              <option value="100">+100 Caffè</option>
              <option value="200" selected>+200 Caffè</option>
              <option value="500">+500 Caffè</option>
              <option value="1000">+1000 Caffè</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">⏳ Scadenza Link OTP (Default 1 mese):</label>
            <input type="date" id="otp-expiry-input" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button id="btn-generate-otp-link" class="btn btn-primary" style="padding: 14px 28px; font-size: 1rem; font-weight: 800; border-radius: 10px;">
            ⚡ Genera Token & Link WhatsApp
          </button>
        </div>
      </div>

      <!-- Area Risultato Generazione (mostrata solo se generato) -->
      <div id="otp-result-container" class="stat-card" style="padding: 28px; border: 2px solid var(--accent-cyan); display: ${generatedLink ? 'block' : 'none'}; background: rgba(56, 189, 248, 0.05);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px; font-weight: 800;">✅ Link di Ricarica Pronto</h3>
        
        <div style="margin-bottom: 20px;">
          <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">Token OTP Generato:</label>
          <div style="display: flex; gap: 10px; align-items: center;">
            <code style="font-size: 1.3rem; color: var(--accent-amber); font-weight: 800; background: rgba(0,0,0,0.3); padding: 8px 16px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.3);">
              ${generatedOtp || ''}
            </code>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">URL da inviare al cliente:</label>
          <textarea id="generated-otp-url" readonly style="width: 100%; height: 80px; padding: 12px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); border-radius: 8px; color: var(--accent-cyan); font-family: monospace; font-size: 0.85rem; resize: none; margin-bottom: 12px;">${generatedLink || ''}</textarea>
          
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button id="btn-copy-otp-link" class="btn btn-secondary" style="flex: 1; padding: 12px; font-weight: 700;">
              📋 Copia Link
            </button>
            <a id="btn-whatsapp-otp-send" target="_blank" class="btn btn-primary" style="flex: 1; padding: 12px; font-weight: 700; text-align: center; text-decoration: none; background: #25d366; border-color: #25d366; display: flex; align-items: center; justify-content: center; gap: 8px;">
              💬 Invia via WhatsApp
            </a>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 20px; text-align: center;">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">🧪 Vuoi testare il funzionamento lato cliente su questo browser?</p>
          <button id="btn-test-otp-link" class="btn btn-secondary" style="color: var(--accent-green); border-color: rgba(34, 197, 94, 0.4); background: rgba(34, 197, 94, 0.05); padding: 12px 24px; font-weight: 800;">
            🚀 Test Link (Simula Interfaccia Cliente)
          </button>
        </div>
      </div>
    </div>
  `;
}
