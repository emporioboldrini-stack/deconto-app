/**
 * Navigation & Role Selector Component
 */
export function renderSidebar(currentRole, activeTab, onTabSelect, onRoleSelect) {
  const roles = [
    { id: 'ADMIN', label: '👨‍💼 Admin', desc: 'BI, Report & Manutenzione' },
    { id: 'UFFICIO', label: '👩‍💻 Ufficio', desc: 'Anagrafiche, Etichette QR, OTP' },
    { id: 'ADR', label: '🚚 ADR (Agente)', desc: 'Giro Consegne & Sync BLE' },
    { id: 'CLIENT_DIY', label: '📱 Cliente Fai-da-Te', desc: 'Ricarica da Link WhatsApp' }
  ];

  let navItems = [];
  if (currentRole === 'ADMIN') {
    navItems = [
      { id: 'dashboard', label: '📊 Dashboard BI', icon: '📈' },
      { id: 'clients', label: '🏢 Clienti & Parco', icon: '🏢' },
      { id: 'maintenance', label: '🛠️ Manutenzione Predittiva', icon: '⚠️' },
      { id: 'backups', label: '💾 Backup GitHub', icon: '🐙' },
      { id: 'simulator', label: '☕ Simulatore Macchina HW', icon: '⚡' }
    ];
  } else if (currentRole === 'UFFICIO') {
    navItems = [
      { id: 'clients', label: '🏢 Gestione Clienti', icon: '🏢' },
      { id: 'qr_generator', label: '🏷️ Generatore Etichette QR', icon: '🖨️' },
      { id: 'otp_generator', label: '🔑 Genera Ricariche OTP', icon: '💬' },
      { id: 'refills_history', label: '📋 Storico Ricariche', icon: '🧾' },
      { id: 'simulator', label: '☕ Simulatore Macchina HW', icon: '⚡' }
    ];
  } else if (currentRole === 'ADR') {
    navItems = [
      { id: 'adr_visits', label: '🗺️ Giro Consegne Oggi', icon: '🚚' },
      { id: 'adr_scan', label: '📡 Ricarica BLE (Codice/QR)', icon: '📶' },
      { id: 'simulator', label: '☕ Simulatore Macchina HW', icon: '⚡' }
    ];
  } else if (currentRole === 'CLIENT_DIY') {
    navItems = [
      { id: 'client_refill', label: '📱 Ricarica 1-Click WhatsApp', icon: '✨' },
      { id: 'simulator', label: '☕ Simulatore Macchina HW', icon: '⚡' }
    ];
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

      <div style="margin-bottom: 24px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase;">
          Seleziona Ruolo Utente:
        </label>
        <select id="role-selector" style="width: 100%; padding: 8px; background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; font-weight: 600;">
          ${roles.map(r => `<option value="${r.id}" ${r.id === currentRole ? 'selected' : ''}>${r.label}</option>`).join('')}
        </select>
      </div>

      <div class="nav-group">
        <div style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase; margin-bottom: 8px; padding-left: 8px;">
          Menu Principale
        </div>
        ${navItems.map(item => `
          <div class="nav-item ${item.id === activeTab ? 'active' : ''}" data-tab="${item.id}">
            <span>${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 0.75rem; color: var(--text-dim); text-align: center;">
        Dispositivo target: <strong>ESP32-C6</strong><br>Firmware v2.1.0 (Wi-Fi 6 + BLE)
      </div>
    </aside>
  `;
}
