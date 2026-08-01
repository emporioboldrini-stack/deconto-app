import { db } from '../db/database.js';

export function renderHardwareSimulator(selectedBoardCode = null) {
  const boards = db.getBoards();
  const defaultBoard = selectedBoardCode 
    ? (boards.find(b => b.shortCode === selectedBoardCode) || boards[0])
    : boards[0];

  const details = db.getBoardFullDetails(defaultBoard.shortCode);

  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚡ Banco Prova Hardware Deconto (ESP32-C6)</h1>
        <p style="color: var(--text-muted);">Simulatore interattivo del comportamento elettrico, conteggio erogazioni, relè di blocco e allarme buzzer 60s</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        
        <!-- Simulatore Macchina da Caffè & Modulo -->
        <div class="stat-card" style="padding: 28px; background: linear-gradient(135deg, #111827, #1f2937); border: 2px solid var(--border-color);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <span class="badge badge-info" id="sim-badge-code">DECONTO ${defaultBoard.shortCode}</span>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Chip: ESP32-C6 | Modulo Resinato IP67</div>
            </div>
            
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seleziona Macchina / Deconto:</label>
              <select id="sim-board-select" style="padding: 8px 12px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--accent-cyan); border-radius: 6px; font-weight: 700;">
                ${boards.map(b => `<option value="${b.shortCode}" ${b.shortCode === defaultBoard.shortCode ? 'selected' : ''}>Macchina #${b.shortCode} (${b.remainingCredits} caffè)</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Display Credito & Stato Relè -->
          <div style="text-align: center; background: rgba(0,0,0,0.5); padding: 24px; border-radius: 16px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">
              Credito Residuo Memoria RTC/Flash (#${defaultBoard.shortCode}):
            </div>
            
            <div id="sim-credits-display" style="font-size: 3.5rem; font-weight: 900; color: ${defaultBoard.remainingCredits > 20 ? 'var(--accent-green)' : (defaultBoard.remainingCredits > 0 ? 'var(--accent-amber)' : 'var(--accent-rose)')}; margin: 8px 0;">
              ${defaultBoard.remainingCredits}
            </div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Caffè Rimanenti</div>

            <div style="margin-top: 16px; display: flex; justify-content: center; gap: 12px;">
              <span id="sim-relay-badge" class="badge ${defaultBoard.relayStatus === 'CLOSED_OK' ? 'badge-success' : 'badge-danger'}">
                ${defaultBoard.relayStatus === 'CLOSED_OK' ? '🔓 RELÈ CHIUSO (POMPA OK)' : '🔒 RELÈ APERTO (BLOCCO 0)'}
              </span>
              
              <span id="sim-alert-badge" class="badge badge-warning" style="display: ${defaultBoard.remainingCredits < 20 && defaultBoard.remainingCredits > 0 ? 'inline-flex' : 'none'};">
                🔔 BUZZER 60s ATTIVO
              </span>
            </div>
          </div>

          <!-- Tasto Erogazione Elettrica Pompa -->
          <button id="btn-sim-brew" class="btn btn-primary" ${defaultBoard.remainingCredits <= 0 ? 'disabled' : ''} style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 800; border-radius: 12px; margin-bottom: 12px;">
            ☕ EROGA 1 CAFFÈ (Macchina #${defaultBoard.shortCode})
          </button>

          <button id="btn-sim-reset" class="btn btn-secondary" style="width: 100%;">
            🔄 Ricarica Rapida +200 Caffè (Macchina #${defaultBoard.shortCode})
          </button>
        </div>

        <!-- Monitoraggio Segnali Elettrici 230V AC -->
        <div>
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">
            📊 Stato Segnali Elettrici 4 Fili (230V AC)
          </h3>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Filo / Segnale</th>
                  <th>Tensione</th>
                  <th>Stato Circuito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🔴 <strong>Rosso (Fase L)</strong></td>
                  <td>230V AC</td>
                  <td><span class="badge badge-success">⚡ ALIMENTATO</span></td>
                </tr>
                <tr>
                  <td>🔵 <strong>Blu (Neutro N)</strong></td>
                  <td>0V AC (Comune)</td>
                  <td><span class="badge badge-info">✓ CONNESSO</span></td>
                </tr>
                <tr>
                  <td>🟤 <strong>Marrone (Sense In)</strong></td>
                  <td id="signal-sense-volts">0V AC</td>
                  <td><span id="signal-sense-badge" class="badge badge-info">INATTIVO</span></td>
                </tr>
                <tr>
                  <td>⬛ <strong>Nero (Relè Out Pompa)</strong></td>
                  <td id="signal-pump-volts">${defaultBoard.relayStatus === 'CLOSED_OK' ? '230V AC' : '0V AC (Disattivato)'}</td>
                  <td>
                    <span id="signal-pump-badge" class="badge ${defaultBoard.relayStatus === 'CLOSED_OK' ? 'badge-success' : 'badge-danger'}">
                      ${defaultBoard.relayStatus === 'CLOSED_OK' ? 'PRONTO' : 'BLOCCATO'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Log Eventi Hardware Live -->
          <div style="margin-top: 24px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px;">
              📟 Console Eventi Firmware ESP32-C6:
            </div>
            <div id="sim-console-log" style="font-family: monospace; font-size: 0.8rem; background: #000; color: #34d399; padding: 12px; border-radius: 6px; height: 120px; overflow-y: auto;">
              [SYSTEM]: ESP32-C6 Firmware v2.1.0 Inizializzato per Scheda #${defaultBoard.shortCode}.<br>
              [HARDWARE]: Relè di blocco impostato su ${defaultBoard.relayStatus}.<br>
              [MEMORY]: Memoria Flash sincronizzata con Master Store.<br>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}
