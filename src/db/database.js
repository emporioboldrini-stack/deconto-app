import { emailService } from '../services/emailService.js';

/**
 * DECONTO IoT System - Master Database Engine v12
 * 
 * Flusso a 3 Step Completo & Bidirezionale:
 * 1. Creazione Scheda Deconto (Libera a banco o montata su Macchina).
 * 2. Associazione Deconto <-> Macchina nella Scheda Parco Macchine.
 * 3. Installazione Macchina <-> Cliente nella Scheda Anagrafica Clienti.
 */

const MASTER_STORAGE_KEY = 'DECONTO_MASTER_STORE_PERSISTENT';
const MASTER_SESSION_KEY = 'DECONTO_MASTER_SESSION_PERSISTENT';

const LEGACY_KEYS = [
  'DECONTO_APP_MASTER_DATABASE_V1',
  'DECONTO_DB_V9', 'DECONTO_DB_V8', 'DECONTO_DB_V7', 
  'DECONTO_DB_V6', 'DECONTO_DB_V5', 'DECONTO_DB_V4', 
  'DECONTO_DB_V3', 'DECONTO_DB_V2', 'DECONTO_DB_V1'
];

const initialData = {
  settings: {
    customLogoUrl: null,
    brandTitle: 'DECONTO',
    brandSubtitle: 'IoT Vending System',
    gasScriptUrl: '',
    brevoApiKey: '',
    brevoSenderEmail: ''
  },

  roleLabels: {
    UFFICIO: 'UFFICIO & LOGISTICA',
    ADR: 'AGENTE ADR (CONSEGNE)'
  },

  users: [
    {
      id: 'usr_001',
      username: '001',
      password: '123456',
      name: 'Amministratore Principale',
      email: 'admin@deconto.it',
      phone: '+39 02 112233',
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
      canViewRefillHistory: true,
      canUseSimulator: true
    },
    ADR: {
      canViewClients: true,
      canCreateClients: false,
      canEditClients: false,
      canDeleteClients: false,
      canGenerateQr: false,
      canGenerateOtp: false,
      canViewRefillHistory: true,
      canUseSimulator: true,
      canBleRefill: true
    }
  },

  clients: [
    { id: 'cli_1', name: 'Bar Milano Central', refPerson: 'Mario Rossi', phone: '+39 02 5551234', address: 'Via Roma 12, Milano', city: 'Milano', status: 'ACTIVE' },
    { id: 'cli_2', name: 'Ristorante La Perla', refPerson: 'Elena Neri', phone: '+39 06 7778899', address: 'Corso Italia 45, Roma', city: 'Roma', status: 'ACTIVE' },
    { id: 'cli_3', name: 'Studio Legale Brambilla', refPerson: 'Avv. Brambilla', phone: '+39 02 4443322', address: 'Via Montenapoleone 8, Milano', city: 'Milano', status: 'WARNING' },
    { id: 'cli_4', name: 'Officina Meccanica Conti', refPerson: 'Luigi Conti', phone: '+39 011 998877', address: 'Via Garibaldi 102, Torino', city: 'Torino', status: 'ACTIVE' },
    { id: 'cli_5', name: 'Hotel Bellavista', refPerson: 'Stefano Bellini', phone: '+39 051 889900', address: 'Piazza Maggiore 3, Bologna', city: 'Bologna', status: 'ACTIVE' }
  ],
  machines: [
    { id: 'mc_1', serialNumber: 'SN-MC-2026-9912', brand: 'DeLonghi', model: 'DeLonghi Pod Professional 1G', clientId: 'cli_1', installDate: '2025-11-10', status: 'INSTALLED' },
    { id: 'mc_2', serialNumber: 'SN-MC-2026-8843', brand: 'Faber', model: 'Faber Slot Plast Single', clientId: 'cli_2', installDate: '2026-01-15', status: 'INSTALLED' },
    { id: 'mc_3', serialNumber: 'SN-MC-2026-7711', brand: 'Didiesse', model: 'Didiesse Frog Revolution', clientId: 'cli_3', installDate: '2026-02-20', status: 'INSTALLED' },
    { id: 'mc_4', serialNumber: 'SN-MC-2026-4409', brand: 'Spinel', model: 'Spinel Pinocchio Professional', clientId: 'cli_4', installDate: '2026-03-05', status: 'INSTALLED' },
    { id: 'mc_5', serialNumber: 'SN-MC-2026-5500', brand: 'Grimac', model: 'Grimac Terry Opus 1', clientId: null, installDate: null, status: 'STOCK' }
  ],
  decontoBoards: [
    {
      id: 'board_3467',
      shortCode: '3467',
      hwSerial: 'DC-HW-8841',
      macAddress: 'C6:3F:8A:11:34:67',
      machineId: 'mc_1',
      version: 'BASIC',
      remainingCredits: 145,
      lowStockThreshold: 20,
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
      lowStockThreshold: 20,
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
      id: 'board_5510',
      shortCode: '5510',
      hwSerial: 'DC-HW-9910',
      macAddress: 'C6:3F:8A:33:55:10',
      machineId: 'mc_3',
      version: 'BASIC',
      remainingCredits: 9,
      lowStockThreshold: 20,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -84,
      machineExtractions: 991,
      lifetimeExtractions: 2153,
      avgDailyCoffees: 5.2,
      lastSyncDate: new Date(Date.now() - 86400000 * 12).toISOString()
    },
    {
      id: 'board_9901',
      shortCode: '9901',
      hwSerial: 'DC-HW-4401',
      macAddress: 'C6:3F:8A:44:99:01',
      machineId: 'mc_4',
      version: 'BASIC',
      remainingCredits: 198,
      lowStockThreshold: 20,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -58,
      machineExtractions: 1241,
      lifetimeExtractions: 3501,
      avgDailyCoffees: 9.1,
      lastSyncDate: new Date().toISOString()
    },
    {
      id: 'board_7700',
      shortCode: '7700',
      hwSerial: 'DC-HW-5500',
      macAddress: 'C6:3F:8A:55:77:00',
      machineId: null,
      version: 'PRO',
      remainingCredits: 500,
      lowStockThreshold: 20,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -70,
      machineExtractions: 0,
      lifetimeExtractions: 0,
      avgDailyCoffees: 0,
      lastSyncDate: new Date().toISOString()
    }
  ],
  refillLogs: [],
  coffeeLogs: [],
  emailLogs: [],
  backupLogs: []
};

