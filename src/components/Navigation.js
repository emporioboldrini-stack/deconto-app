import { db } from '../db/database.js';

export function renderSidebar(currentUser, activeTab) {
  const settings = db.getSettings();
  const roleLabels = db.getRoleLabels();

  const isUfficio = currentUser.role === 'UFFICIO' || currentUser.role === 'ADMIN';
  const isAdr = currentUser.role === 'ADR' || currentUser.role === 'ADMIN';
  const isAdmin = currentUser.role === 'ADMIN';

  const lastModifiedDate = '02/08/2026';

  return `
    <aside class="sidebar">
      
      <!-- 1. IN ALTO: Logo e Scritta Aziendale Brand -->
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 12px; padding: 20px 16px; border-bottom: 1px solid var(--border-subtle);">
        <div id="brand-logo-container" style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-glow);">
          ${settings.customLogoUrl 
            ? `<img src="${settings.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo Brand">` 
            : `<span style="font-size: 1.6rem;">☕</span>`}
        </div>
        <div>
          <div style="font-weight: 800; font-size: 1.15rem; color: #fff; letter-spacing: 0.5px;">
            ${settings.brandTitle || 'DECONTO'}
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">${settings.brandSubtitle || 'IoT Vending System'}</div>
        </div>
      </div>

      <!-- 2. SUBITO SOTTO: Scheda Utente Loggato + Modifica + Tasto Esci (Login) -->
      <div style="padding: 16px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border-subtle); margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 1.8rem; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 10px;">${currentUser.avatar || '👤'}</div>
          <div style="line-height: 1.2;">
            <div style="font-weight: 800; font-size: 0.9rem; color: #fff;">${currentUser.name}</div>
            <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700; margin-top: 2px;">
              ${currentUser.role === 'ADMIN' ? 'AMMINISTRATORE' : (roleLabels[currentUser.role] || currentUser.role)}
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

        ${isAdmin ? `
          <div class="nav-section-title">PANNELLO DIREZIONE</div>
          <a class="nav-item ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
            <span class="nav-icon">📊</span>
            <span>Dashboard IoT & KPI</span>
          </a>
          <a class="nav-item ${(activeTab === 'user_mgmt' || activeTab === 'user_management') ? 'active' : ''}" data-tab="user_mgmt">
            <span class="nav-icon">👥</span>
            <span>Gestione Personale</span>
          </a>
          <a class="nav-item ${activeTab === 'permissions_matrix' ? 'active' : ''}" data-tab="permissions_matrix">
            <span class="nav-icon">⚙️</span>
            <span>Matrice Permessi</span>
          </a>
        ` : ''}

        <div class="nav-section-title">ANAGRAFICHE DI SISTEMA</div>

        ${isUfficio ? `
          <a class="nav-item ${activeTab === 'deconto_boards' ? 'active' : ''}" data-tab="deconto_boards">
            <span class="nav-icon">📟</span>
            <span>Schede Deconto</span>
          </a>
          <a class="nav-item ${activeTab === 'machines' ? 'active' : ''}" data-tab="machines">
            <span class="nav-icon">☕</span>
            <span>Parco Macchine</span>
          </a>
          <a class="nav-item ${activeTab === 'clients' ? 'active' : ''}" data-tab="clients">
            <span class="nav-icon">🏢</span>
            <span>Anagrafica Clienti</span>
          </a>
        ` : ''}

        ${isUfficio ? `
          <div class="nav-section-title">STRUMENTI OPERATIVI</div>
          <a class="nav-item ${activeTab === 'otp_generator' ? 'active' : ''}" data-tab="otp_generator">
            <span class="nav-icon">🔑</span>
            <span>Generatore OTP WhatsApp</span>
          </a>
          <a class="nav-item ${activeTab === 'qr_generator' ? 'active' : ''}" data-tab="qr_generator">
            <span class="nav-icon">🖨️</span>
            <span>Stampa Etichette QR</span>
          </a>
          <a class="nav-item ${activeTab === 'refills_history' ? 'active' : ''}" data-tab="refills_history">
            <span class="nav-icon">📜</span>
            <span>Storico Ricariche</span>
          </a>
        ` : ''}

        ${isAdr ? `
          <div class="nav-section-title">LOGISTICA & CONSEGNE</div>
          <a class="nav-item ${activeTab === 'adr_visits' ? 'active' : ''}" data-tab="adr_visits">
            <span class="nav-icon">🚚</span>
            <span>Visite ADR & BLE</span>
          </a>
        ` : ''}

        <div class="nav-section-title">COLLAUDO & IMPOSTAZIONI</div>
        <a class="nav-item ${activeTab === 'simulator' ? 'active' : ''}" data-tab="simulator">
          <span class="nav-icon">⚡</span>
          <span>Simulatore Hardware</span>
        </a>

        ${isAdmin ? `
          <a class="nav-item ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
            <span class="nav-icon">🛠️</span>
            <span>Impostazioni Brand</span>
          </a>
        ` : ''}

        <!-- 4. IN BASSO SOTTO IMPOSTAZIONI: Versione & Data Ultima Modifica -->
        <div style="margin-top: 24px; padding: 14px 12px; border-top: 1px solid var(--border-subtle); text-align: center; background: rgba(0,0,0,0.25); border-radius: 8px;">
          <div style="font-weight: 800; font-size: 0.8rem; color: var(--accent-cyan);">
            Versione: V1.6PC
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
            Data ultima modifica: ${lastModifiedDate}
          </div>
        </div>

      </nav>
    </aside>
  `;
}
