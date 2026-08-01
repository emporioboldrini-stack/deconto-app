import { db } from '../db/database.js';

export function renderSettingsPanel() {
  const settings = db.getSettings();

  const gasScriptSnippet = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    MailApp.sendEmail({
      to: data.to,
      subject: data.subject,
      htmlBody: data.htmlBody,
      body: data.body || "Messaggio Notifica DECONTO IoT System"
    });
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Impostazioni Piattaforma & Personalizzazione Brand</h1>
        <p style="color: var(--text-muted);">Personalizza il logo aziendale, l'intestazione ed il servizio notifica email reale via Google Apps Script (GAS)</p>
      </div>

      <div class="card-grid" style="grid-template-columns: 1fr 1fr;">
        
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

      <!-- Card 3: Servizio Notifiche Email Reali (Google Apps Script - GAS) -->
      <div class="stat-card" style="margin-top: 24px; padding: 24px; border: 1px solid var(--accent-green);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; color: var(--accent-green);">✉️ Servizio Notifiche Email Reali Gratuito (Google Apps Script - GAS):</h3>
          <span class="badge badge-success">100% GRATUITO E SENZA LIMITI</span>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          Utilizzando <strong>Google Apps Script (GAS)</strong> come nella conversazione GAS SOMS, l'app invierà email reali direttamente dal tuo account Google/Gmail a qualsiasi indirizzo senza registrare carte o servizi a pagamento.
        </p>

        <form id="settings-gas-form" style="margin-bottom: 20px;">
          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">
              URL Endpoint Web App Google Apps Script (es. https://script.google.com/macros/s/AKfycb.../exec):
            </label>
            <div style="display: flex; gap: 12px;">
              <input type="url" id="setting-gas-url" value="${settings.gasScriptUrl || ''}" placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" style="flex: 1; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; font-family: monospace;">
              <button type="submit" class="btn btn-success" style="padding: 12px 24px;">
                💾 Salva URL GAS
              </button>
            </div>
          </div>
        </form>

        <!-- Istruzioni d'uso Google Apps Script -->
        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--accent-green); padding: 16px; border-radius: 6px;">
          <h4 style="margin-top: 0; color: var(--accent-green); font-size: 0.95rem;">📋 Istruzioni Rapide per Creare lo Script Google Gratis:</h4>
          <ol style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 12px; padding-left: 20px; line-height: 1.6;">
            <li>Vai su <a href="https://script.google.com" target="_blank" style="color: var(--accent-cyan); font-weight: 700;">script.google.com</a> ed avvia un <strong>Nuovo Progetto</strong>.</li>
            <li>Incolla il seguente codice di invio email nel file <code>Codice.gs</code>:</li>
          </ol>

          <pre style="background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 6px; font-size: 0.8rem; font-family: monospace; overflow-x: auto; border: 1px solid var(--border-subtle); margin-bottom: 12px;">${gasScriptSnippet}</pre>

          <div style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
            3. Clicca su <strong>Esegui Deploy</strong> &rarr; <strong>Nuova Distribuzione</strong> &rarr; Seleziona tipo <em>"Web App"</em>.<br>
            4. Imposta <strong>Chi ha accesso</strong> su <em>"Chiunque" (Anyone)</em> e distribuisci.<br>
            5. Copia l'URL Web prodotto ed incollalo nel box sopra per attivare l'invio reale istantaneo!
          </div>
        </div>

      </div>
    </div>
  `;
}
