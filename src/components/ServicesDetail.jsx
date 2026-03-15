import { motion } from "framer-motion";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const COLORS = {
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0",
  N100: "#090c0e", N500: "#ffffff",
  darkBody: "rgba(255,255,255,0.45)", darkHL: "rgba(255,255,255,0.92)",
};

const L = {
  text: "#0d1a14", body: "rgba(9,12,14,0.58)",
  accent: "#2d5a40", label: "rgba(9,12,14,0.38)",
  card: "rgba(9,12,14,0.05)", border: "rgba(9,12,14,0.12)",
};

function FadeIn({ children, delay = 0, style: extra = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={extra}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.22em",
        textTransform: "uppercase", fontWeight: 700, marginBottom: 24,
        color: dark ? L.label : "rgba(255,255,255,0.25)",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── ヘッダー（簡易） ───
function Header() {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(9,12,14,0.97)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "15px 32px 10px",
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/boar-logo.png?v=2" alt="BOAR Partners" style={{ height: 48, width: "auto" }} />
        </a>
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {[
            { label: "Philosophy", href: "/#philosophy" },
            { label: "Services",   href: "/services" },
            { label: "About",      href: "/#about" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              color: item.href === "/services" ? COLORS.N500 : "rgba(255,255,255,0.6)",
              textDecoration: "none", fontFamily: FONTS.accent, fontSize: 15,
              letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
              borderBottom: item.href === "/services" ? `1px solid ${COLORS.G300}` : "none",
              paddingBottom: 2,
            }}>{item.label}</a>
          ))}
          <a href="/#contact" style={{
            color: COLORS.N500, textDecoration: "none",
            fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.1em",
            textTransform: "uppercase", fontWeight: 700,
            padding: "10px 24px", border: "1px solid rgba(255,255,255,0.4)",
          }}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

// ─── Section 1: Value Forward ───
function ValueForward() {
  return (
    <section style={{
      background: `linear-gradient(170deg, ${COLORS.N100} 0%, #0a1a12 50%, ${COLORS.G100} 100%)`,
      padding: "160px 8vw 100px", minHeight: "60vh",
      display: "flex", alignItems: "center",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <SectionLabel>Services</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONTS.accent, fontSize: "clamp(52px,9vw,120px)",
            color: COLORS.N500, letterSpacing: "0.02em", lineHeight: 1,
            fontWeight: 900, marginBottom: 32,
          }}
        >
          Value Forward
        </motion.h1>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: FONTS.accent, fontSize: "clamp(16px,1.8vw,22px)",
            color: COLORS.G300, letterSpacing: "0.04em", marginBottom: 32, fontWeight: 700,
          }}>
            技術の価値を、市場に届けきる。
          </p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(15px,1.5vw,18px)",
            color: COLORS.darkBody, lineHeight: 2.0, maxWidth: 680,
          }}>
            課題起点で研究開発をドライブする「<strong style={{ color: COLORS.G300 }}>Forward R&D</strong>」と、<br />
            共創の先にあるM&A/Exitを設計・実行する「<strong style={{ color: COLORS.G300 }}>Forward Buyout</strong>」。<br />
            価値の発見から統合まで、一気通貫で突き進む。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 2: Forward R&D — 3D Framework ───
