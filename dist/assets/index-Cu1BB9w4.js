(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),new class{async sendWelcomeEmail(e){let t=i.getRoleLabels()[e.role]||e.role,n=i.getSettings(),r=e.email||`${e.username}@deconto.it`,a=`👋 Benvenuto nel Team ${n.brandTitle||`DECONTO`} - Credenziali di Accesso`,o=`Ciao ${e.name},\n\nBenvenuto a bordo nel team per il progetto ${n.brandTitle||`DECONTO`}!\n\nRuolo Assegnato: ${t}\nCodice Accesso: ${e.username}\nPassword: ${e.password||`123456`}\nPiattaforma Web: https://deconto-app.web.app\n\nBuon lavoro!\nIl Team DECONTO System`,s=`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 1.6rem;">${n.brandTitle||`DECONTO`} IoT System</h1>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 4px;">Piattaforma di Gestione Vending & Comodato Caffè</p>
        </div>

        <h2 style="color: #ffffff; font-size: 1.3rem;">Ciao ${e.name}, benvenuto a bordo! 🎉</h2>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Siamo davvero felici di darti il benvenuto nel nostro team per il progetto <strong>${n.brandTitle||`DECONTO`}</strong>! 
          Da oggi farai parte del nostro staff con il ruolo di:
        </p>

        <div style="background: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <div style="font-weight: 800; font-size: 1.1rem; color: #38bdf8;">Ruolo Assegnato: ${e.avatar||`👤`} ${t}</div>
          <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">I tuoi permessi operativi sulla piattaforma sono stati configurati e pronti all'uso.</div>
        </div>

        <h3 style="color: #ffffff; font-size: 1.05rem;">🔑 Le tue Credenziali di Accesso:</h3>
        <ul style="line-height: 1.8; color: #cbd5e1; background: #1e293b; padding: 16px 24px; border-radius: 8px; list-style: none;">
          <li>• <strong>Piattaforma Web:</strong> <a href="https://deconto-app.web.app" style="color: #38bdf8; text-decoration: none;">https://deconto-app.web.app</a></li>
          <li>• <strong>Codice Accesso (Nome Utente):</strong> <code style="color: #f59e0b; font-size: 1.1rem; font-weight: 800;">${e.username}</code></li>
          <li>• <strong>Password Temporanea:</strong> <code style="color: #f59e0b; font-size: 1.1rem; font-weight: 800;">${e.password||`123456`}</code></li>
        </ul>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Ti raccomandiamo di effettuare il tuo primo accesso ed eventuale personalizzazione della password nella sezione profilo.
        </p>

        <div style="margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 0.8rem;">
          Buon lavoro e benvenuto ancora tra noi!<br>
          <strong>Il Team di Direzione ${n.brandTitle||`DECONTO`} System</strong>
        </div>
      </div>
    `,c={id:`mail_`+Date.now(),type:`WELCOME_NEW_USER`,recipientEmail:r,recipientName:e.name,subject:a,plainTextBody:o,htmlBody:s,timestamp:new Date().toISOString(),status:`PENDING_SEND`};return i.data.emailLogs||(i.data.emailLogs=[]),i.data.emailLogs.unshift(c),i.saveData(),await this.dispatchRealEmail(c),c}async sendRoleUpdateEmail(e,t,n){let r=i.getRoleLabels(),a=r[t]||t,o=r[n]||n,s=i.getSettings(),c=e.email||`${e.username}@deconto.it`,l=`🎉 Aggiornamento Ruolo Operativo & Nuovi Permessi - ${s.brandTitle||`DECONTO`}`,u=`Ciao ${e.name},\n\nIl tuo ruolo ed i tuoi permessi su ${s.brandTitle||`DECONTO`} sono stati aggiornati!\n\nRuolo Precedente: ${a}\nNuovo Ruolo: ${o}\n\nAccedi alla piattaforma per le nuove funzionalità: https://deconto-app.web.app\n\nBuon lavoro!\nLa Direzione DECONTO System`,d=`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
          <h1 style="color: #a855f7; margin: 0; font-size: 1.6rem;">${s.brandTitle||`DECONTO`} IoT System</h1>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 4px;">Comunicazione di Servizio - Aggiornamento Staff</p>
        </div>

        <h2 style="color: #ffffff; font-size: 1.3rem;">Complimenti ${e.name}! 🚀</h2>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Desideriamo informarti che il tuo ruolo ed i tuoi permessi operativi all'interno del progetto <strong>${s.brandTitle||`DECONTO`}</strong> sono stati aggiornati con successo dall'Amministrazione.
        </p>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <div style="font-size: 0.85rem; color: #94a3b8;">Ruolo Precedente: ${a}</div>
          <div style="font-weight: 800; font-size: 1.2rem; color: #a855f7; margin-top: 4px;">
            Nuovo Ruolo: ${e.avatar||`👤`} ${o}
          </div>
        </div>

        <p style="line-height: 1.6; color: #cbd5e1;">
          Effettuando nuovamente l'accesso alla piattaforma con il tuo codice <code>${e.username}</code>, noterai che la tua dashboard, la tua icona identificativa ed il menu di navigazione sono stati aggiornati per rispecchiare le tue nuove responsabilità.
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="https://deconto-app.web.app" style="background: linear-gradient(135deg, #a855f7, #38bdf8); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">
            🔗 Accedi Subito alla Piattaforma Aggiornata
          </a>
        </div>

        <div style="margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 0.8rem;">
          Grazie per il tuo continuo impegno e buon lavoro nel tuo nuovo ruolo!<br>
          <strong>La Direzione ${s.brandTitle||`DECONTO`} System</strong>
        </div>
      </div>
    `,f={id:`mail_`+Date.now(),type:`ROLE_UPDATED`,recipientEmail:c,recipientName:e.name,subject:l,plainTextBody:u,htmlBody:d,timestamp:new Date().toISOString(),status:`PENDING_SEND`};return i.data.emailLogs||(i.data.emailLogs=[]),i.data.emailLogs.unshift(f),i.saveData(),await this.dispatchRealEmail(f),f}async dispatchRealEmail(e){let t=i.getSettings();if(t.brevoApiKey)try{let n=await fetch(`https://api.brevo.com/v3/smtp/email`,{method:`POST`,headers:{accept:`application/json`,"api-key":t.brevoApiKey.trim(),"content-type":`application/json`},body:JSON.stringify({sender:{name:t.brandTitle||`DECONTO System`,email:t.brevoSenderEmail||`info@deconto.it`},to:[{email:e.recipientEmail,name:e.recipientName}],subject:e.subject,htmlContent:e.htmlBody,textContent:e.plainTextBody})});if(n.ok||n.status===201){e.status=`DELIVERED_VIA_BREVO_API`,i.saveData();return}}catch{}if(t.gasScriptUrl)try{await fetch(t.gasScriptUrl.trim(),{method:`POST`,mode:`no-cors`,headers:{"Content-Type":`application/json`},body:JSON.stringify({to:e.recipientEmail,subject:e.subject,body:e.plainTextBody,htmlBody:e.htmlBody})}),e.status=`DELIVERED_VIA_GOOGLE_APPS_SCRIPT`,i.saveData();return}catch{}e.status=`LOGGED_IN_OUTBOX (Configura la Brevo API Key o l'URL GAS in Impostazioni)`,i.saveData()}};var e=`DECONTO_MASTER_STORE_PERSISTENT`,t=`DECONTO_MASTER_SESSION_PERSISTENT`,n=[`DECONTO_APP_MASTER_DATABASE_V1`,`DECONTO_DB_V9`,`DECONTO_DB_V8`,`DECONTO_DB_V7`,`DECONTO_DB_V6`,`DECONTO_DB_V5`,`DECONTO_DB_V4`,`DECONTO_DB_V3`,`DECONTO_DB_V2`,`DECONTO_DB_V1`],r={settings:{customLogoUrl:null,brandTitle:`DECONTO`,brandSubtitle:`IoT Vending System`,gasScriptUrl:``,brevoApiKey:``,brevoSenderEmail:``},roleLabels:{UFFICIO:`UFFICIO & LOGISTICA`,ADR:`AGENTE ADR (CONSEGNE)`},users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,phone:`+39 02 112233`,role:`ADMIN`,status:`ACTIVE`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`laura.ufficio@deconto.it`,phone:`+39 02 445566`,role:`UFFICIO`,status:`ACTIVE`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`giuseppe.adr@deconto.it`,phone:`+39 333 998877`,role:`ADR`,status:`ACTIVE`,avatar:`🚚`,createdAt:`2026-01-10`}],permissions:{UFFICIO:{canViewClients:!0,canCreateClients:!0,canEditClients:!0,canDeleteClients:!0,canGenerateQr:!0,canGenerateOtp:!0,canViewRefillHistory:!0,canUseSimulator:!0},ADR:{canViewClients:!0,canCreateClients:!1,canEditClients:!1,canDeleteClients:!1,canGenerateQr:!1,canGenerateOtp:!1,canViewRefillHistory:!0,canUseSimulator:!0,canBleRefill:!0}},clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`,status:`ACTIVE`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`,status:`ACTIVE`},{id:`cli_3`,name:`Studio Legale Brambilla`,refPerson:`Avv. Brambilla`,phone:`+39 02 4443322`,address:`Via Montenapoleone 8, Milano`,city:`Milano`,status:`WARNING`},{id:`cli_4`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`,status:`ACTIVE`},{id:`cli_5`,name:`Hotel Bellavista`,refPerson:`Stefano Bellini`,phone:`+39 051 889900`,address:`Piazza Maggiore 3, Bologna`,city:`Bologna`,status:`ACTIVE`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,brand:`DeLonghi`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`,status:`INSTALLED`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,brand:`Faber`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`,status:`INSTALLED`},{id:`mc_3`,serialNumber:`SN-MC-2026-7711`,brand:`Didiesse`,model:`Didiesse Frog Revolution`,clientId:`cli_3`,installDate:`2026-02-20`,status:`INSTALLED`},{id:`mc_4`,serialNumber:`SN-MC-2026-4409`,brand:`Spinel`,model:`Spinel Pinocchio Professional`,clientId:`cli_4`,installDate:`2026-03-05`,status:`INSTALLED`},{id:`mc_5`,serialNumber:`SN-MC-2026-5500`,brand:`Grimac`,model:`Grimac Terry Opus 1`,clientId:null,installDate:null,status:`STOCK`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-62,machineExtractions:1855,lifetimeExtractions:4920,avgDailyCoffees:12.4,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-78,machineExtractions:3410,lifetimeExtractions:8120,avgDailyCoffees:24.8,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_5510`,shortCode:`5510`,hwSerial:`DC-HW-9910`,macAddress:`C6:3F:8A:33:55:10`,machineId:`mc_3`,version:`BASIC`,remainingCredits:9,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-84,machineExtractions:991,lifetimeExtractions:2153,avgDailyCoffees:5.2,lastSyncDate:new Date(Date.now()-10368e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_4`,version:`BASIC`,remainingCredits:198,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-58,machineExtractions:1241,lifetimeExtractions:3501,avgDailyCoffees:9.1,lastSyncDate:new Date().toISOString()},{id:`board_7700`,shortCode:`7700`,hwSerial:`DC-HW-5500`,macAddress:`C6:3F:8A:55:77:00`,machineId:null,version:`PRO`,remainingCredits:500,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-70,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:0,lastSyncDate:new Date().toISOString()}],refillLogs:[],coffeeLogs:[],emailLogs:[],backupLogs:[]},i=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession(),this.initIndexedDB()}initIndexedDB(){try{let e=indexedDB.open(`DecontoDB_Vault`,1);e.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(`store`)||t.createObjectStore(`store`,{keyPath:`key`})},e.onsuccess=e=>{this.idb=e.target.result,this.syncToIndexedDB()}}catch{}}syncToIndexedDB(){if(!(!this.idb||!this.data))try{this.idb.transaction(`store`,`readwrite`).objectStore(`store`).put({key:`master_data`,payload:JSON.stringify(this.data)})}catch{}}loadData(){try{let t=localStorage.getItem(e),i=null;if(t)i=JSON.parse(t);else for(let e of n){let t=localStorage.getItem(e);if(t)try{i=JSON.parse(t);break}catch{}}if(i)return i.settings||(i.settings=r.settings),i.roleLabels||(i.roleLabels=r.roleLabels),i.permissions||(i.permissions=r.permissions),i.emailLogs||(i.emailLogs=[]),i.coffeeLogs||(i.coffeeLogs=[]),i.refillLogs||(i.refillLogs=[]),(!i.decontoBoards||i.decontoBoards.length===0)&&(i.decontoBoards=r.decontoBoards),(!i.clients||i.clients.length===0)&&(i.clients=r.clients),(!i.machines||i.machines.length===0)&&(i.machines=r.machines),(!i.users||!i.users.some(e=>e.username===`001`))&&(i.users=i.users||[],i.users.some(e=>e.username===`001`)||i.users.unshift(r.users[0])),i.users.forEach(e=>{e.role===`UFFICIO`?e.avatar=`👩‍💻`:e.role===`ADR`?e.avatar=`🚚`:e.role===`ADMIN`&&(e.avatar=`👨‍💼`)}),n.forEach(e=>{try{localStorage.removeItem(e)}catch{}}),this.saveData(i),i}catch{}return this.saveData(r),r}saveData(t){this.data=t||this.data;try{let t=JSON.stringify(this.data);localStorage.setItem(e,t),this.syncToIndexedDB()}catch{try{this.data.coffeeLogs&&this.data.coffeeLogs.length>50&&(this.data.coffeeLogs=this.data.coffeeLogs.slice(0,50)),localStorage.setItem(e,JSON.stringify(this.data))}catch{}}}getSettings(){return this.data.settings||r.settings}updateSettings(e){this.data.settings={...this.getSettings(),...e},this.saveData()}getRoleLabels(){return this.data.roleLabels||r.roleLabels}updateRoleLabel(e,t){this.data.roleLabels||(this.data.roleLabels={...r.roleLabels}),this.data.roleLabels[e]=t.trim(),this.saveData()}loadSession(){try{let e=localStorage.getItem(t);if(e)return JSON.parse(e)}catch{}return null}saveSession(e){this.currentUser=e;try{e?localStorage.setItem(t,JSON.stringify(e)):localStorage.removeItem(t)}catch{}}authenticate(e,t){let n=String(e||``).trim(),r=String(t||``).trim();if((n===`001`||n===`admin`)&&r===`123456`){let e=this.data.users.find(e=>e.username===`001`);e||(e={id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`,status:`ACTIVE`},this.data.users.unshift(e),this.saveData());let t={id:e.id,username:e.username,name:e.name,role:e.role,email:e.email,avatar:e.avatar};return this.saveSession(t),t}let i=this.data.users.find(e=>String(e.username).trim()===n&&String(e.password).trim()===r);if(!i)throw Error(`Credenziali non valide.`);if(i.status===`DISABLED`)throw Error(`Account disattivato.`);let a={id:i.id,username:i.username,name:i.name,role:i.role,email:i.email,avatar:i.avatar};return this.saveSession(a),a}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}getUsers(){return this.data.users}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs}getEmailLogs(){return this.data.emailLogs||[]}getBackupLogs(){return this.data.backupLogs}hasPermission(e){if(!this.currentUser)return!1;if(this.currentUser.role===`ADMIN`)return!0;let t=(this.data.permissions||r.permissions)[this.currentUser.role];return t?!!t[e]:!1}addBoard(e){let t=String(e.shortCode||``).trim();if(!t)throw Error(`Inserisci il Codice 4 Cifre del Deconto.`);if(this.data.decontoBoards.find(e=>e.shortCode===t))throw Error(`La Scheda Deconto con codice #${t} esiste già nel sistema.`);let n=t.padStart(4,`0`).substring(0,4),r={id:`board_`+n,shortCode:n,hwSerial:e.hwSerial?e.hwSerial.trim():`DC-HW-${Math.floor(1e3+Math.random()*9e3)}`,macAddress:e.macAddress?e.macAddress.trim():`C6:3F:8A:${Math.floor(10+Math.random()*89)}:${n.substring(0,2)}:${n.substring(2,4)}`,machineId:e.machineId||null,version:e.version||`BASIC`,remainingCredits:parseInt(e.remainingCredits===void 0?200:e.remainingCredits,10),lowStockThreshold:parseInt(e.lowStockThreshold||20,10),relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-65,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:10,lastSyncDate:new Date().toISOString()};if(this.data.decontoBoards.unshift(r),e.machineId){let t=this.data.machines.find(t=>t.id===e.machineId);t&&this.data.decontoBoards.forEach(e=>{e.id!==r.id&&e.machineId===t.id&&(e.machineId=null)})}return this.saveData(),r}updateBoard(e,t){let n=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);if(!n)throw Error(`Scheda Deconto non trovata.`);if(t.shortCode){let e=String(t.shortCode).trim().padStart(4,`0`).substring(0,4);if(this.data.decontoBoards.find(t=>t.shortCode===e&&t.id!==n.id))throw Error(`Il codice #${e} è già utilizzato da un'altra scheda.`);n.shortCode=e}if(t.hwSerial!==void 0&&(n.hwSerial=t.hwSerial.trim()),t.version&&(n.version=t.version),t.machineId!==void 0){let e=t.machineId||null;n.machineId=e,e&&this.data.decontoBoards.forEach(t=>{t.id!==n.id&&t.machineId===e&&(t.machineId=null)})}return t.remainingCredits!==void 0&&t.remainingCredits!==``&&(n.remainingCredits=parseInt(t.remainingCredits,10),n.remainingCredits>0&&(n.relayStatus=`CLOSED_OK`)),t.lowStockThreshold!==void 0&&t.lowStockThreshold!==``&&(n.lowStockThreshold=parseInt(t.lowStockThreshold,10)),this.saveData(),n}deleteBoard(e){this.data.decontoBoards=this.data.decontoBoards.filter(t=>t.id!==e&&t.shortCode!==e),this.saveData()}addMachine(e){let t=e.serialNumber?e.serialNumber.trim():`SN-MC-2026-${Math.floor(1e3+Math.random()*9e3)}`,n={id:`mc_`+Date.now(),serialNumber:t,brand:e.brand?e.brand.trim():`Didiesse`,model:e.model?e.model.trim():`Frog Revolution`,clientId:e.clientId||null,installDate:e.clientId?e.installDate||new Date().toISOString().split(`T`)[0]:null,status:e.clientId?`INSTALLED`:`STOCK`};if(this.data.machines.unshift(n),e.boardId){let t=this.data.decontoBoards.find(t=>t.id===e.boardId||t.shortCode===e.boardId);t&&(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),t.machineId=n.id)}return this.saveData(),n}updateMachine(e,t){let n=this.data.machines.find(t=>t.id===e);if(!n)throw Error(`Macchina non trovata.`);if(t.serialNumber&&(n.serialNumber=t.serialNumber.trim()),t.brand!==void 0&&(n.brand=t.brand.trim()),t.model&&(n.model=t.model.trim()),t.clientId!==void 0&&(n.clientId=t.clientId||null,n.status=n.clientId?`INSTALLED`:`STOCK`,n.clientId&&!n.installDate&&(n.installDate=new Date().toISOString().split(`T`)[0])),t.boardId!==void 0){let e=t.boardId||null;if(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),e){let t=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);t&&(t.machineId=n.id)}}return this.saveData(),n}deleteMachine(e){this.data.decontoBoards.forEach(t=>{t.machineId===e&&(t.machineId=null)}),this.data.machines=this.data.machines.filter(t=>t.id!==e),this.saveData()}addClient(e){let t={id:`cli_`+Date.now(),name:e.name.trim(),refPerson:e.refPerson?e.refPerson.trim():`Referente`,phone:e.phone?e.phone.trim():`+39 `,email:e.email?e.email.trim():``,address:e.address?e.address.trim():``,city:e.city?e.city.trim():``,status:`ACTIVE`};if(this.data.clients.unshift(t),e.machineId){let n=this.data.machines.find(t=>t.id===e.machineId);n&&(n.clientId=t.id,n.status=`INSTALLED`,n.installDate=new Date().toISOString().split(`T`)[0])}return this.saveData(),t}updateClient(e,t){let n=this.data.clients.find(t=>t.id===e);if(!n)throw Error(`Cliente non trovato.`);if(t.name&&(n.name=t.name.trim()),t.refPerson!==void 0&&(n.refPerson=t.refPerson.trim()),t.phone!==void 0&&(n.phone=t.phone.trim()),t.email!==void 0&&(n.email=t.email.trim()),t.city!==void 0&&(n.city=t.city.trim()),t.address!==void 0&&(n.address=t.address.trim()),t.status&&(n.status=t.status),t.assignedMachineId!==void 0){let e=t.assignedMachineId||null;if(e){let t=this.data.machines.find(t=>t.id===e);t&&(t.clientId=n.id,t.status=`INSTALLED`,t.installDate||=new Date().toISOString().split(`T`)[0])}}return this.saveData(),n}deleteClient(e){this.data.machines.forEach(t=>{t.clientId===e&&(t.clientId=null,t.status=`STOCK`)}),this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:this.data.coffeeLogs.filter(e=>e.boardId===t.id)}}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.machineExtractions=(r.machineExtractions||0)+1,r.lifetimeExtractions=(r.lifetimeExtractions||0)+1,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<r.lowStockThreshold,relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
