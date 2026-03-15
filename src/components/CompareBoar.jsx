import { useState } from "react";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const BOAR = [
  { letter: "B", rest: "uild the Business",  ja: "事業を構築する" },
  { letter: "O", rest: "pen Opportunities",  ja: "機会を開く" },
  { letter: "A", rest: "ccelerate Growth",   ja: "成長を加速する" },
  { letter: "R", rest: "ealize Value",       ja: "価値を実現する" },
];

const GRN  = "#3DA860";
const WH   = "rgba(255,255,255,0.88)";
const DIM  = "rgba(255,255,255,0.28)";

// タグライン（短いものを優先）
const TAGS = [
  "深い技術だけが、深い課題を砕く。",
  "技術を産業に刺す。それだけだ。",
  "先端から、産業の核心へ。",
  "課題の深さに、技術の鋭さで応える。",
  "壁があるなら、正面から入る。",
];

const SectionLabel = ({ id, text, color = "rgba(255,255,255,0.35)" }) => (
  <div style={{
    position: "sticky", top: 48, zIndex: 10,
    fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    background: "rgba(2,6,4,0.97)", backdropFilter: "blur(6px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "9px 36px", color,
  }}>
    <span style={{ color: "rgba(255,255,255,0.15)", marginRight: 10 }}>{id}</span>
    {text}
  </div>
);

