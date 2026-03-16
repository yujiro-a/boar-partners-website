import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, TrendingUp } from "lucide-react";
import { FONTS, COLORS, FadeIn, SectionLabel, Header, Footer, useIsMobile } from "./shared.jsx";

const GridOverlay = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="grid-sv" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#grid-sv)"/>
  </svg>
);

// ─── カラーパレット（ライト） ────────────────────────────
const L = {
  bg0:   "#ede8df",  // 最も明るいベージュ（Hero）
  bg1:   "#e8e2d8",  // 中ベージュ
  bg2:   "#e2dbd0",  // やや締まったベージュ
  bg3:   "#f5f1eb",  // 薄いベージュ（コントラスト用）
  text:  "#0d1a14",
  body:  "rgba(9,12,14,0.58)",
  dim:   "rgba(9,12,14,0.35)",
  accent: COLORS.G200,  // #2d5a40
  line:  "rgba(9,26,20,0.1)",
  lineDim: "rgba(9,26,20,0.06)",
};

// ─── Diagonal Section（ライト版）────────────────────────
function DiagSection({ children, bg, style: extra = {}, id }) {
  return (
    <section id={id} style={{
      background: bg,
      clipPath: "polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)",
      padding: "calc(88px + 4vw) 8vw",
      marginTop: "-4vw", marginBottom: "-4vw",
      position: "relative", zIndex: 1,
      ...extra,
    }}>
      {children}
    </section>
  );
}

// ─── Hero（ダーク）────────────────────────────────────────
function ServicesHero() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      background: "radial-gradient(ellipse 70% 60% at 15% 40%, rgba(45,90,64,0.22) 0%, transparent 70%), linear-gradient(180deg,#090c0e 0%,#0d1a14 100%)",
      padding: isMobile ? "140px 6vw 100px" : "160px 8vw 120px",
      position: "relative", overflow: "hidden",
    }}>
      <GridOverlay />
      {/* ゴーストテキスト */}
      <div style={{
        position: "absolute", right: "-0.04em", bottom: "-0.05em",
        fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(120px,28vw,360px)",
        color: "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>
        SVC
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: isMobile ? "clamp(52px,14vw,80px)" : "clamp(72px,10vw,120px)",
            color: COLORS.N500, lineHeight: 0.92, letterSpacing: "-0.02em",
          }}>
            SERVICE.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Value Forward（ベージュ・DiagSection）─────────────────
