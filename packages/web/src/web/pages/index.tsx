import { useState, useEffect } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const TG_URL =
  "https://t.me/Alex_mimingov?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BC%D0%B0%D0%B9%D0%BD%D0%B8%D0%BD%D0%B3%D1%83";

// ─── Design tokens (SafetyKit-inspired) ───────────────────────────────────────
const T = {
  bg: "#f9f4e6",
  bgDark: "#141414",
  ink: "#141414",
  inkMid: "#545454",
  inkLight: "#b2afa4",
  red: "#fb4f2f",
  border: "#d9d4c7",
  borderDark: "#2a2a2a",
  fontSans: "'Instrument Sans', system-ui, sans-serif",
  fontMono: "'DM Mono', 'Courier New', monospace",
} as const;

// ─── Global CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${T.bg};
    color: ${T.ink};
    font-family: ${T.fontSans};
    -webkit-font-smoothing: antialiased;
  }
  ::selection { background: ${T.red}; color: #fff; }

  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    background: ${T.red};
    color: #fff;
    font-family: ${T.fontMono};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    border-radius: 0;
    transition: opacity 0.15s;
  }
  .btn-primary:hover { opacity: 0.88; }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    background: transparent;
    color: ${T.ink};
    font-family: ${T.fontMono};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid ${T.border};
    cursor: pointer;
    border-radius: 0;
    transition: border-color 0.15s, background 0.15s;
  }
  .btn-ghost:hover { border-color: ${T.ink}; background: rgba(0,0,0,0.04); }

  .mono-label {
    font-family: ${T.fontMono};
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${T.inkMid};
  }

  .nav-link {
    font-family: ${T.fontSans};
    font-size: 14px;
    font-weight: 500;
    color: ${T.inkMid};
    text-decoration: none;
    letter-spacing: 0.01em;
    transition: color 0.15s;
  }
  .nav-link:hover { color: ${T.ink}; }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border: 1px solid ${T.border};
    border-radius: 999px;
    font-family: ${T.fontMono};
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${T.inkMid};
  }

  .divider { border: none; border-top: 1px solid ${T.border}; }

  input, textarea {
    background: #fff;
    border: 1px solid ${T.border};
    border-radius: 0;
    color: ${T.ink};
    font-family: ${T.fontSans};
    font-size: 15px;
    padding: 14px 16px;
    outline: none;
    width: 100%;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }
  input::placeholder, textarea::placeholder { color: ${T.inkLight}; }
  input:focus, textarea:focus { border-color: ${T.ink}; }

  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .four-col { grid-template-columns: 1fr 1fr !important; }
    .hide-mobile { display: none !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-img { display: none !important; }
  }
