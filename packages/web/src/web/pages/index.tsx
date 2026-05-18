import { useState, useEffect } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const TG_URL =
  "https://t.me/Alex_mimingov?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BC%D0%B0%D0%B9%D0%BD%D0%B8%D0%BD%D0%B3%D1%83";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:        "#000000",
  bg2:       "#0a0a0a",
  bg3:       "#111111",
  card:      "rgba(255,255,255,0.04)",
  border:    "rgba(255,255,255,0.08)",
  borderHov: "rgba(255,255,255,0.16)",
  text:      "#ffffff",
  muted:     "#888888",
  purple:    "#a77cff",
  purpleDim: "#7d53f2",
  green:     "#4ade80",
  font:      "'AlphaLyrae', system-ui, sans-serif",
  fontBody:  "system-ui, -apple-system, sans-serif",
} as const;

// ─── Global CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @font-face {
    font-family: 'AlphaLyrae';
    src: url('/AlphaLyrae-Medium.woff2') format('woff2'),
         url('/AlphaLyrae-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${T.bg};
    color: ${T.text};
    font-family: ${T.fontBody};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  ::selection { background: ${T.purpleDim}; color: #fff; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${T.bg}; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ticker-wrap { overflow: hidden; background: ${T.bg3}; border-top: 1px solid ${T.border}; border-bottom: 1px solid ${T.border}; }
  .ticker-track { display: flex; width: max-content; animation: ticker 28s linear infinite; }
  .ticker-item { white-space: nowrap; padding: 10px 48px; font-size: 13px; color: ${T.muted}; letter-spacing: 0.04em; font-family: ${T.fontBody}; }
  .ticker-item span { color: ${T.green}; margin-right: 6px; }

  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(167,124,255,0.18) 0%, transparent 70%);
    border-radius: 50%;
    animation: glow-pulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  .fade-up { animation: fadeUp 0.6s ease both; }

  .card {
    background: ${T.card};
    border: 1px solid ${T.border};
    border-radius: 12px;
    transition: border-color 0.2s, background 0.2s;
  }
  .card:hover {
    border-color: ${T.borderHov};
    background: rgba(255,255,255,0.07);
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 22px;
    border: 1px solid ${T.purple};
    background: transparent;
    color: ${T.purple};
    border-radius: 8px;
    font-size: 14px;
    font-family: ${T.fontBody};
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    text-decoration: none;
  }
  .btn-primary:hover { background: ${T.purple}; color: #000; }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 22px;
    border: 1px solid ${T.border};
    background: transparent;
    color: ${T.text};
    border-radius: 8px;
    font-size: 14px;
    font-family: ${T.fontBody};
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    text-decoration: none;
  }
  .btn-ghost:hover { border-color: ${T.borderHov}; background: rgba(255,255,255,0.05); }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${T.purple};
    font-family: ${T.fontBody};
    margin-bottom: 12px;
  }

  .price-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid ${T.border};
    transition: background 0.15s;
  }
  .price-row:last-child { border-bottom: none; }
  .price-row:hover { background: rgba(255,255,255,0.03); }

  nav a { text-decoration: none; color: ${T.muted}; font-size: 14px; transition: color 0.15s; }
  nav a:hover { color: ${T.text}; }

  input, textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid ${T.border};
    border-radius: 8px;
    color: ${T.text};
    font-family: ${T.fontBody};
    font-size: 14px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s;
  }
  input::placeholder, textarea::placeholder { color: ${T.muted}; }
  input:focus, textarea:focus { border-color: rgba(167,124,255,0.5); }