function ValueForwardSection() {
  const isMobile = useIsMobile();

  const services = [
    {
      num: "01",
      tag: "Forward R&D",
      icon: <FlaskConical size={22} color={L.accent} />,
      title: "研究開発の共創設計",
      desc: "アカデミア発ディープテックと大企業を繋ぎ、課題定義から事業化・社会実装まで共創プロセスをディレクションする。提言ではなく、チームの一員として現場に入り込む。",
      points: ["課題の発見・定義", "技術パートナー選定・共同開発", "PoC推進・事業化ロードマップ", "PMOとして実装まで伴走"],
    },
    {
      num: "02",
      tag: "Forward Buyout",
      icon: <TrendingUp size={22} color={L.accent} />,
      title: "共創の延長線上にあるM&A",
      desc: "共同開発を通じて深く理解した技術の段階的グループインを設計・実行する。財務指標だけでなく、技術の社会実装ポテンシャルを織り込んだバリュエーションが特徴。",
      points: ["段階的グループイン設計", "技術価値ベースのバリュエーション", "ストラクチャー組成", "PMI実行・マネタイズ支援"],
    },
  ];

  return (
    <DiagSection
      bg={`
        radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,255,255,0.45) 0%, transparent 55%),
        radial-gradient(ellipse 50% 70% at 20% 80%, rgba(180,165,140,0.15) 0%, transparent 50%),
        linear-gradient(180deg, ${L.bg1} 0%, ${L.bg2} 100%)
      `}
      style={{ zIndex: 2 }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* コンセプト */}
        <SectionLabel color={L.accent}>Value Forward</SectionLabel>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 28 : 80,
          marginBottom: 72,
        }}>
          <FadeIn>
            <h2 style={{
              fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,48px)",
              color: L.text, fontWeight: 900, lineHeight: 1.1, marginBottom: 28,
            }}>
              提言ではなく、<br />実装まで。
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)", color: L.body, lineHeight: 2.0, margin: 0 }}>
              多くのコンサルティングは「提言」で終わります。BOARが目指すのはその先です。技術が産業になるまでを、チームの一員として現場で動き続ける。
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{
              fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)", color: L.body, lineHeight: 2.0, margin: 0,
              paddingTop: isMobile ? 0 : "clamp(56px,5vw,72px)",
            }}>
              R&Dの起点となる課題定義から、共同開発・事業化、そしてM&Aによる価値統合まで。「技術の価値を前に進める」ことを一気通貫で担います。
            </p>
          </FadeIn>
        </div>

        {/* Value Forward 親ボックス */}
        <FadeIn delay={0.2}>
          <div style={{ position: "relative", padding: isMobile ? "28px 24px 32px" : "36px 40px 40px" }}>
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <div key={`${v}${h}`} style={{
                position: "absolute", [v]: 0, [h]: 0, width: 24, height: 24,
                borderTop: v === "top" ? `2px solid rgba(9,26,20,0.28)` : "none",
                borderBottom: v === "bottom" ? `2px solid rgba(9,26,20,0.28)` : "none",
                borderLeft: h === "left" ? `2px solid rgba(9,26,20,0.28)` : "none",
                borderRight: h === "right" ? `2px solid rgba(9,26,20,0.28)` : "none",
              }} />
            ))}

            {/* 親ヘッダー */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 20 }}>
              <div style={{
                fontFamily: FONTS.accent, fontSize: isMobile ? 18 : "clamp(18px,2vw,24px)",
                fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase",
                color: L.text, flexShrink: 0,
              }}>Value Forward</div>
              <div style={{ flex: 1, height: 1, background: L.line }} />
              {!isMobile && (
                <div style={{ fontFamily: FONTS.body, fontSize: 13, color: L.accent, flexShrink: 0 }}>
                  技術の価値を、市場に届けきる。
                </div>
              )}
            </div>

            {/* 2枚のカード */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 16,
            }}>
              {services.map((s, i) => (
                <motion.div
                  key={s.tag}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  style={{
                    position: "relative", overflow: "hidden",
                    padding: "32px 32px 36px",
                    background: "rgba(9,12,14,0.04)",
                    border: `1px solid ${L.line}`,
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(45,90,64,0.35)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = L.line}
                >
                  <div style={{ marginBottom: 20 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.2em", color: L.accent, marginBottom: 8, opacity: 0.55,
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: "clamp(22px,2.4vw,32px)",
                    fontWeight: 900, color: L.text, lineHeight: 1.05, marginBottom: 8,
                  }}>{s.tag}</div>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: "clamp(13px,1.4vw,16px)",
                    fontWeight: 700, color: L.accent, marginBottom: 20,
                  }}>{s.title}</div>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 14, color: L.body,
                    lineHeight: 1.95, marginBottom: 24,
                  }}>{s.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.points.map((pt, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: L.accent, flexShrink: 0 }} />
                        <div style={{ fontFamily: FONTS.body, fontSize: 13, color: L.dim }}>{pt}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </DiagSection>
  );
}

