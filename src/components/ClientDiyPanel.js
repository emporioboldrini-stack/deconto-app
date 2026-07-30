import { db } from '../db/database.js';

export function renderClientDiyPanel() {
  return `
    <div style="max-width: 500px; margin: 0 auto; text-align: center;">
      
      <!-- Card Simulata Pagina WhatsApp Link -->
      <div style="background: linear-gradient(135deg, #111827, #1f2937); border: 2px solid var(--accent-cyan); border-radius: 24px; padding: 36px 24px; box-shadow: var(--shadow-card); position: relative;">
        
        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px auto; box-shadow: var(--shadow-glow);">
          ☕
        </div>

        <span class="badge badge-info" style="margin-bottom: 12px; padding: 6px 14px;">RICARICA FAI-DA-TE DECONTO</span>
        
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
          Ricarica la tua Macchina da Caffè
        </h2>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;">
          Spedizione Cialde Ricevuta! Avvicinati alla macchina e tocca il pulsante sottostante.
        </p>

        <!-- Dettagli Ricarica -->
        <div style="background: rgba(0,0,0,0.4); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle); margin-bottom: 24px; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Cliente:</span>
            <strong style="color: #fff;">Studio Legale Brambilla</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Codice Deconto:</span>
            <span class="badge badge-info">3467</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Token OTP:</span>
            <code style="color: var(--accent-amber);">OTP-9981-X79K2</code>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 8px;">
            <span style="color: var(--text-muted); font-size: 0.9rem;">Caffè da Ricaricare:</span>
            <strong style="color: var(--accent-green); font-size: 1.2rem;">+ 200 CAFFÈ</strong>
          </div>
        </div>

        <!-- Tasto Unico per Cliente Inesperto -->
        <button id="btn-client-diy-refill" class="btn btn-primary" style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 800; border-radius: 14px; background: linear-gradient(135deg, var(--accent-green), #059669); box-shadow: 0 8px 20px rgba(52, 211, 153, 0.4);">
          ✨ ACCREDITA 200 CAFFÈ ORA
        </button>

        <div id="diy-status-msg" style="margin-top: 20px; font-size: 0.9rem; min-height: 40px; display: flex; align-items: center; justify-content: center;">
          <span style="color: var(--text-dim);">Assicurati che il Bluetooth del tuo smartphone sia attivo.</span>
        </div>

      </div>

    </div>
  `;
}
