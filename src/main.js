import './styles/index.css';
import { db } from './db/database.js';
import { emailService } from './services/emailService.js';

import { renderLoginScreen } from './components/LoginScreen.js';
import { renderSidebar } from './components/Navigation.js';
import { renderAdminDashboard } from './components/AdminDashboard.js';
import { renderOfficePanel } from './components/OfficePanel.js';
import { renderAdrPanel } from './components/AdrPanel.js';
import { renderClientDiyPanel } from './components/ClientDiyPanel.js';
import { renderHardwareSimulator } from './components/HardwareSimulator.js';
import { renderUserManagementPanel } from './components/UserManagementPanel.js';
import { renderUserProfileModal } from './components/UserProfileModal.js';
import { renderSettingsPanel } from './components/SettingsPanel.js';

// Stato Globale dell'Applicazione
const state = {
  currentUser: db.getCurrentUser(),
  activeTab: 'dashboard', // dashboard, clients, machines, deconto_boards, adr_visits, client_diy, simulator, user_mgmt, permissions_matrix, settings
  editingId: null, // ID dell'elemento in modifica (cliente, macchina o deconto)
  editingStaffUserId: null, // ID dell'utente dipendente in modifica
  showProfileModal: false,
  dashSearchQuery: '',
  dashSearchCategory: 'ALL', // ALL, CODE, CLIENT, MODEL
  dashSortColumn: 'shortCode',
  dashSortDirection: 'DESC', // ASC or DESC
  viewingDecontoCode: null,
  viewingEmailId: null,
  viewingKpiModal: null, // kpi_clients, kpi_machines, kpi_extractions, kpi_lowstock
  kpiPeriod: '30DAYS', // 30DAYS, 90DAYS, 1YEAR, CUSTOM
  kpiChartType: 'LINE', // LINE, BAR
  kpiCustomStart: '2026-07-01',
  kpiCustomEnd: '2026-08-02'
};

