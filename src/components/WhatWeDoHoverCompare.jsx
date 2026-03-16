import { useState } from "react";
import { motion } from "framer-motion";

const FONTS = {
  accent: "'Big Shoulders Display', sans-serif",
  display: "'Noto Serif JP', serif",
  body: "system-ui, sans-serif",
};
const G = "#6db88b";
const DARK = "#090c0e";

const PILLARS = [
  { num: "01", en: "EXECUTE",    title: "事業開発のプロ集団",      one: "戦略だけ、渡さない。",    img: "/what-we-do-01.jpg", fallback: "linear-gradient(160deg,#152f26,#0d1a14)" },
  { num: "02", en: "BRIDGE",     title: "アカデミアとの深い連携",  one: "研究室の言語で、話せる。", img: "/what-we-do-02.jpg", fallback: "linear-gradient(160deg,#1e3a2a,#0d1a14)" },
  { num: "03", en: "ACCELERATE", title: "AIが一員として動く",      one: "AIが本当に、働く。",       img: "/what-we-do-03.jpg", fallback: "linear-gradient(160deg,#0a1a12,#152f26)" },
];

// ─── パターン定義 ──────────────────────────────────────────────────
// render(pillar, hovered) → JSX（3層: bgDiv, overlayDiv, textDiv）
const PATTERNS = [
  {
    id: "H01",
    label: "現状（ズーム + テキスト浮上）",
    stars: "★★★",
    note: "定番。安定感あり。やや地味",
    render(p, h) {
      return (
        <>
          <motion.div animate={{ scale: h ? 1.06 : 1 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background: h
            ? "linear-gradient(to top,rgba(9,12,14,0.9) 0%,rgba(9,12,14,0.35) 50%,rgba(9,12,14,0.1) 100%)"
            : "linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.55) 60%,rgba(9,12,14,0.2) 100%)",
            transition:"background 0.5s" }} />
          <TextBlock p={p} h={h} enY={h ? -4 : 0} oneOp={h ? 1 : 0.6} />
        </>
      );
    },
  },
  {
    id: "H02",
    label: "グリーンカーテン（下からせり上がる）",
    stars: "★★★★★",
    note: "ブランドカラーで演出。洗練度◎。アイデンティティが出る",
    render(p, h) {
      return (
        <>
          <motion.div animate={{ scale: h ? 1.04 : 1 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          {/* ベースオーバーレイ */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.5) 60%,rgba(9,12,14,0.15) 100%)" }} />
          {/* グリーンカーテン */}
          <motion.div animate={{ height: h ? "55%" : "0%" }} transition={{ duration: 0.55, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(109,184,139,0.22) 0%,rgba(109,184,139,0.06) 70%,transparent 100%)", pointerEvents:"none" }} />
          {/* 下ラインアクセント */}
          <motion.div animate={{ scaleX: h ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:G, transformOrigin:"left" }} />
          <TextBlock p={p} h={h} enY={h ? -6 : 0} oneOp={h ? 1 : 0.5} titleColor={h ? "white" : "rgba(255,255,255,0.85)"} />
        </>
      );
    },
  },
  {
    id: "H03",
    label: "ケンバーンズ（対角ズーム+パン）",
    stars: "★★★★",
    note: "映画的。動きに奥行き。上品",
    render(p, h) {
      return (
        <>
          <motion.div
            animate={{ scale: h ? 1.1 : 1, x: h ? "-2%" : "0%", y: h ? "-2%" : "0%" }}
            transition={{ duration: 1.0, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background: h
            ? "linear-gradient(to top,rgba(9,12,14,0.88) 0%,rgba(9,12,14,0.3) 55%,rgba(9,12,14,0.1) 100%)"
            : "linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.55) 60%,rgba(9,12,14,0.2) 100%)",
            transition:"background 0.6s" }} />
          <TextBlock p={p} h={h} enY={h ? -8 : 0} oneOp={h ? 1 : 0.5} />
        </>
      );
    },
  },
  {
    id: "H04",
    label: "ズームアウト（常時大→ホバーで等倍）",
    stars: "★★★★",
    note: "常にダイナミック感。ホバーで落ち着く演出",
    render(p, h) {
      return (
        <>
          <motion.div animate={{ scale: h ? 1.0 : 1.08 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background: h
            ? "linear-gradient(to top,rgba(9,12,14,0.85) 0%,rgba(9,12,14,0.3) 55%,rgba(9,12,14,0.1) 100%)"
            : "linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.55) 60%,rgba(9,12,14,0.2) 100%)",
            transition:"background 0.5s" }} />
          <TextBlock p={p} h={h} enY={0} oneOp={h ? 1 : 0.5} />
        </>
      );
    },
  },
  {
    id: "H05",
    label: "スポットライト（中央から暗幕が晴れる）",
    stars: "★★★",
    note: "ドラマ性あり。3列同時は賑やかすぎる可能性",
    render(p, h) {
      return (
        <>
          <div style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background: h
            ? "radial-gradient(ellipse at 50% 80%,rgba(9,12,14,0.5) 0%,rgba(9,12,14,0.8) 60%,rgba(9,12,14,0.95) 100%)"
            : "rgba(9,12,14,0.82)", transition:"background 0.6s" }} />
          <TextBlock p={p} h={h} enY={h ? -4 : 0} oneOp={h ? 1 : 0.5} />
        </>
      );
    },
  },
  {
    id: "H06",
    label: "テキストせり上がり（スライドアップ）",
    stars: "★★★★",
    note: "テキストの動きで目を引く。グリーン×スライドが映える",
    render(p, h) {
      return (
        <>
          <motion.div animate={{ scale: h ? 1.04 : 1 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,12,14,0.95) 0%,rgba(9,12,14,0.5) 55%,rgba(9,12,14,0.15) 100%)" }} />
          <motion.div animate={{ y: h ? 0 : 16, opacity: h ? 1 : 0.85 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"32px 28px" }}>
            <div style={{ fontFamily:FONTS.accent, fontSize:10, letterSpacing:"0.25em", color:"rgba(255,255,255,0.35)", marginBottom:12 }}>{p.num}</div>
            <div style={{ fontFamily:FONTS.accent, fontSize:"clamp(28px,3.5vw,52px)", fontWeight:900, color:"rgba(255,255,255,0.12)", lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:14 }}>{p.en}</div>
            <div style={{ fontFamily:FONTS.display, fontSize:"clamp(14px,1.4vw,20px)", fontWeight:700, color:"white", marginBottom:8, lineHeight:1.4 }}>{p.title}</div>
            <div style={{ fontFamily:FONTS.body, fontSize:"clamp(12px,1vw,14px)", color:G, lineHeight:1.7 }}>{p.one}</div>
          </motion.div>
          <motion.div animate={{ scaleX: h ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:G, transformOrigin:"left" }} />
        </>
      );
    },
  },
  {
    id: "H07",
    label: "グリーングロー（光彩放射）",
    stars: "★★★",
    note: "個性的。AIセクションとの相性◎。全列だと強すぎる",
    render(p, h) {
      return (
        <>
          <motion.div animate={{ scale: h ? 1.05 : 1 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.55) 60%,rgba(9,12,14,0.2) 100%)" }} />
          <motion.div animate={{ opacity: h ? 1 : 0 }} transition={{ duration: 0.5 }}
            style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 100%,rgba(109,184,139,0.25) 0%,transparent 65%)", pointerEvents:"none" }} />
          <TextBlock p={p} h={h} enY={h ? -4 : 0} oneOp={h ? 1 : 0.5} />
        </>
      );
    },
  },
  {
    id: "H08",
    label: "オーバーレイ解除（暗幕が晴れる）",
    stars: "★★★★",
    note: "写真の情報量が増す。ビジュアル強調",
    render(p, h) {
      return (
        <>
          <motion.div animate={{ scale: h ? 1.04 : 1 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background: h
            ? "linear-gradient(to top,rgba(9,12,14,0.88) 0%,rgba(9,12,14,0.1) 40%,rgba(9,12,14,0.0) 100%)"
            : "linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.72) 60%,rgba(9,12,14,0.45) 100%)",
            transition:"background 0.6s" }} />
          <TextBlock p={p} h={h} enY={h ? -6 : 0} oneOp={h ? 1 : 0.5} />
        </>
      );
    },
  },
  {
    id: "H09",
    label: "グリーンカーテン + ケンバーンズ（複合）",
    stars: "★★★★★",
    note: "H02 + H03の組み合わせ。動き×ブランドカラー = 最良候補",
    render(p, h) {
      return (
        <>
          <motion.div
            animate={{ scale: h ? 1.08 : 1, x: h ? "-1.5%" : "0%", y: h ? "-1.5%" : "0%" }}
            transition={{ duration: 1.0, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.48) 55%,rgba(9,12,14,0.12) 100%)" }} />
          <motion.div animate={{ height: h ? "60%" : "0%" }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(109,184,139,0.2) 0%,rgba(109,184,139,0.05) 70%,transparent 100%)", pointerEvents:"none" }} />
          <motion.div animate={{ scaleX: h ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:G, transformOrigin:"left" }} />
          <TextBlock p={p} h={h} enY={h ? -8 : 0} oneOp={h ? 1 : 0.45} titleColor={h ? "white" : "rgba(255,255,255,0.85)"} />
        </>
      );
    },
  },
  {
    id: "H10",
    label: "横パノラマ（水平パン）",
    stars: "★★★",
    note: "横長写真で映える。縦長カラムには注意",
    render(p, h) {
      return (
        <>
          <motion.div
            animate={{ scale: 1.12, x: h ? "3%" : "-3%" }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
            style={{ position:"absolute", inset:0, backgroundImage:`url(${p.img}),${p.fallback}`, backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background: h
            ? "linear-gradient(to top,rgba(9,12,14,0.9) 0%,rgba(9,12,14,0.35) 55%,rgba(9,12,14,0.1) 100%)"
            : "linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.55) 60%,rgba(9,12,14,0.2) 100%)",
            transition:"background 0.5s" }} />
          <TextBlock p={p} h={h} enY={0} oneOp={h ? 1 : 0.5} />
        </>
      );
    },
  },
];

