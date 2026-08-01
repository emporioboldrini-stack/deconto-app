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

  viewingKpiModal: null, // 'kpi_clients' | 'kpi_machines' | 'kpi_extractions' | 'kpi_lowstock'
  kpiPeriod: '30DAYS',    // '30DAYS' | '90DAYS' | '1YEAR'
  kpiChartType: 'LINE'   // 'LINE' | 'BAR'
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
        state.kpiChartType
      );
    }
  } else if (user.role === 'ADR') {
    if (state.activeTab === 'adr_visits') {
      mainContentHtml = renderAdrPanel(state.activeTab);
    } else {
      mainContentHtml = renderOfficePanel(state.activeTab, state.editingId);
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
  // Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      db.logout();
      state.currentUser = null;
      renderApp();
    });
  }

  // Profilo Utente
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

  // Navigazione Tab
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.getAttribute('data-tab');
      if (tab) {
        state.activeTab = tab;
        state.editingId = null;
        renderApp();
      }
    });
  });

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
        state.dashSortDirection = 'ASC';
      }
      renderApp();
    });
  });

  // --- 📟 DASHBOARD: POP-UP MODALE SCHEDA DECONTO (TASTO 5 - NUMERO DECONTO) ---
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

  // Export CSV & Backup GitHub
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

  // --- STEP 3: 🏢 ANAGRAFICA CLIENTE EVENTI ---
  const btnToggleAddCli = document.getElementById('btn-toggle-add-client');
  const addCliContainer = document.getElementById('add-client-form-container');
  if (btnToggleAddCli && addCliContainer) {
    btnToggleAddCli.addEventListener('click', () => {
      addCliContainer.style.display = addCliContainer.style.display === 'none' ? 'block' : 'none';
    });
  }
  const btnCancelAddCli = document.getElementById('btn-cancel-add-client');
  if (btnCancelAddCli && addCliContainer) {
    btnCancelAddCli.addEventListener('click', () => { addCliContainer.style.display = 'none'; });
  }

  const btnSaveNewClient = document.getElementById('btn-save-new-client');
  if (btnSaveNewClient) {
    btnSaveNewClient.addEventListener('click', () => {
      const name = document.getElementById('new-cli-name').value.trim();
      const refPerson = document.getElementById('new-cli-ref').value.trim();
      const phone = document.getElementById('new-cli-phone').value.trim();
      const email = document.getElementById('new-cli-email').value.trim();
      const city = document.getElementById('new-cli-city').value.trim();
      const address = document.getElementById('new-cli-address').value.trim();
      const machineId = document.getElementById('new-cli-machine') ? document.getElementById('new-cli-machine').value : null;

      if (!name) { alert('Compila la Ragione Sociale del Cliente!'); return; }

      try {
        db.addClient({ name, refPerson, phone, email, city, address, machineId });
        alert(`✅ Cliente "${name}" salvato ed installato con successo!`);
        renderApp();
      } catch (err) { alert(`Errore: ${err.message}`); }
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
      if (confirm('Eliminare questo cliente dall\'anagrafica? Le macchine collegate torneranno in magazzino.')) {
        try {
          db.deleteClient(id);
          renderApp();
        } catch(err) { alert(err.message); }
      }
    });
  });

  const formEditClient = document.getElementById('form-edit-client');
  if (formEditClient) {
    formEditClient.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-client-id').value;
      const name = document.getElementById('edit-cli-name').value;
      const refPerson = document.getElementById('edit-cli-ref').value;
      const phone = document.getElementById('edit-cli-phone').value;
      const city = document.getElementById('edit-cli-city').value;
      const address = document.getElementById('edit-cli-address').value;
      const assignedMachineId = document.getElementById('edit-cli-machine') ? document.getElementById('edit-cli-machine').value : undefined;

      try {
        db.updateClient(id, { name, refPerson, phone, city, address, assignedMachineId });
        state.editingId = null;
        alert('✅ Scheda Cliente e Macchina installata aggiornata!');
        renderApp();
      } catch(err) { alert(err.message); }
    });
  }

  // --- STEP 2: ☕ ANAGRAFICA MACCHINE EVENTI ---
  const btnToggleAddMc = document.getElementById('btn-toggle-add-machine');
  const addMcContainer = document.getElementById('add-machine-form-container');
  if (btnToggleAddMc && addMcContainer) {
    btnToggleAddMc.addEventListener('click', () => {
      addMcContainer.style.display = addMcContainer.style.display === 'none' ? 'block' : 'none';
    });
  }
  const btnCancelAddMc = document.getElementById('btn-cancel-add-machine');
  if (btnCancelAddMc && addMcContainer) {
    btnCancelAddMc.addEventListener('click', () => { addMcContainer.style.display = 'none'; });
  }

  const btnSaveNewMachine = document.getElementById('btn-save-new-machine');
  if (btnSaveNewMachine) {
    btnSaveNewMachine.addEventListener('click', () => {
      const serialNumber = document.getElementById('new-mc-serial').value.trim();
      const brand = document.getElementById('new-mc-brand').value.trim();
      const model = document.getElementById('new-mc-model').value.trim();
      const boardId = document.getElementById('new-mc-board') ? document.getElementById('new-mc-board').value : null;
      const clientId = document.getElementById('new-mc-client').value;

      if (!serialNumber || !model) { alert('Compila Seriale e Modello della macchina!'); return; }

      try {
        db.addMachine({ serialNumber, brand, model, boardId, clientId });
        alert(`✅ Macchina "${serialNumber}" registrata ed associata nel parco macchine!`);
        renderApp();
      } catch (err) { alert(`Errore: ${err.message}`); }
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
      if (confirm('Eliminare questa macchina dal parco macchine?')) {
        try {
          db.deleteMachine(id);
          renderApp();
        } catch(err) { alert(err.message); }
      }
    });
  });

  const formEditMachine = document.getElementById('form-edit-machine');
  if (formEditMachine) {
    formEditMachine.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-mc-id').value;
      const serialNumber = document.getElementById('edit-mc-serial').value;
      const brand = document.getElementById('edit-mc-brand').value;
      const model = document.getElementById('edit-mc-model').value;
      const boardId = document.getElementById('edit-mc-board') ? document.getElementById('edit-mc-board').value : undefined;
      const clientId = document.getElementById('edit-mc-client').value;

      try {
        db.updateMachine(id, { serialNumber, brand, model, boardId, clientId });
        state.editingId = null;
        alert('✅ Macchina da Caffè e Scheda Deconto collegate con successo!');
        renderApp();
      } catch(err) { alert(err.message); }
    });
  }

  // --- STEP 1: 📟 ANAGRAFICA SCHEDE DECONTO EVENTI ---
  const btnToggleAddBoard = document.getElementById('btn-toggle-add-board');
  const addBoardContainer = document.getElementById('add-board-form-container');
  if (btnToggleAddBoard && addBoardContainer) {
    btnToggleAddBoard.addEventListener('click', () => {
      addBoardContainer.style.display = addBoardContainer.style.display === 'none' ? 'block' : 'none';
    });
  }
  const btnCancelAddBoard = document.getElementById('btn-cancel-add-board');
  if (btnCancelAddBoard && addBoardContainer) {
    btnCancelAddBoard.addEventListener('click', () => { addBoardContainer.style.display = 'none'; });
  }

  const btnSaveNewBoard = document.getElementById('btn-save-new-board');
  if (btnSaveNewBoard) {
    btnSaveNewBoard.addEventListener('click', () => {
      const shortCode = document.getElementById('new-board-code').value.trim();
      const hwSerial = document.getElementById('new-board-hwserial').value.trim();
      const remainingCredits = document.getElementById('new-board-credits').value;
      const version = document.getElementById('new-board-version').value;
      const machineId = document.getElementById('new-board-machine').value;

      if (!shortCode) { alert('Inserisci il codice a 4 cifre per la Scheda Deconto (es. 9902)!'); return; }

      try {
        db.addBoard({ shortCode, hwSerial, remainingCredits, version, machineId });
        alert(`✅ NUOVA SCHEDA DECONTO #${shortCode} CREATA CON SUCCESSO!`);
        renderApp();
      } catch (err) { alert(`Errore: ${err.message}`); }
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
      if (confirm('Eliminare questa Scheda Hardware Deconto?')) {
        try {
          db.deleteBoard(id);
          renderApp();
        } catch(err) { alert(err.message); }
      }
    });
  });

  const formEditBoard = document.getElementById('form-edit-board');
  if (formEditBoard) {
    formEditBoard.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-board-id').value;
      const shortCode = document.getElementById('edit-board-shortcode').value;
      const hwSerial = document.getElementById('edit-board-hwserial').value;
      const remainingCredits = document.getElementById('edit-board-credits').value;
      const lowStockThreshold = document.getElementById('edit-board-threshold').value;
      const version = document.getElementById('edit-board-version').value;
      const machineId = document.getElementById('edit-board-machine').value;

      try {
        db.updateBoard(id, { shortCode, hwSerial, remainingCredits, lowStockThreshold, version, machineId });
        state.editingId = null;
        alert('✅ Scheda Deconto aggiornata con successo!');
        renderApp();
      } catch(err) { alert(err.message); }
    });
  }

  // Chiusura Modali Generiche
  document.querySelectorAll('#btn-close-edit-modal, #btn-cancel-edit-client, #btn-cancel-edit-mc, #btn-cancel-edit-board').forEach(btn => {
    btn.addEventListener('click', () => {
      state.editingId = null;
      renderApp();
    });
  });

  // Simulatore Hardware
  const simBoardSelect = document.getElementById('sim-board-select');
  if (simBoardSelect) {
    simBoardSelect.addEventListener('change', (e) => {
      state.selectedSimBoardCode = e.target.value;
      renderApp();
    });
  }

  const btnSimBrew = document.getElementById('btn-sim-brew');
  if (btnSimBrew) {
    btnSimBrew.addEventListener('click', () => {
      const shortCode = state.selectedSimBoardCode || '9901';
      document.getElementById('signal-sense-volts').innerText = '230V AC (Impulso)';
      document.getElementById('signal-sense-badge').className = 'badge badge-warning';
      document.getElementById('signal-sense-badge').innerText = 'EROGAZIONE IN CORSO';

      const res = db.registerCoffeeExtraction(shortCode, 22, 1);

      setTimeout(() => {
        if (res && res.success) {
          const consoleEl = document.getElementById('sim-console-log');
          if (consoleEl) {
            consoleEl.innerHTML += `[EXTRACTION]: Caffè erogato su #${shortCode}! Credito rimanente: ${res.remainingCredits}.<br>`;
            consoleEl.scrollTop = consoleEl.scrollHeight;
          }
        }
        renderApp();
      }, 600);
    });
  }

  const btnSimReset = document.getElementById('btn-sim-reset');
  if (btnSimReset) {
    btnSimReset.addEventListener('click', () => {
      const shortCode = state.selectedSimBoardCode || '9901';
      db.performRefill({ boardShortCode: shortCode, credits: 200, method: 'TEST_BENCH', operatorId: state.currentUser ? state.currentUser.id : 'usr_001' });
      alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${shortCode}!`);
      renderApp();
    });
  }
}

document.addEventListener('DOMContentLoaded', renderApp);
