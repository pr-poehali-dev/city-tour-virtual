import { STOPS, QUIZ_QUESTIONS, MATCH_PAIRS } from "./types";

// QR-код через бесплатный API (ссылка на интерактивные задания)
const QR_URL = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://learningapps.org/search.php%3Fs%3D%25D0%25A1%25D0%25B0%25D0%25BD%25D0%25BA%25D1%2582-%25D0%259F%25D0%25B5%25D1%2582%25D0%25B5%25D1%2580%25D0%25B1%25D1%2583%25D1%2580%25D0%25B3&format=png";

export function printPdf() {
  const win = window.open("", "_blank");
  if (!win) return;

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"/>
  <title>Виртуальная экскурсия — Санкт-Петербург</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Cormorant+Garamond:wght@600;700&display=swap" rel="stylesheet">
  <style>
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

    /* Декоративные кружки на фоне */
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
    .tf-boxes {
      display: flex; gap: 2mm; flex-shrink: 0;
    }
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
    .qr-row {
      display: flex; align-items: center; gap: 10mm;
      justify-content: center;
    }
    .qr-img-wrap {
      background: white; border-radius: 14px;
      padding: 5mm;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .qr-img-wrap img { display: block; width: 42mm; height: 42mm; }
    .qr-tasks {
      text-align: left;
      max-width: 90mm;
    }
    .qr-tasks h4 {
      font-size: 12pt; color: #ffd166; font-weight: 800;
      margin-bottom: 4mm;
    }
    .qr-task-item {
      display: flex; align-items: center; gap: 3mm;
      margin-bottom: 3mm;
    }
    .qr-task-item .dot {
      width: 7mm; height: 7mm; border-radius: 50%;
      background: rgba(255,209,102,0.25);
      border: 2px solid rgba(255,209,102,0.5);
      color: #ffd166; font-size: 9pt; font-weight: 800;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .qr-task-item p { font-size: 9pt; color: rgba(255,255,255,0.85); line-height: 1.5; }
    .qr-hint {
      margin-top: 6mm; font-size: 8.5pt;
      color: rgba(255,255,255,0.5);
    }

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
    @page {
      size: A4 landscape;
      margin: 0;
    }
    @media print {
      html, body { width: 297mm; height: 210mm; }
      .slide { width: 297mm; min-height: 210mm; padding: 14mm 18mm; }
    }
  </style>
</head>
<body>

<!-- ══════════════ СЛАЙД 1: ТИТУЛ ══════════════ -->
<div class="slide title-slide">
  <div class="title-stars">🏛️ 🌉 🗺️</div>
  <div class="title-badge">★ Город-герой · Основан в 1703 году</div>
  <h1>Виртуальная<br><span>экскурсия</span></h1>
  <h2>Санкт-Петербург</h2>
  <div class="gold-line"></div>
  <p>Путешествуй по Северной столице России — открывай тайны дворцов, крепостей и знаменитых улиц!</p>
  <div class="title-chips">
    <span>📍 4 остановки</span>
    <span>🎮 Игровые задания</span>
    <span>🔊 Аудиогид</span>
    <span>🏆 Очки за знания</span>
  </div>
</div>

<!-- ══════════════ СЛАЙД 2: ЦЕЛИ ══════════════ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 2</span>
    <span class="slide-label">🎯 Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-family:'Cormorant Garamond',serif; font-size:22pt; color:var(--navy); margin-bottom:6mm; position:relative; z-index:1;">Цель и задачи экскурсии</h2>
  <div class="goals-grid">
    <div class="goal-main">
      <span class="goal-icon">🎯</span>
      <h3>Цель</h3>
      <p>Познакомить учащихся с историческими памятниками и культурным наследием Санкт-Петербурга — города-героя, внёсшего огромный вклад в историю России.</p>
    </div>
    <div class="tasks-col">
      <div class="task-card t-blue">
        <span class="task-emo">📖</span>
        <div><b style="color:var(--blue)">Образовательная задача</b><p>Формировать знания об основных достопримечательностях города</p></div>
      </div>
      <div class="task-card t-gold">
        <span class="task-emo">❤️</span>
        <div><b style="color:#c47d00">Воспитательная задача</b><p>Воспитывать любовь к Родине, гордость за историческое наследие</p></div>
      </div>
      <div class="task-card t-teal">
        <span class="task-emo">💡</span>
        <div><b style="color:var(--teal)">Развивающая задача</b><p>Развивать познавательный интерес, внимание и память</p></div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ СЛАЙД 3: ЛИЧНОСТНЫЕ РЕЗУЛЬТАТЫ ══════════════ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 3</span>
    <span class="slide-label">🌟 Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-family:'Cormorant Garamond',serif; font-size:22pt; color:var(--navy); margin-bottom:6mm; position:relative; z-index:1;">Личностные результаты</h2>
  <div class="results-grid">
    <div class="res-card"><span class="emo">🇷🇺</span><h4>Патриотизм</h4><p>Гражданская идентичность и любовь к Отечеству</p></div>
    <div class="res-card"><span class="emo">🏛️</span><h4>Культурное наследие</h4><p>Уважение к историческим памятникам</p></div>
    <div class="res-card"><span class="emo">🔍</span><h4>Познавательный интерес</h4><p>Стремление узнавать новое об истории</p></div>
    <div class="res-card"><span class="emo">🤝</span><h4>Сотрудничество</h4><p>Готовность работать в команде</p></div>
    <div class="res-card"><span class="emo">💡</span><h4>Творческое мышление</h4><p>Умение анализировать и делать выводы</p></div>
    <div class="res-card"><span class="emo">🌟</span><h4>Самооценка</h4><p>Осознание своих знаний и желание их расширять</p></div>
  </div>
</div>

<!-- ══════════════ СЛАЙД 4: ИНСТРУКЦИЯ ══════════════ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 4</span>
    <span class="slide-label">📋 Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-family:'Cormorant Garamond',serif; font-size:22pt; color:var(--navy); margin-bottom:6mm; position:relative; z-index:1;">Инструкция для учеников</h2>
  <div class="steps-col">
    <div class="step-row"><div class="step-circle">1</div><div><h4>Изучи карту маршрута</h4><p>На карте отмечены все остановки. Нажми на любую точку, чтобы перейти к ней.</p></div></div>
    <div class="step-row"><div class="step-circle">2</div><div><h4>Слушай аудиогид 🎧</h4><p>На каждой остановке нажми ▶ чтобы услышать интересный рассказ.</p></div></div>
    <div class="step-row"><div class="step-circle">3</div><div><h4>Читай факты 📚</h4><p>После рассказа прочитай удивительные факты — они помогут в заданиях!</p></div></div>
    <div class="step-row"><div class="step-circle">4</div><div><h4>Выполняй игровые задания 🎮</h4><p>Правда или ложь? Найди лишнее! Вставь слово! За каждый ответ — очки.</p></div></div>
    <div class="step-row"><div class="step-circle">5</div><div><h4>Сканируй QR-код в конце 📱</h4><p>В финале тебя ждут дополнительные задания — отсканируй код и играй!</p></div></div>
  </div>
</div>

<!-- ══════════════ СЛАЙД 5: МАРШРУТНЫЙ ЛИСТ ══════════════ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 5</span>
    <span class="slide-label">🗺️ Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-family:'Cormorant Garamond',serif; font-size:22pt; color:var(--navy); margin-bottom:4mm; position:relative; z-index:1;">Маршрутный лист</h2>
  <p class="route-lead">Наш маршрут проходит по четырём знаковым местам Санкт-Петербурга. На каждой остановке — рассказ, факты и игровое задание!</p>
  <div class="route-cards">
    ${STOPS.map((stop, i) => `
    <div class="route-card">
      <div class="route-num">${i + 1}</div>
      <div class="route-emo">${stop.emoji}</div>
      <div class="route-info">
        <h4>${stop.name}</h4>
        <p>${stop.hasGame ? "🎮 Игровое задание после остановки" : "📖 Информационная остановка"}</p>
      </div>
      ${stop.hasGame ? `<span class="route-tag">Игра</span>` : ""}
    </div>`).join("")}
  </div>
</div>

${STOPS.map((stop, si) => {
  const slideInfoNum = 6 + si * 2;
  const slideGameNum = 7 + si * 2;

  // Данные для игр
  const tfData: Record<number, { statements: {text: string; answer: boolean}[] }> = {
    1: { statements: [
      { text: "Петропавловская крепость основана в 1703 году", answer: true },
      { text: "Петропавловский собор — самое высокое здание Петербурга 18 века", answer: true },
      { text: "Золотой шпиль собора достигает высоты 200 метров", answer: false },
      { text: "В Петропавловском соборе покоятся российские императоры", answer: true },
    ]},
    3: { statements: [
      { text: "Эрмитаж основала Екатерина II в 1764 году", answer: true },
      { text: "В Эрмитаже хранится более 10 миллионов экспонатов", answer: false },
      { text: "Зимний дворец был резиденцией российских императоров", answer: true },
      { text: "Чтобы осмотреть все экспонаты Эрмитажа, нужно пройти 24 км", answer: true },
    ]},
    4: { statements: [
      { text: "Длина Невского проспекта — 4,5 километра", answer: true },
      { text: "Казанский собор строился 5 лет", answer: false },
      { text: "Невский проспект заложен при Петре I", answer: true },
      { text: "На проспекте расположены 5 соборов разных конфессий", answer: true },
    ]},
  };

  const oddData: Record<number, { sets: {q: string; items: string[]; odd: number}[] }> = {
    1: { sets: [
      { q: "Что лишнее? (не относится к Петропавловской крепости)", items: ["Золотой шпиль", "Медный всадник", "Петропавловский собор", "Нева"], odd: 1 },
      { q: "Что лишнее? (не связано с Петром I)", items: ["1703 год", "Основатель Петербурга", "Скульптор Фальконе", "Заложил крепость"], odd: 2 },
    ]},
    3: { sets: [
      { q: "Что лишнее? (не относится к Эрмитажу)", items: ["Зимний дворец", "Картины и скульптуры", "Медный всадник", "Екатерина II"], odd: 2 },
      { q: "Что лишнее? (не является музеем Петербурга)", items: ["Эрмитаж", "Русский музей", "Лувр", "Кунсткамера"], odd: 2 },
    ]},
    4: { sets: [
      { q: "Что лишнее? (нет на Невском проспекте)", items: ["Казанский собор", "Медный всадник", "Гостиный Двор", "Александринский театр"], odd: 1 },
      { q: "Что лишнее? (не входит в маршрут нашей экскурсии)", items: ["Петропавловская крепость", "Эрмитаж", "Кремль", "Невский проспект"], odd: 2 },
    ]},
  };

  const fillData: Record<number, { words: string[]; sentences: {text: string; answer: string}[] }> = {
    1: {
      words: ["1703", "шпиль", "императоры", "крепость"],
      sentences: [
        { text: "Петропавловская _____ основана в мае 1703 года.", answer: "крепость" },
        { text: "Золотой _____ Петропавловского собора достигает 122,5 метра.", answer: "шпиль" },
        { text: "В соборе покоятся российские _____.", answer: "императоры" },
        { text: "Дата основания города — _____ год.", answer: "1703" },
      ]
    },
    3: {
      words: ["Екатерина II", "1764", "3 миллиона", "Зимний"],
      sentences: [
        { text: "Эрмитаж основала _____ в 1764 году.", answer: "Екатерина II" },
        { text: "Год основания Эрмитажа — _____.", answer: "1764" },
        { text: "В музее хранится более _____ экспонатов.", answer: "3 миллиона" },
        { text: "Эрмитаж располагается в _____ дворце.", answer: "Зимний" },
      ]
    },
    4: {
      words: ["4,5 км", "Петре I", "1811", "5 соборов"],
      sentences: [
        { text: "Длина Невского проспекта составляет _____.", answer: "4,5 км" },
        { text: "Проспект заложили при _____.", answer: "Петре I" },
        { text: "Казанский собор был построен в _____ году.", answer: "1811" },
        { text: "На проспекте расположены _____ разных конфессий.", answer: "5 соборов" },
      ]
    },
  };

  const gameIndex = si % 3; // чередуем игры: правда/ложь, лишнее, вставь слово

  return `
<!-- ══ СЛАЙД ${slideInfoNum}: ОСТАНОВКА ${stop.id} ══ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд ${slideInfoNum} · Остановка ${stop.id}/${STOPS.length}</span>
    <span class="slide-label">${stop.emoji} Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <img class="stop-img" src="${stop.image}" alt="${stop.name}" />
  <div class="stop-name-row">
    <span class="emo">${stop.emoji}</span>
    <h2>${stop.name}</h2>
  </div>
  <p class="stop-desc">${stop.description}</p>
  ${stop.facts.length > 0 ? `
  <div class="facts-head">✦ Интересные факты</div>
  <div class="facts-col">
    ${stop.facts.map((f, fi) => `
    <div class="fact-row">
      <div class="fact-dot">${fi + 1}</div>
      <p>${f}</p>
    </div>`).join("")}
  </div>` : ""}
  <div class="audio-box">🔊 Аудиогид: на данной остановке предусмотрено профессиональное аудиосопровождение</div>
</div>

${stop.hasGame ? `
<!-- ══ СЛАЙД ${slideGameNum}: ИГРА к ОСТАНОВКЕ ${stop.id} ══ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд ${slideGameNum} · 🎮 Задание: ${stop.name}</span>
    <span class="slide-label">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>

  ${gameIndex === 0 && tfData[stop.id] ? `
  <div class="game-tf">
    <div class="game-head">
      <span class="g-emo">🤔</span>
      <h3>Правда или ложь?</h3>
      <p>Прочитай каждое утверждение и отметь: ✅ ПРАВДА или ❌ ЛОЖЬ</p>
    </div>
    <div class="tf-list">
      ${tfData[stop.id].statements.map((s, i) => `
      <div class="tf-item">
        <div class="tf-num">${i + 1}</div>
        <p>${s.text}</p>
        <div class="tf-boxes">
          <div class="tf-box t">✅</div>
          <div class="tf-box f">❌</div>
        </div>
      </div>`).join("")}
    </div>
    <div class="tf-answer">Ответы: ${tfData[stop.id].statements.map((s, i) => `${i + 1}) ${s.answer ? "✅ Правда" : "❌ Ложь"}`).join(" · ")}</div>
  </div>` : ""}

  ${gameIndex === 1 && oddData[stop.id] ? `
  <div class="game-odd">
    <div class="game-head">
      <span class="g-emo">🔎</span>
      <h3>Найди лишнее!</h3>
      <p>В каждом ряду одно слово лишнее — зачеркни его и объясни почему</p>
    </div>
    <div class="odd-sets">
      ${oddData[stop.id].sets.map((set, si2) => `
      <div class="odd-set">
        <p>Задание ${si2 + 1}: ${set.q}</p>
        <div class="odd-chips">
          ${set.items.map((item, ii) => `<span class="odd-chip${ii === set.odd ? " wrong" : ""}">${item}</span>`).join("")}
        </div>
        <div class="odd-ans">Лишнее: <strong>${set.items[set.odd]}</strong></div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${gameIndex === 2 && fillData[stop.id] ? `
  <div class="game-fill">
    <div class="game-head">
      <span class="g-emo">✍️</span>
      <h3>Вставь пропущенное слово!</h3>
      <p>Используй слова из рамки, чтобы заполнить пропуски</p>
    </div>
    <div class="word-bank">
      ${fillData[stop.id].words.map(w => `<span class="word-chip">${w}</span>`).join("")}
    </div>
    <div class="fill-list">
      ${fillData[stop.id].sentences.map((s, i) => `
      <div class="fill-item">
        <div class="fill-n">${i + 1}</div>
        <p>${s.text.replace("_____", `<em>${s.answer}</em>`)}</p>
      </div>`).join("")}
    </div>
    <div class="fill-answers">Ответы: ${fillData[stop.id].sentences.map((s, i) => `${i + 1}) ${s.answer}`).join(" · ")}</div>
  </div>` : ""}

</div>` : ""}`;
}).join("")}

<!-- ══════════════ QR-СЛАЙД ══════════════ -->
<div class="slide qr-slide">
  <div class="qr-badge">📱 Дополнительные задания</div>
  <h2>Продолжи изучать<br>Санкт-Петербург!</h2>
  <p class="sub">Отсканируй QR-код смартфоном или планшетом — тебя ждут ещё больше интересных заданий, викторин и игр по материалу экскурсии</p>
  <div class="qr-row">
    <div class="qr-img-wrap">
      <img src="${QR_URL}" alt="QR код" />
    </div>
    <div class="qr-tasks">
      <h4>Что тебя ждёт:</h4>
      <div class="qr-task-item"><div class="dot">1</div><p>Викторина по всем остановкам экскурсии</p></div>
      <div class="qr-task-item"><div class="dot">2</div><p>Кроссворд «Достопримечательности Петербурга»</p></div>
      <div class="qr-task-item"><div class="dot">3</div><p>Игра на совпадения: памятник → факт</p></div>
      <div class="qr-task-item"><div class="dot">4</div><p>Тест «Знаешь ли ты историю города?»</p></div>
      <div class="qr-task-item"><div class="dot">5</div><p>Творческое задание: нарисуй Петербург!</p></div>
    </div>
  </div>
  <p class="qr-hint">* Для работы необходим доступ к интернету</p>
</div>

<!-- ══════════════ ФИНАЛЬНЫЙ СЛАЙД ══════════════ -->
<div class="slide final-slide">
  <span class="final-trophy">🏆</span>
  <h1>Молодец! Экскурсия завершена!</h1>
  <div class="divider"></div>
  <p>Ты прошёл виртуальную экскурсию по великому Санкт-Петербургу — городу-герою, основанному Петром I более 300 лет назад!</p>
  <div class="final-box">
    <span class="final-stars">⭐⭐⭐</span>
    <div class="final-label">Все задания выполнены — ты настоящий знаток Петербурга!</div>
    <div class="final-stats">
      <div><div class="stat-v">${STOPS.length}</div><div class="stat-l">остановок</div></div>
      <div><div class="stat-v">${STOPS.filter(s => s.hasGame).length}</div><div class="stat-l">игр</div></div>
      <div><div class="stat-v">${STOPS.length * 10 + STOPS.filter(s => s.hasGame).length * 15}</div><div class="stat-l">очков</div></div>
    </div>
  </div>
</div>

<script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
}
