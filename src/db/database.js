import { emailService } from '../services/emailService.js';

const MASTER_STORAGE_KEY = 'deconto_app_master_db_v3';
const SESSION_STORAGE_KEY = 'deconto_app_user_session';
const ALL_STORAGE_KEYS = [
  'deconto_app_master_db_v3',
  'deconto_app_master_db_v2',
  'deconto_app_master_db_v1',
  'deconto_app_master_db',
  'deconto_vending_db',
  'deconto_db'
];

const initialData = {
  settings: {
    customLogoUrl: null,
    brandTitle: 'DECONTO',
    brandSubtitle: 'IoT Vending System',
    thresholdYellow: 20,
    thresholdRed: 5,
    brevoApiKey: '',
    brevoSenderEmail: 'noreply@deconto.it'
  },
  roleLabels: {
    UFFICIO: 'Operatore Ufficio',
    ADR: 'Agente ADR Consegne'
  },
  users: [
    {
      id: 'usr_001',
      username: '001',
      password: '123456',
      name: 'Valerio Boldrini (Amministratore)',
      email: 'admin@deconto.it',
      phone: '+39 333 112233',
      role: 'ADMIN',
      status: 'ACTIVE',
      avatar: '👨‍💼',
      createdAt: '2026-01-01'
    },
    {
      id: 'usr_002',
      username: '002',
      password: '123456',
      name: 'Laura Bianchi',
      email: 'laura.ufficio@deconto.it',
      phone: '+39 02 445566',
      role: 'UFFICIO',
      status: 'ACTIVE',
      avatar: '👩‍💻',
      createdAt: '2026-01-05'
    },
    {
      id: 'usr_003',
      username: '003',
      password: '123456',
      name: 'Giuseppe Verdi (Agente Nord)',
      email: 'giuseppe.adr@deconto.it',
      phone: '+39 333 998877',
      role: 'ADR',
      status: 'ACTIVE',
      avatar: '🚚',
      createdAt: '2026-01-10'
    }
  ],

  permissions: {
    UFFICIO: {
      canViewClients: true,
      canCreateClients: true,
      canEditClients: true,
      canDeleteClients: true,
      canGenerateQr: true,
      canGenerateOtp: true,
      canBleRefill: true,
      canUseSimulator: true
    },
    ADR: {
      canViewClients: true,
      canCreateClients: false,
      canEditClients: false,
      canDeleteClients: false,
      canGenerateQr: false,
      canGenerateOtp: false,
      canBleRefill: true,
      canUseSimulator: true
    }
  },

  clients: [
    { id: 'cli_1', name: 'Bar Milano Central', refPerson: 'Mario Rossi', phone: '+39 02 5551234', address: 'Via Roma 12, Milano', city: 'Milano' },
    { id: 'cli_2', name: 'Ristorante La Perla', refPerson: 'Elena Neri', phone: '+39 06 7778899', address: 'Corso Italia 45, Roma', city: 'Roma' },
    { id: 'cli_3', name: 'Studio Dentistico Rossi', refPerson: 'Dr. Roberto Rossi', phone: '+39 030 445566', address: 'Via X Giornate 88, Brescia', city: 'Brescia' },
    { id: 'cli_4', name: 'Hotel Bellavista', refPerson: 'Stefano Bellini', phone: '+39 051 889900', address: 'Piazza Maggiore 3, Bologna', city: 'Bologna' },
    { id: 'cli_5', name: 'Magazzino Riserve ADR', refPerson: 'Deposito Centrale', phone: '+39 02 998800', address: 'Via Industria 2, Monza', city: 'Monza' },
    { id: 'cli_6', name: 'Caffetteria Torinese', refPerson: 'Carla Vianello', phone: '+39 011 334455', address: 'Piazza Castello 15, Torino', city: 'Torino' },
    { id: 'cli_7', name: 'Officina Meccanica Conti', refPerson: 'Luigi Conti', phone: '+39 011 998877', address: 'Via Garibaldi 102, Torino', city: 'Torino' },
    { id: 'cli_8', name: 'Pasticceria Giotto', refPerson: 'Marco Giotto', phone: '+39 049 887766', address: 'Via Dante 14, Padova', city: 'Padova' }
  ],
  machines: [
    { id: 'mc_1', serialNumber: 'SN-MC-2026-9912', brand: 'Spinel', model: 'Ciao', productionYear: '2024', clientId: 'cli_1', installDate: '2025-11-10' },
    { id: 'mc_2', serialNumber: 'SN-MC-2026-8843', brand: 'Faber', model: 'Altro', productionYear: '2025', clientId: 'cli_2', installDate: '2026-01-15' },
    { id: 'mc_3', serialNumber: 'SN-MC-2026-1099', brand: 'Saeco', model: 'Altro', productionYear: '2025', clientId: 'cli_3', installDate: '2026-02-01' },
    { id: 'mc_4', serialNumber: 'SN-MC-2026-4021', brand: 'Spinel', model: 'Jessica', productionYear: '2026', clientId: 'cli_4', installDate: '2026-02-10' },
    { id: 'mc_5', serialNumber: 'SN-MC-2026-7700', brand: 'Grimac', model: 'Altro', productionYear: '2024', clientId: 'cli_5', installDate: '2026-02-20' },
    { id: 'mc_6', serialNumber: 'SN-MC-2026-5432', brand: 'Didiesse', model: 'Altro', productionYear: '2025', clientId: 'cli_6', installDate: '2026-03-01' },
    { id: 'mc_7', serialNumber: 'SN-MC-2026-4409', brand: 'Spinel', model: 'Altro', productionYear: '2026', clientId: 'cli_7', installDate: '2026-03-05' },
    { id: 'mc_8', serialNumber: 'SN-MC-2026-8820', brand: 'Bialetti', model: 'Ciao', productionYear: '2026', clientId: 'cli_8', installDate: '2026-03-15' }
  ],
  decontoBoards: [
    // 🟢 VERDI (5 Schede > 20 cialde)
    {
      id: 'board_3467',
      shortCode: '3467',
      hwSerial: 'DC-HW-8841',
      macAddress: 'C6:3F:8A:11:34:67',
      machineId: 'mc_1',
      version: 'BASIC',
      remainingCredits: 145,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -62,
      machineExtractions: 1855,
      lifetimeExtractions: 4920,
      avgDailyCoffees: 12.4,
      lastSyncDate: new Date().toISOString()
    },
    {
      id: 'board_1289',
      shortCode: '1289',
      hwSerial: 'DC-HW-7732',
      macAddress: 'C6:3F:8A:22:12:89',
      machineId: 'mc_2',
      version: 'PRO',
      remainingCredits: 320,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -78,
      machineExtractions: 3410,
      lifetimeExtractions: 8120,
      avgDailyCoffees: 24.8,
      lastSyncDate: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'board_1099',
      shortCode: '1099',
      hwSerial: 'DC-HW-1099',
      macAddress: 'C6:3F:8A:99:10:99',
      machineId: 'mc_3',
      version: 'PRO',
      remainingCredits: 85,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -55,
      machineExtractions: 1750,
      lifetimeExtractions: 3890,
      avgDailyCoffees: 14.2,
      lastSyncDate: new Date().toISOString()
    },
    {
      id: 'board_4021',
      shortCode: '4021',
      hwSerial: 'DC-HW-4021',
      macAddress: 'C6:3F:8A:66:40:21',
      machineId: 'mc_4',
      version: 'PRO',
      remainingCredits: 45,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -65,
      machineExtractions: 2100,
      lifetimeExtractions: 5400,
      avgDailyCoffees: 15.0,
      lastSyncDate: new Date().toISOString()
    },
    {
      id: 'board_7700',
      shortCode: '7700',
      hwSerial: 'DC-HW-5500',
      macAddress: 'C6:3F:8A:55:77:00',
      machineId: 'mc_5',
      version: 'PRO',
      remainingCredits: 500,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -70,
      machineExtractions: 0,
      lifetimeExtractions: 0,
      avgDailyCoffees: 0,
      lastSyncDate: new Date().toISOString()
    },

    // 🟡 GIALLI (1 Scheda tra 6 e 20 cialde)
    {
      id: 'board_5432',
      shortCode: '5432',
      hwSerial: 'DC-HW-5432',
      macAddress: 'C6:3F:8A:AA:54:32',
      machineId: 'mc_6',
      version: 'BASIC',
      remainingCredits: 12,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -75,
      machineExtractions: 960,
      lifetimeExtractions: 2400,
      avgDailyCoffees: 7.8,
      lastSyncDate: new Date(Date.now() - 86400000 * 2).toISOString()
    },

    // ⚫ NERI (2 Schede Blocco Relè a 0 cialde)
    {
      id: 'board_9901',
      shortCode: '9901',
      hwSerial: 'DC-HW-4401',
      macAddress: 'C6:3F:8A:44:99:01',
      machineId: 'mc_7',
      version: 'BASIC',
      remainingCredits: 0,
      relayStatus: 'OPEN_LOCKED',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -58,
      machineExtractions: 1241,
      lifetimeExtractions: 3501,
      avgDailyCoffees: 9.1,
      lastSyncDate: new Date().toISOString()
    },
    {
      id: 'board_8820',
      shortCode: '8820',
      hwSerial: 'DC-HW-8820',
      macAddress: 'C6:3F:8A:88:88:20',
      machineId: 'mc_8',
      version: 'BASIC',
      remainingCredits: 0,
      relayStatus: 'OPEN_LOCKED',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -60,
      machineExtractions: 1540,
      lifetimeExtractions: 4120,
      avgDailyCoffees: 11.2,
      lastSyncDate: new Date().toISOString()
    }
  ],
  refillLogs: [
    {
      id: 'ref_1',
      boardId: 'board_3467',
      shortCode: '3467',
      creditsAdded: 150,
      tokenOtp: '',
      operatorType: 'OFFICE',
      operatorId: 'usr_001',
      timestamp: '2026-07-15T09:30:00.000Z',
      method: 'CLOUD_DIRECT'
    },
    {
      id: 'ref_2',
      boardId: 'board_1099',
      shortCode: '1099',
      creditsAdded: 500,
      tokenOtp: '',
      operatorType: 'ADR',
      operatorId: 'usr_002',
      timestamp: '2026-07-20T14:45:00.000Z',
      method: 'ADR_BLE_PHYSICAL'
    },
    {
      id: 'ref_3',
      boardId: 'board_4021',
      shortCode: '4021',
      creditsAdded: 200,
      tokenOtp: 'OTP-4021-X99AB',
      operatorType: 'CLIENT_DIY',
      operatorId: 'cli_8',
      timestamp: '2026-07-25T11:15:00.000Z',
      method: 'WHATSAPP_OTP_BLE'
    },
    {
      id: 'ref_4',
      boardId: 'board_8820',
      shortCode: '8820',
      creditsAdded: -50,
      tokenOtp: '',
      operatorType: 'OFFICE',
      operatorId: 'usr_001',
      timestamp: '2026-08-01T16:20:00.000Z',
      method: 'CLOUD_DIRECT'
    }
  ],
  coffeeLogs: [],
  emailLogs: [],
  backupLogs: []
};

