import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Search, Users, Rocket, Layers, PieChart,
  ArrowRight, ArrowDown, FlaskConical, TrendingUp,
  CheckCircle,
} from "lucide-react";
import { FONTS, COLORS, FadeIn, SectionLabel, Header, Footer, useIsMobile } from "./shared.jsx";

// ─── Section 1: Value Forward ─────────────────────────────
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

// ─── Section 2: Forward R&D — 3D Framework ───────────────
function ForwardRD() {
  const isMobile = useIsMobile();

  const phases = [
    {
      num: "01", name: "Define", ja: "課題を定義する",
      color: COLORS.PHASE_DEFINE, icon: <Search size={24} color={COLORS.PHASE_DEFINE} />,
      desc: "大企業のペインを構造化し、ディープテックで解決可能な「問い」に変換する。課題の発見・定義そのものから入ることで、ミスマッチのない共創起点を設計する。",
    },
    {
      num: "02", name: "Drive", ja: "研究開発をドライブする",
      color: COLORS.PHASE_DRIVE, icon: <Users size={24} color={COLORS.PHASE_DRIVE} />,
      desc: "技術パートナーの選定・共同開発・PoC推進・収益化ロードマップの設計。VCMが「製品化済みの技術を購買」するのに対し、研究段階から入り課題ごと一緒に解く。",
    },
    {
      num: "03", name: "Deliver", ja: "価値を届ける",
      color: COLORS.PHASE_DELIVER, icon: <Rocket size={24} color={COLORS.PHASE_DELIVER} />,
      desc: "PMOとして顧客に常駐し、事業化・スケール・グループインまで伴走する。提言で終わらず、実装まで責任を持つ。",
    },
  ];

  // エコシステム図ノード定義（SVG座標）
  const ecosystemDesktop = {
    viewBox: "0 0 900 200",
    nodes: [
      { x: 30, y: 50, w: 220, h: 100, label: "大企業（顧客）", sub: "ペイン・課題", highlight: false },
      { x: 340, y: 30, w: 220, h: 140, label: "BOAR Partners", sub: "戦略設計・実行伴走", highlight: true },
      { x: 650, y: 50, w: 220, h: 100, label: "アライアンスパートナー群", sub: "ディープテック・研究機関", highlight: false },
    ],
    arrows: [
      { x1: 250, y1: 100, x2: 340, y2: 100 },
      { x1: 560, y1: 100, x2: 650, y2: 100 },
    ],
  };

  const ecosystemMobile = {
    viewBox: "0 0 320 420",
    nodes: [
      { x: 40, y: 20, w: 240, h: 90, label: "大企業（顧客）", sub: "ペイン・課題", highlight: false },
      { x: 40, y: 165, w: 240, h: 90, label: "BOAR Partners", sub: "戦略設計・実行伴走", highlight: true },
      { x: 40, y: 310, w: 240, h: 90, label: "アライアンスパートナー群", sub: "ディープテック・研究機関", highlight: false },
    ],
    arrows: [
      { x1: 160, y1: 110, x2: 160, y2: 165 },
      { x1: 160, y1: 255, x2: 160, y2: 310 },
    ],
  };

  const eco = isMobile ? ecosystemMobile : ecosystemDesktop;

  return (
    <section style={{ background: "linear-gradient(180deg,#0d1a14 0%,#152f26 100%)", padding: "100px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
            color: COLORS.darkBody, lineHeight: 2.0, maxWidth: 600, marginBottom: 56,
          }}>
            Forward R&Dは3つのフェーズで構成される。<br />
            課題を「定義」し、研究開発を「駆動」し、価値を「届ける」。
          </p>
        </FadeIn>

        {/* フェーズカード */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr auto 1fr",
          gap: 0, alignItems: "stretch",
          marginBottom: 64,
        }}>
          {phases.map((p, i) => (
            <>
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: isMobile ? "32px 28px" : "40px 36px",
                  borderTop: `3px solid ${p.color}`,
                  background: "rgba(255,255,255,0.025)",
                  borderRight: !isMobile && i < phases.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                {/* アイコン + ドット */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0,
                  }} />
                  {p.icon}
                </div>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.22em", color: p.color, marginBottom: 6,
                }}>{p.num}</div>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: "clamp(24px,3vw,36px)",
                  color: COLORS.N500, fontWeight: 900, lineHeight: 1, marginBottom: 10,
                }}>{p.name}</div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 13, color: p.color,
                  marginBottom: 20, letterSpacing: "0.04em",
                }}>{p.ja}</div>
                <p style={{
                  fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody, lineHeight: 1.9, margin: 0,
                }}>{p.desc}</p>
              </motion.div>

              {/* 矢印（カード間） */}
              {i < phases.length - 1 && (
                isMobile ? (
                  <div key={`arrow-${i}`} style={{
                    display: "flex", justifyContent: "center", padding: "12px 0",
                    color: COLORS.G300,
                  }}>
                    <ArrowDown size={20} />
                  </div>
                ) : (
                  <div key={`arrow-${i}`} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 8px", color: COLORS.G300,
                  }}>
                    <ArrowRight size={20} />
                  </div>
                )
              )}
            </>
          ))}
        </div>

        {/* エコシステム SVG 図 */}
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 8 }}>
            <div style={{
              fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)", marginBottom: 20,
            }}>
              Ecosystem
            </div>
            <svg
              viewBox={eco.viewBox}
              style={{ width: "100%", overflow: "visible" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 接続線（アニメーション） */}
              {eco.arrows.map((a, i) => (
                <motion.line
                  key={i}
                  x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
                  stroke={COLORS.G300} strokeWidth="1.5" strokeDasharray="4 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.3, ease: "easeInOut" }}
                />
              ))}
              {/* ノード */}
              {eco.nodes.map((n, i) => (
                <g key={i}>
                  <rect
                    x={n.x} y={n.y} width={n.w} height={n.h} rx="4"
                    fill={n.highlight ? "rgba(106,170,136,0.12)" : "rgba(255,255,255,0.03)"}
                    stroke={n.highlight ? COLORS.G300 : "rgba(255,255,255,0.1)"}
                    strokeWidth={n.highlight ? "1.5" : "1"}
                  />
                  <text
                    x={n.x + n.w / 2} y={n.y + n.h / 2 - 10}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={n.highlight ? COLORS.G300 : "rgba(255,255,255,0.85)"}
                    fontSize="13" fontWeight="700"
                    fontFamily="'Big Shoulders Display', sans-serif"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x + n.w / 2} y={n.y + n.h / 2 + 14}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="11"
                    fontFamily="'Hiragino Sans W3', sans-serif"
                  >
                    {n.sub}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 3: 5 Core Functions ─────────────────────────
function CoreFunctions() {
  const isMobile = useIsMobile();

  const functions = [
    {
      name: "市場開発", phase: "Define", phaseColor: COLORS.PHASE_DEFINE,
      icon: <Search size={24} color={COLORS.PHASE_DEFINE} />,
      desc: "大企業のペインを構造化し、ディープテックで解決可能な「問い」に変換する。",
    },
    {
      name: "共同開発", phase: "Drive", phaseColor: COLORS.PHASE_DRIVE,
      icon: <Users size={24} color={COLORS.PHASE_DRIVE} />,
      desc: "技術パートナーと共同で解を設計・プロトタイプを推進する。",
    },
    {
      name: "事業化", phase: "Drive", phaseColor: COLORS.PHASE_DRIVE,
      icon: <Rocket size={24} color={COLORS.PHASE_DRIVE} />,
      desc: "PoC → 収益化ロードマップ設計・事業モデル構築。",
    },
    {
      name: "PMO", phase: "Deliver", phaseColor: COLORS.PHASE_DELIVER,
      icon: <Layers size={24} color={COLORS.PHASE_DELIVER} />,
      desc: "チームで顧客先に常駐し、事業開発をディレクションする。",
    },
    {
      name: "資本政策", phase: "Deliver", phaseColor: COLORS.PHASE_DELIVER,
      icon: <PieChart size={24} color={COLORS.PHASE_DELIVER} />,
      desc: "段階的グループイン・Exit設計・M&Aスキーム組成。",
    },
  ];

  return (
    <section style={{ background: "linear-gradient(180deg,#152f26 0%,#1e3d2e 100%)", padding: "100px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>Forward R&D</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 56,
          }}>
            5 Core Functions
          </h2>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
          gap: 2,
        }}>
          {functions.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "28px 24px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.2s",
                cursor: "default",
                // 5枚目はモバイルで全幅、デスクトップで中央寄せ
                ...(i === 4 ? {
                  gridColumn: isMobile ? "1 / -1" : "2 / 3",
                } : {}),
              }}
              whileHover={{ y: -2 }}
            >
              {/* ドット + アイコン */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.phaseColor, flexShrink: 0 }} />
                {f.icon}
              </div>
              {/* 機能名 */}
              <div style={{
                fontFamily: FONTS.accent, fontSize: 18, fontWeight: 700,
                color: COLORS.N500, marginBottom: 6,
              }}>{f.name}</div>
              {/* フェーズラベル */}
              <div style={{
                fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: f.phaseColor, marginBottom: 12, opacity: 0.8,
              }}>{f.phase}</div>
              {/* 説明 */}
              <p style={{
                fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody,
                lineHeight: 1.85, margin: 0,
              }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Forward Buyout ────────────────────────────
function ForwardBuyout() {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const comparison = [
    { axis: "起点",      fa: "売り手・買い手からの受託",  fb: "共創の過程で自然に生まれる" },
    { axis: "技術理解",  fa: "外部DD（限定的）",          fb: "共同開発を通じた深い理解" },
    { axis: "PMI設計",   fa: "ディール後に着手",           fb: "ディール前から実質的に始まっている" },
    { axis: "バリュエーション", fa: "財務指標ベース",    fb: "技術の社会実装ポテンシャルを織り込む" },
  ];

  const rdSteps = ["課題定義", "技術選定", "PoC推進"];
  const buyoutSteps = ["バリュエーション", "ストラクチャー設計", "PMI実行", "マネタイズ"];

  return (
    <section style={{ background: "linear-gradient(180deg,#152f26 0%,#0d1a14 100%)", padding: "100px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>Forward Buyout</SectionLabel>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <TrendingUp size={28} color={COLORS.PHASE_DELIVER} />
            <h2 style={{
              fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
              color: COLORS.N500, fontWeight: 900, lineHeight: 1.1,
            }}>
              価値の統合
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.accent, fontSize: "clamp(14px,1.5vw,18px)",
            color: COLORS.PHASE_DELIVER, marginBottom: 32, fontWeight: 700,
          }}>
            共創の延長線上にあるM&A
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)",
            color: COLORS.darkBody, lineHeight: 2.0, maxWidth: 640, marginBottom: 64,
          }}>
            社会実装の過程で成熟したアライアンスパートナーの段階的グループインを設計・実行する。<br />
            共創の延長線上にあるM&Aだからこそ、技術の本質的な価値に基づくストラクチャーを組める。
          </p>
        </FadeIn>

        {/* R&D → Buyout 接続フロー */}
        <FadeIn delay={0.2} style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: 24,
          }}>
            Forward R&D との接続
          </div>
          <div ref={containerRef}>
            {isMobile ? (
              /* モバイル: 縦タイムライン */
              <div style={{ position: "relative", paddingLeft: 24 }}>
                {/* 縦プログレスライン */}
                <div style={{
                  position: "absolute", left: 7, top: 0, bottom: 0,
                  width: 1, background: "rgba(255,255,255,0.1)",
                }}>
                  <motion.div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    background: COLORS.G300, height: progressWidth,
                  }} />
                </div>
                {/* R&D steps */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                    color: COLORS.PHASE_DRIVE, letterSpacing: "0.15em", marginBottom: 12,
                  }}>
                    <FlaskConical size={14} style={{ display: "inline", marginRight: 6 }} />
                    FORWARD R&D
                  </div>
                  {rdSteps.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.G300, flexShrink: 0 }} />
                      <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody }}>{s}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16, paddingLeft: 2 }}>
                  <ArrowDown size={18} color={COLORS.G300} />
                </div>
                {/* Buyout steps */}
                <div>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                    color: COLORS.PHASE_DELIVER, letterSpacing: "0.15em", marginBottom: 12,
                  }}>
                    <TrendingUp size={14} style={{ display: "inline", marginRight: 6 }} />
                    FORWARD BUYOUT
                  </div>
                  {buyoutSteps.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.PHASE_DELIVER, flexShrink: 0 }} />
                      <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.darkBody }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* デスクトップ: 水平プログレスライン */
              <div>
                {/* ステップ群 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 12 }}>
                  {/* R&D グループ */}
                  <div style={{ flex: "0 0 auto" }}>
                    <div style={{
                      fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                      color: COLORS.PHASE_DRIVE, letterSpacing: "0.15em", marginBottom: 8,
                    }}>
                      <FlaskConical size={12} style={{ display: "inline", marginRight: 4 }} />
                      FORWARD R&D
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {rdSteps.map((s, i) => (
                        <div key={i} style={{
                          padding: "12px 16px", background: "rgba(139,92,246,0.1)",
                          border: "1px solid rgba(139,92,246,0.3)",
                          fontFamily: FONTS.body, fontSize: 13, color: COLORS.darkBody,
                        }}>{s}</div>
                      ))}
                    </div>
                  </div>
                  {/* 矢印 */}
                  <div style={{
                    display: "flex", alignItems: "center", padding: "0 16px",
                    color: COLORS.G300, alignSelf: "flex-end", paddingBottom: 10,
                  }}>
                    <ArrowRight size={20} />
                  </div>
                  {/* Buyout グループ */}
                  <div style={{ flex: "0 0 auto" }}>
                    <div style={{
                      fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                      color: COLORS.PHASE_DELIVER, letterSpacing: "0.15em", marginBottom: 8,
                    }}>
                      <TrendingUp size={12} style={{ display: "inline", marginRight: 4 }} />
                      FORWARD BUYOUT
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {buyoutSteps.map((s, i) => (
                        <div key={i} style={{
                          padding: "12px 16px", background: "rgba(16,185,129,0.1)",
                          border: "1px solid rgba(16,185,129,0.3)",
                          fontFamily: FONTS.body, fontSize: 13, color: COLORS.darkBody,
                        }}>{s}</div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* プログレスライン */}
                <div style={{ position: "relative", height: 2, background: "rgba(255,255,255,0.1)", marginTop: 4 }}>
                  <motion.div style={{
                    position: "absolute", top: 0, left: 0, height: "100%",
                    background: COLORS.G300, width: progressWidth,
                  }} />
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* FA 比較表 */}
        <FadeIn delay={0.25}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: 20,
          }}>
            vs. 一般的な M&A FA
          </div>

          {isMobile ? (
            /* モバイル: カード形式 */
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {comparison.map((row, i) => (
                <div key={i} style={{
                  padding: "20px 24px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)", marginBottom: 12,
                  }}>{row.axis}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: FONTS.accent, marginBottom: 4 }}>一般的なFA</div>
                      <div style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{row.fa}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: COLORS.PHASE_DELIVER, fontFamily: FONTS.accent, marginBottom: 4 }}>Forward Buyout</div>
                      <div style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.PHASE_DELIVER, lineHeight: 1.7, fontWeight: 700 }}>{row.fb}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* デスクトップ: テーブル */
            <div>
              {/* ヘッダー行 */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 2fr 2fr",
                background: "rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.09)",
              }}>
                {["", "一般的なM&A FA", "Forward Buyout"].map((h, i) => (
                  <div key={i} style={{
                    padding: "14px 20px",
                    fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: i === 2 ? COLORS.PHASE_DELIVER : "rgba(255,255,255,0.3)",
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.09)" : "none",
                    background: i === 2 ? `rgba(16,185,129,0.08)` : "transparent",
                  }}>
                    {i === 2 && <CheckCircle size={12} style={{ display: "inline", marginRight: 6 }} />}
                    {h}
                  </div>
                ))}
              </div>
              {/* データ行 */}
              {comparison.map((row, ri) => (
                <div key={ri} style={{
                  display: "grid", gridTemplateColumns: "1fr 2fr 2fr",
                  borderBottom: ri < comparison.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                }}>
                  <div style={{
                    padding: "16px 20px",
                    fontFamily: FONTS.body, fontSize: 13, fontWeight: 700,
                    color: "rgba(255,255,255,0.55)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                  }}>{row.axis}</div>
                  <div style={{
                    padding: "16px 20px",
                    fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.8, opacity: 0.8,
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                  }}>{row.fa}</div>
                  <div style={{
                    padding: "16px 20px",
                    fontFamily: FONTS.body, fontSize: 14, color: COLORS.PHASE_DELIVER,
                    lineHeight: 1.8, fontWeight: 700,
                    background: "rgba(16,185,129,0.05)",
                  }}>{row.fb}</div>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 5: Alliance Partner ─────────────────────────
function AlliancePartner() {
  return (
    <section style={{
      background: "linear-gradient(180deg,#0d1a14 0%,#152f26 100%)",
      padding: "100px 8vw",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel>Alliance Partner</SectionLabel>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,4vw,52px)",
            color: COLORS.N500, fontWeight: 900, lineHeight: 1.1, marginBottom: 40,
          }}>
            1st Alliance Partner
          </h2>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderTop: `2px solid ${COLORS.G300}`,
            padding: "48px 56px",
            maxWidth: 680,
          }}
        >
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginBottom: 12,
          }}>
            触覚AI / Physical AI
          </div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,44px)",
            color: COLORS.G300, fontWeight: 900, lineHeight: 1.0, marginBottom: 24,
          }}>
            commissure
          </div>
          <p style={{
            fontFamily: FONTS.body, fontSize: 15, color: COLORS.darkBody,
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

// ─── Contact CTA ─────────────────────────────────────────
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
export default function ServicesDetail() {
  return (
    <div style={{ overflowX: "clip" }}>
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
        <ValueForward />
        <ForwardRD />
        <CoreFunctions />
        <ForwardBuyout />
        <AlliancePartner />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
