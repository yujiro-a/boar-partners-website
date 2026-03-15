/**
 * 3パターン比較ページ
 * Pattern A — Dark Immersion  : 全セクションをダーク統一。Hero の没入感をサイト全体へ
 * Pattern B — Sharp Contrast  : 白×深緑のコントラスト強化。現行の深化版
 * Pattern C — Stone & Deep    : ウォームストーン×ディープブラック。高級感優先
 */
import { useState, useEffect, useRef } from "react";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

// ─── Palette ───────────────────────────────────────────────
const PA = {
  name: "A — Dark Immersion",
  desc: "全セクションをダーク統一。\nHeroの没入感をスクロール全体で維持する。",
  bgLight:   "#0d201a",
  bgDark:    "#081410",
  card:      "rgba(255,255,255,0.05)",
  cardBdr:   "rgba(255,255,255,0.1)",
  cardTop:   "rgba(255,255,255,0.2)",
  hl:        "rgba(255,255,255,0.95)",
  body:      "rgba(255,255,255,0.5)",
  label:     "rgba(255,255,255,0.22)",
  divider:   "rgba(255,255,255,0.06)",
  accent:    "#5ec98a",
  grid:      "white",
  gridOp:    0.04,
};

const PB = {
  name: "B — Sharp Contrast",
  desc: "白×深緑のコントラストを強化した現行深化版。\n明るい呼吸とダークの緊張感を交互に。",
  bgLight:   "#ffffff",
  bgDark:    "#152f26",
  card:      "#ffffff",
  cardBdr:   "#152f26",
  cardTop:   "#152f26",
  hl:        "#152f26",
  hlDark:    "#ffffff",
  body:      "rgba(21,47,38,0.6)",
  bodyDark:  "rgba(255,255,255,0.55)",
  label:     "rgba(21,47,38,0.28)",
  labelDark: "rgba(255,255,255,0.28)",
  divider:   "#d8d8d2",
  accent:    "#152f26",
  grid:      "#152f26",
  gridOp:    0.045,
};

const PC = {
  name: "C — Stone & Black",
  desc: "ウォームストーン×ディープブラック。\n素材感と高級感。Heroとの温度差を最小化。",
  bgLight:   "#f0ece4",
  bgDark:    "#070f0c",
  card:      "#faf8f4",
  cardDark:  "rgba(255,255,255,0.04)",
  cardBdr:   "#c8c0b2",
  cardTop:   "#2d5a40",
  hl:        "#1a2e25",
  hlDark:    "rgba(255,255,255,0.92)",
  body:      "rgba(26,46,37,0.58)",
  bodyDark:  "rgba(255,255,255,0.45)",
  label:     "rgba(26,46,37,0.28)",
  labelDark: "rgba(255,255,255,0.22)",
  divider:   "rgba(26,46,37,0.12)",
  accent:    "#2d5a40",
  grid:      "#2d5a40",
  gridOp:    0.04,
};

// C' — Stone & Deep Green（PCのダーク部をディープグリーンに差し替え）
const PD = {
  ...PC,
  name: "D — Stone & Deep Green",
  desc: "ウォームストーン×ディープグリーン。\nCの素材感をそのままにHeroの緑と統一。",
  bgDark:    "#0d2018",   // #070f0c → Hero系の深森緑
  cardDark:  "rgba(255,255,255,0.04)",
};

// ─── Helpers ────────────────────────────────────────────────
const Label = ({ children, color }) => (
  <div style={{
    fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.2em",
    textTransform: "uppercase", fontWeight: 700, marginBottom: 24, color,
  }}>{children}</div>
);

const H2 = ({ children, color, style: s = {} }) => (
  <h2 style={{
    fontFamily: FONTS.display, fontSize: "clamp(28px, 4vw, 52px)",
    color, lineHeight: 1.25, marginBottom: 64, fontWeight: 700, ...s,
  }}>{children}</h2>
);

const Grid = ({ color, op }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: op, pointerEvents: "none" }}>
    <defs><pattern id={`g${color.replace('#','')}`} width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke={color} strokeWidth="0.6"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill={`url(#g${color.replace('#','')})`} />
  </svg>
);

// ─── Section renderers ──────────────────────────────────────

