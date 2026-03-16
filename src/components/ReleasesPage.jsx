import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FONTS, COLORS, FadeIn, TextReveal, SectionLabel, Header, Footer } from "./shared.jsx";

// ─── データ ──────────────────────────────────────────────
const CATEGORIES = [
  { key: "all",    label: "すべて" },
  { key: "news",   label: "ニュース" },
  { key: "case",   label: "実績" },
  { key: "column", label: "コラム" },
];

const CATEGORY_STYLE = {
  news:   { bg: COLORS.G200,        color: COLORS.N500 },
  case:   { bg: COLORS.PHASE_DRIVE, color: COLORS.N500 },
  column: { bg: "rgba(9,12,14,0.12)", color: "rgba(9,12,14,0.65)" },
};

const RELEASES = [
  {
    id: 1,
    type: "news",
    date: "2026-03",
    title: "BOAR Partners、始動。",
    excerpt:
      "技術の価値を産業に届けきるために。M&A × 事業開発 × 資金調達を一気通貫で支援する BOAR Partners を立ち上げました。",
    link: null,
  },
  {
    id: 2,
    type: "case",
    date: "2026-03",
    title: "commissure × 製造業 — 事業開発・M&A支援",
    excerpt:
      "ディープテック領域への新規参入を検討する製造業クライアントへ、戦略立案から候補先探索・交渉支援までを伴走。",
    link: null,
  },
  {
    id: 3,
    type: "column",
    date: "2026-03",
    title: "なぜ、日本の技術は産業にならないのか",
    excerpt:
      "研究室と市場の間にあるキャズムを、構造的に分解する。資金調達・事業設計・M&A——3つの壁を越えるための視点。",
    link: null,
  },
];

// ─── 横リスト行（P04スタイル）────────────────────────────
function ReleaseRow({ item, index, isFirst }) {
  const cat = CATEGORY_STYLE[item.type] ?? CATEGORY_STYLE.column;
  const label = CATEGORIES.find((c) => c.key === item.type)?.label ?? item.type;

  const inner = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: "0 40px",
        alignItems: "start",
        padding: "32px 0",
        borderTop: isFirst ? "1px solid rgba(9,12,14,0.15)" : "none",
        borderBottom: "1px solid rgba(9,12,14,0.15)",
        cursor: item.link ? "pointer" : "default",
      }}
    >
      {/* 左: 日付 + バッジ */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 3 }}>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: 12,
          color: "rgba(9,12,14,0.38)",
          letterSpacing: "0.05em",
        }}>
          {item.date}
        </span>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: "3px 10px",
          borderRadius: 2,
          background: cat.bg,
          color: cat.color,
          display: "inline-block",
          width: "fit-content",
        }}>
          {label}
        </span>
      </div>

      {/* 右: タイトル + 概要 */}
      <div>
        <h3 style={{
          fontFamily: FONTS.display,
          fontSize: "clamp(16px,1.6vw,20px)",
          color: COLORS.N100,
          lineHeight: 1.4,
          fontWeight: 700,
          margin: "0 0 10px",
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: "clamp(13px,1.2vw,14px)",
          color: "rgba(9,12,14,0.55)",
          lineHeight: 1.85,
          margin: 0,
        }}>
          {item.excerpt}
        </p>
      </div>

      {/* 矢印 */}
      <span style={{
        fontFamily: FONTS.body,
        fontSize: 15,
        color: item.link ? COLORS.G200 : "rgba(9,12,14,0.2)",
        paddingTop: 3,
        flexShrink: 0,
      }}>
        →
      </span>
    </motion.div>
  );

  return item.link ? (
    <a href={item.link} style={{ textDecoration: "none", display: "block" }}>{inner}</a>
  ) : inner;
}

// ─── メインページ ─────────────────────────────────────────
export default function ReleasesPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? RELEASES : RELEASES.filter((r) => r.type === active);

  return (
    <div style={{ fontFamily: FONTS.body, background: COLORS.N100 }}>
      <Header />

      {/* ─── Hero ─── */}
      <section style={{
        padding: "140px 8vw 80px",
        background: "linear-gradient(180deg, #090c0e 0%, #0d1a14 100%)",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <TextReveal
            lines={["Releases."]}
            fontSize="clamp(48px,8vw,112px)"
            color={COLORS.N500}
            fontFamily={FONTS.accent}
            fontWeight={900}
            delay={0.05}
          />
        </div>
      </section>

      {/* ─── リスト ─── */}
      <section style={{
        padding: "80px 8vw 120px",
        background: "linear-gradient(180deg, #ede8df 0%, #e8e2d8 100%)",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* フィルター */}
          <FadeIn>
            <div style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 56,
            }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    fontWeight: active === cat.key ? 700 : 400,
                    letterSpacing: "0.06em",
                    padding: "8px 20px",
                    borderRadius: 2,
                    border: `1.5px solid ${active === cat.key ? COLORS.G200 : "rgba(9,12,14,0.2)"}`,
                    background: active === cat.key ? COLORS.G200 : "transparent",
                    color: active === cat.key ? COLORS.N500 : "rgba(9,12,14,0.55)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 横リスト */}
          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <ReleaseRow key={item.id} item={item} index={i} isFirst={i === 0} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 件数が少ない場合のメッセージ */}
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: FONTS.body,
                fontSize: 15,
                color: "rgba(9,12,14,0.38)",
                textAlign: "center",
                padding: "80px 0",
              }}
            >
              該当する記事はまだありません。
            </motion.p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
