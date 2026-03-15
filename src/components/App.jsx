import { useState, useEffect, useRef } from "react";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

// ─── Pattern D palette ───────────────────────────────────────
const COLORS = {
  // stone (light sections)
  stone:         "#f0ece4",
  stoneCard:     "#faf8f4",
  stoneBorder:   "#c8c0b2",
  stoneAccent:   "#2d5a40",
  stoneHL:       "#1a2e25",
  stoneBody:     "rgba(26,46,37,0.58)",
  stoneDivider:  "rgba(26,46,37,0.12)",
  // deep green (dark sections)
  deepGreen:     "#0d2018",
  deepGreenFoot: "#070f0c",
  darkCard:      "rgba(255,255,255,0.04)",
  darkBorder:    "rgba(255,255,255,0.09)",
  darkHL:        "rgba(255,255,255,0.92)",
  darkBody:      "rgba(255,255,255,0.45)",
  // legacy aliases (Hero keeps using these)
  darkGreen:     "#152f26",
  darkGreenDeep: "#0a1a14",
  white:         "#ffffff",
  silver:        "#bbbbbb",
  black:         "#090c0e",
};

const SectionLabel = ({ children, dark = false }) => (
  <div style={{
    fontFamily: FONTS.accent, fontSize: 13, letterSpacing: "0.2em",
    textTransform: "uppercase", fontWeight: 700, marginBottom: 24,
    color: dark ? "rgba(255,255,255,0.25)" : "rgba(26,46,37,0.3)",
  }}>
    {children}
  </div>
);

// ストーン立体感（上ハイライト + 周縁ビネット + 下シャドウ）
const StoneDepth = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 50% at 50% -5%, rgba(255,248,235,0.55) 0%, transparent 55%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(140,128,110,0.1) 100%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(140,128,110,0.08) 100%)", pointerEvents: "none" }} />
  </>
);

// ディープグリーン光グラデーション（左上光 + 右下暗落ち）
const DeepGreenLight = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 20% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 100% 100%, rgba(4,12,9,0.7) 0%, transparent 65%)", pointerEvents: "none" }} />
  </>
);