`;

// ─── Ticker ────────────────────────────────────────────────────────────────────
const FACTS = [
  "ПРИНИМАЮ ПРОЕКТЫ",
  "8 ЛЕТ ОПЫТА",
  "50+ КЛИЕНТОВ",
  "ЗАПУСК ЗА 1–3 ДНЯ",
  "ОТВЕЧУ ЗА 2 ЧАСА",
  "БЕСПЛАТНЫЙ РАСЧЁТ ROI",
  "МАЙНИНГ ПОД КЛЮЧ",
  "ДОХОД С ПЕРВОГО ДНЯ",
];

function Ticker() {
  const items = [...FACTS, ...FACTS];
  return (
    <div
      style={{
        overflow: "hidden",
        borderBottom: `1px solid ${T.border}`,
        height: 36,
        display: "flex",
        alignItems: "center",
        background: T.bgDark,
      }}
    >
      <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
        {items.map((f, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "0 28px",
              fontFamily: T.fontMono,
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(249,244,230,0.45)",
            }}
          >
            {f}
            <span style={{ color: T.red, fontSize: 8 }}>■</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Цены", href: "#prices" },
    { label: "Контакт", href: "#contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(249,244,230,0.95)" : T.bg,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${T.border}`,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: T.red,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
          <span style={{ fontFamily: T.fontSans, fontWeight: 700, fontSize: 16, color: T.ink, letterSpacing: "-0.01em" }}>
            Леликов
          </span>
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 28 }} className="hide-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn-primary hide-mobile" style={{ padding: "10px 20px", fontSize: 11 }}>
          Написать →
        </a>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: T.ink, padding: 4 }}
          className="show-mobile"
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open
              ? <><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></>
              : <><line x1={3} y1={7} x2={21} y2={7}/><line x1={3} y1={12} x2={21} y2={12}/><line x1={3} y1={17} x2={21} y2={17}/></>
            }
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "20px 32px 28px" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{ display: "block", padding: "14px 0", fontSize: 18, borderBottom: `1px solid ${T.border}` }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 20, justifyContent: "center", width: "100%" }}>
            Написать в Telegram →
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ borderBottom: `1px solid ${T.border}` }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100vh - 97px)",
          alignItems: "stretch",
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 60px 80px 0",
            borderRight: `1px solid ${T.border}`,
          }}
        >
          {/* Status dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                animation: "pulse 2.5s infinite",
              }}
            />
            <span className="mono-label">Принимаю проекты · СНГ / удалённо</span>
          </div>

          <h1
            style={{
              fontFamily: T.fontSans,
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: T.ink,
              marginBottom: 24,
            }}
          >
            Майнинг,{" "}
            <span style={{ color: T.red }}>который окупается.</span>
          </h1>

          <p
            style={{
              fontFamily: T.fontSans,
              fontSize: 17,
              lineHeight: 1.65,
              color: T.inkMid,
              maxWidth: 420,
              marginBottom: 40,
            }}
          >
            8 лет в крипто-инфраструктуре. Запускаю, масштабирую и оптимизирую майнинговые фермы — от первого ASIC до промышленной установки.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Получить консультацию →
            </a>
            <a href="#services" className="btn-ghost">
              Посмотреть услуги
            </a>
          </div>
        </div>

        {/* Right — photo */}
        <div
          className="hero-img"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <img
            src="/alex.jpg"
            alt="Александр Леликов — майнинг-эксперт"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(30%) contrast(1.05)",
              display: "block",
            }}
          />
          {/* Red bar accent (SafetyKit style) */}
          <div
            style={{
              position: "absolute",
              top: "38%",
              left: 0,
              right: 0,
              height: 44,
              background: T.red,
              opacity: 0.88,
              mixBlendMode: "multiply",
            }}
          />
          {/* Bottom label */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "16px 24px",
              background: "rgba(20,20,20,0.75)",
              backdropFilter: "blur(6px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: T.fontMono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(249,244,230,0.7)" }}>
              АЛЕКСАНДР ЛЕЛИКОВ
            </span>
            <span style={{ fontFamily: T.fontMono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.red }}>
              ЭКСПЕРТ ПО МАЙНИНГУ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { v: "8", unit: "лет", label: "в майнинге" },
    { v: "50+", unit: "", label: "запущенных проектов" },
    { v: "100+", unit: "", label: "единиц оборудования" },
    { v: "24/7", unit: "", label: "поддержка клиентов" },
  ];
  return (
    <section style={{ borderBottom: `1px solid ${T.border}` }}>
      <div
        className="four-col"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "40px 32px",
              borderRight: i < stats.length - 1 ? `1px solid ${T.border}` : "none",
            }}
          >
            <div
              style={{
                fontFamily: T.fontSans,
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: T.ink,
                marginBottom: 6,
              }}
            >
              {s.v}
              {s.unit && <span style={{ fontSize: "0.5em", fontWeight: 500, marginLeft: 4, color: T.inkMid }}>{s.unit}</span>}
            </div>
            <div className="mono-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    code: "01",
    title: "Консультация по майнингу",
    price: "от $100",
    tags: ["подбор оборудования", "расчёт ROI", "план старта"],
    desc: "Разберём вашу ситуацию, подберём оборудование и составим план старта под ваш бюджет. 60–90 минут — сэкономит $500+ на ошибках новичка.",
  },
  {
    code: "02",
    title: "Майнинг под ключ",
    price: "индивидуально",
    tags: ["покупка", "доставка", "настройка", "запуск"],
    desc: "Подбор оборудования, доставка, настройка, запуск и дальнейшее сопровождение. Ферма работает с первого дня без вашего участия.",
  },
  {
    code: "03",
    title: "Аудит и оптимизация",
    price: "от $300",
    tags: ["экономия 15–30%", "анализ потерь", "рост дохода"],
    desc: "Повышение эффективности существующих ферм. Нахожу точки роста и потери до $1000+/мес — окупается в первый месяц.",
  },
  {
    code: "04",
    title: "Сопровождение инвесторов",
    price: "по договорённости",
    tags: ["стратегия входа", "расчёт доходности", "снижение рисков"],
    desc: "Помощь в выборе стратегии и расчёте доходности. Ферма растёт без вашего участия — вы получаете прибыль.",
  },
];

