import { useState } from "react";
import Icon from "@/components/ui/icon";

type Screen = "title" | "goals" | "results" | "instructions" | "map" | "stop" | "game" | "final";

interface Stop {
  id: number;
  name: string;
  shortName: string;
  emoji: string;
  description: string;
  facts: string[];
  image: string;
  hasGame: boolean;
  gameType: "quiz" | "match";
  position: { x: number; y: number };
}

const STOPS: Stop[] = [
  {
    id: 1,
    name: "Петропавловская крепость",
    shortName: "Петропавловская крепость",
    emoji: "🏰",
    description: "Петропавловская крепость — самое старое здание Санкт-Петербурга, основанное Петром I в 1703 году. Это сердце города, с которого начался великий Петербург.",
    facts: [
      "Заложена 27 мая 1703 года — это день рождения города",
      "Петропавловский собор — самое высокое здание Петербурга 18 века",
      "Золотой шпиль собора достигает высоты 122,5 метра",
      "Здесь покоятся почти все российские императоры"
    ],
    image: "https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/9cfb3dab-b997-49a3-b479-4c15deb85430.jpg",
    hasGame: true,
    gameType: "quiz",
    position: { x: 28, y: 32 }
  },
  {
    id: 2,
    name: "Медный всадник",
    shortName: "Медный всадник",
    emoji: "🗿",
    description: "Медный всадник — знаменитый памятник Петру I на Сенатской площади. Установлен по приказу Екатерины II и стал символом могущества Российской империи.",
    facts: [
      "Открыт в 1782 году при Екатерине II",
      "Скульптор — французский мастер Этьен Фальконе",
      "Гранитный постамент весит 1600 тонн",
      "Привезён из Лахты — расстояние более 8 километров"
    ],
    image: "https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/be91d78f-110e-4650-9dd6-1fe20a9ee336.jpg",
    hasGame: false,
    gameType: "quiz",
    position: { x: 46, y: 52 }
  },
  {
    id: 3,
    name: "Эрмитаж",
    shortName: "Эрмитаж",
    emoji: "🏛️",
    description: "Государственный Эрмитаж — один из крупнейших художественных музеев мира. Основан Екатериной II в 1764 году. Коллекция насчитывает более 3 миллионов экспонатов.",
    facts: [
      "Основан в 1764 году Екатериной Великой",
      "Более 3 миллионов произведений искусства",
      "Чтобы осмотреть все экспонаты, нужно пройти 24 км",
      "Зимний дворец — официальная резиденция российских императоров"
    ],
    image: "https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/c8c86542-a377-48ac-8214-eab39fe0d9d6.jpg",
    hasGame: true,
    gameType: "quiz",
    position: { x: 58, y: 38 }
  },
  {
    id: 4,
    name: "Невский проспект",
    shortName: "Невский проспект",
    emoji: "🛤️",
    description: "Невский проспект — главная улица Санкт-Петербурга, её сердце и символ. Длина проспекта 4,5 километра — от Адмиралтейства до Александро-Невской лавры.",
    facts: [
      "Длина — 4,5 километра",
      "Заложен в начале 18 века при Петре I",
      "На проспекте расположены 5 соборов разных конфессий",
      "Казанский собор строился 10 лет — с 1801 по 1811 год"
    ],
    image: "https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/c8c86542-a377-48ac-8214-eab39fe0d9d6.jpg",
    hasGame: true,
    gameType: "match",
    position: { x: 70, y: 58 }
  },
];

const QUIZ_QUESTIONS: Record<number, { question: string; options: string[]; correct: number; explanation: string }> = {
  1: {
    question: "В каком году была основана Петропавловская крепость?",
    options: ["1700", "1703", "1712", "1725"],
    correct: 1,
    explanation: "Петропавловская крепость основана 27 мая 1703 года — это день рождения Санкт-Петербурга!"
  },
  3: {
    question: "Кто основал Эрмитаж?",
    options: ["Пётр I", "Павел I", "Екатерина II", "Александр I"],
    correct: 2,
    explanation: "Эрмитаж основала Екатерина Великая в 1764 году, начав коллекционировать произведения искусства."
  },
  4: {
    question: "Какова длина Невского проспекта?",
    options: ["2,5 км", "3 км", "4,5 км", "6 км"],
    correct: 2,
    explanation: "Невский проспект тянется на 4,5 километра — от Адмиралтейства до Александро-Невской лавры."
  }
};

