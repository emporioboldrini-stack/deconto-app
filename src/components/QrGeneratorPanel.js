import { db } from '../db/database.js';

export function renderQrGeneratorPanel(qrParams = {}) {
  const clients = db.getClients();
  const boards = db.getBoards();
  const machines = db.getMachines();

  const selectedClientId = qrParams.clientId || '';
  const selectedMachineId = qrParams.machineId || '';
  const selectedBoardShortCode = qrParams.boardShortCode || '';

  // Trova dettagli per l'anteprima
  const client = clients.find(c => c.id === selectedClientId);
  const machine = machines.find(m => m.id === selectedMachineId);
  
  const clientName = client ? client.name : '';
  const machineSerial = machine ? machine.serialNumber : '';

  // Genera URL per il QR Code
  let qrCodeUrl = '';
  let qrLinkData = '';
  if (qrParams.isGenerated && selectedBoardShortCode) {
    qrLinkData = `${window.location.origin}/?tab=client_diy&board=${selectedBoardShortCode}&clientName=${encodeURIComponent(clientName || 'Cliente')}`;
    qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrLinkData)}&ecc=M&margin=1`;
  }

  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0 0 8px 0;">🖨️ Generatore & Stampa Etichette QR</h1>
        <p style="color: var(--text-muted); margin: 0;">Associa un cliente, una macchina e un Deconto per generare l'etichetta adesiva fisica 50x35mm con QR Code di ricarica.</p>
      </div>

      <div class="stat-card" style="padding: 28px; border: 1px solid var(--border-subtle); margin-bottom: 32px; background: rgba(0,0,0,0.2);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 20px; font-weight: 800;">⚙️ Associazione Hardware & Cliente</h3>
        
        <!-- Dropdown Cascata Collegati -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">🏢 1. Cliente:*</label>
            <select id="qr-client-select" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">-- Scegli Cliente --</option>
              ${clients.map(c => `<option value="${c.id}" ${c.id === selectedClientId ? 'selected' : ''}>${c.name} (${c.city})</option>`).join('')}
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">☕ 2. Macchina da Caffè:*</label>
            <select id="qr-machine-select" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">-- Scegli Macchina --</option>
              ${machines.map(m => {
                const owner = clients.find(c => c.id === m.clientId);
                return `<option value="${m.id}" ${m.id === selectedMachineId ? 'selected' : ''}>${m.serialNumber} - ${m.model} ${owner ? `(${owner.name})` : '(Libera)'}</option>`;
              }).join('')}
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 6px; font-weight: 700;">📟 3. Scheda Deconto:*</label>
            <select id="qr-board-select" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">-- Scegli Deconto --</option>
              ${boards.map(b => {
                const mc = machines.find(m => m.id === b.machineId);
                const owner = mc ? clients.find(c => c.id === mc.clientId) : null;
                return `<option value="${b.shortCode}" ${b.shortCode === selectedBoardShortCode ? 'selected' : ''}>Deconto #${b.shortCode} (${b.remainingCredits} cr) ${owner ? `[${owner.name}]` : ''}</option>`;
              }).join('')}
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
          <button id="btn-generate-qr-label" class="btn btn-primary" style="padding: 12px 24px; font-size: 0.9rem; font-weight: 800; border-radius: 8px;">
            ⚡ GENERA ETICHETTA
          </button>
          <button id="btn-print-qr-label" class="btn btn-secondary" ${qrParams.isGenerated ? '' : 'disabled'} style="padding: 12px 24px; font-size: 0.9rem; font-weight: 800; border-radius: 8px; color: ${qrParams.isGenerated ? 'var(--accent-cyan)' : 'var(--text-muted)'}; border-color: ${qrParams.isGenerated ? 'var(--accent-cyan)' : 'var(--border-color)'};">
            🖨️ STAMPA ETICHETTA
          </button>
        </div>
      </div>

      <!-- Area di Anteprima Etichetta (mostrata solo se generata) -->
      <div id="qr-preview-container" class="stat-card" style="padding: 28px; border: 2px solid var(--accent-cyan); display: ${qrParams.isGenerated ? 'block' : 'none'}; background: rgba(56, 189, 248, 0.03);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 20px; font-weight: 800;">👁️ Anteprima Etichetta Termica (50 x 35 mm)</h3>
        
        <div style="display: flex; justify-content: center; margin-bottom: 20px; background: rgba(0,0,0,0.4); padding: 30px; border-radius: 12px; border: 1px solid var(--border-subtle);">
          
          <!-- L'Etichetta Fisica Reale (Ottimizzata ad Alto Contrasto per Stampa Termica 50x35mm) -->
          <div id="printable-qr-label" style="width: 50mm; height: 35mm; border: 1px dashed #000; padding: 2mm; display: flex; flex-direction: column; justify-content: space-between; background: #fff; color: #000; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center;">
            
            <!-- Righe 1 e 2: Intestazione ad alto contrasto -->
            <div style="line-height: 1.15;">
              <div style="font-size: 4.8pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.3px;">Macchina in comodato gratuito da:</div>
              <div style="font-size: 7.5pt; font-weight: 900; color: #000; letter-spacing: 0.4px; border: 1.5px solid #000; display: inline-block; padding: 1px 6px; margin-top: 2px; text-transform: uppercase;">WWW.EMPORIOBOLDRINI.COM</div>
            </div>

            <!-- Riga 3: QR Code Centrale (Ingrandito a 18mm per massima scannabilità) -->
            <div style="display: flex; justify-content: center; align-items: center; height: 18mm; margin: 0.5mm 0;">
              ${qrCodeUrl 
                ? `<img src="${qrCodeUrl}" style="width: 18mm; height: 18mm; object-fit: contain;" alt="QR Code">` 
                : `<div style="width: 18mm; height: 18mm; border: 1.5px solid #000; display: flex; align-items: center; justify-content: center; font-size: 6pt; font-weight: bold;">QR N/D</div>`}
            </div>

            <!-- Righe 4 e 5: Seriali disposti Side-by-Side per ottimizzare lo spazio -->
            <div style="font-size: 6pt; border-top: 1.5px solid #000; padding-top: 0.8mm; line-height: 1.2; display: flex; justify-content: space-between; width: 100%;">
              <div style="text-align: left;">
                <span style="text-transform: uppercase; font-size: 4.5pt; color: #444; display: block; font-weight: 800; letter-spacing: 0.1px;">Seriale Macchina</span>
                <strong style="font-family: monospace; font-size: 6.5pt; font-weight: 900; color: #000;">${machineSerial || 'N/D'}</strong>
              </div>
              <div style="text-align: right; border-left: 1px solid #000; padding-left: 2mm;">
                <span style="text-transform: uppercase; font-size: 4.5pt; color: #444; display: block; font-weight: 800; letter-spacing: 0.1px;">Seriale Deconto</span>
                <strong style="font-family: monospace; font-size: 7pt; font-weight: 900; color: #000;">#${selectedBoardShortCode || 'N/D'}</strong>
              </div>
            </div>

          </div>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
          <strong>ℹ️ Informazioni Codificate nel QR:</strong><br>
          <code style="font-size: 0.78rem; color: var(--accent-amber); word-break: break-all;">${qrLinkData || ''}</code>
        </div>
      </div>
    </div>
  `;
}
