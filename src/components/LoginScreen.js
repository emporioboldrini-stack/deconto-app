import { db } from '../db/database.js';

export function renderLoginScreen(onLoginSuccess) {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1f2937, #090d16); padding: 20px;">
      
      <div style="max-width: 440px; width: 100%; background: rgba(31, 41, 55, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 16px auto; box-shadow: var(--shadow-glow);">
            ☕
          </div>
          
          <h1 style="font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            DECONTO IoT System
          </h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            Accesso Riservato agli Operatori Autorizzati
          </p>
        </div>

        <form id="login-form">
          <div style="margin-bottom: 20px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Nome Utente (Username):
            </label>
            <input type="text" id="login-username" placeholder="Es. 001" value="001" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Password:
            </label>
            <input type="password" id="login-password" placeholder="••••••" value="123456" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div id="login-error-msg" style="color: var(--accent-rose); font-size: 0.85rem; margin-bottom: 16px; display: none; text-align: center; font-weight: 600;">
            <!-- Messaggio Errore -->
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 800; border-radius: 10px; margin-bottom: 24px;">
            🔐 ACCEDI ALLA PIATTAFORMA
          </button>
        </form>

        <!-- Scorciatoie Demo Rapide -->
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 20px;">
          <div style="font-size: 0.75rem; color: var(--text-dim); text-align: center; text-transform: uppercase; font-weight: 700; margin-bottom: 12px;">
            Credenziali Predefinite di Prova:
          </div>
          
          <div style="display: flex; gap: 8px; justify-content: center;">
            <button class="btn btn-secondary btn-demo-auth" data-user="001" data-pass="123456" style="padding: 6px 10px; font-size: 0.75rem;">
              👨‍💼 Admin (001)
            </button>
            <button class="btn btn-secondary btn-demo-auth" data-user="002" data-pass="123456" style="padding: 6px 10px; font-size: 0.75rem;">
              👩‍💻 Ufficio (002)
            </button>
            <button class="btn btn-secondary btn-demo-auth" data-user="003" data-pass="123456" style="padding: 6px 10px; font-size: 0.75rem;">
              🚚 ADR (003)
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}
