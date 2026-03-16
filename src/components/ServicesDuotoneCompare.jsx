// ServicesDuotoneCompare.jsx
// P03デュオトーン × R&D vs Buyout 差別化 10パターン

import { useState } from "react";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};
const G    = "#6aaa88";
const GBRIGHT = "#86efac"; // R&D アクセント（明るいグリーン）
const WHITE   = "rgba(255,255,255,0.75)"; // Buyout アクセント（白系）

const SERVICES = [
  {
    key: "rd",
    label: "Forward R&D",
    sub: "価値の発見・証明",
    framework: "Define → Drive → Deliver",
    desc: "課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。",
  },
  {
    key: "buyout",
    label: "Forward Buyout",
    sub: "価値の統合",
    framework: "Valuation → Structure → PMI",
    desc: "M&AやExitを設計・実行します。技術を深く理解しているからこそ正しく評価できます。",
  },
];

// ── 10パターン定義（各パターンにR&D用とBuyout用の背景を持たせる）──
const PATTERNS = [
  {
    id: "D01",
    label: "数字（01 / 02）",
    note: "背景に大きな番号。シンプル・コンサル定番。McKinsey/BCGで多用",
    stars: "★★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1a14 0%, #1a3825 100%)" }}>
            <div style={{
              position: "absolute", right: "-5%", bottom: "-10%",
              fontFamily: FONTS.accent, fontWeight: 900,
              fontSize: "clamp(120px,18vw,200px)",
              color: "rgba(106,170,136,0.07)",
              lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none",
            }}>01</div>
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #090c0e 0%, #0d1a14 100%)" }}>
            <div style={{
              position: "absolute", right: "-5%", bottom: "-10%",
              fontFamily: FONTS.accent, fontWeight: 900,
              fontSize: "clamp(120px,18vw,200px)",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none",
            }}>02</div>
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D02",
    label: "色温度（グリーン系 vs ニュートラル）",
    note: "R&D=明るいグリーン、Buyout=深い黒寄り。同じデュオトーンで温度差をつける",
    stars: "★★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, #0d2218 0%, #1a4030 40%, #0d1a14 100%)" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${20 + i * 25}%`, top: `${15 + i * 20}%`,
                width: `${60 - i * 15}%`, height: `${50 - i * 10}%`,
                background: `radial-gradient(ellipse, rgba(106,170,136,${0.08 - i * 0.02}) 0%, transparent 60%)`,
                borderRadius: "50%",
              }} />
            ))}
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, #06080a 0%, #0d1a14 50%, #090c0e 100%)" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${20 + i * 25}%`, top: `${15 + i * 20}%`,
                width: `${60 - i * 15}%`, height: `${50 - i * 10}%`,
                background: `radial-gradient(ellipse, rgba(255,255,255,${0.04 - i * 0.01}) 0%, transparent 60%)`,
                borderRadius: "50%",
              }} />
            ))}
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D03",
    label: "有機 vs 幾何（シェイプ）",
    note: "R&D=有機的な円・放射状。Buyout=硬質な格子・直線。形状で性格を表現",
    stars: "★★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0a1a10 0%, #152f26 100%)" }}>
            {/* 有機的な円 */}
            {[80, 55, 35, 20].map((size, i) => (
              <div key={i} style={{
                position: "absolute",
                left: "50%", top: "45%",
                width: `${size}%`, height: `${size * 0.7}%`,
                transform: "translate(-50%, -50%)",
                border: `1px solid rgba(106,170,136,${0.12 - i * 0.025})`,
                borderRadius: "50%",
              }} />
            ))}
            <div style={{
              position: "absolute", left: "50%", top: "45%",
              width: 6, height: 6, borderRadius: "50%",
              background: G, opacity: 0.5,
              transform: "translate(-50%,-50%)",
            }} />
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #090c0e 0%, #0d1a14 100%)" }}>
            {/* 格子・直線 */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
              <defs>
                <pattern id="grid-d03" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6aaa88" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-d03)" />
            </svg>
            {/* 対角線アクセント */}
            <div style={{
              position: "absolute", left: 0, top: 0, right: 0, bottom: 0, overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", left: "30%", top: "-50%",
                width: 1, height: "200%",
                background: "rgba(106,170,136,0.1)",
                transform: "rotate(30deg)",
                transformOrigin: "top",
              }} />
            </div>
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D04",
    label: "方向性（放射 vs 収束）",
    note: "R&D=外に広がる放射。Buyout=中心に収束する矢印。動きの方向で意味を表す",
    stars: "★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "#0a1510", overflow: "hidden" }}>
            {/* 放射線 */}
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: "20%", top: "50%",
                width: "120%", height: 1,
                background: `linear-gradient(90deg, rgba(106,170,136,0.2) 0%, transparent 100%)`,
                transformOrigin: "0% 50%",
                transform: `rotate(${i * 22.5 - 90}deg)`,
                opacity: 0.5,
              }} />
            ))}
            <div style={{
              position: "absolute", left: "20%", top: "50%",
              width: 8, height: 8, borderRadius: "50%",
              background: G, opacity: 0.4,
              transform: "translate(-50%,-50%)",
            }} />
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "#090c0e", overflow: "hidden" }}>
            {/* 収束する矢印風ライン */}
            {[-3, -1.5, 0, 1.5, 3].map((offset, i) => (
              <div key={i} style={{
                position: "absolute",
                left: "-10%", right: "-10%",
                top: `calc(50% + ${offset * 12}px)`,
                height: 1,
                background: `linear-gradient(90deg, transparent 0%, rgba(106,170,136,${0.06 + i * 0.02}) 30%, rgba(106,170,136,0.2) 70%, transparent 100%)`,
              }} />
            ))}
            {/* 収束点 */}
            <div style={{
              position: "absolute", right: "20%", top: "50%",
              width: 8, height: 8, borderRadius: "50%",
              background: G, opacity: 0.4,
              transform: "translate(50%,-50%)",
            }} />
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D05",
    label: "イニシャル文字（R / B）",
    note: "背景に大きな頭文字。「R」=R&D、「B」=Buyout。シンプルで記憶に残る",
    stars: "★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1a14 0%, #1a3825 100%)" }}>
            <div style={{
              position: "absolute", right: "5%", top: "-5%",
              fontFamily: FONTS.accent, fontWeight: 900,
              fontSize: "clamp(160px,24vw,260px)",
              color: "rgba(106,170,136,0.06)",
              lineHeight: 1, userSelect: "none",
              fontStyle: "italic",
            }}>R</div>
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #090c0e 0%, #0d1a14 100%)" }}>
            <div style={{
              position: "absolute", right: "5%", top: "-5%",
              fontFamily: FONTS.accent, fontWeight: 900,
              fontSize: "clamp(160px,24vw,260px)",
              color: "rgba(255,255,255,0.035)",
              lineHeight: 1, userSelect: "none",
              fontStyle: "italic",
            }}>B</div>
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D06",
    label: "ミクロ vs マクロ（スケール）",
    note: "R&D=分子・細胞スケールのドット。Buyout=都市・俯瞰スケールのグリッド。視点の高さで差別化",
    stars: "★★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "#080f0b", overflow: "hidden" }}>
            {/* 分子ネットワーク */}
            {[
              [20,30], [45,20], [65,40], [35,60], [55,65], [75,25], [15,65], [80,55],
            ].map(([x, y], i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${x}%`, top: `${y}%`,
                width: 5 + (i % 3) * 2, height: 5 + (i % 3) * 2,
                borderRadius: "50%",
                background: G,
                opacity: 0.2 + (i % 4) * 0.08,
                transform: "translate(-50%,-50%)",
              }} />
            ))}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}>
              <line x1="20%" y1="30%" x2="45%" y2="20%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="45%" y1="20%" x2="65%" y2="40%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="35%" y1="60%" x2="55%" y2="65%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="45%" y1="20%" x2="35%" y2="60%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="65%" y1="40%" x2="75%" y2="25%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="15%" y1="65%" x2="35%" y2="60%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="65%" y1="40%" x2="80%" y2="55%" stroke="#6aaa88" strokeWidth="0.8" />
            </svg>
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "#06090a", overflow: "hidden" }}>
            {/* 都市グリッド（俯瞰） */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.13 }}>
              <defs>
                <pattern id="city-d06" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                  <rect x="2" y="2" width="10" height="10" fill="rgba(106,170,136,0.4)" />
                  <rect x="14" y="2" width="7" height="7" fill="rgba(106,170,136,0.25)" />
                  <rect x="2" y="14" width="6" height="8" fill="rgba(106,170,136,0.2)" />
                  <rect x="14" y="12" width="8" height="10" fill="rgba(106,170,136,0.35)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#city-d06)" />
            </svg>
            <div style={{ position: "absolute", inset: 0, background: "rgba(6,9,10,0.65)" }} />
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D07",
    label: "テクスチャ対比（有機 vs 工業）",
    note: "R&D=木目・有機テクスチャ。Buyout=鉄骨・ブリッジ構造。素材感で直感的に差別化",
    stars: "★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "#08100a", overflow: "hidden" }}>
            {/* 木目・有機曲線 */}
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: "-10%", right: "-10%",
                top: `${10 + i * 11}%`,
                height: `${8 + i * 2}%`,
                borderTop: `1px solid rgba(106,170,136,${0.04 + (i % 3) * 0.02})`,
                borderRadius: `${50 + i * 10}%`,
                transform: `translateY(${Math.sin(i) * 15}px)`,
              }} />
            ))}
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "#07090c", overflow: "hidden" }}>
            {/* トラス構造 */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
              {[...Array(5)].map((_, i) => (
                <g key={i}>
                  <line x1={`${i * 25}%`} y1="20%" x2={`${i * 25 + 12.5}%`} y2="75%" stroke="#6aaa88" strokeWidth="0.8" />
                  <line x1={`${i * 25 + 12.5}%`} y1="75%" x2={`${i * 25 + 25}%`} y2="20%" stroke="#6aaa88" strokeWidth="0.8" />
                </g>
              ))}
              <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#6aaa88" strokeWidth="0.8" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#6aaa88" strokeWidth="0.8" />
            </svg>
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D08",
    label: "グラデ方向（上昇 vs 対角）",
    note: "R&D=下から上へ（萌芽・成長）。Buyout=対角（スケール・ダイナミズム）。色は同じ、方向だけ変える",
    stars: "★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0 }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(0deg, #1a4030 0%, #0d1a14 40%, #090c0e 100%)",
            }} />
            {/* 上昇する粒子 */}
            {[15, 30, 50, 68, 82].map((left, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${left}%`, bottom: `${i * 12}%`,
                width: 2, height: 2, borderRadius: "50%",
                background: G, opacity: 0.25 + i * 0.05,
              }} />
            ))}
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0 }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, #090c0e 0%, #1a3825 50%, #090c0e 100%)",
            }} />
            {/* 対角ライン */}
            {[-20, 0, 20, 40].map((offset, i) => (
              <div key={i} style={{
                position: "absolute",
                left: 0, right: 0,
                top: `${50 + offset}%`,
                height: 1,
                background: `rgba(106,170,136,${0.05 + i * 0.02})`,
                transform: "rotate(-30deg) scaleX(1.5)",
                transformOrigin: "center",
              }} />
            ))}
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D09",
    label: "タグライン視覚化（Define / Value）",
    note: "R&D=「Define」、Buyout=「Value」を薄くゴーストテキストで表示。サブコピーを装飾に転用",
    stars: "★★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1a14 0%, #1a3825 100%)" }}>
            <div style={{
              position: "absolute", left: "-2%", bottom: "-8%",
              fontFamily: FONTS.accent, fontWeight: 900,
              fontSize: "clamp(60px,10vw,100px)",
              color: "rgba(106,170,136,0.07)",
              lineHeight: 1, letterSpacing: "0.15em",
              textTransform: "uppercase", userSelect: "none",
              whiteSpace: "nowrap",
            }}>DEFINE</div>
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #090c0e 0%, #0d1a14 100%)" }}>
            <div style={{
              position: "absolute", left: "-2%", bottom: "-8%",
              fontFamily: FONTS.accent, fontWeight: 900,
              fontSize: "clamp(60px,10vw,100px)",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1, letterSpacing: "0.15em",
              textTransform: "uppercase", userSelect: "none",
              whiteSpace: "nowrap",
            }}>VALUE</div>
          </div>
        ),
        accent: WHITE,
      },
    },
  },
  {
    id: "D10",
    label: "左端カラーバー（アクセントライン）",
    note: "R&D=グリーンバー、Buyout=ホワイトバー。同じデュオトーン背景に1px〜4pxのカラーラインだけで差別化。ミニマル",
    stars: "★★★",
    cards: {
      rd: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1a14 0%, #1a3825 60%, #0d1a14 100%)" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${20 + i * 28}%`, top: `${15 + i * 20}%`,
                width: `${55 - i * 12}%`, height: `${45 - i * 8}%`,
                background: `radial-gradient(ellipse, rgba(106,170,136,${0.07 - i * 0.02}) 0%, transparent 65%)`,
                borderRadius: "50%",
              }} />
            ))}
            {/* 左端グリーンバー */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 3,
              background: `linear-gradient(180deg, transparent 0%, ${G} 30%, ${G} 70%, transparent 100%)`,
            }} />
          </div>
        ),
        accent: GBRIGHT,
      },
      buyout: {
        bg: () => (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #090c0e 0%, #0d1a14 60%, #090c0e 100%)" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${20 + i * 28}%`, top: `${15 + i * 20}%`,
                width: `${55 - i * 12}%`, height: `${45 - i * 8}%`,
                background: `radial-gradient(ellipse, rgba(255,255,255,${0.04 - i * 0.01}) 0%, transparent 65%)`,
                borderRadius: "50%",
              }} />
            ))}
            {/* 左端ホワイトバー */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 3,
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 100%)",
            }} />
          </div>
        ),
        accent: WHITE,
      },
    },
  },
];