function ForwardRD() {
  const phases = [
    {
      id: "01",
      name: "Define",
      ja: "課題を定義する",
      desc: "大企業のペインを構造化し、ディープテックで解決可能な「問い」に変換する。課題の発見・定義そのものから入ることで、ミスマッチのない共創起点を設計する。",
    },
    {
      id: "02",
      name: "Drive",
      ja: "研究開発をドライブする",
      desc: "技術パートナーの選定・共同開発・PoC推進・収益化ロードマップの設計。VCMが「製品化済みの技術を購買」するのに対し、研究段階から入り課題ごと一緒に解く。",
    },
    {
      id: "03",
      name: "Deliver",
      ja: "価値を届ける",
      desc: "PMOとして顧客に常駐し、事業化・スケール・グループインまで伴走する。提言で終わらず、実装まで責任を持つ。",
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg,#0d1a14 0%,#152f26 100%)",
      padding: "100px 8vw",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>Forward R&D</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 24,
          }}>
            3D Framework
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
            color: COLORS.darkBody, lineHeight: 2.0, maxWidth: 600, marginBottom: 64,
          }}>
            Forward R&Dは3つのフェーズで構成される。<br />
            課題を「定義」し、研究開発を「駆動」し、価値を「届ける」。
          </p>
        </FadeIn>

        {/* 3フェーズ */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2 }}>
          {phases.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "40px 36px",
                borderTop: `2px solid ${COLORS.G300}`,
                borderRight: i < phases.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div style={{
                fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.22em", color: COLORS.G300, marginBottom: 8,
              }}>{p.id}</div>
              <div style={{
                fontFamily: FONTS.accent, fontSize: "clamp(24px,3vw,36px)",
                color: COLORS.N500, fontWeight: 900, lineHeight: 1, marginBottom: 10,
              }}>{p.name}</div>
              <div style={{
                fontFamily: FONTS.body, fontSize: 13, color: COLORS.G300,
                marginBottom: 24, letterSpacing: "0.04em",
              }}>{p.ja}</div>
              <p style={{
                fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody, lineHeight: 1.9, margin: 0,
              }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 構造図 */}
        <FadeIn delay={0.2} style={{ marginTop: 64 }}>
          <div style={{
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "40px 48px",
            display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "center", gap: 16,
          }}>
            {[
              { label: "大企業（顧客）", sub: "ペイン・課題" },
              null,
              { label: "BOAR Partners", sub: "戦略設計・実行伴走", highlight: true },
              null,
              { label: "アライアンスパートナー群", sub: "ディープテック・研究機関" },
            ].map((item, i) =>
              item === null ? (
                <div key={i} style={{ textAlign: "center", color: COLORS.G300, fontSize: 18 }}>⇄</div>
              ) : (
                <div key={i} style={{
                  textAlign: "center", padding: "24px 20px",
                  background: item.highlight ? "rgba(106,170,136,0.12)" : "rgba(255,255,255,0.03)",
                  border: item.highlight ? `1px solid ${COLORS.G300}` : "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 15, fontWeight: 900,
                    color: item.highlight ? COLORS.G300 : COLORS.darkHL, marginBottom: 8,
                  }}>{item.label}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.darkBody }}>
                    {item.sub}
                  </div>
                </div>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 3: 5 Core Functions ───
function CoreFunctions() {
  const groups = [
    {
      phase: "Define",
      color: COLORS.G200,
      functions: [
        { name: "市場開発", desc: "大企業のペインを構造化し、ディープテックで解決可能な「問い」に変換する。" },
      ],
    },
    {
      phase: "Drive",
      color: "#3d7054",
      functions: [
        { name: "共同開発", desc: "技術パートナーと共同で解を設計・プロトタイプを推進する。" },
        { name: "事業化",   desc: "PoC → 収益化ロードマップ設計・事業モデル構築。" },
      ],
    },
    {
      phase: "Deliver",
      color: COLORS.G300,
      functions: [
        { name: "PMO",     desc: "チームで顧客先に常駐し、事業開発をディレクションする。" },
        { name: "資本政策", desc: "段階的グループイン・Exit設計・M&Aスキーム組成。" },
      ],
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg,#152f26 0%,#1e3d2e 100%)",
      padding: "100px 8vw",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>Forward R&D</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 64,
          }}>
            5 Core Functions
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {groups.map((g, gi) => (
            <motion.div
              key={g.phase}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: gi * 0.1 }}
              style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 0 }}
            >
              {/* フェーズラベル */}
              <div style={{
                background: g.color, padding: "20px 24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                gridRow: `span ${g.functions.length}`,
              }}>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: 18, fontWeight: 900,
                  color: COLORS.N500, writingMode: "vertical-rl", letterSpacing: "0.1em",
                }}>{g.phase}</div>
              </div>
              {/* ファンクション */}
              {g.functions.map((f, fi) => (
                <div key={f.name} style={{
                  padding: "28px 40px",
                  background: "rgba(255,255,255,0.025)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", gap: 32, alignItems: "flex-start",
                }}>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 16, fontWeight: 900,
                    color: COLORS.darkHL, minWidth: 120,
                  }}>{f.name}</div>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody,
                    lineHeight: 1.9, margin: 0, flex: 1,
                  }}>{f.desc}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Forward Buyout ───
