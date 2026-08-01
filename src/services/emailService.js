import { db } from '../db/database.js';

class EmailService {

  /**
   * Invia email di benvenuto professionale ed amichevole a un nuovo utente registrato
   */
  async sendWelcomeEmail(user) {
    const roleLabels = db.getRoleLabels();
    const roleTitle = roleLabels[user.role] || user.role;
    const settings = db.getSettings();

    const subject = `👋 Benvenuto nel Team ${settings.brandTitle || 'DECONTO'} - Credenziali di Accesso`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 1.6rem;">${settings.brandTitle || 'DECONTO'} IoT System</h1>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 4px;">Piattaforma di Gestione Vending & Comodato Caffè</p>
        </div>

        <h2 style="color: #ffffff; font-size: 1.3rem;">Ciao ${user.name}, benvenuto a bordo! 🎉</h2>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Siamo davvero felici di darti il benvenuto nel nostro team per il progetto <strong>${settings.brandTitle || 'DECONTO'}</strong>! 
          Da oggi farai parte del nostro staff con il ruolo di:
        </p>

        <div style="background: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <div style="font-weight: 800; font-size: 1.1rem; color: #38bdf8;">Ruolo Assegnato: ${user.avatar || '👤'} ${roleTitle}</div>
          <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">I tuoi permessi operativi sulla piattaforma sono stati configurati e pronti all'uso.</div>
        </div>

        <h3 style="color: #ffffff; font-size: 1.05rem;">🔑 Le tue Credenziali di Accesso:</h3>
        <ul style="line-height: 1.8; color: #cbd5e1; background: #1e293b; padding: 16px 24px; border-radius: 8px; list-style: none;">
          <li>• <strong>Piattaforma Web:</strong> <a href="https://deconto-vending-app.web.app" style="color: #38bdf8; text-decoration: none;">https://deconto-vending-app.web.app</a></li>
          <li>• <strong>Codice Accesso (Nome Utente):</strong> <code style="color: #f59e0b; font-size: 1.1rem; font-weight: 800;">${user.username}</code></li>
          <li>• <strong>Password Temporanea:</strong> <code style="color: #f59e0b; font-size: 1.1rem; font-weight: 800;">${user.password || '123456'}</code></li>
        </ul>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Ti raccomandiamo di effettuare il tuo primo accesso ed eventuale personalizzazione della password nella sezione profilo. 
          Se dovessi avere qualsiasi dubbio o necessitare di supporto, il nostro team è a tua completa disposizione.
        </p>

        <div style="margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 0.8rem;">
          Buon lavoro e benvenuto ancora tra noi!<br>
          <strong>Il Team di Direzione ${settings.brandTitle || 'DECONTO'} System</strong>
        </div>
      </div>
    `;

    const logRecord = {
      id: 'mail_' + Date.now(),
      type: 'WELCOME_NEW_USER',
      recipientEmail: user.email || `${user.username}@deconto.it`,
      recipientName: user.name,
      subject,
      htmlBody,
      timestamp: new Date().toISOString(),
      status: 'DELIVERED'
    };

    if (!db.data.emailLogs) db.data.emailLogs = [];
    db.data.emailLogs.unshift(logRecord);
    db.saveData();

    return logRecord;
  }

  /**
   * Invia email di congratulazioni e notifica aggiornamento ruolo / promozione
   */
  async sendRoleUpdateEmail(user, oldRole, newRole) {
    const roleLabels = db.getRoleLabels();
    const oldRoleTitle = roleLabels[oldRole] || oldRole;
    const newRoleTitle = roleLabels[newRole] || newRole;
    const settings = db.getSettings();

    const subject = `🎉 Aggiornamento Ruolo Operativo & Nuovi Permessi - ${settings.brandTitle || 'DECONTO'}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
          <h1 style="color: #a855f7; margin: 0; font-size: 1.6rem;">${settings.brandTitle || 'DECONTO'} IoT System</h1>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 4px;">Comunicazione di Servizio - Aggiornamento Staff</p>
        </div>

        <h2 style="color: #ffffff; font-size: 1.3rem;">Complimenti ${user.name}! 🚀</h2>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Desideriamo informarti che il tuo ruolo ed i tuoi permessi operativi all'interno del progetto <strong>${settings.brandTitle || 'DECONTO'}</strong> sono stati aggiornati con successo dall'Amministrazione.
        </p>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <div style="font-size: 0.85rem; color: #94a3b8;">Ruolo Precedente: ${oldRoleTitle}</div>
          <div style="font-weight: 800; font-size: 1.2rem; color: #a855f7; margin-top: 4px;">
            Nuovo Ruolo: ${user.avatar || '👤'} ${newRoleTitle}
          </div>
        </div>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Effettuando nuovamente l'accesso alla piattaforma con il tuo codice <code>${user.username}</code>, noterai che la tua dashboard, la tua icona identificativa ed il menu di navigazione sono stati aggiornati per rispecchiare le tue nuove responsabilità.
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="https://deconto-vending-app.web.app" style="background: linear-gradient(135deg, #a855f7, #38bdf8); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">
            🔗 Accedi Subito alla Piattaforma Aggiornata
          </a>
        </div>

        <div style="margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 0.8rem;">
          Grazie per il tuo continuo impegno e buon lavoro nel tuo nuovo ruolo!<br>
          <strong>La Direzione ${settings.brandTitle || 'DECONTO'} System</strong>
        </div>
      </div>
    `;

    const logRecord = {
      id: 'mail_' + Date.now(),
      type: 'ROLE_UPDATED',
      recipientEmail: user.email || `${user.username}@deconto.it`,
      recipientName: user.name,
      subject,
      htmlBody,
      timestamp: new Date().toISOString(),
      status: 'DELIVERED'
    };

    if (!db.data.emailLogs) db.data.emailLogs = [];
    db.data.emailLogs.unshift(logRecord);
    db.saveData();

    return logRecord;
  }
}

export const emailService = new EmailService();
