// Данные и HTML-рендер для 3 типов игровых заданий

export const TF_DATA: Record<number, { statements: { text: string; answer: boolean }[] }> = {
  1: {
    statements: [
      { text: "Петропавловская крепость основана в 1703 году", answer: true },
      { text: "Петропавловский собор — самое высокое здание Петербурга 18 века", answer: true },
      { text: "Золотой шпиль собора достигает высоты 200 метров", answer: false },
      { text: "В Петропавловском соборе покоятся российские императоры", answer: true },
    ],
  },
  3: {
    statements: [
      { text: "Эрмитаж основала Екатерина II в 1764 году", answer: true },
      { text: "В Эрмитаже хранится более 10 миллионов экспонатов", answer: false },
      { text: "Зимний дворец был резиденцией российских императоров", answer: true },
      { text: "Чтобы осмотреть все экспонаты Эрмитажа, нужно пройти 24 км", answer: true },
    ],
  },
  4: {
    statements: [
      { text: "Длина Невского проспекта — 4,5 километра", answer: true },
      { text: "Казанский собор строился 5 лет", answer: false },
      { text: "Невский проспект заложен при Петре I", answer: true },
      { text: "На проспекте расположены 5 соборов разных конфессий", answer: true },
    ],
  },
};

export const ODD_DATA: Record<number, { sets: { q: string; items: string[]; odd: number }[] }> = {
  1: {
    sets: [
      { q: "Что лишнее? (не относится к Петропавловской крепости)", items: ["Золотой шпиль", "Медный всадник", "Петропавловский собор", "Нева"], odd: 1 },
      { q: "Что лишнее? (не связано с Петром I)", items: ["1703 год", "Основатель Петербурга", "Скульптор Фальконе", "Заложил крепость"], odd: 2 },
    ],
  },
  3: {
    sets: [
      { q: "Что лишнее? (не относится к Эрмитажу)", items: ["Зимний дворец", "Картины и скульптуры", "Медный всадник", "Екатерина II"], odd: 2 },
      { q: "Что лишнее? (не является музеем Петербурга)", items: ["Эрмитаж", "Русский музей", "Лувр", "Кунсткамера"], odd: 2 },
    ],
  },
  4: {
    sets: [
      { q: "Что лишнее? (нет на Невском проспекте)", items: ["Казанский собор", "Медный всадник", "Гостиный Двор", "Александринский театр"], odd: 1 },
      { q: "Что лишнее? (не входит в маршрут нашей экскурсии)", items: ["Петропавловская крепость", "Эрмитаж", "Кремль", "Невский проспект"], odd: 2 },
    ],
  },
};

export const FILL_DATA: Record<number, { words: string[]; sentences: { text: string; answer: string }[] }> = {
  1: {
    words: ["1703", "шпиль", "императоры", "крепость"],
    sentences: [
      { text: "Петропавловская _____ основана в мае 1703 года.", answer: "крепость" },
      { text: "Золотой _____ Петропавловского собора достигает 122,5 метра.", answer: "шпиль" },
      { text: "В соборе покоятся российские _____.", answer: "императоры" },
      { text: "Дата основания города — _____ год.", answer: "1703" },
    ],
  },
  3: {
    words: ["Екатерина II", "1764", "3 миллиона", "Зимний"],
    sentences: [
      { text: "Эрмитаж основала _____ в 1764 году.", answer: "Екатерина II" },
      { text: "Год основания Эрмитажа — _____.", answer: "1764" },
      { text: "В музее хранится более _____ экспонатов.", answer: "3 миллиона" },
      { text: "Эрмитаж располагается в _____ дворце.", answer: "Зимний" },
    ],
  },
  4: {
    words: ["4,5 км", "Петре I", "1811", "5 соборов"],
    sentences: [
      { text: "Длина Невского проспекта составляет _____.", answer: "4,5 км" },
      { text: "Проспект заложили при _____.", answer: "Петре I" },
      { text: "Казанский собор был построен в _____ году.", answer: "1811" },
      { text: "На проспекте расположены _____ разных конфессий.", answer: "5 соборов" },
    ],
  },
};

export function renderGameTF(stopId: number): string {
  const data = TF_DATA[stopId];
  if (!data) return "";
  return `
  <div class="game-tf">
    <div class="game-head">
      <span class="g-emo">🤔</span>
      <h3>Правда или ложь?</h3>
      <p>Прочитай каждое утверждение и отметь: ✅ ПРАВДА или ❌ ЛОЖЬ</p>
    </div>
    <div class="tf-list">
      ${data.statements.map((s, i) => `
      <div class="tf-item">
        <div class="tf-num">${i + 1}</div>
        <p>${s.text}</p>
        <div class="tf-boxes">
          <div class="tf-box t">✅</div>
          <div class="tf-box f">❌</div>
        </div>
      </div>`).join("")}
    </div>
    <div class="tf-answer">Ответы: ${data.statements.map((s, i) => `${i + 1}) ${s.answer ? "✅ Правда" : "❌ Ложь"}`).join(" · ")}</div>
  </div>`;
}

export function renderGameOdd(stopId: number): string {
  const data = ODD_DATA[stopId];
  if (!data) return "";
  return `
  <div class="game-odd">
    <div class="game-head">
      <span class="g-emo">🔎</span>
      <h3>Найди лишнее!</h3>
      <p>В каждом ряду одно слово лишнее — зачеркни его и объясни почему</p>
    </div>
    <div class="odd-sets">
      ${data.sets.map((set, si) => `
      <div class="odd-set">
        <p>Задание ${si + 1}: ${set.q}</p>
        <div class="odd-chips">
          ${set.items.map((item, ii) => `<span class="odd-chip${ii === set.odd ? " wrong" : ""}">${item}</span>`).join("")}
        </div>
        <div class="odd-ans">Лишнее: <strong>${set.items[set.odd]}</strong></div>
      </div>`).join("")}
    </div>
  </div>`;
}

export function renderGameFill(stopId: number): string {
  const data = FILL_DATA[stopId];
  if (!data) return "";
  return `
  <div class="game-fill">
    <div class="game-head">
      <span class="g-emo">✍️</span>
      <h3>Вставь пропущенное слово!</h3>
      <p>Используй слова из рамки, чтобы заполнить пропуски</p>
    </div>
    <div class="word-bank">
      ${data.words.map(w => `<span class="word-chip">${w}</span>`).join("")}
    </div>
    <div class="fill-list">
      ${data.sentences.map((s, i) => `
      <div class="fill-item">
        <div class="fill-n">${i + 1}</div>
        <p>${s.text.replace("_____", `<em>${s.answer}</em>`)}</p>
      </div>`).join("")}
    </div>
    <div class="fill-answers">Ответы: ${data.sentences.map((s, i) => `${i + 1}) ${s.answer}`).join(" · ")}</div>
  </div>`;
}
