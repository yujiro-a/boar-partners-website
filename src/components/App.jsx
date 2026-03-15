import { useState, useEffect, useRef } from "react";

const COLORS = {
  darkGreen: "#152f26",
  darkGreenLight: "#1e4035",
  darkGreenDeep: "#0a1a14",
  silver: "#bbbbbb",
  black: "#090c0e",
  white: "#ffffff",
  offWhite: "#f7f7f5",
  lightGray: "#e8e8e4",
};

// Intersection Observer hook for scroll animations
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

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
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
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(21,47,38,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "18px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 22, color: COLORS.white, letterSpacing: "0.02em", fontWeight: 400,
        }}>
          BOAR Partners
        </div>
        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              color: "rgba(255,255,255,0.75)", textDecoration: "none",
              fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
              fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500,
              transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.color = COLORS.white}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.75)"}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" style={{
            color: COLORS.white, textDecoration: "none",
            fontSize: 13, letterSpacing: "0.06em",
            fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 600,
            padding: "10px 24px", border: "1px solid rgba(255,255,255,0.4)",
            transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.darkGreen; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = COLORS.white; }}
          >
            Contact
          </a>
        </nav>
        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            padding: 8,
          }}
        >
          <div style={{ width: 24, height: 2, background: COLORS.white, marginBottom: 6, transition: "all 0.3s",
            transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: COLORS.white, marginBottom: 6,
            opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: COLORS.white, transition: "all 0.3s",
            transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: COLORS.darkGreen, padding: "24px 32px",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {[...navItems, { label: "Contact", href: "#contact" }].map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              color: COLORS.white, textDecoration: "none", fontSize: 16,
              fontFamily: "'Noto Sans JP', sans-serif",
            }}>
              {item.label}
            </a>
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
      position: "relative", overflow: "hidden", padding: "120px 32px 80px",
    }}>
      {/* Subtle pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, textAlign: "center" }}>
        <FadeIn>
          <div style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: "clamp(32px, 5vw, 60px)", color: COLORS.white,
            lineHeight: 1.3, fontWeight: 700, letterSpacing: "0.02em", marginBottom: 16,
          }}>
            技術の可能性を、産業の未来へ。
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(14px, 1.8vw, 20px)", color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.12em", marginBottom: 40, textTransform: "uppercase",
          }}>
            Deep tech, for industry.
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(14px, 1.6vw, 16px)",
            color: "rgba(255,255,255,0.6)", lineHeight: 2, maxWidth: 560,
            margin: "0 auto 48px", fontWeight: 400, letterSpacing: "0.04em",
          }}>
            研究開発技術の社会実装から、M&A・事業開発の実行まで。<br />
            事業成長のフルサイクルを、当事者として伴走する。
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <a href="#contact" style={{
            display: "inline-block", padding: "16px 40px",
            border: "1px solid rgba(255,255,255,0.5)", color: COLORS.white,
            textDecoration: "none", fontSize: 14, letterSpacing: "0.08em",
            fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500,
            transition: "all 0.4s",
          }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.darkGreen; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = COLORS.white; }}
          >
            まずは相談する
          </a>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
          animation: "scrollPulse 2s ease infinite",
        }} />
      </div>
    </section>
  );
}

// ─── VISION ───
function Vision() {
  const walls = [
    { num: "01", title: "技術の目利き", sub: "見つけ方", desc: "大企業の課題に適合する技術シーズを特定し、事業化ポテンシャルを評価できる人間がいない。" },
    { num: "02", title: "交渉ノウハウ", sub: "組み方", desc: "大企業とスタートアップが「対等な同盟」として動くための契約設計・条件交渉を担える存在がいない。" },
    { num: "03", title: "PMI失敗", sub: "回収の仕方", desc: "M&A・アライアンス成立後、技術を事業価値に転換するための実行支援が構造的に空白になっている。" },
  ];

  return (
    <section style={{
      background: COLORS.white, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
            color: COLORS.silver, fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 600, marginBottom: 24,
          }}>
            Vision
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 52px)", color: COLORS.darkGreen,
            lineHeight: 1.35, letterSpacing: "-0.01em", marginBottom: 24,
          }}>
            技術と産業の間に、<br />
            実行できるプレイヤーが存在しない。
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(14px, 1.6vw, 16px)",
            color: COLORS.black, lineHeight: 2, opacity: 0.6,
            maxWidth: 640, marginBottom: 72,
          }}>
            日本企業のR&D投資は年間13.5兆円。世界有数の研究水準を誇りながら、その技術が社会実装に至るケースは一握りに過ぎない。原因は技術力ではない。インオーガニック成長を阻む「3つの壁」が重なって立ちはだかっている。
          </p>
        </FadeIn>

        {/* 3つの壁 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 2, marginBottom: 80,
        }}>
          {walls.map((w, i) => (
            <FadeIn key={w.num} delay={i * 0.1}>
              <div style={{
                background: COLORS.darkGreen, padding: "40px 32px",
              }}>
                <div style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 40, color: COLORS.white, opacity: 0.12,
                  lineHeight: 1, marginBottom: 20,
                }}>
                  {w.num}
                </div>
                <div style={{
                  fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 600, marginBottom: 8,
                }}>
                  Wall {w.num} — {w.sub}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18,
                  color: COLORS.white, fontWeight: 700, marginBottom: 16, lineHeight: 1.4,
                }}>
                  {w.title}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                  color: "rgba(255,255,255,0.55)", lineHeight: 1.9,
                }}>
                  {w.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* BOARの答え */}
        <FadeIn delay={0.3}>
          <div style={{
            borderLeft: `2px solid ${COLORS.darkGreen}`,
            paddingLeft: 32,
          }}>
            <p style={{
              fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(15px, 1.8vw, 17px)",
              color: COLORS.black, lineHeight: 2, opacity: 0.75, maxWidth: 680,
            }}>
              BOARは、その空白を埋める結節点として機能する。大企業とスタートアップの「対等な同盟」を設計・実行し、技術の社会実装からM&A・事業開発まで、フルサイクルを当事者として伴走する。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── PHILOSOPHY ───
