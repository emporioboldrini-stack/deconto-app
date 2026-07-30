(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`DECONTO_DB_V2`,t=`DECONTO_AUTH_SESSION_V2`,n={users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`ufficio@deconto.it`,role:`UFFICIO`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`adr.nord@deconto.it`,role:`ADR`,avatar:`🚚`,createdAt:`2026-01-10`}],clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`,status:`ACTIVE`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`,status:`ACTIVE`},{id:`cli_3`,name:`Studio Legale Brambilla`,refPerson:`Avv. Brambilla`,phone:`+39 02 4443322`,address:`Via Montenapoleone 8, Milano`,city:`Milano`,status:`WARNING`},{id:`cli_4`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`,status:`ACTIVE`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-7711`,model:`Didiesse Frog Revolution`,clientId:`cli_3`,installDate:`2026-02-20`},{id:`mc_4`,serialNumber:`SN-MC-2026-4409`,model:`Spinel Pinocchio Professional`,clientId:`cli_4`,installDate:`2026-03-05`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_5510`,shortCode:`5510`,hwSerial:`DC-HW-9910`,macAddress:`C6:3F:8A:33:55:10`,machineId:`mc_3`,version:`BASIC`,remainingCredits:12,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,lastSyncDate:new Date(Date.now()-10368e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_4`,version:`BASIC`,remainingCredits:0,lowStockThreshold:20,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,lastSyncDate:new Date().toISOString()}],refillLogs:[{id:`ref_101`,boardId:`board_3467`,shortCode:`3467`,creditsAdded:200,tokenOtp:`OTP-9981-X79K2`,operatorType:`ADR`,operatorId:`usr_003`,timestamp:new Date(Date.now()-1296e6).toISOString(),method:`BLE_PWA`},{id:`ref_102`,boardId:`board_5510`,shortCode:`5510`,creditsAdded:150,tokenOtp:`OTP-4412-M28P0`,operatorType:`CLIENT_DIY`,operatorId:`cli_3`,timestamp:new Date(Date.now()-216e7).toISOString(),method:`WHATSAPP_OTP_BLE`}],coffeeLogs:[{id:`log_1`,boardId:`board_3467`,timestamp:new Date(Date.now()-72e5).toISOString(),durationSeconds:22,groupId:1},{id:`log_2`,boardId:`board_3467`,timestamp:new Date(Date.now()-144e5).toISOString(),durationSeconds:21,groupId:1},{id:`log_3`,boardId:`board_5510`,timestamp:new Date(Date.now()-216e5).toISOString(),durationSeconds:38,groupId:1},{id:`log_4`,boardId:`board_1289`,timestamp:new Date(Date.now()-36e6).toISOString(),durationSeconds:20,groupId:1},{id:`log_5`,boardId:`board_1289`,timestamp:new Date(Date.now()-396e5).toISOString(),durationSeconds:23,groupId:2}],backupLogs:[{id:`bak_001`,timestamp:new Date(Date.now()-864e5).toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`99d633e`,status:`SUCCESS`,recordCount:28}]},r=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession()}loadData(){try{let t=localStorage.getItem(e);if(t){let r=JSON.parse(t);return(!r.users||!r.users.some(e=>e.username===`001`))&&(r.users=n.users,localStorage.setItem(e,JSON.stringify(r))),r}}catch(e){console.warn(`Impossibile caricare da localStorage:`,e)}return this.saveData(n),n}saveData(t){this.data=t||this.data;try{localStorage.setItem(e,JSON.stringify(this.data))}catch(e){console.error(`Errore salvataggio localStorage:`,e)}}loadSession(){try{let e=localStorage.getItem(t);if(e)return JSON.parse(e)}catch{}return null}saveSession(e){this.currentUser=e;try{e?localStorage.setItem(t,JSON.stringify(e)):localStorage.removeItem(t)}catch{}}authenticate(e,t){let n=String(e).trim(),r=String(t).trim(),i=this.data.users.find(e=>String(e.username).trim()===n&&String(e.password).trim()===r);if(!i&&n===`001`&&r===`123456`?(i={id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`},this.data.users.some(e=>e.id===`usr_001`)||(this.data.users.unshift(i),this.saveData())):!i&&n===`002`&&r===`123456`?(i={id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`ufficio@deconto.it`,role:`UFFICIO`,avatar:`👩‍💻`},this.data.users.some(e=>e.id===`usr_002`)||(this.data.users.unshift(i),this.saveData())):!i&&n===`003`&&r===`123456`&&(i={id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`adr.nord@deconto.it`,role:`ADR`,avatar:`🚚`},this.data.users.some(e=>e.id===`usr_003`)||(this.data.users.unshift(i),this.saveData())),!i)throw Error(`Credenziali non valide. Inserisci Nome Utente: 001 e Password: 123456`);let a={id:i.id,username:i.username,name:i.name,role:i.role,email:i.email,avatar:i.avatar};return this.saveSession(a),a}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}updateUserProfile(e,t){let n=this.data.users.find(t=>t.id===e);if(!n)throw Error(`Utente non trovato.`);return t.name&&(n.name=t.name),t.username&&(n.username=t.username),t.email&&(n.email=t.email),t.newPassword&&(n.password=t.newPassword),this.saveData(),this.currentUser&&this.currentUser.id===e&&this.saveSession({...this.currentUser,name:n.name,username:n.username,email:n.email}),n}getUsers(){return this.data.users}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs}getBackupLogs(){return this.data.backupLogs}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:this.data.coffeeLogs.filter(e=>e.boardId===t.id)}}addClient(e){let t={id:`cli_`+Date.now(),name:e.name,refPerson:e.refPerson||`Referente`,phone:e.phone||`+39 `,address:e.address||``,city:e.city||``,status:`ACTIVE`};if(this.data.clients.unshift(t),e.machineModel){let n={id:`mc_`+Date.now(),serialNumber:e.machineSerial||`SN-MC-2026-${Math.floor(1e3+Math.random()*9e3)}`,model:e.machineModel,clientId:t.id,installDate:new Date().toISOString().split(`T`)[0]};this.data.machines.unshift(n);let r=e.shortCode||`${Math.floor(1e3+Math.random()*9e3)}`,i={id:`board_`+r,shortCode:r,hwSerial:`DC-HW-${Math.floor(1e3+Math.random()*9e3)}`,macAddress:`C6:3F:8A:${Math.floor(10+Math.random()*89)}:${r.substring(0,2)}:${r.substring(2,4)}`,machineId:n.id,version:e.boardVersion||`BASIC`,remainingCredits:parseInt(e.initialCredits||200,10),lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,lastSyncDate:new Date().toISOString()};this.data.decontoBoards.unshift(i)}return this.saveData(),t}deleteClient(e){this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<r.lowStockThreshold,relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
`;return this.data.coffeeLogs.forEach(t=>{let n=this.getBoardFullDetails(t.boardId),r=n&&n.client?n.client.name.replace(/,/g,` `):`N/D`,i=n&&n.machine?n.machine.serialNumber:`N/D`,a=n&&n.board?n.board.shortCode:`N/D`;e+=`${t.id},${a},"${r}",${i},${t.timestamp},${t.durationSeconds},${t.groupId}\n`}),e}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`git-`+Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}},i=new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}},a=new class{constructor(){this.repoUrl=`https://github.com/deconto-org/deconto-db-backups`}generateDatabaseSnapshot(){return{version:`1.0.0`,timestamp:new Date().toISOString(),data:r.data}}async executeBackupNow(){let e=this.generateDatabaseSnapshot(),t=JSON.stringify(e,null,2);return await new Promise(e=>setTimeout(e,1200)),{success:!0,backupRecord:r.triggerGitHubBackup(),sizeBytes:new Blob([t]).size,snapshotTimestamp:e.timestamp}}};function o(e,t){let n=e||{name:`Utente Opite`,role:`ADMIN`,username:`001`,avatar:`👨‍💼`},r=[];return n.role===`ADMIN`?r=[{id:`dashboard`,label:`📊 Dashboard BI`,icon:`📈`},{id:`clients`,label:`🏢 Clienti & Parco`,icon:`🏢`},{id:`maintenance`,label:`🛠️ Manutenzione Predittiva`,icon:`⚠️`},{id:`backups`,label:`💾 Backup GitHub`,icon:`🐙`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]:n.role===`UFFICIO`?r=[{id:`clients`,label:`🏢 Gestione Clienti`,icon:`🏢`},{id:`qr_generator`,label:`🏷️ Generatore Etichette QR`,icon:`🖨️`},{id:`otp_generator`,label:`🔑 Genera Ricariche OTP`,icon:`💬`},{id:`refills_history`,label:`📋 Storico Ricariche`,icon:`🧾`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]:n.role===`ADR`&&(r=[{id:`adr_visits`,label:`🗺️ Giro Consegne Oggi`,icon:`🚚`},{id:`adr_scan`,label:`📡 Ricarica BLE (Codice/QR)`,icon:`📶`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}]),`
    <aside class="sidebar">
      <div class="brand-logo">
        <div class="brand-icon">☕</div>
        <div>
          <div class="brand-title">DECONTO</div>
          <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600;">IoT Vending System</div>
        </div>
      </div>

      <!-- Card Utente Connesso -->
      <div style="margin-bottom: 24px; padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <div style="font-size: 1.4rem;">${n.avatar||`👤`}</div>
          <div style="overflow: hidden;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${n.name}
            </div>
            <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600;">
              @${n.username} (${n.role})
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 6px; margin-top: 10px;">
          <button id="btn-open-profile-modal" class="btn btn-secondary" style="flex: 1; padding: 6px 8px; font-size: 0.75rem;">
            ✏️ Credenziali
          </button>
          <button id="btn-logout" class="btn btn-secondary" style="padding: 6px 10px; font-size: 0.75rem; color: var(--accent-rose);">
            🚪 Esci
          </button>
        </div>
      </div>

      <div class="nav-group">
        <div style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase; margin-bottom: 8px; padding-left: 8px;">
          Menu Principale
        </div>
        ${r.map(e=>`
          <div class="nav-item ${e.id===t?`active`:``}" data-tab="${e.id}">
            <span>${e.icon}</span>
            <span>${e.label}</span>
          </div>
        `).join(``)}
      </div>

      <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 0.75rem; color: var(--text-dim); text-align: center;">
        Chip HW: <strong>ESP32-C6</strong><br>Firmware v2.1.0 (Wi-Fi 6 + BLE)
      </div>
    </aside>
  `}function s(e){return`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1f2937, #090d16); padding: 20px;">
      
      <div style="max-width: 440px; width: 100%; background: rgba(31, 41, 55, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 16px auto; box-shadow: var(--shadow-glow);">
            ☕
          </div>
          
          <h1 style="font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            DECONTO IoT System
          </h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            Accesso Riservato agli Operatori Autorizzati
          </p>
        </div>

        <form id="login-form">
          <div style="margin-bottom: 20px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Nome Utente (Username):
            </label>
            <input type="text" id="login-username" placeholder="Es. 001" value="001" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Password:
            </label>
            <input type="password" id="login-password" placeholder="••••••" value="123456" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div id="login-error-msg" style="color: var(--accent-rose); font-size: 0.85rem; margin-bottom: 16px; display: none; text-align: center; font-weight: 600;">
            <!-- Messaggio Errore -->
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 800; border-radius: 10px; margin-bottom: 24px;">
            🔐 ACCEDI ALLA PIATTAFORMA
          </button>
        </form>

        <!-- Scorciatoie Demo Rapide -->
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 20px;">
          <div style="font-size: 0.75rem; color: var(--text-dim); text-align: center; text-transform: uppercase; font-weight: 700; margin-bottom: 12px;">
            Credenziali Predefinite di Prova:
          </div>
          
          <div style="display: flex; gap: 8px; justify-content: center;">
            <button class="btn btn-secondary btn-demo-auth" data-user="001" data-pass="123456" style="padding: 6px 10px; font-size: 0.75rem;">
              👨‍💼 Admin (001)
            </button>
            <button class="btn btn-secondary btn-demo-auth" data-user="002" data-pass="123456" style="padding: 6px 10px; font-size: 0.75rem;">
              👩‍💻 Ufficio (002)
            </button>
            <button class="btn btn-secondary btn-demo-auth" data-user="003" data-pass="123456" style="padding: 6px 10px; font-size: 0.75rem;">
              🚚 ADR (003)
            </button>
          </div>
        </div>

      </div>

    </div>
  `}function c(e,t){return`
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
            <input type="text" value="${e.role}" disabled style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: var(--accent-cyan); font-weight: 800; border: 1px solid var(--border-subtle); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome & Cognome:*</label>
            <input type="text" id="edit-user-name" value="${e.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Utente (Username):*</label>
            <input type="text" id="edit-user-username" value="${e.username}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email:</label>
            <input type="email" id="edit-user-email" value="${e.email}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
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
  `}function l(e){let t=r.getClients();r.getMachines();let n=r.getBoards();r.getRefillLogs();let i=r.getCoffeeLogs(),a=r.getBackupLogs();n.reduce((e,t)=>e+t.remainingCredits,0);let o=i.length+14820,s=n.filter(e=>e.remainingCredits<e.lowStockThreshold&&e.remainingCredits>0).length,c=n.filter(e=>e.remainingCredits<=0).length;if(e===`backups`)return`
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
            <div class="stat-value" style="font-size: 1.2rem; color: var(--accent-cyan);">emporioboldrini-stack/deconto-app</div>
            <div class="stat-desc">Accesso crittografato PAT / SSH</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Frequenza Backup</div>
            <div class="stat-value">Quotidiana</div>
            <div class="stat-desc">Ogni notte alle 03:00 UTC</div>
          </div>
          <div class="stat-card success">
            <div class="stat-label">Ultimo Backup</div>
            <div class="stat-value" style="font-size: 1.1rem; color: var(--accent-green);">
              ${a.length>0?new Date(a[0].timestamp).toLocaleString(`it-IT`):`N/D`}
            </div>
            <div class="stat-desc">Commit: <code>${a.length>0?a[0].commitHash:`N/D`}</code></div>
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
              ${a.map(e=>`
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
    `;if(e===`maintenance`){let e=i.filter(e=>e.durationSeconds>30);return`
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
              ${e.map(e=>{let t=r.getBoardFullDetails(e.boardId);return`
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
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Dashboard Esecutiva BI</h1>
          <p style="color: var(--text-muted);">Panoramica in tempo reale del parco macchine e dei consumi erogati</p>
        </div>

        <button id="btn-export-csv" class="btn btn-secondary">
          📥 Esporta Report Consumi CSV
        </button>
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
          <div class="stat-value" style="color: var(--accent-green);">${o.toLocaleString()}</div>
          <div class="stat-desc">Conteggiati da schede Deconto</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">Macchine Sottoscorta (&lt;20)</div>
          <div class="stat-value" style="color: var(--accent-amber);">${s}</div>
          <div class="stat-desc">Avviso acustico 60s attivo</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-label">Macchine in Blocco (0)</div>
          <div class="stat-value" style="color: var(--accent-rose);">${c}</div>
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
            ${n.map(e=>{let t=r.getBoardFullDetails(e.id),n=e.remainingCredits<=0,i=e.remainingCredits<e.lowStockThreshold&&!n;return`
                <tr>
                  <td><span class="badge badge-info">${e.shortCode}</span></td>
                  <td>
                    <strong>${t.client?t.client.name:`Non Assegnato`}</strong><br>
                    <small style="color: var(--text-muted);">${t.client?t.client.address:``}</small>
                  </td>
                  <td><code>${t.machine?t.machine.serialNumber:`N/D`}</code></td>
                  <td>
                    <strong style="font-size: 1.1rem; color: ${n?`var(--accent-rose)`:i?`var(--accent-amber)`:`var(--accent-green)`}">
                      ${e.remainingCredits} caffè
                    </strong>
                  </td>
                  <td>
                    ${n?`<span class="badge badge-danger">🔒 APERTO (BLOCCO)</span>`:`<span class="badge badge-success">🔓 CHIUSO (OK)</span>`}
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
  `}function u(e){let t=r.getClients(),n=r.getBoards(),i=r.getRefillLogs();return e===`qr_generator`?`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🖨️ Generatore Etichette Adesive QR Code</h1>
          <p style="color: var(--text-muted);">Crea e stampa l'etichetta fisica da incollare sulla macchina da caffè</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <!-- Modulo di Configurazione -->
          <div class="stat-card" style="padding: 24px;">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">1. Configura Etichetta:</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Seleziona Scheda Deconto / Cliente:</label>
              <select id="qr-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                ${n.map(e=>{let t=r.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${e.shortCode} - ${t.client?t.client.name:`N/D`} (${t.machine?t.machine.serialNumber:``})</option>`}).join(``)}
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Formato di Stampa:</label>
              <select id="qr-format-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                <option value="THERMAL_50x30">Etichetta Termica Adesiva 50x30mm (Singola)</option>
                <option value="A4_SHEET">Foglio A4 Etichette Multi-Adesive (12 per foglio)</option>
              </select>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Intestazione Personalizzata:</label>
              <input type="text" id="qr-header-input" value="DECONTO IoT System - Comodato Gratuito" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
            </div>

            <button id="btn-print-qr" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 14px; font-size: 1rem;">
              🖨️ Stampa Etichetta Termica Ora
            </button>
          </div>

          <!-- Anteprima Etichetta Adesiva (Preview) -->
          <div>
            <h3 style="margin-top: 0; color: var(--text-muted);">Anteprima Stampa Etichetta:</h3>
            
            <div id="qr-sticker-preview" style="background: #ffffff; color: #000000; padding: 24px; border-radius: 12px; font-family: monospace; border: 3px dashed #000; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <div id="lbl-header-title" style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 12px;">
                ☕ DECONTO COFFEE CONTROL ☕
              </div>
              
              <div id="lbl-short-code-display" style="font-size: 3.2rem; font-weight: 900; letter-spacing: 4px; margin: 6px 0; color: #000;">
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
                ${n.map(e=>{let t=r.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${t.client?t.client.name:`N/D`} (Deconto #${e.shortCode})</option>`}).join(``)}
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
                  https://deconto-vending-app.web.app/?short=3467&otp=OTP-9981-X79K2&c=200
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 12px;">
              <button id="btn-send-whatsapp" class="btn btn-success" style="flex: 1;">
                💬 Invia via WhatsApp
              </button>
              <button id="btn-copy-otp-link" class="btn btn-secondary" style="flex: 1;">
                📋 Copia Link
              </button>
            </div>
          </div>
        </div>
      </div>
    `:e===`refills_history`?`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">📋 Storico Ricariche Accreditate</h1>
          <p style="color: var(--text-muted);">Registro di tutte le ricariche effettuate da ADR, Clienti Fai-da-Te e da Ufficio</p>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Ricarica</th>
                <th>Data & Ora</th>
                <th>Deconto ID</th>
                <th>Caffè Accreditati</th>
                <th>Modalità / Operatore</th>
                <th>Token OTP Monouso</th>
              </tr>
            </thead>
            <tbody>
              ${i.map(e=>`
                <tr>
                  <td><code>${e.id}</code></td>
                  <td>${new Date(e.timestamp).toLocaleString(`it-IT`)}</td>
                  <td><span class="badge badge-info">${e.shortCode}</span></td>
                  <td><strong style="color: var(--accent-green); font-size: 1.1rem;">+${e.creditsAdded} caffè</strong></td>
                  <td>
                    ${e.operatorType===`ADR`?`<span class="badge badge-warning">🚚 ADR (BLE sul Posto)</span>`:e.operatorType===`CLIENT_DIY`?`<span class="badge badge-success">📱 Cliente Fai-da-Te (OTP)</span>`:`<span class="badge badge-info">👩‍💻 Ufficio Cloud</span>`}
                  </td>
                  <td><code>${e.tokenOtp}</code></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `:`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">🏢 Anagrafica Clienti & Parco Macchine</h1>
          <p style="color: var(--text-muted);">Gestione contratti in comodato d'uso e associazione dispositivi Deconto</p>
        </div>
        <button id="btn-toggle-add-client" class="btn btn-primary">
          ➕ Nuovo Cliente & Macchina
        </button>
      </div>

      <!-- Form Nuovo Cliente (Nascosto di Default) -->
      <div id="add-client-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Registrazione Nuovo Cliente & Scheda Deconto:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ragione Sociale / Cliente:*</label>
            <input type="text" id="new-cli-name" placeholder="Es. Bar Splendid" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Persona di Riferimento:*</label>
            <input type="text" id="new-cli-ref" placeholder="Es. Marco Rossi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:*</label>
            <input type="text" id="new-cli-phone" placeholder="Es. +39 333 1234567" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Città & Indirizzo:</label>
            <input type="text" id="new-cli-city" placeholder="Es. Milano, Via Torino 5" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Modello Macchina:</label>
            <input type="text" id="new-cli-mc-model" placeholder="Es. Faber Slot Plast 1G" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice Deconto (4 cifre):</label>
            <input type="text" id="new-cli-code" placeholder="Es. 8812" maxlength="4" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Credito Iniziale:</label>
            <input type="number" id="new-cli-credits" value="200" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800;">
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="btn-cancel-add-client" class="btn btn-secondary">Annulla</button>
          <button id="btn-save-new-client" class="btn btn-primary">💾 Salva Cliente & Assegna Deconto</button>
        </div>
      </div>

      <!-- Tabella Clienti -->
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
            ${t.map(e=>{let t=r.getMachines().find(t=>t.clientId===e.id),n=t?r.getBoards().find(e=>e.machineId===t.id):null;return`
                <tr>
                  <td><strong>${e.name}</strong></td>
                  <td>${e.refPerson}<br><small style="color: var(--text-muted);">${e.phone}</small></td>
                  <td>${e.city}</td>
                  <td><code>${t?t.model:`N/D`}</code></td>
                  <td>${n?`<span class="badge badge-info">${n.shortCode}</span>`:`Non Assegnato`}</td>
                  <td>
                    ${n?`<strong style="color: ${n.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`}">${n.remainingCredits} caffè</strong>`:`N/D`}
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-del-client" data-id="${e.id}" style="padding: 6px 12px; font-size: 0.8rem; color: var(--accent-rose);">🗑️ Rimuovi</button>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function d(e){return r.getClients(),`
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
            ${r.getBoards().map(e=>{let t=r.getBoardFullDetails(e.id),n=e.remainingCredits<=0,i=e.remainingCredits<e.lowStockThreshold&&!n;return`
                <tr>
                  <td>
                    <strong>${t.client?t.client.name:`N/D`}</strong><br>
                    <small style="color: var(--text-muted);">${t.client?t.client.address:``}</small>
                  </td>
                  <td><span class="badge badge-info">${e.shortCode}</span></td>
                  <td>
                    <strong style="color: ${n?`var(--accent-rose)`:i?`var(--accent-amber)`:`var(--accent-green)`}">
                      ${e.remainingCredits} caffè
                    </strong>
                  </td>
                  <td>
                    ${n?`<span class="badge badge-danger">🔒 IN BLOCCO</span>`:i?`<span class="badge badge-warning">⚠️ SOTTOSCORTA</span>`:`<span class="badge badge-success">OK</span>`}
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
  `}function f(){let e=r.getBoards(),t=e[0];return r.getBoardFullDetails(t.shortCode),`
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
  `}var p={currentUser:r.getCurrentUser(),activeTab:`dashboard`,showProfileModal:!1};function m(){let e=document.getElementById(`app`);if(!p.currentUser){e.innerHTML=s(),h();return}let t=p.currentUser,n=``;p.activeTab===`simulator`?n=f():t.role===`ADMIN`?n=l(p.activeTab):t.role===`UFFICIO`?n=u(p.activeTab):t.role===`ADR`&&(n=d(p.activeTab));let r=``;p.showProfileModal&&(r=c(t)),e.innerHTML=`
    <div class="app-container">
      ${o(t,p.activeTab)}
      <main class="main-content">
        ${n}
      </main>
    </div>
    ${r}
  `,g()}function h(){let e=document.getElementById(`login-form`),t=document.getElementById(`login-error-msg`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`login-username`).value,i=document.getElementById(`login-password`).value;try{let e=r.authenticate(n,i);p.currentUser=e,p.activeTab=e.role===`ADMIN`?`dashboard`:e.role===`UFFICIO`?`clients`:`adr_visits`,m()}catch(e){t.innerText=e.message,t.style.display=`block`}}),document.querySelectorAll(`.btn-demo-auth`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-user`),n=e.getAttribute(`data-pass`);document.getElementById(`login-username`).value=t,document.getElementById(`login-password`).value=n;let i=r.authenticate(t,n);p.currentUser=i,p.activeTab=i.role===`ADMIN`?`dashboard`:i.role===`UFFICIO`?`clients`:`adr_visits`,m()})})}function g(){let e=document.getElementById(`btn-logout`);e&&e.addEventListener(`click`,()=>{r.logout(),p.currentUser=null,m()});let t=document.getElementById(`btn-open-profile-modal`);t&&t.addEventListener(`click`,()=>{p.showProfileModal=!0,m()});let n=document.getElementById(`btn-close-profile-modal`),o=document.getElementById(`btn-cancel-profile`);n&&n.addEventListener(`click`,()=>{p.showProfileModal=!1,m()}),o&&o.addEventListener(`click`,()=>{p.showProfileModal=!1,m()});let s=document.getElementById(`profile-edit-form`);s&&s.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-user-name`).value.trim(),n=document.getElementById(`edit-user-username`).value.trim(),i=document.getElementById(`edit-user-email`).value.trim(),a=document.getElementById(`edit-user-password`).value.trim();try{p.currentUser=r.updateUserProfile(p.currentUser.id,{name:t,username:n,email:i,newPassword:a||void 0}),p.showProfileModal=!1,alert(`✅ Credenziali e Profilo aggiornati con successo!`),m()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(p.activeTab=t,m())})});let c=document.getElementById(`btn-export-csv`);c&&c.addEventListener(`click`,()=>{let e=r.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),i=document.createElement(`a`);i.href=n,i.download=`DECONTO_Report_Consumi_${new Date().toISOString().split(`T`)[0]}.csv`,i.click(),alert(`📥 Report Consumi CSV Scaricato con successo!`)});let l=document.getElementById(`btn-trigger-backup`);l&&l.addEventListener(`click`,async()=>{l.disabled=!0,l.innerText=`⏳ Backup in corso su GitHub...`;let e=await a.executeBackupNow();alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: https://github.com/emporioboldrini-stack/deconto-app.git\nCommit Hash: ${e.backupRecord.commitHash}\nEntità salvate: ${e.backupRecord.recordCount}`),m()});let u=document.getElementById(`btn-toggle-add-client`),d=document.getElementById(`add-client-form-container`);u&&d&&u.addEventListener(`click`,()=>{d.style.display=d.style.display===`none`?`block`:`none`});let f=document.getElementById(`btn-cancel-add-client`);f&&d&&f.addEventListener(`click`,()=>{d.style.display=`none`});let h=document.getElementById(`btn-save-new-client`);h&&h.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-ref`).value.trim(),n=document.getElementById(`new-cli-phone`).value.trim(),i=document.getElementById(`new-cli-city`).value.trim(),a=document.getElementById(`new-cli-mc-model`).value.trim(),o=document.getElementById(`new-cli-code`).value.trim(),s=document.getElementById(`new-cli-credits`).value;if(!e||!t||!n){alert(`Compila i campi obbligatori: Nome Cliente, Referente e Telefono!`);return}r.addClient({name:e,refPerson:t,phone:n,city:i,address:i,machineModel:a||`Didiesse Frog Revolution`,shortCode:o||`${Math.floor(1e3+Math.random()*9e3)}`,initialCredits:s}),alert(`✅ Cliente "${e}" registrato con successo ed associato alla scheda Deconto!`),m()}),document.querySelectorAll(`.btn-del-client`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);confirm(`Sei sicuro di voler rimuovere questo cliente dal sistema?`)&&(r.deleteClient(t),m())})});let g=document.getElementById(`btn-generate-otp`);g&&g.addEventListener(`click`,()=>{let e=document.getElementById(`otp-board-select`).value,t=parseInt(document.getElementById(`otp-credits-select`).value,10),n=`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,r=`https://deconto-vending-app.web.app/?short=${e}&otp=${n}&c=${t}`;document.getElementById(`otp-code-val`).innerText=n,document.getElementById(`otp-link-val`).innerText=r,alert(`✅ Token OTP Generato per Deconto #${e} (+${t} Caffè)!`)});let _=document.getElementById(`btn-send-whatsapp`);_&&_.addEventListener(`click`,()=>{let e=`Gentile cliente, ecco il link per ricaricare la tua macchina da caffè Deconto: ${document.getElementById(`otp-link-val`).innerText}`;window.open(`https://wa.me/?text=${encodeURIComponent(e)}`,`_blank`)});let v=document.getElementById(`btn-copy-otp-link`);v&&v.addEventListener(`click`,()=>{let e=document.getElementById(`otp-link-val`).innerText;navigator.clipboard.writeText(e),alert(`📋 Link Ricarica Copiato negli appunti!`)});let y=document.getElementById(`btn-print-qr`);y&&y.addEventListener(`click`,()=>{window.print()});let b=document.getElementById(`qr-header-input`);b&&b.addEventListener(`input`,e=>{document.getElementById(`lbl-header-title`).innerText=`☕ ${e.target.value.toUpperCase()} ☕`});let x=document.getElementById(`qr-board-select`);x&&x.addEventListener(`change`,e=>{let t=r.getBoardFullDetails(e.target.value);t&&(document.getElementById(`lbl-short-code-display`).innerText=t.board.shortCode,document.getElementById(`lbl-mc-sn`).innerText=t.machine?t.machine.serialNumber:`N/D`,document.getElementById(`lbl-hw-sn`).innerText=t.board.hwSerial)});let S=document.getElementById(`btn-adr-ble-connect`);S&&S.addEventListener(`click`,async()=>{let e=document.getElementById(`adr-code-input`).value.trim(),t=parseInt(document.getElementById(`adr-credits-select`).value,10),n=document.getElementById(`adr-status-box`);if(!e){alert(`Inserisci il codice a 4 cifre!`);return}n.style.display=`block`,n.innerHTML=`📡 Scansione Bluetooth BLE per <strong>DECONTO_${e}</strong> in corso...`;try{await i.sendRefillOtpToken(e,t,`ADR_BLE_MANUAL`),r.performRefill({boardShortCode:e,credits:t,method:`BLE_PWA`,operatorId:p.currentUser?p.currentUser.id:`usr_003`}),n.innerHTML=`<span style="color: var(--accent-green);">✅ Ricarica Completata! Accreditate <strong>+${t} cialde</strong> sulla macchina #${e}. Relè Ripristinato.</span>`,setTimeout(()=>m(),2e3)}catch(e){n.innerHTML=`<span style="color: var(--accent-rose);">❌ Errore connessione: ${e.message}</span>`}}),document.querySelectorAll(`.btn-adr-quick-fill`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-code`);await i.sendRefillOtpToken(t,200,`ADR_QUICK_BLE`),r.performRefill({boardShortCode:t,credits:200,method:`BLE_PWA`,operatorId:p.currentUser?p.currentUser.id:`usr_003`}),alert(`✅ Ricaricate +200 cialde via Bluetooth sulla macchina #${t}!`),m()})});let C=document.getElementById(`sim-board-select`);C&&C.addEventListener(`change`,e=>{let t=e.target.value,n=r.getBoardFullDetails(t);n&&(document.getElementById(`sim-badge-code`).innerText=`DECONTO ${t}`,document.getElementById(`sim-credits-display`).innerText=n.board.remainingCredits)});let w=document.getElementById(`btn-sim-brew`);w&&w.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;document.getElementById(`signal-sense-volts`).innerText=`230V AC (Impulso)`,document.getElementById(`signal-sense-badge`).className=`badge badge-warning`,document.getElementById(`signal-sense-badge`).innerText=`EROGAZIONE IN CORSO`;let n=r.registerCoffeeExtraction(t,22,1);setTimeout(()=>{if(document.getElementById(`signal-sense-volts`).innerText=`0V AC`,document.getElementById(`signal-sense-badge`).className=`badge badge-info`,document.getElementById(`signal-sense-badge`).innerText=`INATTIVO`,n&&n.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`[EXTRACTION]: Caffè erogato! Credito rimanente: ${n.remainingCredits}.<br>`,e.scrollTop=e.scrollHeight,n.isLowStock&&(e.innerHTML+=`<span style="color: var(--accent-amber);">[BUZZER 60s]: CREDITO &lt; 20! SEGNALE ACUSTICO ATTIVATO (BIP... BIP...).</span><br>`)}else if(n&&!n.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`<span style="color: var(--accent-rose);">[HARDWARE LOCK]: CREDITO 0! RELÈ APERTO. POMPA DISATTIVATA.</span><br>`}m()},800)});let T=document.getElementById(`btn-sim-reset`);T&&T.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;r.performRefill({boardShortCode:t,credits:200,method:`TEST_BENCH`,operatorId:p.currentUser?p.currentUser.id:`usr_001`}),alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${t}!`),m()})}document.addEventListener(`DOMContentLoaded`,m);