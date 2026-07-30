import { db } from '../db/database.js';

export function renderUserProfileModal(user, onClose) {
  return `
    <div class="modal-overlay" id="user-profile-modal">
      <div class="modal-box" style="max-width: 480px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
            👤 Profilo Utente & Credenziali
          </h2>
          <button id="btn-close-profile-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
        </div>

        <form id="profile-edit-form">
          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ruolo Assegnato:</label>
            <input type="text" value="${user.role}" disabled style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: var(--accent-cyan); font-weight: 800; border: 1px solid var(--border-subtle); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome & Cognome:*</label>
            <input type="text" id="edit-user-name" value="${user.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Utente (Username):*</label>
            <input type="text" id="edit-user-username" value="${user.username}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email:</label>
            <input type="email" id="edit-user-email" value="${user.email}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nuova Password (lascia vuoto per non modificare):</label>
            <input type="password" id="edit-user-password" placeholder="Nuova password..." style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" id="btn-cancel-profile" class="btn btn-secondary">Annulla</button>
            <button type="submit" class="btn btn-primary">💾 Salva Modifiche Credenziali</button>
          </div>
        </form>

      </div>
    </div>
  `;
}
