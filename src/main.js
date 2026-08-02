import './styles/index.css';
import { db } from './db/database.js';
import { bleService } from './services/bluetooth.js';
import { githubBackupService } from './services/githubBackup.js';
import { emailService } from './services/emailService.js';
import { renderSidebar } from './components/Navigation.js';
import { renderLoginScreen } from './components/LoginScreen.js';
import { renderUserProfileModal } from './components/UserProfileModal.js';
import { renderAdminDashboard } from './components/AdminDashboard.js';
import { renderUserManagementPanel } from './components/UserManagementPanel.js';
import { renderOfficePanel } from './components/OfficePanel.js';
import { renderAdrPanel } from './components/AdrPanel.js';
import { renderSettingsPanel } from './components/SettingsPanel.js';
import { renderHardwareSimulator } from './components/HardwareSimulator.js';

let state = {
  currentUser: db.getCurrentUser(),
  activeTab: 'dashboard',
  showProfileModal: false,
  editingStaffUserId: null,
  editingId: null,
  viewingDecontoCode: null,
  viewingEmailId: null,
  selectedSimBoardCode: '9901',

  dashSearchQuery: '',
  dashSearchCategory: 'ALL',
  dashSortColumn: 'shortCode',
  dashSortDirection: 'DESC',

  viewingKpiModal: null,
  kpiPeriod: '30DAYS',
  kpiChartType: 'LINE',
  kpiCustomStart: '2026-07-01',
  kpiCustomEnd: '2026-08-02'
};

function renderApp() {
  const appEl = document.getElementById('app');

  if (!state.currentUser) {
    appEl.innerHTML = renderLoginScreen();
    attachLoginEventListeners();
    return;
  }

  const user = state.currentUser;
  let mainContentHtml = '';

  if (state.activeTab === 'settings') {
    mainContentHtml = renderSettingsPanel();
  } else if (state.activeTab === 'simulator') {
    mainContentHtml = renderHardwareSimulator(state.selectedSimBoardCode);
  } else if (state.activeTab === 'user_management' || state.activeTab === 'permissions_matrix') {
    mainContentHtml = renderUserManagementPanel(state.activeTab, state.editingStaffUserId, state.viewingEmailId);
  } else if (user.role === 'ADMIN' || user.role === 'UFFICIO') {
    if (state.activeTab === 'clients' || state.activeTab === 'machines' || state.activeTab === 'deconto_boards' || state.activeTab === 'qr_generator' || state.activeTab === 'otp_generator' || state.activeTab === 'refills_history') {
      mainContentHtml = renderOfficePanel(state.activeTab, state.editingId);
    } else if (state.activeTab === 'adr_visits') {
      mainContentHtml = renderAdrPanel(state.activeTab);
    } else {
      mainContentHtml = renderAdminDashboard(
        state.activeTab, 
        state.viewingDecontoCode, 
        state.dashSearchQuery, 
        state.dashSearchCategory, 
        state.dashSortColumn, 
        state.dashSortDirection,
        state.viewingKpiModal,
        state.kpiPeriod,
        state.kpiChartType,
        state.kpiCustomStart,
        state.kpiCustomEnd
      );
    }
  } else if (user.role === 'ADR') {
    mainContentHtml = renderAdrPanel(state.activeTab);
  }

  appEl.innerHTML = `
    <div class="app-container">
      ${renderSidebar(user, state.activeTab)}
      <main class="main-content">
        ${mainContentHtml}
      </main>
    </div>
    ${state.showProfileModal ? renderUserProfileModal(user) : ''}
  `;

  attachGlobalEventListeners();
}

function attachLoginEventListeners() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        const user = db.login(username, password);
        state.currentUser = user;
        state.activeTab = user.role === 'ADR' ? 'adr_visits' : 'dashboard';
        renderApp();
      } catch (err) {
        alert(err.message);
      }
    });
  }
}