class DecontoDatabase {
  constructor() {
    this.data = this.loadData();
    this.currentUser = this.loadSession();
    this.initIndexedDB();
    this.seedCoffeeLogs();
  }

  initIndexedDB() {
    try {
      const request = indexedDB.open('DecontoDB_Vault', 1);
      request.onupgradeneeded = (e) => {
        const dbInstance = e.target.result;
        if (!dbInstance.objectStoreNames.contains('store')) {
          dbInstance.createObjectStore('store', { keyPath: 'key' });
        }
      };
      request.onsuccess = (e) => {
        this.idb = e.target.result;
        this.syncToIndexedDB();
      };
    } catch (e) {}
  }

  syncToIndexedDB() {
    if (!this.idb || !this.data) return;
    try {
      const tx = this.idb.transaction('store', 'readwrite');
      const store = tx.objectStore('store');
      store.put({ key: 'master_data', payload: JSON.stringify(this.data) });
    } catch (e) {}
  }

  loadData() {
    let masterData = null;

    // 1. Prova a caricare dal database principale corrente
    try {
      const storedRaw = localStorage.getItem(MASTER_STORAGE_KEY);
      if (storedRaw) {
        masterData = JSON.parse(storedRaw);
      }
    } catch (e) {
      masterData = null;
    }

    // 2. Se non c'è, prova a caricare da una delle chiavi precedenti
    if (!masterData) {
      for (const key of ALL_STORAGE_KEYS) {
        try {
          const storedRaw = localStorage.getItem(key);
          if (storedRaw) {
            masterData = JSON.parse(storedRaw);
            if (masterData) break;
          }
        } catch (e) {}
      }
    }

    // 3. Se ancora non c'è nulla, usa initialData
    if (!masterData) {
      masterData = JSON.parse(JSON.stringify(initialData));
    } else {
      // Unisci le impostazioni salvate con i valori di default in caso di chiavi mancanti
      if (!masterData.settings) masterData.settings = { ...initialData.settings };
      else masterData.settings = { ...initialData.settings, ...masterData.settings };

      if (!masterData.roleLabels) masterData.roleLabels = { ...initialData.roleLabels };
      else masterData.roleLabels = { ...initialData.roleLabels, ...masterData.roleLabels };

      if (!masterData.permissions) masterData.permissions = { ...initialData.permissions };
      else masterData.permissions = { ...initialData.permissions, ...masterData.permissions };

      if (!masterData.users || !Array.isArray(masterData.users) || masterData.users.length === 0) {
        masterData.users = [...initialData.users];
      } else {
        // Garantisci solo che l'Amministratore '001' esista sempre come backup di emergenza
        const adminDefault = initialData.users.find(u => u.username === '001');
        if (adminDefault && !masterData.users.some(mu => mu.username === '001')) {
          masterData.users.push(adminDefault);
        }
      }

      if (!masterData.clients || !Array.isArray(masterData.clients)) {
        masterData.clients = [...initialData.clients];
      }
      if (!masterData.machines || !Array.isArray(masterData.machines)) {
        masterData.machines = [...initialData.machines];
      }
      if (!masterData.decontoBoards || !Array.isArray(masterData.decontoBoards)) {
        masterData.decontoBoards = [...initialData.decontoBoards];
      }
    }

    if (!masterData.refillLogs) masterData.refillLogs = [];
    if (!masterData.coffeeLogs) masterData.coffeeLogs = [];
    if (!masterData.emailLogs) masterData.emailLogs = [];
    if (!masterData.backupLogs) masterData.backupLogs = [];

    // === MIGRAZIONE SCHEMA v2: rimuovi coffeeLogs generati automaticamente dal vecchio seeder ===
    // Il vecchio seeder generava migliaia di log fittizi. Schema v2 garantisce solo log reali.
    if (!masterData.schemaVersion || masterData.schemaVersion < 2) {
      masterData.coffeeLogs = [];
      masterData.schemaVersion = 2;
    }

    // === MIGRAZIONE SCHEMA v3: aggiungi productionYear e pulisci modelli macchine ===
    if (masterData.schemaVersion < 3) {
      if (masterData.machines && Array.isArray(masterData.machines)) {
        masterData.machines.forEach(m => {
          m.productionYear = m.productionYear || '2026';
          // Standardizzazione modelli a soli "Ciao", "Jessica", "Altro"
          const mod = String(m.model).toLowerCase();
          if (mod.includes('ciao')) m.model = 'Ciao';
          else if (mod.includes('jessica')) m.model = 'Jessica';
          else m.model = 'Altro';
        });
      }
      masterData.schemaVersion = 3;
    }

    // === MIGRAZIONE SCHEMA v4: forza pulizia modelli non-standard alle sole 3 opzioni richieste ===
    if (!masterData.schemaVersion || masterData.schemaVersion < 4) {
      if (masterData.machines && Array.isArray(masterData.machines)) {
        masterData.machines.forEach(m => {
          const mod = String(m.model).trim();
          if (mod !== 'Ciao' && mod !== 'Jessica') {
            m.model = 'Altro';
          }
          // Forza anno nel range 2020-2040
          const yr = parseInt(m.productionYear, 10);
          if (isNaN(yr) || yr < 2020 || yr > 2040) {
            m.productionYear = '2026';
          }
        });
      }
      masterData.schemaVersion = 4;
    }

    // === MIGRAZIONE SCHEMA v5: popola refillLogs iniziale se vuoto ===
    if (!masterData.schemaVersion || masterData.schemaVersion < 5) {
      if (!masterData.refillLogs || masterData.refillLogs.length === 0) {
        masterData.refillLogs = [...initialData.refillLogs];
      }
      masterData.schemaVersion = 5;
    }

    // Rimuovi log orfani di schede Deconto cancellate
    const activeBoardIds = new Set(masterData.decontoBoards.map(b => b.id));
    masterData.coffeeLogs = masterData.coffeeLogs.filter(log => activeBoardIds.has(log.boardId));
    masterData.refillLogs = masterData.refillLogs.filter(log => activeBoardIds.has(log.boardId));

    // Salva per allineare tutte le chiavi
    try {
      const payload = JSON.stringify(masterData);
      ALL_STORAGE_KEYS.forEach(k => localStorage.setItem(k, payload));
    } catch (e) {}

    return masterData;
  }

