import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "УСЛУГИ", href: "#services" },
  { label: "ЦЕНЫ", href: "#prices" },
  { label: "КОНТАКТ", href: "#contact" },
];

const TG_URL = "https://t.me/Alex_mimingov?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BC%D0%B0%D0%B9%D0%BD%D0%B8%D0%BD%D0%B3%D1%83";

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  offWhite: "#e8e6e3",
  white: "#ffffff",
  black: "#000000",
  fontMain: "var(--font-pragmatica, 'Pragmatica', Arial, sans-serif)",
  fontCond: "var(--font-pragmatica-condensed, 'PragmaticaCondensed', Arial, sans-serif)",
} as const;

// ─── Crypto Ticker ────────────────────────────────────────────────────────────
type CoinData = { symbol: string; price: number; change: number };

const COINS = ["bitcoin", "ethereum", "tether", "binancecoin", "solana", "ripple", "cardano", "dogecoin", "tron", "avalanche-2"];
const COIN_SYMBOLS: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  tether: "USDT",
  binancecoin: "BNB",
  solana: "SOL",
  ripple: "XRP",
  cardano: "ADA",
  dogecoin: "DOGE",
  tron: "TRX",
  "avalanche-2": "AVAX",
};

function CryptoTicker() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const ids = COINS.join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      if (!res.ok) return;
      const data = await res.json();
      const parsed: CoinData[] = COINS.map((id) => ({
        symbol: COIN_SYMBOLS[id],
        price: data[id]?.usd ?? 0,
        change: data[id]?.usd_24h_change ?? 0,
      })).filter((c) => c.price > 0);
      setCoins(parsed);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30_000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  if (coins.length === 0) return null;

  const items = [...coins, ...coins]; // duplicate for seamless loop

  return (
    <div
      style={{
        width: "100%",
        background: "#111",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        height: "32px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 99,
      }}
    >
      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          align-items: center;
          animation: tickerScroll ${Math.max(coins.length * 4, 30)}s linear infinite;
          white-space: nowrap;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track" ref={trackRef}>
        {items.map((coin, i) => (
          <span
            key={`${coin.symbol}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 24px",
              fontFamily: S.fontMain,
              fontSize: "10px",
              letterSpacing: "0.06em",
              color: "rgba(232,230,227,0.9)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span style={{ fontWeight: 700, color: S.offWhite }}>{coin.symbol}</span>
            <span>
              ${coin.price >= 1000
                ? coin.price.toLocaleString("en-US", { maximumFractionDigits: 0 })
                : coin.price >= 1
                ? coin.price.toLocaleString("en-US", { maximumFractionDigits: 2 })
                : coin.price.toLocaleString("en-US", { maximumFractionDigits: 5 })}
            </span>
            <span
              style={{
                color: coin.change >= 0 ? "#4ade80" : "#f87171",
                fontSize: "9px",
              }}
            >
              {coin.change >= 0 ? "▲" : "▼"} {Math.abs(coin.change).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: "50px",
          background: scrolled || open ? "rgba(0,0,0,0.96)" : "#000",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid rgba(255,255,255,${scrolled ? "0.1" : "0"})`,
          transition: "border-color 0.3s",
        }}
      >
        {/* Logo / Name */}
        <a
          href="/"
          style={{
            fontFamily: S.fontMain,
            fontSize: "10px",
            letterSpacing: "0.05em",
            fontWeight: 400,
            color: S.offWhite,
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          ЛЕЛИКОВ АЛЕКСАНДР
        </a>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {NAV_ITEMS.map((n) => (
            <a
              key={n.label}
              href={n.href}
              style={{
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                color: S.offWhite,
                textTransform: "uppercase",
                textDecoration: "none",
                opacity: 0.6,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              {n.label}
            </a>
          ))}
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: S.fontMain,
              fontSize: "10px",
              letterSpacing: "0.05em",
              color: S.white,
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "6px 12px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
          >
            TELEGRAM
          </a>
        </nav>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Menu"
        >
          <span
            style={{
              display: "block",
              width: "16px",
              height: "1px",
              background: "#fff",
              transform: open ? "translateY(3px) rotate(45deg)" : "translateY(-2px)",
              transition: "transform 0.5s cubic-bezier(0.33,1,0.68,1)",
              transformOrigin: "50%",
            }}
          />
          <span
            style={{
              display: "block",
              width: "16px",
              height: "1px",
              background: "#fff",
              transform: open ? "translateY(-3px) rotate(-45deg)" : "translateY(2px)",
              transition: "transform 0.5s cubic-bezier(0.33,1,0.68,1)",
              transformOrigin: "50%",
            }}
          />
        </button>
      </header>

      {/* Mobile / fullscreen menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 20px 40px",
          }}
        >
          {NAV_ITEMS.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={close}
              style={{
                fontFamily: S.fontMain,
                fontSize: "clamp(32px, 6vw, 60px)",
                fontWeight: 500,
                letterSpacing: "-0.023em",
                lineHeight: "90%",
                color: S.offWhite,
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                opacity: 0,
                animation: `fadeUp 0.4s ease forwards`,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {n.label}
            </a>
          ))}
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{
              fontFamily: S.fontMain,
              fontSize: "clamp(32px, 6vw, 60px)",
              fontWeight: 500,
              letterSpacing: "-0.023em",
              lineHeight: "90%",
              color: S.offWhite,
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "16px 0",
              opacity: 0,
              animation: `fadeUp 0.4s ease forwards`,
              animationDelay: `${NAV_ITEMS.length * 0.08}s`,
            }}
          >
            TELEGRAM
          </a>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const rows = [
    ["СПЕЦИАЛИЗАЦИЯ:", "МАЙНИНГ / КРИПТО-ИНФРАСТРУКТУРА"],
    ["СТАТУС:", "ОНЛАЙН · ПРИНИМАЮ ПРОЕКТЫ"],
    ["ОПЫТ:", "8 ЛЕТ В МАЙНИНГЕ"],
    ["ЛОКАЦИЯ:", "СНГ / УДАЛЁННО"],
    ["ВРЕМЯ:", timeStr],
  ];

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise / texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          columnGap: "10px",
          padding: "0 10px 80px",
        }}
      >
        {/* Status rows — left col */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          {rows.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                gap: "20px",
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              <span style={{ opacity: 0.4, minWidth: "160px" }}>{k}</span>
              <span style={{ color: S.offWhite }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Big headline */}
        <div style={{ gridColumn: "1 / -1" }}>
          <h1
            style={{
              fontFamily: S.fontMain,
              fontSize: "clamp(56px, 9vw, 120px)",
              fontWeight: 500,
              lineHeight: "90%",
              letterSpacing: "-0.023em",
              textTransform: "uppercase",
              color: S.offWhite,
              margin: 0,
            }}
          >
            ПРЕВРАЩУ ВАШ
            <br />
            КАПИТАЛ В ХЭШРЕЙТ
          </h1>
          <p
            style={{
              fontFamily: S.fontMain,
              fontSize: "10px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: S.offWhite,
              opacity: 0.5,
              marginTop: "20px",
              maxWidth: "400px",
              lineHeight: 1.8,
            }}
          >
            8 лет практики. Запускаю, масштабирую и оптимизирую майнинг —
            от первой фермы до полноценной инфраструктуры.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: "10px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: S.fontMain,
              fontSize: "10px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#000",
              background: S.offWhite,
              padding: "12px 24px",
              textDecoration: "none",
              transition: "opacity 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
          </a>
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: S.fontMain,
              fontSize: "10px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: S.offWhite,
              border: "1px solid rgba(232,230,227,0.3)",
              padding: "12px 24px",
              textDecoration: "none",
              transition: "border-color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,230,227,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(232,230,227,0.3)")}
          >
            НАПИСАТЬ В TELEGRAM →
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            gridColumn: "1 / -1",
            marginTop: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: 0.3,
          }}
        >
          <span
            style={{
              fontFamily: S.fontMain,
              fontSize: "10px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            ПРОКРУТИТЬ
          </span>
          <div
            className="animate-scroll-indicator"
            style={{
              width: "1px",
              height: "24px",
              background: "#fff",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { v: "8", label: "ЛЕТ В МАЙНИНГЕ" },
    { v: "50+", label: "ЗАПУЩЕННЫХ ПРОЕКТОВ" },
    { v: "100+", label: "ЕДИНИЦ ОБОРУДОВАНИЯ" },
    { v: "24/7", label: "ПОДДЕРЖКА" },
  ];

  return (
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "40px 20px",
            borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
            borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          <div
            style={{
              fontFamily: S.fontMain,
              fontSize: "clamp(30px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.023em",
              lineHeight: "90%",
              color: S.offWhite,
              marginBottom: "8px",
            }}
          >
            {s.v}
          </div>
          <div
            style={{
              fontFamily: S.fontCond,
              fontSize: "12px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              opacity: 0.4,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── About / Why me ───────────────────────────────────────────────────────────
function About() {
  const items = [
    ["01", "ПОДБОР ОБОРУДОВАНИЯ", "Получите майнер с реальной окупаемостью — без переплаты и ошибок новичка."],
    ["02", "РАСЧЁТ ДОХОДНОСТИ", "Узнаете точную прибыль до покупки — с учётом курса, сложности и вашего тарифа."],
    ["03", "НАСТРОЙКА И ЗАПУСК", "Ферма запускается за 1–3 дня и с первого дня приносит доход."],
    ["04", "ОПТИМИЗАЦИЯ ЗАТРАТ", "Снизите расходы на электричество на 15–30% без потери мощности."],
    ["05", "МАСШТАБИРОВАНИЕ", "Вырастете от одного ASIC до промышленной фермы по чёткому плану."],
    ["06", "УДАЛЁННОЕ УПРАВЛЕНИЕ", "Ферма работает сама — вы видите статус и доход из любой точки мира."],
    ["07", "ПОДБОР ПОМЕЩЕНИЙ", "Найдёте площадку с низким тарифом и правильным охлаждением с первого раза."],
    ["08", "ИНВЕСТИЦИОННАЯ СТРАТЕГИЯ", "Войдёте в рынок в правильный момент и избежите типичных потерь."],
  ];

  return (
    <section
      id="about"
      style={{
        padding: "80px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          columnGap: "10px",
          padding: "0 10px",
          marginBottom: "60px",
        }}
      >
        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div
              style={{
                fontFamily: S.fontCond,
                fontSize: "12px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                opacity: 0.4,
                marginBottom: "12px",
              }}
            >
              ЧЕМ ПОМОГАЮ
            </div>
            <h2
              style={{
                fontFamily: S.fontMain,
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500,
                letterSpacing: "-0.023em",
                lineHeight: "90%",
                textTransform: "uppercase",
                color: S.offWhite,
                margin: 0,
              }}
            >
              8 ЛЕТ В МАЙНИНГЕ.
              <br />
              ЗНАЮ КАК ЗАРАБОТАТЬ.
            </h2>
          </div>
        </div>
      </div>

      {/* Items list */}
      <div style={{ padding: "0 10px" }}>
        {items.map(([num, title, desc]) => (
          <div
            key={num}
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 1fr",
              columnGap: "10px",
              padding: "20px 0",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              alignItems: "start",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span
              style={{
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                opacity: 0.3,
                paddingTop: "2px",
              }}
            >
              {num}
            </span>
            <span
              style={{
                fontFamily: S.fontCond,
                fontSize: "12px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: S.offWhite,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                lineHeight: 1.8,
                opacity: 0.5,
                maxWidth: "320px",
              }}
            >
              {desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const svcs = [
    {
      code: "01",
      title: "КОНСУЛЬТАЦИЯ\nПО МАЙНИНГУ",
      price: "ОТ $100",
      desc: "Разберём вашу ситуацию, подберём оборудование и составим план старта под ваш бюджет и цели.",
    },
    {
      code: "02",
      title: "МАЙНИНГ\nПОД КЛЮЧ",
      price: "ИНДИВИДУАЛЬНО",
      desc: "Подбор оборудования, доставка, настройка, запуск и дальнейшее сопровождение. Занимаюсь всем.",
    },
    {
      code: "03",
      title: "АУДИТ\nИ ОПТИМИЗАЦИЯ",
      price: "ОТ $300",
      desc: "Повышение эффективности существующих ферм. Нахожу точки роста и устраняю потери.",
    },
    {
      code: "04",
      title: "СОПРОВОЖДЕНИЕ\nИНВЕСТОРОВ",
      price: "ПО ДОГОВОРЁННОСТИ",
      desc: "Помощь в выборе стратегии и расчёте доходности для тех, кто рассматривает майнинг как инвестицию.",
    },
  ];

  return (
    <section
      id="services"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "40px 10px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            fontFamily: S.fontCond,
            fontSize: "12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          УСЛУГИ
        </div>
        <div
          style={{
            fontFamily: S.fontMain,
            fontSize: "10px",
            letterSpacing: "0.05em",
            opacity: 0.4,
          }}
        >
          04 НАПРАВЛЕНИЯ
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {svcs.map((s, i) => (
          <a
            key={i}
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "40px 20px",
              borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
              textDecoration: "none",
              color: "inherit",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span
                style={{
                  fontFamily: S.fontMain,
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  opacity: 0.3,
                }}
              >
                {s.code}
              </span>
              <span
                style={{
                  fontFamily: S.fontCond,
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: S.offWhite,
                  opacity: 0.7,
                }}
              >
                {s.price}
              </span>
            </div>
            <h3
              style={{
                fontFamily: S.fontMain,
                fontSize: "clamp(20px, 2.5vw, 30px)",
                fontWeight: 500,
                letterSpacing: "-0.023em",
                lineHeight: "90%",
                textTransform: "uppercase",
                color: S.offWhite,
                whiteSpace: "pre-line",
                marginBottom: "16px",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                lineHeight: 1.8,
                opacity: 0.5,
                maxWidth: "320px",
              }}
            >
              {s.desc}
            </p>
            <div
              style={{
                marginTop: "24px",
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              УЗНАТЬ ПОДРОБНЕЕ →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Prices ───────────────────────────────────────────────────────────────────
function Prices() {
  const rows = [
    { svc: "КОНСУЛЬТАЦИЯ", price: "ОТ $100", note: "60–90 МИН — СЭКОНОМИТ $500+ НА ОШИБКАХ НОВИЧКА" },
    { svc: "ЗАПУСК ПОД КЛЮЧ", price: "ИНДИВИДУАЛЬНО", note: "ФЕРМА РАБОТАЕТ ЗА 1–3 ДНЯ, ДОХОД С ПЕРВОГО ДНЯ" },
    { svc: "АУДИТ ФЕРМЫ", price: "ОТ $300", note: "НАХОДИТ ПОТЕРИ ДО $1000+/МЕС — ОКУПАЕТСЯ В ПЕРВЫЙ МЕСЯЦ" },
    { svc: "ПОЛНОЕ СОПРОВОЖДЕНИЕ", price: "ПО ДОГОВОРЁННОСТИ", note: "ФЕРМА РАСТЁТ БЕЗ ВАШЕГО УЧАСТИЯ — ВЫ ПОЛУЧАЕТЕ ПРИБЫЛЬ" },
  ];

  return (
    <section
      id="prices"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div
        style={{
          padding: "40px 10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            fontFamily: S.fontCond,
            fontSize: "12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          СТОИМОСТЬ
        </div>
        <div
          style={{
            fontFamily: S.fontMain,
            fontSize: "10px",
            letterSpacing: "0.05em",
            opacity: 0.4,
          }}
        >
          ЦЕНА ОБСУЖДАЕТСЯ НА ЗВОНКЕ
        </div>
      </div>

      {/* Rows */}
      <div>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              padding: "24px 10px",
              borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              gap: "20px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div>
              <div
                style={{
                  fontFamily: S.fontCond,
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: S.offWhite,
                  marginBottom: "4px",
                }}
              >
                {r.svc}
              </div>
              <div
                style={{
                  fontFamily: S.fontMain,
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  opacity: 0.4,
                }}
              >
                {r.note}
              </div>
            </div>
            <div
              style={{
                fontFamily: S.fontMain,
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 500,
                letterSpacing: "-0.023em",
                lineHeight: "90%",
                color: S.offWhite,
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              {r.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", contact: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    color: S.offWhite,
    fontFamily: S.fontMain,
    fontSize: "13px",
    letterSpacing: "0.03em",
    padding: "12px 0",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "40px 10px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            fontFamily: S.fontCond,
            fontSize: "12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: "12px",
          }}
        >
          КОНТАКТ
        </div>
        <h2
          style={{
            fontFamily: S.fontMain,
            fontSize: "clamp(36px, 6vw, 80px)",
            fontWeight: 500,
            letterSpacing: "-0.023em",
            lineHeight: "90%",
            textTransform: "uppercase",
            color: S.offWhite,
            margin: 0,
          }}
        >
          НАЧНИТЕ
          <br />
          ЗДЕСЬ
        </h2>
      </div>

      {/* Two columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: "none",
        }}
      >
        {/* Left — direct contacts */}
        <div
          style={{
            padding: "40px 20px 40px 10px",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                opacity: 0.5,
                lineHeight: 1.8,
                marginBottom: "40px",
                maxWidth: "280px",
              }}
            >
              НАПИШИТЕ МНЕ НАПРЯМУЮ ИЛИ ЗАПОЛНИТЕ ФОРМУ — ОТВЕЧУ ЛИЧНО В ТЕЧЕНИЕ 2 ЧАСОВ.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a
                href={TG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  gap: "16px",
                  fontFamily: S.fontMain,
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: S.offWhite,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{ opacity: 0.4, minWidth: "80px" }}>TELEGRAM</span>
                <span>@ALEX_MIMINGOV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: "40px 10px 40px 20px" }}>
          {status === "sent" ? (
            <div
              style={{
                fontFamily: S.fontMain,
                fontSize: "10px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: S.offWhite,
                lineHeight: 1.8,
              }}
            >
              <div style={{ marginBottom: "8px" }}>ЗАЯВКА ПОЛУЧЕНА.</div>
              <div style={{ opacity: 0.4 }}>ОТВЕЧУ ЛИЧНО В ТЕЧЕНИЕ 2 ЧАСОВ.<br />УЖЕ В ПЕРЕПИСКЕ БЕСПЛАТНО ПОСЧИТАЮ ROI ВАШЕЙ ИДЕИ.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <div
                  style={{
                    fontFamily: S.fontCond,
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                    marginBottom: "8px",
                  }}
                >
                  ИМЯ
                </div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.7)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)")}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: S.fontCond,
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                    marginBottom: "8px",
                  }}
                >
                  TELEGRAM / ТЕЛЕФОН
                </div>
                <input
                  type="text"
                  placeholder="@username или +7..."
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.7)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)")}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: S.fontCond,
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                    marginBottom: "8px",
                  }}
                >
                  СООБЩЕНИЕ
                </div>
                <textarea
                  rows={4}
                  placeholder="Опишите кратко вашу задачу..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  style={{
                    ...inputStyle,
                    resize: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.7)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)")}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    fontFamily: S.fontMain,
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#000",
                    background: S.offWhite,
                    padding: "12px 24px",
                    border: "none",
                    cursor: status === "sending" ? "wait" : "pointer",
                    opacity: status === "sending" ? 0.6 : 1,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.opacity = "0.8"; }}
                  onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.opacity = "1"; }}
                >
                  {status === "sending" ? "ОТПРАВКА..." : "ОТПРАВИТЬ →"}
                </button>
                {status === "error" && (
                  <p
                    style={{
                      fontFamily: S.fontMain,
                      fontSize: "10px",
                      letterSpacing: "0.05em",
                      color: "#ff4444",
                      marginTop: "8px",
                    }}
                  >
                    ОШИБКА. НАПИШИТЕ НАПРЯМУЮ В TELEGRAM.
                  </p>
                )}
                <p
                  style={{
                    fontFamily: S.fontMain,
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    opacity: 0.4,
                    marginTop: "16px",
                    lineHeight: 1.8,
                    maxWidth: "280px",
                  }}
                >
                  ОТВЕЧУ ЛИЧНО В ТЕЧЕНИЕ 2 ЧАСОВ — И БЕСПЛАТНО ПОСЧИТАЮ ROI ВАШЕЙ ИДЕИ ПРЯМО В ПЕРЕПИСКЕ.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        padding: "20px 10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <span
        style={{
          fontFamily: S.fontMain,
          fontSize: "10px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: 0.4,
        }}
      >
        © {new Date().getFullYear()} ЛЕЛИКОВ АЛЕКСАНДР
      </span>
      <span
        style={{
          fontFamily: S.fontMain,
          fontSize: "10px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: 0.4,
        }}
      >
        МАЙНИНГ-ЭКСПЕРТ
      </span>
      <a
        href={TG_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: S.fontMain,
          fontSize: "10px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: S.offWhite,
          textDecoration: "none",
          opacity: 0.4,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
      >
        @ALEX_MIMINGOV
      </a>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <Header />
      <CryptoTicker />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Prices />
      <Contact />
      <Footer />
    </div>
  );
}
