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
        <p style="color: var(--text-muted); margin: 0;">Associa un cliente, una macchina e un Deconto per generare l'etichetta adesiva fisica 70x70mm con QR Code di ricarica.</p>
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
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 20px; font-weight: 800;">👁️ Anteprima Etichetta Termica (70 x 70 mm)</h3>
        
        <div style="display: flex; justify-content: center; margin-bottom: 20px; background: rgba(0,0,0,0.4); padding: 30px; border-radius: 12px; border: 1px solid var(--border-subtle);">
          
          <!-- L'Etichetta Fisica Reale (Design 70x70mm con linea con pallini, senza bordo esterno in stampa) -->
          <div id="printable-qr-label" style="width: 70mm; height: 70mm; border: 1px dashed #ccc; padding: 4mm; display: flex; flex-direction: column; justify-content: space-between; background: #fff; color: #000; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            
            <!-- Parte Superiore: Intestazione -->
            <div style="text-align: center; padding-top: 1mm; padding-bottom: 1mm;">
              <div style="font-size: 11pt; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; color: #000; line-height: 1.2;">Emporio Boldrini</div>
              <div style="font-size: 7.5pt; letter-spacing: 0.8px; color: #444; font-weight: 600; text-transform: uppercase; margin-top: 1mm; line-height: 1.2;">www.emporioboldrini.com</div>
            </div>

            <!-- Prima Linea Divisoria: Linea Nera con 2 Pallini ai lati -->
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin: 1mm 0;">
              <div style="width: 3.5px; height: 3.5px; border-radius: 50%; border: 1.8px solid #000; box-sizing: border-box; background: #000; flex-shrink: 0;"></div>
              <div style="flex: 1; border-top: 1px solid #000; height: 0;"></div>
              <div style="width: 3.5px; height: 3.5px; border-radius: 50%; border: 1.8px solid #000; box-sizing: border-box; background: #000; flex-shrink: 0;"></div>
            </div>

            <!-- Parte Centrale: 2 Colonne (Dati a sinistra, QR Code a destra) -->
            <div style="display: flex; align-items: center; justify-content: space-between; height: 30mm; padding: 1mm 0;">
              <!-- Colonna Sinistra: Codici Seriali -->
              <div style="flex: 1.2; display: flex; flex-direction: column; gap: 3.5mm; justify-content: center; padding-right: 2mm; text-align: left;">
                <div style="font-size: 7.5pt; line-height: 1.3; color: #000; font-weight: 700;">
                  <span style="display: block; font-size: 6.5pt; text-transform: uppercase; color: #555; font-weight: 800; letter-spacing: 0.2px; margin-bottom: 0.5mm;">S/N Macchina:</span>
                  <span style="font-family: monospace; font-size: 9.5pt; font-weight: 800;">${machineSerial || 'N/D'}</span>
                </div>
                <div style="font-size: 7.5pt; line-height: 1.3; color: #000; font-weight: 700;">
                  <span style="display: block; font-size: 6.5pt; text-transform: uppercase; color: #555; font-weight: 800; letter-spacing: 0.2px; margin-bottom: 0.5mm;">S/N Deconto:</span>
                  <span style="font-family: monospace; font-size: 10.5pt; font-weight: 800; color: #000;">#${selectedBoardShortCode || 'N/D'}</span>
                </div>
              </div>
              
              <!-- Colonna Destra: QR Code -->
              <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
                ${qrCodeUrl 
                  ? `<img src="${qrCodeUrl}" style="width: 25mm; height: 25mm; object-fit: contain;" alt="QR Code">` 
                  : `<div style="width: 25mm; height: 25mm; border: 0.8px dashed #aaa; display: flex; align-items: center; justify-content: center; font-size: 6.5pt; color: #aaa;">QR CODE</div>`}
              </div>
            </div>

            <!-- Seconda Linea Divisoria: Linea Nera con 2 Pallini ai lati -->
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin: 1mm 0;">
              <div style="width: 3.5px; height: 3.5px; border-radius: 50%; border: 1.8px solid #000; box-sizing: border-box; background: #000; flex-shrink: 0;"></div>
              <div style="flex: 1; border-top: 1px solid #000; height: 0;"></div>
              <div style="width: 3.5px; height: 3.5px; border-radius: 50%; border: 1.8px solid #000; box-sizing: border-box; background: #000; flex-shrink: 0;"></div>
            </div>

            <!-- Parte Inferiore: Testo in Comodato -->
            <div style="text-align: center; padding-top: 1mm; padding-bottom: 1.5mm;">
              <div style="font-size: 6.8pt; font-weight: 800; letter-spacing: 0.4px; text-transform: uppercase; color: #000; line-height: 1.25;">
                MACCHINA CONCESSA IN COMODATO GRATUITO
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
