import './styles/index.css';
import { db } from './db/database.js';
import { emailService } from './services/emailService.js';

import { renderLoginScreen } from './components/LoginScreen.js';
import { renderSidebar } from './components/Navigation.js';
import { renderAdminDashboard, renderDecontoDetailModal } from './components/AdminDashboard.js';
import { renderOfficePanel } from './components/OfficePanel.js';
import { renderAdrPanel } from './components/AdrPanel.js';
import { renderClientDiyPanel } from './components/ClientDiyPanel.js';
import { renderOtpGeneratorPanel } from './components/OtpGeneratorPanel.js';
import { renderQrGeneratorPanel } from './components/QrGeneratorPanel.js';
import { renderRefillsHistoryPanel } from './components/RefillsHistoryPanel.js';
import { renderExtractionsHistoryPanel } from './components/ExtractionsHistoryPanel.js';
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
  kpiCustomEnd: '2026-08-02',
  generatedOtpUrl: null,
  generatedOtpToken: null,
  diyParams: null,
  refillsFilter: { boardCode: '', clientName: '', date: '' },
  extractionsFilter: { boardCode: '', clientName: '', date: '' },
  qrParams: { clientId: '', machineId: '', boardShortCode: '', isGenerated: false },
  simulatingBoardCode: null
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
    case 'otp_generator':
      contentHtml = renderOtpGeneratorPanel(state.generatedOtpUrl, state.generatedOtpToken);
      break;
    case 'client_diy':
      contentHtml = renderClientDiyPanel(state.diyParams);
      break;
    case 'qr_generator':
      contentHtml = renderQrGeneratorPanel(state.qrParams);
      break;
    case 'refills_history':
      contentHtml = renderRefillsHistoryPanel(state.refillsFilter);
      break;
    case 'extractions_history':
      contentHtml = renderExtractionsHistoryPanel(state.extractionsFilter);
      break;
    case 'simulator':
      contentHtml = renderHardwareSimulator(state.simulatingBoardCode);
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
  const decontoDetailModalHtml = renderDecontoDetailModal(state.viewingDecontoCode);

  appContainer.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(state.currentUser, state.activeTab)}
      <main class="main-content">
        ${contentHtml}
      </main>
    </div>
    ${profileModalHtml}
    ${decontoDetailModalHtml}
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
      state.viewingKpiModal = null; // Chiude in automatico la modale KPI/Scorte
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

  // --- GESTORE OTP GENERATOR & CLIENT DIY REFILL ---
  
  const otpClientSelect = document.getElementById('otp-client-select');
  const otpMachineSelect = document.getElementById('otp-machine-select');
  const otpBoardSelect = document.getElementById('otp-board-select');
  const otpCreditsInput = document.getElementById('otp-credits-input');
  const otpCustomCreditsWrapper = document.getElementById('otp-custom-credits-wrapper');

  // Gestione visibilità crediti personalizzati
  if (otpCreditsInput && otpCustomCreditsWrapper) {
    otpCreditsInput.addEventListener('change', () => {
      if (otpCreditsInput.value === 'CUSTOM') {
        otpCustomCreditsWrapper.style.display = 'block';
      } else {
        otpCustomCreditsWrapper.style.display = 'none';
      }
    });
  }

  // Cascata 1: Seleziona Cliente -> Aggiorna Macchina e Deconto
  if (otpClientSelect && otpMachineSelect && otpBoardSelect) {
    otpClientSelect.addEventListener('change', () => {
      const clientId = otpClientSelect.value;
      if (!clientId) {
        otpMachineSelect.value = '';
        otpBoardSelect.value = '';
        return;
      }
      // Trova macchina associata
      const mc = db.getMachines().find(m => m.clientId === clientId);
      if (mc) {
        otpMachineSelect.value = mc.id;
        // Trova deconto associato alla macchina
        const board = db.getBoards().find(b => b.machineId === mc.id);
        if (board) {
          otpBoardSelect.value = board.shortCode;
        } else {
          otpBoardSelect.value = '';
        }
      } else {
        otpMachineSelect.value = '';
        otpBoardSelect.value = '';
      }
    });

    // Cascata 2: Seleziona Macchina -> Aggiorna Cliente e Deconto
    otpMachineSelect.addEventListener('change', () => {
      const mcId = otpMachineSelect.value;
      if (!mcId) {
        otpClientSelect.value = '';
        otpBoardSelect.value = '';
        return;
      }
      const mc = db.getMachines().find(m => m.id === mcId);
      if (mc) {
        otpClientSelect.value = mc.clientId || '';
        // Trova deconto associato alla macchina
        const board = db.getBoards().find(b => b.machineId === mc.id);
        if (board) {
          otpBoardSelect.value = board.shortCode;
        } else {
          otpBoardSelect.value = '';
        }
      }
    });

    // Cascata 3: Seleziona Deconto -> Aggiorna Macchina e Cliente
    otpBoardSelect.addEventListener('change', () => {
      const shortCode = otpBoardSelect.value;
      if (!shortCode) {
        otpMachineSelect.value = '';
        otpClientSelect.value = '';
        return;
      }
      const board = db.getBoards().find(b => b.shortCode === shortCode);
      if (board && board.machineId) {
        otpMachineSelect.value = board.machineId;
        const mc = db.getMachines().find(m => m.id === board.machineId);
        if (mc) {
          otpClientSelect.value = mc.clientId || '';
        } else {
          otpClientSelect.value = '';
        }
      } else {
        otpMachineSelect.value = '';
        otpClientSelect.value = '';
      }
    });
  }

  // --- GESTORE QR GENERATOR ---
  const qrClientSelect = document.getElementById('qr-client-select');
  const qrMachineSelect = document.getElementById('qr-machine-select');
  const qrBoardSelect = document.getElementById('qr-board-select');
  const btnGenerateQrLabel = document.getElementById('btn-generate-qr-label');
  const btnPrintQrLabel = document.getElementById('btn-print-qr-label');

  if (qrClientSelect && qrMachineSelect && qrBoardSelect) {
    // Cascata 1: Seleziona Cliente
    qrClientSelect.addEventListener('change', () => {
      const clientId = qrClientSelect.value;
      state.qrParams.clientId = clientId;
      state.qrParams.isGenerated = false;
      if (!clientId) {
        state.qrParams.machineId = '';
        state.qrParams.boardShortCode = '';
      } else {
        const mc = db.getMachines().find(m => m.clientId === clientId);
        if (mc) {
          state.qrParams.machineId = mc.id;
          const board = db.getBoards().find(b => b.machineId === mc.id);
          state.qrParams.boardShortCode = board ? board.shortCode : '';
        } else {
          state.qrParams.machineId = '';
          state.qrParams.boardShortCode = '';
        }
      }
      renderApp();
    });

    // Cascata 2: Seleziona Macchina
    qrMachineSelect.addEventListener('change', () => {
      const mcId = qrMachineSelect.value;
      state.qrParams.machineId = mcId;
      state.qrParams.isGenerated = false;
      if (!mcId) {
        state.qrParams.clientId = '';
        state.qrParams.boardShortCode = '';
      } else {
        const mc = db.getMachines().find(m => m.id === mcId);
        if (mc) {
          state.qrParams.clientId = mc.clientId || '';
          const board = db.getBoards().find(b => b.machineId === mc.id);
          state.qrParams.boardShortCode = board ? board.shortCode : '';
        }
      }
      renderApp();
    });

    // Cascata 3: Seleziona Deconto
    qrBoardSelect.addEventListener('change', () => {
      const shortCode = qrBoardSelect.value;
      state.qrParams.boardShortCode = shortCode;
      state.qrParams.isGenerated = false;
      if (!shortCode) {
        state.qrParams.machineId = '';
        state.qrParams.clientId = '';
      } else {
        const board = db.getBoards().find(b => b.shortCode === shortCode);
        if (board && board.machineId) {
          state.qrParams.machineId = board.machineId;
          const mc = db.getMachines().find(m => m.id === board.machineId);
          state.qrParams.clientId = mc ? (mc.clientId || '') : '';
        } else {
          state.qrParams.machineId = '';
          state.qrParams.clientId = '';
        }
      }
      renderApp();
    });
  }

  // Tasto GENERA
  if (btnGenerateQrLabel) {
    btnGenerateQrLabel.addEventListener('click', () => {
      const clientId = document.getElementById('qr-client-select').value;
      const machineId = document.getElementById('qr-machine-select').value;
      const boardShortCode = document.getElementById('qr-board-select').value;

      if (!clientId || !machineId || !boardShortCode) {
        alert('Seleziona il Cliente, la Macchina e la Scheda Deconto per procedere!');
        return;
      }

      state.qrParams.clientId = clientId;
      state.qrParams.machineId = machineId;
      state.qrParams.boardShortCode = boardShortCode;
      state.qrParams.isGenerated = true;
      renderApp();
    });
  }

  // Tasto STAMPA
  if (btnPrintQrLabel) {
    btnPrintQrLabel.addEventListener('click', () => {
      const labelEl = document.getElementById('printable-qr-label');
      if (!labelEl) return;

      // Crea un iframe temporaneo per isolare il documento da stampare
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>Stampa Etichetta Deconto</title>
            <style>
              @page {
                size: 70mm 70mm;
                margin: 0;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
                color: #000 !important;
                width: 70mm !important;
                height: 70mm !important;
                box-sizing: border-box;
                font-family: sans-serif;
                overflow: hidden;
              }
              #print-box {
                width: 70mm !important;
                height: 70mm !important;
                border: 1px solid #000 !important;
                padding: 4mm !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
                box-sizing: border-box !important;
              }
            </style>
          </head>
          <body>
            <div id="print-box">
              ${labelEl.innerHTML}
            </div>
            <script>
              // Forza il caricamento prima della stampa
              window.onload = function() {
                window.print();
                setTimeout(() => {
                  window.parent.document.body.removeChild(window.frameElement);
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      doc.close();
    });
  }

  // --- RICARICA DIRETTA (SENZA OTP) DA PANNELLO ---
  const btnDirectRefillPanel = document.getElementById('btn-direct-refill-panel');
  if (btnDirectRefillPanel) {
    btnDirectRefillPanel.addEventListener('click', () => {
      const clientId = document.getElementById('otp-client-select').value;
      const machineId = document.getElementById('otp-machine-select').value;
      const boardShortCode = document.getElementById('otp-board-select').value;
      const creditsType = document.getElementById('otp-credits-input').value;
      const customCreditsVal = document.getElementById('otp-custom-credits-value').value;
      const expiry = document.getElementById('otp-expiry-input').value;

      if (!clientId || !boardShortCode) {
        alert('Seleziona sia il Cliente che la Scheda Deconto per procedere!');
        return;
      }

      let credits = 200;
      if (creditsType === 'CUSTOM') {
        const manualVal = parseInt(customCreditsVal, 10);
        if (isNaN(manualVal)) {
          alert('Inserisci un valore numerico valido (positivo o negativo) per i crediti personalizzati!');
          return;
        }
        credits = manualVal;
      } else {
        credits = parseInt(creditsType, 10);
      }

      try {
        db.performRefill({
          boardShortCode,
          credits,
          method: 'CLOUD_DIRECT',
          operatorId: state.currentUser ? state.currentUser.id : 'usr_001'
        });

        alert(`✅ Ricarica diretta di ${credits >= 0 ? '+' : ''}${credits} caffè effettuata con successo sul Deconto #${boardShortCode}!\nCredito aggiornato via Cloud.`);
        
        // Salviamo lo stato temporaneo per ripristinare la vista dopo il render
        state.selectedClientTemp = clientId;
        state.selectedMachineTemp = machineId;
        state.selectedBoardTemp = boardShortCode;
        state.selectedCreditsTemp = creditsType;
        state.selectedCustomCreditsTemp = creditsType === 'CUSTOM' ? credits : '';
        state.selectedExpiryTemp = expiry;
        state.generatedOtpUrl = null;
        state.generatedOtpToken = null;

        renderApp();

        // Ripristiniamo i valori nei campi nel DOM dopo il rendering per consentire ricariche consecutive
        const restoreClient = document.getElementById('otp-client-select');
        const restoreMachine = document.getElementById('otp-machine-select');
        const restoreBoard = document.getElementById('otp-board-select');
        const restoreCredits = document.getElementById('otp-credits-input');
        const restoreCustomWrap = document.getElementById('otp-custom-credits-wrapper');
        const restoreCustomVal = document.getElementById('otp-custom-credits-value');
        const restoreExpiry = document.getElementById('otp-expiry-input');

        if (restoreClient) restoreClient.value = state.selectedClientTemp;
        if (restoreMachine) restoreMachine.value = state.selectedMachineTemp;
        if (restoreBoard) restoreBoard.value = state.selectedBoardTemp;
        if (restoreCredits) restoreCredits.value = state.selectedCreditsTemp;
        if (restoreCredits && restoreCredits.value === 'CUSTOM' && restoreCustomWrap) {
          restoreCustomWrap.style.display = 'block';
          if (restoreCustomVal) restoreCustomVal.value = state.selectedCustomCreditsTemp;
        }
        if (restoreExpiry) restoreExpiry.value = state.selectedExpiryTemp;

      } catch (err) {
        alert(`❌ Errore durante la ricarica diretta: ${err.message}`);
      }
    });
  }

  // 1. Genera Link & Token OTP
  const btnGenerateOtpLink = document.getElementById('btn-generate-otp-link');
  if (btnGenerateOtpLink) {
    btnGenerateOtpLink.addEventListener('click', () => {
      const clientId = document.getElementById('otp-client-select').value;
      const boardShortCode = document.getElementById('otp-board-select').value;
      const creditsType = document.getElementById('otp-credits-input').value;
      let expiry = document.getElementById('otp-expiry-input').value;

      if (!clientId || !boardShortCode) {
        alert('Seleziona sia il Cliente che la Scheda Deconto!');
        return;
      }

      let credits = 200;
      if (creditsType === 'CUSTOM') {
        const manualVal = parseInt(document.getElementById('otp-custom-credits-value').value, 10);
        if (isNaN(manualVal)) {
          alert('Inserisci un valore numerico valido (positivo o negativo) per i crediti personalizzati!');
          return;
        }
        credits = manualVal;
      } else {
        credits = parseInt(creditsType, 10);
      }

      const client = db.getClients().find(c => c.id === clientId);
      const clientName = client ? client.name : 'Cliente';

      // Imposta data di scadenza (Default 1 mese)
      if (!expiry) {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        expiry = d.toISOString().split('T')[0];
      }

      // Genera un token OTP casuale
      const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
      const otpToken = `OTP-${Math.floor(1000 + Math.random() * 9000)}-${randomPart}`;

      // Crea l'URL con window.location.origin
      const baseUrl = window.location.origin + window.location.pathname;
      const generatedUrl = `${baseUrl}?tab=client_diy&clientName=${encodeURIComponent(clientName)}&board=${boardShortCode}&otp=${otpToken}&credits=${credits}`;

      // Aggiorna lo stato e ri-renderizza
      state.generatedOtpUrl = generatedUrl;
      state.generatedOtpToken = otpToken;
      
      // Manteniamo temporaneamente selezionati i valori nei campi per visualizzazione post-rendering
      state.selectedClientTemp = clientId;
      state.selectedMachineTemp = document.getElementById('otp-machine-select').value;
      state.selectedBoardTemp = boardShortCode;
      state.selectedCreditsTemp = creditsType;
      state.selectedCustomCreditsTemp = creditsType === 'CUSTOM' ? credits : '';
      state.selectedExpiryTemp = expiry;
      
      renderApp();

      // Ripristiniamo i valori nei campi nel DOM dopo il rendering
      const restoreClient = document.getElementById('otp-client-select');
      const restoreMachine = document.getElementById('otp-machine-select');
      const restoreBoard = document.getElementById('otp-board-select');
      const restoreCredits = document.getElementById('otp-credits-input');
      const restoreCustomWrap = document.getElementById('otp-custom-credits-wrapper');
      const restoreCustomVal = document.getElementById('otp-custom-credits-value');
      const restoreExpiry = document.getElementById('otp-expiry-input');

      if (restoreClient) restoreClient.value = state.selectedClientTemp;
      if (restoreMachine) restoreMachine.value = state.selectedMachineTemp;
      if (restoreBoard) restoreBoard.value = state.selectedBoardTemp;
      if (restoreCredits) restoreCredits.value = state.selectedCreditsTemp;
      if (restoreCredits && restoreCredits.value === 'CUSTOM' && restoreCustomWrap) {
        restoreCustomWrap.style.display = 'block';
        if (restoreCustomVal) restoreCustomVal.value = state.selectedCustomCreditsTemp;
      }
      if (restoreExpiry) restoreExpiry.value = state.selectedExpiryTemp;
      
      // Focus sull'area di risultato
      setTimeout(() => {
        const resContainer = document.getElementById('otp-result-container');
        if (resContainer) resContainer.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });
  }

  // 2. Copia Link OTP
  const btnCopyOtpLink = document.getElementById('btn-copy-otp-link');
  if (btnCopyOtpLink) {
    btnCopyOtpLink.addEventListener('click', () => {
      const urlTextarea = document.getElementById('generated-otp-url');
      if (urlTextarea) {
        urlTextarea.select();
        document.execCommand('copy');
        alert('📋 Link di ricarica copiato negli appunti!');
      }
    });
  }

  // 3. Invia via WhatsApp
  const btnWhatsappOtpSend = document.getElementById('btn-whatsapp-otp-send');
  if (btnWhatsappOtpSend && state.generatedOtpUrl) {
    const boardShortCode = document.getElementById('otp-board-select')?.value || 'Deconto';
    const credits = document.getElementById('otp-credits-input')?.value || '200';
    const message = `Ciao! Ecco il link per ricaricare +${credits} caffè sulla tua macchina Deconto #${boardShortCode}: ${state.generatedOtpUrl}`;
    btnWhatsappOtpSend.setAttribute('href', `https://wa.me/?text=${encodeURIComponent(message)}`);
  }

  // 4. Test Link (Simula Cliente)
  const btnTestOtpLink = document.getElementById('btn-test-otp-link');
  if (btnTestOtpLink && state.generatedOtpUrl) {
    btnTestOtpLink.addEventListener('click', () => {
      const params = new URLSearchParams(state.generatedOtpUrl.split('?')[1]);
      state.diyParams = {
        clientName: params.get('clientName'),
        boardShortCode: params.get('board'),
        tokenOtp: params.get('otp'),
        credits: parseInt(params.get('credits'), 10),
        success: false
      };
      state.activeTab = 'client_diy';
      renderApp();
    });
  }

  // 5. Click su Accredita Caffè (Lato Cliente)
  const btnClientDiyRefill = document.getElementById('btn-client-diy-refill');
  if (btnClientDiyRefill) {
    btnClientDiyRefill.addEventListener('click', () => {
      const boardShortCode = btnClientDiyRefill.getAttribute('data-board');
      const credits = parseInt(btnClientDiyRefill.getAttribute('data-credits'), 10);
      const otpToken = btnClientDiyRefill.getAttribute('data-otp');

      const statusMsg = document.getElementById('diy-status-msg');
      if (statusMsg) {
        statusMsg.innerHTML = '<span style="color: var(--accent-cyan); font-weight: 700;">📡 Connessione Bluetooth in corso... Sincronizzazione relè...</span>';
      }

      // Simula ritardo sincronizzazione BLE (1.2 secondi)
      btnClientDiyRefill.disabled = true;
      setTimeout(() => {
        try {
          // Esegue la ricarica reale nel database!
          db.performRefill({
            boardShortCode,
            credits,
            method: 'WHATSAPP_OTP_BLE',
            tokenOtp: otpToken
          });

          // Mostra successo
          if (state.diyParams) {
            state.diyParams.success = true;
          } else {
            state.diyParams = { success: true, clientName: 'Studio Legale Brambilla', boardShortCode, tokenOtp, credits };
          }
          renderApp();
        } catch (err) {
          alert(`Errore durante l'accredito: ${err.message}`);
          if (statusMsg) {
            statusMsg.innerHTML = `<span style="color: var(--accent-rose); font-weight: 700;">❌ Errore BLE: ${err.message}</span>`;
          }
          btnClientDiyRefill.disabled = false;
        }
      }, 1200);
    });
  }

  // 6. Torna alla Dashboard da Client DIY
  const btnBackToOffice = document.getElementById('btn-back-to-office-from-diy');
  if (btnBackToOffice) {
    btnBackToOffice.addEventListener('click', () => {
      state.diyParams = null;
      state.generatedOtpUrl = null;
      state.generatedOtpToken = null;
      state.activeTab = 'otp_generator';
      renderApp();
    });
  }

  // --- GESTORE FILTRI STORICO RICARICHE ---
  const filterRefillBoard = document.getElementById('filter-refill-board');
  const filterRefillClient = document.getElementById('filter-refill-client');
  const filterRefillDate = document.getElementById('filter-refill-date');
  const btnResetRefillFilters = document.getElementById('btn-reset-refill-filters');

  if (filterRefillBoard) {
    filterRefillBoard.addEventListener('input', () => {
      state.refillsFilter.boardCode = filterRefillBoard.value;
      renderApp();
      const input = document.getElementById('filter-refill-board');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  if (filterRefillClient) {
    filterRefillClient.addEventListener('input', () => {
      state.refillsFilter.clientName = filterRefillClient.value;
      renderApp();
      const input = document.getElementById('filter-refill-client');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  if (filterRefillDate) {
    filterRefillDate.addEventListener('change', () => {
      state.refillsFilter.date = filterRefillDate.value;
      renderApp();
    });
  }

  if (btnResetRefillFilters) {
    btnResetRefillFilters.addEventListener('click', () => {
      state.refillsFilter = { boardCode: '', clientName: '', date: '' };
      renderApp();
    });
  }

  // --- GESTORE FILTRI STORICO EROGAZIONI ---
  const filterExtractionBoard = document.getElementById('filter-extraction-board');
  const filterExtractionClient = document.getElementById('filter-extraction-client');
  const filterExtractionDate = document.getElementById('filter-extraction-date');
  const btnResetExtractionFilters = document.getElementById('btn-reset-extraction-filters');

  if (filterExtractionBoard) {
    filterExtractionBoard.addEventListener('input', () => {
      state.extractionsFilter.boardCode = filterExtractionBoard.value;
      renderApp();
      const input = document.getElementById('filter-extraction-board');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  if (filterExtractionClient) {
    filterExtractionClient.addEventListener('input', () => {
      state.extractionsFilter.clientName = filterExtractionClient.value;
      renderApp();
      const input = document.getElementById('filter-extraction-client');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  if (filterExtractionDate) {
    filterExtractionDate.addEventListener('change', () => {
      state.extractionsFilter.date = filterExtractionDate.value;
      renderApp();
    });
  }

  if (btnResetExtractionFilters) {
    btnResetExtractionFilters.addEventListener('click', () => {
      state.extractionsFilter = { boardCode: '', clientName: '', date: '' };
      renderApp();
    });
  }

  // --- GESTORE RICARICA RAPIDA DA MODALE TELEMETRIA ---
  const modalRefillSelect = document.getElementById('modal-refill-credits-select');
  const modalRefillCustom = document.getElementById('modal-refill-credits-custom');
  const btnModalPerformRefill = document.getElementById('btn-modal-perform-refill');

  if (modalRefillSelect && modalRefillCustom) {
    modalRefillSelect.addEventListener('change', () => {
      if (modalRefillSelect.value === 'CUSTOM') {
        modalRefillCustom.style.display = 'block';
      } else {
        modalRefillCustom.style.display = 'none';
      }
    });
  }

  if (btnModalPerformRefill) {
    btnModalPerformRefill.addEventListener('click', () => {
      const boardShortCode = btnModalPerformRefill.getAttribute('data-board-code');
      const creditsType = document.getElementById('modal-refill-credits-select').value;
      let credits = 200;

      if (creditsType === 'CUSTOM') {
        const val = parseInt(document.getElementById('modal-refill-credits-custom').value, 10);
        if (isNaN(val)) {
          alert('Inserisci un valore numerico valido (positivo o negativo) per la ricarica personalizzata!');
          return;
        }
        credits = val;
      } else {
        credits = parseInt(creditsType, 10);
      }

      // Determina il metodo e l'operatore in base al ruolo dell'utente loggato
      const user = state.currentUser;
      const isOfficeOrAdmin = user && (user.role === 'ADMIN' || user.role === 'UFFICIO');
      const method = isOfficeOrAdmin ? 'CLOUD_DIRECT' : 'ADR_BLE_PHYSICAL';

      try {
        db.performRefill({
          boardShortCode,
          credits,
          method,
          operatorId: user ? user.id : 'usr_001'
        });

        alert(`✅ Ricarica di ${credits >= 0 ? '+' : ''}${credits} caffè effettuata con successo!\nCanale: ${isOfficeOrAdmin ? 'Cloud Wi-Fi (Ufficio)' : 'Bluetooth BLE (ADR)'}`);
        renderApp();
      } catch (err) {
        alert(`❌ Errore durante la ricarica: ${err.message}`);
      }
    });
  }
  // --- GESTORE BANCO PROVA HARDWARE SIMULATORE ---
  const simBoardSelect = document.getElementById('sim-board-select');
  const btnSimBrew = document.getElementById('btn-sim-brew');
  const btnSimReset = document.getElementById('btn-sim-reset');

  if (simBoardSelect) {
    simBoardSelect.addEventListener('change', () => {
      state.simulatingBoardCode = simBoardSelect.value;
      renderApp();
    });
  }

  if (btnSimBrew) {
    btnSimBrew.addEventListener('click', () => {
      const boardShortCode = state.simulatingBoardCode || (db.getBoards()[0] ? db.getBoards()[0].shortCode : null);
      if (!boardShortCode) return;

      const board = db.getBoards().find(b => b.shortCode === boardShortCode);
      if (!board || board.remainingCredits <= 0) return;

      // Disabilita pulsanti durante l'erogazione simulata
      btnSimBrew.disabled = true;
      btnSimBrew.innerText = '☕ EROGAZIONE IN CORSO (230V SENSE IN)...';
      if (btnSimReset) btnSimReset.disabled = true;

      // Aggiorna fili elettrici a schermo per simulare il passaggio di corrente
      const signalSenseVolts = document.getElementById('signal-sense-volts');
      const signalSenseBadge = document.getElementById('signal-sense-badge');
      const simConsoleLog = document.getElementById('sim-console-log');

      if (signalSenseVolts) signalSenseVolts.innerText = '230V AC';
      if (signalSenseBadge) {
        signalSenseBadge.innerText = '⚡ SENSE ATTIVO';
        signalSenseBadge.className = 'badge badge-success';
      }
      if (simConsoleLog) {
        simConsoleLog.innerHTML += `<br>[INPUT]: Rilevata tensione 230V AC su Sense-In (Filo Marrone).<br>[FIRMWARE]: Conteggio tempo di erogazione avviato...`;
        simConsoleLog.scrollTop = simConsoleLog.scrollHeight;
      }

      // Esegui l'erogazione dopo 1.5 secondi
      setTimeout(() => {
        try {
          const res = db.registerCoffeeExtraction(boardShortCode, 22, 1);
          if (res && res.success === false) {
            alert(`Impossibile erogare: ${res.reason}`);
          } else {
            if (simConsoleLog) {
              simConsoleLog.innerHTML += `<br>[FIRMWARE]: Erogazione terminata (22s simulati).<br>[MEMORY]: Credito scalato. Nuovo saldo: ${board.remainingCredits} caffè.<br>[HARDWARE]: Relè di blocco: ${board.relayStatus === 'CLOSED_OK' ? 'CONNESSO/ABILITATO' : 'APERTO/BLOCCATO'}`;
            }
          }
        } catch (err) {
          console.error(err);
        }

        // Ripristina e aggiorna l'app
        renderApp();
      }, 1500);
    });
  }

  if (btnSimReset) {
    btnSimReset.addEventListener('click', () => {
      const boardShortCode = state.simulatingBoardCode || (db.getBoards()[0] ? db.getBoards()[0].shortCode : null);
      if (!boardShortCode) return;

      try {
        db.performRefill({
          boardShortCode,
          credits: 200,
          method: 'CLOUD_DIRECT',
          operatorId: state.currentUser ? state.currentUser.id : 'usr_001'
        });
        
        const simConsoleLog = document.getElementById('sim-console-log');
        if (simConsoleLog) {
          simConsoleLog.innerHTML += `<br>[CLOUDLINK]: Comando Ricarica remota +200 ricevuto via Wi-Fi.<br>[MEMORY]: Crediti aggiornati. Relè sbloccato.`;
        }

        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }
}

// Inizializzazione Applicazione
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab === 'client_diy') {
    state.activeTab = 'client_diy';
    state.diyParams = {
      clientName: params.get('clientName') || 'Studio Legale Brambilla',
      boardShortCode: params.get('board') || '3467',
      tokenOtp: params.get('otp') || 'OTP-9981-X79K2',
      credits: parseInt(params.get('credits'), 10) || 200,
      success: false
    };
    // Pulisci i parametri dall'indirizzo per evitare loop o refresh strani
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

parseUrlParams();
renderApp();
