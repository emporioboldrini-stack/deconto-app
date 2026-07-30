(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`DECONTO_DB_V1`,t={users:[{id:`usr_admin`,name:`Marco Rossi (Admin)`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`},{id:`usr_ufficio`,name:`Laura Bianchi (Ufficio)`,email:`ufficio@deconto.it`,role:`UFFICIO`,avatar:`👩‍💻`},{id:`usr_adr_1`,name:`Giuseppe Verdi (ADR Zona Nord)`,email:`adr.nord@deconto.it`,role:`ADR`,avatar:`🚚`},{id:`usr_adr_2`,name:`Antonio Neri (ADR Zona Sud)`,email:`adr.sud@deconto.it`,role:`ADR`,avatar:`🚚`}],clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`,status:`ACTIVE`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`,status:`ACTIVE`},{id:`cli_3`,name:`Studio Legale Brambilla`,refPerson:`Avv. Brambilla`,phone:`+39 02 4443322`,address:`Via Montenapoleone 8, Milano`,city:`Milano`,status:`WARNING`},{id:`cli_4`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`,status:`ACTIVE`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-7711`,model:`Didiesse Frog Revolution`,clientId:`cli_3`,installDate:`2026-02-20`},{id:`mc_4`,serialNumber:`SN-MC-2026-4409`,model:`Spinel Pinocchio Professional`,clientId:`cli_4`,installDate:`2026-03-05`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_5510`,shortCode:`5510`,hwSerial:`DC-HW-9910`,macAddress:`C6:3F:8A:33:55:10`,machineId:`mc_3`,version:`BASIC`,remainingCredits:12,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,lastSyncDate:new Date(Date.now()-10368e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_4`,version:`BASIC`,remainingCredits:0,lowStockThreshold:20,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,lastSyncDate:new Date().toISOString()}],refillLogs:[{id:`ref_101`,boardId:`board_3467`,shortCode:`3467`,creditsAdded:200,tokenOtp:`OTP-9981-X79K2`,operatorType:`ADR`,operatorId:`usr_adr_1`,timestamp:new Date(Date.now()-1296e6).toISOString(),method:`BLE_PWA`},{id:`ref_102`,boardId:`board_5510`,shortCode:`5510`,creditsAdded:150,tokenOtp:`OTP-4412-M28P0`,operatorType:`CLIENT_DIY`,operatorId:`cli_3`,timestamp:new Date(Date.now()-216e7).toISOString(),method:`WHATSAPP_OTP_BLE`}],coffeeLogs:[{id:`log_1`,boardId:`board_3467`,timestamp:new Date(Date.now()-72e5).toISOString(),durationSeconds:22,groupId:1},{id:`log_2`,boardId:`board_3467`,timestamp:new Date(Date.now()-144e5).toISOString(),durationSeconds:21,groupId:1},{id:`log_3`,boardId:`board_5510`,timestamp:new Date(Date.now()-216e5).toISOString(),durationSeconds:38,groupId:1},{id:`log_4`,boardId:`board_1289`,timestamp:new Date(Date.now()-36e6).toISOString(),durationSeconds:20,groupId:1},{id:`log_5`,boardId:`board_1289`,timestamp:new Date(Date.now()-396e5).toISOString(),durationSeconds:23,groupId:2}],backupLogs:[{id:`bak_001`,timestamp:new Date(Date.now()-864e5).toISOString(),repo:`deconto-org/deconto-db-backups`,commitHash:`a1b2c3d4e5`,status:`SUCCESS`,recordCount:28}]},n=new class{constructor(){this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(e);if(t)return JSON.parse(t)}catch(e){console.warn(`Impossibile caricare da localStorage, uso dati di default:`,e)}return this.saveData(t),t}saveData(t){this.data=t||this.data;try{localStorage.setItem(e,JSON.stringify(this.data))}catch(e){console.error(`Errore nel salvataggio localStorage:`,e)}}getUsers(){return this.data.users}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs}getBackupLogs(){return this.data.backupLogs}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:this.data.coffeeLogs.filter(e=>e.boardId===t.id)}}saveClient(e){let t=this.data.clients.findIndex(t=>t.id===e.id);if(t>=0)this.data.clients[t]={...this.data.clients[t],...e};else{let t={...e,id:`cli_`+Date.now()};this.data.clients.push(t)}this.saveData()}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto con codice ${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||`usr_ufficio`,timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<r.lowStockThreshold,relayStatus:r.relayStatus}}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`deconto-org/deconto-db-backups`,commitHash:Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}},r=new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}},i=new class{constructor(){this.repoUrl=`https://github.com/deconto-org/deconto-db-backups`}generateDatabaseSnapshot(){return{version:`1.0.0`,timestamp:new Date().toISOString(),data:n.data}}async executeBackupNow(){let e=this.generateDatabaseSnapshot(),t=JSON.stringify(e,null,2);return await new Promise(e=>setTimeout(e,1200)),{success:!0,backupRecord:n.triggerGitHubBackup(),sizeBytes:new Blob([t]).size,snapshotTimestamp:e.timestamp}}};function a(e,t,n,r){let i=[{id:`ADMIN`,label:`👨‍💼 Admin`,desc:`BI, Report & Manutenzione`},{id:`UFFICIO`,label:`👩‍💻 Ufficio`,desc:`Anagrafiche, Etichette QR, OTP`},{id:`ADR`,label:`🚚 ADR (Agente)`,desc:`Giro Consegne & Sync BLE`},{id:`CLIENT_DIY`,label:`📱 Cliente Fai-da-Te`,desc:`Ricarica da Link WhatsApp`}],a=[];return e===`ADMIN`?a=[{id:`dashboard`,label:`📊 Dashboard BI`,icon:`📈`},{id:`clients`,label:`🏢 Clienti & Parco`,icon:`🏢`},{id:`maintenance`,label:`🛠️ Manutenzione Predittiva`,icon:`⚠️`},{id:`backups`,label:`💾 Backup GitHub`,icon:`🐙`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]:e===`UFFICIO`?a=[{id:`clients`,label:`🏢 Gestione Clienti`,icon:`🏢`},{id:`qr_generator`,label:`🏷️ Generatore Etichette QR`,icon:`🖨️`},{id:`otp_generator`,label:`🔑 Genera Ricariche OTP`,icon:`💬`},{id:`refills_history`,label:`📋 Storico Ricariche`,icon:`🧾`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]:e===`ADR`?a=[{id:`adr_visits`,label:`🗺️ Giro Consegne Oggi`,icon:`🚚`},{id:`adr_scan`,label:`📡 Ricarica BLE (Codice/QR)`,icon:`📶`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]:e===`CLIENT_DIY`&&(a=[{id:`client_refill`,label:`📱 Ricarica 1-Click WhatsApp`,icon:`✨`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]),`
    <aside class="sidebar">
      <div class="brand-logo">
        <div class="brand-icon">☕</div>
        <div>
          <div class="brand-title">DECONTO</div>
          <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600;">IoT Vending System</div>
        </div>
      </div>

      <div style="margin-bottom: 24px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
          Seleziona Ruolo Utente:
        </label>
        <select id="role-selector" style="width: 100%; padding: 8px; background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 600;">
          ${i.map(t=>`<option value="${t.id}" ${t.id===e?`selected`:``}>${t.label}</option>`).join(``)}
        </select>
      </div>

      <div class="nav-group">
        <div style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase; margin-bottom: 8px; padding-left: 8px;">
          Menu Principale
        </div>
        ${a.map(e=>`
          <div class="nav-item ${e.id===t?`active`:``}" data-tab="${e.id}">
            <span>${e.icon}</span>
            <span>${e.label}</span>
          </div>
        `).join(``)}
      </div>

      <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 0.75rem; color: var(--text-dim); text-align: center;">
        Dispositivo target: <strong>ESP32-C6</strong><br>Firmware v2.1.0 (Wi-Fi 6 + BLE)
      </div>
    </aside>
  `}function o(e){let t=n.getClients();n.getMachines();let r=n.getBoards(),i=n.getRefillLogs(),a=n.getCoffeeLogs(),o=n.getBackupLogs();r.reduce((e,t)=>e+t.remainingCredits,0),i.length;let s=a.length+14820,c=r.filter(e=>e.remainingCredits<e.lowStockThreshold&&e.remainingCredits>0).length,l=r.filter(e=>e.remainingCredits<=0).length;if(e===`backups`)return`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">🐙 Pipeline Backup Automatico GitHub</h1>
            <p style="color: var(--text-muted);">Snapshot del Database versionati quotidianamente su repository privato</p>
          </div>
          <button id="btn-trigger-backup" class="btn btn-primary">
            ⚡ Esegui Backup Adesso
          </button>
        </div>

        <div class="card-grid" style="margin-bottom: 24px;">
          <div class="stat-card success">
            <div class="stat-label">Repository GitHub Target</div>
            <div class="stat-value" style="font-size: 1.2rem; color: var(--accent-cyan);">deconto-org/deconto-db-backups</div>
            <div class="stat-desc">Accesso crittografato SSH / SSH Key</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Frequenza Backup</div>
            <div class="stat-value">Quotidiana</div>
            <div class="stat-desc">Ogni notte alle 03:00 UTC</div>
          </div>
          <div class="stat-card success">
            <div class="stat-label">Ultimo Backup</div>
            <div class="stat-value" style="font-size: 1.1rem; color: var(--accent-green);">
              ${o.length>0?new Date(o[0].timestamp).toLocaleString(`it-IT`):`N/D`}
            </div>
            <div class="stat-desc">Commit: <code>${o.length>0?o[0].commitHash:`N/D`}</code></div>
          </div>
        </div>

        <div class="table-container">
          <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle);">
            📜 Storico Commit & Backup GitHub
          </div>
          <table>
            <thead>
              <tr>
                <th>ID Backup</th>
                <th>Data & Ora</th>
                <th>Repository</th>
                <th>Commit Hash</th>
                <th>Record Salvati</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              ${o.map(e=>`
                <tr>
                  <td><code>${e.id}</code></td>
                  <td>${new Date(e.timestamp).toLocaleString(`it-IT`)}</td>
                  <td><code>${e.repo}</code></td>
                  <td><code>${e.commitHash}</code></td>
                  <td>${e.recordCount} entità DB</td>
                  <td><span class="badge badge-success">✓ SUCCESS</span></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `;if(e===`maintenance`){let e=a.filter(e=>e.durationSeconds>30);return`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🛠️ Telemetria & Manutenzione Predittiva</h1>
          <p style="color: var(--text-muted);">Rilevamento automatico di anomalie nella durata delle erogazioni (indizio di calcare o pompe ostruite)</p>
        </div>

        <div class="card-grid" style="margin-bottom: 24px;">
          <div class="stat-card warning">
            <div class="stat-label">Allarmi Calcare / Ostruzioni</div>
            <div class="stat-value" style="color: var(--accent-amber);">${e.length}</div>
            <div class="stat-desc">Macchine che richiedono decalcificazione</div>
          </div>
          <div class="stat-card success">
            <div class="stat-label">Tempo Medio Erogazione</div>
            <div class="stat-value">22.4 sec</div>
            <div class="stat-desc">Parametro ottimale: 20-25 secondi</div>
          </div>
        </div>

        <div class="table-container">
          <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle);">
            ⚠️ Segnalazioni di Manutenzione Predittiva
          </div>
          <table>
            <thead>
              <tr>
                <th>Cliente / Ubicazione</th>
                <th>Codice Deconto</th>
                <th>Seriale Macchina</th>
                <th>Durata Rilevata</th>
                <th>Anomalia Presunta</th>
                <th>Azione Consigliata</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(e=>{let t=n.getBoardFullDetails(e.boardId);return`
                  <tr>
                    <td><strong>${t.client?t.client.name:`N/D`}</strong><br><small style="color: var(--text-muted);">${t.client?t.client.city:``}</small></td>
                    <td><span class="badge badge-info">${t.board.shortCode}</span></td>
                    <td><code>${t.machine?t.machine.serialNumber:`N/D`}</code></td>
                    <td><strong style="color: var(--accent-rose);">${e.durationSeconds} secondi</strong></td>
                    <td><span class="badge badge-warning">Calcare / Ostruzione Filtro</span></td>
                    <td><button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">📅 Programma Visita Tecnico</button></td>
                  </tr>
                `}).join(``)}
              ${e.length===0?`<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">Nessuna anomalia manutentiva rilevata al momento.</td></tr>`:``}
            </tbody>
          </table>
        </div>
      </div>
    `}return`
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Dashboard Esecutiva BI</h1>
        <p style="color: var(--text-muted);">Panoramica in tempo reale del parco macchine e dei consumi erogati</p>
      </div>

      <!-- Stat Cards -->
      <div class="card-grid">
        <div class="stat-card">
          <div class="stat-label">Clienti Attivi</div>
          <div class="stat-value">${t.length}</div>
          <div class="stat-desc">Macchine in comodato d'uso</div>
        </div>
        <div class="stat-card success">
          <div class="stat-label">Caffè Erogati Totali</div>
          <div class="stat-value" style="color: var(--accent-green);">${s.toLocaleString()}</div>
          <div class="stat-desc">Conteggiati da schede Deconto</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">Macchine Sottoscorta (&lt;20)</div>
          <div class="stat-value" style="color: var(--accent-amber);">${c}</div>
          <div class="stat-desc">Avviso acustico 60s attivo</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-label">Macchine in Blocco (0)</div>
          <div class="stat-value" style="color: var(--accent-rose);">${l}</div>
          <div class="stat-desc">Relè aperto - Erogazione disattivata</div>
        </div>
      </div>

      <!-- Tabella Stato Parco Macchine -->
      <div class="table-container">
        <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <span>☕ Stato Dispositivi Deconto sul Campo</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Chip HW: ESP32-C6</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Codice</th>
              <th>Cliente & Indirizzo</th>
              <th>Seriale Macchina</th>
              <th>Crediti Residui</th>
              <th>Stato Relè</th>
              <th>Connessione</th>
              <th>Ultimo Sync</th>
            </tr>
          </thead>
          <tbody>
            ${r.map(e=>{let t=n.getBoardFullDetails(e.id),r=e.remainingCredits<=0,i=e.remainingCredits<e.lowStockThreshold&&!r;return`
                <tr>
                  <td><span class="badge badge-info">3467: ${e.shortCode}</span></td>
                  <td>
                    <strong>${t.client?t.client.name:`Non Assegnato`}</strong><br>
                    <small style="color: var(--text-muted);">${t.client?t.client.address:``}</small>
                  </td>
                  <td><code>${t.machine?t.machine.serialNumber:`N/D`}</code></td>
                  <td>
                    <strong style="font-size: 1.1rem; color: ${r?`var(--accent-rose)`:i?`var(--accent-amber)`:`var(--accent-green)`}">
                      ${e.remainingCredits} caffè
                    </strong>
                  </td>
                  <td>
                    ${r?`<span class="badge badge-danger">🔒 APERTO (BLOCCO)</span>`:`<span class="badge badge-success">🔓 CHIUSO (OK)</span>`}
                  </td>
                  <td>
                    ${e.isOnlineWifi?`<span class="badge badge-success">🌐 Wi-Fi 6 Online</span>`:`<span class="badge badge-info">📡 Offline (BLE Only)</span>`}
                  </td>
                  <td><small style="color: var(--text-muted);">${new Date(e.lastSyncDate).toLocaleDateString(`it-IT`)}</small></td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function s(e){let t=n.getClients(),r=n.getBoards();return e===`qr_generator`?`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🖨️ Generatore Etichette Adesive QR Code</h1>
          <p style="color: var(--text-muted);">Crea e stampa l'etichetta fisica da incollare sulla macchina da caffè</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <!-- Modulo di Configurazione -->
          <div class="stat-card" style="padding: 24px;">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">Seleziona Macchina / Deconto:</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Seleziona Scheda Deconto:</label>
              <select id="qr-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                ${r.map(e=>{let t=n.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${e.shortCode} - ${t.client?t.client.name:`N/D`} (${t.machine?t.machine.serialNumber:``})</option>`}).join(``)}
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Intestazione Aziendale:</label>
              <input type="text" value="DECONTO IoT System - Comodato Gratuito" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
            </div>

            <button id="btn-print-qr" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              🖨️ Stampa Etichetta Termica Adesiva
            </button>
          </div>

          <!-- Anteprima Etichetta Adesiva (Preview) -->
          <div>
            <h3 style="margin-top: 0; color: var(--text-muted);">Anteprima Stampa Etichetta:</h3>
            
            <div id="qr-sticker-preview" style="background: #ffffff; color: #000000; padding: 24px; border-radius: 12px; font-family: monospace; border: 3px dashed #000; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 12px;">
                ☕ DECONTO COFFEE CONTROL ☕
              </div>
              
              <div style="font-size: 3rem; font-weight: 900; letter-spacing: 4px; margin: 8px 0; color: #000;">
                3467
              </div>
              
              <div style="display: flex; justify-content: center; margin: 12px 0;">
                <!-- QR Code SVG Simulato -->
                <svg width="120" height="120" viewBox="0 0 100 100" style="border: 2px solid #000; padding: 4px; background: #fff;">
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="10" y="10" width="30" height="30" fill="#000"/>
                  <rect x="15" y="15" width="20" height="20" fill="#fff"/>
                  <rect x="20" y="20" width="10" height="10" fill="#000"/>
                  <rect x="60" y="10" width="30" height="30" fill="#000"/>
                  <rect x="65" y="15" width="20" height="20" fill="#fff"/>
                  <rect x="70" y="20" width="10" height="10" fill="#000"/>
                  <rect x="10" y="60" width="30" height="30" fill="#000"/>
                  <rect x="15" y="65" width="20" height="20" fill="#fff"/>
                  <rect x="20" y="70" width="10" height="10" fill="#000"/>
                  <rect x="50" y="50" width="15" height="15" fill="#000"/>
                  <rect x="70" y="70" width="15" height="15" fill="#000"/>
                </svg>
              </div>

              <div style="font-size: 0.75rem; text-align: left; background: #f0f0f0; padding: 8px; border-radius: 4px; border: 1px solid #ccc; line-height: 1.4;">
                <div><strong>SERIALE MACCHINA:</strong> <span id="lbl-mc-sn">SN-MC-2026-9912</span></div>
                <div><strong>SERIALE DECONTO:</strong> <span id="lbl-hw-sn">DC-HW-8841</span></div>
                <div><strong>CHIP HW:</strong> ESP32-C6 (BLE + Wi-Fi 6)</div>
              </div>

              <div style="font-size: 0.65rem; color: #555; margin-top: 8px;">
                Per assistenza o ricarica rapida scansiona il QR Code o inserisci il codice 3467
              </div>
            </div>
          </div>
        </div>
      </div>
    `:e===`otp_generator`?`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🔑 Generazione Ricariche Fai-da-Te (OTP)</h1>
          <p style="color: var(--text-muted);">Genera il token monouso firmato ed invialo direttamente al cliente via WhatsApp o Email</p>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="stat-card" style="padding: 24px;">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">1. Dettagli Ricarica Spedita:</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Seleziona Cliente & Macchina:</label>
              <select id="otp-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                ${r.map(e=>{let t=n.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${t.client?t.client.name:`N/D`} (Deconto #${e.shortCode})</option>`}).join(``)}
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Numero Caffè da Accreditare:</label>
              <select id="otp-credits-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                <option value="100">+ 100 Caffè</option>
                <option value="150">+ 150 Caffè</option>
                <option value="200" selected>+ 200 Caffè (Standard Courier)</option>
                <option value="300">+ 300 Caffè</option>
                <option value="500">+ 500 Caffè</option>
              </select>
            </div>

            <button id="btn-generate-otp" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              ✨ Genera Token OTP & Link WhatsApp
            </button>
          </div>

          <!-- Risultato Token Generato -->
          <div id="otp-result-card" class="stat-card success" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 style="margin-top: 0; color: var(--accent-green);">Link Ricarica WhatsApp Pronto!</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Invialo al cliente: quando clicca dal suo smartphone il credito viene accreditato via Web Bluetooth.</p>

              <div style="background: var(--bg-primary); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); margin: 16px 0;">
                <div style="font-size: 0.8rem; color: var(--text-muted);">Token OTP Firmato:</div>
                <div id="otp-code-val" style="font-size: 1.3rem; font-weight: 800; color: var(--accent-amber); font-family: monospace;">OTP-9981-X79K2</div>
                
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 12px;">Link WhatsApp Cliente:</div>
                <div id="otp-link-val" style="font-size: 0.85rem; color: var(--accent-cyan); word-break: break-all; margin-top: 4px;">
                  https://deconto.it/ricarica?short=3467&otp=OTP-9981-X79K2&c=200
                </div>
              </div>
            </div>

            <button id="btn-send-whatsapp" class="btn btn-success" style="width: 100%;">
              💬 Invia Link via WhatsApp al Cliente
            </button>
          </div>
        </div>
      </div>
    `:`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">🏢 Anagrafica Clienti & Parco Macchine</h1>
          <p style="color: var(--text-muted);">Gestione contratti in comodato d'uso e associazione dispositivi Deconto</p>
        </div>
        <button id="btn-new-client" class="btn btn-primary">
          ➕ Nuovo Cliente
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Cliente / Azienda</th>
              <th>Referente & Contatti</th>
              <th>Città</th>
              <th>Macchina Assegnata</th>
              <th>Deconto ID</th>
              <th>Credito Attuale</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>{let t=n.getMachines().find(t=>t.clientId===e.id),r=t?n.getBoards().find(e=>e.machineId===t.id):null;return`
                <tr>
                  <td><strong>${e.name}</strong></td>
                  <td>${e.refPerson}<br><small style="color: var(--text-muted);">${e.phone}</small></td>
                  <td>${e.city}</td>
                  <td><code>${t?t.model:`N/D`}</code></td>
                  <td>${r?`<span class="badge badge-info">${r.shortCode}</span>`:`Non Assegnato`}</td>
                  <td>
                    ${r?`<strong style="color: ${r.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`}">${r.remainingCredits} caffè</strong>`:`N/D`}
                  </td>
                  <td>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">Dettagli</button>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function c(e){return n.getClients(),`
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">🚚 Interfaccia Campo ADR (Consegne & Sync BLE)</h1>
        <p style="color: var(--text-muted);">Giro visite giornaliero e ricarica rapida via Bluetooth dallo smartphone dell'agente</p>
      </div>

      <!-- Card Connessione Rapida BLE -->
      <div class="stat-card warning" style="margin-bottom: 32px; padding: 24px;">
        <h3 style="margin-top: 0; color: var(--accent-amber); display: flex; align-items: center; gap: 8px;">
          📡 Connessione Rapida Bluetooth alla Macchina
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">
          Inquadra il QR Code sull'etichetta della macchina da caffè oppure digita il codice a 4 cifre per connetterti alla scheda Deconto.
        </p>

        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice Breve 4 Cifre:</label>
            <input type="text" id="adr-code-input" placeholder="Es. 3467" value="3467" maxlength="4" style="width: 100%; padding: 12px; font-size: 1.2rem; font-weight: 800; font-family: monospace; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 8px;">
          </div>

          <div style="flex: 1; min-width: 200px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Accredita Caffè:</label>
            <select id="adr-credits-select" style="width: 100%; padding: 12px; font-size: 1rem; font-weight: 700; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 8px;">
              <option value="100">+ 100 Caffè</option>
              <option value="200" selected>+ 200 Caffè (Consegna)</option>
              <option value="300">+ 300 Caffè</option>
            </select>
          </div>

          <div style="margin-top: 20px;">
            <button id="btn-adr-ble-connect" class="btn btn-primary" style="padding: 12px 24px; font-size: 1rem;">
              📶 Connetti BLE & Ricarica
            </button>
          </div>
        </div>

        <div id="adr-status-box" style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 6px; display: none;">
          <!-- Feedback di stato connessione BLE -->
        </div>
      </div>

      <!-- Lista Clienti da Visitare -->
      <div class="table-container">
        <div style="padding: 16px 20px; font-weight: 700; border-bottom: 1px solid var(--border-subtle);">
          🗺️ Pianificazione Consegne & Visite di Oggi
        </div>
        <table>
          <thead>
            <tr>
              <th>Cliente & Indirizzo</th>
              <th>Codice Deconto</th>
              <th>Credito Rilevato</th>
              <th>Stato Macchina</th>
              <th>Azione Rapida ADR</th>
            </tr>
          </thead>
          <tbody>
            ${n.getBoards().map(e=>{let t=n.getBoardFullDetails(e.id),r=e.remainingCredits<=0,i=e.remainingCredits<e.lowStockThreshold&&!r;return`
                <tr>
                  <td>
                    <strong>${t.client?t.client.name:`N/D`}</strong><br>
                    <small style="color: var(--text-muted);">${t.client?t.client.address:``}</small>
                  </td>
                  <td><span class="badge badge-info">${e.shortCode}</span></td>
                  <td>
                    <strong style="color: ${r?`var(--accent-rose)`:i?`var(--accent-amber)`:`var(--accent-green)`}">
                      ${e.remainingCredits} caffè
                    </strong>
                  </td>
                  <td>
                    ${r?`<span class="badge badge-danger">🔒 IN BLOCCO</span>`:i?`<span class="badge badge-warning">⚠️ SOTTOSCORTA</span>`:`<span class="badge badge-success">OK</span>`}
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-adr-quick-fill" data-code="${e.shortCode}" style="padding: 6px 14px; font-size: 0.85rem;">
                      ⚡ Ricarica BLE (${e.shortCode})
                    </button>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function l(){return`
    <div style="max-width: 500px; margin: 0 auto; text-align: center;">
      
      <!-- Card Simulata Pagina WhatsApp Link -->
      <div style="background: linear-gradient(135deg, #111827, #1f2937); border: 2px solid var(--accent-cyan); border-radius: 24px; padding: 36px 24px; box-shadow: var(--shadow-card); position: relative;">
        
        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px auto; box-shadow: var(--shadow-glow);">
          ☕
        </div>

        <span class="badge badge-info" style="margin-bottom: 12px; padding: 6px 14px;">RICARICA FAI-DA-TE DECONTO</span>
        
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
          Ricarica la tua Macchina da Caffè
        </h2>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;">
          Spedizione Cialde Ricevuta! Avvicinati alla macchina e tocca il pulsante sottostante.
        </p>

        <!-- Dettagli Ricarica -->
        <div style="background: rgba(0,0,0,0.4); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle); margin-bottom: 24px; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Cliente:</span>
            <strong style="color: #fff;">Studio Legale Brambilla</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Codice Deconto:</span>
            <span class="badge badge-info">3467</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Token OTP:</span>
            <code style="color: var(--accent-amber);">OTP-9981-X79K2</code>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 8px;">
            <span style="color: var(--text-muted); font-size: 0.9rem;">Caffè da Ricaricare:</span>
            <strong style="color: var(--accent-green); font-size: 1.2rem;">+ 200 CAFFÈ</strong>
          </div>
        </div>

        <!-- Tasto Unico per Cliente Inesperto -->
        <button id="btn-client-diy-refill" class="btn btn-primary" style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 800; border-radius: 14px; background: linear-gradient(135deg, var(--accent-green), #059669); box-shadow: 0 8px 20px rgba(52, 211, 153, 0.4);">
          ✨ ACCREDITA 200 CAFFÈ ORA
        </button>

        <div id="diy-status-msg" style="margin-top: 20px; font-size: 0.9rem; min-height: 40px; display: flex; align-items: center; justify-content: center;">
          <span style="color: var(--text-dim);">Assicurati che il Bluetooth del tuo smartphone sia attivo.</span>
        </div>

      </div>

    </div>
  `}function u(){let e=n.getBoards(),t=e[0];return n.getBoardFullDetails(t.shortCode),`
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚡ Banco Prova Hardware Deconto (ESP32-C6)</h1>
        <p style="color: var(--text-muted);">Simulatore interattivo del comportamento elettrico, conteggio erogazioni, relè di blocco e allarme buzzer 60s</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        
        <!-- Simulatore Macchina da Caffè & Modulo -->
        <div class="stat-card" style="padding: 28px; background: linear-gradient(135deg, #111827, #1f2937); border: 2px solid var(--border-color);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <span class="badge badge-info" id="sim-badge-code">DECONTO ${t.shortCode}</span>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Chip: ESP32-C6 | Modulo Resinato IP67</div>
            </div>
            
            <select id="sim-board-select" style="padding: 8px 12px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 600;">
              ${e.map(e=>`<option value="${e.shortCode}">Macchina #${e.shortCode} (${e.remainingCredits} caffè)</option>`).join(``)}
            </select>
          </div>

          <!-- Display Credito & Stato Relè -->
          <div style="text-align: center; background: rgba(0,0,0,0.5); padding: 24px; border-radius: 16px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">
              Credito Residuo Memoria RTC/Flash:
            </div>
            
            <div id="sim-credits-display" style="font-size: 3.5rem; font-weight: 900; color: ${t.remainingCredits>20?`var(--accent-green)`:t.remainingCredits>0?`var(--accent-amber)`:`var(--accent-rose)`}; margin: 8px 0;">
              ${t.remainingCredits}
            </div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Caffè Rimanenti</div>

            <div style="margin-top: 16px; display: flex; justify-content: center; gap: 12px;">
              <span id="sim-relay-badge" class="badge ${t.relayStatus===`CLOSED_OK`?`badge-success`:`badge-danger`}">
                ${t.relayStatus===`CLOSED_OK`?`🔓 RELÈ CHIUSO (POMPA OK)`:`🔒 RELÈ APERTO (BLOCCO 0)`}
              </span>
              
              <span id="sim-alert-badge" class="badge badge-warning" style="display: ${t.remainingCredits<20&&t.remainingCredits>0?`inline-flex`:`none`};">
                🔔 BUZZER 60s ATTIVO
              </span>
            </div>
          </div>

          <!-- Tasto Erogazione Elettrica Pompa -->
          <button id="btn-sim-brew" class="btn btn-primary" ${t.remainingCredits<=0?`disabled`:``} style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 800; border-radius: 12px; margin-bottom: 12px;">
            ☕ EROGA 1 CAFFÈ (Impulso 230V Sense)
          </button>

          <button id="btn-sim-reset" class="btn btn-secondary" style="width: 100%;">
            🔄 Ricarica Rapida +200 Caffè (Test Banco)
          </button>
        </div>

        <!-- Monitoraggio Segnali Elettrici 230V AC -->
        <div>
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">
            📊 Stato Segnali Elettrici 4 Fili (230V AC)
          </h3>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Filo / Segnale</th>
                  <th>Tensione</th>
                  <th>Stato Circuito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🔴 <strong>Rosso (Fase L)</strong></td>
                  <td>230V AC</td>
                  <td><span class="badge badge-success">⚡ ALIMENTATO</span></td>
                </tr>
                <tr>
                  <td>🔵 <strong>Blu (Neutro N)</strong></td>
                  <td>0V AC (Comune)</td>
                  <td><span class="badge badge-info">✓ CONNESSO</span></td>
                </tr>
                <tr>
                  <td>🟤 <strong>Marrone (Sense In)</strong></td>
                  <td id="signal-sense-volts">0V AC</td>
                  <td><span id="signal-sense-badge" class="badge badge-info">INATTIVO</span></td>
                </tr>
                <tr>
                  <td>⬛ <strong>Nero (Relè Out Pompa)</strong></td>
                  <td id="signal-pump-volts">${t.relayStatus===`CLOSED_OK`?`230V AC`:`0V AC (Disattivato)`}</td>
                  <td>
                    <span id="signal-pump-badge" class="badge ${t.relayStatus===`CLOSED_OK`?`badge-success`:`badge-danger`}">
                      ${t.relayStatus===`CLOSED_OK`?`PRONTO`:`BLOCCATO`}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Log Eventi Hardware Live -->
          <div style="margin-top: 24px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px;">
              📟 Console Eventi Firmware ESP32-C6:
            </div>
            <div id="sim-console-log" style="font-family: monospace; font-size: 0.8rem; background: #000; color: #34d399; padding: 12px; border-radius: 6px; height: 120px; overflow-y: auto;">
              [SYSTEM]: ESP32-C6 Firmware v2.1.0 Inizializzato.<br>
              [HARDWARE]: Relè di blocco impostato su CLOSED_OK.<br>
              [BLE]: Beacon DECONTO_${t.shortCode} in trasmissione.<br>
            </div>
          </div>
        </div>

      </div>
    </div>
  `}var d={currentRole:`ADMIN`,activeTab:`dashboard`};function f(){let e=document.getElementById(`app`),t=``;d.activeTab===`simulator`?t=u():d.currentRole===`ADMIN`?t=o(d.activeTab):d.currentRole===`UFFICIO`?t=s(d.activeTab):d.currentRole===`ADR`?t=c(d.activeTab):d.currentRole===`CLIENT_DIY`&&(t=l()),e.innerHTML=`
    <div class="app-container">
      ${a(d.currentRole,d.activeTab,p,m)}
      <main class="main-content">
        ${t}
      </main>
    </div>
  `,h()}function p(e){d.activeTab=e,f()}function m(e){d.currentRole=e,e===`ADMIN`?d.activeTab=`dashboard`:e===`UFFICIO`?d.activeTab=`clients`:e===`ADR`?d.activeTab=`adr_visits`:e===`CLIENT_DIY`&&(d.activeTab=`client_refill`),f()}function h(){let e=document.getElementById(`role-selector`);e&&e.addEventListener(`change`,e=>{m(e.target.value)}),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&p(t)})});let t=document.getElementById(`btn-trigger-backup`);t&&t.addEventListener(`click`,async()=>{t.disabled=!0,t.innerText=`⏳ Backup in corso su GitHub...`;let e=await i.executeBackupNow();alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: ${e.backupRecord.repo}\nCommit Hash: ${e.backupRecord.commitHash}\nEntità salvate: ${e.backupRecord.recordCount}`),f()});let a=document.getElementById(`btn-generate-otp`);a&&a.addEventListener(`click`,()=>{let e=document.getElementById(`otp-board-select`).value,t=parseInt(document.getElementById(`otp-credits-select`).value,10),n=`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,r=`https://deconto.it/ricarica?short=${e}&otp=${n}&c=${t}`;document.getElementById(`otp-code-val`).innerText=n,document.getElementById(`otp-link-val`).innerText=r,alert(`✅ Token OTP Generato per Deconto #${e} (+${t} Caffè)!`)});let o=document.getElementById(`btn-send-whatsapp`);o&&o.addEventListener(`click`,()=>{let e=`Gentile cliente, ecco il link per ricaricare la tua macchina da caffè Deconto: ${document.getElementById(`otp-link-val`).innerText}`;window.open(`https://wa.me/?text=${encodeURIComponent(e)}`,`_blank`)});let s=document.getElementById(`btn-print-qr`);s&&s.addEventListener(`click`,()=>{window.print()});let c=document.getElementById(`qr-board-select`);c&&c.addEventListener(`change`,e=>{let t=n.getBoardFullDetails(e.target.value);t&&(document.querySelector(`#qr-sticker-preview div[style*="font-size: 3rem"]`).innerText=t.board.shortCode,document.getElementById(`lbl-mc-sn`).innerText=t.machine?t.machine.serialNumber:`N/D`,document.getElementById(`lbl-hw-sn`).innerText=t.board.hwSerial)});let l=document.getElementById(`btn-adr-ble-connect`);l&&l.addEventListener(`click`,async()=>{let e=document.getElementById(`adr-code-input`).value.trim(),t=parseInt(document.getElementById(`adr-credits-select`).value,10),i=document.getElementById(`adr-status-box`);if(!e){alert(`Inserisci il codice a 4 cifre!`);return}i.style.display=`block`,i.innerHTML=`📡 Scansione Bluetooth BLE per <strong>DECONTO_${e}</strong> in corso...`;try{await r.sendRefillOtpToken(e,t,`ADR_BLE_MANUAL`),n.performRefill({boardShortCode:e,credits:t,method:`BLE_PWA`,operatorId:`usr_adr_1`}),i.innerHTML=`<span style="color: var(--accent-green);">✅ Ricarica Completata! Accreditate <strong>+${t} cialde</strong> sulla macchina #${e}. Relè Ripristinato.</span>`,setTimeout(()=>f(),2e3)}catch(e){i.innerHTML=`<span style="color: var(--accent-rose);">❌ Errore connessione: ${e.message}</span>`}}),document.querySelectorAll(`.btn-adr-quick-fill`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-code`);await r.sendRefillOtpToken(t,200,`ADR_QUICK_BLE`),n.performRefill({boardShortCode:t,credits:200,method:`BLE_PWA`,operatorId:`usr_adr_1`}),alert(`✅ Ricaricate +200 cialde via Bluetooth sulla macchina #${t}!`),f()})});let u=document.getElementById(`btn-client-diy-refill`);u&&u.addEventListener(`click`,async()=>{u.disabled=!0,u.innerText=`📡 Connessione Bluetooth alla Macchina #3467...`;let e=document.getElementById(`diy-status-msg`);try{await r.sendRefillOtpToken(`3467`,200,`OTP-9981-X79K2`),n.performRefill({boardShortCode:`3467`,credits:200,method:`WHATSAPP_OTP_BLE`,operatorId:`cli_3`,tokenOtp:`OTP-9981-X79K2`}),e.innerHTML=`<span style="color: var(--accent-green); font-weight: 800; font-size: 1.1rem;">🎉 RICARICA COMPLETATA! +200 CAFFÈ ACCREDITATI SULLA TUA MACCHINA.</span>`,u.innerText=`✓ RICARICATO CON SUCCESSO`,u.style.background=`var(--accent-green)`}catch(t){e.innerHTML=`<span style="color: var(--accent-rose);">Errore: ${t.message}</span>`,u.disabled=!1}});let d=document.getElementById(`sim-board-select`);d&&d.addEventListener(`change`,e=>{let t=e.target.value,r=n.getBoardFullDetails(t);r&&(document.getElementById(`sim-badge-code`).innerText=`DECONTO ${t}`,document.getElementById(`sim-credits-display`).innerText=r.board.remainingCredits)});let h=document.getElementById(`btn-sim-brew`);h&&h.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;document.getElementById(`signal-sense-volts`).innerText=`230V AC (Impulso)`,document.getElementById(`signal-sense-badge`).className=`badge badge-warning`,document.getElementById(`signal-sense-badge`).innerText=`EROGAZIONE IN CORSO`;let r=n.registerCoffeeExtraction(t,22,1);setTimeout(()=>{if(document.getElementById(`signal-sense-volts`).innerText=`0V AC`,document.getElementById(`signal-sense-badge`).className=`badge badge-info`,document.getElementById(`signal-sense-badge`).innerText=`INATTIVO`,r&&r.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`[EXTRACTION]: Caffè erogato! Credito rimanente: ${r.remainingCredits}.<br>`,e.scrollTop=e.scrollHeight,r.isLowStock&&(e.innerHTML+=`<span style="color: var(--accent-amber);">[BUZZER 60s]: CREDITO &lt; 20! SEGNALE ACUSTICO ATTIVATO (BIP... BIP...).</span><br>`)}else if(r&&!r.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`<span style="color: var(--accent-rose);">[HARDWARE LOCK]: CREDITO 0! RELÈ APERTO. POMPA DISATTIVATA.</span><br>`}f()},800)});let g=document.getElementById(`btn-sim-reset`);g&&g.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;n.performRefill({boardShortCode:t,credits:200,method:`TEST_BENCH`,operatorId:`usr_admin`}),alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${t}!`),f()})}document.addEventListener(`DOMContentLoaded`,f);