// ─── Forward R&D 詳細（ダーク DiagSection）──────────────
function ForwardRDDetail() {
  const isMobile = useIsMobile();

  const phases = [
    {
      num: "01", name: "Define", ja: "課題を定義する", color: L.accent,
      desc: "大企業のペインを構造化し、ディープテックで解決可能な「問い」に変換する。課題の発見・定義そのものから入ることで、ミスマッチのない共創起点を設計する。",
    },
    {
      num: "02", name: "Drive", ja: "研究開発をドライブする", color: L.accent,
      desc: "技術パートナーの選定・共同開発・PoC推進・収益化ロードマップの設計。製品化済みの技術を購買するのではなく、研究段階から入り課題ごと一緒に解く。",
    },
    {
      num: "03", name: "Deliver", ja: "価値を届ける", color: L.accent,
      desc: "PMOとして顧客に常駐し、事業化・スケール・グループインまで伴走する。提言で終わらず、実装まで責任を持つ。",
    },
  ];

  return (
    <DiagSection
      id="forward-rd"
      bg="radial-gradient(ellipse 70% 60% at 15% 40%, rgba(45,90,64,0.22) 0%, transparent 70%), linear-gradient(180deg,#090c0e 0%,#0d1a14 100%)"
      style={{ zIndex: 3 }}
    >
      <GridOverlay />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>Forward R&D</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
          }}>
            3D Framework
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
            color: COLORS.darkBody, lineHeight: 2.0, maxWidth: 540, marginBottom: 64,
          }}>
            課題を「定義」し、研究開発を「駆動」し、価値を「届ける」。<br />
            3つのフェーズで、技術を産業に変える。
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {phases.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
                gap: isMobile ? 12 : "0 56px",
                alignItems: "start",
                padding: "40px 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                ...(i === phases.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.07)" } : {}),
              }}
            >
              <div>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", marginBottom: 8,
                }}>{p.num}</div>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,44px)",
                  fontWeight: 900, color: COLORS.N500, lineHeight: 0.95, marginBottom: 8,
                }}>{p.name}</div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 13, color: COLORS.G300,
                  letterSpacing: "0.04em",
                }}>{p.ja}</div>
              </div>
              <div style={{ paddingTop: isMobile ? 0 : 6 }}>
                <p style={{
                  fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,15px)",
                  color: COLORS.darkBody, lineHeight: 2.0, margin: 0,
                }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DiagSection>
  );
}

