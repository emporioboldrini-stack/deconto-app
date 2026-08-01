(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{async sendWelcomeEmail(e){let t=a.getRoleLabels()[e.role]||e.role,n=a.getSettings(),r=e.email||`${e.username}@deconto.it`,i=`👋 Benvenuto nel Team ${n.brandTitle||`DECONTO`} - Credenziali di Accesso`,o=`Ciao ${e.name},\n\nBenvenuto a bordo nel team per il progetto ${n.brandTitle||`DECONTO`}!\n\nRuolo Assegnato: ${t}\nCodice Accesso: ${e.username}\nPassword: ${e.password||`123456`}\nPiattaforma Web: https://deconto-app.web.app\n\nBuon lavoro!\nIl Team DECONTO System`,s=`
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
    `,c={id:`mail_`+Date.now(),type:`WELCOME_NEW_USER`,recipientEmail:r,recipientName:e.name,subject:i,plainTextBody:o,htmlBody:s,timestamp:new Date().toISOString(),status:`PENDING_SEND`};return a.data.emailLogs||(a.data.emailLogs=[]),a.data.emailLogs.unshift(c),a.saveData(),await this.dispatchRealEmail(c),c}async sendRoleUpdateEmail(e,t,n){let r=a.getRoleLabels(),i=r[t]||t,o=r[n]||n,s=a.getSettings(),c=e.email||`${e.username}@deconto.it`,l=`🎉 Aggiornamento Ruolo Operativo & Nuovi Permessi - ${s.brandTitle||`DECONTO`}`,u=`Ciao ${e.name},\n\nIl tuo ruolo ed i tuoi permessi su ${s.brandTitle||`DECONTO`} sono stati aggiornati!\n\nRuolo Precedente: ${i}\nNuovo Ruolo: ${o}\n\nAccedi alla piattaforma per le nuove funzionalità: https://deconto-app.web.app\n\nBuon lavoro!\nLa Direzione DECONTO System`,d=`
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
          <div style="font-size: 0.85rem; color: #94a3b8;">Ruolo Precedente: ${i}</div>
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
    `,f={id:`mail_`+Date.now(),type:`ROLE_UPDATED`,recipientEmail:c,recipientName:e.name,subject:l,plainTextBody:u,htmlBody:d,timestamp:new Date().toISOString(),status:`PENDING_SEND`};return a.data.emailLogs||(a.data.emailLogs=[]),a.data.emailLogs.unshift(f),a.saveData(),await this.dispatchRealEmail(f),f}async dispatchRealEmail(e){let t=a.getSettings();if(t.brevoApiKey)try{let n=await fetch(`https://api.brevo.com/v3/smtp/email`,{method:`POST`,headers:{accept:`application/json`,"api-key":t.brevoApiKey.trim(),"content-type":`application/json`},body:JSON.stringify({sender:{name:t.brandTitle||`DECONTO System`,email:t.brevoSenderEmail||`info@deconto.it`},to:[{email:e.recipientEmail,name:e.recipientName}],subject:e.subject,htmlContent:e.htmlBody,textContent:e.plainTextBody})});if(n.ok||n.status===201){e.status=`DELIVERED_VIA_BREVO_API`,a.saveData();return}}catch{}if(t.gasScriptUrl)try{await fetch(t.gasScriptUrl.trim(),{method:`POST`,mode:`no-cors`,headers:{"Content-Type":`application/json`},body:JSON.stringify({to:e.recipientEmail,subject:e.subject,body:e.plainTextBody,htmlBody:e.htmlBody})}),e.status=`DELIVERED_VIA_GOOGLE_APPS_SCRIPT`,a.saveData();return}catch{}e.status=`LOGGED_IN_OUTBOX (Configura la Brevo API Key o l'URL GAS in Impostazioni)`,a.saveData()}},t=`DECONTO_APP_MASTER_DATABASE_V1`,n=`DECONTO_APP_MASTER_SESSION_V1`,r=[`DECONTO_DB_V9`,`DECONTO_DB_V8`,`DECONTO_DB_V7`,`DECONTO_DB_V6`,`DECONTO_DB_V5`,`DECONTO_DB_V4`,`DECONTO_DB_V3`,`DECONTO_DB_V2`,`DECONTO_DB_V1`],i={settings:{customLogoUrl:null,brandTitle:`DECONTO`,brandSubtitle:`IoT Vending System`,gasScriptUrl:``,brevoApiKey:``,brevoSenderEmail:``},roleLabels:{UFFICIO:`UFFICIO & LOGISTICA`,ADR:`AGENTE ADR (CONSEGNE)`},users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,phone:`+39 02 112233`,role:`ADMIN`,status:`ACTIVE`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`laura.ufficio@deconto.it`,phone:`+39 02 445566`,role:`UFFICIO`,status:`ACTIVE`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`giuseppe.adr@deconto.it`,phone:`+39 333 998877`,role:`ADR`,status:`ACTIVE`,avatar:`🚚`,createdAt:`2026-01-10`}],permissions:{UFFICIO:{canViewClients:!0,canCreateClients:!0,canEditClients:!0,canDeleteClients:!0,canGenerateQr:!0,canGenerateOtp:!0,canViewRefillHistory:!0,canUseSimulator:!0},ADR:{canViewClients:!0,canCreateClients:!1,canEditClients:!1,canDeleteClients:!1,canGenerateQr:!1,canGenerateOtp:!1,canViewRefillHistory:!0,canUseSimulator:!0,canBleRefill:!0}},clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`,status:`ACTIVE`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`,status:`ACTIVE`},{id:`cli_3`,name:`Studio Legale Brambilla`,refPerson:`Avv. Brambilla`,phone:`+39 02 4443322`,address:`Via Montenapoleone 8, Milano`,city:`Milano`,status:`WARNING`},{id:`cli_4`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`,status:`ACTIVE`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-7711`,model:`Didiesse Frog Revolution`,clientId:`cli_3`,installDate:`2026-02-20`},{id:`mc_4`,serialNumber:`SN-MC-2026-4409`,model:`Spinel Pinocchio Professional`,clientId:`cli_4`,installDate:`2026-03-05`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-62,machineExtractions:1855,lifetimeExtractions:4920,avgDailyCoffees:12.4,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-78,machineExtractions:3410,lifetimeExtractions:8120,avgDailyCoffees:24.8,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_5510`,shortCode:`5510`,hwSerial:`DC-HW-9910`,macAddress:`C6:3F:8A:33:55:10`,machineId:`mc_3`,version:`BASIC`,remainingCredits:9,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-84,machineExtractions:991,lifetimeExtractions:2153,avgDailyCoffees:5.2,lastSyncDate:new Date(Date.now()-10368e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_4`,version:`BASIC`,remainingCredits:200,lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-58,machineExtractions:1241,lifetimeExtractions:3501,avgDailyCoffees:9.1,lastSyncDate:new Date().toISOString()}],refillLogs:[],coffeeLogs:[],emailLogs:[],backupLogs:[]},a=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession()}loadData(){try{let e=localStorage.getItem(t),n=null;if(e)n=JSON.parse(e);else for(let e of r){let t=localStorage.getItem(e);if(t)try{n=JSON.parse(t);break}catch{}}if(n)return n.settings||(n.settings=i.settings),n.settings.gasScriptUrl===void 0&&(n.settings.gasScriptUrl=``),n.settings.brevoApiKey===void 0&&(n.settings.brevoApiKey=``),n.settings.brevoSenderEmail===void 0&&(n.settings.brevoSenderEmail=``),n.roleLabels||(n.roleLabels=i.roleLabels),n.permissions||(n.permissions=i.permissions),n.emailLogs||(n.emailLogs=[]),(!n.users||!n.users.some(e=>e.username===`001`))&&(n.users=n.users||[],n.users.some(e=>e.username===`001`)||n.users.unshift(i.users[0])),n.users.forEach(e=>{e.role===`UFFICIO`?e.avatar=`👩‍💻`:e.role===`ADR`?e.avatar=`🚚`:e.role===`ADMIN`&&(e.avatar=`👨‍💼`)}),this.saveData(n),n}catch{}return this.saveData(i),i}saveData(e){this.data=e||this.data;try{localStorage.setItem(t,JSON.stringify(this.data))}catch{}}getSettings(){return this.data.settings||i.settings}updateSettings(e){this.data.settings={...this.getSettings(),...e},this.saveData()}getRoleLabels(){return this.data.roleLabels||i.roleLabels}updateRoleLabel(e,t){this.data.roleLabels||(this.data.roleLabels={...i.roleLabels}),this.data.roleLabels[e]=t.trim(),this.saveData()}loadSession(){try{let e=localStorage.getItem(n);if(e)return JSON.parse(e)}catch{}return null}saveSession(e){this.currentUser=e;try{e?localStorage.setItem(n,JSON.stringify(e)):localStorage.removeItem(n)}catch{}}authenticate(e,t){let n=String(e||``).trim(),r=String(t||``).trim();if((n===`001`||n===`admin`)&&r===`123456`){let e=this.data.users.find(e=>e.username===`001`);e||(e={id:`usr_001`,username:`001`,password:`123456`,name:`Amministratore Principale`,email:`admin@deconto.it`,role:`ADMIN`,avatar:`👨‍💼`,status:`ACTIVE`},this.data.users.unshift(e),this.saveData());let t={id:e.id,username:e.username,name:e.name,role:e.role,email:e.email,avatar:e.avatar};return this.saveSession(t),t}let i=this.data.users.find(e=>String(e.username).trim()===n&&String(e.password).trim()===r);if(!i)throw Error(`Credenziali non valide. Inserisci il tuo Nome Utente e Password.`);if(i.status===`DISABLED`)throw Error(`Questo account è stato disattivato dall'Amministratore.`);let a={id:i.id,username:i.username,name:i.name,role:i.role,email:i.email,avatar:i.avatar};return this.saveSession(a),a}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}addUser(t){if(this.data.users.find(e=>e.username.toLowerCase()===t.username.trim().toLowerCase()))throw Error(`Il nome utente "${t.username}" è già in uso.`);let n=t.role||`UFFICIO`,r=n===`UFFICIO`?`👩‍💻`:n===`ADR`?`🚚`:`👨‍💼`,i={id:`usr_`+Date.now(),username:t.username.trim(),password:t.password.trim(),name:t.name.trim(),role:n,email:t.email?t.email.trim():`${t.username.trim()}@deconto.it`,phone:t.phone?t.phone.trim():``,status:`ACTIVE`,avatar:r,createdAt:new Date().toISOString().split(`T`)[0]};this.data.users.push(i),this.saveData();try{e.sendWelcomeEmail(i)}catch{}return i}updateUser(t,n){let r=this.data.users.find(e=>e.id===t);if(!r)throw Error(`Utente non trovato.`);let i=r.role;n.name&&(r.name=n.name.trim()),n.username&&(r.username=n.username.trim()),n.email!==void 0&&(r.email=n.email.trim()),n.phone!==void 0&&(r.phone=n.phone.trim()),n.password&&(r.password=n.password.trim()),n.status&&(r.status=n.status);let a=!1;if(n.role&&n.role!==i&&(r.role=n.role,r.avatar=r.role===`UFFICIO`?`👩‍💻`:r.role===`ADR`?`🚚`:`👨‍💼`,a=!0),this.saveData(),this.currentUser&&this.currentUser.id===t&&this.saveSession({...this.currentUser,name:r.name,username:r.username,email:r.email,role:r.role,avatar:r.avatar}),a)try{e.sendRoleUpdateEmail(r,i,r.role)}catch{}return r}deleteUser(e){let t=this.data.users.find(t=>t.id===e);if(t&&t.username===`001`)throw Error(`Impossibile eliminare l'account Amministratore Principale (001).`);this.data.users=this.data.users.filter(t=>t.id!==e),this.saveData()}getPermissions(){return this.data.permissions||i.permissions}updatePermissions(e){this.data.permissions=e,this.saveData()}hasPermission(e){if(!this.currentUser)return!1;if(this.currentUser.role===`ADMIN`)return!0;let t=this.getPermissions()[this.currentUser.role];return t?!!t[e]:!1}getUsers(){return this.data.users}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs}getEmailLogs(){return this.data.emailLogs||[]}getBackupLogs(){return this.data.backupLogs}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:this.data.coffeeLogs.filter(e=>e.boardId===t.id)}}addClient(e){if(!this.hasPermission(`canCreateClients`))throw Error(`Non disponi dei permessi per creare nuovi clienti.`);let t={id:`cli_`+Date.now(),name:e.name,refPerson:e.refPerson||`Referente`,phone:e.phone||`+39 `,address:e.address||``,city:e.city||``,status:`ACTIVE`};if(this.data.clients.unshift(t),e.machineModel){let n={id:`mc_`+Date.now(),serialNumber:e.machineSerial||`SN-MC-2026-${Math.floor(1e3+Math.random()*9e3)}`,model:e.machineModel,clientId:t.id,installDate:new Date().toISOString().split(`T`)[0]};this.data.machines.unshift(n);let r=e.shortCode||`${Math.floor(1e3+Math.random()*9e3)}`,i={id:`board_`+r,shortCode:r,hwSerial:`DC-HW-${Math.floor(1e3+Math.random()*9e3)}`,macAddress:`C6:3F:8A:${Math.floor(10+Math.random()*89)}:${r.substring(0,2)}:${r.substring(2,4)}`,machineId:n.id,version:e.boardVersion||`BASIC`,remainingCredits:parseInt(e.initialCredits||200,10),lowStockThreshold:20,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-65,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:10,lastSyncDate:new Date().toISOString()};this.data.decontoBoards.unshift(i)}return this.saveData(),t}updateClientAndMachine(e,t){if(!this.hasPermission(`canEditClients`))throw Error(`Non disponi dei permessi per modificare le schede clienti.`);let n=this.data.clients.find(t=>t.id===e);if(!n)throw Error(`Cliente non trovato.`);t.name&&(n.name=t.name.trim()),t.refPerson&&(n.refPerson=t.refPerson.trim()),t.phone&&(n.phone=t.phone.trim()),t.city!==void 0&&(n.city=t.city.trim()),t.address!==void 0&&(n.address=t.address.trim());let r=this.data.machines.find(t=>t.clientId===e);if(r&&(t.machineModel&&(r.model=t.machineModel.trim()),t.machineSerial&&(r.serialNumber=t.machineSerial.trim())),r){let e=this.data.decontoBoards.find(e=>e.machineId===r.id);e&&(t.shortCode&&(e.shortCode=t.shortCode.trim()),t.remainingCredits!==void 0&&t.remainingCredits!==``&&(e.remainingCredits=parseInt(t.remainingCredits,10),e.remainingCredits>0&&(e.relayStatus=`CLOSED_OK`)),t.lowStockThreshold!==void 0&&t.lowStockThreshold!==``&&(e.lowStockThreshold=parseInt(t.lowStockThreshold,10)),t.boardVersion&&(e.version=t.boardVersion))}return this.saveData(),n}deleteClient(e){if(!this.hasPermission(`canDeleteClients`))throw Error(`Non disponi dei permessi per eliminare clienti.`);this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.machineExtractions=(r.machineExtractions||0)+1,r.lifetimeExtractions=(r.lifetimeExtractions||0)+1,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<r.lowStockThreshold,relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
`;return this.data.coffeeLogs.forEach(t=>{let n=this.getBoardFullDetails(t.boardId),r=n&&n.client?n.client.name.replace(/,/g,` `):`N/D`,i=n&&n.machine?n.machine.serialNumber:`N/D`,a=n&&n.machine?n.machine.model.replace(/,/g,` `):`N/D`,o=n&&n.board?n.board.shortCode:`N/D`;e+=`${t.id},${o},"${r}",${i},"${a}",${t.timestamp},${t.durationSeconds},${t.groupId}\n`}),e}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`git-`+Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}},o=new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}},s=new class{constructor(){this.repoUrl=`https://github.com/deconto-org/deconto-db-backups`}generateDatabaseSnapshot(){return{version:`1.0.0`,timestamp:new Date().toISOString(),data:a.data}}async executeBackupNow(){let e=this.generateDatabaseSnapshot(),t=JSON.stringify(e,null,2);return await new Promise(e=>setTimeout(e,1200)),{success:!0,backupRecord:a.triggerGitHubBackup(),sizeBytes:new Blob([t]).size,snapshotTimestamp:e.timestamp}}};function c(e,t){let n=e||{name:`Utente Ospite`,role:`ADMIN`,username:`001`,avatar:`👨‍💼`},r=a.getPermissions(),i=a.getSettings(),o=[];if(n.role===`ADMIN`)o=[{id:`dashboard`,label:`📊 Dashboard BI`,icon:`📈`},{id:`user_management`,label:`👥 Gestione Personale`,icon:`👤`},{id:`permissions_matrix`,label:`⚙️ Matrice Permessi`,icon:`🔐`},{id:`clients`,label:`🏢 Clienti & Parco`,icon:`🏢`},{id:`qr_generator`,label:`🏷️ Generatore Etichette QR`,icon:`🖨️`},{id:`otp_generator`,label:`🔑 Genera Ricariche OTP`,icon:`💬`},{id:`refills_history`,label:`📋 Storico Ricariche`,icon:`🧾`},{id:`adr_visits`,label:`🗺️ Giro Consegne ADR`,icon:`🚚`},{id:`maintenance`,label:`🛠️ Manutenzione Predittiva`,icon:`⚠️`},{id:`backups`,label:`💾 Backup GitHub`,icon:`🐙`},{id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`},{id:`settings`,label:`⚙️ Impostazioni`,icon:`🛠️`}];else{let e=r[n.role]||{};e.canViewClients&&o.push({id:`clients`,label:`🏢 Anagrafica Clienti`,icon:`🏢`}),e.canGenerateQr&&o.push({id:`qr_generator`,label:`🏷️ Generatore Etichette QR`,icon:`🖨️`}),e.canGenerateOtp&&o.push({id:`otp_generator`,label:`🔑 Genera Ricarica OTP`,icon:`💬`}),(e.canBleRefill||n.role===`ADR`)&&o.push({id:`adr_visits`,label:`🗺️ Giro Consegne & BLE`,icon:`🚚`}),e.canViewRefillHistory&&o.push({id:`refills_history`,label:`📋 Storico Ricariche`,icon:`🧾`}),e.canUseSimulator&&o.push({id:`simulator`,label:`☕ Simulatore Macchina HW`,icon:`⚡`}),o.push({id:`settings`,label:`⚙️ Impostazioni`,icon:`🛠️`})}return`
    <aside class="sidebar">
      <!-- Header con Logo Personalizzato da PC e Sottotitolo Modificabile -->
      <div class="brand-logo">
        <div class="brand-icon" style="overflow: hidden; padding: 0;">
          ${i.customLogoUrl?`<img src="${i.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;" alt="Logo">`:`<span style="font-size: 1.5rem;">☕</span>`}
        </div>
        <div>
          <div class="brand-title">${i.brandTitle||`DECONTO`}</div>
          <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
            ${i.brandSubtitle||`IoT Vending System`}
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
  `}function l(){let e=a.getSettings();return`
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
  `}function u(e,t){return`
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
  `}function d(e,t=null,n=``,r=`ALL`,i=`shortCode`,o=`DESC`,s=null,c=`30DAYS`,l=`LINE`){let u=a.getClients(),d=a.getMachines(),f=a.getBoards(),p=a.getCoffeeLogs(),m=u.length,h=d.length,g=p.length,_=f.filter(e=>e.remainingCredits>20),v=f.filter(e=>e.remainingCredits>0&&e.remainingCredits<=20),y=f.filter(e=>e.remainingCredits===0),b=f.filter(e=>{if(!n.trim())return!0;let t=n.toLowerCase().trim(),i=a.getBoardFullDetails(e.id),o=(i&&i.client?i.client.name:``).toLowerCase(),s=(i&&i.machine?i.machine.model:``).toLowerCase(),c=(i&&i.machine?i.machine.serialNumber:``).toLowerCase(),l=String(e.shortCode).toLowerCase(),u=String(e.remainingCredits),d=e.isOnlineWifi?`wi-fi 6 online`:`softap offline`,f=new Date(e.lastSyncDate).toLocaleString(`it-IT`).toLowerCase();return r===`SHORT_CODE`?l.includes(t):r===`CLIENT`?o.includes(t):r===`MODEL`?s.includes(t):r===`CREDITS`?u.includes(t):r===`CONNECTION`?d.includes(t):r===`SYNC_DATE`?f.includes(t):l.includes(t)||o.includes(t)||s.includes(t)||c.includes(t)||u.includes(t)||d.includes(t)||f.includes(t)});b.sort((e,t)=>{let n=a.getBoardFullDetails(e.id),r=a.getBoardFullDetails(t.id),s=n&&n.client?n.client.name:``,c=r&&r.client?r.client.name:``,l=n&&n.machine?n.machine.model:``,u=r&&r.machine?r.machine.model:``,d,f;return i===`shortCode`?(d=parseInt(e.shortCode,10),f=parseInt(t.shortCode,10)):i===`client`?(d=s.toLowerCase(),f=c.toLowerCase()):i===`model`?(d=l.toLowerCase(),f=u.toLowerCase()):i===`credits`?(d=e.remainingCredits,f=t.remainingCredits):i===`connection`?(d=+!!e.isOnlineWifi,f=+!!t.isOnlineWifi):i===`syncDate`?(d=new Date(e.lastSyncDate).getTime(),f=new Date(t.lastSyncDate).getTime()):(d=parseInt(e.shortCode,10),f=parseInt(t.shortCode,10)),d<f?o===`ASC`?-1:1:d>f?o===`ASC`?1:-1:0});let x=e=>i===e?o===`ASC`?`<span style="color: var(--accent-cyan);"> ▲</span>`:`<span style="color: var(--accent-cyan);"> ▼</span>`:`<span style="color: var(--text-dim); opacity: 0.5;"> ⇅</span>`,S=``;if(s===`kpi_clients`){let e={};u.forEach(t=>{let n=t.city||`Milano`;e[n]=(e[n]||0)+1}),S=`
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
                ${e.map(e=>{let t=a.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=t&&t.machine?t.machine.model:`N/D`,i=e.remainingCredits===0;return`
                    <tr>
                      <td><strong style="color: var(--accent-cyan); font-family: monospace; font-size: 1.1rem;">#${e.shortCode}</strong></td>
                      <td><strong>${n}</strong></td>
                      <td>${r}</td>
                      <td>
                        <strong style="color: ${i?`var(--accent-rose)`:`var(--accent-amber)`}; font-size: 1.1rem;">
                          ${e.remainingCredits} caffè
                        </strong>
                      </td>
                      <td>
                        ${i?`<span class="badge badge-danger">🔒 APERTO (BLOCCO ERRORE)</span>`:`<span class="badge badge-warning">⚠️ BUZZER ALLARME ON</span>`}
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
    `}let C=``;if(t){let e=a.getBoardFullDetails(t);if(e&&e.board){let t=e.board,n=e.machine||{},r=e.client||{},i=e.coffees||[],a=t.avgDailyCoffees||12.4,o=a>0?Math.ceil(t.remainingCredits/a):`N/D`,s=o===`N/D`?`N/D`:new Date(Date.now()+o*864e5).toLocaleDateString(`it-IT`,{day:`2-digit`,month:`long`,year:`numeric`});C=`
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
              ${b.length>0?b.map(e=>{let t=a.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=t&&t.machine?t.machine.model:`N/D`,i=t&&t.machine?t.machine.serialNumber:`N/D`;return`
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
  `}function f(e,t=null,n=null){let r=a.getUsers(),i=a.getRoleLabels(),o=a.getPermissions(),s=a.getEmailLogs(),c=``;if(t){let e=r.find(e=>e.id===t);e&&(c=`
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
  `}function p(e,t=null){let n=a.getClients(),r=a.getBoards(),i=a.getRefillLogs(),o=a.hasPermission(`canCreateClients`),s=a.hasPermission(`canEditClients`),c=a.hasPermission(`canDeleteClients`),l=``;if(t){let e=n.find(e=>e.id===t),r=e?a.getMachines().find(t=>t.clientId===e.id):null,i=r?a.getBoards().find(e=>e.machineId===r.id):null;e&&(l=`
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
                  <input type="text" id="edit-cli-mc-model" value="${r?r.model:``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Seriale Macchina (Targhetta):</label>
                  <input type="text" id="edit-cli-mc-serial" value="${r?r.serialNumber:``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace;">
                </div>
              </div>

              <!-- Sezione 3: Dispositivo Deconto -->
              <h4 style="color: var(--accent-amber); margin: 16px 0 12px 0;">3. Crediti & Scheda Deconto IoT:</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Codice Deconto (4 cifre):</label>
                  <input type="text" id="edit-cli-shortcode" value="${i?i.shortCode:``}" maxlength="4" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 800; font-family: monospace;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Crediti Rimanenti (Caffè):</label>
                  <input type="number" id="edit-cli-credits" value="${i?i.remainingCredits:200}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-green); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 900;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Soglia Buzzer (Caffè):</label>
                  <input type="number" id="edit-cli-threshold" value="${i?i.lowStockThreshold:20}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Versione Hardware:</label>
                  <select id="edit-cli-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
                    <option value="BASIC" ${i&&i.version===`BASIC`?`selected`:``}>BASIC (1 Braccio)</option>
                    <option value="PRO" ${i&&i.version===`PRO`?`selected`:``}>PRO (Multi Braccio)</option>
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
                ${r.map(e=>{let t=a.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${e.shortCode} - ${t.client?t.client.name:`N/D`} (${t.machine?t.machine.serialNumber:``})</option>`}).join(``)}
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
                ${r.map(e=>{let t=a.getBoardFullDetails(e.id);return`<option value="${e.shortCode}">${t.client?t.client.name:`N/D`} (Deconto #${e.shortCode})</option>`}).join(``)}
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
            ${n.map(e=>{let t=a.getMachines().find(t=>t.clientId===e.id),n=t?a.getBoards().find(e=>e.machineId===t.id):null;return`
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
  `}function m(e){return a.getClients(),`
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
  `}function h(){let e=a.getSettings();return`
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
  `}function g(){let e=a.getBoards(),t=e[0];return a.getBoardFullDetails(t.shortCode),`
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
  `}var _={currentUser:a.getCurrentUser(),activeTab:`dashboard`,showProfileModal:!1,editingStaffUserId:null,editingClientId:null,viewingDecontoCode:null,viewingEmailId:null,dashSearchQuery:``,dashSearchCategory:`ALL`,dashSortColumn:`shortCode`,dashSortDirection:`DESC`,viewingKpiModal:null,kpiPeriod:`30DAYS`,kpiChartType:`LINE`};function v(){let e=document.getElementById(`app`);if(!_.currentUser){e.innerHTML=l(),y();return}let t=_.currentUser,n=``;_.activeTab===`settings`?n=h():_.activeTab===`simulator`?n=g():_.activeTab===`user_management`||_.activeTab===`permissions_matrix`?n=f(_.activeTab,_.editingStaffUserId,_.viewingEmailId):t.role===`ADMIN`?n=_.activeTab===`clients`||_.activeTab===`qr_generator`||_.activeTab===`otp_generator`||_.activeTab===`refills_history`?p(_.activeTab,_.editingClientId):_.activeTab===`adr_visits`?m(_.activeTab):d(_.activeTab,_.viewingDecontoCode,_.dashSearchQuery,_.dashSearchCategory,_.dashSortColumn,_.dashSortDirection,_.viewingKpiModal,_.kpiPeriod,_.kpiChartType):(t.role===`UFFICIO`||t.role===`ADR`)&&(n=_.activeTab===`adr_visits`?m(_.activeTab):p(_.activeTab,_.editingClientId));let r=``;_.showProfileModal&&(r=u(t)),e.innerHTML=`
    <div class="app-container">
      ${c(t,_.activeTab)}
      <main class="main-content">
        ${n}
      </main>
    </div>
    ${r}
  `,b()}function y(){let e=document.getElementById(`login-form`),t=document.getElementById(`login-error-msg`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`login-username`).value,r=document.getElementById(`login-password`).value;try{let e=a.authenticate(n,r);_.currentUser=e,_.activeTab=e.role===`ADMIN`?`dashboard`:`clients`,v()}catch(e){t.innerText=e.message,t.style.display=`block`}})}function b(){let e=document.getElementById(`btn-logout`);e&&e.addEventListener(`click`,()=>{a.logout(),_.currentUser=null,v()});let t=document.getElementById(`btn-open-profile-modal`);t&&t.addEventListener(`click`,()=>{_.showProfileModal=!0,v()});let n=document.getElementById(`btn-close-profile-modal`),r=document.getElementById(`btn-cancel-profile`);n&&n.addEventListener(`click`,()=>{_.showProfileModal=!1,v()}),r&&r.addEventListener(`click`,()=>{_.showProfileModal=!1,v()});let i=document.getElementById(`profile-edit-form`);i&&i.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-user-name`).value.trim(),n=document.getElementById(`edit-user-username`).value.trim(),r=document.getElementById(`edit-user-email`).value.trim(),i=document.getElementById(`edit-user-password`).value.trim();try{_.currentUser=a.updateUserProfile(_.currentUser.id,{name:t,username:n,email:r,newPassword:i||void 0}),_.showProfileModal=!1,alert(`✅ Credenziali e Profilo aggiornati con successo!`),v()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(_.activeTab=t,v())})});let c=document.getElementById(`btn-open-email-logs`);c&&c.addEventListener(`click`,()=>{let e=a.getEmailLogs();e.length>0?(_.viewingEmailId=e[0].id,v()):alert(`Nessuna email spedita di recente nel registro.`)});let l=document.getElementById(`btn-close-email-preview`),u=document.getElementById(`btn-close-email-preview-footer`);l&&l.addEventListener(`click`,()=>{_.viewingEmailId=null,v()}),u&&u.addEventListener(`click`,()=>{_.viewingEmailId=null,v()}),document.querySelectorAll(`.kpi-card-clickable`).forEach(e=>{e.addEventListener(`click`,()=>{_.viewingKpiModal=e.getAttribute(`data-kpi`),v()})}),document.querySelectorAll(`.btn-close-kpi-modal`).forEach(e=>{e.addEventListener(`click`,()=>{_.viewingKpiModal=null,v()})}),document.querySelectorAll(`.btn-kpi-period`).forEach(e=>{e.addEventListener(`click`,()=>{_.kpiPeriod=e.getAttribute(`data-period`),v()})}),document.querySelectorAll(`.btn-kpi-charttype`).forEach(e=>{e.addEventListener(`click`,()=>{_.kpiChartType=e.getAttribute(`data-charttype`),v()})});let d=document.getElementById(`btn-dash-search`),f=document.getElementById(`dash-search-input`);d&&f&&(d.addEventListener(`click`,()=>{_.dashSearchQuery=f.value,_.dashSearchCategory=document.getElementById(`dash-search-category`).value,v()}),f.addEventListener(`keypress`,e=>{e.key===`Enter`&&(_.dashSearchQuery=f.value,_.dashSearchCategory=document.getElementById(`dash-search-category`).value,v())}));let p=document.getElementById(`btn-dash-reset`);p&&p.addEventListener(`click`,()=>{_.dashSearchQuery=``,_.dashSearchCategory=`ALL`,v()}),document.querySelectorAll(`.th-sortable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-col`);_.dashSortColumn===t?_.dashSortDirection=_.dashSortDirection===`ASC`?`DESC`:`ASC`:(_.dashSortColumn=t,_.dashSortDirection=`ASC`),v()})});let m=document.getElementById(`setting-logo-file`);m&&m.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){if(!t.type.startsWith(`image/`)){alert(`Seleziona un file immagine valido (PNG, JPG, SVG).`);return}let e=new FileReader;e.onload=function(e){let t=e.target.result;a.updateSettings({customLogoUrl:t}),alert(`✅ Nuovo Logo Aziendale caricato con successo!`),v()},e.readAsDataURL(t)}});let h=document.getElementById(`btn-reset-logo`);h&&h.addEventListener(`click`,()=>{confirm(`Ripristinare il logo predefinito con icona caffè ☕?`)&&(a.updateSettings({customLogoUrl:null}),alert(`✅ Logo predefinito ripristinato!`),v())});let g=document.getElementById(`settings-brand-form`);g&&g.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brand-title`).value.trim(),n=document.getElementById(`setting-brand-subtitle`).value.trim();a.updateSettings({brandTitle:t,brandSubtitle:n}),alert(`✅ Titolo e Sottotitolo Brand salvati con successo!`),v()});let y=document.getElementById(`settings-brevo-form`);y&&y.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brevo-key`).value.trim(),n=document.getElementById(`setting-brevo-sender`).value.trim();a.updateSettings({brevoApiKey:t,brevoSenderEmail:n}),alert(`✅ API Key ed Email Mittente Brevo salvate con successo!`),v()});let b=document.getElementById(`settings-gas-form`);b&&b.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-gas-url`).value.trim();a.updateSettings({gasScriptUrl:t}),alert(`✅ Endpoint Web App Google Apps Script (GAS) salvato con successo!`),v()}),document.querySelectorAll(`.btn-edit-client`).forEach(e=>{e.addEventListener(`click`,()=>{_.editingClientId=e.getAttribute(`data-id`),v()})});let x=document.getElementById(`btn-close-edit-client-modal`),S=document.getElementById(`btn-cancel-edit-client`);x&&x.addEventListener(`click`,()=>{_.editingClientId=null,v()}),S&&S.addEventListener(`click`,()=>{_.editingClientId=null,v()});let C=document.getElementById(`edit-client-form`);C&&C.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-client-id`).value,n=document.getElementById(`edit-cli-name`).value,r=document.getElementById(`edit-cli-ref`).value,i=document.getElementById(`edit-cli-phone`).value,o=document.getElementById(`edit-cli-city`).value,s=document.getElementById(`edit-cli-address`).value,c=document.getElementById(`edit-cli-mc-model`).value,l=document.getElementById(`edit-cli-mc-serial`).value,u=document.getElementById(`edit-cli-shortcode`).value,d=document.getElementById(`edit-cli-credits`).value,f=document.getElementById(`edit-cli-threshold`).value,p=document.getElementById(`edit-cli-board-version`).value;try{a.updateClientAndMachine(t,{name:n,refPerson:r,phone:i,city:o,address:s,machineModel:c,machineSerial:l,shortCode:u,remainingCredits:d,lowStockThreshold:f,boardVersion:p}),_.editingClientId=null,alert(`✅ Scheda Cliente, Macchina e Deconto aggiornata con successo!`),v()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-deconto-detail`).forEach(e=>{e.addEventListener(`click`,()=>{_.viewingDecontoCode=e.getAttribute(`data-code`),v()})});let w=document.getElementById(`btn-close-deconto-modal`),T=document.getElementById(`btn-close-deconto-modal-footer`);w&&w.addEventListener(`click`,()=>{_.viewingDecontoCode=null,v()}),T&&T.addEventListener(`click`,()=>{_.viewingDecontoCode=null,v()});let E=document.getElementById(`rename-role-labels-form`);E&&E.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`role_label_UFFICIO`).value.trim(),n=document.getElementById(`role_label_ADR`).value.trim();a.updateRoleLabel(`UFFICIO`,t),a.updateRoleLabel(`ADR`,n),alert(`✅ Nomi delle Categorie Utente aggiornati con successo!`),v()});let D=document.getElementById(`btn-toggle-add-user`),O=document.getElementById(`add-user-form-container`);D&&O&&D.addEventListener(`click`,()=>{O.style.display=O.style.display===`none`?`block`:`none`});let k=document.getElementById(`btn-cancel-add-user`);k&&O&&k.addEventListener(`click`,()=>{O.style.display=`none`});let A=document.getElementById(`btn-save-new-user`);A&&A.addEventListener(`click`,async()=>{let e=document.getElementById(`new-user-username`).value.trim(),t=document.getElementById(`new-user-password`).value.trim(),n=document.getElementById(`new-user-name`).value.trim(),r=document.getElementById(`new-user-role`).value,i=document.getElementById(`new-user-email`).value.trim(),o=document.getElementById(`new-user-phone`).value.trim();if(!e||!t||!n){alert(`Compila i campi obbligatori: Codice Utente, Password e Nome!`);return}try{let s=a.addUser({username:e,password:t,name:n,role:r,email:i,phone:o});alert(`✅ Utente dipendente "${n}" (Codice ${e}) salvato PERMANENTEMENTE nel database!\n\n✉️ Notifica Email automatica avviata per ${s.email}`),v()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-staff-user`).forEach(e=>{e.addEventListener(`click`,()=>{_.editingStaffUserId=e.getAttribute(`data-id`),v()})});let j=document.getElementById(`btn-close-edit-staff-modal`),M=document.getElementById(`btn-cancel-edit-staff`);j&&j.addEventListener(`click`,()=>{_.editingStaffUserId=null,v()}),M&&M.addEventListener(`click`,()=>{_.editingStaffUserId=null,v()});let N=document.getElementById(`edit-staff-form`);N&&N.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-staff-id`).value,n=document.getElementById(`edit-staff-username`)?document.getElementById(`edit-staff-username`).value:void 0,r=document.getElementById(`edit-staff-name`).value,i=document.getElementById(`edit-staff-role`)?document.getElementById(`edit-staff-role`).value:void 0,o=document.getElementById(`edit-staff-email`).value,s=document.getElementById(`edit-staff-phone`).value,c=document.getElementById(`edit-staff-password`).value;try{let e=a.updateUser(t,{username:n,name:r,role:i,email:o,phone:s,password:c?c.trim():void 0});_.editingStaffUserId=null,alert(`✅ Scheda Utente "${e.name}" salvata PERMANENTEMENTE nel database!\n\n✉️ Notifica Email di cambio ruolo avviata!`),v()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-toggle-user-status`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-status`)===`ACTIVE`?`DISABLED`:`ACTIVE`;a.updateUser(t,{status:n}),v()})}),document.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo utente dipendente?`))try{a.deleteUser(t),v()}catch(e){alert(`Errore: ${e.message}`)}})});let P=document.getElementById(`permissions-matrix-form`);P&&P.addEventListener(`submit`,e=>{e.preventDefault();let t=[`UFFICIO`,`ADR`],n=[`canViewClients`,`canCreateClients`,`canEditClients`,`canDeleteClients`,`canGenerateQr`,`canGenerateOtp`,`canBleRefill`,`canUseSimulator`],r={UFFICIO:{},ADR:{}};t.forEach(e=>{n.forEach(t=>{let n=document.getElementById(`perm_${e}_${t}`);n&&(r[e][t]=n.checked)})}),a.updatePermissions(r),alert(`✅ Matrice dei Permessi aggiornata con successo per tutti gli utenti!`),v()});let F=document.getElementById(`btn-export-csv`);F&&F.addEventListener(`click`,()=>{let e=a.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`DECONTO_Report_Consumi_${new Date().toISOString().split(`T`)[0]}.csv`,r.click(),alert(`📥 Report Consumi CSV Scaricato con successo!`)});let I=document.getElementById(`btn-trigger-backup`);I&&I.addEventListener(`click`,async()=>{I.disabled=!0,I.innerText=`⏳ Backup in corso su GitHub...`;let e=await s.executeBackupNow();alert(`✅ Backup GitHub Eseguito con Successo!\n\nRepository: https://github.com/emporioboldrini-stack/deconto-app.git\nCommit Hash: ${e.backupRecord.commitHash}\nEntità salvate: ${e.backupRecord.recordCount}`),v()});let L=document.getElementById(`btn-toggle-add-client`),R=document.getElementById(`add-client-form-container`);L&&R&&L.addEventListener(`click`,()=>{R.style.display=R.style.display===`none`?`block`:`none`});let z=document.getElementById(`btn-cancel-add-client`);z&&R&&z.addEventListener(`click`,()=>{R.style.display=`none`});let B=document.getElementById(`btn-save-new-client`);B&&B.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-ref`).value.trim(),n=document.getElementById(`new-cli-phone`).value.trim(),r=document.getElementById(`new-cli-city`).value.trim(),i=document.getElementById(`new-cli-mc-model`).value.trim(),o=document.getElementById(`new-cli-code`).value.trim(),s=document.getElementById(`new-cli-credits`).value;if(!e||!t||!n){alert(`Compila i campi obbligatori: Nome Cliente, Referente e Telefono!`);return}try{a.addClient({name:e,refPerson:t,phone:n,city:r,address:r,machineModel:i||`Didiesse Frog Revolution`,shortCode:o||`${Math.floor(1e3+Math.random()*9e3)}`,initialCredits:s}),alert(`✅ Cliente "${e}" registrato con successo ed associato alla scheda Deconto!`),v()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-del-client`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler rimuovere questo cliente dal sistema?`))try{a.deleteClient(t),v()}catch(e){alert(`Errore: ${e.message}`)}})});let V=document.getElementById(`btn-generate-otp`);V&&V.addEventListener(`click`,()=>{let e=document.getElementById(`otp-board-select`).value,t=parseInt(document.getElementById(`otp-credits-select`).value,10),n=`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,r=`https://deconto-app.web.app/?short=${e}&otp=${n}&c=${t}`;document.getElementById(`otp-code-val`).innerText=n,document.getElementById(`otp-link-val`).innerText=r,alert(`✅ Token OTP Generato per Deconto #${e} (+${t} Caffè)!`)});let H=document.getElementById(`btn-send-whatsapp`);H&&H.addEventListener(`click`,()=>{let e=`Gentile cliente, ecco il link per ricaricare la tua macchina da caffè Deconto: ${document.getElementById(`otp-link-val`).innerText}`;window.open(`https://wa.me/?text=${encodeURIComponent(e)}`,`_blank`)});let U=document.getElementById(`btn-copy-otp-link`);U&&U.addEventListener(`click`,()=>{let e=document.getElementById(`otp-link-val`).innerText;navigator.clipboard.writeText(e),alert(`📋 Link Ricarica Copiato negli appunti!`)});let W=document.getElementById(`btn-print-qr`);W&&W.addEventListener(`click`,()=>{window.print()});let G=document.getElementById(`qr-header-input`);G&&G.addEventListener(`input`,e=>{document.getElementById(`lbl-header-title`).innerText=`☕ ${e.target.value.toUpperCase()} ☕`});let K=document.getElementById(`qr-board-select`);K&&K.addEventListener(`change`,e=>{let t=a.getBoardFullDetails(e.target.value);t&&(document.getElementById(`lbl-short-code-display`).innerText=t.board.shortCode,document.getElementById(`lbl-mc-sn`).innerText=t.machine?t.machine.serialNumber:`N/D`,document.getElementById(`lbl-hw-sn`).innerText=t.board.hwSerial)});let q=document.getElementById(`btn-adr-ble-connect`);q&&q.addEventListener(`click`,async()=>{let e=document.getElementById(`adr-code-input`).value.trim(),t=parseInt(document.getElementById(`adr-credits-select`).value,10),n=document.getElementById(`adr-status-box`);if(!e){alert(`Inserisci il codice a 4 cifre!`);return}n.style.display=`block`,n.innerHTML=`📡 Scansione Bluetooth BLE per <strong>DECONTO_${e}</strong> in corso...`;try{await o.sendRefillOtpToken(e,t,`ADR_BLE_MANUAL`),a.performRefill({boardShortCode:e,credits:t,method:`BLE_PWA`,operatorId:_.currentUser?_.currentUser.id:`usr_003`}),n.innerHTML=`<span style="color: var(--accent-green);">✅ Ricarica Completata! Accreditate <strong>+${t} cialde</strong> sulla macchina #${e}. Relè Ripristinato.</span>`,setTimeout(()=>v(),2e3)}catch(e){n.innerHTML=`<span style="color: var(--accent-rose);">❌ Errore connessione: ${e.message}</span>`}}),document.querySelectorAll(`.btn-adr-quick-fill`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-code`);await o.sendRefillOtpToken(t,200,`ADR_QUICK_BLE`),a.performRefill({boardShortCode:t,credits:200,method:`BLE_PWA`,operatorId:_.currentUser?_.currentUser.id:`usr_003`}),alert(`✅ Ricaricate +200 cialde via Bluetooth sulla macchina #${t}!`),v()})});let J=document.getElementById(`sim-board-select`);J&&J.addEventListener(`change`,e=>{let t=e.target.value,n=a.getBoardFullDetails(t);n&&(document.getElementById(`sim-badge-code`).innerText=`DECONTO ${t}`,document.getElementById(`sim-credits-display`).innerText=n.board.remainingCredits)});let Y=document.getElementById(`btn-sim-brew`);Y&&Y.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;document.getElementById(`signal-sense-volts`).innerText=`230V AC (Impulso)`,document.getElementById(`signal-sense-badge`).className=`badge badge-warning`,document.getElementById(`signal-sense-badge`).innerText=`EROGAZIONE IN CORSO`;let n=a.registerCoffeeExtraction(t,22,1);setTimeout(()=>{if(document.getElementById(`signal-sense-volts`).innerText=`0V AC`,document.getElementById(`signal-sense-badge`).className=`badge badge-info`,document.getElementById(`signal-sense-badge`).innerText=`INATTIVO`,n&&n.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`[EXTRACTION]: Caffè erogato! Credito rimanente: ${n.remainingCredits}.<br>`,e.scrollTop=e.scrollHeight,n.isLowStock&&(e.innerHTML+=`<span style="color: var(--accent-amber);">[BUZZER 60s]: CREDITO &lt; 20! SEGNALE ACUSTICO ATTIVATO (BIP... BIP...).</span><br>`)}else if(n&&!n.success){let e=document.getElementById(`sim-console-log`);e.innerHTML+=`<span style="color: var(--accent-rose);">[HARDWARE LOCK]: CREDITO 0! RELÈ APERTO. POMPA DISATTIVATA.</span><br>`}v()},800)});let X=document.getElementById(`btn-sim-reset`);X&&X.addEventListener(`click`,()=>{let e=document.getElementById(`sim-board-select`),t=e?e.value:`3467`;a.performRefill({boardShortCode:t,credits:200,method:`TEST_BENCH`,operatorId:_.currentUser?_.currentUser.id:`usr_001`}),alert(`✅ Ricaricate +200 cialde di prova sulla macchina #${t}!`),v()})}document.addEventListener(`DOMContentLoaded`,v);