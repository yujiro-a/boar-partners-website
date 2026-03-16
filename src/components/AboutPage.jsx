import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const COLORS = {
  G050: "#0d1a14",
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea",
  N100: "#090c0e", N500: "#ffffff",
};

function TextReveal({ lines, delay = 0, fontSize, color, fontFamily, fontWeight = 700, style: extra = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={extra}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
          <motion.div
            initial={{ y: "105%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: fontFamily || FONTS.display, fontSize, color: color || COLORS.N500, fontWeight }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0, style: extra = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      style={extra}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Philosophy", href: "/#philosophy" },
    { label: "Services",   href: "/#services" },
    { label: "About",      href: "/about" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(9,12,14,0.97)" : "rgba(9,12,14,0.7)",
      backdropFilter: "blur(8px)",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "15px 32px 10px",
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ display: "inline-block" }}>
          <img src="/boar-logo.png?v=2" alt="BOAR Partners" style={{ height: 48, width: "auto" }} />
        </a>
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              color: item.href === "/about" ? COLORS.G300 : "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.12em",
              textTransform: "uppercase", fontWeight: 700, transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.color = COLORS.N500}
              onMouseLeave={(e) => e.target.style.color = item.href === "/about" ? COLORS.G300 : "rgba(255,255,255,0.75)"}
            >{item.label}</a>
          ))}
          <a href="/#contact" style={{
            color: COLORS.N500, textDecoration: "none",
            fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.1em",
            textTransform: "uppercase", fontWeight: 700,
            padding: "10px 24px", border: "1px solid rgba(255,255,255,0.4)",
            transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.N500; e.target.style.color = COLORS.G100; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = COLORS.N500; }}
          >Contact</a>
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 8,
        }}>
          <div style={{ width: 24, height: 2, background: COLORS.N500, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: COLORS.N500, marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: COLORS.N500, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: COLORS.N100, padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {[...navItems, { label: "Contact", href: "/#contact" }].map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              color: item.href === "/about" ? COLORS.G300 : COLORS.N500,
              textDecoration: "none",
              fontFamily: FONTS.accent, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{item.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg,#0d1a14 0%,#090c0e 100%)", padding: "48px 32px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <a href="/"><img src="/boar-logo.png" alt="BOAR Partners" style={{ height: 32, width: "auto", opacity: 0.5 }} /></a>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Philosophy", href: "/#philosophy" },
            { label: "Services",   href: "/#services" },
            { label: "About",      href: "/about" },
            { label: "Contact",    href: "/#contact" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none",
            }}>{item.label}</a>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: 1080, margin: "32px auto 0",
        borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 11,
          color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
          © 2026 BOAR Partners, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  const members = [
    {
      role: "代表",
      name: "荒川 悠次朗",
      nameEn: "Yujiro Arakawa",
      career: [
        { phase: "起業家", desc: "リユース業界にて事業会社を創業・取締役として経営。採用・営業・資金管理を一気通貫で推進。" },
        { phase: "コンサルファーム", desc: "新規事業開発・M&A戦略室立ち上げ支援・資金調達支援。建設業・内装工事業など複数業種での融資実績。グロース/プライム上場企業への支援実績。" },
        { phase: "独立後（現在）", desc: "M&A × 事業開発 × 資金調達を一気通貫で支援。" },
      ],
    },
    {
      role: "共同創業者",
      name: "溝橋 正輝",
      nameEn: "Masaki Mizohashi",
      career: [
        { phase: "川崎重工業", desc: "エンジニアとしてキャリアをスタート。製造技術・品質管理の実務を担う。" },
        { phase: "野村證券", desc: "資本市場・投資銀行業務に従事。企業価値評価・資金調達の実務を習得。" },
        { phase: "独立後（現在）", desc: "ディープテック・スタートアップ支援に特化。アカデミア発ベンチャーのエコシステムと深いネットワークを持ち、技術の目利きから事業化・資金調達まで一気通貫で支援。" },
      ],
    },
  ];

  const companyInfo = [
    { label: "会社名",   value: "株式会社BOAR Partners（設立準備中）" },
    { label: "事業内容", value: "M&A × 事業開発 × 資金調達の一気通貫支援" },
    { label: "所在地",   value: "東京都" },
  ];

  return (
    <div style={{ background: COLORS.N100, minHeight: "100vh", overflowX: "clip" }}>
      <Header />

      {/* ── ヒーロー帯 ── */}
      <section style={{
        background: `linear-gradient(160deg, ${COLORS.G100} 0%, ${COLORS.G050} 60%, ${COLORS.N100} 100%)`,
        padding: "160px 8vw 100px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* 背景 ghost テキスト */}
        <div style={{
          position: "absolute", right: "-0.05em", top: "50%", transform: "translateY(-50%)",
          fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(120px,20vw,240px)",
          color: "rgba(255,255,255,0.03)", letterSpacing: "-0.04em", userSelect: "none",
          lineHeight: 1,
        }}>
          ABOUT
        </div>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: FONTS.accent, fontSize: "clamp(13px,1.1vw,16px)", letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 700, marginBottom: 24, color: COLORS.G300,
            }}
          >
            About Us
          </motion.div>
          <TextReveal
            lines={["実行する者が、", "伴走する。"]}
            fontSize="clamp(36px,5.5vw,80px)"
            delay={0.1}
            style={{ marginBottom: 32 }}
          />
          <FadeIn delay={0.4}>
            <p style={{
              fontFamily: FONTS.body, fontSize: "clamp(14px,1.1vw,17px)",
              color: "rgba(255,255,255,0.55)", lineHeight: 1.9,
              maxWidth: 560,
            }}>
              BOAR Partnersは、紹介や橋渡しではなく、チームとして当事者意識を持って事業に入り込む。
              それぞれが異なるフィールドで実績を積んだ2人が、ゼロから共に走る。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── チームメンバー ── */}
      <section style={{ padding: "100px 8vw", background: COLORS.N100 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              fontFamily: FONTS.accent, fontSize: "clamp(13px,1.1vw,16px)", letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 700, marginBottom: 56, color: COLORS.G300,
            }}>
              Team
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px 80px",
          }}>
            {members.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* ロール */}
                <div style={{
                  fontSize: 11, color: COLORS.G300, letterSpacing: "0.2em",
                  textTransform: "uppercase", marginBottom: 12,
                  fontFamily: FONTS.accent, fontWeight: 700,
                }}>
                  {m.role}
                </div>
                {/* 名前 */}
                <div style={{
                  fontFamily: FONTS.display, fontSize: "clamp(28px,3vw,44px)",
                  fontWeight: 700, color: COLORS.N500, lineHeight: 1.1, marginBottom: 4,
                }}>
                  {m.name}
                </div>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: 13, color: COLORS.G300,
                  letterSpacing: "0.04em", marginBottom: 32,
                }}>
                  {m.nameEn}
                </div>

                {/* キャリア timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {m.career.map((c, j) => (
                    <div key={j} style={{
                      display: "grid", gridTemplateColumns: "120px 1fr",
                      gap: "0 24px",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      padding: "18px 0",
                    }}>
                      <div style={{
                        fontFamily: FONTS.body, fontSize: 11,
                        color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em",
                        lineHeight: 1.6, paddingTop: 2,
                      }}>
                        {c.phase}
                      </div>
                      <div style={{
                        fontFamily: FONTS.body, fontSize: 14,
                        color: "rgba(255,255,255,0.65)", lineHeight: 1.9,
                      }}>
                        {c.desc}
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 会社概要 ── */}
      <section style={{
        padding: "80px 8vw 100px",
        background: "linear-gradient(180deg, #090c0e 0%, #0d1a14 100%)",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              fontFamily: FONTS.accent, fontSize: "clamp(13px,1.1vw,16px)", letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 700, marginBottom: 48, color: COLORS.G300,
            }}>
              Company
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            {companyInfo.map((item) => (
              <div key={item.label} style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                gap: "0 32px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                padding: "20px 0",
              }}>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 12,
                  color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em",
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 14,
                  color: "rgba(255,255,255,0.75)",
                }}>
                  {item.value}
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "80px 8vw",
        background: COLORS.G100,
        textAlign: "center",
      }}>
        <FadeIn>
          <div style={{
            fontFamily: FONTS.display, fontSize: "clamp(24px,3vw,40px)",
            color: COLORS.N500, marginBottom: 32, fontWeight: 700,
          }}>
            まずは話してみませんか。
          </div>
          <a href="/#contact" style={{
            display: "inline-block",
            fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.14em",
            textTransform: "uppercase", fontWeight: 700,
            color: COLORS.N500, textDecoration: "none",
            padding: "16px 48px", border: "1px solid rgba(255,255,255,0.4)",
            transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.N500; e.target.style.color = COLORS.G100; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = COLORS.N500; }}
          >
            Contact Us
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