// ─── 共通テキストブロック ──────────────────────────────────────────
function TextBlock({ p, h, enY = 0, oneOp = 0.6, titleColor = "rgba(255,255,255,0.9)" }) {
  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"32px 28px" }}>
      <div style={{ fontFamily:FONTS.accent, fontSize:10, letterSpacing:"0.25em", color:"rgba(255,255,255,0.35)", marginBottom:12 }}>{p.num}</div>
      <motion.div animate={{ y: enY }} transition={{ duration: 0.4 }}
        style={{ fontFamily:FONTS.accent, fontSize:"clamp(28px,3.5vw,52px)", fontWeight:900,
          color: h ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
          lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:14, transition:"color 0.4s" }}>
        {p.en}
      </motion.div>
      <div style={{ fontFamily:FONTS.display, fontSize:"clamp(14px,1.4vw,20px)", fontWeight:700,
        color: titleColor, marginBottom:8, lineHeight:1.4, transition:"color 0.4s" }}>
        {p.title}
      </div>
      <motion.div animate={{ opacity: oneOp }} transition={{ duration: 0.35 }}
        style={{ fontFamily:FONTS.body, fontSize:"clamp(12px,1vw,14px)", color:G, lineHeight:1.7 }}>
        {p.one}
      </motion.div>
    </div>
  );
}