// R&D ラベル（左上バッジ）
const LABEL_RD     = { bg: "rgba(106,170,136,0.18)", color: "#86efac", text: "R&D" };
const LABEL_BUYOUT = { bg: "rgba(255,255,255,0.1)",  color: "rgba(255,255,255,0.7)", text: "BUYOUT" };

function ServiceCard({ pattern, service }) {
  const [hovered, setHovered] = useState(false);
  const cardData = pattern.cards[service.key];
  const badge = service.key === "rd" ? LABEL_RD : LABEL_BUYOUT;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        border: `1px solid ${hovered ? cardData.accent : "rgba(255,255,255,0.09)"}`,
        transition: "border-color 0.3s",
        cursor: "pointer",
        minHeight: 260,
      }}
    >
      {cardData.bg()}
      {/* 共通オーバーレイ */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(9,12,14,0) 0%, rgba(9,12,14,0.4) 45%, rgba(9,12,14,0.92) 100%)",
      }} />
      {/* コンテンツ */}
      <div style={{ position: "relative", zIndex: 1, padding: "24px 26px 28px" }}>
        {/* バッジ */}
        <div style={{
          display: "inline-block", marginBottom: 20,
          padding: "3px 10px",
          background: badge.bg, color: badge.color,
          fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>{badge.text}</div>
        <div style={{
          fontFamily: FONTS.accent,
          fontSize: "clamp(20px,2.2vw,30px)",
          fontWeight: 900, color: "white",
          lineHeight: 1.05, marginBottom: 6,
        }}>
          {service.label}
        </div>
        <div style={{
          fontSize: 10, color: cardData.accent,
          letterSpacing: "0.1em", marginBottom: 14,
          fontFamily: FONTS.body,
        }}>
          {service.framework}
        </div>
        <p style={{
          fontSize: 12, color: "rgba(255,255,255,0.5)",
          lineHeight: 1.85, fontFamily: FONTS.body, margin: "0 0 14px",
        }}>
          {service.desc}
        </p>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: cardData.accent,
          opacity: hovered ? 1 : 0.55, transition: "opacity 0.3s",
        }}>
          詳しく見る →
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: hovered ? "100%" : "0%", height: 1,
        background: cardData.accent, transition: "width 0.4s ease",
      }} />
    </div>
  );
}

