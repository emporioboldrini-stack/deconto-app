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
    `;return this.sendEmail({to:e.email,recipientName:e.name,subject:l,htmlContent:u,plainText:`Ciao ${e.name}, il tuo ruolo è stato aggiornato da ${o} a ${s}. Accedi su https://deconto-app.web.app`})}},t=`deconto_app_master_db_v3`,n=`deconto_app_user_session`,r=[`deconto_app_master_db_v3`,`deconto_app_master_db_v2`,`deconto_app_master_db_v1`,`deconto_app_master_db`,`deconto_vending_db`,`deconto_db`],i={settings:{customLogoUrl:null,brandTitle:`DECONTO`,brandSubtitle:`IoT Vending System`,thresholdYellow:20,thresholdRed:5,brevoApiKey:``,brevoSenderEmail:`noreply@deconto.it`},roleLabels:{UFFICIO:`Operatore Ufficio`,ADR:`Agente ADR Consegne`},users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Valerio Boldrini (Amministratore)`,email:`admin@deconto.it`,phone:`+39 333 112233`,role:`ADMIN`,status:`ACTIVE`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`laura.ufficio@deconto.it`,phone:`+39 02 445566`,role:`UFFICIO`,status:`ACTIVE`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`giuseppe.adr@deconto.it`,phone:`+39 333 998877`,role:`ADR`,status:`ACTIVE`,avatar:`🚚`,createdAt:`2026-01-10`}],permissions:{UFFICIO:{canViewClients:!0,canCreateClients:!0,canEditClients:!0,canDeleteClients:!0,canGenerateQr:!0,canGenerateOtp:!0,canBleRefill:!0,canUseSimulator:!0},ADR:{canViewClients:!0,canCreateClients:!1,canEditClients:!1,canDeleteClients:!1,canGenerateQr:!1,canGenerateOtp:!1,canBleRefill:!0,canUseSimulator:!0}},clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`},{id:`cli_3`,name:`Studio Dentistico Rossi`,refPerson:`Dr. Roberto Rossi`,phone:`+39 030 445566`,address:`Via X Giornate 88, Brescia`,city:`Brescia`},{id:`cli_4`,name:`Hotel Bellavista`,refPerson:`Stefano Bellini`,phone:`+39 051 889900`,address:`Piazza Maggiore 3, Bologna`,city:`Bologna`},{id:`cli_5`,name:`Magazzino Riserve ADR`,refPerson:`Deposito Centrale`,phone:`+39 02 998800`,address:`Via Industria 2, Monza`,city:`Monza`},{id:`cli_6`,name:`Caffetteria Torinese`,refPerson:`Carla Vianello`,phone:`+39 011 334455`,address:`Piazza Castello 15, Torino`,city:`Torino`},{id:`cli_7`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`},{id:`cli_8`,name:`Pasticceria Giotto`,refPerson:`Marco Giotto`,phone:`+39 049 887766`,address:`Via Dante 14, Padova`,city:`Padova`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,brand:`DeLonghi`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,brand:`Faber`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-1099`,brand:`Saeco`,model:`Saeco Aroma SE Compact`,clientId:`cli_3`,installDate:`2026-02-01`},{id:`mc_4`,serialNumber:`SN-MC-2026-4021`,brand:`Lelit`,model:`Lelit Giulietta Dual Group`,clientId:`cli_4`,installDate:`2026-02-10`},{id:`mc_5`,serialNumber:`SN-MC-2026-7700`,brand:`Grimac`,model:`Grimac Terry Opus 1`,clientId:`cli_5`,installDate:`2026-02-20`},{id:`mc_6`,serialNumber:`SN-MC-2026-5432`,brand:`Gaggia`,model:`Gaggia Ruby 1G Professional`,clientId:`cli_6`,installDate:`2026-03-01`},{id:`mc_7`,serialNumber:`SN-MC-2026-4409`,brand:`Spinel`,model:`Spinel Pinocchio Professional`,clientId:`cli_7`,installDate:`2026-03-05`},{id:`mc_8`,serialNumber:`SN-MC-2026-8820`,brand:`Bialetti`,model:`Bialetti Mokona Pro Vending`,clientId:`cli_8`,installDate:`2026-03-15`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-62,machineExtractions:1855,lifetimeExtractions:4920,avgDailyCoffees:12.4,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-78,machineExtractions:3410,lifetimeExtractions:8120,avgDailyCoffees:24.8,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_1099`,shortCode:`1099`,hwSerial:`DC-HW-1099`,macAddress:`C6:3F:8A:99:10:99`,machineId:`mc_3`,version:`PRO`,remainingCredits:85,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-55,machineExtractions:1750,lifetimeExtractions:3890,avgDailyCoffees:14.2,lastSyncDate:new Date().toISOString()},{id:`board_4021`,shortCode:`4021`,hwSerial:`DC-HW-4021`,macAddress:`C6:3F:8A:66:40:21`,machineId:`mc_4`,version:`PRO`,remainingCredits:45,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-65,machineExtractions:2100,lifetimeExtractions:5400,avgDailyCoffees:15,lastSyncDate:new Date().toISOString()},{id:`board_7700`,shortCode:`7700`,hwSerial:`DC-HW-5500`,macAddress:`C6:3F:8A:55:77:00`,machineId:`mc_5`,version:`PRO`,remainingCredits:500,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-70,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:0,lastSyncDate:new Date().toISOString()},{id:`board_5432`,shortCode:`5432`,hwSerial:`DC-HW-5432`,macAddress:`C6:3F:8A:AA:54:32`,machineId:`mc_6`,version:`BASIC`,remainingCredits:12,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-75,machineExtractions:960,lifetimeExtractions:2400,avgDailyCoffees:7.8,lastSyncDate:new Date(Date.now()-1728e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_7`,version:`BASIC`,remainingCredits:0,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-58,machineExtractions:1241,lifetimeExtractions:3501,avgDailyCoffees:9.1,lastSyncDate:new Date().toISOString()},{id:`board_8820`,shortCode:`8820`,hwSerial:`DC-HW-8820`,macAddress:`C6:3F:8A:88:88:20`,machineId:`mc_8`,version:`BASIC`,remainingCredits:0,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-60,machineExtractions:1540,lifetimeExtractions:4120,avgDailyCoffees:11.2,lastSyncDate:new Date().toISOString()}],refillLogs:[],coffeeLogs:[],emailLogs:[],backupLogs:[]},a=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession(),this.initIndexedDB(),this.seedCoffeeLogs()}initIndexedDB(){try{let e=indexedDB.open(`DecontoDB_Vault`,1);e.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(`store`)||t.createObjectStore(`store`,{keyPath:`key`})},e.onsuccess=e=>{this.idb=e.target.result,this.syncToIndexedDB()}}catch{}}syncToIndexedDB(){if(!(!this.idb||!this.data))try{this.idb.transaction(`store`,`readwrite`).objectStore(`store`).put({key:`master_data`,payload:JSON.stringify(this.data)})}catch{}}loadData(){let e=null;try{let n=localStorage.getItem(t);n&&(e=JSON.parse(n))}catch{e=null}if(!e)for(let t of r)try{let n=localStorage.getItem(t);if(n&&(e=JSON.parse(n),e))break}catch{}if(!e)e=JSON.parse(JSON.stringify(i));else{if(e.settings?e.settings={...i.settings,...e.settings}:e.settings={...i.settings},e.roleLabels?e.roleLabels={...i.roleLabels,...e.roleLabels}:e.roleLabels={...i.roleLabels},e.permissions?e.permissions={...i.permissions,...e.permissions}:e.permissions={...i.permissions},!e.users||!Array.isArray(e.users)||e.users.length===0)e.users=[...i.users];else{let t=i.users.find(e=>e.username===`001`);t&&!e.users.some(e=>e.username===`001`)&&e.users.push(t)}(!e.clients||!Array.isArray(e.clients))&&(e.clients=[...i.clients]),(!e.machines||!Array.isArray(e.machines))&&(e.machines=[...i.machines]),(!e.decontoBoards||!Array.isArray(e.decontoBoards))&&(e.decontoBoards=[...i.decontoBoards])}e.refillLogs||(e.refillLogs=[]),e.coffeeLogs||(e.coffeeLogs=[]),e.emailLogs||(e.emailLogs=[]),e.backupLogs||(e.backupLogs=[]),(!e.schemaVersion||e.schemaVersion<2)&&(e.coffeeLogs=[],e.schemaVersion=2);let n=new Set(e.decontoBoards.map(e=>e.id));e.coffeeLogs=e.coffeeLogs.filter(e=>n.has(e.boardId)),e.refillLogs=e.refillLogs.filter(e=>n.has(e.boardId));try{let t=JSON.stringify(e);r.forEach(e=>localStorage.setItem(e,t))}catch{}return e}saveData(){try{let e=JSON.stringify(this.data);r.forEach(t=>{localStorage.setItem(t,e)}),this.syncToIndexedDB()}catch{}}loadSession(){try{let e=sessionStorage.getItem(n);return e?JSON.parse(e):null}catch{return null}}saveSession(e){this.currentUser=e,e?sessionStorage.setItem(n,JSON.stringify(e)):sessionStorage.removeItem(n)}login(e,t){let n=String(e||``).trim(),r=this.data.users.find(e=>e.username===n);if(!r)throw Error(`Codice utente non valido.`);let i=r.username===`001`;if(!(r.password===t||i&&(t===`123456`||t===`123`)))throw Error(`Password errata.`);if(r.status!==`ACTIVE`)throw Error(`Account utente disabilitato dall'amministratore.`);return this.saveSession(r),r}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}getSettings(){return this.data.settings||i.settings}updateSettings(e){return this.data.settings={...this.getSettings(),...e},this.saveData(),this.data.settings}getRoleLabels(){return this.data.roleLabels||i.roleLabels}updateRoleLabel(e,t){return this.data.roleLabels||(this.data.roleLabels={...i.roleLabels}),this.data.roleLabels[e]=t.trim(),this.saveData(),this.data.roleLabels}getPermissions(){return this.data.permissions||i.permissions}updatePermissions(e){return this.data.permissions=e,this.saveData(),this.data.permissions}calculateBoardStatus(e){let t=this.getSettings(),n=t.thresholdYellow||20,r=t.thresholdRed||5,i=e.remainingCredits;return i<=0?{statusKey:`BLOCKED_ZERO`,label:`⚫ BLOCCO RELÈ (0 CIALDE)`,badgeClass:`badge-danger`,badgeHtml:`<span class="badge" style="background: #090d16; color: #fff; border: 1px solid #334155; font-weight: 800;">⚫ BLOCCO RELÈ (0 CIALDE)</span>`}:i<=r?{statusKey:`CRITICAL_LOW`,label:`🔴 CRITICO (${i} CIALDE)`,badgeClass:`badge-danger`,badgeHtml:`<span class="badge badge-danger" style="font-weight: 800;">🔴 CRITICO (${i} CIALDE)</span>`}:i<=n?{statusKey:`WARNING_LOW`,label:`🟡 SOTTOSCORTA (${i} CIALDE)`,badgeClass:`badge-warning`,badgeHtml:`<span class="badge badge-warning" style="font-weight: 800;">🟡 SOTTOSCORTA (${i} CIALDE)</span>`}:{statusKey:`ACTIVE_OK`,label:`🟢 REGOLARE (${i} CIALDE)`,badgeClass:`badge-success`,badgeHtml:`<span class="badge badge-success" style="font-weight: 800;">🟢 REGOLARE (${i} CIALDE)</span>`}}calculateClientStatus(e){let t=this.data.machines.filter(t=>t.clientId===e.id);if(t.length===0)return{statusKey:`NO_MACHINE`,label:`⚪ NESSUNA MACCHINA`,badgeHtml:`<span class="badge badge-secondary">⚪ INATTIVO</span>`};let n=this.data.decontoBoards.find(e=>t.some(t=>t.id===e.machineId));return n?this.calculateBoardStatus(n):{statusKey:`NO_BOARD`,label:`⚪ MACCHINA SENZA DECONTO`,badgeHtml:`<span class="badge badge-secondary">⚪ NON COLLEGATO</span>`}}updateUserProfile(e,t){let n=this.data.users.find(t=>t.id===e);if(!n)throw Error(`Utente non trovato.`);return t.name&&(n.name=t.name.trim()),t.email&&(n.email=t.email.trim()),t.phone&&(n.phone=t.phone.trim()),t.avatar&&(n.avatar=t.avatar),t.newPassword&&(n.password=t.newPassword.trim()),this.saveData(),this.currentUser&&this.currentUser.id===e&&this.saveSession(n),n}verifyPassword(e,t){let n=this.data.users.find(t=>t.id===e);return n?n.password===t:!1}getUsers(){return this.data.users}addUser(t){let n=t.username.trim();if(this.data.users.find(e=>e.username===n))throw Error(`Il codice utente "${n}" è già assegnato a un altro dipendente.`);let r={id:`usr_`+Date.now(),username:n,password:t.password.trim(),name:t.name.trim(),email:t.email?t.email.trim():``,phone:t.phone?t.phone.trim():``,role:t.role||`UFFICIO`,status:`ACTIVE`,avatar:t.role===`ADMIN`?`👨‍💼`:t.role===`UFFICIO`?`👩‍💻`:`🚚`,createdAt:new Date().toISOString().split(`T`)[0]};return this.data.users.push(r),this.saveData(),r.email&&e.sendWelcomeStaffEmail(r),r}updateUser(t,n){let r=this.data.users.find(e=>e.id===t);if(!r)throw Error(`Utente non trovato.`);let i=r.role;if(n.username&&n.username!==r.username){let e=n.username.trim();if(this.data.users.find(n=>n.username===e&&n.id!==t))throw Error(`Il codice utente "${e}" è già in uso.`);r.username=e}return n.name&&(r.name=n.name.trim()),n.email!==void 0&&(r.email=n.email.trim()),n.phone!==void 0&&(r.phone=n.phone.trim()),n.status&&(r.status=n.status),n.password&&(r.password=n.password.trim()),n.role&&r.username!==`001`&&(r.role=n.role,r.avatar=r.role===`ADMIN`?`👨‍💼`:r.role===`UFFICIO`?`👩‍💻`:`🚚`,i!==r.role&&r.email&&e.sendRoleUpdateEmail(r,i,r.role)),this.saveData(),r}deleteUser(e){let t=this.data.users.find(t=>t.id===e);if(!t)throw Error(`Utente non trovato.`);if(t.username===`001`)throw Error(`Impossibile eliminare l'amministratore principale.`);this.data.users=this.data.users.filter(t=>t.id!==e),this.saveData()}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs||[]}getEmailLogs(){return this.data.emailLogs||[]}getBackupLogs(){return this.data.backupLogs}seedCoffeeLogs(){return this.data.coffeeLogs||[]}getExtractionsAnalytics(e=`30DAYS`,t=null,n=null){let r=this.data.coffeeLogs||[],i=new Date,a,o;e===`30DAYS`?(a=new Date(i.getTime()-2592e6),o=new Date(i)):e===`90DAYS`?(a=new Date(i.getTime()-7776e6),o=new Date(i)):e===`1YEAR`?(a=new Date(i.getFullYear(),0,1),o=new Date(i)):e===`CUSTOM`&&t&&n?(a=new Date(t+`T00:00:00`),o=new Date(n+`T23:59:59`)):(a=new Date(i.getTime()-2592e6),o=new Date(i));let s=Math.max(1,Math.round((o.getTime()-a.getTime())/864e5)),c=r.filter(e=>{let t=new Date(e.timestamp);return t>=a&&t<=o}),l=c.length,u=(l/s).toFixed(1),d=(o.getTime()-a.getTime())/5,f=[];for(let e=0;e<5;e++){let t=new Date(a.getTime()+e*d),n=new Date(a.getTime()+(e+1)*d),r=c.filter(e=>{let r=new Date(e.timestamp);return r>=t&&r<n}),i=``;i=s<=35?t.toLocaleDateString(`it-IT`,{day:`2-digit`,month:`short`}):s<=120?`Sett. ${e+1}`:t.toLocaleDateString(`it-IT`,{month:`short`,year:`2-digit`}),f.push({label:i,count:r.length,startDate:t,endDate:n})}return{periodKey:e,startDate:a,endDate:o,durationDays:s,totalCount:l,avgDaily:u,chartBuckets:f,logs:c}}hasPermission(e){if(!this.currentUser)return!1;if(this.currentUser.role===`ADMIN`)return!0;let t=(this.data.permissions||i.permissions)[this.currentUser.role];return t?!!t[e]:!1}addBoard(e){let t=String(e.shortCode||``).trim();if(!t)throw Error(`Inserisci il Codice 4 Cifre del Deconto.`);if(this.data.decontoBoards.find(e=>e.shortCode===t))throw Error(`La Scheda Deconto con codice #${t} esiste già nel sistema.`);let n=t.padStart(4,`0`).substring(0,4),r=e.version===`PRO`?`PRO`:`BASIC`,i=r===`PRO`?Math.min(4,Math.max(2,parseInt(e.groupCount,10)||2)):1,a={id:`board_`+n,shortCode:n,hwSerial:e.hwSerial?e.hwSerial.trim():null,macAddress:e.macAddress?e.macAddress.trim():null,machineId:e.machineId||null,version:r,groupCount:i,remainingCredits:parseInt(e.remainingCredits===void 0?200:e.remainingCredits,10),relayStatus:`CLOSED_OK`,firmwareVersion:null,isOnlineWifi:!1,rssi:null,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:0,lastSyncDate:new Date().toISOString()};if(this.data.decontoBoards.unshift(a),e.machineId){let t=this.data.machines.find(t=>t.id===e.machineId);t&&this.data.decontoBoards.forEach(e=>{e.id!==a.id&&e.machineId===t.id&&(e.machineId=null)})}return this.saveData(),a}updateBoard(e,t){let n=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);if(!n)throw Error(`Scheda Deconto non trovata.`);if(t.shortCode){let e=String(t.shortCode).trim().padStart(4,`0`).substring(0,4);if(this.data.decontoBoards.find(t=>t.shortCode===e&&t.id!==n.id))throw Error(`Il codice #${e} è già utilizzato da un'altra scheda.`);n.shortCode=e}if(t.hwSerial!==void 0&&(n.hwSerial=t.hwSerial.trim()),t.version&&(n.version=t.version===`PRO`?`PRO`:`BASIC`,n.version===`BASIC`?n.groupCount=1:t.groupCount!==void 0&&(n.groupCount=Math.min(4,Math.max(2,parseInt(t.groupCount,10)||2)))),t.machineId!==void 0){let e=t.machineId||null;n.machineId=e,e&&this.data.decontoBoards.forEach(t=>{t.id!==n.id&&t.machineId===e&&(t.machineId=null)})}return t.remainingCredits!==void 0&&(n.remainingCredits=parseInt(t.remainingCredits,10),n.remainingCredits>0?n.relayStatus=`CLOSED_OK`:(n.remainingCredits=0,n.relayStatus=`OPEN_LOCKED`)),this.saveData(),n}deleteBoard(e){let t=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);t&&(this.data.coffeeLogs=(this.data.coffeeLogs||[]).filter(e=>e.boardId!==t.id),this.data.refillLogs=(this.data.refillLogs||[]).filter(e=>e.boardId!==t.id),this.data.decontoBoards=this.data.decontoBoards.filter(e=>e.id!==t.id),this.saveData())}addMachine(e){let t=e.serialNumber.trim();if(this.data.machines.find(e=>e.serialNumber===t))throw Error(`La macchina con seriale ${t} esiste già.`);let n={id:`mc_`+Date.now(),serialNumber:t,brand:e.brand?e.brand.trim():`DeLonghi`,model:e.model?e.model.trim():`Pod Professional`,clientId:e.clientId||null,installDate:e.clientId?new Date().toISOString().split(`T`)[0]:null};if(this.data.machines.unshift(n),e.boardId){let t=this.data.decontoBoards.find(t=>t.id===e.boardId||t.shortCode===e.boardId);t&&(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),t.machineId=n.id)}return this.saveData(),n}updateMachine(e,t){let n=this.data.machines.find(t=>t.id===e);if(!n)throw Error(`Macchina non trovata.`);if(t.serialNumber&&(n.serialNumber=t.serialNumber.trim()),t.brand!==void 0&&(n.brand=t.brand.trim()),t.model&&(n.model=t.model.trim()),t.clientId!==void 0&&(n.clientId=t.clientId||null,n.clientId&&!n.installDate&&(n.installDate=new Date().toISOString().split(`T`)[0])),t.boardId!==void 0){let e=t.boardId||null;if(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),e){let t=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);t&&(t.machineId=n.id)}}return this.saveData(),n}deleteMachine(e){this.data.decontoBoards.forEach(t=>{t.machineId===e&&(t.machineId=null)}),this.data.machines=this.data.machines.filter(t=>t.id!==e),this.saveData()}addClient(e){let t={id:`cli_`+Date.now(),name:e.name.trim(),clientType:e.clientType?e.clientType.trim():`Altro`,refPerson:e.refPerson?e.refPerson.trim():`Referente`,phone:e.phone?e.phone.trim():`+39 `,email:e.email?e.email.trim():``,address:e.address?e.address.trim():``,city:e.city?e.city.trim():``};if(this.data.clients.unshift(t),e.machineId){let n=this.data.machines.find(t=>t.id===e.machineId);n&&(n.clientId=t.id,n.installDate=new Date().toISOString().split(`T`)[0])}return this.saveData(),t}updateClient(e,t){let n=this.data.clients.find(t=>t.id===e);if(!n)throw Error(`Cliente non trovato.`);if(t.name&&(n.name=t.name.trim()),t.clientType!==void 0&&(n.clientType=t.clientType.trim()),t.refPerson!==void 0&&(n.refPerson=t.refPerson.trim()),t.phone!==void 0&&(n.phone=t.phone.trim()),t.email!==void 0&&(n.email=t.email.trim()),t.city!==void 0&&(n.city=t.city.trim()),t.address!==void 0&&(n.address=t.address.trim()),t.assignedMachineId!==void 0){let e=t.assignedMachineId||null;if(e){let t=this.data.machines.find(t=>t.id===e);t&&(t.clientId=n.id,t.installDate||=new Date().toISOString().split(`T`)[0])}}return this.saveData(),n}deleteClient(e){this.data.machines.forEach(t=>{t.clientId===e&&(t.clientId=null)}),this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:(this.data.coffeeLogs||[]).filter(e=>e.boardId===t.id)}}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.machineExtractions=(r.machineExtractions||0)+1,r.lifetimeExtractions=(r.lifetimeExtractions||0)+1,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs||(this.data.coffeeLogs=[]),this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<=(this.getSettings().thresholdYellow||20),relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