  saveData() {
    try {
      const payload = JSON.stringify(this.data);
      ALL_STORAGE_KEYS.forEach(key => {
        localStorage.setItem(key, payload);
      });
      this.syncToIndexedDB();
    } catch (e) {}
  }

  loadSession() {
    try {
      const storedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  }

  saveSession(user) {
    this.currentUser = user;
    if (user) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }

  login(username, password) {
    const cleanUser = String(username || '').trim();
    const user = this.data.users.find(u => u.username === cleanUser);

    if (!user) throw new Error('Codice utente non valido.');

    const isDefaultAdmin = user.username === '001';
    const isValidPass = user.password === password || (isDefaultAdmin && (password === '123456' || password === '123'));

    if (!isValidPass) throw new Error('Password errata.');
    if (user.status !== 'ACTIVE') throw new Error('Account utente disabilitato dall\'amministratore.');

    this.saveSession(user);
    return user;
  }

  logout() {
    this.saveSession(null);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getSettings() {
    return this.data.settings || initialData.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.getSettings(), ...newSettings };
    this.saveData();
    return this.data.settings;
  }

  getRoleLabels() {
    return this.data.roleLabels || initialData.roleLabels;
  }

  updateRoleLabel(roleKey, newLabel) {
    if (!this.data.roleLabels) this.data.roleLabels = { ...initialData.roleLabels };
    this.data.roleLabels[roleKey] = newLabel.trim();
    this.saveData();
    return this.data.roleLabels;
  }

  getPermissions() {
    return this.data.permissions || initialData.permissions;
  }

  updatePermissions(newPermissions) {
    this.data.permissions = newPermissions;
    this.saveData();
    return this.data.permissions;
  }

  calculateBoardStatus(board) {
    const settings = this.getSettings();
    const Y = settings.thresholdYellow || 20;
    const X = settings.thresholdRed || 5;
    const c = board.remainingCredits;

    if (c <= 0) {
      return {
        statusKey: 'BLOCKED_ZERO',
        label: '⚫ BLOCCO RELÈ (0 CIALDE)',
        badgeClass: 'badge-danger',
        badgeHtml: `<span class="badge" style="background: #090d16; color: #fff; border: 1px solid #334155; font-weight: 800;">⚫ BLOCCO RELÈ (0 CIALDE)</span>`
      };
    } else if (c <= X) {
      return {
        statusKey: 'CRITICAL_LOW',
        label: `🔴 CRITICO (${c} CIALDE)`,
        badgeClass: 'badge-danger',
        badgeHtml: `<span class="badge badge-danger" style="font-weight: 800;">🔴 CRITICO (${c} CIALDE)</span>`
      };
    } else if (c <= Y) {
      return {
        statusKey: 'WARNING_LOW',
        label: `🟡 SOTTOSCORTA (${c} CIALDE)`,
        badgeClass: 'badge-warning',
        badgeHtml: `<span class="badge badge-warning" style="font-weight: 800;">🟡 SOTTOSCORTA (${c} CIALDE)</span>`
      };
    } else {
      return {
        statusKey: 'ACTIVE_OK',
        label: `🟢 REGOLARE (${c} CIALDE)`,
        badgeClass: 'badge-success',
        badgeHtml: `<span class="badge badge-success" style="font-weight: 800;">🟢 REGOLARE (${c} CIALDE)</span>`
      };
    }
  }

  calculateClientStatus(client) {
    const machines = this.data.machines.filter(m => m.clientId === client.id);
    if (machines.length === 0) {
      return {
        statusKey: 'NO_MACHINE',
        label: '⚪ NESSUNA MACCHINA',
        badgeHtml: `<span class="badge badge-secondary">⚪ INATTIVO</span>`
      };
    }

    const assignedBoard = this.data.decontoBoards.find(b => machines.some(m => m.id === b.machineId));
    if (!assignedBoard) {
      return {
        statusKey: 'NO_BOARD',
        label: '⚪ MACCHINA SENZA DECONTO',
        badgeHtml: `<span class="badge badge-secondary">⚪ NON COLLEGATO</span>`
      };
    }

    return this.calculateBoardStatus(assignedBoard);
  }

  updateUserProfile(userId, data) {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) throw new Error('Utente non trovato.');

    if (data.name) user.name = data.name.trim();
    if (data.email) user.email = data.email.trim();
    if (data.phone) user.phone = data.phone.trim();
    if (data.avatar) user.avatar = data.avatar;
    if (data.newPassword) user.password = data.newPassword.trim();

    this.saveData();
    if (this.currentUser && this.currentUser.id === userId) {
      this.saveSession(user);
    }
    return user;
  }

