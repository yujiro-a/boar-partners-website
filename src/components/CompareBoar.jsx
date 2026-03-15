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

const DG   = "#0d2018";
const STN  = "#f0ece4";
const WH   = "rgba(255,255,255,0.88)";
const DIM  = "rgba(255,255,255,0.28)";
const LINE = "rgba(255,255,255,0.09)";
const GRN  = "#2d5a40";

const Label = ({ text, id }) => (
  <div style={{
    position: "sticky", top: 48,
    fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    background: "rgba(4,13,9,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "10px 40px", color: "rgba(255,255,255,0.45)",
    zIndex: 10,
  }}>
    <span style={{ color: "rgba(255,255,255,0.18)", marginRight: 12 }}>{id}</span>
    {text}
  </div>
);

// ── A: 縦積みタイポグラフィ（現在実装）
function PatternA() {
  return (
    <section id="pa" style={{ background: DG, padding: "80px 40px" }}>
      <Label id="A" text="Vertical Typography — 縦積み（現在実装）" />
      <div style={{ maxWidth: 900, margin: "48px auto 0" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", color: WH, lineHeight: 1.3, marginBottom: 56 }}>
          前にしか、進まない。
        </p>
        {BOAR.map((item, i) => (
          <div key={item.letter} style={{
            display: "flex", alignItems: "center", gap: 0,
            borderTop: i === 0 ? `1px solid ${LINE}` : "none",
            borderBottom: `1px solid ${LINE}`,
            padding: "8px 0",
          }}>
            <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(72px,13vw,180px)", color: WH, lineHeight: 1, minWidth: "1.1ch", flexShrink: 0, letterSpacing: "-0.02em" }}>
              {item.letter}
            </div>
            <div style={{ paddingLeft: "0.18em", paddingBottom: "0.1em" }}>
              <div style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: "clamp(18px,2.8vw,40px)", color: "rgba(255,255,255,0.82)", letterSpacing: "0.02em", lineHeight: 1.1 }}>{item.rest}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "clamp(11px,1.2vw,14px)", color: DIM, marginTop: 6 }}>{item.ja}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── B: フル壁面 — 4文字が全幅に並び、フレーズが下
function PatternB() {
  return (
    <section id="pb" style={{ background: DG, padding: "80px 40px" }}>
      <Label id="B" text="Wall Letters — BOAR を壁面全幅に並べる" />
      <div style={{ maxWidth: 1100, margin: "48px auto 0" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", color: WH, lineHeight: 1.3, marginBottom: 56 }}>
          前にしか、進まない。
        </p>
        {/* 4文字横並び */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginBottom: 0 }}>
          {BOAR.map((item, i) => (
            <div key={item.letter} style={{
              borderLeft: i > 0 ? `1px solid ${LINE}` : "none",
              padding: "0 24px 0 0",
            }}>
              <div style={{
                fontFamily: FONTS.accent, fontWeight: 900,
                fontSize: "clamp(80px, 15vw, 220px)",
                color: WH, lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}>
                {item.letter}
              </div>
            </div>
          ))}
        </div>
        {/* フレーズ横並び */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${LINE}`, paddingTop: 24, marginTop: 8 }}>
          {BOAR.map((item, i) => (
            <div key={item.letter} style={{ borderLeft: i > 0 ? `1px solid ${LINE}` : "none", padding: "0 16px 0 0" }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(11px,1.4vw,16px)", color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1.4 }}>
                {item.letter}{item.rest}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 12, color: DIM, marginTop: 6 }}>{item.ja}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── C: ストーン背景・非対称グリッド — B 大 / OAR 小
function PatternC() {
  return (
    <section id="pc" style={{ background: STN, padding: "80px 40px" }}>
      <Label id="C" text="Asymmetric Grid (Stone) — B を突出・OAR 小さく" />
      <div style={{ maxWidth: 1100, margin: "48px auto 0" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", color: "#1a2e25", lineHeight: 1.3, marginBottom: 56 }}>
          前にしか、進まない。
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 2 }}>
          {/* B — 大 */}
          <div style={{ gridColumn: "1", gridRow: "1 / 3", background: "#1a2e25", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(120px,18vw,260px)", color: WH, lineHeight: 0.85, letterSpacing: "-0.03em" }}>B</div>
            <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(16px,2.5vw,30px)", color: "rgba(255,255,255,0.75)", fontWeight: 700, marginTop: 16 }}>uild the Business</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>事業を構築する</div>
          </div>
          {/* O A R — 小 */}
          {BOAR.slice(1).map((item) => (
            <div key={item.letter} style={{ background: STN, border: `1px solid rgba(26,46,37,0.12)`, padding: "32px 36px", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(48px,7vw,88px)", color: GRN, lineHeight: 1, letterSpacing: "-0.02em" }}>{item.letter}</div>
              <div>
                <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(13px,1.8vw,20px)", color: "#1a2e25", fontWeight: 700 }}>{item.rest}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(26,46,37,0.4)", marginTop: 4 }}>{item.ja}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── D: ミニマル文字列 — 全幅・左端頭文字ハイライト・横スクロール感
function PatternD() {
  return (
    <section id="pd" style={{ background: "#080f0c", padding: "80px 0 80px 40px", overflow: "hidden" }}>
      <Label id="D" text="Minimal Highlight — 頭文字だけ緑、フレーズ全幅" />
      <div style={{ margin: "48px 0 0" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", color: WH, lineHeight: 1.3, marginBottom: 64, paddingRight: 40 }}>
          前にしか、進まない。
        </p>
        {BOAR.map((item, i) => (
          <div key={item.letter} style={{
            display: "flex", alignItems: "baseline",
            borderTop: `1px solid rgba(255,255,255,0.05)`,
            padding: "20px 40px 20px 0",
            gap: 0,
          }}>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(56px,10vw,140px)", color: "#3DA860", lineHeight: 1, letterSpacing: "-0.02em", minWidth: "1.05ch" }}>
              {item.letter}
            </span>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: "clamp(56px,10vw,140px)", color: "rgba(255,255,255,0.12)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {item.rest}
            </span>
            <span style={{ fontFamily: FONTS.body, fontSize: "clamp(11px,1.2vw,14px)", color: DIM, marginLeft: "auto", paddingLeft: 24, whiteSpace: "nowrap", alignSelf: "center" }}>
              {item.ja}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── E: インタラクティブ縦ロール — ホバーで行が展開
function PatternE() {
  const [active, setActive] = useState(null);
  return (
    <section id="pe" style={{ background: DG, padding: "80px 40px" }}>
      <Label id="E" text="Interactive Expand — ホバーで行が展開（スタティック版）" />
      <div style={{ maxWidth: 1000, margin: "48px auto 0" }}>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", color: WH, lineHeight: 1.3, marginBottom: 56 }}>
          前にしか、進まない。
        </p>
        {BOAR.map((item, i) => {
          const isActive = active === i;
          return (
            <div
              key={item.letter}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                display: "flex", alignItems: "center",
                borderBottom: `1px solid rgba(255,255,255,${isActive ? "0.15" : "0.06"})`,
                padding: isActive ? "28px 0" : "16px 0",
                cursor: "default",
                transition: "all 0.35s ease",
                background: isActive ? "rgba(255,255,255,0.03)" : "transparent",
                overflow: "hidden",
              }}
            >
              <div style={{
                fontFamily: FONTS.accent, fontWeight: 900,
                fontSize: isActive ? "clamp(80px,14vw,180px)" : "clamp(40px,7vw,88px)",
                color: isActive ? WH : "rgba(255,255,255,0.22)",
                lineHeight: 1, minWidth: isActive ? "1.1ch" : "1.6ch",
                letterSpacing: "-0.02em",
                transition: "all 0.35s ease",
                flexShrink: 0,
              }}>
                {item.letter}
              </div>
              <div style={{
                paddingLeft: "0.2em",
                opacity: isActive ? 1 : 0.4,
                transition: "opacity 0.3s ease",
              }}>
                <div style={{
                  fontFamily: FONTS.accent, fontWeight: 700,
                  fontSize: isActive ? "clamp(20px,3vw,44px)" : "clamp(14px,2vw,26px)",
                  color: WH, letterSpacing: "0.02em", lineHeight: 1.1,
                  transition: "font-size 0.35s ease",
                }}>
                  {item.rest}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 13, color: DIM,
                  marginTop: isActive ? 8 : 0,
                  maxHeight: isActive ? 40 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.35s ease, margin-top 0.35s ease",
                }}>
                  {item.ja}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function CompareBoar() {
  return (
    <div style={{ background: "#020908" }}>
      <PatternA />
      <PatternB />
      <PatternC />
      <PatternD />
      <PatternE />
    </div>
  );
}
