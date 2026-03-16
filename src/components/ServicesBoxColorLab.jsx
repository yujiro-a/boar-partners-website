/**
 * ServicesBoxColorLab.jsx
 * 枠パターン 10 × カード内カラーリング 20 の比較ページ
 */
import { useState } from "react";

const F = {
  accent: "'Big Shoulders Display', sans-serif",
  display: "'Hiragino Sans W6','Hiragino Kaku Gothic ProN',sans-serif",
  body: "'Hiragino Sans W3','Hiragino Kaku Gothic ProN',sans-serif",
};
const G = { G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0" };
const STONE = "#ede8df";
const DARK = "#0d1a14";

// ── アイコン ──────────────────────────────────────────────
const Flask = ({ c = G.G300 }) => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4h10M15 4v10L7 28h22L21 14V4"/>
    <circle cx="12" cy="24" r="1.5" fill={c} opacity="0.6"/>
  </svg>
);
const Arrow = ({ c = "rgba(255,255,255,0.6)" }) => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round">
    <polyline points="4,26 12,16 20,20 32,8"/>
    <polyline points="24,8 32,8 32,16"/>
  </svg>
);

// ── 共通デコレーション ────────────────────────────────────
const Deco1 = ({ op = 1 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden>
    {[90, 68, 48, 30].map((r, i) => (
      <circle key={i} cx="88%" cy="25%" r={`${r}%`} fill="none" stroke="#6aaa88" strokeWidth="0.7" strokeOpacity={(0.12 - i * 0.025) * op}/>
    ))}
    <circle cx="88%" cy="25%" r="2.5" fill="#6aaa88" fillOpacity={0.45 * op}/>
  </svg>
);
const Deco2 = ({ op = 1, pid }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden>
    <defs>
      <pattern id={`gp-${pid}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={`rgba(255,255,255,${0.055 * op})`} strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#gp-${pid})`}/>
    <polyline points="0%,88% 22%,66% 48%,70% 78%,30% 100%,14%"
      fill="none" stroke={`rgba(255,255,255,${0.08 * op})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── カードコンテンツ（ミニ） ──────────────────────────────
function CardContent({ num, label, desc, accent, icon }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: F.accent, fontSize: 8, letterSpacing: "0.2em", color: accent, opacity: 0.55, marginBottom: 6 }}>{num}</div>
      <div style={{ fontFamily: F.accent, fontSize: "clamp(16px,2vw,22px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 8 }}>{label}</div>
      <p style={{ fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, margin: "0 0 14px" }}>{desc}</p>
      <div style={{ fontFamily: F.accent, fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent }}>詳しく見る →</div>
    </div>
  );
}

// ── カード共通ラッパー ────────────────────────────────────
function CardWrap({ bg, border = "1px solid rgba(255,255,255,0.07)", deco, children, accentBorder }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", padding: "24px 24px 20px", background: bg, border, borderLeft: accentBorder || border }}>
      {deco}
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ── 枠パターン 10 ────────────────────────────────────────
// ═══════════════════════════════════════════════════════════

// 標準カラーリング（枠パターン確認用）
const STD = {
  rd:  { bg: "linear-gradient(140deg,#0d2218 0%,#1a3825 55%,#0d1a14 100%)", accent: G.G300 },
  bo:  { bg: "linear-gradient(140deg,#090c0e 0%,#0d1a14 55%,#07090b 100%)", accent: "rgba(255,255,255,0.55)" },
};

// 2カードのグリッド
function CardGrid({ rdBg, boBg, rdAccent = G.G300, boAccent = "rgba(255,255,255,0.55)", rdBorder, boBorder, pid }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <CardWrap bg={rdBg} border={rdBorder} accentBorder={rdBorder} deco={<Deco1 />}>
        <CardContent num="01" label="Forward R&D" desc="課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。" accent={rdAccent} icon={<Flask c={rdAccent} />}/>
      </CardWrap>
      <CardWrap bg={boBg} border={boBorder} accentBorder={boBorder} deco={<Deco2 pid={pid || "std"} />}>
        <CardContent num="02" label="Forward Buyout" desc="共創の延長線上にあるM&AやExitを設計・実行します。技術を深く理解しているからこそ正確な評価が可能です。" accent={boAccent} icon={<Arrow c={boAccent} />}/>
      </CardWrap>
    </div>
  );
}

const BOX_PATTERNS = [
  {
    id: "BX01", label: "アウトライン（現行）",
    note: "背景透明 + 細い暗緑枠。ベージュが透ける。軽い印象。",
    stars: "★★★★",
    render: () => (
      <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "28px 32px 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx01"/>
      </div>
    ),
  },
  {
    id: "BX02", label: "アウトライン 太め",
    note: "1px→2px。存在感が増す。重すぎず軽すぎず。",
    stars: "★★★★",
    render: () => (
      <div style={{ background: "transparent", border: "2px solid rgba(9,26,20,0.22)", padding: "28px 32px 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx02"/>
      </div>
    ),
  },
  {
    id: "BX03", label: "上部グリーンライン",
    note: "上だけグリーン(G300)の太い線。下・左右は細い枠。アクセントが明確。",
    stars: "★★★★★",
    render: () => (
      <div style={{ background: "transparent", borderTop: `3px solid ${G.G300}`, borderLeft: "1px solid rgba(9,26,20,0.15)", borderRight: "1px solid rgba(9,26,20,0.15)", borderBottom: "1px solid rgba(9,26,20,0.15)", padding: "28px 32px 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx03"/>
      </div>
    ),
  },
  {
    id: "BX04", label: "左グリーンバー",
    note: "左に4pxのG300バー。縦軸を強調。エディトリアル風。",
    stars: "★★★★",
    render: () => (
      <div style={{ background: "transparent", borderLeft: `4px solid ${G.G300}`, borderTop: "1px solid rgba(9,26,20,0.12)", borderRight: "1px solid rgba(9,26,20,0.12)", borderBottom: "1px solid rgba(9,26,20,0.12)", padding: "28px 32px 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx04"/>
      </div>
    ),
  },
  {
    id: "BX05", label: "ヘッダー分離（2トーン）",
    note: "ヘッダー部だけダーク(#0d1a14)。カードエリアは透明。奥行き感。",
    stars: "★★★★★",
    render: () => (
      <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.15)", overflow: "hidden" }}>
        <div style={{ background: "#0d1a14", padding: "20px 32px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontFamily: F.accent, fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "0.06em" }}>Value Forward</div>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />
            <div style={{ fontFamily: F.body, fontSize: 11, color: G.G300 }}>技術の価値を、市場に届けきる。</div>
          </div>
        </div>
        <div style={{ padding: "20px 32px 28px", background: "transparent" }}>
          <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx05"/>
        </div>
      </div>
    ),
  },
  {
    id: "BX06", label: "コーナーブラケット",
    note: "四隅にL字ブラケット。全辺枠なし。上品で軽い。デザイン系に多い。",
    stars: "★★★★",
    render: () => (
      <div style={{ position: "relative", background: "transparent", padding: "28px 32px 32px" }}>
        {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
          <div key={`${v}${h}`} style={{ position: "absolute", [v]: 0, [h]: 0, width: 20, height: 20,
            borderTop: v === "top" ? `2px solid rgba(9,26,20,0.3)` : "none",
            borderBottom: v === "bottom" ? `2px solid rgba(9,26,20,0.3)` : "none",
            borderLeft: h === "left" ? `2px solid rgba(9,26,20,0.3)` : "none",
            borderRight: h === "right" ? `2px solid rgba(9,26,20,0.3)` : "none",
          }} />
        ))}
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx06"/>
      </div>
    ),
  },
  {
    id: "BX07", label: "破線アウトライン",
    note: "dashed border。遊び心。テック・スタートアップ感。コンサルには微妙。",
    stars: "★★★",
    render: () => (
      <div style={{ background: "transparent", border: "1.5px dashed rgba(9,26,20,0.2)", padding: "28px 32px 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx07"/>
      </div>
    ),
  },
  {
    id: "BX08", label: "セパレーターのみ（枠なし）",
    note: "ボックスなし。上下の区切り線だけ。最もミニマル。ストーン背景と溶け合う。",
    stars: "★★★★",
    render: () => (
      <div style={{ background: "transparent", borderTop: "1px solid rgba(9,26,20,0.15)", borderBottom: "1px solid rgba(9,26,20,0.15)", padding: "28px 0 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx08"/>
      </div>
    ),
  },
  {
    id: "BX09", label: "下グリーンアンダーライン",
    note: "下だけG300の線。「着地点」の強調。上は細い暗枠のみ。",
    stars: "★★★",
    render: () => (
      <div style={{ background: "transparent", borderTop: "1px solid rgba(9,26,20,0.15)", borderLeft: "1px solid rgba(9,26,20,0.15)", borderRight: "1px solid rgba(9,26,20,0.15)", borderBottom: `3px solid ${G.G300}`, padding: "28px 32px 32px" }}>
        <BoxHeader />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx09"/>
      </div>
    ),
  },
  {
    id: "BX10", label: "グラスモーフィズム",
    note: "frosted glass風。白半透明bg + blur。ストーン背景との融合感◎。モダン感あり。",
    stars: "★★★★★",
    render: () => (
      <div style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", padding: "28px 32px 32px", boxShadow: "0 4px 32px rgba(9,26,20,0.06)" }}>
        <BoxHeader dark={false} />
        <CardGrid rdBg={STD.rd.bg} boBg={STD.bo.bg} pid="bx10"/>
      </div>
    ),
  },
];

function BoxHeader({ dark = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
      <div style={{ fontFamily: F.accent, fontSize: 20, fontWeight: 900, color: dark ? DARK : "#1a2e22", letterSpacing: "0.06em" }}>Value Forward</div>
      <div style={{ flex: 1, height: 1, background: dark ? "rgba(9,26,20,0.12)" : "rgba(9,26,20,0.15)", margin: "0 14px" }} />
      <div style={{ fontFamily: F.body, fontSize: 11, color: G.G200 }}>技術の価値を、市場に届けきる。</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ── カラーリング 20 ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════

const COLOR_PATTERNS = [
  // ── グラデーション系 ──
  { id: "C01", label: "現行（深緑/漆黒）", stars: "★★★",
    note: "基準。R&D=緑系グラデ、Buyout=ほぼ黒。",
    rd: { bg: "linear-gradient(140deg,#0d2218 0%,#1a3825 55%,#0d1a14 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(140deg,#090c0e 0%,#0d1a14 55%,#07090b 100%)", accent: "rgba(255,255,255,0.55)" } },

  { id: "C02", label: "グリーン統一（濃淡差）", stars: "★★★★",
    note: "両カードをグリーン系で統一。R&D=明るい緑、Buyout=深い緑。",
    rd: { bg: "linear-gradient(140deg,#1a3825 0%,#2d5a40 50%,#152f26 100%)", accent: G.G400 },
    bo: { bg: "linear-gradient(140deg,#0d1a14 0%,#152f26 50%,#090c0e 100%)", accent: G.G300 } },

  { id: "C03", label: "フラット単色（グラデなし）", stars: "★★★",
    note: "グラデなし。R&D=#1a3825、Buyout=#0d1014。シンプルで強い。",
    rd: { bg: "#1a3825", accent: G.G300 },
    bo: { bg: "#0d1014", accent: "rgba(255,255,255,0.5)" } },

  { id: "C04", label: "ラジアルグリーン（中心発光）", stars: "★★★★★",
    note: "中央から緑が放射状に広がる。R&Dに生命感。Buyoutは中央白発光。",
    rd: { bg: "radial-gradient(ellipse at 35% 40%, #2d5a40 0%, #0d1a14 70%)", accent: G.G300 },
    bo: { bg: "radial-gradient(ellipse at 35% 40%, #1a1a1a 0%, #080b0d 70%)", accent: "rgba(255,255,255,0.5)" } },

  { id: "C05", label: "対角グラデーション（鋭角）", stars: "★★★★",
    note: "135deg→180deg の角度差で2枚を差別化。鋭い印象。",
    rd: { bg: "linear-gradient(135deg,#1e4a32 0%,#0d1a14 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(225deg,#1a1a20 0%,#090c0e 100%)", accent: "rgba(255,255,255,0.5)" } },

  { id: "C06", label: "縦グラデーション（上から下）", stars: "★★★",
    note: "下が暗くなる縦グラデ。カード下部のCTAが引き立つ。",
    rd: { bg: "linear-gradient(180deg,#1e4a32 0%,#0a1a12 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(180deg,#141414 0%,#060809 100%)", accent: "rgba(255,255,255,0.5)" } },

  { id: "C07", label: "縦グラデーション（下から上）", stars: "★★★★",
    note: "上が暗く、下が少し明るい。テキスト視認性に優れる。",
    rd: { bg: "linear-gradient(0deg,#1e4a32 0%,#0a1a12 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(0deg,#1a1a1a 0%,#080b0d 100%)", accent: "rgba(255,255,255,0.5)" } },

  { id: "C08", label: "ダーク統一（明暗差のみ）", stars: "★★★★",
    note: "両方ダーク。微妙な色温度差で差別化。R&D=暖かい暗緑、Buyout=冷たい漆黒。",
    rd: { bg: "linear-gradient(140deg,#0c1a10 0%,#111d14 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(140deg,#090c10 0%,#070a0e 100%)", accent: "rgba(200,210,220,0.55)" } },

  // ── テクスチャ系 ──
  { id: "C09", label: "ドット背景", stars: "★★★★",
    note: "細かいドットパターン。清潔感・テック感。デコレーションSVGを減らしても映える。",
    rd: { bg: "linear-gradient(140deg,#0d2218,#1a3825)", accent: G.G300, deco: "dots-green" },
    bo: { bg: "linear-gradient(140deg,#090c0e,#0d1a14)", accent: "rgba(255,255,255,0.5)", deco: "dots-white" } },

  { id: "C10", label: "水平ライン背景", stars: "★★★",
    note: "横罫線パターン。ノートや設計図感。少し情報が多い印象。",
    rd: { bg: "linear-gradient(140deg,#0d2218,#1a3825)", accent: G.G300, deco: "hlines-green" },
    bo: { bg: "linear-gradient(140deg,#090c0e,#0d1a14)", accent: "rgba(255,255,255,0.5)", deco: "hlines-white" } },

  { id: "C11", label: "グリッド背景", stars: "★★★★",
    note: "正方形グリッド。構造感・精密感。Buyoutのグリッドと意味的に整合する。",
    rd: { bg: "linear-gradient(140deg,#0d2218,#1a3825)", accent: G.G300, deco: "grid-green" },
    bo: { bg: "linear-gradient(140deg,#090c0e,#0d1a14)", accent: "rgba(255,255,255,0.5)", deco: "grid-white" } },

  // ── 色温度バリエーション ──
  { id: "C12", label: "ウォームグリーン / ウォームブラック", stars: "★★★★",
    note: "わずかに赤みを帯びたグリーン×ウォームブラック。有機的な温かさ。",
    rd: { bg: "linear-gradient(140deg,#142018 0%,#1e3820 100%)", accent: "#7abf95" },
    bo: { bg: "linear-gradient(140deg,#100c0a 0%,#0e0d0b 100%)", accent: "rgba(240,228,210,0.6)" } },

  { id: "C13", label: "クールグリーン / クールブラック", stars: "★★★",
    note: "青みのある冷たいグリーン×クールブラック。テクノロジー感が強い。",
    rd: { bg: "linear-gradient(140deg,#0a1e20 0%,#122830 100%)", accent: "#5abfaa" },
    bo: { bg: "linear-gradient(140deg,#080b10 0%,#0a0c14 100%)", accent: "rgba(180,210,240,0.55)" } },

  { id: "C14", label: "フォレストグリーン / ミッドナイト", stars: "★★★★★",
    note: "森の深さを感じる濃い緑×深夜のような暗さ。ブランドイメージと最も合致。",
    rd: { bg: "linear-gradient(140deg,#0a1c12 0%,#162a1c 55%,#0a1410 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(140deg,#07090c 0%,#0b0e12 55%,#060709 100%)", accent: "rgba(200,215,230,0.55)" } },

  { id: "C15", label: "セージグリーン / ダークチャコール", stars: "★★★★",
    note: "やや明るめのセージ緑。全体的に柔らかく、緑がはっきり見える。",
    rd: { bg: "linear-gradient(140deg,#1c3828 0%,#264a34 55%,#1a3220 100%)", accent: G.G400 },
    bo: { bg: "linear-gradient(140deg,#141618 0%,#1a1c1e 55%,#111314 100%)", accent: "rgba(220,225,230,0.55)" } },

  // ── コントラスト・反転系 ──
  { id: "C16", label: "R&D 暗め / Buyout グリーン強調", stars: "★★★",
    note: "逆転パターン。Buyoutをグリーン系に。M&AにもBOARのカラーを強調したい場合。",
    rd: { bg: "linear-gradient(140deg,#0a1410 0%,#0d1a14 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(140deg,#152f26 0%,#1e4a32 55%,#0d1a14 100%)", accent: G.G400 } },

  { id: "C17", label: "ライトストーン（明転）", stars: "★★",
    note: "ストーン系ベージュカード。ストーン背景と溶け合いすぎる。分かれ道。",
    rd: { bg: "linear-gradient(140deg,#e8e2d8 0%,#ede8df 100%)", accent: G.G200 },
    bo: { bg: "linear-gradient(140deg,#ddd7cc 0%,#e4dfd6 100%)", accent: "#2d5a40" } },

  { id: "C18", label: "グラスモーフィズム", stars: "★★★★",
    note: "半透明 + backdrop-blur。ストーン背景を透かす。現代的・柔らかい。",
    rd: { bg: "rgba(13,26,20,0.75)", blur: true, accent: G.G300 },
    bo: { bg: "rgba(9,12,14,0.8)", blur: true, accent: "rgba(255,255,255,0.5)" } },

  { id: "C19", label: "ディープネイビー / チャコール", stars: "★★★",
    note: "青みのある暗色。グリーンブランドから少し離れるが洗練された印象。",
    rd: { bg: "linear-gradient(140deg,#0a1020 0%,#0d1628 100%)", accent: "#6aaa88" },
    bo: { bg: "linear-gradient(140deg,#111418 0%,#0d1014 100%)", accent: "rgba(200,215,255,0.55)" } },

  { id: "C20", label: "モノクロ + グリーンアクセントのみ", stars: "★★★★★",
    note: "両カードほぼグレースケール。アクセントカラーだけグリーン。最もシンプルかつ高級感◎。",
    rd: { bg: "linear-gradient(140deg,#111411 0%,#151815 100%)", accent: G.G300 },
    bo: { bg: "linear-gradient(140deg,#101010 0%,#141414 100%)", accent: G.G300 } },
];

// テクスチャデコ
function DecoByType({ type }) {
  if (!type) return null;
  const isGreen = type.includes("green");
  const color = isGreen ? "rgba(106,170,136,0.12)" : "rgba(255,255,255,0.06)";
  const baseColor = isGreen ? "rgba(106,170,136,0.09)" : "rgba(255,255,255,0.05)";
  if (type.includes("dots")) return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
      <defs><pattern id={type} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill={color}/>
      </pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${type})`}/>
    </svg>
  );
  if (type.includes("hlines")) return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
      <defs><pattern id={type} x="0" y="0" width="100%" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="100%" y2="0" stroke={color} strokeWidth="0.5"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${type})`}/>
    </svg>
  );
  if (type.includes("grid")) return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
      <defs><pattern id={type} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke={baseColor} strokeWidth="0.5"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${type})`}/>
    </svg>
  );
  return null;
}

