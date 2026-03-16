import { motion } from "framer-motion";
import { FONTS, COLORS, FadeIn, TextReveal, SectionLabel, Header, Footer, useIsMobile } from "./shared.jsx";

// ─── Origin セクション（新規）────────────────────────────
function Origin() {
  /* TODO: 荒川さん確認・差し替え */
  const storyParagraphs = [
    "エンジニアリングと資本市場——異なるフィールドで実績を積んだ2人が出会ったとき、共通の問いが浮かび上がりました。",
    "「なぜ日本の最高の技術は、産業にならないのか」",
    "技術の価値を正しく評価し、事業として育て、最終的に統合するまで。その全プロセスを一気通貫で走れるチームを作る。BOARは、その確信から生まれました。",
  ];

  return (
    <section style={{
      padding: "100px 8vw",
      background: "linear-gradient(180deg, #090c0e 0%, #0d1a14 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ghost テキスト */}
      <div style={{
        position: "absolute", right: "-0.05em", top: "50%", transform: "translateY(-50%)",
        fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(80px,15vw,200px)",
        color: "rgba(255,255,255,0.025)", letterSpacing: "-0.04em", userSelect: "none", lineHeight: 1,
        pointerEvents: "none",
      }}>
        ORIGIN
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>Origin</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 48,
          }}>
            なぜ、BOARをつくったか。
          </h2>
        </FadeIn>
        <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 28 }}>
          {storyParagraphs.map((p, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <p style={{
                fontFamily: FONTS.body,
                fontSize: i === 1 ? "clamp(20px,2.5vw,32px)" : "clamp(15px,1.5vw,17px)",
                color: i === 1 ? COLORS.G300 : "rgba(255,255,255,0.6)",
                lineHeight: i === 1 ? 1.5 : 1.9,
                fontWeight: i === 1 ? 700 : 400,
                margin: 0,
              }}>
                {p}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team セクション ──────────────────────────────────────
function Team() {
  const isMobile = useIsMobile();

  const members = [
    {
      role: "代表",
      name: "荒川 悠次朗",
      nameEn: "Yujiro Arakawa",
      initials: "YA",
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
      initials: "MM",
      career: [
        { phase: "川崎重工業", desc: "エンジニアとしてキャリアをスタート。製造技術・品質管理の実務を担う。" },
        { phase: "野村證券", desc: "資本市場・投資銀行業務に従事。企業価値評価・資金調達の実務を習得。" },
        { phase: "独立後（現在）", desc: "ディープテック・スタートアップ支援に特化。アカデミア発ベンチャーのエコシステムと深いネットワークを持ち、技術の目利きから事業化・資金調達まで一気通貫で支援。" },
      ],
    },
  ];

  return (
    <section style={{ padding: "100px 8vw", background: COLORS.N100 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Team</SectionLabel>
        </FadeIn>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
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
              {/* 写真プレースホルダー + ロール・名前 */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                {/* 円形アバター（TODO: 将来実写真に差し替え可能）*/}
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: COLORS.G300, fontFamily: FONTS.accent, fontWeight: 900,
                  flexShrink: 0,
                }}>
                  {m.initials}
                </div>
                <div>
                  <div style={{
                    fontSize: 11, color: COLORS.G300, letterSpacing: "0.2em",
                    textTransform: "uppercase", marginBottom: 6,
                    fontFamily: FONTS.accent, fontWeight: 700,
                  }}>
                    {m.role}
                  </div>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: "clamp(22px,2.5vw,36px)",
                    fontWeight: 700, color: COLORS.N500, lineHeight: 1.1, marginBottom: 2,
                  }}>
                    {m.name}
                  </div>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 12, color: COLORS.G300,
                    letterSpacing: "0.04em",
                  }}>
                    {m.nameEn}
                  </div>
                </div>
              </div>

              {/* キャリアタイムライン（縦線ドット付き）*/}
              <div style={{ position: "relative" }}>
                {/* 縦線 */}
                <div style={{
                  position: "absolute", left: 3, top: 0, bottom: 0,
                  width: 1, background: "rgba(255,255,255,0.08)",
                }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingLeft: 20 }}>
                  {m.career.map((c, j) => (
                    <div key={j} style={{
                      position: "relative",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      padding: "18px 0",
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: "0 24px",
                    }}>
                      {/* ドット */}
                      <div style={{
                        position: "absolute", left: -23,
                        top: "50%", transform: "translateY(-50%)",
                        width: 7, height: 7, borderRadius: "50%",
                        background: COLORS.G300,
                      }} />
                      <div style={{
                        fontFamily: FONTS.body, fontSize: 11,
                        color: COLORS.G300, letterSpacing: "0.04em",
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Complement セクション（新規）────────────────────────
function Complement() {
  const isMobile = useIsMobile();

  const cards = [
    {
      name: "荒川 悠次朗",
      role: "エバンジェリスト",
      skills: ["事業開発", "M&A戦略", "PMI/PMO", "AI活用"],
    },
    {
      name: "溝橋 正輝",
      role: "エグゼキューション",
      skills: ["テクノロジー", "資本市場", "アカデミア", "技術目利き"],
    },
  ];

  return (
    <section style={{
      padding: "100px 8vw",
      background: "linear-gradient(180deg, #0d1a14 0%, #152f26 100%)",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>Complement</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
          }}>
            補完する2人
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
            color: COLORS.darkBody, lineHeight: 2.0, maxWidth: 600, marginBottom: 56,
          }}>
            それぞれが異なる強みを持つ2人が、一つのチームとして機能する。
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "5fr 2fr 5fr",
            gap: isMobile ? 16 : 0,
            alignItems: "center",
          }}>
            {/* 荒川カード */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "36px 40px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderTop: `3px solid ${COLORS.PHASE_DEFINE}`,
              }}
            >
              <div style={{
                fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.PHASE_DEFINE, marginBottom: 8,
              }}>
                {cards[0].role}
              </div>
              <div style={{
                fontFamily: FONTS.display, fontSize: "clamp(18px,2vw,26px)",
                color: COLORS.N500, fontWeight: 700, marginBottom: 24,
              }}>
                {cards[0].name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cards[0].skills.map((s) => (
                  <span key={s} style={{
                    fontFamily: FONTS.body, fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    padding: "4px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>

            {/* 中央 BOAR */}
            <div style={{ textAlign: "center", padding: "24px 16px" }}>
              <div style={{
                fontFamily: FONTS.accent,
                fontSize: "clamp(20px,3vw,36px)",
                fontWeight: 900, color: COLORS.G300,
                letterSpacing: "0.08em",
              }}>
                BOAR
              </div>
              <div style={{
                fontFamily: FONTS.body, fontSize: 11,
                color: "rgba(255,255,255,0.3)", marginTop: 4,
              }}>
                ×
              </div>
            </div>

            {/* 溝橋カード */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "36px 40px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderTop: `3px solid ${COLORS.PHASE_DELIVER}`,
              }}
            >
              <div style={{
                fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.PHASE_DELIVER, marginBottom: 8,
              }}>
                {cards[1].role}
              </div>
              <div style={{
                fontFamily: FONTS.display, fontSize: "clamp(18px,2vw,26px)",
                color: COLORS.N500, fontWeight: 700, marginBottom: 24,
              }}>
                {cards[1].name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cards[1].skills.map((s) => (
                  <span key={s} style={{
                    fontFamily: FONTS.body, fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    padding: "4px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Company セクション ────────────────────────────────────
function Company() {
  const companyInfo = [
    { label: "会社名",   value: "株式会社BOAR Partners（設立準備中）" },
    { label: "事業内容", value: "M&A × 事業開発 × 資金調達の一気通貫支援" },
    { label: "所在地",   value: "東京都" },
  ];

  return (
    <section style={{
      padding: "80px 8vw 100px",
      background: "linear-gradient(180deg, #090c0e 0%, #0d1a14 100%)",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Company</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          {companyInfo.map((item, idx) => (
            <div key={item.label} style={{
              display: "grid", gridTemplateColumns: "160px 1fr",
              gap: "0 32px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 0",
            }}>
              <div style={{
                fontFamily: FONTS.body, fontSize: 12,
                color: COLORS.G300, letterSpacing: "0.06em",
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
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: "80px 8vw", background: COLORS.G100, textAlign: "center" }}>
      <FadeIn>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(24px,3vw,40px)",
          color: COLORS.N500, marginBottom: 32, fontWeight: 700,
        }}>
          まずは話してみませんか。
        </div>
        <a href="/contact" style={{
          display: "inline-block",
          fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.14em",
          textTransform: "uppercase", fontWeight: 700,
          color: COLORS.N500, textDecoration: "none",
          padding: "16px 48px", border: "1px solid rgba(255,255,255,0.4)",
          transition: "all 0.3s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.N500; e.currentTarget.style.color = COLORS.G100; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.N500; }}
        >
          Contact Us
        </a>
      </FadeIn>
    </section>
  );
}

// ─── Export ──────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ background: COLORS.N100, minHeight: "100vh", overflowX: "clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
      <Header />
      <main>
        {/* ヒーロー帯（現状維持）*/}
        <section style={{
          background: `linear-gradient(160deg, ${COLORS.G100} 0%, ${COLORS.G050} 60%, ${COLORS.N100} 100%)`,
          padding: "160px 8vw 100px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: "-0.05em", top: "50%", transform: "translateY(-50%)",
            fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(120px,20vw,240px)",
            color: "rgba(255,255,255,0.03)", letterSpacing: "-0.04em", userSelect: "none", lineHeight: 1,
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
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{
                fontFamily: FONTS.body, fontSize: "clamp(14px,1.1vw,17px)",
                color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 560,
              }}
            >
              BOAR Partnersは、紹介や橋渡しではなく、チームとして当事者意識を持って事業に入り込む。
              それぞれが異なるフィールドで実績を積んだ2人が、ゼロから共に走る。
            </motion.p>
          </div>
        </section>

        <Origin />
        <Team />
        <Complement />
        <Company />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
