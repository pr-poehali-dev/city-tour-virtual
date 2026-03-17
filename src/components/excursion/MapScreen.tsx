import Icon from "@/components/ui/icon";
import { Screen, Stop, STOPS } from "./types";

interface MapScreenProps {
  setScreen: (screen: Screen) => void;
  goToStop: (stop: Stop) => void;
  completedStops: number[];
  score: number;
  completedCount: number;
  totalStops: number;
  progressPercent: number;
}

export default function MapScreen({
  setScreen,
  goToStop,
  completedStops,
  score,
  completedCount,
  totalStops,
  progressPercent,
}: MapScreenProps) {
  return (
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
  );
}
