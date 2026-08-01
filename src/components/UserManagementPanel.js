import { db } from '../db/database.js';

export function renderUserManagementPanel(activeTab, editingUserId = null, viewingEmailId = null) {
  const users = db.getUsers();
  const roleLabels = db.getRoleLabels();
  const permissions = db.getPermissions();
  const emailLogs = db.getEmailLogs();

  let modalHtml = '';

  // 1. Modale Modifica Utente Dipendente
  if (editingUserId) {
    const u = users.find(x => x.id === editingUserId);
    if (u) {
      modalHtml = `
        <div class="modal-overlay" id="edit-staff-modal">
          <div class="modal-box" style="max-width: 540px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
                ✏️ Modifica Utente: ${u.name}
              </h2>
              <button id="btn-close-edit-staff-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>

            <form id="edit-staff-form">
              <input type="hidden" id="edit-staff-id" value="${u.id}">

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome e Cognome:*</label>
                <input type="text" id="edit-staff-name" value="${u.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>

              ${u.username !== '001' ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                  <div>
                    <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Utente:*</label>
                    <input type="text" id="edit-staff-username" value="${u.username}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                  </div>

                  <div>
                    <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ruolo Operativo:*</label>
                    <select id="edit-staff-role" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                      <option value="UFFICIO" ${u.role === 'UFFICIO' ? 'selected' : ''}>👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}</option>
                      <option value="ADR" ${u.role === 'ADR' ? 'selected' : ''}>🚚 ${roleLabels.ADR || 'AGENTE ADR'}</option>
                      <option value="ADMIN" ${u.role === 'ADMIN' ? 'selected' : ''}>👨‍💼 AMMINISTRATORE</option>
                    </select>
                  </div>
                </div>
              ` : ''}

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email Dipendente:</label>
                  <input type="email" id="edit-staff-email" value="${u.email || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>

                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
                  <input type="text" id="edit-staff-phone" value="${u.phone || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nuova Password (lascia vuoto per non cambiare):</label>
                <input type="password" id="edit-staff-password" placeholder="••••••" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="font-size: 0.75rem; color: var(--accent-cyan); background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 20px;">
                ✉️ Nota: Modificando il ruolo, l'icona avatar si aggiornerà automaticamente e verrà generata l'email di notifica!
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-staff" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">💾 Salva Scheda Dipendente</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  // 2. Modale Visualizzazione Registro Email Spedite
  if (viewingEmailId) {
    const emailRecord = emailLogs.find(m => m.id === viewingEmailId);
    if (emailRecord) {
      modalHtml += `
        <div class="modal-overlay" id="email-preview-modal">
          <div class="modal-box" style="max-width: 680px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              <div>
                <h3 style="margin: 0; color: var(--accent-cyan);">✉️ Registro Notifica Email</h3>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                  Destinatario: <strong>${emailRecord.recipientName} (${emailRecord.recipientEmail})</strong>
                </div>
              </div>
              <button id="btn-close-email-preview" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Oggetto: <strong>${emailRecord.subject}</strong></div>
                <div style="font-size: 0.75rem; color: var(--accent-green); margin-top: 2px;">Stato: Ready in Outbox Log (${new Date(emailRecord.timestamp).toLocaleString('it-IT')})</div>
              </div>
              ${emailRecord.mailtoUrl ? `
                <a href="${emailRecord.mailtoUrl}" class="btn btn-primary" style="padding: 8px 14px; font-size: 0.8rem; text-decoration: none;">
                  ✉️ Apri in Outlook/Mail
                </a>
              ` : ''}
            </div>

            <div style="background: #0f172a; padding: 16px; border-radius: 10px; max-height: 380px; overflow-y: auto; border: 1px solid var(--border-subtle);">
              ${emailRecord.htmlBody}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
              <small style="color: var(--text-muted);">Puoi anche inviare le email reali col il tuo client di posta predefinito.</small>
              <button id="btn-close-email-preview-footer" class="btn btn-secondary">Chiudi Anteprima Email</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (activeTab === 'permissions_matrix') {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Matrice Permessi & Nomi Categorie Ruoli</h1>
          <p style="color: var(--text-muted);">Configura dinamicamente quali schede, tasti ed azioni ogni categoria di personale può gestire</p>
        </div>

        <!-- Sezione Rinominazione Nomi Ruoli -->
        <div class="stat-card" style="margin-bottom: 32px; padding: 24px; border: 1px solid var(--accent-cyan);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">🏷️ Rinomina Categorie Ruoli Utente:</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
            Puoi personalizzare la dicitura delle categorie del personale (es. rinominare "UFFICIO" in "AMMINISTRAZIONE" o "LOGISTICA").
          </p>

          <form id="rename-role-labels-form" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Categoria UFFICIO (👩‍💻 Scrivania):</label>
              <input type="text" id="role_label_UFFICIO" value="${roleLabels.UFFICIO || 'UFFICIO'}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Categoria ADR (🚚 Furgone):</label>
              <input type="text" id="role_label_ADR" value="${roleLabels.ADR || 'AGENTE ADR'}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">
              💾 Salva Nuovi Nomi
            </button>
          </form>
        </div>

        <!-- Matrice dei Permessi -->
        <form id="permissions-matrix-form" class="stat-card" style="padding: 24px;">
          <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 16px;">🔐 Matrice Abilitazione Funzionalità per Ruolo:</h3>
          
          <div class="table-container" style="margin-bottom: 24px;">
            <table>
              <thead>
                <tr>
                  <th>Funzionalità / Permesso Piattaforma</th>
                  <th style="text-align: center;">👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}</th>
                  <th style="text-align: center;">🚚 ${roleLabels.ADR || 'AGENTE ADR'}</th>
                  <th style="text-align: center;">👨‍💼 AMMINISTRATORE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Visualizza Anagrafica Clienti & Macchine</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canViewClients" ${permissions.UFFICIO.canViewClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canViewClients" ${permissions.ADR.canViewClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled> (Sempre Abilitato)</td>
                </tr>

                <tr>
                  <td><strong>Crea Nuovi Clienti & Assegna Deconto</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canCreateClients" ${permissions.UFFICIO.canCreateClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canCreateClients" ${permissions.ADR.canCreateClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Modifica Schede Clienti & Macchine (Tasto ✏️ Modifica)</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canEditClients" ${permissions.UFFICIO.canEditClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canEditClients" ${permissions.ADR.canEditClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Elimina Clienti (Tasto 🗑️ Rimuovi)</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canDeleteClients" ${permissions.UFFICIO.canDeleteClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canDeleteClients" ${permissions.ADR.canDeleteClients ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Genera Stampa Etichette Termiche QR Code</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canGenerateQr" ${permissions.UFFICIO.canGenerateQr ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canGenerateQr" ${permissions.ADR.canGenerateQr ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Genera Ricariche Fai-da-Te OTP per Clienti</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canGenerateOtp" ${permissions.UFFICIO.canGenerateOtp ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canGenerateOtp" ${permissions.ADR.canGenerateOtp ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Ricarica Bluetooth BLE sul Posto (App ADR)</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canBleRefill" ${permissions.UFFICIO.canBleRefill ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canBleRefill" ${permissions.ADR.canBleRefill ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Utilizzo Banco di Prova Simulatore Hardware</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canUseSimulator" ${permissions.UFFICIO.canUseSimulator ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canUseSimulator" ${permissions.ADR.canUseSimulator ? 'checked' : ''}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-size: 1rem;">
              💾 Salva Configurazione Permessi
            </button>
          </div>
        </form>
      </div>
      ${modalHtml}
    `;
  }

  // Vista Gestione Personale & Dipendenti
  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">👥 Gestione Personale & Credenziali Dipendenti</h1>
          <p style="color: var(--text-muted);">Crea nuovi utenti dipendenti, modifica i ruoli ed ispeziona le notifiche email inviate</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button id="btn-open-email-logs" class="btn btn-secondary">
            ✉️ Registro Email Spedite (${emailLogs.length})
          </button>
          <button id="btn-toggle-add-user" class="btn btn-primary">
            ➕ Nuovo Utente Dipendente
          </button>
        </div>
      </div>

      <!-- Form Nuovo Dipendente -->
      <div id="add-user-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Creazione Nuovo Utente Dipendente:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice Utente Accesso:*</label>
            <input type="text" id="new-user-username" placeholder="Es. 004" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Password Iniziale:*</label>
            <input type="password" id="new-user-password" value="123456" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome e Cognome Dipendente:*</label>
            <input type="text" id="new-user-name" placeholder="Es. Boldrini Valerio" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ruolo Operativo:</label>
            <select id="new-user-role" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="UFFICIO">👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}</option>
              <option value="ADR">🚚 ${roleLabels.ADR || 'AGENTE ADR'}</option>
              <option value="ADMIN">👨‍💼 AMMINISTRATORE</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email Dipendente:</label>
            <input type="email" id="new-user-email" placeholder="boldrini.valerio@deconto.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
            <input type="text" id="new-user-phone" placeholder="+39 333 112233" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
        </div>

        <div style="font-size: 0.75rem; color: var(--accent-cyan); background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 20px;">
          ✉️ Nota: Al salvataggio l'utente verrà memorizzato PERMANENTEMENTE nel Master Store e verrà generata l'email di benvenuto!
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="btn-cancel-add-user" class="btn btn-secondary">Annulla</button>
          <button id="btn-save-new-user" class="btn btn-primary">💾 Salva Utente & Invia Email Benvenuto</button>
        </div>
      </div>

      <!-- Tabella Registro Personale -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Icona</th>
              <th>Codice</th>
              <th>Nome & Cognome</th>
              <th>Ruolo Operativo</th>
              <th>Email / Telefono</th>
              <th>Stato Account</th>
              <th>Data Creazione</th>
              <th>Azioni Scheda</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td style="font-size: 1.6rem; text-align: center;">${u.avatar || '👤'}</td>
                <td><strong style="font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan);">${u.username}</strong></td>
                <td><strong>${u.name}</strong></td>
                <td>
                  <span class="badge ${u.role === 'ADMIN' ? 'badge-danger' : (u.role === 'UFFICIO' ? 'badge-info' : 'badge-warning')}">
                    ${u.role === 'ADMIN' ? '👨‍💼 AMMINISTRATORE' : (u.role === 'UFFICIO' ? `👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}` : `🚚 ${roleLabels.ADR || 'AGENTE ADR'}`)}
                  </span>
                </td>
                <td>${u.email || 'N/D'}<br><small style="color: var(--text-muted);">${u.phone || ''}</small></td>
                <td>
                  ${u.status === 'ACTIVE' 
                    ? '<span class="badge badge-success">🟢 ATTIVO</span>' 
                    : '<span class="badge badge-danger">🔴 DISATTIVATO</span>'}
                </td>
                <td>${u.createdAt || '2026-01-01'}</td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-edit-staff-user" data-id="${u.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                      ✏️ Modifica
                    </button>
                    ${u.username !== '001' ? `
                      <button class="btn btn-secondary btn-toggle-user-status" data-id="${u.id}" data-status="${u.status}" style="padding: 6px 10px; font-size: 0.8rem;">
                        ${u.status === 'ACTIVE' ? '🚫 Disattiva' : '✅ Abilita'}
                      </button>
                      <button class="btn btn-secondary btn-delete-user" data-id="${u.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                        🗑️ Elimina
                      </button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ${modalHtml}
  `;
}
