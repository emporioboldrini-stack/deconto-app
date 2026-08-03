import { db } from '../db/database.js';

export function renderLoginScreen() {
  const settings = db.getSettings();

  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1f2937, #090d16); padding: 20px; flex-wrap: wrap; gap: 30px;">
      
      <!-- Card Login -->
      <div style="max-width: 440px; width: 100%; background: rgba(31, 41, 55, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        
        <div style="text-align: center; margin-bottom: 32px;">
          <!-- Logo Personalizzato o Predefinito -->
          <div style="width: 72px; height: 72px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); border-radius: 20px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0 auto 16px auto; box-shadow: var(--shadow-glow);">
            ${settings.customLogoUrl 
              ? `<img src="${settings.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo App">` 
              : `<span style="font-size: 2.5rem;">☕</span>`}
          </div>
          
          <!-- Titolo & Sottotitolo Personalizzabili dalle Impostazioni -->
          <h1 style="font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${settings.brandTitle || 'DECONTO'}
          </h1>
          <p style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; margin-top: 4px;">
            ${settings.brandSubtitle || 'IoT Vending System'}
          </p>
        </div>

        <form id="login-form">
          <div style="margin-bottom: 20px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Codice Accesso / Nome Utente:
            </label>
            <input type="text" id="login-username" placeholder="Inserisci il tuo codice..." value="" autocomplete="username" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Password:
            </label>
            <input type="password" id="login-password" placeholder="••••••" value="" autocomplete="current-password" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div id="login-error-msg" style="color: var(--accent-rose); font-size: 0.85rem; margin-bottom: 16px; display: none; text-align: center; font-weight: 600;">
            <!-- Messaggio Errore -->
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 800; border-radius: 10px;">
            🔐 ACCEDI ALLA PIATTAFORMA
          </button>
        </form>

      </div>

      <!-- Card Documentazione Tecnica (Provvisoria a lato) -->
      <div style="max-width: 440px; width: 100%; background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); min-height: 422px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <div style="margin-bottom: 28px;">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">🛠️</span>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 8px;">Documentazione Hardware</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 300px; margin: 0 auto;">Specifiche di cablaggio e report di progettazione elettronica del modulo Deconto BASIC.</p>
        </div>

        <div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
          <a href="./deconto_scheda_tecnica_hardware.html" target="_blank" style="display: block; width: 100%; padding: 14px; font-size: 0.95rem; font-weight: 800; border-radius: 10px; background: rgba(56, 189, 248, 0.1); border: 1px solid var(--accent-blue); color: var(--accent-blue); text-decoration: none; transition: background 0.2s;">
            📑 SCHEDA TECNICA HARDWARE
          </a>
          <a href="./pcb_design_report.html" target="_blank" style="display: block; width: 100%; padding: 14px; font-size: 0.95rem; font-weight: 800; border-radius: 10px; background: rgba(52, 211, 153, 0.1); border: 1px solid var(--accent-green); color: var(--accent-green); text-decoration: none; transition: background 0.2s;">
            🔬 REPORT PROGETTAZIONE PCB
          </a>
        </div>
      </div>

    </div>
  `;
}
