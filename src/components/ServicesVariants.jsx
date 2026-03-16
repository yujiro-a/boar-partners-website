/**
 * ServicesVariants.jsx — Value Forward セクション 高度化パターン比較
 * ベースライン: B04（アウトライン親ボックス）× I02（フラスコ/矢印）
 */
import { useState } from "react";
import { motion } from "framer-motion";

const F = {
  accent: "'Big Shoulders Display', sans-serif",
  display: "'Hiragino Sans W6','Hiragino Kaku Gothic ProN',sans-serif",
  body: "'Hiragino Sans W3','Hiragino Kaku Gothic ProN',sans-serif",
};
const G = { G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea" };
const STONE = "#ede8df";
const DARK = "#0d1a14";

const SVC = {
  rd: {
    num: "01", label: "Forward R&D",
    sub: "価値の発見・証明",
    framework: ["Define", "Drive", "Deliver"],
    desc: "課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。紹介や橋渡しではなく、研究開発段階から課題ごと一緒に解きます。",
    bg: "linear-gradient(140deg, #0d2218 0%, #1a3825 55%, #0d1a14 100%)",
    accent: G.G300,
  },
  bo: {
    num: "02", label: "Forward Buyout",
    sub: "価値の統合",
    framework: ["Valuation", "Structure", "PMI", "Monetize"],
    desc: "共創の延長線上にあるM&AやExitを設計・実行します。技術を深く理解しているからこそ、社会実装のポテンシャルを正しく評価したストラクチャーを組めます。",
    bg: "linear-gradient(140deg, #090c0e 0%, #0d1a14 55%, #07090b 100%)",
    accent: "rgba(255,255,255,0.6)",
  },
};

// ── アイコン ──────────────────────────────────────────────
const IconFlask = ({ color = G.G300, size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none"
    stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4h10M15 4v10L7 28h22L21 14V4"/>
    <circle cx="12" cy="24" r="1.5" fill={color} opacity="0.6"/>
    <circle cx="20" cy="26" r="1" fill={color} opacity="0.4"/>
  </svg>
);
const IconArrow = ({ color = "rgba(255,255,255,0.6)", size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none"
    stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <polyline points="4,26 12,16 20,20 32,8"/>
    <polyline points="24,8 32,8 32,16"/>
  </svg>
);

// ── デコレーションSVG ─────────────────────────────────────
const DecoCircles = ({ opacity = 1, cx = "88%", cy = "28%" }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden>
    {[90, 70, 50, 34, 18].map((r, i) => (
      <circle key={i} cx={cx} cy={cy} r={`${r}%`}
        fill="none" stroke="#6aaa88" strokeWidth="0.7"
        strokeOpacity={(0.13 - i * 0.02) * opacity} />
    ))}
    <circle cx={cx} cy={cy} r="2.5" fill="#6aaa88" fillOpacity={0.5 * opacity} />
  </svg>
);
const DecoTrend = ({ opacity = 1 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden>
    <defs>
      <pattern id="g2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={`rgba(255,255,255,${0.05 * opacity})`} strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g2)" />
    <polyline points="0%,85% 25%,65% 50%,70% 80%,28% 100%,15%"
      fill="none" stroke={`rgba(255,255,255,${0.08 * opacity})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="88%,10% 100%,15% 92%,25%"
      fill="none" stroke={`rgba(255,255,255,${0.08 * opacity})`} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── 共通: フレームワークステップ（テキスト） ─────────────────
const FrameworkText = ({ steps, color }) => (
  <div style={{ fontFamily: F.body, fontSize: 11, color, letterSpacing: "0.08em", marginBottom: 20 }}>
    {steps.join(" → ")}
  </div>
);

// ── 共通: フレームワークステップ（ビジュアル pills） ──────────
const FrameworkPills = ({ steps, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
    {steps.map((s, i) => (
      <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{
          fontFamily: F.body, fontSize: 10, letterSpacing: "0.06em",
          padding: "3px 10px", borderRadius: 20,
          background: `${accent}18`, border: `1px solid ${accent}40`,
          color: accent, whiteSpace: "nowrap",
        }}>{s}</div>
        {i < steps.length - 1 && (
          <span style={{ fontSize: 10, color: `${accent}50` }}>→</span>
        )}
      </div>
    ))}
  </div>
);

// ── 共通: フレームワークステップ（番号縦並び） ───────────────
const FrameworkSteps = ({ steps, accent }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
    {steps.map((s, i) => (
      <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontFamily: F.accent, fontSize: 10, color: `${accent}60`, minWidth: 16 }}>{String(i + 1).padStart(2, "0")}</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: `${accent}90`, letterSpacing: "0.04em" }}>{s}</div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────
// V1: ベースライン（現行）
// ─────────────────────────────────────────────────────────
function V1() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "32px 36px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[SVC.rd, SVC.bo].map((s, i) => (
          <div key={s.label} style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px", background: s.bg, border: "1px solid rgba(255,255,255,0.07)" }}>
            {i === 0 ? <DecoCircles /> : <DecoTrend />}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ marginBottom: 20 }}>{i === 0 ? <IconFlask /> : <IconArrow />}</div>
              <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: s.accent, marginBottom: 8, opacity: 0.6 }}>{s.num}</div>
              <div style={{ fontFamily: F.accent, fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 6 }}>{s.label}</div>
              <FrameworkText steps={s.framework} color={s.accent} />
              <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{s.desc}</p>
              <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.accent }}>詳しく見る →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V2: デコレーション強化 — より大きく、より印象的に
// ─────────────────────────────────────────────────────────
function V2() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "32px 36px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* R&D: 大型同心円 + グラデーションマスク */}
        <div style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px", background: "linear-gradient(140deg, #0d2218 0%, #1e4a32 55%, #0d1a14 100%)", border: "1px solid rgba(106,170,136,0.2)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden>
            {[110, 85, 62, 42, 26, 14].map((r, i) => (
              <circle key={i} cx="90%" cy="25%" r={`${r}%`}
                fill="none" stroke="#6aaa88" strokeWidth="0.8"
                strokeOpacity={0.16 - i * 0.025}/>
            ))}
            <circle cx="90%" cy="25%" r="3" fill="#6aaa88" fillOpacity="0.7" />
            {/* ラジアルグラデーションマスク */}
            <radialGradient id="rg1" cx="90%" cy="25%" r="80%" gradientUnits="userSpaceOnUse">
              <stop offset="60%" stopColor="#0d2218" stopOpacity="0"/>
              <stop offset="100%" stopColor="#0d2218" stopOpacity="0.7"/>
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#rg1)"/>
          </svg>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 20 }}><IconFlask size={40} /></div>
            <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: G.G300, marginBottom: 8, opacity: 0.6 }}>01</div>
            <div style={{ fontFamily: F.accent, fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 6 }}>Forward R&D</div>
            <FrameworkText steps={SVC.rd.framework} color={G.G300} />
            <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{SVC.rd.desc}</p>
            <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: G.G300 }}>詳しく見る →</div>
          </div>
        </div>
        {/* Buyout: 大型トレンドライン + ドット群 */}
        <div style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px", background: "linear-gradient(140deg, #080b0d 0%, #0d1a14 55%, #050709 100%)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden>
            <defs>
              <pattern id="dot2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.06)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot2)" />
            {/* メイントレンドライン */}
            <polyline points="0%,90% 20%,68% 40%,72% 65%,40% 85%,22% 100%,10%"
              fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* ハイライト点 */}
            {[[20,68],[40,72],[65,40],[85,22]].map(([x,y],i) => (
              <circle key={i} cx={`${x}%`} cy={`${y}%`} r="3" fill="rgba(255,255,255,0.15)"/>
            ))}
            <polyline points="90%,5% 100%,10% 94%,18%"
              fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 20 }}><IconArrow size={40} /></div>
            <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginBottom: 8, opacity: 0.6 }}>02</div>
            <div style={{ fontFamily: F.accent, fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 6 }}>Forward Buyout</div>
            <FrameworkText steps={SVC.bo.framework} color="rgba(255,255,255,0.5)" />
            <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{SVC.bo.desc}</p>
            <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>詳しく見る →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V3: フレームワーク Pill 可視化
// ─────────────────────────────────────────────────────────
function V3() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "32px 36px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[SVC.rd, SVC.bo].map((s, i) => (
          <div key={s.label} style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px", background: s.bg, border: "1px solid rgba(255,255,255,0.07)" }}>
            {i === 0 ? <DecoCircles /> : <DecoTrend />}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                {i === 0 ? <IconFlask /> : <IconArrow />}
                <div style={{ fontFamily: F.body, fontSize: 10, color: s.accent, opacity: 0.5, letterSpacing: "0.08em" }}>{s.sub}</div>
              </div>
              <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: s.accent, marginBottom: 8, opacity: 0.6 }}>{s.num}</div>
              <div style={{ fontFamily: F.accent, fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 16 }}>{s.label}</div>
              <FrameworkPills steps={s.framework} accent={s.accent} />
              <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{s.desc}</p>
              <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.accent }}>詳しく見る →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V4: フレームワーク 番号縦ステップ
// ─────────────────────────────────────────────────────────
function V4() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "32px 36px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[SVC.rd, SVC.bo].map((s, i) => (
          <div key={s.label} style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px", background: s.bg, border: "1px solid rgba(255,255,255,0.07)" }}>
            {i === 0 ? <DecoCircles opacity={0.6} /> : <DecoTrend opacity={0.6} />}
            <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 100px", gap: "0 20px" }}>
              <div>
                <div style={{ marginBottom: 16 }}>{i === 0 ? <IconFlask /> : <IconArrow />}</div>
                <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: s.accent, marginBottom: 8, opacity: 0.6 }}>{s.num}</div>
                <div style={{ fontFamily: F.accent, fontSize: "clamp(20px,2.2vw,30px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>{s.label}</div>
                <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{s.desc}</p>
                <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.accent }}>詳しく見る →</div>
              </div>
              {/* 右サイドにステップ縦並び */}
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FrameworkSteps steps={s.framework} accent={s.accent} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V5: 左ボーダーアクセント（エディトリアル）
// ─────────────────────────────────────────────────────────
function V5() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "32px 36px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[SVC.rd, SVC.bo].map((s, i) => (
          <div key={s.label} style={{
            position: "relative", overflow: "hidden", padding: "28px 28px 24px",
            background: s.bg,
            borderLeft: `3px solid ${i === 0 ? G.G300 : "rgba(255,255,255,0.35)"}`,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            {i === 0 ? <DecoCircles cx="85%" cy="25%" /> : <DecoTrend />}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                {i === 0 ? <IconFlask size={28} /> : <IconArrow size={28} />}
                <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: s.accent, opacity: 0.5 }}>{s.num} / {s.sub}</div>
              </div>
              <div style={{ fontFamily: F.accent, fontSize: "clamp(20px,2.2vw,30px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 6 }}>{s.label}</div>
              <FrameworkPills steps={s.framework} accent={s.accent} />
              <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{s.desc}</p>
              <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.accent }}>詳しく見る →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V6: 非対称レイアウト（R&D 60% / Buyout 40%）
// ─────────────────────────────────────────────────────────
function V6() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "32px 36px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14 }}>
        {/* R&D: 広い方 */}
        <div style={{ position: "relative", overflow: "hidden", padding: "32px 32px 28px", background: SVC.rd.bg, border: "1px solid rgba(255,255,255,0.07)" }}>
          <DecoCircles opacity={1.2} cx="90%" cy="20%" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 24 }}><IconFlask size={44} /></div>
            <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: G.G300, marginBottom: 8, opacity: 0.6 }}>01</div>
            <div style={{ fontFamily: F.accent, fontSize: "clamp(26px,3vw,40px)", fontWeight: 900, color: "#fff", lineHeight: 1.0, marginBottom: 8 }}>Forward R&D</div>
            <div style={{ fontFamily: F.body, fontSize: 11, color: G.G300, marginBottom: 16, opacity: 0.7 }}>価値の発見・証明</div>
            <FrameworkPills steps={SVC.rd.framework} accent={G.G300} />
            <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, margin: "0 0 24px" }}>{SVC.rd.desc}</p>
            <div style={{ fontFamily: F.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: G.G300 }}>詳しく見る →</div>
          </div>
        </div>
        {/* Buyout: 狭い方 */}
        <div style={{ position: "relative", overflow: "hidden", padding: "32px 24px 28px", background: SVC.bo.bg, border: "1px solid rgba(255,255,255,0.07)" }}>
          <DecoTrend />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 24 }}><IconArrow size={40} /></div>
            <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginBottom: 8, opacity: 0.6 }}>02</div>
            <div style={{ fontFamily: F.accent, fontSize: "clamp(20px,2.2vw,30px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 8 }}>Forward Buyout</div>
            <div style={{ fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>価値の統合</div>
            <FrameworkSteps steps={SVC.bo.framework} accent="rgba(255,255,255,0.5)" />
            <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 12 }}>詳しく見る →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V7: 親ボックスなし + ダーク全幅タイル
// ─────────────────────────────────────────────────────────
function V7() {
  return (
    <div>
      {/* セクションラベル（ストーン上に直置き） */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 28 }}>
        <div style={{ fontFamily: F.accent, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {[SVC.rd, SVC.bo].map((s, i) => (
          <div key={s.label} style={{ position: "relative", overflow: "hidden", padding: "40px 36px 32px", background: s.bg }}>
            {i === 0 ? <DecoCircles opacity={1.3} cx="85%" cy="20%" /> : <DecoTrend opacity={1.3} />}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: F.accent, fontSize: 9, letterSpacing: "0.2em", color: s.accent, marginBottom: 12, opacity: 0.5 }}>{s.num} — {s.sub}</div>
              <div style={{ marginBottom: 20 }}>{i === 0 ? <IconFlask size={40} /> : <IconArrow size={40} />}</div>
              <div style={{ fontFamily: F.accent, fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, color: "#fff", lineHeight: 1.0, marginBottom: 8 }}>{s.label}</div>
              <FrameworkPills steps={s.framework} accent={s.accent} />
              <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 24px" }}>{s.desc}</p>
              <div style={{ fontFamily: F.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.accent }}>詳しく見る →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// V8: タイポグラフィ主体（ゴーストテキスト + ミニマル）
// ─────────────────────────────────────────────────────────
function V8() {
  return (
    <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "36px 40px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: F.accent, fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "0.06em" }}>Value Forward</div>
        <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 16px" }} />
        <div style={{ fontFamily: F.body, fontSize: 12, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[SVC.rd, SVC.bo].map((s, i) => (
          <div key={s.label} style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px", background: s.bg, border: "1px solid rgba(255,255,255,0.07)" }}>
            {/* ゴーストテキスト背景 */}
            <div style={{
              position: "absolute", bottom: -10, right: -10,
              fontFamily: F.accent, fontSize: "clamp(72px,9vw,120px)", fontWeight: 900,
              color: i === 0 ? "rgba(106,170,136,0.06)" : "rgba(255,255,255,0.04)",
              lineHeight: 1, letterSpacing: "-0.02em", userSelect: "none",
              pointerEvents: "none",
            }}>
              {i === 0 ? "R&D" : "M&A"}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                {i === 0 ? <IconFlask size={32} /> : <IconArrow size={32} />}
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)" }}/>
                <div style={{ fontFamily: F.body, fontSize: 11, color: s.accent, opacity: 0.6 }}>{s.sub}</div>
              </div>
              <div style={{ fontFamily: F.accent, fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 6 }}>{s.label}</div>
              <FrameworkText steps={s.framework} color={s.accent} />
              <p style={{ fontFamily: F.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: "0 0 20px" }}>{s.desc}</p>
              <div style={{ fontFamily: F.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.accent }}>詳しく見る →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// メインページ
// ─────────────────────────────────────────────────────────
const VARIANTS = [
  { id: "V1", stars: 3, label: "ベースライン（現行）", note: "現在のApp.jsx。比較基準。", component: V1 },
  { id: "V2", stars: 5, label: "デコレーション強化", note: "同心円を大型化・ドット背景追加。最も印象的。◎◎", component: V2 },
  { id: "V3", stars: 5, label: "Framework Pill 可視化", note: "ステップをpill形式で表示。構造が伝わる。sub表示あり。◎◎", component: V3 },
  { id: "V4", stars: 4, label: "ステップ縦並び（右サイド）", note: "左：説明文 / 右：ステップ。情報密度高くスッキリ。", component: V4 },
  { id: "V5", stars: 4, label: "左ボーダーアクセント", note: "エディトリアル感。R&DとBuyoutの差別化が明確。", component: V5 },
  { id: "V6", stars: 4, label: "非対称 60/40", note: "R&Dを強調。コアサービスの重みを構造で表現。", component: V6 },
  { id: "V7", stars: 4, label: "親ボックスなし・全幅タイル", note: "ストーン背景に直置き。縫い目なし。ダーク感が増す。", component: V7 },
  { id: "V8", stars: 4, label: "ゴーストタイポグラフィ", note: "R&D / M&A のゴースト文字。奥行きとブランド感。", component: V8 },
];

const STAR_C = { 5: "#6aaa88", 4: "#6aaa88", 3: "#b0d4c0" };
const STARS = { 5: "★★★★★", 4: "★★★★☆", 3: "★★★☆☆" };

export default function ServicesVariants() {
  const [active, setActive] = useState(null);
  const list = active ? VARIANTS.filter(v => v.id === active) : VARIANTS;

  return (
    <div style={{ fontFamily: F.body, background: STONE, minHeight: "100vh" }}>
      {/* ナビ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50, background: "rgba(237,232,223,0.97)",
        backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(9,26,20,0.1)",
        padding: "12px 32px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
      }}>
        <span style={{ fontFamily: F.accent, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(9,12,14,0.4)", marginRight: 8 }}>
          Value Forward — Variant Lab
        </span>
        <button onClick={() => setActive(null)} style={{ fontFamily: F.body, fontSize: 12, padding: "5px 14px", borderRadius: 2, border: `1px solid ${!active ? "#2d5a40" : "rgba(9,26,20,0.2)"}`, background: !active ? "rgba(45,90,64,0.08)" : "transparent", color: !active ? "#2d5a40" : "rgba(9,12,14,0.45)", cursor: "pointer" }}>ALL</button>
        {VARIANTS.map(v => (
          <button key={v.id} onClick={() => setActive(active === v.id ? null : v.id)} style={{ fontFamily: F.body, fontSize: 12, padding: "5px 14px", borderRadius: 2, border: `1px solid ${active === v.id ? "#2d5a40" : "rgba(9,26,20,0.2)"}`, background: active === v.id ? "rgba(45,90,64,0.08)" : "transparent", color: active === v.id ? "#2d5a40" : "rgba(9,12,14,0.45)", cursor: "pointer" }}>{v.id}</button>
        ))}
      </div>

      {/* 一覧 */}
      <div style={{ padding: "48px 8vw", display: "flex", flexDirection: "column", gap: 64 }}>
        {list.map(v => {
          const C = v.component;
          return (
            <div key={v.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ fontFamily: F.accent, fontSize: 16, fontWeight: 900, color: "rgba(9,12,14,0.15)" }}>{v.id}</span>
                <span style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: "rgba(9,12,14,0.8)" }}>{v.label}</span>
                <span style={{ fontFamily: F.body, fontSize: 17, color: STAR_C[v.stars] }}>{STARS[v.stars]}</span>
                <span style={{ fontFamily: F.body, fontSize: 13, color: "rgba(9,12,14,0.4)" }}>— {v.note}</span>
              </div>
              <div style={{ maxWidth: 1080 }}>
                <C />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
