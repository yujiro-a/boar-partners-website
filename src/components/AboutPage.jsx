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

// ─── Pillars セクション ───────────────────────────────────
const PILLARS = [
  {
    num: "01",
    en: "EXECUTE",
    title: "事業開発のプロ集団",
    punch: "戦略だけ、渡さない。",
    img: "/what-we-do-01.jpg",
    fallback: "linear-gradient(160deg,#152f26 0%,#0d1a14 100%)",
    body: [
      "事業開発には「動ける人」が必要だ。戦略を設計するだけでなく、顧客に会いに行き、パートナーと交渉し、チームを動かす。BOARはその実行まで一気通貫で走る。",
      "紹介や橋渡しで終わらない。プロジェクトが動いている間、チームの一員として並走し続ける。それが、私たちの「EXECUTE」の意味だ。",
    ],
    tags: ["事業戦略", "実行支援", "パートナー開拓", "PMO"],
  },
  {
    num: "02",
    en: "BRIDGE",
    title: "アカデミアとの深い連携",
    punch: "研究室の言語で、話せる。",
    img: "/what-we-do-02.jpg",
    fallback: "linear-gradient(160deg,#1e3a2a 0%,#0d1a14 100%)",
    body: [
      "大学の研究室と企業の間には、深い溝がある。技術の言語と、ビジネスの言語が噛み合わない。BOARは両方の言語で話せる人間が揃っている。",
      "東京大学をはじめとする研究ネットワークを活かし、技術の目利きから社会実装まで研究現場と並走する。アカデミア発のイノベーションを、産業に変える。",
    ],
    tags: ["アカデミア連携", "技術目利き", "社会実装", "共同研究"],
  },
  {
    num: "03",
    en: "ACCELERATE",
    title: "AIが一員として動く",
    punch: "AIが本当に、働く。",
    img: "/what-we-do-03.jpg",
    fallback: "linear-gradient(160deg,#0a1a12 0%,#152f26 100%)",
    body: [
      "AIを「ツールとして使う」時代は終わった。BOARでは、AIエージェントがチームの一員として実際の業務を担う。調査、分析、ドキュメント生成——人間が判断し、AIが動く体制で動いている。",
      "この仕組みを、クライアントの現場にも持ち込む。意思決定のサイクルを速め、仮説検証のコストを下げる。それが、私たちが言う「ACCELERATE」だ。",
    ],
    tags: ["AI活用", "エージェント設計", "業務自動化", "意思決定支援"],
  },
];

function Pillars() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{
      background: "#090c0e",
      padding: "100px 8vw",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>What We Do</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 64,
          }}>
            三つの力が、一体化して動く。
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.en}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
                gap: isMobile ? 0 : "0 64px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
              }}
            >
              {/* 左: 画像 */}
              <div style={{
                position: "relative",
                height: isMobile ? "52vw" : 320,
                overflow: "hidden",
              }}>
                <motion.div
                  animate={{ scale: hovered === i ? 1.04 : 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url(${p.img}), ${p.fallback}`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(50%) brightness(0.78) saturate(0.6)",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(9,12,14,0.90) 0%, rgba(9,12,14,0.35) 60%, rgba(9,12,14,0.10) 100%)",
                }} />
                {/* 番号 + EN */}
                <div style={{
                  position: "absolute", bottom: 20, left: 24,
                }}>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.25em",
                    color: "rgba(255,255,255,0.35)", marginBottom: 4,
                  }}>{p.num}</div>
                  <div style={{
                    fontFamily: FONTS.accent,
                    fontSize: "clamp(28px,4vw,48px)",
                    fontWeight: 900,
                    color: hovered === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                    lineHeight: 0.9, letterSpacing: "-0.01em",
                    transition: "color 0.4s",
                  }}>{p.en}</div>
                </div>
                {/* 下ライン */}
                <motion.div
                  animate={{ scaleX: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: 2, background: COLORS.G300, transformOrigin: "left",
                  }}
                />
              </div>

              {/* 右: テキスト */}
              <div style={{
                padding: isMobile ? "28px 0 36px" : "36px 0",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <div style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(16px,1.6vw,20px)",
                  fontWeight: 700, color: COLORS.N500,
                  marginBottom: 8,
                }}>{p.title}</div>
                <div style={{
                  fontFamily: FONTS.body,
                  fontSize: "clamp(13px,1vw,15px)",
                  color: COLORS.G300, marginBottom: 24,
                  letterSpacing: "0.02em",
                }}>{p.punch}</div>
                {p.body.map((text, j) => (
                  <p key={j} style={{
                    fontFamily: FONTS.body,
                    fontSize: "clamp(13px,1.1vw,15px)",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.9, marginBottom: j < p.body.length - 1 ? 16 : 24,
                  }}>{text}</p>
                ))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: FONTS.body, fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      padding: "3px 10px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
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
        <Pillars />
        <Team />
        <Company />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