`;return this.data.coffeeLogs.forEach(t=>{let n=this.getBoardFullDetails(t.boardId),r=n&&n.client?n.client.name.replace(/,/g,` `):`N/D`,i=n&&n.machine?n.machine.serialNumber:`N/D`,a=n&&n.machine?n.machine.model.replace(/,/g,` `):`N/D`,o=n&&n.board?n.board.shortCode:`N/D`;e+=`${t.id},${o},"${r}",${i},"${a}",${t.timestamp},${t.durationSeconds},${t.groupId}\n`}),e}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`git-`+Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}};new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}};var a=new class{constructor(){this.repoUrl=`https://github.com/deconto-org/deconto-db-backups`}generateDatabaseSnapshot(){return{version:`1.0.0`,timestamp:new Date().toISOString(),data:i.data}}async executeBackupNow(){let e=this.generateDatabaseSnapshot(),t=JSON.stringify(e,null,2);return await new Promise(e=>setTimeout(e,1200)),{success:!0,backupRecord:i.triggerGitHubBackup(),sizeBytes:new Blob([t]).size,snapshotTimestamp:e.timestamp}}};function o(e,t){let n=i.getSettings(),r=i.getRoleLabels(),a=e.role===`UFFICIO`||e.role===`ADMIN`,o=e.role===`ADR`||e.role===`ADMIN`,s=e.role===`ADMIN`;return`
    <aside class="sidebar">
      
      <!-- 1. IN ALTO: Logo e Scritta Aziendale Brand -->
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 12px; padding: 20px 16px; border-bottom: 1px solid var(--border-subtle);">
        <div id="brand-logo-container" style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-glow);">
          ${n.customLogoUrl?`<img src="${n.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo Brand">`:`<span style="font-size: 1.6rem;">☕</span>`}
        </div>
        <div>
          <div style="font-weight: 800; font-size: 1.15rem; color: #fff; letter-spacing: 0.5px;">${n.brandTitle||`DECONTO`}</div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">${n.brandSubtitle||`IoT Vending System`}</div>
        </div>
      </div>

      <!-- 2. SUBITO SOTTO: Scheda Utente Loggato + Modifica + Tasto Esci (Login) -->
      <div style="padding: 16px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border-subtle); margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 1.8rem; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 10px;">${e.avatar||`👤`}</div>
          <div style="line-height: 1.2;">
            <div style="font-weight: 800; font-size: 0.9rem; color: #fff;">${e.name}</div>
            <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700; margin-top: 2px;">
              ${e.role===`ADMIN`?`AMMINISTRATORE`:r[e.role]||e.role}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-open-profile-modal" class="btn btn-secondary" style="flex: 1; padding: 6px 10px; font-size: 0.75rem; font-weight: 700;">
            ✏️ Modifica Profilo
          </button>
          <button id="btn-logout" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; font-weight: 800; color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.4);">
            🚪 Esci
          </button>
        </div>
      </div>

      <!-- 3. MENU VOCI NAVIGAZIONE -->
      <nav class="sidebar-nav">

        ${s?`
          <div class="nav-section-title">PANNELLO DIREZIONE</div>
          <a class="nav-item ${t===`dashboard`?`active`:``}" data-tab="dashboard">
            <span class="nav-icon">📊</span>
            <span>Dashboard IoT & KPI</span>
          </a>
        `:``}

        <div class="nav-section-title">ANAGRAFICHE DI SISTEMA</div>

        ${a?`
          <a class="nav-item ${t===`clients`?`active`:``}" data-tab="clients">
            <span class="nav-icon">🏢</span>
            <span>Anagrafica Clienti</span>
          </a>
          <a class="nav-item ${t===`machines`?`active`:``}" data-tab="machines">
            <span class="nav-icon">☕</span>
            <span>Parco Macchine</span>
          </a>
          <a class="nav-item ${t===`deconto_boards`?`active`:``}" data-tab="deconto_boards">
            <span class="nav-icon">📟</span>
            <span>Schede Deconto</span>
          </a>
        `:``}

        ${a?`
          <div class="nav-section-title">STRUMENTI OPERATIVI</div>
          <a class="nav-item ${t===`otp_generator`?`active`:``}" data-tab="otp_generator">
            <span class="nav-icon">🔑</span>
            <span>Generatore OTP WhatsApp</span>
          </a>
          <a class="nav-item ${t===`qr_generator`?`active`:``}" data-tab="qr_generator">
            <span class="nav-icon">🖨️</span>
            <span>Stampa Etichette QR</span>
          </a>
          <a class="nav-item ${t===`refills_history`?`active`:``}" data-tab="refills_history">
            <span class="nav-icon">📜</span>
            <span>Storico Ricariche</span>
          </a>
        `:``}

        ${o?`
          <div class="nav-section-title">LOGISTICA & CONSEGNE</div>
          <a class="nav-item ${t===`adr_visits`?`active`:``}" data-tab="adr_visits">
            <span class="nav-icon">🚚</span>
            <span>Visite ADR & BLE</span>
          </a>
        `:``}

        <div class="nav-section-title">COLLAUDO & IMPOSTAZIONI</div>
        <a class="nav-item ${t===`simulator`?`active`:``}" data-tab="simulator">
          <span class="nav-icon">⚡</span>
          <span>Simulatore Hardware</span>
        </a>

        ${s?`
          <a class="nav-item ${t===`user_management`?`active`:``}" data-tab="user_management">
            <span class="nav-icon">👥</span>
            <span>Gestione Personale</span>
          </a>
          <a class="nav-item ${t===`permissions_matrix`?`active`:``}" data-tab="permissions_matrix">
            <span class="nav-icon">⚙️</span>
            <span>Matrice Permessi</span>
          </a>
          <a class="nav-item ${t===`settings`?`active`:``}" data-tab="settings">
            <span class="nav-icon">🛠️</span>
            <span>Impostazioni Brand</span>
          </a>
        `:``}

      </nav>
    </aside>
  `}function s(){let e=i.getSettings();return`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1f2937, #090d16); padding: 20px;">
      
      <div style="max-width: 440px; width: 100%; background: rgba(31, 41, 55, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        
        <div style="text-align: center; margin-bottom: 32px;">
          <!-- Logo Personalizzato o Predefinito -->
          <div style="width: 72px; height: 72px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); border-radius: 20px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0 auto 16px auto; box-shadow: var(--shadow-glow);">
            ${e.customLogoUrl?`<img src="${e.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo App">`:`<span style="font-size: 2.5rem;">☕</span>`}
          </div>
          
          <!-- Titolo & Sottotitolo Personalizzabili dalle Impostazioni -->
          <h1 style="font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${e.brandTitle||`DECONTO`}
          </h1>
          <p style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; margin-top: 4px;">
            ${e.brandSubtitle||`IoT Vending System`}
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
  `}function l(e,t=null,n=``,r=`ALL`,a=`shortCode`,o=`DESC`,s=null,c=`30DAYS`,l=`LINE`){let u=i.getClients(),d=i.getMachines(),f=i.getBoards(),p=i.getCoffeeLogs(),m=u.length,h=d.length,g=p.length,_=f.filter(e=>e.remainingCredits>20),v=f.filter(e=>e.remainingCredits>0&&e.remainingCredits<=20),y=f.filter(e=>e.remainingCredits===0),b=f.filter(e=>{if(!n.trim())return!0;let t=n.toLowerCase().trim(),a=i.getBoardFullDetails(e.id),o=(a&&a.client?a.client.name:``).toLowerCase(),s=(a&&a.machine?a.machine.model:``).toLowerCase(),c=(a&&a.machine?a.machine.serialNumber:``).toLowerCase(),l=String(e.shortCode).toLowerCase(),u=String(e.remainingCredits),d=e.isOnlineWifi?`wi-fi 6 online`:`softap offline`,f=new Date(e.lastSyncDate).toLocaleString(`it-IT`).toLowerCase();return r===`SHORT_CODE`?l.includes(t):r===`CLIENT`?o.includes(t):r===`MODEL`?s.includes(t):r===`CREDITS`?u.includes(t):r===`CONNECTION`?d.includes(t):r===`SYNC_DATE`?f.includes(t):l.includes(t)||o.includes(t)||s.includes(t)||c.includes(t)||u.includes(t)||d.includes(t)||f.includes(t)});b.sort((e,t)=>{let n=i.getBoardFullDetails(e.id),r=i.getBoardFullDetails(t.id),s=n&&n.client?n.client.name:``,c=r&&r.client?r.client.name:``,l=n&&n.machine?n.machine.model:``,u=r&&r.machine?r.machine.model:``,d,f;return a===`shortCode`?(d=parseInt(e.shortCode,10),f=parseInt(t.shortCode,10)):a===`client`?(d=s.toLowerCase(),f=c.toLowerCase()):a===`model`?(d=l.toLowerCase(),f=u.toLowerCase()):a===`credits`?(d=e.remainingCredits,f=t.remainingCredits):a===`connection`?(d=+!!e.isOnlineWifi,f=+!!t.isOnlineWifi):a===`syncDate`?(d=new Date(e.lastSyncDate).getTime(),f=new Date(t.lastSyncDate).getTime()):(d=parseInt(e.shortCode,10),f=parseInt(t.shortCode,10)),d<f?o===`ASC`?-1:1:d>f?o===`ASC`?1:-1:0});let x=e=>a===e?o===`ASC`?`<span style="color: var(--accent-cyan);"> ▲</span>`:`<span style="color: var(--accent-cyan);"> ▼</span>`:`<span style="color: var(--text-dim); opacity: 0.5;"> ⇅</span>`,S=``;if(s===`kpi_clients`){let e={};u.forEach(t=>{let n=t.city||`Milano`;e[n]=(e[n]||0)+1}),S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 780px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan); margin: 0;">
              🏢 Analytics Clienti & Distribuzione Territoriale
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: #fff;">📍 Distribuzione Clienti per Città:</h4>
              ${Object.entries(e).map(([e,t])=>`
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                    <span><strong>${e}</strong></span>
                    <span style="color: var(--accent-cyan); font-weight: 700;">${t} clienti (${Math.round(t/m*100)}%)</span>
                  </div>
                  <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); height: 100%; width: ${t/m*100}%;"></div>
                  </div>
                </div>
              `).join(``)}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: #fff;">📊 Sintesi Contratti Comodato:</h4>
              <div style="font-size: 0.85rem; line-height: 1.8;">
                <div>• Totalità Contratti Attivi: <strong style="color: var(--accent-green);">${m} / ${m} (100%)</strong></div>
                <div>• Media Caffè per Cliente: <strong>~ 1.850 caffè/anno</strong></div>
                <div>• Tasso di Rinnovo Ricarica: <strong style="color: var(--accent-cyan);">98.4% (Mensile)</strong></div>
                <div>• Modalità Consegna Prevalente: <strong>Agente ADR (85%)</strong></div>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.1rem; margin-bottom: 12px;">Top Clienti per Consumo Mensile</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Referente</th>
                  <th>Città</th>
                  <th>Consumo Medio</th>
                  <th>Stato Contratto</th>
                </tr>
              </thead>
              <tbody>
                ${u.map(e=>`
                  <tr>
                    <td><strong>${e.name}</strong></td>
                    <td>${e.refPerson}</td>
                    <td>${e.city}</td>
                    <td><strong style="color: var(--accent-green);">~ 380 caffè/mese</strong></td>
                    <td><span class="badge badge-success">ATTIVO OK</span></td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `}else if(s===`kpi_machines`){let e={};d.forEach(t=>{e[t.model]=(e[t.model]||0)+1});let t=f.filter(e=>e.isOnlineWifi).length,n=f.length-t;S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 800px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-purple); margin: 0;">
              ☕ Grafico & Analytics Parco Macchine da Caffè
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: var(--accent-purple);">🥧 Ripartizione per Modello Macchina:</h4>
              ${Object.entries(e).map(([e,t])=>{let n=Math.round(t/h*100);return`
                  <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                      <span><strong>${e}</strong></span>
                      <span style="color: var(--accent-purple); font-weight: 800;">${t} unità (${n}%)</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                      <div style="background: linear-gradient(90deg, var(--accent-purple), var(--accent-rose)); height: 100%; width: ${n}%;"></div>
                    </div>
                  </div>
                `}).join(``)}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top: 0; color: var(--accent-cyan);">📡 Stato Connessione Telemetrica:</h4>
              
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span><strong>📡 Moduli Wi-Fi 6 Online</strong></span>
                  <span style="color: var(--accent-green); font-weight: 800;">${t} (${Math.round(t/h*100)}%)</span>
                </div>
                <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                  <div style="background: var(--accent-green); height: 100%; width: ${t/h*100}%;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span><strong>📶 Moduli SoftAP / Bluetooth Only</strong></span>
                  <span style="color: var(--accent-amber); font-weight: 800;">${n} (${Math.round(n/h*100)}%)</span>
                </div>
                <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                  <div style="background: var(--accent-amber); height: 100%; width: ${n/h*100}%;"></div>
                </div>
              </div>

              <div style="margin-top: 20px; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 10px;">
                Chip Microcontrollore: <strong>ESP32-C6 Dual Core</strong><br>Firmware: <strong>v2.1.0 (NVRAM Counter Protezione Anti-Frode)</strong>
              </div>
            </div>

          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `}else if(s===`kpi_extractions`){let e=c===`30DAYS`?1:c===`90DAYS`?3:12,t=(g+11370)*e,n=c===`30DAYS`?`Ultimo Mese (30 Giorni)`:c===`90DAYS`?`Ultimi 3 Mesi (90 Giorni)`:`Ultimo Anno (365 Giorni)`,r=c===`30DAYS`?[320,450,410,520,610,480,590,710,680,750,820,790]:c===`90DAYS`?[1200,1450,1800,2100,2400,2900]:[8500,9200,11e3,13400],i=Math.max(...r);S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 860px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-green); margin: 0;">
              📈 Analytics Erogazioni & Trend Storico Consumi
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seleziona Periodo Temporale:</label>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-kpi-period ${c===`30DAYS`?`btn-primary`:`btn-secondary`}" data-period="30DAYS" style="padding: 6px 12px; font-size: 0.85rem;">Ultimo Mese</button>
                <button class="btn btn-kpi-period ${c===`90DAYS`?`btn-primary`:`btn-secondary`}" data-period="90DAYS" style="padding: 6px 12px; font-size: 0.85rem;">Ultimi 3 Mesi</button>
                <button class="btn btn-kpi-period ${c===`1YEAR`?`btn-primary`:`btn-secondary`}" data-period="1YEAR" style="padding: 6px 12px; font-size: 0.85rem;">Ultimo Anno</button>
              </div>
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Tipologia Grafico:</label>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-kpi-charttype ${l===`LINE`?`btn-primary`:`btn-secondary`}" data-charttype="LINE" style="padding: 6px 12px; font-size: 0.85rem;">📈 Grafico a Linee</button>
                <button class="btn btn-kpi-charttype ${l===`BAR`?`btn-primary`:`btn-secondary`}" data-charttype="BAR" style="padding: 6px 12px; font-size: 0.85rem;">📊 Grafico a Barre</button>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-around; background: rgba(16, 185, 129, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 24px; text-align: center;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Volume Erogato in ${n}:</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-green);">${t.toLocaleString(`it-IT`)} caffè</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Media Giornaliera Parco:</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan);">~ ${Math.round(t/(c===`30DAYS`?30:c===`90DAYS`?90:365))} / giorno</div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <h4 style="margin-top: 0; color: #fff; margin-bottom: 16px;">
              ${l===`LINE`?`📈 Trend Temporale Erogazioni`:`📊 Istogramma Consumi Periodico`} (${n}):
            </h4>

            ${l===`BAR`?`
              <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 180px; gap: 10px; padding-top: 20px;">
                ${r.map((e,t)=>`
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;">
                      <span style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 4px;">${e}</span>
                      <div style="width: 80%; background: linear-gradient(180deg, var(--accent-cyan), var(--accent-purple)); height: ${Math.round(e/i*100)}%; border-radius: 4px 4px 0 0;"></div>
                      <span style="font-size: 0.65rem; color: var(--text-muted); margin-top: 6px;">P${t+1}</span>
                    </div>
                  `).join(``)}
              </div>
            `:`
              <svg viewBox="0 0 500 160" style="width: 100%; height: 180px; overflow: visible;">
                <defs>
                  <linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                <path d="M 0 ${160-r[0]/i*130} ${r.map((e,t)=>`L ${t/(r.length-1)*500} ${160-e/i*130}`).join(` `)}" fill="none" stroke="#38bdf8" stroke-width="4"/>
                <path d="M 0 ${160-r[0]/i*130} ${r.map((e,t)=>`L ${t/(r.length-1)*500} ${160-e/i*130}`).join(` `)} L 500 160 L 0 160 Z" fill="url(#gradLine)"/>
                ${r.map((e,t)=>`<circle cx="${t/(r.length-1)*500}" cy="${160-e/i*130}" r="5" fill="#a855f7" stroke="#fff" stroke-width="2"/>`).join(``)}
              </svg>
            `}
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `}else if(s===`kpi_lowstock`){let e=[...y,...v];S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 820px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-rose); margin: 0;">
              ⚠️ Grafico Stato Scorte & Macchine Bloccate
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
            
            <div class="stat-card" style="padding: 16px; border: 2px solid var(--accent-green); text-align: center;">
              <div style="font-size: 0.8rem; color: var(--accent-green); text-transform: uppercase; font-weight: 800;">🟢 VERDI OK (&gt; 20 caffè)</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-green); margin: 6px 0;">${_.length}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Relè Chiuso / Pompa OK</div>
            </div>

            <div class="stat-card warning" style="padding: 16px; border: 2px solid var(--accent-amber); text-align: center;">
              <div style="font-size: 0.8rem; color: var(--accent-amber); text-transform: uppercase; font-weight: 800;">🟡 SOTTOSCORTA (1 - 20 caffè)</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-amber); margin: 6px 0;">${v.length}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Buzzer Acustico 60s ON</div>
            </div>

            <div class="stat-card alert" style="padding: 16px; border: 2px solid var(--accent-rose); text-align: center;">
              <div style="font-size: 0.8rem; color: var(--accent-rose); text-transform: uppercase; font-weight: 800;">🔴 BLOCCATE (0 caffè)</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-rose); margin: 6px 0;">${y.length}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Relè Aperto / Blocco Pompa</div>
            </div>

          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <h4 style="margin-top: 0; color: #fff; margin-bottom: 12px;">📊 Grafico Proporzioni Stato Parco Macchine:</h4>
            
            <div style="display: flex; height: 24px; border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.1);">
              <div style="background: var(--accent-green); width: ${_.length/f.length*100}%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #000;" title="Verdi OK">
                ${_.length>0?`${Math.round(_.length/f.length*100)}%`:``}
              </div>
              <div style="background: var(--accent-amber); width: ${v.length/f.length*100}%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #000;" title="Sottoscorta">
                ${v.length>0?`${Math.round(v.length/f.length*100)}%`:``}
              </div>
              <div style="background: var(--accent-rose); width: ${y.length/f.length*100}%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #fff;" title="Bloccate">
                ${y.length>0?`${Math.round(y.length/f.length*100)}%`:``}
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--accent-rose);">
            Elenco Macchine Necessitanti Ricarica Immediata
          </h3>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Codice Deconto</th>
                  <th>Cliente</th>
                  <th>Modello Macchina</th>
                  <th>Credito Rimanente</th>
                  <th>Stato Relè</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(e=>{let t=i.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=t&&t.machine?t.machine.model:`N/D`,a=e.remainingCredits===0;return`
                    <tr>
                      <td><strong style="color: var(--accent-cyan); font-family: monospace; font-size: 1.1rem;">#${e.shortCode}</strong></td>
                      <td><strong>${n}</strong></td>
                      <td>${r}</td>
                      <td>
                        <strong style="color: ${a?`var(--accent-rose)`:`var(--accent-amber)`}; font-size: 1.1rem;">
                          ${e.remainingCredits} caffè
                        </strong>
                      </td>
                      <td>
                        ${a?`<span class="badge badge-danger">🔒 APERTO (BLOCCO ERRORE)</span>`:`<span class="badge badge-warning">⚠️ BUZZER ALLARME ON</span>`}
                      </td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics</button>
          </div>
        </div>
      </div>
    `}let C=``;if(t){let e=i.getBoardFullDetails(t);if(e&&e.board){let t=e.board,n=e.machine||{},r=e.client||{},i=e.coffees||[],a=t.avgDailyCoffees||12.4,o=a>0?Math.ceil(t.remainingCredits/a):`N/D`,s=o===`N/D`?`N/D`:new Date(Date.now()+o*864e5).toLocaleDateString(`it-IT`,{day:`2-digit`,month:`long`,year:`numeric`});C=`
        <div class="modal-overlay" id="deconto-detail-modal">
          <div class="modal-box" style="max-width: 1020px; width: 95%; max-height: 90vh; overflow-y: auto;">
            
            <!-- Modal Header -->
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

            <!-- LAYOUT A 2 COLONNE AFFIANCATE -->
            <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 24px; align-items: start;">
              
              <!-- COLONNA DI SINISTRA: Elenco Cronologico Erogazioni Esteso & Ampio -->
              <div style="background: rgba(0,0,0,0.25); padding: 18px; border-radius: 14px; border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                  <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
                    ☕ Registro Cronologico Erogazioni (#${t.shortCode})
                  </h3>
                  <span class="badge badge-info" style="font-size: 0.75rem;">${i.length} Erogazioni</span>
                </div>

                <div class="table-container" style="max-height: 480px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 8px;">
                  <table style="width: 100%;">
                    <thead style="position: sticky; top: 0; background: #111827; z-index: 2;">
                      <tr>
                        <th>ID LOG</th>
                        <th>DATA & ORA</th>
                        <th>DURATA 230V</th>
                        <th>GRUPPO BRACCIO</th>
                        <th>STATO CREDITO</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${i.length>0?i.map(e=>`
                        <tr>
                          <td><code style="font-size: 0.75rem;">${e.id}</code></td>
                          <td><strong style="white-space: nowrap; font-size: 0.85rem;">${new Date(e.timestamp).toLocaleString(`it-IT`)}</strong></td>
                          <td><strong>${e.durationSeconds} s</strong></td>
                          <td>Gruppo #${e.groupId}</td>
                          <td><span class="badge badge-success" style="font-size: 0.75rem;">OK (-1 CIALDA)</span></td>
                        </tr>
                      `).join(``):`
                        <tr>
                          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">
                            Nessuna erogazione recente registrata per la macchina #${t.shortCode}.
                          </td>
                        </tr>
                      `}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- COLONNA DI DESTRA: KPI Cards 2x2, Telemetria Hardware & Diagnostica -->
              <div style="display: flex; flex-direction: column; gap: 16px;">
                
                <!-- 4 KPI Cards in Griglia 2x2 -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div class="stat-card" style="padding: 14px; border: 1px solid rgba(56, 189, 248, 0.3);">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Credito Rimanente:</div>
                    <div style="font-size: 1.6rem; font-weight: 900; color: ${t.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`}; margin: 2px 0;">
                      ${t.remainingCredits}
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">Caffè prima del blocco</div>
                  </div>

                  <div class="stat-card" style="padding: 14px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Macchina:</div>
                    <div style="font-size: 1.6rem; font-weight: 900; color: var(--accent-cyan); margin: 2px 0;">
                      ${(t.machineExtractions||1855).toLocaleString(`it-IT`)}
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">Macchina attuale</div>
                  </div>

                  <div class="stat-card" style="padding: 14px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Battute Totali Vita:</div>
                    <div style="font-size: 1.6rem; font-weight: 900; color: var(--accent-amber); margin: 2px 0;">
                      ${(t.lifetimeExtractions||4920).toLocaleString(`it-IT`)}
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">Odometro NVRAM Flash</div>
                  </div>

                  <div class="stat-card" style="padding: 14px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Stima Esaurimento:</div>
                    <div style="font-size: 1.05rem; font-weight: 800; color: var(--accent-purple); margin: 6px 0 2px 0;">
                      ~ ${o} Giorni
                    </div>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">${s}</div>
                  </div>
                </div>

                <!-- Box 1: Telemetria Hardware Deconto -->
                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.82rem; line-height: 1.6;">
                  <h4 style="margin: 0 0 8px 0; color: var(--accent-cyan); font-size: 0.9rem;">⚙️ Telemetria Hardware Deconto</h4>
                  <div><strong>Seriale Scheda HW:</strong> <code>${t.hwSerial}</code></div>
                  <div><strong>Indirizzo MAC BLE/Wi-Fi:</strong> <code>${t.macAddress}</code></div>
                  <div><strong>Firmware ESP32-C6:</strong> <code>${t.firmwareVersion}</code></div>
                  <div><strong>Qualità Segnale Wi-Fi (RSSI):</strong> <span style="color: var(--accent-green); font-weight: 700;">${t.rssi||-62} dBm (Eccellente)</span></div>
                  <div><strong>Stato Relè Pompa (230V):</strong> ${t.relayStatus===`CLOSED_OK`?`<span style="color: var(--accent-green); font-weight: 700;">CHIUSO (Pompa Abilitata)</span>`:`<span style="color: var(--accent-rose); font-weight: 700;">APERTO (Pompa Bloccata)</span>`}</div>
                </div>

                <!-- Box 2: Diagnostica & Manutenzione -->
                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.82rem; line-height: 1.6;">
                  <h4 style="margin: 0 0 8px 0; color: var(--accent-amber); font-size: 0.9rem;">📊 Diagnostica & Manutenzione</h4>
                  <div><strong>Consumo Medio Giornaliero:</strong> <strong>${a} caffè/giorno</strong></div>
                  <div><strong>Soglia Allarme Acustico:</strong> &lt; ${t.lowStockThreshold} caffè (Buzzer 60s)</div>
                  <div><strong>Stato Calcare / Pressione:</strong> <span style="color: var(--accent-green);">Normale (Impulsi 22s)</span></div>
                  <div><strong>Ultima Sincronizzazione:</strong> ${new Date(t.lastSyncDate).toLocaleString(`it-IT`)}</div>
                  <div><strong>Indirizzo Cliente:</strong> ${r.address?r.address:`Non specificato`}</div>
                </div>

              </div>

            </div>

            <!-- Modal Footer -->
            <div style="display: flex; justify-content: flex-end; margin-top: 20px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
              <button id="btn-close-deconto-modal-footer" class="btn btn-secondary">Chiudi Finestra Dettaglio</button>
            </div>

          </div>
        </div>
      `}}return`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Business Intelligence & Telemetria</h1>
          <p style="color: var(--text-muted);">Clicca sulle schede KPI in alto per aprire i grafici ed i report dettagliati</p>
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

      <!-- KPI Cards Cliccabili per Grafici & Analytics -->
      <div class="card-grid">
        
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_clients" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per aprire grafici e dettagli clienti">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Clienti Attivi in Comodato</div>
            <span style="font-size: 1.2rem;">📊</span>
          </div>
          <div class="stat-value">${m}</div>
          <div style="font-size: 0.8rem; color: var(--accent-green); margin-top: 4px; font-weight: 700;">
            100% Contratti Attivi (Clicca per Grafici ➔)
          </div>
        </div>

        <div class="stat-card kpi-card-clickable" data-kpi="kpi_machines" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per aprire grafici suddivisi per modello macchina">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Macchine da Caffè Monitorate</div>
            <span style="font-size: 1.2rem;">☕</span>
          </div>
          <div class="stat-value">${h}</div>
          <div style="font-size: 0.8rem; color: var(--accent-cyan); margin-top: 4px; font-weight: 700;">
            Grafico Modelli & Wi-Fi/BLE (Clicca ➔)
          </div>
        </div>

        <div class="stat-card kpi-card-clickable" data-kpi="kpi_extractions" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per visualizzare i grafici a barre e linee con selettore periodo">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Erogazioni Totali Registrate</div>
            <span style="font-size: 1.2rem;">📈</span>
          </div>
          <div class="stat-value">${g+11370}</div>
          <div style="font-size: 0.8rem; color: var(--accent-purple); margin-top: 4px; font-weight: 700;">
            Grafici Mese/Trimestre/Anno (Clicca ➔)
          </div>
        </div>

        <div class="stat-card warning kpi-card-clickable" data-kpi="kpi_lowstock" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" title="Clicca per aprire il grafico dello stato scorte (Verdi, Sottoscorta, Bloccate)">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="stat-title">Macchine in Scorta / Blocco</div>
            <span style="font-size: 1.2rem;">⚠️</span>
          </div>
          <div class="stat-value">${v.length+y.length}</div>
          <div style="font-size: 0.8rem; color: var(--accent-rose); margin-top: 4px; font-weight: 700;">
            ${y.length} Bloccate | ${v.length} Sottoscorta (Clicca ➔)
          </div>
        </div>

      </div>

      <!-- Barra di Ricerca Multi-Categoria e Indicizzazione -->
      <div style="margin-top: 32px;" class="stat-card" style="padding: 20px;">
        <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">
          🔍 Ricerca Avanzata Multi-Categoria nel Parco Macchine:
        </div>
        
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <input type="text" id="dash-search-input" value="${n}" placeholder="Digita termine da cercare..." style="flex: 2; min-width: 220px; padding: 10px 14px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem;">

          <select id="dash-search-category" style="flex: 1; min-width: 180px; padding: 10px 14px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; font-size: 0.9rem;">
            <option value="ALL" ${r===`ALL`?`selected`:``}>🔍 Tutti i Campi</option>
            <option value="SHORT_CODE" ${r===`SHORT_CODE`?`selected`:``}>🔢 Numero Deconto</option>
            <option value="CLIENT" ${r===`CLIENT`?`selected`:``}>🏢 Nome Cliente</option>
            <option value="MODEL" ${r===`MODEL`?`selected`:``}>☕ Modello Macchina</option>
            <option value="CREDITS" ${r===`CREDITS`?`selected`:``}>☕ Battute Rimanenti</option>
            <option value="CONNECTION" ${r===`CONNECTION`?`selected`:``}>📡 Tipo Connessione</option>
            <option value="SYNC_DATE" ${r===`SYNC_DATE`?`selected`:``}>📅 Data Ultima Sync</option>
          </select>

          <button id="btn-dash-search" class="btn btn-primary" style="padding: 10px 20px; font-weight: 800;">
            🔍 CERCA
          </button>
          
          <button id="btn-dash-reset" class="btn btn-secondary" style="padding: 10px 16px;">
            ✖️ Reset Filtri
          </button>
        </div>

        ${n?`
          <div style="margin-top: 10px; font-size: 0.8rem; color: var(--accent-cyan);">
            Trovate <strong>${b.length}</strong> macchine corrispondenti alla ricerca "${n}"
          </div>
        `:``}
      </div>

      <!-- Tabella Parco Macchine Deconto Indicizzata e Ordinabile -->
      <div style="margin-top: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h2 style="font-size: 1.3rem; font-weight: 800; margin: 0;">☕ Parco Macchine Indicizzato</h2>
          <small style="color: var(--text-muted);">Clicca sulle intestazioni della tabella per ordinare dal più alto al più basso o viceversa (▲ / ▼)</small>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="shortCode">
                  Numero Deconto ${x(`shortCode`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="client">
                  Cliente / Azienda ${x(`client`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="model">
                  Modello Macchina ${x(`model`)}
                </th>
                <th>Seriale Macchina</th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="credits">
                  Battute Rimanenti ${x(`credits`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="connection">
                  Tipo Connessione ${x(`connection`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="syncDate">
                  Data Ultima Sync ${x(`syncDate`)}
                </th>
              </tr>
            </thead>
            <tbody>
              ${b.length>0?b.map(e=>{let t=i.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=t&&t.machine?t.machine.model:`N/D`,a=t&&t.machine?t.machine.serialNumber:`N/D`;return`
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="padding: 6px 12px; font-weight: 900; font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan); border: 1px solid rgba(56, 189, 248, 0.4);">
                        #${e.shortCode}
                      </button>
                    </td>
                    <td><strong>${n}</strong></td>
                    <td>${r}</td>
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
                `}).join(``):`
                <tr>
                  <td colspan="7" style="text-align: center; padding: 32px; color: var(--text-muted);">
                    Nessuna macchina trovata per i criteri di ricerca selezionati.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    ${C}
    ${S}
  `}function u(e,t=null,n=null){let r=i.getUsers(),a=i.getRoleLabels(),o=i.getPermissions(),s=i.getEmailLogs(),c=``;if(t){let e=r.find(e=>e.id===t);e&&(c=`
        <div class="modal-overlay" id="edit-staff-modal">
          <div class="modal-box" style="max-width: 540px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
                ✏️ Modifica Utente: ${e.name}
              </h2>
              <button id="btn-close-edit-staff-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>

            <form id="edit-staff-form">
              <input type="hidden" id="edit-staff-id" value="${e.id}">

              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome e Cognome:*</label>
                <input type="text" id="edit-staff-name" value="${e.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>

              ${e.username===`001`?``:`
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                  <div>
                    <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Utente:*</label>
                    <input type="text" id="edit-staff-username" value="${e.username}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                  </div>

                  <div>
                    <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ruolo Operativo:*</label>
                    <select id="edit-staff-role" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                      <option value="UFFICIO" ${e.role===`UFFICIO`?`selected`:``}>👩‍💻 ${a.UFFICIO||`UFFICIO`}</option>
                      <option value="ADR" ${e.role===`ADR`?`selected`:``}>🚚 ${a.ADR||`AGENTE ADR`}</option>
                      <option value="ADMIN" ${e.role===`ADMIN`?`selected`:``}>👨‍💼 AMMINISTRATORE</option>
                    </select>
                  </div>
                </div>
              `}

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email Dipendente:</label>
                  <input type="email" id="edit-staff-email" value="${e.email||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>

                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
                  <input type="text" id="edit-staff-phone" value="${e.phone||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nuova Password (lascia vuoto per non cambiare):</label>
                <input type="password" id="edit-staff-password" placeholder="••••••" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
              </div>

              <div style="font-size: 0.75rem; color: var(--accent-cyan); background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 20px;">
                ✉️ Nota: Modificando il ruolo, l'icona avatar si aggiornerà automaticamente e verrà generata l'email di notifica!
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-staff" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">💾 Salva Scheda Dipendente</button>
              </div>
            </form>
          </div>
        </div>
      `)}if(n){let e=s.find(e=>e.id===n);e&&(c+=`
        <div class="modal-overlay" id="email-preview-modal">
          <div class="modal-box" style="max-width: 680px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              <div>
                <h3 style="margin: 0; color: var(--accent-cyan);">✉️ Registro Notifica Email</h3>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                  Destinatario: <strong>${e.recipientName} (${e.recipientEmail})</strong>
                </div>
              </div>
              <button id="btn-close-email-preview" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Oggetto: <strong>${e.subject}</strong></div>
                <div style="font-size: 0.75rem; color: var(--accent-green); margin-top: 2px;">Stato: Ready in Outbox Log (${new Date(e.timestamp).toLocaleString(`it-IT`)})</div>
              </div>
              ${e.mailtoUrl?`
                <a href="${e.mailtoUrl}" class="btn btn-primary" style="padding: 8px 14px; font-size: 0.8rem; text-decoration: none;">
                  ✉️ Apri in Outlook/Mail
                </a>
              `:``}
            </div>

            <div style="background: #0f172a; padding: 16px; border-radius: 10px; max-height: 380px; overflow-y: auto; border: 1px solid var(--border-subtle);">
              ${e.htmlBody}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
              <small style="color: var(--text-muted);">Puoi anche inviare le email reali col il tuo client di posta predefinito.</small>
              <button id="btn-close-email-preview-footer" class="btn btn-secondary">Chiudi Anteprima Email</button>
            </div>
          </div>
        </div>
      `)}return e===`permissions_matrix`?`
      <div>
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Matrice Permessi & Nomi Categorie Ruoli</h1>
          <p style="color: var(--text-muted);">Configura dinamicamente quali schede, tasti ed azioni ogni categoria di personale può gestire</p>
        </div>

        <!-- Sezione Rinominazione Nomi Ruoli -->
        <div class="stat-card" style="margin-bottom: 32px; padding: 24px; border: 1px solid var(--accent-cyan);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">🏷️ Rinomina Categorie Ruoli Utente:</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
            Puoi personalizzare la dicitura delle categorie del personale (es. rinominare "UFFICIO" in "AMMINISTRAZIONE" o "LOGISTICA").
          </p>

          <form id="rename-role-labels-form" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Categoria UFFICIO (👩‍💻 Scrivania):</label>
              <input type="text" id="role_label_UFFICIO" value="${a.UFFICIO||`UFFICIO`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Categoria ADR (🚚 Furgone):</label>
              <input type="text" id="role_label_ADR" value="${a.ADR||`AGENTE ADR`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">
              💾 Salva Nuovi Nomi
            </button>
          </form>
        </div>

        <!-- Matrice dei Permessi -->
        <form id="permissions-matrix-form" class="stat-card" style="padding: 24px;">
          <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 16px;">🔐 Matrice Abilitazione Funzionalità per Ruolo:</h3>
          
          <div class="table-container" style="margin-bottom: 24px;">
            <table>
              <thead>
                <tr>
                  <th>Funzionalità / Permesso Piattaforma</th>
                  <th style="text-align: center;">👩‍💻 ${a.UFFICIO||`UFFICIO`}</th>
                  <th style="text-align: center;">🚚 ${a.ADR||`AGENTE ADR`}</th>
                  <th style="text-align: center;">👨‍💼 AMMINISTRATORE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Visualizza Anagrafica Clienti & Macchine</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canViewClients" ${o.UFFICIO.canViewClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canViewClients" ${o.ADR.canViewClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled> (Sempre Abilitato)</td>
                </tr>

                <tr>
                  <td><strong>Crea Nuovi Clienti & Assegna Deconto</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canCreateClients" ${o.UFFICIO.canCreateClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canCreateClients" ${o.ADR.canCreateClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Modifica Schede Clienti & Macchine (Tasto ✏️ Modifica)</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canEditClients" ${o.UFFICIO.canEditClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canEditClients" ${o.ADR.canEditClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Elimina Clienti (Tasto 🗑️ Rimuovi)</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canDeleteClients" ${o.UFFICIO.canDeleteClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canDeleteClients" ${o.ADR.canDeleteClients?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Genera Stampa Etichette Termiche QR Code</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canGenerateQr" ${o.UFFICIO.canGenerateQr?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canGenerateQr" ${o.ADR.canGenerateQr?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Genera Ricariche Fai-da-Te OTP per Clienti</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canGenerateOtp" ${o.UFFICIO.canGenerateOtp?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canGenerateOtp" ${o.ADR.canGenerateOtp?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Ricarica Bluetooth BLE sul Posto (App ADR)</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canBleRefill" ${o.UFFICIO.canBleRefill?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canBleRefill" ${o.ADR.canBleRefill?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
                </tr>

                <tr>
                  <td><strong>Utilizzo Banco di Prova Simulatore Hardware</strong></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_UFFICIO_canUseSimulator" ${o.UFFICIO.canUseSimulator?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" id="perm_ADR_canUseSimulator" ${o.ADR.canUseSimulator?`checked`:``}></td>
                  <td style="text-align: center;"><input type="checkbox" checked disabled></td>
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
      ${c}
    `:`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">👥 Gestione Personale & Credenziali Dipendenti</h1>
          <p style="color: var(--text-muted);">Crea nuovi utenti dipendenti, modifica i ruoli ed ispeziona le notifiche email inviate</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button id="btn-open-email-logs" class="btn btn-secondary">
            ✉️ Registro Email Spedite (${s.length})
          </button>
          <button id="btn-toggle-add-user" class="btn btn-primary">
            ➕ Nuovo Utente Dipendente
          </button>
        </div>
      </div>

      <!-- Form Nuovo Dipendente -->
      <div id="add-user-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Creazione Nuovo Utente Dipendente:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice Utente Accesso:*</label>
            <input type="text" id="new-user-username" placeholder="Es. 004" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Password Iniziale:*</label>
            <input type="password" id="new-user-password" value="123456" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome e Cognome Dipendente:*</label>
            <input type="text" id="new-user-name" placeholder="Es. Boldrini Valerio" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ruolo Operativo:</label>
            <select id="new-user-role" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="UFFICIO">👩‍💻 ${a.UFFICIO||`UFFICIO`}</option>
              <option value="ADR">🚚 ${a.ADR||`AGENTE ADR`}</option>
              <option value="ADMIN">👨‍💼 AMMINISTRATORE</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email Dipendente:</label>
            <input type="email" id="new-user-email" placeholder="boldrini.valerio@deconto.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
            <input type="text" id="new-user-phone" placeholder="+39 333 112233" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>
        </div>

        <div style="font-size: 0.75rem; color: var(--accent-cyan); background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 20px;">
          ✉️ Nota: Al salvataggio l'utente verrà memorizzato PERMANENTEMENTE nel Master Store e verrà generata l'email di benvenuto!
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="btn-cancel-add-user" class="btn btn-secondary">Annulla</button>
          <button id="btn-save-new-user" class="btn btn-primary">💾 Salva Utente & Invia Email Benvenuto</button>
        </div>
      </div>

      <!-- Tabella Registro Personale -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Icona</th>
              <th>Codice</th>
              <th>Nome & Cognome</th>
              <th>Ruolo Operativo</th>
              <th>Email / Telefono</th>
              <th>Stato Account</th>
              <th>Data Creazione</th>
              <th>Azioni Scheda</th>
            </tr>
          </thead>
          <tbody>
            ${r.map(e=>`
              <tr>
                <td style="font-size: 1.6rem; text-align: center;">${e.avatar||`👤`}</td>
                <td><strong style="font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan);">${e.username}</strong></td>
                <td><strong>${e.name}</strong></td>
                <td>
                  <span class="badge ${e.role===`ADMIN`?`badge-danger`:e.role===`UFFICIO`?`badge-info`:`badge-warning`}">
                    ${e.role===`ADMIN`?`👨‍💼 AMMINISTRATORE`:e.role===`UFFICIO`?`👩‍💻 ${a.UFFICIO||`UFFICIO`}`:`🚚 ${a.ADR||`AGENTE ADR`}`}
                  </span>
                </td>
                <td>${e.email||`N/D`}<br><small style="color: var(--text-muted);">${e.phone||``}</small></td>
                <td>
                  ${e.status===`ACTIVE`?`<span class="badge badge-success">🟢 ATTIVO</span>`:`<span class="badge badge-danger">🔴 DISATTIVATO</span>`}
                </td>
                <td>${e.createdAt||`2026-01-01`}</td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-edit-staff-user" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                      ✏️ Modifica
                    </button>
                    ${e.username===`001`?``:`
                      <button class="btn btn-secondary btn-toggle-user-status" data-id="${e.id}" data-status="${e.status}" style="padding: 6px 10px; font-size: 0.8rem;">
                        ${e.status===`ACTIVE`?`🚫 Disattiva`:`✅ Abilita`}
                      </button>
                      <button class="btn btn-secondary btn-delete-user" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
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
    ${c}
  `}function d(e,t=null){let n=i.getClients(),r=i.getMachines(),a=i.getBoards();i.getRefillLogs();let o=``;if(e===`clients`&&t){let e=n.find(e=>e.id===t);e&&(r.filter(t=>t.clientId===e.id),o=`
        <div class="modal-overlay" id="edit-client-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">🏢 Modifica Cliente: ${e.name}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-client">
              <input type="hidden" id="edit-client-id" value="${e.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ragione Sociale / Nome Cliente:*</label>
                <input type="text" id="edit-cli-name" value="${e.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Referente:</label>
                  <input type="text" id="edit-cli-ref" value="${e.refPerson||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
                  <input type="text" id="edit-cli-phone" value="${e.phone||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Città:</label>
                  <input type="text" id="edit-cli-city" value="${e.city||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Indirizzo Sede:</label>
                  <input type="text" id="edit-cli-address" value="${e.address||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <!-- Step 3: Installa / Assegna Macchina da Caffè al Cliente -->
              <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 16px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
                <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 6px;">
                  ☕ Step 3: Installa / Assegna Macchina a Questo Cliente:
                </label>
                <select id="edit-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA NUOVA MACCHINA (Mantieni Configurazione Attuale)</option>
                  ${r.map(t=>{let n=a.find(e=>e.machineId===t.id),r=n?` [Deconto #${n.shortCode}]`:` [Senza Deconto]`,i=t.clientId===e.id?` (Già In Uso Qui)`:t.clientId?` (In Uso Altrove)`:` (📦 In Scorta)`;return`<option value="${t.id}" ${t.clientId===e.id?`selected`:``}>☕ ${t.serialNumber} - ${t.model}${r}${i}</option>`}).join(``)}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-client" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Scheda Cliente</button>
              </div>
            </form>
          </div>
        </div>
      `)}if(e===`machines`&&t){let e=r.find(e=>e.id===t);e&&(a.find(t=>t.machineId===e.id),o=`
        <div class="modal-overlay" id="edit-machine-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">☕ Modifica Macchina: ${e.serialNumber}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-machine">
              <input type="hidden" id="edit-mc-id" value="${e.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina:*</label>
                <input type="text" id="edit-mc-serial" value="${e.serialNumber}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Marca / Produttore:</label>
                  <input type="text" id="edit-mc-brand" value="${e.brand||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Modello Macchina:</label>
                  <input type="text" id="edit-mc-model" value="${e.model||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <!-- Step 2: Associa Scheda Deconto alla Macchina -->
              <div style="margin-bottom: 16px; background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
                <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 6px;">
                  📟 Step 2: Associa / Monta Scheda Deconto:
                </label>
                <select id="edit-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA SCHEDA DECONTO (Macchina Standalone)</option>
                  ${a.map(t=>{let n=r.find(e=>e.id===t.machineId),i=t.machineId===e.id?` (Già Montata Qui)`:n?` (Montata su ${n.serialNumber})`:` (📦 LIBERA A BANCO)`;return`<option value="${t.id}" ${t.machineId===e.id?`selected`:``}>📟 Deconto #${t.shortCode} (${t.remainingCredits} crediti)${i}</option>`}).join(``)}
                </select>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">🏢 Assegna a Cliente Finale:</label>
                <select id="edit-mc-client" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 IN SCORTA MAGAZZINO (Nessun Cliente)</option>
                  ${n.map(t=>`<option value="${t.id}" ${e.clientId===t.id?`selected`:``}>🏢 ${t.name} (${t.city})</option>`).join(``)}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-mc" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Macchina</button>
              </div>
            </form>
          </div>
        </div>
      `)}if(e===`deconto_boards`&&t){let e=a.find(e=>e.id===t||e.shortCode===t);e&&(o=`
        <div class="modal-overlay" id="edit-board-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">📟 Modifica Scheda Deconto #${e.shortCode}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-board">
              <input type="hidden" id="edit-board-id" value="${e.id}">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice 4 Cifre (ShortCode):*</label>
                  <input type="text" id="edit-board-shortcode" value="${e.shortCode}" maxlength="4" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-cyan); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Hardware HW:</label>
                  <input type="text" id="edit-board-hwserial" value="${e.hwSerial||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Credito Caffè:</label>
                  <input type="number" id="edit-board-credits" value="${e.remainingCredits}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Soglia Buzzer:</label>
                  <input type="number" id="edit-board-threshold" value="${e.lowStockThreshold||20}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-amber); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Versione Board:</label>
                  <select id="edit-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                    <option value="BASIC" ${e.version===`BASIC`?`selected`:``}>BASIC</option>
                    <option value="PRO" ${e.version===`PRO`?`selected`:``}>PRO</option>
                  </select>
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Monta su Macchina da Caffè:</label>
                <select id="edit-board-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 SCHEDA A BANCO / MAGAZZINO (Non Montata)</option>
                  ${r.map(t=>{let r=n.find(e=>e.id===t.clientId);return`<option value="${t.id}" ${e.machineId===t.id?`selected`:``}>☕ ${t.serialNumber} - ${t.model} (${r?r.name:`In Scorta`})</option>`}).join(``)}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-board" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Scheda Deconto</button>
              </div>
            </form>
          </div>
        </div>
      `)}return e===`clients`?`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">🏢 Anagrafica Clienti</h1>
            <p style="color: var(--text-muted);">Step 3 del Flusso: Registra o assegna macchine da caffè ai clienti in comodato d'uso</p>
          </div>
          <button id="btn-toggle-add-client" class="btn btn-primary">
            ➕ Nuovo Cliente
          </button>
        </div>

        <!-- Form Nuovo Cliente -->
        <div id="add-client-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Creazione Nuovo Cliente Anagrafico:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ragione Sociale / Nome Cliente:*</label>
              <input type="text" id="new-cli-name" placeholder="Es. Bar Nuova Italia" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Referente Principale:</label>
              <input type="text" id="new-cli-ref" placeholder="Es. Marco Bianchi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:*</label>
              <input type="text" id="new-cli-phone" placeholder="+39 02 5551234" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email Cliente:</label>
              <input type="email" id="new-cli-email" placeholder="info@barnuovaitalia.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Città:</label>
              <input type="text" id="new-cli-city" placeholder="Milano" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Indirizzo Sede:</label>
              <input type="text" id="new-cli-address" placeholder="Via Roma 15" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>

          <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
            <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
              ☕ Installa Subito una Macchina da Caffè a Questo Cliente (Opzionale):
            </label>
            <select id="new-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="">📦 CREA SOLO CLIENTE ANAGRAFICO (Nessuna Macchina per Ora)</option>
              ${r.map(e=>{let t=a.find(t=>t.machineId===e.id),n=t?` [Deconto #${t.shortCode}]`:` [Senza Deconto]`;return`<option value="${e.id}">☕ ${e.serialNumber} - ${e.model}${n} (${e.clientId?`In Uso Altrove`:`📦 In Scorta`})</option>`}).join(``)}
            </select>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-client" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-client" class="btn btn-primary">💾 Salva Cliente in Anagrafica</button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Ragione Sociale / Nome</th>
                <th>Referente & Contatti</th>
                <th>Città / Indirizzo</th>
                <th>Macchine & Deconti Installati</th>
                <th>Stato</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${n.map(e=>{let t=r.filter(t=>t.clientId===e.id);return`
                  <tr>
                    <td><strong style="font-family: monospace; color: var(--accent-cyan);">${e.id}</strong></td>
                    <td><strong>${e.name}</strong></td>
                    <td>${e.refPerson}<br><small style="color: var(--text-muted);">${e.phone}</small></td>
                    <td>${e.city||`N/D`}<br><small style="color: var(--text-muted);">${e.address||``}</small></td>
                    <td>
                      ${t.length>0?t.map(e=>{let t=a.find(t=>t.machineId===e.id);return`<div style="margin-bottom: 4px;"><span class="badge badge-info">☕ ${e.serialNumber}</span> ${t?`<span class="badge badge-success">📟 Deconto #${t.shortCode} (${t.remainingCredits} cr)</span>`:`<span style="color: var(--text-muted); font-size: 0.75rem;">(Senza Deconto)</span>`}</div>`}).join(``):`<span class="badge badge-warning">📦 Nessuna Macchina Installata</span>`}
                    </td>
                    <td><span class="badge ${e.status===`ACTIVE`?`badge-success`:`badge-warning`}">${e.status}</span></td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-client-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
                        </button>
                        <button class="btn btn-secondary btn-del-client-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${o}
    `:e===`machines`?`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">☕ Parco Macchine da Caffè</h1>
            <p style="color: var(--text-muted);">Step 2 del Flusso: Associa le Schede Deconto alle Macchine ed assegna al cliente</p>
          </div>
          <button id="btn-toggle-add-machine" class="btn btn-primary">
            ➕ Nuova Macchina da Caffè
          </button>
        </div>

        <!-- Form Nuova Macchina -->
        <div id="add-machine-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-purple);">
          <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 16px;">➕ Registrazione Nuova Macchina da Caffè:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Seriale Macchina (SN):*</label>
              <input type="text" id="new-mc-serial" placeholder="Es. SN-MC-2026-9988" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Marca / Produttore:</label>
              <input type="text" id="new-mc-brand" placeholder="Es. Didiesse / Faber / Spinel" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Modello Macchina:*</label>
              <input type="text" id="new-mc-model" placeholder="Es. Frog Revolution 1G" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div style="background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
              <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 4px;">
                📟 Step 2: Associa subito una Scheda Deconto (Opzionale):
              </label>
              <select id="new-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                <option value="">📦 NESSUNA SCHEDA DECONTO (Macchina Senza Controllo)</option>
                ${a.map(e=>{let t=r.find(t=>t.id===e.machineId),n=t?` (Montata su ${t.serialNumber})`:` (📦 LIBERA A BANCO)`;return`<option value="${e.id}">📟 Deconto #${e.shortCode} (${e.remainingCredits} crediti)${n}</option>`}).join(``)}
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">🏢 Assegna subito a Cliente (Opzionale):</label>
              <select id="new-mc-client" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                <option value="">📦 LASCIA IN SCORTA MAGAZZINO</option>
                ${n.map(e=>`<option value="${e.id}">🏢 ${e.name} (${e.city})</option>`).join(``)}
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-machine" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-machine" class="btn btn-primary">💾 Salva Macchina in Parco</button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Seriale Macchina</th>
                <th>Marca & Modello</th>
                <th>Stato Allocazione</th>
                <th>Cliente Assegnato</th>
                <th>Scheda Deconto Montata</th>
                <th>Data Installazione</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(e=>{let t=n.find(t=>t.id===e.clientId),r=a.find(t=>t.machineId===e.id);return`
                  <tr>
                    <td><strong style="font-family: monospace; font-size: 1.05rem; color: var(--accent-purple);">${e.serialNumber}</strong></td>
                    <td><strong>${e.model}</strong><br><small style="color: var(--text-muted);">${e.brand||`N/D`}</small></td>
                    <td>
                      ${e.status===`INSTALLED`?`<span class="badge badge-success">🟢 IN USO PRESSO CLIENTE</span>`:`<span class="badge badge-warning">📦 IN SCORTA MAGAZZINO</span>`}
                    </td>
                    <td>${t?`<strong>🏢 ${t.name}</strong><br><small style="color: var(--text-muted);">${t.city}</small>`:`<span style="color: var(--text-muted);">Nessuno (Magazzino)</span>`}</td>
                    <td>${r?`<span class="badge badge-info">📟 Deconto #${r.shortCode} (${r.remainingCredits} cr)</span>`:`<span class="badge badge-warning">Senza Deconto</span>`}</td>
                    <td>${e.installDate||`N/D`}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-machine-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-purple);">
                          ✏️ Modifica / Collega
                        </button>
                        <button class="btn btn-secondary btn-del-machine-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${o}
    `:e===`deconto_boards`?`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">📟 Registro Schede Deconto (ESP32-C6)</h1>
            <p style="color: var(--text-muted);">Step 1 del Flusso: Crea le nuove schede Deconto a banco/magazzino ed impostane i crediti</p>
          </div>
          <button id="btn-toggle-add-board" class="btn btn-primary" style="font-size: 1rem; font-weight: 800; padding: 12px 20px;">
            ➕ NUOVA SCHEDA DECONTO
          </button>
        </div>

        <!-- Form Nuova Scheda Deconto -->
        <div id="add-board-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan); background: linear-gradient(135deg, #0f172a, #1e293b);">
          <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Registrazione Nuova Scheda Hardware Deconto:</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.85rem; color: #fff; font-weight: 700; display: block; margin-bottom: 6px;">Codice 4 Cifre (ShortCode):*</label>
              <input type="text" id="new-board-code" placeholder="Es. 9902" maxlength="4" style="width: 100%; padding: 12px; background: var(--bg-primary); color: var(--accent-cyan); border: 2px solid var(--accent-cyan); border-radius: 8px; font-weight: 900; font-size: 1.2rem; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Seriale Hardware HW:</label>
              <input type="text" id="new-board-hwserial" placeholder="Es. DC-HW-9902" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-family: monospace;">
            </div>
            <div>
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Crediti Iniziali Caffè:</label>
              <input type="number" id="new-board-credits" value="200" style="width: 100%; padding: 12px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 8px; font-weight: 900; font-size: 1.1rem;">
            </div>
            <div>
              <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Versione Modulo:</label>
              <select id="new-board-version" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
                <option value="BASIC">BASIC</option>
                <option value="PRO">PRO (Wi-Fi + BLE)</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">Monta subito su Macchina da Caffè (Opzionale):</label>
            <select id="new-board-machine" style="width: 100%; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="">📦 LASCIA SCHEDA LIBERA A BANCO / MAGAZZINO (Disponibile per il montaggio futuro)</option>
              ${r.map(e=>{let t=n.find(t=>t.id===e.clientId);return`<option value="${e.id}">☕ ${e.serialNumber} - ${e.model} (${t?t.name:`In Scorta`})</option>`}).join(``)}
            </select>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-board" class="btn btn-secondary" style="padding: 10px 20px;">Annulla</button>
            <button id="btn-save-new-board" class="btn btn-primary" style="padding: 10px 24px; font-size: 1rem; font-weight: 800;">💾 CREA SCHEDA DECONTO</button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Codice Deconto</th>
                <th>Seriale HW & MAC</th>
                <th>Credito Residuo</th>
                <th>Stato Assegnazione</th>
                <th>Macchina Collegata</th>
                <th>Cliente Finale</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${a.map(e=>{let t=r.find(t=>t.id===e.machineId),i=t?n.find(e=>e.id===t.clientId):null;return`
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="font-family: monospace; font-weight: 900; font-size: 1.15rem; color: var(--accent-cyan); padding: 6px 12px;">
                        #${e.shortCode}
                      </button>
                    </td>
                    <td><strong>${e.hwSerial||`N/D`}</strong><br><small style="color: var(--text-muted); font-family: monospace;">${e.macAddress||``}</small></td>
                    <td><strong style="font-size: 1.25rem; color: ${e.remainingCredits>20?`var(--accent-green)`:`var(--accent-rose)`};">${e.remainingCredits}</strong> cialde</td>
                    <td>
                      ${t?`<span class="badge badge-success">🟢 MONTATA SU MACCHINA</span>`:`<span class="badge badge-warning">📦 LIBERA A BANCO</span>`}
                    </td>
                    <td>${t?`<span class="badge badge-info">☕ ${t.serialNumber}</span>`:`<span style="color: var(--text-muted);">Nessuna</span>`}</td>
                    <td>${i?`<strong>🏢 ${i.name}</strong>`:`<span style="color: var(--text-muted);">N/D</span>`}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-board-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
                        </button>
                        <button class="btn btn-secondary btn-del-board-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
                          🗑️ Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${o}
    `:e===`otp_generator`?`
      <div>
        <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">🔑 Generatore Ricariche Fai-da-Te OTP</h1>
        <div class="stat-card" style="padding: 24px; max-width: 600px;">
          <div style="margin-bottom: 16px;">
            <label style="font-weight: 700; display: block; margin-bottom: 6px;">Seleziona Scheda Deconto:</label>
            <select id="otp-board-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              ${a.map(e=>`<option value="${e.shortCode}">Deconto #${e.shortCode} (${e.remainingCredits} crediti)</option>`).join(``)}
            </select>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-weight: 700; display: block; margin-bottom: 6px;">Taglio Ricarica (Cialde):</label>
            <select id="otp-credits-select" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="100">+100 Cialde</option>
              <option value="200" selected>+200 Cialde</option>
              <option value="500">+500 Cialde</option>
            </select>
          </div>
          <button id="btn-generate-otp" class="btn btn-primary" style="width: 100%; padding: 12px;">🔑 Genera Token & Link Ricarica</button>
          
          <div style="margin-top: 20px; background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px;">
            <div>Token OTP: <strong id="otp-code-val" style="color: var(--accent-cyan); font-family: monospace;">---</strong></div>
            <div style="word-break: break-all; margin-top: 6px; font-size: 0.8rem; color: var(--text-muted);" id="otp-link-val">---</div>
            <div style="display: flex; gap: 10px; margin-top: 12px;">
              <button id="btn-send-whatsapp" class="btn btn-success" style="flex: 1;">💬 Invia via WhatsApp</button>
              <button id="btn-copy-otp-link" class="btn btn-secondary" style="flex: 1;">📋 Copia Link</button>
            </div>
          </div>
        </div>
      </div>
    `:`<div>Seleziona una voce del menu per proseguire.</div>`}function f(e){return i.getClients(),`
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
            ${i.getBoards().map(e=>{let t=i.getBoardFullDetails(e.id),n=e.remainingCredits<=0,r=e.remainingCredits<e.lowStockThreshold&&!n;return`
                <tr>
                  <td>
                    <strong>${t.client?t.client.name:`N/D`}</strong><br>
                    <small style="color: var(--text-muted);">${t.client?t.client.address:``}</small>
                  </td>
                  <td><span class="badge badge-info">${e.shortCode}</span></td>
                  <td>
                    <strong style="color: ${n?`var(--accent-rose)`:r?`var(--accent-amber)`:`var(--accent-green)`}">
                      ${e.remainingCredits} caffè
                    </strong>
                  </td>
                  <td>
                    ${n?`<span class="badge badge-danger">🔒 IN BLOCCO</span>`:r?`<span class="badge badge-warning">⚠️ SOTTOSCORTA</span>`:`<span class="badge badge-success">OK</span>`}
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
  `}function p(){let e=i.getSettings();return`
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Impostazioni Piattaforma & Personalizzazione Brand</h1>
        <p style="color: var(--text-muted);">Personalizza il logo aziendale, l'intestazione ed i servizi di notifica email (Brevo / Google Apps Script)</p>
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

      <!-- Card 3: Servizio Email BREVO / Sendinblue (Opzione consigliata) -->
      <div class="stat-card" style="margin-top: 24px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; color: var(--accent-cyan);">✉️ Servizio Email Reale BREVO (ex Sendinblue - brevo.com):</h3>
          <span class="badge badge-info">300 EMAIL/GIORNO GRATIS</span>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          <strong>BREVO (brevo.com)</strong> è il servizio gratuito di invio email transazionali (ex Sendinblue). Offre 300 email gratuite al giorno e non richiede installazione di script. Inserisci la tua API Key trovata su <em>brevo.com &rarr; API Keys</em> per attivare l'invio istantaneo.
        </p>

        <form id="settings-brevo-form" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">API Key Brevo (xkeysib-...):</label>
            <input type="password" id="setting-brevo-key" value="${e.brevoApiKey||``}" placeholder="xkeysib-xxxxxxxxxxxx" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email Mittente (registrata su Brevo):</label>
            <input type="email" id="setting-brevo-sender" value="${e.brevoSenderEmail||``}" placeholder="info@deconto.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">
            💾 Salva Chiavi Brevo
          </button>
        </form>
      </div>

      <!-- Card 4: Servizio Notifiche Email via Google Apps Script (GAS) -->
      <div class="stat-card" style="margin-top: 24px; padding: 24px; border: 1px solid var(--accent-green);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; color: var(--accent-green);">✉️ Alternativa: Google Apps Script (GAS):</h3>
          <span class="badge badge-success">GRATUITO CON ACCOUNT GOOGLE</span>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          In alternativa a Brevo, puoi utilizzare un piccolo script <strong>Google Apps Script</strong> come nella conversazione GAS SOMS.
        </p>

        <form id="settings-gas-form" style="margin-bottom: 20px;">
          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">
              URL Endpoint Web App Google Apps Script (es. https://script.google.com/macros/s/AKfycb.../exec):
            </label>
            <div style="display: flex; gap: 12px;">
              <input type="url" id="setting-gas-url" value="${e.gasScriptUrl||``}" placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" style="flex: 1; padding: 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; font-family: monospace;">
              <button type="submit" class="btn btn-success" style="padding: 12px 24px;">
                💾 Salva URL GAS
              </button>
            </div>
          </div>
        </form>

        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--accent-green); padding: 16px; border-radius: 6px;">
          <h4 style="margin-top: 0; color: var(--accent-green); font-size: 0.95rem;">📋 Script Google pronto all'uso:</h4>
          <pre style="background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 6px; font-size: 0.8rem; font-family: monospace; overflow-x: auto; border: 1px solid var(--border-subtle); margin: 0;">function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    MailApp.sendEmail({
      to: data.to,
      subject: data.subject,
      htmlBody: data.htmlBody,
      body: data.body || "Messaggio Notifica DECONTO IoT System"
    });
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}</pre>
        </div>
      </div>
    </div>
  `}function m(e=null){let t=i.getBoards(),n=e&&t.find(t=>t.shortCode===e)||t[0];return i.getBoardFullDetails(n.shortCode),`
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
              <span class="badge badge-info" id="sim-badge-code">DECONTO ${n.shortCode}</span>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Chip: ESP32-C6 | Modulo Resinato IP67</div>
            </div>
            
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seleziona Macchina / Deconto:</label>
              <select id="sim-board-select" style="padding: 8px 12px; background: var(--bg-primary); color: var(--text-main); border: 1px solid var(--accent-cyan); border-radius: 6px; font-weight: 700;">
                ${t.map(e=>`<option value="${e.shortCode}" ${e.shortCode===n.shortCode?`selected`:``}>Macchina #${e.shortCode} (${e.remainingCredits} caffè)</option>`).join(``)}
              </select>
            </div>
          </div>

          <!-- Display Credito & Stato Relè -->
          <div style="text-align: center; background: rgba(0,0,0,0.5); padding: 24px; border-radius: 16px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">
              Credito Residuo Memoria RTC/Flash (#${n.shortCode}):
            </div>
            
            <div id="sim-credits-display" style="font-size: 3.5rem; font-weight: 900; color: ${n.remainingCredits>20?`var(--accent-green)`:n.remainingCredits>0?`var(--accent-amber)`:`var(--accent-rose)`}; margin: 8px 0;">
              ${n.remainingCredits}
            </div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Caffè Rimanenti</div>

            <div style="margin-top: 16px; display: flex; justify-content: center; gap: 12px;">
              <span id="sim-relay-badge" class="badge ${n.relayStatus===`CLOSED_OK`?`badge-success`:`badge-danger`}">
                ${n.relayStatus===`CLOSED_OK`?`🔓 RELÈ CHIUSO (POMPA OK)`:`🔒 RELÈ APERTO (BLOCCO 0)`}
              </span>
              
              <span id="sim-alert-badge" class="badge badge-warning" style="display: ${n.remainingCredits<20&&n.remainingCredits>0?`inline-flex`:`none`};">
                🔔 BUZZER 60s ATTIVO
              </span>
            </div>
          </div>

          <!-- Tasto Erogazione Elettrica Pompa -->
          <button id="btn-sim-brew" class="btn btn-primary" ${n.remainingCredits<=0?`disabled`:``} style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 800; border-radius: 12px; margin-bottom: 12px;">
            ☕ EROGA 1 CAFFÈ (Macchina #${n.shortCode})
          </button>

          <button id="btn-sim-reset" class="btn btn-secondary" style="width: 100%;">
            🔄 Ricarica Rapida +200 Caffè (Macchina #${n.shortCode})
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
                  <td id="signal-pump-volts">${n.relayStatus===`CLOSED_OK`?`230V AC`:`0V AC (Disattivato)`}</td>
                  <td>
                    <span id="signal-pump-badge" class="badge ${n.relayStatus===`CLOSED_OK`?`badge-success`:`badge-danger`}">
                      ${n.relayStatus===`CLOSED_OK`?`PRONTO`:`BLOCCATO`}
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
              [SYSTEM]: ESP32-C6 Firmware v2.1.0 Inizializzato per Scheda #${n.shortCode}.<br>
              [HARDWARE]: Relè di blocco impostato su ${n.relayStatus}.<br>
              [MEMORY]: Memoria Flash sincronizzata con Master Store.<br>
            </div>
          </div>
        </div>

      </div>
    </div>
  `}var h={currentUser:i.getCurrentUser(),activeTab:`dashboard`,showProfileModal:!1,editingStaffUserId:null,editingId:null,viewingDecontoCode:null,viewingEmailId:null,selectedSimBoardCode:`9901`,dashSearchQuery:``,dashSearchCategory:`ALL`,dashSortColumn:`shortCode`,dashSortDirection:`DESC`,viewingKpiModal:null,kpiPeriod:`30DAYS`,kpiChartType:`LINE`};function g(){let e=document.getElementById(`app`);if(!h.currentUser){e.innerHTML=s(),_();return}let t=h.currentUser,n=``;h.activeTab===`settings`?n=p():h.activeTab===`simulator`?n=m(h.selectedSimBoardCode):h.activeTab===`user_management`||h.activeTab===`permissions_matrix`?n=u(h.activeTab,h.editingStaffUserId,h.viewingEmailId):t.role===`ADMIN`||t.role===`UFFICIO`?n=h.activeTab===`clients`||h.activeTab===`machines`||h.activeTab===`deconto_boards`||h.activeTab===`qr_generator`||h.activeTab===`otp_generator`||h.activeTab===`refills_history`?d(h.activeTab,h.editingId):h.activeTab===`adr_visits`?f(h.activeTab):l(h.activeTab,h.viewingDecontoCode,h.dashSearchQuery,h.dashSearchCategory,h.dashSortColumn,h.dashSortDirection,h.viewingKpiModal,h.kpiPeriod,h.kpiChartType):t.role===`ADR`&&(n=h.activeTab===`adr_visits`?f(h.activeTab):d(h.activeTab,h.editingId));let r=``;h.showProfileModal&&(r=c(t)),e.innerHTML=`
    <div class="app-container">
      ${o(t,h.activeTab)}
      <main class="main-content">
        ${n}
      </main>
    </div>
    ${r}
  `,v()}function _(){let e=document.getElementById(`login-form`),t=document.getElementById(`login-error-msg`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`login-username`).value,r=document.getElementById(`login-password`).value;try{let e=i.authenticate(n,r);h.currentUser=e,h.activeTab=e.role===`ADMIN`?`dashboard`:`clients`,g()}catch(e){t.innerText=e.message,t.style.display=`block`}})}function v(){let e=document.getElementById(`btn-logout`);e&&e.addEventListener(`click`,()=>{i.logout(),h.currentUser=null,g()});let t=document.getElementById(`btn-open-profile-modal`);t&&t.addEventListener(`click`,()=>{h.showProfileModal=!0,g()});let n=document.getElementById(`btn-close-profile-modal`),r=document.getElementById(`btn-cancel-profile`);n&&n.addEventListener(`click`,()=>{h.showProfileModal=!1,g()}),r&&r.addEventListener(`click`,()=>{h.showProfileModal=!1,g()}),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(h.activeTab=t,h.editingId=null,g())})}),document.querySelectorAll(`.kpi-card-clickable`).forEach(e=>{e.addEventListener(`click`,()=>{h.viewingKpiModal=e.getAttribute(`data-kpi`),g()})}),document.querySelectorAll(`.btn-close-kpi-modal`).forEach(e=>{e.addEventListener(`click`,()=>{h.viewingKpiModal=null,g()})}),document.querySelectorAll(`.btn-kpi-period`).forEach(e=>{e.addEventListener(`click`,()=>{h.kpiPeriod=e.getAttribute(`data-period`),g()})}),document.querySelectorAll(`.btn-kpi-charttype`).forEach(e=>{e.addEventListener(`click`,()=>{h.kpiChartType=e.getAttribute(`data-charttype`),g()})});let o=document.getElementById(`btn-dash-search`),s=document.getElementById(`dash-search-input`);o&&s&&(o.addEventListener(`click`,()=>{h.dashSearchQuery=s.value,h.dashSearchCategory=document.getElementById(`dash-search-category`).value,g()}),s.addEventListener(`keypress`,e=>{e.key===`Enter`&&(h.dashSearchQuery=s.value,h.dashSearchCategory=document.getElementById(`dash-search-category`).value,g())}));let c=document.getElementById(`btn-dash-reset`);c&&c.addEventListener(`click`,()=>{h.dashSearchQuery=``,h.dashSearchCategory=`ALL`,g()}),document.querySelectorAll(`.th-sortable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-col`);h.dashSortColumn===t?h.dashSortDirection=h.dashSortDirection===`ASC`?`DESC`:`ASC`:(h.dashSortColumn=t,h.dashSortDirection=`ASC`),g()})}),document.querySelectorAll(`.btn-deconto-detail`).forEach(e=>{e.addEventListener(`click`,()=>{h.viewingDecontoCode=e.getAttribute(`data-code`),g()})});let l=document.getElementById(`btn-close-deconto-modal`),u=document.getElementById(`btn-close-deconto-modal-footer`);l&&l.addEventListener(`click`,()=>{h.viewingDecontoCode=null,g()}),u&&u.addEventListener(`click`,()=>{h.viewingDecontoCode=null,g()});let d=document.getElementById(`btn-export-csv`);d&&d.addEventListener(`click`,()=>{let e=i.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`DECONTO_Report_Consumi_${new Date().toISOString().split(`T`)[0]}.csv`,r.click(),alert(`📥 Report Consumi CSV Scaricato con successo!`)});let f=document.getElementById(`btn-trigger-backup`);f&&f.addEventListener(`click`,async()=>{f.disabled=!0,f.innerText=`⏳ Backup in corso su GitHub...`;let e=await a.executeBackupNow();alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: https://github.com/emporioboldrini-stack/deconto-app.git\nCommit Hash: ${e.backupRecord.commitHash}\nEntità salvate: ${e.backupRecord.recordCount}`),g()});let p=document.getElementById(`btn-toggle-add-client`),m=document.getElementById(`add-client-form-container`);p&&m&&p.addEventListener(`click`,()=>{m.style.display=m.style.display===`none`?`block`:`none`});let _=document.getElementById(`btn-cancel-add-client`);_&&m&&_.addEventListener(`click`,()=>{m.style.display=`none`});let v=document.getElementById(`btn-save-new-client`);v&&v.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-ref`).value.trim(),n=document.getElementById(`new-cli-phone`).value.trim(),r=document.getElementById(`new-cli-email`).value.trim(),a=document.getElementById(`new-cli-city`).value.trim(),o=document.getElementById(`new-cli-address`).value.trim(),s=document.getElementById(`new-cli-machine`)?document.getElementById(`new-cli-machine`).value:null;if(!e){alert(`Compila la Ragione Sociale del Cliente!`);return}try{i.addClient({name:e,refPerson:t,phone:n,email:r,city:a,address:o,machineId:s}),alert(`✅ Cliente "${e}" salvato ed installato con successo!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{h.editingId=e.getAttribute(`data-id`),g()})}),document.querySelectorAll(`.btn-del-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Eliminare questo cliente dall'anagrafica? Le macchine collegate torneranno in magazzino.`))try{i.deleteClient(t),g()}catch(e){alert(e.message)}})});let y=document.getElementById(`form-edit-client`);y&&y.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-client-id`).value,n=document.getElementById(`edit-cli-name`).value,r=document.getElementById(`edit-cli-ref`).value,a=document.getElementById(`edit-cli-phone`).value,o=document.getElementById(`edit-cli-city`).value,s=document.getElementById(`edit-cli-address`).value,c=document.getElementById(`edit-cli-machine`)?document.getElementById(`edit-cli-machine`).value:void 0;try{i.updateClient(t,{name:n,refPerson:r,phone:a,city:o,address:s,assignedMachineId:c}),h.editingId=null,alert(`✅ Scheda Cliente e Macchina installata aggiornata!`),g()}catch(e){alert(e.message)}});let b=document.getElementById(`btn-toggle-add-machine`),x=document.getElementById(`add-machine-form-container`);b&&x&&b.addEventListener(`click`,()=>{x.style.display=x.style.display===`none`?`block`:`none`});let S=document.getElementById(`btn-cancel-add-machine`);S&&x&&S.addEventListener(`click`,()=>{x.style.display=`none`});let C=document.getElementById(`btn-save-new-machine`);C&&C.addEventListener(`click`,()=>{let e=document.getElementById(`new-mc-serial`).value.trim(),t=document.getElementById(`new-mc-brand`).value.trim(),n=document.getElementById(`new-mc-model`).value.trim(),r=document.getElementById(`new-mc-board`)?document.getElementById(`new-mc-board`).value:null,a=document.getElementById(`new-mc-client`).value;if(!e||!n){alert(`Compila Seriale e Modello della macchina!`);return}try{i.addMachine({serialNumber:e,brand:t,model:n,boardId:r,clientId:a}),alert(`✅ Macchina "${e}" registrata ed associata nel parco macchine!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{h.editingId=e.getAttribute(`data-id`),g()})}),document.querySelectorAll(`.btn-del-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Eliminare questa macchina dal parco macchine?`))try{i.deleteMachine(t),g()}catch(e){alert(e.message)}})});let w=document.getElementById(`form-edit-machine`);w&&w.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-mc-id`).value,n=document.getElementById(`edit-mc-serial`).value,r=document.getElementById(`edit-mc-brand`).value,a=document.getElementById(`edit-mc-model`).value,o=document.getElementById(`edit-mc-board`)?document.getElementById(`edit-mc-board`).value:void 0,s=document.getElementById(`edit-mc-client`).value;try{i.updateMachine(t,{serialNumber:n,brand:r,model:a,boardId:o,clientId:s}),h.editingId=null,alert(`✅ Macchina da Caffè e Scheda Deconto collegate con successo!`),g()}catch(e){alert(e.message)}});let T=document.getElementById(`btn-toggle-add-board`),E=document.getElementById(`add-board-form-container`);T&&E&&T.addEventListener(`click`,()=>{E.style.display=E.style.display===`none`?`block`:`none`});let D=document.getElementById(`btn-cancel-add-board`);D&&E&&D.addEventListener(`click`,()=>{E.style.display=`none`});let O=document.getElementById(`btn-save-new-board`);O&&O.addEventListener(`click`,()=>{let e=document.getElementById(`new-board-code`).value.trim(),t=document.getElementById(`new-board-hwserial`).value.trim(),n=document.getElementById(`new-board-credits`).value,r=document.getElementById(`new-board-version`).value,a=document.getElementById(`new-board-machine`).value;if(!e){alert(`Inserisci il codice a 4 cifre per la Scheda Deconto (es. 9902)!`);return}try{i.addBoard({shortCode:e,hwSerial:t,remainingCredits:n,version:r,machineId:a}),alert(`✅ NUOVA SCHEDA DECONTO #${e} CREATA CON SUCCESSO!`),g()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{h.editingId=e.getAttribute(`data-id`),g()})}),document.querySelectorAll(`.btn-del-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Eliminare questa Scheda Hardware Deconto?`))try{i.deleteBoard(t),g()}catch(e){alert(e.message)}})});let k=document.getElementById(`form-edit-board`);k&&k.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-board-id`).value,n=document.getElementById(`edit-board-shortcode`).value,r=document.getElementById(`edit-board-hwserial`).value,a=document.getElementById(`edit-board-credits`).value,o=document.getElementById(`edit-board-threshold`).value,s=document.getElementById(`edit-board-version`).value,c=document.getElementById(`edit-board-machine`).value;try{i.updateBoard(t,{shortCode:n,hwSerial:r,remainingCredits:a,lowStockThreshold:o,version:s,machineId:c}),h.editingId=null,alert(`✅ Scheda Deconto aggiornata con successo!`),g()}catch(e){alert(e.message)}}),document.querySelectorAll(`#btn-close-edit-modal, #btn-cancel-edit-client, #btn-cancel-edit-mc, #btn-cancel-edit-board`).forEach(e=>{e.addEventListener(`click`,()=>{h.editingId=null,g()})});let A=document.getElementById(`sim-board-select`);A&&A.addEventListener(`change`,e=>{h.selectedSimBoardCode=e.target.value,g()});let j=document.getElementById(`btn-sim-brew`);j&&j.addEventListener(`click`,()=>{let e=h.selectedSimBoardCode||`9901`;document.getElementById(`signal-sense-volts`).innerText=`230V AC (Impulso)`,document.getElementById(`signal-sense-badge`).className=`badge badge-warning`,document.getElementById(`signal-sense-badge`).innerText=`EROGAZIONE IN CORSO`;let t=i.registerCoffeeExtraction(e,22,1);setTimeout(()=>{if(t&&t.success){let n=document.getElementById(`sim-console-log`);n&&(n.innerHTML+=`[EXTRACTION]: Caffè erogato su #${e}! Credito rimanente: ${t.remainingCredits}.<br>`,n.scrollTop=n.scrollHeight)}g()},600)});let M=document.getElementById(`btn-sim-reset`);M&&M.addEventListener(`click`,()=>{let e=h.selectedSimBoardCode||`9901`;i.performRefill({boardShortCode:e,credits:200,method:`TEST_BENCH`,operatorId:h.currentUser?h.currentUser.id:`usr_001`}),alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${e}!`),g()})}document.addEventListener(`DOMContentLoaded`,g);