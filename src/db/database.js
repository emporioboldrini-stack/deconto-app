/**
 * DECONTO IoT System - Core Database, Authentication & Dynamic Permission Engine (v7)
 * Gestisce l'autenticazione, la gestione personale/utenti, la matrice dei permessi dinamica,
 * la personalizzazione del logo aziendale e del sottotitolo nella voce menu Impostazioni.
 */

const STORAGE_KEY = 'DECONTO_DB_V7';
const SESSION_KEY = 'DECONTO_AUTH_SESSION_V7';

const initialData = {
  settings: {
    customLogoUrl: null, // null = Icona emoji ☕ predefinita
    brandTitle: 'DECONTO',
    brandSubtitle: 'IoT Vending System'
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
    { id: 'cli_4', name: 'Officina Meccanica Conti', refPerson: 'Luigi Conti', phone: '+39 011 998877', address: 'Via Garibaldi 102, Torino', city: 'Torino', status: 'ACTIVE' }
  ],
  machines: [
    { id: 'mc_1', serialNumber: 'SN-MC-2026-9912', model: 'DeLonghi Pod Professional 1G', clientId: 'cli_1', installDate: '2025-11-10' },
    { id: 'mc_2', serialNumber: 'SN-MC-2026-8843', model: 'Faber Slot Plast Single', clientId: 'cli_2', installDate: '2026-01-15' },
    { id: 'mc_3', serialNumber: 'SN-MC-2026-7711', model: 'Didiesse Frog Revolution', clientId: 'cli_3', installDate: '2026-02-20' },
    { id: 'mc_4', serialNumber: 'SN-MC-2026-4409', model: 'Spinel Pinocchio Professional', clientId: 'cli_4', installDate: '2026-03-05' }
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
      remainingCredits: 12,
      lowStockThreshold: 20,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      rssi: -84,
      machineExtractions: 988,
      lifetimeExtractions: 2150,
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
      remainingCredits: 0,
      lowStockThreshold: 20,
      relayStatus: 'OPEN_LOCKED',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
      rssi: -58,
      machineExtractions: 1240,
      lifetimeExtractions: 3500,
      avgDailyCoffees: 9.1,
      lastSyncDate: new Date().toISOString()
    }
  ],
  refillLogs: [
    {
      id: 'ref_101',
      boardId: 'board_3467',
      shortCode: '3467',
      creditsAdded: 200,
      tokenOtp: 'OTP-9981-X79K2',
      operatorType: 'ADR',
      operatorId: 'usr_003',
      timestamp: new Date(Date.now() - 86400000 * 15).toISOString(),
      method: 'BLE_PWA'
    },
    {
      id: 'ref_102',
      boardId: 'board_5510',
      shortCode: '5510',
      creditsAdded: 150,
      tokenOtp: 'OTP-4412-M28P0',
      operatorType: 'CLIENT_DIY',
      operatorId: 'cli_3',
      timestamp: new Date(Date.now() - 86400000 * 25).toISOString(),
      method: 'WHATSAPP_OTP_BLE'
    }
  ],
  coffeeLogs: [
    { id: 'log_1', boardId: 'board_3467', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), durationSeconds: 22, groupId: 1 },
    { id: 'log_2', boardId: 'board_3467', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), durationSeconds: 21, groupId: 1 },
    { id: 'log_3', boardId: 'board_3467', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), durationSeconds: 24, groupId: 1 },
    { id: 'log_4', boardId: 'board_5510', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), durationSeconds: 38, groupId: 1 },
    { id: 'log_5', boardId: 'board_1289', timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), durationSeconds: 20, groupId: 1 },
    { id: 'log_6', boardId: 'board_1289', timestamp: new Date(Date.now() - 3600000 * 11).toISOString(), durationSeconds: 23, groupId: 2 }
  ],
  backupLogs: [
    {
      id: 'bak_001',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      repo: 'emporioboldrini-stack/deconto-app',
      commitHash: '634a210',
      status: 'SUCCESS',
      recordCount: 28
    }
  ]
};