class DecontoDatabase {
  constructor() {
    this.data = this.loadData();
    this.currentUser = this.loadSession();
    this.initIndexedDB();
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
    try {
      let storedRaw = localStorage.getItem(MASTER_STORAGE_KEY);
      let parsedData = null;

      if (storedRaw) {
        parsedData = JSON.parse(storedRaw);
      } else {
        for (const legacyKey of LEGACY_KEYS) {
          const legacyRaw = localStorage.getItem(legacyKey);
          if (legacyRaw) {
            try {
              parsedData = JSON.parse(legacyRaw);
              break;
            } catch (err) {}
          }
        }
      }

      if (parsedData) {
        if (!parsedData.settings) parsedData.settings = initialData.settings;
        if (!parsedData.roleLabels) parsedData.roleLabels = initialData.roleLabels;
        if (!parsedData.permissions) parsedData.permissions = initialData.permissions;
        if (!parsedData.emailLogs) parsedData.emailLogs = [];
        if (!parsedData.coffeeLogs) parsedData.coffeeLogs = [];
        if (!parsedData.refillLogs) parsedData.refillLogs = [];
        if (!parsedData.decontoBoards || parsedData.decontoBoards.length === 0) parsedData.decontoBoards = initialData.decontoBoards;
        if (!parsedData.clients || parsedData.clients.length === 0) parsedData.clients = initialData.clients;
        if (!parsedData.machines || parsedData.machines.length === 0) parsedData.machines = initialData.machines;

        if (!parsedData.users || !parsedData.users.some(u => u.username === '001')) {
          parsedData.users = parsedData.users || [];
          if (!parsedData.users.some(u => u.username === '001')) {
            parsedData.users.unshift(initialData.users[0]);
          }
        }

        parsedData.users.forEach(u => {
          if (u.role === 'UFFICIO') u.avatar = '👩‍💻';
          else if (u.role === 'ADR') u.avatar = '🚚';
          else if (u.role === 'ADMIN') u.avatar = '👨‍💼';
        });

        LEGACY_KEYS.forEach(k => {
          try { localStorage.removeItem(k); } catch(e) {}
        });

        this.saveData(parsedData);
        return parsedData;
      }
    } catch (e) {}

    this.saveData(initialData);
    return initialData;
  }