`;

// ─── Ticker data ──────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { label: "Bitcoin (BTC)", val: "+4.2%" },
  { label: "Ethereum (ETH)", val: "+2.8%" },
  { label: "Antminer S21 Pro", val: "185 TH/s" },
  { label: "Whatsminer M60S", val: "170 TH/s" },
  { label: "Доходность", val: "от 15% / мес" },
  { label: "Hashrate Pool", val: "2.4 EH/s" },
  { label: "Uptime", val: "99.7%" },
  { label: "Клиентов", val: "300+" },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "⛏",
    title: "Поставка оборудования",
    desc: "ASIC-майнеры от Bitmain, MicroBT, Jasminer. Оригинальная техника напрямую от производителей с гарантией.",
  },
  {
    icon: "🔧",
    title: "Сервис и ремонт",
    desc: "Диагностика, замена хешплат, прошивка и восстановление ASIC-майнеров. Быстрые сроки, фиксированные цены.",
  },
  {
    icon: "🏢",
    title: "Размещение (хостинг)",
    desc: "Дата-центры с дешёвой электроэнергией. Круглосуточный мониторинг и охрана оборудования клиентов.",
  },
  {
    icon: "📊",
    title: "Готовый бизнес под ключ",
    desc: "Полный цикл: закупка → настройка → размещение → мониторинг → выплаты. Пассивный доход без хлопот.",
  },
  {
    icon: "⚡",
    title: "Электроснабжение",
    desc: "Договоры на прямую электроэнергию от 3.5 руб/кВт·ч. Собственные подстанции и инфраструктура.",
  },
  {
    icon: "🌐",
    title: "Консультации",
    desc: "Аудит рентабельности, подбор оборудования, расчёт окупаемости. Индивидуальный подход к каждому.",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { val: "300+", label: "клиентов" },
  { val: "2.4 EH/s", label: "суммарный хешрейт" },
  { val: "99.7%", label: "uptime" },
  { val: "5 лет", label: "на рынке" },
];

// ─── Prices ───────────────────────────────────────────────────────────────────
const PRICES = [
  { name: "Antminer S21 Pro 234T", power: "3531 Вт", price: "от $3 200" },
  { name: "Antminer S21 185T", power: "3500 Вт", price: "от $2 400" },
  { name: "Whatsminer M60S 170T", power: "3344 Вт", price: "от $2 100" },
  { name: "Antminer S19k Pro 120T", power: "2760 Вт", price: "от $1 300" },
  { name: "Хостинг (электричество)", power: "—", price: "от 3.5 руб/кВт·ч" },
  { name: "Ремонт хешплаты", power: "—", price: "от 3 000 ₽" },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function IndexPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(`Имя: ${name}\nКонтакт: ${contact}\nСообщение: ${msg}`);
    window.open(`https://t.me/Alex_mimingov?text=${text}`, "_blank");
    setSent(true);
  }

  const tickerDbl = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      {/* ── Global styles ── */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>

        {/* ── HEADER ── */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          transition: "all 0.3s",
        }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.purpleDim}, ${T.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⛏</div>
              <span style={{ fontFamily: T.font, fontSize: 18, color: T.text, letterSpacing: "-0.01em" }}>Lelikow Mining</span>
            </a>

            {/* Desktop nav */}
            <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
              <a href="#services">Услуги</a>
              <a href="#about">О нас</a>
              <a href="#prices">Цены</a>
              <a href="#contact">Контакт</a>
            </nav>

            <a href={TG_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}>
              Telegram →
            </a>
          </div>
        </header>

        {/* ── TICKER ── */}
        <div style={{ paddingTop: 64 }}>
          <div className="ticker-wrap">
            <div className="ticker-track">
              {tickerDbl.map((item, i) => (
                <div key={i} className="ticker-item">
                  <span>↑</span>{item.label} — {item.val}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "100px 24px 120px", textAlign: "center" }}>
          {/* Glow */}
          <div className="hero-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }} className="fade-up">
            <div className="section-label">Майнинг-компания · Россия</div>
            <h1 style={{
              fontFamily: T.font,
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              background: `linear-gradient(135deg, #fff 40%, ${T.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Зарабатывайте на крипте,<br />не разбираясь в технике
            </h1>
            <p style={{ fontSize: 18, color: T.muted, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>
              Поставка ASIC-майнеров, хостинг, сервис и готовые решения для пассивного дохода с&nbsp;криптовалют.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={TG_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "12px 28px" }}>
                Получить консультацию →
              </a>
              <a href="#services" className="btn-ghost" style={{ fontSize: 15, padding: "12px 28px" }}>
                Подробнее об услугах
              </a>
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: "relative", maxWidth: 700, margin: "72px auto 0", borderRadius: 16, overflow: "hidden", border: `1px solid ${T.border}` }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, #000 100%)", zIndex: 1 }} />
            <img
              src="/alex.jpg"
              alt="Александр — основатель Lelikow Mining"
              style={{ width: "100%", display: "block", filter: "brightness(0.85)" }}
            />
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
            {STATS.map((s) => (
              <div key={s.val} style={{ padding: "32px 28px", borderRight: `1px solid ${T.border}`, textAlign: "center", background: T.card }}>
                <div style={{ fontFamily: T.font, fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", color: T.text }}>{s.val}</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Что мы делаем</div>
            <h2 style={{ fontFamily: T.font, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 56 }}>
              Полный спектр майнинг-услуг
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
              {SERVICES.map((s) => (
                <div key={s.title} className="card" style={{ padding: "28px 28px 32px" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: T.font, fontSize: 18, fontWeight: 500, marginBottom: 10, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="section-label">Кто мы</div>
              <h2 style={{ fontFamily: T.font, fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 24 }}>
                Александр Леликов —<br />5 лет в крипто-майнинге
              </h2>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, marginBottom: 32 }}>
                Начинал с домашней фермы в 2019 году. Сегодня — сеть дата-центров, 300+ клиентов по России и СНГ,
                суммарный хешрейт пула 2.4 EH/s. Работаем честно: никаких скрытых платежей, только фиксированные тарифы.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Официальный партнёр Bitmain и MicroBT",
                  "Собственный сервисный центр",
                  "Договор, гарантия, полная прозрачность",
                  "Telegram-бот для мониторинга в реальном времени",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: T.muted }}>
                    <span style={{ color: T.green, flexShrink: 0, marginTop: 2 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={TG_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: 32 }}>
                Написать напрямую →
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -1, borderRadius: 16, background: `linear-gradient(135deg, ${T.purpleDim}33, transparent)`, pointerEvents: "none" }} />
              <img
                src="/alex.jpg"
                alt="Александр Леликов"
                style={{ width: "100%", borderRadius: 16, border: `1px solid ${T.border}`, display: "block", filter: "brightness(0.9)" }}
              />
            </div>
          </div>
        </section>

        {/* ── PRICES ── */}
        <section id="prices" style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Прайс-лист</div>
            <h2 style={{ fontFamily: T.font, fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 500, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 48 }}>
              Актуальные цены
            </h2>
            <div className="card" style={{ overflow: "hidden", borderRadius: 12 }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 24px", borderBottom: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)" }}>
                <span style={{ fontSize: 12, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Модель</span>
                <div style={{ display: "flex", gap: 80 }}>
                  <span style={{ fontSize: 12, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Потребление</span>
                  <span style={{ fontSize: 12, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Цена</span>
                </div>
              </div>
              {PRICES.map((p) => (
                <div key={p.name} className="price-row">
                  <span style={{ fontSize: 14 }}>{p.name}</span>
                  <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: T.muted, width: 90, textAlign: "right" }}>{p.power}</span>
                    <span style={{ fontSize: 14, color: T.purple, fontFamily: T.font, letterSpacing: "-0.01em", width: 130, textAlign: "right" }}>{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: T.muted, fontSize: 13, marginTop: 20 }}>
              * Цены актуальны на май 2025. Уточняйте наличие и скидки при объёме.
            </p>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "80px 24px 120px" }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Связаться</div>
            <h2 style={{ fontFamily: T.font, fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 500, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 8 }}>
              Напишите нам
            </h2>
            <p style={{ textAlign: "center", color: T.muted, fontSize: 14, marginBottom: 40 }}>
              Ответим в течение 30 минут в рабочее время
            </p>
            {sent ? (
              <div className="card" style={{ padding: "48px 32px", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: T.font, fontSize: 22 }}>Отправлено!</h3>
                <p style={{ color: T.muted, marginTop: 8, fontSize: 14 }}>Александр ответит вам в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 8, letterSpacing: "0.05em" }}>Ваше имя</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Петров"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 8, letterSpacing: "0.05em" }}>Telegram или телефон</label>
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="@username или +7..."
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 8, letterSpacing: "0.05em" }}>Сообщение</label>
                    <textarea
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Расскажите, что вас интересует..."
                      rows={4}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15 }}>
                    Отправить через Telegram →
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${T.border}`, padding: "32px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${T.purpleDim}, ${T.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⛏</div>
              <span style={{ fontFamily: T.font, fontSize: 16, color: T.muted }}>Lelikow Mining</span>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="#services" style={{ fontSize: 13, color: T.muted, textDecoration: "none" }}>Услуги</a>
              <a href="#prices" style={{ fontSize: 13, color: T.muted, textDecoration: "none" }}>Цены</a>
              <a href={TG_URL} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: T.purple, textDecoration: "none" }}>Telegram</a>
            </div>
            <span style={{ fontSize: 12, color: "#444" }}>© 2025 Lelikow Mining. Все права защищены.</span>
          </div>
        </footer>

      </div>
    </>
  );
}
