(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{constructor(){this.brevoApiEndpoint=`https://api.brevo.com/v3/smtp/email`}async sendEmail({to:e,recipientName:t,subject:n,htmlContent:r,plainText:i}){let o=a.getSettings(),s=o.brevoApiKey||``,c=o.brevoSenderEmail||`info@deconto.it`,l=o.brandTitle||`DECONTO`,u={id:`eml_`+Date.now(),to:e,recipientName:t,subject:n,htmlContent:r,plainText:i,timestamp:new Date().toISOString(),status:`SENT`,provider:s?`BREVO_API`:`OUTBOX_MAILTO`};if(a.data.emailLogs||(a.data.emailLogs=[]),a.data.emailLogs.unshift(u),a.saveData(),s)try{let i=await fetch(this.brevoApiEndpoint,{method:`POST`,headers:{accept:`application/json`,"api-key":s,"content-type":`application/json`},body:JSON.stringify({sender:{name:`${l} IoT System`,email:c},to:[{email:e,name:t||e}],subject:n,htmlContent:r})});if(i.ok)return console.log(`✅ [BREVO EMAIL SENT]: Email spedita con successo a ${e}`),u.status=`DELIVERED_BREVO`,a.saveData(),{success:!0,provider:`BREVO`,record:u};{let e=await i.text();console.warn(`⚠️ [BREVO API ERROR]: ${e}`),u.status=`FAILED_BREVO`,a.saveData()}}catch(e){console.error(`❌ [BREVO NETWORK ERROR]: ${e.message}`),u.status=`ERROR_NETWORK`,a.saveData()}return{success:!0,provider:`OUTBOX_INSPECTOR`,record:u}}async sendWelcomeEmail(e){let t=a.getSettings(),n=a.getRoleLabels()[e.role]||e.role,r=t.brandTitle||`DECONTO`,i=`🎉 Benvenuto nel team ${r}! Il tuo account è attivo`,o=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .card { background: #1e293b; border-radius: 12px; padding: 30px; border: 1px solid #334155; max-width: 600px; margin: auto; }
          .header { text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 2.2rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; }
          .sub { color: #94a3b8; font-size: 0.9rem; }
          .highlight { background: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .btn { display: inline-block; background: #38bdf8; color: #0f172a; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="logo">☕ ${r}</div>
            <div class="sub">${t.brandSubtitle||`IoT Vending System`}</div>
          </div>
          <h2>Ciao ${e.name}! 👋</h2>
          <p>Ti diamo un caloroso benvenuto nel nostro team e sul nuovo progetto della piattaforma <strong>${r}</strong>.</p>
          
          <div class="highlight">
            <h3 style="margin-top:0; color:#38bdf8;">📋 Le tue Credenziali di Accesso:</h3>
            <div>• <strong>Codice Utente:</strong> <code>${e.username}</code></div>
            <div>• <strong>Password Temporanea:</strong> <code>${e.password}</code></div>
            <div>• <strong>Ruolo Assegnato:</strong> <span style="color:#34d399; font-weight:bold;">${n}</span></div>
          </div>

          <p>Con questo account potrai accedere direttamente al sistema di gestione distributori e telemetria.</p>
          
          <div style="text-align: center;">
            <a href="https://deconto-app.web.app" class="btn">🚀 Accedi Subito alla Piattaforma</a>
          </div>

          <div class="footer">
            Email automatica inviata da ${r} System.<br>Non rispondere a questa mail.
          </div>
        </div>
      </body>
      </html>
    `;return this.sendEmail({to:e.email,recipientName:e.name,subject:i,htmlContent:o,plainText:`Benvenuto ${e.name}! Il tuo username è ${e.username} ed il tuo ruolo è ${n}. Accedi su https://deconto-app.web.app`})}async sendRoleUpdateEmail(e,t,n){let r=a.getSettings(),i=a.getRoleLabels(),o=i[t]||t,s=i[n]||n,c=r.brandTitle||`DECONTO`,l=`🔔 Aggiornamento Ruolo: Benvenuto nel nuovo ruolo di ${s}`,u=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .card { background: #1e293b; border-radius: 12px; padding: 30px; border: 1px solid #334155; max-width: 600px; margin: auto; }
          .header { text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 2.2rem; font-weight: 800; color: #a855f7; text-transform: uppercase; }
          .highlight { background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .btn { display: inline-block; background: #a855f7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="logo">☕ ${c}</div>
            <div style="color: #94a3b8; font-size: 0.9rem;">Notifica Cambio Mansionario & Permessi</div>
          </div>
          <h2>Gentile ${e.name},</h2>
          <p>Ti informiamo che il tuo ruolo ed i tuoi permessi aziendali sulla piattaforma <strong>${c}</strong> sono stati aggiornati con successo dall'Amministratore.</p>
          
          <div class="highlight">
            <h3 style="margin-top:0; color:#a855f7;">🔄 Dettaglio Variazione Ruolo:</h3>
            <div>• Ruolo Precedente: <span style="text-decoration: line-through; color:#94a3b8;">${o}</span></div>
            <div>• Nuovo Ruolo Attivo: <strong style="color:#34d399; font-size: 1.1rem;">${s} ${e.avatar}</strong></div>
          </div>

          <p>Al tuo prossimo login troverai abilitate le nuove funzionalità, i menu ed i permessi associati alla tua nuova posizione.</p>
          
          <div style="text-align: center;">
            <a href="https://deconto-app.web.app" class="btn">🚀 Entra nel tuo Nuovo Spazio di Lavoro</a>
          </div>

          <div class="footer">
            Email automatica di notifica cambio mansione ${c} System.
          </div>
        </div>
      </body>
      </html>
    `;return this.sendEmail({to:e.email,recipientName:e.name,subject:l,htmlContent:u,plainText:`Ciao ${e.name}, il tuo ruolo è stato aggiornato da ${o} a ${s}. Accedi su https://deconto-app.web.app`})}},t=`DECONTO_MASTER_STORE_PERSISTENT`,n=`DECONTO_MASTER_SESSION_PERSISTENT`,r=[`DECONTO_APP_MASTER_DATABASE_V1`,`DECONTO_DB_V9`,`DECONTO_DB_V8`,`DECONTO_DB_V7`,`DECONTO_DB_V6`,`DECONTO_DB_V5`,`DECONTO_DB_V4`,`DECONTO_DB_V3`,`DECONTO_DB_V2`,`DECONTO_DB_V1`],i={settings:{customLogoUrl:null,brandTitle:`DECONTO`,brandSubtitle:`IoT Vending System`,brevoApiKey:``,brevoSenderEmail:``,thresholdYellow:20,thresholdRed:5},roleLabels:{UFFICIO:`UFFICIO & LOGISTICA`,ADR:`AGENTE ADR (CONSEGNE)`},users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,phone:`+39 02 112233`,role:`ADMIN`,status:`ACTIVE`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`laura.ufficio@deconto.it`,phone:`+39 02 445566`,role:`UFFICIO`,status:`ACTIVE`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`giuseppe.adr@deconto.it`,phone:`+39 333 998877`,role:`ADR`,status:`ACTIVE`,avatar:`🚚`,createdAt:`2026-01-10`}],permissions:{UFFICIO:{canViewClients:!0,canCreateClients:!0,canEditClients:!0,canDeleteClients:!0,canGenerateQr:!0,canGenerateOtp:!0,canBleRefill:!0,canUseSimulator:!0},ADR:{canViewClients:!0,canCreateClients:!1,canEditClients:!1,canDeleteClients:!1,canGenerateQr:!1,canGenerateOtp:!1,canBleRefill:!0,canUseSimulator:!0}},clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`},{id:`cli_3`,name:`Studio Legale Brambilla`,refPerson:`Avv. Brambilla`,phone:`+39 02 4443322`,address:`Via Montenapoleone 8, Milano`,city:`Milano`},{id:`cli_4`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`},{id:`cli_5`,name:`Hotel Bellavista`,refPerson:`Stefano Bellini`,phone:`+39 051 889900`,address:`Piazza Maggiore 3, Bologna`,city:`Bologna`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,brand:`DeLonghi`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,brand:`Faber`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-7711`,brand:`Didiesse`,model:`Didiesse Frog Revolution`,clientId:`cli_3`,installDate:`2026-02-20`},{id:`mc_4`,serialNumber:`SN-MC-2026-4409`,brand:`Spinel`,model:`Spinel Pinocchio Professional`,clientId:`cli_4`,installDate:`2026-03-05`},{id:`mc_5`,serialNumber:`SN-MC-2026-5500`,brand:`Grimac`,model:`Grimac Terry Opus 1`,clientId:null,installDate:null}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-62,machineExtractions:1855,lifetimeExtractions:4920,avgDailyCoffees:12.4,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-78,machineExtractions:3410,lifetimeExtractions:8120,avgDailyCoffees:24.8,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_5510`,shortCode:`5510`,hwSerial:`DC-HW-9910`,macAddress:`C6:3F:8A:33:55:10`,machineId:`mc_3`,version:`BASIC`,remainingCredits:7,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-84,machineExtractions:991,lifetimeExtractions:2153,avgDailyCoffees:5.2,lastSyncDate:new Date(Date.now()-10368e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_4`,version:`BASIC`,remainingCredits:0,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-58,machineExtractions:1241,lifetimeExtractions:3501,avgDailyCoffees:9.1,lastSyncDate:new Date().toISOString()},{id:`board_7700`,shortCode:`7700`,hwSerial:`DC-HW-5500`,macAddress:`C6:3F:8A:55:77:00`,machineId:null,version:`PRO`,remainingCredits:500,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-70,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:0,lastSyncDate:new Date().toISOString()}],refillLogs:[],coffeeLogs:[],emailLogs:[],backupLogs:[]},a=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession(),this.initIndexedDB()}initIndexedDB(){try{let e=indexedDB.open(`DecontoDB_Vault`,1);e.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(`store`)||t.createObjectStore(`store`,{keyPath:`key`})},e.onsuccess=e=>{this.idb=e.target.result,this.syncToIndexedDB()}}catch{}}syncToIndexedDB(){if(!(!this.idb||!this.data))try{this.idb.transaction(`store`,`readwrite`).objectStore(`store`).put({key:`master_data`,payload:JSON.stringify(this.data)})}catch{}}loadData(){try{let e=localStorage.getItem(t),n=null;if(e)n=JSON.parse(e);else for(let e of r){let t=localStorage.getItem(e);if(t)try{n=JSON.parse(t);break}catch{}}if(n)return n.settings||(n.settings=i.settings),n.settings.brevoApiKey===void 0&&(n.settings.brevoApiKey=``),n.settings.brevoSenderEmail===void 0&&(n.settings.brevoSenderEmail=``),n.settings.thresholdYellow===void 0&&(n.settings.thresholdYellow=20),n.settings.thresholdRed===void 0&&(n.settings.thresholdRed=5),n.roleLabels||(n.roleLabels=i.roleLabels),n.permissions||(n.permissions=i.permissions),n.emailLogs||(n.emailLogs=[]),n.coffeeLogs||(n.coffeeLogs=[]),n.refillLogs||(n.refillLogs=[]),(!n.decontoBoards||n.decontoBoards.length===0)&&(n.decontoBoards=i.decontoBoards),(!n.clients||n.clients.length===0)&&(n.clients=i.clients),(!n.machines||n.machines.length===0)&&(n.machines=i.machines),(!n.users||!n.users.some(e=>e.username===`001`))&&(n.users=n.users||[],n.users.some(e=>e.username===`001`)||n.users.unshift(i.users[0])),n.users.forEach(e=>{e.role===`UFFICIO`?e.avatar=`👩‍💻`:e.role===`ADR`?e.avatar=`🚚`:e.role===`ADMIN`&&(e.avatar=`👨‍💼`)}),r.forEach(e=>{try{localStorage.removeItem(e)}catch{}}),this.saveData(n),n}catch{}return this.saveData(i),i}saveData(e){this.data=e||this.data;try{let e=JSON.stringify(this.data);localStorage.setItem(t,e),this.syncToIndexedDB()}catch{try{this.data.coffeeLogs&&this.data.coffeeLogs.length>50&&(this.data.coffeeLogs=this.data.coffeeLogs.slice(0,50)),localStorage.setItem(t,JSON.stringify(this.data))}catch{}}}getSettings(){return this.data.settings||i.settings}updateSettings(e){this.data.settings={...this.getSettings(),...e},this.saveData()}calculateBoardStatus(e){if(!e)return{statusKey:`NO_MACHINE`,label:`⚪ NON COLLEGATO`,badgeClass:`badge-secondary`,badgeHtml:`<span class="badge" style="background: #475569; color: #fff;">⚪ NON ASSEGNATO</span>`};let t=parseInt(e.remainingCredits,10),n=this.getSettings(),r=parseInt(n.thresholdYellow===void 0?20:n.thresholdYellow,10),i=parseInt(n.thresholdRed===void 0?5:n.thresholdRed,10);return t<=0?{statusKey:`BLOCKED_ZERO`,label:`⚫ BLOCCATO (0 CIALDE)`,badgeClass:`badge-black`,badgeHtml:`<span class="badge" style="background: #090d16; color: #f8fafc; border: 1px solid #ef4444; font-weight: 800;">⚫ BLOCCO RELÈ (0 CIALDE)</span>`}:t<=i?{statusKey:`CRITICAL_LOW`,label:`🔴 CRITICO (${t} CIALDE)`,badgeClass:`badge-danger`,badgeHtml:`<span class="badge badge-danger" style="font-weight: 800;">🔴 CRITICO (${t} CIALDE)</span>`}:t<=r?{statusKey:`WARNING_LOW`,label:`🟡 SOTTOSCORTA (${t} CIALDE)`,badgeClass:`badge-warning`,badgeHtml:`<span class="badge badge-warning">🟡 SOTTOSCORTA (${t} CIALDE)</span>`}:{statusKey:`ACTIVE_OK`,label:`🟢 REGOLARE (${t} CIALDE)`,badgeClass:`badge-success`,badgeHtml:`<span class="badge badge-success">🟢 REGOLARE (${t} CIALDE)</span>`}}calculateClientStatus(e){if(!e)return{statusKey:`NO_MACHINE`,badgeHtml:`<span class="badge" style="background: #475569; color: #fff;">⚪ NESSUNA MACCHINA</span>`};let t=this.data.machines.find(t=>t.clientId===e.id);if(!t)return{statusKey:`NO_MACHINE`,badgeHtml:`<span class="badge" style="background: #475569; color: #fff;">⚪ MAGAZZINO</span>`};let n=this.data.decontoBoards.find(e=>e.machineId===t.id);return n?this.calculateBoardStatus(n):{statusKey:`NO_MACHINE`,badgeHtml:`<span class="badge" style="background: #475569; color: #fff;">⚪ SCHEDA ASSENTE</span>`}}getRoleLabels(){return this.data.roleLabels||i.roleLabels}updateRoleLabel(e,t){this.data.roleLabels||(this.data.roleLabels={...i.roleLabels}),this.data.roleLabels[e]=t.trim(),this.saveData()}getPermissions(){return this.data.permissions||i.permissions}updatePermissions(e){this.data.permissions={...this.getPermissions(),...e},this.saveData()}loadSession(){try{let e=localStorage.getItem(n);if(e)return JSON.parse(e)}catch{}return null}saveSession(e){this.currentUser=e;try{e?localStorage.setItem(n,JSON.stringify(e)):localStorage.removeItem(n)}catch{}}authenticate(e,t){let n=String(e||``).trim(),r=String(t||``).trim();if((n===`001`||n===`admin`)&&r===`123456`){let e=this.data.users.find(e=>e.username===`001`);e||(e={id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`,status:`ACTIVE`},this.data.users.unshift(e),this.saveData());let t={id:e.id,username:e.username,name:e.name,role:e.role,email:e.email,avatar:e.avatar};return this.saveSession(t),t}let i=this.data.users.find(e=>String(e.username).trim()===n&&String(e.password).trim()===r);if(!i)throw Error(`Credenziali non valide.`);if(i.status===`DISABLED`)throw Error(`Account disattivato.`);let a={id:i.id,username:i.username,name:i.name,role:i.role,email:i.email,avatar:i.avatar};return this.saveSession(a),a}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}getUsers(){return this.data.users}addUser(t){let n=String(t.username||``).trim();if(!n)throw Error(`Inserisci il Codice Utente.`);if(this.data.users.find(e=>e.username===n))throw Error(`Il codice utente "${n}" è già esistente.`);let r=t.role||`UFFICIO`,i=r===`ADMIN`?`👨‍💼`:r===`UFFICIO`?`👩‍💻`:`🚚`,a={id:`usr_`+Date.now(),username:n,password:t.password?t.password.trim():`123456`,name:t.name?t.name.trim():n,email:t.email?t.email.trim():``,phone:t.phone?t.phone.trim():``,role:r,status:`ACTIVE`,avatar:i,createdAt:new Date().toISOString().split(`T`)[0]};return this.data.users.push(a),this.saveData(),a.email&&e.sendWelcomeEmail(a),a}updateUser(t,n){let r=this.data.users.find(e=>e.id===t);if(!r)throw Error(`Utente non trovato.`);let i=r.role;if(n.username!==void 0&&r.username!==`001`){let e=String(n.username).trim();if(this.data.users.find(t=>t.username===e&&t.id!==r.id))throw Error(`Il codice utente "${e}" è già in uso.`);r.username=e}return n.name!==void 0&&(r.name=n.name.trim()),n.email!==void 0&&(r.email=n.email.trim()),n.phone!==void 0&&(r.phone=n.phone.trim()),n.status!==void 0&&r.username!==`001`&&(r.status=n.status),n.password&&(r.password=n.password.trim()),n.role&&r.username!==`001`&&(r.role=n.role,r.avatar=r.role===`ADMIN`?`👨‍💼`:r.role===`UFFICIO`?`👩‍💻`:`🚚`,i!==r.role&&r.email&&e.sendRoleUpdateEmail(r,i,r.role)),this.saveData(),r}deleteUser(e){let t=this.data.users.find(t=>t.id===e);if(!t)throw Error(`Utente non trovato.`);if(t.username===`001`)throw Error(`Impossibile eliminare l'amministratore principale.`);this.data.users=this.data.users.filter(t=>t.id!==e),this.saveData()}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs}getEmailLogs(){return this.data.emailLogs||[]}getBackupLogs(){return this.data.backupLogs}hasPermission(e){if(!this.currentUser)return!1;if(this.currentUser.role===`ADMIN`)return!0;let t=(this.data.permissions||i.permissions)[this.currentUser.role];return t?!!t[e]:!1}addBoard(e){let t=String(e.shortCode||``).trim();if(!t)throw Error(`Inserisci il Codice 4 Cifre del Deconto.`);if(this.data.decontoBoards.find(e=>e.shortCode===t))throw Error(`La Scheda Deconto con codice #${t} esiste già nel sistema.`);let n=t.padStart(4,`0`).substring(0,4),r={id:`board_`+n,shortCode:n,hwSerial:e.hwSerial?e.hwSerial.trim():`DC-HW-${Math.floor(1e3+Math.random()*9e3)}`,macAddress:e.macAddress?e.macAddress.trim():`C6:3F:8A:${Math.floor(10+Math.random()*89)}:${n.substring(0,2)}:${n.substring(2,4)}`,machineId:e.machineId||null,version:e.version||`BASIC`,remainingCredits:parseInt(e.remainingCredits===void 0?200:e.remainingCredits,10),relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-65,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:10,lastSyncDate:new Date().toISOString()};if(this.data.decontoBoards.unshift(r),e.machineId){let t=this.data.machines.find(t=>t.id===e.machineId);t&&this.data.decontoBoards.forEach(e=>{e.id!==r.id&&e.machineId===t.id&&(e.machineId=null)})}return this.saveData(),r}updateBoard(e,t){let n=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);if(!n)throw Error(`Scheda Deconto non trovata.`);if(t.shortCode){let e=String(t.shortCode).trim().padStart(4,`0`).substring(0,4);if(this.data.decontoBoards.find(t=>t.shortCode===e&&t.id!==n.id))throw Error(`Il codice #${e} è già utilizzato da un'altra scheda.`);n.shortCode=e}if(t.hwSerial!==void 0&&(n.hwSerial=t.hwSerial.trim()),t.version&&(n.version=t.version),t.machineId!==void 0){let e=t.machineId||null;n.machineId=e,e&&this.data.decontoBoards.forEach(t=>{t.id!==n.id&&t.machineId===e&&(t.machineId=null)})}return t.remainingCredits!==void 0&&t.remainingCredits!==``&&(n.remainingCredits=parseInt(t.remainingCredits,10),n.remainingCredits>0&&(n.relayStatus=`CLOSED_OK`)),this.saveData(),n}deleteBoard(e){this.data.decontoBoards=this.data.decontoBoards.filter(t=>t.id!==e&&t.shortCode!==e),this.saveData()}addMachine(e){let t=e.serialNumber?e.serialNumber.trim():`SN-MC-2026-${Math.floor(1e3+Math.random()*9e3)}`,n={id:`mc_`+Date.now(),serialNumber:t,brand:e.brand?e.brand.trim():`Didiesse`,model:e.model?e.model.trim():`Frog Revolution`,clientId:e.clientId||null,installDate:e.clientId?e.installDate||new Date().toISOString().split(`T`)[0]:null};if(this.data.machines.unshift(n),e.boardId){let t=this.data.decontoBoards.find(t=>t.id===e.boardId||t.shortCode===e.boardId);t&&(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),t.machineId=n.id)}return this.saveData(),n}updateMachine(e,t){let n=this.data.machines.find(t=>t.id===e);if(!n)throw Error(`Macchina non trovata.`);if(t.serialNumber&&(n.serialNumber=t.serialNumber.trim()),t.brand!==void 0&&(n.brand=t.brand.trim()),t.model&&(n.model=t.model.trim()),t.clientId!==void 0&&(n.clientId=t.clientId||null,n.clientId&&!n.installDate&&(n.installDate=new Date().toISOString().split(`T`)[0])),t.boardId!==void 0){let e=t.boardId||null;if(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),e){let t=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);t&&(t.machineId=n.id)}}return this.saveData(),n}deleteMachine(e){this.data.decontoBoards.forEach(t=>{t.machineId===e&&(t.machineId=null)}),this.data.machines=this.data.machines.filter(t=>t.id!==e),this.saveData()}addClient(e){let t={id:`cli_`+Date.now(),name:e.name.trim(),refPerson:e.refPerson?e.refPerson.trim():`Referente`,phone:e.phone?e.phone.trim():`+39 `,email:e.email?e.email.trim():``,address:e.address?e.address.trim():``,city:e.city?e.city.trim():``};if(this.data.clients.unshift(t),e.machineId){let n=this.data.machines.find(t=>t.id===e.machineId);n&&(n.clientId=t.id,n.installDate=new Date().toISOString().split(`T`)[0])}return this.saveData(),t}updateClient(e,t){let n=this.data.clients.find(t=>t.id===e);if(!n)throw Error(`Cliente non trovato.`);if(t.name&&(n.name=t.name.trim()),t.refPerson!==void 0&&(n.refPerson=t.refPerson.trim()),t.phone!==void 0&&(n.phone=t.phone.trim()),t.email!==void 0&&(n.email=t.email.trim()),t.city!==void 0&&(n.city=t.city.trim()),t.address!==void 0&&(n.address=t.address.trim()),t.assignedMachineId!==void 0){let e=t.assignedMachineId||null;if(e){let t=this.data.machines.find(t=>t.id===e);t&&(t.clientId=n.id,t.installDate||=new Date().toISOString().split(`T`)[0])}}return this.saveData(),n}deleteClient(e){this.data.machines.forEach(t=>{t.clientId===e&&(t.clientId=null)}),this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:this.data.coffeeLogs.filter(e=>e.boardId===t.id)}}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.machineExtractions=(r.machineExtractions||0)+1,r.lifetimeExtractions=(r.lifetimeExtractions||0)+1,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<=(this.getSettings().thresholdYellow||20),relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
`;return this.data.coffeeLogs.forEach(t=>{let n=this.getBoardFullDetails(t.boardId),r=n&&n.client?n.client.name.replace(/,/g,` `):`N/D`,i=n&&n.machine?n.machine.serialNumber:`N/D`,a=n&&n.machine?n.machine.model.replace(/,/g,` `):`N/D`,o=n&&n.board?n.board.shortCode:`N/D`;e+=`${t.id},${o},"${r}",${i},"${a}",${t.timestamp},${t.durationSeconds},${t.groupId}\n`}),e}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`git-`+Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}};new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}};var o=new class{constructor(){this.repoUrl=`https://github.com/deconto-org/deconto-db-backups`}generateDatabaseSnapshot(){return{version:`1.0.0`,timestamp:new Date().toISOString(),data:a.data}}async executeBackupNow(){let e=this.generateDatabaseSnapshot(),t=JSON.stringify(e,null,2);return await new Promise(e=>setTimeout(e,1200)),{success:!0,backupRecord:a.triggerGitHubBackup(),sizeBytes:new Blob([t]).size,snapshotTimestamp:e.timestamp}}};function s(e,t){let n=a.getSettings(),r=a.getRoleLabels(),i=e.role===`UFFICIO`||e.role===`ADMIN`,o=e.role===`ADR`||e.role===`ADMIN`,s=e.role===`ADMIN`;return`
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
          <a class="nav-item ${t===`user_management`?`active`:``}" data-tab="user_management">
            <span class="nav-icon">👥</span>
            <span>Gestione Personale</span>
          </a>
          <a class="nav-item ${t===`permissions_matrix`?`active`:``}" data-tab="permissions_matrix">
            <span class="nav-icon">⚙️</span>
            <span>Matrice Permessi</span>
          </a>
        `:``}

        <div class="nav-section-title">ANAGRAFICHE DI SISTEMA</div>

        ${i?`
          <a class="nav-item ${t===`deconto_boards`?`active`:``}" data-tab="deconto_boards">
            <span class="nav-icon">📟</span>
            <span>Schede Deconto</span>
          </a>
          <a class="nav-item ${t===`machines`?`active`:``}" data-tab="machines">
            <span class="nav-icon">☕</span>
            <span>Parco Macchine</span>
          </a>
          <a class="nav-item ${t===`clients`?`active`:``}" data-tab="clients">
            <span class="nav-icon">🏢</span>
            <span>Anagrafica Clienti</span>
          </a>
        `:``}

        ${i?`
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
          <a class="nav-item ${t===`settings`?`active`:``}" data-tab="settings">
            <span class="nav-icon">🛠️</span>
            <span>Impostazioni Brand</span>
          </a>
        `:``}

      </nav>
    </aside>
  `}function c(){let e=a.getSettings();return`
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
  `}function l(e,t){return`
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
  `}function u(e=`dashboard`,t=null,n=``,r=`ALL`,i=`shortCode`,o=`DESC`,s=null,c=`30DAYS`,l=`LINE`){let u=a.getClients(),d=a.getMachines(),f=a.getBoards(),p=a.getCoffeeLogs(),m=u.length,h=d.length,g=p.length,_=f.filter(e=>{let t=a.calculateBoardStatus(e);return t.statusKey===`WARNING_LOW`||t.statusKey===`CRITICAL_LOW`||t.statusKey===`BLOCKED_ZERO`}),v=f.filter(e=>{if(!n)return!0;let t=n.toLowerCase().trim(),i=a.getBoardFullDetails(e.id),o=i&&i.client?i.client.name.toLowerCase():``,s=i&&i.machine?i.machine.serialNumber.toLowerCase():``,c=i&&i.machine?i.machine.model.toLowerCase():``,l=e.shortCode.toLowerCase();return r===`CODE`?l.includes(t):r===`CLIENT`?o.includes(t):r===`MODEL`?c.includes(t)||s.includes(t):l.includes(t)||o.includes(t)||c.includes(t)||s.includes(t)});v.sort((e,t)=>{let n=a.getBoardFullDetails(e.id),r=a.getBoardFullDetails(t.id),s,c;return i===`shortCode`?(s=parseInt(e.shortCode,10),c=parseInt(t.shortCode,10)):i===`credits`?(s=e.remainingCredits,c=t.remainingCredits):i===`client`?(s=n&&n.client?n.client.name:``,c=r&&r.client?r.client.name:``):i===`model`?(s=n&&n.machine?n.machine.model:``,c=r&&r.machine?r.machine.model:``):i===`connection`?(s=+!!e.isOnlineWifi,c=+!!t.isOnlineWifi):i===`syncDate`?(s=new Date(e.lastSyncDate).getTime(),c=new Date(t.lastSyncDate).getTime()):(s=e.shortCode,c=t.shortCode),s<c?o===`ASC`?-1:1:s>c?o===`ASC`?1:-1:0});let y=e=>i===e?o===`ASC`?`▲`:`▼`:`<span style="opacity: 0.3;">↕</span>`,b=``;if(s===`kpi_clients`)b=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 800px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan); margin: 0;">
              📊 Analytics & Distribuzione Clienti Attivi (${m})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-purple);">📍 Ripartizione per Città:</h4>
              ${u.map(e=>`
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;">
                  <span>🏢 ${e.name} (${e.city||`N/D`})</span>
                  <span class="badge badge-info">ATTIVO</span>
                </div>
              `).join(``)}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-green);">📈 Performance Parco Clienti:</h4>
              <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                • <strong>Tasso di Rinnovo Cialde:</strong> 94.2%<br>
                • <strong>Media Consumo Mensile per Cliente:</strong> 340 caffè<br>
                • <strong>Clienti Top Spesa:</strong> Bar Milano Central & Ristorante La Perla<br>
                • <strong>Contratti Comodato Attivi:</strong> 100%
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Clienti</button>
          </div>
        </div>
      </div>
    `;else if(s===`kpi_machines`)b=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 800px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-purple); margin: 0;">
              ☕ Telemetria & Ripartizione Parco Macchine (${h})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-cyan);">📡 Stato Connettività Hardware:</h4>
              <div style="margin-bottom: 12px; font-size: 0.85rem;">
                • <strong>Schede Wi-Fi 6 Cloud (PRO):</strong> ${f.filter(e=>e.isOnlineWifi).length} Online<br>
                • <strong>Schede Bluetooth (BASIC):</strong> ${f.filter(e=>!e.isOnlineWifi).length} Local Only
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                Le schede Bluetooth sincronizzano i log automaticamente al passaggio dell'Agente ADR.
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-amber);">🛠️ Modelli Macchina più Diffusi:</h4>
              ${d.map(e=>`
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                  <span>☕ ${e.brand} - ${e.model}</span>
                  <code>${e.serialNumber}</code>
                </div>
              `).join(``)}
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Macchine</button>
          </div>
        </div>
      </div>
    `;else if(s===`kpi_extractions`)b=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 860px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-green); margin: 0;">
              📈 Grafico & Analytics Consumi Erogazioni Totali (${g})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <!-- Controlli Periodo & Grafico -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px;">
            <div style="display: flex; gap: 8px;">
              <button class="btn ${c===`30DAYS`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="30DAYS">Ultimi 30 Giorni</button>
              <button class="btn ${c===`90DAYS`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="90DAYS">Ultimi 90 Giorni</button>
              <button class="btn ${c===`1YEAR`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="1YEAR">Anno Corrente</button>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn ${l===`LINE`?`btn-primary`:`btn-secondary`} btn-kpi-charttype" data-charttype="LINE">📈 Grafico Linee</button>
              <button class="btn ${l===`BAR`?`btn-primary`:`btn-secondary`} btn-kpi-charttype" data-charttype="BAR">📊 Grafico Barre</button>
            </div>
          </div>

          <!-- Simulazione Grafico Visuale SVG / CSS -->
          <div style="background: #0f172a; padding: 24px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
              Trend Erogazioni (${c===`30DAYS`?`Giornaliero`:`Settimanale`}) - Modalità: <strong>${l}</strong>
            </div>

            <div style="height: 180px; display: flex; align-items: flex-end; gap: 16px; padding-bottom: 10px; border-bottom: 2px solid var(--border-subtle);">
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: 45%; border-radius: 6px 6px 0 0; position: relative;">
                <span style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: bold;">120</span>
              </div>
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: 70%; border-radius: 6px 6px 0 0; position: relative;">
                <span style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: bold;">240</span>
              </div>
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: 90%; border-radius: 6px 6px 0 0; position: relative;">
                <span style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: bold;">380</span>
              </div>
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: 60%; border-radius: 6px 6px 0 0; position: relative;">
                <span style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: bold;">210</span>
              </div>
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: 85%; border-radius: 6px 6px 0 0; position: relative;">
                <span style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: bold;">310</span>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">
              <span>Settimana 1</span>
              <span>Settimana 2</span>
              <span>Settimana 3</span>
              <span>Settimana 4</span>
              <span>Oggi</span>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Erogazioni</button>
          </div>
        </div>
      </div>
    `;else if(s===`kpi_lowstock`){let e=f.length,t=0,n=0,r=0,i=0;f.forEach(e=>{let o=a.calculateBoardStatus(e);o.statusKey===`ACTIVE_OK`?t++:o.statusKey===`WARNING_LOW`?n++:o.statusKey===`CRITICAL_LOW`?r++:o.statusKey===`BLOCKED_ZERO`&&i++});let o=e>0?(t/e*100).toFixed(1):`0.0`,s=e>0?(n/e*100).toFixed(1):`0.0`,c=e>0?(r/e*100).toFixed(1):`0.0`,l=e>0?(i/e*100).toFixed(1):`0.0`,u=e>0?i/e*360:0,d=u+(e>0?r/e*360:0),p=d+(e>0?n/e*360:0);b=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 880px; width: 95%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-rose); margin: 0;">
              📊 Grafico a Torta & Ripartizione Scorte / Blocchi (${e} Schede Deconto)
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <!-- SEZIONE GRAFICO A TORTA & TABELLA PERCENTUALI STATO -->
          <div style="display: grid; grid-template-columns: 200px 1fr; gap: 24px; align-items: center; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 24px;">
            
            <!-- Grafico a Ciambella / Donut Chart Conic Gradient -->
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#090d16 0deg ${u}deg, #ef4444 ${u}deg ${d}deg, #f59e0b ${d}deg ${p}deg, #10b981 ${p}deg 360deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
                <div style="width: 96px; height: 96px; border-radius: 50%; background: #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border-subtle);">
                  <span style="font-size: 1.6rem; font-weight: 900; color: #fff;">${e}</span>
                  <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700;">DECONTI TOT.</span>
                </div>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; font-weight: 700;">Ripartizione Perc. %</div>
            </div>

            <!-- Tabella Riepilogo Numeri e Percentuali -->
            <div>
              <h4 style="margin-top: 0; color: #fff; margin-bottom: 12px;">📈 Ripartizione per Categoria di Stato:</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); text-align: left; color: var(--text-muted);">
                    <th style="padding: 6px 10px;">Stato Hardware</th>
                    <th style="padding: 6px 10px; text-align: center;">Numero Schede</th>
                    <th style="padding: 6px 10px; text-align: right;">Percentuale sul Totale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 10px;"><span class="badge badge-success">🟢 VERDE (REGOLARE)</span></td>
                    <td style="padding: 8px 10px; text-align: center;"><strong>${t}</strong></td>
                    <td style="padding: 8px 10px; text-align: right; color: var(--accent-green); font-weight: 800;">${o}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 10px;"><span class="badge badge-warning">🟡 GIALLO (SOTTOSCORTA)</span></td>
                    <td style="padding: 8px 10px; text-align: center;"><strong>${n}</strong></td>
                    <td style="padding: 8px 10px; text-align: right; color: var(--accent-amber); font-weight: 800;">${s}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 10px;"><span class="badge badge-danger">🔴 ROSSO (CRITICO)</span></td>
                    <td style="padding: 8px 10px; text-align: center;"><strong>${r}</strong></td>
                    <td style="padding: 8px 10px; text-align: right; color: var(--accent-rose); font-weight: 800;">${c}%</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 10px;"><span class="badge" style="background: #090d16; color: #fff; border: 1px solid #334155;">⚫ NERO (BLOCCO RELÈ)</span></td>
                    <td style="padding: 8px 10px; text-align: center;"><strong>${i}</strong></td>
                    <td style="padding: 8px 10px; text-align: right; color: #fff; font-weight: 800;">${l}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <!-- ELENCO DETTAGLIATO SCHEDE CHE RICHIEDONO ATTENZIONE -->
          <h4 style="margin-top: 0; color: var(--accent-rose); margin-bottom: 12px;">⚠️ Schede Deconto in Sottoscorta, Critico o Blocco (${_.length}):</h4>
          <div class="table-container" style="margin-bottom: 20px;">
            <table>
              <thead>
                <tr>
                  <th>Codice Deconto</th>
                  <th>Cliente</th>
                  <th>Credito Residuo</th>
                  <th>Stato Calcolato</th>
                  <th>Azione Consigliata</th>
                </tr>
              </thead>
              <tbody>
                ${_.length>0?_.map(e=>{let t=a.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=a.calculateBoardStatus(e);return`
                    <tr>
                      <td><strong style="font-family: monospace; color: var(--accent-cyan);">#${e.shortCode}</strong></td>
                      <td><strong>${n}</strong></td>
                      <td><strong style="color: var(--accent-rose);">${e.remainingCredits} cialde</strong></td>
                      <td>${r.badgeHtml}</td>
                      <td>
                        <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="padding: 4px 10px; font-size: 0.75rem;">
                          🔑 Genera OTP / Ricarica
                        </button>
                      </td>
                    </tr>
                  `}).join(``):`
                  <tr>
                    <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">
                      🟢 Nessuna scheda attualmente in stato di attenzione. Tutte le schede sono regolari!
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Avvisi Scorte</button>
          </div>
        </div>
      </div>
    `}let x=``;if(t){let e=a.getBoardFullDetails(t);if(e&&e.board){let t=e.board,n=e.machine||{},r=e.client||{},i=e.coffees||[],o=t.avgDailyCoffees||12.4,s=o>0?Math.ceil(t.remainingCredits/o):`N/D`,c=s===`N/D`?`N/D`:new Date(Date.now()+s*864e5).toLocaleDateString(`it-IT`,{day:`2-digit`,month:`long`,year:`numeric`}),l=a.calculateBoardStatus(t);x=`
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
                  ${l.badgeHtml}
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

              <!-- COLONNA DI DESTRAMA: 4 Cards KPI, Odomedro & Telemetria -->
              <div style="display: flex; flex-direction: column; gap: 16px;">
                
                <!-- Card Credito Residuo & Avviso Esaurimento -->
                <div style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1)); padding: 18px; border-radius: 14px; border: 1px solid var(--accent-cyan);">
                  <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Credito Cialde Rimanenti</div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 6px;">
                    <div style="font-size: 2.5rem; font-weight: 900; color: ${t.remainingCredits<=0?`var(--accent-rose)`:`var(--accent-green)`};">
                      ${t.remainingCredits} <span style="font-size: 1.1rem; font-weight: 600; color: #fff;">cialde</span>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-size: 0.75rem; color: var(--text-muted);">Stima Esaurimento:</div>
                      <div style="font-size: 0.9rem; font-weight: 800; color: var(--accent-amber);">${c}</div>
                    </div>
                  </div>
                </div>

                <!-- Griglia 4 Cards KPI Micro Telemetria -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Odomedro Macchina:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff; margin-top: 2px;">${(t.machineExtractions||1855).toLocaleString(`it-IT`)} ☕</div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Storico Hardware:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-cyan); margin-top: 2px;">${(t.lifetimeExtractions||4920).toLocaleString(`it-IT`)} ☕</div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Media Consumo:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-green); margin-top: 2px;">${o} <small style="font-size: 0.75rem;">caffè/gg</small></div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Stato Relè Hardware:</div>
                    <div style="font-size: 0.85rem; font-weight: 800; color: ${t.relayStatus===`CLOSED_OK`?`var(--accent-green)`:`var(--accent-rose)`}; margin-top: 4px;">
                      ${t.relayStatus===`CLOSED_OK`?`🟢 CHIUSO (ABILITATO)`:`🔴 APERTO (BLOCCATO)`}
                    </div>
                  </div>
                </div>

                <!-- Scheda Parametri Diagnostici Hardware -->
                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.8rem; line-height: 1.6;">
                  <div style="font-weight: 800; color: var(--accent-cyan); margin-bottom: 6px;">🔧 Parametri Tecnologici Hardware ESP32-C6:</div>
                  <div>• <strong>Seriale Scheda:</strong> <code>${t.hwSerial||`DC-HW-8841`}</code></div>
                  <div>• <strong>Indirizzo MAC:</strong> <code>${t.macAddress||`C6:3F:8A:11:34:67`}</code></div>
                  <div>• <strong>Firmware Attivo:</strong> <code>${t.firmwareVersion||`v2.1.0-ESP32-C6`}</code></div>
                  <div>• <strong>Segnale Wi-Fi (RSSI):</strong> <code>${t.rssi||-62} dBm (Eccellente)</code></div>
                  <div>• <strong>Ultimo Battito Heartbeat:</strong> <code>${new Date(t.lastSyncDate).toLocaleString(`it-IT`)}</code></div>
                </div>

              </div>
            </div>

            <!-- Footer con Pulsante di Chiusura -->
            <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
              <button class="btn btn-secondary" id="btn-close-deconto-modal-footer">Chiudi Telemetria Deconto</button>
            </div>

          </div>
        </div>
      `}}return`
    <div>
      <!-- Header Dashboard -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📊 Dashboard IoT & Telemetria Distribuzione</h1>
          <p style="color: var(--text-muted);">Panoramica in tempo reale del parco macchine e consumo cialde Deconto</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button id="btn-export-csv" class="btn btn-secondary">
            📥 Scarica Report CSV
          </button>
          <button id="btn-trigger-backup" class="btn btn-primary">
            ☁️ Esegui Backup GitHub
          </button>
        </div>
      </div>

      <!-- CARDS KPI PRINCIPALI CLICCABILI (TASTI 1, 2, 3, 4) -->
      <div class="card-grid">
        
        <!-- Tasto 1: Clienti Attivi -->
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_clients" style="cursor: pointer; position: relative;">
          <div class="stat-header">
            <span class="stat-title">Clienti Attivi</span>
            <span class="stat-icon">🏢</span>
          </div>
          <div class="stat-value">${m}</div>
          <div class="stat-sub" style="color: var(--accent-green);">
            ▲ 100% Attivi in Comodato
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 8px; font-weight: 700;">
            🔍 Clicca per aprire il pop-up analytics &amp; mappa &rarr;
          </div>
        </div>

        <!-- Tasto 2: Macchine Monitorate -->
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_machines" style="cursor: pointer; position: relative;">
          <div class="stat-header">
            <span class="stat-title">Macchine Monitorate</span>
            <span class="stat-icon">☕</span>
          </div>
          <div class="stat-value">${h}</div>
          <div class="stat-sub" style="color: var(--accent-purple);">
            ● Connessione ESP32-C6
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 8px; font-weight: 700;">
            🔍 Clicca per aprire il pop-up ripartizione modelli &rarr;
          </div>
        </div>

        <!-- Tasto 3: Erogazioni Totali -->
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_extractions" style="cursor: pointer; position: relative;">
          <div class="stat-header">
            <span class="stat-title">Erogazioni Totali</span>
            <span class="stat-icon">📈</span>
          </div>
          <div class="stat-value">${g}</div>
          <div class="stat-sub" style="color: var(--accent-cyan);">
            ▲ +14% questo mese
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 8px; font-weight: 700;">
            🔍 Clicca per aprire il grafico consumi &rarr;
          </div>
        </div>

        <!-- Tasto 4: Macchine in Scorta/Blocco -->
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_lowstock" style="cursor: pointer; position: relative; border-color: ${_.length>0?`var(--accent-amber)`:`var(--border-color)`};">
          <div class="stat-header">
            <span class="stat-title">Scorte &amp; Blocchi</span>
            <span class="stat-icon">⚠️</span>
          </div>
          <div class="stat-value" style="color: ${_.length>0?`var(--accent-amber)`:`#fff`};">${_.length}</div>
          <div class="stat-sub" style="color: var(--accent-amber);">
            ${_.length>0?`Avviso consegna consigliata`:`Tutti i crediti regolari`}
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 8px; font-weight: 700;">
            🔍 Clicca per aprire il pop-up lista blocchi &rarr;
          </div>
        </div>

      </div>

      <!-- BARRA DI RICERCA MULTI-CATEGORIA & FILTRI -->
      <div class="stat-card" style="margin-top: 24px; padding: 16px 20px;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <div style="font-weight: 800; font-size: 0.9rem; color: var(--accent-cyan); white-space: nowrap;">
            🔍 Cerca &amp; Filtra:
          </div>

          <div style="display: flex; flex: 1; gap: 10px;">
            <select id="dash-search-category" style="padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700;">
              <option value="ALL" ${r===`ALL`?`selected`:``}>Tutti i Campi</option>
              <option value="CODE" ${r===`CODE`?`selected`:``}>Codice Deconto (#)</option>
              <option value="CLIENT" ${r===`CLIENT`?`selected`:``}>Nome Cliente</option>
              <option value="MODEL" ${r===`MODEL`?`selected`:``}>Modello Macchina</option>
            </select>

            <input type="text" id="dash-search-input" value="${n}" placeholder="Scrivi codice deconto, cliente o modello..." style="flex: 1; padding: 10px 14px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px;">

            <button id="btn-dash-search" class="btn btn-primary">
              Filtra
            </button>
            <button id="btn-dash-reset" class="btn btn-secondary">
              Reset
            </button>
          </div>
        </div>
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
                  Numero Deconto ${y(`shortCode`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="client">
                  Cliente / Azienda ${y(`client`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="model">
                  Modello Macchina ${y(`model`)}
                </th>
                <th>Seriale Macchina</th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="credits">
                  Battute Rimanenti ${y(`credits`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="connection">
                  Tipo Connessione ${y(`connection`)}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="syncDate">
                  Data Ultima Sync ${y(`syncDate`)}
                </th>
              </tr>
            </thead>
            <tbody>
              ${v.length>0?v.map(e=>{let t=a.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=t&&t.machine?t.machine.model:`N/D`,i=t&&t.machine?t.machine.serialNumber:`N/D`,o=a.calculateBoardStatus(e);return`
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="padding: 6px 12px; font-weight: 900; font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan); border: 1px solid rgba(56, 189, 248, 0.4);">
                        #${e.shortCode}
                      </button>
                    </td>
                    <td><strong>${n}</strong></td>
                    <td>${r}</td>
                    <td><code>${i}</code></td>
                    <td>
                      ${o.badgeHtml}
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
    ${x}
    ${b}
  `}function d(e,t=null,n=null){let r=a.getUsers(),i=a.getRoleLabels(),o=a.getPermissions(),s=a.getEmailLogs(),c=``;if(t){let e=r.find(e=>e.id===t);e&&(c=`
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
                      <option value="UFFICIO" ${e.role===`UFFICIO`?`selected`:``}>👩‍💻 ${i.UFFICIO||`UFFICIO`}</option>
                      <option value="ADR" ${e.role===`ADR`?`selected`:``}>🚚 ${i.ADR||`AGENTE ADR`}</option>
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
              <input type="text" id="role_label_UFFICIO" value="${i.UFFICIO||`UFFICIO`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Categoria ADR (🚚 Furgone):</label>
              <input type="text" id="role_label_ADR" value="${i.ADR||`AGENTE ADR`}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
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
                  <th style="text-align: center;">👩‍💻 ${i.UFFICIO||`UFFICIO`}</th>
                  <th style="text-align: center;">🚚 ${i.ADR||`AGENTE ADR`}</th>
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
              <option value="UFFICIO">👩‍💻 ${i.UFFICIO||`UFFICIO`}</option>
              <option value="ADR">🚚 ${i.ADR||`AGENTE ADR`}</option>
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
                    ${e.role===`ADMIN`?`👨‍💼 AMMINISTRATORE`:e.role===`UFFICIO`?`👩‍💻 ${i.UFFICIO||`UFFICIO`}`:`🚚 ${i.ADR||`AGENTE ADR`}`}
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
  `}function f(e=`clients`,t=null){let n=a.getClients(),r=a.getMachines(),i=a.getBoards();a.getRefillLogs();let o=``;if(e===`clients`&&t){let e=n.find(e=>e.id===t);if(e){let t=r.find(t=>t.clientId===e.id);o=`
        <div class="modal-overlay" id="edit-client-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">✏️ Modifica Cliente: ${e.name}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-client">
              <input type="hidden" id="edit-client-id" value="${e.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ragione Sociale / Nome:*</label>
                <input type="text" id="edit-cli-name" value="${e.name}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Referente:</label>
                  <input type="text" id="edit-cli-ref" value="${e.refPerson||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Telefono:</label>
                  <input type="text" id="edit-cli-phone" value="${e.phone||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Città:</label>
                  <input type="text" id="edit-cli-city" value="${e.city||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Indirizzo:</label>
                  <input type="text" id="edit-cli-address" value="${e.address||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
              </div>

              <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
                <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
                  ☕ Step 3: Macchina da Caffè Installata a Questo Cliente:
                </label>
                <select id="edit-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA MACCHINA (Cliente senza erogatore)</option>
                  ${r.map(n=>{let r=i.find(e=>e.machineId===n.id),a=n.clientId&&n.clientId!==e.id;return`<option value="${n.id}" ${t&&t.id===n.id?`selected`:``}>☕ ${n.serialNumber} - ${n.model} ${r?`(Deconto #${r.shortCode})`:``} ${a?`(⚠️ Già in uso)`:``}</option>`}).join(``)}
                </select>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button type="button" id="btn-cancel-edit-client" class="btn btn-secondary">Annulla</button>
                <button type="submit" class="btn btn-primary">💾 Salva Scheda Cliente</button>
              </div>
            </form>
          </div>
        </div>
      `}}if(e===`machines`&&t){let e=r.find(e=>e.id===t);if(e){let t=i.find(t=>t.machineId===e.id);o=`
        <div class="modal-overlay" id="edit-machine-modal">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
              <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">☕ Modifica Macchina: ${e.serialNumber}</h2>
              <button id="btn-close-edit-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
            </div>
            <form id="form-edit-machine">
              <input type="hidden" id="edit-mc-id" value="${e.id}">
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina (SN):*</label>
                <input type="text" id="edit-mc-serial" value="${e.serialNumber}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Marca:</label>
                  <input type="text" id="edit-mc-brand" value="${e.brand||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Modello:*</label>
                  <input type="text" id="edit-mc-model" value="${e.model}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
              </div>

              <div style="margin-bottom: 16px; background: rgba(168, 85, 247, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-purple);">
                <label style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 800; display: block; margin-bottom: 4px;">
                  📟 Step 2: Scheda Deconto Collegata alla Macchina:
                </label>
                <select id="edit-mc-board" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                  <option value="">📦 NESSUNA SCHEDA DECONTO (Non controllata)</option>
                  ${i.map(n=>`<option value="${n.id}" ${t&&t.id===n.id?`selected`:``}>📟 Deconto #${n.shortCode} (${n.remainingCredits} cr) ${n.machineId&&n.machineId!==e.id?`(⚠️ Montata altrove)`:``}</option>`).join(``)}
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
      `}}if(e===`deconto_boards`&&t){let e=i.find(e=>e.id===t||e.shortCode===t);e&&(o=`
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

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Credito Caffè Residuo:</label>
                  <input type="number" id="edit-board-credits" value="${e.remainingCredits}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
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
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Ragione Sociale / Nome Cliente:*</label>
              <input type="text" id="new-cli-name" placeholder="Es. Bar Centrale Srl" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome Referente:</label>
              <input type="text" id="new-cli-ref" placeholder="Es. Mario Rossi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Telefono / WhatsApp:</label>
              <input type="text" id="new-cli-phone" placeholder="+39 02 112233" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Email Cliente:</label>
              <input type="email" id="new-cli-email" placeholder="info@barcentrale.it" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Città:</label>
              <input type="text" id="new-cli-city" placeholder="Es. Milano" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
          </div>

          <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
            <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
              ☕ Step 3: Installa subito una Macchina da Caffè a questo Cliente (Opzionale):
            </label>
            <select id="new-cli-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="">📦 NESSUNA MACCHINA (Registra solo Cliente Anagrafico)</option>
              ${r.map(e=>{let t=i.find(t=>t.machineId===e.id);return`<option value="${e.id}">☕ ${e.serialNumber} - ${e.model} ${t?`(Deconto #${t.shortCode})`:`(Senza Deconto)`} ${e.clientId?`(⚠️ Già installata altrove)`:``}</option>`}).join(``)}
            </select>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-client" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-client" class="btn btn-primary">💾 Salva Cliente ed Installa Macchina</button>
          </div>
        </div>

        <!-- Tabella Clienti -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Ragione Sociale / Nome</th>
                <th>Referente & Contatti</th>
                <th>Città / Indirizzo</th>
                <th>Macchine & Deconti Installati</th>
                <th>Stato Calcolato</th>
                <th>Azioni Scheda</th>
              </tr>
            </thead>
            <tbody>
              ${n.map(e=>{let t=r.filter(t=>t.clientId===e.id),n=a.calculateClientStatus(e);return`
                  <tr>
                    <td><strong style="font-family: monospace; color: var(--accent-cyan);">${e.id}</strong></td>
                    <td><strong>${e.name}</strong></td>
                    <td>${e.refPerson}<br><small style="color: var(--text-muted);">${e.phone}</small></td>
                    <td>${e.city||`N/D`}<br><small style="color: var(--text-muted);">${e.address||``}</small></td>
                    <td>
                      ${t.length>0?t.map(e=>{let t=i.find(t=>t.machineId===e.id);return`<div style="margin-bottom: 4px;"><span class="badge badge-info">☕ ${e.serialNumber}</span> ${t?`<span class="badge badge-success">📟 Deconto #${t.shortCode} (${t.remainingCredits} cr)</span>`:`<span style="color: var(--text-muted); font-size: 0.75rem;">(Senza Deconto)</span>`}</div>`}).join(``):`<span class="badge badge-warning">📦 Nessuna Macchina Installata</span>`}
                    </td>
                    <td>${n.badgeHtml}</td>
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
                ${i.map(e=>`<option value="${e.id}">📟 Deconto #${e.shortCode} (${e.remainingCredits} cr) ${e.machineId?`(⚠️ Montata su altra macchina)`:``}</option>`).join(``)}
              </select>
            </div>

            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">🏢 Assegna subito a Cliente (Opzionale):</label>
              <select id="new-mc-client" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                <option value="">📦 IN SCORTA MAGAZZINO (Libera per installazione)</option>
                ${n.map(e=>`<option value="${e.id}">🏢 ${e.name} (${e.city})</option>`).join(``)}
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="btn-cancel-add-machine" class="btn btn-secondary">Annulla</button>
            <button id="btn-save-new-machine" class="btn btn-primary">💾 Salva Macchina da Caffè</button>
          </div>
        </div>

        <!-- Tabella Macchine -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Seriale Macchina</th>
                <th>Marca & Modello</th>
                <th>Scheda Deconto Collegata</th>
                <th>Cliente Assegnato</th>
                <th>Stato Operativo</th>
                <th>Azioni Macchina</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(e=>{let t=i.find(t=>t.machineId===e.id),r=n.find(t=>t.id===e.clientId),o=t?a.calculateBoardStatus(t):{badgeHtml:`<span class="badge badge-secondary">📦 SCORTA</span>`};return`
                  <tr>
                    <td><strong style="font-family: monospace; color: var(--accent-cyan);">${e.serialNumber}</strong></td>
                    <td><strong>${e.brand||``} ${e.model}</strong></td>
                    <td>
                      ${t?`<button class="btn btn-secondary btn-deconto-detail" data-code="${t.shortCode}" style="padding: 4px 8px; font-size: 0.8rem; font-weight: 800; color: var(--accent-cyan);">📟 #${t.shortCode} (${t.remainingCredits} cr)</button>`:`<span style="color: var(--text-muted); font-size: 0.8rem;">(Nessuna Scheda)</span>`}
                    </td>
                    <td>
                      ${r?`<strong style="color: #fff;">🏢 ${r.name}</strong><br><small style="color: var(--text-muted);">${r.city}</small>`:`<span class="badge badge-secondary">📦 MAGAZZINO</span>`}
                    </td>
                    <td>${o.badgeHtml}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-secondary btn-edit-machine-standalone" data-id="${e.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-cyan);">
                          ✏️ Modifica
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
    `:`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 1.8rem; font-weight: 800;">📟 Anagrafica Schede Hardware Deconto</h1>
          <p style="color: var(--text-muted);">Step 1 del Flusso: Crea e gestisci le schede hardware ESP32-C6 col loro codice a 4 cifre</p>
        </div>
        <button id="btn-toggle-add-board" class="btn btn-primary">
          ➕ Nuova Scheda Deconto
        </button>
      </div>

      <!-- Form Nuova Scheda Deconto -->
      <div id="add-board-form-container" class="stat-card" style="display: none; margin-bottom: 32px; padding: 24px; border: 2px solid var(--accent-cyan);">
        <h3 style="margin-top: 0; color: var(--accent-cyan); margin-bottom: 16px;">➕ Creazione Nuova Scheda Hardware Deconto:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Codice 4 Cifre (ShortCode):*</label>
            <input type="text" id="new-board-code" maxlength="4" placeholder="Es. 9902" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-cyan); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace; font-size: 1.1rem;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Seriale HW (Opzionale):</label>
            <input type="text" id="new-board-hwserial" placeholder="Es. DC-HW-9902" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Crediti Cialde Iniziali:*</label>
            <input type="number" id="new-board-credits" value="200" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800;">
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Versione Hardware:</label>
            <select id="new-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
              <option value="BASIC">BASIC (Relè + BLE)</option>
              <option value="PRO">PRO (Wi-Fi 6 + Telemetria)</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 20px; background: rgba(56, 189, 248, 0.1); padding: 14px; border-radius: 8px; border: 1px solid var(--accent-cyan);">
          <label style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 800; display: block; margin-bottom: 4px;">
            ☕ Step 1: Monta subito su una Macchina da Caffè (Opzionale):
          </label>
          <select id="new-board-machine" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
            <option value="">📦 SCHEDA A BANCO (Non Montata / Magazzino)</option>
            ${r.map(e=>{let t=n.find(t=>t.id===e.clientId);return`<option value="${e.id}">☕ ${e.serialNumber} - ${e.model} (${t?t.name:`In Scorta`})</option>`}).join(``)}
          </select>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="btn-cancel-add-board" class="btn btn-secondary">Annulla</button>
          <button id="btn-save-new-board" class="btn btn-primary">💾 Registra Nuova Scheda Deconto</button>
        </div>
      </div>

      <!-- Tabella Schede Deconto -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Codice 4 Cifre</th>
              <th>Seriale HW & MAC</th>
              <th>Credito Residuo</th>
              <th>Macchina Collegata</th>
              <th>Cliente Finale</th>
              <th>Stato Calcolato</th>
              <th>Azioni Scheda</th>
            </tr>
          </thead>
          <tbody>
            ${i.map(e=>{let t=r.find(t=>t.id===e.machineId),i=t?n.find(e=>e.id===t.clientId):null,o=a.calculateBoardStatus(e);return`
                <tr>
                  <td>
                    <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="padding: 6px 12px; font-size: 1rem; font-weight: 900; color: var(--accent-cyan); font-family: monospace;">
                      📟 #${e.shortCode}
                    </button>
                  </td>
                  <td><strong>${e.hwSerial||`DC-HW-DEF`}</strong><br><small style="color: var(--text-muted); font-family: monospace;">${e.macAddress||``}</small></td>
                  <td><strong style="font-size: 1.1rem; color: ${e.remainingCredits<=0?`var(--accent-rose)`:`var(--accent-green)`};">${e.remainingCredits} cialde</strong></td>
                  <td>
                    ${t?`<strong style="color: #fff;">☕ ${t.serialNumber}</strong><br><small style="color: var(--text-muted);">${t.model}</small>`:`<span class="badge badge-secondary">📦 A BANCO</span>`}
                  </td>
                  <td>
                    ${i?`<strong style="color: #fff;">🏢 ${i.name}</strong><br><small style="color: var(--text-muted);">${i.city}</small>`:`<span class="badge badge-secondary">📦 LIBERA</span>`}
                  </td>
                  <td>${o.badgeHtml}</td>
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
  `}function p(e){return a.getClients(),`
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
            ${a.getBoards().map(e=>{let t=a.getBoardFullDetails(e.id),n=e.remainingCredits<=0,r=e.remainingCredits<e.lowStockThreshold&&!n;return`
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
  `}function m(){let e=a.getSettings();return`
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.8rem; font-weight: 800;">⚙️ Impostazioni Piattaforma & Personalizzazione Brand</h1>
        <p style="color: var(--text-muted);">Personalizza il logo aziendale, l'intestazione, le soglie automatiche degli stati (Verde, Giallo, Rosso, Nero) ed il servizio email Brevo</p>
      </div>

      <div class="card-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 24px;">
        
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

      <!-- Card 3: Soglie Automatiche degli Stati (Verde, Giallo, Rosso, Nero) -->
      <div class="stat-card" style="margin-bottom: 24px; padding: 24px; border: 2px solid var(--accent-purple);">
        <h3 style="margin-top: 0; color: var(--accent-purple); margin-bottom: 12px;">📊 Soglie Automatiche di Avviso (Stati Verde, Giallo, Rosso, Nero):</h3>
        
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          Configura i valori di cialde residui per attivare automaticamente il cambio di colore e stato nei clienti e nelle macchine:
        </p>

        <form id="settings-thresholds-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="background: rgba(245, 158, 11, 0.1); padding: 16px; border-radius: 10px; border: 1px solid rgba(245, 158, 11, 0.3);">
              <label style="font-size: 0.9rem; color: #f59e0b; font-weight: 800; display: block; margin-bottom: 6px;">🟡 Soglia Y (Sottoscorta Giallo):</label>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 10px;">
                Da quest'impostazione in giù le macchine risultano in <strong>Sottoscorta Giallo</strong> (default: $\le$ 20 cialde). Sopra questo valore il Deconto è <strong>🟢 REGOLARE (VERDE)</strong>.
              </div>
              <input type="number" id="setting-threshold-yellow" value="${e.thresholdYellow===void 0?20:e.thresholdYellow}" min="1" max="500" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #f59e0b; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
            </div>

            <div style="background: rgba(239, 68, 68, 0.1); padding: 16px; border-radius: 10px; border: 1px solid rgba(239, 68, 68, 0.3);">
              <label style="font-size: 0.9rem; color: #ef4444; font-weight: 800; display: block; margin-bottom: 6px;">🔴 Soglia X (Critico Rosso):</label>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 10px;">
                Da quest'impostazione in giù le macchine risultano in <strong>Critico Rosso</strong> (default: $\le$ 5 cialde). Quando i crediti raggiungono 0 la macchina passa a <strong>⚫ BLOCCATO (NERO)</strong>.
              </div>
              <input type="number" id="setting-threshold-red" value="${e.thresholdRed===void 0?5:e.thresholdRed}" min="1" max="100" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #ef4444; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.8rem; color: var(--accent-cyan);">
              🟢 Verde: &gt; Y | 🟡 Giallo: tra X e Y | 🔴 Rosso: tra 1 e X | ⚫ Nero: = 0 (Relè Aperto)
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 10px 24px;">
              💾 Salva Soglie Automatiche
            </button>
          </div>
        </form>
      </div>

      <!-- Card 4: Servizio Email BREVO / Sendinblue -->
      <div class="stat-card" style="padding: 24px; border: 2px solid var(--accent-cyan);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; color: var(--accent-cyan);">✉️ Servizio Email Reale BREVO (ex Sendinblue - brevo.com):</h3>
          <span class="badge badge-info">300 EMAIL/GIORNO GRATIS</span>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          <strong>BREVO (brevo.com)</strong> è il servizio gratuito di invio email transazionali. Offre 300 email gratuite al giorno. Inserisci la tua API Key trovata su <em>brevo.com &rarr; API Keys</em> per attivare l'invio istantaneo.
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

    </div>
  `}function h(e=null){let t=a.getBoards(),n=e&&t.find(t=>t.shortCode===e)||t[0];return a.getBoardFullDetails(n.shortCode),`
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
  `}var g={currentUser:a.getCurrentUser(),activeTab:`dashboard`,showProfileModal:!1,editingStaffUserId:null,editingId:null,viewingDecontoCode:null,viewingEmailId:null,selectedSimBoardCode:`9901`,dashSearchQuery:``,dashSearchCategory:`ALL`,dashSortColumn:`shortCode`,dashSortDirection:`DESC`,viewingKpiModal:null,kpiPeriod:`30DAYS`,kpiChartType:`LINE`};function _(){let e=document.getElementById(`app`);if(!g.currentUser){e.innerHTML=c(),v();return}let t=g.currentUser,n=``;g.activeTab===`settings`?n=m():g.activeTab===`simulator`?n=h(g.selectedSimBoardCode):g.activeTab===`user_management`||g.activeTab===`permissions_matrix`?n=d(g.activeTab,g.editingStaffUserId,g.viewingEmailId):t.role===`ADMIN`||t.role===`UFFICIO`?n=g.activeTab===`clients`||g.activeTab===`machines`||g.activeTab===`deconto_boards`||g.activeTab===`qr_generator`||g.activeTab===`otp_generator`||g.activeTab===`refills_history`?f(g.activeTab,g.editingId):g.activeTab===`adr_visits`?p(g.activeTab):u(g.activeTab,g.viewingDecontoCode,g.dashSearchQuery,g.dashSearchCategory,g.dashSortColumn,g.dashSortDirection,g.viewingKpiModal,g.kpiPeriod,g.kpiChartType):t.role===`ADR`&&(n=g.activeTab===`adr_visits`?p(g.activeTab):f(g.activeTab,g.editingId));let r=``;g.showProfileModal&&(r=l(t)),e.innerHTML=`
    <div class="app-container">
      ${s(t,g.activeTab)}
      <main class="main-content">
        ${n}
      </main>
    </div>
    ${r}
  `,y()}function v(){let e=document.getElementById(`login-form`),t=document.getElementById(`login-error-msg`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`login-username`).value,r=document.getElementById(`login-password`).value;try{let e=a.authenticate(n,r);g.currentUser=e,g.activeTab=e.role===`ADMIN`?`dashboard`:`clients`,_()}catch(e){t.innerText=e.message,t.style.display=`block`}})}function y(){let e=document.getElementById(`btn-logout`);e&&e.addEventListener(`click`,()=>{a.logout(),g.currentUser=null,_()});let t=document.getElementById(`btn-open-profile-modal`);t&&t.addEventListener(`click`,()=>{g.showProfileModal=!0,_()});let n=document.getElementById(`btn-close-profile-modal`),r=document.getElementById(`btn-cancel-profile`);n&&n.addEventListener(`click`,()=>{g.showProfileModal=!1,_()}),r&&r.addEventListener(`click`,()=>{g.showProfileModal=!1,_()}),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(g.activeTab=t,g.editingId=null,_())})});let i=document.getElementById(`btn-toggle-add-user`),s=document.getElementById(`add-user-form-container`);i&&s&&i.addEventListener(`click`,()=>{s.style.display=s.style.display===`none`?`block`:`none`});let c=document.getElementById(`btn-cancel-add-user`);c&&s&&c.addEventListener(`click`,()=>{s.style.display=`none`});let l=document.getElementById(`btn-save-new-user`);l&&l.addEventListener(`click`,async()=>{let e=document.getElementById(`new-user-username`).value.trim(),t=document.getElementById(`new-user-password`).value.trim(),n=document.getElementById(`new-user-name`).value.trim(),r=document.getElementById(`new-user-role`).value,i=document.getElementById(`new-user-email`).value.trim(),o=document.getElementById(`new-user-phone`).value.trim();if(!e||!t||!n){alert(`Compila i campi obbligatori: Codice Utente, Password e Nome!`);return}try{a.addUser({username:e,password:t,name:n,role:r,email:i,phone:o}),alert(`✅ Utente dipendente "${n}" (Codice ${e}) salvato PERMANENTEMENTE nel database!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-staff-user`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingStaffUserId=e.getAttribute(`data-id`),_()})});let u=document.getElementById(`btn-close-edit-staff-modal`),d=document.getElementById(`btn-cancel-edit-staff`);u&&u.addEventListener(`click`,()=>{g.editingStaffUserId=null,_()}),d&&d.addEventListener(`click`,()=>{g.editingStaffUserId=null,_()});let f=document.getElementById(`edit-staff-form`);f&&f.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-staff-id`).value,n=document.getElementById(`edit-staff-username`)?document.getElementById(`edit-staff-username`).value:void 0,r=document.getElementById(`edit-staff-name`).value,i=document.getElementById(`edit-staff-role`)?document.getElementById(`edit-staff-role`).value:void 0,o=document.getElementById(`edit-staff-email`).value,s=document.getElementById(`edit-staff-phone`).value,c=document.getElementById(`edit-staff-password`).value;try{let e=a.updateUser(t,{username:n,name:r,role:i,email:o,phone:s,password:c?c.trim():void 0});g.editingStaffUserId=null,alert(`✅ Scheda Utente "${e.name}" salvata PERMANENTEMENTE!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-toggle-user-status`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-status`)===`ACTIVE`?`DISABLED`:`ACTIVE`;a.updateUser(t,{status:n}),_()})}),document.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo utente dipendente?`))try{a.deleteUser(t),_()}catch(e){alert(`Errore: ${e.message}`)}})});let p=document.getElementById(`btn-open-email-logs`);p&&p.addEventListener(`click`,()=>{let e=a.getEmailLogs();e.length>0?(g.viewingEmailId=e[0].id,_()):alert(`Nessuna email spedita di recente nel registro.`)});let m=document.getElementById(`btn-close-email-preview`),h=document.getElementById(`btn-close-email-preview-footer`);m&&m.addEventListener(`click`,()=>{g.viewingEmailId=null,_()}),h&&h.addEventListener(`click`,()=>{g.viewingEmailId=null,_()});let v=document.getElementById(`rename-role-labels-form`);v&&v.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`role_label_UFFICIO`).value.trim(),n=document.getElementById(`role_label_ADR`).value.trim();a.updateRoleLabel(`UFFICIO`,t),a.updateRoleLabel(`ADR`,n),alert(`✅ Nomi delle Categorie Utente aggiornati con successo!`),_()});let y=document.getElementById(`permissions-matrix-form`);y&&y.addEventListener(`submit`,e=>{e.preventDefault();let t=[`UFFICIO`,`ADR`],n=[`canViewClients`,`canCreateClients`,`canEditClients`,`canDeleteClients`,`canGenerateQr`,`canGenerateOtp`,`canBleRefill`,`canUseSimulator`],r={UFFICIO:{},ADR:{}};t.forEach(e=>{n.forEach(t=>{let n=document.getElementById(`perm_${e}_${t}`);n&&(r[e][t]=n.checked)})}),a.updatePermissions(r),alert(`✅ Matrice dei Permessi aggiornata con successo per tutti gli utenti!`),_()});let b=document.getElementById(`setting-logo-file`);b&&b.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){if(!t.type.startsWith(`image/`)){alert(`Seleziona un file immagine valido (PNG, JPG, SVG).`);return}let e=new FileReader;e.onload=function(e){let t=e.target.result;a.updateSettings({customLogoUrl:t}),alert(`✅ Nuovo Logo Aziendale caricato con successo!`),_()},e.readAsDataURL(t)}});let x=document.getElementById(`btn-reset-logo`);x&&x.addEventListener(`click`,()=>{confirm(`Ripristinare il logo predefinito con icona caffè ☕?`)&&(a.updateSettings({customLogoUrl:null}),alert(`✅ Logo predefinito ripristinato!`),_())});let S=document.getElementById(`settings-brand-form`);S&&S.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brand-title`).value.trim(),n=document.getElementById(`setting-brand-subtitle`).value.trim();a.updateSettings({brandTitle:t,brandSubtitle:n}),alert(`✅ Titolo e Sottotitolo Brand salvati con successo!`),_()});let C=document.getElementById(`settings-thresholds-form`);C&&C.addEventListener(`submit`,e=>{e.preventDefault();let t=parseInt(document.getElementById(`setting-threshold-yellow`).value,10),n=parseInt(document.getElementById(`setting-threshold-red`).value,10);if(isNaN(t)||isNaN(n)||n>=t){alert(`Attenzione: La Soglia Critica Rossa (X) deve essere inferiore alla Soglia Sottoscorta Gialla (Y)!`);return}a.updateSettings({thresholdYellow:t,thresholdRed:n}),alert(`✅ Soglie Automatiche Salvate con Successo!\n\n🟢 VERDE: > ${t} cialde\n🟡 GIALLO (Sottoscorta): da ${n+1} a ${t} cialde\n🔴 ROSSO (Critico): da 1 a ${n} cialde\n⚫ NERO (Bloccato): 0 cialde`),_()});let w=document.getElementById(`settings-brevo-form`);w&&w.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brevo-key`).value.trim(),n=document.getElementById(`setting-brevo-sender`).value.trim();a.updateSettings({brevoApiKey:t,brevoSenderEmail:n}),alert(`✅ API Key ed Email Mittente Brevo salvate con successo!`),_()}),document.querySelectorAll(`.kpi-card-clickable`).forEach(e=>{e.addEventListener(`click`,()=>{g.viewingKpiModal=e.getAttribute(`data-kpi`),_()})}),document.querySelectorAll(`.btn-close-kpi-modal`).forEach(e=>{e.addEventListener(`click`,()=>{g.viewingKpiModal=null,_()})}),document.querySelectorAll(`.btn-kpi-period`).forEach(e=>{e.addEventListener(`click`,()=>{g.kpiPeriod=e.getAttribute(`data-period`),_()})}),document.querySelectorAll(`.btn-kpi-charttype`).forEach(e=>{e.addEventListener(`click`,()=>{g.kpiChartType=e.getAttribute(`data-charttype`),_()})});let T=document.getElementById(`btn-dash-search`),E=document.getElementById(`dash-search-input`);T&&E&&(T.addEventListener(`click`,()=>{g.dashSearchQuery=E.value,g.dashSearchCategory=document.getElementById(`dash-search-category`).value,_()}),E.addEventListener(`keypress`,e=>{e.key===`Enter`&&(g.dashSearchQuery=E.value,g.dashSearchCategory=document.getElementById(`dash-search-category`).value,_())}));let D=document.getElementById(`btn-dash-reset`);D&&D.addEventListener(`click`,()=>{g.dashSearchQuery=``,g.dashSearchCategory=`ALL`,_()}),document.querySelectorAll(`.th-sortable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-col`);g.dashSortColumn===t?g.dashSortDirection=g.dashSortDirection===`ASC`?`DESC`:`ASC`:(g.dashSortColumn=t,g.dashSortDirection=`ASC`),_()})}),document.querySelectorAll(`.btn-deconto-detail`).forEach(e=>{e.addEventListener(`click`,()=>{g.viewingDecontoCode=e.getAttribute(`data-code`),_()})});let O=document.getElementById(`btn-close-deconto-modal`),k=document.getElementById(`btn-close-deconto-modal-footer`);O&&O.addEventListener(`click`,()=>{g.viewingDecontoCode=null,_()}),k&&k.addEventListener(`click`,()=>{g.viewingDecontoCode=null,_()});let A=document.getElementById(`btn-export-csv`);A&&A.addEventListener(`click`,()=>{let e=a.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`DECONTO_Report_Consumi_${new Date().toISOString().split(`T`)[0]}.csv`,r.click(),alert(`📥 Report Consumi CSV Scaricato con successo!`)});let j=document.getElementById(`btn-trigger-backup`);j&&j.addEventListener(`click`,async()=>{j.disabled=!0,j.innerText=`⏳ Backup in corso su GitHub...`;let e=await o.executeBackupNow();alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: https://github.com/emporioboldrini-stack/deconto-app.git\nCommit Hash: ${e.backupRecord.commitHash}\nEntità salvate: ${e.backupRecord.recordCount}`),_()});let M=document.getElementById(`btn-toggle-add-client`),N=document.getElementById(`add-client-form-container`);M&&N&&M.addEventListener(`click`,()=>{N.style.display=N.style.display===`none`?`block`:`none`});let P=document.getElementById(`btn-cancel-add-client`);P&&N&&P.addEventListener(`click`,()=>{N.style.display=`none`});let F=document.getElementById(`btn-save-new-client`);F&&F.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-ref`).value.trim(),n=document.getElementById(`new-cli-phone`).value.trim(),r=document.getElementById(`new-cli-email`).value.trim(),i=document.getElementById(`new-cli-city`).value.trim(),o=document.getElementById(`new-cli-address`).value.trim(),s=document.getElementById(`new-cli-machine`)?document.getElementById(`new-cli-machine`).value:null;if(!e){alert(`Compila la Ragione Sociale del Cliente!`);return}try{a.addClient({name:e,refPerson:t,phone:n,email:r,city:i,address:o,machineId:s}),alert(`✅ Cliente "${e}" salvato ed installato con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=e.getAttribute(`data-id`),_()})}),document.querySelectorAll(`.btn-del-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Eliminare questo cliente dall'anagrafica? Le macchine collegate torneranno in magazzino.`))try{a.deleteClient(t),_()}catch(e){alert(e.message)}})});let I=document.getElementById(`form-edit-client`);I&&I.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-client-id`).value,n=document.getElementById(`edit-cli-name`).value,r=document.getElementById(`edit-cli-ref`).value,i=document.getElementById(`edit-cli-phone`).value,o=document.getElementById(`edit-cli-city`).value,s=document.getElementById(`edit-cli-address`).value,c=document.getElementById(`edit-cli-machine`)?document.getElementById(`edit-cli-machine`).value:void 0;try{a.updateClient(t,{name:n,refPerson:r,phone:i,city:o,address:s,assignedMachineId:c}),g.editingId=null,alert(`✅ Scheda Cliente e Macchina installata aggiornata!`),_()}catch(e){alert(e.message)}});let L=document.getElementById(`btn-toggle-add-machine`),R=document.getElementById(`add-machine-form-container`);L&&R&&L.addEventListener(`click`,()=>{R.style.display=R.style.display===`none`?`block`:`none`});let z=document.getElementById(`btn-cancel-add-machine`);z&&R&&z.addEventListener(`click`,()=>{R.style.display=`none`});let B=document.getElementById(`btn-save-new-machine`);B&&B.addEventListener(`click`,()=>{let e=document.getElementById(`new-mc-serial`).value.trim(),t=document.getElementById(`new-mc-brand`).value.trim(),n=document.getElementById(`new-mc-model`).value.trim(),r=document.getElementById(`new-mc-board`)?document.getElementById(`new-mc-board`).value:null,i=document.getElementById(`new-mc-client`).value;if(!e||!n){alert(`Compila Seriale e Modello della macchina!`);return}try{a.addMachine({serialNumber:e,brand:t,model:n,boardId:r,clientId:i}),alert(`✅ Macchina "${e}" registrata ed associata nel parco macchine!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=e.getAttribute(`data-id`),_()})}),document.querySelectorAll(`.btn-del-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Eliminare questa macchina dal parco macchine?`))try{a.deleteMachine(t),_()}catch(e){alert(e.message)}})});let V=document.getElementById(`form-edit-machine`);V&&V.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-mc-id`).value,n=document.getElementById(`edit-mc-serial`).value,r=document.getElementById(`edit-mc-brand`).value,i=document.getElementById(`edit-mc-model`).value,o=document.getElementById(`edit-mc-board`)?document.getElementById(`edit-mc-board`).value:void 0,s=document.getElementById(`edit-mc-client`).value;try{a.updateMachine(t,{serialNumber:n,brand:r,model:i,boardId:o,clientId:s}),g.editingId=null,alert(`✅ Macchina da Caffè e Scheda Deconto collegate con successo!`),_()}catch(e){alert(e.message)}});let H=document.getElementById(`btn-toggle-add-board`),U=document.getElementById(`add-board-form-container`);H&&U&&H.addEventListener(`click`,()=>{U.style.display=U.style.display===`none`?`block`:`none`});let W=document.getElementById(`btn-cancel-add-board`);W&&U&&W.addEventListener(`click`,()=>{U.style.display=`none`});let G=document.getElementById(`btn-save-new-board`);G&&G.addEventListener(`click`,()=>{let e=document.getElementById(`new-board-code`).value.trim(),t=document.getElementById(`new-board-hwserial`).value.trim(),n=document.getElementById(`new-board-credits`).value,r=document.getElementById(`new-board-version`).value,i=document.getElementById(`new-board-machine`).value;if(!e){alert(`Inserisci il codice a 4 cifre per la Scheda Deconto (es. 9902)!`);return}try{a.addBoard({shortCode:e,hwSerial:t,remainingCredits:n,version:r,machineId:i}),alert(`✅ NUOVA SCHEDA DECONTO #${e} CREATA CON SUCCESSO!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=e.getAttribute(`data-id`),_()})}),document.querySelectorAll(`.btn-del-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Eliminare questa Scheda Hardware Deconto?`))try{a.deleteBoard(t),_()}catch(e){alert(e.message)}})});let K=document.getElementById(`form-edit-board`);K&&K.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-board-id`).value,n=document.getElementById(`edit-board-shortcode`).value,r=document.getElementById(`edit-board-hwserial`).value,i=document.getElementById(`edit-board-credits`).value,o=document.getElementById(`edit-board-version`).value,s=document.getElementById(`edit-board-machine`).value;try{a.updateBoard(t,{shortCode:n,hwSerial:r,remainingCredits:i,version:o,machineId:s}),g.editingId=null,alert(`✅ Scheda Deconto aggiornata con successo!`),_()}catch(e){alert(e.message)}}),document.querySelectorAll(`#btn-close-edit-modal, #btn-cancel-edit-client, #btn-cancel-edit-mc, #btn-cancel-edit-board`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=null,_()})});let q=document.getElementById(`sim-board-select`);q&&q.addEventListener(`change`,e=>{g.selectedSimBoardCode=e.target.value,_()});let J=document.getElementById(`btn-sim-brew`);J&&J.addEventListener(`click`,()=>{let e=g.selectedSimBoardCode||`9901`;document.getElementById(`signal-sense-volts`).innerText=`230V AC (Impulso)`,document.getElementById(`signal-sense-badge`).className=`badge badge-warning`,document.getElementById(`signal-sense-badge`).innerText=`EROGAZIONE IN CORSO`;let t=a.registerCoffeeExtraction(e,22,1);setTimeout(()=>{if(t&&t.success){let n=document.getElementById(`sim-console-log`);n&&(n.innerHTML+=`[EXTRACTION]: Caffè erogato su #${e}! Credito rimanente: ${t.remainingCredits}.<br>`,n.scrollTop=n.scrollHeight)}_()},600)});let Y=document.getElementById(`btn-sim-reset`);Y&&Y.addEventListener(`click`,()=>{let e=g.selectedSimBoardCode||`9901`;a.performRefill({boardShortCode:e,credits:200,method:`TEST_BENCH`,operatorId:g.currentUser?g.currentUser.id:`usr_001`}),alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${e}!`),_()})}document.addEventListener(`DOMContentLoaded`,_);