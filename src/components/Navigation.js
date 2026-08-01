import { db } from '../db/database.js';

export function renderSidebar(currentUser, activeTab) {
  const settings = db.getSettings();
  const roleLabels = db.getRoleLabels();

  const isUfficio = currentUser.role === 'UFFICIO' || currentUser.role === 'ADMIN';
  const isAdr = currentUser.role === 'ADR' || currentUser.role === 'ADMIN';
  const isAdmin = currentUser.role === 'ADMIN';

  return `
    <aside class="sidebar">
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 12px; padding: 20px 16px; border-bottom: 1px solid var(--border-subtle);">
        <div id="brand-logo-container" style="width: 42px; height: 42px; border-radius: 10px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-glow);">
          ${settings.customLogoUrl 
            ? `<img src="${settings.customLogoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Logo Brand">` 
            : `<span style="font-size: 1.6rem;">☕</span>`}
        </div>
        <div>
          <div style="font-weight: 800; font-size: 1.1rem; color: #fff; letter-spacing: 0.5px;">${settings.brandTitle || 'DECONTO'}</div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">${settings.brandSubtitle || 'IoT Vending System'}</div>
        </div>
      </div>

      <nav class="sidebar-nav">

        ${isAdmin ? `
          <div class="nav-section-title">PANNELLO DIREZIONE</div>
          <a class="nav-item ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
            <span class="nav-icon">📊</span>
            <span>Dashboard IoT & KPI</span>
          </a>
        ` : ''}

        <div class="nav-section-title">ANAGRAFICHE DI SISTEMA</div>

        ${isUfficio ? `
          <a class="nav-item ${activeTab === 'clients' ? 'active' : ''}" data-tab="clients">
            <span class="nav-icon">🏢</span>
            <span>Anagrafica Clienti</span>
          </a>
          <a class="nav-item ${activeTab === 'machines' ? 'active' : ''}" data-tab="machines">
            <span class="nav-icon">☕</span>
            <span>Parco Macchine</span>
          </a>
          <a class="nav-item ${activeTab === 'deconto_boards' ? 'active' : ''}" data-tab="deconto_boards">
            <span class="nav-icon">📟</span>
            <span>Schede Deconto</span>
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
          <a class="nav-item ${activeTab === 'user_management' ? 'active' : ''}" data-tab="user_management">
            <span class="nav-icon">👥</span>
            <span>Gestione Personale</span>
          </a>
          <a class="nav-item ${activeTab === 'permissions_matrix' ? 'active' : ''}" data-tab="permissions_matrix">
            <span class="nav-icon">⚙️</span>
            <span>Matrice Permessi</span>
          </a>
          <a class="nav-item ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
            <span class="nav-icon">🛠️</span>
            <span>Impostazioni Brand</span>
          </a>
        ` : ''}

      </nav>

      <div class="sidebar-footer" style="padding: 16px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" id="btn-open-profile-modal">
          <div style="font-size: 1.5rem;">${currentUser.avatar || '👤'}</div>
          <div style="line-height: 1.2;">
            <div style="font-weight: 700; font-size: 0.85rem; color: #fff;">${currentUser.name}</div>
            <div style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 600;">
              ${currentUser.role === 'ADMIN' ? 'AMMINISTRATORE' : (roleLabels[currentUser.role] || currentUser.role)}
            </div>
          </div>
        </div>

        <button id="btn-logout" title="Disconnetti" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--accent-rose);">
          🚪
        </button>
      </div>
    </aside>
  `;
}
