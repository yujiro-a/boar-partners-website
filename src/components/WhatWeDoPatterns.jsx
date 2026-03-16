/**
 * WhatWeDoPatterns.jsx — WHAT WE DO セクション 10パターン比較
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FONTS, COLORS } from "./shared.jsx";

// ─── 共通データ ──────────────────────────────────────────
const FEATURES = [
  {
    num: "01",
    en: "EXECUTE",
    title: "事業開発のプロ集団",
    punch: "戦略だけ、渡さない。",
    problem: "「戦略は作ったが、誰も動かなかった」",
    solution: "戦略設計から実行まで、チームとして動きます。",
    desc: "事業開発のプロが戦略設計から実行まで一気通貫で動きます。紹介や橋渡しではなく、チームとして並走します。",
    manifesto: "我々は動く。",
    color: COLORS.G300,
    bg: COLORS.G200,
  },
  {
    num: "02",
    en: "BRIDGE",
    title: "アカデミアとの深い連携",
    punch: "研究室の言語で、話せる。",
    problem: "「技術の価値が、投資家にも事業者にも伝わらない」",
    solution: "東大ネットワークと技術目利きで、ラボと市場を繋ぎます。",
    desc: "東京大学をはじめとする研究室と連携し、技術の目利きから社会実装まで研究現場と並走します。",
    manifesto: "我々は繋ぐ。",
    color: COLORS.G400,
    bg: "#1e4a32",
  },
  {
    num: "03",
    en: "ACCELERATE",
    title: "AIが一員として動く",
    punch: "AIが本当に、働く。",
    problem: "「意思決定が遅くて、機会を逃し続けている」",
    solution: "AIエージェントがチームに組み込まれ、検証速度が桁違いになります。",
    desc: "AIエージェントがチームの一員として動くことで、仮説検証と意思決定のサイクルが格段に速くなります。",
    manifesto: "我々は速い。",
    color: COLORS.G500,
    bg: "#0a1a12",
  },
];

const DARK_BG = "linear-gradient(180deg,#0d1a14 0%,#152f26 100%)";
const STONE_BG = "linear-gradient(180deg,#ede8df 0%,#e8e2d8 100%)";

// ─── P1: Bold Statements（断言型）───────────────────────
function P1() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 48 }}>What We Do</p>
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.en}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "40px 0" }}
        >
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: COLORS.N500, marginBottom: 16, lineHeight: 1.2 }}>
            {f.punch}
          </div>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 580, margin: 0 }}>
            {f.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── P2: Number Accent（番号強調型）─────────────────────
function P2() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 64 }}>What We Do</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.en}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
          >
            <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(56px,7vw,96px)", fontWeight: 900, color: "rgba(255,255,255,0.08)", lineHeight: 1, marginBottom: 16 }}>
              {f.num}
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: COLORS.N500, marginBottom: 12 }}>
              {f.title}
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── P3: 3-Column Cards（カード型）──────────────────────
function P3() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 64 }}>What We Do</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.en}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            style={{
              background: f.bg,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              padding: "40px 32px",
            }}
          >
            <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: f.color, marginBottom: 24, textTransform: "uppercase" }}>{f.en}</div>
            <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: COLORS.N500, marginBottom: 16 }}>{f.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, margin: 0 }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── P4: Typography Pillars（タイポ型）──────────────────
function P4() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 80 }}>What We Do</p>
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.en}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "0 80px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "48px 0",
            alignItems: "center",
          }}
        >
          <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(48px,7vw,100px)", fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 0.9 }}>
            {f.en}
          </div>
          <div>
            <div style={{ fontFamily: FONTS.display, fontSize: "clamp(18px,2vw,24px)", fontWeight: 700, color: COLORS.N500, marginBottom: 12 }}>{f.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── P5: Vs Comparison（比較型）─────────────────────────
function P5() {
  const rows = [
    { label: "関わり方", before: "提言・紹介・橋渡し", after: "チームとして実行まで動く" },
    { label: "技術理解", before: "スライドレベルの理解", after: "研究室レベルの目利き" },
    { label: "AI活用", before: "ツールとして使う", after: "AIが一員として稼働" },
    { label: "スピード", before: "月単位のレポートサイクル", after: "週単位の仮説検証ループ" },
    { label: "出口戦略", before: "M&Aは別の専門家へ", after: "事業開発→M&A→PMIを一貫" },
  ];
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 48 }}>What We Do</p>
      <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: COLORS.N500, marginBottom: 48 }}>
        なぜ BOAR Partners なのか
      </div>
      <div style={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", background: "rgba(255,255,255,0.04)" }}>
          <div style={{ padding: "14px 24px", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>観点</div>
          <div style={{ padding: "14px 24px", borderLeft: "1px solid rgba(255,255,255,0.06)", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>従来のアドバイザー</div>
          <div style={{ padding: "14px 24px", borderLeft: "1px solid rgba(255,255,255,0.06)", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.15em", color: COLORS.G300, textTransform: "uppercase" }}>BOAR Partners</div>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ padding: "18px 24px", fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>{r.label}</div>
            <div style={{ padding: "18px 24px", borderLeft: "1px solid rgba(255,255,255,0.06)", fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>{r.before}</div>
            <div style={{ padding: "18px 24px", borderLeft: "1px solid rgba(255,255,255,0.06)", fontFamily: FONTS.body, fontSize: 14, color: COLORS.G300, lineHeight: 1.6, fontWeight: 700 }}>{r.after}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── P6: Manifesto（宣言型）─────────────────────────────
function P6() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 80 }}>What We Do</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.en}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: i * 0.15 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "0 64px",
              padding: "48px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: COLORS.N500, lineHeight: 1.2, marginBottom: 8 }}>
                {f.manifesto}
              </div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: f.color, textTransform: "uppercase" }}>{f.en}</div>
            </div>
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{f.title}</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: 0 }}>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── P7: Horizontal Strip（ストリップ型）────────────────
function P7() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 700, color: COLORS.N500 }}>
          三つの力で、<br />非連続な成長を。
        </div>
        <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textAlign: "right" }}>What We Do</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.en}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            style={{
              borderLeft: i === 0 ? "2px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.08)",
              padding: "0 36px 0 28px",
            }}
          >
            <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: f.color, textTransform: "uppercase", marginBottom: 20 }}>{f.en}</div>
            <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: COLORS.N500, marginBottom: 14 }}>{f.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: 0 }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── P8: Problem→Solution（課題対応型）──────────────────
function P8() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 64 }}>What We Do</p>
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.en}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 56px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "40px 0",
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 12 }}>課題</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              {f.problem}
            </p>
          </div>
          <div>
            <div style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.2em", color: f.color, textTransform: "uppercase", marginBottom: 12 }}>解</div>
            <div style={{ fontFamily: FONTS.display, fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 700, color: COLORS.N500, marginBottom: 10 }}>{f.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>{f.solution}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── P9: Interactive Accordion（アコーディオン型）────────
function P9() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 64 }}>What We Do</p>
      <div style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,3vw,40px)", fontWeight: 700, color: COLORS.N500, marginBottom: 48 }}>
        三つの力が、一体化して動く
      </div>
      {FEATURES.map((f, i) => (
        <div
          key={f.en}
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
          onClick={() => setOpen(open === i ? -1 : i)}
        >
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "24px 0",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{f.num}</span>
              <span style={{ fontFamily: FONTS.display, fontSize: "clamp(17px,2vw,22px)", fontWeight: 700, color: open === i ? COLORS.N500 : "rgba(255,255,255,0.7)" }}>
                {f.title}
              </span>
            </div>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: FONTS.body, fontSize: 20, color: open === i ? f.color : "rgba(255,255,255,0.3)" }}
            >
              +
            </motion.span>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ fontFamily: FONTS.body, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, margin: "0 0 32px 48px" }}>
                  {f.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
    </div>
  );
}

// ─── P10: Staggered Hero（スタッガード型）────────────────
function P10() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 80 }}>
        <div>
          <p style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>What We Do</p>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 700, color: COLORS.N500 }}>
            他社にない、<br />三つの優位性。
          </div>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 320, lineHeight: 1.8 }}>
          事業開発 × アカデミア × AI——<br />
          それぞれが独立した強みではなく、<br />
          一体化して機能するときに力を発揮します。
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.en}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: i * 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: "0 56px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 4,
              padding: "36px 48px",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(40px,5vw,72px)", fontWeight: 900, color: "rgba(255,255,255,0.05)", lineHeight: 1 }}>{f.num}</div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: f.color, textTransform: "uppercase", marginTop: -4 }}>{f.en}</div>
            </div>
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 700, color: COLORS.N500, marginBottom: 10 }}>{f.title}</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── メインページ ─────────────────────────────────────────
const PATTERNS = [
  { id: "P1", label: "断言型", desc: "1行パンチライン", component: P1, bg: DARK_BG },
  { id: "P2", label: "番号強調型", desc: "01/02/03 大番号", component: P2, bg: DARK_BG },
  { id: "P3", label: "カード型", desc: "3カラムカード", component: P3, bg: DARK_BG },
  { id: "P4", label: "タイポ型", desc: "英語大文字 + 説明", component: P4, bg: DARK_BG },
  { id: "P5", label: "比較型", desc: "従来 vs BOAR テーブル", component: P5, bg: DARK_BG },
  { id: "P6", label: "宣言型", desc: "マニフェスト「我々は〜」", component: P6, bg: DARK_BG },
  { id: "P7", label: "ストリップ型", desc: "縦線区切り3カラム", component: P7, bg: DARK_BG },
  { id: "P8", label: "課題対応型", desc: "課題 → 解 の対応", component: P8, bg: DARK_BG },
  { id: "P9", label: "アコーディオン型", desc: "クリックで展開（インタラクティブ）", component: P9, bg: DARK_BG },
  { id: "P10", label: "スタッガード型", desc: "カード並列 + 番号", component: P10, bg: DARK_BG },
];

export default function WhatWeDoPatterns() {
  const [selected, setSelected] = useState(null);

  const filtered = selected ? PATTERNS.filter((p) => p.id === selected) : PATTERNS;

  return (
    <div style={{ fontFamily: FONTS.body, background: "#090c0e", minHeight: "100vh" }}>
      {/* ナビ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(9,12,14,0.97)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "12px 32px",
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
      }}>
        <span style={{ fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginRight: 8 }}>
          What We Do — Pattern Lab
        </span>
        <button
          onClick={() => setSelected(null)}
          style={{
            fontFamily: FONTS.body, fontSize: 12, padding: "5px 14px", borderRadius: 2,
            border: `1px solid ${!selected ? COLORS.G300 : "rgba(255,255,255,0.15)"}`,
            background: !selected ? "rgba(106,170,136,0.15)" : "transparent",
            color: !selected ? COLORS.G300 : "rgba(255,255,255,0.4)", cursor: "pointer",
          }}
        >ALL</button>
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            style={{
              fontFamily: FONTS.body, fontSize: 12, padding: "5px 14px", borderRadius: 2,
              border: `1px solid ${selected === p.id ? COLORS.G300 : "rgba(255,255,255,0.15)"}`,
              background: selected === p.id ? "rgba(106,170,136,0.15)" : "transparent",
              color: selected === p.id ? COLORS.G300 : "rgba(255,255,255,0.4)", cursor: "pointer",
            }}
          >
            {p.id}
          </button>
        ))}
      </div>

      {/* パターン一覧 */}
      {filtered.map((p) => {
        const Component = p.component;
        return (
          <section key={p.id} style={{ padding: "80px 8vw", background: p.bg, borderBottom: "2px solid rgba(255,255,255,0.05)" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              {/* ラベル */}
              <div style={{ marginBottom: 48, display: "flex", alignItems: "baseline", gap: 16 }}>
                <span style={{ fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900, color: "rgba(255,255,255,0.15)" }}>{p.id}</span>
                <span style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: COLORS.G300, textTransform: "uppercase" }}>{p.label}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>— {p.desc}</span>
              </div>
              <Component />
            </div>
          </section>
        );
      })}
    </div>
  );
}
