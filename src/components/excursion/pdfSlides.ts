import { STOPS } from "./types";
import { renderGameTF, renderGameOdd, renderGameFill } from "./pdfGameData";

export const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://learningapps.org/search.php%3Fs%3D%25D0%25A1%25D0%25B0%25D0%25BD%25D0%25BA%25D1%2582-%25D0%259F%25D0%25B5%25D1%2582%25D0%25B5%25D1%2580%25D0%25B1%25D1%2583%25D1%2580%25D0%25B3&format=png";

/** Слайды 1–5: титул, цели, результаты, инструкция, маршрут */
export function renderIntroSlides(): string {
  return `
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
</div>`;
}

/** Слайды остановок (информационные + игровые), по 2 на каждую остановку */
export function renderStopSlides(): string {
  return STOPS.map((stop, si) => {
    const slideInfoNum = 6 + si * 2;
    const slideGameNum = 7 + si * 2;
    const gameIndex = si % 3; // чередуем: 0=правда/ложь, 1=лишнее, 2=вставь слово

    const gameHtml =
      gameIndex === 0 ? renderGameTF(stop.id) :
      gameIndex === 1 ? renderGameOdd(stop.id) :
      renderGameFill(stop.id);

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
  ${gameHtml}
</div>` : ""}`;
  }).join("");
}

/** QR-слайд */
export function renderQrSlide(qrUrl: string): string {
  return `
<!-- ══════════════ QR-СЛАЙД ══════════════ -->
<div class="slide qr-slide">
  <div class="qr-badge">📱 Дополнительные задания</div>
  <h2>Продолжи изучать<br>Санкт-Петербург!</h2>
  <p class="sub">Отсканируй QR-код смартфоном или планшетом — тебя ждут ещё больше интересных заданий, викторин и игр по материалу экскурсии</p>
  <div class="qr-row">
    <div class="qr-img-wrap">
      <img src="${qrUrl}" alt="QR код" />
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
</div>`;
}

/** Финальный слайд */
export function renderFinalSlide(): string {
  const gamesCount = STOPS.filter(s => s.hasGame).length;
  const maxScore = STOPS.length * 10 + gamesCount * 15;
  return `
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
      <div><div class="stat-v">${gamesCount}</div><div class="stat-l">игр</div></div>
      <div><div class="stat-v">${maxScore}</div><div class="stat-l">очков</div></div>
    </div>
  </div>
</div>`;
}
