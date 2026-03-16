import { useState } from "react";
import { motion } from "framer-motion";
import { FONTS, COLORS, FadeIn, TextReveal, SectionLabel, Header, Footer, useIsMobile } from "./shared.jsx";

// ─── Origin セクション（新規）────────────────────────────
function Origin() {
  /* TODO: 荒川さん確認・差し替え */
  const storyParagraphs = [
    "商売が好きで、事業を動かすことが好きだ。——それぞれの現場で仕事をしながら、同じ問いを持っていた。",
    "「なぜ、技術は産業にならないのか」",
    "技術の価値を正しく評価し、事業として育て、最終的に統合するまで。そのプロセスを一気通貫で走れるプロ集団を作る。BOARは、その意志から生まれた。",
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
        <div style={{ maxWidth: "none", display: "flex", flexDirection: "column", gap: 28 }}>
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
      photo: "/team/arakawa_crop.jpg",
      photoPos: "center 15%",
      bio: "事業会社を創業・取締役として経営した後、コンサルファームにてM&A戦略室立ち上げ支援・資金調達支援に従事。建設業・内装工事業など複数業種での融資実績、グロース/プライム上場企業への支援実績を持つ。現在はcomissureに参画し、大企業のアカデミア技術活用をテーマに活動している。",
    },
    {
      role: "共同創業者",
      name: "溝橋 正輝",
      nameEn: "Masaki Mizohashi",
      photo: "/team/mizohashi_crop.png",
      photoPos: "center 15%",
      bio: "川崎重工業にてエンジニアとしてキャリアをスタートし、製造技術・品質管理の実務を経た後、野村證券にて資本市場・投資銀行業務に従事。現在はディープテック・スタートアップ支援に特化し、アカデミア発ベンチャーのエコシステムと深いネットワークを持つ。技術の目利きから事業化・資金調達まで一気通貫で動く。",
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
              <TeamMemberCard m={m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({ m }) {
  const [hovered, setHovered] = useState(false);
  const G = COLORS.G300;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img src={m.photo} alt={m.name} style={{
          width: "100%", height: 420, objectFit: "cover",
          objectPosition: m.photoPos, display: "block",
          filter: hovered ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.85)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.5s ease, transform 0.6s ease",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: G, transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left", transition: "transform 0.4s ease",
        }} />
      </div>
      <div style={{ padding: "20px 0 36px" }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 10, color: G,
          letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8,
          opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s",
        }}>{m.role}</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)",
          fontWeight: 700, lineHeight: 1.05, marginBottom: 4,
          color: hovered ? "white" : "rgba(255,255,255,0.7)",
          transition: "color 0.4s",
        }}>{m.name}</div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 12, color: G,
          letterSpacing: "0.04em", marginBottom: 20,
        }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
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
  const [hovered, setHovered] = useState(false);
  const G = COLORS.G300;
  return (
    <a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        background: "#090c0e",
        padding: "72px 8vw",
        borderTop: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.4s",
        cursor: "pointer",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: "clamp(48px,9vw,120px)",
          fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: hovered ? G : "white",
          transition: "color 0.4s",
        }}>
          Contact.
        </div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: G, display: "flex", alignItems: "center", gap: 16,
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
          paddingBottom: 8,
        }}>
          <span style={{ width: 48, height: 1, background: G, display: "inline-block" }} />
          Form
        </div>
      </div>
    </a>
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
              lines={["商売好きな事業開発のプロ集団"]}
              fontSize="clamp(28px,4vw,64px)"
              delay={0.1}
              style={{ marginBottom: 32, whiteSpace: "nowrap" }}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{
                fontFamily: FONTS.body, fontSize: "clamp(14px,1.1vw,17px)",
                color: "rgba(255,255,255,0.55)", lineHeight: 1.9,
              }}
            >
              商売が好きで、事業を動かす力がある。そういう人間が集まる場所として、BOARを作った。
            </motion.p>
          </div>
        </section>

        <Origin />
        <Team />
        <Company />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