// ─── Forward Buyout 詳細（ベージュ・A+Cフロー）──────────
function ForwardBuyoutDetail() {
  const isMobile = useIsMobile();

  const rdSteps = [
    { num: "01", label: "課題定義", desc: "ペインを構造化し、解くべき問いに変換する" },
    { num: "02", label: "共同開発", desc: "技術パートナーと研究段階から深く連携する" },
    { num: "03", label: "事業化", desc: "PoC推進・収益化ロードマップを設計する" },
  ];
  const buyoutSteps = [
    { num: "04", label: "M&A設計", desc: "共創の延長でストラクチャーを組む" },
    { num: "05", label: "PMI実行", desc: "統合は共創の現場ですでに始まっている" },
  ];

  const C_RD     = COLORS.G300;   // R&D カラー
  const C_BO     = COLORS.G200;   // Buyout カラー
  const C_CIRCLE = L.bg1;         // 丸の背景（ベージュ）

  // ─ デスクトップ用ノード ─
  const DesktopNode = ({ num, label, desc, color, last }) => (
    <div style={{ flex: 1, display: "flex", alignItems: "stretch", minWidth: 0 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* 丸 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            border: `2px solid ${color}`, background: C_CIRCLE,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: FONTS.accent, fontSize: 13, fontWeight: 900, color,
            flexShrink: 0, position: "relative", zIndex: 2, marginBottom: 16,
          }}
        >{num}</motion.div>
        {/* ラベル */}
        <div style={{
          fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
          color: L.text, textAlign: "center", marginBottom: 8,
        }}>{label}</div>
        {/* 説明 */}
        <p style={{
          fontFamily: FONTS.body, fontSize: 12, color: L.body,
          lineHeight: 1.7, textAlign: "center", margin: 0,
        }}>{desc}</p>
      </div>
      {/* 矢羽（最後のノードは不要） */}
      {!last && (
        <div style={{
          flexShrink: 0, display: "flex", alignItems: "flex-start", paddingTop: 10,
          color: L.dim, fontSize: 18, lineHeight: "44px",
        }}>›</div>
      )}
    </div>
  );

  return (
    <DiagSection
      id="forward-buyout"
      bg={`radial-gradient(ellipse 70% 50% at 15% 15%, rgba(255,255,255,0.48) 0%, transparent 55%), linear-gradient(180deg, ${L.bg1} 0%, ${L.bg2} 100%)`}
      style={{ zIndex: 4 }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel color={L.accent}>Forward Buyout</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: L.text, fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
          }}>
            共創の延長線上に<br />あるM&A
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
            color: L.body, lineHeight: 2.0, maxWidth: 600, marginBottom: 64,
          }}>
            社会実装の過程で成熟したアライアンスパートナーの段階的グループインを設計・実行する。共創の延長線上にあるM&Aだからこそ、技術の本質的な価値に基づくストラクチャーを組める。
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          {isMobile ? (
            /* ── モバイル: 縦タイムライン ── */
            <div style={{ position: "relative", paddingLeft: 28 }}>
              {/* 縦ライン */}
              <div style={{
                position: "absolute", left: 10, top: 22, bottom: 22,
                width: 1,
                background: `linear-gradient(to bottom, ${C_RD} 55%, ${C_BO} 100%)`,
                opacity: 0.35,
              }} />

              {/* R&D フェーズラベル */}
              <div style={{
                fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", color: C_RD, marginBottom: 20,
                paddingLeft: 8,
              }}>FORWARD R&D</div>

              {rdSteps.map((s, i) => (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${C_RD}`, background: C_CIRCLE,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FONTS.accent, fontSize: 10, fontWeight: 900, color: C_RD,
                    marginTop: 2, position: "relative", zIndex: 2,
                  }}>{s.num}</div>
                  <div>
                    <div style={{ fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700, color: L.text, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: FONTS.body, fontSize: 13, color: L.body, lineHeight: 1.7 }}>{s.desc}</div>
                  </div>
                </motion.div>
              ))}

              {/* フェーズ切れ目 */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 20, marginLeft: -28,
                paddingLeft: 28,
              }}>
                <div style={{ height: 1, width: 20, background: L.line }} />
                <div style={{
                  fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.18em", color: C_BO,
                }}>FORWARD BUYOUT</div>
                <div style={{ flex: 1, height: 1, background: L.line }} />
              </div>

              {buyoutSteps.map((s, i) => (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${C_BO}`, background: C_CIRCLE,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FONTS.accent, fontSize: 10, fontWeight: 900, color: C_BO,
                    marginTop: 2, position: "relative", zIndex: 2,
                  }}>{s.num}</div>
                  <div>
                    <div style={{ fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700, color: L.text, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: FONTS.body, fontSize: 13, color: L.body, lineHeight: 1.7 }}>{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* ── デスクトップ: 横フロー ── */
            <div>
              {/* フェーズバンド */}
              <div style={{ display: "flex", marginBottom: 24, gap: 0 }}>
                <div style={{
                  flex: 3, padding: "7px 0 7px 4px",
                  borderLeft: `3px solid ${C_RD}`,
                  fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.18em", color: C_RD,
                }}>FORWARD R&D</div>
                <div style={{ width: 24 }} />
                <div style={{
                  flex: 2, padding: "7px 0 7px 4px",
                  borderLeft: `3px solid ${C_BO}`,
                  fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.18em", color: C_BO,
                }}>FORWARD BUYOUT</div>
              </div>

              {/* 接続ライン（丸の中心を通る） */}
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", top: 21, left: "4%", right: "4%",
                  height: 1,
                  background: `linear-gradient(to right, ${C_RD} 0%, ${C_RD} 52%, ${C_BO} 58%, ${C_BO} 100%)`,
                  opacity: 0.25, zIndex: 1,
                }} />
                {/* フェーズ切れ目の縦ライン */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0,
                  left: "calc(60% - 12px)",
                  width: 1, background: L.line, zIndex: 1,
                }} />

                {/* ノード群 */}
                <div style={{ display: "flex", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
                  {rdSteps.map((s, i) => (
                    <DesktopNode key={s.num} {...s} color={C_RD} last={false} />
                  ))}
                  <div style={{ width: 24, flexShrink: 0 }} />
                  {buyoutSteps.map((s, i) => (
                    <DesktopNode key={s.num} {...s} color={C_BO} last={i === buyoutSteps.length - 1} />
                  ))}
                </div>
              </div>

              {/* BOARの関与期間バー */}
              <div style={{ marginTop: 32, position: "relative" }}>
                <div style={{
                  height: 3, borderRadius: 2,
                  background: `linear-gradient(to right, ${C_RD}, ${C_BO})`,
                  opacity: 0.45,
                }} />
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginTop: 8,
                  fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.15em", color: L.dim,
                }}>
                  <span>← BOARの関与期間（R&D起点から一気通貫）</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </DiagSection>
  );
}