export default function ServicesDuotoneCompare() {
  return (
    <div style={{ fontFamily: FONTS.body, color: "white", padding: "60px 6vw", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 8, fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", color: G, textTransform: "uppercase" }}>
        P03 Duotone × R&D vs Buyout — 10 Patterns
      </div>
      <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 700, marginBottom: 8, lineHeight: 1.1 }}>
        差別化パターン比較
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 60 }}>
        全パターン P03デュオトーン（深緑×黒）ベース。左=Forward R&D、右=Forward Buyout。
      </p>

      {PATTERNS.map((p) => (
        <div key={p.id} style={{ marginBottom: 72 }}>
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24, marginBottom: 8,
            display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap",
          }}>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: 24, color: G, minWidth: 48 }}>{p.id}</span>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: 16, color: "white" }}>{p.label}</span>
            <span style={{ fontSize: 14, color: "#fbbf24" }}>{p.stars}</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>{p.note}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {SERVICES.map((s) => (
              <ServiceCard key={s.key} pattern={p} service={s} />
            ))}
          </div>
        </div>
      ))}

      {/* おすすめ */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 36, marginTop: 12 }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: G, marginBottom: 16, textTransform: "uppercase" }}>
          Top Picks
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 10 }}>
          {[
            { id: "D01", text: "数字。最もクリーン。コンサル定番" },
            { id: "D03", text: "有機vs幾何。形状で意味を語る" },
            { id: "D06", text: "ミクロvsマクロ。視点のスケール差" },
            { id: "D09", text: "ゴーストワード。コンテンツを装飾に転用" },
            { id: "D10", text: "カラーバー。最小限の差別化" },
          ].map((r) => (
            <div key={r.id} style={{
              padding: "14px 18px",
              border: "1px solid rgba(106,170,136,0.18)",
              background: "rgba(106,170,136,0.03)",
            }}>
              <div style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: 13, color: G, marginBottom: 5 }}>{r.id}</div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
