import './styles/index.css';
import { db } from './db/database.js';
import { bleService } from './services/bluetooth.js';
import { githubBackupService } from './services/githubBackup.js';
import { renderSidebar } from './components/Navigation.js';
import { renderLoginScreen } from './components/LoginScreen.js';
import { renderUserProfileModal } from './components/UserProfileModal.js';
import { renderAdminDashboard } from './components/AdminDashboard.js';
import { renderUserManagementPanel } from './components/UserManagementPanel.js';
import { renderOfficePanel } from './components/OfficePanel.js';
import { renderAdrPanel } from './components/AdrPanel.js';
import { renderClientDiyPanel } from './components/ClientDiyPanel.js';
import { renderHardwareSimulator } from './components/HardwareSimulator.js';

let state = {
  currentUser: db.getCurrentUser(), // Null se disconnesso
  activeTab: 'dashboard',
  showProfileModal: false,
  editingStaffUserId: null,
  editingClientId: null,
  viewingDecontoCode: null
};

function renderApp() {
  const appEl = document.getElementById('app');

  // Se l'utente non è autenticato, mostra la Schermata di Login obbligatoria
  if (!state.currentUser) {
    appEl.innerHTML = renderLoginScreen();
    attachLoginEventListeners();
    return;
  }

  const user = state.currentUser;
  let mainContentHtml = '';

  if (state.activeTab === 'simulator') {
    mainContentHtml = renderHardwareSimulator();
  } else if (state.activeTab === 'user_management' || state.activeTab === 'permissions_matrix') {
    mainContentHtml = renderUserManagementPanel(state.activeTab, state.editingStaffUserId);
  } else if (user.role === 'ADMIN') {
    if (state.activeTab === 'clients' || state.activeTab === 'qr_generator' || state.activeTab === 'otp_generator' || state.activeTab === 'refills_history') {
      mainContentHtml = renderOfficePanel(state.activeTab, state.editingClientId);
    } else if (state.activeTab === 'adr_visits') {
      mainContentHtml = renderAdrPanel(state.activeTab);
    } else {
      mainContentHtml = renderAdminDashboard(state.activeTab, state.viewingDecontoCode);
    }
  } else if (user.role === 'UFFICIO' || user.role === 'ADR') {
    if (state.activeTab === 'adr_visits') {
      mainContentHtml = renderAdrPanel(state.activeTab);
    } else {
      mainContentHtml = renderOfficePanel(state.activeTab, state.editingClientId);
    }
  }

  let modalHtml = '';
  if (state.showProfileModal) {
    modalHtml = renderUserProfileModal(user);
  }

  appEl.innerHTML = `
    <div class="app-container">
      ${renderSidebar(user, state.activeTab)}
      <main class="main-content">
        ${mainContentHtml}
      </main>
    </div>
    ${modalHtml}
  `;

  attachMainEventListeners();
}

function attachLoginEventListeners() {
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error-msg');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      try {
        const user = db.authenticate(username, password);
        state.currentUser = user;
        state.activeTab = (user.role === 'ADMIN') ? 'dashboard' : 'clients';
        renderApp();
      } catch (err) {
        errorMsg.innerText = err.message;
        errorMsg.style.display = 'block';
      }
    });
  }
}