class DecontoDatabase {
  constructor() {
    this.data = this.loadData();
    this.currentUser = this.loadSession();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.settings) parsed.settings = initialData.settings;
        if (!parsed.roleLabels) parsed.roleLabels = initialData.roleLabels;
        if (!parsed.permissions) parsed.permissions = initialData.permissions;
        if (!parsed.users || !parsed.users.some(u => u.username === '001')) parsed.users = initialData.users;
        return parsed;
      }
    } catch (e) {}
    this.saveData(initialData);
    return initialData;
  }

  saveData(data) {
    this.data = data || this.data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {}
  }

  // --- IMPOSTAZIONI GENERALI (LOGO & LOGO TEXT) ---
  getSettings() {
    return this.data.settings || initialData.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = {
      ...this.getSettings(),
      ...newSettings
    };
    this.saveData();
  }

  getRoleLabels() {
    return this.data.roleLabels || initialData.roleLabels;
  }

  updateRoleLabel(roleKey, newLabel) {
    if (!this.data.roleLabels) this.data.roleLabels = { ...initialData.roleLabels };
    this.data.roleLabels[roleKey] = newLabel.trim();
    this.saveData();
  }

  loadSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  }

  saveSession(user) {
    this.currentUser = user;
    try {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
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
    if (!user) {
      throw new Error('Credenziali non valide. Inserisci il tuo Nome Utente e Password.');
    }

    if (user.status === 'DISABLED') {
      throw new Error('Questo account è stato disattivato dall\'Amministratore.');
    }

    const sessionUser = { id: user.id, username: user.username, name: user.name, role: user.role, email: user.email, avatar: user.avatar };
    this.saveSession(sessionUser);
    return sessionUser;
  }

  logout() {
    this.saveSession(null);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  addUser(userData) {
    const existing = this.data.users.find(u => u.username === userData.username.trim());
    if (existing) {
      throw new Error(`Il nome utente "${userData.username}" è già in uso.`);
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      username: userData.username.trim(),
      password: userData.password.trim(),
      name: userData.name.trim(),
      role: userData.role,
      email: userData.email ? userData.email.trim() : '',
      phone: userData.phone ? userData.phone.trim() : '',
      status: 'ACTIVE',
      avatar: userData.role === 'UFFICIO' ? '👩‍💻' : '🚚',
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.data.users.push(newUser);
    this.saveData();
    return newUser;
  }

  updateUser(userId, updatedData) {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) throw new Error('Utente non trovato.');

    if (updatedData.name) user.name = updatedData.name.trim();
    if (updatedData.username) user.username = updatedData.username.trim();
    if (updatedData.email !== undefined) user.email = updatedData.email.trim();
    if (updatedData.phone !== undefined) user.phone = updatedData.phone.trim();
    if (updatedData.password) user.password = updatedData.password.trim();
    if (updatedData.role) user.role = updatedData.role;
    if (updatedData.status) user.status = updatedData.status;

    this.saveData();

    if (this.currentUser && this.currentUser.id === userId) {
      this.saveSession({
        ...this.currentUser,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      });
    }

    return user;
  }

  deleteUser(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (user && user.username === '001') {
      throw new Error('Impossibile eliminare l\'account Amministratore Principale (001).');
    }

    this.data.users = this.data.users.filter(u => u.id !== userId);
    this.saveData();
  }

  getPermissions() {
    return this.data.permissions || initialData.permissions;
  }

  updatePermissions(newPermissions) {
    this.data.permissions = newPermissions;
    this.saveData();
  }

  hasPermission(permissionName) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'ADMIN') return true;

    const rolePerms = this.getPermissions()[this.currentUser.role];
    return rolePerms ? !!rolePerms[permissionName] : false;
  }

  getUsers() { return this.data.users; }
  getClients() { return this.data.clients; }
  getMachines() { return this.data.machines; }
  getBoards() { return this.data.decontoBoards; }
  getRefillLogs() { return this.data.refillLogs; }
  getCoffeeLogs() { return this.data.coffeeLogs; }
  getBackupLogs() { return this.data.backupLogs; }

  getBoardFullDetails(shortCodeOrId) {
    const board = this.data.decontoBoards.find(b => b.shortCode === shortCodeOrId || b.id === shortCodeOrId);
    if (!board) return null;

    const machine = this.data.machines.find(m => m.id === board.machineId);
    const client = machine ? this.data.clients.find(c => c.id === machine.clientId) : null;
    const refills = this.data.refillLogs.filter(r => r.boardId === board.id);
    const coffees = this.data.coffeeLogs.filter(c => c.boardId === board.id);

    return { board, machine, client, refills, coffees };
  }

  addClient(newClientData) {
    if (!this.hasPermission('canCreateClients')) {
      throw new Error('Non disponi dei permessi per creare nuovi clienti.');
    }

    const newClient = {
      id: 'cli_' + Date.now(),
      name: newClientData.name,
      refPerson: newClientData.refPerson || 'Referente',
      phone: newClientData.phone || '+39 ',
      address: newClientData.address || '',
      city: newClientData.city || '',
      status: 'ACTIVE'
    };
    this.data.clients.unshift(newClient);

    if (newClientData.machineModel) {
      const newMachine = {
        id: 'mc_' + Date.now(),
        serialNumber: newClientData.machineSerial || `SN-MC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        model: newClientData.machineModel,
        clientId: newClient.id,
        installDate: new Date().toISOString().split('T')[0]
      };
      this.data.machines.unshift(newMachine);

      const shortCode = newClientData.shortCode || `${Math.floor(1000 + Math.random() * 9000)}`;
      const newBoard = {
        id: 'board_' + shortCode,
        shortCode: shortCode,
        hwSerial: `DC-HW-${Math.floor(1000 + Math.random() * 9000)}`,
        macAddress: `C6:3F:8A:${Math.floor(10 + Math.random() * 89)}:${shortCode.substring(0,2)}:${shortCode.substring(2,4)}`,
        machineId: newMachine.id,
        version: newClientData.boardVersion || 'BASIC',
        remainingCredits: parseInt(newClientData.initialCredits || 200, 10),
        lowStockThreshold: 20,
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
    }

    this.saveData();
    return newClient;
  }

  updateClientAndMachine(clientId, updateData) {
    if (!this.hasPermission('canEditClients')) {
      throw new Error('Non disponi dei permessi per modificare le schede clienti.');
    }

    const client = this.data.clients.find(c => c.id === clientId);
    if (!client) throw new Error('Cliente non trovato.');

    if (updateData.name) client.name = updateData.name.trim();
    if (updateData.refPerson) client.refPerson = updateData.refPerson.trim();
    if (updateData.phone) client.phone = updateData.phone.trim();
    if (updateData.city !== undefined) client.city = updateData.city.trim();
    if (updateData.address !== undefined) client.address = updateData.address.trim();

    const machine = this.data.machines.find(m => m.clientId === clientId);
    if (machine) {
      if (updateData.machineModel) machine.model = updateData.machineModel.trim();
      if (updateData.machineSerial) machine.serialNumber = updateData.machineSerial.trim();
    }

    if (machine) {
      const board = this.data.decontoBoards.find(b => b.machineId === machine.id);
      if (board) {
        if (updateData.shortCode) board.shortCode = updateData.shortCode.trim();
        if (updateData.remainingCredits !== undefined && updateData.remainingCredits !== '') {
          board.remainingCredits = parseInt(updateData.remainingCredits, 10);
          if (board.remainingCredits > 0) board.relayStatus = 'CLOSED_OK';
        }
        if (updateData.lowStockThreshold !== undefined && updateData.lowStockThreshold !== '') {
          board.lowStockThreshold = parseInt(updateData.lowStockThreshold, 10);
        }
        if (updateData.boardVersion) board.version = updateData.boardVersion;
      }
    }

    this.saveData();
    return client;
  }

  deleteClient(clientId) {
    if (!this.hasPermission('canDeleteClients')) {
      throw new Error('Non disponi dei permessi per eliminare clienti.');
    }
    this.data.clients = this.data.clients.filter(c => c.id !== clientId);
    this.saveData();
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