function Services() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section id="services" style={{ borderBottom: `1px solid ${T.border}` }}>
      {/* Header */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 32px 40px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div className="mono-label" style={{ marginBottom: 12 }}>Услуги</div>
          <h2
            style={{
              fontFamily: T.fontSans,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: T.ink,
            }}
          >
            Чем могу помочь.
          </h2>
        </div>
        <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Обсудить проект →
        </a>
      </div>

      {/* Tabs + content */}
      <div
        className="two-col"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
        }}
      >
        {/* Sidebar tabs */}
        <div style={{ borderRight: `1px solid ${T.border}` }}>
          {SERVICES.map((sv, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: "100%",
                padding: "20px 32px",
                background: active === i ? "#fff" : "transparent",
                border: "none",
                borderBottom: `1px solid ${T.border}`,
                borderLeft: active === i ? `3px solid ${T.red}` : "3px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <span className="mono-label" style={{ color: active === i ? T.ink : T.inkLight }}>
                {sv.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "40px 48px" }}>
          <div className="mono-label" style={{ marginBottom: 12 }}>
            {s.code} / {s.price}
          </div>
          <h3
            style={{
              fontFamily: T.fontSans,
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: T.ink,
              marginBottom: 20,
            }}
          >
            {s.title}.
          </h3>
          <p style={{ fontFamily: T.fontSans, fontSize: 16, color: T.inkMid, lineHeight: 1.7, marginBottom: 28 }}>
            {s.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {s.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Узнать подробнее →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
const SKILLS = [
  { n: "01", title: "Подбор оборудования", desc: "Получите майнер с реальной окупаемостью — без переплаты и ошибок новичка." },
  { n: "02", title: "Расчёт доходности", desc: "Точная прибыль до покупки — с учётом курса, сложности и вашего тарифа." },
  { n: "03", title: "Настройка и запуск", desc: "Ферма запускается за 1–3 дня и с первого дня приносит доход." },
  { n: "04", title: "Оптимизация затрат", desc: "Снижу расходы на электричество на 15–30% без потери мощности." },
  { n: "05", title: "Масштабирование", desc: "От одного ASIC до промышленной фермы по чёткому плану." },
  { n: "06", title: "Удалённое управление", desc: "Ферма работает сама — вы видите статус и доход из любой точки мира." },
];

function About() {
  return (
    <section style={{ borderBottom: `1px solid ${T.border}`, background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ padding: "60px 32px 40px", borderBottom: `1px solid ${T.border}` }}>
          <div className="mono-label" style={{ marginBottom: 12 }}>О подходе</div>
          <h2
            style={{
              fontFamily: T.fontSans,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: T.ink,
              maxWidth: 700,
            }}
          >
            8 лет в майнинге. Знаю, как превратить деньги в доход.
          </h2>
        </div>

        {/* Grid */}
        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Left — text */}
          <div style={{ padding: "40px 32px", borderRight: `1px solid ${T.border}` }}>
            <p style={{ fontFamily: T.fontSans, fontSize: 16, color: T.inkMid, lineHeight: 1.7, marginBottom: 24 }}>
              Работаю с клиентами по всему СНГ и за рубежом. Помогаю как начинающим инвесторам, так и тем, кто уже имеет фермы и хочет их оптимизировать или масштабировать.
            </p>
            <p style={{ fontFamily: T.fontSans, fontSize: 16, color: T.inkMid, lineHeight: 1.7, marginBottom: 36 }}>
              Каждый проект — индивидуальный подход. Никаких шаблонных решений: только то, что реально работает в вашей ситуации.
            </p>
            <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Бесплатный расчёт ROI →
            </a>
          </div>

          {/* Right — skill rows */}
          <div>
            {SKILLS.map((sk, i) => (
              <div
                key={sk.n}
                style={{
                  padding: "20px 32px",
                  borderBottom: i < SKILLS.length - 1 ? `1px solid ${T.border}` : "none",
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  transition: "background 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span className="mono-label" style={{ minWidth: 24, paddingTop: 2, color: T.red }}>{sk.n}</span>
                <div>
                  <div style={{ fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{sk.title}</div>
                  <div style={{ fontFamily: T.fontSans, fontSize: 14, color: T.inkMid, lineHeight: 1.6 }}>{sk.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Prices ────────────────────────────────────────────────────────────────────
const PRICES = [
  { svc: "Консультация", price: "от $100", note: "60–90 мин — сэкономит $500+ на ошибках" },
  { svc: "Майнинг под ключ", price: "индивидуально", note: "Ферма работает за 1–3 дня, доход с первого дня" },
  { svc: "Аудит фермы", price: "от $300", note: "Окупается в первый месяц — находит потери до $1000+/мес" },
  { svc: "Полное сопровождение", price: "по договорённости", note: "Ферма растёт без вашего участия" },
];

function Prices() {
  return (
    <section id="prices" style={{ borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            padding: "60px 32px 40px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="mono-label" style={{ marginBottom: 12 }}>Стоимость</div>
            <h2
              style={{
                fontFamily: T.fontSans,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: T.ink,
              }}
            >
              Прозрачные цены.
            </h2>
          </div>
          <span className="mono-label">Точная цена — на звонке</span>
        </div>

        {/* Rows */}
        {PRICES.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "28px 32px",
              borderBottom: i < PRICES.length - 1 ? `1px solid ${T.border}` : "none",
              gap: 20,
              flexWrap: "wrap",
              transition: "background 0.15s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div>
              <div style={{ fontFamily: T.fontSans, fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{r.svc}</div>
              <div className="mono-label">{r.note}</div>
            </div>
            <div
              style={{
                fontFamily: T.fontSans,
                fontSize: 20,
                fontWeight: 700,
                color: T.ink,
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

// ─── Contact ────────────────────────────────────────────────────────────────────
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
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={{ background: T.bgDark, borderBottom: `1px solid ${T.borderDark}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ padding: "60px 32px 40px", borderBottom: `1px solid ${T.borderDark}` }}>
          <div className="mono-label" style={{ color: "rgba(249,244,230,0.4)", marginBottom: 12 }}>Контакт</div>
          <h2
            style={{
              fontFamily: T.fontSans,
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: "#f9f4e6",
            }}
          >
            Начните здесь.
          </h2>
        </div>

        {/* Two cols */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Left */}
          <div style={{ padding: "40px 32px", borderRight: `1px solid ${T.borderDark}` }}>
            <p style={{ fontFamily: T.fontSans, fontSize: 16, color: "rgba(249,244,230,0.55)", lineHeight: 1.7, marginBottom: 40, maxWidth: 340 }}>
              Напишите напрямую или заполните форму. Отвечу лично в течение 2 часов и бесплатно посчитаю ROI прямо в переписке.
            </p>
            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                textDecoration: "none",
                padding: "20px 0",
                borderTop: `1px solid ${T.borderDark}`,
                borderBottom: `1px solid ${T.borderDark}`,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill={T.red}>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.288c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.396 4.52 13.49c-.65-.204-.664-.65.136-.963l10.879-4.194c.537-.194 1.009.135.027.915z" />
              </svg>
              <div>
                <div className="mono-label" style={{ color: "rgba(249,244,230,0.4)", marginBottom: 4 }}>Telegram</div>
                <div style={{ fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, color: "#f9f4e6" }}>@Alex_mimingov</div>
              </div>
            </a>
          </div>

          {/* Right — form */}
          <div style={{ padding: "40px 32px" }}>
            {status === "sent" ? (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: T.red,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div style={{ fontFamily: T.fontSans, fontSize: 20, fontWeight: 700, color: "#f9f4e6", marginBottom: 8 }}>Заявка получена</div>
                <div style={{ fontFamily: T.fontSans, fontSize: 15, color: "rgba(249,244,230,0.5)", lineHeight: 1.6 }}>
                  Отвечу лично в течение 2 часов.<br />
                  Бесплатно посчитаю ROI вашей идеи.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div className="mono-label" style={{ color: "rgba(249,244,230,0.4)", marginBottom: 8 }}>Имя</div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${T.borderDark}`, color: "#f9f4e6" }}
                  />
                </div>
                <div>
                  <div className="mono-label" style={{ color: "rgba(249,244,230,0.4)", marginBottom: 8 }}>Telegram / телефон</div>
                  <input
                    type="text"
                    placeholder="@username или +7..."
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    required
                    style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${T.borderDark}`, color: "#f9f4e6" }}
                  />
                </div>
                <div>
                  <div className="mono-label" style={{ color: "rgba(249,244,230,0.4)", marginBottom: 8 }}>Сообщение</div>
                  <textarea
                    rows={4}
                    placeholder="Опишите кратко вашу задачу..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ resize: "none", background: "rgba(255,255,255,0.06)", border: `1px solid ${T.borderDark}`, color: "#f9f4e6" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{ justifyContent: "center", opacity: status === "sending" ? 0.6 : 1 }}
                >
                  {status === "sending" ? "Отправка..." : "Отправить →"}
                </button>
                {status === "error" && (
                  <p style={{ fontFamily: T.fontMono, fontSize: 12, color: "#f87171" }}>
                    Ошибка. Напишите напрямую в Telegram.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: T.bgDark, borderTop: `1px solid ${T.borderDark}` }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span className="mono-label" style={{ color: "rgba(249,244,230,0.35)" }}>
          © {new Date().getFullYear()} Леликов Александр — Майнинг-эксперт
        </span>
        <a
          href={TG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-label"
          style={{ color: "rgba(249,244,230,0.35)", textDecoration: "none", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f9f4e6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(249,244,230,0.35)")}
        >
          @Alex_mimingov
        </a>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.ink }}>
      <style>{GLOBAL_CSS}</style>
      <Header />
      <Ticker />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Prices />
      <Contact />
      <Footer />
    </div>
  );
}
