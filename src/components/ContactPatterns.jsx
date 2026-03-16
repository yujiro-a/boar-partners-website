import { useState } from "react";
import { motion } from "framer-motion";
import { FONTS, COLORS } from "./shared.jsx";

const BG  = "#090c0e";
const G   = COLORS.G300;
const G1  = COLORS.G100;
const G2  = COLORS.G200;
const ST  = "#e8e2d8"; // stone
const EMAIL = "hello@boarpartners.com";

// ─── P01: 現状（まずは話しましょう + ボタン）───────────────────
function P01() {
  return (
    <section style={{ background: ST, padding: "80px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G2, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#0d1a14", lineHeight: 1.1, marginBottom: 24 }}>まずは、話しましょう。</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: "rgba(9,12,14,0.5)", lineHeight: 1.9, marginBottom: 40 }}>M&A・事業開発・資金調達のご相談はフォームよりお気軽にどうぞ。</p>
        <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff", textDecoration: "none", background: G2, padding: "20px 48px" }}>
          お問い合わせ <span style={{ fontSize: 18 }}>→</span>
        </a>
      </div>
    </section>
  );
}

// ─── P02: ミニマル（メールアドレスだけ）───────────────────────
function P02() {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{ background: BG, padding: "100px 32px", textAlign: "center" }}>
      <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 40, opacity: 0.6 }}>Contact</div>
      <a
        href={`mailto:${EMAIL}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: FONTS.accent, fontSize: "clamp(18px,2.5vw,32px)", fontWeight: 700,
          color: hovered ? G : "rgba(255,255,255,0.9)", textDecoration: "none",
          letterSpacing: "0.04em", transition: "color 0.3s",
          borderBottom: `1px solid ${hovered ? G : "rgba(255,255,255,0.2)"}`,
          paddingBottom: 4,
        }}
      >
        {EMAIL}
      </a>
    </section>
  );
}

// ─── P03: 大タイポ1行 + メール小 ──────────────────────────────
function P03() {
  return (
    <section style={{ background: BG, padding: "100px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 32, opacity: 0.6 }}>Contact</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(40px,7vw,96px)", fontWeight: 900, color: "white", lineHeight: 1.0, marginBottom: 48 }}>
          話しましょう。
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 40, height: 1, background: G }} />
          <a href={`mailto:${EMAIL}`} style={{ fontFamily: FONTS.accent, fontSize: 15, color: G, textDecoration: "none", letterSpacing: "0.04em" }}>{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}

// ─── P04: 左右分割（テキスト左 / メール + ボタン右）──────────
function P04() {
  return (
    <section style={{ background: G1, padding: "80px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>Contact</div>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 700, color: "white", lineHeight: 1.15 }}>
            一緒に、動こう。
          </div>
        </div>
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: 64 }}>
          <a href={`mailto:${EMAIL}`} style={{ display: "block", fontFamily: FONTS.accent, fontSize: 14, color: G, textDecoration: "none", letterSpacing: "0.04em", marginBottom: 32 }}>{EMAIL}</a>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 36px", transition: "all 0.3s" }}>
            Contact Form <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── P05: フルスクリーン暗 + 超大テキスト中央 ─────────────────
function P05() {
  return (
    <section style={{ background: BG, padding: "120px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(120px,20vw,240px)", color: "rgba(255,255,255,0.015)", letterSpacing: "-0.04em", userSelect: "none" }}>CONTACT</div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(36px,6vw,80px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 48 }}>
          話しましょう。
        </div>
        <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 16, fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: G, textDecoration: "none" }}>
          <span style={{ width: 40, height: 1, background: G, display: "inline-block" }} />
          Contact
          <span style={{ width: 40, height: 1, background: G, display: "inline-block" }} />
        </a>
      </div>
    </section>
  );
}

// ─── P06: stone背景 + 左寄せ・ラフな文体 ─────────────────────
function P06() {
  return (
    <section style={{ background: ST, padding: "80px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G2, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,56px)", fontWeight: 700, color: "#0d1a14", lineHeight: 1.15, marginBottom: 32 }}>
          気軽に声をかけてほしい。
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/contact" style={{ fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", textDecoration: "none", background: "#0d1a14", padding: "16px 40px" }}>
            お問い合わせ →
          </a>
          <a href={`mailto:${EMAIL}`} style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(9,12,14,0.5)", textDecoration: "none" }}>{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}

// ─── P07: 縦線 + 番号付き（エディトリアル）─────────────────────
function P07() {
  return (
    <section style={{ background: BG, padding: "80px 8vw", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "80px 1fr", gap: "0 48px", alignItems: "start" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(40px,5vw,72px)", fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>04</div>
        <div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>Contact</div>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 32 }}>話しましょう。</div>
          <a href="/contact" style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: G, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12 }}>
            Contact Form <span style={{ width: 32, height: 1, background: G, display: "inline-block" }} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── P08: グリーン帯（アクセントカラー全面）──────────────────
function P08() {
  return (
    <section style={{ background: G2, padding: "80px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 40 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "white", lineHeight: 1.1 }}>
          一緒に動きませんか。
        </div>
        <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: G2, textDecoration: "none", background: "white", padding: "18px 48px" }}>
          Contact <span>→</span>
        </a>
      </div>
    </section>
  );
}

// ─── P09: タイポグラフィのみ・極限ミニマル ───────────────────
function P09() {
  return (
    <section style={{ background: BG, padding: "120px 8vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <a href="/contact" style={{ display: "block", textDecoration: "none" }}>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(48px,9vw,120px)", fontWeight: 700, color: "white", lineHeight: 1.0, letterSpacing: "-0.02em", transition: "color 0.3s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = G}
            onMouseLeave={(e) => e.currentTarget.style.color = "white"}
          >
            Contact.
          </div>
        </a>
      </div>
    </section>
  );
}

// ─── P09-B: 帯全体ホバー（背景フェード）──────────────────────
function P09B() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        background: hovered ? "rgba(255,255,255,0.04)" : BG,
        padding: "120px 8vw",
        transition: "background 0.4s",
        cursor: "pointer",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(48px,9vw,120px)",
          fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: hovered ? G : "white",
          transition: "color 0.4s",
        }}>
          Contact.
        </div>
      </div>
    </a>
  );
}

// ─── P09-C: 帯全体ホバー + 右矢印出現 ────────────────────────
function P09C() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        background: BG,
        padding: "120px 8vw",
        borderTop: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.4s",
        cursor: "pointer",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(48px,9vw,120px)",
          fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: hovered ? G : "white",
          transition: "color 0.4s",
        }}>
          Contact.
        </div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: G, display: "flex", alignItems: "center", gap: 16,
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
          paddingBottom: 8,
        }}>
          <span style={{ width: 48, height: 1, background: G, display: "inline-block" }} />
          Form
        </div>
      </div>
    </a>
  );
}

// ─── P10: 2行キャッチ + フォームリンク右下 ───────────────────
function P10() {
  return (
    <section style={{ background: "#0d1a14", padding: "100px 8vw", position: "relative" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 32 }}>Contact</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4.5vw,60px)", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 8 }}>
          商売の話、しましょう。
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: "clamp(14px,1.5vw,18px)", color: G, lineHeight: 1.6, marginBottom: 56 }}>
          BOAR Partners
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="/contact" style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 16 }}>
            お問い合わせはこちら
            <span style={{ width: 48, height: 1, background: "white", display: "inline-block" }} />
          </a>
        </div>
      </div>
    </section>
  );
}

const PATTERNS = [
  { id: "01", label: "現状（まずは話しましょう）", Component: P01 },
  { id: "02", label: "ミニマル — メールアドレスのみ", Component: P02 },
  { id: "03", label: "大タイポ + メール小", Component: P03 },
  { id: "04", label: "左右分割（テキスト / フォームリンク）", Component: P04 },
  { id: "05", label: "フルスクリーン暗 + ゴーストテキスト", Component: P05 },
  { id: "06", label: "Stone背景 + ラフな文体", Component: P06 },
  { id: "07", label: "番号付きエディトリアル", Component: P07 },
  { id: "08", label: "グリーン帯 + 白ボタン", Component: P08 },
  { id: "09", label: "タイポのみ極限ミニマル（テキストのみホバー）", Component: P09 },
  { id: "09B", label: "帯全体ホバー（背景フェード）", Component: P09B },
  { id: "09C", label: "帯全体ホバー + 右矢印出現", Component: P09C },
  { id: "10", label: "「商売の話、しましょう。」+ 右下リンク", Component: P10 },
];

export default function ContactPatterns() {
  const [active, setActive] = useState(null);

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: FONTS.body }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');`}</style>

      {/* ナビ */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(9,12,14,0.97)", backdropFilter: "blur(8px)", padding: "12px 32px", display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
        <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.15em", marginRight: 8, lineHeight: "28px" }}>CONTACT PATTERNS</span>
        {PATTERNS.map(p => (
          <button key={p.id}
            onClick={() => setActive(active === p.id ? null : p.id)}
            style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.1em", padding: "4px 12px", background: active === p.id ? G : "transparent", color: active === p.id ? BG : "rgba(255,255,255,0.5)", border: `1px solid ${active === p.id ? G : "rgba(255,255,255,0.15)"}`, cursor: "pointer", transition: "all 0.2s" }}
          >
            {p.id}
          </button>
        ))}
        {active && (
          <button onClick={() => setActive(null)} style={{ fontFamily: FONTS.accent, fontSize: 11, padding: "4px 12px", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}>
            全表示
          </button>
        )}
      </div>

      {/* パターン一覧 */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "60px 32px" }}>
        {PATTERNS.filter(p => !active || p.id === active).map(({ id, label, Component }) => (
          <div key={id} style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.15em" }}>PATTERN {id}</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{label}</span>
            </div>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}