// ═══════════════════════════════════════════════════════════
// ── メインページ ──────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
const TABS = ["枠パターン 10", "カラーリング 20"];

export default function ServicesBoxColorLab() {
  const [tab, setTab] = useState(0);
  const [focusBox, setFocusBox] = useState(null);
  const [focusColor, setFocusColor] = useState(null);

  return (
    <div style={{ fontFamily: F.body, background: STONE, minHeight: "100vh" }}>
      {/* ナビ */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(237,232,223,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(9,26,20,0.1)", padding: "12px 32px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: F.accent, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(9,12,14,0.35)", marginRight: 8 }}>Services Box × Color Lab</span>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ fontFamily: F.body, fontSize: 13, fontWeight: tab === i ? 700 : 400, padding: "6px 18px", borderRadius: 2, border: `1.5px solid ${tab === i ? G.G200 : "rgba(9,26,20,0.2)"}`, background: tab === i ? "rgba(45,90,64,0.08)" : "transparent", color: tab === i ? G.G200 : "rgba(9,12,14,0.45)", cursor: "pointer" }}>{t}</button>
        ))}
        <span style={{ fontFamily: F.body, fontSize: 11, color: "rgba(9,12,14,0.25)", marginLeft: "auto" }}>★5 = 最高 / ★1 = 非推奨</span>
      </div>

      {/* ─── 枠パターン ─── */}
      {tab === 0 && (
        <div style={{ padding: "48px 8vw", display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: -24 }}>
            <button onClick={() => setFocusBox(null)} style={{ fontFamily: F.body, fontSize: 12, padding: "4px 14px", borderRadius: 2, border: `1px solid ${!focusBox ? G.G200 : "rgba(9,26,20,0.2)"}`, background: !focusBox ? "rgba(45,90,64,0.08)" : "transparent", color: !focusBox ? G.G200 : "rgba(9,12,14,0.4)", cursor: "pointer" }}>ALL</button>
            {BOX_PATTERNS.map(p => (
              <button key={p.id} onClick={() => setFocusBox(focusBox === p.id ? null : p.id)} style={{ fontFamily: F.body, fontSize: 12, padding: "4px 12px", borderRadius: 2, border: `1px solid ${focusBox === p.id ? G.G200 : "rgba(9,26,20,0.18)"}`, background: focusBox === p.id ? "rgba(45,90,64,0.08)" : "transparent", color: focusBox === p.id ? G.G200 : "rgba(9,12,14,0.4)", cursor: "pointer" }}>{p.id}</button>
            ))}
          </div>
          {BOX_PATTERNS.filter(p => !focusBox || p.id === focusBox).map(p => (
            <div key={p.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <span style={{ fontFamily: F.accent, fontSize: 15, fontWeight: 900, color: "rgba(9,12,14,0.15)" }}>{p.id}</span>
                <span style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: "rgba(9,12,14,0.75)" }}>{p.label}</span>
                <span style={{ fontSize: 16, color: "#6aaa88" }}>{p.stars}</span>
                <span style={{ fontFamily: F.body, fontSize: 12, color: "rgba(9,12,14,0.38)" }}>— {p.note}</span>
              </div>
              <div style={{ maxWidth: 1080 }}><p.render /></div>
            </div>
          ))}
        </div>
      )}

      {/* ─── カラーリング ─── */}
      {tab === 1 && (
        <div style={{ padding: "48px 8vw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            <button onClick={() => setFocusColor(null)} style={{ fontFamily: F.body, fontSize: 12, padding: "4px 14px", borderRadius: 2, border: `1px solid ${!focusColor ? G.G200 : "rgba(9,26,20,0.2)"}`, background: !focusColor ? "rgba(45,90,64,0.08)" : "transparent", color: !focusColor ? G.G200 : "rgba(9,12,14,0.4)", cursor: "pointer" }}>ALL</button>
            {COLOR_PATTERNS.map(p => (
              <button key={p.id} onClick={() => setFocusColor(focusColor === p.id ? null : p.id)} style={{ fontFamily: F.body, fontSize: 11, padding: "3px 10px", borderRadius: 2, border: `1px solid ${focusColor === p.id ? G.G200 : "rgba(9,26,20,0.18)"}`, background: focusColor === p.id ? "rgba(45,90,64,0.08)" : "transparent", color: focusColor === p.id ? G.G200 : "rgba(9,12,14,0.4)", cursor: "pointer" }}>{p.id}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: focusColor ? "1fr" : "repeat(auto-fill,minmax(480px,1fr))", gap: focusColor ? 48 : 32, maxWidth: 1080 }}>
            {COLOR_PATTERNS.filter(p => !focusColor || p.id === focusColor).map((cp) => (
              <div key={cp.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: F.accent, fontSize: 13, fontWeight: 900, color: "rgba(9,12,14,0.2)" }}>{cp.id}</span>
                  <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 700, color: "rgba(9,12,14,0.72)" }}>{cp.label}</span>
                  <span style={{ fontSize: 14, color: "#6aaa88" }}>{cp.stars}</span>
                </div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: "rgba(9,12,14,0.38)", marginBottom: 12 }}>— {cp.note}</div>
                {/* B04アウトライン枠で表示 */}
                <div style={{ background: "transparent", border: "1px solid rgba(9,26,20,0.18)", padding: "20px 24px 24px" }}>
                  <BoxHeader />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[cp.rd, cp.bo].map((c, i) => (
                      <div key={i} style={{ position: "relative", overflow: "hidden", padding: "20px 20px 18px",
                        background: c.bg,
                        border: "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: c.blur ? "blur(10px)" : undefined,
                      }}>
                        {c.deco ? <DecoByType type={c.deco} /> : (i === 0 ? <Deco1 op={0.8} /> : <Deco2 op={0.8} pid={`${cp.id}-${i}`} />)}
                        <CardContent
                          num={i === 0 ? "01" : "02"}
                          label={i === 0 ? "Forward R&D" : "Forward Buyout"}
                          desc={i === 0 ? "課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。" : "共創の延長線上にあるM&AやExitを設計・実行します。"}
                          accent={c.accent}
                          icon={i === 0 ? <Flask c={c.accent} /> : <Arrow c={c.accent} />}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