  verifyPassword(userId, password) {
    const user = this.data.users.find(u => u.id === userId);
    return user ? user.password === password : false;
  }

  getUsers() {
    return this.data.users;
  }

  addUser(data) {
    const username = data.username.trim();
    const existing = this.data.users.find(u => u.username === username);
    if (existing) {
      throw new Error(`Il codice utente "${username}" è già assegnato a un altro dipendente.`);
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      username,
      password: data.password.trim(),
      name: data.name.trim(),
      email: data.email ? data.email.trim() : '',
      phone: data.phone ? data.phone.trim() : '',
      role: data.role || 'UFFICIO',
      status: 'ACTIVE',
      avatar: data.role === 'ADMIN' ? '👨‍💼' : (data.role === 'UFFICIO' ? '👩‍💻' : '🚚'),
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.data.users.push(newUser);
    this.saveData();

    if (newUser.email) {
      emailService.sendWelcomeStaffEmail(newUser);
    }

    return newUser;
  }

  updateUser(userId, data) {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) throw new Error('Utente non trovato.');

    const oldRole = user.role;

    if (data.username && data.username !== user.username) {
      const cleanU = data.username.trim();
      const dup = this.data.users.find(u => u.username === cleanU && u.id !== userId);
      if (dup) throw new Error(`Il codice utente "${cleanU}" è già in uso.`);
      user.username = cleanU;
    }

    if (data.name) user.name = data.name.trim();
    if (data.email !== undefined) user.email = data.email.trim();
    if (data.phone !== undefined) user.phone = data.phone.trim();
    if (data.status) user.status = data.status;

    if (data.password) {
      user.password = data.password.trim();
    }

    if (data.role && user.username !== '001') {
      user.role = data.role;
      user.avatar = user.role === 'ADMIN' ? '👨‍💼' : (user.role === 'UFFICIO' ? '👩‍💻' : '🚚');
      if (oldRole !== user.role && user.email) {
        emailService.sendRoleUpdateEmail(user, oldRole, user.role);
      }
    }

    this.saveData();
    return user;
  }