const GridOverlay = ({ dark = false }) => {
  const id = dark ? "gridDark" : "gridStone";
  const color = dark ? "white" : "#2d5a40";
  const opacity = dark ? 0.04 : 0.04;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke={color} strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, duration = 0.8, noTranslate = false, style: extraStyle = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: noTranslate ? "none" : (inView ? "translateY(0)" : "translateY(28px)"),
      transition: noTranslate
        ? `opacity ${duration}s ease ${delay}s`
        : `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

// ─── HEADER ───
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(21,47,38,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "15px 32px 10px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <img src="/boar-logo.png?v=2" alt="BOAR Partners" style={{ height: 48, width: "auto" }} />
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              color: "rgba(255,255,255,0.75)", textDecoration: "none",
              fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.12em",
              textTransform: "uppercase", fontWeight: 700, transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.color = COLORS.white}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.75)"}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" style={{
            color: COLORS.white, textDecoration: "none",
            fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.1em",
            textTransform: "uppercase", fontWeight: 700,
            padding: "10px 24px", border: "1px solid rgba(255,255,255,0.4)",
            transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.darkGreen; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = COLORS.white; }}
          >
            Contact
          </a>
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 8,
        }}>
          <div style={{ width: 24, height: 2, background: COLORS.white, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: COLORS.white, marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: COLORS.white, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: COLORS.darkGreen, padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {[...navItems, { label: "Contact", href: "#contact" }].map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              color: COLORS.white, textDecoration: "none",
              fontFamily: FONTS.accent, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{item.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", background: `linear-gradient(160deg, ${COLORS.darkGreen} 0%, ${COLORS.darkGreenDeep} 100%)`,
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      position: "relative", overflow: "hidden", padding: "40px 32px",
    }}>
      <style>{`
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes cursorBlink {
          0%   { opacity: 0.18; }
          70%  { opacity: 0.18; }
          71%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes gridDrift {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }
        @keyframes heroLineRun1 {
          0%   { opacity: 0; transform: rotate(18deg) scaleX(2) translateX(-60%); }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { opacity: 0; transform: rotate(18deg) scaleX(2) translateX(60%); }
        }
        @keyframes heroLineRun2 {
          0%   { opacity: 0; transform: rotate(-12deg) scaleX(2) translateX(60%); }
          15%  { opacity: 1; }
          85%  { opacity: 0.4; }
          100% { opacity: 0; transform: rotate(-12deg) scaleX(2) translateX(-60%); }
        }
        @keyframes particleRise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

      {/* グリッドドリフト */}
      <div style={{ position: "absolute", inset: "-100px 0 0 0", overflow: "hidden" }}>
        <svg style={{ width: "100%", height: "calc(100% + 100px)", opacity: 0.06, animation: "gridDrift 8s linear infinite" }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="heroGrid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)"/>
        </svg>
      </div>

      {/* ライン1 */}
      <div style={{ position: "absolute", top: "15%", left: "-10%", width: "70%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", animation: "heroLineRun1 6s ease-in-out infinite" }} />
      {/* ライン2 */}
      <div style={{ position: "absolute", top: "62%", right: "-10%", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", animation: "heroLineRun2 8s ease-in-out 2s infinite" }} />

      {/* 浮遊パーティクル */}
      {[
        { x: 12, s: 1.5, d: 0,   dur: 9   },
        { x: 28, s: 1,   d: 2.5, dur: 11  },
        { x: 45, s: 2,   d: 1,   dur: 8   },
        { x: 60, s: 1,   d: 3.5, dur: 12  },
        { x: 75, s: 1.5, d: 0.5, dur: 10  },
        { x: 88, s: 1,   d: 2,   dur: 9.5 },
        { x: 35, s: 1.5, d: 4,   dur: 11  },
        { x: 52, s: 1,   d: 1.5, dur: 8.5 },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.x}%`, bottom: "0%",
          width: p.s, height: p.s, borderRadius: "50%",
          background: "rgba(255,255,255,0.6)",
          animation: `particleRise ${p.dur}s ease-in ${p.d}s infinite`,
        }} />
      ))}

      {/* 右下フェード */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(10,26,20,0.95) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, textAlign: "center" }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: "clamp(64px, 11vw, 160px)",
          color: COLORS.white, letterSpacing: "0.04em", lineHeight: 1.05,
          marginBottom: 56, fontWeight: 900,
        }}>
          <TypewriterText text={"Deep tech,\nfor industry"} loop={false} variant="cursor" />
        </div>
        <FadeIn delay={2.5} duration={1.4} noTranslate>
          <a href="#contact" style={{
            display: "inline-block", padding: "18px 48px",
            border: "1px solid rgba(255,255,255,0.5)", color: COLORS.white,
            textDecoration: "none", fontFamily: FONTS.accent, fontSize: 16,
            letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700,
            transition: "all 0.4s",
          }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.darkGreen; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = COLORS.white; }}
          >
            Get in touch
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── TYPEWRITER VARIANTS ───
// variant: "dot" = 末尾.(点滅) / "cursor" = |を薄く点滅
function TypewriterText({ text = "Deep tech, for industry.", loop = false, variant = "dot" }) {
  const flat = text.replace(/\n/g, " ");
  const [pos, setPos] = useState(0);
  const done = pos >= flat.length;
  useEffect(() => {
    const t = setInterval(() => setPos(p => {
      if (p >= flat.length) return loop ? 0 : p;
      return p + 1;
    }), 90);
    return () => clearInterval(t);
  }, [loop, flat.length]);

  const typingCursor = <span style={{ animation: "cursorBlink 1.5s linear infinite" }}>|</span>;

  const chars = text.split("");
  const lastCharIdx = chars.filter(c => c !== "\n").length - 1;
  let globalIdx = 0;
  const nodes = [];
  chars.forEach((ch, i) => {
    if (ch === "\n") {
      if (globalIdx === pos && !done) nodes.push(<span key={`cur-${i}`}>{typingCursor}</span>);
      nodes.push(<br key={i} />);
      return;
    }
    const idx = globalIdx++;
    const isLast = idx === lastCharIdx;
    nodes.push(
      <span key={i} style={{
        opacity: idx < pos ? 1 : 0,
        transition: "opacity 0.05s",
        animation: (done && isLast && variant === "dot") ? "dotBlink 1.2s ease-in-out infinite" : "none",
      }}>
        {ch}
      </span>
    );
    if (idx + 1 === pos && !done) nodes.push(<span key={`cur-${i}`}>{typingCursor}</span>);
    if (done && isLast && variant === "cursor") {
      nodes.push(<span key="done-cursor" style={{ animation: "cursorBlink 1.5s linear infinite" }}>|</span>);
    }
  });
  return <>{nodes}</>;
}


// ─── BACKGROUND ───
function Vision() {
  const walls = [
    { num: "01", title: "技術の目利き", desc: "適合する技術シーズを特定し、事業化ポテンシャルを評価できる人間がいない。" },
    { num: "02", title: "交渉ノウハウ", desc: "対等な同盟として動くための契約設計・条件交渉を担える存在がいない。" },
    { num: "03", title: "PMIの実行力", desc: "アライアンス成立後、技術を事業価値に転換する実行支援が構造的に空白になっている。" },
  ];

  return (
    <section style={{ background: COLORS.stone, padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <StoneDepth />
      <GridOverlay />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn><SectionLabel>Background</SectionLabel></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(36px, 5vw, 72px)", color: COLORS.stoneHL,
            lineHeight: 1.25, marginBottom: 80,
          }}>
            技術と産業の間に、<br />実行できる者がいない。
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
          {walls.map((w, i) => (
            <FadeIn key={w.num} delay={i * 0.1} style={{ height: "100%" }}>
              <div style={{ background: COLORS.deepGreen, padding: "48px 36px", height: "100%", borderTop: "2px solid rgba(255,255,255,0.15)" }}>
                <div style={{ fontFamily: FONTS.accent, fontSize: 72, color: COLORS.white, opacity: 0.08, lineHeight: 1, marginBottom: 24, fontWeight: 900 }}>{w.num}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.darkHL, fontWeight: 700, marginBottom: 16, lineHeight: 1.4 }}>{w.title}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody, lineHeight: 1.9 }}>{w.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PHILOSOPHY ───
function Philosophy() {
  const boarItems = [
    { letter: "B", rest: "uild the Business",  ja: "事業を構築する" },
    { letter: "O", rest: "pen Opportunities",  ja: "機会を開く" },
    { letter: "A", rest: "ccelerate Growth",   ja: "成長を加速する" },
    { letter: "R", rest: "ealize Value",       ja: "価値を実現する" },
  ];

  return (
    <section id="philosophy" style={{
      background: "#091510",
      minHeight: "100vh",
      padding: "120px 32px",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      {/* K4-D グラデ */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,#040908 0%,#0d2018 20%,#152f26 45%,#0d2018 75%,#040908 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 55% at 50% 50%, rgba(45,90,64,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <GridOverlay dark />

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
        <FadeIn><SectionLabel dark>Philosophy</SectionLabel></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(28px, 4vw, 60px)", color: COLORS.darkHL,
            lineHeight: 1.25, marginBottom: 64,
            whiteSpace: "nowrap",
          }}>
            キャズムを越え、非連続な成長を。
          </h2>
        </FadeIn>

        {/* B-2 Overlay BOAR */}
        <div style={{ position: "relative" }}>
          {/* ゴーストBOAR */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: "clamp(160px,26vw,340px)",
            color: "rgba(255,255,255,0.035)",
            letterSpacing: "-0.04em", lineHeight: 1,
            whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
          }}>
            BOAR
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            {boarItems.map((item, i) => (
              <FadeIn key={item.letter} delay={i * 0.08}>
                <div style={{
                  display: "flex", alignItems: "baseline",
                  borderBottom: `1px solid rgba(255,255,255,0.07)`,
                  padding: "16px 0",
                }}>
                  <span style={{
                    fontFamily: FONTS.accent, fontWeight: 900,
                    fontSize: "clamp(48px, 8.5vw, 112px)",
                    color: "#3DA860", lineHeight: 1,
                    minWidth: "1.1ch", letterSpacing: "-0.02em",
                  }}>
                    {item.letter}
                  </span>
                  <span style={{
                    fontFamily: FONTS.accent, fontWeight: 700,
                    fontSize: "clamp(28px, 5vw, 64px)",
                    color: "rgba(255,255,255,0.85)", lineHeight: 1,
                    letterSpacing: "0.01em",
                  }}>
                    {item.rest}
                  </span>
                  <span style={{
                    fontFamily: FONTS.body,
                    fontSize: "clamp(13px, 1.6vw, 20px)",
                    color: "rgba(255,255,255,0.28)",
                    marginLeft: "auto", paddingLeft: 28, whiteSpace: "nowrap",
                  }}>
                    {item.ja}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── POSITIONING ───
function Positioning() {
  const competitors = [
    { name: "戦略コンサル", tech: "低", exec: "提言止まり" },
    { name: "M&Aアドバイザリー", tech: "低", exec: "ディール完結" },
    { name: "VC / CVC", tech: "高", exec: "資金提供のみ" },
    { name: "ベンチャースタジオ", tech: "中", exec: "大企業非対応" },
    { name: "BOAR Partners", tech: "高", exec: "実装まで一気通貫", highlight: true },
  ];

  return (
    <section style={{ background: COLORS.stone, padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <StoneDepth />
      <GridOverlay />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn><SectionLabel>Positioning</SectionLabel></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(36px, 5vw, 72px)", color: COLORS.stoneHL,
            lineHeight: 1.25, marginBottom: 80,
          }}>
            技術理解と戦略実行を<br />両立する唯一の存在。
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONTS.body }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.stoneDivider}` }}>
                  {["", "技術理解", "戦略実行"].map((h, i) => (
                    <th key={i} style={{
                      padding: "14px 20px", textAlign: "left",
                      fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.15em",
                      textTransform: "uppercase", color: "rgba(26,46,37,0.3)", fontWeight: 700,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr key={c.name} style={{
                    borderBottom: `1px solid ${COLORS.stoneDivider}`,
                    background: c.highlight ? "rgba(45,90,64,0.07)" : "transparent",
                  }}>
                    <td style={{
                      padding: "20px 20px", fontSize: c.highlight ? 17 : 14,
                      fontWeight: c.highlight ? 700 : 400,
                      color: c.highlight ? COLORS.stoneHL : "rgba(26,46,37,0.35)",
                      whiteSpace: "nowrap",
                    }}>
                      {c.name}
                    </td>
                    <td style={{ padding: "20px 20px", fontSize: c.highlight ? 15 : 13, color: c.highlight ? COLORS.stoneHL : "rgba(26,46,37,0.35)" }}>{c.tech}</td>
                    <td style={{ padding: "20px 20px", fontSize: c.highlight ? 15 : 13, color: c.highlight ? COLORS.stoneHL : "rgba(26,46,37,0.35)" }}>{c.exec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SERVICES ───
function Services() {
  const paths = [
    {
      label: "Green Path", sub: "アライアンス軸", color: "#3DA860", bg: "#1a3d2d",
      title: "ディープテック事業化",
      steps: ["技術シーズの選定・マッチング", "共同開発・PoC推進", "事業化・市場投入"],
    },
    {
      label: "Gold Path", sub: "M&A軸", color: "#b8943a", bg: "#2a2010",
      title: "インオーガニック成長",
      steps: ["候補先ソーシング・バリュエーション", "PMI・統合実行", "事業成長・シナジー実現"],
    },
  ];

  return (
    <section id="services" style={{ background: COLORS.deepGreen, padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <DeepGreenLight />
      <GridOverlay dark />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn><SectionLabel dark>Services</SectionLabel></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(36px, 5vw, 72px)", color: COLORS.darkHL,
            lineHeight: 1.25, marginBottom: 80,
          }}>
            2軸で、事業成長を<br />一気通貫する。
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 2 }}>
          {paths.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.1}>
              <div style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}` }}>
                <div style={{ background: p.bg, padding: "32px 40px", borderTop: `3px solid ${p.color}` }}>
                  <div style={{ fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: p.color, fontWeight: 700, marginBottom: 10 }}>
                    {p.label} — {p.sub}
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 26, color: COLORS.white }}>{p.title}</div>
                </div>
                <div style={{ padding: "32px 40px" }}>
                  {p.steps.map((s, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "16px 0",
                      borderBottom: j < p.steps.length - 1 ? `1px solid ${COLORS.darkBorder}` : "none",
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                      <div style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.darkBody, fontWeight: 600 }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───
function About() {
  const members = [
    {
      name: "荒川 悠次朗",
      nameEn: "Yujiro Arakawa",
      role: "代表",
      desc: "M&Aアドバイザリー・スタートアップスタジオ・中堅企業支援を経て独立。commissure CROとして大企業×スタートアップの実装モデルを実証。高卒・元倒産経験者。実務と実行力で動いてきた。",
    },
    {
      name: "溝橋 正輝",
      nameEn: "Masaki Mizohashi",
      role: "共同創業者",
      desc: "川崎重工業→野村證券→サイバーエージェント→セールスフォース→H.R.I代表（Exit）→CROSS TOKYO創業。東京大学先端研・Salesforceとの連携を実現した連続起業家。",
    },
  ];

  return (
    <section id="about" style={{ background: COLORS.stone, padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <StoneDepth />
      <GridOverlay />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn><SectionLabel>About</SectionLabel></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(36px, 5vw, 72px)", color: COLORS.stoneHL,
            lineHeight: 1.25, marginBottom: 80,
          }}>
            実行する者が、<br />伴走する。
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 80 }}>
          {members.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.15}>
              <div style={{ background: COLORS.stoneCard, padding: "48px 40px", border: `1px solid ${COLORS.stoneBorder}`, borderTop: `2px solid ${COLORS.stoneAccent}` }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: COLORS.deepGreen, display: "flex",
                  alignItems: "center", justifyContent: "center", marginBottom: 24,
                }}>
                  <span style={{ fontFamily: FONTS.accent, color: COLORS.white, fontSize: 22, fontWeight: 900 }}>{m.name[0]}</span>
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 20, color: COLORS.stoneHL, fontWeight: 700, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 13, color: "rgba(26,46,37,0.4)", marginBottom: 4 }}>{m.nameEn}</div>
                <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: COLORS.stoneAccent, fontWeight: 700, marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.role}</div>
                <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.stoneBody, lineHeight: 1.9 }}>{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ borderTop: `1px solid ${COLORS.stoneDivider}`, paddingTop: 40 }}>
            {[
              ["会社名", "株式会社BOAR Partners"],
              ["代表者", "荒川 悠次朗"],
              ["設立", "2026年"],
              ["事業内容", "経営コンサルティング / M&Aアドバイザリー / 研究開発事業化支援"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", flexWrap: "wrap", padding: "16px 0", borderBottom: `1px solid ${COLORS.stoneDivider}` }}>
                <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.stoneHL, fontWeight: 600, width: 140, flexShrink: 0 }}>{label}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.stoneBody }}>{value}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CONTACT ───
function Contact() {
  const [formData, setFormData] = useState({ company: "", name: "", email: "", message: "" });
  const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const inputStyle = {
    width: "100%", padding: "16px 18px",
    border: `1px solid rgba(255,255,255,0.2)`,
    background: "rgba(255,255,255,0.05)",
    color: COLORS.white, fontSize: 15, fontFamily: FONTS.body,
    outline: "none", transition: "border-color 0.3s", boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ background: COLORS.deepGreen, padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <DeepGreenLight />
      <GridOverlay dark />
      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn><SectionLabel dark>Contact</SectionLabel></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(36px, 5vw, 64px)", color: COLORS.white,
            lineHeight: 1.25, marginBottom: 48,
          }}>
            まずは、話しましょう。
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8, display: "block", letterSpacing: "0.05em" }}>会社名</label>
                <input style={inputStyle} value={formData.company} onChange={handleChange("company")} placeholder="株式会社〇〇" />
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8, display: "block", letterSpacing: "0.05em" }}>お名前 *</label>
                <input style={inputStyle} value={formData.name} onChange={handleChange("name")} placeholder="山田 太郎" />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8, display: "block", letterSpacing: "0.05em" }}>メールアドレス *</label>
              <input style={inputStyle} type="email" value={formData.email} onChange={handleChange("email")} placeholder="example@company.co.jp" />
            </div>
            <div>
              <label style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8, display: "block", letterSpacing: "0.05em" }}>ご相談内容 *</label>
              <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} value={formData.message} onChange={handleChange("message")} placeholder="ご相談内容をお書きください" />
            </div>
            <button style={{
              padding: "18px 48px", background: COLORS.white, color: COLORS.darkGreen,
              border: "none", cursor: "pointer", fontFamily: FONTS.accent, fontSize: 15,
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.3s", alignSelf: "flex-start",
            }}
              onMouseEnter={(e) => { e.target.style.background = COLORS.lightGray; }}
              onMouseLeave={(e) => { e.target.style.background = COLORS.white; }}
            >
              送信する
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ background: COLORS.deepGreenFoot, padding: "48px 32px 32px", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <img src="/boar-logo.png" alt="BOAR Partners" style={{ height: 32, width: "auto", opacity: 0.5 }} />
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["Philosophy", "Services", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textDecoration: "none",
            }}>{item}</a>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: 1080, margin: "32px auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
          © 2026 BOAR Partners, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───
export default function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <Hero />
      <Vision />
      <Philosophy />
      <Positioning />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