function attachGlobalEventListeners() {
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      if (tab) {
        state.activeTab = tab;
        state.editingId = null;
        state.editingStaffUserId = null;
        state.viewingDecontoCode = null;
        state.viewingEmailId = null;
        renderApp();
      }
    });
  });

  // Modale Profilo Utente
  const btnOpenProfile = document.getElementById('btn-open-profile-modal');
  if (btnOpenProfile) {
    btnOpenProfile.addEventListener('click', () => {
      state.showProfileModal = true;
      renderApp();
    });
  }

  const btnCloseProfile = document.getElementById('btn-close-profile-modal');
  const btnCancelProfile = document.getElementById('btn-cancel-profile-modal');
  if (btnCloseProfile) btnCloseProfile.addEventListener('click', () => { state.showProfileModal = false; renderApp(); });
  if (btnCancelProfile) btnCancelProfile.addEventListener('click', () => { state.showProfileModal = false; renderApp(); });

  const profileForm = document.getElementById('user-profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-name').value.trim();
      const email = document.getElementById('profile-email').value.trim();
      const phone = document.getElementById('profile-phone').value.trim();
      const avatar = document.getElementById('profile-avatar').value;
      const currentPassword = document.getElementById('profile-current-password').value;
      const newPassword = document.getElementById('profile-new-password').value;
      const confirmPassword = document.getElementById('profile-confirm-password').value;

      if (!db.verifyPassword(state.currentUser.id, currentPassword)) {
        alert('Password attuale non corretta!');
        return;
      }

      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert('Le nuove password inserite non coincidono!');
          return;
        }
        if (newPassword.length < 4) {
          alert('La nuova password deve contenere almeno 4 caratteri!');
          return;
        }
      }

      try {
        const updatedUser = db.updateUserProfile(state.currentUser.id, {
          name,
          email,
          phone,
          avatar,
          newPassword: newPassword ? newPassword.trim() : undefined
        });

        state.currentUser = updatedUser;
        state.showProfileModal = false;
        alert('✅ Profilo utente aggiornato con successo!');
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      db.logout();
      state.currentUser = null;
      state.activeTab = 'dashboard';
      renderApp();
    });
  }

  // --- 👥 GESTIONE PERSONALE DIPENDENTI EVENTI ---
  const btnOpenAddStaffModal = document.getElementById('btn-open-add-staff-modal');
  const btnCloseAddStaffModal = document.getElementById('btn-close-add-staff-modal');
  const btnCancelAddStaff = document.getElementById('btn-cancel-add-staff');
  const addStaffModal = document.getElementById('add-staff-modal');

  if (btnOpenAddStaffModal && addStaffModal) {
    btnOpenAddStaffModal.addEventListener('click', () => {
      addStaffModal.style.display = 'flex';
    });
  }
  if (btnCloseAddStaffModal && addStaffModal) {
    btnCloseAddStaffModal.addEventListener('click', () => {
      addStaffModal.style.display = 'none';
    });
  }
  if (btnCancelAddStaff && addStaffModal) {
    btnCancelAddStaff.addEventListener('click', () => {
      addStaffModal.style.display = 'none';
    });
  }

  const addStaffForm = document.getElementById('add-staff-form');
  if (addStaffForm) {
    addStaffForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('new-user-username').value.trim();
      const password = document.getElementById('new-user-password').value.trim();
      const name = document.getElementById('new-user-name').value.trim();
      const role = document.getElementById('new-user-role').value;
      const email = document.getElementById('new-user-email').value.trim();
      const phone = document.getElementById('new-user-phone').value.trim();

      if (!username || !password || !name) {
        alert('Compila i campi obbligatori: Codice Utente, Password e Nome!');
        return;
      }

      try {
        const newUser = db.addUser({ username, password, name, role, email, phone });
        alert(`✅ Utente dipendente "${name}" (Codice ${username}) salvato PERMANENTEMENTE nel database!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  document.querySelectorAll('.btn-edit-staff-user').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      state.editingStaffUserId = id;
      renderApp();
    });
  });

  const btnCloseEditStaff = document.getElementById('btn-close-edit-staff-modal');
  const btnCancelEditStaff = document.getElementById('btn-cancel-edit-staff');
  if (btnCloseEditStaff) btnCloseEditStaff.addEventListener('click', () => { state.editingStaffUserId = null; renderApp(); });
  if (btnCancelEditStaff) btnCancelEditStaff.addEventListener('click', () => { state.editingStaffUserId = null; renderApp(); });

  const editStaffForm = document.getElementById('edit-staff-form');
  if (editStaffForm) {
    editStaffForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = document.getElementById('edit-staff-id').value;
      const username = document.getElementById('edit-staff-username') ? document.getElementById('edit-staff-username').value : undefined;
      const name = document.getElementById('edit-staff-name').value;
      const role = document.getElementById('edit-staff-role') ? document.getElementById('edit-staff-role').value : undefined;
      const email = document.getElementById('edit-staff-email').value;
      const phone = document.getElementById('edit-staff-phone').value;
      const password = document.getElementById('edit-staff-password').value;

      try {
        const updatedUser = db.updateUser(userId, {
          username,
          name,
          role,
          email,
          phone,
          password: password ? password.trim() : undefined
        });

        state.editingStaffUserId = null;
        alert(`✅ Scheda Utente "${updatedUser.name}" salvata PERMANENTEMENTE!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  document.querySelectorAll('.btn-toggle-user-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const currentStatus = btn.getAttribute('data-status');
      const newStatus = currentStatus === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
      db.updateUser(id, { status: newStatus });
      renderApp();
    });
  });

  document.querySelectorAll('.btn-delete-user').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Sei sicuro di voler eliminare questo utente dipendente?')) {
        try {
          db.deleteUser(id);
          renderApp();
        } catch (err) {
          alert(`Errore: ${err.message}`);
        }
      }
    });
  });

  const btnOpenEmailLogs = document.getElementById('btn-open-email-logs');
  if (btnOpenEmailLogs) {
    btnOpenEmailLogs.addEventListener('click', () => {
      const logs = db.getEmailLogs();
      if (logs.length > 0) {
        state.viewingEmailId = logs[0].id;
        renderApp();
      } else {
        alert('Nessuna email spedita di recente nel registro.');
      }
    });
  }

  const btnCloseEmailPreview = document.getElementById('btn-close-email-preview');
  const btnCloseEmailPreviewFooter = document.getElementById('btn-close-email-preview-footer');
  if (btnCloseEmailPreview) btnCloseEmailPreview.addEventListener('click', () => { state.viewingEmailId = null; renderApp(); });
  if (btnCloseEmailPreviewFooter) btnCloseEmailPreviewFooter.addEventListener('click', () => { state.viewingEmailId = null; renderApp(); });

  // --- ⚙️ MATRICE PERMESSI EVENTI ---
  const renameRoleForm = document.getElementById('rename-role-labels-form');
  if (renameRoleForm) {
    renameRoleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const uff = document.getElementById('role_label_UFFICIO').value.trim();
      const adr = document.getElementById('role_label_ADR').value.trim();

      db.updateRoleLabel('UFFICIO', uff);
      db.updateRoleLabel('ADR', adr);

      alert('✅ Nomi delle Categorie Utente aggiornati con successo!');
      renderApp();
    });
  }

  const matrixForm = document.getElementById('permissions-matrix-form');
  if (matrixForm) {
    matrixForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const roles = ['UFFICIO', 'ADR'];
      const fields = ['canViewClients', 'canCreateClients', 'canEditClients', 'canDeleteClients', 'canGenerateQr', 'canGenerateOtp', 'canBleRefill', 'canUseSimulator'];
      const newPerms = { UFFICIO: {}, ADR: {} };

      roles.forEach(role => {
        fields.forEach(field => {
          const el = document.getElementById(`perm_${role}_${field}`);
          if (el) {
            newPerms[role][field] = el.checked;
          }
        });
      });

      db.updatePermissions(newPerms);
      alert('✅ Matrice dei Permessi aggiornata con successo per tutti gli utenti!');
      renderApp();
    });
  }

  // --- 🛠️ IMPOSTAZIONI: LOGO DA PC, BRAND, SOGLIE X/Y & BREVO API ---
  const logoFileInput = document.getElementById('setting-logo-file');
  if (logoFileInput) {
    logoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Seleziona un file immagine valido (PNG, JPG, SVG).');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
          const base64Image = event.target.result;
          db.updateSettings({ customLogoUrl: base64Image });
          alert('✅ Nuovo Logo Aziendale caricato con successo!');
          renderApp();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const btnResetLogo = document.getElementById('btn-reset-logo');
  if (btnResetLogo) {
    btnResetLogo.addEventListener('click', () => {
      if (confirm('Ripristinare il logo predefinito con icona caffè ☕?')) {
        db.updateSettings({ customLogoUrl: null });
        alert('✅ Logo predefinito ripristinato!');
        renderApp();
      }
    });
  }

  const settingsBrandForm = document.getElementById('settings-brand-form');
  if (settingsBrandForm) {
    settingsBrandForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const brandTitle = document.getElementById('setting-brand-title').value.trim();
      const brandSubtitle = document.getElementById('setting-brand-subtitle').value.trim();

      db.updateSettings({ brandTitle, brandSubtitle });
      alert('✅ Titolo e Sottotitolo Brand salvati con successo!');
      renderApp();
    });
  }

  const settingsThresholdsForm = document.getElementById('settings-thresholds-form');
  if (settingsThresholdsForm) {
    settingsThresholdsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const thresholdYellow = parseInt(document.getElementById('setting-threshold-yellow').value, 10);
      const thresholdRed = parseInt(document.getElementById('setting-threshold-red').value, 10);

      if (isNaN(thresholdYellow) || isNaN(thresholdRed) || thresholdRed >= thresholdYellow) {
        alert('Attenzione: La Soglia Critica Rossa (X) deve essere inferiore alla Soglia Sottoscorta Gialla (Y)!');
        return;
      }

      db.updateSettings({ thresholdYellow, thresholdRed });
      alert(`✅ Soglie Automatiche Salvate con Successo!\n\n🟢 VERDE: > ${thresholdYellow} cialde\n🟡 GIALLO (Sottoscorta): da ${thresholdRed + 1} a ${thresholdYellow} cialde\n🔴 ROSSO (Critico): da 1 a ${thresholdRed} cialde\n⚫ NERO (Bloccato): 0 cialde`);
      renderApp();
    });
  }

  const settingsBrevoForm = document.getElementById('settings-brevo-form');
  if (settingsBrevoForm) {
    settingsBrevoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const key = document.getElementById('setting-brevo-key').value.trim();
      const sender = document.getElementById('setting-brevo-sender').value.trim();

      db.updateSettings({ brevoApiKey: key, brevoSenderEmail: sender });
      alert('✅ API Key ed Email Mittente Brevo salvate con successo!');
      renderApp();
    });
  }

  // --- 📊 DASHBOARD: POP-UP MODALI CARDS KPI (TASTI 1, 2, 3, 4) ---
  document.querySelectorAll('.kpi-card-clickable').forEach(card => {
    card.addEventListener('click', () => {
      const kpiKey = card.getAttribute('data-kpi');
      state.viewingKpiModal = kpiKey;
      renderApp();
    });
  });

  document.querySelectorAll('.btn-close-kpi-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      state.viewingKpiModal = null;
      renderApp();
    });
  });

  document.querySelectorAll('.btn-kpi-period').forEach(btn => {
    btn.addEventListener('click', () => {
      state.kpiPeriod = btn.getAttribute('data-period');
      renderApp();
    });
  });

  document.querySelectorAll('.btn-kpi-charttype').forEach(btn => {
    btn.addEventListener('click', () => {
      state.kpiChartType = btn.getAttribute('data-charttype');
      renderApp();
    });
  });

  const btnApplyCustomDate = document.getElementById('btn-apply-kpi-custom-date');
  if (btnApplyCustomDate) {
    btnApplyCustomDate.addEventListener('click', () => {
      const start = document.getElementById('kpi-custom-start').value;
      const end = document.getElementById('kpi-custom-end').value;
      if (start && end) {
        state.kpiCustomStart = start;
        state.kpiCustomEnd = end;
        alert(`✅ Filtro Date Personalizzato Applicato!\nDal: ${start}\nAl: ${end}`);
        renderApp();
      } else {
        alert('Seleziona sia la Data Inizio che la Data Fine dal calendario!');
      }
    });
  }

  // --- 🔍 DASHBOARD: RICERCA MULTI-CATEGORIA & ORDINAMENTO COLONNE ---
  const btnDashSearch = document.getElementById('btn-dash-search');
  const dashSearchInput = document.getElementById('dash-search-input');
  if (btnDashSearch && dashSearchInput) {
    btnDashSearch.addEventListener('click', () => {
      state.dashSearchQuery = dashSearchInput.value;
      state.dashSearchCategory = document.getElementById('dash-search-category').value;
      renderApp();
    });

    dashSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        state.dashSearchQuery = dashSearchInput.value;
        state.dashSearchCategory = document.getElementById('dash-search-category').value;
        renderApp();
      }
    });
  }

  const btnDashReset = document.getElementById('btn-dash-reset');
  if (btnDashReset) {
    btnDashReset.addEventListener('click', () => {
      state.dashSearchQuery = '';
      state.dashSearchCategory = 'ALL';
      renderApp();
    });
  }

  document.querySelectorAll('.th-sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.getAttribute('data-col');
      if (state.dashSortColumn === col) {
        state.dashSortDirection = state.dashSortDirection === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.dashSortColumn = col;
        state.dashSortDirection = 'DESC';
      }
      renderApp();
    });
  });

  document.querySelectorAll('.btn-deconto-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      state.viewingDecontoCode = code;
      renderApp();
    });
  });

  const btnCloseDecontoModal = document.getElementById('btn-close-deconto-modal');
  const btnCloseDecontoModalFooter = document.getElementById('btn-close-deconto-modal-footer');
  if (btnCloseDecontoModal) btnCloseDecontoModal.addEventListener('click', () => { state.viewingDecontoCode = null; renderApp(); });
  if (btnCloseDecontoModalFooter) btnCloseDecontoModalFooter.addEventListener('click', () => { state.viewingDecontoCode = null; renderApp(); });

  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const csvContent = db.exportBoardsToCsv();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `deconto_parco_macchine_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const btnTriggerBackup = document.getElementById('btn-trigger-backup');
  if (btnTriggerBackup) {
    btnTriggerBackup.addEventListener('click', async () => {
      try {
        btnTriggerBackup.disabled = true;
        btnTriggerBackup.innerHTML = '⏳ Backup in Corso...';
        const res = await githubBackupService.triggerBackup();
        alert(`✅ Backup Cloud completato!\nEsito: ${res.message}`);
      } catch (err) {
        alert(`❌ Errore Backup GitHub: ${err.message}`);
      } finally {
        btnTriggerBackup.disabled = false;
        btnTriggerBackup.innerHTML = '☁️ Esegui Backup GitHub';
      }
    });
  }
}

// Inizializzazione Applicazione
renderApp();