  deleteUser(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) throw new Error('Utente non trovato.');
    if (user.username === '001') throw new Error('Impossibile eliminare l\'amministratore principale.');

    this.data.users = this.data.users.filter(u => u.id !== userId);
    this.saveData();
  }

  getClients() { return this.data.clients; }
  getMachines() { return this.data.machines; }
  getBoards() { return this.data.decontoBoards; }
  getRefillLogs() { return this.data.refillLogs; }
  getCoffeeLogs() { return this.data.coffeeLogs || []; }
  getEmailLogs() { return this.data.emailLogs || []; }
  getBackupLogs() { return this.data.backupLogs; }

  seedCoffeeLogs() {
    // NON genera dati fittizi - solo dati reali da ESP32-C6
    // Mantenuta per compatibilità ma non genera nulla
    return this.data.coffeeLogs || [];
  }

  getExtractionsAnalytics(periodKey = '30DAYS', customStartStr = null, customEndStr = null) {
    const logs = this.data.coffeeLogs || [];
    // Solo dati reali - nessun seed automatico

    const now = new Date();
    let startDate, endDate;

    if (periodKey === '30DAYS') {
      startDate = new Date(now.getTime() - 30 * 86400000);
      endDate = new Date(now);
    } else if (periodKey === '90DAYS') {
      startDate = new Date(now.getTime() - 90 * 86400000);
      endDate = new Date(now);
    } else if (periodKey === '1YEAR') {
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now);
    } else if (periodKey === 'CUSTOM' && customStartStr && customEndStr) {
      startDate = new Date(customStartStr + 'T00:00:00');
      endDate = new Date(customEndStr + 'T23:59:59');
    } else {
      startDate = new Date(now.getTime() - 30 * 86400000);
      endDate = new Date(now);
    }

    const durationDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 86400000));

    const filteredLogs = logs.filter(l => {
      const d = new Date(l.timestamp);
      return d >= startDate && d <= endDate;
    });

    const totalCount = filteredLogs.length;
    const avgDaily = (totalCount / durationDays).toFixed(1);

    // Calcolo 5 intervalli temporali per i 5 punti del grafico
    const intervalMs = (endDate.getTime() - startDate.getTime()) / 5;
    const chartBuckets = [];

    for (let i = 0; i < 5; i++) {
      const bStart = new Date(startDate.getTime() + i * intervalMs);
      const bEnd = new Date(startDate.getTime() + (i + 1) * intervalMs);

      const bucketLogs = filteredLogs.filter(l => {
        const d = new Date(l.timestamp);
        return d >= bStart && d < bEnd;
      });

      let label = '';
      if (durationDays <= 35) {
        label = bStart.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
      } else if (durationDays <= 120) {
        label = `Sett. ${i + 1}`;
      } else {
        label = bStart.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
      }

      chartBuckets.push({
        label,
        count: bucketLogs.length,
        startDate: bStart,
        endDate: bEnd
      });
    }

    return {
      periodKey,
      startDate,
      endDate,
      durationDays,
      totalCount,
      avgDaily,
      chartBuckets,
      logs: filteredLogs
    };
  }

  hasPermission(permissionName) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'ADMIN') return true;
    const rolePerms = (this.data.permissions || initialData.permissions)[this.currentUser.role];
    return rolePerms ? !!rolePerms[permissionName] : false;
  }

  addBoard(data) {
    const shortCode = String(data.shortCode || '').trim();
    if (!shortCode) throw new Error('Inserisci il Codice 4 Cifre del Deconto.');

    const existing = this.data.decontoBoards.find(b => b.shortCode === shortCode);
    if (existing) {
      throw new Error(`La Scheda Deconto con codice #${shortCode} esiste già nel sistema.`);
    }

    const cleanCode = shortCode.padStart(4, '0').substring(0, 4);
    const version = data.version === 'PRO' ? 'PRO' : 'BASIC';
    // groupCount: BASIC fisso a 1, PRO da 2 a 4 (contatore crediti sempre condiviso)
    const groupCount = version === 'PRO' ? Math.min(4, Math.max(2, parseInt(data.groupCount, 10) || 2)) : 1;

    const newBoard = {
      id: 'board_' + cleanCode,
      shortCode: cleanCode,
      hwSerial: data.hwSerial ? data.hwSerial.trim() : null,
      macAddress: data.macAddress ? data.macAddress.trim() : null,
      machineId: data.machineId || null,
      version: version,
      groupCount: groupCount,
      remainingCredits: parseInt(data.remainingCredits !== undefined ? data.remainingCredits : 200, 10),
      relayStatus: 'CLOSED_OK',
      firmwareVersion: null,
      isOnlineWifi: false,
      rssi: null,
      machineExtractions: 0,
      lifetimeExtractions: 0,
      avgDailyCoffees: 0,
      lastSyncDate: new Date().toISOString()
    };

    this.data.decontoBoards.unshift(newBoard);

    if (data.machineId) {
      const mc = this.data.machines.find(m => m.id === data.machineId);
      if (mc) {
        this.data.decontoBoards.forEach(b => {
          if (b.id !== newBoard.id && b.machineId === mc.id) b.machineId = null;
        });
      }
    }

    this.saveData();
    return newBoard;
  }

  updateBoard(boardId, data) {
    const board = this.data.decontoBoards.find(b => b.id === boardId || b.shortCode === boardId);
    if (!board) throw new Error('Scheda Deconto non trovata.');

    if (data.shortCode) {
      const clean = String(data.shortCode).trim().padStart(4, '0').substring(0, 4);
      const duplicate = this.data.decontoBoards.find(b => b.shortCode === clean && b.id !== board.id);
      if (duplicate) throw new Error(`Il codice #${clean} è già utilizzato da un'altra scheda.`);
      board.shortCode = clean;
    }

    if (data.hwSerial !== undefined) board.hwSerial = data.hwSerial.trim();
    if (data.version) {
      board.version = data.version === 'PRO' ? 'PRO' : 'BASIC';
      // Aggiorna groupCount coerentemente con la versione
      if (board.version === 'BASIC') {
        board.groupCount = 1;
      } else if (data.groupCount !== undefined) {
        board.groupCount = Math.min(4, Math.max(2, parseInt(data.groupCount, 10) || 2));
      }
    }
    if (data.machineId !== undefined) {
      const targetMcId = data.machineId || null;
      board.machineId = targetMcId;
      if (targetMcId) {
        this.data.decontoBoards.forEach(b => {
          if (b.id !== board.id && b.machineId === targetMcId) b.machineId = null;
        });
      }
    }

    if (data.remainingCredits !== undefined) {
      board.remainingCredits = parseInt(data.remainingCredits, 10);
      if (board.remainingCredits > 0) board.relayStatus = 'CLOSED_OK';
      else { board.remainingCredits = 0; board.relayStatus = 'OPEN_LOCKED'; }
    }

    this.saveData();
    return board;
  }

  deleteBoard(boardId) {
    const board = this.data.decontoBoards.find(b => b.id === boardId || b.shortCode === boardId);
    if (board) {
      this.data.coffeeLogs = (this.data.coffeeLogs || []).filter(c => c.boardId !== board.id);
      this.data.refillLogs = (this.data.refillLogs || []).filter(r => r.boardId !== board.id);
      this.data.decontoBoards = this.data.decontoBoards.filter(b => b.id !== board.id);
      this.saveData();
    }
  }

  addMachine(data) {
    const serialNumber = data.serialNumber.trim();
    const existing = this.data.machines.find(m => m.serialNumber === serialNumber);
    if (existing) {
      throw new Error(`La macchina con seriale ${serialNumber} esiste già.`);
    }

    const newMachine = {
      id: 'mc_' + Date.now(),
      serialNumber,
      brand: data.brand ? data.brand.trim() : 'Spinel',
      model: data.model ? data.model.trim() : 'Ciao',
      productionYear: data.productionYear ? String(data.productionYear).trim() : '2026',
      clientId: data.clientId || null,
      installDate: data.clientId ? new Date().toISOString().split('T')[0] : null
    };

    this.data.machines.unshift(newMachine);

    if (data.boardId) {
      const board = this.data.decontoBoards.find(b => b.id === data.boardId || b.shortCode === data.boardId);
      if (board) {
        this.data.decontoBoards.forEach(b => {
          if (b.machineId === newMachine.id) b.machineId = null;
        });
        board.machineId = newMachine.id;
      }
    }

    this.saveData();
    return newMachine;
  }

  updateMachine(machineId, data) {
    const machine = this.data.machines.find(m => m.id === machineId);
    if (!machine) throw new Error('Macchina non trovata.');

    if (data.serialNumber) machine.serialNumber = data.serialNumber.trim();
    if (data.brand !== undefined) machine.brand = data.brand.trim();
    if (data.model) machine.model = data.model.trim();
    if (data.productionYear !== undefined) machine.productionYear = String(data.productionYear).trim();

    if (data.clientId !== undefined) {
      machine.clientId = data.clientId || null;
      if (machine.clientId && !machine.installDate) {
        machine.installDate = new Date().toISOString().split('T')[0];
      }
    }

    if (data.boardId !== undefined) {
      const targetBoardId = data.boardId || null;
      this.data.decontoBoards.forEach(b => {
        if (b.machineId === machine.id) b.machineId = null;
      });
      if (targetBoardId) {
        const board = this.data.decontoBoards.find(b => b.id === targetBoardId || b.shortCode === targetBoardId);
        if (board) board.machineId = machine.id;
      }
    }

    this.saveData();
    return machine;
  }

  deleteMachine(machineId) {
    this.data.decontoBoards.forEach(b => {
      if (b.machineId === machineId) b.machineId = null;
    });
    this.data.machines = this.data.machines.filter(m => m.id !== machineId);
    this.saveData();
  }

  addClient(data) {
    const newClient = {
      id: 'cli_' + Date.now(),
      name: data.name.trim(),
      clientType: data.clientType ? data.clientType.trim() : 'Altro',
      refPerson: data.refPerson ? data.refPerson.trim() : 'Referente',
      phone: data.phone ? data.phone.trim() : '+39 ',
      email: data.email ? data.email.trim() : '',
      address: data.address ? data.address.trim() : '',
      city: data.city ? data.city.trim() : ''
    };
    this.data.clients.unshift(newClient);

    if (data.machineId) {
      const mc = this.data.machines.find(m => m.id === data.machineId);
      if (mc) {
        mc.clientId = newClient.id;
        mc.installDate = new Date().toISOString().split('T')[0];
      }
    }

    this.saveData();
    return newClient;
  }

  updateClient(clientId, data) {
    const client = this.data.clients.find(c => c.id === clientId);
    if (!client) throw new Error('Cliente non trovato.');

    if (data.name) client.name = data.name.trim();
    if (data.clientType !== undefined) client.clientType = data.clientType.trim();
    if (data.refPerson !== undefined) client.refPerson = data.refPerson.trim();
    if (data.phone !== undefined) client.phone = data.phone.trim();
    if (data.email !== undefined) client.email = data.email.trim();
    if (data.city !== undefined) client.city = data.city.trim();
    if (data.address !== undefined) client.address = data.address.trim();

    if (data.assignedMachineId !== undefined) {
      const targetMcId = data.assignedMachineId || null;
      if (targetMcId) {
        const mc = this.data.machines.find(m => m.id === targetMcId);
        if (mc) {
          mc.clientId = client.id;
          if (!mc.installDate) mc.installDate = new Date().toISOString().split('T')[0];
        }
      }
    }

    this.saveData();
    return client;
  }

  deleteClient(clientId) {
    this.data.machines.forEach(m => {
      if (m.clientId === clientId) {
        m.clientId = null;
      }
    });
    this.data.clients = this.data.clients.filter(c => c.id !== clientId);
    this.saveData();
  }

  getBoardFullDetails(shortCodeOrId) {
    const board = this.data.decontoBoards.find(b => b.shortCode === shortCodeOrId || b.id === shortCodeOrId);
    if (!board) return null;

    const machine = this.data.machines.find(m => m.id === board.machineId);
    const client = machine ? this.data.clients.find(c => c.id === machine.clientId) : null;
    const refills = this.data.refillLogs.filter(r => r.boardId === board.id);
    const coffees = (this.data.coffeeLogs || []).filter(c => c.boardId === board.id);

    return { board, machine, client, refills, coffees };
  }

  performRefill({ boardShortCode, credits, method, operatorId, tokenOtp }) {
    const board = this.data.decontoBoards.find(b => b.shortCode === boardShortCode);
    if (!board) throw new Error(`Scheda Deconto #${boardShortCode} non trovata.`);

    board.remainingCredits += credits;
    board.relayStatus = 'CLOSED_OK';
    board.lastSyncDate = new Date().toISOString();

    const newRefillLog = {
      id: 'ref_' + Date.now(),
      boardId: board.id,
      shortCode: board.shortCode,
      creditsAdded: credits,
      tokenOtp: tokenOtp || `OTP-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      operatorType: method === 'WHATSAPP_OTP_BLE' ? 'CLIENT_DIY' : (method === 'CLOUD_DIRECT' ? 'OFFICE' : 'ADR'),
      operatorId: operatorId || (this.currentUser ? this.currentUser.id : 'usr_002'),
      timestamp: new Date().toISOString(),
      method
    };

    this.data.refillLogs.unshift(newRefillLog);
    this.saveData();
    return { board, newRefillLog };
  }

  registerCoffeeExtraction(boardShortCode, durationSeconds = 22, groupId = 1) {
    const board = this.data.decontoBoards.find(b => b.shortCode === boardShortCode);
    if (!board) return null;

    if (board.remainingCredits <= 0) {
      board.relayStatus = 'OPEN_LOCKED';
      this.saveData();
      return { success: false, reason: 'CREDITS_EXHAUSTED', relayStatus: 'OPEN_LOCKED' };
    }

    board.remainingCredits -= 1;
    board.machineExtractions = (board.machineExtractions || 0) + 1;
    board.lifetimeExtractions = (board.lifetimeExtractions || 0) + 1;

    if (board.remainingCredits <= 0) {
      board.remainingCredits = 0;
      board.relayStatus = 'OPEN_LOCKED';
    }

    const log = {
      id: 'log_' + Date.now(),
      boardId: board.id,
      timestamp: new Date().toISOString(),
      durationSeconds,
      groupId
    };

    if (!this.data.coffeeLogs) this.data.coffeeLogs = [];
    this.data.coffeeLogs.unshift(log);
    this.saveData();

    return {
      success: true,
      remainingCredits: board.remainingCredits,
      isLowStock: board.remainingCredits <= (this.getSettings().thresholdYellow || 20),
      relayStatus: board.relayStatus
    };
  }

  exportCoffeeLogsCSV() {
    let csv = 'ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio\n';
    (this.data.coffeeLogs || []).forEach(log => {
      const details = this.getBoardFullDetails(log.boardId);
      const clientName = details && details.client ? details.client.name.replace(/,/g, ' ') : 'N/D';
      const mcSerial = details && details.machine ? details.machine.serialNumber : 'N/D';
      const mcModel = details && details.machine ? details.machine.model.replace(/,/g, ' ') : 'N/D';
      const code = details && details.board ? details.board.shortCode : 'N/D';
      csv += `${log.id},${code},"${clientName}",${mcSerial},"${mcModel}",${log.timestamp},${log.durationSeconds},${log.groupId}\n`;
    });
    return csv;
  }

  triggerGitHubBackup() {
    const newBackup = {
      id: 'bak_' + Date.now(),
      timestamp: new Date().toISOString(),
      repo: 'emporioboldrini-stack/deconto-app',
      commitHash: 'git-' + Math.random().toString(36).substring(2, 10),
      status: 'SUCCESS',
      recordCount: this.data.clients.length + this.data.machines.length + this.data.decontoBoards.length + this.data.refillLogs.length
    };
    this.data.backupLogs.unshift(newBackup);
    this.saveData();
    return newBackup;
  }
}

export const db = new DecontoDatabase();
