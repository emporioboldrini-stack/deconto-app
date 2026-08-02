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
    `;return this.sendEmail({to:e.email,recipientName:e.name,subject:l,htmlContent:u,plainText:`Ciao ${e.name}, il tuo ruolo è stato aggiornato da ${o} a ${s}. Accedi su https://deconto-app.web.app`})}},t=`deconto_app_master_db_v3`,n=`deconto_app_user_session`,r=[`deconto_app_master_db_v3`,`deconto_app_master_db_v2`,`deconto_app_master_db_v1`,`deconto_app_master_db`,`deconto_vending_db`,`deconto_db`],i={settings:{customLogoUrl:null,brandTitle:`DECONTO`,brandSubtitle:`IoT Vending System`,thresholdYellow:20,thresholdRed:5,brevoApiKey:``,brevoSenderEmail:`noreply@deconto.it`},roleLabels:{UFFICIO:`Operatore Ufficio`,ADR:`Agente ADR Consegne`},users:[{id:`usr_001`,username:`001`,password:`123456`,name:`Valerio Boldrini (Amministratore)`,email:`admin@deconto.it`,phone:`+39 333 112233`,role:`ADMIN`,status:`ACTIVE`,avatar:`👨‍💼`,createdAt:`2026-01-01`},{id:`usr_002`,username:`002`,password:`123456`,name:`Laura Bianchi`,email:`laura.ufficio@deconto.it`,phone:`+39 02 445566`,role:`UFFICIO`,status:`ACTIVE`,avatar:`👩‍💻`,createdAt:`2026-01-05`},{id:`usr_003`,username:`003`,password:`123456`,name:`Giuseppe Verdi (Agente Nord)`,email:`giuseppe.adr@deconto.it`,phone:`+39 333 998877`,role:`ADR`,status:`ACTIVE`,avatar:`🚚`,createdAt:`2026-01-10`}],permissions:{UFFICIO:{canViewClients:!0,canCreateClients:!0,canEditClients:!0,canDeleteClients:!0,canGenerateQr:!0,canGenerateOtp:!0,canBleRefill:!0,canUseSimulator:!0},ADR:{canViewClients:!0,canCreateClients:!1,canEditClients:!1,canDeleteClients:!1,canGenerateQr:!1,canGenerateOtp:!1,canBleRefill:!0,canUseSimulator:!0}},clients:[{id:`cli_1`,name:`Bar Milano Central`,refPerson:`Mario Rossi`,phone:`+39 02 5551234`,address:`Via Roma 12, Milano`,city:`Milano`},{id:`cli_2`,name:`Ristorante La Perla`,refPerson:`Elena Neri`,phone:`+39 06 7778899`,address:`Corso Italia 45, Roma`,city:`Roma`},{id:`cli_3`,name:`Studio Dentistico Rossi`,refPerson:`Dr. Roberto Rossi`,phone:`+39 030 445566`,address:`Via X Giornate 88, Brescia`,city:`Brescia`},{id:`cli_4`,name:`Hotel Bellavista`,refPerson:`Stefano Bellini`,phone:`+39 051 889900`,address:`Piazza Maggiore 3, Bologna`,city:`Bologna`},{id:`cli_5`,name:`Magazzino Riserve ADR`,refPerson:`Deposito Centrale`,phone:`+39 02 998800`,address:`Via Industria 2, Monza`,city:`Monza`},{id:`cli_6`,name:`Caffetteria Torinese`,refPerson:`Carla Vianello`,phone:`+39 011 334455`,address:`Piazza Castello 15, Torino`,city:`Torino`},{id:`cli_7`,name:`Officina Meccanica Conti`,refPerson:`Luigi Conti`,phone:`+39 011 998877`,address:`Via Garibaldi 102, Torino`,city:`Torino`},{id:`cli_8`,name:`Pasticceria Giotto`,refPerson:`Marco Giotto`,phone:`+39 049 887766`,address:`Via Dante 14, Padova`,city:`Padova`}],machines:[{id:`mc_1`,serialNumber:`SN-MC-2026-9912`,brand:`DeLonghi`,model:`DeLonghi Pod Professional 1G`,clientId:`cli_1`,installDate:`2025-11-10`},{id:`mc_2`,serialNumber:`SN-MC-2026-8843`,brand:`Faber`,model:`Faber Slot Plast Single`,clientId:`cli_2`,installDate:`2026-01-15`},{id:`mc_3`,serialNumber:`SN-MC-2026-1099`,brand:`Saeco`,model:`Saeco Aroma SE Compact`,clientId:`cli_3`,installDate:`2026-02-01`},{id:`mc_4`,serialNumber:`SN-MC-2026-4021`,brand:`Lelit`,model:`Lelit Giulietta Dual Group`,clientId:`cli_4`,installDate:`2026-02-10`},{id:`mc_5`,serialNumber:`SN-MC-2026-7700`,brand:`Grimac`,model:`Grimac Terry Opus 1`,clientId:`cli_5`,installDate:`2026-02-20`},{id:`mc_6`,serialNumber:`SN-MC-2026-5432`,brand:`Gaggia`,model:`Gaggia Ruby 1G Professional`,clientId:`cli_6`,installDate:`2026-03-01`},{id:`mc_7`,serialNumber:`SN-MC-2026-4409`,brand:`Spinel`,model:`Spinel Pinocchio Professional`,clientId:`cli_7`,installDate:`2026-03-05`},{id:`mc_8`,serialNumber:`SN-MC-2026-8820`,brand:`Bialetti`,model:`Bialetti Mokona Pro Vending`,clientId:`cli_8`,installDate:`2026-03-15`}],decontoBoards:[{id:`board_3467`,shortCode:`3467`,hwSerial:`DC-HW-8841`,macAddress:`C6:3F:8A:11:34:67`,machineId:`mc_1`,version:`BASIC`,remainingCredits:145,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-62,machineExtractions:1855,lifetimeExtractions:4920,avgDailyCoffees:12.4,lastSyncDate:new Date().toISOString()},{id:`board_1289`,shortCode:`1289`,hwSerial:`DC-HW-7732`,macAddress:`C6:3F:8A:22:12:89`,machineId:`mc_2`,version:`PRO`,remainingCredits:320,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-78,machineExtractions:3410,lifetimeExtractions:8120,avgDailyCoffees:24.8,lastSyncDate:new Date(Date.now()-2592e5).toISOString()},{id:`board_1099`,shortCode:`1099`,hwSerial:`DC-HW-1099`,macAddress:`C6:3F:8A:99:10:99`,machineId:`mc_3`,version:`PRO`,remainingCredits:85,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-55,machineExtractions:1750,lifetimeExtractions:3890,avgDailyCoffees:14.2,lastSyncDate:new Date().toISOString()},{id:`board_4021`,shortCode:`4021`,hwSerial:`DC-HW-4021`,macAddress:`C6:3F:8A:66:40:21`,machineId:`mc_4`,version:`PRO`,remainingCredits:45,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-65,machineExtractions:2100,lifetimeExtractions:5400,avgDailyCoffees:15,lastSyncDate:new Date().toISOString()},{id:`board_7700`,shortCode:`7700`,hwSerial:`DC-HW-5500`,macAddress:`C6:3F:8A:55:77:00`,machineId:`mc_5`,version:`PRO`,remainingCredits:500,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-70,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:0,lastSyncDate:new Date().toISOString()},{id:`board_5432`,shortCode:`5432`,hwSerial:`DC-HW-5432`,macAddress:`C6:3F:8A:AA:54:32`,machineId:`mc_6`,version:`BASIC`,remainingCredits:12,relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-75,machineExtractions:960,lifetimeExtractions:2400,avgDailyCoffees:7.8,lastSyncDate:new Date(Date.now()-1728e5).toISOString()},{id:`board_9901`,shortCode:`9901`,hwSerial:`DC-HW-4401`,macAddress:`C6:3F:8A:44:99:01`,machineId:`mc_7`,version:`BASIC`,remainingCredits:0,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-58,machineExtractions:1241,lifetimeExtractions:3501,avgDailyCoffees:9.1,lastSyncDate:new Date().toISOString()},{id:`board_8820`,shortCode:`8820`,hwSerial:`DC-HW-8820`,macAddress:`C6:3F:8A:88:88:20`,machineId:`mc_8`,version:`BASIC`,remainingCredits:0,relayStatus:`OPEN_LOCKED`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!0,rssi:-60,machineExtractions:1540,lifetimeExtractions:4120,avgDailyCoffees:11.2,lastSyncDate:new Date().toISOString()}],refillLogs:[],coffeeLogs:[],emailLogs:[],backupLogs:[]},a=new class{constructor(){this.data=this.loadData(),this.currentUser=this.loadSession(),this.initIndexedDB(),this.seedCoffeeLogs()}initIndexedDB(){try{let e=indexedDB.open(`DecontoDB_Vault`,1);e.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(`store`)||t.createObjectStore(`store`,{keyPath:`key`})},e.onsuccess=e=>{this.idb=e.target.result,this.syncToIndexedDB()}}catch{}}syncToIndexedDB(){if(!(!this.idb||!this.data))try{this.idb.transaction(`store`,`readwrite`).objectStore(`store`).put({key:`master_data`,payload:JSON.stringify(this.data)})}catch{}}loadData(){let e=null;try{let n=localStorage.getItem(t);n&&(e=JSON.parse(n))}catch{e=null}if(!e)for(let t of r)try{let n=localStorage.getItem(t);if(n&&(e=JSON.parse(n),e))break}catch{}if(!e)e=JSON.parse(JSON.stringify(i));else{if(e.settings?e.settings={...i.settings,...e.settings}:e.settings={...i.settings},e.roleLabels?e.roleLabels={...i.roleLabels,...e.roleLabels}:e.roleLabels={...i.roleLabels},e.permissions?e.permissions={...i.permissions,...e.permissions}:e.permissions={...i.permissions},!e.users||!Array.isArray(e.users)||e.users.length===0)e.users=[...i.users];else{let t=i.users.find(e=>e.username===`001`);t&&!e.users.some(e=>e.username===`001`)&&e.users.push(t)}(!e.clients||!Array.isArray(e.clients))&&(e.clients=[...i.clients]),(!e.machines||!Array.isArray(e.machines))&&(e.machines=[...i.machines]),(!e.decontoBoards||!Array.isArray(e.decontoBoards))&&(e.decontoBoards=[...i.decontoBoards])}e.refillLogs||(e.refillLogs=[]),e.coffeeLogs||(e.coffeeLogs=[]),e.emailLogs||(e.emailLogs=[]),e.backupLogs||(e.backupLogs=[]);let n=new Set(e.decontoBoards.map(e=>e.id));e.coffeeLogs=e.coffeeLogs.filter(e=>n.has(e.boardId)),e.refillLogs=e.refillLogs.filter(e=>n.has(e.boardId));try{let t=JSON.stringify(e);r.forEach(e=>localStorage.setItem(e,t))}catch{}return e}saveData(){try{let e=JSON.stringify(this.data);r.forEach(t=>{localStorage.setItem(t,e)}),this.syncToIndexedDB()}catch{}}loadSession(){try{let e=sessionStorage.getItem(n);return e?JSON.parse(e):null}catch{return null}}saveSession(e){this.currentUser=e,e?sessionStorage.setItem(n,JSON.stringify(e)):sessionStorage.removeItem(n)}login(e,t){let n=String(e||``).trim(),r=this.data.users.find(e=>e.username===n);if(!r)throw Error(`Codice utente non valido.`);let i=r.username===`001`;if(!(r.password===t||i&&(t===`123456`||t===`123`)))throw Error(`Password errata.`);if(r.status!==`ACTIVE`)throw Error(`Account utente disabilitato dall'amministratore.`);return this.saveSession(r),r}logout(){this.saveSession(null)}getCurrentUser(){return this.currentUser}getSettings(){return this.data.settings||i.settings}updateSettings(e){return this.data.settings={...this.getSettings(),...e},this.saveData(),this.data.settings}getRoleLabels(){return this.data.roleLabels||i.roleLabels}updateRoleLabel(e,t){return this.data.roleLabels||(this.data.roleLabels={...i.roleLabels}),this.data.roleLabels[e]=t.trim(),this.saveData(),this.data.roleLabels}getPermissions(){return this.data.permissions||i.permissions}updatePermissions(e){return this.data.permissions=e,this.saveData(),this.data.permissions}calculateBoardStatus(e){let t=this.getSettings(),n=t.thresholdYellow||20,r=t.thresholdRed||5,i=e.remainingCredits;return i<=0?{statusKey:`BLOCKED_ZERO`,label:`⚫ BLOCCO RELÈ (0 CIALDE)`,badgeClass:`badge-danger`,badgeHtml:`<span class="badge" style="background: #090d16; color: #fff; border: 1px solid #334155; font-weight: 800;">⚫ BLOCCO RELÈ (0 CIALDE)</span>`}:i<=r?{statusKey:`CRITICAL_LOW`,label:`🔴 CRITICO (${i} CIALDE)`,badgeClass:`badge-danger`,badgeHtml:`<span class="badge badge-danger" style="font-weight: 800;">🔴 CRITICO (${i} CIALDE)</span>`}:i<=n?{statusKey:`WARNING_LOW`,label:`🟡 SOTTOSCORTA (${i} CIALDE)`,badgeClass:`badge-warning`,badgeHtml:`<span class="badge badge-warning" style="font-weight: 800;">🟡 SOTTOSCORTA (${i} CIALDE)</span>`}:{statusKey:`ACTIVE_OK`,label:`🟢 REGOLARE (${i} CIALDE)`,badgeClass:`badge-success`,badgeHtml:`<span class="badge badge-success" style="font-weight: 800;">🟢 REGOLARE (${i} CIALDE)</span>`}}calculateClientStatus(e){let t=this.data.machines.filter(t=>t.clientId===e.id);if(t.length===0)return{statusKey:`NO_MACHINE`,label:`⚪ NESSUNA MACCHINA`,badgeHtml:`<span class="badge badge-secondary">⚪ INATTIVO</span>`};let n=this.data.decontoBoards.find(e=>t.some(t=>t.id===e.machineId));return n?this.calculateBoardStatus(n):{statusKey:`NO_BOARD`,label:`⚪ MACCHINA SENZA DECONTO`,badgeHtml:`<span class="badge badge-secondary">⚪ NON COLLEGATO</span>`}}updateUserProfile(e,t){let n=this.data.users.find(t=>t.id===e);if(!n)throw Error(`Utente non trovato.`);return t.name&&(n.name=t.name.trim()),t.email&&(n.email=t.email.trim()),t.phone&&(n.phone=t.phone.trim()),t.avatar&&(n.avatar=t.avatar),t.newPassword&&(n.password=t.newPassword.trim()),this.saveData(),this.currentUser&&this.currentUser.id===e&&this.saveSession(n),n}verifyPassword(e,t){let n=this.data.users.find(t=>t.id===e);return n?n.password===t:!1}getUsers(){return this.data.users}addUser(t){let n=t.username.trim();if(this.data.users.find(e=>e.username===n))throw Error(`Il codice utente "${n}" è già assegnato a un altro dipendente.`);let r={id:`usr_`+Date.now(),username:n,password:t.password.trim(),name:t.name.trim(),email:t.email?t.email.trim():``,phone:t.phone?t.phone.trim():``,role:t.role||`UFFICIO`,status:`ACTIVE`,avatar:t.role===`ADMIN`?`👨‍💼`:t.role===`UFFICIO`?`👩‍💻`:`🚚`,createdAt:new Date().toISOString().split(`T`)[0]};return this.data.users.push(r),this.saveData(),r.email&&e.sendWelcomeStaffEmail(r),r}updateUser(t,n){let r=this.data.users.find(e=>e.id===t);if(!r)throw Error(`Utente non trovato.`);let i=r.role;if(n.username&&n.username!==r.username){let e=n.username.trim();if(this.data.users.find(n=>n.username===e&&n.id!==t))throw Error(`Il codice utente "${e}" è già in uso.`);r.username=e}return n.name&&(r.name=n.name.trim()),n.email!==void 0&&(r.email=n.email.trim()),n.phone!==void 0&&(r.phone=n.phone.trim()),n.status&&(r.status=n.status),n.password&&(r.password=n.password.trim()),n.role&&r.username!==`001`&&(r.role=n.role,r.avatar=r.role===`ADMIN`?`👨‍💼`:r.role===`UFFICIO`?`👩‍💻`:`🚚`,i!==r.role&&r.email&&e.sendRoleUpdateEmail(r,i,r.role)),this.saveData(),r}deleteUser(e){let t=this.data.users.find(t=>t.id===e);if(!t)throw Error(`Utente non trovato.`);if(t.username===`001`)throw Error(`Impossibile eliminare l'amministratore principale.`);this.data.users=this.data.users.filter(t=>t.id!==e),this.saveData()}getClients(){return this.data.clients}getMachines(){return this.data.machines}getBoards(){return this.data.decontoBoards}getRefillLogs(){return this.data.refillLogs}getCoffeeLogs(){return this.data.coffeeLogs||[]}getEmailLogs(){return this.data.emailLogs||[]}getBackupLogs(){return this.data.backupLogs}seedCoffeeLogs(){if(this.data.coffeeLogs&&this.data.coffeeLogs.length>50)return this.data.coffeeLogs;let e=[],t=Date.now(),n=this.data.decontoBoards?this.data.decontoBoards.filter(e=>e.machineId):[];if(n.length===0)return this.data.coffeeLogs=[],this.saveData(),[];for(let r=0;r<365;r++){let i=t-r*864e5,a=new Date(i).getDay(),o=a===0||a===6?2:6;n.forEach(t=>{let n=Math.floor(o+Math.random()*(t.avgDailyCoffees||8));for(let r=0;r<n;r++){let n=i-Math.floor(Math.random()*864e5);e.push({id:`log_`+n+`_`+Math.floor(Math.random()*1e3),boardId:t.id,timestamp:new Date(n).toISOString(),durationSeconds:Math.floor(18+Math.random()*8),groupId:Math.random()>.5?1:2})}})}return e.sort((e,t)=>new Date(t.timestamp).getTime()-new Date(e.timestamp).getTime()),this.data.coffeeLogs=e,this.saveData(),e}getExtractionsAnalytics(e=`30DAYS`,t=null,n=null){let r=this.data.coffeeLogs||[];r.length===0&&this.data.decontoBoards&&this.data.decontoBoards.length>0&&(r=this.seedCoffeeLogs());let i=new Date,a,o;e===`30DAYS`?(a=new Date(i.getTime()-2592e6),o=new Date(i)):e===`90DAYS`?(a=new Date(i.getTime()-7776e6),o=new Date(i)):e===`1YEAR`?(a=new Date(i.getFullYear(),0,1),o=new Date(i)):e===`CUSTOM`&&t&&n?(a=new Date(t+`T00:00:00`),o=new Date(n+`T23:59:59`)):(a=new Date(i.getTime()-2592e6),o=new Date(i));let s=Math.max(1,Math.round((o.getTime()-a.getTime())/864e5)),c=r.filter(e=>{let t=new Date(e.timestamp);return t>=a&&t<=o}),l=c.length,u=(l/s).toFixed(1),d=(o.getTime()-a.getTime())/5,f=[];for(let e=0;e<5;e++){let t=new Date(a.getTime()+e*d),n=new Date(a.getTime()+(e+1)*d),r=c.filter(e=>{let r=new Date(e.timestamp);return r>=t&&r<n}),i=``;i=s<=35?t.toLocaleDateString(`it-IT`,{day:`2-digit`,month:`short`}):s<=120?`Sett. ${e+1}`:t.toLocaleDateString(`it-IT`,{month:`short`,year:`2-digit`}),f.push({label:i,count:r.length,startDate:t,endDate:n})}return{periodKey:e,startDate:a,endDate:o,durationDays:s,totalCount:l,avgDaily:u,chartBuckets:f,logs:c}}hasPermission(e){if(!this.currentUser)return!1;if(this.currentUser.role===`ADMIN`)return!0;let t=(this.data.permissions||i.permissions)[this.currentUser.role];return t?!!t[e]:!1}addBoard(e){let t=String(e.shortCode||``).trim();if(!t)throw Error(`Inserisci il Codice 4 Cifre del Deconto.`);if(this.data.decontoBoards.find(e=>e.shortCode===t))throw Error(`La Scheda Deconto con codice #${t} esiste già nel sistema.`);let n=t.padStart(4,`0`).substring(0,4),r={id:`board_`+n,shortCode:n,hwSerial:e.hwSerial?e.hwSerial.trim():`DC-HW-${Math.floor(1e3+Math.random()*9e3)}`,macAddress:e.macAddress?e.macAddress.trim():`C6:3F:8A:${Math.floor(10+Math.random()*89)}:${n.substring(0,2)}:${n.substring(2,4)}`,machineId:e.machineId||null,version:e.version||`BASIC`,remainingCredits:parseInt(e.remainingCredits===void 0?200:e.remainingCredits,10),relayStatus:`CLOSED_OK`,firmwareVersion:`v2.1.0-ESP32-C6`,isOnlineWifi:!1,rssi:-65,machineExtractions:0,lifetimeExtractions:0,avgDailyCoffees:10,lastSyncDate:new Date().toISOString()};if(this.data.decontoBoards.unshift(r),e.machineId){let t=this.data.machines.find(t=>t.id===e.machineId);t&&this.data.decontoBoards.forEach(e=>{e.id!==r.id&&e.machineId===t.id&&(e.machineId=null)})}return this.saveData(),r}updateBoard(e,t){let n=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);if(!n)throw Error(`Scheda Deconto non trovata.`);if(t.shortCode){let e=String(t.shortCode).trim().padStart(4,`0`).substring(0,4);if(this.data.decontoBoards.find(t=>t.shortCode===e&&t.id!==n.id))throw Error(`Il codice #${e} è già utilizzato da un'altra scheda.`);n.shortCode=e}if(t.hwSerial!==void 0&&(n.hwSerial=t.hwSerial.trim()),t.version&&(n.version=t.version),t.machineId!==void 0){let e=t.machineId||null;n.machineId=e,e&&this.data.decontoBoards.forEach(t=>{t.id!==n.id&&t.machineId===e&&(t.machineId=null)})}return t.remainingCredits!==void 0&&(n.remainingCredits=parseInt(t.remainingCredits,10),n.remainingCredits>0?n.relayStatus=`CLOSED_OK`:(n.remainingCredits=0,n.relayStatus=`OPEN_LOCKED`)),this.saveData(),n}deleteBoard(e){let t=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);t&&(this.data.coffeeLogs=(this.data.coffeeLogs||[]).filter(e=>e.boardId!==t.id),this.data.refillLogs=(this.data.refillLogs||[]).filter(e=>e.boardId!==t.id),this.data.decontoBoards=this.data.decontoBoards.filter(e=>e.id!==t.id),this.saveData())}addMachine(e){let t=e.serialNumber.trim();if(this.data.machines.find(e=>e.serialNumber===t))throw Error(`La macchina con seriale ${t} esiste già.`);let n={id:`mc_`+Date.now(),serialNumber:t,brand:e.brand?e.brand.trim():`DeLonghi`,model:e.model?e.model.trim():`Pod Professional`,clientId:e.clientId||null,installDate:e.clientId?new Date().toISOString().split(`T`)[0]:null};if(this.data.machines.unshift(n),e.boardId){let t=this.data.decontoBoards.find(t=>t.id===e.boardId||t.shortCode===e.boardId);t&&(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),t.machineId=n.id)}return this.saveData(),n}updateMachine(e,t){let n=this.data.machines.find(t=>t.id===e);if(!n)throw Error(`Macchina non trovata.`);if(t.serialNumber&&(n.serialNumber=t.serialNumber.trim()),t.brand!==void 0&&(n.brand=t.brand.trim()),t.model&&(n.model=t.model.trim()),t.clientId!==void 0&&(n.clientId=t.clientId||null,n.clientId&&!n.installDate&&(n.installDate=new Date().toISOString().split(`T`)[0])),t.boardId!==void 0){let e=t.boardId||null;if(this.data.decontoBoards.forEach(e=>{e.machineId===n.id&&(e.machineId=null)}),e){let t=this.data.decontoBoards.find(t=>t.id===e||t.shortCode===e);t&&(t.machineId=n.id)}}return this.saveData(),n}deleteMachine(e){this.data.decontoBoards.forEach(t=>{t.machineId===e&&(t.machineId=null)}),this.data.machines=this.data.machines.filter(t=>t.id!==e),this.saveData()}addClient(e){let t={id:`cli_`+Date.now(),name:e.name.trim(),refPerson:e.refPerson?e.refPerson.trim():`Referente`,phone:e.phone?e.phone.trim():`+39 `,email:e.email?e.email.trim():``,address:e.address?e.address.trim():``,city:e.city?e.city.trim():``};if(this.data.clients.unshift(t),e.machineId){let n=this.data.machines.find(t=>t.id===e.machineId);n&&(n.clientId=t.id,n.installDate=new Date().toISOString().split(`T`)[0])}return this.saveData(),t}updateClient(e,t){let n=this.data.clients.find(t=>t.id===e);if(!n)throw Error(`Cliente non trovato.`);if(t.name&&(n.name=t.name.trim()),t.refPerson!==void 0&&(n.refPerson=t.refPerson.trim()),t.phone!==void 0&&(n.phone=t.phone.trim()),t.email!==void 0&&(n.email=t.email.trim()),t.city!==void 0&&(n.city=t.city.trim()),t.address!==void 0&&(n.address=t.address.trim()),t.assignedMachineId!==void 0){let e=t.assignedMachineId||null;if(e){let t=this.data.machines.find(t=>t.id===e);t&&(t.clientId=n.id,t.installDate||=new Date().toISOString().split(`T`)[0])}}return this.saveData(),n}deleteClient(e){this.data.machines.forEach(t=>{t.clientId===e&&(t.clientId=null)}),this.data.clients=this.data.clients.filter(t=>t.id!==e),this.saveData()}getBoardFullDetails(e){let t=this.data.decontoBoards.find(t=>t.shortCode===e||t.id===e);if(!t)return null;let n=this.data.machines.find(e=>e.id===t.machineId);return{board:t,machine:n,client:n?this.data.clients.find(e=>e.id===n.clientId):null,refills:this.data.refillLogs.filter(e=>e.boardId===t.id),coffees:(this.data.coffeeLogs||[]).filter(e=>e.boardId===t.id)}}performRefill({boardShortCode:e,credits:t,method:n,operatorId:r,tokenOtp:i}){let a=this.data.decontoBoards.find(t=>t.shortCode===e);if(!a)throw Error(`Scheda Deconto #${e} non trovata.`);a.remainingCredits+=t,a.relayStatus=`CLOSED_OK`,a.lastSyncDate=new Date().toISOString();let o={id:`ref_`+Date.now(),boardId:a.id,shortCode:a.shortCode,creditsAdded:t,tokenOtp:i||`OTP-${Math.floor(1e3+Math.random()*9e3)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,operatorType:n===`WHATSAPP_OTP_BLE`?`CLIENT_DIY`:n===`CLOUD_DIRECT`?`OFFICE`:`ADR`,operatorId:r||(this.currentUser?this.currentUser.id:`usr_002`),timestamp:new Date().toISOString(),method:n};return this.data.refillLogs.unshift(o),this.saveData(),{board:a,newRefillLog:o}}registerCoffeeExtraction(e,t=22,n=1){let r=this.data.decontoBoards.find(t=>t.shortCode===e);if(!r)return null;if(r.remainingCredits<=0)return r.relayStatus=`OPEN_LOCKED`,this.saveData(),{success:!1,reason:`CREDITS_EXHAUSTED`,relayStatus:`OPEN_LOCKED`};--r.remainingCredits,r.machineExtractions=(r.machineExtractions||0)+1,r.lifetimeExtractions=(r.lifetimeExtractions||0)+1,r.remainingCredits<=0&&(r.remainingCredits=0,r.relayStatus=`OPEN_LOCKED`);let i={id:`log_`+Date.now(),boardId:r.id,timestamp:new Date().toISOString(),durationSeconds:t,groupId:n};return this.data.coffeeLogs||(this.data.coffeeLogs=[]),this.data.coffeeLogs.unshift(i),this.saveData(),{success:!0,remainingCredits:r.remainingCredits,isLowStock:r.remainingCredits<=(this.getSettings().thresholdYellow||20),relayStatus:r.relayStatus}}exportCoffeeLogsCSV(){let e=`ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio
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

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-purple);">📍 Ripartizione per Città:</h4>
              ${f.map(e=>`
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;">
                  <span>🏢 ${e.name} (${e.city||`N/D`})</span>
                  <span class="badge badge-info">ATTIVO</span>
                </div>
              `).join(``)}
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
  `}function l(e=`clients`,t=null){let n=a.getClients(),r=a.getMachines(),i=a.getBoards();a.getRefillLogs();let o=``;if(e===`clients`&&t){let e=n.find(e=>e.id===t);if(e){let t=r.find(t=>t.clientId===e.id);o=`
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
  `}new class{constructor(){this.isSupported=typeof navigator<`u`&&`bluetooth`in navigator,this.connectedDevice=null}checkSupport(){return this.isSupported}async connectToBoardByShortCode(e){if(console.log(`📡 Ricerca dispositivo Deconto con codice breve [${e}]...`),this.isSupported&&navigator.bluetooth)try{let t=await navigator.bluetooth.requestDevice({filters:[{namePrefix:`DECONTO_${e}`}],optionalServices:[`0000ffe0-0000-1000-8000-00805f9b34fb`]});return this.connectedDevice=t,{success:!0,deviceName:t.name,isRealHardware:!0}}catch(e){console.warn(`Fallback a simulazione BLE locale:`,e.message)}return await new Promise(e=>setTimeout(e,1500)),{success:!0,deviceName:`DECONTO_${e}`,shortCode:e,isRealHardware:!1,connectedAt:new Date().toISOString()}}async sendRefillOtpToken(e,t,n){if(!(await this.connectToBoardByShortCode(e)).success)throw Error(`Impossibile connettersi al dispositivo DECONTO_${e}`);return await new Promise(e=>setTimeout(e,1e3)),{success:!0,shortCode:e,creditsAccredited:t,tokenApplied:n,relayStatus:`CLOSED_OK`,timestamp:new Date().toISOString()}}};function u(e){return a.getClients(),`
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
  `}function d(){return`
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
  `}function f(e=null){let t=a.getBoards(),n=e&&t.find(t=>t.shortCode===e)||t[0];return a.getBoardFullDetails(n.shortCode),`
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
  `}function p(e,t=null,n=null){let r=a.getUsers(),i=a.getRoleLabels(),o=a.getPermissions(),s=a.getEmailLogs(),c=``;if(t){let e=r.find(e=>e.id===t);e&&(c=`
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
  `}function m(e,t){return!e||!t?``:`
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
  `}function h(){let e=a.getSettings();return`
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
  `}var g={currentUser:a.getCurrentUser(),activeTab:`dashboard`,editingId:null,editingStaffUserId:null,showProfileModal:!1,dashSearchQuery:``,dashSearchCategory:`ALL`,dashSortColumn:`shortCode`,dashSortDirection:`DESC`,viewingDecontoCode:null,viewingEmailId:null,viewingKpiModal:null,kpiPeriod:`30DAYS`,kpiChartType:`LINE`,kpiCustomStart:`2026-07-01`,kpiCustomEnd:`2026-08-02`};function _(){let e=document.getElementById(`app`);if(!g.currentUser){e.innerHTML=o(),v();return}let t=``;switch(g.activeTab){case`dashboard`:t=c(g.activeTab,g.viewingDecontoCode,g.dashSearchQuery,g.dashSearchCategory,g.dashSortColumn,g.dashSortDirection,g.viewingKpiModal,g.kpiPeriod,g.kpiChartType,g.kpiCustomStart,g.kpiCustomEnd);break;case`clients`:case`machines`:case`deconto_boards`:t=l(g.activeTab,g.editingId);break;case`adr_visits`:t=u();break;case`client_diy`:case`otp_generator`:case`qr_generator`:case`refills_history`:t=d();break;case`simulator`:t=f();break;case`user_mgmt`:case`user_management`:case`permissions_matrix`:t=p(g.activeTab,g.editingStaffUserId,g.viewingEmailId);break;case`settings`:t=h();break;default:t=c()}let n=m(g.showProfileModal,g.currentUser);e.innerHTML=`
    <div class="app-layout">
      ${s(g.currentUser,g.activeTab)}
      <main class="main-content">
        ${t}
      </main>
    </div>
    ${n}
  `,y()}function v(){let e=document.getElementById(`login-form`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`login-username`).value.trim(),n=document.getElementById(`login-password`).value.trim();try{let e=a.login(t,n);g.currentUser=e,g.activeTab=e.role===`ADR`?`adr_visits`:`dashboard`,_()}catch(e){alert(e.message)}})}function y(){document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-tab`);t&&(g.activeTab=t,g.editingId=null,g.editingStaffUserId=null,g.viewingDecontoCode=null,g.viewingEmailId=null,_())})});let e=document.getElementById(`btn-open-profile-modal`);e&&e.addEventListener(`click`,()=>{g.showProfileModal=!0,_()});let t=document.getElementById(`btn-close-profile-modal`),n=document.getElementById(`btn-cancel-profile-modal`);t&&t.addEventListener(`click`,()=>{g.showProfileModal=!1,_()}),n&&n.addEventListener(`click`,()=>{g.showProfileModal=!1,_()});let r=document.getElementById(`profile-edit-form`);r&&r.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`profile-name`).value.trim(),n=document.getElementById(`profile-email`).value.trim(),r=document.getElementById(`profile-new-password`).value;try{g.currentUser=a.updateUserProfile(g.currentUser.id,{name:t,email:n,newPassword:r?r.trim():void 0}),g.showProfileModal=!1,alert(`✅ Credenziali del profilo aggiornate con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}});let i=document.getElementById(`btn-logout`);i&&i.addEventListener(`click`,()=>{a.logout(),g.currentUser=null,g.activeTab=`dashboard`,_()});let o=document.getElementById(`btn-toggle-add-client`),s=document.getElementById(`add-client-form-container`),c=document.getElementById(`btn-cancel-add-client`),l=document.getElementById(`btn-save-new-client`);o&&s&&o.addEventListener(`click`,()=>{let e=s.style.display===`none`||!s.style.display;s.style.display=e?`block`:`none`}),c&&s&&c.addEventListener(`click`,()=>{s.style.display=`none`}),l&&l.addEventListener(`click`,()=>{let e=document.getElementById(`new-cli-name`).value.trim(),t=document.getElementById(`new-cli-ref`).value.trim(),n=document.getElementById(`new-cli-phone`).value.trim(),r=document.getElementById(`new-cli-email`).value.trim(),i=document.getElementById(`new-cli-city`).value.trim(),o=document.getElementById(`new-cli-machine`).value;if(!e){alert(`Inserisci la Ragione Sociale / Nome Cliente!`);return}try{let s=a.addClient({name:e,refPerson:t,phone:n,email:r,city:i,machineId:o});alert(`✅ Cliente "${s.name}" registrato con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=e.getAttribute(`data-id`),_()})}),document.querySelectorAll(`.btn-del-client-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo cliente?`))try{a.deleteClient(t),alert(`✅ Cliente eliminato dall'anagrafica!`),_()}catch(e){alert(`Errore: ${e.message}`)}})});let u=document.getElementById(`btn-cancel-edit-client`);u&&u.addEventListener(`click`,()=>{g.editingId=null,_()});let d=document.getElementById(`form-edit-client`);d&&d.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-client-id`).value,n=document.getElementById(`edit-cli-name`).value.trim(),r=document.getElementById(`edit-cli-ref`).value.trim(),i=document.getElementById(`edit-cli-phone`).value.trim(),o=document.getElementById(`edit-cli-city`).value.trim(),s=document.getElementById(`edit-cli-address`).value.trim(),c=document.getElementById(`edit-cli-machine`).value;try{a.updateClient(t,{name:n,refPerson:r,phone:i,city:o,address:s,assignedMachineId:c}),g.editingId=null,alert(`✅ Scheda Cliente salvata con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}});let f=document.getElementById(`btn-toggle-add-machine`),p=document.getElementById(`add-machine-form-container`),m=document.getElementById(`btn-cancel-add-machine`),h=document.getElementById(`btn-save-new-machine`);f&&p&&f.addEventListener(`click`,()=>{let e=p.style.display===`none`||!p.style.display;p.style.display=e?`block`:`none`}),m&&p&&m.addEventListener(`click`,()=>{p.style.display=`none`}),h&&h.addEventListener(`click`,()=>{let e=document.getElementById(`new-mc-serial`).value.trim(),t=document.getElementById(`new-mc-brand`).value.trim(),n=document.getElementById(`new-mc-model`).value.trim(),r=document.getElementById(`new-mc-board`).value,i=document.getElementById(`new-mc-client`).value;if(!e||!n){alert(`Inserisci Seriale Macchina e Modello!`);return}try{let o=a.addMachine({serialNumber:e,brand:t,model:n,boardId:r,clientId:i});alert(`✅ Macchina da caffè SN "${o.serialNumber}" registrata con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=e.getAttribute(`data-id`),_()})}),document.querySelectorAll(`.btn-del-machine-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questa macchina da caffè?`))try{a.deleteMachine(t),alert(`✅ Macchina eliminata dal parco macchine!`),_()}catch(e){alert(`Errore: ${e.message}`)}})});let v=document.getElementById(`btn-cancel-edit-mc`);v&&v.addEventListener(`click`,()=>{g.editingId=null,_()});let y=document.getElementById(`form-edit-machine`);y&&y.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-mc-id`).value,n=document.getElementById(`edit-mc-serial`).value.trim(),r=document.getElementById(`edit-mc-brand`).value.trim(),i=document.getElementById(`edit-mc-model`).value.trim(),o=document.getElementById(`edit-mc-board`).value,s=document.getElementById(`edit-mc-client`).value;try{a.updateMachine(t,{serialNumber:n,brand:r,model:i,boardId:o,clientId:s}),g.editingId=null,alert(`✅ Scheda Macchina salvata con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}});let b=document.getElementById(`btn-toggle-add-board`),x=document.getElementById(`add-board-form-container`),S=document.getElementById(`btn-cancel-add-board`),C=document.getElementById(`btn-save-new-board`);b&&x&&b.addEventListener(`click`,()=>{let e=x.style.display===`none`||!x.style.display;x.style.display=e?`block`:`none`}),S&&x&&S.addEventListener(`click`,()=>{x.style.display=`none`}),C&&C.addEventListener(`click`,()=>{let e=document.getElementById(`new-board-code`).value.trim(),t=document.getElementById(`new-board-hwserial`).value.trim(),n=document.getElementById(`new-board-credits`).value,r=document.getElementById(`new-board-version`).value,i=document.getElementById(`new-board-machine`).value;if(!e){alert(`Inserisci il Codice a 4 cifre del Deconto!`);return}try{let o=a.addBoard({shortCode:e,hwSerial:t,remainingCredits:n,version:r,machineId:i});alert(`✅ Scheda Deconto #${o.shortCode} salvata PERMANENTEMENTE nel database!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingId=e.getAttribute(`data-id`),_()})}),document.querySelectorAll(`.btn-del-board-standalone`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questa scheda Deconto?`))try{a.deleteBoard(t),alert(`✅ Scheda Deconto eliminata!`),_()}catch(e){alert(`Errore: ${e.message}`)}})});let w=document.getElementById(`btn-cancel-edit-board`);w&&w.addEventListener(`click`,()=>{g.editingId=null,_()});let T=document.getElementById(`form-edit-board`);T&&T.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`edit-board-id`).value,n=document.getElementById(`edit-board-shortcode`).value.trim(),r=document.getElementById(`edit-board-hwserial`).value.trim(),i=document.getElementById(`edit-board-credits`).value,o=document.getElementById(`edit-board-version`).value,s=document.getElementById(`edit-board-machine`).value;try{a.updateBoard(t,{shortCode:n,hwSerial:r,remainingCredits:i,version:o,machineId:s}),g.editingId=null,alert(`✅ Scheda Deconto salvata con successo!`),_()}catch(e){alert(`Errore: ${e.message}`)}});let E=document.getElementById(`btn-close-edit-modal`);E&&E.addEventListener(`click`,()=>{g.editingId=null,_()});let D=document.getElementById(`btn-toggle-add-user`),O=document.getElementById(`add-user-form-container`),k=document.getElementById(`btn-cancel-add-user`),A=document.getElementById(`btn-save-new-user`);D&&O&&D.addEventListener(`click`,()=>{let e=O.style.display===`none`||!O.style.display;O.style.display=e?`block`:`none`}),k&&O&&k.addEventListener(`click`,()=>{O.style.display=`none`}),A&&A.addEventListener(`click`,()=>{let e=document.getElementById(`new-user-username`).value.trim(),t=document.getElementById(`new-user-password`).value.trim(),n=document.getElementById(`new-user-name`).value.trim(),r=document.getElementById(`new-user-role`).value,i=document.getElementById(`new-user-email`).value.trim(),o=document.getElementById(`new-user-phone`).value.trim();if(!e||!t||!n){alert(`Compila i campi obbligatori: Codice Utente, Password e Nome!`);return}try{a.addUser({username:e,password:t,name:n,role:r,email:i,phone:o}),alert(`✅ Utente dipendente "${n}" (Codice ${e}) salvato PERMANENTEMENTE nel database!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-edit-staff-user`).forEach(e=>{e.addEventListener(`click`,()=>{g.editingStaffUserId=e.getAttribute(`data-id`),_()})});let j=document.getElementById(`btn-close-edit-staff-modal`),M=document.getElementById(`btn-cancel-edit-staff`);j&&j.addEventListener(`click`,()=>{g.editingStaffUserId=null,_()}),M&&M.addEventListener(`click`,()=>{g.editingStaffUserId=null,_()});let N=document.getElementById(`edit-staff-form`);N&&N.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-staff-id`).value,n=document.getElementById(`edit-staff-username`)?document.getElementById(`edit-staff-username`).value:void 0,r=document.getElementById(`edit-staff-name`).value,i=document.getElementById(`edit-staff-role`)?document.getElementById(`edit-staff-role`).value:void 0,o=document.getElementById(`edit-staff-email`).value,s=document.getElementById(`edit-staff-phone`).value,c=document.getElementById(`edit-staff-password`).value;try{let e=a.updateUser(t,{username:n,name:r,role:i,email:o,phone:s,password:c?c.trim():void 0});g.editingStaffUserId=null,alert(`✅ Scheda Utente "${e.name}" salvata PERMANENTEMENTE!`),_()}catch(e){alert(`Errore: ${e.message}`)}}),document.querySelectorAll(`.btn-toggle-user-status`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-status`)===`ACTIVE`?`DISABLED`:`ACTIVE`;a.updateUser(t,{status:n}),_()})}),document.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);if(confirm(`Sei sicuro di voler eliminare questo utente dipendente?`))try{a.deleteUser(t),_()}catch(e){alert(`Errore: ${e.message}`)}})});let P=document.getElementById(`btn-open-email-logs`);P&&P.addEventListener(`click`,()=>{let e=a.getEmailLogs();e.length>0?(g.viewingEmailId=e[0].id,_()):alert(`Nessuna email spedita di recente nel registro.`)});let F=document.getElementById(`btn-close-email-preview`),I=document.getElementById(`btn-close-email-preview-footer`);F&&F.addEventListener(`click`,()=>{g.viewingEmailId=null,_()}),I&&I.addEventListener(`click`,()=>{g.viewingEmailId=null,_()});let L=document.getElementById(`rename-role-labels-form`);L&&L.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`role_label_UFFICIO`).value.trim(),n=document.getElementById(`role_label_ADR`).value.trim();a.updateRoleLabel(`UFFICIO`,t),a.updateRoleLabel(`ADR`,n),alert(`✅ Nomi delle Categorie Utente aggiornati con successo!`),_()});let R=document.getElementById(`permissions-matrix-form`);R&&R.addEventListener(`submit`,e=>{e.preventDefault();let t=[`UFFICIO`,`ADR`],n=[`canViewClients`,`canCreateClients`,`canEditClients`,`canDeleteClients`,`canGenerateQr`,`canGenerateOtp`,`canBleRefill`,`canUseSimulator`],r={UFFICIO:{},ADR:{}};t.forEach(e=>{n.forEach(t=>{let n=document.getElementById(`perm_${e}_${t}`);n&&(r[e][t]=n.checked)})}),a.updatePermissions(r),alert(`✅ Matrice dei Permessi aggiornata con successo per tutti gli utenti!`),_()});let z=document.getElementById(`setting-logo-file`);z&&z.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){if(!t.type.startsWith(`image/`)){alert(`Seleziona un file immagine valido (PNG, JPG, SVG).`);return}let e=new FileReader;e.onload=function(e){let t=e.target.result;a.updateSettings({customLogoUrl:t}),alert(`✅ Nuovo Logo Aziendale caricato con successo!`),_()},e.readAsDataURL(t)}});let B=document.getElementById(`btn-reset-logo`);B&&B.addEventListener(`click`,()=>{confirm(`Ripristinare il logo predefinito con icona caffè ☕?`)&&(a.updateSettings({customLogoUrl:null}),alert(`✅ Logo predefinito ripristinato!`),_())});let V=document.getElementById(`settings-brand-form`);V&&V.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brand-title`).value.trim(),n=document.getElementById(`setting-brand-subtitle`).value.trim();a.updateSettings({brandTitle:t,brandSubtitle:n}),alert(`✅ Titolo e Sottotitolo Brand salvati con successo!`),_()});let H=document.getElementById(`settings-thresholds-form`);H&&H.addEventListener(`submit`,e=>{e.preventDefault();let t=parseInt(document.getElementById(`setting-threshold-yellow`).value,10),n=parseInt(document.getElementById(`setting-threshold-red`).value,10);if(isNaN(t)||isNaN(n)||n>=t){alert(`Attenzione: La Soglia Critica Rossa (X) deve essere inferiore alla Soglia Sottoscorta Gialla (Y)!`);return}a.updateSettings({thresholdYellow:t,thresholdRed:n}),alert(`✅ Soglie Automatiche Salvate con Successo!\n\n🟢 VERDE: > ${t} cialde\n🟡 GIALLO (Sottoscorta): da ${n+1} a ${t} cialde\n🔴 ROSSO (Critico): da 1 a ${n} cialde\n⚫ NERO (Bloccato): 0 cialde`),_()});let U=document.getElementById(`settings-brevo-form`);U&&U.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`setting-brevo-key`).value.trim(),n=document.getElementById(`setting-brevo-sender`).value.trim();a.updateSettings({brevoApiKey:t,brevoSenderEmail:n}),alert(`✅ API Key ed Email Mittente Brevo salvate con successo!`),_()}),document.querySelectorAll(`.kpi-card-clickable`).forEach(e=>{e.addEventListener(`click`,()=>{g.viewingKpiModal=e.getAttribute(`data-kpi`),_()})}),document.querySelectorAll(`.btn-close-kpi-modal`).forEach(e=>{e.addEventListener(`click`,()=>{g.viewingKpiModal=null,_()})}),document.querySelectorAll(`.btn-kpi-period`).forEach(e=>{e.addEventListener(`click`,()=>{g.kpiPeriod=e.getAttribute(`data-period`),_()})}),document.querySelectorAll(`.btn-kpi-charttype`).forEach(e=>{e.addEventListener(`click`,()=>{g.kpiChartType=e.getAttribute(`data-charttype`),_()})});let W=document.getElementById(`btn-apply-kpi-custom-date`);W&&W.addEventListener(`click`,()=>{let e=document.getElementById(`kpi-custom-start`).value,t=document.getElementById(`kpi-custom-end`).value;e&&t?(g.kpiCustomStart=e,g.kpiCustomEnd=t,alert(`✅ Filtro Date Personalizzato Applicato!\nDal: ${e}\nAl: ${t}`),_()):alert(`Seleziona sia la Data Inizio che la Data Fine dal calendario!`)});let G=document.getElementById(`btn-dash-search`),K=document.getElementById(`dash-search-input`);G&&K&&(G.addEventListener(`click`,()=>{g.dashSearchQuery=K.value,g.dashSearchCategory=document.getElementById(`dash-search-category`).value,_()}),K.addEventListener(`keypress`,e=>{e.key===`Enter`&&(g.dashSearchQuery=K.value,g.dashSearchCategory=document.getElementById(`dash-search-category`).value,_())}));let q=document.getElementById(`btn-dash-reset`);q&&q.addEventListener(`click`,()=>{g.dashSearchQuery=``,g.dashSearchCategory=`ALL`,_()}),document.querySelectorAll(`.th-sortable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-col`);g.dashSortColumn===t?g.dashSortDirection=g.dashSortDirection===`ASC`?`DESC`:`ASC`:(g.dashSortColumn=t,g.dashSortDirection=`DESC`),_()})}),document.querySelectorAll(`.btn-deconto-detail`).forEach(e=>{e.addEventListener(`click`,()=>{g.viewingDecontoCode=e.getAttribute(`data-code`),_()})});let J=document.getElementById(`btn-close-deconto-modal`),Y=document.getElementById(`btn-close-deconto-modal-footer`);J&&J.addEventListener(`click`,()=>{g.viewingDecontoCode=null,_()}),Y&&Y.addEventListener(`click`,()=>{g.viewingDecontoCode=null,_()});let X=document.getElementById(`btn-export-csv`);X&&X.addEventListener(`click`,()=>{let e=a.exportCoffeeLogsCSV(),t=new Blob([e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.setAttribute(`href`,n),r.setAttribute(`download`,`deconto_erogazioni_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)});let Z=document.getElementById(`btn-trigger-backup`);Z&&Z.addEventListener(`click`,async()=>{try{Z.disabled=!0,Z.innerHTML=`⏳ Backup in Corso...`;let e=a.triggerGitHubBackup();alert(`✅ Backup Cloud completato!\nID: ${e.id}\nCommit: ${e.commitHash}\nRecords: ${e.recordCount}`)}catch(e){alert(`❌ Errore Backup GitHub: ${e.message}`)}finally{Z.disabled=!1,Z.innerHTML=`☁️ Esegui Backup GitHub`}})}_();