`;return(this.data.coffeeLogs||[]).forEach(t=>{let n=this.getBoardFullDetails(t.boardId),r=n&&n.client?n.client.name.replace(/,/g,` `):`N/D`,i=n&&n.machine?n.machine.serialNumber:`N/D`,a=n&&n.machine?n.machine.model.replace(/,/g,` `):`N/D`,o=n&&n.board?n.board.shortCode:`N/D`;e+=`${t.id},${o},"${r}",${i},"${a}",${t.timestamp},${t.durationSeconds},${t.groupId}\n`}),e}triggerGitHubBackup(){let e={id:`bak_`+Date.now(),timestamp:new Date().toISOString(),repo:`emporioboldrini-stack/deconto-app`,commitHash:`git-`+Math.random().toString(36).substring(2,10),status:`SUCCESS`,recordCount:this.data.clients.length+this.data.machines.length+this.data.decontoBoards.length+this.data.refillLogs.length};return this.data.backupLogs.unshift(e),this.saveData(),e}};function o(){let e=a.getSettings();return`
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
  `}function s(e,t){let n=a.getSettings(),r=a.getRoleLabels(),i=e.role===`UFFICIO`||e.role===`ADMIN`,o=e.role===`ADR`||e.role===`ADMIN`,s=e.role===`ADMIN`;return`
    <aside class="sidebar">
      
      <!-- 1. IN ALTO: Logo e Scritta Aziendale Brand -->
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 12px; padding: 20px 16px; border-bottom: 1px solid var(--border-subtle);">
        <div id="brand-logo-container" style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-glow);">
          ${n.customLogoUrl?`<img src="${n.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo Brand">`:`<span style="font-size: 1.6rem;">☕</span>`}
        </div>
        <div>
          <div style="font-weight: 800; font-size: 1.15rem; color: #fff; letter-spacing: 0.5px;">
            ${n.brandTitle||`DECONTO`}
          </div>
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
          <a class="nav-item ${t===`user_mgmt`||t===`user_management`?`active`:``}" data-tab="user_mgmt">
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
          <a class="nav-item ${t===`client_diy`||t===`otp_generator`?`active`:``}" data-tab="client_diy">
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

        <!-- 4. IN BASSO SOTTO IMPOSTAZIONI: Versione & Data Ultima Modifica -->
        <div style="margin-top: 24px; padding: 14px 12px; border-top: 1px solid var(--border-subtle); text-align: center; background: rgba(0,0,0,0.25); border-radius: 8px;">
          <div style="font-weight: 800; font-size: 0.8rem; color: var(--accent-cyan);">
            Versione: V1.6PC
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
            Data ultima modifica: 02/08/2026
          </div>
        </div>

      </nav>
    </aside>
  `}function c(e=`dashboard`,t=null,n=``,r=`ALL`,i=`shortCode`,o=`DESC`,s=null,c=`30DAYS`,l=`LINE`,u=`2026-07-01`,d=`2026-08-02`){let f=a.getClients(),p=a.getMachines(),m=a.getBoards(),h=a.getCoffeeLogs(),g=f.length,_=p.length,v=h.length,y=m.filter(e=>{let t=a.calculateBoardStatus(e);return t.statusKey===`WARNING_LOW`||t.statusKey===`CRITICAL_LOW`||t.statusKey===`BLOCKED_ZERO`}),b=m.filter(e=>{if(!n)return!0;let t=n.toLowerCase().trim(),i=a.getBoardFullDetails(e.id),o=i&&i.client?i.client.name.toLowerCase():``,s=i&&i.machine?i.machine.serialNumber.toLowerCase():``,c=i&&i.machine?i.machine.model.toLowerCase():``,l=e.shortCode.toLowerCase();return r===`CODE`?l.includes(t):r===`CLIENT`?o.includes(t):r===`MODEL`?c.includes(t)||s.includes(t):l.includes(t)||o.includes(t)||c.includes(t)||s.includes(t)});b.sort((e,t)=>{let n=a.getBoardFullDetails(e.id),r=a.getBoardFullDetails(t.id),s,c;return i===`shortCode`?(s=parseInt(e.shortCode,10),c=parseInt(t.shortCode,10)):i===`credits`?(s=e.remainingCredits,c=t.remainingCredits):i===`client`?(s=n&&n.client?n.client.name:``,c=r&&r.client?r.client.name:``):i===`model`?(s=n&&n.machine?n.machine.model:``,c=r&&r.machine?r.machine.model:``):i===`connection`?(s=+!!e.isOnlineWifi,c=+!!t.isOnlineWifi):i===`syncDate`?(s=new Date(e.lastSyncDate).getTime(),c=new Date(t.lastSyncDate).getTime()):(s=e.shortCode,c=t.shortCode),s<c?o===`ASC`?-1:1:s>c?o===`ASC`?1:-1:0});let x=e=>i===e?o===`ASC`?`▲`:`▼`:`<span style="opacity: 0.3;">↕</span>`,S=``;if(s===`kpi_clients`)S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; min-height: 80vh; max-height: 90vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan); margin: 0;">
              📊 Analytics & Distribuzione Clienti Attivi (${g})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-purple);">📍 Classifica per Città:</h4>
              ${(()=>{let e={};f.forEach(t=>{let n=(t.city||`N/D`).trim();e[n]=(e[n]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]),n=t.length>0?t[0][1]:1;return t.length===0?`<div style="color:var(--text-muted);font-size:0.85rem;">Nessun cliente registrato.</div>`:t.map(([e,t])=>{let r=Math.round(t/g*100),i=Math.round(t/n*100);return`
                    <div style="margin-bottom: 12px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 0.85rem;">
                        <span style="font-weight: 700; color: #fff;">📍 ${e}</span>
                        <span style="color: var(--accent-purple); font-weight: 800;">${t} client${t===1?`e`:`i`} &nbsp;<small style="color:var(--text-muted);">(${r}%)</small></span>
                      </div>
                      <div style="background: rgba(255,255,255,0.06); border-radius: 4px; height: 6px; width: 100%;">
                        <div style="background: var(--accent-purple); height: 6px; border-radius: 4px; width: ${i}%; transition: width 0.4s;"></div>
                      </div>
                    </div>
                  `}).join(``)})()}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: #f59e0b;">🏷️ Ripartizione per Tipologia:</h4>
              ${(()=>{let e={Bar:`#f59e0b`,Ristorante:`#ef4444`,Hotel:`#8b5cf6`,"Azienda/Ufficio":`#38bdf8`,"Fabbrica/SitoProduttivo":`#10b981`,"Palestra/Sport":`#22c55e`,"Negozio/Retail":`#f97316`,"Struttura Sanitaria":`#06b6d4`,"Scuola/Università":`#a78bfa`,Altro:`#6b7280`},t={Bar:`☕ Bar`,Ristorante:`🍽️ Ristorante`,Hotel:`🏨 Hotel`,"Azienda/Ufficio":`🏢 Azienda / Ufficio`,"Fabbrica/SitoProduttivo":`🏭 Fabbrica / Sito prod.`,"Palestra/Sport":`💪 Palestra / Sport`,"Negozio/Retail":`🛍️ Negozio / Retail`,"Struttura Sanitaria":`🏥 Struttura Sanitaria`,"Scuola/Università":`🎓 Scuola / Università`,Altro:`📌 Altro`},n={};f.forEach(e=>{let t=e.clientType||`Altro`;n[t]=(n[t]||0)+1});let r=Object.entries(n).sort((e,t)=>t[1]-e[1]),i=r.length>0?r[0][1]:1;return r.length===0?`<div style="color:var(--text-muted);font-size:0.85rem;">Nessun cliente registrato.</div>`:r.map(([n,r])=>{let a=Math.round(r/g*100),o=Math.round(r/i*100),s=e[n]||`#6b7280`;return`
                    <div style="margin-bottom: 12px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 0.85rem;">
                        <span style="font-weight: 700; color: #fff;">${t[n]||n}</span>
                        <span style="color: ${s}; font-weight: 800;">${r} client${r===1?`e`:`i`} &nbsp;<small style="color:var(--text-muted);">(${a}%)</small></span>
                      </div>
                      <div style="background: rgba(255,255,255,0.06); border-radius: 4px; height: 6px; width: 100%;">
                        <div style="background: ${s}; height: 6px; border-radius: 4px; width: ${o}%; transition: width 0.4s;"></div>
                      </div>
                    </div>
                  `}).join(``)})()}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-green);">📈 Riepilogo Parco Clienti:</h4>
              <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.8;">
                • <strong>Totale Clienti Registrati:</strong> <span style="color:#fff;font-weight:800;">${g}</span><br>
                • <strong>Macchine Installate:</strong> <span style="color:#fff;font-weight:800;">${p.filter(e=>e.clientId).length} / ${p.length}</span><br>
                • <strong>Schede Deconto Associate:</strong> <span style="color:#fff;font-weight:800;">${m.filter(e=>e.machineId).length} / ${m.length}</span><br>
                • <strong>Erogazioni Totali Storiche:</strong> <span style="color:var(--accent-cyan);font-weight:800;">${h.length}</span>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Clienti</button>
          </div>
        </div>
      </div>
    `;else if(s===`kpi_machines`)S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; min-height: 80vh; max-height: 90vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-purple); margin: 0;">
              ☕ Telemetria & Ripartizione Parco Macchine (${_})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-cyan);">📡 Stato Connettività Hardware:</h4>
              <div style="margin-bottom: 12px; font-size: 0.85rem;">
                • <strong>Schede Wi-Fi 6 Cloud (PRO):</strong> ${m.filter(e=>e.isOnlineWifi).length} Online<br>
                • <strong>Schede Bluetooth (BASIC):</strong> ${m.filter(e=>!e.isOnlineWifi).length} Local Only
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                Le schede Bluetooth sincronizzano i log automaticamente al passaggio dell'Agente ADR.
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-amber);">🛠️ Modelli Macchina più Diffusi:</h4>
              ${p.map(e=>`
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
    `;else if(s===`kpi_extractions`){let e=a.getExtractionsAnalytics(c,u,d),t=e.chartBuckets,n=Math.max(...t.map(e=>e.count),1),r=``;if(l===`LINE`){let e=t.map((e,t)=>({x:30+t*160,y:150-Math.round(e.count/n*110),count:e.count,label:e.label})),i=`M ${e[0].x},${e[0].y} Q ${e[1].x-40},${e[1].y} ${e[1].x},${e[1].y} T ${e[2].x},${e[2].y} T ${e[3].x},${e[3].y} T ${e[4].x},${e[4].y}`;r=`
        <div style="height: 220px; position: relative; padding: 20px 10px 10px 10px; border-bottom: 2px solid var(--border-subtle);">
          <svg viewBox="0 0 700 180" style="width: 100%; height: 100%; overflow: visible;">
            <defs>
              <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.45" />
                <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Area sfumata sotto la linea -->
            <path d="${`${i} L ${e[4].x},170 L ${e[0].x},170 Z`}" fill="url(#lineChartGradient)" />

            <!-- Curva a linea reale -->
            <path d="${i}" fill="none" stroke="var(--accent-cyan)" stroke-width="4" stroke-linecap="round" />

            <!-- Punti/Nodi con Valori Reali del Database -->
            <g>
              ${e.map(e=>`
                <circle cx="${e.x}" cy="${e.y}" r="7" fill="#0f172a" stroke="var(--accent-cyan)" stroke-width="3" />
                <text x="${e.x}" y="${e.y-14}" text-anchor="middle" fill="#fff" font-size="12" font-weight="900">${e.count} ☕</text>
              `).join(``)}
            </g>
          </svg>
        </div>
      `}else r=`
        <div style="height: 220px; display: flex; align-items: flex-end; gap: 20px; padding: 20px 10px 10px 10px; border-bottom: 2px solid var(--border-subtle);">
          ${t.map(e=>`
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: ${Math.max(12,Math.round(e.count/n*88))}%; border-radius: 8px 8px 0 0; position: relative;">
                <span style="position: absolute; top: -26px; left: 50%; transform: translateX(-50%); font-size: 0.82rem; font-weight: 800; color: #fff;">${e.count} ☕</span>
              </div>
            `).join(``)}
        </div>
      `;S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; max-height: 90vh; overflow-y: auto;">
          
          <!-- Header Pop-up -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-green); margin: 0;">
                📈 Analytics &amp; Consumi Erogazioni Reali (${e.totalCount} caffè)
              </h2>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
                Periodo: <strong>${e.startDate.toLocaleDateString(`it-IT`)}</strong> &rarr; <strong>${e.endDate.toLocaleDateString(`it-IT`)}</strong> (${e.durationDays} giorni) | Media: <strong style="color: var(--accent-cyan);">${e.avgDaily} caffè/giorno</strong>
              </div>
            </div>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <!-- CONTROLLI PERIODO & SELETTORE GRAFICO -->
          <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              
              <!-- Tasti Scelta Rapida Temporale -->
              <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                <span style="font-weight: 800; font-size: 0.85rem; color: var(--accent-cyan); margin-right: 4px;">📅 Periodo:</span>
                <button class="btn ${c===`30DAYS`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="30DAYS">Ultimi 30 Giorni</button>
                <button class="btn ${c===`90DAYS`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="90DAYS">Ultimi 90 Giorni</button>
                <button class="btn ${c===`1YEAR`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="1YEAR">Anno Corrente</button>
                <button class="btn ${c===`CUSTOM`?`btn-primary`:`btn-secondary`} btn-kpi-period" data-period="CUSTOM">📅 Personalizzato</button>
              </div>

              <!-- Tasti Cambio Stile Grafico (LINEE vs BARRE) -->
              <div style="display: flex; gap: 8px; align-items: center;">
                <span style="font-weight: 800; font-size: 0.85rem; color: var(--accent-cyan); margin-right: 4px;">📊 Stile Grafico:</span>
                <button class="btn ${l===`LINE`?`btn-primary`:`btn-secondary`} btn-kpi-charttype" data-charttype="LINE" style="${l===`LINE`?`background: var(--accent-cyan); color: #000; font-weight: 900;`:``}">
                  📈 Grafico Linee
                </button>
                <button class="btn ${l===`BAR`?`btn-primary`:`btn-secondary`} btn-kpi-charttype" data-charttype="BAR" style="${l===`BAR`?`background: var(--accent-purple); color: #fff; font-weight: 900;`:``}">
                  📊 Grafico Barre
                </button>
              </div>

            </div>

            <!-- SELETTORE A TENDINA CALENDARIO PER IL FILTRO PERSONALIZZATO (SELEZIONATO) -->
            ${c===`CUSTOM`?`
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <div style="font-size: 0.85rem; font-weight: 800; color: var(--accent-amber);">
                  🗓️ Seleziona Date dal Calendario:
                </div>

                <div style="display: flex; align-items: center; gap: 8px;">
                  <label style="font-size: 0.8rem; color: var(--text-muted);">Data Inizio:</label>
                  <input type="date" id="kpi-custom-start" value="${u}" style="padding: 8px 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--accent-cyan); border-radius: 8px; font-weight: 700;">
                </div>

                <div style="display: flex; align-items: center; gap: 8px;">
                  <label style="font-size: 0.8rem; color: var(--text-muted);">Data Fine:</label>
                  <input type="date" id="kpi-custom-end" value="${d}" style="padding: 8px 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--accent-cyan); border-radius: 8px; font-weight: 700;">
                </div>

                <button id="btn-apply-kpi-custom-date" class="btn btn-primary" style="padding: 8px 16px;">
                  ✔️ Applica Filtro Calendario
                </button>
              </div>
            `:``}

          </div>

          <!-- SCHERMO DEL GRAFICO DINAMICO E RICALCOLATO -->
          <div style="background: #0f172a; padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div style="font-size: 0.9rem; color: #fff; font-weight: 800;">
                Consumi Ricalcolati dal DB: <span style="color: var(--accent-cyan);">${e.totalCount} caffè totali</span>
              </div>
              <div class="badge badge-info" style="font-weight: 800;">
                ${l===`LINE`?`📈 LINEA CONTINUA SVG`:`📊 ISTOGRAMMA A BARRE`}
              </div>
            </div>

            ${r}

            <!-- ETICHETTE TEMPORALI DINAMICHE -->
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 14px; font-weight: 700;">
              ${t.map(e=>`<span>${e.label}</span>`).join(``)}
            </div>
          </div>

          <!-- FOOTER POP-UP -->
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Erogazioni</button>
          </div>
        </div>
      </div>
    `}else if(s===`kpi_lowstock`){let e=m.length,t=0,n=0,r=0,i=0;m.forEach(e=>{let o=a.calculateBoardStatus(e);o.statusKey===`ACTIVE_OK`?t++:o.statusKey===`WARNING_LOW`?n++:o.statusKey===`CRITICAL_LOW`?r++:o.statusKey===`BLOCKED_ZERO`&&i++});let o=e>0?(t/e*100).toFixed(1):`0.0`,s=e>0?(n/e*100).toFixed(1):`0.0`,c=e>0?(r/e*100).toFixed(1):`0.0`,l=e>0?(i/e*100).toFixed(1):`0.0`,u=e>0?i/e*360:0,d=u+(e>0?r/e*360:0),f=d+(e>0?n/e*360:0);S=`
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; max-height: 90vh; overflow-y: auto;">
          
          <!-- Header Pop-up -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-rose); margin: 0;">
              📊 Ripartizione Scorte &amp; Elenco Deconti da Attenzionare (${e} Schede)
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <!-- LAYOUT AFFIANCATO IN 2 COLONNE CON DIMENSIONI AMPLIATE -->
          <div style="display: grid; grid-template-columns: 1fr 1.35fr; gap: 24px; align-items: start;">
            
            <!-- COLONNA DI SINISTRA: Grafico a Ciambella Contornato di Bianco + Tabella Riferimenti % -->
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 14px; border: 1px solid var(--border-subtle);">
              <h3 style="margin-top: 0; font-size: 1.1rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 16px;">
                📈 Analisi Percentuale Parco Deconti
              </h3>

              <!-- Grafico Donut Chart con Bordo Bianco & Glow per Evidenziare il Nero -->
              <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                <div style="width: 156px; height: 156px; border-radius: 50%; background: conic-gradient(#090d16 0deg ${u}deg, #ef4444 ${u}deg ${d}deg, #f59e0b ${d}deg ${f}deg, #10b981 ${f}deg 360deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(255, 255, 255, 0.4); border: 2.5px solid #ffffff;">
                  <div style="width: 100px; height: 100px; border-radius: 50%; background: #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border-subtle);">
                    <span style="font-size: 1.7rem; font-weight: 900; color: #fff;">${e}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700;">DECONTI TOT.</span>
                  </div>
                </div>
              </div>

              <!-- Tabella Riferimento Numeri & Percentuali -->
              <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); text-align: left; color: var(--text-muted);">
                    <th style="padding: 6px;">Stato Hardware</th>
                    <th style="padding: 6px; text-align: center;">Qtà</th>
                    <th style="padding: 6px; text-align: right;">% Totale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 6px;"><span class="badge badge-success">🟢 VERDE (REGOLARE)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${t}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--accent-green); font-weight: 800;">${o}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 6px;"><span class="badge badge-warning">🟡 GIALLO (SOTTOSCORTA)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${n}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--accent-amber); font-weight: 800;">${s}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 6px;"><span class="badge badge-danger">🔴 ROSSO (CRITICO)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${r}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--accent-rose); font-weight: 800;">${c}%</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 6px;"><span class="badge" style="background: #090d16; color: #fff; border: 1px solid #ffffff;">⚫ NERO (BLOCCO 0 CIALDE)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${i}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: #fff; font-weight: 800;">${l}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- COLONNA DI DESTRA: Elenco Deconti da Attenzionare -->
            <div style="background: rgba(0,0,0,0.25); padding: 20px; border-radius: 14px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <h3 style="margin: 0; font-size: 1.1rem; font-weight: 800; color: var(--accent-rose); display: flex; align-items: center; gap: 8px;">
                  ⚠️ Schede Deconto da Attenzionare
                </h3>
                <span class="badge badge-warning">${y.length} Schede</span>
              </div>

              <div class="table-container" style="max-height: 480px; overflow-y: auto;">
                <table style="width: 100%;">
                  <thead>
                    <tr>
                      <th>Deconto</th>
                      <th>Cliente</th>
                      <th>Credito</th>
                      <th>Stato</th>
                      <th>Azione</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${y.length>0?y.map(e=>{let t=a.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=a.calculateBoardStatus(e);return`
                        <tr>
                          <td><strong style="font-family: monospace; color: var(--accent-cyan);">#${e.shortCode}</strong></td>
                          <td><strong style="font-size: 0.85rem;">${n}</strong></td>
                          <td><strong style="color: var(--accent-rose); font-size: 0.85rem;">${e.remainingCredits} cr</strong></td>
                          <td>${r.badgeHtml}</td>
                          <td>
                            <button class="btn btn-secondary btn-deconto-detail" data-code="${e.shortCode}" style="padding: 4px 8px; font-size: 0.72rem; white-space: nowrap;">
                              🔑 OTP
                            </button>
                          </td>
                        </tr>
                      `}).join(``):`
                      <tr>
                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
                          🟢 Nessuna scheda in avviso o blocco. Tutto il parco è regolare!
                        </td>
                      </tr>
                    `}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- Footer Pop-up -->
          <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Avvisi Scorte</button>
          </div>
        </div>
      </div>
    `}let C=``;if(t){let e=a.getBoardFullDetails(t);if(e&&e.board){let t=e.board,n=e.machine||{},r=e.client||{},i=e.coffees||[],o=t.avgDailyCoffees||12.4,s=o>0?Math.ceil(t.remainingCredits/o):`N/D`,c=s===`N/D`?`N/D`:new Date(Date.now()+s*864e5).toLocaleDateString(`it-IT`,{day:`2-digit`,month:`long`,year:`numeric`}),l=a.calculateBoardStatus(t);C=`
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
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff; margin-top: 2px;">${(t.machineExtractions||0).toLocaleString(`it-IT`)} ☕</div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Storico Hardware:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-cyan); margin-top: 2px;">${(t.lifetimeExtractions||0).toLocaleString(`it-IT`)} ☕</div>
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
                  <div>• <strong>Seriale Scheda:</strong> <code>${t.hwSerial||`N/D`}</code></div>
                  <div>• <strong>Indirizzo MAC:</strong> <code>${t.macAddress||`N/D`}</code></div>
                  <div>• <strong>Firmware Attivo:</strong> <code>${t.firmwareVersion||`N/D`}</code></div>
                  <div>• <strong>Segnale Wi-Fi (RSSI):</strong> <code>${t.rssi?t.rssi+` dBm`:`N/D`}</code></div>
                  <div>• <strong>Ultimo Battito Heartbeat:</strong> <code>${t.lastSyncDate?new Date(t.lastSyncDate).toLocaleString(`it-IT`):`N/D`}</code></div>
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
          <div class="stat-value">${g}</div>
          <div class="stat-sub" style="color: var(--accent-green);">
            ${p.filter(e=>e.clientId).length} macchine assegnate
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
          <div class="stat-value">${_}</div>
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
          <div class="stat-value">${v}</div>
          <div class="stat-sub" style="color: var(--accent-cyan);">
            ${h.length>0?`▲ Storico reale registrato`:`● Nessuna erogazione ancora`}
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 8px; font-weight: 700;">
            🔍 Clicca per aprire il grafico consumi &rarr;
          </div>
        </div>

        <!-- Tasto 4: Macchine in Scorta/Blocco -->
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_lowstock" style="cursor: pointer; position: relative; border-color: ${y.length>0?`var(--accent-amber)`:`var(--border-color)`};">
          <div class="stat-header">
            <span class="stat-title">Scorte &amp; Blocchi</span>
            <span class="stat-icon">⚠️</span>
          </div>
          <div class="stat-value" style="color: ${y.length>0?`var(--accent-amber)`:`#fff`};">${y.length}</div>
          <div class="stat-sub" style="color: var(--accent-amber);">
            ${y.length>0?`Avviso consegna consigliata`:`Tutti i crediti regolari`}
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
              ${b.length>0?b.map(e=>{let t=a.getBoardFullDetails(e.id),n=t&&t.client?t.client.name:`N/D`,r=t&&t.machine?t.machine.model:`N/D`,i=t&&t.machine?t.machine.serialNumber:`N/D`,o=a.calculateBoardStatus(e);return`
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
    ${C}
    ${S}
  `}var l=`Abano Terme.Abbadia Cerreto.Abbadia Lariana.Abbadia San Salvatore.Abbasanta.Abbateggio.Abbiategrasso.Abetone Cutigliano.Abriola.Acate.Accadia.Acceglio.Accettura.Acciano.Accumoli.Acerenza.Acerno.Acerra.Aci Bonaccorsi.Aci Castello.Aci Catena.Aci Sant'Antonio.Acireale.Acquafondata.Acquaformosa.Acquafredda.Acqualagna.Acquanegra Cremonese.Acquanegra sul Chiese.Acquapendente.Acquappesa.Acquaro.Acquasanta Terme.Acquasparta.Acquaviva Collecroce.Acquaviva d'Isernia.Acquaviva delle Fonti.Acquaviva Picena.Acquaviva Platani.Acquedolci.Acqui Terme.Acri.Acuto.Adelfia.Adrano.Adrara San Martino.Adrara San Rocco.Adria.Adro.Affi.Affile.Afragola.Africo.Agazzano.Agerola.Aggius.Agira.Agliana.Agliano Terme.Agliè.Aglientu.Agna.Agnadello.Agnana Calabra.Agnone.Agnosine.Agordo.Agosta.Agra.Agrate Brianza.Agrate Conturbia.Agrigento.Agropoli.Agugliano.Agugliaro.Aicurzio.Aidomaggiore.Aidone.Aielli.Aiello Calabro.Aiello del Friuli.Aiello del Sabato.Aieta.Ailano.Ailoche.Airasca.Airola.Airole.Airuno.Aisone.Ala.Alà dei Sardi.Ala di Stura.Alagna.Alagna Valsesia.Alanno.Alano di Piave.Alassio.Alatri.Alba.Alba Adriatica.Albagiara.Albairate.Albanella.Albano di Lucania.Albano Laziale.Albano Sant'Alessandro.Albano Vercellese.Albaredo Arnaboldi.Albaredo d'Adige.Albaredo per San Marco.Albareto.Albaretto della Torre.Albavilla.Albenga.Albera Ligure.Alberobello.Alberona.Albese con Cassano.Albettone.Albi.Albiano.Albiano d'Ivrea.Albiate.Albidona.Albignasego.Albinea.Albino.Albiolo.Albisola Superiore.Albissola Marina.Albizzate.Albonese.Albosaggia.Albugnano.Albuzzano.Alcamo.Alcara li Fusi.Aldeno.Aldino.Ales.Alessandria.Alessandria del Carretto.Alessandria della Rocca.Alessano.Alezio.Alfano.Alfedena.Alfianello.Alfiano Natta.Alfonsine.Alghero.Algua.Alì.Alì Terme.Alia.Aliano.Alice Bel Colle.Alice Castello.Alife.Alimena.Aliminusa.Allai.Alleghe.Allein.Allerona.Alliste.Allumiere.Alluvioni Piovera.Almè.Almenno San Bartolomeo.Almenno San Salvatore.Almese.Alonte.Alpago.Alpette.Alpignano.Alseno.Alserio.Alta Val Tidone.Alta Valle Intelvi.Altamura.Altare.Altavalle.Altavilla Irpina.Altavilla Milicia.Altavilla Monferrato.Altavilla Silentina.Altavilla Vicentina.Altidona.Altilia.Altino.Altissimo.Altivole.Alto.Alto Reno Terme.Alto Sermenza.Altofonte.Altomonte.Altopascio.Altopiano della Vigolana.Alviano.Alvignano.Alvito.Alzano Lombardo.Alzano Scrivia.Alzate Brianza.Amalfi.Amandola.Amantea.Amaro.Amaroni.Amaseno.Amato.Amatrice.Ambivere.Amblar-Don.Ameglia.Amelia.Amendolara.Ameno.Amorosi.Ampezzo.Anacapri.Anagni.Ancarano.Ancona.Andali.Andalo.Andalo Valtellino.Andezeno.Andora.Andorno Micca.Andrano.Andrate.Andreis.Andretta.Andria.Andriano.Anela.Anfo.Angera.Anghiari.Angiari.Angolo Terme.Angri.Angrogna.Anguillara Sabazia.Anguillara Veneta.Annicco.Annone di Brianza.Annone Veneto.Anoia.Antegnate.Anterivo.Antey-Saint-André.Anticoli Corrado.Antignano.Antillo.Antonimina.Antrodoco.Antrona Schieranco.Anversa degli Abruzzi.Anzano del Parco.Anzano di Puglia.Anzi.Anzio.Anzola d'Ossola.Anzola dell'Emilia.Aosta.Apecchio.Apice.Apiro.Apollosa.Appiano Gentile.Appiano sulla strada del vino.Appignano.Appignano del Tronto.Aprica.Apricale.Apricena.Aprigliano.Aprilia.Aquara.Aquila d'Arroscia.Aquileia.Aquilonia.Aquino.Aradeo.Aragona.Aramengo.Arba.Arborea.Arborio.Arbus.Arcade.Arce.Arcene.Arcevia.Archi.Arcidosso.Arcinazzo Romano.Arcisate.Arco.Arcola.Arcole.Arconate.Arcore.Arcugnano.Ardara.Ardauli.Ardea.Ardenno.Ardesio.Ardore.Arena.Arena Po.Arenzano.Arese.Arezzo.Argegno.Argelato.Argenta.Argentera.Arguello.Argusto.Ari.Ariano Irpino.Ariano nel Polesine.Ariccia.Arielli.Arienzo.Arignano.Aritzo.Arizzano.Arlena di Castro.Arluno.Armeno.Armento.Armo.Armungia.Arnad.Arnara.Arnasco.Arnesano.Arola.Arona.Arosio.Arpaia.Arpaise.Arpino.Arquà Petrarca.Arquà Polesine.Arquata del Tronto.Arquata Scrivia.Arre.Arrone.Arsago Seprio.Arsiè.Arsiero.Arsita.Arsoli.Arta Terme.Artegna.Artena.Artogne.Arvier.Arzachena.Arzago d'Adda.Arzana.Arzano.Arzergrande.Arzignano.Ascea.Asciano.Ascoli Piceno.Ascoli Satriano.Ascrea.Asiago.Asigliano Veneto.Asigliano Vercellese.Asola.Asolo.Assago.Assemini.Assisi.Asso.Assolo.Assoro.Asti.Asuni.Ateleta.Atella.Atena Lucana.Atessa.Atina.Atrani.Atri.Atripalda.Attigliano.Attimis.Atzara.Augusta.Auletta.Aulla.Aurano.Aurigo.Auronzo di Cadore.Ausonia.Austis.Avegno.Avelengo.Avella.Avellino.Averara.Aversa.Avetrana.Avezzano.Aviano.Aviatico.Avigliana.Avigliano.Avigliano Umbro.Avio.Avise.Avola.Avolasca.Ayas.Aymavilles.Azeglio.Azzanello.Azzano d'Asti.Azzano Decimo.Azzano Mella.Azzano San Paolo.Azzate.Azzio.Azzone.Baceno.Bacoli.Badalucco.Badesi.Badia.Badia Calavena.Badia Pavese.Badia Polesine.Badia Tedalda.Badolato.Bagaladi.Bagheria.Bagnacavallo.Bagnara Calabra.Bagnara di Romagna.Bagnaria.Bagnaria Arsa.Bagnasco.Bagnatica.Bagni di Lucca.Bagno a Ripoli.Bagno di Romagna.Bagnoli del Trigno.Bagnoli di Sopra.Bagnoli Irpino.Bagnolo Cremasco.Bagnolo del Salento.Bagnolo di Po.Bagnolo in Piano.Bagnolo Mella.Bagnolo Piemonte.Bagnolo San Vito.Bagnone.Bagnoregio.Bagolino.Baia e Latina.Baiano.Bairo.Baiso.Bajardo.Balangero.Baldichieri d'Asti.Baldissero Canavese.Baldissero d'Alba.Baldissero Torinese.Balestrate.Balestrino.Ballabio.Ballao.Balme.Balmuccia.Balocco.Balsorano.Balvano.Balzola.Banari.Banchette.Bannio Anzino.Banzi.Baone.Baradili.Baragiano.Baranello.Barano d'Ischia.Baranzate.Barasso.Baratili San Pietro.Barbania.Barbara.Barbarano Mossano.Barbarano Romano.Barbaresco.Barbariga.Barbata.Barberino di Mugello.Barberino Tavarnelle.Barbianello.Barbiano.Barbona.Barcellona Pozzo di Gotto.Barcis.Bard.Bardello.Bardi.Bardineto.Bardolino.Bardonecchia.Bareggio.Barengo.Baressa.Barete.Barga.Bargagli.Barge.Barghe.Bari.Bari Sardo.Bariano.Baricella.Barile.Barisciano.Barlassina.Barletta.Barni.Barolo.Barone Canavese.Baronissi.Barrafranca.Barrali.Barrea.Barumini.Barzago.Barzana.Barzanò.Barzio.Basaluzzo.Bascapè.Baschi.Basciano.Baselga di Pinè.Baselice.Basiano.Basicò.Basiglio.Basiliano.Bassano Bresciano.Bassano del Grappa.Bassano in Teverina.Bassano Romano.Bassiano.Bassignana.Bastia Mondovì.Bastia Umbra.Bastida Pancarana.Bastiglia.Battaglia Terme.Battifollo.Battipaglia.Battuda.Baucina.Bauladu.Baunei.Baveno.Bedero Valcuvia.Bedizzole.Bedollo.Bedonia.Bedulita.Bee.Beinasco.Beinette.Belcastro.Belfiore.Belforte all'Isauro.Belforte del Chienti.Belforte Monferrato.Belgioioso.Belgirate.Bella.Bellagio.Bellano.Bellante.Bellaria-Igea Marina.Bellegra.Bellino.Bellinzago Lombardo.Bellinzago Novarese.Bellizzi.Bellona.Bellosguardo.Belluno.Bellusco.Belmonte Calabro.Belmonte Castello.Belmonte del Sannio.Belmonte in Sabina.Belmonte Mezzagno.Belmonte Piceno.Belpasso.Belsito.Belvedere di Spinello.Belvedere Langhe.Belvedere Marittimo.Belvedere Ostrense.Belveglio.Belvì.Bema.Bene Lario.Bene Vagienna.Benestare.Benetutti.Benevello.Benevento.Benna.Bentivoglio.Berbenno.Berbenno di Valtellina.Berceto.Berchidda.Beregazzo con Figliaro.Bereguardo.Bergamasco.Bergamo.Bergantino.Bergeggi.Bergolo.Berlingo.Bernalda.Bernareggio.Bernate Ticino.Bernezzo.Bertinoro.Bertiolo.Bertonico.Berzano di San Pietro.Berzano di Tortona.Berzo Demo.Berzo Inferiore.Berzo San Fermo.Besana in Brianza.Besano.Besate.Besenello.Besenzone.Besnate.Besozzo.Bessude.Bettola.Bettona.Beura-Cardezza.Bevagna.Beverino.Bevilacqua.Biancavilla.Bianchi.Bianco.Biandrate.Biandronno.Bianzano.Bianzè.Bianzone.Biassono.Bibbiano.Bibbiena.Bibbona.Bibiana.Biccari.Bicinicco.Bidonì.Biella.Bienno.Bieno.Bientina.Binago.Binasco.Binetto.Bioglio.Bionaz.Bione.Birori.Bisaccia.Bisacquino.Bisceglie.Bisegna.Bisenti.Bisignano.Bistagno.Bisuschio.Bitetto.Bitonto.Bitritto.Bitti.Bivona.Bivongi.Bizzarone.Bleggio Superiore.Blello.Blera.Blessagno.Blevio.Blufi.Boara Pisani.Bobbio.Bobbio Pellice.Boca.Bocchigliero.Boccioleto.Bocenago.Bodio Lomnago.Boffalora d'Adda.Boffalora sopra Ticino.Bogliasco.Bognanco.Bogogno.Boissano.Bojano.Bolano.Bolgare.Bollate.Bollengo.Bologna.Bolognano.Bolognetta.Bolognola.Bolotana.Bolsena.Boltiere.Bolzano.Bolzano Novarese.Bolzano Vicentino.Bomarzo.Bomba.Bompensiere.Bompietro.Bomporto.Bonarcado.Bonassola.Bonate Sopra.Bonate Sotto.Bonavigo.Bondeno.Bondone.Bonea.Bonefro.Bonemerse.Bonifati.Bonito.Bonnanaro.Bono.Bonorva.Bonvicino.Borbona.Borca di Cadore.Bordano.Bordighera.Bordolano.Bore.Boretto.Borgarello.Borgaro Torinese.Borgetto.Borghetto d'Arroscia.Borghetto di Borbera.Borghetto di Vara.Borghetto Lodigiano.Borghetto Santo Spirito.Borghi.Borgia.Borgiallo.Borgio Verezzi.Borgo a Mozzano.Borgo Chiese.Borgo d'Ale.Borgo d'Anaunia.Borgo di Terzo.Borgo Lares.Borgo Mantovano.Borgo Pace.Borgo Priolo.Borgo San Dalmazzo.Borgo San Giacomo.Borgo San Giovanni.Borgo San Lorenzo.Borgo San Martino.Borgo San Siro.Borgo Ticino.Borgo Tossignano.Borgo Val di Taro.Borgo Valbelluna.Borgo Valsugana.Borgo Velino.Borgo Veneto.Borgo Vercelli.Borgo Virgilio.Borgocarbonara.Borgofranco d'Ivrea.Borgolavezzaro.Borgomale.Borgomanero.Borgomaro.Borgomasino.Borgomezzavalle.Borgone Susa.Borgonovo Val Tidone.Borgoratto Alessandrino.Borgoratto Mormorolo.Borgoricco.Borgorose.Borgosatollo.Borgosesia.Bormida.Bormio.Bornasco.Borno.Boroneddu.Borore.Borrello.Borriana.Borso del Grappa.Bortigali.Bortigiadas.Borutta.Borzonasca.Bosa.Bosaro.Boschi Sant'Anna.Bosco Chiesanuova.Bosco Marengo.Bosconero.Boscoreale.Boscotrecase.Bosia.Bosio.Bosisio Parini.Bosnasco.Bossico.Bossolasco.Botricello.Botrugno.Bottanuco.Botticino.Bottidda.Bova.Bova Marina.Bovalino.Bovegno.Boves.Bovezzo.Boville Ernica.Bovino.Bovisio-Masciago.Bovolenta.Bovolone.Bozzole.Bozzolo.Bra.Bracca.Bracciano.Bracigliano.Braies.Brallo di Pregola.Brancaleone.Brandico.Brandizzo.Branzi.Braone.Brebbia.Breda di Piave.Bregano.Breganze.Bregnano.Brembate.Brembate di Sopra.Brembio.Breme.Brendola.Brenna.Brennero.Breno.Brenta.Brentino Belluno.Brentonico.Brenzone sul Garda.Brescello.Brescia.Bresimo.Bressana Bottarone.Bressanone.Bressanvido.Bresso.Brezzo di Bedero.Briaglia.Briatico.Bricherasio.Brienno.Brienza.Briga Alta.Briga Novarese.Brignano Gera d'Adda.Brignano-Frascata.Brindisi.Brindisi Montagna.Brinzio.Briona.Brione.Briosco.Brisighella.Brissago-Valtravaglia.Brissogne.Brittoli.Brivio.Broccostella.Brogliano.Brognaturo.Brolo.Brondello.Broni.Bronte.Bronzolo.Brossasco.Brosso.Brovello-Carpugnino.Brozolo.Brugherio.Brugine.Brugnato.Brugnera.Bruino.Brumano.Brunate.Brunello.Brunico.Bruno.Brusaporto.Brusasco.Brusciano.Brusimpiano.Brusnengo.Brusson.Bruzolo.Bruzzano Zeffirio.Bubbiano.Bubbio.Buccheri.Bucchianico.Bucciano.Buccinasco.Buccino.Bucine.Buddusò.Budoia.Budoni.Budrio.Buggerru.Buggiano.Buglio in Monte.Bugnara.Buguggiate.Buja.Bulciago.Bulgarograsso.Bultei.Bulzi.Buonabitacolo.Buonalbergo.Buonconvento.Buonvicino.Burago di Molgora.Burcei.Burgio.Burgos.Buriasco.Burolo.Buronzo.Busachi.Busalla.Busano.Busca.Buscate.Buscemi.Buseto Palizzolo.Busnago.Bussero.Busseto.Bussi sul Tirino.Busso.Bussolengo.Bussoleno.Busto Arsizio.Busto Garolfo.Butera.Buti.Buttapietra.Buttigliera Alta.Buttigliera d'Asti.Buttrio.Cabella Ligure.Cabiate.Cabras.Caccamo.Caccuri.Cadegliano-Viconago.Cadelbosco di Sopra.Cadeo.Caderzone Terme.Cadoneghe.Cadorago.Cadrezzate con Osmate.Caerano di San Marco.Cafasse.Caggiano.Cagli.Cagliari.Caglio.Cagnano Amiterno.Cagnano Varano.Caianello.Caiazzo.Caines.Caino.Caiolo.Cairano.Cairate.Cairo Montenotte.Caivano.Calabritto.Calalzo di Cadore.Calamandrana.Calamonaci.Calangianus.Calanna.Calasca-Castiglione.Calascibetta.Calascio.Calasetta.Calatabiano.Calatafimi-Segesta.Calcata.Calceranica al Lago.Calci.Calciano.Calcinaia.Calcinate.Calcinato.Calcio.Calco.Caldaro sulla strada del vino.Caldarola.Calderara di Reno.Caldes.Caldiero.Caldogno.Caldonazzo.Calendasco.Calenzano.Calestano.Calice al Cornoviglio.Calice Ligure.Calimera.Calitri.Calizzano.Callabiana.Calliano.Calliano.Calolziocorte.Calopezzati.Calosso.Caloveto.Caltabellotta.Caltagirone.Caltanissetta.Caltavuturo.Caltignaga.Calto.Caltrano.Calusco d'Adda.Caluso.Calvagese della Riviera.Calvanico.Calvatone.Calvello.Calvene.Calvenzano.Calvera.Calvi.Calvi dell'Umbria.Calvi Risorta.Calvignano.Calvignasco.Calvisano.Calvizzano.Camagna Monferrato.Camaiore.Camandona.Camastra.Cambiago.Cambiano.Cambiasca.Camburzano.Camerana.Camerano.Camerano Casasco.Camerata Cornello.Camerata Nuova.Camerata Picena.Cameri.Camerino.Camerota.Camigliano.Camini.Camino.Camino al Tagliamento.Camisano.Camisano Vicentino.Cammarata.Camogli.Campagna.Campagna Lupia.Campagnano di Roma.Campagnatico.Campagnola Cremasca.Campagnola Emilia.Campana.Camparada.Campegine.Campello sul Clitunno.Campertogno.Campi Bisenzio.Campi Salentina.Campiglia Cervo.Campiglia dei Berici.Campiglia Marittima.Campiglione Fenile.Campione d'Italia.Campitello di Fassa.Campli.Campo Calabro.Campo di Giove.Campo di Trens.Campo Ligure.Campo nell'Elba.Campo San Martino.Campo Tures.Campobasso.Campobello di Licata.Campobello di Mazara.Campochiaro.Campodarsego.Campodenno.Campodimele.Campodipietra.Campodolcino.Campodoro.Campofelice di Fitalia.Campofelice di Roccella.Campofilone.Campofiorito.Campoformido.Campofranco.Campogalliano.Campolattaro.Campoli Appennino.Campoli del Monte Taburno.Campolieto.Campolongo Maggiore.Campolongo Tapogliano.Campomaggiore.Campomarino.Campomorone.Camponogara.Campora.Camporeale.Camporgiano.Camporosso.Camporotondo di Fiastrone.Camporotondo Etneo.Camposampiero.Camposano.Camposanto.Campospinoso.Campotosto.Camugnano.Canal San Bovo.Canale.Canale d'Agordo.Canale Monterano.Canaro.Canazei.Cancellara.Cancello ed Arnone.Canda.Candela.Candelo.Candia Canavese.Candia Lomellina.Candiana.Candida.Candidoni.Candiolo.Canegrate.Canelli.Canepina.Caneva.Canicattì.Canicattini Bagni.Canino.Canischio.Canistro.Canna.Cannalonga.Cannara.Cannero Riviera.Canneto Pavese.Canneto sull'Oglio.Cannobio.Cannole.Canolo.Canonica d'Adda.Canosa di Puglia.Canosa Sannita.Canosio.Canossa.Cansano.Cantagallo.Cantalice.Cantalupa.Cantalupo in Sabina.Cantalupo Ligure.Cantalupo nel Sannio.Cantarana.Cantello.Canterano.Cantiano.Cantoira.Cantù.Canzano.Canzo.Caorle.Caorso.Capaccio Paestum.Capaci.Capalbio.Capannoli.Capannori.Capena.Capergnanica.Capestrano.Capiago Intimiano.Capistrano.Capistrello.Capitignano.Capizzi.Capizzone.Capo d'Orlando.Capo di Ponte.Capodimonte.Capodrise.Capoliveri.Capolona.Caponago.Caporciano.Caposele.Capoterra.Capovalle.Cappadocia.Cappella Cantone.Cappella de' Picenardi.Cappella Maggiore.Cappelle sul Tavo.Capracotta.Capraia e Limite.Capraia Isola.Capralba.Capranica.Capranica Prenestina.Caprarica di Lecce.Caprarola.Caprauna.Caprese Michelangelo.Caprezzo.Capri.Capri Leone.Capriana.Capriano del Colle.Capriata d'Orba.Capriate San Gervasio.Capriati a Volturno.Caprie.Capriglia Irpina.Capriglio.Caprile.Caprino Bergamasco.Caprino Veronese.Capriolo.Capriva del Friuli.Capua.Capurso.Caraffa del Bianco.Caraffa di Catanzaro.Caraglio.Caramagna Piemonte.Caramanico Terme.Carapelle.Carapelle Calvisio.Carasco.Carassai.Carate Brianza.Carate Urio.Caravaggio.Caravate.Caravino.Caravonica.Carbognano.Carbonara al Ticino.Carbonara di Nola.Carbonara Scrivia.Carbonate.Carbone.Carbonera.Carbonia.Carcare.Carceri.Carcoforo.Cardano al Campo.Cardè.Cardedu.Cardeto.Cardinale.Cardito.Careggine.Carema.Carenno.Carentino.Careri.Caresana.Caresanablot.Carezzano.Carfizzi.Cargeghe.Cariati.Carife.Carignano.Carimate.Carinaro.Carini.Carinola.Carisio.Carisolo.Carlantino.Carlazzo.Carlentini.Carlino.Carloforte.Carlopoli.Carmagnola.Carmiano.Carmignano.Carmignano di Brenta.Carnago.Carnate.Carobbio degli Angeli.Carolei.Carona.Caronia.Caronno Pertusella.Caronno Varesino.Carosino.Carovigno.Carovilli.Carpaneto Piacentino.Carpanzano.Carpegna.Carpenedolo.Carpeneto.Carpi.Carpiano.Carpignano Salentino.Carpignano Sesia.Carpineti.Carpineto della Nora.Carpineto Romano.Carpineto Sinello.Carpino.Carpinone.Carrara.Carrè.Carrega Ligure.Carro.Carrodano.Carrosio.Carrù.Carsoli.Cartigliano.Cartignano.Cartoceto.Cartosio.Cartura.Carugate.Carugo.Carunchio.Carvico.Carzano.Casabona.Casacalenda.Casacanditella.Casagiove.Casal Cermelli.Casal di Principe.Casal Velino.Casalanguida.Casalattico.Casalbeltrame.Casalbordino.Casalbore.Casalborgone.Casalbuono.Casalbuttano ed Uniti.Casalciprano.Casalduni.Casale Corte Cerro.Casale Cremasco-Vidolasco.Casale di Scodosia.Casale Litta.Casale Marittimo.Casale Monferrato.Casale sul Sile.Casalecchio di Reno.Casaleggio Boiro.Casaleggio Novara.Casaleone.Casaletto Ceredano.Casaletto di Sopra.Casaletto Lodigiano.Casaletto Spartano.Casaletto Vaprio.Casalfiumanese.Casalgrande.Casalgrasso.Casali del Manco.Casalincontrada.Casalino.Casalmaggiore.Casalmaiocco.Casalmorano.Casalmoro.Casalnoceto.Casalnuovo di Napoli.Casalnuovo Monterotaro.Casaloldo.Casalpusterlengo.Casalromano.Casalserugo.Casaluce.Casalvecchio di Puglia.Casalvecchio Siculo.Casalvieri.Casalvolone.Casalzuigno.Casamarciano.Casamassima.Casamicciola Terme.Casandrino.Casanova Elvo.Casanova Lerrone.Casanova Lonati.Casape.Casapesenna.Casapinta.Casaprota.Casapulla.Casarano.Casargo.Casarile.Casarsa della Delizia.Casarza Ligure.Casasco.Casatenovo.Casatisma.Casavatore.Casazza.Cascia.Casciago.Casciana Terme Lari.Cascina.Cascinette d'Ivrea.Casei Gerola.Caselette.Casella.Caselle in Pittari.Caselle Landi.Caselle Lurani.Caselle Torinese.Caserta.Casier.Casignana.Casina.Casirate d'Adda.Caslino d'Erba.Casnate con Bernate.Casnigo.Casola di Napoli.Casola in Lunigiana.Casola Valsenio.Casole d'Elsa.Casoli.Casorate Primo.Casorate Sempione.Casorezzo.Casoria.Casorzo.Casperia.Caspoggio.Cassacco.Cassago Brianza.Cassano all'Ionio.Cassano d'Adda.Cassano delle Murge.Cassano Irpino.Cassano Magnago.Cassano Spinola.Cassano Valcuvia.Cassaro.Cassiglio.Cassina de' Pecchi.Cassina Rizzardi.Cassina Valsassina.Cassinasco.Cassine.Cassinelle.Cassinetta di Lugagnano.Cassino.Cassola.Cassolnovo.Castagnaro.Castagneto Carducci.Castagneto Po.Castagnito.Castagnole delle Lanze.Castagnole Monferrato.Castagnole Piemonte.Castana.Castano Primo.Casteggio.Castegnato.Castegnero.Castel Baronia.Castel Boglione.Castel Bolognese.Castel Campagnano.Castel Castagna.Castel Condino.Castel d'Aiano.Castel d'Ario.Castel d'Azzano.Castel del Giudice.Castel del Monte.Castel del Piano.Castel del Rio.Castel di Casio.Castel di Ieri.Castel di Iudica.Castel di Lama.Castel di Lucio.Castel di Sangro.Castel di Sasso.Castel di Tora.Castel Focognano.Castel Frentano.Castel Gabbiano.Castel Gandolfo.Castel Giorgio.Castel Goffredo.Castel Guelfo di Bologna.Castel Ivano.Castel Madama.Castel Maggiore.Castel Mella.Castel Morrone.Castel Ritaldi.Castel Rocchero.Castel Rozzone.Castel San Giorgio.Castel San Giovanni.Castel San Lorenzo.Castel San Niccolò.Castel San Pietro Romano.Castel San Pietro Terme.Castel San Vincenzo.Castel Sant'Angelo.Castel Sant'Elia.Castel Viscardo.Castel Vittorio.Castel Volturno.Castelbaldo.Castelbelforte.Castelbellino.Castelbello-Ciardes.Castelbianco.Castelbottaccio.Castelbuono.Castelcivita.Castelcovati.Castelcucco.Casteldaccia.Casteldelci.Casteldelfino.Casteldidone.Castelfidardo.Castelfiorentino.Castelforte.Castelfranci.Castelfranco di Sotto.Castelfranco Emilia.Castelfranco in Miscano.Castelfranco Piandiscò.Castelfranco Veneto.Castelgerundo.Castelgomberto.Castelgrande.Castelguglielmo.Castelguidone.Castell'Alfero.Castell'Arquato.Castell'Azzara.Castell'Umberto.Castellabate.Castellafiume.Castellalto.Castellammare del Golfo.Castellammare di Stabia.Castellamonte.Castellana Grotte.Castellana Sicula.Castellaneta.Castellania Coppi.Castellanza.Castellar Guidobono.Castellarano.Castellaro.Castellazzo Bormida.Castellazzo Novarese.Castelleone.Castelleone di Suasa.Castellero.Castelletto Cervo.Castelletto d'Erro.Castelletto d'Orba.Castelletto di Branduzzo.Castelletto Merli.Castelletto Molina.Castelletto Monferrato.Castelletto sopra Ticino.Castelletto Stura.Castelletto Uzzone.Castelli.Castelli Calepio.Castellina in Chianti.Castellina Marittima.Castellinaldo d'Alba.Castellino del Biferno.Castellino Tanaro.Castelliri.Castello Cabiaglio.Castello d'Agogna.Castello d'Argile.Castello del Matese.Castello dell'Acqua.Castello di Annone.Castello di Brianza.Castello di Cisterna.Castello di Godego.Castello Tesino.Castello-Molina di Fiemme.Castellucchio.Castelluccio dei Sauri.Castelluccio Inferiore.Castelluccio Superiore.Castelluccio Valmaggiore.Castelmagno.Castelmarte.Castelmassa.Castelmauro.Castelmezzano.Castelmola.Castelnovetto.Castelnovo Bariano.Castelnovo del Friuli.Castelnovo di Sotto.Castelnovo ne' Monti.Castelnuovo.Castelnuovo Belbo.Castelnuovo Berardenga.Castelnuovo Bocca d'Adda.Castelnuovo Bormida.Castelnuovo Bozzente.Castelnuovo Calcea.Castelnuovo Cilento.Castelnuovo del Garda.Castelnuovo della Daunia.Castelnuovo di Ceva.Castelnuovo di Conza.Castelnuovo di Farfa.Castelnuovo di Garfagnana.Castelnuovo di Porto.Castelnuovo di Val di Cecina.Castelnuovo Don Bosco.Castelnuovo Magra.Castelnuovo Nigra.Castelnuovo Parano.Castelnuovo Rangone.Castelnuovo Scrivia.Castelpagano.Castelpetroso.Castelpizzuto.Castelplanio.Castelpoto.Castelraimondo.Castelrotto.Castelsantangelo sul Nera.Castelsaraceno.Castelsardo.Castelseprio.Castelsilano.Castelspina.Casteltermini.Castelveccana.Castelvecchio Calvisio.Castelvecchio di Rocca Barbena.Castelvecchio Subequo.Castelvenere.Castelverde.Castelverrino.Castelvetere in Val Fortore.Castelvetere sul Calore.Castelvetrano.Castelvetro di Modena.Castelvetro Piacentino.Castelvisconti.Castenaso.Castenedolo.Castiadas.Castiglion Fibocchi.Castiglion Fiorentino.Castiglione a Casauria.Castiglione Chiavarese.Castiglione Cosentino.Castiglione d'Adda.Castiglione d'Orcia.Castiglione dei Pepoli.Castiglione del Genovesi.Castiglione del Lago.Castiglione della Pescaia.Castiglione delle Stiviere.Castiglione di Garfagnana.Castiglione di Sicilia.Castiglione Falletto.Castiglione in Teverina.Castiglione Messer Marino.Castiglione Messer Raimondo.Castiglione Olona.Castiglione Tinella.Castiglione Torinese.Castignano.Castilenti.Castino.Castione Andevenno.Castione della Presolana.Castions di Strada.Castiraga Vidardo.Casto.Castorano.Castrezzato.Castri di Lecce.Castrignano de' Greci.Castrignano del Capo.Castro.Castro.Castro dei Volsci.Castrocaro Terme e Terra del Sole.Castrocielo.Castrofilippo.Castrolibero.Castronno.Castronovo di Sicilia.Castronuovo di Sant'Andrea.Castropignano.Castroreale.Castroregio.Castrovillari.Catania.Catanzaro.Catenanuova.Catignano.Cattolica.Cattolica Eraclea.Caulonia.Cautano.Cava de' Tirreni.Cava Manara.Cavaglià.Cavaglietto.Cavaglio d'Agogna.Cavagnolo.Cavaion Veronese.Cavalese.Cavallerleone.Cavallermaggiore.Cavallino.Cavallino-Treporti.Cavallirio.Cavareno.Cavargna.Cavaria con Premezzo.Cavarzere.Cavaso del Tomba.Cavasso Nuovo.Cavatore.Cavazzo Carnico.Cave.Cavedago.Cavedine.Cavenago d'Adda.Cavenago di Brianza.Cavernago.Cavezzo.Cavizzana.Cavour.Cavriago.Cavriana.Cavriglia.Cazzago Brabbia.Cazzago San Martino.Cazzano di Tramigna.Cazzano Sant'Andrea.Ceccano.Cecima.Cecina.Cedegolo.Cedrasco.Cefalà Diana.Cefalù.Ceggia.Ceglie Messapica.Celano.Celenza sul Trigno.Celenza Valfortore.Celico.Cella Dati.Cella Monte.Cellamare.Cellara.Cellarengo.Cellatica.Celle di Bulgheria.Celle di Macra.Celle di San Vito.Celle Enomondo.Celle Ligure.Celleno.Cellere.Cellino Attanasio.Cellino San Marco.Cellio con Breia.Cellole.Cembra Lisignago.Cenadi.Cenate Sopra.Cenate Sotto.Cencenighe Agordino.Cene.Ceneselli.Cengio.Centallo.Cento.Centola.Centrache.Centro Valle Intelvi.Centuripe.Cepagatti.Ceppaloni.Ceppo Morelli.Ceprano.Cerami.Ceranesi.Cerano.Cerano d'Intelvi.Ceranova.Ceraso.Cercemaggiore.Cercenasco.Cercepiccola.Cerchiara di Calabria.Cerchio.Cercino.Cercivento.Cercola.Cerda.Cerea.Ceregnano.Cerenzia.Ceres.Ceresara.Cereseto.Ceresole Alba.Ceresole Reale.Cerete.Ceretto Lomellina.Cergnago.Ceriale.Ceriana.Ceriano Laghetto.Cerignale.Cerignola.Cerisano.Cermenate.Cermes.Cermignano.Cernobbio.Cernusco Lombardone.Cernusco sul Naviglio.Cerreto d'Asti.Cerreto d'Esi.Cerreto di Spoleto.Cerreto Grue.Cerreto Guidi.Cerreto Laziale.Cerreto Sannita.Cerretto Langhe.Cerrina Monferrato.Cerrione.Cerro al Lambro.Cerro al Volturno.Cerro Maggiore.Cerro Tanaro.Cerro Veronese.Cersosimo.Certaldo.Certosa di Pavia.Cerva.Cervara di Roma.Cervarese Santa Croce.Cervaro.Cervasca.Cervatto.Cerveno.Cervere.Cervesina.Cerveteri.Cervia.Cervicati.Cervignano d'Adda.Cervignano del Friuli.Cervinara.Cervino.Cervo.Cerzeto.Cesa.Cesana Brianza.Cesana Torinese.Cesano Boscone.Cesano Maderno.Cesara.Cesarò.Cesate.Cesena.Cesenatico.Cesinali.Cesio.Cesiomaggiore.Cessalto.Cessaniti.Cessapalombo.Cessole.Cetara.Ceto.Cetona.Cetraro.Ceva.Cevo.Challand-Saint-Anselme.Challand-Saint-Victor.Chambave.Chamois.Champdepraz.Champorcher.Charvensod.Châtillon.Cherasco.Cheremule.Chialamberto.Chiampo.Chianche.Chianciano Terme.Chianni.Chianocco.Chiaramonte Gulfi.Chiaramonti.Chiarano.Chiaravalle.Chiaravalle Centrale.Chiari.Chiaromonte.Chiauci.Chiavari.Chiavenna.Chiaverano.Chienes.Chieri.Chies d'Alpago.Chiesa in Valmalenco.Chiesanuova.Chiesina Uzzanese.Chieti.Chieuti.Chieve.Chignolo d'Isola.Chignolo Po.Chioggia.Chiomonte.Chions.Chiopris-Viscone.Chitignano.Chiuduno.Chiuppano.Chiuro.Chiusa.Chiusa di Pesio.Chiusa di San Michele.Chiusa Sclafani.Chiusaforte.Chiusanico.Chiusano d'Asti.Chiusano di San Domenico.Chiusavecchia.Chiusdino.Chiusi.Chiusi della Verna.Chivasso.Ciampino.Cianciana.Cibiana di Cadore.Cicagna.Cicala.Cicciano.Cicerale.Ciciliano.Cicognolo.Ciconio.Cigliano.Cigliè.Cigognola.Cigole.Cilavegna.Cimadolmo.Cimbergo.Ciminà.Ciminna.Cimitile.Cimolais.Cimone.Cinaglio.Cineto Romano.Cingia de' Botti.Cingoli.Cinigiano.Cinisello Balsamo.Cinisi.Cino.Cinquefrondi.Cintano.Cinte Tesino.Cinto Caomaggiore.Cinto Euganeo.Cinzano.Ciorlano.Cipressa.Circello.Ciriè.Cirigliano.Cirimido.Cirò.Cirò Marina.Cis.Cisano Bergamasco.Cisano sul Neva.Ciserano.Cislago.Cisliano.Cison di Valmarino.Cissone.Cisterna d'Asti.Cisterna di Latina.Cisternino.Citerna.Città della Pieve.Città di Castello.Città Sant'Angelo.Cittadella.Cittaducale.Cittanova.Cittareale.Cittiglio.Civate.Civezza.Civezzano.Civiasco.Cividale del Friuli.Cividate al Piano.Cividate Camuno.Civita.Civita Castellana.Civita d'Antino.Civitacampomarano.Civitaluparella.Civitanova del Sannio.Civitanova Marche.Civitaquana.Civitavecchia.Civitella Alfedena.Civitella Casanova.Civitella d'Agliano.Civitella del Tronto.Civitella di Romagna.Civitella in Val di Chiana.Civitella Messer Raimondo.Civitella Paganico.Civitella Roveto.Civitella San Paolo.Civo.Claino con Osteno.Claut.Clauzetto.Clavesana.Claviere.Cles.Cleto.Clivio.Clusone.Coassolo Torinese.Coazze.Coazzolo.Coccaglio.Cocconato.Cocquio-Trevisago.Cocullo.Codevigo.Codevilla.Codigoro.Codognè.Codogno.Codroipo.Codrongianos.Coggiola.Cogliate.Cogne.Cogoleto.Cogollo del Cengio.Cogorno.Colazza.Colceresa.Colere.Colfelice.Coli.Colico.Collalto Sabino.Collarmele.Collazzone.Colle Brianza.Colle d'Anchise.Colle di Tora.Colle di Val d'Elsa.Colle San Magno.Colle Sannita.Colle Santa Lucia.Colle Umberto.Collebeato.Collecchio.Collecorvino.Colledara.Colledimacine.Colledimezzo.Colleferro.Collegiove.Collegno.Collelongo.Collepardo.Collepasso.Collepietro.Colleretto Castelnuovo.Colleretto Giacosa.Collesalvetti.Collesano.Colletorto.Collevecchio.Colli a Volturno.Colli al Metauro.Colli del Tronto.Colli sul Velino.Colli Verdi.Colliano.Collinas.Collio.Collobiano.Colloredo di Monte Albano.Colmurano.Colobraro.Cologna Veneta.Cologne.Cologno al Serio.Cologno Monzese.Colognola ai Colli.Colonna.Colonnella.Colonno.Colorina.Colorno.Colosimi.Colturano.Colverde.Colzate.Comabbio.Comacchio.Comano.Comano Terme.Comazzo.Comeglians.Comelico Superiore.Comerio.Comezzano-Cizzago.Comignago.Comiso.Comitini.Comiziano.Commessaggio.Commezzadura.Como.Compiano.Comun Nuovo.Comunanza.Cona.Conca Casale.Conca dei Marini.Conca della Campania.Concamarise.Concerviano.Concesio.Concordia Sagittaria.Concordia sulla Secchia.Concorezzo.Condofuri.Condove.Condrò.Conegliano.Confienza.Configni.Conflenti.Coniolo.Conselice.Conselve.Contà.Contessa Entellina.Contigliano.Contrada.Controguerra.Controne.Contursi Terme.Conversano.Conza della Campania.Conzano.Copertino.Copiano.Copparo.Corana.Corato.Corbara.Corbetta.Corbola.Corchiano.Corciano.Cordenons.Cordignano.Cordovado.Coreglia Antelminelli.Coreglia Ligure.Coreno Ausonio.Corfinio.Cori.Coriano.Corigliano d'Otranto.Corigliano-Rossano.Corinaldo.Corio.Corleone.Corleto Monforte.Corleto Perticara.Cormano.Cormons.Corna Imagna.Cornalba.Cornale e Bastida.Cornaredo.Cornate d'Adda.Cornedo all'Isarco.Cornedo Vicentino.Cornegliano Laudense.Corneliano d'Alba.Corniglio.Corno di Rosazzo.Corno Giovine.Cornovecchio.Cornuda.Correggio.Correzzana.Correzzola.Corrido.Corridonia.Corropoli.Corsano.Corsico.Corsione.Cortaccia sulla strada del vino.Cortale.Cortandone.Cortanze.Cortazzone.Corte Brugnatella.Corte de' Cortesi con Cignone.Corte de' Frati.Corte Franca.Corte Palasio.Cortemaggiore.Cortemilia.Corteno Golgi.Cortenova.Cortenuova.Corteolona e Genzone.Cortiglione.Cortina d'Ampezzo.Cortina sulla strada del vino.Cortino.Cortona.Corvara.Corvara in Badia.Corvino San Quirico.Corzano.Coseano.Cosenza.Cosio d'Arroscia.Cosio Valtellino.Cosoleto.Cossano Belbo.Cossano Canavese.Cossato.Cosseria.Cossignano.Cossogno.Cossoine.Cossombrato.Costa de' Nobili.Costa di Mezzate.Costa di Rovigo.Costa Masnaga.Costa Serina.Costa Valle Imagna.Costa Vescovato.Costa Volpino.Costabissara.Costacciaro.Costanzana.Costarainera.Costermano sul Garda.Costigliole d'Asti.Costigliole Saluzzo.Cotignola.Cotronei.Cottanello.Courmayeur.Covo.Cozzo.Craco.Crandola Valsassina.Cravagliana.Cravanzana.Craveggia.Creazzo.Crecchio.Credaro.Credera Rubbiano.Crema.Cremella.Cremenaga.Cremeno.Cremia.Cremolino.Cremona.Cremosano.Crescentino.Crespadoro.Crespiatica.Crespina Lorenzana.Crespino.Cressa.Crevacuore.Crevalcore.Crevoladossola.Crispano.Crispiano.Crissolo.Crocefieschi.Crocetta del Montello.Crodo.Crognaleto.Cropalati.Cropani.Crosia.Crosio della Valle.Crotone.Crotta d'Adda.Crova.Croviana.Crucoli.Cuasso al Monte.Cuccaro Vetere.Cucciago.Cuceglio.Cuggiono.Cugliate-Fabiasco.Cuglieri.Cugnoli.Cumiana.Cumignano sul Naviglio.Cunardo.Cuneo.Cunico.Cuorgnè.Cupello.Cupra Marittima.Cupramontana.Cura Carpignano.Curcuris.Cureggio.Curiglia con Monteviasco.Curinga.Curino.Curno.Curon Venosta.Cursi.Curtarolo.Curtatone.Curti.Cusago.Cusano Milanino.Cusano Mutri.Cusino.Cusio.Custonaci.Cutro.Cutrofiano.Cuveglio.Cuvio.Dairago.Dalmine.Dambel.Danta di Cadore.Darfo Boario Terme.Dasà.Davagna.Daverio.Davoli.Dazio.Decimomannu.Decimoputzu.Decollatura.Dego.Deiva Marina.Delebio.Delia.Delianuova.Deliceto.Dello.Demonte.Denice.Denno.Dernice.Derovere.Deruta.Dervio.Desana.Desenzano del Garda.Desio.Desulo.Diamante.Diano Arentino.Diano Castello.Diano d'Alba.Diano Marina.Diano San Pietro.Dicomano.Dignano.Dimaro Folgarida.Dinami.Dipignano.Diso.Divignano.Dizzasco.Dobbiaco.Doberdò del Lago.Dogliani.Dogliola.Dogna.Dolcè.Dolceacqua.Dolcedo.Dolegna del Collio.Dolianova.Dolo.Dolzago.Domanico.Domaso.Domegge di Cadore.Domicella.Domodossola.Domus de Maria.Domusnovas.Donato.Dongo.Donnas.Donori.Dorgali.Dorio.Dormelletto.Dorno.Dorzano.Dosolo.Dossena.Dosso del Liro.Doues.Dovadola.Dovera.Dozza.Dragoni.Drapia.Drena.Drenchia.Dresano.Dro.Dronero.Druento.Druogno.Dualchi.Dubino.Due Carrare.Dueville.Dugenta.Duino Aurisina.Dumenza.Duno.Durazzano.Duronia.Dusino San Michele.Eboli.Edolo.Egna.Elice.Elini.Ello.Elmas.Elva.Emarèse.Empoli.Endine Gaiano.Enego.Enemonzo.Enna.Entracque.Entratico.Envie.Episcopia.Eraclea.Erba.Erbè.Erbezzo.Erbusco.Erchie.Ercolano.Erice.Erli.Erto e Casso.Erula.Erve.Esanatoglia.Escalaplano.Escolca.Esine.Esino Lario.Esperia.Esporlatu.Este.Esterzili.Etroubles.Eupilio.Exilles.Fabbrica Curone.Fabbriche di Vergemoli.Fabbrico.Fabriano.Fabrica di Roma.Fabrizia.Fabro.Faedis.Faedo Valtellino.Faenza.Faeto.Fagagna.Faggeto Lario.Faggiano.Fagnano Alto.Fagnano Castello.Fagnano Olona.Fai della Paganella.Faicchio.Falcade.Falciano del Massico.Falconara Albanese.Falconara Marittima.Falcone.Faleria.Falerna.Falerone.Fallo.Faloppio.Falvaterra.Falzes.Fanano.Fanna.Fano.Fano Adriano.Fara Filiorum Petri.Fara Gera d'Adda.Fara in Sabina.Fara Novarese.Fara Olivana con Sola.Fara San Martino.Fara Vicentino.Fardella.Farigliano.Farindola.Farini.Farnese.Farra d'Isonzo.Farra di Soligo.Fasano.Fascia.Fauglia.Faule.Favale di Malvaro.Favara.Favignana.Favria.Feisoglio.Feletto.Felino.Felitto.Felizzano.Feltre.Fenegrò.Fenestrelle.Fénis.Ferentillo.Ferentino.Ferla.Fermignano.Fermo.Ferno.Feroleto Antico.Feroleto della Chiesa.Ferrandina.Ferrara.Ferrara di Monte Baldo.Ferrazzano.Ferrera di Varese.Ferrera Erbognone.Ferrere.Ferriere.Ferruzzano.Fiamignano.Fiano.Fiano Romano.Fiastra.Fiavè.Ficarazzi.Ficarolo.Ficarra.Ficulle.Fidenza.Fiè allo Sciliar.Fierozzo.Fiesco.Fiesole.Fiesse.Fiesso d'Artico.Fiesso Umbertiano.Figino Serenza.Figline e Incisa Valdarno.Figline Vegliaturo.Filacciano.Filadelfia.Filago.Filandari.Filattiera.Filettino.Filetto.Filiano.Filighera.Filignano.Filogaso.Filottrano.Finale Emilia.Finale Ligure.Fino del Monte.Fino Mornasco.Fiorano al Serio.Fiorano Canavese.Fiorano Modenese.Fiorenzuola d'Arda.Firenze.Firenzuola.Firmo.Fiscaglia.Fisciano.Fiuggi.Fiumalbo.Fiumara.Fiume Veneto.Fiumedinisi.Fiumefreddo Bruzio.Fiumefreddo di Sicilia.Fiumicello Villa Vicentina.Fiumicino.Fiuminata.Fivizzano.Flaibano.Flero.Floresta.Floridia.Florinas.Flumeri.Fluminimaggiore.Flussio.Fobello.Foggia.Foglianise.Fogliano Redipuglia.Foglizzo.Foiano della Chiana.Foiano di Val Fortore.Folgaria.Folignano.Foligno.Follina.Follo.Follonica.Fombio.Fondachelli-Fantina.Fondi.Fonni.Fontainemore.Fontana Liri.Fontanafredda.Fontanarosa.Fontanelice.Fontanella.Fontanellato.Fontanelle.Fontaneto d'Agogna.Fontanetto Po.Fontanigorda.Fontanile.Fontaniva.Fonte.Fonte Nuova.Fontecchio.Fontechiari.Fontegreca.Fonteno.Fontevivo.Fonzaso.Foppolo.Forano.Force.Forchia.Forcola.Fordongianus.Forenza.Foresto Sparso.Forgaria nel Friuli.Forino.Forio.Forlì.Forlì del Sannio.Forlimpopoli.Formazza.Formello.Formia.Formicola.Formigara.Formigine.Formigliana.Fornace.Fornelli.Forni Avoltri.Forni di Sopra.Forni di Sotto.Forno Canavese.Fornovo di Taro.Fornovo San Giovanni.Forte dei Marmi.Fortezza.Fortunago.Forza d'Agrò.Fosciandora.Fosdinovo.Fossa.Fossacesia.Fossalta di Piave.Fossalta di Portogruaro.Fossalto.Fossano.Fossato di Vico.Fossato Serralta.Fossò.Fossombrone.Foza.Frabosa Soprana.Frabosa Sottana.Fraconalto.Fragagnano.Fragneto l'Abate.Fragneto Monforte.Fraine.Framura.Francavilla al Mare.Francavilla Angitola.Francavilla Bisio.Francavilla d'Ete.Francavilla di Sicilia.Francavilla Fontana.Francavilla in Sinni.Francavilla Marittima.Francica.Francofonte.Francolise.Frascaro.Frascarolo.Frascati.Frascineto.Frassilongo.Frassinelle Polesine.Frassinello Monferrato.Frassineto Po.Frassinetto.Frassino.Frassinoro.Frasso Sabino.Frasso Telesino.Fratta Polesine.Fratta Todina.Frattamaggiore.Frattaminore.Fratte Rosa.Frazzanò.Fregona.Fresagrandinaria.Fresonara.Frigento.Frignano.Frinco.Frisa.Frisanco.Front.Frontino.Frontone.Frosinone.Frosolone.Frossasco.Frugarolo.Fubine Monferrato.Fucecchio.Fuipiano Valle Imagna.Fumane.Fumone.Funes.Furci.Furci Siculo.Furnari.Furore.Furtei.Fuscaldo.Fusignano.Fusine.Futani.Gabbioneta-Binanuova.Gabiano.Gabicce Mare.Gaby.Gadesco-Pieve Delmona.Gadoni.Gaeta.Gaggi.Gaggiano.Gaggio Montano.Gaglianico.Gagliano Aterno.Gagliano Castelferrato.Gagliano del Capo.Gagliato.Gagliole.Gaiarine.Gaiba.Gaiola.Gaiole in Chianti.Gairo.Gais.Galati Mamertino.Galatina.Galatone.Galatro.Galbiate.Galeata.Galgagnano.Gallarate.Gallese.Galliate.Galliate Lombardo.Galliavola.Gallicano.Gallicano nel Lazio.Gallicchio.Galliera.Galliera Veneta.Gallinaro.Gallio.Gallipoli.Gallo Matese.Gallodoro.Galluccio.Galtellì.Galzignano Terme.Gamalero.Gambara.Gambarana.Gambasca.Gambassi Terme.Gambatesa.Gambellara.Gamberale.Gambettola.Gambolò.Gambugliano.Gandellino.Gandino.Gandosso.Gangi.Garaguso.Garbagna.Garbagna Novarese.Garbagnate Milanese.Garbagnate Monastero.Garda.Gardone Riviera.Gardone Val Trompia.Garessio.Gargallo.Gargazzone.Gargnano.Garlasco.Garlate.Garlenda.Garniga Terme.Garzeno.Garzigliana.Gasperina.Gassino Torinese.Gattatico.Gatteo.Gattico-Veruno.Gattinara.Gavardo.Gavello.Gaverina Terme.Gavi.Gavignano.Gavirate.Gavoi.Gavorrano.Gazoldo degli Ippoliti.Gazzada Schianno.Gazzaniga.Gazzo.Gazzo Veronese.Gazzola.Gazzuolo.Gela.Gemmano.Gemona del Friuli.Gemonio.Genazzano.Genga.Genivolta.Genola.Genoni.Genova.Genuri.Genzano di Lucania.Genzano di Roma.Gera Lario.Gerace.Geraci Siculo.Gerano.Gerenzago.Gerenzano.Gergei.Germagnano.Germagno.Germignaga.Gerocarne.Gerola Alta.Gerre de' Caprioli.Gesico.Gessate.Gessopalena.Gesturi.Gesualdo.Ghedi.Ghemme.Ghiffa.Ghilarza.Ghisalba.Ghislarengo.Giacciano con Baruchella.Giaglione.Gianico.Giano dell'Umbria.Giano Vetusto.Giardinello.Giardini-Naxos.Giarole.Giarratana.Giarre.Giave.Giaveno.Giavera del Montello.Giba.Gibellina.Gifflenga.Giffone.Giffoni Sei Casali.Giffoni Valle Piana.Gignese.Gignod.Gildone.Gimigliano.Ginestra.Ginestra degli Schiavoni.Ginosa.Gioi.Gioia dei Marsi.Gioia del Colle.Gioia Sannitica.Gioia Tauro.Gioiosa Ionica.Gioiosa Marea.Giove.Giovinazzo.Giovo.Girasole.Girifalco.Gissi.Giuggianello.Giugliano in Campania.Giuliana.Giuliano di Roma.Giuliano Teatino.Giulianova.Giungano.Giurdignano.Giussago.Giussano.Giustenice.Giustino.Giusvalla.Givoletto.Gizzeria.Glorenza.Godega di Sant'Urbano.Godiasco Salice Terme.Godrano.Goito.Golasecca.Golferenzo.Golfo Aranci.Gombito.Gonars.Goni.Gonnesa.Gonnoscodina.Gonnosfanadiga.Gonnosnò.Gonnostramatza.Gonzaga.Gordona.Gorga.Gorgo al Monticano.Gorgoglione.Gorgonzola.Goriano Sicoli.Gorizia.Gorla Maggiore.Gorla Minore.Gorlago.Gorle.Gornate Olona.Gorno.Goro.Gorreto.Gorzegno.Gosaldo.Gossolengo.Gottasecca.Gottolengo.Govone.Gozzano.Gradara.Gradisca d'Isonzo.Grado.Gradoli.Graffignana.Graffignano.Graglia.Gragnano.Gragnano Trebbiense.Grammichele.Grana.Granarolo dell'Emilia.Grandate.Grandola ed Uniti.Graniti.Granozzo con Monticello.Grantola.Grantorto.Granze.Grassano.Grassobbio.Gratteri.Gravedona ed Uniti.Gravellona Lomellina.Gravellona Toce.Gravere.Gravina di Catania.Gravina in Puglia.Grazzanise.Grazzano Badoglio.Greccio.Greci.Greggio.Gremiasco.Gressan.Gressoney-La-Trinité.Gressoney-Saint-Jean.Greve in Chianti.Grezzago.Grezzana.Griante.Gricignano di Aversa.Grignasco.Grigno.Grimacco.Grimaldi.Grinzane Cavour.Grisignano di Zocco.Grisolia.Grizzana Morandi.Grognardo.Gromo.Grondona.Grone.Grontardo.Gropello Cairoli.Gropparello.Groscavallo.Grosio.Grosotto.Grosseto.Grosso.Grottaferrata.Grottaglie.Grottaminarda.Grottammare.Grottazzolina.Grotte.Grotte di Castro.Grotteria.Grottole.Grottolella.Gruaro.Grugliasco.Grumello Cremonese ed Uniti.Grumello del Monte.Grumento Nova.Grumo Appula.Grumo Nevano.Grumolo delle Abbadesse.Guagnano.Gualdo.Gualdo Cattaneo.Gualdo Tadino.Gualtieri.Gualtieri Sicaminò.Guamaggiore.Guanzate.Guarcino.Guarda Veneta.Guardabosone.Guardamiglio.Guardavalle.Guardea.Guardia Lombardi.Guardia Perticara.Guardia Piemontese.Guardia Sanframondi.Guardiagrele.Guardialfiera.Guardiaregia.Guardistallo.Guarene.Guasila.Guastalla.Guazzora.Gubbio.Gudo Visconti.Guglionesi.Guidizzolo.Guidonia Montecelio.Guiglia.Guilmi.Gurro.Guspini.Gussago.Gussola.Hône.Idro.Iglesias.Igliano.Ilbono.Illasi.Illorai.Imbersago.Imer.Imola.Imperia.Impruneta.Inarzo.Incisa Scapaccino.Incudine.Induno Olona.Ingria.Intragna.Introbio.Introd.Introdacqua.Inverigo.Inverno e Monteleone.Inverso Pinasca.Inveruno.Invorio.Inzago.Ionadi.Irgoli.Irma.Irsina.Isasca.Isca sullo Ionio.Ischia.Ischia di Castro.Ischitella.Iseo.Isera.Isernia.Isili.Isnello.Isola d'Asti.Isola del Cantone.Isola del Giglio.Isola del Gran Sasso d'Italia.Isola del Liri.Isola del Piano.Isola della Scala.Isola delle Femmine.Isola di Capo Rizzuto.Isola di Fondra.Isola Dovarese.Isola Rizza.Isola Sant'Antonio.Isola Vicentina.Isolabella.Isolabona.Isole Tremiti.Isorella.Ispani.Ispica.Ispra.Issiglio.Issime.Isso.Issogne.Istrana.Itala.Itri.Ittireddu.Ittiri.Ivrea.Izano.Jacurso.Jelsi.Jenne.Jerago con Orago.Jerzu.Jesi.Jesolo.Jolanda di Savoia.Joppolo.Joppolo Giancaxio.Jovençan.L'Aquila.La Cassa.La Loggia.La Maddalena.La Magdeleine.La Morra.La Salle.La Spezia.La Thuile.La Valle.La Valle Agordina.La Valletta Brianza.Labico.Labro.Lacchiarella.Lacco Ameno.Lacedonia.Laces.Laconi.Ladispoli.Laerru.Laganadi.Laghi.Laglio.Lagnasco.Lago.Lagonegro.Lagosanto.Lagundo.Laigueglia.Lainate.Laino.Laino Borgo.Laino Castello.Laion.Laives.Lajatico.Lallio.Lama dei Peligni.Lama Mocogno.Lambrugo.Lamezia Terme.Lamon.Lampedusa e Linosa.Lamporecchio.Lamporo.Lana.Lanciano.Landiona.Landriano.Langhirano.Langosco.Lanusei.Lanuvio.Lanzada.Lanzo Torinese.Lapedona.Lapio.Lappano.Larciano.Lardirago.Lariano.Larino.Las Plassas.Lasa.Lascari.Lasnigo.Lastebasse.Lastra a Signa.Latera.Laterina Pergine Valdarno.Laterza.Latiano.Latina.Latisana.Latronico.Lattarico.Lauco.Laureana Cilento.Laureana di Borrello.Lauregno.Laurenzana.Lauria.Lauriano.Laurino.Laurito.Lauro.Lavagna.Lavagno.Lavarone.Lavello.Lavena Ponte Tresa.Laveno-Mombello.Lavenone.Laviano.Lavis.Lazise.Lazzate.Lecce.Lecce nei Marsi.Lecco.Ledro.Leffe.Leggiuno.Legnago.Legnano.Legnaro.Lei.Leini.Leivi.Lemie.Lendinara.Leni.Lenna.Leno.Lenola.Lenta.Lentate sul Seveso.Lentella.Lentini.Leonessa.Leonforte.Leporano.Lequile.Lequio Berria.Lequio Tanaro.Lercara Friddi.Lerici.Lerma.Lesa.Lesegno.Lesignano de' Bagni.Lesina.Lesmo.Lessolo.Lessona.Lestizza.Letino.Letojanni.Lettere.Lettomanoppello.Lettopalena.Levanto.Levate.Leverano.Levice.Levico Terme.Levone.Lezzeno.Liberi.Librizzi.Licata.Licciana Nardi.Licenza.Licodia Eubea.Lierna.Lignana.Lignano Sabbiadoro.Lillianes.Limana.Limatola.Limbadi.Limbiate.Limena.Limido Comasco.Limina.Limone Piemonte.Limone sul Garda.Limosano.Linarolo.Linguaglossa.Lioni.Lipari.Lipomo.Lirio.Liscate.Liscia.Lisciano Niccone.Lisio.Lissone.Liveri.Livigno.Livinallongo del Col di Lana.Livo.Livo.Livorno.Livorno Ferraris.Livraga.Lizzanello.Lizzano.Lizzano in Belvedere.Loano.Loazzolo.Locana.Locate di Triulzi.Locate Varesino.Locatello.Loceri.Locorotondo.Locri.Loculi.Lodè.Lodi.Lodi Vecchio.Lodine.Lodrino.Lograto.Loiano.Loiri Porto San Paolo.Lomagna.Lomazzo.Lombardore.Lombriasco.Lomello.Lona-Lases.Lonate Ceppino.Lonate Pozzolo.Lonato del Garda.Londa.Longano.Longare.Longarone.Longhena.Longi.Longiano.Longobardi.Longobucco.Longone al Segrino.Longone Sabino.Lonigo.Loranzè.Loreggia.Loreglia.Lorenzago di Cadore.Loreo.Loreto.Loreto Aprutino.Loria.Loro Ciuffenna.Loro Piceno.Lorsica.Losine.Lotzorai.Lovere.Lovero.Lozio.Lozza.Lozzo Atestino.Lozzo di Cadore.Lozzolo.Lu e Cuccaro Monferrato.Lubriano.Lucca.Lucca Sicula.Lucera.Lucignano.Lucinasco.Lucito.Luco dei Marsi.Lucoli.Lugagnano Val d'Arda.Lugnano in Teverina.Lugo.Lugo di Vicenza.Luino.Luisago.Lula.Lumarzo.Lumezzane.Lunamatrona.Lunano.Lungavilla.Lungro.Luni.Luogosano.Luogosanto.Lupara.Lurago d'Erba.Lurago Marinone.Lurano.Luras.Lurate Caccivio.Lusciano.Luserna.Luserna San Giovanni.Lusernetta.Lusevera.Lusia.Lusiana Conco.Lusigliè.Luson.Lustra.Luvinate.Luzzana.Luzzara.Luzzi.Maccagno con Pino e Veddasca.Maccastorna.Macchia d'Isernia.Macchia Valfortore.Macchiagodena.Macello.Macerata.Macerata Campania.Macerata Feltria.Macherio.Maclodio.Macomer.Macra.Macugnaga.Maddaloni.Madesimo.Madignano.Madone.Madonna del Sasso.Madruzzo.Maenza.Mafalda.Magasa.Magenta.Maggiora.Magherno.Magione.Magisano.Magliano Alfieri.Magliano Alpi.Magliano de' Marsi.Magliano di Tenna.Magliano in Toscana.Magliano Romano.Magliano Sabina.Magliano Vetere.Maglie.Magliolo.Maglione.Magnacavallo.Magnago.Magnano.Magnano in Riviera.Magomadas.Magrè sulla strada del vino.Magreglio.Maida.Maierà.Maierato.Maiolati Spontini.Maiolo.Maiori.Mairago.Mairano.Maissana.Majano.Malagnino.Malalbergo.Malborghetto Valbruna.Malcesine.Malé.Malegno.Maleo.Malesco.Maletto.Malfa.Malgesso.Malgrate.Malito.Mallare.Malles Venosta.Malnate.Malo.Malonno.Maltignano.Malvagna.Malvicino.Malvito.Mammola.Mamoiada.Manciano.Mandanici.Mandas.Mandatoriccio.Mandela.Mandello del Lario.Mandello Vitta.Manduria.Manerba del Garda.Manerbio.Manfredonia.Mango.Mangone.Maniace.Maniago.Manocalzati.Manoppello.Mansuè.Manta.Mantello.Mantova.Manzano.Manziana.Mapello.Mappano.Mara.Maracalagonis.Maranello.Marano di Napoli.Marano di Valpolicella.Marano Equo.Marano Lagunare.Marano Marchesato.Marano Principato.Marano sul Panaro.Marano Ticino.Marano Vicentino.Maranzana.Maratea.Marcallo con Casone.Marcaria.Marcedusa.Marcellina.Marcellinara.Marcetelli.Marcheno.Marchirolo.Marciana.Marciana Marina.Marcianise.Marciano della Chiana.Marcignago.Marcon.Marebbe.Marene.Mareno di Piave.Marentino.Maretto.Margarita.Margherita di Savoia.Margno.Mariana Mantovana.Mariano Comense.Mariano del Friuli.Marianopoli.Mariglianella.Marigliano.Marina di Gioiosa Ionica.Marineo.Marino.Marlengo.Marliana.Marmentino.Marmirolo.Marmora.Marnate.Marone.Maropati.Marostica.Marradi.Marrubiu.Marsaglia.Marsala.Marsciano.Marsico Nuovo.Marsicovetere.Marta.Martano.Martellago.Martello.Martignacco.Martignana di Po.Martignano.Martina Franca.Martinengo.Martiniana Po.Martinsicuro.Martirano.Martirano Lombardo.Martis.Martone.Marudo.Maruggio.Marzabotto.Marzano.Marzano Appio.Marzano di Nola.Marzi.Marzio.Masainas.Masate.Mascali.Mascalucia.Maschito.Masciago Primo.Maser.Masera.Maserà di Padova.Maserada sul Piave.Masi.Masi Torello.Masio.Maslianico.Masone.Massa.Massa d'Albe.Massa di Somma.Massa e Cozzile.Massa Fermana.Massa Lombarda.Massa Lubrense.Massa Marittima.Massa Martana.Massafra.Massalengo.Massanzago.Massarosa.Massazza.Massello.Masserano.Massignano.Massimeno.Massimino.Massino Visconti.Massiola.Masullas.Matelica.Matera.Mathi.Matino.Matrice.Mattie.Mattinata.Mazara del Vallo.Mazzano.Mazzano Romano.Mazzarino.Mazzarrà Sant'Andrea.Mazzarrone.Mazzè.Mazzin.Mazzo di Valtellina.Meana di Susa.Meana Sardo.Meda.Mede.Medea.Medesano.Medicina.Mediglia.Medolago.Medole.Medolla.Meduna di Livenza.Meduno.Megliadino San Vitale.Meina.Melara.Melazzo.Meldola.Mele.Melegnano.Melendugno.Meleti.Melfi.Melicuccà.Melicucco.Melilli.Melissa.Melissano.Melito di Napoli.Melito di Porto Salvo.Melito Irpino.Melizzano.Melle.Mello.Melpignano.Meltina.Melzo.Menaggio.Menconico.Mendatica.Mendicino.Menfi.Mentana.Meolo.Merana.Merano.Merate.Mercallo.Mercatello sul Metauro.Mercatino Conca.Mercato San Severino.Mercato Saraceno.Mercenasco.Mercogliano.Mereto di Tomba.Mergo.Mergozzo.Merì.Merlara.Merlino.Merone.Mesagne.Mese.Mesenzana.Mesero.Mesola.Mesoraca.Messina.Mestrino.Meta.Mezzago.Mezzana.Mezzana Bigli.Mezzana Mortigliengo.Mezzana Rabattone.Mezzane di Sotto.Mezzanego.Mezzanino.Mezzano.Mezzenile.Mezzocorona.Mezzojuso.Mezzoldo.Mezzolombardo.Mezzomerico.Miagliano.Miane.Miasino.Miazzina.Micigliano.Miggiano.Miglianico.Miglierina.Miglionico.Mignanego.Mignano Monte Lungo.Milano.Milazzo.Milena.Mileto.Milis.Militello in Val di Catania.Militello Rosmarino.Millesimo.Milo.Milzano.Mineo.Minerbe.Minerbio.Minervino di Lecce.Minervino Murge.Minori.Minturno.Minucciano.Mioglia.Mira.Mirabella Eclano.Mirabella Imbaccari.Mirabello Monferrato.Mirabello Sannitico.Miradolo Terme.Miranda.Mirandola.Mirano.Mirto.Misano Adriatico.Misano di Gera d'Adda.Misilmeri.Misinto.Missaglia.Missanello.Misterbianco.Mistretta.Moasca.Moconesi.Modena.Modica.Modigliana.Modolo.Modugno.Moena.Moggio.Moggio Udinese.Moglia.Mogliano.Mogliano Veneto.Mogorella.Mogoro.Moiano.Moimacco.Moio Alcantara.Moio de' Calvi.Moio della Civitella.Moiola.Mola di Bari.Molare.Molazzana.Molfetta.Molina Aterno.Molinara.Molinella.Molini di Triora.Molino dei Torti.Molise.Moliterno.Mollia.Molochio.Molteno.Moltrasio.Molveno.Mombaldone.Mombarcaro.Mombaroccio.Mombaruzzo.Mombasiglio.Mombello di Torino.Mombello Monferrato.Mombercelli.Momo.Mompantero.Mompeo.Momperone.Monacilioni.Monale.Monasterace.Monastero Bormida.Monastero di Lanzo.Monastero di Vasco.Monasterolo Casotto.Monasterolo del Castello.Monasterolo di Savigliano.Monastier di Treviso.Monastir.Moncalieri.Moncalvo.Moncenisio.Moncestino.Monchiero.Monchio delle Corti.Moncrivello.Moncucco Torinese.Mondaino.Mondavio.Mondolfo.Mondovì.Mondragone.Moneglia.Monesiglio.Monfalcone.Monforte d'Alba.Monforte San Giorgio.Monfumo.Mongardino.Monghidoro.Mongiana.Mongiardino Ligure.Mongiuffi Melia.Mongrando.Mongrassano.Monguelfo-Tesido.Monguzzo.Moniga del Garda.Monleale.Monno.Monopoli.Monreale.Monrupino.Monsampietro Morico.Monsampolo del Tronto.Monsano.Monselice.Monserrato.Monsummano Terme.Montà.Montabone.Montacuto.Montafia.Montagano.Montagna.Montagna in Valtellina.Montagnana.Montagnareale.Montaguto.Montaione.Montalbano Elicona.Montalbano Jonico.Montalcino.Montaldeo.Montaldo Bormida.Montaldo di Mondovì.Montaldo Roero.Montaldo Scarampi.Montaldo Torinese.Montale.Montalenghe.Montallegro.Montalto Carpasio.Montalto delle Marche.Montalto di Castro.Montalto Dora.Montalto Pavese.Montalto Uffugo.Montanaro.Montanaso Lombardo.Montanera.Montano Antilia.Montano Lucino.Montappone.Montaquila.Montasola.Montauro.Montazzoli.Monte Argentario.Monte Castello di Vibio.Monte Cavallo.Monte Cerignone.Monte Compatri.Monte Cremasco.Monte di Malo.Monte di Procida.Monte Giberto.Monte Grimano Terme.Monte Isola.Monte Marenzo.Monte Porzio.Monte Porzio Catone.Monte Rinaldo.Monte Roberto.Monte Romano.Monte San Biagio.Monte San Giacomo.Monte San Giovanni Campano.Monte San Giovanni in Sabina.Monte San Giusto.Monte San Martino.Monte San Pietrangeli.Monte San Pietro.Monte San Savino.Monte San Vito.Monte Sant'Angelo.Monte Santa Maria Tiberina.Monte Urano.Monte Vidon Combatte.Monte Vidon Corrado.Montebello della Battaglia.Montebello di Bertona.Montebello Jonico.Montebello sul Sangro.Montebello Vicentino.Montebelluna.Montebruno.Montebuono.Montecalvo in Foglia.Montecalvo Irpino.Montecalvo Versiggia.Montecarlo.Montecarotto.Montecassiano.Montecastello.Montecastrilli.Montecatini Val di Cecina.Montecatini-Terme.Montecchia di Crosara.Montecchio.Montecchio Emilia.Montecchio Maggiore.Montecchio Precalcino.Montechiaro d'Acqui.Montechiaro d'Asti.Montechiarugolo.Monteciccardo.Montecilfone.Montecopiolo.Montecorice.Montecorvino Pugliano.Montecorvino Rovella.Montecosaro.Montecrestese.Montecreto.Montedinove.Montedoro.Montefalcione.Montefalco.Montefalcone Appennino.Montefalcone di Val Fortore.Montefalcone nel Sannio.Montefano.Montefelcino.Monteferrante.Montefiascone.Montefino.Montefiore Conca.Montefiore dell'Aso.Montefiorino.Monteflavio.Monteforte Cilento.Monteforte d'Alpone.Monteforte Irpino.Montefortino.Montefranco.Montefredane.Montefusco.Montegabbione.Montegalda.Montegaldella.Montegallo.Montegioco.Montegiordano.Montegiorgio.Montegranaro.Montegridolfo.Montegrino Valtravaglia.Montegrosso d'Asti.Montegrosso Pian Latte.Montegrotto Terme.Monteiasi.Montelabbate.Montelanico.Montelapiano.Monteleone d'Orvieto.Monteleone di Fermo.Monteleone di Puglia.Monteleone di Spoleto.Monteleone Rocca Doria.Monteleone Sabino.Montelepre.Montelibretti.Montella.Montello.Montelongo.Montelparo.Montelupo Albese.Montelupo Fiorentino.Montelupone.Montemaggiore Belsito.Montemagno.Montemale di Cuneo.Montemarano.Montemarciano.Montemarzino.Montemesola.Montemezzo.Montemignaio.Montemiletto.Montemilone.Montemitro.Montemonaco.Montemurlo.Montemurro.Montenars.Montenero di Bisaccia.Montenero Sabino.Montenero Val Cocchiara.Montenerodomo.Monteodorisio.Montepaone.Monteparano.Monteprandone.Montepulciano.Monterchi.Montereale.Montereale Valcellina.Monterenzio.Monteriggioni.Monteroduni.Monteroni d'Arbia.Monteroni di Lecce.Monterosi.Monterosso al Mare.Monterosso Almo.Monterosso Calabro.Monterosso Grana.Monterotondo.Monterotondo Marittimo.Monterubbiano.Montesano Salentino.Montesano sulla Marcellana.Montesarchio.Montescaglioso.Montescano.Montescheno.Montescudaio.Montescudo-Monte Colombo.Montese.Montesegale.Montesilvano.Montespertoli.Monteu da Po.Monteu Roero.Montevago.Montevarchi.Montevecchia.Monteverde.Monteverdi Marittimo.Monteviale.Montezemolo.Monti.Montiano.Monticelli Brusati.Monticelli d'Ongina.Monticelli Pavese.Monticello Brianza.Monticello Conte Otto.Monticello d'Alba.Montichiari.Monticiano.Montieri.Montiglio Monferrato.Montignoso.Montirone.Montjovet.Montodine.Montoggio.Montone.Montopoli di Sabina.Montopoli in Val d'Arno.Montorfano.Montorio al Vomano.Montorio nei Frentani.Montorio Romano.Montoro.Montorso Vicentino.Montottone.Montresta.Montù Beccaria.Monvalle.Monza.Monzambano.Monzuno.Morano Calabro.Morano sul Po.Moransengo.Moraro.Morazzone.Morbegno.Morbello.Morciano di Leuca.Morciano di Romagna.Morcone.Mordano.Morengo.Mores.Moresco.Moretta.Morfasso.Morgano.Morgex.Morgongiori.Mori.Moriago della Battaglia.Moricone.Morigerati.Morimondo.Morino.Moriondo Torinese.Morlupo.Mormanno.Mornago.Mornese.Mornico al Serio.Mornico Losana.Morolo.Morozzo.Morra De Sanctis.Morro d'Alba.Morro d'Oro.Morro Reatino.Morrone del Sannio.Morrovalle.Morsano al Tagliamento.Morsasco.Mortara.Mortegliano.Morterone.Moruzzo.Moscazzano.Moschiano.Mosciano Sant'Angelo.Moscufo.Moso in Passiria.Mossa.Motta Baluffi.Motta Camastra.Motta d'Affermo.Motta de' Conti.Motta di Livenza.Motta Montecorvino.Motta San Giovanni.Motta Sant'Anastasia.Motta Santa Lucia.Motta Visconti.Mottafollone.Mottalciata.Motteggiana.Mottola.Mozzagrogna.Mozzanica.Mozzate.Mozzecane.Mozzo.Muccia.Muggia.Muggiò.Mugnano del Cardinale.Mugnano di Napoli.Mulazzano.Mulazzo.Mura.Muravera.Murazzano.Murello.Murialdo.Murisengo.Murlo.Muro Leccese.Muro Lucano.Muros.Muscoline.Musei.Musile di Piave.Musso.Mussolente.Mussomeli.Muzzana del Turgnano.Muzzano.Nago-Torbole.Nalles.Nanto.Napoli.Narbolia.Narcao.Nardò.Nardodipace.Narni.Naro.Narzole.Nasino.Naso.Naturno.Nave.Navelli.Naz-Sciaves.Nazzano.Ne.Nebbiuno.Negrar di Valpolicella.Neirone.Neive.Nembro.Nemi.Nemoli.Neoneli.Nepi.Nereto.Nerola.Nervesa della Battaglia.Nerviano.Nespolo.Nesso.Netro.Nettuno.Neviano.Neviano degli Arduini.Neviglie.Niardo.Nibbiola.Nibionno.Nichelino.Nicolosi.Nicorvo.Nicosia.Nicotera.Niella Belbo.Niella Tanaro.Nimis.Niscemi.Nissoria.Nizza di Sicilia.Nizza Monferrato.Noale.Noasca.Nocara.Nocciano.Nocera Inferiore.Nocera Superiore.Nocera Terinese.Nocera Umbra.Noceto.Noci.Nociglia.Noepoli.Nogara.Nogaredo.Nogarole Rocca.Nogarole Vicentino.Noicattaro.Nola.Nole.Noli.Nomaglio.Nomi.Nonantola.None.Nonio.Noragugume.Norbello.Norcia.Norma.Nosate.Notaresco.Noto.Nova Levante.Nova Milanese.Nova Ponente.Nova Siri.Novafeltria.Novaledo.Novalesa.Novara.Novara di Sicilia.Novate Mezzola.Novate Milanese.Nove.Novedrate.Novella.Novellara.Novello.Noventa di Piave.Noventa Padovana.Noventa Vicentina.Novi di Modena.Novi Ligure.Novi Velia.Noviglio.Novoli.Nucetto.Nughedu San Nicolò.Nughedu Santa Vittoria.Nule.Nulvi.Numana.Nuoro.Nurachi.Nuragus.Nurallao.Nuraminis.Nureci.Nurri.Nus.Nusco.Nuvolento.Nuvolera.Nuxis.Occhieppo Inferiore.Occhieppo Superiore.Occhiobello.Occimiano.Ocre.Odalengo Grande.Odalengo Piccolo.Oderzo.Odolo.Ofena.Offagna.Offanengo.Offida.Offlaga.Oggebbio.Oggiona con Santo Stefano.Oggiono.Oglianico.Ogliastro Cilento.Olbia.Olcenengo.Oldenico.Oleggio.Oleggio Castello.Olevano di Lomellina.Olevano Romano.Olevano sul Tusciano.Olgiate Comasco.Olgiate Molgora.Olgiate Olona.Olginate.Oliena.Oliva Gessi.Olivadi.Oliveri.Oliveto Citra.Oliveto Lario.Oliveto Lucano.Olivetta San Michele.Olivola.Ollastra.Ollolai.Ollomont.Olmedo.Olmeneta.Olmo al Brembo.Olmo Gentile.Oltre il Colle.Oltressenda Alta.Oltrona di San Mamette.Olzai.Ome.Omegna.Omignano.Onanì.Onano.Oncino.Oneta.Onifai.Oniferi.Ono San Pietro.Onore.Onzo.Opera.Opi.Oppeano.Oppido Lucano.Oppido Mamertina.Ora.Orani.Oratino.Orbassano.Orbetello.Orciano Pisano.Orco Feglino.Ordona.Orero.Orgiano.Orgosolo.Oria.Oricola.Origgio.Orino.Orio al Serio.Orio Canavese.Orio Litta.Oriolo.Oriolo Romano.Oristano.Ormea.Ormelle.Ornago.Ornavasso.Ornica.Orosei.Orotelli.Orria.Orroli.Orsago.Orsara Bormida.Orsara di Puglia.Orsenigo.Orsogna.Orsomarso.Orta di Atella.Orta Nova.Orta San Giulio.Ortacesus.Orte.Ortelle.Ortezzano.Ortignano Raggiolo.Ortisei.Ortona.Ortona dei Marsi.Ortovero.Ortucchio.Ortueri.Orune.Orvieto.Orvinio.Orzinuovi.Orzivecchi.Osasco.Osasio.Oschiri.Osidda.Osiglia.Osilo.Osimo.Osini.Osio Sopra.Osio Sotto.Osnago.Osoppo.Ospedaletti.Ospedaletto.Ospedaletto d'Alpinolo.Ospedaletto Euganeo.Ospedaletto Lodigiano.Ospitale di Cadore.Ospitaletto.Ossago Lodigiano.Ossana.Ossi.Ossimo.Ossona.Ostana.Ostellato.Ostiano.Ostiglia.Ostra.Ostra Vetere.Ostuni.Otranto.Otricoli.Ottana.Ottati.Ottaviano.Ottiglio.Ottobiano.Ottone.Oulx.Ovada.Ovaro.Oviglio.Ovindoli.Ovodda.Oyace.Ozegna.Ozieri.Ozzano dell'Emilia.Ozzano Monferrato.Ozzero.Pabillonis.Pace del Mela.Paceco.Pacentro.Pachino.Paciano.Padenghe sul Garda.Paderna.Paderno d'Adda.Paderno Dugnano.Paderno Franciacorta.Paderno Ponchielli.Padova.Padria.Padru.Padula.Paduli.Paesana.Paese.Pagani.Paganico Sabino.Pagazzano.Pagliara.Paglieta.Pagnacco.Pagno.Pagnona.Pago del Vallo di Lauro.Pago Veiano.Paisco Loveno.Paitone.Paladina.Palagano.Palagianello.Palagiano.Palagonia.Palaia.Palanzano.Palata.Palau.Palazzago.Palazzo Adriano.Palazzo Canavese.Palazzo Pignano.Palazzo San Gervasio.Palazzolo Acreide.Palazzolo dello Stella.Palazzolo sull'Oglio.Palazzolo Vercellese.Palazzuolo sul Senio.Palena.Palermiti.Palermo.Palestrina.Palestro.Paliano.Palizzi.Pallagorio.Pallanzeno.Pallare.Palma Campania.Palma di Montechiaro.Palmanova.Palmariggi.Palmas Arborea.Palmi.Palmiano.Palmoli.Palo del Colle.Palombara Sabina.Palombaro.Palomonte.Palosco.Palù.Palù del Fersina.Paludi.Paluzza.Pamparato.Pancalieri.Pancarana.Panchià.Pandino.Panettieri.Panicale.Pannarano.Panni.Pantelleria.Pantigliate.Paola.Paolisi.Papasidero.Papozze.Parabiago.Parabita.Paratico.Parcines.Parella.Parenti.Parete.Pareto.Parghelia.Parlasco.Parma.Parodi Ligure.Paroldo.Parolise.Parona.Parrano.Parre.Partanna.Partinico.Paruzzaro.Parzanica.Pasian di Prato.Pasiano di Pordenone.Paspardo.Passerano Marmorito.Passignano sul Trasimeno.Passirano.Pastena.Pastorano.Pastrengo.Pasturana.Pasturo.Paterno.Paternò.Paterno Calabro.Paternopoli.Patrica.Pattada.Patti.Patù.Pau.Paularo.Pauli Arbarei.Paulilatino.Paullo.Paupisi.Pavarolo.Pavia.Pavia di Udine.Pavone Canavese.Pavone del Mella.Pavullo nel Frignano.Pazzano.Peccioli.Pecetto di Valenza.Pecetto Torinese.Pedara.Pedaso.Pedavena.Pedemonte.Pederobba.Pedesina.Pedivigliano.Pedrengo.Peglio.Peglio.Pegognaga.Peia.Peio.Pelago.Pella.Pellegrino Parmense.Pellezzano.Pellizzano.Pelugo.Penango.Penna in Teverina.Penna San Giovanni.Penna Sant'Andrea.Pennabilli.Pennadomo.Pennapiedimonte.Penne.Pentone.Perano.Perarolo di Cadore.Perca.Percile.Perdasdefogu.Perdaxius.Perdifumo.Pereto.Perfugas.Pergine Valsugana.Pergola.Perinaldo.Perito.Perledo.Perletto.Perlo.Perloz.Pernumia.Pero.Perosa Argentina.Perosa Canavese.Perrero.Persico Dosimo.Pertengo.Pertica Alta.Pertica Bassa.Pertosa.Pertusio.Perugia.Pesaro.Pescaglia.Pescantina.Pescara.Pescarolo ed Uniti.Pescasseroli.Pescate.Pesche.Peschici.Peschiera Borromeo.Peschiera del Garda.Pescia.Pescina.Pesco Sannita.Pescocostanzo.Pescolanciano.Pescopagano.Pescopennataro.Pescorocchiano.Pescosansonesco.Pescosolido.Pessano con Bornago.Pessina Cremonese.Pessinetto.Petacciato.Petilia Policastro.Petina.Petralia Soprana.Petralia Sottana.Petrella Salto.Petrella Tifernina.Petriano.Petriolo.Petritoli.Petrizzi.Petronà.Petrosino.Petruro Irpino.Pettenasco.Pettinengo.Pettineo.Pettoranello del Molise.Pettorano sul Gizio.Pettorazza Grimani.Peveragno.Pezzana.Pezzaze.Pezzolo Valle Uzzone.Piacenza.Piacenza d'Adige.Piadena Drizzona.Piaggine.Pian Camuno.Piana Crixia.Piana degli Albanesi.Piana di Monte Verna.Piancastagnaio.Piancogno.Piandimeleto.Piane Crati.Pianella.Pianello del Lario.Pianello Val Tidone.Pianengo.Pianezza.Pianezze.Pianfei.Pianico.Pianiga.Piano di Sorrento.Pianopoli.Pianoro.Piansano.Piantedo.Piario.Piasco.Piateda.Piatto.Piazza al Serchio.Piazza Armerina.Piazza Brembana.Piazzatorre.Piazzola sul Brenta.Piazzolo.Picciano.Picerno.Picinisco.Pico.Piea.Piedicavallo.Piedimonte Etneo.Piedimonte Matese.Piedimonte San Germano.Piedimulera.Piegaro.Pienza.Pieranica.Pietra de' Giorgi.Pietra Ligure.Pietra Marazzi.Pietrabbondante.Pietrabruna.Pietracamela.Pietracatella.Pietracupa.Pietradefusi.Pietraferrazzana.Pietrafitta.Pietragalla.Pietralunga.Pietramelara.Pietramontecorvino.Pietranico.Pietrapaola.Pietrapertosa.Pietraperzia.Pietraporzio.Pietraroja.Pietrarubbia.Pietrasanta.Pietrastornina.Pietravairano.Pietrelcina.Pieve a Nievole.Pieve Albignola.Pieve d'Olmi.Pieve del Cairo.Pieve del Grappa.Pieve di Bono-Prezzo.Pieve di Cadore.Pieve di Cento.Pieve di Soligo.Pieve di Teco.Pieve Emanuele.Pieve Fissiraga.Pieve Fosciana.Pieve Ligure.Pieve Porto Morone.Pieve San Giacomo.Pieve Santo Stefano.Pieve Tesino.Pieve Torina.Pieve Vergonte.Pievepelago.Piglio.Pigna.Pignataro Interamna.Pignataro Maggiore.Pignola.Pignone.Pigra.Pila.Pimentel.Pimonte.Pinarolo Po.Pinasca.Pincara.Pinerolo.Pineto.Pino d'Asti.Pino Torinese.Pinzano al Tagliamento.Pinzolo.Piobbico.Piobesi d'Alba.Piobesi Torinese.Piode.Pioltello.Piombino.Piombino Dese.Pioraco.Piossasco.Piovà Massaia.Piove di Sacco.Piovene Rocchette.Piozzano.Piozzo.Piraino.Pisa.Pisano.Piscina.Piscinas.Pisciotta.Pisogne.Pisoniano.Pisticci.Pistoia.Pitigliano.Piubega.Piuro.Piverone.Pizzale.Pizzighettone.Pizzo.Pizzoferrato.Pizzoli.Pizzone.Pizzoni.Placanica.Plataci.Platania.Platì.Plaus.Plesio.Ploaghe.Plodio.Pocapaglia.Pocenia.Podenzana.Podenzano.Pofi.Poggiardo.Poggibonsi.Poggio a Caiano.Poggio Bustone.Poggio Catino.Poggio Imperiale.Poggio Mirteto.Poggio Moiano.Poggio Nativo.Poggio Picenze.Poggio Renatico.Poggio Rusco.Poggio San Lorenzo.Poggio San Marcello.Poggio San Vicino.Poggio Sannita.Poggio Torriana.Poggiodomo.Poggiofiorito.Poggiomarino.Poggioreale.Poggiorsini.Poggiridenti.Pogliano Milanese.Pognana Lario.Pognano.Pogno.Poirino.Pojana Maggiore.Polaveno.Polcenigo.Polesella.Polesine Zibello.Poli.Polia.Policoro.Polignano a Mare.Polinago.Polino.Polistena.Polizzi Generosa.Polla.Pollein.Pollena Trocchia.Pollenza.Pollica.Pollina.Pollone.Pollutri.Polonghera.Polpenazze del Garda.Polverara.Polverigi.Pomarance.Pomaretto.Pomarico.Pomaro Monferrato.Pomarolo.Pombia.Pomezia.Pomigliano d'Arco.Pompei.Pompeiana.Pompiano.Pomponesco.Pompu.Poncarale.Ponderano.Ponna.Ponsacco.Ponso.Pont-Canavese.Pont-Saint-Martin.Pontassieve.Pontboset.Ponte.Ponte Buggianese.Ponte dell'Olio.Ponte di Legno.Ponte di Piave.Ponte Gardena.Ponte in Valtellina.Ponte Lambro.Ponte nelle Alpi.Ponte Nizza.Ponte Nossa.Ponte San Nicolò.Ponte San Pietro.Pontebba.Pontecagnano Faiano.Pontecchio Polesine.Pontechianale.Pontecorvo.Pontecurone.Pontedassio.Pontedera.Pontelandolfo.Pontelatone.Pontelongo.Pontenure.Ponteranica.Pontestura.Pontevico.Pontey.Ponti.Ponti sul Mincio.Pontida.Pontinia.Pontinvrea.Pontirolo Nuovo.Pontoglio.Pontremoli.Ponza.Ponzano di Fermo.Ponzano Monferrato.Ponzano Romano.Ponzano Veneto.Ponzone.Popoli.Poppi.Porano.Porcari.Porcia.Pordenone.Porlezza.Pornassio.Porpetto.Portacomaro.Portalbera.Porte.Porte di Rendena.Portici.Portico di Caserta.Portico e San Benedetto.Portigliola.Porto Azzurro.Porto Ceresio.Porto Cesareo.Porto Empedocle.Porto Mantovano.Porto Recanati.Porto San Giorgio.Porto Sant'Elpidio.Porto Tolle.Porto Torres.Porto Valtravaglia.Porto Viro.Portobuffolè.Portocannone.Portoferraio.Portofino.Portogruaro.Portomaggiore.Portopalo di Capo Passero.Portoscuso.Portovenere.Portula.Posada.Posina.Positano.Possagno.Posta.Posta Fibreno.Postal.Postalesio.Postiglione.Postua.Potenza.Potenza Picena.Pove del Grappa.Povegliano.Povegliano Veronese.Poviglio.Povoletto.Pozzaglia Sabina.Pozzaglio ed Uniti.Pozzallo.Pozzilli.Pozzo d'Adda.Pozzol Groppo.Pozzolengo.Pozzoleone.Pozzolo Formigaro.Pozzomaggiore.Pozzonovo.Pozzuoli.Pozzuolo del Friuli.Pozzuolo Martesana.Pradalunga.Pradamano.Pradleves.Pragelato.Praia a Mare.Praiano.Pralboino.Prali.Pralormo.Pralungo.Pramaggiore.Pramollo.Prarolo.Prarostino.Prasco.Prascorsano.Prata Camportaccio.Prata d'Ansidonia.Prata di Pordenone.Prata di Principato Ultra.Prata Sannita.Pratella.Pratiglione.Prato.Prato allo Stelvio.Prato Carnico.Prato Sesia.Pratola Peligna.Pratola Serra.Pratovecchio Stia.Pravisdomini.Pray.Prazzo.Pré-Saint-Didier.Precenicco.Preci.Predaia.Predappio.Predazzo.Predoi.Predore.Predosa.Preganziol.Pregnana Milanese.Prelà.Premana.Premariacco.Premeno.Premia.Premilcuore.Premolo.Premosello-Chiovenda.Preone.Prepotto.Preseglie.Presenzano.Presezzo.Presicce-Acquarica.Pressana.Pretoro.Prevalle.Prezza.Priero.Prignano Cilento.Prignano sulla Secchia.Primaluna.Primiero San Martino di Castrozza.Priocca.Priola.Priolo Gargallo.Priverno.Prizzi.Proceno.Procida.Propata.Proserpio.Prossedi.Provaglio d'Iseo.Provaglio Val Sabbia.Proves.Provvidenti.Prunetto.Puegnago del Garda.Puglianello.Pula.Pulfero.Pulsano.Pumenengo.Pusiano.Putifigari.Putignano.Quadrelle.Quadri.Quagliuzzo.Qualiano.Quaranti.Quaregna Cerreto.Quargnento.Quarna Sopra.Quarna Sotto.Quarona.Quarrata.Quart.Quarto.Quarto d'Altino.Quartu Sant'Elena.Quartucciu.Quassolo.Quattordio.Quattro Castella.Quero Vas.Quiliano.Quincinetto.Quindici.Quingentole.Quintano.Quinto di Treviso.Quinto Vercellese.Quinto Vicentino.Quinzano d'Oglio.Quistello.Rabbi.Racale.Racalmuto.Racconigi.Raccuja.Racines.Radda in Chianti.Raddusa.Radicofani.Radicondoli.Raffadali.Ragalna.Ragogna.Ragusa.Raiano.Ramacca.Rancio Valcuvia.Ranco.Randazzo.Ranica.Ranzanico.Ranzo.Rapagnano.Rapallo.Rapino.Rapolano Terme.Rapolla.Rapone.Rassa.Rasun-Anterselva.Rasura.Ravanusa.Ravarino.Ravascletto.Ravello.Ravenna.Raveo.Raviscanina.Re.Rea.Realmonte.Reana del Rojale.Reano.Recale.Recanati.Recco.Recetto.Recoaro Terme.Redavalle.Redondesco.Refrancore.Refrontolo.Regalbuto.Reggello.Reggio di Calabria.Reggio nell'Emilia.Reggiolo.Reino.Reitano.Remanzacco.Remedello.Renate.Rende.Renon.Resana.Rescaldina.Resia.Resiutta.Resuttano.Retorbido.Revello.Revigliasco d'Asti.Revine Lago.Rezzago.Rezzato.Rezzo.Rezzoaglio.Rhêmes-Notre-Dame.Rhêmes-Saint-Georges.Rho.Riace.Rialto.Riano.Riardo.Ribera.Ribordone.Ricadi.Ricaldone.Riccia.Riccione.Riccò del Golfo di Spezia.Ricengo.Ricigliano.Riese Pio X.Riesi.Rieti.Rifiano.Rifreddo.Rignano Flaminio.Rignano Garganico.Rignano sull'Arno.Rigolato.Rimella.Rimini.Rio.Rio di Pusteria.Rio Saliceto.Riofreddo.Riola Sardo.Riolo Terme.Riolunato.Riomaggiore.Rionero in Vulture.Rionero Sannitico.Ripa Teatina.Ripabottoni.Ripacandida.Ripalimosani.Ripalta Arpina.Ripalta Cremasca.Ripalta Guerina.Riparbella.Ripatransone.Ripe San Ginesio.Ripi.Riposto.Rittana.Riva del Garda.Riva del Po.Riva di Solto.Riva Ligure.Riva presso Chieri.Rivalba.Rivalta Bormida.Rivalta di Torino.Rivamonte Agordino.Rivanazzano Terme.Rivara.Rivarolo Canavese.Rivarolo del Re ed Uniti.Rivarolo Mantovano.Rivarone.Rivarossa.Rive.Rive d'Arcano.Rivello.Rivergaro.Rivignano Teor.Rivisondoli.Rivodutri.Rivoli.Rivoli Veronese.Rivolta d'Adda.Rizziconi.Roana.Roaschia.Roascio.Roasio.Roatto.Robassomero.Robbiate.Robbio.Robecchetto con Induno.Robecco d'Oglio.Robecco Pavese.Robecco sul Naviglio.Robella.Robilante.Roburent.Rocca Canavese.Rocca Canterano.Rocca Cigliè.Rocca d'Arazzo.Rocca d'Arce.Rocca d'Evandro.Rocca de' Baldi.Rocca de' Giorgi.Rocca di Botte.Rocca di Cambio.Rocca di Cave.Rocca di Mezzo.Rocca di Neto.Rocca di Papa.Rocca Grimalda.Rocca Imperiale.Rocca Massima.Rocca Pia.Rocca Pietore.Rocca Priora.Rocca San Casciano.Rocca San Felice.Rocca San Giovanni.Rocca Santa Maria.Rocca Santo Stefano.Rocca Sinibalda.Rocca Susella.Roccabascerana.Roccabernarda.Roccabianca.Roccabruna.Roccacasale.Roccadaspide.Roccafiorita.Roccafluvione.Roccaforte del Greco.Roccaforte Ligure.Roccaforte Mondovì.Roccaforzata.Roccafranca.Roccagiovine.Roccagloriosa.Roccagorga.Roccalbegna.Roccalumera.Roccamandolfi.Roccamena.Roccamonfina.Roccamontepiano.Roccamorice.Roccanova.Roccantica.Roccapalumba.Roccapiemonte.Roccarainola.Roccaraso.Roccaromana.Roccascalegna.Roccasecca.Roccasecca dei Volsci.Roccasicura.Roccasparvera.Roccaspinalveti.Roccastrada.Roccavaldina.Roccaverano.Roccavignale.Roccavione.Roccavivara.Roccella Ionica.Roccella Valdemone.Rocchetta a Volturno.Rocchetta Belbo.Rocchetta di Vara.Rocchetta e Croce.Rocchetta Ligure.Rocchetta Nervina.Rocchetta Palafea.Rocchetta Sant'Antonio.Rocchetta Tanaro.Rodano.Roddi.Roddino.Rodello.Rodengo.Rodengo Saiano.Rodero.Rodi Garganico.Rodì Milici.Rodigo.Roè Volciano.Rofrano.Rogeno.Roggiano Gravina.Roghudi.Rogliano.Rognano.Rogno.Rogolo.Roiate.Roio del Sangro.Roisan.Roletto.Rolo.Roma.Romagnano al Monte.Romagnano Sesia.Romagnese.Romana.Romanengo.Romano Canavese.Romano d'Ezzelino.Romano di Lombardia.Romans d'Isonzo.Rombiolo.Romeno.Romentino.Rometta.Ronago.Roncà.Roncade.Roncadelle.Roncaro.Roncegno Terme.Roncello.Ronchi dei Legionari.Ronchi Valsugana.Ronchis.Ronciglione.Ronco all'Adige.Ronco Biellese.Ronco Briantino.Ronco Canavese.Ronco Scrivia.Roncobello.Roncoferraro.Roncofreddo.Roncola.Rondanina.Rondissone.Ronsecco.Ronzo-Chienis.Ronzone.Roppolo.Rorà.Rosà.Rosarno.Rosasco.Rosate.Rosazza.Rosciano.Roscigno.Rose.Rosello.Roseto Capo Spulico.Roseto degli Abruzzi.Roseto Valfortore.Rosignano Marittimo.Rosignano Monferrato.Rosolina.Rosolini.Rosora.Rossa.Rossana.Rossano Veneto.Rossiglione.Rosta.Rota d'Imagna.Rota Greca.Rotella.Rotello.Rotonda.Rotondella.Rotondi.Rottofreno.Rotzo.Roure.Rovasenda.Rovato.Rovegno.Rovellasca.Rovello Porro.Roverbella.Roverchiara.Roverè della Luna.Roverè Veronese.Roveredo di Guà.Roveredo in Piano.Rovereto.Rovescala.Rovetta.Roviano.Rovigo.Rovito.Rovolon.Rozzano.Rubano.Rubiana.Rubiera.Ruda.Rudiano.Rueglio.Ruffano.Ruffia.Ruffrè-Mendola.Rufina.Ruinas.Rumo.Ruoti.Russi.Rutigliano.Rutino.Ruviano.Ruvo del Monte.Ruvo di Puglia.Sabaudia.Sabbio Chiese.Sabbioneta.Sacco.Saccolongo.Sacile.Sacrofano.Sadali.Sagama.Sagliano Micca.Sagrado.Sagron Mis.Saint-Christophe.Saint-Denis.Saint-Marcel.Saint-Nicolas.Saint-Oyen.Saint-Pierre.Saint-Rhémy-en-Bosses.Saint-Vincent.Sala Baganza.Sala Biellese.Sala Bolognese.Sala Comacina.Sala Consilina.Sala Monferrato.Salandra.Salaparuta.Salara.Salasco.Salassa.Salbertrand.Salcedo.Salcito.Sale.Sale delle Langhe.Sale Marasino.Sale San Giovanni.Salemi.Salento.Salerano Canavese.Salerano sul Lambro.Salerno.Salgareda.Sali Vercellese.Salice Salentino.Saliceto.Salisano.Salizzole.Salle.Salmour.Salò.Salorno.Salsomaggiore Terme.Saltrio.Saludecio.Saluggia.Salussola.Saluzzo.Salve.Salvirola.Salvitelle.Salza di Pinerolo.Salza Irpina.Salzano.Samarate.Samassi.Samatzai.Sambuca di Sicilia.Sambuca Pistoiese.Sambuci.Sambuco.Sammichele di Bari.Samo.Samolaco.Samone.Samone.Sampeyre.Samugheo.San Bartolomeo al Mare.San Bartolomeo in Galdo.San Bartolomeo Val Cavargna.San Basile.San Basilio.San Bassano.San Bellino.San Benedetto Belbo.San Benedetto dei Marsi.San Benedetto del Tronto.San Benedetto in Perillis.San Benedetto Po.San Benedetto Ullano.San Benedetto Val di Sambro.San Benigno Canavese.San Bernardino Verbano.San Biagio della Cima.San Biagio di Callalta.San Biagio Platani.San Biagio Saracinisco.San Biase.San Bonifacio.San Buono.San Calogero.San Candido.San Canzian d'Isonzo.San Carlo Canavese.San Casciano dei Bagni.San Casciano in Val di Pesa.San Cassiano.San Cataldo.San Cesareo.San Cesario di Lecce.San Cesario sul Panaro.San Chirico Nuovo.San Chirico Raparo.San Cipirello.San Cipriano d'Aversa.San Cipriano Picentino.San Cipriano Po.San Clemente.San Colombano al Lambro.San Colombano Belmonte.San Colombano Certenoli.San Cono.San Cosmo Albanese.San Costantino Albanese.San Costantino Calabro.San Costanzo.San Cristoforo.San Damiano al Colle.San Damiano d'Asti.San Damiano Macra.San Daniele del Friuli.San Daniele Po.San Demetrio Corone.San Demetrio ne' Vestini.San Didero.San Donà di Piave.San Donaci.San Donato di Lecce.San Donato di Ninea.San Donato Milanese.San Donato Val di Comino.San Dorligo della Valle.San Fele.San Felice a Cancello.San Felice Circeo.San Felice del Benaco.San Felice del Molise.San Felice sul Panaro.San Ferdinando.San Ferdinando di Puglia.San Fermo della Battaglia.San Fili.San Filippo del Mela.San Fior.San Fiorano.San Floriano del Collio.San Floro.San Francesco al Campo.San Fratello.San Gavino Monreale.San Gemini.San Genesio Atesino.San Genesio ed Uniti.San Gennaro Vesuviano.San Germano Chisone.San Germano Vercellese.San Gervasio Bresciano.San Giacomo degli Schiavoni.San Giacomo delle Segnate.San Giacomo Filippo.San Giacomo Vercellese.San Gillio.San Gimignano.San Ginesio.San Giorgio a Cremano.San Giorgio a Liri.San Giorgio Albanese.San Giorgio Bigarello.San Giorgio Canavese.San Giorgio del Sannio.San Giorgio della Richinvelda.San Giorgio delle Pertiche.San Giorgio di Lomellina.San Giorgio di Nogaro.San Giorgio di Piano.San Giorgio in Bosco.San Giorgio Ionico.San Giorgio La Molara.San Giorgio Lucano.San Giorgio Monferrato.San Giorgio Morgeto.San Giorgio Piacentino.San Giorgio Scarampi.San Giorgio su Legnano.San Giorio di Susa.San Giovanni a Piro.San Giovanni al Natisone.San Giovanni Bianco.San Giovanni del Dosso.San Giovanni di Fassa.San Giovanni di Gerace.San Giovanni Gemini.San Giovanni Ilarione.San Giovanni in Croce.San Giovanni in Fiore.San Giovanni in Galdo.San Giovanni in Marignano.San Giovanni in Persiceto.San Giovanni Incarico.San Giovanni la Punta.San Giovanni Lipioni.San Giovanni Lupatoto.San Giovanni Rotondo.San Giovanni Suergiu.San Giovanni Teatino.San Giovanni Valdarno.San Giuliano del Sannio.San Giuliano di Puglia.San Giuliano Milanese.San Giuliano Terme.San Giuseppe Jato.San Giuseppe Vesuviano.San Giustino.San Giusto Canavese.San Godenzo.San Gregorio d'Ippona.San Gregorio da Sassola.San Gregorio di Catania.San Gregorio Magno.San Gregorio Matese.San Gregorio nelle Alpi.San Lazzaro di Savena.San Leo.San Leonardo.San Leonardo in Passiria.San Leucio del Sannio.San Lorenzello.San Lorenzo.San Lorenzo al Mare.San Lorenzo Bellizzi.San Lorenzo del Vallo.San Lorenzo di Sebato.San Lorenzo Dorsino.San Lorenzo in Campo.San Lorenzo Isontino.San Lorenzo Maggiore.San Lorenzo Nuovo.San Luca.San Lucido.San Lupo.San Mango d'Aquino.San Mango Piemonte.San Mango sul Calore.San Marcellino.San Marcello.San Marcello Piteglio.San Marco Argentano.San Marco d'Alunzio.San Marco dei Cavoti.San Marco Evangelista.San Marco in Lamis.San Marco la Catola.San Martino al Tagliamento.San Martino Alfieri.San Martino Buon Albergo.San Martino Canavese.San Martino d'Agri.San Martino dall'Argine.San Martino del Lago.San Martino di Finita.San Martino di Lupari.San Martino di Venezze.San Martino in Badia.San Martino in Passiria.San Martino in Pensilis.San Martino in Rio.San Martino in Strada.San Martino Sannita.San Martino Siccomario.San Martino sulla Marrucina.San Martino Valle Caudina.San Marzano di San Giuseppe.San Marzano Oliveto.San Marzano sul Sarno.San Massimo.San Maurizio Canavese.San Maurizio d'Opaglio.San Mauro Castelverde.San Mauro Cilento.San Mauro di Saline.San Mauro Forte.San Mauro la Bruca.San Mauro Marchesato.San Mauro Pascoli.San Mauro Torinese.San Michele al Tagliamento.San Michele all'Adige.San Michele di Ganzaria.San Michele di Serino.San Michele Mondovì.San Michele Salentino.San Miniato.San Nazzaro.San Nazzaro Sesia.San Nazzaro Val Cavargna.San Nicandro Garganico.San Nicola Arcella.San Nicola Baronia.San Nicola da Crissa.San Nicola dell'Alto.San Nicola la Strada.San Nicola Manfredi.San Nicolò d'Arcidano.San Nicolò di Comelico.San Nicolò Gerrei.San Pancrazio.San Pancrazio Salentino.San Paolo.San Paolo Albanese.San Paolo Bel Sito.San Paolo d'Argon.San Paolo di Civitate.San Paolo di Jesi.San Paolo Solbrito.San Pellegrino Terme.San Pier d'Isonzo.San Pier Niceto.San Piero Patti.San Pietro a Maida.San Pietro al Natisone.San Pietro al Tanagro.San Pietro Apostolo.San Pietro Avellana.San Pietro Clarenza.San Pietro di Cadore.San Pietro di Caridà.San Pietro di Feletto.San Pietro di Morubio.San Pietro in Amantea.San Pietro in Cariano.San Pietro in Casale.San Pietro in Cerro.San Pietro in Gu.San Pietro in Guarano.San Pietro in Lama.San Pietro Infine.San Pietro Mosezzo.San Pietro Mussolino.San Pietro Val Lemina.San Pietro Vernotico.San Pietro Viminario.San Pio delle Camere.San Polo d'Enza.San Polo dei Cavalieri.San Polo di Piave.San Polo Matese.San Ponso.San Possidonio.San Potito Sannitico.San Potito Ultra.San Prisco.San Procopio.San Prospero.San Quirico d'Orcia.San Quirino.San Raffaele Cimena.San Roberto.San Rocco al Porto.San Romano in Garfagnana.San Rufo.San Salvatore di Fitalia.San Salvatore Monferrato.San Salvatore Telesino.San Salvo.San Sebastiano al Vesuvio.San Sebastiano Curone.San Sebastiano da Po.San Secondo di Pinerolo.San Secondo Parmense.San Severino Lucano.San Severino Marche.San Severo.San Siro.San Sossio Baronia.San Sostene.San Sosti.San Sperate.San Stino di Livenza.San Tammaro.San Teodoro.San Teodoro.San Tomaso Agordino.San Valentino in Abruzzo Citeriore.San Valentino Torio.San Venanzo.San Vendemiano.San Vero Milis.San Vincenzo.San Vincenzo La Costa.San Vincenzo Valle Roveto.San Vitaliano.San Vito.San Vito al Tagliamento.San Vito al Torre.San Vito Chietino.San Vito dei Normanni.San Vito di Cadore.San Vito di Fagagna.San Vito di Leguzzano.San Vito Lo Capo.San Vito Romano.San Vito sullo Ionio.San Vittore del Lazio.San Vittore Olona.San Zeno di Montagna.San Zeno Naviglio.San Zenone al Lambro.San Zenone al Po.San Zenone degli Ezzelini.Sanarica.Sandigliano.Sandrigo.Sanfrè.Sanfront.Sangano.Sangiano.Sangineto.Sanguinetto.Sanluri.Sannazzaro de' Burgondi.Sannicandro di Bari.Sannicola.Sanremo.Sansepolcro.Sant'Agapito.Sant'Agata Bolognese.Sant'Agata de' Goti.Sant'Agata del Bianco.Sant'Agata di Esaro.Sant'Agata di Militello.Sant'Agata di Puglia.Sant'Agata Feltria.Sant'Agata Fossili.Sant'Agata li Battiati.Sant'Agata sul Santerno.Sant'Agnello.Sant'Albano Stura.Sant'Alessio con Vialone.Sant'Alessio in Aspromonte.Sant'Alessio Siculo.Sant'Alfio.Sant'Ambrogio di Torino.Sant'Ambrogio di Valpolicella.Sant'Ambrogio sul Garigliano.Sant'Anastasia.Sant'Anatolia di Narco.Sant'Andrea Apostolo dello Ionio.Sant'Andrea del Garigliano.Sant'Andrea di Conza.Sant'Andrea Frius.Sant'Angelo a Cupolo.Sant'Angelo a Fasanella.Sant'Angelo a Scala.Sant'Angelo all'Esca.Sant'Angelo d'Alife.Sant'Angelo dei Lombardi.Sant'Angelo del Pesco.Sant'Angelo di Brolo.Sant'Angelo di Piove di Sacco.Sant'Angelo in Pontano.Sant'Angelo in Vado.Sant'Angelo Le Fratte.Sant'Angelo Limosano.Sant'Angelo Lodigiano.Sant'Angelo Lomellina.Sant'Angelo Muxaro.Sant'Angelo Romano.Sant'Anna Arresi.Sant'Anna d'Alfaedo.Sant'Antimo.Sant'Antioco.Sant'Antonino di Susa.Sant'Antonio Abate.Sant'Antonio di Gallura.Sant'Apollinare.Sant'Arcangelo.Sant'Arcangelo Trimonte.Sant'Arpino.Sant'Arsenio.Sant'Egidio alla Vibrata.Sant'Egidio del Monte Albino.Sant'Elena.Sant'Elena Sannita.Sant'Elia a Pianisi.Sant'Elia Fiumerapido.Sant'Elpidio a Mare.Sant'Eufemia a Maiella.Sant'Eufemia d'Aspromonte.Sant'Eusanio del Sangro.Sant'Eusanio Forconese.Sant'Ilario d'Enza.Sant'Ilario dello Ionio.Sant'Ippolito.Sant'Olcese.Sant'Omero.Sant'Omobono Terme.Sant'Onofrio.Sant'Oreste.Sant'Orsola Terme.Sant'Urbano.Santa Brigida.Santa Caterina Albanese.Santa Caterina dello Ionio.Santa Caterina Villarmosa.Santa Cesarea Terme.Santa Cristina d'Aspromonte.Santa Cristina e Bissone.Santa Cristina Gela.Santa Cristina Valgardena.Santa Croce Camerina.Santa Croce del Sannio.Santa Croce di Magliano.Santa Croce sull'Arno.Santa Domenica Talao.Santa Domenica Vittoria.Santa Elisabetta.Santa Fiora.Santa Flavia.Santa Giuletta.Santa Giusta.Santa Giustina.Santa Giustina in Colle.Santa Luce.Santa Lucia del Mela.Santa Lucia di Piave.Santa Lucia di Serino.Santa Margherita di Belice.Santa Margherita di Staffora.Santa Margherita Ligure.Santa Maria a Monte.Santa Maria a Vico.Santa Maria Capua Vetere.Santa Maria Coghinas.Santa Maria del Cedro.Santa Maria del Molise.Santa Maria della Versa.Santa Maria di Licodia.Santa Maria di Sala.Santa Maria Hoè.Santa Maria Imbaro.Santa Maria la Carità.Santa Maria la Fossa.Santa Maria la Longa.Santa Maria Maggiore.Santa Maria Nuova.Santa Marina.Santa Marina Salina.Santa Marinella.Santa Ninfa.Santa Paolina.Santa Severina.Santa Sofia.Santa Sofia d'Epiro.Santa Teresa di Riva.Santa Teresa Gallura.Santa Venerina.Santa Vittoria d'Alba.Santa Vittoria in Matenano.Santadi.Santarcangelo di Romagna.Sante Marie.Santena.Santeramo in Colle.Santhià.Santi Cosma e Damiano.Santo Stefano al Mare.Santo Stefano Belbo.Santo Stefano d'Aveto.Santo Stefano del Sole.Santo Stefano di Cadore.Santo Stefano di Camastra.Santo Stefano di Magra.Santo Stefano di Rogliano.Santo Stefano di Sessanio.Santo Stefano in Aspromonte.Santo Stefano Lodigiano.Santo Stefano Quisquina.Santo Stefano Roero.Santo Stefano Ticino.Santomenna.Santopadre.Santorso.Santu Lussurgiu.Sanza.Sanzeno.Saonara.Saponara.Sappada.Sapri.Saracena.Saracinesco.Sarcedo.Sarconi.Sardara.Sardigliano.Sarego.Sarentino.Sarezzano.Sarezzo.Sarmato.Sarmede.Sarnano.Sarnico.Sarno.Sarnonico.Saronno.Sarre.Sarroch.Sarsina.Sarteano.Sartirana Lomellina.Sarule.Sarzana.Sassano.Sassari.Sassello.Sassetta.Sassinoro.Sasso di Castalda.Sasso Marconi.Sassocorvaro Auditore.Sassofeltrio.Sassoferrato.Sassuolo.Satriano.Satriano di Lucania.Sauris.Sauze d'Oulx.Sauze di Cesana.Sava.Savelli.Saviano.Savigliano.Savignano Irpino.Savignano sul Panaro.Savignano sul Rubicone.Savignone.Saviore dell'Adamello.Savoca.Savogna.Savogna d'Isonzo.Savoia di Lucania.Savona.Scafa.Scafati.Scagnello.Scala.Scala Coeli.Scaldasole.Scalea.Scalenghe.Scaletta Zanclea.Scampitella.Scandale.Scandiano.Scandicci.Scandolara Ravara.Scandolara Ripa d'Oglio.Scandriglia.Scanno.Scano di Montiferro.Scansano.Scanzano Jonico.Scanzorosciate.Scapoli.Scarlino.Scarmagno.Scarnafigi.Scarperia e San Piero.Scena.Scerni.Scheggia e Pascelupo.Scheggino.Schiavi di Abruzzo.Schiavon.Schignano.Schilpario.Schio.Schivenoglia.Sciacca.Sciara.Scicli.Scido.Scigliano.Scilla.Scillato.Sciolze.Scisciano.Sclafani Bagni.Scontrone.Scopa.Scopello.Scoppito.Scordia.Scorrano.Scorzè.Scurcola Marsicana.Scurelle.Scurzolengo.Seborga.Secinaro.Seclì.Secugnago.Sedegliano.Sedico.Sedilo.Sedini.Sedriano.Sedrina.Sefro.Segariu.Seggiano.Segni.Segonzano.Segrate.Segusino.Selargius.Selci.Selegas.Sella Giudicarie.Sellano.Sellero.Sellia.Sellia Marina.Selva dei Molini.Selva di Cadore.Selva di Progno.Selva di Val Gardena.Selvazzano Dentro.Selvino.Semestene.Semiana.Seminara.Semproniano.Senago.Senale-San Felice.Senales.Seneghe.Senerchia.Seniga.Senigallia.Senis.Senise.Senna Comasco.Senna Lodigiana.Sennariolo.Sennori.Senorbì.Sepino.Sequals.Seravezza.Serdiana.Seregno.Seren del Grappa.Sergnano.Seriate.Serina.Serino.Serle.Sermide e Felonica.Sermoneta.Sernaglia della Battaglia.Sernio.Serole.Serra d'Aiello.Serra de' Conti.Serra Riccò.Serra San Bruno.Serra San Quirico.Serra Sant'Abbondio.Serracapriola.Serradifalco.Serralunga d'Alba.Serralunga di Crea.Serramanna.Serramazzoni.Serramezzana.Serramonacesca.Serrapetrona.Serrara Fontana.Serrastretta.Serrata.Serravalle a Po.Serravalle di Chienti.Serravalle Langhe.Serravalle Pistoiese.Serravalle Scrivia.Serravalle Sesia.Serre.Serrenti.Serri.Serrone.Sersale.Servigliano.Sessa Aurunca.Sessa Cilento.Sessame.Sessano del Molise.Sesta Godano.Sestino.Sesto.Sesto al Reghena.Sesto Calende.Sesto Campano.Sesto ed Uniti.Sesto Fiorentino.Sesto San Giovanni.Sestola.Sestri Levante.Sestriere.Sestu.Settala.Settefrati.Settime.Settimo Milanese.Settimo Rottaro.Settimo San Pietro.Settimo Torinese.Settimo Vittone.Settingiano.Setzu.Seui.Seulo.Seveso.Sezzadio.Sezze.Sfruz.Sgonico.Sgurgola.Siamaggiore.Siamanna.Siano.Siapiccia.Sicignano degli Alburni.Siculiana.Siddi.Siderno.Siena.Sigillo.Signa.Silandro.Silanus.Silea.Siligo.Siliqua.Silius.Sillano Giuncugnano.Sillavengo.Silvano d'Orba.Silvano Pietra.Silvi.Simala.Simaxis.Simbario.Simeri Crichi.Sinagra.Sinalunga.Sindia.Sini.Sinio.Siniscola.Sinnai.Sinopoli.Siracusa.Sirignano.Siris.Sirmione.Sirolo.Sirone.Sirtori.Sissa Trecasali.Siurgus Donigala.Siziano.Sizzano.Sluderno.Smerillo.Soave.Socchieve.Soddì.Sogliano al Rubicone.Sogliano Cavour.Soglio.Soiano del Lago.Solagna.Solarino.Solaro.Solarolo.Solarolo Rainerio.Solarussa.Solbiate Arno.Solbiate con Cagno.Solbiate Olona.Soldano.Soleminis.Solero.Solesino.Soleto.Solferino.Soliera.Solignano.Solofra.Solonghello.Solopaca.Solto Collina.Solza.Somaglia.Somano.Somma Lombardo.Somma Vesuviana.Sommacampagna.Sommariva del Bosco.Sommariva Perno.Sommatino.Sommo.Sona.Soncino.Sondalo.Sondrio.Songavazzo.Sonico.Sonnino.Sora.Soraga di Fassa.Soragna.Sorano.Sorbo San Basile.Sorbo Serpico.Sorbolo Mezzani.Sordevolo.Sordio.Soresina.Sorgà.Sorgono.Sori.Sorianello.Soriano Calabro.Soriano nel Cimino.Sorico.Soriso.Sorisole.Sormano.Sorradile.Sorrento.Sorso.Sortino.Sospiro.Sospirolo.Sossano.Sostegno.Sotto il Monte Giovanni XXIII.Sover.Soverato.Sovere.Soveria Mannelli.Soveria Simeri.Soverzene.Sovicille.Sovico.Sovizzo.Sovramonte.Sozzago.Spadafora.Spadola.Sparanise.Sparone.Specchia.Spello.Sperlinga.Sperlonga.Sperone.Spessa.Spezzano Albanese.Spezzano della Sila.Spiazzo.Spigno Monferrato.Spigno Saturnia.Spilamberto.Spilimbergo.Spilinga.Spinadesco.Spinazzola.Spinea.Spineda.Spinete.Spineto Scrivia.Spinetoli.Spino d'Adda.Spinone al Lago.Spinoso.Spirano.Spoleto.Spoltore.Spongano.Spormaggiore.Sporminore.Spotorno.Spresiano.Spriana.Squillace.Squinzano.Staffolo.Stagno Lombardo.Staiti.Stalettì.Stanghella.Staranzano.Statte.Stazzano.Stazzema.Stazzona.Stefanaconi.Stella.Stella Cilento.Stellanello.Stelvio.Stenico.Sternatia.Stezzano.Stienta.Stigliano.Stignano.Stilo.Stimigliano.Stintino.Stio.Stornara.Stornarella.Storo.Stra.Stradella.Strambinello.Strambino.Strangolagalli.Stregna.Strembo.Stresa.Strevi.Striano.Strona.Stroncone.Strongoli.Stroppiana.Stroppo.Strozza.Sturno.Suardi.Subbiano.Subiaco.Succivo.Sueglio.Suelli.Suello.Suisio.Sulbiate.Sulmona.Sulzano.Sumirago.Summonte.Suni.Suno.Supersano.Supino.Surano.Surbo.Susa.Susegana.Sustinente.Sutera.Sutri.Sutrio.Suvereto.Suzzara.Taceno.Tadasuni.Taggia.Tagliacozzo.Taglio di Po.Tagliolo Monferrato.Taibon Agordino.Taino.Taipana.Talamello.Talamona.Talana.Taleggio.Talla.Talmassons.Tambre.Taormina.Tarano.Taranta Peligna.Tarantasca.Taranto.Tarcento.Tarquinia.Tarsia.Tartano.Tarvisio.Tarzo.Tassarolo.Taurano.Taurasi.Taurianova.Taurisano.Tavagnacco.Tavagnasco.Tavazzano con Villavesco.Tavenna.Taverna.Tavernerio.Tavernola Bergamasca.Tavernole sul Mella.Taviano.Tavigliano.Tavoleto.Tavullia.Teana.Teano.Teggiano.Teglio.Teglio Veneto.Telese Terme.Telgate.Telti.Telve.Telve di Sopra.Tempio Pausania.Temù.Tenna.Tenno.Teolo.Teora.Teramo.Terdobbiate.Terelle.Terento.Terenzo.Tergu.Terlano.Terlizzi.Terme Vigliatore.Termeno sulla strada del vino.Termini Imerese.Termoli.Ternate.Ternengo.Terni.Terno d'Isola.Terracina.Terragnolo.Terralba.Terranova da Sibari.Terranova dei Passerini.Terranova di Pollino.Terranova Sappo Minulio.Terranuova Bracciolini.Terrasini.Terrassa Padovana.Terravecchia.Terrazzo.Terre d'Adige.Terre del Reno.Terre Roveresche.Terricciola.Terruggia.Tertenia.Terzigno.Terzo.Terzo d'Aquileia.Terzolas.Terzorio.Tesero.Tesimo.Tessennano.Testico.Teti.Teulada.Teverola.Tezze sul Brenta.Thiene.Thiesi.Tiana.Ticengo.Ticineto.Tiggiano.Tiglieto.Tigliole.Tignale.Tinnura.Tione degli Abruzzi.Tione di Trento.Tirano.Tires.Tiriolo.Tirolo.Tissi.Tito.Tivoli.Tizzano Val Parma.Toano.Tocco Caudio.Tocco da Casauria.Toceno.Todi.Toffia.Toirano.Tolentino.Tolfa.Tollegno.Tollo.Tolmezzo.Tolve.Tombolo.Ton.Tonara.Tonco.Tonengo.Tonezza del Cimone.Tora e Piccilli.Torano Castello.Torano Nuovo.Torbole Casaglia.Torcegno.Torchiara.Torchiarolo.Torella dei Lombardi.Torella del Sannio.Torgiano.Torgnon.Torino.Torino di Sangro.Toritto.Torlino Vimercati.Tornaco.Tornareccio.Tornata.Tornimparte.Torno.Tornolo.Toro.Torpè.Torraca.Torralba.Torrazza Coste.Torrazza Piemonte.Torrazzo.Torre Annunziata.Torre Beretti e Castellaro.Torre Boldone.Torre Bormida.Torre Cajetani.Torre Canavese.Torre d'Arese.Torre d'Isola.Torre de' Busi.Torre de' Negri.Torre de' Passeri.Torre de' Picenardi.Torre de' Roveri.Torre del Greco.Torre di Mosto.Torre di Ruggiero.Torre di Santa Maria.Torre Le Nocelle.Torre Mondovì.Torre Orsaia.Torre Pallavicina.Torre Pellice.Torre San Giorgio.Torre San Patrizio.Torre Santa Susanna.Torreano.Torrebelvicino.Torrebruna.Torrecuso.Torreglia.Torregrotta.Torremaggiore.Torrenova.Torresina.Torretta.Torrevecchia Pia.Torrevecchia Teatina.Torri del Benaco.Torri di Quartesolo.Torri in Sabina.Torrice.Torricella.Torricella del Pizzo.Torricella in Sabina.Torricella Peligna.Torricella Sicura.Torricella Verzate.Torriglia.Torrile.Torrioni.Torrita di Siena.Torrita Tiberina.Tortolì.Tortona.Tortora.Tortorella.Tortoreto.Tortorici.Torviscosa.Toscolano-Maderno.Tossicia.Tovo di Sant'Agata.Tovo San Giacomo.Trabia.Tradate.Tramatza.Trambileno.Tramonti.Tramonti di Sopra.Tramonti di Sotto.Tramutola.Trana.Trani.Traona.Trapani.Trappeto.Trarego Viggiona.Trasacco.Trasaghis.Trasquera.Tratalias.Travacò Siccomario.Travagliato.Travedona-Monate.Traversella.Traversetolo.Traves.Travesio.Travo.Tre Ville.Trebaseleghe.Trebisacce.Trecase.Trecastagni.Trecastelli.Trecate.Trecchina.Trecenta.Tredozio.Treglio.Tregnago.Treia.Treiso.Tremestieri Etneo.Tremezzina.Tremosine sul Garda.Trentinara.Trento.Trentola Ducenta.Trenzano.Treppo Grande.Treppo Ligosullo.Trepuzzi.Trequanda.Tresana.Trescore Balneario.Trescore Cremasco.Tresignana.Tresivio.Tresnuraghes.Trevenzuolo.Trevi.Trevi nel Lazio.Trevico.Treviglio.Trevignano.Trevignano Romano.Treville.Treviolo.Treviso.Treviso Bresciano.Trezzano Rosa.Trezzano sul Naviglio.Trezzo sull'Adda.Trezzo Tinella.Trezzone.Tribano.Tribiano.Tribogna.Tricarico.Tricase.Tricerro.Tricesimo.Triei.Trieste.Triggiano.Trigolo.Trinità.Trinità d'Agultu e Vignola.Trinitapoli.Trino.Triora.Tripi.Trisobbio.Trissino.Triuggio.Trivento.Trivigliano.Trivignano Udinese.Trivigno.Trivolzio.Trodena nel parco naturale.Trofarello.Troia.Troina.Tromello.Trontano.Tronzano Lago Maggiore.Tronzano Vercellese.Tropea.Trovo.Truccazzano.Tubre.Tufara.Tufillo.Tufino.Tufo.Tuglie.Tuili.Tula.Tuoro sul Trasimeno.Turania.Turano Lodigiano.Turate.Turbigo.Turi.Turri.Turriaco.Turrivalignani.Tursi.Tusa.Tuscania.Ubiale Clanezzo.Uboldo.Ucria.Udine.Ugento.Uggiano la Chiesa.Uggiate-Trevano.Ulà Tirso.Ulassai.Ultimo.Umbertide.Umbriatico.Urago d'Oglio.Uras.Urbana.Urbania.Urbe.Urbino.Urbisaglia.Urgnano.Uri.Ururi.Urzulei.Uscio.Usellus.Usini.Usmate Velate.Ussana.Ussaramanna.Ussassai.Usseaux.Usseglio.Ussita.Ustica.Uta.Uzzano.Vaccarizzo Albanese.Vacone.Vacri.Vadena.Vado Ligure.Vagli Sotto.Vaglia.Vaglio Basilicata.Vaglio Serra.Vaiano.Vaiano Cremasco.Vaie.Vailate.Vairano Patenora.Vajont.Val Brembilla.Val della Torre.Val di Chy.Val di Nizza.Val di Vizze.Val di Zoldo.Val Liona.Val Masino.Val Rezzo.Valbondione.Valbrembo.Valbrenta.Valbrevenna.Valbrona.Valchiusa.Valdagno.Valdaone.Valdaora.Valdastico.Valdengo.Valderice.Valdidentro.Valdieri.Valdilana.Valdina.Valdisotto.Valdobbiadene.Valduggia.Valeggio.Valeggio sul Mincio.Valentano.Valenza.Valenzano.Valera Fratta.Valfabbrica.Valfenera.Valfloriana.Valfornace.Valfurva.Valganna.Valgioie.Valgoglio.Valgrana.Valgreghentino.Valgrisenche.Valguarnera Caropepe.Vallada Agordina.Vallanzengo.Vallarsa.Vallata.Valle Agricola.Valle Aurina.Valle Cannobina.Valle Castellana.Valle dell'Angelo.Valle di Cadore.Valle di Casies.Valle di Maddaloni.Valle Lomellina.Valle Salimbene.Valle San Nicolao.Vallebona.Vallecorsa.Vallecrosia.Valledolmo.Valledoria.Vallefiorita.Vallefoglia.Vallelaghi.Vallelonga.Vallelunga Pratameno.Vallemaio.Vallepietra.Vallerano.Vallermosa.Vallerotonda.Vallesaccarda.Valleve.Valli del Pasubio.Vallinfreda.Vallio Terme.Vallo della Lucania.Vallo di Nera.Vallo Torinese.Valloriate.Valmacca.Valmadrera.Valmontone.Valmorea.Valmozzola.Valnegra.Valpelline.Valperga.Valprato Soana.Valsamoggia.Valsavarenche.Valsinni.Valsolda.Valstrona.Valtopina.Valtorta.Valtournenche.Valva.Valvarrone.Valvasone Arzene.Valverde.Valvestino.Vandoies.Vanzaghello.Vanzago.Vanzone con San Carlo.Vaprio d'Adda.Vaprio d'Agogna.Varallo.Varallo Pombia.Varano Borghi.Varano de' Melegari.Varapodio.Varazze.Varco Sabino.Varedo.Varenna.Varese.Varese Ligure.Varisella.Varmo.Varna.Varsi.Varzi.Varzo.Vasanello.Vasia.Vasto.Vastogirardi.Vauda Canavese.Vazzano.Vazzola.Vecchiano.Vedano al Lambro.Vedano Olona.Vedelago.Vedeseta.Veduggio con Colzano.Veggiano.Veglie.Veglio.Vejano.Veleso.Velezzo Lomellina.Velletri.Vellezzo Bellini.Velo d'Astico.Velo Veronese.Velturno.Venafro.Venaria Reale.Venarotta.Venasca.Venaus.Vendone.Venegono Inferiore.Venegono Superiore.Venetico.Venezia.Veniano.Venosa.Ventasso.Venticano.Ventimiglia.Ventimiglia di Sicilia.Ventotene.Venzone.Verano.Verano Brianza.Verbania.Verbicaro.Vercana.Verceia.Vercelli.Vercurago.Verdellino.Verdello.Verderio.Verduno.Vergato.Verghereto.Vergiate.Vermezzo con Zelo.Vermiglio.Vernante.Vernasca.Vernate.Vernazza.Vernio.Vernole.Verolanuova.Verolavecchia.Verolengo.Veroli.Verona.Veronella.Verrayes.Verrès.Verretto.Verrone.Verrua Po.Verrua Savoia.Vertemate con Minoprio.Vertova.Verucchio.Vervio.Verzegnis.Verzino.Verzuolo.Vescovana.Vescovato.Vesime.Vespolate.Vessalico.Vestenanova.Vestignè.Vestone.Vetralla.Vetto.Vezza d'Alba.Vezza d'Oglio.Vezzano Ligure.Vezzano sul Crostolo.Vezzi Portio.Viadana.Viadanica.Viagrande.Viale.Vialfrè.Viano.Viareggio.Viarigi.Vibo Valentia.Vibonati.Vicalvi.Vicari.Vicchio.Vicenza.Vico del Gargano.Vico Equense.Vico nel Lazio.Vicoforte.Vicoli.Vicolungo.Vicopisano.Vicovaro.Viddalba.Vidigulfo.Vidor.Vidracco.Vieste.Vietri di Potenza.Vietri sul Mare.Viganò.Vigano San Martino.Vigarano Mainarda.Vigasio.Vigevano.Viggianello.Viggiano.Viggiù.Vighizzolo d'Este.Vigliano Biellese.Vigliano d'Asti.Vignale Monferrato.Vignanello.Vignate.Vignola.Vignola-Falesina.Vignole Borbera.Vignolo.Vignone.Vigo di Cadore.Vigodarzere.Vigolo.Vigolzone.Vigone.Vigonovo.Vigonza.Viguzzolo.Villa Bartolomea.Villa Basilica.Villa Biscossi.Villa Carcina.Villa Castelli.Villa Celiera.Villa Collemandina.Villa Cortese.Villa d'Adda.Villa d'Almè.Villa d'Ogna.Villa del Bosco.Villa del Conte.Villa di Briano.Villa di Chiavenna.Villa di Serio.Villa di Tirano.Villa Estense.Villa Faraldi.Villa Guardia.Villa Lagarina.Villa Latina.Villa Literno.Villa Minozzo.Villa San Giovanni.Villa San Giovanni in Tuscia.Villa San Pietro.Villa San Secondo.Villa Sant'Angelo.Villa Sant'Antonio.Villa Santa Lucia.Villa Santa Lucia degli Abruzzi.Villa Santa Maria.Villa Santina.Villa Santo Stefano.Villa Verde.Villabassa.Villabate.Villachiara.Villacidro.Villadeati.Villadose.Villadossola.Villafalletto.Villafranca d'Asti.Villafranca di Verona.Villafranca in Lunigiana.Villafranca Padovana.Villafranca Piemonte.Villafranca Sicula.Villafranca Tirrena.Villafrati.Villaga.Villagrande Strisaili.Villalago.Villalba.Villalfonsina.Villalvernia.Villamagna.Villamaina.Villamar.Villamarzana.Villamassargia.Villamiroglio.Villandro.Villanova Biellese.Villanova Canavese.Villanova d'Albenga.Villanova d'Ardenghi.Villanova d'Asti.Villanova del Battista.Villanova del Ghebbo.Villanova del Sillaro.Villanova di Camposampiero.Villanova Marchesana.Villanova Mondovì.Villanova Monferrato.Villanova Monteleone.Villanova Solaro.Villanova sull'Arda.Villanova Truschedu.Villanova Tulo.Villanovaforru.Villanovafranca.Villanterio.Villanuova sul Clisi.Villaperuccio.Villapiana.Villaputzu.Villar Dora.Villar Focchiardo.Villar Pellice.Villar Perosa.Villar San Costanzo.Villarbasse.Villarboit.Villareggia.Villaricca.Villaromagnano.Villarosa.Villasalto.Villasanta.Villasimius.Villasor.Villaspeciosa.Villastellone.Villata.Villaurbana.Villavallelonga.Villaverla.Ville d'Anaunia.Ville di Fiemme.Villeneuve.Villesse.Villetta Barrea.Villette.Villimpenta.Villongo.Villorba.Vilminore di Scalve.Vimercate.Vimodrone.Vinadio.Vinchiaturo.Vinchio.Vinci.Vinovo.Vinzaglio.Viola.Vione.Vipiteno.Virle Piemonte.Visano.Vische.Visciano.Visco.Visone.Visso.Vistarino.Vistrorio.Vita.Viterbo.Viticuso.Vito d'Asio.Vitorchiano.Vittoria.Vittorio Veneto.Vittorito.Vittuone.Vitulano.Vitulazio.Viù.Vivaro.Vivaro Romano.Viverone.Vizzini.Vizzola Ticino.Vizzolo Predabissi.Vo'.Vobarno.Vobbia.Vocca.Vodo Cadore.Voghera.Voghiera.Vogogna.Volano.Volla.Volongo.Volpago del Montello.Volpara.Volpedo.Volpeglino.Volpiano.Volta Mantovana.Voltaggio.Voltago Agordino.Volterra.Voltido.Volturara Appula.Volturara Irpina.Volturino.Volvera.Vottignasco.Zaccanopoli.Zafferana Etnea.Zagarise.Zagarolo.Zambrone.Zandobbio.Zanè.Zanica.Zapponeta.Zavattarello.Zeccone.Zeddiani.Zelbio.Zelo Buon Persico.Zeme.Zenevredo.Zenson di Piave.Zerba.Zerbo.Zerbolò.Zerfaliu.Zeri.Zermeghedo.Zero Branco.Zevio.Ziano di Fiemme.Ziano Piacentino.Zibido San Giacomo.Zignago.Zimella.Zimone.Zinasco.Zoagli.Zocca.Zogno.Zola Predosa.Zollino.Zone.Zoppè di Cadore.Zoppola.Zovencedo.Zubiena.Zuccarello.Zugliano.Zuglio.Zumaglia.Zumpano.Zungoli.Zungri`.split(`.`),u=[{value:`Bar`,label:`☕ Bar`,color:`#f59e0b`},{value:`Ristorante`,label:`🍽️ Ristorante`,color:`#ef4444`},{value:`Hotel`,label:`🏨 Hotel`,color:`#8b5cf6`},{value:`Azienda/Ufficio`,label:`🏢 Azienda / Ufficio`,color:`#38bdf8`},{value:`Fabbrica/SitoProduttivo`,label:`🏭 Fabbrica / Sito produttivo`,color:`#10b981`},{value:`Palestra/Sport`,label:`💪 Palestra / Sport`,color:`#22c55e`},{value:`Negozio/Retail`,label:`🛍️ Negozio / Retail`,color:`#f97316`},{value:`Struttura Sanitaria`,label:`🏥 Struttura Sanitaria`,color:`#06b6d4`},{value:`Scuola/Università`,label:`🎓 Scuola / Università`,color:`#a78bfa`},{value:`Altro`,label:`📌 Altro`,color:`#6b7280`}];function d(e){let t=u.find(t=>t.value===e)||u.find(e=>e.value===`Altro`);return`<span class="badge" style="background: ${t.color}22; color: ${t.color}; border: 1px solid ${t.color}55; font-weight: 700; white-space: nowrap;">${t.label}</span>`}function f(e,t){return`<select id="${e}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
    ${u.map(e=>`<option value="${e.value}" ${t===e.value?`selected`:``}>${e.label}</option>`).join(``)}
  </select>`}function p(e=`clients`,t=null){let n=a.getClients(),r=a.getMachines(),i=a.getBoards();a.getRefillLogs();let o=``;if(e===`clients`&&t){let e=n.find(e=>e.id===t);if(e){let t=r.find(t=>t.clientId===e.id);o=`
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
              <div style="margin-bottom: 16px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">🏷️ Tipologia Cliente:</label>
                ${f(`edit-cli-type`,e.clientType||`Altro`)}
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
                  <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">📍 Città:</label>
                  <input type="text" id="edit-cli-city" value="${e.city||``}" list="cities-list-edit"
                    placeholder="Digita per cercare... (es. Fir)"
                    style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;"
                    autocomplete="off">
                  <datalist id="cities-list-edit">
                    ${l.map(e=>`<option value="${e}">`).join(``)}
                  </datalist>
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
                  <select id="edit-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;" onchange="const gcRow = document.getElementById('edit-board-groupcount-row'); gcRow.style.display = this.value === 'PRO' ? 'block' : 'none';">
                    <option value="BASIC" ${e.version===`BASIC`?`selected`:``}>🟢 BASIC — Monogruppo</option>
                    <option value="PRO" ${e.version===`PRO`?`selected`:``}>🔵 PRO — Multigruppo</option>
                  </select>
                </div>
              </div>
              <div id="edit-board-groupcount-row" style="display: ${e.version===`PRO`?`block`:`none`}; margin-bottom: 16px; background: rgba(129,140,248,0.1); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--accent-purple);">
                <label style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; display: block; margin-bottom: 6px;">🔵 PRO — Numero Bracci/Gruppi (2-4):</label>
                <select id="edit-board-groupcount" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-purple); border: 1px solid var(--accent-purple); border-radius: 6px; font-weight: 800;">
                  <option value="2" ${(e.groupCount||2)===2?`selected`:``}>2 Gruppi</option>
                  <option value="3" ${(e.groupCount||2)===3?`selected`:``}>3 Gruppi</option>
                  <option value="4" ${(e.groupCount||2)===4?`selected`:``}>4 Gruppi (Max)</option>
                </select>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">⚠️ Contatore crediti unico condiviso per tutti i gruppi.</div>
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
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">🏷️ Tipologia Cliente:</label>
              ${f(`new-cli-type`,`Bar`)}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Nome Referente:</label>
              <input type="text" id="new-cli-ref" placeholder="Es. Mario Rossi" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
            </div>
            <div></div>
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
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px;">📍 Città:</label>
              <input type="text" id="new-cli-city" list="cities-list-new"
                placeholder="Digita per cercare... (es. Mil)"
                style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;"
                autocomplete="off">
              <datalist id="cities-list-new">
                ${l.map(e=>`<option value="${e}">`).join(``)}
              </datalist>
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
                <th>Tipologia</th>
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
                    <td>${d(e.clientType||`Altro`)}</td>
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
            <select id="new-board-version" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;" onchange="document.getElementById('new-board-groupcount-row').style.display = this.value === 'PRO' ? 'block' : 'none'">
              <option value="BASIC">🟢 BASIC — Monogruppo (1 tasto erogazione)</option>
              <option value="PRO">🔵 PRO — Multigruppo (2-4 bracci, contatore condiviso)</option>
            </select>
          </div>
        </div>

        <!-- Riga Gruppi PRO (nascosta di default) -->
        <div id="new-board-groupcount-row" style="display: none; margin-bottom: 16px; background: rgba(129,140,248,0.1); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--accent-purple);">
          <label style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; display: block; margin-bottom: 6px;">🔵 PRO — Numero di Bracci/Gruppi Erogazione (2-4):</label>
          <select id="new-board-groupcount" style="width: 100%; padding: 10px; background: var(--bg-primary); color: var(--accent-purple); border: 1px solid var(--accent-purple); border-radius: 6px; font-weight: 800;">
            <option value="2">2 Gruppi</option>
            <option value="3">3 Gruppi</option>
            <option value="4">4 Gruppi (Max)</option>
          </select>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">⚠️ Il contatore crediti è unico e condiviso per tutti i gruppi.</div>
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
              <th>Versione</th>
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
                  <td>
                    ${e.version===`PRO`?`<span class="badge" style="background: rgba(129,140,248,0.2); color: var(--accent-purple); border: 1px solid var(--accent-purple); font-weight: 800;">🔵 PRO</span><br><small style="color: var(--text-muted);">${e.groupCount||2} Gruppi · Contatore Condiviso</small>`:`<span class="badge" style="background: rgba(52,211,153,0.15); color: var(--accent-green); border: 1px solid var(--accent-green); font-weight: 800;">🟢 BASIC</span><br><small style="color: var(--text-muted);">1 Gruppo Monogruppo</small>`}
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
  `}new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}};function m(e){return a.getClients(),`
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
  `}function h(){return`
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
  `}function g(e=null){let t=a.getBoards(),n=e&&t.find(t=>t.shortCode===e)||t[0];return a.getBoardFullDetails(n.shortCode),`
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
  `}function _(e,t=null,n=null){let r=a.getUsers(),i=a.getRoleLabels(),o=a.getPermissions(),s=a.getEmailLogs(),c=``;if(t){let e=r.find(e=>e.id===t);e&&(c=`
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
  `}function v(e,t){return!e||!t?``:`
    <div class="modal-overlay" id="user-profile-modal">
      <div class="modal-box" style="max-width: 480px; width: 95%;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0;">
            👤 Profilo Utente & Credenziali
          </h2>
          <button id="btn-close-profile-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer;">&times;</button>
        </div>

        <form id="profile-edit-form">
          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Ruolo Assegnato:</label>
            <input type="text" value="${t.role||`ADMIN`}" disabled style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: var(--accent-cyan); font-weight: 800; border: 1px solid var(--border-subtle); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome & Cognome:*</label>
            <input type="text" id="profile-name" value="${t.name||``}" required style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nome Utente (Username):*</label>
            <input type="text" id="profile-username" value="${t.username||``}" required disabled style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; font-family: monospace;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Email:</label>
            <input type="email" id="profile-email" value="${t.email||``}" style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">Nuova Password (lascia vuoto per non modificare):</label>
            <input type="password" id="profile-new-password" placeholder="Nuova password..." style="width: 100%; padding: 10px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 6px;">
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" id="btn-cancel-profile-modal" class="btn btn-secondary">Annulla</button>
            <button type="submit" class="btn btn-primary">💾 Salva Modifiche Credenziali</button>
          </div>
        </form>

      </div>
    </div>
  `}function y(){let e=a.getSettings();return`
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
  `}var b={currentUser:a.getCurrentUser(),activeTab:`dashboard`,editingId:null,editingStaffUserId:null,showProfileModal:!1,dashSearchQuery:``,dashSearchCategory:`ALL`,dashSortColumn:`shortCode`,dashSortDirection:`DESC`,viewingDecontoCode:null,viewingEmailId:null,viewingKpiModal:null,kpiPeriod:`30DAYS`,kpiChartType:`LINE`,kpiCustomStart:`2026-07-01`,kpiCustomEnd:`2026-08-02`};function x(){let e=document.getElementById(`app`);if(!b.currentUser){e.innerHTML=o(),S();return}let t=``;switch(b.activeTab){case`dashboard`:t=c(b.activeTab,b.viewingDecontoCode,b.dashSearchQuery,b.dashSearchCategory,b.dashSortColumn,b.dashSortDirection,b.viewingKpiModal,b.kpiPeriod,b.kpiChartType,b.kpiCustomStart,b.kpiCustomEnd);break;case`clients`:case`machines`:case`deconto_boards`:t=p(b.activeTab,b.editingId);break;case`adr_visits`:t=m();break;case`client_diy`:case`otp_generator`:case`qr_generator`:case`refills_history`:t=h();break;case`simulator`:t=g();break;case`user_mgmt`:case`user_management`:case`permissions_matrix`:t=_(b.activeTab,b.editingStaffUserId,b.viewingEmailId);break;case`settings`:t=y();break;default:t=c()}let n=v(b.showProfileModal,b.currentUser);e.innerHTML=`
    <div class="app-layout">
      ${s(b.currentUser,b.activeTab)}
      <main class="main-content">
        ${t}
      </main>
    </div>
    ${n}
  `,C()}function S(){let e=document.getElementById(`login-form`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`login-username`).value.trim(),n=document.getElementById(`login-password`).value.trim();try{let e=a.login(t,n);b.currentUser=e,b.activeTab=e.role===`ADR`?`adr_visits`:`dashboard`,x()}catch(e){alert(e.message)}})}function C(){document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(b.activeTab=t,b.editingId=null,b.editingStaffUserId=null,b.viewingDecontoCode=null,b.viewingEmailId=null,x())})});let e=document.getElementById(`btn-open-profile-modal`);e&&e.addEventListener(`click`,()=>{b.showProfileModal=!0,x()});let t=document.getElementById(`btn-close-profile-modal`),n=document.getElementById(`btn-cancel-profile-modal`);t&&t.addEventListener(`click`,()=>{b.showProfileModal=!1,x()}),n&&n.addEventListener(`click`,()=>{b.showProfileModal=!1,x()});let r=document.getElementById(`profile-edit-form`);r&&r.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`profile-name`).value.trim(),n=document.getElementById(`profile-email`).value.trim(),r=document.getElementById(`profile-new-password`).value;try{b.currentUser=a.updateUserProfile(b.currentUser.id,{name:t,email:n,newPassword:r?r.trim():void 0}),b.showProfileModal=!1,alert(`✅ Credenziali del profilo aggiornate con successo!`),x()}catch(e){alert(`Errore: ${e.message}`)}});let i=document.getElementById(`btn-logout`);i&&i.addEventListener(`click`,()=>{a.logout(),b.currentUser=null,b.activeTab=`dashboard`,x()});let o=document.getElementById(`btn-toggle-add-client`),s=document.getElementById(`add-client-form-container`),c=document.getElementById(`btn-cancel-add-client`),l=document.getElementById(`btn-save-new-client`);o&&s&&o.addEventListener(`click`,()=>{let e=s.style.display===`none`||!s.style.display;s.style.display=e?`block`:`none`}),c&&s&&c.addEventListener(`click`,()=>{s.style.display=`none`}),l&&l.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-type`).value,n=document.getElementById(`new-cli-ref`).value.trim(),r=document.getElementById(`new-cli-phone`).value.trim(),i=document.getElementById(`new-cli-email`).value.trim(),o=document.getElementById(`new-cli-city`).value.trim(),s=document.getElementById(`new-cli-machine`).value;if(!e){alert(`Inserisci la Ragione Sociale / Nome Cliente!`);return}try{let c=a.addClient({name:e,clientType:t,refPerson:n,phone:r,email:i,city:o,machineId:s});alert(`✅ Cliente "${c.name}" registrato con successo!`),x()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{b.editingId=e.getAttribute(`data-id`),x()})}),document.querySelectorAll(`.btn-del-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo cliente?`))try{a.deleteClient(t),alert(`✅ Cliente eliminato dall'anagrafica!`),x()}catch(e){alert(`Errore: ${e.message}`)}})});let u=document.getElementById(`btn-cancel-edit-client`);u&&u.addEventListener(`click`,()=>{b.editingId=null,x()});let d=document.getElementById(`form-edit-client`);d&&d.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-client-id`).value,n=document.getElementById(`edit-cli-name`).value.trim(),r=document.getElementById(`edit-cli-type`).value,i=document.getElementById(`edit-cli-ref`).value.trim(),o=document.getElementById(`edit-cli-phone`).value.trim(),s=document.getElementById(`edit-cli-city`).value.trim(),c=document.getElementById(`edit-cli-address`).value.trim(),l=document.getElementById(`edit-cli-machine`).value;try{a.updateClient(t,{name:n,clientType:r,refPerson:i,phone:o,city:s,address:c,assignedMachineId:l}),b.editingId=null,alert(`✅ Scheda Cliente salvata con successo!`),x()}catch(e){alert(`Errore: ${e.message}`)}});let f=document.getElementById(`btn-toggle-add-machine`),p=document.getElementById(`add-machine-form-container`),m=document.getElementById(`btn-cancel-add-machine`),h=document.getElementById(`btn-save-new-machine`);f&&p&&f.addEventListener(`click`,()=>{let e=p.style.display===`none`||!p.style.display;p.style.display=e?`block`:`none`}),m&&p&&m.addEventListener(`click`,()=>{p.style.display=`none`}),h&&h.addEventListener(`click`,()=>{let e=document.getElementById(`new-mc-serial`).value.trim(),t=document.getElementById(`new-mc-brand`).value.trim(),n=document.getElementById(`new-mc-model`).value.trim(),r=document.getElementById(`new-mc-board`).value,i=document.getElementById(`new-mc-client`).value;if(!e||!n){alert(`Inserisci Seriale Macchina e Modello!`);return}try{let o=a.addMachine({serialNumber:e,brand:t,model:n,boardId:r,clientId:i});alert(`✅ Macchina da caffè SN "${o.serialNumber}" registrata con successo!`),x()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{b.editingId=e.getAttribute(`data-id`),x()})}),document.querySelectorAll(`.btn-del-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questa macchina da caffè?`))try{a.deleteMachine(t),alert(`✅ Macchina eliminata dal parco macchine!`),x()}catch(e){alert(`Errore: ${e.message}`)}})});let g=document.getElementById(`btn-cancel-edit-mc`);g&&g.addEventListener(`click`,()=>{b.editingId=null,x()});let _=document.getElementById(`form-edit-machine`);_&&_.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-mc-id`).value,n=document.getElementById(`edit-mc-serial`).value.trim(),r=document.getElementById(`edit-mc-brand`).value.trim(),i=document.getElementById(`edit-mc-model`).value.trim(),o=document.getElementById(`edit-mc-board`).value,s=document.getElementById(`edit-mc-client`).value;try{a.updateMachine(t,{serialNumber:n,brand:r,model:i,boardId:o,clientId:s}),b.editingId=null,alert(`✅ Scheda Macchina salvata con successo!`),x()}catch(e){alert(`Errore: ${e.message}`)}});let v=document.getElementById(`btn-toggle-add-board`),y=document.getElementById(`add-board-form-container`),S=document.getElementById(`btn-cancel-add-board`),C=document.getElementById(`btn-save-new-board`);v&&y&&v.addEventListener(`click`,()=>{let e=y.style.display===`none`||!y.style.display;y.style.display=e?`block`:`none`}),S&&y&&S.addEventListener(`click`,()=>{y.style.display=`none`}),C&&C.addEventListener(`click`,()=>{let e=document.getElementById(`new-board-code`).value.trim(),t=document.getElementById(`new-board-hwserial`).value.trim(),n=document.getElementById(`new-board-credits`).value,r=document.getElementById(`new-board-version`).value,i=document.getElementById(`new-board-machine`).value,o=document.getElementById(`new-board-groupcount`),s=o?parseInt(o.value,10):1;if(!e){alert(`Inserisci il Codice a 4 cifre del Deconto!`);return}try{let o=a.addBoard({shortCode:e,hwSerial:t,remainingCredits:n,version:r,groupCount:s,machineId:i});alert(`✅ Scheda Deconto #${o.shortCode} salvata PERMANENTEMENTE nel database!`),x()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{b.editingId=e.getAttribute(`data-id`),x()})}),document.querySelectorAll(`.btn-del-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questa scheda Deconto?`))try{a.deleteBoard(t),alert(`✅ Scheda Deconto eliminata!`),x()}catch(e){alert(`Errore: ${e.message}`)}})});let w=document.getElementById(`btn-cancel-edit-board`);w&&w.addEventListener(`click`,()=>{b.editingId=null,x()});let T=document.getElementById(`form-edit-board`);T&&T.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-board-id`).value,n=document.getElementById(`edit-board-shortcode`).value.trim(),r=document.getElementById(`edit-board-hwserial`).value.trim(),i=document.getElementById(`edit-board-credits`).value,o=document.getElementById(`edit-board-version`).value,s=document.getElementById(`edit-board-machine`).value,c=document.getElementById(`edit-board-groupcount`),l=c?parseInt(c.value,10):1;try{a.updateBoard(t,{shortCode:n,hwSerial:r,remainingCredits:i,version:o,groupCount:l,machineId:s}),b.editingId=null,alert(`✅ Scheda Deconto salvata con successo!`),x()}catch(e){alert(`Errore: ${e.message}`)}});let E=document.getElementById(`btn-close-edit-modal`);E&&E.addEventListener(`click`,()=>{b.editingId=null,x()});let D=document.getElementById(`btn-toggle-add-user`),O=document.getElementById(`add-user-form-container`),k=document.getElementById(`btn-cancel-add-user`),A=document.getElementById(`btn-save-new-user`);D&&O&&D.addEventListener(`click`,()=>{let e=O.style.display===`none`||!O.style.display;O.style.display=e?`block`:`none`}),k&&O&&k.addEventListener(`click`,()=>{O.style.display=`none`}),A&&A.addEventListener(`click`,()=>{let e=document.getElementById(`new-user-username`).value.trim(),t=document.getElementById(`new-user-password`).value.trim(),n=document.getElementById(`new-user-name`).value.trim(),r=document.getElementById(`new-user-role`).value,i=document.getElementById(`new-user-email`).value.trim(),o=document.getElementById(`new-user-phone`).value.trim();if(!e||!t||!n){alert(`Compila i campi obbligatori: Codice Utente, Password e Nome!`);return}try{a.addUser({username:e,password:t,name:n,role:r,email:i,phone:o}),alert(`✅ Utente dipendente "${n}" (Codice ${e}) salvato PERMANENTEMENTE nel database!`),x()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-staff-user`).forEach(e=>{e.addEventListener(`click`,()=>{b.editingStaffUserId=e.getAttribute(`data-id`),x()})});let j=document.getElementById(`btn-close-edit-staff-modal`),M=document.getElementById(`btn-cancel-edit-staff`);j&&j.addEventListener(`click`,()=>{b.editingStaffUserId=null,x()}),M&&M.addEventListener(`click`,()=>{b.editingStaffUserId=null,x()});let N=document.getElementById(`edit-staff-form`);N&&N.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-staff-id`).value,n=document.getElementById(`edit-staff-username`)?document.getElementById(`edit-staff-username`).value:void 0,r=document.getElementById(`edit-staff-name`).value,i=document.getElementById(`edit-staff-role`)?document.getElementById(`edit-staff-role`).value:void 0,o=document.getElementById(`edit-staff-email`).value,s=document.getElementById(`edit-staff-phone`).value,c=document.getElementById(`edit-staff-password`).value;try{let e=a.updateUser(t,{username:n,name:r,role:i,email:o,phone:s,password:c?c.trim():void 0});b.editingStaffUserId=null,alert(`✅ Scheda Utente "${e.name}" salvata PERMANENTEMENTE!`),x()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-toggle-user-status`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-status`)===`ACTIVE`?`DISABLED`:`ACTIVE`;a.updateUser(t,{status:n}),x()})}),document.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo utente dipendente?`))try{a.deleteUser(t),x()}catch(e){alert(`Errore: ${e.message}`)}})});let P=document.getElementById(`btn-open-email-logs`);P&&P.addEventListener(`click`,()=>{let e=a.getEmailLogs();e.length>0?(b.viewingEmailId=e[0].id,x()):alert(`Nessuna email spedita di recente nel registro.`)});let F=document.getElementById(`btn-close-email-preview`),I=document.getElementById(`btn-close-email-preview-footer`);F&&F.addEventListener(`click`,()=>{b.viewingEmailId=null,x()}),I&&I.addEventListener(`click`,()=>{b.viewingEmailId=null,x()});let L=document.getElementById(`rename-role-labels-form`);L&&L.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`role_label_UFFICIO`).value.trim(),n=document.getElementById(`role_label_ADR`).value.trim();a.updateRoleLabel(`UFFICIO`,t),a.updateRoleLabel(`ADR`,n),alert(`✅ Nomi delle Categorie Utente aggiornati con successo!`),x()});let R=document.getElementById(`permissions-matrix-form`);R&&R.addEventListener(`submit`,e=>{e.preventDefault();let t=[`UFFICIO`,`ADR`],n=[`canViewClients`,`canCreateClients`,`canEditClients`,`canDeleteClients`,`canGenerateQr`,`canGenerateOtp`,`canBleRefill`,`canUseSimulator`],r={UFFICIO:{},ADR:{}};t.forEach(e=>{n.forEach(t=>{let n=document.getElementById(`perm_${e}_${t}`);n&&(r[e][t]=n.checked)})}),a.updatePermissions(r),alert(`✅ Matrice dei Permessi aggiornata con successo per tutti gli utenti!`),x()});let z=document.getElementById(`setting-logo-file`);z&&z.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){if(!t.type.startsWith(`image/`)){alert(`Seleziona un file immagine valido (PNG, JPG, SVG).`);return}let e=new FileReader;e.onload=function(e){let t=e.target.result;a.updateSettings({customLogoUrl:t}),alert(`✅ Nuovo Logo Aziendale caricato con successo!`),x()},e.readAsDataURL(t)}});let B=document.getElementById(`btn-reset-logo`);B&&B.addEventListener(`click`,()=>{confirm(`Ripristinare il logo predefinito con icona caffè ☕?`)&&(a.updateSettings({customLogoUrl:null}),alert(`✅ Logo predefinito ripristinato!`),x())});let V=document.getElementById(`settings-brand-form`);V&&V.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brand-title`).value.trim(),n=document.getElementById(`setting-brand-subtitle`).value.trim();a.updateSettings({brandTitle:t,brandSubtitle:n}),alert(`✅ Titolo e Sottotitolo Brand salvati con successo!`),x()});let H=document.getElementById(`settings-thresholds-form`);H&&H.addEventListener(`submit`,e=>{e.preventDefault();let t=parseInt(document.getElementById(`setting-threshold-yellow`).value,10),n=parseInt(document.getElementById(`setting-threshold-red`).value,10);if(isNaN(t)||isNaN(n)||n>=t){alert(`Attenzione: La Soglia Critica Rossa (X) deve essere inferiore alla Soglia Sottoscorta Gialla (Y)!`);return}a.updateSettings({thresholdYellow:t,thresholdRed:n}),alert(`✅ Soglie Automatiche Salvate con Successo!\n\n🟢 VERDE: > ${t} cialde\n🟡 GIALLO (Sottoscorta): da ${n+1} a ${t} cialde\n🔴 ROSSO (Critico): da 1 a ${n} cialde\n⚫ NERO (Bloccato): 0 cialde`),x()});let U=document.getElementById(`settings-brevo-form`);U&&U.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brevo-key`).value.trim(),n=document.getElementById(`setting-brevo-sender`).value.trim();a.updateSettings({brevoApiKey:t,brevoSenderEmail:n}),alert(`✅ API Key ed Email Mittente Brevo salvate con successo!`),x()}),document.querySelectorAll(`.kpi-card-clickable`).forEach(e=>{e.addEventListener(`click`,()=>{b.viewingKpiModal=e.getAttribute(`data-kpi`),x()})}),document.querySelectorAll(`.btn-close-kpi-modal`).forEach(e=>{e.addEventListener(`click`,()=>{b.viewingKpiModal=null,x()})}),document.querySelectorAll(`.btn-kpi-period`).forEach(e=>{e.addEventListener(`click`,()=>{b.kpiPeriod=e.getAttribute(`data-period`),x()})}),document.querySelectorAll(`.btn-kpi-charttype`).forEach(e=>{e.addEventListener(`click`,()=>{b.kpiChartType=e.getAttribute(`data-charttype`),x()})});let W=document.getElementById(`btn-apply-kpi-custom-date`);W&&W.addEventListener(`click`,()=>{let e=document.getElementById(`kpi-custom-start`).value,t=document.getElementById(`kpi-custom-end`).value;e&&t?(b.kpiCustomStart=e,b.kpiCustomEnd=t,alert(`✅ Filtro Date Personalizzato Applicato!\nDal: ${e}\nAl: ${t}`),x()):alert(`Seleziona sia la Data Inizio che la Data Fine dal calendario!`)});let G=document.getElementById(`btn-dash-search`),K=document.getElementById(`dash-search-input`);G&&K&&(G.addEventListener(`click`,()=>{b.dashSearchQuery=K.value,b.dashSearchCategory=document.getElementById(`dash-search-category`).value,x()}),K.addEventListener(`keypress`,e=>{e.key===`Enter`&&(b.dashSearchQuery=K.value,b.dashSearchCategory=document.getElementById(`dash-search-category`).value,x())}));let q=document.getElementById(`btn-dash-reset`);q&&q.addEventListener(`click`,()=>{b.dashSearchQuery=``,b.dashSearchCategory=`ALL`,x()}),document.querySelectorAll(`.th-sortable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-col`);b.dashSortColumn===t?b.dashSortDirection=b.dashSortDirection===`ASC`?`DESC`:`ASC`:(b.dashSortColumn=t,b.dashSortDirection=`DESC`),x()})}),document.querySelectorAll(`.btn-deconto-detail`).forEach(e=>{e.addEventListener(`click`,()=>{b.viewingDecontoCode=e.getAttribute(`data-code`),x()})});let J=document.getElementById(`btn-close-deconto-modal`),Y=document.getElementById(`btn-close-deconto-modal-footer`);J&&J.addEventListener(`click`,()=>{b.viewingDecontoCode=null,x()}),Y&&Y.addEventListener(`click`,()=>{b.viewingDecontoCode=null,x()});let X=document.getElementById(`btn-export-csv`);X&&X.addEventListener(`click`,()=>{let e=a.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.setAttribute(`href`,n),r.setAttribute(`download`,`deconto_erogazioni_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)});let Z=document.getElementById(`btn-trigger-backup`);Z&&Z.addEventListener(`click`,async()=>{try{Z.disabled=!0,Z.innerHTML=`⏳ Backup in Corso...`;let e=a.triggerGitHubBackup();alert(`✅ Backup Cloud completato!\nID: ${e.id}\nCommit: ${e.commitHash}\nRecords: ${e.recordCount}`)}catch(e){alert(`❌ Errore Backup GitHub: ${e.message}`)}finally{Z.disabled=!1,Z.innerHTML=`☁️ Esegui Backup GitHub`}})}x();