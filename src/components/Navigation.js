import { db } from '../db/database.js';

export function renderSidebar(currentUser, activeTab) {
  const user = currentUser || { name: 'Utente Ospite', role: 'ADMIN', username: '001', avatar: '👨‍💼' };
  const permissions = db.getPermissions();

  let navItems = [];

  if (user.role === 'ADMIN') {
    // ADMIN vede TUTTO ed ha controllo completo
    navItems = [
      { id: 'dashboard', label: '📊 Dashboard BI', icon: '📈' },
      { id: 'user_management', label: '👥 Gestione Personale', icon: '👤' },
      { id: 'permissions_matrix', label: '⚙️ Matrice Permessi', icon: '🔐' },
      { id: 'clients', label: '🏢 Clienti & Parco', icon: '🏢' },
      { id: 'qr_generator', label: '🏷️ Generatore Etichette QR', icon: '🖨️' },
      { id: 'otp_generator', label: '🔑 Genera Ricariche OTP', icon: '💬' },
      { id: 'refills_history', label: '📋 Storico Ricariche', icon: '🧾' },
      { id: 'adr_visits', label: '🗺️ Giro Consegne ADR', icon: '🚚' },
      { id: 'maintenance', label: '🛠️ Manutenzione Predittiva', icon: '⚠️' },
      { id: 'backups', label: '💾 Backup GitHub', icon: '🐙' },
      { id: 'simulator', label: '☕ Simulatore Macchina HW', icon: '⚡' }
    ];
  } else {
    // Ruoli UFFICIO e ADR: Voci filtrate in base alla Matrice dei Permessi impostata dall'Admin
    const rolePerms = permissions[user.role] || {};

    if (rolePerms.canViewClients) {
      navItems.push({ id: 'clients', label: '🏢 Anagrafica Clienti', icon: '🏢' });
    }
    if (rolePerms.canGenerateQr) {
      navItems.push({ id: 'qr_generator', label: '🏷️ Generatore Etichette QR', icon: '🖨️' });
    }
    if (rolePerms.canGenerateOtp) {
      navItems.push({ id: 'otp_generator', label: '🔑 Genera Ricarica OTP', icon: '💬' });
    }
    if (rolePerms.canBleRefill || user.role === 'ADR') {
      navItems.push({ id: 'adr_visits', label: '🗺️ Giro Consegne & BLE', icon: '🚚' });
    }
    if (rolePerms.canViewRefillHistory) {
      navItems.push({ id: 'refills_history', label: '📋 Storico Ricariche', icon: '🧾' });
    }
    if (rolePerms.canUseSimulator) {
      navItems.push({ id: 'simulator', label: '☕ Simulatore Macchina HW', icon: '⚡' });
    }
  }

  return `
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
          <div style="font-size: 1.4rem;">${user.avatar || '👤'}</div>
          <div style="overflow: hidden;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${user.name}
            </div>
            <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600;">
              Codice: ${user.username} (${user.role})
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
          Menu Abilitato
        </div>
        ${navItems.map(item => `
          <div class="nav-item ${item.id === activeTab ? 'active' : ''}" data-tab="${item.id}">
            <span>${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 0.75rem; color: var(--text-dim); text-align: center;">
        Chip HW: <strong>ESP32-C6</strong><br>Firmware v2.1.0 (Wi-Fi 6 + BLE)
      </div>
    </aside>
  `;
}
