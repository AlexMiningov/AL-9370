import { useState, useEffect, useRef } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const TG_URL =
  "https://t.me/Alex_mimingov?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BC%D0%B0%D0%B9%D0%BD%D0%B8%D0%BD%D0%B3%D1%83";

// ─── Design tokens (Mitra-inspired) ──────────────────────────────────────────
const T = {
  bg: "#19181a",
  bgCard: "#1f1e21",
  bgCardHover: "#242325",
  border: "rgba(255,255,255,0.07)",
  cream: "#ffeadf",       // warm peach accent (Mitra's #ffeadf)
  creamDim: "#c5afa5",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.38)",
  font: "'Instrument Sans', 'Inter', system-ui, sans-serif",
} as const;

// ─── Global styles injected once ──────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${T.bg}; color: ${T.white}; font-family: ${T.font}; -webkit-font-smoothing: antialiased; }

  ::selection { background: ${T.cream}; color: #000; }

  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  .fade-up { animation: fadeUp 0.8s ease both; }
  .fade-up-1 { animation-delay: 0.1s; }
  .fade-up-2 { animation-delay: 0.22s; }
  .fade-up-3 { animation-delay: 0.34s; }
  .fade-up-4 { animation-delay: 0.46s; }

  .pill-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 999px;
    font-family: ${T.font};
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: transform 0.18s ease, opacity 0.18s ease, background 0.18s ease;
  }
  .pill-btn:hover { transform: scale(1.03); opacity: 0.92; }
  .pill-btn:active { transform: scale(0.98); }

  .pill-btn-primary { background: ${T.cream}; color: #111; }
  .pill-btn-ghost   { background: rgba(255,255,255,0.09); color: ${T.white}; }

  .card {
    background: ${T.bgCard};
    border-radius: 16px;
    border: 1px solid ${T.border};
    transition: background 0.2s ease, border-color 0.2s ease;
    overflow: hidden;
  }
  .card:hover {
    background: ${T.bgCardHover};
    border-color: rgba(255,255,255,0.14);
  }

  .nav-link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    transition: color 0.18s;
  }
  .nav-link:hover { color: #fff; }

  input, textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid ${T.border};
    border-radius: 12px;
    color: ${T.white};
    font-family: ${T.font};
    font-size: 15px;
    padding: 14px 18px;
    outline: none;
    width: 100%;
    transition: border-color 0.18s;
    -webkit-appearance: none;
  }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.28); }
  input:focus, textarea:focus { border-color: rgba(255,255,255,0.3); }

  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
    .four-col { grid-template-columns: 1fr 1fr !important; }
    .hide-mobile { display: none !important; }
    .hero-h1 { font-size: clamp(42px, 11vw, 80px) !important; }
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
    <div style={{ overflow: "hidden", borderBottom: `1px solid ${T.border}`, height: 36, display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          animation: "ticker 30s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {items.map((f, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "0 24px",
              fontFamily: T.font,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: T.muted,
            }}
          >
            {f}
            <span style={{ color: T.cream, fontSize: 8 }}>◆</span>
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
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
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
        background: scrolled ? "rgba(25,24,26,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: T.cream,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#111", fontSize: 14, fontWeight: 700, fontFamily: T.font }}>A</span>
          </div>
          <span style={{ fontFamily: T.font, fontWeight: 600, fontSize: 15, color: T.white }}>Леликов</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hide-mobile">
          {navLinks.map((n) => (
            <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-primary hide-mobile" style={{ padding: "10px 22px", fontSize: 14 }}>
          Написать в Telegram
        </a>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: T.white, cursor: "pointer", padding: 4, display: "none" }}
          className="show-mobile"
          aria-label="Menu"
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open
              ? <><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></>
              : <><line x1={3} y1={7} x2={21} y2={7} /><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={17} x2={21} y2={17} /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "20px 24px 28px" }}>
          {navLinks.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav-link"
              style={{ display: "block", padding: "12px 0", fontSize: 18, borderBottom: `1px solid ${T.border}` }}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-primary"
            style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
            onClick={() => setOpen(false)}
          >
            Написать в Telegram
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        maxWidth: 1160,
        margin: "0 auto",
        padding: "80px 24px 100px",
        textAlign: "center",
      }}
    >
      {/* Status badge */}
      <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`, borderRadius: 999, padding: "6px 16px", marginBottom: 48 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite", display: "inline-block" }} />
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.muted }}>Принимаю проекты · Отвечу за 2 часа</span>
      </div>

      {/* Headline */}
      <h1
        className="fade-up fade-up-1 hero-h1"
        style={{
          fontFamily: T.font,
          fontSize: "clamp(52px, 8vw, 112px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: T.white,
          marginBottom: 28,
        }}
      >
        Майнинг,{" "}
        <span
          style={{
            background: `linear-gradient(135deg, ${T.cream} 0%, #e8a87c 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          который работает
        </span>
        <br />
        с первого дня
      </h1>

      {/* Sub */}
      <p
        className="fade-up fade-up-2"
        style={{
          fontFamily: T.font,
          fontSize: 18,
          lineHeight: 1.65,
          color: T.muted,
          maxWidth: 520,
          margin: "0 auto 52px",
        }}
      >
        8 лет в крипто-инфраструктуре. Запускаю, масштабирую и оптимизирую фермы — от первого ASIC до промышленной установки.
      </p>

      {/* CTAs */}
      <div className="fade-up fade-up-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
        <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-primary" style={{ fontSize: 16 }}>
          Получить консультацию
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#services" className="pill-btn pill-btn-ghost" style={{ fontSize: 16 }}>
          Посмотреть услуги
        </a>
      </div>

      {/* Photo + stats row */}
      <div
        className="fade-up fade-up-4"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 40,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Left stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "right" }}>
          {[
            { v: "8 лет", l: "опыта в майнинге" },
            { v: "50+", l: "запущенных проектов" },
          ].map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: T.font, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: T.white }}>{s.v}</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: T.muted, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Photo */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: "clamp(180px, 22vw, 280px)",
              height: "clamp(220px, 28vw, 340px)",
              borderRadius: 20,
              overflow: "hidden",
              border: `1px solid ${T.border}`,
              position: "relative",
            }}
          >
            <img
              src="/alex.jpg"
              alt="Александр Леликов — эксперт по майнингу"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(15%)",
                display: "block",
              }}
            />
            {/* Cream bottom gradient accent */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${T.cream}, #e8a87c)`,
              }}
            />
          </div>
          {/* Name badge */}
          <div
            style={{
              position: "absolute",
              bottom: -16,
              left: "50%",
              transform: "translateX(-50%)",
              background: T.bgCard,
              border: `1px solid ${T.border}`,
              borderRadius: 999,
              padding: "6px 18px",
              whiteSpace: "nowrap",
              fontFamily: T.font,
              fontSize: 13,
              fontWeight: 500,
              color: T.white,
            }}
          >
            Александр Леликов
          </div>
        </div>

        {/* Right stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}>
          {[
            { v: "100+", l: "единиц оборудования" },
            { v: "24/7", l: "поддержка клиентов" },
          ].map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: T.font, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: T.white }}>{s.v}</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: T.muted, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "M9 3H15M9 3C9 3 3 5 3 12C3 19 9 21 12 21C15 21 21 19 21 12C21 5 15 3 15 3M9 3C9 3 12 5 12 12M15 3C15 3 12 5 12 12M12 12V21",
    title: "Консультация по майнингу",
    price: "от $100",
    desc: "Разберём вашу ситуацию, подберём оборудование и составим план старта под ваш бюджет и цели. 60–90 минут.",
  },
  {
    icon: "M13 10V3L4 14H11V21L20 10H13Z",
    title: "Майнинг под ключ",
    price: "индивидуально",
    desc: "Подбор оборудования, доставка, настройка, запуск и дальнейшее сопровождение. Ферма работает с первого дня.",
  },
  {
    icon: "M9 19V13M12 19V7M15 19V11M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z",
    title: "Аудит и оптимизация",
    price: "от $300",
    desc: "Повышение эффективности существующих ферм. Нахожу потери до $1000+/мес и устраняю их в первый месяц.",
  },
  {
    icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
    title: "Сопровождение инвесторов",
    price: "по договорённости",
    desc: "Помощь в выборе стратегии и расчёте доходности для тех, кто рассматривает майнинг как инвестицию.",
  },
];

function Services() {
  return (
    <section id="services" style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
      {/* Section label */}
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Услуги</span>
        <h2
          style={{
            fontFamily: T.font,
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: T.white,
            marginTop: 12,
          }}
        >
          Чем могу помочь
        </h2>
      </div>

      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {SERVICES.map((s, i) => (
          <a
            key={i}
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: "32px 28px", textDecoration: "none", color: "inherit", display: "block" }}
          >
            {/* Icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `rgba(255,234,223,0.1)`,
                border: `1px solid rgba(255,234,223,0.15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={T.cream} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>

            {/* Price tag */}
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.cream, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{s.price}</div>

            <h3 style={{ fontFamily: T.font, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: T.white, marginBottom: 12, lineHeight: 1.2 }}>
              {s.title}
            </h3>

            <p style={{ fontFamily: T.font, fontSize: 15, color: T.muted, lineHeight: 1.65 }}>{s.desc}</p>

            <div style={{ marginTop: 24, fontFamily: T.font, fontSize: 14, color: T.creamDim, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              Узнать подробнее
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── About / What I do ────────────────────────────────────────────────────────
const SKILLS = [
  { n: "01", title: "Подбор оборудования", desc: "Получите майнер с реальной окупаемостью — без переплаты." },
  { n: "02", title: "Расчёт доходности", desc: "Точная прибыль до покупки — с учётом курса, сложности и тарифа." },
  { n: "03", title: "Настройка и запуск", desc: "Ферма запускается за 1–3 дня и с первого дня приносит доход." },
  { n: "04", title: "Оптимизация затрат", desc: "Снижу расходы на электричество на 15–30% без потери мощности." },
  { n: "05", title: "Масштабирование", desc: "От одного ASIC до промышленной фермы по чёткому плану." },
  { n: "06", title: "Удалённое управление", desc: "Ферма работает сама — вы видите статус и доход из любой точки." },
];

function About() {
  return (
    <section id="about" style={{ background: T.bgCard, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
        >
          {/* Left */}
          <div>
            <span style={{ fontFamily: T.font, fontSize: 13, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>О подходе</span>
            <h2
              style={{
                fontFamily: T.font,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: T.white,
                marginTop: 12,
                marginBottom: 28,
              }}
            >
              8 лет в майнинге.
              <br />
              <span style={{ color: T.cream }}>Знаю как заработать.</span>
            </h2>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.muted, lineHeight: 1.7, marginBottom: 36 }}>
              Работаю с клиентами по СНГ и за рубежом. Помогаю как начинающим инвесторам, так и тем, кто уже имеет фермы и хочет их оптимизировать.
            </p>
            <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-primary" style={{ fontSize: 15 }}>
              Бесплатный расчёт ROI
            </a>
          </div>

          {/* Right — skill list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {SKILLS.map((sk, i) => (
              <div
                key={sk.n}
                style={{
                  padding: "20px 0",
                  borderBottom: i < SKILLS.length - 1 ? `1px solid ${T.border}` : "none",
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontFamily: T.font, fontSize: 12, color: T.muted, minWidth: 28, paddingTop: 3 }}>{sk.n}</span>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 600, color: T.white, marginBottom: 4 }}>{sk.title}</div>
                  <div style={{ fontFamily: T.font, fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{sk.desc}</div>
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
  { svc: "Консультация", price: "от $100", note: "60–90 мин — сэкономит $500+ на ошибках новичка" },
  { svc: "Майнинг под ключ", price: "индивидуально", note: "Ферма работает за 1–3 дня, доход с первого дня" },
  { svc: "Аудит фермы", price: "от $300", note: "Находит потери до $1000+/мес — окупается в первый месяц" },
  { svc: "Полное сопровождение", price: "по договорённости", note: "Ферма растёт без вашего участия — вы получаете прибыль" },
];

function Prices() {
  return (
    <section id="prices" style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Стоимость</span>
        <h2
          style={{
            fontFamily: T.font,
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: T.white,
            marginTop: 12,
          }}
        >
          Прозрачные цены
        </h2>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        {PRICES.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px 28px",
              borderBottom: i < PRICES.length - 1 ? `1px solid ${T.border}` : "none",
              gap: 20,
              flexWrap: "wrap",
              transition: "background 0.18s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.bgCardHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div>
              <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 600, color: T.white, marginBottom: 4 }}>{r.svc}</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: T.muted }}>{r.note}</div>
            </div>
            <div style={{ fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.cream, whiteSpace: "nowrap" }}>{r.price}</div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: T.font, fontSize: 14, color: T.muted, marginTop: 20, textAlign: "center" }}>
        Точная цена обсуждается на звонке — бесплатно посчитаю ROI прямо в переписке
      </p>
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
    <section id="contact" style={{ background: T.bgCard, borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
        >
          {/* Left */}
          <div>
            <span style={{ fontFamily: T.font, fontSize: 13, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Контакт</span>
            <h2
              style={{
                fontFamily: T.font,
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: T.white,
                marginTop: 12,
                marginBottom: 24,
              }}
            >
              Начните
              <br />
              <span style={{ color: T.cream }}>здесь</span>
            </h2>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 360 }}>
              Напишите напрямую или заполните форму — отвечу лично в течение 2 часов и бесплатно посчитаю ROI.
            </p>
            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn-ghost"
              style={{ fontSize: 15 }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill={T.cream}>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.288c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.396 4.52 13.49c-.65-.204-.664-.65.136-.963l10.879-4.194c.537-.194 1.009.135.027.915z" />
              </svg>
              @Alex_mimingov
            </a>
          </div>

          {/* Right — form */}
          <div>
            {status === "sent" ? (
              <div className="card" style={{ padding: "40px 28px", textAlign: "center" }}>
                <div style={{ fontFamily: T.font, fontSize: 40, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.white, marginBottom: 8 }}>Заявка получена</div>
                <div style={{ fontFamily: T.font, fontSize: 15, color: T.muted, lineHeight: 1.6 }}>
                  Отвечу лично в течение 2 часов.<br />
                  В переписке бесплатно посчитаю ROI вашей идеи.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: T.font, fontSize: 13, color: T.muted, display: "block", marginBottom: 8 }}>Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontFamily: T.font, fontSize: 13, color: T.muted, display: "block", marginBottom: 8 }}>Telegram / телефон</label>
                  <input
                    type="text"
                    placeholder="@username или +7..."
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontFamily: T.font, fontSize: 13, color: T.muted, display: "block", marginBottom: 8 }}>Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите кратко вашу задачу..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ resize: "none" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="pill-btn pill-btn-primary"
                  style={{ fontSize: 16, justifyContent: "center", opacity: status === "sending" ? 0.6 : 1 }}
                >
                  {status === "sending" ? "Отправка..." : "Отправить →"}
                </button>
                {status === "error" && (
                  <p style={{ fontFamily: T.font, fontSize: 13, color: "#f87171", marginTop: 4 }}>
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
    <footer
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "28px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        maxWidth: 1160,
        margin: "0 auto",
      }}
    >
      <span style={{ fontFamily: T.font, fontSize: 14, color: T.muted }}>
        © {new Date().getFullYear()} Леликов Александр — Майнинг-эксперт
      </span>
      <a
        href={TG_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: T.font, fontSize: 14, color: T.muted, textDecoration: "none", transition: "color 0.18s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = T.white)}
        onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
      >
        @Alex_mimingov
      </a>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.white }}>
      <style>{GLOBAL_CSS}</style>
      <Header />
      <Ticker />
      <Hero />
      <Services />
      <About />
      <Prices />
      <Contact />
      <Footer />
    </div>
  );
}
