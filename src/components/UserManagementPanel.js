import { db } from '../db/database.js';

export function renderUserManagementPanel(activeTab, editingUserId = null) {
  const users = db.getUsers();
  const permissions = db.getPermissions();
  const roleLabels = db.getRoleLabels();

  let editModalHtml = '';
  if (editingUserId) {
    const userToEdit = users.find(u => u.id === editingUserId);
    if (userToEdit) {
      editModalHtml = `
        <div class="modal-overlay" id="edit-staff-modal">
          <div class="modal-box" style="max-width: 520px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
                ✏️ Modifica Utente Dipendente
              </h2>
              <button id="btn-close-edit-staff-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>

            <form id="edit-staff-form">
              <input type="hidden" id="edit-staff-id" value="${userToEdit.id}">

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Accesso / Username:*</label>
                <input type="text" id="edit-staff-username" value="${userToEdit.username}" required ${userToEdit.username === '001' ? 'disabled' : ''} style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome & Cognome:*</label>
                <input type="text" id="edit-staff-name" value="${userToEdit.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ruolo Assegnato:*</label>
                <select id="edit-staff-role" ${userToEdit.username === '001' ? 'disabled' : ''} style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="ADMIN" ${userToEdit.role === 'ADMIN' ? 'selected' : ''}>👨‍💼 ADMIN (Amministratore Totale)</option>
                  <option value="UFFICIO" ${userToEdit.role === 'UFFICIO' ? 'selected' : ''}>👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}</option>
                  <option value="ADR" ${userToEdit.role === 'ADR' ? 'selected' : ''}>🚚 ${roleLabels.ADR || 'ADR'}</option>
                </select>
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email:</label>
                <input type="email" id="edit-staff-email" value="${userToEdit.email || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / Mobile:</label>
                <input type="text" id="edit-staff-phone" value="${userToEdit.phone || ''}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="margin-bottom: 24px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nuova Password (lascia vuoto per non cambiare):</label>
                <input type="password" id="edit-staff-password" placeholder="Nuova password..." style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-staff" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Modifiche Dipendente</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  if (activeTab === 'permissions_matrix') {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Matrice Permessi & Nomi Categorie Utente</h1>
          <p style="color: var(--text-muted);">Personalizza i nomi delle categorie di dipendenti e configura i permessi di visualizzazione e gestione</p>
        </div>

        <!-- Sezione 1: Personalizzazione Nomi Categorie / Ruoli -->
        <div class="stat-card" style="margin-bottom: 24px; padding: 24px; border: 1px solid var(--accent-cyan);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">🏷️ Personalizzazione Nomi delle Categorie Utente:</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
            Puoi modificare il nome visualizzato per ciascun gruppo utente in qualunque momento (es. cambiare "UFFICIO" in "AMMINISTRAZIONE" o "LOGISTICA").
          </p>

          <form id="rename-role-labels-form" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome Categoria Utenti 1 (ex UFFICIO):</label>
              <input type="text" id="role_label_UFFICIO" value="${roleLabels.UFFICIO || 'UFFICIO'}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome Categoria Utenti 2 (ex ADR):</label>
              <input type="text" id="role_label_ADR" value="${roleLabels.ADR || 'ADR'}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <button type="submit" class="btn btn-secondary" style="padding: 10px 16px;">
              💾 Salva Nomi Categorie
            </button>
          </form>
        </div>

        <!-- Sezione 2: Matrice Permessi -->
        <form id="permissions-matrix-form">
          <div class="table-container" style="margin-bottom: 24px;">
            <table>
              <thead>
                <tr>
                  <th>Funzionalità / Permesso Piattaforma</th>
                  <th style="text-align: center; width: 220px;">👩‍💻 Categoria ${roleLabels.UFFICIO || 'UFFICIO'}</th>
                  <th style="text-align: center; width: 220px;">🚚 Categoria ${roleLabels.ADR || 'ADR'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Visualizzazione Anagrafica Clienti & Macchine</strong><br>
                    <small style="color: var(--text-muted);">Permette di consultare la lista dei clienti e delle macchine da caffè</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canViewClients" ${permissions.UFFICIO.canViewClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canViewClients" ${permissions.ADR.canViewClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Creazione Nuovi Clienti & Assegnazione Schede</strong><br>
                    <small style="color: var(--text-muted);">Permette di aggiungere nuovi clienti e associare schede Deconto</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canCreateClients" ${permissions.UFFICIO.canCreateClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canCreateClients" ${permissions.ADR.canCreateClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Modifica Schede Clienti & Macchine</strong><br>
                    <small style="color: var(--text-muted);">Permette di modificare i dati anagrafici e la configurazione delle macchine</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canEditClients" ${permissions.UFFICIO.canEditClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canEditClients" ${permissions.ADR.canEditClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Cancellazione Clienti dall'Anagrafica</strong><br>
                    <small style="color: var(--text-muted);">Permette di rimuovere definitivamente i clienti dal sistema</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canDeleteClients" ${permissions.UFFICIO.canDeleteClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canDeleteClients" ${permissions.ADR.canDeleteClients ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Generatore Etichette Termiche QR Code</strong><br>
                    <small style="color: var(--text-muted);">Permette di configurare e stampare le etichette fisiche adesive</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canGenerateQr" ${permissions.UFFICIO.canGenerateQr ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canGenerateQr" ${permissions.ADR.canGenerateQr ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Emissione Token OTP Ricariche Fai-da-Te (WhatsApp)</strong><br>
                    <small style="color: var(--text-muted);">Permette di generare ed inviare link di ricarica WhatsApp ai clienti</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canGenerateOtp" ${permissions.UFFICIO.canGenerateOtp ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canGenerateOtp" ${permissions.ADR.canGenerateOtp ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Ricariche Bluetooth BLE sul Posto (Giro Consegne)</strong><br>
                    <small style="color: var(--text-muted);">Permette di ricaricare le macchine via Bluetooth avvicinandosi allo smartphone</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canBleRefill" ${permissions.UFFICIO.canBleRefill ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canBleRefill" ${permissions.ADR.canBleRefill ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Accesso al Banco Prova Simulatore Hardware</strong><br>
                    <small style="color: var(--text-muted);">Permette di accedere al simulatore di test delle macchine da caffè</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canUseSimulator" ${permissions.UFFICIO.canUseSimulator ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canUseSimulator" ${permissions.ADR.canUseSimulator ? 'checked' : ''} style="width: 20px; height: 20px;">
                  </td>
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
    `;
  }

  // Vista Gestione Personale
  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">👥 Gestione Personale & Account Utenti</h1>
          <p style="color: var(--text-muted);">Registrazione del personale dipendente, modifica schede, assegnazione ruoli e reset credenziali</p>
        </div>
        <button id="btn-toggle-add-user" class="btn btn-primary">
          ➕ Nuovo Utente Personale
        </button>
      </div>

      <!-- Form Nuovo Utente -->
      <div id="add-user-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Registrazione Nuovo Account Dipendente:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice Utente (Username):*</label>
            <input type="text" id="new-user-username" placeholder="Es. 004" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Password di Accesso:*</label>
            <input type="password" id="new-user-password" placeholder="Password..." required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome & Cognome:*</label>
            <input type="text" id="new-user-name" placeholder="Es. Mario Rossi" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ruolo Assegnato:*</label>
            <select id="new-user-role" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="UFFICIO">👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}</option>
              <option value="ADR">🚚 ${roleLabels.ADR || 'ADR'}</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email:</label>
            <input type="email" id="new-user-email" placeholder="email@deconto.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono Mobile:</label>
            <input type="text" id="new-user-phone" placeholder="+39 333 ..." style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="btn-cancel-add-user" class="btn btn-secondary">Annulla</button>
          <button id="btn-save-new-user" class="btn btn-primary">💾 Salva Account Dipendente</button>
        </div>
      </div>

      <!-- Tabella Utenti -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Utente / Operatore</th>
              <th>Codice Accesso</th>
              <th>Ruolo</th>
              <th>Contatti</th>
              <th>Stato Account</th>
              <th>Azioni Admin</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.4rem;">${u.avatar || '👤'}</span>
                    <div>
                      <strong>${u.name}</strong><br>
                      <small style="color: var(--text-muted);">Creato il ${u.createdAt || 'N/D'}</small>
                    </div>
                  </div>
                </td>
                <td><strong style="color: var(--accent-cyan); font-family: monospace; font-size: 1.1rem;">${u.username}</strong></td>
                <td>
                  ${u.role === 'ADMIN' ? '<span class="badge badge-danger">👨‍💼 ADMIN</span>' : (u.role === 'UFFICIO' ? `<span class="badge badge-info">👩‍💻 ${roleLabels.UFFICIO || 'UFFICIO'}</span>` : `<span class="badge badge-warning">🚚 ${roleLabels.ADR || 'ADR'}</span>`)}
                </td>
                <td>
                  ${u.email ? `<small>${u.email}</small><br>` : ''}
                  <small style="color: var(--text-muted);">${u.phone || ''}</small>
                </td>
                <td>
                  ${u.status === 'ACTIVE' ? '<span class="badge badge-success">Attivo</span>' : '<span class="badge badge-danger">Disattivato</span>'}
                </td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-edit-staff-user" data-id="${u.id}" style="padding: 4px 8px; font-size: 0.75rem; color: var(--accent-cyan);">
                      ✏️ Modifica
                    </button>
                    ${u.username !== '001' ? `
                      <button class="btn btn-secondary btn-toggle-user-status" data-id="${u.id}" data-status="${u.status}" style="padding: 4px 8px; font-size: 0.75rem;">
                        ${u.status === 'ACTIVE' ? '⏸️ Disattiva' : '▶️ Attiva'}
                      </button>
                      <button class="btn btn-secondary btn-delete-user" data-id="${u.id}" style="padding: 4px 8px; font-size: 0.75rem; color: var(--accent-rose);">
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
    ${editModalHtml}
  `;
}
