export const PDF_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:  #1a3a6b;
    --blue:  #2558a8;
    --sky:   #e8f4fd;
    --gold:  #f5a623;
    --gold2: #ffd166;
    --green: #27ae60;
    --red:   #e74c3c;
    --teal:  #16a085;
    --purple:#8e44ad;
    --cream: #fffdf7;
    --bg:    #eef6ff;
  }

  body {
    font-family: 'Nunito', sans-serif;
    background: white;
    color: #222;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ===== СЛАЙД-ОБЁРТКА ===== */
  .slide {
    width: 210mm;
    min-height: 148mm;
    padding: 12mm 14mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .slide:last-child { page-break-after: avoid; }

  .slide::before {
    content: "";
    position: absolute;
    width: 80mm; height: 80mm;
    border-radius: 50%;
    background: rgba(37,88,168,0.06);
    top: -25mm; right: -20mm;
    pointer-events: none;
  }
  .slide::after {
    content: "";
    position: absolute;
    width: 50mm; height: 50mm;
    border-radius: 50%;
    background: rgba(245,166,35,0.07);
    bottom: -15mm; left: -15mm;
    pointer-events: none;
  }

  /* ===== ШАПКА СЛАЙДА ===== */
  .slide-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7mm;
    padding-bottom: 3.5mm;
    border-bottom: 3px solid var(--gold2);
    position: relative; z-index: 1;
  }
  .slide-num {
    background: var(--navy);
    color: white;
    font-size: 8pt;
    font-weight: 800;
    padding: 2px 9px;
    border-radius: 12px;
    letter-spacing: 0.04em;
  }
  .slide-label {
    font-size: 8.5pt;
    color: var(--blue);
    font-weight: 700;
    opacity: 0.6;
  }

  /* ===== СЛАЙД 1: ТИТУЛ ===== */
  .title-slide {
    background: linear-gradient(135deg, #1a3a6b 0%, #2558a8 60%, #1e90d4 100%);
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .title-slide::before { background: rgba(255,255,255,0.06); }
  .title-slide::after  { background: rgba(255,209,102,0.1); }

  .title-stars { font-size: 22pt; margin-bottom: 4mm; letter-spacing: 3mm; }
  .title-badge {
    display: inline-block;
    background: rgba(255,209,102,0.25);
    border: 2px solid rgba(255,209,102,0.6);
    color: #ffd166;
    font-size: 9pt; font-weight: 700;
    padding: 3px 14px; border-radius: 20px;
    margin-bottom: 5mm;
  }
  .title-slide h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40pt; font-weight: 700;
    color: white; line-height: 1.1;
    margin-bottom: 3mm;
  }
  .title-slide h1 span { color: #ffd166; }
  .title-slide h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24pt; font-weight: 600;
    color: rgba(255,255,255,0.9);
    margin-bottom: 6mm;
  }
  .gold-line {
    width: 35mm; height: 3px;
    background: linear-gradient(90deg, transparent, #ffd166, transparent);
    margin: 0 auto 6mm;
    border-radius: 2px;
  }
  .title-slide p {
    font-size: 10.5pt; line-height: 1.7;
    color: rgba(255,255,255,0.8);
    max-width: 120mm; margin: 0 auto 8mm;
  }
  .title-chips {
    display: flex; gap: 5mm;
    justify-content: center; flex-wrap: wrap;
  }
  .title-chips span {
    background: rgba(255,255,255,0.15);
    border: 1.5px solid rgba(255,255,255,0.3);
    color: white; font-size: 9pt; font-weight: 700;
    padding: 3px 10px; border-radius: 14px;
  }

  /* ===== СЛАЙД 2: ЦЕЛИ ===== */
  .goals-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5mm; flex: 1; position: relative; z-index: 1;
  }
  .goal-main {
    background: white;
    border: 3px solid var(--gold2);
    border-radius: 12px; padding: 6mm;
  }
  .goal-icon { font-size: 24pt; margin-bottom: 3mm; display: block; }
  .goal-main h3 {
    font-size: 16pt; color: var(--navy);
    margin-bottom: 3mm;
    font-family: 'Cormorant Garamond', serif;
  }
  .goal-main p { font-size: 9.5pt; color: #444; line-height: 1.6; }
  .tasks-col { display: flex; flex-direction: column; gap: 3mm; }
  .task-card {
    background: white; border-radius: 10px;
    padding: 4mm 5mm;
    display: flex; align-items: flex-start; gap: 3mm;
  }
  .task-card.t-blue  { border-left: 5px solid var(--blue); }
  .task-card.t-gold  { border-left: 5px solid var(--gold); }
  .task-card.t-teal  { border-left: 5px solid var(--teal); }
  .task-emo { font-size: 16pt; line-height: 1; }
  .task-card b { font-size: 8.5pt; display: block; margin-bottom: 1mm; }
  .task-card p { font-size: 8.5pt; color: #555; line-height: 1.5; }

  /* ===== СЛАЙД 3: РЕЗУЛЬТАТЫ ===== */
  .results-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 4mm; position: relative; z-index: 1;
  }
  .res-card {
    background: white; border-radius: 12px;
    padding: 5mm; text-align: center;
    border: 2px solid transparent;
  }
  .res-card:nth-child(1) { border-color: #e74c3c22; }
  .res-card:nth-child(2) { border-color: #f5a62322; }
  .res-card:nth-child(3) { border-color: #27ae6022; }
  .res-card:nth-child(4) { border-color: #2558a822; }
  .res-card:nth-child(5) { border-color: #8e44ad22; }
  .res-card:nth-child(6) { border-color: #16a08522; }
  .res-card .emo { font-size: 22pt; display: block; margin-bottom: 3mm; }
  .res-card h4 { font-size: 9.5pt; color: var(--navy); margin-bottom: 1.5mm; font-weight: 800; }
  .res-card p  { font-size: 8pt; color: #777; line-height: 1.5; }

  /* ===== СЛАЙД 4: ИНСТРУКЦИЯ ===== */
  .steps-col { display: flex; flex-direction: column; gap: 3.5mm; position: relative; z-index: 1; }
  .step-row {
    background: white; border-radius: 10px;
    padding: 4mm 5mm;
    display: flex; align-items: flex-start; gap: 4mm;
    box-shadow: 0 2px 8px rgba(37,88,168,0.07);
  }
  .step-circle {
    width: 10mm; height: 10mm; border-radius: 50%;
    background: linear-gradient(135deg, var(--navy), var(--blue));
    color: white; font-size: 12pt; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .step-row h4 { font-size: 10pt; color: var(--navy); margin-bottom: 1mm; font-weight: 800; }
  .step-row p  { font-size: 8.5pt; color: #555; line-height: 1.5; }

  /* ===== СЛАЙД 5: МАРШРУТ ===== */
  .route-lead { font-size: 10pt; color: #444; line-height: 1.6; margin-bottom: 6mm; position: relative; z-index: 1; }
  .route-cards { display: flex; flex-direction: column; gap: 3.5mm; position: relative; z-index: 1; }
  .route-card {
    background: white; border-radius: 12px;
    padding: 4mm 5mm;
    display: flex; align-items: center; gap: 4mm;
    border: 2px solid var(--sky);
    box-shadow: 0 2px 10px rgba(37,88,168,0.06);
  }
  .route-num {
    width: 9mm; height: 9mm; border-radius: 50%;
    background: var(--navy); color: white;
    font-size: 12pt; font-weight: 900;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .route-emo  { font-size: 20pt; flex-shrink: 0; }
  .route-info { flex: 1; }
  .route-info h4 { font-size: 11pt; color: var(--navy); font-weight: 800; margin-bottom: 1mm; }
  .route-info p  { font-size: 8pt; color: #999; }
  .route-tag {
    font-size: 7.5pt; font-weight: 700;
    padding: 2px 8px; border-radius: 10px;
    background: rgba(245,166,35,0.15);
    color: #c47d00;
    border: 1px solid rgba(245,166,35,0.4);
    flex-shrink: 0;
  }

  /* ===== СЛАЙДЫ ОСТАНОВОК ===== */
  .stop-img {
    width: 100%; height: 40mm;
    object-fit: cover; border-radius: 12px;
    margin-bottom: 5mm; position: relative; z-index: 1;
  }
  .stop-name-row {
    display: flex; align-items: center; gap: 3mm;
    margin-bottom: 4mm; position: relative; z-index: 1;
  }
  .stop-name-row .emo { font-size: 20pt; }
  .stop-name-row h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20pt; color: var(--navy);
  }
  .stop-desc {
    font-size: 9.5pt; color: #333; line-height: 1.7;
    margin-bottom: 5mm; position: relative; z-index: 1;
  }
  .facts-head {
    font-size: 11pt; color: var(--navy); font-weight: 800;
    margin-bottom: 3mm;
    display: flex; align-items: center; gap: 2mm;
    position: relative; z-index: 1;
  }
  .facts-col { display: flex; flex-direction: column; gap: 2mm; position: relative; z-index: 1; }
  .fact-row { display: flex; align-items: flex-start; gap: 3mm; }
  .fact-dot {
    width: 6mm; height: 6mm; border-radius: 50%;
    background: var(--gold); color: white;
    font-size: 7.5pt; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 0.5mm;
  }
  .fact-row p { font-size: 9pt; color: #444; line-height: 1.55; }
  .audio-box {
    margin-top: 5mm;
    padding: 3mm 5mm; border-radius: 10px;
    background: rgba(37,88,168,0.06);
    border: 2px dashed rgba(37,88,168,0.2);
    font-size: 8pt; color: #888;
    position: relative; z-index: 1;
  }

  /* ===== ИГРА 1: ПРАВДА / ЛОЖЬ ===== */
  .game-tf .game-head {
    text-align: center; margin-bottom: 5mm; position: relative; z-index: 1;
  }
  .game-tf .game-head .g-emo { font-size: 26pt; display: block; margin-bottom: 2mm; }
  .game-tf .game-head h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17pt; color: var(--navy);
  }
  .game-tf .game-head p { font-size: 9pt; color: #888; margin-top: 1.5mm; }
  .tf-list { display: flex; flex-direction: column; gap: 3mm; position: relative; z-index: 1; }
  .tf-item {
    background: white; border-radius: 10px;
    padding: 3.5mm 5mm;
    display: flex; align-items: center; gap: 4mm;
    border: 2px solid rgba(37,88,168,0.1);
  }
  .tf-num {
    width: 7mm; height: 7mm; border-radius: 50%;
    background: var(--sky); color: var(--navy);
    font-size: 9pt; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .tf-item p { font-size: 9.5pt; color: #333; flex: 1; line-height: 1.5; }
  .tf-boxes { display: flex; gap: 2mm; flex-shrink: 0; }
  .tf-box {
    width: 11mm; height: 8mm; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 8pt; font-weight: 800;
  }
  .tf-box.t { background: rgba(39,174,96,0.12); color: #27ae60; border: 2px solid rgba(39,174,96,0.3); }
  .tf-box.f { background: rgba(231,76,60,0.1); color: #e74c3c; border: 2px solid rgba(231,76,60,0.25); }
  .tf-answer { font-size: 8pt; color: var(--green); font-weight: 700; margin-top: 4mm; position: relative; z-index: 1; }

  /* ===== ИГРА 2: НАЙДИ ЛИШНЕЕ ===== */
  .game-odd .game-head {
    text-align: center; margin-bottom: 5mm; position: relative; z-index: 1;
  }
  .game-odd .game-head .g-emo { font-size: 26pt; display: block; margin-bottom: 2mm; }
  .game-odd .game-head h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17pt; color: var(--navy);
  }
  .game-odd .game-head p { font-size: 9pt; color: #888; margin-top: 1.5mm; }
  .odd-sets { display: flex; flex-direction: column; gap: 5mm; position: relative; z-index: 1; }
  .odd-set { background: white; border-radius: 12px; padding: 4mm 5mm; }
  .odd-set p { font-size: 9pt; color: #777; margin-bottom: 3mm; font-weight: 700; }
  .odd-chips { display: flex; gap: 2.5mm; flex-wrap: wrap; margin-bottom: 3mm; }
  .odd-chip {
    padding: 2.5mm 5mm; border-radius: 20px;
    font-size: 9pt; font-weight: 700; color: var(--navy);
    background: var(--sky);
    border: 2px solid rgba(37,88,168,0.15);
  }
  .odd-chip.wrong {
    background: rgba(231,76,60,0.1);
    color: #e74c3c;
    border-color: rgba(231,76,60,0.3);
    text-decoration: line-through;
  }
  .odd-ans { font-size: 8pt; color: #888; font-style: italic; }
  .odd-ans strong { color: var(--red); }

  /* ===== ИГРА 3: ВСТАВЬ СЛОВО ===== */
  .game-fill .game-head {
    text-align: center; margin-bottom: 5mm; position: relative; z-index: 1;
  }
  .game-fill .game-head .g-emo { font-size: 26pt; display: block; margin-bottom: 2mm; }
  .game-fill .game-head h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17pt; color: var(--navy);
  }
  .game-fill .game-head p { font-size: 9pt; color: #888; margin-top: 1.5mm; }
  .word-bank {
    display: flex; gap: 2.5mm; flex-wrap: wrap;
    justify-content: center; margin-bottom: 6mm;
    position: relative; z-index: 1;
  }
  .word-chip {
    padding: 2.5mm 6mm; border-radius: 20px;
    background: var(--gold2); color: var(--navy);
    font-size: 10pt; font-weight: 800;
    border: 2px solid rgba(245,166,35,0.4);
  }
  .fill-list { display: flex; flex-direction: column; gap: 3.5mm; position: relative; z-index: 1; }
  .fill-item {
    background: white; border-radius: 10px;
    padding: 3.5mm 5mm;
    display: flex; align-items: flex-start; gap: 3mm;
    border-left: 5px solid var(--blue);
  }
  .fill-n {
    width: 7mm; height: 7mm; border-radius: 50%;
    background: var(--blue); color: white;
    font-size: 8.5pt; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .fill-item p { font-size: 9.5pt; color: #333; line-height: 1.6; flex: 1; }
  .fill-item p em {
    display: inline-block;
    min-width: 22mm; border-bottom: 2px solid var(--blue);
    font-style: normal; color: var(--blue); font-weight: 800;
  }
  .fill-answers { margin-top: 4mm; font-size: 8pt; color: #888; font-style: italic; position: relative; z-index: 1; }

  /* ===== QR-СЛАЙД ===== */
  .qr-slide {
    background: linear-gradient(135deg, #1a3a6b 0%, #2558a8 100%);
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .qr-slide::before { background: rgba(255,255,255,0.05); }
  .qr-slide::after  { background: rgba(255,209,102,0.08); }
  .qr-badge {
    background: rgba(255,209,102,0.2);
    border: 2px solid rgba(255,209,102,0.5);
    color: #ffd166; font-size: 9pt; font-weight: 800;
    padding: 3px 14px; border-radius: 20px;
    margin-bottom: 5mm; display: inline-block;
  }
  .qr-slide h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26pt; color: white; margin-bottom: 3mm;
  }
  .qr-slide .sub {
    font-size: 10pt; color: rgba(255,255,255,0.75);
    line-height: 1.6; max-width: 120mm; margin: 0 auto 7mm;
  }
  .qr-row { display: flex; align-items: center; gap: 10mm; justify-content: center; }
  .qr-img-wrap {
    background: white; border-radius: 14px;
    padding: 5mm;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .qr-img-wrap img { display: block; width: 42mm; height: 42mm; }
  .qr-tasks { text-align: left; max-width: 90mm; }
  .qr-tasks h4 { font-size: 12pt; color: #ffd166; font-weight: 800; margin-bottom: 4mm; }
  .qr-task-item { display: flex; align-items: center; gap: 3mm; margin-bottom: 3mm; }
  .qr-task-item .dot {
    width: 7mm; height: 7mm; border-radius: 50%;
    background: rgba(255,209,102,0.25);
    border: 2px solid rgba(255,209,102,0.5);
    color: #ffd166; font-size: 9pt; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .qr-task-item p { font-size: 9pt; color: rgba(255,255,255,0.85); line-height: 1.5; }
  .qr-hint { margin-top: 6mm; font-size: 8.5pt; color: rgba(255,255,255,0.5); }

  /* ===== ФИНАЛЬНЫЙ СЛАЙД ===== */
  .final-slide {
    background: linear-gradient(135deg, #1a3a6b 0%, #2558a8 100%);
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .final-slide::before { background: rgba(255,255,255,0.05); }
  .final-slide::after  { background: rgba(255,209,102,0.08); }
  .final-trophy { font-size: 42pt; display: block; margin-bottom: 5mm; }
  .final-slide h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30pt; color: white; margin-bottom: 3mm;
  }
  .final-slide .divider {
    width: 30mm; height: 3px;
    background: linear-gradient(90deg, transparent, #ffd166, transparent);
    margin: 0 auto 5mm; border-radius: 2px;
  }
  .final-slide p {
    font-size: 10pt; color: rgba(255,255,255,0.8);
    line-height: 1.7; max-width: 130mm; margin: 0 auto 7mm;
  }
  .final-box {
    background: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,209,102,0.4);
    border-radius: 14px; padding: 6mm 12mm;
    display: inline-block; min-width: 110mm;
  }
  .final-stars { font-size: 24pt; margin-bottom: 2mm; display: block; }
  .final-label { font-size: 9pt; color: rgba(255,255,255,0.7); margin-bottom: 5mm; }
  .final-stats {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 4mm; border-top: 1px solid rgba(255,209,102,0.3);
    padding-top: 4mm;
  }
  .stat-v { font-size: 18pt; font-weight: 900; color: white; font-family: 'Cormorant Garamond', serif; }
  .stat-l { font-size: 7.5pt; color: rgba(255,255,255,0.6); }

  /* ===== ПЕЧАТЬ ===== */
  @page { size: A4 landscape; margin: 0; }
  @media print {
    html, body { width: 297mm; height: 210mm; }
    .slide { width: 297mm; min-height: 210mm; padding: 14mm 18mm; }
  }
`;