function ForwardBuyout() {
  const comparison = [
    ["", "一般的なM&A FA", "Forward Buyout"],
    ["起点", "売り手・買い手からの受託", "共創の過程で自然に生まれる"],
    ["技術理解", "外部DD（限定的）", "共同開発を通じた深い理解"],
    ["PMI設計", "ディール後に着手", "ディール前から実質的に始まっている"],
    ["バリュエーション", "財務指標ベース", "技術の社会実装ポテンシャルを織り込む"],
  ];

  const flow = ["バリュエーション", "ストラクチャー設計", "PMI実行", "マネタイズ"];

  return (
    <section style={{
      background: "linear-gradient(180deg,#6aaa88 0%,#b0d4c0 100%)",
      padding: "100px 8vw",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel dark>Forward Buyout</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: L.text, fontWeight: 900, lineHeight: 1.1, marginBottom: 12,
          }}>
            価値の統合
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.accent, fontSize: "clamp(14px,1.5vw,18px)",
            color: L.accent, marginBottom: 32, fontWeight: 700,
          }}>
            共創の延長線上にあるM&A
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
            color: L.body, lineHeight: 2.0, maxWidth: 640, marginBottom: 56,
          }}>
            社会実装の過程で成熟したアライアンスパートナーの段階的グループインを設計・実行する。<br />
            共創の延長線上にあるM&Aだからこそ、技術の本質的な価値に基づくストラクチャーを組める。
          </p>
        </FadeIn>

        {/* プロセスフロー */}
        <FadeIn delay={0.2} style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
            {flow.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  padding: "14px 28px", background: L.card,
                  border: `1px solid ${L.border}`, borderTop: `3px solid ${L.accent}`,
                  fontFamily: FONTS.accent, fontSize: 14, fontWeight: 900,
                  color: L.text, letterSpacing: "0.04em", whiteSpace: "nowrap",
                }}>{step}</div>
                {i < flow.length - 1 && (
                  <div style={{ padding: "0 12px", color: L.accent, fontSize: 16, fontWeight: 900 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 比較テーブル */}
        <FadeIn delay={0.25}>
          <div style={{ border: `1px solid ${L.border}`, overflow: "hidden" }}>
            {comparison.map((row, ri) => (
              <div key={ri} style={{
                display: "grid", gridTemplateColumns: "1fr 2fr 2fr",
                borderBottom: ri < comparison.length - 1 ? `1px solid ${L.border}` : "none",
                background: ri === 0 ? "rgba(9,12,14,0.08)" : (ri % 2 === 0 ? "transparent" : "rgba(9,12,14,0.025)"),
              }}>
                {row.map((cell, ci) => (
                  <div key={ci} style={{
                    padding: "16px 24px",
                    fontFamily: ri === 0 ? FONTS.accent : (ci === 2 ? FONTS.body : FONTS.body),
                    fontSize: ri === 0 ? 11 : 14,
                    fontWeight: ri === 0 ? 700 : (ci === 0 ? 700 : 400),
                    letterSpacing: ri === 0 ? "0.12em" : "0",
                    textTransform: ri === 0 ? "uppercase" : "none",
                    color: ri === 0 ? L.label : (ci === 2 ? L.accent : L.body),
                    borderRight: ci < 2 ? `1px solid ${L.border}` : "none",
                  }}>
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* R&Dとの接続 */}
        <FadeIn delay={0.3} style={{ marginTop: 48 }}>
          <div style={{
            padding: "28px 36px",
            background: L.card, border: `1px solid ${L.border}`,
            borderLeft: `3px solid ${L.accent}`,
          }}>
            <div style={{ fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase", color: L.label, marginBottom: 12 }}>
              Forward R&D との接続
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: L.body, lineHeight: 1.9, margin: 0 }}>
              Forward R&D の Deliver フェーズで実装が成熟した時点で、<br />
              「この技術はグループに組み込むべき」という判断が生まれる。<br />
              そこで Forward Buyout が発動し、共創の延長線上でM&Aを設計・実行する。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 5: 1st Alliance Partner ───
function AlliancePartner() {
  return (
    <section style={{
      background: "linear-gradient(180deg,#b0d4c0 0%,#d0e8dd 100%)",
      padding: "100px 8vw",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel dark>Alliance Partner</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: L.text, fontWeight: 900, lineHeight: 1.1, marginBottom: 40,
          }}>
            1st Alliance Partner
          </h2>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: L.card, border: `1px solid ${L.border}`,
            borderTop: `3px solid ${L.accent}`, padding: "48px 56px",
            maxWidth: 680,
          }}
        >
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: L.label, marginBottom: 12,
          }}>
            触覚AI / Physical AI
          </div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,44px)",
            color: L.text, fontWeight: 900, lineHeight: 1.0, marginBottom: 24,
          }}>
            commissure
          </div>
          <p style={{
            fontFamily: FONTS.body, fontSize: 15, color: L.body,
            lineHeight: 2.0, margin: 0,
          }}>
            BOAR Partnersの第1号アライアンスパートナー。<br />
            触覚AI（ハプティクス）領域のディープテック企業として、<br />
            大企業との共創プロジェクトにおけるショーケースの役割を担う。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact CTA ───
function ContactCTA() {
  return (
    <section style={{
      background: "linear-gradient(180deg,#d0e8dd 0%,#f0f4f2 60%, #090c0e 100%)",
      padding: "100px 8vw 120px",
      textAlign: "center",
    }}>
      <FadeIn>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: L.label, marginBottom: 24,
        }}>Contact</div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{
          fontFamily: FONTS.accent, fontSize: "clamp(28px,5vw,64px)",
          color: L.text, fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
        }}>
          まずは、話しましょう。
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
          color: L.body, lineHeight: 2.0, marginBottom: 48,
        }}>
          ディープテック事業化、M&A、資本政策——どのフェーズでもご相談ください。
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <a href="/#contact" style={{
          display: "inline-block", padding: "18px 56px",
          border: `1px solid ${L.accent}`, color: L.accent,
          textDecoration: "none", fontFamily: FONTS.accent, fontSize: 14,
          letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700,
          transition: "all 0.4s",
        }}
          onMouseEnter={(e) => { e.target.style.background = L.accent; e.target.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = L.accent; }}
        >
          Get in touch
        </a>
      </FadeIn>
    </section>
  );
}

export default function ServicesDetail() {
  return (
    <div style={{ overflowX: "clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <Header />
      <main>
        <ValueForward />
        <ForwardRD />
        <CoreFunctions />
        <ForwardBuyout />
        <AlliancePartner />
        <ContactCTA />
      </main>
    </div>
  );
}
