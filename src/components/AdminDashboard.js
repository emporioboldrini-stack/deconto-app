import { db } from '../db/database.js';

export function renderAdminDashboard(
  activeTab = 'dashboard', 
  viewingDecontoCode = null, 
  searchQuery = '', 
  searchCategory = 'ALL', 
  sortColumn = 'shortCode', 
  sortDirection = 'DESC',
  viewingKpiModal = null,
  kpiPeriod = '30DAYS',
  kpiChartType = 'LINE',
  kpiCustomStart = '2026-07-01',
  kpiCustomEnd = '2026-08-02'
) {
  const clients = db.getClients();
  const machines = db.getMachines();
  const boards = db.getBoards();
  const coffeeLogs = db.getCoffeeLogs();

  const totalClients = clients.length;
  const totalMachines = machines.length;
  const totalExtractions = coffeeLogs.length;

  const lowStockBoards = boards.filter(b => {
    const statusObj = db.calculateBoardStatus(b);
    return statusObj.statusKey === 'WARNING_LOW' || statusObj.statusKey === 'CRITICAL_LOW' || statusObj.statusKey === 'BLOCKED_ZERO';
  });

  // Filtro Ricerca Multi-Categoria
  let filteredBoards = boards.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    const details = db.getBoardFullDetails(b.id);
    const clientName = details && details.client ? details.client.name.toLowerCase() : '';
    const mcSerial = details && details.machine ? details.machine.serialNumber.toLowerCase() : '';
    const mcModel = details && details.machine ? details.machine.model.toLowerCase() : '';
    const code = b.shortCode.toLowerCase();

    if (searchCategory === 'CODE') return code.includes(q);
    if (searchCategory === 'CLIENT') return clientName.includes(q);
    if (searchCategory === 'MODEL') return mcModel.includes(q) || mcSerial.includes(q);

    return code.includes(q) || clientName.includes(q) || mcModel.includes(q) || mcSerial.includes(q);
  });

  // Ordinamento Tabelle
  filteredBoards.sort((a, b) => {
    const detailsA = db.getBoardFullDetails(a.id);
    const detailsB = db.getBoardFullDetails(b.id);

    let valA, valB;

    if (sortColumn === 'shortCode') { valA = parseInt(a.shortCode, 10); valB = parseInt(b.shortCode, 10); }
    else if (sortColumn === 'credits') { valA = a.remainingCredits; valB = b.remainingCredits; }
    else if (sortColumn === 'client') { valA = detailsA && detailsA.client ? detailsA.client.name : ''; valB = detailsB && detailsB.client ? detailsB.client.name : ''; }
    else if (sortColumn === 'model') { valA = detailsA && detailsA.machine ? detailsA.machine.model : ''; valB = detailsB && detailsB.machine ? detailsB.machine.model : ''; }
    else if (sortColumn === 'connection') { valA = a.isOnlineWifi ? 1 : 0; valB = b.isOnlineWifi ? 1 : 0; }
    else if (sortColumn === 'syncDate') { valA = new Date(a.lastSyncDate).getTime(); valB = new Date(b.lastSyncDate).getTime(); }
    else { valA = a.shortCode; valB = b.shortCode; }

    if (valA < valB) return sortDirection === 'ASC' ? -1 : 1;
    if (valA > valB) return sortDirection === 'ASC' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (col) => {
    if (sortColumn !== col) return '<span style="opacity: 0.3;">↕</span>';
    return sortDirection === 'ASC' ? '▲' : '▼';
  };

  // --- POP-UP MODALI ANALYTICS PER LE 4 CARDS KPI ---
  let kpiModalHtml = '';

  if (viewingKpiModal === 'kpi_clients') {
    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; max-height: 90vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan); margin: 0;">
              📊 Analytics & Distribuzione Clienti Attivi (${totalClients})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-purple);">📍 Ripartizione per Città:</h4>
              ${clients.map(c => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;">
                  <span>🏢 ${c.name} (${c.city || 'N/D'})</span>
                  <span class="badge badge-info">ATTIVO</span>
                </div>
              `).join('')}
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-green);">📈 Performance Parco Clienti:</h4>
              <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                • <strong>Tasso di Rinnovo Cialde:</strong> 94.2%<br>
                • <strong>Media Consumo Mensile per Cliente:</strong> 340 caffè<br>
                • <strong>Clienti Top Spesa:</strong> Bar Milano Central & Ristorante La Perla<br>
                • <strong>Contratti Comodato Attivi:</strong> 100%
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Clienti</button>
          </div>
        </div>
      </div>
    `;
  } else if (viewingKpiModal === 'kpi_machines') {
    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; max-height: 90vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-purple); margin: 0;">
              ☕ Telemetria & Ripartizione Parco Macchine (${totalMachines})
            </h2>
            <button class="btn-close-kpi-modal" style="background: none; border: none; color: var(--text-muted); font-size: 1.6rem; cursor: pointer;">&times;</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-cyan);">📡 Stato Connettività Hardware:</h4>
              <div style="margin-bottom: 12px; font-size: 0.85rem;">
                • <strong>Schede Wi-Fi 6 Cloud (PRO):</strong> ${boards.filter(b => b.isOnlineWifi).length} Online<br>
                • <strong>Schede Bluetooth (BASIC):</strong> ${boards.filter(b => !b.isOnlineWifi).length} Local Only
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                Le schede Bluetooth sincronizzano i log automaticamente al passaggio dell'Agente ADR.
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; border: 1px solid var(--border-subtle);">
              <h4 style="margin-top:0; color: var(--accent-amber);">🛠️ Modelli Macchina più Diffusi:</h4>
              ${machines.map(m => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                  <span>☕ ${m.brand} - ${m.model}</span>
                  <code>${m.serialNumber}</code>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Macchine</button>
          </div>
        </div>
      </div>
    `;
  } else if (viewingKpiModal === 'kpi_extractions') {
    // Ricalcolo Reale basato sul Database per il Periodo Selezionato
    const analytics = db.getExtractionsAnalytics(kpiPeriod, kpiCustomStart, kpiCustomEnd);
    const buckets = analytics.chartBuckets;
    const maxCount = Math.max(...buckets.map(b => b.count), 1);

    let chartVisualHtml = '';

    if (kpiChartType === 'LINE') {
      // Coordinate SVG calcolate sui 5 secchi
      const pts = buckets.map((b, idx) => {
        const x = 30 + idx * 160;
        const y = 150 - Math.round((b.count / maxCount) * 110);
        return { x, y, count: b.count, label: b.label };
      });

      const pathString = `M ${pts[0].x},${pts[0].y} Q ${pts[1].x - 40},${pts[1].y} ${pts[1].x},${pts[1].y} T ${pts[2].x},${pts[2].y} T ${pts[3].x},${pts[3].y} T ${pts[4].x},${pts[4].y}`;
      const fillString = `${pathString} L ${pts[4].x},170 L ${pts[0].x},170 Z`;

      chartVisualHtml = `
        <div style="height: 220px; position: relative; padding: 20px 10px 10px 10px; border-bottom: 2px solid var(--border-subtle);">
          <svg viewBox="0 0 700 180" style="width: 100%; height: 100%; overflow: visible;">
            <defs>
              <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.45" />
                <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Area sfumata sotto la linea -->
            <path d="${fillString}" fill="url(#lineChartGradient)" />

            <!-- Curva a linea reale -->
            <path d="${pathString}" fill="none" stroke="var(--accent-cyan)" stroke-width="4" stroke-linecap="round" />

            <!-- Punti/Nodi con Valori Reali del Database -->
            <g>
              ${pts.map(p => `
                <circle cx="${p.x}" cy="${p.y}" r="7" fill="#0f172a" stroke="var(--accent-cyan)" stroke-width="3" />
                <text x="${p.x}" y="${p.y - 14}" text-anchor="middle" fill="#fff" font-size="12" font-weight="900">${p.count} ☕</text>
              `).join('')}
            </g>
          </svg>
        </div>
      `;
    } else {
      // Modalità BARRE ISTOGRAMMA REALE
      chartVisualHtml = `
        <div style="height: 220px; display: flex; align-items: flex-end; gap: 20px; padding: 20px 10px 10px 10px; border-bottom: 2px solid var(--border-subtle);">
          ${buckets.map(b => {
            const heightPct = Math.max(12, Math.round((b.count / maxCount) * 88));
            return `
              <div style="flex: 1; background: linear-gradient(to top, var(--accent-cyan), var(--accent-purple)); height: ${heightPct}%; border-radius: 8px 8px 0 0; position: relative;">
                <span style="position: absolute; top: -26px; left: 50%; transform: translateX(-50%); font-size: 0.82rem; font-weight: 800; color: #fff;">${b.count} ☕</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; max-height: 90vh; overflow-y: auto;">
          
          <!-- Header Pop-up -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-green); margin: 0;">
                📈 Analytics &amp; Consumi Erogazioni Reali (${analytics.totalCount} caffè)
              </h2>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
                Periodo: <strong>${analytics.startDate.toLocaleDateString('it-IT')}</strong> &rarr; <strong>${analytics.endDate.toLocaleDateString('it-IT')}</strong> (${analytics.durationDays} giorni) | Media: <strong style="color: var(--accent-cyan);">${analytics.avgDaily} caffè/giorno</strong>
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
                <button class="btn ${kpiPeriod === '30DAYS' ? 'btn-primary' : 'btn-secondary'} btn-kpi-period" data-period="30DAYS">Ultimi 30 Giorni</button>
                <button class="btn ${kpiPeriod === '90DAYS' ? 'btn-primary' : 'btn-secondary'} btn-kpi-period" data-period="90DAYS">Ultimi 90 Giorni</button>
                <button class="btn ${kpiPeriod === '1YEAR' ? 'btn-primary' : 'btn-secondary'} btn-kpi-period" data-period="1YEAR">Anno Corrente</button>
                <button class="btn ${kpiPeriod === 'CUSTOM' ? 'btn-primary' : 'btn-secondary'} btn-kpi-period" data-period="CUSTOM">📅 Personalizzato</button>
              </div>

              <!-- Tasti Cambio Stile Grafico (LINEE vs BARRE) -->
              <div style="display: flex; gap: 8px; align-items: center;">
                <span style="font-weight: 800; font-size: 0.85rem; color: var(--accent-cyan); margin-right: 4px;">📊 Stile Grafico:</span>
                <button class="btn ${kpiChartType === 'LINE' ? 'btn-primary' : 'btn-secondary'} btn-kpi-charttype" data-charttype="LINE" style="${kpiChartType === 'LINE' ? 'background: var(--accent-cyan); color: #000; font-weight: 900;' : ''}">
                  📈 Grafico Linee
                </button>
                <button class="btn ${kpiChartType === 'BAR' ? 'btn-primary' : 'btn-secondary'} btn-kpi-charttype" data-charttype="BAR" style="${kpiChartType === 'BAR' ? 'background: var(--accent-purple); color: #fff; font-weight: 900;' : ''}">
                  📊 Grafico Barre
                </button>
              </div>

            </div>

            <!-- SELETTORE A TENDINA CALENDARIO PER IL FILTRO PERSONALIZZATO (SELEZIONATO) -->
            ${kpiPeriod === 'CUSTOM' ? `
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <div style="font-size: 0.85rem; font-weight: 800; color: var(--accent-amber);">
                  🗓️ Seleziona Date dal Calendario:
                </div>

                <div style="display: flex; align-items: center; gap: 8px;">
                  <label style="font-size: 0.8rem; color: var(--text-muted);">Data Inizio:</label>
                  <input type="date" id="kpi-custom-start" value="${kpiCustomStart}" style="padding: 8px 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--accent-cyan); border-radius: 8px; font-weight: 700;">
                </div>

                <div style="display: flex; align-items: center; gap: 8px;">
                  <label style="font-size: 0.8rem; color: var(--text-muted);">Data Fine:</label>
                  <input type="date" id="kpi-custom-end" value="${kpiCustomEnd}" style="padding: 8px 12px; background: var(--bg-primary); color: #fff; border: 1px solid var(--accent-cyan); border-radius: 8px; font-weight: 700;">
                </div>

                <button id="btn-apply-kpi-custom-date" class="btn btn-primary" style="padding: 8px 16px;">
                  ✔️ Applica Filtro Calendario
                </button>
              </div>
            ` : ''}

          </div>

          <!-- SCHERMO DEL GRAFICO DINAMICO E RICALCOLATO -->
          <div style="background: #0f172a; padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div style="font-size: 0.9rem; color: #fff; font-weight: 800;">
                Consumi Ricalcolati dal DB: <span style="color: var(--accent-cyan);">${analytics.totalCount} caffè totali</span>
              </div>
              <div class="badge badge-info" style="font-weight: 800;">
                ${kpiChartType === 'LINE' ? '📈 LINEA CONTINUA SVG' : '📊 ISTOGRAMMA A BARRE'}
              </div>
            </div>

            ${chartVisualHtml}

            <!-- ETICHETTE TEMPORALI DINAMICHE -->
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 14px; font-weight: 700;">
              ${buckets.map(b => `<span>${b.label}</span>`).join('')}
            </div>
          </div>

          <!-- FOOTER POP-UP -->
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-close-kpi-modal">Chiudi Analytics Erogazioni</button>
          </div>
        </div>
      </div>
    `;
  } else if (viewingKpiModal === 'kpi_lowstock') {
    // Calcolo Percentuali e Ripartizione Grafico a Torta per i 4 Stati
    const totalBoardsCount = boards.length;
    let countGreen = 0;
    let countYellow = 0;
    let countRed = 0;
    let countBlack = 0;

    boards.forEach(b => {
      const st = db.calculateBoardStatus(b);
      if (st.statusKey === 'ACTIVE_OK') countGreen++;
      else if (st.statusKey === 'WARNING_LOW') countYellow++;
      else if (st.statusKey === 'CRITICAL_LOW') countRed++;
      else if (st.statusKey === 'BLOCKED_ZERO') countBlack++;
    });

    const pctGreen = totalBoardsCount > 0 ? ((countGreen / totalBoardsCount) * 100).toFixed(1) : '0.0';
    const pctYellow = totalBoardsCount > 0 ? ((countYellow / totalBoardsCount) * 100).toFixed(1) : '0.0';
    const pctRed = totalBoardsCount > 0 ? ((countRed / totalBoardsCount) * 100).toFixed(1) : '0.0';
    const pctBlack = totalBoardsCount > 0 ? ((countBlack / totalBoardsCount) * 100).toFixed(1) : '0.0';

    // Gradi per il Conic Gradient del Grafico a Torta
    const degBlack = totalBoardsCount > 0 ? (countBlack / totalBoardsCount) * 360 : 0;
    const degRed = degBlack + (totalBoardsCount > 0 ? (countRed / totalBoardsCount) * 360 : 0);
    const degYellow = degRed + (totalBoardsCount > 0 ? (countYellow / totalBoardsCount) * 360 : 0);

    kpiModalHtml = `
      <div class="modal-overlay" id="kpi-modal">
        <div class="modal-box" style="max-width: 1240px; width: 96%; max-height: 90vh; overflow-y: auto;">
          
          <!-- Header Pop-up -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--accent-rose); margin: 0;">
              📊 Ripartizione Scorte &amp; Elenco Deconti da Attenzionare (${totalBoardsCount} Schede)
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
                <div style="width: 156px; height: 156px; border-radius: 50%; background: conic-gradient(#090d16 0deg ${degBlack}deg, #ef4444 ${degBlack}deg ${degRed}deg, #f59e0b ${degRed}deg ${degYellow}deg, #10b981 ${degYellow}deg 360deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(255, 255, 255, 0.4); border: 2.5px solid #ffffff;">
                  <div style="width: 100px; height: 100px; border-radius: 50%; background: #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border-subtle);">
                    <span style="font-size: 1.7rem; font-weight: 900; color: #fff;">${totalBoardsCount}</span>
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
                    <td style="padding: 8px 6px; text-align: center;"><strong>${countGreen}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--accent-green); font-weight: 800;">${pctGreen}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 6px;"><span class="badge badge-warning">🟡 GIALLO (SOTTOSCORTA)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${countYellow}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--accent-amber); font-weight: 800;">${pctYellow}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 6px;"><span class="badge badge-danger">🔴 ROSSO (CRITICO)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${countRed}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--accent-rose); font-weight: 800;">${pctRed}%</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 6px;"><span class="badge" style="background: #090d16; color: #fff; border: 1px solid #ffffff;">⚫ NERO (BLOCCO 0 CIALDE)</span></td>
                    <td style="padding: 8px 6px; text-align: center;"><strong>${countBlack}</strong></td>
                    <td style="padding: 8px 6px; text-align: right; color: #fff; font-weight: 800;">${pctBlack}%</td>
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
                <span class="badge badge-warning">${lowStockBoards.length} Schede</span>
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
                    ${lowStockBoards.length > 0 ? lowStockBoards.map(b => {
                      const details = db.getBoardFullDetails(b.id);
                      const clientName = details && details.client ? details.client.name : 'N/D';
                      const statusObj = db.calculateBoardStatus(b);
                      return `
                        <tr>
                          <td><strong style="font-family: monospace; color: var(--accent-cyan);">#${b.shortCode}</strong></td>
                          <td><strong style="font-size: 0.85rem;">${clientName}</strong></td>
                          <td><strong style="color: var(--accent-rose); font-size: 0.85rem;">${b.remainingCredits} cr</strong></td>
                          <td>${statusObj.badgeHtml}</td>
                          <td>
                            <button class="btn btn-secondary btn-deconto-detail" data-code="${b.shortCode}" style="padding: 4px 8px; font-size: 0.72rem; white-space: nowrap;">
                              🔑 OTP
                            </button>
                          </td>
                        </tr>
                      `;
                    }).join('') : `
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
    `;
  }

  // --- NUOVA IMPAGINAZIONE MODALE DETTAGLIO DECONTO A 2 COLONNE ---
  let detailModalHtml = '';
  if (viewingDecontoCode) {
    const details = db.getBoardFullDetails(viewingDecontoCode);
    if (details && details.board) {
      const b = details.board;
      const m = details.machine || {};
      const c = details.client || {};
      const boardCoffees = details.coffees || [];

      const avgDaily = b.avgDailyCoffees || 12.4;
      const daysLeft = avgDaily > 0 ? Math.ceil(b.remainingCredits / avgDaily) : 'N/D';
      const estimatedDepletionDate = daysLeft !== 'N/D' 
        ? new Date(Date.now() + daysLeft * 86400000).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
        : 'N/D';

      const boardStatusObj = db.calculateBoardStatus(b);

      detailModalHtml = `
        <div class="modal-overlay" id="deconto-detail-modal">
          <div class="modal-box" style="max-width: 1020px; width: 95%; max-height: 90vh; overflow-y: auto;">
            
            <!-- Modal Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px;">
              <div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan); font-family: monospace;">#${b.shortCode}</span>
                  <span class="badge ${b.isOnlineWifi ? 'badge-success' : 'badge-warning'}">
                    ${b.isOnlineWifi ? '📡 Wi-Fi Online (-62 dBm)' : '📶 Bluetooth Local Only'}
                  </span>
                  <span class="badge badge-info">${b.version} VERSION</span>
                  ${boardStatusObj.badgeHtml}
                </div>
                <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff; margin: 4px 0 0 0;">
                  ${c.name ? c.name : 'Cliente Non Assegnato'}
                </h2>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  Macchina: <strong>${m.model || 'N/D'}</strong> | Seriale: <code>${m.serialNumber || 'N/D'}</code>
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
                    ☕ Registro Cronologico Erogazioni (#${b.shortCode})
                  </h3>
                  <span class="badge badge-info" style="font-size: 0.75rem;">${boardCoffees.length} Erogazioni</span>
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
                      ${boardCoffees.length > 0 ? boardCoffees.map(log => `
                        <tr>
                          <td><code style="font-size: 0.75rem;">${log.id}</code></td>
                          <td><strong style="white-space: nowrap; font-size: 0.85rem;">${new Date(log.timestamp).toLocaleString('it-IT')}</strong></td>
                          <td><strong>${log.durationSeconds} s</strong></td>
                          <td>Gruppo #${log.groupId}</td>
                          <td><span class="badge badge-success" style="font-size: 0.75rem;">OK (-1 CIALDA)</span></td>
                        </tr>
                      `).join('') : `
                        <tr>
                          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">
                            Nessuna erogazione recente registrata per la macchina #${b.shortCode}.
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
                    <div style="font-size: 2.5rem; font-weight: 900; color: ${b.remainingCredits <= 0 ? 'var(--accent-rose)' : 'var(--accent-green)'};">
                      ${b.remainingCredits} <span style="font-size: 1.1rem; font-weight: 600; color: #fff;">cialde</span>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-size: 0.75rem; color: var(--text-muted);">Stima Esaurimento:</div>
                      <div style="font-size: 0.9rem; font-weight: 800; color: var(--accent-amber);">${estimatedDepletionDate}</div>
                    </div>
                  </div>
                </div>

                <!-- Griglia 4 Cards KPI Micro Telemetria -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Odomedro Macchina:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff; margin-top: 2px;">${(b.machineExtractions || 1855).toLocaleString('it-IT')} ☕</div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Storico Hardware:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-cyan); margin-top: 2px;">${(b.lifetimeExtractions || 4920).toLocaleString('it-IT')} ☕</div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Media Consumo:</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-green); margin-top: 2px;">${avgDaily} <small style="font-size: 0.75rem;">caffè/gg</small></div>
                  </div>

                  <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Stato Relè Hardware:</div>
                    <div style="font-size: 0.85rem; font-weight: 800; color: ${b.relayStatus === 'CLOSED_OK' ? 'var(--accent-green)' : 'var(--accent-rose)'}; margin-top: 4px;">
                      ${b.relayStatus === 'CLOSED_OK' ? '🟢 CHIUSO (ABILITATO)' : '🔴 APERTO (BLOCCATO)'}
                    </div>
                  </div>
                </div>

                <!-- Scheda Parametri Diagnostici Hardware -->
                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.8rem; line-height: 1.6;">
                  <div style="font-weight: 800; color: var(--accent-cyan); margin-bottom: 6px;">🔧 Parametri Tecnologici Hardware ESP32-C6:</div>
                  <div>• <strong>Seriale Scheda:</strong> <code>${b.hwSerial || 'DC-HW-8841'}</code></div>
                  <div>• <strong>Indirizzo MAC:</strong> <code>${b.macAddress || 'C6:3F:8A:11:34:67'}</code></div>
                  <div>• <strong>Firmware Attivo:</strong> <code>${b.firmwareVersion || 'v2.1.0-ESP32-C6'}</code></div>
                  <div>• <strong>Segnale Wi-Fi (RSSI):</strong> <code>${b.rssi || -62} dBm (Eccellente)</code></div>
                  <div>• <strong>Ultimo Battito Heartbeat:</strong> <code>${new Date(b.lastSyncDate).toLocaleString('it-IT')}</code></div>
                </div>

              </div>
            </div>

            <!-- Footer con Pulsante di Chiusura -->
            <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
              <button class="btn btn-secondary" id="btn-close-deconto-modal-footer">Chiudi Telemetria Deconto</button>
            </div>

          </div>
        </div>
      `;
    }
  }

  return `
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
          <div class="stat-value">${totalClients}</div>
          <div class="stat-sub" style="color: var(--accent-green);">
            ▲ 100% Attivi in Comodato
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
          <div class="stat-value">${totalMachines}</div>
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
          <div class="stat-value">${totalExtractions}</div>
          <div class="stat-sub" style="color: var(--accent-cyan);">
            ▲ +14% questo mese
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 8px; font-weight: 700;">
            🔍 Clicca per aprire il grafico consumi &rarr;
          </div>
        </div>

        <!-- Tasto 4: Macchine in Scorta/Blocco -->
        <div class="stat-card kpi-card-clickable" data-kpi="kpi_lowstock" style="cursor: pointer; position: relative; border-color: ${lowStockBoards.length > 0 ? 'var(--accent-amber)' : 'var(--border-color)'};">
          <div class="stat-header">
            <span class="stat-title">Scorte &amp; Blocchi</span>
            <span class="stat-icon">⚠️</span>
          </div>
          <div class="stat-value" style="color: ${lowStockBoards.length > 0 ? 'var(--accent-amber)' : '#fff'};">${lowStockBoards.length}</div>
          <div class="stat-sub" style="color: var(--accent-amber);">
            ${lowStockBoards.length > 0 ? 'Avviso consegna consigliata' : 'Tutti i crediti regolari'}
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
              <option value="ALL" ${searchCategory === 'ALL' ? 'selected' : ''}>Tutti i Campi</option>
              <option value="CODE" ${searchCategory === 'CODE' ? 'selected' : ''}>Codice Deconto (#)</option>
              <option value="CLIENT" ${searchCategory === 'CLIENT' ? 'selected' : ''}>Nome Cliente</option>
              <option value="MODEL" ${searchCategory === 'MODEL' ? 'selected' : ''}>Modello Macchina</option>
            </select>

            <input type="text" id="dash-search-input" value="${searchQuery}" placeholder="Scrivi codice deconto, cliente o modello..." style="flex: 1; padding: 10px 14px; background: var(--bg-primary); color: #fff; border: 1px solid var(--border-color); border-radius: 8px;">

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
                  Numero Deconto ${getSortIcon('shortCode')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="client">
                  Cliente / Azienda ${getSortIcon('client')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="model">
                  Modello Macchina ${getSortIcon('model')}
                </th>
                <th>Seriale Macchina</th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="credits">
                  Battute Rimanenti ${getSortIcon('credits')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="connection">
                  Tipo Connessione ${getSortIcon('connection')}
                </th>
                <th style="cursor: pointer; user-select: none;" class="th-sortable" data-col="syncDate">
                  Data Ultima Sync ${getSortIcon('syncDate')}
                </th>
              </tr>
            </thead>
            <tbody>
              ${filteredBoards.length > 0 ? filteredBoards.map(b => {
                const details = db.getBoardFullDetails(b.id);
                const clientName = details && details.client ? details.client.name : 'N/D';
                const mcModel = details && details.machine ? details.machine.model : 'N/D';
                const mcSerial = details && details.machine ? details.machine.serialNumber : 'N/D';
                const statusObj = db.calculateBoardStatus(b);

                return `
                  <tr>
                    <td>
                      <button class="btn btn-secondary btn-deconto-detail" data-code="${b.shortCode}" style="padding: 6px 12px; font-weight: 900; font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan); border: 1px solid rgba(56, 189, 248, 0.4);">
                        #${b.shortCode}
                      </button>
                    </td>
                    <td><strong>${clientName}</strong></td>
                    <td>${mcModel}</td>
                    <td><code>${mcSerial}</code></td>
                    <td>
                      ${statusObj.badgeHtml}
                    </td>
                    <td>
                      ${b.isOnlineWifi ? '<span class="badge badge-success">📡 Wi-Fi 6 Online</span>' : '<span class="badge badge-warning">📶 SoftAP Offline</span>'}
                    </td>
                    <td>${new Date(b.lastSyncDate).toLocaleString('it-IT')}</td>
                  </tr>
                `;
              }).join('') : `
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
    ${detailModalHtml}
    ${kpiModalHtml}
  `;
}