// ── 共通: BOAR Overlay リスト
function BoarList({ letterColor = GRN, textColor = WH, dimColor = DIM, borderColor = "rgba(255,255,255,0.07)", ghostOpacity = 0.035 }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: FONTS.accent, fontWeight: 900,
        fontSize: "clamp(160px,26vw,340px)",
        color: `rgba(255,255,255,${ghostOpacity})`,
        letterSpacing: "-0.04em", lineHeight: 1,
        whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
      }}>
        BOAR
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {BOAR.map((item) => (
          <div key={item.letter} style={{
            display: "flex", alignItems: "baseline",
            borderBottom: `1px solid ${borderColor}`,
            padding: "16px 0",
          }}>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(48px,8.5vw,112px)", color: letterColor, lineHeight: 1, minWidth: "1.1ch", letterSpacing: "-0.02em" }}>
              {item.letter}
            </span>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: "clamp(28px,5vw,64px)", color: textColor, lineHeight: 1, letterSpacing: "0.01em" }}>
              {item.rest}
            </span>
            <span style={{ fontFamily: FONTS.body, fontSize: "clamp(13px,1.6vw,20px)", color: dimColor, marginLeft: "auto", paddingLeft: 28, whiteSpace: "nowrap" }}>
              {item.ja}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 共通: グリッドドリフト
function GridDrift({ id, opacity = 0.05 }) {
  return (
    <div style={{ position: "absolute", inset: "-100px 0 0 0", overflow: "hidden", pointerEvents: "none" }}>
      <svg style={{ width: "100%", height: "calc(100% + 100px)", opacity, animation: "gridDrift 8s linear infinite" }} xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id={id} width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

// ── 共通: パーティクル
const PTS = [
  { x:8, s:1.5, d:0, dur:9 }, { x:22, s:1, d:2.5, dur:11 }, { x:38, s:2, d:1, dur:8 },
  { x:54, s:1, d:3.5, dur:12 }, { x:68, s:1.5, d:0.5, dur:10 }, { x:82, s:1, d:2, dur:9.5 },
];
function Particles() {
  return PTS.map((p, i) => (
    <div key={i} style={{
      position: "absolute", left: `${p.x}%`, bottom: 0,
      width: p.s, height: p.s, borderRadius: "50%",
      background: "rgba(255,255,255,0.45)",
      animation: `pRise ${p.dur}s ease-in ${p.d}s infinite`,
      pointerEvents: "none",
    }} />
  ));
}

// ──────────────────────────────────────────────────
//  HERO SERIES (H1–H5): darkGreen gradient
// ──────────────────────────────────────────────────

// H1 — Hero完全一致
function H1() {
  return (
    <section id="h1" style={{ background: "linear-gradient(160deg,#152f26 0%,#0a1a14 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <SectionLabel id="H-1" text="Hero完全一致 — 同グラデ・グリッド・パーティクル" />
      <GridDrift id="hg1" opacity={0.05} />
      <Particles />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(10,26,20,0.9) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 40px", width: "100%" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(36px,6vw,88px)", color: WH, lineHeight: 1.25, marginBottom: 64 }}>
          {TAGS[0]}
        </p>
        <BoarList />
      </div>
    </section>
  );
}

// H2 — Hero gradient + タグライン大型・中央揃え
function H2() {
  return (
    <section id="h2" style={{ background: "linear-gradient(135deg,#0f2318 0%,#152f26 40%,#081510 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <SectionLabel id="H-2" text="Center Aligned — タグライン中央・上段に大きく" />
      <GridDrift id="hg2" opacity={0.04} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,90,64,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 40px", width: "100%", textAlign: "center" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(40px,7vw,104px)", color: WH, lineHeight: 1.15, marginBottom: 80, letterSpacing: "-0.01em" }}>
          {TAGS[1]}
        </p>
        <BoarList />
      </div>
    </section>
  );
}

// H3 — Hero gradient + ライン走る
function H3() {
  return (
    <section id="h3" style={{ background: "linear-gradient(175deg,#0d2318 0%,#152f26 60%,#0a1a14 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <SectionLabel id="H-3" text="Line Run — Heroのライン演出を踏襲" />
      <GridDrift id="hg3" opacity={0.045} />
      <Particles />
      <div style={{ position: "absolute", top: "10%", left: "-10%", width: "70%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(61,168,96,0.3), transparent)", animation: "heroLineRun1 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "75%", right: "-10%", width: "55%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", animation: "heroLineRun2 8s ease-in-out 2s infinite", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 40px", width: "100%" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(36px,6vw,88px)", color: WH, lineHeight: 1.25, marginBottom: 64 }}>
          {TAGS[2]}
        </p>
        <BoarList letterColor={GRN} />
      </div>
    </section>
  );
}

// H4 — Hero gradient + 左右分割（タグライン左・BOAR右）
function H4() {
  return (
    <section id="h4" style={{ background: "linear-gradient(160deg,#152f26 0%,#0a1a14 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <SectionLabel id="H-4" text="Split Layout — タグライン左カラム・BOAR右カラム" />
      <GridDrift id="hg4" opacity={0.04} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(10,26,20,0.9) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 40px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: FONTS.display, fontSize: "clamp(32px,4.5vw,64px)", color: WH, lineHeight: 1.3, marginBottom: 32 }}>
            {TAGS[3]}
          </p>
          <div style={{ width: 40, height: 2, background: GRN, opacity: 0.6 }} />
        </div>
        <BoarList />
      </div>
    </section>
  );
}

// H5 — Hero gradient + タグライン極大（Heroテキストスケール）
function H5() {
  return (
    <section id="h5" style={{ background: "linear-gradient(160deg,#152f26 0%,#081410 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <SectionLabel id="H-5" text="Max Scale — タグラインをHero主文字と同スケール" />
      <GridDrift id="hg5" opacity={0.05} />
      <Particles />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(10,26,20,0.9) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 40px", width: "100%" }}>
        <p style={{ fontFamily: FONTS.accent, fontSize: "clamp(52px,9vw,140px)", color: WH, lineHeight: 1.05, letterSpacing: "0.02em", fontWeight: 900, marginBottom: 80 }}>
          {TAGS[4]}
        </p>
        <BoarList ghostOpacity={0.025} />
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────
//  K4 SERIES: 黒立体感 × 5グラデパターン
// ──────────────────────────────────────────────────

const COPY = "キャズムを越え、非連続な成長を。";

function K4Base({ id, label, bg, overlays = [], gridId, gridOpacity = 0.022 }) {
  return (
    <section id={id} style={{ background: bg, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <SectionLabel id={id.toUpperCase()} text={label} />
      <GridDrift id={gridId} opacity={gridOpacity} />
      {overlays.map((style, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }} />
      ))}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 40px", width: "100%" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,60px)", color: WH, lineHeight: 1.25, marginBottom: 64, whiteSpace: "nowrap" }}>
          {COPY}
        </p>
        <BoarList borderColor="rgba(255,255,255,0.06)" ghostOpacity={0.028} />
      </div>
    </section>
  );
}

// K4-A: 横グラデ（左：深緑 → 右：黒） ← 元K4
function K4A() {
  return <K4Base id="k4a" label="A — 左：深緑 → 右：黒（元K4）" bg="linear-gradient(105deg,#0a1a10 0%,#040807 55%,#020404 100%)" gridId="kg4a" overlays={[
    { background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.45) 100%)" },
  ]} />;
}

// K4-B: 縦グラデ（上：黒 → 下：深緑が滲む）
function K4B() {
  return <K4Base id="k4b" label="B — 上：黒 → 下：深緑が底から滲む" bg="linear-gradient(180deg,#030506 0%,#040b08 50%,#091a10 100%)" gridId="kg4b" gridOpacity={0.02} overlays={[
    { background: "radial-gradient(ellipse 90% 55% at 50% 110%, rgba(30,70,44,0.45) 0%, transparent 60%)" },
    { background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 40%)" },
  ]} />;
}

// K4-C: 対角（左上：黒 → 右下：深緑）
function K4C() {
  return <K4Base id="k4c" label="C — 左上：黒 → 右下：深緑" bg="linear-gradient(135deg,#020404 0%,#030707 40%,#0a1e12 80%,#0d2418 100%)" gridId="kg4c" gridOpacity={0.025} overlays={[
    { background: "radial-gradient(ellipse 60% 60% at 85% 90%, rgba(20,55,32,0.3) 0%, transparent 65%)" },
    { background: "radial-gradient(ellipse 50% 50% at 0% 0%, rgba(0,0,0,0.5) 0%, transparent 60%)" },
  ]} />;
}

// K4-D: 中央緑帯（黒 → 中央に深緑の帯 → 黒）— Hero連続性を考慮
function K4D() {
  return <K4Base id="k4d" label="D — 中央緑帯・Hero連続性あり" bg="#091510" gridId="kg4d" gridOpacity={0.03} overlays={[
    { background: "linear-gradient(105deg,#040908 0%,#0d2018 20%,#152f26 45%,#0d2018 75%,#040908 100%)" },
    { background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)" },
    { background: "radial-gradient(ellipse 100% 55% at 50% 50%, rgba(45,90,64,0.12) 0%, transparent 70%)" },
  ]} />;
}

// K4-E: 左上スポット + 右下フォール（Hero風×黒）
function K4E() {
  return <K4Base id="k4e" label="E — 左上：緑スポット + 右下：黒フォール" bg="#030507" gridId="kg4e" gridOpacity={0.02} overlays={[
    { background: "radial-gradient(ellipse 60% 50% at 10% 5%, rgba(20,55,32,0.35) 0%, transparent 60%)" },
    { background: "radial-gradient(ellipse 55% 55% at 95% 98%, rgba(0,0,0,0.8) 0%, transparent 60%)" },
    { background: "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)" },
  ]} />;
}

// ──────────────────────────────────────────────────
//  MAIN
// ──────────────────────────────────────────────────
export default function CompareBoar() {
  return (
    <div style={{ background: "#020908" }}>
      <style>{`
        @keyframes gridDrift  { 0%{transform:translateY(0)} 100%{transform:translateY(-100px)} }
        @keyframes pRise      { 0%{transform:translateY(0);opacity:0} 10%{opacity:0.7} 90%{opacity:0.4} 100%{transform:translateY(-100vh);opacity:0} }
        @keyframes heroLineRun1 { 0%{opacity:0;transform:rotate(18deg) scaleX(2) translateX(-60%)} 15%{opacity:1} 85%{opacity:0.6} 100%{opacity:0;transform:rotate(18deg) scaleX(2) translateX(60%)} }
        @keyframes heroLineRun2 { 0%{opacity:0;transform:rotate(-12deg) scaleX(2) translateX(60%)} 15%{opacity:1} 85%{opacity:0.4} 100%{opacity:0;transform:rotate(-12deg) scaleX(2) translateX(-60%)} }
      `}</style>

      <div style={{ textAlign: "center", padding: "32px 0 0", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.12)" }}>
        H Series — Hero Green
      </div>
      <H1 /><H2 /><H3 /><H4 /><H5 />

      <div style={{ textAlign: "center", padding: "32px 0 0", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.12)", borderTop: "1px solid rgba(255,255,255,0.03)", marginTop: 16 }}>
        K4 Series — Black Depth Gradient × 5
      </div>
      <K4A /><K4B /><K4C /><K4D /><K4E />
    </div>
  );
}