// ─── 3カラムプレビュー ────────────────────────────────────────────
function ThreeColPreview({ pattern, height = 200 }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", height }}>
        {PILLARS.map((p, i) => (
          <div key={p.en}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ position:"relative", overflow:"hidden", cursor:"pointer",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            {pattern.render(p, hovered === i)}
          </div>
        ))}
      </div>
      <div style={{ padding:"10px 0 0", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontFamily:FONTS.accent, fontSize:11, color:G, letterSpacing:"0.15em" }}>{pattern.id}</span>
        <span style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.3)" }}>{pattern.stars}</span>
      </div>
      <div style={{ fontFamily:FONTS.body, fontSize:12, color:"rgba(255,255,255,0.85)", fontWeight:600, marginTop:2, marginBottom:3 }}>{pattern.label}</div>
      <div style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{pattern.note}</div>
    </div>
  );
}

// ─── ライブプレビュー（選択中パターンを大きく） ────────────────────
function BigPreview({ pattern }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", height:"56vh" }}>
      {PILLARS.map((p, i) => (
        <div key={p.en}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{ position:"relative", overflow:"hidden", cursor:"pointer",
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
          {pattern.render(p, hovered === i)}
        </div>
      ))}
    </div>
  );
}

// ─── メイン ──────────────────────────────────────────────────────
export default function WhatWeDoHoverCompare() {
  const [selected, setSelected] = useState(1); // H02デフォルト
  const pattern = PATTERNS[selected];

  return (
    <div style={{ minHeight:"100vh", background:DARK, color:"white", fontFamily:FONTS.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Noto+Serif+JP:wght@700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      {/* ヘッダー */}
      <div style={{ padding:"32px 40px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:FONTS.accent, fontSize:22, fontWeight:900, color:"white" }}>What We Do — Hover Patterns</div>
        <div style={{ fontFamily:FONTS.body, fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:4 }}>
          3カラムのホバーモーション 10パターン比較 — カードをクリックして大プレビューで確認
        </div>
      </div>

      {/* ライブプレビュー */}
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ padding:"16px 40px 8px", display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ fontFamily:FONTS.accent, fontSize:11, fontWeight:700, letterSpacing:"0.2em", color:G }}>LIVE PREVIEW</span>
          <span style={{ fontFamily:FONTS.body, fontSize:12, color:"rgba(255,255,255,0.5)" }}>
            {pattern.id}: {pattern.label}
          </span>
          <span style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.3)" }}>{pattern.stars}</span>
        </div>
        <BigPreview pattern={pattern} />
        <div style={{ padding:"12px 40px", fontFamily:FONTS.body, fontSize:12, color:"rgba(255,255,255,0.4)" }}>
          {pattern.note}
        </div>
      </div>

      {/* サムネイルグリッド */}
      <div style={{ padding:"32px 40px" }}>
        <div style={{ fontFamily:FONTS.accent, fontSize:11, fontWeight:700, letterSpacing:"0.2em", color:G, marginBottom:20 }}>
          ALL PATTERNS — ホバーで確認、クリックで大プレビューに切り替え
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"28px 20px" }}>
          {PATTERNS.map((pt, i) => (
            <div key={pt.id}
              onClick={() => setSelected(i)}
              style={{
                cursor:"pointer",
                outline: selected === i ? `2px solid ${G}` : "2px solid transparent",
                outlineOffset:3,
                borderRadius:2,
                transition:"outline-color 0.2s",
              }}>
              <ThreeColPreview pattern={pt} height={120} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
