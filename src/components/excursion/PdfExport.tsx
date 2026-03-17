import { STOPS, QUIZ_QUESTIONS, MATCH_PAIRS } from "./types";

export function printPdf() {
  const win = window.open("", "_blank");
  if (!win) return;

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"/>
  <title>Виртуальная экскурсия — Санкт-Петербург</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Golos+Text:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy: #1a2d5a;
      --blue: #2c4a8c;
      --gold: #c9a227;
      --gold-light: #e8c96a;
      --cream: #f8f4ec;
      --teal: #2d7d7d;
    }

    body {
      font-family: 'Golos Text', sans-serif;
      background: white;
      color: #222;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4 {
      font-family: 'Cormorant Garamond', serif;
    }

    /* === СЛАЙД === */
    .slide {
      width: 210mm;
      min-height: 148mm;
      padding: 14mm 16mm;
      page-break-after: always;
      page-break-inside: avoid;
      position: relative;
      background: var(--cream);
      display: flex;
      flex-direction: column;
    }
    .slide:last-child { page-break-after: avoid; }

    /* Шапка слайда */
    .slide-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8mm;
      padding-bottom: 4mm;
      border-bottom: 2px solid var(--gold);
    }
    .slide-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 11pt;
      color: var(--gold);
      font-weight: 600;
    }
    .slide-title-small {
      font-family: 'Cormorant Garamond', serif;
      font-size: 9pt;
      color: #999;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* ===== СЛАЙД 1: ТИТУЛ ===== */
    .title-slide {
      background: var(--navy);
      color: white;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 148mm;
    }
    .title-slide .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 14px;
      border-radius: 20px;
      background: rgba(201,162,39,0.2);
      border: 1px solid rgba(201,162,39,0.45);
      color: var(--gold-light);
      font-size: 9pt;
      margin-bottom: 6mm;
    }
    .title-slide h1 {
      font-size: 38pt;
      font-weight: 700;
      line-height: 1.1;
      color: white;
      margin-bottom: 3mm;
    }
    .title-slide h1 span { color: var(--gold); }
    .title-slide h2 {
      font-size: 24pt;
      font-weight: 400;
      color: rgba(255,255,255,0.88);
      margin-bottom: 6mm;
    }
    .gold-line {
      width: 40mm;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      margin: 0 auto 6mm;
    }
    .title-slide p {
      font-size: 10.5pt;
      color: rgba(255,255,255,0.78);
      line-height: 1.7;
      max-width: 120mm;
      margin: 0 auto 8mm;
    }
    .title-stats {
      display: flex;
      gap: 8mm;
      justify-content: center;
      flex-wrap: wrap;
    }
    .title-stats span {
      font-size: 9pt;
      color: rgba(232,201,106,0.85);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* ===== СЛАЙД 2: ЦЕЛИ ===== */
    .goals-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6mm;
      flex: 1;
    }
    .goal-main {
      background: white;
      border: 2px solid rgba(201,162,39,0.3);
      border-radius: 8px;
      padding: 6mm;
    }
    .goal-main .icon-box {
      width: 12mm;
      height: 12mm;
      border-radius: 6px;
      background: linear-gradient(135deg, var(--navy), var(--blue));
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4mm;
      font-size: 16pt;
      color: white;
    }
    .goal-main h3 {
      font-size: 16pt;
      color: var(--navy);
      margin-bottom: 3mm;
    }
    .goal-main p { font-size: 9.5pt; color: #444; line-height: 1.6; }
    .tasks-list { display: flex; flex-direction: column; gap: 3mm; }
    .task-item {
      background: white;
      border-radius: 6px;
      padding: 4mm 5mm;
      display: flex;
      align-items: flex-start;
      gap: 4mm;
    }
    .task-item.blue  { border-left: 4px solid #2c4a8c; }
    .task-item.gold  { border-left: 4px solid #c9a227; }
    .task-item.teal  { border-left: 4px solid #2d7d7d; }
    .task-icon {
      width: 8mm; height: 8mm; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      font-size: 12pt; flex-shrink: 0;
    }
    .task-item .task-label { font-size: 8.5pt; font-weight: 700; margin-bottom: 1.5mm; }
    .task-item .task-text  { font-size: 8.5pt; color: #555; line-height: 1.5; }

    /* ===== СЛАЙД 3: РЕЗУЛЬТАТЫ ===== */
    .results-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5mm;
    }
    .result-card {
      background: white;
      border: 1px solid rgba(201,162,39,0.25);
      border-radius: 8px;
      padding: 5mm;
      text-align: center;
    }
    .result-card .emoji { font-size: 22pt; margin-bottom: 3mm; display: block; }
    .result-card h4 { font-size: 10pt; color: var(--navy); margin-bottom: 2mm; }
    .result-card p  { font-size: 8pt; color: #777; line-height: 1.5; }

    /* ===== СЛАЙД 4: ИНСТРУКЦИЯ ===== */
    .steps-list { display: flex; flex-direction: column; gap: 4mm; }
    .step-item {
      background: white;
      border: 1px solid rgba(26,45,90,0.1);
      border-radius: 8px;
      padding: 4mm 5mm;
      display: flex;
      align-items: flex-start;
      gap: 4mm;
    }
    .step-num {
      width: 9mm; height: 9mm; border-radius: 50%;
      background: linear-gradient(135deg, var(--navy), var(--blue));
      color: white;
      font-family: 'Cormorant Garamond', serif;
      font-size: 13pt; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .step-item h4 { font-size: 10pt; color: var(--navy); margin-bottom: 1.5mm; font-family: 'Golos Text', sans-serif; font-weight: 700; }
    .step-item p  { font-size: 8.5pt; color: #555; line-height: 1.5; }

    /* ===== СЛАЙД 5: МАРШРУТ ===== */
    .route-intro {
      font-size: 10pt;
      color: #555;
      line-height: 1.6;
      margin-bottom: 6mm;
    }
    .stops-list { display: flex; flex-direction: column; gap: 4mm; }
    .stop-row {
      background: white;
      border: 2px solid rgba(26,45,90,0.1);
      border-radius: 8px;
      padding: 4mm 5mm;
      display: flex;
      align-items: center;
      gap: 4mm;
    }
    .stop-emoji { font-size: 20pt; flex-shrink: 0; }
    .stop-num {
      width: 8mm; height: 8mm; border-radius: 50%;
      background: var(--navy); color: white;
      font-family: 'Cormorant Garamond', serif;
      font-size: 11pt; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .stop-info { flex: 1; }
    .stop-info h4 { font-size: 11pt; color: var(--navy); margin-bottom: 1mm; font-family: 'Golos Text', sans-serif; font-weight: 700; }
    .stop-info p  { font-size: 8pt; color: #888; }
    .stop-badge {
      font-size: 7.5pt;
      padding: 2px 8px;
      border-radius: 10px;
      background: rgba(201,162,39,0.15);
      color: var(--gold);
      border: 1px solid rgba(201,162,39,0.3);
      flex-shrink: 0;
    }

    /* ===== СЛАЙДЫ 6-9: ОСТАНОВКИ ===== */
    .stop-slide-img {
      width: 100%;
      height: 42mm;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 5mm;
    }
    .stop-slide-name {
      display: flex;
      align-items: center;
      gap: 3mm;
      margin-bottom: 4mm;
    }
    .stop-slide-name .emoji { font-size: 18pt; }
    .stop-slide-name h2 { font-size: 20pt; color: var(--navy); }
    .stop-desc { font-size: 9.5pt; color: #333; line-height: 1.7; margin-bottom: 5mm; }
    .facts-title {
      font-size: 11pt; color: var(--navy);
      margin-bottom: 3mm;
      display: flex; align-items: center; gap: 3mm;
    }
    .facts-title::before {
      content: "✦";
      color: var(--gold);
      font-size: 10pt;
    }
    .facts-list { display: flex; flex-direction: column; gap: 2.5mm; }
    .fact-item {
      display: flex; align-items: flex-start; gap: 3mm;
    }
    .fact-num {
      width: 5.5mm; height: 5.5mm; border-radius: 50%;
      background: var(--gold); color: white;
      font-size: 7.5pt; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 0.5mm;
    }
    .fact-item p { font-size: 9pt; color: #444; line-height: 1.55; }
    .audio-note {
      margin-top: 5mm;
      padding: 3mm 5mm;
      border-radius: 6px;
      background: rgba(26,45,90,0.05);
      border: 1px dashed rgba(201,162,39,0.4);
      font-size: 8pt;
      color: #888;
    }

    /* ===== СЛАЙДЫ ИГРЫ ===== */
    .game-question-box {
      background: white;
      border: 2px solid rgba(201,162,39,0.25);
      border-radius: 8px;
      padding: 6mm;
      text-align: center;
      margin-bottom: 5mm;
    }
    .game-question-box .q-emoji { font-size: 22pt; margin-bottom: 3mm; display: block; }
    .game-question-box h3 { font-size: 14pt; color: var(--navy); }
    .options-list { display: flex; flex-direction: column; gap: 3mm; margin-bottom: 5mm; }
    .option-item {
      background: white;
      border: 2px solid rgba(26,45,90,0.12);
      border-radius: 8px;
      padding: 3mm 5mm;
      display: flex; align-items: center; gap: 3mm;
      font-size: 9.5pt; color: var(--navy);
    }
    .option-letter {
      width: 7mm; height: 7mm; border-radius: 50%;
      background: rgba(26,45,90,0.08); color: var(--navy);
      font-weight: 700; font-size: 9pt;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .answer-note {
      background: rgba(44,74,140,0.06);
      border-radius: 6px;
      padding: 4mm;
      font-size: 8.5pt;
      color: #555;
      font-style: italic;
    }
    .answer-note strong { color: var(--navy); font-style: normal; }

    /* Сопоставление */
    .match-header {
      text-align: center;
      margin-bottom: 5mm;
    }
    .match-header h3 { font-size: 16pt; color: var(--navy); }
    .match-header p { font-size: 9pt; color: #888; margin-top: 2mm; }
    .match-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4mm;
      margin-bottom: 5mm;
    }
    .match-col { display: flex; flex-direction: column; gap: 2.5mm; }
    .match-item {
      background: white;
      border: 2px solid rgba(26,45,90,0.12);
      border-radius: 6px;
      padding: 3mm 5mm;
      font-size: 9pt; color: var(--navy); font-weight: 600;
      text-align: center;
    }
    .match-note { font-size: 8pt; color: #888; font-style: italic; text-align: center; }

    /* ===== ФИНАЛЬНЫЙ СЛАЙД ===== */
    .final-slide {
      background: linear-gradient(180deg, var(--navy) 0%, var(--blue) 100%);
      color: white;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .final-slide .trophy { font-size: 40pt; margin-bottom: 5mm; display: block; }
    .final-slide h1 { font-size: 28pt; color: white; margin-bottom: 3mm; }
    .final-slide .divider { width: 30mm; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 0 auto 5mm; }
    .final-slide p { font-size: 10pt; color: rgba(255,255,255,0.82); line-height: 1.7; max-width: 130mm; margin: 0 auto 7mm; }
    .score-box {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(201,162,39,0.4);
      border-radius: 10px;
      padding: 6mm 10mm;
      display: inline-block;
      min-width: 110mm;
    }
    .score-box .score-num { font-size: 36pt; font-weight: 700; color: var(--gold); font-family: 'Cormorant Garamond', serif; }
    .score-box .score-label { font-size: 9pt; color: rgba(255,255,255,0.7); margin-bottom: 4mm; }
    .score-stats {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 3mm; margin-top: 4mm;
      border-top: 1px solid rgba(201,162,39,0.25);
      padding-top: 4mm;
    }
    .score-stats div { text-align: center; }
    .score-stats .stat-val { font-size: 16pt; font-weight: 700; color: white; font-family: 'Cormorant Garamond', serif; }
    .score-stats .stat-label { font-size: 7.5pt; color: rgba(255,255,255,0.6); }

    /* ===== ПЕЧАТЬ ===== */
    @page {
      size: A4 landscape;
      margin: 0;
    }
    @media print {
      html, body { width: 297mm; height: 210mm; }
      .slide { width: 297mm; min-height: 210mm; padding: 16mm 20mm; }
    }
  </style>
</head>
<body>

<!-- СЛАЙД 1: ТИТУЛЬНЫЙ -->
<div class="slide title-slide">
  <div class="badge">★ Город-герой · Основан в 1703 году</div>
  <h1>Виртуальная<br><span>экскурсия</span></h1>
  <h2>Санкт-Петербург</h2>
  <div class="gold-line"></div>
  <p>Откройте для себя величие Северной столицы России — её памятники, дворцы и вековую историю</p>
  <div class="title-stats">
    <span>📍 4 остановки</span>
    <span>🎮 3 игры</span>
    <span>🔊 Аудиогид</span>
  </div>
</div>

<!-- СЛАЙД 2: ЦЕЛИ И ЗАДАЧИ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 2</span>
    <span class="slide-title-small">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-size:22pt; color:var(--navy); margin-bottom:6mm;">Цель и задачи экскурсии</h2>
  <div class="goals-grid">
    <div class="goal-main">
      <div class="icon-box">🎯</div>
      <h3>Цель</h3>
      <p>Познакомить учащихся с историческими памятниками и культурным наследием Санкт-Петербурга — города-героя, внёсшего огромный вклад в историю России.</p>
    </div>
    <div class="tasks-list">
      <div class="task-item blue">
        <div class="task-icon" style="background:rgba(44,74,140,0.1)">📖</div>
        <div>
          <div class="task-label" style="color:#2c4a8c">Образовательная задача</div>
          <div class="task-text">Формировать знания об основных достопримечательностях города</div>
        </div>
      </div>
      <div class="task-item gold">
        <div class="task-icon" style="background:rgba(201,162,39,0.1)">❤️</div>
        <div>
          <div class="task-label" style="color:#c9a227">Воспитательная задача</div>
          <div class="task-text">Воспитывать любовь к Родине, гордость за историческое наследие</div>
        </div>
      </div>
      <div class="task-item teal">
        <div class="task-icon" style="background:rgba(45,125,125,0.1)">💡</div>
        <div>
          <div class="task-label" style="color:#2d7d7d">Развивающая задача</div>
          <div class="task-text">Развивать познавательный интерес, внимание и память</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- СЛАЙД 3: ЛИЧНОСТНЫЕ РЕЗУЛЬТАТЫ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 3</span>
    <span class="slide-title-small">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-size:22pt; color:var(--navy); margin-bottom:6mm;">Личностные результаты</h2>
  <div class="results-grid">
    <div class="result-card"><span class="emoji">🇷🇺</span><h4>Патриотизм</h4><p>Гражданская идентичность и любовь к Отечеству</p></div>
    <div class="result-card"><span class="emoji">🏛️</span><h4>Культурное наследие</h4><p>Уважение к историческим памятникам</p></div>
    <div class="result-card"><span class="emoji">🔍</span><h4>Познавательный интерес</h4><p>Стремление узнавать новое об истории</p></div>
    <div class="result-card"><span class="emoji">🤝</span><h4>Сотрудничество</h4><p>Готовность работать в команде</p></div>
    <div class="result-card"><span class="emoji">💡</span><h4>Творческое мышление</h4><p>Умение анализировать и делать выводы</p></div>
    <div class="result-card"><span class="emoji">🌟</span><h4>Самооценка</h4><p>Осознание своих знаний и желание их расширять</p></div>
  </div>
</div>

<!-- СЛАЙД 4: ИНСТРУКЦИЯ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 4</span>
    <span class="slide-title-small">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-size:22pt; color:var(--navy); margin-bottom:6mm;">Инструкция для учеников</h2>
  <div class="steps-list">
    <div class="step-item"><div class="step-num">1</div><div><h4>Изучи карту маршрута</h4><p>На карте отмечены все остановки экскурсии. Нажми на любую точку, чтобы перейти к ней.</p></div></div>
    <div class="step-item"><div class="step-num">2</div><div><h4>Слушай аудиогид</h4><p>На каждой остановке нажми кнопку воспроизведения, чтобы услышать рассказ.</p></div></div>
    <div class="step-item"><div class="step-num">3</div><div><h4>Читай интересные факты</h4><p>После прослушивания прочитай удивительные факты — они помогут в игровых заданиях!</p></div></div>
    <div class="step-item"><div class="step-num">4</div><div><h4>Проходи задания</h4><p>После каждой остановки тебя ждёт игра-проверка знаний. За правильные ответы — очки!</p></div></div>
    <div class="step-item"><div class="step-num">5</div><div><h4>Собери все очки</h4><p>Пройди весь маршрут и стань настоящим знатоком Санкт-Петербурга!</p></div></div>
  </div>
</div>

<!-- СЛАЙД 5: МАРШРУТНЫЙ ЛИСТ -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд 5</span>
    <span class="slide-title-small">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <h2 style="font-size:22pt; color:var(--navy); margin-bottom:4mm;">Маршрутный лист</h2>
  <p class="route-intro">Наш маршрут проходит по четырём знаковым местам Санкт-Петербурга. На каждой остановке вас ждёт рассказ, интересные факты и игровое задание.</p>
  <div class="stops-list">
    ${STOPS.map((stop, i) => `
    <div class="stop-row">
      <div class="stop-num">${i + 1}</div>
      <div class="stop-emoji">${stop.emoji}</div>
      <div class="stop-info">
        <h4>${stop.name}</h4>
        <p>${stop.hasGame ? "🎮 Есть игровое задание" : "📖 Информационная остановка"}</p>
      </div>
      ${stop.hasGame ? `<span class="stop-badge">Игра</span>` : ""}
    </div>`).join("")}
  </div>
</div>

${STOPS.map((stop, si) => `
<!-- СЛАЙД ${6 + si * 2}: ОСТАНОВКА ${stop.id} -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд ${6 + si * 2} · Остановка ${stop.id}</span>
    <span class="slide-title-small">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  <img class="stop-slide-img" src="${stop.image}" alt="${stop.name}" />
  <div class="stop-slide-name">
    <span class="emoji">${stop.emoji}</span>
    <h2>${stop.name}</h2>
  </div>
  <p class="stop-desc">${stop.description}</p>
  ${stop.facts.length > 0 ? `
  <div class="facts-title">Интересные факты</div>
  <div class="facts-list">
    ${stop.facts.map((fact, fi) => `
    <div class="fact-item">
      <div class="fact-num">${fi + 1}</div>
      <p>${fact}</p>
    </div>`).join("")}
  </div>` : ""}
  <div class="audio-note">🔊 Аудиогид: на данной остановке предусмотрено профессиональное аудиосопровождение</div>
</div>

${stop.hasGame ? `
<!-- СЛАЙД ${7 + si * 2}: ИГРА К ОСТАНОВКЕ ${stop.id} -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-num">Слайд ${7 + si * 2} · Игра: ${stop.name}</span>
    <span class="slide-title-small">Виртуальная экскурсия · Санкт-Петербург</span>
  </div>
  ${stop.gameType === "quiz" && QUIZ_QUESTIONS[stop.id] ? `
  <div class="game-question-box">
    <span class="q-emoji">❓</span>
    <h3>${QUIZ_QUESTIONS[stop.id].question}</h3>
  </div>
  <div class="options-list">
    ${QUIZ_QUESTIONS[stop.id].options.map((opt, oi) => `
    <div class="option-item">
      <div class="option-letter">${String.fromCharCode(65 + oi)}</div>
      ${opt}
    </div>`).join("")}
  </div>
  <div class="answer-note">
    <strong>Правильный ответ:</strong> ${String.fromCharCode(65 + QUIZ_QUESTIONS[stop.id].correct)} — ${QUIZ_QUESTIONS[stop.id].options[QUIZ_QUESTIONS[stop.id].correct]}<br>
    ${QUIZ_QUESTIONS[stop.id].explanation}
  </div>` : `
  <div class="match-header">
    <span style="font-size:22pt; display:block; margin-bottom:3mm;">🔗</span>
    <h3>Соедини пары</h3>
    <p>Соедините каждый элемент левого столбца с соответствующим элементом правого</p>
  </div>
  <div class="match-grid">
    <div class="match-col">
      ${MATCH_PAIRS.map(p => `<div class="match-item">${p.left}</div>`).join("")}
    </div>
    <div class="match-col">
      ${MATCH_PAIRS.map(p => `<div class="match-item">${p.right}</div>`).join("")}
    </div>
  </div>
  <div class="match-note">Ответы: ${MATCH_PAIRS.map(p => `«${p.left}» → «${p.right}»`).join(" · ")}</div>`}
</div>` : ""}
`).join("")}

<!-- ФИНАЛЬНЫЙ СЛАЙД -->
<div class="slide final-slide">
  <span class="trophy">🏆</span>
  <h1>Экскурсия завершена!</h1>
  <div class="divider"></div>
  <p>Ты прошёл виртуальную экскурсию по великому Санкт-Петербургу — городу-герою, основанному Петром I более 300 лет назад!</p>
  <div class="score-box">
    <div class="score-num">★★★</div>
    <div class="score-label">Молодец! Экскурсия пройдена</div>
    <div class="score-stats">
      <div><div class="stat-val">${STOPS.length}</div><div class="stat-label">остановок</div></div>
      <div><div class="stat-val">${STOPS.filter(s => s.hasGame).length}</div><div class="stat-label">игр</div></div>
      <div><div class="stat-val">${STOPS.length * 10 + STOPS.filter(s => s.hasGame).length * 15}</div><div class="stat-label">очков</div></div>
    </div>
  </div>
</div>

<script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
}
