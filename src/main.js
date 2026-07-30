import './styles/index.css';
import { db } from './db/database.js';
import { bleService } from './services/bluetooth.js';
import { githubBackupService } from './services/githubBackup.js';
import { renderSidebar } from './components/Navigation.js';
import { renderAdminDashboard } from './components/AdminDashboard.js';
import { renderOfficePanel } from './components/OfficePanel.js';
import { renderAdrPanel } from './components/AdrPanel.js';
import { renderClientDiyPanel } from './components/ClientDiyPanel.js';
import { renderHardwareSimulator } from './components/HardwareSimulator.js';

let state = {
  currentRole: 'ADMIN',
  activeTab: 'dashboard'
};

function renderApp() {
  const appEl = document.getElementById('app');

  let mainContentHtml = '';
  if (state.activeTab === 'simulator') {
    mainContentHtml = renderHardwareSimulator();
  } else if (state.currentRole === 'ADMIN') {
    mainContentHtml = renderAdminDashboard(state.activeTab);
  } else if (state.currentRole === 'UFFICIO') {
    mainContentHtml = renderOfficePanel(state.activeTab);
  } else if (state.currentRole === 'ADR') {
    mainContentHtml = renderAdrPanel(state.activeTab);
  } else if (state.currentRole === 'CLIENT_DIY') {
    mainContentHtml = renderClientDiyPanel();
  }

  appEl.innerHTML = `
    <div class="app-container">
      ${renderSidebar(state.currentRole, state.activeTab, onTabChange, onRoleChange)}
      <main class="main-content">
        ${mainContentHtml}
      </main>
    </div>
  `;

  attachEventListeners();
}

function onTabChange(newTab) {
  state.activeTab = newTab;
  renderApp();
}

function onRoleChange(newRole) {
  state.currentRole = newRole;
  if (newRole === 'ADMIN') state.activeTab = 'dashboard';
  else if (newRole === 'UFFICIO') state.activeTab = 'clients';
  else if (newRole === 'ADR') state.activeTab = 'adr_visits';
  else if (newRole === 'CLIENT_DIY') state.activeTab = 'client_refill';
  renderApp();
}

function attachEventListeners() {
  // Cambio Ruolo Utente
  const roleSelect = document.getElementById('role-selector');
  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      onRoleChange(e.target.value);
    });
  }

  // Cambio Tab Navigazione
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.getAttribute('data-tab');
      if (tab) onTabChange(tab);
    });
  });

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
    });
  }

  // Rimuovi Cliente (Office View)
  document.querySelectorAll('.btn-del-client').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Sei sicuro di voler rimuovere questo cliente dal sistema?')) {
        db.deleteClient(id);
        renderApp();
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
        db.performRefill({ boardShortCode: code, credits, method: 'BLE_PWA', operatorId: 'usr_adr_1' });

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
      db.performRefill({ boardShortCode: code, credits: 200, method: 'BLE_PWA', operatorId: 'usr_adr_1' });
      alert(`✅ Ricaricate +200 cialde via Bluetooth sulla macchina #${code}!`);
      renderApp();
    });
  });

  // Ricarica Fai-da-Te Cliente (Client View)
  const btnClientDiyRefill = document.getElementById('btn-client-diy-refill');
  if (btnClientDiyRefill) {
    btnClientDiyRefill.addEventListener('click', async () => {
      btnClientDiyRefill.disabled = true;
      btnClientDiyRefill.innerText = '📡 Connessione Bluetooth alla Macchina #3467...';
      const msg = document.getElementById('diy-status-msg');

      try {
        await bleService.sendRefillOtpToken('3467', 200, 'OTP-9981-X79K2');
        db.performRefill({ boardShortCode: '3467', credits: 200, method: 'WHATSAPP_OTP_BLE', operatorId: 'cli_3', tokenOtp: 'OTP-9981-X79K2' });

        msg.innerHTML = `<span style="color: var(--accent-green); font-weight: 800; font-size: 1.1rem;">🎉 RICARICA COMPLETATA! +200 CAFFÈ ACCREDITATI SULLA TUA MACCHINA.</span>`;
        btnClientDiyRefill.innerText = '✓ RICARICATO CON SUCCESSO';
        btnClientDiyRefill.style.background = 'var(--accent-green)';
      } catch (e) {
        msg.innerHTML = `<span style="color: var(--accent-rose);">Errore: ${e.message}</span>`;
        btnClientDiyRefill.disabled = false;
      }
    });
  }

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
      db.performRefill({ boardShortCode: shortCode, credits: 200, method: 'TEST_BENCH', operatorId: 'usr_admin' });
      alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${shortCode}!`);
      renderApp();
    });
  }
}

document.addEventListener('DOMContentLoaded', renderApp);