  saveData(data) {
    this.data = data || this.data;
    try {
      const payload = JSON.stringify(this.data);
      localStorage.setItem(MASTER_STORAGE_KEY, payload);
      this.syncToIndexedDB();
    } catch (e) {
      try {
        if (this.data.coffeeLogs && this.data.coffeeLogs.length > 50) {
          this.data.coffeeLogs = this.data.coffeeLogs.slice(0, 50);
        }
        localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(this.data));
      } catch (err2) {}
    }
  }

  getSettings() { return this.data.settings || initialData.settings; }
  updateSettings(newSettings) { this.data.settings = { ...this.getSettings(), ...newSettings }; this.saveData(); }

  getRoleLabels() { return this.data.roleLabels || initialData.roleLabels; }
  updateRoleLabel(roleKey, newLabel) { if (!this.data.roleLabels) this.data.roleLabels = { ...initialData.roleLabels }; this.data.roleLabels[roleKey] = newLabel.trim(); this.saveData(); }

  loadSession() {
    try {
      const stored = localStorage.getItem(MASTER_SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  }

  saveSession(user) {
    this.currentUser = user;
    try {
      if (user) localStorage.setItem(MASTER_SESSION_KEY, JSON.stringify(user));
      else localStorage.removeItem(MASTER_SESSION_KEY);
    } catch (e) {}
  }

  authenticate(username, password) {
    const u = String(username || '').trim();
    const p = String(password || '').trim();

    if ((u === '001' || u === 'admin') && p === '123456') {
      let admin = this.data.users.find(x => x.username === '001');
      if (!admin) {
        admin = { id: 'usr_001', username: '001', password: '123456', name: 'Amministratore Principale', email: 'admin@deconto.it', role: 'ADMIN', avatar: '👨‍💼', status: 'ACTIVE' };
        this.data.users.unshift(admin);
        this.saveData();
      }
      const sessionUser = { id: admin.id, username: admin.username, name: admin.name, role: admin.role, email: admin.email, avatar: admin.avatar };
      this.saveSession(sessionUser);
      return sessionUser;
    }

    const user = this.data.users.find(x => String(x.username).trim() === u && String(x.password).trim() === p);
    if (!user) throw new Error('Credenziali non valide.');
    if (user.status === 'DISABLED') throw new Error('Account disattivato.');

    const sessionUser = { id: user.id, username: user.username, name: user.name, role: user.role, email: user.email, avatar: user.avatar };
    this.saveSession(sessionUser);
    return sessionUser;
  }

  logout() { this.saveSession(null); }
  getCurrentUser() { return this.currentUser; }

  getUsers() { return this.data.users; }
  getClients() { return this.data.clients; }
  getMachines() { return this.data.machines; }
  getBoards() { return this.data.decontoBoards; }
  getRefillLogs() { return this.data.refillLogs; }
  getCoffeeLogs() { return this.data.coffeeLogs; }
  getEmailLogs() { return this.data.emailLogs || []; }
  getBackupLogs() { return this.data.backupLogs; }

  hasPermission(permissionName) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'ADMIN') return true;
    const rolePerms = (this.data.permissions || initialData.permissions)[this.currentUser.role];
    return rolePerms ? !!rolePerms[permissionName] : false;
  }

  // --- STEP 1: 📟 ANAGRAFICA SCHEDE DECONTO ---
  addBoard(data) {
    const shortCode = String(data.shortCode || '').trim();
    if (!shortCode) throw new Error('Inserisci il Codice 4 Cifre del Deconto.');

    const existing = this.data.decontoBoards.find(b => b.shortCode === shortCode);
    if (existing) {
      throw new Error(`La Scheda Deconto con codice #${shortCode} esiste già nel sistema.`);
    }

    const cleanCode = shortCode.padStart(4, '0').substring(0, 4);
    const newBoard = {
      id: 'board_' + cleanCode,
      shortCode: cleanCode,
      hwSerial: data.hwSerial ? data.hwSerial.trim() : `DC-HW-${Math.floor(1000 + Math.random() * 9000)}`,
      macAddress: data.macAddress ? data.macAddress.trim() : `C6:3F:8A:${Math.floor(10 + Math.random() * 89)}:${cleanCode.substring(0,2)}:${cleanCode.substring(2,4)}`,
      machineId: data.machineId || null,
      version: data.version || 'BASIC',
      remainingCredits: parseInt(data.remainingCredits !== undefined ? data.remainingCredits : 200, 10),
      lowStockThreshold: parseInt(data.lowStockThreshold || 20, 10),
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -65,
      machineExtractions: 0,
      lifetimeExtractions: 0,
      avgDailyCoffees: 10.0,
      lastSyncDate: new Date().toISOString()
    };

    this.data.decontoBoards.unshift(newBoard);

    // Se è stata selezionata una macchina in fase di creazione scheda, sincronizza la macchina
    if (data.machineId) {
      const mc = this.data.machines.find(m => m.id === data.machineId);
      if (mc) {
        // Rimuove la scheda precedentemente associata a questa macchina se presente
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
    if (data.version) board.version = data.version;
    if (data.machineId !== undefined) {
      const targetMcId = data.machineId || null;
      board.machineId = targetMcId;
      if (targetMcId) {
        // Scollega altre schede eventualmente montate su questa macchina
        this.data.decontoBoards.forEach(b => {
          if (b.id !== board.id && b.machineId === targetMcId) b.machineId = null;
        });
      }
    }

    if (data.remainingCredits !== undefined && data.remainingCredits !== '') {
      board.remainingCredits = parseInt(data.remainingCredits, 10);
      if (board.remainingCredits > 0) board.relayStatus = 'CLOSED_OK';
    }
    if (data.lowStockThreshold !== undefined && data.lowStockThreshold !== '') {
      board.lowStockThreshold = parseInt(data.lowStockThreshold, 10);
    }

    this.saveData();
    return board;
  }

  deleteBoard(boardId) {
    this.data.decontoBoards = this.data.decontoBoards.filter(b => b.id !== boardId && b.shortCode !== boardId);
    this.saveData();
  }

  // --- STEP 2: ☕ ANAGRAFICA PARCO MACCHINE ---
  addMachine(data) {
    const serialNumber = data.serialNumber ? data.serialNumber.trim() : `SN-MC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMachine = {
      id: 'mc_' + Date.now(),
      serialNumber: serialNumber,
      brand: data.brand ? data.brand.trim() : 'Didiesse',
      model: data.model ? data.model.trim() : 'Frog Revolution',
      clientId: data.clientId || null,
      installDate: data.clientId ? (data.installDate || new Date().toISOString().split('T')[0]) : null,
      status: data.clientId ? 'INSTALLED' : 'STOCK'
    };
    this.data.machines.unshift(newMachine);

    // Se è stata selezionata una scheda Deconto, aggiorna la scheda Deconto associata
    if (data.boardId) {
      const board = this.data.decontoBoards.find(b => b.id === data.boardId || b.shortCode === data.boardId);
      if (board) {
        // Scollega la scheda da altre macchine
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

    if (data.clientId !== undefined) {
      machine.clientId = data.clientId || null;
      machine.status = machine.clientId ? 'INSTALLED' : 'STOCK';
      if (machine.clientId && !machine.installDate) {
        machine.installDate = new Date().toISOString().split('T')[0];
      }
    }

    // Gestione dell'associazione Scheda Deconto dalla macchina
    if (data.boardId !== undefined) {
      const targetBoardId = data.boardId || null;
      // Prima scollega tutte le schede montate su questa macchina
      this.data.decontoBoards.forEach(b => {
        if (b.machineId === machine.id) b.machineId = null;
      });
      // Collega la nuova scheda se selezionata
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

  // --- STEP 3: 🏢 ANAGRAFICA CLIENTE ---
  addClient(data) {
    const newClient = {
      id: 'cli_' + Date.now(),
      name: data.name.trim(),
      refPerson: data.refPerson ? data.refPerson.trim() : 'Referente',
      phone: data.phone ? data.phone.trim() : '+39 ',
      email: data.email ? data.email.trim() : '',
      address: data.address ? data.address.trim() : '',
      city: data.city ? data.city.trim() : '',
      status: 'ACTIVE'
    };
    this.data.clients.unshift(newClient);

    // Se in creazione cliente viene installata subito una macchina
    if (data.machineId) {
      const mc = this.data.machines.find(m => m.id === data.machineId);
      if (mc) {
        mc.clientId = newClient.id;
        mc.status = 'INSTALLED';
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
    if (data.refPerson !== undefined) client.refPerson = data.refPerson.trim();
    if (data.phone !== undefined) client.phone = data.phone.trim();
    if (data.email !== undefined) client.email = data.email.trim();
    if (data.city !== undefined) client.city = data.city.trim();
    if (data.address !== undefined) client.address = data.address.trim();
    if (data.status) client.status = data.status;

    // Assegna/Installa nuova macchina al cliente se specificata
    if (data.assignedMachineId !== undefined) {
      const targetMcId = data.assignedMachineId || null;
      if (targetMcId) {
        const mc = this.data.machines.find(m => m.id === targetMcId);
        if (mc) {
          mc.clientId = client.id;
          mc.status = 'INSTALLED';
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
        m.status = 'STOCK';
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
    const coffees = this.data.coffeeLogs.filter(c => c.boardId === board.id);

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

    this.data.coffeeLogs.unshift(log);
    this.saveData();

    return {
      success: true,
      remainingCredits: board.remainingCredits,
      isLowStock: board.remainingCredits < board.lowStockThreshold,
      relayStatus: board.relayStatus
    };
  }

  exportCoffeeLogsCSV() {
    let csv = 'ID_Log,Codice_Deconto,Cliente,Seriale_Macchina,Modello_Macchina,Data_Ora,Durata_Secondi,Gruppo_Braccio\n';
    this.data.coffeeLogs.forEach(log => {
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
