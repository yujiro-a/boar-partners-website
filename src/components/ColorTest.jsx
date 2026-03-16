const FONTS = {
  accent: "'Big Shoulders Display', sans-serif",
  body:   "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

// Philosophy→Footer の連続グラデーション（各パターンのContact〜Footer部分だけ変わる）
// セクション比率（高さ%）: Philosophy 15% / WhatWeDo 15% / Services 15% / About 15% / Contact 25% / Footer 15%
const SHARED_TOP = [
  { name: "Philosophy", stop: "0%",   color: "#090c0e" },
  { name: "",           stop: "8%",   color: "#0d1a14" },
  { name: "What We Do", stop: "15%",  color: "#0d1a14" },
  { name: "",           stop: "23%",  color: "#152f26" },
  { name: "Services",   stop: "30%",  color: "#152f26" },
  { name: "",           stop: "38%",  color: "#1f3d2e" },
  { name: "About",      stop: "45%",  color: "#1f3d2e" },
  { name: "",           stop: "60%",  color: "#2d5a40" },
  // ↑ここまで共通。Contact(60%〜85%)→Footer(85%〜100%)が各パターンで変わる
];

// About(45%)から徐々に明るくなる → Contact頂点 → Footerで暗く締まる
const PATTERNS = [
  {
    id: "1", name: "Mist — slow", sub: "About後半から緩やかにミスト",
    contactColor: "#e0eeea",
    gradient: `linear-gradient(180deg,
      #090c0e 0%, #0d1a14 15%, #152f26 30%,
      #1f3d2e 42%, #3a6e52 55%, #b0d4c0 72%, #e0eeea 80%,
      #090c0e 100%)`,
    contactDark: true,
  },
  {
    id: "2", name: "White — slow", sub: "About後半から緩やかに白",
    contactColor: "#f0f4f2",
    gradient: `linear-gradient(180deg,
      #090c0e 0%, #0d1a14 15%, #152f26 30%,
      #1f3d2e 42%, #4a7a5e 55%, #c8ddd5 72%, #f0f4f2 80%,
      #090c0e 100%)`,
    contactDark: true,
  },
  {
    id: "3", name: "Stone — slow", sub: "About後半からグレー光",
    contactColor: "#d4d8d6",
    gradient: `linear-gradient(180deg,
      #090c0e 0%, #0d1a14 15%, #152f26 30%,
      #1f3d2e 42%, #4a6255 55%, #8a9e96 70%, #d4d8d6 80%,
      #090c0e 100%)`,
    contactDark: true,
  },
  {
    id: "現行", name: "Current", sub: "比較用 — #5a9e72",
    contactColor: "#5a9e72",
    gradient: `linear-gradient(180deg,
      #090c0e 0%, #0d1a14 15%, #152f26 30%, #1f3d2e 45%, #2d5a40 60%,
      #5a9e72 78%, #090c0e 100%)`,
    contactDark: false,
  },
];

// セクションラベル（グラデーション上の位置）
const SECTION_LABELS = [
  { name: "Philosophy", pct: 4,  dark: false },
  { name: "What We Do", pct: 19, dark: false },
  { name: "Services",   pct: 34, dark: false },
  { name: "About",      pct: 49, dark: false },
  { name: "Contact",    pct: 67, dark: null  }, // パターンによって変わる
  { name: "Footer",     pct: 88, dark: false },
];

function PatternStrip({ p, index }) {
  return (
    <div style={{
      display: "flex", alignItems: "stretch",
      borderBottom: "2px solid #d4d4d2",
    }}>
      {/* 左ラベル */}
      <div style={{
        width: 140, flexShrink: 0,
        background: "#efefed",
        padding: "20px 16px",
        display: "flex", flexDirection: "column", justifyContent: "flex-start",
        borderRight: "1px solid #d4d4d2",
        position: "sticky", top: 0,
      }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 22, fontWeight: 900,
          color: index === 5 ? "#848686" : "#090c0e", lineHeight: 1,
        }}>
          {p.id === "現行" ? "現行" : `Pat.${p.id}`}
        </div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
          color: "#2d5a40", marginTop: 6, lineHeight: 1.2,
        }}>{p.name}</div>
        <div style={{
          fontFamily: FONTS.body, fontSize: 11, color: "#848686",
          marginTop: 4,
        }}>{p.sub}</div>
        <div style={{
          marginTop: 16,
          width: 24, height: 24, borderRadius: "50%",
          background: p.contactColor,
          border: "2px solid rgba(0,0,0,0.1)",
        }} />
        <div style={{
          fontFamily: FONTS.body, fontSize: 9, color: "#c2c2c3",
          marginTop: 4,
        }}>Contact peak</div>
      </div>

      {/* グラデーション本体 */}
      <div style={{
        flex: 1,
        background: p.gradient,
        position: "relative",
        minHeight: 600,
      }}>
        {/* セクション境界線 + ラベル */}
        {SECTION_LABELS.map((sec) => {
          const isDark = sec.dark === null ? p.contactDark : sec.dark;
          return (
            <div key={sec.name} style={{
              position: "absolute",
              top: `${sec.pct}%`,
              left: 0, right: 0,
              borderTop: `1px solid ${isDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)"}`,
              padding: "6px 24px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{
                fontFamily: FONTS.accent, fontSize: 9, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.22)",
              }}>{sec.name}</div>
            </div>
          );
        })}

        {/* Contact ゾーン コンテンツイメージ */}
        <div style={{
          position: "absolute", top: "64%", left: 24, right: 24,
        }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900,
            color: p.contactDark ? "rgba(0,0,0,0.75)" : "#ffffff",
            lineHeight: 1.1,
          }}>まずは、話しましょう。</div>
          <div style={{
            marginTop: 10, display: "inline-block",
            padding: "8px 20px",
            border: `1px solid ${p.contactDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)"}`,
          }}>
            <div style={{
              fontFamily: FONTS.accent, fontSize: 9, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: p.contactDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)",
            }}>送信する</div>
          </div>
        </div>

        {/* Footer コンテンツイメージ */}
        <div style={{
          position: "absolute", bottom: 16, left: 24, right: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{
            fontFamily: FONTS.body, fontSize: 9,
            color: "rgba(255,255,255,0.2)",
          }}>© 2026 BOAR Partners</div>
        </div>
      </div>
    </div>
  );
}

export default function ColorTest() {
  return (
    <div style={{ background: "#e8e8e6", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');`}</style>

      {/* ヘッダー */}
      <div style={{
        background: "#efefed",
        borderBottom: "2px solid #d4d4d2",
        padding: "28px 24px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#848686", marginBottom: 4,
        }}>Philosophy → Footer — Full Page Color Flow</div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 28, fontWeight: 900, color: "#090c0e",
        }}>カラーパターン比較 × 6</div>
        <div style={{
          fontFamily: FONTS.body, fontSize: 11, color: "#848686", marginTop: 4,
        }}>Philosophy(0%)→About(45%)は全パターン共通 / Contact〜Footerが変化</div>
      </div>

      {/* パターン一覧 */}
      {PATTERNS.map((p, i) => (
        <PatternStrip key={p.id} p={p} index={i} />
      ))}
    </div>
  );
}
