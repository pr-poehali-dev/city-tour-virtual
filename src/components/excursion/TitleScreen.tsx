import Icon from "@/components/ui/icon";
import { Screen } from "./types";

interface TitleScreenProps {
  setScreen: (screen: Screen) => void;
}

export default function TitleScreen({ setScreen }: TitleScreenProps) {
  return (
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
  );
}