function BackgroundA() {
  const walls = [
    { num: "01", title: "技術の目利き", desc: "事業化ポテンシャルを評価できる人材がチームに不在。" },
    { num: "02", title: "交渉ノウハウ", desc: "契約設計・条件交渉を担える存在がいない。" },
    { num: "03", title: "PMIの実行力", desc: "アライアンス成立後、実行支援が空白になっている。" },
  ];
  return (
    <section style={{ background: PA.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PA.grid} op={PA.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PA.label}>Background</Label>
        <H2 color={PA.hl}>技術と産業の間に、<br />実行できる者がいない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {walls.map((w) => (
            <div key={w.num} style={{ background: PA.card, border: `1px solid ${PA.cardBdr}`, borderTop: `2px solid ${PA.cardTop}`, padding: "36px 28px" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 56, color: PA.hl, opacity: 0.06, lineHeight: 1, marginBottom: 20, fontWeight: 900 }}>{w.num}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, color: PA.hl, fontWeight: 700, marginBottom: 12 }}>{w.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PA.body, lineHeight: 1.85 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyA() {
  const items = [
    { letter: "B", en: "Build the Business", ja: "事業を構築する" },
    { letter: "O", en: "Open Opportunities", ja: "機会を開く" },
    { letter: "A", en: "Accelerate Growth",  ja: "成長を加速する" },
    { letter: "R", en: "Realize Value",       ja: "価値を実現する" },
  ];
  return (
    <section id="philosophy" style={{ background: PA.bgDark, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PA.grid} op={PA.gridOp * 0.7} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PA.label}>Philosophy</Label>
        <H2 color={PA.hl}>前にしか、進まない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {items.map((item) => (
            <div key={item.letter} style={{ background: PA.card, border: `1px solid ${PA.cardBdr}`, padding: "32px 24px" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 64, color: PA.hl, opacity: 0.07, lineHeight: 1, marginBottom: 16, fontWeight: 900 }}>{item.letter}</div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 14, color: PA.accent, marginBottom: 6, fontWeight: 700, letterSpacing: "0.04em" }}>{item.en}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PA.hl, opacity: 0.7 }}>{item.ja}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesA() {
  const paths = [
    { label: "Green Path", sub: "アライアンス軸", color: "#5ec98a", bg: "rgba(94,201,138,0.07)", title: "ディープテック事業化", steps: ["技術シーズの選定・マッチング", "共同開発・PoC推進", "事業化・市場投入"] },
    { label: "Gold Path",  sub: "M&A軸",          color: "#c8a84b", bg: "rgba(200,168,75,0.07)", title: "インオーガニック成長", steps: ["候補先ソーシング・バリュエーション", "PMI・統合実行", "事業成長・シナジー実現"] },
  ];
  return (
    <section style={{ background: PA.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PA.grid} op={PA.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PA.label}>Services</Label>
        <H2 color={PA.hl}>2軸で、事業成長を<br />一気通貫する。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {paths.map((p) => (
            <div key={p.label} style={{ background: PA.card, border: `1px solid ${PA.cardBdr}` }}>
              <div style={{ background: p.bg, borderTop: `2px solid ${p.color}`, padding: "28px 32px" }}>
                <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: p.color, fontWeight: 700, marginBottom: 8 }}>{p.label} — {p.sub}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 20, color: PA.hl }}>{p.title}</div>
              </div>
              <div style={{ padding: "24px 32px" }}>
                {p.steps.map((s, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: j < p.steps.length - 1 ? `1px solid ${PA.cardBdr}` : "none" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: FONTS.body, fontSize: 14, color: PA.body }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pattern B ───────────────────────────────────────────────

function BackgroundB() {
  const walls = [
    { num: "01", title: "技術の目利き", desc: "事業化ポテンシャルを評価できる人材がチームに不在。" },
    { num: "02", title: "交渉ノウハウ", desc: "契約設計・条件交渉を担える存在がいない。" },
    { num: "03", title: "PMIの実行力", desc: "アライアンス成立後、実行支援が空白になっている。" },
  ];
  return (
    <section style={{ background: PB.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PB.grid} op={PB.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PB.label}>Background</Label>
        <H2 color={PB.hl}>技術と産業の間に、<br />実行できる者がいない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {walls.map((w) => (
            <div key={w.num} style={{ background: PB.bgDark, padding: "36px 28px" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 56, color: "#fff", opacity: 0.07, lineHeight: 1, marginBottom: 20, fontWeight: 900 }}>{w.num}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, color: "#fff", fontWeight: 700, marginBottom: 12 }}>{w.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PB.bodyDark, lineHeight: 1.85 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyB() {
  const items = [
    { letter: "B", en: "Build the Business", ja: "事業を構築する" },
    { letter: "O", en: "Open Opportunities", ja: "機会を開く" },
    { letter: "A", en: "Accelerate Growth",  ja: "成長を加速する" },
    { letter: "R", en: "Realize Value",       ja: "価値を実現する" },
  ];
  return (
    <section style={{ background: "#f7f7f5", padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PB.grid} op={PB.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PB.label}>Philosophy</Label>
        <H2 color={PB.hl}>前にしか、進まない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {items.map((item) => (
            <div key={item.letter} style={{ background: PB.card, borderLeft: `3px solid ${PB.accent}`, padding: "32px 24px", boxShadow: "0 2px 12px rgba(21,47,38,0.07)" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 64, color: PB.accent, opacity: 0.08, lineHeight: 1, marginBottom: 16, fontWeight: 900 }}>{item.letter}</div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 13, color: PB.accent, marginBottom: 6, fontWeight: 700, letterSpacing: "0.04em" }}>{item.en}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PB.body }}>{item.ja}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesB() {
  const paths = [
    { label: "Green Path", sub: "アライアンス軸", color: "#3DA860", bg: "#1a3d2d", title: "ディープテック事業化", steps: ["技術シーズの選定・マッチング", "共同開発・PoC推進", "事業化・市場投入"] },
    { label: "Gold Path",  sub: "M&A軸",          color: "#b8943a", bg: "#2a2010", title: "インオーガニック成長", steps: ["候補先ソーシング・バリュエーション", "PMI・統合実行", "事業成長・シナジー実現"] },
  ];
  return (
    <section style={{ background: PB.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PB.grid} op={PB.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PB.label}>Services</Label>
        <H2 color={PB.hl}>2軸で、事業成長を<br />一気通貫する。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {paths.map((p) => (
            <div key={p.label} style={{ background: PB.card, borderLeft: `3px solid ${p.color}`, boxShadow: "0 2px 16px rgba(21,47,38,0.08)" }}>
              <div style={{ background: p.bg, padding: "28px 32px" }}>
                <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: p.color, fontWeight: 700, marginBottom: 8 }}>{p.label} — {p.sub}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 20, color: "#fff" }}>{p.title}</div>
              </div>
              <div style={{ padding: "24px 32px" }}>
                {p.steps.map((s, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: j < p.steps.length - 1 ? `1px solid ${PB.divider}` : "none" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: FONTS.body, fontSize: 14, color: PB.body }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pattern C ───────────────────────────────────────────────

function BackgroundC() {
  const walls = [
    { num: "01", title: "技術の目利き", desc: "事業化ポテンシャルを評価できる人材がチームに不在。" },
    { num: "02", title: "交渉ノウハウ", desc: "契約設計・条件交渉を担える存在がいない。" },
    { num: "03", title: "PMIの実行力", desc: "アライアンス成立後、実行支援が空白になっている。" },
  ];
  return (
    <section style={{ background: PC.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PC.grid} op={PC.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PC.label}>Background</Label>
        <H2 color={PC.hl}>技術と産業の間に、<br />実行できる者がいない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {walls.map((w) => (
            <div key={w.num} style={{ background: PC.card, border: `1px solid ${PC.cardBdr}`, borderTop: `2px solid ${PC.cardTop}`, padding: "36px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 56, color: PC.accent, opacity: 0.08, lineHeight: 1, marginBottom: 20, fontWeight: 900 }}>{w.num}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, color: PC.hl, fontWeight: 700, marginBottom: 12 }}>{w.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PC.body, lineHeight: 1.85 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyC() {
  const items = [
    { letter: "B", en: "Build the Business", ja: "事業を構築する" },
    { letter: "O", en: "Open Opportunities", ja: "機会を開く" },
    { letter: "A", en: "Accelerate Growth",  ja: "成長を加速する" },
    { letter: "R", en: "Realize Value",       ja: "価値を実現する" },
  ];
  return (
    <section style={{ background: PC.bgDark, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color="white" op={0.025} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PC.labelDark}>Philosophy</Label>
        <H2 color={PC.hlDark}>前にしか、進まない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {items.map((item) => (
            <div key={item.letter} style={{ background: PC.cardDark, border: `1px solid rgba(255,255,255,0.08)`, borderTop: `2px solid rgba(255,255,255,0.18)`, padding: "32px 24px" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 64, color: "#fff", opacity: 0.07, lineHeight: 1, marginBottom: 16, fontWeight: 900 }}>{item.letter}</div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 6, fontWeight: 700, letterSpacing: "0.04em" }}>{item.en}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PC.bodyDark }}>{item.ja}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesC() {
  const paths = [
    { label: "Green Path", sub: "アライアンス軸", color: "#3d8a5a", border: "#3d8a5a", title: "ディープテック事業化", steps: ["技術シーズの選定・マッチング", "共同開発・PoC推進", "事業化・市場投入"] },
    { label: "Gold Path",  sub: "M&A軸",          color: "#8a6e2a", border: "#8a6e2a", title: "インオーガニック成長", steps: ["候補先ソーシング・バリュエーション", "PMI・統合実行", "事業成長・シナジー実現"] },
  ];
  return (
    <section style={{ background: PC.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <Grid color={PC.grid} op={PC.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PC.label}>Services</Label>
        <H2 color={PC.hl}>2軸で、事業成長を<br />一気通貫する。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {paths.map((p) => (
            <div key={p.label} style={{ background: PC.card, border: `1px solid ${PC.cardBdr}`, borderTop: `3px solid ${p.color}`, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div style={{ padding: "28px 32px", borderBottom: `1px solid ${PC.divider}` }}>
                <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: p.color, fontWeight: 700, marginBottom: 8 }}>{p.label} — {p.sub}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 20, color: PC.hl }}>{p.title}</div>
              </div>
              <div style={{ padding: "24px 32px" }}>
                {p.steps.map((s, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: j < p.steps.length - 1 ? `1px solid ${PC.divider}` : "none" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: FONTS.body, fontSize: 14, color: PC.body }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ウォームストーン立体感オーバーレイ（上から光が当たる石材の質感）
const StoneDepth = () => (
  <>
    {/* 上部ハイライト: 光源が上から */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 50% at 50% -5%, rgba(255,248,235,0.55) 0%, transparent 55%)", pointerEvents: "none" }} />
    {/* 周縁ビネット: 四隅を少し落として立体感 */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(140,128,110,0.1) 100%)", pointerEvents: "none" }} />
    {/* 下部シャドウ: 地面への落ち込み感 */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(140,128,110,0.08) 100%)", pointerEvents: "none" }} />
  </>
);

// ─── Pattern D（PCのダーク部=深森緑 差し替え版）────────────────
function BackgroundD() {
  // stone背景は同じ → BackgroundCを流用
  const walls = [
    { num: "01", title: "技術の目利き", desc: "事業化ポテンシャルを評価できる人材がチームに不在。" },
    { num: "02", title: "交渉ノウハウ", desc: "契約設計・条件交渉を担える存在がいない。" },
    { num: "03", title: "PMIの実行力", desc: "アライアンス成立後、実行支援が空白になっている。" },
  ];
  return (
    <section style={{ background: PD.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <StoneDepth />
      <Grid color={PD.grid} op={PD.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PD.label}>Background</Label>
        <H2 color={PD.hl}>技術と産業の間に、<br />実行できる者がいない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {walls.map((w) => (
            <div key={w.num} style={{ background: PD.card, border: `1px solid ${PD.cardBdr}`, borderTop: `2px solid ${PD.cardTop}`, padding: "36px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 56, color: PD.accent, opacity: 0.08, lineHeight: 1, marginBottom: 20, fontWeight: 900 }}>{w.num}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, color: PD.hl, fontWeight: 700, marginBottom: 12 }}>{w.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PD.body, lineHeight: 1.85 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyD() {
  const items = [
    { letter: "B", en: "Build the Business", ja: "事業を構築する" },
    { letter: "O", en: "Open Opportunities", ja: "機会を開く" },
    { letter: "A", en: "Accelerate Growth",  ja: "成長を加速する" },
    { letter: "R", en: "Realize Value",       ja: "価値を実現する" },
  ];
  // ダーク部が深森緑（Hero色）になる
  return (
    <section style={{ background: PD.bgDark, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      {/* 微かな光: 左上から斜めに差し込む帯 */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 20% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* 右下への暗落ち（Hero と同じ手法） */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 100% 100%, rgba(4,12,9,0.7) 0%, transparent 65%)", pointerEvents: "none" }} />
      <Grid color="white" op={0.04} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PD.labelDark}>Philosophy</Label>
        <H2 color={PD.hlDark}>前にしか、進まない。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {items.map((item) => (
            <div key={item.letter} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.09)`, borderTop: `2px solid rgba(255,255,255,0.2)`, padding: "32px 24px" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 64, color: "#fff", opacity: 0.07, lineHeight: 1, marginBottom: 16, fontWeight: 900 }}>{item.letter}</div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 6, fontWeight: 700, letterSpacing: "0.04em" }}>{item.en}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: PD.bodyDark }}>{item.ja}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesD() {
  const paths = [
    { label: "Green Path", sub: "アライアンス軸", color: "#3d8a5a", title: "ディープテック事業化", steps: ["技術シーズの選定・マッチング", "共同開発・PoC推進", "事業化・市場投入"] },
    { label: "Gold Path",  sub: "M&A軸",          color: "#8a6e2a", title: "インオーガニック成長", steps: ["候補先ソーシング・バリュエーション", "PMI・統合実行", "事業成長・シナジー実現"] },
  ];
  return (
    <section style={{ background: PD.bgLight, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
      <StoneDepth />
      <Grid color={PD.grid} op={PD.gridOp} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label color={PD.label}>Services</Label>
        <H2 color={PD.hl}>2軸で、事業成長を<br />一気通貫する。</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {paths.map((p) => (
            <div key={p.label} style={{ background: PD.card, border: `1px solid ${PD.cardBdr}`, borderTop: `3px solid ${p.color}`, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div style={{ padding: "28px 32px", borderBottom: `1px solid ${PD.divider}` }}>
                <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: p.color, fontWeight: 700, marginBottom: 8 }}>{p.label} — {p.sub}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 20, color: PD.hl }}>{p.title}</div>
              </div>
              <div style={{ padding: "24px 32px" }}>
                {p.steps.map((s, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: j < p.steps.length - 1 ? `1px solid ${PD.divider}` : "none" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: FONTS.body, fontSize: 14, color: PD.body }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pattern Banner ──────────────────────────────────────────
function PatternBanner({ p, colors }) {
  return (
    <div style={{
      background: colors.bg, padding: "40px 48px 32px",
      borderBottom: `1px solid ${colors.bdr}`,
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "baseline", gap: 24, flexWrap: "wrap" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900, letterSpacing: "0.08em", color: colors.hl }}>
          {p.name}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 13, color: colors.sub, lineHeight: 1.6, whiteSpace: "pre-line" }}>
          {p.desc}
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────
export default function ComparePatterns() {
  return (
    <div style={{ fontFamily: FONTS.body, overflowX: "hidden" }}>

      {/* ===== PATTERN A ===== */}
      <PatternBanner p={PA}
        colors={{ bg: "#040d09", bdr: "rgba(255,255,255,0.08)", hl: "rgba(255,255,255,0.9)", sub: "rgba(255,255,255,0.4)" }}
      />
      <BackgroundA />
      <PhilosophyA />
      <ServicesA />

      {/* ===== PATTERN B ===== */}
      <PatternBanner p={PB}
        colors={{ bg: "#152f26", bdr: "rgba(255,255,255,0.08)", hl: "rgba(255,255,255,0.9)", sub: "rgba(255,255,255,0.5)" }}
      />
      <BackgroundB />
      <PhilosophyB />
      <ServicesB />

      {/* ===== PATTERN C ===== */}
      <PatternBanner p={PC}
        colors={{ bg: "#07100d", bdr: "rgba(255,255,255,0.08)", hl: "rgba(255,255,255,0.9)", sub: "rgba(255,255,255,0.45)" }}
      />
      <BackgroundC />
      <PhilosophyC />
      <ServicesC />

      {/* ===== PATTERN D ===== */}
      <PatternBanner p={PD}
        colors={{ bg: "#0d2018", bdr: "rgba(255,255,255,0.08)", hl: "rgba(255,255,255,0.9)", sub: "rgba(255,255,255,0.45)" }}
      />
      <BackgroundD />
      <PhilosophyD />
      <ServicesD />

    </div>
  );
}
