import { db } from '../db/database.js';

/**
 * DECONTO IoT System - Servizio Spedizione Email Reali (Brevo API)
 * 
 * Invia email reali ai dipendenti tramite Brevo.com (ex Sendinblue API REST).
 * Offre 300 email gratuite al giorno senza script o configurazioni esterne complesse.
 */

class EmailService {
  constructor() {
    this.brevoApiEndpoint = 'https://api.brevo.com/v3/smtp/email';
  }

  /**
   * Spedisce un'email reale tramite Brevo REST API
   */
  async sendEmail({ to, recipientName, subject, htmlContent, plainText }) {
    const settings = db.getSettings();
    const brevoApiKey = settings.brevoApiKey || '';
    const brevoSenderEmail = settings.brevoSenderEmail || 'info@deconto.it';
    const brandTitle = settings.brandTitle || 'DECONTO';

    // Registra sempre l'email inviata nel registro interno per il backup/inspector dell'amministratore
    const emailRecord = {
      id: 'eml_' + Date.now(),
      to,
      recipientName,
      subject,
      htmlContent,
      plainText,
      timestamp: new Date().toISOString(),
      status: 'SENT',
      provider: brevoApiKey ? 'BREVO_API' : 'OUTBOX_MAILTO'
    };

    if (!db.data.emailLogs) db.data.emailLogs = [];
    db.data.emailLogs.unshift(emailRecord);
    db.saveData();

    // Invio Reale Diretto tramite API Brevo (brevo.com)
    if (brevoApiKey) {
      try {
        const response = await fetch(this.brevoApiEndpoint, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: {
              name: `${brandTitle} IoT System`,
              email: brevoSenderEmail
            },
            to: [
              {
                email: to,
                name: recipientName || to
              }
            ],
            subject: subject,
            htmlContent: htmlContent
          })
        });

        if (response.ok) {
          console.log(`✅ [BREVO EMAIL SENT]: Email spedita con successo a ${to}`);
          emailRecord.status = 'DELIVERED_BREVO';
          db.saveData();
          return { success: true, provider: 'BREVO', record: emailRecord };
        } else {
          const errText = await response.text();
          console.warn(`⚠️ [BREVO API ERROR]: ${errText}`);
          emailRecord.status = 'FAILED_BREVO';
          db.saveData();
        }
      } catch (err) {
        console.error(`❌ [BREVO NETWORK ERROR]: ${err.message}`);
        emailRecord.status = 'ERROR_NETWORK';
        db.saveData();
      }
    }

    return { success: true, provider: 'OUTBOX_INSPECTOR', record: emailRecord };
  }

  /**
   * Template Email 1: Benvenuto Nuovo Dipendente
   */
  async sendWelcomeEmail(user) {
    const settings = db.getSettings();
    const roleLabels = db.getRoleLabels();
    const roleName = roleLabels[user.role] || user.role;
    const brandTitle = settings.brandTitle || 'DECONTO';

    const subject = `🎉 Benvenuto nel team ${brandTitle}! Il tuo account è attivo`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .card { background: #1e293b; border-radius: 12px; padding: 30px; border: 1px solid #334155; max-width: 600px; margin: auto; }
          .header { text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 2.2rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; }
          .sub { color: #94a3b8; font-size: 0.9rem; }
          .highlight { background: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .btn { display: inline-block; background: #38bdf8; color: #0f172a; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="logo">☕ ${brandTitle}</div>
            <div class="sub">${settings.brandSubtitle || 'IoT Vending System'}</div>
          </div>
          <h2>Ciao ${user.name}! 👋</h2>
          <p>Ti diamo un caloroso benvenuto nel nostro team e sul nuovo progetto della piattaforma <strong>${brandTitle}</strong>.</p>
          
          <div class="highlight">
            <h3 style="margin-top:0; color:#38bdf8;">📋 Le tue Credenziali di Accesso:</h3>
            <div>• <strong>Codice Utente:</strong> <code>${user.username}</code></div>
            <div>• <strong>Password Temporanea:</strong> <code>${user.password}</code></div>
            <div>• <strong>Ruolo Assegnato:</strong> <span style="color:#34d399; font-weight:bold;">${roleName}</span></div>
          </div>

          <p>Con questo account potrai accedere direttamente al sistema di gestione distributori e telemetria.</p>
          
          <div style="text-align: center;">
            <a href="https://deconto-app.web.app" class="btn">🚀 Accedi Subito alla Piattaforma</a>
          </div>

          <div class="footer">
            Email automatica inviata da ${brandTitle} System.<br>Non rispondere a questa mail.
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: user.email,
      recipientName: user.name,
      subject,
      htmlContent,
      plainText: `Benvenuto ${user.name}! Il tuo username è ${user.username} ed il tuo ruolo è ${roleName}. Accedi su https://deconto-app.web.app`
    });
  }

  /**
   * Template Email 2: Notifica Cambio Ruolo / Promozione
   */
  async sendRoleUpdateEmail(user, oldRole, newRole) {
    const settings = db.getSettings();
    const roleLabels = db.getRoleLabels();
    const oldRoleName = roleLabels[oldRole] || oldRole;
    const newRoleName = roleLabels[newRole] || newRole;
    const brandTitle = settings.brandTitle || 'DECONTO';

    const subject = `🔔 Aggiornamento Ruolo: Benvenuto nel nuovo ruolo di ${newRoleName}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .card { background: #1e293b; border-radius: 12px; padding: 30px; border: 1px solid #334155; max-width: 600px; margin: auto; }
          .header { text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 2.2rem; font-weight: 800; color: #a855f7; text-transform: uppercase; }
          .highlight { background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .btn { display: inline-block; background: #a855f7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="logo">☕ ${brandTitle}</div>
            <div style="color: #94a3b8; font-size: 0.9rem;">Notifica Cambio Mansionario & Permessi</div>
          </div>
          <h2>Gentile ${user.name},</h2>
          <p>Ti informiamo che il tuo ruolo ed i tuoi permessi aziendali sulla piattaforma <strong>${brandTitle}</strong> sono stati aggiornati con successo dall'Amministratore.</p>
          
          <div class="highlight">
            <h3 style="margin-top:0; color:#a855f7;">🔄 Dettaglio Variazione Ruolo:</h3>
            <div>• Ruolo Precedente: <span style="text-decoration: line-through; color:#94a3b8;">${oldRoleName}</span></div>
            <div>• Nuovo Ruolo Attivo: <strong style="color:#34d399; font-size: 1.1rem;">${newRoleName} ${user.avatar}</strong></div>
          </div>

          <p>Al tuo prossimo login troverai abilitate le nuove funzionalità, i menu ed i permessi associati alla tua nuova posizione.</p>
          
          <div style="text-align: center;">
            <a href="https://deconto-app.web.app" class="btn">🚀 Entra nel tuo Nuovo Spazio di Lavoro</a>
          </div>

          <div class="footer">
            Email automatica di notifica cambio mansione ${brandTitle} System.
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: user.email,
      recipientName: user.name,
      subject,
      htmlContent,
      plainText: `Ciao ${user.name}, il tuo ruolo è stato aggiornato da ${oldRoleName} a ${newRoleName}. Accedi su https://deconto-app.web.app`
    });
  }
}

export const emailService = new EmailService();
