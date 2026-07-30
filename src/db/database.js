/**
 * DECONTO IoT System - Core Database & Data Storage Engine
 * Gestisce l'anagrafica clienti, parco macchine, dispositivi hardware Deconto,
 * log delle erogazioni, token OTP di ricarica e storico backup GitHub.
 */

const STORAGE_KEY = 'DECONTO_DB_V1';

// Dati iniziali di seed per la demo
const initialData = {
  users: [
    { id: 'usr_admin', name: 'Marco Rossi (Admin)', email: 'admin@deconto.it', role: 'ADMIN', avatar: '👨‍💼' },
    { id: 'usr_ufficio', name: 'Laura Bianchi (Ufficio)', email: 'ufficio@deconto.it', role: 'UFFICIO', avatar: '👩‍💻' },
    { id: 'usr_adr_1', name: 'Giuseppe Verdi (ADR Zona Nord)', email: 'adr.nord@deconto.it', role: 'ADR', avatar: '🚚' },
    { id: 'usr_adr_2', name: 'Antonio Neri (ADR Zona Sud)', email: 'adr.sud@deconto.it', role: 'ADR', avatar: '🚚' }
  ],
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
      lastSyncDate: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'board_5510',
      shortCode: '5510',
      hwSerial: 'DC-HW-9910',
      macAddress: 'C6:3F:8A:33:55:10',
      machineId: 'mc_3',
      version: 'BASIC',
      remainingCredits: 12, // In sottoscorta (< 20)
      lowStockThreshold: 20,
      relayStatus: 'CLOSED_OK',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: false,
      lastSyncDate: new Date(Date.now() - 86400000 * 12).toISOString()
    },
    {
      id: 'board_9901',
      shortCode: '9901',
      hwSerial: 'DC-HW-4401',
      macAddress: 'C6:3F:8A:44:99:01',
      machineId: 'mc_4',
      version: 'BASIC',
      remainingCredits: 0, // Credito Esaurito! Relè Aperto
      lowStockThreshold: 20,
      relayStatus: 'OPEN_LOCKED',
      firmwareVersion: 'v2.1.0-ESP32-C6',
      isOnlineWifi: true,
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
      operatorId: 'usr_adr_1',
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
    { id: 'log_1', boardId: 'board_3467', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), durationSeconds: 22, groupId: 1 },
    { id: 'log_2', boardId: 'board_3467', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), durationSeconds: 21, groupId: 1 },
    { id: 'log_3', boardId: 'board_5510', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), durationSeconds: 38, groupId: 1 }, // Durata anomala (calcare)
    { id: 'log_4', boardId: 'board_1289', timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), durationSeconds: 20, groupId: 1 },
    { id: 'log_5', boardId: 'board_1289', timestamp: new Date(Date.now() - 3600000 * 11).toISOString(), durationSeconds: 23, groupId: 2 }
  ],
  backupLogs: [
    {
      id: 'bak_001',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      repo: 'deconto-org/deconto-db-backups',
      commitHash: 'a1b2c3d4e5',
      status: 'SUCCESS',
      recordCount: 28
    }
  ]
};

class DecontoDatabase {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Impossibile caricare da localStorage, uso dati di default:', e);
    }
    this.saveData(initialData);
    return initialData;
  }

  saveData(data) {
    this.data = data || this.data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Errore nel salvataggio localStorage:', e);
    }
  }

  // --- QUERY E METODI ---

  getUsers() { return this.data.users; }
  getClients() { return this.data.clients; }
  getMachines() { return this.data.machines; }
  getBoards() { return this.data.decontoBoards; }
  getRefillLogs() { return this.data.refillLogs; }
  getCoffeeLogs() { return this.data.coffeeLogs; }
  getBackupLogs() { return this.data.backupLogs; }

  // Ottiene tutte le informazioni associate ad una scheda Deconto
  getBoardFullDetails(shortCodeOrId) {
    const board = this.data.decontoBoards.find(b => b.shortCode === shortCodeOrId || b.id === shortCodeOrId);
    if (!board) return null;

    const machine = this.data.machines.find(m => m.id === board.machineId);
    const client = machine ? this.data.clients.find(c => c.id === machine.clientId) : null;
    const refills = this.data.refillLogs.filter(r => r.boardId === board.id);
    const coffees = this.data.coffeeLogs.filter(c => c.boardId === board.id);

    return {
      board,
      machine,
      client,
      refills,
      coffees
    };
  }

  // Aggiunge o aggiorna un cliente
  saveClient(client) {
    const existingIndex = this.data.clients.findIndex(c => c.id === client.id);
    if (existingIndex >= 0) {
      this.data.clients[existingIndex] = { ...this.data.clients[existingIndex], ...client };
    } else {
      const newClient = { ...client, id: 'cli_' + Date.now() };
      this.data.clients.push(newClient);
    }
    this.saveData();
  }

  // Esegue una ricarica crediti (ADR, Fai-da-te OTP o Cloud Ufficio)
  performRefill({ boardShortCode, credits, method, operatorId, tokenOtp }) {
    const board = this.data.decontoBoards.find(b => b.shortCode === boardShortCode);
    if (!board) {
      throw new Error(`Scheda Deconto con codice ${boardShortCode} non trovata.`);
    }

    // Incrementa crediti e riabilita il relè se era in blocco
    board.remainingCredits += credits;
    board.relayStatus = 'CLOSED_OK';
    board.lastSyncDate = new Date().toISOString();

    // Registra log di ricarica
    const newRefillLog = {
      id: 'ref_' + Date.now(),
      boardId: board.id,
      shortCode: board.shortCode,
      creditsAdded: credits,
      tokenOtp: tokenOtp || `OTP-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      operatorType: method === 'WHATSAPP_OTP_BLE' ? 'CLIENT_DIY' : (method === 'CLOUD_DIRECT' ? 'OFFICE' : 'ADR'),
      operatorId: operatorId || 'usr_ufficio',
      timestamp: new Date().toISOString(),
      method
    };

    this.data.refillLogs.unshift(newRefillLog);
    this.saveData();
    return { board, newRefillLog };
  }

  // Simulazione di erogazione di un caffè da parte dell'hardware
  registerCoffeeExtraction(boardShortCode, durationSeconds = 22, groupId = 1) {
    const board = this.data.decontoBoards.find(b => b.shortCode === boardShortCode);
    if (!board) return null;

    if (board.remainingCredits <= 0) {
      board.relayStatus = 'OPEN_LOCKED';
      this.saveData();
      return { success: false, reason: 'CREDITS_EXHAUSTED', relayStatus: 'OPEN_LOCKED' };
    }

    board.remainingCredits -= 1;
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

  // Backup Automatico su GitHub (Simulazione Cron Pipeline)
  triggerGitHubBackup() {
    const newBackup = {
      id: 'bak_' + Date.now(),
      timestamp: new Date().toISOString(),
      repo: 'deconto-org/deconto-db-backups',
      commitHash: Math.random().toString(36).substring(2, 10),
      status: 'SUCCESS',
      recordCount: this.data.clients.length + this.data.machines.length + this.data.decontoBoards.length + this.data.refillLogs.length
    };
    this.data.backupLogs.unshift(newBackup);
    this.saveData();
    return newBackup;
  }
}

export const db = new DecontoDatabase();