function Philosophy() {
  const boarItems = [
    { letter: "B", en: "Build the Business", ja: "事業を構築する", desc: "新規事業・組織構築・営業体制・成長戦略の設計" },
    { letter: "O", en: "Open Opportunities", ja: "機会を開く", desc: "M&A機会・アライアンス・技術提携・新市場参入" },
    { letter: "A", en: "Accelerate Growth", ja: "成長を加速する", desc: "KPI設計・実行管理・PMO・組織の実行力強化" },
    { letter: "R", en: "Realize Value", ja: "価値を実現する", desc: "売上拡大・EBITDA改善・企業価値向上・Exit" },
  ];

  return (
    <section id="philosophy" style={{
      background: COLORS.offWhite, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
            color: COLORS.silver, fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 600, marginBottom: 16,
          }}>
            Philosophy
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 44px)", color: COLORS.darkGreen,
            lineHeight: 1.3, marginBottom: 20, letterSpacing: "-0.01em",
          }}>
            BOARの哲学
          </h2>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, color: COLORS.black,
            lineHeight: 1.9, maxWidth: 640, marginBottom: 64, opacity: 0.7,
          }}>
            BOARは4つのサービスではない。1つの連続したコミットメント。<br />
            事業を構築し、機会を開き、成長を加速し、価値を実現する。前にしか進まない。
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}>
          {boarItems.map((item, i) => (
            <FadeIn key={item.letter} delay={i * 0.12}>
              <div style={{
                background: COLORS.white, padding: "40px 32px",
                borderTop: `3px solid ${COLORS.darkGreen}`,
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(21,47,38,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 56, color: COLORS.darkGreen, lineHeight: 1, marginBottom: 16,
                  opacity: 0.15,
                }}>
                  {item.letter}
                </div>
                <div style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 16, color: COLORS.darkGreen, marginBottom: 6,
                }}>
                  {item.en}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14,
                  color: COLORS.black, fontWeight: 600, marginBottom: 12,
                }}>
                  {item.ja}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                  color: COLORS.black, opacity: 0.6, lineHeight: 1.7,
                }}>
                  {item.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── POSITIONING ───
function Positioning() {
  const competitors = [
    { name: "戦略コンサル", tech: "低", exec: "高（提言止まり）", note: "技術理解・実装を持たない" },
    { name: "M&Aアドバイザリー", tech: "低", exec: "高（ディール完結）", note: "PMI・事業開発はスコープ外" },
    { name: "VC / CVC", tech: "高", exec: "低（資金提供のみ）", note: "実行支援・PMOは行わない" },
    { name: "ベンチャースタジオ", tech: "中", exec: "中", note: "大企業インオーガニック戦略は射程外" },
    { name: "BOAR Partners", tech: "高", exec: "高（実装まで）", note: "唯一、技術理解×戦略実行を両立", highlight: true },
  ];

  return (
    <section style={{
      background: COLORS.darkGreen, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 600, marginBottom: 24,
          }}>
            Positioning
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 40px)", color: COLORS.white,
            lineHeight: 1.3, marginBottom: 20,
          }}>
            「技術理解 × 戦略実行」の<br />空白地帯を埋める唯一の存在。
          </h2>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(14px, 1.6vw, 15px)",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.9, maxWidth: 560, marginBottom: 64,
          }}>
            他のプレイヤーはディープテック特化の伴走支援を持たない。BOARは、ディープテックアライアンスを軸に、アライアンスとM&Aの2軸で支援する。
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%", borderCollapse: "collapse",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  {["", "技術理解", "戦略実行の深さ", ""].map((h, i) => (
                    <th key={i} style={{
                      padding: "12px 16px", textAlign: "left",
                      fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)", fontWeight: 600,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr key={c.name} style={{
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    background: c.highlight ? "rgba(255,255,255,0.06)" : "transparent",
                  }}>
                    <td style={{
                      padding: "18px 16px",
                      fontFamily: c.highlight ? "'Noto Sans JP', sans-serif" : "'Noto Sans JP', sans-serif",
                      fontSize: c.highlight ? 15 : 13,
                      fontWeight: c.highlight ? 700 : 400,
                      color: c.highlight ? COLORS.white : "rgba(255,255,255,0.55)",
                      whiteSpace: "nowrap",
                    }}>
                      {c.highlight && <span style={{ marginRight: 8, fontSize: 10 }}>▶</span>}
                      {c.name}
                    </td>
                    <td style={{
                      padding: "18px 16px", fontSize: 13,
                      color: c.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                    }}>{c.tech}</td>
                    <td style={{
                      padding: "18px 16px", fontSize: 13,
                      color: c.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                    }}>{c.exec}</td>
                    <td style={{
                      padding: "18px 16px", fontSize: 12,
                      color: c.highlight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                      fontStyle: c.highlight ? "normal" : "italic",
                    }}>{c.note}</td>
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
  const greenPath = [
    { step: "Step 1", label: "選定・マッチング", period: "1〜2ヶ月", desc: "大企業の課題に適合する技術シーズを特定。アライアンス候補の絞り込みと優先度設計。" },
    { step: "Step 2", label: "共同開発・PoC", period: "3〜6ヶ月", desc: "BOAR PMOのもと、共同開発チームを組成。プロトタイプ開発と技術検証を推進。" },
    { step: "Step 3", label: "事業化・市場投入", period: "6〜12ヶ月", desc: "事業計画策定・Go-to-Market設計・量産導入ロードマップを一気通貫で実行。" },
  ];

  const goldPath = [
    { step: "Step 1", label: "選定・バリュエーション", period: "1〜3ヶ月", desc: "M&Aネットワークによる候補先ソーシング・技術評価・企業価値算定。" },
    { step: "Step 2", label: "PMI（統合実行）", period: "3〜6ヶ月", desc: "100日プラン策定・組織設計・事業計画立案。統合実行をPMOとして主導。" },
    { step: "Step 3", label: "マネタイズ・成長", period: "6ヶ月〜", desc: "買収技術の事業化・新規市場参入・グループシナジー実現まで伴走。" },
  ];

  return (
    <section id="services" style={{
      background: COLORS.offWhite, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
            color: COLORS.silver, fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 600, marginBottom: 16,
          }}>
            Services
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 40px)", color: COLORS.darkGreen,
            lineHeight: 1.3, marginBottom: 16,
          }}>
            2軸で、インオーガニック成長を一気通貫する。
          </h2>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)",
            color: COLORS.black, opacity: 0.55, lineHeight: 1.9, maxWidth: 560, marginBottom: 80,
          }}>
            まず1ヶ月のBootcampで課題を特定し、アライアンス軸・M&A軸の最適な経路を設計する。
          </p>
        </FadeIn>

        {/* Bootcamp エントリー */}
        <FadeIn delay={0.05}>
          <div style={{
            background: COLORS.darkGreen, padding: "40px 48px",
            display: "flex", flexWrap: "wrap", justifyContent: "space-between",
            alignItems: "center", gap: 24, marginBottom: 4,
          }}>
            <div>
              <div style={{
                fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 600, marginBottom: 8,
              }}>Entry Point</div>
              <div style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 26, color: COLORS.white, marginBottom: 10,
              }}>Bootcamp</div>
              <div style={{
                fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 480,
              }}>
                1ヶ月・100万円。課題に応じた4パターン（事業開発 / M&A戦略 / 経営企画 / ディープテック事業化）から最適なアプローチを設計し、どの軸で進むかを確定する。
              </div>
            </div>
            <div style={{
              fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
              color: "rgba(255,255,255,0.7)", fontWeight: 700, whiteSpace: "nowrap",
            }}>
              100万円（固定・前払い）
            </div>
          </div>
        </FadeIn>

        {/* 2軸 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
          gap: 4, marginBottom: 4,
        }}>
          {/* グリーンパス */}
          <FadeIn delay={0.1}>
            <div style={{ background: COLORS.white }}>
              <div style={{
                background: "#1a3d2d", padding: "24px 32px",
                borderTop: `3px solid #3DA860`,
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#3DA860", fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 700, marginBottom: 6,
                }}>
                  Green Path — アライアンス軸
                </div>
                <div style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 20, color: COLORS.white, marginBottom: 8,
                }}>
                  ディープテック事業化支援
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
                }}>
                  大企業とスタートアップの対等な同盟を設計・実行。技術シーズから事業化まで伴走。
                </div>
              </div>
              <div style={{ padding: "0 32px 32px" }}>
                {greenPath.map((s, i) => (
                  <div key={s.step} style={{
                    padding: "20px 0",
                    borderBottom: i < greenPath.length - 1 ? `1px solid ${COLORS.lightGray}` : "none",
                    display: "flex", gap: 16,
                  }}>
                    <div style={{ flexShrink: 0, paddingTop: 2 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "#3DA860", marginTop: 6,
                      }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 6 }}>
                        <div style={{
                          fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                          fontWeight: 700, color: COLORS.darkGreen,
                        }}>{s.label}</div>
                        <div style={{
                          fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11,
                          color: COLORS.silver,
                        }}>{s.period}</div>
                      </div>
                      <div style={{
                        fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                        color: COLORS.black, opacity: 0.55, lineHeight: 1.8,
                      }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: COLORS.darkGreen, fontWeight: 700, marginTop: 20,
                }}>
                  月額100万〜300万円（プロジェクト型）
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ゴールドパス */}
          <FadeIn delay={0.15}>
            <div style={{ background: COLORS.white }}>
              <div style={{
                background: "#2a2010", padding: "24px 32px",
                borderTop: `3px solid #b8943a`,
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#b8943a", fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 700, marginBottom: 6,
                }}>
                  Gold Path — M&A軸
                </div>
                <div style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 20, color: COLORS.white, marginBottom: 8,
                }}>
                  インオーガニック事業開発
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
                }}>
                  M&A仲介は成約で終わる。BOARは買収後の事業成長まで責任を持つ。
                </div>
              </div>
              <div style={{ padding: "0 32px 32px" }}>
                {goldPath.map((s, i) => (
                  <div key={s.step} style={{
                    padding: "20px 0",
                    borderBottom: i < goldPath.length - 1 ? `1px solid ${COLORS.lightGray}` : "none",
                    display: "flex", gap: 16,
                  }}>
                    <div style={{ flexShrink: 0 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "#b8943a", marginTop: 6,
                      }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 6 }}>
                        <div style={{
                          fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                          fontWeight: 700, color: COLORS.darkGreen,
                        }}>{s.label}</div>
                        <div style={{
                          fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11,
                          color: COLORS.silver,
                        }}>{s.period}</div>
                      </div>
                      <div style={{
                        fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                        color: COLORS.black, opacity: 0.55, lineHeight: 1.8,
                      }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: COLORS.darkGreen, fontWeight: 700, marginTop: 20,
                }}>
                  リテイナー20万円/月 ＋ 成功報酬（レーマン方式）
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 継続支援 */}
        <FadeIn delay={0.2}>
          <div style={{
            background: COLORS.white, padding: "32px 48px",
            display: "flex", flexWrap: "wrap", justifyContent: "space-between",
            alignItems: "center", gap: 16,
          }}>
            <div>
              <div style={{
                fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                color: COLORS.silver, fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 600, marginBottom: 6,
              }}>Retainer — 継続支援</div>
              <div style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 20, color: COLORS.darkGreen, marginBottom: 8,
              }}>外部経営企画チーム</div>
              <div style={{
                fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                color: COLORS.black, opacity: 0.55, lineHeight: 1.8, maxWidth: 500,
              }}>
                戦略議論・KPI設計・実行支援を月次で伴走。年商20〜100億円企業の約78%に専任の経営企画部門がない——BOARがその機能を担う。
              </div>
            </div>
            <div style={{
              fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
              color: COLORS.darkGreen, fontWeight: 700, whiteSpace: "nowrap",
            }}>
              月額50万〜150万円
            </div>
          </div>
        </FadeIn>
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
      desc: "M&Aアドバイザリー実務・企業価値評価（SYNAPSE DEAL）、スタートアップスタジオのセントラルオフィス責任者（CROSS TOKYO）、中堅企業向け営業支援・CVC立ち上げ支援（CMW）。AI Cockpit構築・運用。高卒・元倒産経験者。学歴や資本ではなく、実務と実行力で動いてきた。",
    },
    {
      name: "溝橋 正輝",
      nameEn: "Masaki Mizohashi",
      role: "共同創業者",
      desc: "川崎重工業（エンジニア）→ 野村證券（法人営業）→ サイバーエージェント → セールスフォース・ジャパン → H.R.I代表取締役（Exit）→ CROSS TOKYO創業。1年で5社を束ね、東京大学先端研・Salesforceとの連携を実現。連続起業家として技術の事業化を実行し続けている。",
    },
  ];

  return (
    <section id="about" style={{
      background: COLORS.white, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
            color: COLORS.silver, fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 600, marginBottom: 16,
          }}>
            About
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 40px)", color: COLORS.darkGreen,
            lineHeight: 1.3, marginBottom: 64,
          }}>
            会社概要
          </h2>
        </FadeIn>

        {/* Members */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32, marginBottom: 80,
        }}>
          {members.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.15}>
              <div style={{
                background: COLORS.offWhite, padding: "40px 32px",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: COLORS.darkGreen, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}>
                  <span style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    color: COLORS.white, fontSize: 22,
                  }}>
                    {m.name[0]}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18,
                  color: COLORS.darkGreen, fontWeight: 700, marginBottom: 4,
                }}>
                  {m.name}
                </div>
                <div style={{
                  fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 13,
                  color: COLORS.silver, marginBottom: 4,
                }}>
                  {m.nameEn}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: COLORS.darkGreen, fontWeight: 600, marginBottom: 16,
                  letterSpacing: "0.05em",
                }}>
                  {m.role}
                </div>
                <p style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                  color: COLORS.black, opacity: 0.6, lineHeight: 1.8,
                }}>
                  {m.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Company info */}
        <FadeIn>
          <div style={{
            borderTop: `1px solid ${COLORS.lightGray}`, paddingTop: 40,
          }}>
            {[
              ["会社名", "株式会社BOAR Partners"],
              ["代表者", "荒川 悠次朗"],
              ["設立", "2026年"],
              ["所在地", "東京都（確定後に更新）"],
              ["事業内容", "経営コンサルティング / M&Aアドバイザリー / 研究開発事業化支援 / AI活用業務設計"],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: "flex", flexWrap: "wrap", padding: "14px 0",
                borderBottom: `1px solid ${COLORS.lightGray}`,
              }}>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                  color: COLORS.black, fontWeight: 600, width: 140, flexShrink: 0,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13,
                  color: COLORS.black, opacity: 0.7,
                }}>
                  {value}
                </div>
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
  const [formData, setFormData] = useState({
    company: "", name: "", email: "", phone: "", message: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    border: `1px solid rgba(255,255,255,0.2)`,
    background: "rgba(255,255,255,0.05)",
    color: COLORS.white, fontSize: 14,
    fontFamily: "'Noto Sans JP', sans-serif",
    outline: "none", transition: "border-color 0.3s",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{
      background: COLORS.darkGreen, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 600, marginBottom: 16,
          }}>
            Contact
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 40px)", color: COLORS.white,
            lineHeight: 1.3, marginBottom: 12,
          }}>
            まずは相談する
          </h2>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14,
            color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 48,
          }}>
            Bootcampのご相談、事業開発のお悩み、技術の事業化について、何でもお気軽にどうぞ。
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", marginBottom: 6, display: "block",
                }}>会社名</label>
                <input style={inputStyle} value={formData.company}
                  onChange={handleChange("company")} placeholder="株式会社〇〇" />
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", marginBottom: 6, display: "block",
                }}>お名前 *</label>
                <input style={inputStyle} value={formData.name}
                  onChange={handleChange("name")} placeholder="山田 太郎" />
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", marginBottom: 6, display: "block",
                }}>メールアドレス *</label>
                <input style={inputStyle} type="email" value={formData.email}
                  onChange={handleChange("email")} placeholder="example@company.co.jp" />
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", marginBottom: 6, display: "block",
                }}>電話番号</label>
                <input style={inputStyle} type="tel" value={formData.phone}
                  onChange={handleChange("phone")} placeholder="03-0000-0000" />
              </div>
            </div>
            <div>
              <label style={{
                fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
                color: "rgba(255,255,255,0.5)", marginBottom: 6, display: "block",
              }}>ご相談内容 *</label>
              <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
                value={formData.message} onChange={handleChange("message")}
                placeholder="ご相談内容をお書きください" />
            </div>
            <button style={{
              padding: "16px 40px", background: COLORS.white,
              color: COLORS.darkGreen, border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: "'Noto Sans JP', sans-serif",
              letterSpacing: "0.06em", transition: "all 0.3s",
              alignSelf: "flex-start",
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
    <footer style={{
      background: COLORS.darkGreenDeep, padding: "48px 32px 32px",
      borderTop: `1px solid rgba(255,255,255,0.06)`,
    }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
        alignItems: "center", gap: 24,
      }}>
        <div style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 18, color: COLORS.white, opacity: 0.7,
        }}>
          BOAR Partners
        </div>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["Philosophy", "Services", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.4)", textDecoration: "none",
              letterSpacing: "0.06em",
            }}>
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div style={{
        maxWidth: 1080, margin: "32px auto 0",
        borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24,
      }}>
        <div style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11,
          color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em",
        }}>
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