// ─── Alliance Partner（ダーク）────────────────────────────
function AlliancePartner() {
  const isMobile = useIsMobile();
  return (
    <DiagSection
      bg="radial-gradient(ellipse 60% 55% at 85% 30%, rgba(45,90,64,0.18) 0%, transparent 65%), linear-gradient(180deg,#0d1a14 0%,#090c0e 100%)"
      style={{ zIndex: 5 }}
    >
      <GridOverlay />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>Alliance Partner</SectionLabel>
        <FadeIn>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 80,
            alignItems: "start",
          }}>
            <div>
              <h2 style={{
                fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,44px)",
                color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 24,
              }}>
                1st Alliance<br />Partner
              </h2>
              <p style={{
                fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,15px)",
                color: COLORS.darkBody, lineHeight: 2.0, margin: 0,
              }}>
                BOAR Partners の Forward R&D における第1号アライアンスパートナー。大企業との共創プロジェクトのショーケースとして、ディープテック社会実装の先駆例を担います。
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 36 }} />
              <div style={{
                fontFamily: FONTS.body, fontSize: 12,
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", marginBottom: 20,
              }}>
                触覚AI / Physical AI
              </div>
              <div style={{
                fontFamily: FONTS.accent, fontSize: "clamp(36px,5vw,64px)",
                color: COLORS.G300, fontWeight: 900, lineHeight: 0.95,
                letterSpacing: "-0.01em", marginBottom: 28,
              }}>
                commissure
              </div>
              <p style={{
                fontFamily: FONTS.body, fontSize: 15,
                color: COLORS.darkBody, lineHeight: 2.0, margin: 0, maxWidth: 360,
              }}>
                触覚AI（ハプティクス）領域のディープテック企業として、大企業との共創プロジェクトを推進中。
              </p>
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginTop: 36 }} />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </DiagSection>
  );
}

// ─── Contact CTA（ダーク・コントラスト）──────────────────
function ContactCTA() {
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
        marginTop: "-4vw",
        borderTop: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.4s",
        cursor: "pointer",
        position: "relative", zIndex: 6,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: "clamp(48px,9vw,120px)",
          fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: hovered ? G : COLORS.N500, transition: "color 0.4s",
        }}>
          Contact.
        </div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: G, display: "flex", alignItems: "center", gap: 16,
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s", paddingBottom: 8,
        }}>
          <span style={{ width: 48, height: 1, background: G, display: "inline-block" }} />
          Form
        </div>
      </div>
    </a>
  );
}

// ─── Export ──────────────────────────────────────────────
export default function ServicesDetail() {
  return (
    <div style={{ overflowX: "clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <Header />
      <main>
        <ServicesHero />
        <ValueForwardSection />
        <ForwardRDDetail />
        <ForwardBuyoutDetail />
        <AlliancePartner />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
