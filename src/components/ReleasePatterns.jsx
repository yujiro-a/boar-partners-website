import { useState } from "react";
import { FONTS, COLORS } from "./shared.jsx";

const G1 = COLORS.G100;
const G2 = COLORS.G200;
const G3 = COLORS.G300;
const ST = "#e8e2d8";
const ST2 = "#ede8df";
const BG = "#090c0e";

const ITEMS = [
  { id: 1, type: "news",   typeLabel: "ニュース", date: "2026-03", title: "BOAR Partners、始動。",                               excerpt: "技術の価値を産業に届けきるために。M&A × 事業開発 × 資金調達を一気通貫で支援する BOAR Partners を立ち上げました。" },
  { id: 2, type: "case",   typeLabel: "実績",     date: "2026-03", title: "commissure × 製造業 — 事業開発・M&A支援",             excerpt: "ディープテック領域への新規参入を検討する製造業クライアントへ、戦略立案から候補先探索・交渉支援までを伴走。" },
  { id: 3, type: "column", typeLabel: "コラム",   date: "2026-03", title: "なぜ、日本の技術は産業にならないのか",                excerpt: "研究室と市場の間にあるキャズムを構造的に分解する。資金調達・事業設計・M&A——3つの壁を越えるための視点。" },
];

const BADGE_STYLE = {
  news:   { bg: G2,                         color: "#fff" },
  case:   { bg: "#8B5CF6",                  color: "#fff" },
  column: { bg: "rgba(9,12,14,0.1)",        color: "rgba(9,12,14,0.6)" },
};
const BADGE_STYLE_DARK = {
  news:   { bg: G2,       color: "#fff" },
  case:   { bg: "#8B5CF6",color: "#fff" },
  column: { bg: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" },
};

function Badge({ type, label, dark = false }) {
  const s = dark ? BADGE_STYLE_DARK[type] : BADGE_STYLE[type];
  return (
    <span style={{
      fontFamily: FONTS.body, fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 2,
      background: s.bg, color: s.color, flexShrink: 0,
    }}>{label}</span>
  );
}

function Label({ text }) {
  return <div style={{ fontFamily: FONTS.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: G3, textTransform: "uppercase", marginBottom: 24, opacity: 0.7 }}>{text}</div>;
}

// ─── P01: 白カードグリッド（現行）─────────────────────────────
function P01() {
  return (
    <section style={{ background: ST2, padding: "48px 32px" }}>
      <Label text="P01 — 白カードグリッド（現行）" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {ITEMS.map((item) => (
          <div key={item.id} style={{ background: "#fff", borderRadius: 2, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge type={item.type} label={item.typeLabel} />
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,12,14,0.35)" }}>{item.date}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: "#0d1a14", lineHeight: 1.45 }}>{item.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(9,12,14,0.55)", lineHeight: 1.85, margin: 0, flexGrow: 1 }}>{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── P02: ボーダーのみカード（ストーン背景）────────────────────
function P02() {
  return (
    <section style={{ background: ST2, padding: "48px 32px" }}>
      <Label text="P02 — ボーダーのみカード" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {ITEMS.map((item) => (
          <div key={item.id} style={{ border: "1.5px solid rgba(9,12,14,0.18)", borderRadius: 2, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge type={item.type} label={item.typeLabel} />
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,12,14,0.35)" }}>{item.date}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: "#0d1a14", lineHeight: 1.45 }}>{item.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(9,12,14,0.55)", lineHeight: 1.85, margin: 0, flexGrow: 1 }}>{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── P03: ダークカードグリッド──────────────────────────────────
function P03() {
  return (
    <section style={{ background: BG, padding: "48px 32px" }}>
      <Label text="P03 — ダークカードグリッド" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {ITEMS.map((item) => (
          <div key={item.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge type={item.type} label={item.typeLabel} dark />
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.date}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.45 }}>{item.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: 0, flexGrow: 1 }}>{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── P04: 横リスト型（日付左・コンテンツ右）───────────────────
function P04() {
  return (
    <section style={{ background: ST2, padding: "48px 32px" }}>
      <Label text="P04 — 横リスト型" />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {ITEMS.map((item, i) => (
          <div key={item.id} style={{
            display: "grid", gridTemplateColumns: "100px 1fr",
            gap: "0 40px", padding: "28px 0",
            borderTop: i === 0 ? "1px solid rgba(9,12,14,0.15)" : "none",
            borderBottom: "1px solid rgba(9,12,14,0.15)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,12,14,0.35)", letterSpacing: "0.05em" }}>{item.date}</span>
              <Badge type={item.type} label={item.typeLabel} />
            </div>
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: "#0d1a14", lineHeight: 1.4, marginBottom: 10 }}>{item.title}</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(9,12,14,0.55)", lineHeight: 1.85, margin: 0 }}>{item.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── P05: タイムライン型（縦線 + ドット）──────────────────────
function P05() {
  const DOT = { news: G2, case: "#8B5CF6", column: G3 };
  return (
    <section style={{ background: BG, padding: "48px 32px" }}>
      <Label text="P05 — タイムライン型" />
      <div style={{ position: "relative", paddingLeft: 32 }}>
        <div style={{ position: "absolute", left: 7, top: 12, bottom: 12, width: 1, background: "rgba(255,255,255,0.1)" }} />
        {ITEMS.map((item, i) => (
          <div key={item.id} style={{ position: "relative", marginBottom: i < ITEMS.length - 1 ? 40 : 0 }}>
            <div style={{
              position: "absolute", left: -32 + 2, top: 6,
              width: 12, height: 12, borderRadius: "50%",
              background: DOT[item.type], border: `2px solid ${BG}`,
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Badge type={item.type} label={item.typeLabel} dark />
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.date}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 8 }}>{item.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: 0 }}>{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── P06: マガジン型（1枚大 + 2枚小）─────────────────────────
function P06() {
  const [main, ...rest] = ITEMS;
  return (
    <section style={{ background: ST2, padding: "48px 32px" }}>
      <Label text="P06 — マガジン型（1大 + 2小）" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* メイン */}
        <div style={{ background: G1, borderRadius: 2, padding: "40px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Badge type={main.type} label={main.typeLabel} dark />
            <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{main.date}</span>
          </div>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>{main.title}</div>
          <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, margin: 0 }}>{main.excerpt}</p>
        </div>
        {/* サブ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {rest.map((item) => (
            <div key={item.id} style={{ background: "#fff", borderRadius: 2, padding: "24px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Badge type={item.type} label={item.typeLabel} />
                <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,12,14,0.35)" }}>{item.date}</span>
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: "#0d1a14", lineHeight: 1.4 }}>{item.title}</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,12,14,0.55)", lineHeight: 1.8, margin: 0 }}>{item.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── P07: ミニマルリスト（タイトルのみ）───────────────────────
function P07() {
  return (
    <section style={{ background: ST2, padding: "48px 32px" }}>
      <Label text="P07 — ミニマルリスト（タイトルのみ）" />
      <div style={{ maxWidth: 720 }}>
        {ITEMS.map((item, i) => (
          <div key={item.id} style={{
            display: "flex", alignItems: "baseline", gap: 24,
            padding: "18px 0",
            borderBottom: "1px solid rgba(9,12,14,0.12)",
            borderTop: i === 0 ? "1px solid rgba(9,12,14,0.12)" : "none",
          }}>
            <span style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(9,12,14,0.35)", flexShrink: 0, letterSpacing: "0.06em" }}>{item.date}</span>
            <Badge type={item.type} label={item.typeLabel} />
            <span style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: "#0d1a14", lineHeight: 1.4, flexGrow: 1 }}>{item.title}</span>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, color: G3, flexShrink: 0 }}>→</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── P08: カテゴリ軸グルーピング──────────────────────────────
function P08() {
  const groups = [
    { key: "news",   label: "ニュース",   color: G2 },
    { key: "case",   label: "実績",       color: "#8B5CF6" },
    { key: "column", label: "コラム",     color: G3 },
  ];
  return (
    <section style={{ background: BG, padding: "48px 32px" }}>
      <Label text="P08 — カテゴリ軸グルーピング" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
        {groups.map((g) => {
          const items = ITEMS.filter((it) => it.type === g.key);
          return (
            <div key={g.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${g.color}` }}>
                <span style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, color: g.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{g.label}</span>
              </div>
              {items.length > 0 ? items.map((item) => (
                <div key={item.id} style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>{item.date}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.45, marginBottom: 8 }}>{item.title}</div>
                  <p style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, margin: 0 }}>{item.excerpt}</p>
                </div>
              )) : (
                <div style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Coming soon</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── P09: エディトリアル（大タイポ × 横線区切り）──────────────
function P09() {
  return (
    <section style={{ background: ST2, padding: "48px 32px" }}>
      <Label text="P09 — エディトリアル（大タイポ × 横線）" />
      {ITEMS.map((item, i) => (
        <div key={item.id} style={{
          display: "grid", gridTemplateColumns: "56px 1fr auto",
          gap: "0 32px", alignItems: "start", padding: "32px 0",
          borderTop: i === 0 ? "1.5px solid rgba(9,12,14,0.2)" : "none",
          borderBottom: "1.5px solid rgba(9,12,14,0.2)",
        }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, color: "rgba(9,12,14,0.08)", lineHeight: 1 }}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Badge type={item.type} label={item.typeLabel} />
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,12,14,0.35)" }}>{item.date}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: "clamp(17px,1.8vw,22px)", fontWeight: 700, color: "#0d1a14", lineHeight: 1.35, marginBottom: 10 }}>{item.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(9,12,14,0.55)", lineHeight: 1.85, margin: 0 }}>{item.excerpt}</p>
          </div>
          <span style={{ fontFamily: FONTS.body, fontSize: 13, color: G3, paddingTop: 40 }}>→</span>
        </div>
      ))}
    </section>
  );
}

// ─── P10: ダーク × アクセントライン（左縁カラーバー）──────────
function P10() {
  const LINE = { news: G2, case: "#8B5CF6", column: G3 };
  return (
    <section style={{ background: G1, padding: "48px 32px" }}>
      <Label text="P10 — ダーク × 左縁カラーバー" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {ITEMS.map((item) => (
          <div key={item.id} style={{
            background: "rgba(255,255,255,0.035)",
            borderLeft: `3px solid ${LINE[item.type]}`,
            padding: "24px 20px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge type={item.type} label={item.typeLabel} dark />
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.date}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.45 }}>{item.title}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0 }}>{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── メイン ──────────────────────────────────────────────────
const PATTERNS = [
  { id: "P01", label: "白カードグリッド（現行）",          C: P01 },
  { id: "P02", label: "ボーダーのみカード",                C: P02 },
  { id: "P03", label: "ダークカードグリッド",              C: P03 },
  { id: "P04", label: "横リスト型",                       C: P04 },
  { id: "P05", label: "タイムライン型",                   C: P05 },
  { id: "P06", label: "マガジン型（1大+2小）",            C: P06 },
  { id: "P07", label: "ミニマルリスト",                   C: P07 },
  { id: "P08", label: "カテゴリ軸グルーピング",           C: P08 },
  { id: "P09", label: "エディトリアル（大ナンバー）",     C: P09 },
  { id: "P10", label: "ダーク × 左縁カラーバー",          C: P10 },
];

export default function ReleasePatterns() {
  const [active, setActive] = useState(null);

  const visible = active ? PATTERNS.filter((p) => p.id === active) : PATTERNS;

  return (
    <div style={{ background: "#111", minHeight: "100vh", fontFamily: FONTS.body }}>
      {/* コントロール */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(17,17,17,0.95)", backdropFilter: "blur(8px)", padding: "12px 24px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginRight: 8 }}>Releases パターン比較</span>
        <button onClick={() => setActive(null)} style={{ fontFamily: FONTS.body, fontSize: 12, padding: "4px 14px", borderRadius: 2, border: `1px solid ${active === null ? G3 : "rgba(255,255,255,0.2)"}`, background: active === null ? G3 : "transparent", color: active === null ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer" }}>ALL</button>
        {PATTERNS.map((p) => (
          <button key={p.id} onClick={() => setActive(p.id === active ? null : p.id)} style={{ fontFamily: FONTS.body, fontSize: 12, padding: "4px 14px", borderRadius: 2, border: `1px solid ${active === p.id ? G3 : "rgba(255,255,255,0.2)"}`, background: active === p.id ? G3 : "transparent", color: active === p.id ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer" }}>{p.id}</button>
        ))}
      </div>

      {/* パターン */}
      {visible.map((p) => (
        <div key={p.id} style={{ marginBottom: 2 }}>
          <div style={{ background: "#1a1a1a", padding: "8px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, color: G3, letterSpacing: "0.1em" }}>{p.id}</span>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{p.label}</span>
          </div>
          <p.C />
        </div>
      ))}
    </div>
  );
}
