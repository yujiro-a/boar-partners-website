/**
 * WhatWeDoColorCompare.jsx
 * WhatWeDo 3カラム「発色を抑えてシックに見せる」10パターン比較
 * - E04確定 (EXECUTE) / B07確定 (BRIDGE) / A15確定 (ACCELERATE)
 * - H02グリーンカーテン ホバーモーション 全パターン共通
 * - 各パターンに imgFilter + overlay + vignette を組み合わせて発色調整
 */

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Google Fonts ─────────────────────────────────────────────
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Noto+Serif+JP:wght@700&display=swap');
`;

const FONTS = {
  accent:  "'Big Shoulders Display', sans-serif",
  display: "'Noto Serif JP', serif",
  body:    "system-ui, -apple-system, sans-serif",
};

// ─── 画像URL ─────────────────────────────────────────────────
// E04確定: プレゼンに集中する深夜チーム
const E04_URL = "https://www.shutterstock.com/image-photo/team-business-people-working-together-late-600nw-2610291923.jpg";
const B07_URL = "https://www.shutterstock.com/image-photo/microscope-laboratory-glassware-on-wooden-table-600nw-2636305761.jpg";
// A15確定: 白いサイボーグ指×人間の指×接触（暗い背景）
const A15_URL = "https://www.shutterstock.com/image-photo/white-cyborg-finger-about-touch-human-600nw-2288727541.jpg";

// ─── PILLARS ──────────────────────────────────────────────────
const PILLARS = [
  { num: "01", en: "EXECUTE",    title: "事業開発のプロ集団",    one: "戦略だけ、渡さない。" },
  { num: "02", en: "BRIDGE",     title: "アカデミアとの深い連携", one: "研究室の言語で、話せる。" },
  { num: "03", en: "ACCELERATE", title: "AIが一員として動く",     one: "AIが本当に、働く。" },
];

const PILLAR_IMGS = [E04_URL, B07_URL, A15_URL];

// ─── 10パターン定義（発色を抑えてシックに） ──────────────────
// imgFilter: CSS filter on background image（grayscale/saturate/brightness で発色制御）
// vignette : overlay の上に重ねる「周辺減光」レイヤー（四隅を暗くする）
const COLOR_PATTERNS = [
  {
    id: "S01", name: "グレースケール100% + グリーン線",
    imgFilter: "grayscale(100%) brightness(0.85)",
    overlay:  "linear-gradient(to top, rgba(9,12,14,0.93) 0%, rgba(9,12,14,0.55) 60%, rgba(9,12,14,0.15) 100%)",
    vignette: null,
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.20) 0%, rgba(109,184,139,0.06) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "#6db88b",
    note:     "完全モノクロ。グリーンアクセントが際立つ",
  },
  {
    id: "S02", name: "グレースケール70% + やや暗め",
    imgFilter: "grayscale(70%) brightness(0.80) saturate(0.5)",
    overlay:  "linear-gradient(to top, rgba(9,12,14,0.94) 0%, rgba(9,12,14,0.58) 60%, rgba(9,12,14,0.18) 100%)",
    vignette: null,
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.18) 0%, rgba(109,184,139,0.05) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "#6db88b",
    note:     "色残しながら落ち着かせる。最もバランス型",
  },
  {
    id: "S03", name: "グレースケール50% + ビネット",
    imgFilter: "grayscale(50%) brightness(0.78) saturate(0.6)",
    overlay:  "linear-gradient(to top, rgba(9,12,14,0.90) 0%, rgba(9,12,14,0.48) 60%, rgba(9,12,14,0.12) 100%)",
    vignette: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.18) 0%, rgba(109,184,139,0.05) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "#6db88b",
    note:     "周辺減光で中央を引き立てる。映画的な質感",
  },
  {
    id: "S04", name: "グレースケール100% + 強ビネット",
    imgFilter: "grayscale(100%) brightness(0.80) contrast(1.15)",
    overlay:  "linear-gradient(to top, rgba(9,12,14,0.92) 0%, rgba(9,12,14,0.52) 60%, rgba(9,12,14,0.15) 100%)",
    vignette: "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.75) 100%)",
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.22) 0%, rgba(109,184,139,0.06) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "#6db88b",
    note:     "モノクロ×強ビネット。緊張感のある高級感",
  },
  {
    id: "S05", name: "シネマティック（テール）",
    imgFilter: "grayscale(40%) saturate(0.5) brightness(0.72) hue-rotate(185deg)",
    overlay:  "linear-gradient(to top, rgba(4,10,16,0.94) 0%, rgba(4,10,16,0.56) 60%, rgba(4,10,16,0.16) 100%)",
    vignette: "radial-gradient(ellipse at center, transparent 30%, rgba(0,5,10,0.6) 100%)",
    curtain:  "linear-gradient(to top, rgba(40,130,160,0.22) 0%, rgba(40,130,160,0.06) 70%, transparent 100%)",
    line:     "#3a92a8",
    accent:   "#3a92a8",
    note:     "色相をブルーシフト。シネマ色調補正風",
  },
  {
    id: "S06", name: "フィルムノワール（セピア）",
    imgFilter: "grayscale(80%) sepia(35%) brightness(0.75) contrast(1.1)",
    overlay:  "linear-gradient(to top, rgba(12,8,4,0.94) 0%, rgba(12,8,4,0.56) 60%, rgba(12,8,4,0.16) 100%)",
    vignette: "radial-gradient(ellipse at center, transparent 28%, rgba(10,5,0,0.70) 100%)",
    curtain:  "linear-gradient(to top, rgba(180,130,70,0.18) 0%, rgba(180,130,70,0.05) 70%, transparent 100%)",
    line:     "#b08040",
    accent:   "#b08040",
    note:     "セピア+ノワール。アンバーアクセントでヴィンテージ感",
  },
  {
    id: "S07", name: "フロスト（青みがかった霧）",
    imgFilter: "grayscale(55%) brightness(0.75) saturate(0.45) hue-rotate(200deg)",
    overlay:  "linear-gradient(to top, rgba(6,10,16,0.94) 0%, rgba(6,10,16,0.58) 60%, rgba(6,10,16,0.22) 100%)",
    vignette: "radial-gradient(ellipse at center, rgba(20,40,60,0.15) 0%, rgba(5,10,20,0.65) 100%)",
    curtain:  "linear-gradient(to top, rgba(70,110,160,0.20) 0%, rgba(70,110,160,0.05) 70%, transparent 100%)",
    line:     "#6090c8",
    accent:   "#6090c8",
    note:     "冷調の霞感。清潔×知性的な印象",
  },
  {
    id: "S08", name: "上下グラデ圧縮（四方が暗い）",
    imgFilter: "grayscale(30%) brightness(0.80) saturate(0.6)",
    overlay:  "linear-gradient(to top, rgba(9,12,14,0.95) 0%, rgba(9,12,14,0.35) 50%, rgba(9,12,14,0.95) 100%)",
    vignette: null,
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.16) 0%, rgba(109,184,139,0.04) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "#6db88b",
    note:     "上下両方から暗くする。写真が額縁内に収まる感",
  },
  {
    id: "S09", name: "デュオトーン（モノ + グリーンシャドウ）",
    imgFilter: "grayscale(100%) brightness(0.75) contrast(1.20)",
    overlay:  "linear-gradient(to top, rgba(5,20,12,0.92) 0%, rgba(9,12,14,0.50) 60%, rgba(9,12,14,0.12) 100%)",
    vignette: "radial-gradient(ellipse at center, transparent 30%, rgba(3,12,7,0.60) 100%)",
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.28) 0%, rgba(109,184,139,0.08) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "#6db88b",
    note:     "モノクロ画像+グリーン影。デュオトーン的",
  },
  {
    id: "S10", name: "ミニマル（薄暗い自然体）",
    imgFilter: "grayscale(25%) brightness(0.70) saturate(0.55)",
    overlay:  "linear-gradient(to top, rgba(9,12,14,0.88) 0%, rgba(9,12,14,0.42) 65%, rgba(9,12,14,0.08) 100%)",
    vignette: "radial-gradient(ellipse 110% 90% at center, transparent 40%, rgba(0,0,0,0.50) 100%)",
    curtain:  "linear-gradient(to top, rgba(109,184,139,0.14) 0%, rgba(109,184,139,0.03) 70%, transparent 100%)",
    line:     "#6db88b",
    accent:   "rgba(109,184,139,0.75)",
    note:     "最小限の介入。自然な暗さ+ビネットのみ",
  },
];

// ─── ColCard ──────────────────────────────────────────────────
function ColCard({ imgUrl, pillar, hovered, pattern }) {
  return (
    <>
      {/* 背景画像 */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: imgUrl
            ? `url(${imgUrl})`
            : "linear-gradient(160deg, #152f26, #0d1a14)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: pattern.imgFilter || "none",
        }}
      />

      {/* ベースオーバーレイ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: pattern.overlay,
        }}
      />

      {/* ビネット（周辺減光）— パターンによってはnull */}
      {pattern.vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: pattern.vignette,
            pointerEvents: "none",
          }}
        />
      )}

      {/* カラーカーテン（H02グリーンカーテン — パターンごとに色が変わる） */}
      <motion.div
        animate={{ height: hovered ? "55%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: pattern.curtain,
          pointerEvents: "none",
        }}
      />

      {/* 下ライン */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: pattern.line,
          transformOrigin: "left",
        }}
      />

      {/* テキストコンテンツ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px 18px",
        }}
      >
        {/* ピラー番号 */}
        <div
          style={{
            fontFamily: FONTS.accent,
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 8,
          }}
        >
          {pillar.num}
        </div>

        {/* 英語タイトル（大きく薄く） */}
        <div
          style={{
            fontFamily: FONTS.accent,
            fontSize: "clamp(18px, 2.5vw, 30px)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.08)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginBottom: 10,
          }}
        >
          {pillar.en}
        </div>

        {/* 日本語タイトル */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(11px, 1.1vw, 15px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 6,
            lineHeight: 1.4,
          }}
        >
          {pillar.title}
        </div>

        {/* キャッチコピー */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.35 }}
          style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(9px, 0.8vw, 11px)",
            color: pattern.accent,
            lineHeight: 1.7,
          }}
        >
          {pillar.one}
        </motion.div>
      </div>
    </>
  );
}

// ─── メインコンポーネント ─────────────────────────────────────
export default function WhatWeDoColorCompare() {
  // { "C01": 0 | 1 | 2 | null, ... }
  const [hoveredMap, setHoveredMap] = useState({});

  return (
    <>
      <style>{FONT_IMPORT}</style>

      <div
        style={{
          background: "#090c0e",
          minHeight: "100vh",
          padding: "48px 0 80px",
        }}
      >
        {/* ─── ヘッダー ─── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto 48px",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.accent,
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "0.05em",
              marginBottom: 10,
            }}
          >
            What We Do — Muted Tone Patterns
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
            }}
          >
            発色を抑えてシックにする 10パターン — grayscale / vignette / color-shift
            <br />
            画像フィルター × オーバーレイ × ビネット の組み合わせ / E04 × B07 × A15確定
          </div>

          {/* 凡例 */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 16,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.08)",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "col 0", tag: "E04 確定", color: "#6db88b" },
              { label: "col 1", tag: "B07 確定", color: "#6db88b" },
              { label: "col 2", tag: "A15 確定: 白いサイボーグ指×接触", color: "rgba(255,255,255,0.3)" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    fontFamily: FONTS.accent,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 12,
                    color: item.color,
                    fontWeight: 600,
                  }}
                >
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 10パターン ─── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          {COLOR_PATTERNS.map((p) => (
            <div
              key={p.id}
              style={{
                marginBottom: 32,
                paddingBottom: 28,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* ラベル行 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.accent,
                    fontSize: 11,
                    fontWeight: 700,
                    color: p.line,
                    letterSpacing: "0.2em",
                  }}
                >
                  {p.id}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {p.note}
                </span>
              </div>

              {/* 3カラムプレビュー */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  height: 280,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {PILLARS.map((pillar, i) => (
                  <div
                    key={pillar.en}
                    onMouseEnter={() =>
                      setHoveredMap((prev) => ({ ...prev, [p.id]: i }))
                    }
                    onMouseLeave={() =>
                      setHoveredMap((prev) => ({ ...prev, [p.id]: null }))
                    }
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      borderLeft:
                        i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <ColCard
                      imgUrl={PILLAR_IMGS[i]}
                      pillar={pillar}
                      hovered={hoveredMap[p.id] === i}
                      pattern={p}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── フッター ─── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "32px auto 0",
            padding: "0 24px",
            fontFamily: FONTS.body,
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            textAlign: "right",
          }}
        >
          BOAR Partners — WhatWeDo Color Pattern Lab
        </div>
      </div>
    </>
  );
}