const MATCH_PAIRS = [
  { left: "Пётр I", right: "Основатель Петербурга" },
  { left: "Екатерина II", right: "Основательница Эрмитажа" },
  { left: "Медный всадник", right: "Памятник на Сенатской площади" },
  { left: "1703 год", right: "Год основания города" },
];

export default function Index() {
  const [screen, setScreen] = useState<Screen>("title");
  const [currentStop, setCurrentStop] = useState<Stop | null>(null);
  const [completedStops, setCompletedStops] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [matchSelected, setMatchSelected] = useState<{ left: number | null; right: number | null }>({ left: null, right: null });
  const [matchCompleted, setMatchCompleted] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const goToStop = (stop: Stop) => {
    setCurrentStop(stop);
    setQuizAnswered(null);
    setMatchCompleted([]);
    setMatchSelected({ left: null, right: null });
    setIsPlaying(false);
    setScreen("stop");
  };

  const completeStop = (stop: Stop) => {
    if (!completedStops.includes(stop.id)) {
      setCompletedStops(prev => [...prev, stop.id]);
      setScore(prev => prev + 10);
    }
    if (stop.hasGame) {
      setScreen("game");
    } else {
      setScreen("map");
    }
  };

  const handleQuizAnswer = (idx: number, correct: number) => {
    setQuizAnswered(idx);
    if (idx === correct) {
      setScore(prev => prev + 15);
    }
  };

  const handleMatchSelect = (side: "left" | "right", idx: number) => {
    const newMatch = { ...matchSelected, [side]: idx };
    setMatchSelected(newMatch);
    if (newMatch.left !== null && newMatch.right !== null) {
      if (newMatch.left === newMatch.right && !matchCompleted.includes(newMatch.left)) {
        setMatchCompleted(prev => [...prev, newMatch.left!]);
        setScore(prev => prev + 10);
      }
      setTimeout(() => setMatchSelected({ left: null, right: null }), 600);
    }
  };

  const totalStops = STOPS.length;
  const completedCount = completedStops.length;
  const progressPercent = Math.round((completedCount / totalStops) * 100);

  return (
    <div className="min-h-screen" style={{ background: "var(--spb-cream)" }}>

      {/* ===== ТИТУЛЬНЫЙ ЛИСТ ===== */}
      {screen === "title" && (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/c8c86542-a377-48ac-8214-eab39fe0d9d6.jpg)`
          }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,45,90,0.72) 0%, rgba(26,45,90,0.93) 100%)" }} />

          <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-golos"
                style={{ background: "rgba(201,162,39,0.2)", border: "1px solid rgba(201,162,39,0.45)", color: "#e8c96a" }}>
                <Icon name="Star" size={13} />
                Город-герой · Основан в 1703 году
              </div>
            </div>

            <div className="animate-fade-in-up delay-100">
              <h1 className="font-cormorant text-white mb-2" style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", lineHeight: 1.1, fontWeight: 700 }}>
                Виртуальная<br />
                <span style={{ color: "#c9a227" }}>экскурсия</span>
              </h1>
              <h2 className="font-cormorant text-white mb-8" style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", fontWeight: 400, opacity: 0.88 }}>
                Санкт-Петербург
              </h2>
            </div>

            <div className="animate-fade-in-up delay-200">
              <div className="gold-divider w-40 mx-auto mb-7" />
              <p className="font-golos text-white mb-10 max-w-md mx-auto" style={{ fontSize: "1.05rem", opacity: 0.78, lineHeight: 1.7 }}>
                Откройте для себя величие Северной столицы России — её памятники, дворцы и вековую историю
              </p>
            </div>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
              <button onClick={() => setScreen("goals")}
                className="px-10 py-4 rounded-xl font-golos font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{ background: "var(--spb-gold)", color: "var(--spb-navy)" }}>
                Начать экскурсию
              </button>
              <button onClick={() => setScreen("map")}
                className="px-10 py-4 rounded-xl font-golos font-medium text-lg transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                К маршруту
              </button>
            </div>
          </div>

          <div className="relative z-10 pb-8 flex justify-center gap-6">
            {[
              { icon: "MapPin" as const, text: "4 остановки" },
              { icon: "Gamepad2" as const, text: "3 игры" },
              { icon: "Volume2" as const, text: "Аудиогид" },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 font-golos text-sm animate-fade-in delay-400"
                style={{ color: "rgba(232,201,106,0.8)" }}>
                <Icon name={item.icon} size={15} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== ЦЕЛИ И ЗАДАЧИ ===== */}
      {screen === "goals" && (
        <SlideLayout title="Цель и задачи экскурсии" onNext={() => setScreen("results")} onBack={() => setScreen("title")} step={2} total={4}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 animate-fade-in-up" style={{ background: "white", border: "2px solid rgba(201,162,39,0.25)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, #1a2d5a, #2c4a8c)" }}>
                <Icon name="Target" size={22} className="text-white" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-3" style={{ color: "var(--spb-navy)" }}>Цель</h3>
              <p className="font-golos leading-relaxed" style={{ color: "#444", fontSize: "0.97rem" }}>
                Познакомить учащихся с историческими памятниками и культурным наследием Санкт-Петербурга — города-героя, внёсшего огромный вклад в историю России.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: "BookOpen" as const, color: "#2c4a8c", title: "Образовательная", text: "Формировать знания об основных достопримечательностях города" },
                { icon: "Heart" as const, color: "#c9a227", title: "Воспитательная", text: "Воспитывать любовь к Родине, гордость за историческое наследие" },
                { icon: "Lightbulb" as const, color: "#2d7d7d", title: "Развивающая", text: "Развивать познавательный интерес, внимание и память" },
              ].map((item, i) => (
                <div key={item.title} className={`rounded-xl p-4 flex items-start gap-4 animate-fade-in-up delay-${(i + 1) * 100}`}
                  style={{ background: "white", borderLeft: `4px solid ${item.color}` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}18` }}>
                    <Icon name={item.icon} size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-golos font-semibold mb-1 text-sm" style={{ color: item.color }}>{item.title} задача</div>
                    <div className="font-golos text-sm" style={{ color: "#555" }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideLayout>
      )}

      {/* ===== ЛИЧНОСТНЫЕ РЕЗУЛЬТАТЫ ===== */}
      {screen === "results" && (
        <SlideLayout title="Личностные результаты" onNext={() => setScreen("instructions")} onBack={() => setScreen("goals")} step={3} total={4}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { emoji: "🇷🇺", title: "Патриотизм", text: "Гражданская идентичность и любовь к Отечеству" },
              { emoji: "🏛️", title: "Культурное наследие", text: "Уважение к историческим памятникам" },
              { emoji: "🔍", title: "Познавательный интерес", text: "Стремление узнавать новое об истории" },
              { emoji: "🤝", title: "Сотрудничество", text: "Готовность работать в команде" },
              { emoji: "💡", title: "Творческое мышление", text: "Умение анализировать и делать выводы" },
              { emoji: "🌟", title: "Самооценка", text: "Осознание своих знаний и желание их расширять" },
            ].map((item, i) => (
              <div key={item.title}
                className="rounded-2xl p-4 text-center animate-fade-in-up"
                style={{ background: "white", border: "1px solid rgba(201,162,39,0.2)", boxShadow: "0 2px 12px rgba(26,45,90,0.05)", animationDelay: `${i * 0.07}s` }}>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h4 className="font-golos font-semibold text-sm mb-1" style={{ color: "var(--spb-navy)" }}>{item.title}</h4>
                <p className="font-golos text-xs leading-relaxed" style={{ color: "#777" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </SlideLayout>
      )}

      {/* ===== ИНСТРУКЦИЯ ===== */}
      {screen === "instructions" && (
        <SlideLayout title="Инструкция для учеников" onNext={() => setScreen("map")} onBack={() => setScreen("results")} step={4} total={4} nextLabel="Начать маршрут →">
          <div className="max-w-xl mx-auto space-y-3">
            {[
              { num: "1", icon: "Map" as const, title: "Изучи карту маршрута", text: "На карте отмечены все остановки экскурсии. Нажми на любую точку, чтобы перейти к ней." },
              { num: "2", icon: "Volume2" as const, title: "Слушай аудиогид", text: "На каждой остановке нажми кнопку воспроизведения, чтобы услышать рассказ." },
              { num: "3", icon: "BookOpen" as const, title: "Читай факты", text: "После прослушивания прочитай удивительные факты — они помогут в игровых заданиях!" },
              { num: "4", icon: "Gamepad2" as const, title: "Проходи задания", text: "После каждой остановки тебя ждёт игра-проверка знаний. За правильные ответы — очки!" },
              { num: "5", icon: "Trophy" as const, title: "Собери все очки", text: "Пройди весь маршрут и стань настоящим знатоком Санкт-Петербурга!" },
            ].map((step, i) => (
              <div key={step.num} className="flex items-start gap-4 rounded-xl p-4 animate-fade-in-up"
                style={{ background: "white", border: "1px solid rgba(26,45,90,0.08)", animationDelay: `${i * 0.08}s` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-cormorant text-lg font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))" }}>
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon name={step.icon} size={15} style={{ color: "var(--spb-gold)" }} />
                    <span className="font-golos font-semibold text-sm" style={{ color: "var(--spb-navy)" }}>{step.title}</span>
                  </div>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "#666" }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideLayout>
      )}

      {/* ===== КАРТА МАРШРУТА ===== */}
      {screen === "map" && (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--spb-cream)" }}>
          <header className="px-5 py-4 flex items-center justify-between sticky top-0 z-20"
            style={{ background: "rgba(248,244,236,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
            <button onClick={() => setScreen("title")} className="flex items-center gap-2 font-golos text-sm font-medium"
              style={{ color: "var(--spb-navy)" }}>
              <Icon name="ChevronLeft" size={17} />
              В начало
            </button>
            <span className="font-cormorant text-xl font-semibold" style={{ color: "var(--spb-navy)" }}>Маршрутный лист</span>
            <div className="flex items-center gap-1.5 font-golos text-sm font-medium px-3 py-1 rounded-full"
              style={{ background: "rgba(201,162,39,0.15)", color: "var(--spb-gold)" }}>
              <Icon name="Star" size={13} />
              {score}
            </div>
          </header>

          {/* Прогресс */}
          <div className="px-5 pt-3 pb-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(26,45,90,0.1)" }}>
                <div className="h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg, var(--spb-gold), var(--spb-blue))" }} />
              </div>
              <span className="font-golos text-xs font-medium" style={{ color: "var(--spb-navy)" }}>
                {completedCount}/{totalStops}
              </span>
            </div>
          </div>

          {/* Карта */}
          <div className="px-4 py-3">
            <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: "380px" }}>
              <div className="absolute inset-0 bg-cover bg-center opacity-35"
                style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/c8c86542-a377-48ac-8214-eab39fe0d9d6.jpg)` }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(26,45,90,0.82) 0%, rgba(44,74,140,0.75) 100%)" }} />

              {/* SVG слой: Нева + маршрут */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Нева */}
                <path d="M 0 44 Q 20 40 35 38 Q 52 36 65 44 Q 78 50 100 47"
                  stroke="rgba(120,180,240,0.5)" strokeWidth="5" fill="none" />
                {/* Линия маршрута */}
                {STOPS.map((stop, i) => {
                  if (i === STOPS.length - 1) return null;
                  const next = STOPS[i + 1];
                  return (
                    <line key={i}
                      x1={stop.position.x} y1={stop.position.y}
                      x2={next.position.x} y2={next.position.y}
                      stroke="rgba(201,162,39,0.65)" strokeWidth="0.7" strokeDasharray="2.5 1.5" />
                  );
                })}
              </svg>

              {/* Метки Невы */}
              <div className="absolute font-golos text-center pointer-events-none"
                style={{ left: "38%", top: "26%", color: "rgba(160,210,255,0.7)", fontSize: "10px" }}>
                Река Нева
              </div>

              {/* Точки остановок */}
              {STOPS.map((stop) => (
                <button key={stop.id} onClick={() => goToStop(stop)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${stop.position.x}%`, top: `${stop.position.y}%` }}>
                  <div className="relative flex flex-col items-center">
                    <div className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{
                        width: "44px", height: "44px",
                        background: completedStops.includes(stop.id)
                          ? "linear-gradient(135deg, #c9a227, #e8c96a)"
                          : "white",
                        boxShadow: completedStops.includes(stop.id)
                          ? "0 0 0 4px rgba(201,162,39,0.35), 0 4px 16px rgba(0,0,0,0.35)"
                          : "0 4px 16px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.5)",
                      }}>
                      <span style={{ fontSize: "20px" }}>{stop.emoji}</span>
                      {completedStops.includes(stop.id) && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "#2d7d7d", border: "2px solid white" }}>
                          <Icon name="Check" size={9} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-center" style={{ maxWidth: "70px" }}>
                      <span className="font-golos text-white leading-tight block"
                        style={{ fontSize: "8.5px", textShadow: "0 1px 5px rgba(0,0,0,0.9)" }}>
                        {stop.shortName}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {/* Компас */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-base"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                🧭
              </div>
            </div>
          </div>

          {/* Список */}
          <div className="px-4 pb-6 flex-1">
            <h3 className="font-cormorant text-xl font-semibold mb-3 px-1" style={{ color: "var(--spb-navy)" }}>
              Остановки маршрута
            </h3>
            <div className="space-y-3">
              {STOPS.map((stop, i) => (
                <button key={stop.id} onClick={() => goToStop(stop)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    background: "white",
                    border: `2px solid ${completedStops.includes(stop.id) ? "rgba(201,162,39,0.35)" : "rgba(26,45,90,0.08)"}`,
                    animation: `fadeInUp 0.45s ease ${i * 0.07}s both`
                  }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: completedStops.includes(stop.id) ? "rgba(201,162,39,0.1)" : "rgba(26,45,90,0.05)" }}>
                    {stop.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-golos font-semibold text-sm truncate" style={{ color: "var(--spb-navy)" }}>
                      {stop.name}
                    </div>
                    <div className="font-golos text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "#999" }}>
                      {stop.hasGame
                        ? <><Icon name="Gamepad2" size={10} /> Есть игровое задание</>
                        : <><Icon name="BookOpen" size={10} /> Информационная остановка</>}
                    </div>
                  </div>
                  {completedStops.includes(stop.id)
                    ? <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "#2d7d7d" }}>
                        <Icon name="Check" size={13} className="text-white" />
                      </div>
                    : <Icon name="ChevronRight" size={16} style={{ color: "#ccc" }} />
                  }
                </button>
              ))}
            </div>

            {completedCount >= totalStops && (
              <button onClick={() => setScreen("final")}
                className="w-full mt-4 py-4 rounded-2xl font-golos font-semibold text-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))", color: "#c9a227" }}>
                🏆 Завершить экскурсию
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== ОСТАНОВКА ===== */}
      {screen === "stop" && currentStop && (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--spb-cream)" }}>
          <div className="relative h-64 shrink-0">
            <img src={currentStop.image} alt={currentStop.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,45,90,0.25) 0%, rgba(26,45,90,0.88) 100%)" }} />
            <button onClick={() => setScreen("map")}
              className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
              <Icon name="ChevronLeft" size={20} className="text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">{currentStop.emoji}</span>
                <span className="font-golos text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(201,162,39,0.22)", color: "#e8c96a" }}>
                  Остановка {currentStop.id} из {totalStops}
                </span>
              </div>
              <h1 className="font-cormorant text-white font-bold" style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}>
                {currentStop.name}
              </h1>
            </div>
          </div>

          <div className="flex-1 px-4 py-5 space-y-4">
            {/* Аудиогид */}
            <div className="rounded-2xl p-5 animate-fade-in-up" style={{ background: "white", border: "2px solid rgba(201,162,39,0.18)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))" }}>
                  <Icon name="Volume2" size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-golos font-semibold text-sm" style={{ color: "var(--spb-navy)" }}>Аудиогид</div>
                  <div className="font-golos text-xs" style={{ color: "#aaa" }}>Нажми ▶ для прослушивания</div>
                </div>
              </div>

              <button onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-3 w-full p-3 rounded-xl transition-all"
                style={{ background: "rgba(26,45,90,0.04)", border: "1px dashed rgba(201,162,39,0.3)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: isPlaying ? "var(--spb-gold)" : "var(--spb-navy)" }}>
                  <Icon name={isPlaying ? "Pause" : "Play"} size={17} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-golos text-sm font-medium" style={{ color: "var(--spb-blue)" }}>
                    {isPlaying ? "Воспроизводится..." : currentStop.name}
                  </div>
                  {isPlaying && (
                    <div className="flex gap-0.5 items-end h-4 mt-1">
                      {[...Array(18)].map((_, i) => (
                        <div key={i} className="w-1 rounded-full"
                          style={{
                            background: "var(--spb-gold)",
                            height: `${30 + Math.sin(i * 0.8) * 60}%`,
                            animation: `float ${0.6 + (i % 3) * 0.2}s ease-in-out infinite`,
                            animationDelay: `${i * 0.06}s`
                          }} />
                      ))}
                    </div>
                  )}
                </div>
              </button>
              <p className="font-golos text-xs mt-2" style={{ color: "#bbb" }}>
                * Загрузите аудиофайл через настройки для профессионального озвучивания
              </p>
            </div>

            {/* Описание */}
            <div className="rounded-2xl p-5 animate-fade-in-up delay-100" style={{ background: "white" }}>
              <h3 className="font-cormorant text-xl font-semibold mb-2" style={{ color: "var(--spb-navy)" }}>О достопримечательности</h3>
              <p className="font-golos leading-relaxed" style={{ color: "#444", fontSize: "0.96rem" }}>{currentStop.description}</p>
            </div>

            {/* Факты */}
            {currentStop.facts.length > 0 && (
              <div className="rounded-2xl p-5 animate-fade-in-up delay-200" style={{ background: "white" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Sparkles" size={17} style={{ color: "var(--spb-gold)" }} />
                  <h3 className="font-cormorant text-xl font-semibold" style={{ color: "var(--spb-navy)" }}>Интересные факты</h3>
                </div>
                <ul className="space-y-2.5">
                  {currentStop.facts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-golos text-xs font-bold text-white"
                        style={{ background: "var(--spb-gold)", fontSize: "10px" }}>{i + 1}</span>
                      <p className="font-golos text-sm leading-relaxed" style={{ color: "#444" }}>{fact}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={() => completeStop(currentStop)}
              className="w-full py-4 rounded-2xl font-golos font-semibold text-lg transition-all hover:scale-105 animate-fade-in-up delay-300"
              style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))", color: "#c9a227" }}>
              {currentStop.hasGame ? "Перейти к заданию →" : "Остановка пройдена ✓"}
            </button>
          </div>
        </div>
      )}

      {/* ===== ИГРА ===== */}
      {screen === "game" && currentStop && (() => {
        const q = QUIZ_QUESTIONS[currentStop.id];
        const isMatch = currentStop.gameType === "match";

        return (
          <div className="min-h-screen flex flex-col" style={{ background: "var(--spb-cream)" }}>
            <header className="px-5 py-4 flex items-center gap-3"
              style={{ background: "white", borderBottom: "1px solid rgba(201,162,39,0.18)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))" }}>
                <Icon name="Gamepad2" size={18} className="text-white" />
              </div>
              <div>
                <div className="font-cormorant text-xl font-semibold" style={{ color: "var(--spb-navy)" }}>Игровое задание</div>
                <div className="font-golos text-xs" style={{ color: "#999" }}>{currentStop.name}</div>
              </div>
            </header>

            <div className="flex-1 px-4 py-5">
              {/* КВИЗ */}
              {!isMatch && q && (
                <div className="max-w-lg mx-auto animate-scale-in">
                  <div className="rounded-2xl p-6 mb-5 text-center"
                    style={{ background: "white", border: "2px solid rgba(201,162,39,0.2)" }}>
                    <div className="text-4xl mb-3">❓</div>
                    <h2 className="font-cormorant text-2xl font-semibold" style={{ color: "var(--spb-navy)" }}>
                      {q.question}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {q.options.map((opt, i) => {
                      const isSelected = quizAnswered === i;
                      const isCorrect = i === q.correct;
                      const showResult = quizAnswered !== null;
                      return (
                        <button key={i}
                          onClick={() => quizAnswered === null && handleQuizAnswer(i, q.correct)}
                          className="w-full p-4 rounded-2xl font-golos font-medium text-left flex items-center gap-3 transition-all duration-300"
                          style={{
                            background: showResult ? (isCorrect ? "#e8f5e9" : isSelected ? "#fde8e8" : "white") : "white",
                            border: `2px solid ${showResult ? (isCorrect ? "#4caf50" : isSelected ? "#f44336" : "rgba(26,45,90,0.1)") : "rgba(26,45,90,0.1)"}`,
                            color: "var(--spb-navy)",
                            cursor: quizAnswered !== null ? "default" : "pointer",
                          }}>
                          <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                            style={{
                              background: showResult ? (isCorrect ? "#4caf50" : isSelected ? "#f44336" : "rgba(26,45,90,0.08)") : "rgba(26,45,90,0.08)",
                              color: showResult && (isCorrect || isSelected) ? "white" : "var(--spb-navy)"
                            }}>
                            {showResult ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered !== null && (
                    <div className="mt-5 animate-scale-in">
                      <div className="rounded-2xl p-4 mb-4"
                        style={{
                          background: quizAnswered === q.correct ? "#e8f5e9" : "#fff8e1",
                          border: `2px solid ${quizAnswered === q.correct ? "#4caf50" : "#ff9800"}`
                        }}>
                        <div className="font-golos font-semibold mb-1"
                          style={{ color: quizAnswered === q.correct ? "#2e7d32" : "#e65100" }}>
                          {quizAnswered === q.correct ? "🎉 Правильно! +15 очков" : "🤔 Не совсем верно..."}
                        </div>
                        <p className="font-golos text-sm" style={{ color: "#444" }}>{q.explanation}</p>
                      </div>
                      <button onClick={() => setScreen("map")}
                        className="w-full py-4 rounded-2xl font-golos font-semibold text-lg transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))", color: "#c9a227" }}>
                        Вернуться к маршруту →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* СОПОСТАВЛЕНИЕ */}
              {isMatch && (
                <div className="max-w-lg mx-auto animate-scale-in">
                  <div className="rounded-2xl p-5 mb-5 text-center"
                    style={{ background: "white", border: "2px solid rgba(201,162,39,0.2)" }}>
                    <div className="text-3xl mb-2">🔗</div>
                    <h2 className="font-cormorant text-2xl font-semibold" style={{ color: "var(--spb-navy)" }}>
                      Соедини пары
                    </h2>
                    <p className="font-golos text-sm mt-1" style={{ color: "#999" }}>
                      Нажми на элемент слева, затем на подходящий справа
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      {MATCH_PAIRS.map((pair, i) => (
                        <button key={i} onClick={() => !matchCompleted.includes(i) && handleMatchSelect("left", i)}
                          className="w-full p-3 rounded-xl font-golos text-sm font-medium transition-all duration-300"
                          style={{
                            background: matchCompleted.includes(i) ? "#e8f5e9" : matchSelected.left === i ? "var(--spb-navy)" : "white",
                            color: matchCompleted.includes(i) ? "#2e7d32" : matchSelected.left === i ? "white" : "var(--spb-navy)",
                            border: `2px solid ${matchCompleted.includes(i) ? "#4caf50" : matchSelected.left === i ? "var(--spb-navy)" : "rgba(26,45,90,0.12)"}`,
                          }}>
                          {pair.left}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {MATCH_PAIRS.map((pair, i) => (
                        <button key={i} onClick={() => !matchCompleted.includes(i) && handleMatchSelect("right", i)}
                          className="w-full p-3 rounded-xl font-golos text-sm font-medium transition-all duration-300"
                          style={{
                            background: matchCompleted.includes(i) ? "#e8f5e9" : matchSelected.right === i ? "#fef3c7" : "white",
                            color: matchCompleted.includes(i) ? "#2e7d32" : matchSelected.right === i ? "var(--spb-navy)" : "#555",
                            border: `2px solid ${matchCompleted.includes(i) ? "#4caf50" : matchSelected.right === i ? "var(--spb-gold)" : "rgba(26,45,90,0.12)"}`,
                          }}>
                          {pair.right}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-center font-golos text-sm" style={{ color: matchCompleted.length === MATCH_PAIRS.length ? "#2e7d32" : "#aaa" }}>
                    {matchCompleted.length > 0 && `✓ Совпадений: ${matchCompleted.length} из ${MATCH_PAIRS.length}`}
                  </div>

                  {matchCompleted.length === MATCH_PAIRS.length && (
                    <div className="mt-3 animate-scale-in">
                      <div className="rounded-2xl p-4 mb-4 text-center"
                        style={{ background: "#e8f5e9", border: "2px solid #4caf50" }}>
                        <div className="font-golos font-semibold" style={{ color: "#2e7d32" }}>
                          🎉 Все пары найдены! +{MATCH_PAIRS.length * 10} очков
                        </div>
                      </div>
                      <button onClick={() => setScreen("map")}
                        className="w-full py-4 rounded-2xl font-golos font-semibold text-lg transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))", color: "#c9a227" }}>
                        Вернуться к маршруту →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ===== ФИНАЛ ===== */}
      {screen === "final" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #1a2d5a 0%, #2c4a8c 100%)" }}>
          <div className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/39e2d0c8-94f7-47f0-8ece-259593ebffa4/files/c8c86542-a377-48ac-8214-eab39fe0d9d6.jpg)` }} />

          <div className="relative z-10 max-w-md animate-scale-in">
            <div className="text-7xl mb-5 animate-float">🏆</div>
            <h1 className="font-cormorant text-white mb-3 font-bold" style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
              Экскурсия завершена!
            </h1>
            <div className="gold-divider w-28 mx-auto my-5" />
            <p className="font-golos text-white mb-7 leading-relaxed" style={{ opacity: 0.82, fontSize: "1rem" }}>
              Ты прошёл виртуальную экскурсию по великому Санкт-Петербургу — городу-герою, основанному Петром I более 300 лет назад!
            </p>

            <div className="rounded-2xl p-5 mb-7" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(201,162,39,0.35)" }}>
              <div className="font-cormorant font-bold mb-1" style={{ fontSize: "3.5rem", color: "var(--spb-gold)" }}>{score}</div>
              <div className="font-golos text-white text-sm mb-4" style={{ opacity: 0.75 }}>очков набрано</div>
              <div className="gold-divider w-16 mx-auto mb-4" />
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="font-cormorant text-2xl font-bold text-white">{completedCount}</div>
                  <div className="font-golos text-xs text-white" style={{ opacity: 0.65 }}>остановок</div>
                </div>
                <div>
                  <div className="text-xl">{score >= 80 ? "⭐⭐⭐" : score >= 50 ? "⭐⭐" : "⭐"}</div>
                  <div className="font-golos text-xs text-white" style={{ opacity: 0.65 }}>оценка</div>
                </div>
                <div>
                  <div className="font-cormorant text-2xl font-bold text-white">
                    {STOPS.filter(s => s.hasGame).length}
                  </div>
                  <div className="font-golos text-xs text-white" style={{ opacity: 0.65 }}>игр</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setScreen("map"); setCompletedStops([]); setScore(0); setMatchCompleted([]); setQuizAnswered(null); }}
                className="w-full py-4 rounded-2xl font-golos font-semibold text-lg transition-all hover:scale-105"
                style={{ background: "var(--spb-gold)", color: "var(--spb-navy)" }}>
                Пройти ещё раз
              </button>
              <button onClick={() => setScreen("title")}
                className="w-full py-3 rounded-2xl font-golos font-medium transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                На главную
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SlideLayout({
  title, children, onNext, onBack, step, total, nextLabel = "Далее →"
}: {
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  step: number;
  total: number;
  nextLabel?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--spb-cream)" }}>
      <header className="px-5 py-4 flex items-center justify-between sticky top-0 z-20"
        style={{ background: "rgba(248,244,236,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,162,39,0.18)" }}>
        <button onClick={onBack} className="flex items-center gap-2 font-golos text-sm font-medium"
          style={{ color: "var(--spb-navy)" }}>
          <Icon name="ChevronLeft" size={17} />
          Назад
        </button>
        <div className="flex items-center gap-1.5">
          {[...Array(total)].map((_, i) => (
            <div key={i} className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: i + 1 === step ? "22px" : "7px",
                background: i + 1 <= step ? "var(--spb-gold)" : "rgba(26,45,90,0.15)"
              }} />
          ))}
        </div>
        <span className="font-golos text-xs" style={{ color: "#bbb" }}>{step}/{total}</span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-4 max-w-3xl mx-auto">
          <div className="mb-5 animate-fade-in-up">
            <div className="gold-divider w-10 mb-3" />
            <h2 className="font-cormorant font-bold" style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)", color: "var(--spb-navy)" }}>
              {title}
            </h2>
          </div>
          {children}
        </div>
      </div>

      <div className="px-4 py-4" style={{ background: "rgba(248,244,236,0.96)", borderTop: "1px solid rgba(201,162,39,0.18)" }}>
        <div className="max-w-3xl mx-auto">
          <button onClick={onNext}
            className="w-full py-4 rounded-2xl font-golos font-semibold text-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--spb-navy), var(--spb-blue))", color: "#c9a227" }}>
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}