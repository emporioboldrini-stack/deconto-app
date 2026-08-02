import { db } from '../db/database.js';

export function renderSettingsPanel() {
  const settings = db.getSettings();

  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Impostazioni Piattaforma & Personalizzazione Brand</h1>
        <p style="color: var(--text-muted);">Personalizza il logo aziendale, l'intestazione, le soglie automatiche degli stati (Verde, Giallo, Rosso, Nero) ed il servizio email Brevo</p>
      </div>

      <div class="card-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 24px;">
        
        <!-- Card 1: Logo Aziendale & Grafica -->
        <div class="stat-card" style="padding: 24px;">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">🖼️ Logo Aziendale (in alto a sinistra):</h3>
          
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div id="settings-logo-preview" style="width: 72px; height: 72px; border-radius: 16px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-glow);">
              ${settings.customLogoUrl 
                ? `<img src="${settings.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo Aziendale">` 
                : `<span style="font-size: 2.5rem;">☕</span>`}
            </div>

            <div>
              <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">Anteprima Attuale</div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
                ${settings.customLogoUrl ? 'Logo Aziendale Personalizzato Caricato' : 'Icona Predefinita (Caffè ☕)'}
              </div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Carica Immagine Logo dal tuo Computer (PNG, JPG, SVG):</label>
            <input type="file" id="setting-logo-file" accept="image/*" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px;">
          </div>

          <div style="display: flex; gap: 12px;">
            <button id="btn-reset-logo" class="btn btn-secondary" style="flex: 1; padding: 10px;">
              🔄 Ripristina Logo Predefinito
            </button>
          </div>
        </div>

        <!-- Card 2: Titolo & Sottotitolo Brand -->
        <div class="stat-card" style="padding: 24px;">
          <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 16px;">📝 Testo dell'Intestazione & Sottotitolo:</h3>
          
          <form id="settings-brand-form">
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Titolo Principale App:</label>
              <input type="text" id="setting-brand-title" value="${settings.brandTitle || 'DECONTO'}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
            </div>

            <div style="margin-bottom: 24px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Sottotitolo Personalizzato (sotto al Titolo):</label>
              <input type="text" id="setting-brand-subtitle" value="${settings.brandSubtitle || 'IoT Vending System'}" required placeholder="Es. EMPORIO BOLDRINI - VENDING CONTROL" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-cyan); border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-size: 1rem;">
                💾 Salva Impostazioni Brand
              </button>
            </div>
          </form>
        </div>

      </div>

      <!-- Card 3: Soglie Automatiche degli Stati (Verde, Giallo, Rosso, Nero) -->
      <div class="stat-card" style="margin-bottom: 24px; padding: 24px; border: 2px solid var(--accent-purple);">
        <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 12px;">📊 Soglie Automatiche di Avviso (Stati Verde, Giallo, Rosso, Nero):</h3>
        
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          Configura i valori di cialde residui per attivare automaticamente il cambio di colore e stato nei clienti e nelle macchine:
        </p>

        <form id="settings-thresholds-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="background: rgba(245, 158, 11, 0.1); padding: 16px; border-radius: 10px; border: 1px solid rgba(245, 158, 11, 0.3);">
              <label style="font-size: 0.9rem; color: #f59e0b; font-weight: 800; display: block; margin-bottom: 6px;">🟡 Soglia Y (Sottoscorta Giallo):</label>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 10px;">
                Da quest'impostazione in giù le macchine risultano in <strong>Sottoscorta Giallo</strong> (default: $\le$ 20 cialde). Sopra questo valore il Deconto è <strong>🟢 REGOLARE (VERDE)</strong>.
              </div>
              <input type="number" id="setting-threshold-yellow" value="${settings.thresholdYellow !== undefined ? settings.thresholdYellow : 20}" min="1" max="500" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #f59e0b; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
            </div>

            <div style="background: rgba(239, 68, 68, 0.1); padding: 16px; border-radius: 10px; border: 1px solid rgba(239, 68, 68, 0.3);">
              <label style="font-size: 0.9rem; color: #ef4444; font-weight: 800; display: block; margin-bottom: 6px;">🔴 Soglia X (Critico Rosso):</label>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 10px;">
                Da quest'impostazione in giù le macchine risultano in <strong>Critico Rosso</strong> (default: $\le$ 5 cialde). Quando i crediti raggiungono 0 la macchina passa a <strong>⚫ BLOCCATO (NERO)</strong>.
              </div>
              <input type="number" id="setting-threshold-red" value="${settings.thresholdRed !== undefined ? settings.thresholdRed : 5}" min="1" max="100" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #ef4444; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.8rem; color: var(--accent-cyan);">
              🟢 Verde: &gt; Y | 🟡 Giallo: tra X e Y | 🔴 Rosso: tra 1 e X | ⚫ Nero: = 0 (Relè Aperto)
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 10px 24px;">
              💾 Salva Soglie Automatiche
            </button>
          </div>
        </form>
      </div>

      <!-- Card 4: Servizio Email BREVO / Sendinblue -->
      <div class="stat-card" style="padding: 24px; border: 2px solid var(--accent-cyan);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; color: var(--accent-cyan);">✉️ Servizio Email Reale BREVO (ex Sendinblue - brevo.com):</h3>
          <span class="badge badge-info">300 EMAIL/GIORNO GRATIS</span>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          <strong>BREVO (brevo.com)</strong> è il servizio gratuito di invio email transazionali. Offre 300 email gratuite al giorno. Inserisci la tua API Key trovata su <em>brevo.com &rarr; API Keys</em> per attivare l'invio istantaneo.
        </p>

        <form id="settings-brevo-form" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">API Key Brevo (xkeysib-...):</label>
            <input type="password" id="setting-brevo-key" value="${settings.brevoApiKey || ''}" placeholder="xkeysib-xxxxxxxxxxxx" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email Mittente (registrata su Brevo):</label>
            <input type="email" id="setting-brevo-sender" value="${settings.brevoSenderEmail || ''}" placeholder="info@deconto.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">
            💾 Salva Chiavi Brevo
          </button>
        </form>
      </div>

    </div>
  `;
}