function renderApp() {
  const appContainer = document.getElementById('app');

  // 1. Se non c'è utente autenticato, mostra lo schermo di Login
  if (!state.currentUser) {
    appContainer.innerHTML = renderLoginScreen();
    attachLoginEventListeners();
    return;
  }

  // 2. Se l'utente è autenticato, renderizza il Layout Principale
  let contentHtml = '';
  switch (state.activeTab) {
    case 'dashboard':
      contentHtml = renderAdminDashboard(
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
      break;
    case 'clients':
    case 'machines':
    case 'deconto_boards':
      contentHtml = renderOfficePanel(state.activeTab, state.editingId);
      break;
    case 'adr_visits':
      contentHtml = renderAdrPanel();
      break;
    case 'client_diy':
    case 'otp_generator':
    case 'qr_generator':
    case 'refills_history':
      contentHtml = renderClientDiyPanel();
      break;
    case 'simulator':
      contentHtml = renderHardwareSimulator();
      break;
    case 'user_mgmt':
    case 'user_management':
    case 'permissions_matrix':
      contentHtml = renderUserManagementPanel(state.activeTab, state.editingStaffUserId, state.viewingEmailId);
      break;
    case 'settings':
      contentHtml = renderSettingsPanel();
      break;
    default:
      contentHtml = renderAdminDashboard();
  }

  const profileModalHtml = renderUserProfileModal(state.showProfileModal, state.currentUser);

  appContainer.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(state.currentUser, state.activeTab)}
      <main class="main-content">
        ${contentHtml}
      </main>
    </div>
    ${profileModalHtml}
  `;

  attachGlobalEventListeners();
}

function attachLoginEventListeners() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();

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

  const profileForm = document.getElementById('profile-edit-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-name').value.trim();
      const email = document.getElementById('profile-email').value.trim();
      const newPassword = document.getElementById('profile-new-password').value;

      try {
        const updatedUser = db.updateUserProfile(state.currentUser.id, {
          name,
          email,
          newPassword: newPassword ? newPassword.trim() : undefined
        });

        state.currentUser = updatedUser;
        state.showProfileModal = false;
        alert('✅ Credenziali del profilo aggiornate con successo!');
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

  // --- 🏢 ANAGRAFICA CLIENTl: NUOVO, MODIFICA, ELIMINA ---
  const btnToggleAddClient = document.getElementById('btn-toggle-add-client');
  const addClientFormContainer = document.getElementById('add-client-form-container');
  const btnCancelAddClient = document.getElementById('btn-cancel-add-client');
  const btnSaveNewClient = document.getElementById('btn-save-new-client');

  if (btnToggleAddClient && addClientFormContainer) {
    btnToggleAddClient.addEventListener('click', () => {
      const isHidden = addClientFormContainer.style.display === 'none' || !addClientFormContainer.style.display;
      addClientFormContainer.style.display = isHidden ? 'block' : 'none';
    });
  }

  if (btnCancelAddClient && addClientFormContainer) {
    btnCancelAddClient.addEventListener('click', () => {
      addClientFormContainer.style.display = 'none';
    });
  }

  if (btnSaveNewClient) {
    btnSaveNewClient.addEventListener('click', () => {
      const name = document.getElementById('new-cli-name').value.trim();
      const clientType = document.getElementById('new-cli-type').value;
      const refPerson = document.getElementById('new-cli-ref').value.trim();
      const phone = document.getElementById('new-cli-phone').value.trim();
      const email = document.getElementById('new-cli-email').value.trim();
      const city = document.getElementById('new-cli-city').value.trim();
      const machineId = document.getElementById('new-cli-machine').value;

      if (!name) {
        alert('Inserisci la Ragione Sociale / Nome Cliente!');
        return;
      }

      try {
        const newClient = db.addClient({ name, clientType, refPerson, phone, email, city, machineId });
        alert(`✅ Cliente "${newClient.name}" registrato con successo!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  document.querySelectorAll('.btn-edit-client-standalone').forEach(btn => {
    btn.addEventListener('click', () => {
      state.editingId = btn.getAttribute('data-id');
      renderApp();
    });
  });

  document.querySelectorAll('.btn-del-client-standalone').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Sei sicuro di voler eliminare questo cliente?')) {
        try {
          db.deleteClient(id);
          alert('✅ Cliente eliminato dall\'anagrafica!');
          renderApp();
        } catch (err) {
          alert(`Errore: ${err.message}`);
        }
      }
    });
  });

  const btnCancelEditClient = document.getElementById('btn-cancel-edit-client');
  if (btnCancelEditClient) btnCancelEditClient.addEventListener('click', () => { state.editingId = null; renderApp(); });

  const formEditClient = document.getElementById('form-edit-client');
  if (formEditClient) {
    formEditClient.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientId = document.getElementById('edit-client-id').value;
      const name = document.getElementById('edit-cli-name').value.trim();
      const clientType = document.getElementById('edit-cli-type').value;
      const refPerson = document.getElementById('edit-cli-ref').value.trim();
      const phone = document.getElementById('edit-cli-phone').value.trim();
      const city = document.getElementById('edit-cli-city').value.trim();
      const address = document.getElementById('edit-cli-address').value.trim();
      const assignedMachineId = document.getElementById('edit-cli-machine').value;

      try {
        db.updateClient(clientId, { name, clientType, refPerson, phone, city, address, assignedMachineId });
        state.editingId = null;
        alert('✅ Scheda Cliente salvata con successo!');
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // --- ☕ ANAGRAFICA MACCHINE: NUOVA, MODIFICA, ELIMINA ---
  const btnToggleAddMachine = document.getElementById('btn-toggle-add-machine');
  const addMachineFormContainer = document.getElementById('add-machine-form-container');
  const btnCancelAddMachine = document.getElementById('btn-cancel-add-machine');
  const btnSaveNewMachine = document.getElementById('btn-save-new-machine');

  if (btnToggleAddMachine && addMachineFormContainer) {
    btnToggleAddMachine.addEventListener('click', () => {
      const isHidden = addMachineFormContainer.style.display === 'none' || !addMachineFormContainer.style.display;
      addMachineFormContainer.style.display = isHidden ? 'block' : 'none';
    });
  }

  if (btnCancelAddMachine && addMachineFormContainer) {
    btnCancelAddMachine.addEventListener('click', () => {
      addMachineFormContainer.style.display = 'none';
    });
  }

  if (btnSaveNewMachine) {
    btnSaveNewMachine.addEventListener('click', () => {
      const serialNumber = document.getElementById('new-mc-serial').value.trim();
      const brand = document.getElementById('new-mc-brand').value.trim();
      const model = document.getElementById('new-mc-model').value.trim();
      const productionYear = document.getElementById('new-mc-year').value.trim();
      const boardId = document.getElementById('new-mc-board').value;
      const clientId = document.getElementById('new-mc-client').value;

      if (!serialNumber || !model) {
        alert('Inserisci Seriale Macchina e Modello!');
        return;
      }

      try {
        const newMachine = db.addMachine({ serialNumber, brand, model, productionYear, boardId, clientId });
        alert(`✅ Macchina da caffè SN "${newMachine.serialNumber}" registrata con successo!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  document.querySelectorAll('.btn-edit-machine-standalone').forEach(btn => {
    btn.addEventListener('click', () => {
      state.editingId = btn.getAttribute('data-id');
      renderApp();
    });
  });

  document.querySelectorAll('.btn-del-machine-standalone').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Sei sicuro di voler eliminare questa macchina da caffè?')) {
        try {
          db.deleteMachine(id);
          alert('✅ Macchina eliminata dal parco macchine!');
          renderApp();
        } catch (err) {
          alert(`Errore: ${err.message}`);
        }
      }
    });
  });

  const btnCancelEditMc = document.getElementById('btn-cancel-edit-mc');
  if (btnCancelEditMc) btnCancelEditMc.addEventListener('click', () => { state.editingId = null; renderApp(); });

  const formEditMachine = document.getElementById('form-edit-machine');
  if (formEditMachine) {
    formEditMachine.addEventListener('submit', (e) => {
      e.preventDefault();
      const machineId = document.getElementById('edit-mc-id').value;
      const serialNumber = document.getElementById('edit-mc-serial').value.trim();
      const brand = document.getElementById('edit-mc-brand').value.trim();
      const model = document.getElementById('edit-mc-model').value.trim();
      const productionYear = document.getElementById('edit-mc-year').value.trim();
      const boardId = document.getElementById('edit-mc-board').value;
      const clientId = document.getElementById('edit-mc-client').value;

      try {
        db.updateMachine(machineId, { serialNumber, brand, model, productionYear, boardId, clientId });
        state.editingId = null;
        alert('✅ Scheda Macchina salvata con successo!');
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // --- 📟 ANAGRAFICA SCHEDE DECONTO: NUOVA, MODIFICA, ELIMINA ---
  const btnToggleAddBoard = document.getElementById('btn-toggle-add-board');
  const addBoardFormContainer = document.getElementById('add-board-form-container');
  const btnCancelAddBoard = document.getElementById('btn-cancel-add-board');
  const btnSaveNewBoard = document.getElementById('btn-save-new-board');

  if (btnToggleAddBoard && addBoardFormContainer) {
    btnToggleAddBoard.addEventListener('click', () => {
      const isHidden = addBoardFormContainer.style.display === 'none' || !addBoardFormContainer.style.display;
      addBoardFormContainer.style.display = isHidden ? 'block' : 'none';
    });
  }

  if (btnCancelAddBoard && addBoardFormContainer) {
    btnCancelAddBoard.addEventListener('click', () => {
      addBoardFormContainer.style.display = 'none';
    });
  }

  if (btnSaveNewBoard) {
    btnSaveNewBoard.addEventListener('click', () => {
      const shortCode = document.getElementById('new-board-code').value.trim();
      const hwSerial = document.getElementById('new-board-hwserial').value.trim();
      const remainingCredits = document.getElementById('new-board-credits').value;
      const version = document.getElementById('new-board-version').value;
      const machineId = document.getElementById('new-board-machine').value;
      const groupCountEl = document.getElementById('new-board-groupcount');
      const groupCount = groupCountEl ? parseInt(groupCountEl.value, 10) : 1;

      if (!shortCode) {
        alert('Inserisci il Codice a 4 cifre del Deconto!');
        return;
      }

      try {
        const newBoard = db.addBoard({ shortCode, hwSerial, remainingCredits, version, groupCount, machineId });
        alert(`✅ Scheda Deconto #${newBoard.shortCode} salvata PERMANENTEMENTE nel database!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  document.querySelectorAll('.btn-edit-board-standalone').forEach(btn => {
    btn.addEventListener('click', () => {
      state.editingId = btn.getAttribute('data-id');
      renderApp();
    });
  });

  document.querySelectorAll('.btn-del-board-standalone').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Sei sicuro di voler eliminare questa scheda Deconto?')) {
        try {
          db.deleteBoard(id);
          alert('✅ Scheda Deconto eliminata!');
          renderApp();
        } catch (err) {
          alert(`Errore: ${err.message}`);
        }
      }
    });
  });

  const btnCancelEditBoard = document.getElementById('btn-cancel-edit-board');
  if (btnCancelEditBoard) btnCancelEditBoard.addEventListener('click', () => { state.editingId = null; renderApp(); });

  const formEditBoard = document.getElementById('form-edit-board');
  if (formEditBoard) {
    formEditBoard.addEventListener('submit', (e) => {
      e.preventDefault();
      const boardId = document.getElementById('edit-board-id').value;
      const shortCode = document.getElementById('edit-board-shortcode').value.trim();
      const hwSerial = document.getElementById('edit-board-hwserial').value.trim();
      const remainingCredits = document.getElementById('edit-board-credits').value;
      const version = document.getElementById('edit-board-version').value;
      const machineId = document.getElementById('edit-board-machine').value;
      const groupCountEl = document.getElementById('edit-board-groupcount');
      const groupCount = groupCountEl ? parseInt(groupCountEl.value, 10) : 1;

      try {
        db.updateBoard(boardId, { shortCode, hwSerial, remainingCredits, version, groupCount, machineId });
        state.editingId = null;
        alert('✅ Scheda Deconto salvata con successo!');
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // Chiusura Modale Modifica (pulsante 'x')
  const btnCloseEditModal = document.getElementById('btn-close-edit-modal');
  if (btnCloseEditModal) {
    btnCloseEditModal.addEventListener('click', () => {
      state.editingId = null;
      renderApp();
    });
  }

  // --- 👥 GESTIONE PERSONALE DIPENDENTI EVENTI ---
  const btnToggleAddUser = document.getElementById('btn-toggle-add-user');
  const addUserFormContainer = document.getElementById('add-user-form-container');
  const btnCancelAddUser = document.getElementById('btn-cancel-add-user');
  const btnSaveNewUser = document.getElementById('btn-save-new-user');

  if (btnToggleAddUser && addUserFormContainer) {
    btnToggleAddUser.addEventListener('click', () => {
      const isHidden = addUserFormContainer.style.display === 'none' || !addUserFormContainer.style.display;
      addUserFormContainer.style.display = isHidden ? 'block' : 'none';
    });
  }

  if (btnCancelAddUser && addUserFormContainer) {
    btnCancelAddUser.addEventListener('click', () => {
      addUserFormContainer.style.display = 'none';
    });
  }

  if (btnSaveNewUser) {
    btnSaveNewUser.addEventListener('click', () => {
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
      const csvContent = db.exportCoffeeLogsCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `deconto_erogazioni_${new Date().toISOString().slice(0,10)}.csv`);
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
        const res = db.triggerGitHubBackup();
        alert(`✅ Backup Cloud completato!\nID: ${res.id}\nCommit: ${res.commitHash}\nRecords: ${res.recordCount}`);
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
