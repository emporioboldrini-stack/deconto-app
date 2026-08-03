import { db } from '../db/database.js';

export function renderClientDiyPanel(params = null) {
  // Fallback a dati predefiniti di test se non ci sono parametri
  const clientName = params ? params.clientName : "Studio Legale Brambilla";
  const boardShortCode = params ? params.boardShortCode : "3467";
  const tokenOtp = params ? params.tokenOtp : "OTP-9981-X79K2";
  const credits = params ? parseInt(params.credits, 10) : 200;
  const isSuccess = params ? !!params.success : false;

  return `
    <div style="max-width: 500px; margin: 0 auto; text-align: center;">
      
      <!-- Card Simulata Pagina WhatsApp Link -->
      <div style="background: linear-gradient(135deg, #111827, #1f2937); border: 2px solid ${isSuccess ? 'var(--accent-green)' : 'var(--accent-cyan)'}; border-radius: 24px; padding: 36px 24px; box-shadow: var(--shadow-card); position: relative;">
        
        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, ${isSuccess ? 'var(--accent-green)' : 'var(--accent-cyan)'}, var(--accent-purple)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px auto; box-shadow: var(--shadow-glow);">
          ${isSuccess ? '✅' : '☕'}
        </div>

        <span class="badge ${isSuccess ? 'badge-success' : 'badge-info'}" style="margin-bottom: 12px; padding: 6px 14px;">
          ${isSuccess ? 'RICARICA COMPLETATA' : 'RICARICA FAI-DA-TE DECONTO'}
        </span>
        
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
          ${isSuccess ? 'Crediti Accreditati!' : 'Ricarica la tua Macchina da Caffè'}
        </h2>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;">
          ${isSuccess 
            ? 'La macchina da caffè è stata ricaricata con successo. Buona pausa caffè!' 
            : 'Spedizione Cialde Ricevuta! Avvicinati alla macchina e tocca il pulsante sottostante.'}
        </p>

        <!-- Dettagli Ricarica -->
        <div style="background: rgba(0,0,0,0.4); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle); margin-bottom: 24px; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Cliente:</span>
            <strong style="color: #fff;">${clientName}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Codice Deconto:</span>
            <span class="badge badge-info">${boardShortCode}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Token OTP:</span>
            <code style="color: var(--accent-amber);">${tokenOtp}</code>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 8px;">
            <span style="color: var(--text-muted); font-size: 0.9rem;">Caffè da Ricaricare:</span>
            <strong style="color: ${credits >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)'}; font-size: 1.2rem;">${credits >= 0 ? '+' : ''}${credits} CAFFÈ</strong>
          </div>
        </div>

        ${isSuccess ? `
          <div style="padding: 14px; background: rgba(34, 197, 94, 0.1); border: 1px solid var(--accent-green); border-radius: 10px; color: #fff; font-weight: 700; margin-bottom: 12px;">
            🎉 Sincronizzazione Bluetooth Completata!
          </div>
          <button id="btn-back-to-office-from-diy" class="btn btn-secondary" style="width: 100%; padding: 14px; font-weight: 700;">
            Torna alla Dashboard
          </button>
        ` : `
          <!-- Tasto Unico per Cliente Inesperto -->
          <button id="btn-client-diy-refill" 
            data-board="${boardShortCode}" 
            data-credits="${credits}" 
            data-otp="${tokenOtp}" 
            class="btn btn-primary" style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 800; border-radius: 14px; background: linear-gradient(135deg, ${credits >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)'}, ${credits >= 0 ? '#059669' : '#b91c1c'}); box-shadow: 0 8px 20px ${credits >= 0 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(239, 68, 68, 0.4)'};">
            ✨ ${credits >= 0 ? 'ACCREDITA' : 'DECREMENTA'} ${Math.abs(credits)} CAFFÈ ORA
          </button>

          <div id="diy-status-msg" style="margin-top: 20px; font-size: 0.9rem; min-height: 40px; display: flex; align-items: center; justify-content: center;">
            <span style="color: var(--text-dim);">Assicurati che il Bluetooth del tuo smartphone sia attivo.</span>
          </div>
        `}

      </div>

    </div>
  `;
}
