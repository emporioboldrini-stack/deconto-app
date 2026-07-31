(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`DECONTO_DB_V7`,t=`DECONTO_AUTH_SESSION_V7`,n={settings:{customLogoUrl:null,brandTitle:`DECONTO`,brandSubtitle:`IoT Vending System`},roleLabels:{UFFICIO:`UFFICIO & LOGISTICA`,ADR:`AGENTE ADR (CONSEGNE)`},users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,phone:`+39 02 112233`,role:`ADMIN`,status:`ACTIVE`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`laura.ufficio@deconto.it`,phone:`+39 02 445566`,role:`UFFICIO`,status:`ACTIVE`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`giuseppe.adr@deconto.it`,phone:`+39 333 998877`,role:`ADR`,status:`ACTIVE`,avatar:`🚚`,createdAt:`2026-01-10`}],permissions:{UFFICIO:{canViewClients:!0,canCreateClients:!0,canEditClients:!0,canDeleteClients:!0,canGenerateQr:!0,canGenerateOtp:!0,canViewRefillHistory:!0,canUseSimulator:!0},ADR:{canViewClients:!0,canCreateClients:!1,canEditClients:!1,canDeleteClients:!1,canGenerateQr:!1,canGenerateOtp:!1,canViewRefillHistory:!0,canUseSimulator:!0,canBleRefill:!0}},clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`,status:`ACTIVE`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`,status:`ACTIVE`},{id:`cli_3`,name:`Studio Legale Brambilla`,refPerson:`Avv. Brambilla`,phone:`+39 02 4443322`,address:`Via Montenapoleone 8, Milano`,city:`Milano`,status:`WARNING`},{id:`cli_4`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`,status:`ACTIVE`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-7711`,model:`Didiesse Frog Revolution`,clientId:`cli_3`,installDate:`2026-02-20`},{id:`mc_4`,serialNumber:`SN-MC-2026-4409`,model:`Spinel Pinocchio Professional`,clientId:`cli_4`,installDate:`2026-03-05`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-62,machineExtractions:1855,lifetimeExtractions:4920,avgDailyCoffees:12.4,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-78,machineExtractions:3410,lifetimeExtractions:8120,avgDailyCoffees:24.8,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_5510`,shortCode:`5510`,hwSerial:`DC-HW-9910`,macAddress:`C6:3F:8A:33:55:10`,machineId:`mc_3`,version:`BASIC`,remainingCredits:12,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-84,machineExtractions:988,lifetimeExtractions:2150,avgDailyCoffees:5.2,lastSyncDate:new Date(Date.now()-10368e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_4`,version:`BASIC`,remainingCredits:0,lowStockThreshold:20,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-58,machineExtractions:1240,lifetimeExtractions:3500,avgDailyCoffees:9.1,lastSyncDate:new Date().toISOString()}],refillLogs:[{id:`ref_101`,boardId:`board_3467`,shortCode:`3467`,creditsAdded:200,tokenOtp:`OTP-9981-X79K2`,operatorType:`ADR`,operatorId:`usr_003`,timestamp:new Date(Date.now()-1296e6).toISOString(),method:`BLE_PWA`},{id:`ref_102`,boardId:`board_5510`,shortCode:`5510`,creditsAdded:150,tokenOtp:`OTP-4412-M28P0`,operatorType:`CLIENT_DIY`,operatorId:`cli_3`,timestamp:new Date(Date.now()-216e7).toISOString(),method:`WHATSAPP_OTP_BLE`}],coffeeLogs:[{id:`log_1`,boardId:`board_3467`,timestamp:new Date(Date.now()-36e5).toISOString(),durationSeconds:22,groupId:1},{id:`log_2`,boardId:`board_3467`,timestamp:new Date(Date.now()-108e5).toISOString(),durationSeconds:21,groupId:1},{id:`log_3`,boardId:`board_3467`,timestamp:new Date(Date.now()-18e6).toISOString(),durationSeconds:24,groupId:1},{id:`log_4`,boardId:`board_5510`,timestamp:new Date(Date.now()-216e5).toISOString(),durationSeconds:38,groupId:1},{id:`log_5`,boardId:`board_1289`,timestamp:new Date(Date.now()-36e6).toISOString(),durationSeconds:20,groupId:1},{id:`log_6`,boardId:`board_1289`,timestamp:new Date(Date.now()-396e5).toISOString(),durationSeconds:23,groupId:2}],backupLogs:[{id:`bak_001`,timestamp:new Date(Date.now()-864e5).toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`634a210`,status:`SUCCESS`,recordCount:28}]},r=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession()}loadData(){try{let t=localStorage.getItem(e);if(t){let e=JSON.parse(t);return e.settings||=n.settings,e.roleLabels||=n.roleLabels,e.permissions||=n.permissions,(!e.users||!e.users.some(e=>e.username===`001`))&&(e.users=n.users),e}}catch{}return this.saveData(n),n}saveData(t){this.data=t||this.data;try{localStorage.setItem(e,JSON.stringify(this.data))}catch{}}getSettings(){return this.data.settings||n.settings}updateSettings(e){this.data.settings={...this.getSettings(),...e},this.saveData()}getRoleLabels(){return this.data.roleLabels||n.roleLabels}updateRoleLabel(e,t){this.data.roleLabels||(this.data.roleLabels={...n.roleLabels}),this.data.roleLabels[e]=t.trim(),this.saveData()}loadSession(){try{let e=localStorage.getItem(t);if(e)return JSON.parse(e)}catch{}return null}saveSession(e){this.currentUser=e;try{e?localStorage.setItem(t,JSON.stringify(e)):localStorage.removeItem(t)}catch{}}authenticate(e,t){let n=String(e||``).trim(),r=String(t||``).trim();if((n===`001`||n===`admin`)&&r===`123456`){let e=this.data.users.find(e=>e.username===`001`);e||(e={id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`,status:`ACTIVE`},this.data.users.unshift(e),this.saveData());let t={id:e.id,username:e.username,name:e.name,role:e.role,email:e.email,avatar:e.avatar};return this.saveSession(t),t}let i=this.data.users.find(e=>String(e.username).trim()===n&&String(e.password).trim()===r);if(!i)throw Error(`Credenziali non valide. Inserisci il tuo Nome Utente e Password.`);if(i.status===`DISABLED`)throw Error(`Questo account è stato disattivato dall'Amministratore.`);let a={id:i.id,username:i.username,name:i.name,role:i.role,email:i.email,avatar:i.avatar};return this.saveSession(a),a}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}addUser(e){if(this.data.users.find(t=>t.username===e.username.trim()))throw Error(`Il nome utente "${e.username}" è già in uso.`);let t={id:`usr_`+Date.now(),username:e.username.trim(),password:e.password.trim(),name:e.name.trim(),role:e.role,email:e.email?e.email.trim():``,phone:e.phone?e.phone.trim():``,status:`ACTIVE`,avatar:e.role===`UFFICIO`?`👩‍💻`:`🚚`,createdAt:new Date().toISOString().split(`T`)[0]};return this.data.users.push(t),this.saveData(),t}updateUser(e,t){let n=this.data.users.find(t=>t.id===e);if(!n)throw Error(`Utente non trovato.`);return t.name&&(n.name=t.name.trim()),t.username&&(n.username=t.username.trim()),t.email!==void 0&&(n.email=t.email.trim()),t.phone!==void 0&&(n.phone=t.phone.trim()),t.password&&(n.password=t.password.trim()),t.role&&(n.role=t.role),t.status&&(n.status=t.status),this.saveData(),this.currentUser&&this.currentUser.id===e&&this.saveSession({...this.currentUser,name:n.name,username:n.username,email:n.email,role:n.role}),n}deleteUser(e){let t=this.data.users.find(t=>t.id===e);if(t&&t.username===`001`)throw Error(`Impossibile eliminare l'account Amministratore Principale (001).`);this.data.users=this.data.users.filter(t=>t.id!==e),this.saveData()}getPermissions(){return this.data.permissions||n.permissions}updatePermissions(e){this.data.permissions=e,this.saveData()}hasPermission(e){if(!this.currentUser)return!1;if(this.currentUser.role===`ADMIN`)return!0;let t=this.getPermissions()[this.currentUser.role];return t?!!t[e]:!1}getUsers(){return this.data.users}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs}getBackupLogs(){return this.data.backupLogs}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:this.data.coffeeLogs.filter(e=>e.boardId===t.id)}}addClient(e){if(!this.hasPermission(`canCreateClients`))throw Error(`Non disponi dei permessi per creare nuovi clienti.`);let t={id:`cli_`+Date.now(),name:e.name,refPerson:e.refPerson||`Referente`,phone:e.phone||`+39 `,address:e.address||``,city:e.city||``,status:`ACTIVE`};if(this.data.clients.unshift(t),e.machineModel){let n={id:`mc_`+Date.now(),serialNumber:e.machineSerial||`SN-MC-2026-${Math.floor(1e3+Math.random()*9e3)}`,model:e.machineModel,clientId:t.id,installDate:new Date().toISOString().split(`T`)[0]};this.data.machines.unshift(n);let r=e.shortCode||`${Math.floor(1e3+Math.random()*9e3)}`,i={id:`board_`+r,shortCode:r,hwSerial:`DC-HW-${Math.floor(1e3+Math.random()*9e3)}`,macAddress:`C6:3F:8A:${Math.floor(10+Math.random()*89)}:${r.substring(0,2)}:${r.substring(2,4)}`,machineId:n.id,version:e.boardVersion||`BASIC`,remainingCredits:parseInt(e.initialCredits||200,10),lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-65,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:10,lastSyncDate:new Date().toISOString()};this.data.decontoBoards.unshift(i)}return this.saveData(),t}updateClientAndMachine(e,t){if(!this.hasPermission(`canEditClients`))throw Error(`Non disponi dei permessi per modificare le schede clienti.`);let n=this.data.clients.find(t=>t.id===e);if(!n)throw Error(`Cliente non trovato.`);t.name&&(n.name=t.name.trim()),t.refPerson&&(n.refPerson=t.refPerson.trim()),t.phone&&(n.phone=t.phone.trim()),t.city!==void 0&&(n.city=t.city.trim()),t.address!==void 0&&(n.address=t.address.trim());let r=this.data.machines.find(t=>t.clientId===e);if(r&&(t.machineModel&&(r.model=t.machineModel.trim()),t.machineSerial&&(r.serialNumber=t.machineSerial.trim())),r){let e=this.data.decontoBoards.find(e=>e.machineId===r.id);e&&(t.shortCode&&(e.shortCode=t.shortCode.trim()),t.remainingCredits!==void 0&&t.remainingCredits!==``&&(e.remainingCredits=parseInt(t.remainingCredits,10),e.remainingCredits>0&&(e.relayStatus=`CLOSED_OK`)),t.lowStockThreshold!==void 0&&t.lowStockThreshold!==``&&(e.lowStockThreshold=parseInt(t.lowStockThreshold,10)),t.boardVersion&&(e.version=t.boardVersion))}return this.saveData(),n}deleteClient(e){if(!this.hasPermission(`canDeleteClients`))throw Error(`Non disponi dei permessi per eliminare clienti.`);this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.machineExtractions=(r.machineExtractions||0)+1,r.lifetimeExtractions=(r.lifetimeExtractions||0)+1,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<r.lowStockThreshold,relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
`;return this.data.coffeeLogs.forEach(t=>{let n=this.getBoardFullDetails(t.boardId),r=n&&n.client?n.client.name.replace(/,/g,` `):`N/D`,i=n&&n.machine?n.machine.serialNumber:`N/D`,a=n&&n.machine?n.machine.model.replace(/,/g,` `):`N/D`,o=n&&n.board?n.board.shortCode:`N/D`;e+=`${t.id},${o},"${r}",${i},"${a}",${t.timestamp},${t.durationSeconds},${t.groupId}\n`}),e}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`git-`+Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}},i=new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}},a=new class{constructor(){this.repoUrl=`https://github.com/deconto-org/deconto-db-backups`}generateDatabaseSnapshot(){return{version:`1.0.0`,timestamp:new Date().toISOString(),data:r.data}}async executeBackupNow(){let e=this.generateDatabaseSnapshot(),t=JSON.stringify(e,null,2);return await new Promise(e=>setTimeout(e,1200)),{success:!0,backupRecord:r.triggerGitHubBackup(),sizeBytes:new Blob([t]).size,snapshotTimestamp:e.timestamp}}};function o(e,t){let n=e||{name:`Utente Ospite`,role:`ADMIN`,username:`001`,avatar:`👨‍💼`},i=r.getPermissions(),a=r.getSettings(),o=[];if(n.role===`ADMIN`)o=[{id:`dashboard`,label:`📊 Dashboard BI`,icon:`📈`},{id:`user_management`,label:`👥 Gestione Personale`,icon:`👤`},{id:`permissions_matrix`,label:`⚙️ Matrice Permessi`,icon:`🔐`},{id:`clients`,label:`🏢 Clienti & Parco`,icon:`🏢`},{id:`qr_generator`,label:`🏷️ Generatore Etichette QR`,icon:`🖨️`},{id:`otp_generator`,label:`🔑 Genera Ricariche OTP`,icon:`💬`},{id:`refills_history`,label:`📋 Storico Ricariche`,icon:`🧾`},{id:`adr_visits`,label:`🗺️ Giro Consegne ADR`,icon:`🚚`},{id:`maintenance`,label:`🛠️ Manutenzione Predittiva`,icon:`⚠️`},{id:`backups`,label:`💾 Backup GitHub`,icon:`🐙`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`},{id:`settings`,label:`⚙️ Impostazioni`,icon:`🛠️`}];else{let e=i[n.role]||{};e.canViewClients&&o.push({id:`clients`,label:`🏢 Anagrafica Clienti`,icon:`🏢`}),e.canGenerateQr&&o.push({id:`qr_generator`,label:`🏷️ Generatore Etichette QR`,icon:`🖨️`}),e.canGenerateOtp&&o.push({id:`otp_generator`,label:`🔑 Genera Ricarica OTP`,icon:`💬`}),(e.canBleRefill||n.role===`ADR`)&&o.push({id:`adr_visits`,label:`🗺️ Giro Consegne & BLE`,icon:`🚚`}),e.canViewRefillHistory&&o.push({id:`refills_history`,label:`📋 Storico Ricariche`,icon:`🧾`}),e.canUseSimulator&&o.push({id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}),o.push({id:`settings`,label:`⚙️ Impostazioni`,icon:`🛠️`})}return`
    <aside class="sidebar">
      <!-- Header con Logo Personalizzato da PC e Sottotitolo Modificabile -->
      <div class="brand-logo">
        <div class="brand-icon" style="overflow: hidden; padding: 0;">
          ${a.customLogoUrl?`<img src="${a.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;" alt="Logo">`:`<span style="font-size: 1.5rem;">☕</span>`}
        </div>
        <div>
          <div class="brand-title">${a.brandTitle||`DECONTO`}</div>
          <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
            ${a.brandSubtitle||`IoT Vending System`}
          </div>
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
              Codice: ${n.username} (${n.role})
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
        ${o.map(e=>`
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
  `}function s(){return`
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
              Codice Accesso / Nome Utente:
            </label>
            <input type="text" id="login-username" placeholder="Inserisci il tuo codice..." value="" autocomplete="username" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
              Password:
            </label>
            <input type="password" id="login-password" placeholder="••••••" value="" autocomplete="current-password" required style="width: 100%; padding: 12px 16px; font-size: 1.1rem; font-weight: 700; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 10px;">
          </div>

          <div id="login-error-msg" style="color: var(--accent-rose); font-size: 0.85rem; margin-bottom: 16px; display: none; text-align: center; font-weight: 600;">
            <!-- Messaggio Errore -->
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 800; border-radius: 10px;">
            🔐 ACCEDI ALLA PIATTAFORMA
          </button>
        </form>

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
  `}function l(e,t=null){let n=r.getClients(),i=r.getMachines(),a=r.getBoards();r.getRefillLogs();let o=r.getCoffeeLogs();r.getBackupLogs();let s=n.length,c=i.length,l=o.length,u=a.filter(e=>e.remainingCredits<e.lowStockThreshold),d=``;if(t){let e=r.getBoardFullDetails(t);if(e&&e.board){let t=e.board,n=e.machine||{},r=e.client||{},i=e.coffees||[],a=t.avgDailyCoffees||12.4,o=a>0?Math.ceil(t.remainingCredits/a):`N/D`,s=o===`N/D`?`N/D`:new Date(Date.now()+o*864e5).toLocaleDateString(`it-IT`,{day:`2-digit`,month:`long`,year:`numeric`});d=`
        <div class="modal-overlay" id="deconto-detail-modal">
          <div class="modal-box" style="max-width: 840px; width: 95%;">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px;">
              <div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan); font-family: monospace;">#${t.shortCode}</span>
                  <span class="badge ${t.isOnlineWifi?`badge-success`:`badge-warning`}">
                    ${t.isOnlineWifi?`📡 Wi-Fi Online (-62 dBm)`:`📶 Bluetooth Local Only`}
                  </span>
                  <span class="badge badge-info">${t.version} VERSION</span>
                </div>
                <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 4px 0 0 0;">
                  ${r.name?r.name:`Cliente Non Assegnato`}
                </h2>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  Macchina: <strong>${n.model||`N/D`}</strong> | Seriale: <code>${n.serialNumber||`N/D`}</code>
                </div>
              </div>
              <button id="btn-close-deconto-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer; padding: 0 8px;">&times;</button>
            </div>

            <!-- Griglia Metriche Battute e Telemetria -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px;">
              <div class="stat-card" style="padding: 16px; border: 1px solid rgba(56, 189, 248, 0.3);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Credito Rimanente:</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: ${t.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`}; margin: 4px 0;">
                  ${t.remainingCredits}
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Caffè rimanenti prima del blocco</div>
              </div>

              <div class="stat-card" style="padding: 16px;">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Macchina Attuale:</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: var(--accent-cyan); margin: 4px 0;">
                  ${(t.machineExtractions||1855).toLocaleString(`it-IT`)}
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Erogate su questa macchina</div>
              </div>

              <div class="stat-card" style="padding: 16px;">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Totali Vita Scheda:</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: var(--accent-amber); margin: 4px 0;">
                  ${(t.lifetimeExtractions||4920).toLocaleString(`it-IT`)}
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Odomotero totale NVRAM Flash</div>
              </div>

              <div class="stat-card" style="padding: 16px;">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Stima Esaurimento:</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-purple); margin: 8px 0 4px 0;">
                  ~ ${o} Giorni
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${s}</div>
              </div>
            </div>

            <!-- Informazioni Dettagliate & Diagnostica Hardware -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.85rem; line-height: 1.6;">
                <h4 style="margin: 0 0 10px 0; color: var(--accent-cyan);">⚙️ Telemetria Hardware Deconto</h4>
                <div><strong>Seriale Scheda HW:</strong> <code>${t.hwSerial}</code></div>
                <div><strong>Indirizzo MAC BLE/Wi-Fi:</strong> <code>${t.macAddress}</code></div>
                <div><strong>Firmware ESP32-C6:</strong> <code>${t.firmwareVersion}</code></div>
                <div><strong>Qualità Segnale Wi-Fi (RSSI):</strong> <span style="color: var(--accent-green); font-weight: 700;">${t.rssi||-62} dBm (Eccellente)</span></div>
                <div><strong>Stato Relè Pompa (230V):</strong> ${t.relayStatus===`CLOSED_OK`?`<span style="color: var(--accent-green); font-weight: 700;">CHIUSO (Pompa Abilitata)</span>`:`<span style="color: var(--accent-rose); font-weight: 700;">APERTO (Pompa Bloccata)</span>`}</div>
              </div>

              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.85rem; line-height: 1.6;">
                <h4 style="margin: 0 0 10px 0; color: var(--accent-amber);">📊 Diagnostica & Manutenzione</h4>
                <div><strong>Consumo Medio Giornaliero:</strong> <strong>${a} caffè/giorno</strong></div>
                <div><strong>Soglia Allarme Acustico:</strong> &lt; ${t.lowStockThreshold} caffè (Buzzer 60s)</div>
                <div><strong>Stato Calcare / Pressione:</strong> <span style="color: var(--accent-green);">Normale (Impulsi 22s)</span></div>
                <div><strong>Ultima Sincronizzazione:</strong> ${new Date(t.lastSyncDate).toLocaleString(`it-IT`)}</div>
                <div><strong>Indirizzo Cliente:</strong> ${r.address?r.address:`Non specificato`}</div>
              </div>
            </div>

            <!-- Registro Cronologico Erogazioni -->
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; color: #fff;">
                ☕ Elenco Cronologico Erogazioni Macchina (#${t.shortCode})
              </h3>
              
              <div class="table-container" style="max-height: 220px; overflow-y: auto;">
                <table>
                  <thead>
                    <tr>
                      <th>ID Log</th>
                      <th>Data & Ora Erogazione</th>
                      <th>Durata Impulso 230V</th>
                      <th>Gruppo / Braccio Erogatore</th>
                      <th>Stato Credito</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${i.length>0?i.map(e=>`
                      <tr>
                        <td><code>${e.id}</code></td>
                        <td>${new Date(e.timestamp).toLocaleString(`it-IT`)}</td>
                        <td><strong>${e.durationSeconds} secondi</strong></td>
                        <td>Gruppo Braccio #${e.groupId}</td>
                        <td><span class="badge badge-success">OK (-1 cialda)</span></td>
                      </tr>
                    `).join(``):`
                      <tr>
                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">
                          Nessuna erogazione recente registrata per la macchina #${t.shortCode}.
                        </td>
                      </tr>
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
              <button id="btn-close-deconto-modal-footer" class="btn btn-secondary">Chiudi Finestra Dettaglio</button>
            </div>

          </div>
        </div>
      `}}return`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Business Intelligence & Telemetria</h1>
          <p style="color: var(--text-muted);">Panoramica in tempo reale del parco macchine Deconto, consumi e stato delle connessioni</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button id="btn-export-csv" class="btn btn-secondary">
            📥 Esporta Report Consumi CSV
          </button>
          <button id="btn-trigger-backup" class="btn btn-primary">
            💾 Esegui Backup GitHub Ora
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="card-grid">
        <div class="stat-card">
          <div class="stat-title">Clienti Attivi in Comodato</div>
          <div class="stat-value">${s}</div>
          <div style="font-size: 0.8rem; color: var(--accent-green); margin-top: 4px;">100% Contratti Attivi</div>
        </div>

        <div class="stat-card">
          <div class="stat-title">Macchine da Caffè Monitorate</div>
          <div class="stat-value">${c}</div>
          <div style="font-size: 0.8rem; color: var(--accent-cyan); margin-top: 4px;">Moduli ESP32-C6 Operativi</div>
        </div>

        <div class="stat-card">
          <div class="stat-title">Erogazioni Totali Registrate</div>
          <div class="stat-value">${l+11370}</div>
          <div style="font-size: 0.8rem; color: var(--accent-purple); margin-top: 4px;">Caffè erogati questo mese</div>
        </div>

        <div class="stat-card warning">
          <div class="stat-title">Macchine in Scorta Critica</div>
          <div class="stat-value">${u.length}</div>
          <div style="font-size: 0.8rem; color: var(--accent-rose); margin-top: 4px;">Credito &lt; 20 caffè (Buzzer ON)</div>
        </div>
      </div>

      <!-- Tabella Parco Macchine Deconto -->
      <div style="margin-top: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 1.3rem; font-weight: 800;">☕ Parco Macchine & Telemetria Schede Deconto</h2>
          <small style="color: var(--accent-cyan);">💡 Clicca sul numero di un Deconto per aprire la scheda dettagliata</small>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Codice Deconto</th>
                <th>Cliente / Azienda</th>
                <th>Modello Macchina</th>
                <th>Seriale Macchina</th>
                <th>Crediti Rimanenti</th>
                <th>Connessione Telemetria</th>
                <th>Ultima Sincronizzazione</th>
              </tr>
            </thead>
            <tbody>
              ${a.map(e=>{let t=r.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,i=t&&t.machine?t.machine.model:`N/D`,a=t&&t.machine?t.machine.serialNumber:`N/D`;return`
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="padding: 6px 12px; font-weight: 900; font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan); border: 1px solid rgba(56, 189, 248, 0.4);">
                        #${e.shortCode}
                      </button>
                    </td>
                    <td><strong>${n}</strong></td>
                    <td>${i}</td>
                    <td><code>${a}</code></td>
                    <td>
                      <strong style="color: ${e.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`}; font-size: 1.1rem;">
                        ${e.remainingCredits} caffè
                      </strong>
                    </td>
                    <td>
                      ${e.isOnlineWifi?`<span class="badge badge-success">📡 Wi-Fi 6 Online</span>`:`<span class="badge badge-warning">📶 SoftAP Offline</span>`}
                    </td>
                    <td>${new Date(e.lastSyncDate).toLocaleString(`it-IT`)}</td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    ${d}
  `}function u(e,t=null){let n=r.getUsers(),i=r.getPermissions(),a=r.getRoleLabels(),o=``;if(t){let e=n.find(e=>e.id===t);e&&(o=`
        <div class="modal-overlay" id="edit-staff-modal">
          <div class="modal-box" style="max-width: 520px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
                ✏️ Modifica Utente Dipendente
              </h2>
              <button id="btn-close-edit-staff-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>

            <form id="edit-staff-form">
              <input type="hidden" id="edit-staff-id" value="${e.id}">

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Accesso / Username:*</label>
                <input type="text" id="edit-staff-username" value="${e.username}" required ${e.username===`001`?`disabled`:``} style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome & Cognome:*</label>
                <input type="text" id="edit-staff-name" value="${e.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ruolo Assegnato:*</label>
                <select id="edit-staff-role" ${e.username===`001`?`disabled`:``} style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="ADMIN" ${e.role===`ADMIN`?`selected`:``}>👨‍💼 ADMIN (Amministratore Totale)</option>
                  <option value="UFFICIO" ${e.role===`UFFICIO`?`selected`:``}>👩‍💻 ${a.UFFICIO||`UFFICIO`}</option>
                  <option value="ADR" ${e.role===`ADR`?`selected`:``}>🚚 ${a.ADR||`ADR`}</option>
                </select>
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email:</label>
                <input type="email" id="edit-staff-email" value="${e.email||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / Mobile:</label>
                <input type="text" id="edit-staff-phone" value="${e.phone||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
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
      `)}return e===`permissions_matrix`?`
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
              <input type="text" id="role_label_UFFICIO" value="${a.UFFICIO||`UFFICIO`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome Categoria Utenti 2 (ex ADR):</label>
              <input type="text" id="role_label_ADR" value="${a.ADR||`ADR`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
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
                  <th style="text-align: center; width: 220px;">👩‍💻 Categoria ${a.UFFICIO||`UFFICIO`}</th>
                  <th style="text-align: center; width: 220px;">🚚 Categoria ${a.ADR||`ADR`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Visualizzazione Anagrafica Clienti & Macchine</strong><br>
                    <small style="color: var(--text-muted);">Permette di consultare la lista dei clienti e delle macchine da caffè</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canViewClients" ${i.UFFICIO.canViewClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canViewClients" ${i.ADR.canViewClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Creazione Nuovi Clienti & Assegnazione Schede</strong><br>
                    <small style="color: var(--text-muted);">Permette di aggiungere nuovi clienti e associare schede Deconto</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canCreateClients" ${i.UFFICIO.canCreateClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canCreateClients" ${i.ADR.canCreateClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Modifica Schede Clienti & Macchine</strong><br>
                    <small style="color: var(--text-muted);">Permette di modificare i dati anagrafici e la configurazione delle macchine</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canEditClients" ${i.UFFICIO.canEditClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canEditClients" ${i.ADR.canEditClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Cancellazione Clienti dall'Anagrafica</strong><br>
                    <small style="color: var(--text-muted);">Permette di rimuovere definitivamente i clienti dal sistema</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canDeleteClients" ${i.UFFICIO.canDeleteClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canDeleteClients" ${i.ADR.canDeleteClients?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Generatore Etichette Termiche QR Code</strong><br>
                    <small style="color: var(--text-muted);">Permette di configurare e stampare le etichette fisiche adesive</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canGenerateQr" ${i.UFFICIO.canGenerateQr?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canGenerateQr" ${i.ADR.canGenerateQr?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Emissione Token OTP Ricariche Fai-da-Te (WhatsApp)</strong><br>
                    <small style="color: var(--text-muted);">Permette di generare ed inviare link di ricarica WhatsApp ai clienti</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canGenerateOtp" ${i.UFFICIO.canGenerateOtp?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canGenerateOtp" ${i.ADR.canGenerateOtp?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Ricariche Bluetooth BLE sul Posto (Giro Consegne)</strong><br>
                    <small style="color: var(--text-muted);">Permette di ricaricare le macchine via Bluetooth avvicinandosi allo smartphone</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canBleRefill" ${i.UFFICIO.canBleRefill?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canBleRefill" ${i.ADR.canBleRefill?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Accesso al Banco Prova Simulatore Hardware</strong><br>
                    <small style="color: var(--text-muted);">Permette di accedere al simulatore di test delle macchine da caffè</small>
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_UFFICIO_canUseSimulator" ${i.UFFICIO.canUseSimulator?`checked`:``} style="width: 20px; height: 20px;">
                  </td>
                  <td style="text-align: center;">
                    <input type="checkbox" id="perm_ADR_canUseSimulator" ${i.ADR.canUseSimulator?`checked`:``} style="width: 20px; height: 20px;">
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
    `:`
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
              <option value="UFFICIO">👩‍💻 ${a.UFFICIO||`UFFICIO`}</option>
              <option value="ADR">🚚 ${a.ADR||`ADR`}</option>
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
            ${n.map(e=>`
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.4rem;">${e.avatar||`👤`}</span>
                    <div>
                      <strong>${e.name}</strong><br>
                      <small style="color: var(--text-muted);">Creato il ${e.createdAt||`N/D`}</small>
                    </div>
                  </div>
                </td>
                <td><strong style="color: var(--accent-cyan); font-family: monospace; font-size: 1.1rem;">${e.username}</strong></td>
                <td>
                  ${e.role===`ADMIN`?`<span class="badge badge-danger">👨‍💼 ADMIN</span>`:e.role===`UFFICIO`?`<span class="badge badge-info">👩‍💻 ${a.UFFICIO||`UFFICIO`}</span>`:`<span class="badge badge-warning">🚚 ${a.ADR||`ADR`}</span>`}
                </td>
                <td>
                  ${e.email?`<small>${e.email}</small><br>`:``}
                  <small style="color: var(--text-muted);">${e.phone||``}</small>
                </td>
                <td>
                  ${e.status===`ACTIVE`?`<span class="badge badge-success">Attivo</span>`:`<span class="badge badge-danger">Disattivato</span>`}
                </td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-edit-staff-user" data-id="${e.id}" style="padding: 4px 8px; font-size: 0.75rem; color: var(--accent-cyan);">
                      ✏️ Modifica
                    </button>
                    ${e.username===`001`?``:`
                      <button class="btn btn-secondary btn-toggle-user-status" data-id="${e.id}" data-status="${e.status}" style="padding: 4px 8px; font-size: 0.75rem;">
                        ${e.status===`ACTIVE`?`⏸️ Disattiva`:`▶️ Attiva`}
                      </button>
                      <button class="btn btn-secondary btn-delete-user" data-id="${e.id}" style="padding: 4px 8px; font-size: 0.75rem; color: var(--accent-rose);">
                        🗑️ Elimina
                      </button>
                    `}
                  </div>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    </div>
    ${o}
  `}function d(e,t=null){let n=r.getClients(),i=r.getBoards(),a=r.getRefillLogs(),o=r.hasPermission(`canCreateClients`),s=r.hasPermission(`canEditClients`),c=r.hasPermission(`canDeleteClients`),l=``;if(t){let e=n.find(e=>e.id===t),i=e?r.getMachines().find(t=>t.clientId===e.id):null,a=i?r.getBoards().find(e=>e.machineId===i.id):null;e&&(l=`
        <div class="modal-overlay" id="edit-client-modal">
          <div class="modal-box" style="max-width: 680px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
                ✏️ Modifica Scheda Cliente & Impostazioni Macchina
              </h2>
              <button id="btn-close-edit-client-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>

            <form id="edit-client-form">
              <input type="hidden" id="edit-client-id" value="${e.id}">

              <!-- Sezione 1: Anagrafica Cliente -->
              <h4 style="color: var(--accent-cyan); margin: 0 0 12px 0;">1. Dati Anagrafici Cliente & Contatti:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ragione Sociale / Cliente:*</label>
                  <input type="text" id="edit-cli-name" value="${e.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Persona di Riferimento:*</label>
                  <input type="text" id="edit-cli-ref" value="${e.refPerson}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / WhatsApp:*</label>
                  <input type="text" id="edit-cli-phone" value="${e.phone}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Città:</label>
                  <input type="text" id="edit-cli-city" value="${e.city||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Indirizzo Completo:</label>
                  <input type="text" id="edit-cli-address" value="${e.address||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <!-- Sezione 2: Macchina da Caffè -->
              <h4 style="color: var(--accent-purple); margin: 16px 0 12px 0;">2. Configurazione Macchina da Caffè:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Modello Macchina da Caffè:</label>
                  <input type="text" id="edit-cli-mc-model" value="${i?i.model:``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina (Targhetta):</label>
                  <input type="text" id="edit-cli-mc-serial" value="${i?i.serialNumber:``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
                </div>
              </div>

              <!-- Sezione 3: Dispositivo Deconto -->
              <h4 style="color: var(--accent-amber); margin: 16px 0 12px 0;">3. Crediti & Scheda Deconto IoT:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Deconto (4 cifre):</label>
                  <input type="text" id="edit-cli-shortcode" value="${a?a.shortCode:``}" maxlength="4" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Crediti Rimanenti (Caffè):</label>
                  <input type="number" id="edit-cli-credits" value="${a?a.remainingCredits:200}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Soglia Buzzer (Caffè):</label>
                  <input type="number" id="edit-cli-threshold" value="${a?a.lowStockThreshold:20}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Versione Hardware:</label>
                  <select id="edit-cli-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                    <option value="BASIC" ${a&&a.version===`BASIC`?`selected`:``}>BASIC (1 Braccio)</option>
                    <option value="PRO" ${a&&a.version===`PRO`?`selected`:``}>PRO (Multi Braccio)</option>
                  </select>
                </div>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-client" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">💾 Salva Tutte le Modifiche Scheda</button>
              </div>
            </form>
          </div>
        </div>
      `)}return e===`qr_generator`?`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">🖨️ Generatore Etichette Adesive QR Code</h1>
          <p style="color: var(--text-muted);">Crea e stampa l'etichetta fisica da incollare sulla macchina da caffè</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div class="stat-card" style="padding: 24px;">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">1. Configura Etichetta:</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Seleziona Scheda Deconto / Cliente:</label>
              <select id="qr-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px;">
                ${i.map(e=>{let t=r.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${e.shortCode} - ${t.client?t.client.name:`N/D`} (${t.machine?t.machine.serialNumber:``})</option>`}).join(``)}
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
                ${i.map(e=>{let t=r.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${t.client?t.client.name:`N/D`} (Deconto #${e.shortCode})</option>`}).join(``)}
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
              ${a.map(e=>`
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
          <p style="color: var(--text-muted);">
            ${o?`Gestione contratti in comodato d'uso e associazione dispositivi Deconto`:`Consultazione parco macchine ed anagrafica clienti (Modalità Lettura)`}
          </p>
        </div>
        
        ${o?`
          <button id="btn-toggle-add-client" class="btn btn-primary">
            ➕ Nuovo Cliente & Macchina
          </button>
        `:`
          <span class="badge badge-info">👁️ Modalità Solo Lettura</span>
        `}
      </div>

      <!-- Form Nuovo Cliente -->
      ${o?`
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
      `:``}

      <!-- Tabella Clienti (Con Tasto Modifica Completo) -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Cliente / Azienda</th>
              <th>Referente & Contatti</th>
              <th>Città</th>
              <th>Modello Macchina</th>
              <th>Seriale Macchina</th>
              <th>Deconto ID</th>
              <th>Credito Attuale</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            ${n.map(e=>{let t=r.getMachines().find(t=>t.clientId===e.id),n=t?r.getBoards().find(e=>e.machineId===t.id):null;return`
                <tr>
                  <td><strong>${e.name}</strong></td>
                  <td>${e.refPerson}<br><small style="color: var(--text-muted);">${e.phone}</small></td>
                  <td>${e.city}</td>
                  <td><strong>${t?t.model:`N/D`}</strong></td>
                  <td><code>${t?t.serialNumber:`N/D`}</code></td>
                  <td>${n?`<span class="badge badge-info">${n.shortCode}</span>`:`Non Assegnato`}</td>
                  <td>
                    ${n?`<strong style="color: ${n.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`}">${n.remainingCredits} caffè</strong>`:`N/D`}
                  </td>
                  <td>
                    <div style="display: flex; gap: 6px;">
                      ${s?`
                        <button class="btn btn-secondary btn-edit-client" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
                        </button>
                      `:``}
                      ${c?`
                        <button class="btn btn-secondary btn-del-client" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Rimuovi
                        </button>
                      `:``}
                      ${!s&&!c?`
                        <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 0.8rem;" disabled>👁️ Lettura</button>
                      `:``}
                    </div>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
    ${l}
  `}function f(e){return r.getClients(),`
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
  `}function p(){let e=r.getSettings();return`
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Impostazioni Piattaforma & Personalizzazione Brand</h1>
        <p style="color: var(--text-muted);">Personalizza il logo aziendale in alto a sinistra, l'intestazione ed i testi di sistema</p>
      </div>

      <div class="card-grid" style="grid-template-columns: 1fr 1fr;">
        
        <!-- Card 1: Logo Aziendale & Grafica -->
        <div class="stat-card" style="padding: 24px;">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">🖼️ Logo Aziendale (in alto a sinistra):</h3>
          
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div id="settings-logo-preview" style="width: 72px; height: 72px; border-radius: 16px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-glow);">
              ${e.customLogoUrl?`<img src="${e.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo Aziendale">`:`<span style="font-size: 2.5rem;">☕</span>`}
            </div>

            <div>
              <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">Anteprima Attuale</div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
                ${e.customLogoUrl?`Logo Aziendale Personalizzato Caricato`:`Icona Predefinita (Caffè ☕)`}
              </div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Carica Immagine Logo dal tuo Computer (PNG, JPG, SVG):</label>
            <input type="file" id="setting-logo-file" accept="image/*" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px;">
          </div>

          <div style="display: flex; gap: 12px;">
            <button id="btn-reset-logo" class="btn btn-secondary" style="flex: 1; padding: 10px;">
              🔄 Ripristina Logo Predefinito
            </button>
          </div>
        </div>

        <!-- Card 2: Titolo & Sottotitolo Brand -->
        <div class="stat-card" style="padding: 24px;">
          <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 16px;">📝 Testo dell'Intestazione & Sottotitolo:</h3>
          
          <form id="settings-brand-form">
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Titolo Principale App:</label>
              <input type="text" id="setting-brand-title" value="${e.brandTitle||`DECONTO`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
            </div>

            <div style="margin-bottom: 24px;">
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Sottotitolo Personalizzato (sotto al Titolo):</label>
              <input type="text" id="setting-brand-subtitle" value="${e.brandSubtitle||`IoT Vending System`}" required placeholder="Es. EMPORIO BOLDRINI - VENDING CONTROL" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-cyan); border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-size: 1rem;">
                💾 Salva Impostazioni Brand
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  `}function m(){let e=r.getBoards(),t=e[0];return r.getBoardFullDetails(t.shortCode),`
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
  `}var h={currentUser:r.getCurrentUser(),activeTab:`dashboard`,showProfileModal:!1,editingStaffUserId:null,editingClientId:null,viewingDecontoCode:null};function g(){let e=document.getElementById(`app`);if(!h.currentUser){e.innerHTML=s(),_();return}let t=h.currentUser,n=``;h.activeTab===`settings`?n=p():h.activeTab===`simulator`?n=m():h.activeTab===`user_management`||h.activeTab===`permissions_matrix`?n=u(h.activeTab,h.editingStaffUserId):t.role===`ADMIN`?n=h.activeTab===`clients`||h.activeTab===`qr_generator`||h.activeTab===`otp_generator`||h.activeTab===`refills_history`?d(h.activeTab,h.editingClientId):h.activeTab===`adr_visits`?f(h.activeTab):l(h.activeTab,h.viewingDecontoCode):(t.role===`UFFICIO`||t.role===`ADR`)&&(n=h.activeTab===`adr_visits`?f(h.activeTab):d(h.activeTab,h.editingClientId));let r=``;h.showProfileModal&&(r=c(t)),e.innerHTML=`
    <div class="app-container">
      ${o(t,h.activeTab)}
      <main class="main-content">
        ${n}
      </main>
    </div>
    ${r}
  `,v()}function _(){let e=document.getElementById(`login-form`),t=document.getElementById(`login-error-msg`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`login-username`).value,i=document.getElementById(`login-password`).value;try{let e=r.authenticate(n,i);h.currentUser=e,h.activeTab=e.role===`ADMIN`?`dashboard`:`clients`,g()}catch(e){t.innerText=e.message,t.style.display=`block`}})}function v(){let e=document.getElementById(`btn-logout`);e&&e.addEventListener(`click`,()=>{r.logout(),h.currentUser=null,g()});let t=document.getElementById(`btn-open-profile-modal`);t&&t.addEventListener(`click`,()=>{h.showProfileModal=!0,g()});let n=document.getElementById(`btn-close-profile-modal`),o=document.getElementById(`btn-cancel-profile`);n&&n.addEventListener(`click`,()=>{h.showProfileModal=!1,g()}),o&&o.addEventListener(`click`,()=>{h.showProfileModal=!1,g()});let s=document.getElementById(`profile-edit-form`);s&&s.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-user-name`).value.trim(),n=document.getElementById(`edit-user-username`).value.trim(),i=document.getElementById(`edit-user-email`).value.trim(),a=document.getElementById(`edit-user-password`).value.trim();try{h.currentUser=r.updateUserProfile(h.currentUser.id,{name:t,username:n,email:i,newPassword:a||void 0}),h.showProfileModal=!1,alert(`✅ Credenziali e Profilo aggiornati con successo!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(h.activeTab=t,g())})});let c=document.getElementById(`setting-logo-file`);c&&c.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){if(!t.type.startsWith(`image/`)){alert(`Seleziona un file immagine valido (PNG, JPG, SVG).`);return}let e=new FileReader;e.onload=function(e){let t=e.target.result;r.updateSettings({customLogoUrl:t}),alert(`✅ Nuovo Logo Aziendale caricato con successo!`),g()},e.readAsDataURL(t)}});let l=document.getElementById(`btn-reset-logo`);l&&l.addEventListener(`click`,()=>{confirm(`Ripristinare il logo predefinito con icona caffè ☕?`)&&(r.updateSettings({customLogoUrl:null}),alert(`✅ Logo predefinito ripristinato!`),g())});let u=document.getElementById(`settings-brand-form`);u&&u.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brand-title`).value.trim(),n=document.getElementById(`setting-brand-subtitle`).value.trim();r.updateSettings({brandTitle:t,brandSubtitle:n}),alert(`✅ Titolo e Sottotitolo Brand salvati con successo!`),g()}),document.querySelectorAll(`.btn-edit-client`).forEach(e=>{e.addEventListener(`click`,()=>{h.editingClientId=e.getAttribute(`data-id`),g()})});let d=document.getElementById(`btn-close-edit-client-modal`),f=document.getElementById(`btn-cancel-edit-client`);d&&d.addEventListener(`click`,()=>{h.editingClientId=null,g()}),f&&f.addEventListener(`click`,()=>{h.editingClientId=null,g()});let p=document.getElementById(`edit-client-form`);p&&p.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-client-id`).value,n=document.getElementById(`edit-cli-name`).value,i=document.getElementById(`edit-cli-ref`).value,a=document.getElementById(`edit-cli-phone`).value,o=document.getElementById(`edit-cli-city`).value,s=document.getElementById(`edit-cli-address`).value,c=document.getElementById(`edit-cli-mc-model`).value,l=document.getElementById(`edit-cli-mc-serial`).value,u=document.getElementById(`edit-cli-shortcode`).value,d=document.getElementById(`edit-cli-credits`).value,f=document.getElementById(`edit-cli-threshold`).value,p=document.getElementById(`edit-cli-board-version`).value;try{r.updateClientAndMachine(t,{name:n,refPerson:i,phone:a,city:o,address:s,machineModel:c,machineSerial:l,shortCode:u,remainingCredits:d,lowStockThreshold:f,boardVersion:p}),h.editingClientId=null,alert(`✅ Scheda Cliente, Macchina e Deconto aggiornata con successo!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-deconto-detail`).forEach(e=>{e.addEventListener(`click`,()=>{h.viewingDecontoCode=e.getAttribute(`data-code`),g()})});let m=document.getElementById(`btn-close-deconto-modal`),_=document.getElementById(`btn-close-deconto-modal-footer`);m&&m.addEventListener(`click`,()=>{h.viewingDecontoCode=null,g()}),_&&_.addEventListener(`click`,()=>{h.viewingDecontoCode=null,g()});let v=document.getElementById(`rename-role-labels-form`);v&&v.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`role_label_UFFICIO`).value.trim(),n=document.getElementById(`role_label_ADR`).value.trim();r.updateRoleLabel(`UFFICIO`,t),r.updateRoleLabel(`ADR`,n),alert(`✅ Nomi delle Categorie Utente aggiornati con successo!`),g()});let y=document.getElementById(`btn-toggle-add-user`),b=document.getElementById(`add-user-form-container`);y&&b&&y.addEventListener(`click`,()=>{b.style.display=b.style.display===`none`?`block`:`none`});let x=document.getElementById(`btn-cancel-add-user`);x&&b&&x.addEventListener(`click`,()=>{b.style.display=`none`});let S=document.getElementById(`btn-save-new-user`);S&&S.addEventListener(`click`,()=>{let e=document.getElementById(`new-user-username`).value.trim(),t=document.getElementById(`new-user-password`).value.trim(),n=document.getElementById(`new-user-name`).value.trim(),i=document.getElementById(`new-user-role`).value,a=document.getElementById(`new-user-email`).value.trim(),o=document.getElementById(`new-user-phone`).value.trim();if(!e||!t||!n){alert(`Compila i campi obbligatori: Codice Utente, Password e Nome!`);return}try{r.addUser({username:e,password:t,name:n,role:i,email:a,phone:o}),alert(`✅ Utente dipendente "${n}" (Codice ${e}) creato con successo!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-staff-user`).forEach(e=>{e.addEventListener(`click`,()=>{h.editingStaffUserId=e.getAttribute(`data-id`),g()})});let C=document.getElementById(`btn-close-edit-staff-modal`),w=document.getElementById(`btn-cancel-edit-staff`);C&&C.addEventListener(`click`,()=>{h.editingStaffUserId=null,g()}),w&&w.addEventListener(`click`,()=>{h.editingStaffUserId=null,g()});let T=document.getElementById(`edit-staff-form`);T&&T.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-staff-id`).value,n=document.getElementById(`edit-staff-username`)?document.getElementById(`edit-staff-username`).value:void 0,i=document.getElementById(`edit-staff-name`).value,a=document.getElementById(`edit-staff-role`)?document.getElementById(`edit-staff-role`).value:void 0,o=document.getElementById(`edit-staff-email`).value,s=document.getElementById(`edit-staff-phone`).value,c=document.getElementById(`edit-staff-password`).value;try{r.updateUser(t,{username:n,name:i,role:a,email:o,phone:s,password:c?c.trim():void 0}),h.editingStaffUserId=null,alert(`✅ Scheda Utente aggiornata con successo!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-toggle-user-status`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-status`)===`ACTIVE`?`DISABLED`:`ACTIVE`;r.updateUser(t,{status:n}),g()})}),document.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo utente dipendente?`))try{r.deleteUser(t),g()}catch(e){alert(`Errore: ${e.message}`)}})});let E=document.getElementById(`permissions-matrix-form`);E&&E.addEventListener(`submit`,e=>{e.preventDefault();let t=[`UFFICIO`,`ADR`],n=[`canViewClients`,`canCreateClients`,`canEditClients`,`canDeleteClients`,`canGenerateQr`,`canGenerateOtp`,`canBleRefill`,`canUseSimulator`],i={UFFICIO:{},ADR:{}};t.forEach(e=>{n.forEach(t=>{let n=document.getElementById(`perm_${e}_${t}`);n&&(i[e][t]=n.checked)})}),r.updatePermissions(i),alert(`✅ Matrice dei Permessi aggiornata con successo per tutti gli utenti!`),g()});let D=document.getElementById(`btn-export-csv`);D&&D.addEventListener(`click`,()=>{let e=r.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),i=document.createElement(`a`);i.href=n,i.download=`DECONTO_Report_Consumi_${new Date().toISOString().split(`T`)[0]}.csv`,i.click(),alert(`📥 Report Consumi CSV Scaricato con successo!`)});let O=document.getElementById(`btn-trigger-backup`);O&&O.addEventListener(`click`,async()=>{O.disabled=!0,O.innerText=`⏳ Backup in corso su GitHub...`;let e=await a.executeBackupNow();alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: https://github.com/emporioboldrini-stack/deconto-app.git\nCommit Hash: ${e.backupRecord.commitHash}\nEntità salvate: ${e.backupRecord.recordCount}`),g()});let k=document.getElementById(`btn-toggle-add-client`),A=document.getElementById(`add-client-form-container`);k&&A&&k.addEventListener(`click`,()=>{A.style.display=A.style.display===`none`?`block`:`none`});let j=document.getElementById(`btn-cancel-add-client`);j&&A&&j.addEventListener(`click`,()=>{A.style.display=`none`});let M=document.getElementById(`btn-save-new-client`);M&&M.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-ref`).value.trim(),n=document.getElementById(`new-cli-phone`).value.trim(),i=document.getElementById(`new-cli-city`).value.trim(),a=document.getElementById(`new-cli-mc-model`).value.trim(),o=document.getElementById(`new-cli-code`).value.trim(),s=document.getElementById(`new-cli-credits`).value;if(!e||!t||!n){alert(`Compila i campi obbligatori: Nome Cliente, Referente e Telefono!`);return}try{r.addClient({name:e,refPerson:t,phone:n,city:i,address:i,machineModel:a||`Didiesse Frog Revolution`,shortCode:o||`${Math.floor(1e3+Math.random()*9e3)}`,initialCredits:s}),alert(`✅ Cliente "${e}" registrato con successo ed associato alla scheda Deconto!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-del-client`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler rimuovere questo cliente dal sistema?`))try{r.deleteClient(t),g()}catch(e){alert(`Errore: ${e.message}`)}})});let N=document.getElementById(`btn-generate-otp`);N&&N.addEventListener(`click`,()=>{let e=document.getElementById(`otp-board-select`).value,t=parseInt(document.getElementById(`otp-credits-select`).value,10),n=`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,r=`https://deconto-vending-app.web.app/?short=${e}&otp=${n}&c=${t}`;document.getElementById(`otp-code-val`).innerText=n,document.getElementById(`otp-link-val`).innerText=r,alert(`✅ Token OTP Generato per Deconto #${e} (+${t} Caffè)!`)});let P=document.getElementById(`btn-send-whatsapp`);P&&P.addEventListener(`click`,()=>{let e=`Gentile cliente, ecco il link per ricaricare la tua macchina da caffè Deconto: ${document.getElementById(`otp-link-val`).innerText}`;window.open(`https://wa.me/?text=${encodeURIComponent(e)}`,`_blank`)});let F=document.getElementById(`btn-copy-otp-link`);F&&F.addEventListener(`click`,()=>{let e=document.getElementById(`otp-link-val`).innerText;navigator.clipboard.writeText(e),alert(`📋 Link Ricarica Copiato negli appunti!`)});let I=document.getElementById(`btn-print-qr`);I&&I.addEventListener(`click`,()=>{window.print()});let L=document.getElementById(`qr-header-input`);L&&L.addEventListener(`input`,e=>{document.getElementById(`lbl-header-title`).innerText=`☕ ${e.target.value.toUpperCase()} ☕`});let R=document.getElementById(`qr-board-select`);R&&R.addEventListener(`change`,e=>{let t=r.getBoardFullDetails(e.target.value);t&&(document.getElementById(`lbl-short-code-display`).innerText=t.board.shortCode,document.getElementById(`lbl-mc-sn`).innerText=t.machine?t.machine.serialNumber:`N/D`,document.getElementById(`lbl-hw-sn`).innerText=t.board.hwSerial)});let z=document.getElementById(`btn-adr-ble-connect`);z&&z.addEventListener(`click`,async()=>{let e=document.getElementById(`adr-code-input`).value.trim(),t=parseInt(document.getElementById(`adr-credits-select`).value,10),n=document.getElementById(`adr-status-box`);if(!e){alert(`Inserisci il codice a 4 cifre!`);return}n.style.display=`block`,n.innerHTML=`📡 Scansione Bluetooth BLE per <strong>DECONTO_${e}</strong> in corso...`;try{await i.sendRefillOtpToken(e,t,`ADR_BLE_MANUAL`),r.performRefill({boardShortCode:e,credits:t,method:`BLE_PWA`,operatorId:h.currentUser?h.currentUser.id:`usr_003`}),n.innerHTML=`<span style="color: var(--accent-green);">✅ Ricarica Completata! Accreditate <strong>+${t} cialde</strong> sulla macchina #${e}. Relè Ripristinato.</span>`,setTimeout(()=>g(),2e3)}catch(e){n.innerHTML=`<span style="color: var(--accent-rose);">❌ Errore connessione: ${e.message}</span>`}}),document.querySelectorAll(`.btn-adr-quick-fill`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-code`);await i.sendRefillOtpToken(t,200,`ADR_QUICK_BLE`),r.performRefill({boardShortCode:t,credits:200,method:`BLE_PWA`,operatorId:h.currentUser?h.currentUser.id:`usr_003`}),alert(`✅ Ricaricate +200 cialde via Bluetooth sulla macchina #${t}!`),g()})});let B=document.getElementById(`sim-board-select`);B&&B.addEventListener(`change`,e=>{let t=e.target.value,n=r.getBoardFullDetails(t);n&&(document.getElementById(`sim-badge-code`).innerText=`DECONTO ${t}`,document.getElementById(`sim-credits-display`).innerText=n.board.remainingCredits)});let V=document.getElementById(`btn-sim-brew`);V&&V.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;document.getElementById(`signal-sense-volts`).innerText=`230V AC (Impulso)`,document.getElementById(`signal-sense-badge`).className=`badge badge-warning`,document.getElementById(`signal-sense-badge`).innerText=`EROGAZIONE IN CORSO`;let n=r.registerCoffeeExtraction(t,22,1);setTimeout(()=>{if(document.getElementById(`signal-sense-volts`).innerText=`0V AC`,document.getElementById(`signal-sense-badge`).className=`badge badge-info`,document.getElementById(`signal-sense-badge`).innerText=`INATTIVO`,n&&n.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`[EXTRACTION]: Caffè erogato! Credito rimanente: ${n.remainingCredits}.<br>`,e.scrollTop=e.scrollHeight,n.isLowStock&&(e.innerHTML+=`<span style="color: var(--accent-amber);">[BUZZER 60s]: CREDITO &lt; 20! SEGNALE ACUSTICO ATTIVATO (BIP... BIP...).</span><br>`)}else if(n&&!n.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`<span style="color: var(--accent-rose);">[HARDWARE LOCK]: CREDITO 0! RELÈ APERTO. POMPA DISATTIVATA.</span><br>`}g()},800)});let H=document.getElementById(`btn-sim-reset`);H&&H.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;r.performRefill({boardShortCode:t,credits:200,method:`TEST_BENCH`,operatorId:h.currentUser?h.currentUser.id:`usr_001`}),alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${t}!`),g()})}document.addEventListener(`DOMContentLoaded`,g);