function attachMainEventListeners() {
  // Logout Tasto
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      db.logout();
      state.currentUser = null;
      renderApp();
    });
  }

  // Modifica Profilo Utente Corrente
  const btnProfile = document.getElementById('btn-open-profile-modal');
  if (btnProfile) {
    btnProfile.addEventListener('click', () => {
      state.showProfileModal = true;
      renderApp();
    });
  }

  const btnCloseModal = document.getElementById('btn-close-profile-modal');
  const btnCancelProfile = document.getElementById('btn-cancel-profile');
  if (btnCloseModal) btnCloseModal.addEventListener('click', () => { state.showProfileModal = false; renderApp(); });
  if (btnCancelProfile) btnCancelProfile.addEventListener('click', () => { state.showProfileModal = false; renderApp(); });

  const profileForm = document.getElementById('profile-edit-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('edit-user-name').value.trim();
      const username = document.getElementById('edit-user-username').value.trim();
      const email = document.getElementById('edit-user-email').value.trim();
      const newPassword = document.getElementById('edit-user-password').value.trim();

      try {
        const updatedUser = db.updateUserProfile(state.currentUser.id, {
          name,
          username,
          email,
          newPassword: newPassword || undefined
        });
        state.currentUser = updatedUser;
        state.showProfileModal = false;
        alert('✅ Credenziali e Profilo aggiornati con successo!');
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // Cambio Tab Navigazione
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.getAttribute('data-tab');
      if (tab) {
        state.activeTab = tab;
        renderApp();
      }
    });
  });

  // --- MODIFICA SCHEDA CLIENTE & MACCHINA & DECONTO (OFFICE VIEW) ---
  document.querySelectorAll('.btn-edit-client').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      state.editingClientId = id;
      renderApp();
    });
  });

  const btnCloseEditClient = document.getElementById('btn-close-edit-client-modal');
  const btnCancelEditClient = document.getElementById('btn-cancel-edit-client');
  if (btnCloseEditClient) btnCloseEditClient.addEventListener('click', () => { state.editingClientId = null; renderApp(); });
  if (btnCancelEditClient) btnCancelEditClient.addEventListener('click', () => { state.editingClientId = null; renderApp(); });

  const editClientForm = document.getElementById('edit-client-form');
  if (editClientForm) {
    editClientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientId = document.getElementById('edit-client-id').value;
      const name = document.getElementById('edit-cli-name').value;
      const refPerson = document.getElementById('edit-cli-ref').value;
      const phone = document.getElementById('edit-cli-phone').value;
      const city = document.getElementById('edit-cli-city').value;
      const address = document.getElementById('edit-cli-address').value;
      const machineModel = document.getElementById('edit-cli-mc-model').value;
      const machineSerial = document.getElementById('edit-cli-mc-serial').value;
      const shortCode = document.getElementById('edit-cli-shortcode').value;
      const remainingCredits = document.getElementById('edit-cli-credits').value;
      const lowStockThreshold = document.getElementById('edit-cli-threshold').value;
      const boardVersion = document.getElementById('edit-cli-board-version').value;

      try {
        db.updateClientAndMachine(clientId, {
          name,
          refPerson,
          phone,
          city,
          address,
          machineModel,
          machineSerial,
          shortCode,
          remainingCredits,
          lowStockThreshold,
          boardVersion
        });

        state.editingClientId = null;
        alert('✅ Scheda Cliente, Macchina e Deconto aggiornata con successo!');
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // --- MODALE DETTAGLIATORE SCHEDA DECONTO (TELEMETRIA E LOG EROGAZIONI) ---
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

  // --- RINOMINA NOMI CATEGORIE RUOLI (ADMIN) ---
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

  // --- GESTIONE PERSONALE & UTENTI (ADMIN) ---
  const btnToggleAddUser = document.getElementById('btn-toggle-add-user');
  const addUserFormContainer = document.getElementById('add-user-form-container');
  if (btnToggleAddUser && addUserFormContainer) {
    btnToggleAddUser.addEventListener('click', () => {
      addUserFormContainer.style.display = addUserFormContainer.style.display === 'none' ? 'block' : 'none';
    });
  }

  const btnCancelAddUser = document.getElementById('btn-cancel-add-user');
  if (btnCancelAddUser && addUserFormContainer) {
    btnCancelAddUser.addEventListener('click', () => {
      addUserFormContainer.style.display = 'none';
    });
  }

  const btnSaveNewUser = document.getElementById('btn-save-new-user');
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
        db.addUser({ username, password, name, role, email, phone });
        alert(`✅ Utente dipendente "${name}" (Codice ${username}) creato con successo!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // Modifica Utente Dipendente (Modal Edit Staff)
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
    editStaffForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = document.getElementById('edit-staff-id').value;
      const username = document.getElementById('edit-staff-username') ? document.getElementById('edit-staff-username').value : undefined;
      const name = document.getElementById('edit-staff-name').value;
      const role = document.getElementById('edit-staff-role') ? document.getElementById('edit-staff-role').value : undefined;
      const email = document.getElementById('edit-staff-email').value;
      const phone = document.getElementById('edit-staff-phone').value;
      const password = document.getElementById('edit-staff-password').value;

      try {
        db.updateUser(userId, {
          username,
          name,
          role,
          email,
          phone,
          password: password ? password.trim() : undefined
        });

        state.editingStaffUserId = null;
        alert('✅ Scheda Utente aggiornata con successo!');
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

  // --- MATRICE PERMESSI (ADMIN) ---
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

  // Esporta Report Consumi CSV (Admin View)
  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const csv = db.exportCoffeeLogsCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DECONTO_Report_Consumi_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      alert('📥 Report Consumi CSV Scaricato con successo!');
    });
  }

  // Trigger Backup GitHub (Admin View)
  const btnBackup = document.getElementById('btn-trigger-backup');
  if (btnBackup) {
    btnBackup.addEventListener('click', async () => {
      btnBackup.disabled = true;
      btnBackup.innerText = '⏳ Backup in corso su GitHub...';
      const res = await githubBackupService.executeBackupNow();
      alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: https://github.com/emporioboldrini-stack/deconto-app.git\nCommit Hash: ${res.backupRecord.commitHash}\nEntità salvate: ${res.backupRecord.recordCount}`);
      renderApp();
    });
  }

  // Toggle & Registrazione Nuovo Cliente (Office View)
  const btnToggleAdd = document.getElementById('btn-toggle-add-client');
  const addFormContainer = document.getElementById('add-client-form-container');
  if (btnToggleAdd && addFormContainer) {
    btnToggleAdd.addEventListener('click', () => {
      addFormContainer.style.display = addFormContainer.style.display === 'none' ? 'block' : 'none';
    });
  }

  const btnCancelAdd = document.getElementById('btn-cancel-add-client');
  if (btnCancelAdd && addFormContainer) {
    btnCancelAdd.addEventListener('click', () => {
      addFormContainer.style.display = 'none';
    });
  }

  const btnSaveNewClient = document.getElementById('btn-save-new-client');
  if (btnSaveNewClient) {
    btnSaveNewClient.addEventListener('click', () => {
      const name = document.getElementById('new-cli-name').value.trim();
      const refPerson = document.getElementById('new-cli-ref').value.trim();
      const phone = document.getElementById('new-cli-phone').value.trim();
      const city = document.getElementById('new-cli-city').value.trim();
      const machineModel = document.getElementById('new-cli-mc-model').value.trim();
      const shortCode = document.getElementById('new-cli-code').value.trim();
      const initialCredits = document.getElementById('new-cli-credits').value;

      if (!name || !refPerson || !phone) {
        alert('Compila i campi obbligatori: Nome Cliente, Referente e Telefono!');
        return;
      }

      try {
        db.addClient({
          name,
          refPerson,
          phone,
          city,
          address: city,
          machineModel: machineModel || 'Didiesse Frog Revolution',
          shortCode: shortCode || `${Math.floor(1000 + Math.random() * 9000)}`,
          initialCredits
        });

        alert(`✅ Cliente "${name}" registrato con successo ed associato alla scheda Deconto!`);
        renderApp();
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    });
  }

  // Rimuovi Cliente (Office View)
  document.querySelectorAll('.btn-del-client').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Sei sicuro di voler rimuovere questo cliente dal sistema?')) {
        try {
          db.deleteClient(id);
          renderApp();
        } catch (err) {
          alert(`Errore: ${err.message}`);
        }
      }
    });
  });

  // Generatore Ricariche OTP (Office View)
  const btnGenerateOtp = document.getElementById('btn-generate-otp');
  if (btnGenerateOtp) {
    btnGenerateOtp.addEventListener('click', () => {
      const boardShortCode = document.getElementById('otp-board-select').value;
      const credits = parseInt(document.getElementById('otp-credits-select').value, 10);

      const otpCode = `OTP-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const link = `https://deconto-vending-app.web.app/?short=${boardShortCode}&otp=${otpCode}&c=${credits}`;

      document.getElementById('otp-code-val').innerText = otpCode;
      document.getElementById('otp-link-val').innerText = link;

      alert(`✅ Token OTP Generato per Deconto #${boardShortCode} (+${credits} Caffè)!`);
    });
  }

  const btnSendWhatsapp = document.getElementById('btn-send-whatsapp');
  if (btnSendWhatsapp) {
    btnSendWhatsapp.addEventListener('click', () => {
      const link = document.getElementById('otp-link-val').innerText;
      const text = `Gentile cliente, ecco il link per ricaricare la tua macchina da caffè Deconto: ${link}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  const btnCopyOtpLink = document.getElementById('btn-copy-otp-link');
  if (btnCopyOtpLink) {
    btnCopyOtpLink.addEventListener('click', () => {
      const link = document.getElementById('otp-link-val').innerText;
      navigator.clipboard.writeText(link);
      alert('📋 Link Ricarica Copiato negli appunti!');
    });
  }

  // Stampa Etichetta QR Code (Office View)
  const btnPrintQr = document.getElementById('btn-print-qr');
  if (btnPrintQr) {
    btnPrintQr.addEventListener('click', () => {
      window.print();
    });
  }

  const qrHeaderInput = document.getElementById('qr-header-input');
  if (qrHeaderInput) {
    qrHeaderInput.addEventListener('input', (e) => {
      document.getElementById('lbl-header-title').innerText = `☕ ${e.target.value.toUpperCase()} ☕`;
    });
  }

  const qrBoardSelect = document.getElementById('qr-board-select');
  if (qrBoardSelect) {
    qrBoardSelect.addEventListener('change', (e) => {
      const details = db.getBoardFullDetails(e.target.value);
      if (details) {
        document.getElementById('lbl-short-code-display').innerText = details.board.shortCode;
        document.getElementById('lbl-mc-sn').innerText = details.machine ? details.machine.serialNumber : 'N/D';
        document.getElementById('lbl-hw-sn').innerText = details.board.hwSerial;
      }
    });
  }

  // ADR Ricarica Bluetooth BLE
  const btnAdrBleConnect = document.getElementById('btn-adr-ble-connect');
  if (btnAdrBleConnect) {
    btnAdrBleConnect.addEventListener('click', async () => {
      const code = document.getElementById('adr-code-input').value.trim();
      const credits = parseInt(document.getElementById('adr-credits-select').value, 10);
      const statusBox = document.getElementById('adr-status-box');

      if (!code) {
        alert('Inserisci il codice a 4 cifre!');
        return;
      }

      statusBox.style.display = 'block';
      statusBox.innerHTML = `📡 Scansione Bluetooth BLE per <strong>DECONTO_${code}</strong> in corso...`;

      try {
        const res = await bleService.sendRefillOtpToken(code, credits, 'ADR_BLE_MANUAL');
        db.performRefill({ boardShortCode: code, credits, method: 'BLE_PWA', operatorId: state.currentUser ? state.currentUser.id : 'usr_003' });

        statusBox.innerHTML = `<span style="color: var(--accent-green);">✅ Ricarica Completata! Accreditate <strong>+${credits} cialde</strong> sulla macchina #${code}. Relè Ripristinato.</span>`;
        setTimeout(() => renderApp(), 2000);
      } catch (err) {
        statusBox.innerHTML = `<span style="color: var(--accent-rose);">❌ Errore connessione: ${err.message}</span>`;
      }
    });
  }

  document.querySelectorAll('.btn-adr-quick-fill').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.getAttribute('data-code');
      const res = await bleService.sendRefillOtpToken(code, 200, 'ADR_QUICK_BLE');
      db.performRefill({ boardShortCode: code, credits: 200, method: 'BLE_PWA', operatorId: state.currentUser ? state.currentUser.id : 'usr_003' });
      alert(`✅ Ricaricate +200 cialde via Bluetooth sulla macchina #${code}!`);
      renderApp();
    });
  });

  // Simulatore Hardware Interattivo
  const simBoardSelect = document.getElementById('sim-board-select');
  if (simBoardSelect) {
    simBoardSelect.addEventListener('change', (e) => {
      const shortCode = e.target.value;
      const details = db.getBoardFullDetails(shortCode);
      if (details) {
        document.getElementById('sim-badge-code').innerText = `DECONTO ${shortCode}`;
        document.getElementById('sim-credits-display').innerText = details.board.remainingCredits;
      }
    });
  }

  const btnSimBrew = document.getElementById('btn-sim-brew');
  if (btnSimBrew) {
    btnSimBrew.addEventListener('click', () => {
      const select = document.getElementById('sim-board-select');
      const shortCode = select ? select.value : '3467';

      document.getElementById('signal-sense-volts').innerText = '230V AC (Impulso)';
      document.getElementById('signal-sense-badge').className = 'badge badge-warning';
      document.getElementById('signal-sense-badge').innerText = 'EROGAZIONE IN CORSO';

      const res = db.registerCoffeeExtraction(shortCode, 22, 1);

      setTimeout(() => {
        document.getElementById('signal-sense-volts').innerText = '0V AC';
        document.getElementById('signal-sense-badge').className = 'badge badge-info';
        document.getElementById('signal-sense-badge').innerText = 'INATTIVO';

        if (res && res.success) {
          const consoleEl = document.getElementById('sim-console-log');
          consoleEl.innerHTML += `[EXTRACTION]: Caffè erogato! Credito rimanente: ${res.remainingCredits}.<br>`;
          consoleEl.scrollTop = consoleEl.scrollHeight;

          if (res.isLowStock) {
            consoleEl.innerHTML += `<span style="color: var(--accent-amber);">[BUZZER 60s]: CREDITO &lt; 20! SEGNALE ACUSTICO ATTIVATO (BIP... BIP...).</span><br>`;
          }
        } else if (res && !res.success) {
          const consoleEl = document.getElementById('sim-console-log');
          consoleEl.innerHTML += `<span style="color: var(--accent-rose);">[HARDWARE LOCK]: CREDITO 0! RELÈ APERTO. POMPA DISATTIVATA.</span><br>`;
        }

        renderApp();
      }, 800);
    });
  }

  const btnSimReset = document.getElementById('btn-sim-reset');
  if (btnSimReset) {
    btnSimReset.addEventListener('click', () => {
      const select = document.getElementById('sim-board-select');
      const shortCode = select ? select.value : '3467';
      db.performRefill({ boardShortCode: shortCode, credits: 200, method: 'TEST_BENCH', operatorId: state.currentUser ? state.currentUser.id : 'usr_001' });
      alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${shortCode}!`);
      renderApp();
    });
  }
}

document.addEventListener('DOMContentLoaded', renderApp);
