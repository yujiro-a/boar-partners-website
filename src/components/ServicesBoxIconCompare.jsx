// ServicesBoxIconCompare.jsx
// Value Forward 親ボックス × アイコンペア 比較

import { useState } from "react";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};
const G    = "#6aaa88";
const GBRT = "#86efac";
const BG   = "#ede8df"; // セクション背景（ベージュ）
const DARK = "#0d1a14";

// ── アイコンペア 10種 ──────────────────────────────────────
const ICON_PAIRS = [
  {
    id: "I01", label: "同心円 / グリッド（現行）",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="3" fill={G} opacity="0.9"/>
        <circle cx="18" cy="18" r="8" stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <circle cx="18" cy="18" r="14" stroke={G} strokeWidth="0.6" opacity="0.25"/>
        <circle cx="18" cy="18" r="17" stroke={G} strokeWidth="0.4" opacity="0.12"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="2" y="2" width="14" height="14" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
        <rect x="20" y="2" width="14" height="14" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <rect x="2" y="20" width="14" height="14" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <rect x="20" y="20" width="14" height="14" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
        <line x1="16" y1="9" x2="20" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
        <line x1="9" y1="16" x2="9" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
        <line x1="27" y1="16" x2="27" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
        <line x1="16" y1="27" x2="20" y2="27" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    id: "I02", label: "フラスコ / 上昇矢印（ライン）",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={G} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 4h10M15 4v10L7 28h22L21 14V4"/>
        <circle cx="12" cy="24" r="1.5" fill={G} opacity="0.6"/>
        <circle cx="20" cy="26" r="1" fill={G} opacity="0.4"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round">
        <polyline points="4,26 12,16 20,20 32,8"/>
        <polyline points="24,8 32,8 32,16"/>
      </svg>
    ),
  },
  {
    id: "I03", label: "原子 / ビル（構造）",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="3" fill={G}/>
        <ellipse cx="18" cy="18" rx="15" ry="6" stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <ellipse cx="18" cy="18" rx="15" ry="6" stroke={G} strokeWidth="0.8" opacity="0.35" transform="rotate(60 18 18)"/>
        <ellipse cx="18" cy="18" rx="15" ry="6" stroke={G} strokeWidth="0.8" opacity="0.35" transform="rotate(-60 18 18)"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1">
        <rect x="4" y="14" width="10" height="20"/>
        <rect x="22" y="6" width="10" height="28"/>
        <line x1="14" y1="34" x2="22" y2="34"/>
        <line x1="9" y1="18" x2="9" y2="18"/><line x1="9" y1="22" x2="9" y2="22"/>
        <line x1="27" y1="10" x2="27" y2="10"/><line x1="27" y1="16" x2="27" y2="16"/>
        <rect x="7" y="17" width="4" height="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
        <rect x="7" y="23" width="4" height="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
        <rect x="25" y="10" width="4" height="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
      </svg>
    ),
  },
  {
    id: "I04", label: "芽生え / 収束矢印",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={G} strokeWidth="1.2" strokeLinecap="round">
        <path d="M18 32 C18 32 18 20 18 14 C18 8 12 4 6 6 C10 8 14 12 18 14 C18 8 24 4 30 6 C26 8 22 12 18 14"/>
        <line x1="18" y1="32" x2="18" y2="28"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round">
        <line x1="4" y1="8" x2="18" y2="18"/><polyline points="10,8 4,8 4,14"/>
        <line x1="32" y1="8" x2="18" y2="18"/><polyline points="26,8 32,8 32,14"/>
        <line x1="4" y1="28" x2="18" y2="18"/><polyline points="4,22 4,28 10,28"/>
        <line x1="32" y1="28" x2="18" y2="18"/><polyline points="32,22 32,28 26,28"/>
        <circle cx="18" cy="18" r="2.5" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },
  {
    id: "I05", label: "DNAスパイラル / ネットワーク",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={G} strokeWidth="1" strokeLinecap="round">
        <path d="M12 4 C20 10 16 16 12 18 C8 20 12 26 20 32" opacity="0.8"/>
        <path d="M24 4 C16 10 20 16 24 18 C28 20 24 26 16 32" opacity="0.5"/>
        <line x1="14" y1="9" x2="22" y2="9" strokeWidth="0.6" opacity="0.5"/>
        <line x1="13" y1="14" x2="23" y2="14" strokeWidth="0.6" opacity="0.4"/>
        <line x1="14" y1="19" x2="22" y2="19" strokeWidth="0.6" opacity="0.5"/>
        <line x1="15" y1="24" x2="21" y2="24" strokeWidth="0.6" opacity="0.4"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {[[8,8],[28,8],[18,20],[8,30],[28,30]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.5)"/>
        ))}
        <line x1="8" y1="8" x2="28" y2="8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        <line x1="8" y1="8" x2="18" y2="20" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        <line x1="28" y1="8" x2="18" y2="20" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        <line x1="18" y1="20" x2="8" y2="30" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        <line x1="18" y1="20" x2="28" y2="30" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        <line x1="8" y1="30" x2="28" y2="30" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    id: "I06", label: "顕微鏡レンズ / スケール",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={G} strokeWidth="1.1" strokeLinecap="round">
        <circle cx="18" cy="14" r="9" opacity="0.7"/>
        <circle cx="18" cy="14" r="5" opacity="0.4"/>
        <line x1="18" y1="23" x2="18" y2="32"/>
        <line x1="12" y1="32" x2="24" y2="32"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" strokeLinecap="round">
        <line x1="18" y1="4" x2="18" y2="32"/>
        <polygon points="18,4 14,12 22,12" fill="rgba(255,255,255,0.15)" strokeWidth="0"/>
        <polygon points="18,32 14,24 22,24" fill="rgba(255,255,255,0.15)" strokeWidth="0"/>
        <line x1="8" y1="18" x2="28" y2="18" strokeWidth="0.6" opacity="0.4"/>
        <circle cx="18" cy="18" r="3" fill="rgba(255,255,255,0.2)"/>
      </svg>
    ),
  },
  {
    id: "I07", label: "六角形 / ダイヤモンド",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="18,3 31,10.5 31,25.5 18,33 5,25.5 5,10.5" stroke={G} strokeWidth="0.9" opacity="0.7"/>
        <polygon points="18,9 26,13.5 26,22.5 18,27 10,22.5 10,13.5" stroke={G} strokeWidth="0.7" opacity="0.4"/>
        <circle cx="18" cy="18" r="2.5" fill={G} opacity="0.8"/>
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="18,3 33,18 18,33 3,18" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9"/>
        <polygon points="18,9 27,18 18,27 9,18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
        <line x1="3" y1="18" x2="33" y2="18" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6"/>
        <line x1="18" y1="3" x2="18" y2="33" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6"/>
      </svg>
    ),
  },
  {
    id: "I08", label: "数字（01 / 02）",
    rd: (
      <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: 32, color: G, lineHeight: 1, letterSpacing: "-0.03em" }}>01</div>
    ),
    buyout: (
      <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: 32, color: "rgba(255,255,255,0.6)", lineHeight: 1, letterSpacing: "-0.03em" }}>02</div>
    ),
  },
  {
    id: "I09", label: "ドット（点）/ スクエア（面）",
    rd: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {[[9,9],[18,9],[27,9],[9,18],[18,18],[27,18],[9,27],[18,27],[27,27]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i===4?3:1.5}
            fill={G} opacity={i===4?0.9:0.3+Math.abs(4-i)*0.05}/>
        ))}
      </svg>
    ),
    buyout: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {[[4,4,14,14],[20,4,12,12],[4,20,12,12],[20,18,12,12]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h}
            stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"
            fill={`rgba(255,255,255,${0.04+i*0.02})`}/>
        ))}
      </svg>
    ),
  },
  {
    id: "I10", label: "イニシャル（R / B）",
    rd: (
      <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: 36, color: G, lineHeight: 1, fontStyle: "italic" }}>R</div>
    ),
    buyout: (
      <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: 36, color: "rgba(255,255,255,0.6)", lineHeight: 1, fontStyle: "italic" }}>B</div>
    ),
  },
];

// ── 親ボックス 10パターン ──────────────────────────────────
const BOX_PATTERNS = [
  {
    id: "B01", label: "現行（フラットダーク）",
    note: "ダーク1色 + ヘッダー水平レイアウト。シンプル・コンサル定番",
    stars: "★★★",
    render: ({ children }) => (
      <div style={{ background: DARK, border: "1px solid rgba(255,255,255,0.08)", padding: "36px 40px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontFamily: FONTS.accent, fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "0.06em" }}>Value Forward</div>
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: G }}>技術の価値を、市場に届けきる。</div>
          </div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>2 Approaches</div>
        </div>
        {children}
      </div>
    ),
  },
  {
    id: "B02", label: "上部グリーンライン",
    note: "ボックス上端に4px グリーンライン。BOARカラーの主張を強める",
    stars: "★★★",
    render: ({ children }) => (
      <div style={{ background: DARK, border: "1px solid rgba(255,255,255,0.08)", borderTop: `3px solid ${G}`, padding: "32px 40px 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 22, fontWeight: 900, color: "white" }}>Value Forward</div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.2em", color: G, textTransform: "uppercase" }}>2 Approaches</div>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>技術の価値を、市場に届けきる。</div>
        {children}
      </div>
    ),
  },
  {
    id: "B03", label: "左端グリーンバー",
    note: "左に4pxのグリーン縦ライン。「ひとつの塊」感が強い。左揃えの視覚的アンカー",
    stars: "★★★",
    render: ({ children }) => (
      <div style={{ background: DARK, border: "1px solid rgba(255,255,255,0.07)", borderLeft: `4px solid ${G}`, padding: "32px 40px 40px" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", color: G, textTransform: "uppercase", marginBottom: 8 }}>Value Forward</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(18px,2vw,26px)", fontWeight: 700, color: "white", marginBottom: 6 }}>技術の価値を、市場に届けきる。</div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>2 Approaches — Forward R&D / Forward Buyout</div>
        {children}
      </div>
    ),
  },
  {
    id: "B04", label: "枠線のみ（アウトライン）",
    note: "背景なし・枠線だけ。ベージュ背景が透けてボックスが軽く見える。空気感◎",
    stars: "★★",
    render: ({ children }) => (
      <div style={{ background: "transparent", border: `1px solid rgba(9,26,20,0.2)`, padding: "32px 40px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900, color: "#0d1a14", letterSpacing: "0.06em" }}>Value Forward</div>
          <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.15)" }} />
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "#2d5a40" }}>技術の価値を、市場に届けきる。</div>
        </div>
        {children}
      </div>
    ),
  },
  {
    id: "B05", label: "ヘッダー濃度差（2トーン）",
    note: "ヘッダー部だけ濃いダーク、カードエリアは少し明るく。奥行き感が出る",
    stars: "★★",
    render: ({ children }) => (
      <div style={{ background: "#0a1410", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{ background: "#06100c", padding: "28px 40px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", color: G, textTransform: "uppercase", marginBottom: 6 }}>Value Forward</div>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 700, color: "white" }}>技術の価値を、市場に届けきる。</div>
        </div>
        <div style={{ padding: "28px 40px 36px" }}>
          {children}
        </div>
      </div>
    ),
  },
  {
    id: "B06", label: "ゴーストテキスト背景",
    note: "背景に薄い「VALUE FORWARD」の大文字。デコラティブだが下品にならない量",
    stars: "★★",
    render: ({ children }) => (
      <div style={{ background: DARK, border: "1px solid rgba(255,255,255,0.07)", padding: "32px 40px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: "-2%", bottom: "-15%",
          fontFamily: FONTS.accent, fontWeight: 900,
          fontSize: "clamp(50px,8vw,90px)",
          color: "rgba(255,255,255,0.03)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
        }}>VALUE FORWARD</div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900, color: "white" }}>Value Forward</div>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: G }}>技術の価値を、市場に届けきる。</div>
          </div>
          {children}
        </div>
      </div>
    ),
  },
  {
    id: "B07", label: "コーナーブラケット",
    note: "四隅に角括弧。エンジニアリング・テック感のある装飾。ディープテックに合う",
    stars: "★★",
    render: ({ children }) => (
      <div style={{ background: DARK, padding: "36px 40px 40px", position: "relative" }}>
        {/* 四隅ブラケット */}
        {[{t:0,l:0,bR:"0",bB:"0"},{t:0,r:0,bL:"0",bB:"0"},{b:0,l:0,bR:"0",bT:"0"},{b:0,r:0,bL:"0",bT:"0"}].map((pos,i)=>(
          <div key={i} style={{
            position:"absolute", ...pos,
            width:16, height:16,
            borderTop: pos.t===0 ? `1.5px solid ${G}` : "none",
            borderBottom: pos.b===0 ? `1.5px solid ${G}` : "none",
            borderLeft: pos.l===0 ? `1.5px solid ${G}` : "none",
            borderRight: pos.r===0 ? `1.5px solid ${G}` : "none",
          }}/>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900, color: "white" }}>Value Forward</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: G }}>/ 技術の価値を、市場に届けきる。</div>
        </div>
        {children}
      </div>
    ),
  },
  {
    id: "B08", label: "水平タブ型",
    note: "「Value Forward」がタブとして飛び出す形。ナビゲーション的な視認性",
    stars: "★",
    render: ({ children }) => (
      <div style={{ position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: G, padding: "8px 20px",
          fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase", color: DARK,
        }}>
          Value Forward
          <span style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 400, opacity: 0.7 }}>技術の価値を、市場に届けきる。</span>
        </div>
        <div style={{ background: DARK, border: `1px solid ${G}`, borderTop: "none", padding: "28px 40px 36px" }}>
          {children}
        </div>
      </div>
    ),
  },
  {
    id: "B09", label: "ボックスなし・セパレーターのみ",
    note: "親ボックスを作らず、区切り線 + ラベルだけ。最もミニマル。現行デザインに溶け込む",
    stars: "★★★",
    render: ({ children }) => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, paddingBottom: 20, borderBottom: `1px solid rgba(9,26,20,0.15)` }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2d5a40", whiteSpace: "nowrap" }}>
            Value Forward
          </div>
          <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)" }} />
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(9,26,20,0.5)", whiteSpace: "nowrap" }}>技術の価値を、市場に届けきる。</div>
        </div>
        {children}
      </div>
    ),
  },
  {
    id: "B10", label: "グロウ（光彩）",
    note: "ボックス外周に薄いグリーンのglow。ダーク×発光。インパクトはあるが使いすぎ注意",
    stars: "★",
    render: ({ children }) => (
      <div style={{
        background: "#080f0b",
        border: "1px solid rgba(106,170,136,0.25)",
        boxShadow: "0 0 40px rgba(106,170,136,0.06), inset 0 0 40px rgba(106,170,136,0.03)",
        padding: "32px 40px 40px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 20, fontWeight: 900, color: "white" }}>Value Forward</div>
          <div style={{ width: 1, height: 16, background: "rgba(106,170,136,0.3)" }} />
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: G }}>技術の価値を、市場に届けきる。</div>
        </div>
        {children}
      </div>
    ),
  },
];

// ── ミニカード（アイコン比較用）──────────────────────────
function MiniCard({ icon, label, bg, accentColor }) {
  return (
    <div style={{
      background: bg,
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "20px 20px 18px",
      flex: 1,
    }}>
      <div style={{ marginBottom: 14 }}>{icon}</div>
      <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: FONTS.body, fontSize: 10, color: accentColor, letterSpacing: "0.1em" }}>詳しく見る →</div>
    </div>
  );
}

export default function ServicesBoxIconCompare() {
  const [activeIcon, setActiveIcon] = useState(0);
  const [activeBox, setActiveBox] = useState(0);

  const rdBg   = "linear-gradient(135deg,#0d2218 0%,#1a3825 60%,#0d1a14 100%)";
  const buyBg  = "linear-gradient(135deg,#090c0e 0%,#0d1a14 60%,#07090b 100%)";

  const CardGrid = ({ iconPair }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <MiniCard icon={iconPair.rd}     label="Forward R&D"     bg={rdBg}  accentColor={GBRT} />
      <MiniCard icon={iconPair.buyout} label="Forward Buyout"  bg={buyBg} accentColor="rgba(255,255,255,0.55)" />
    </div>
  );

  const ActiveBox = BOX_PATTERNS[activeBox];
  const ActiveIcon = ICON_PAIRS[activeIcon];

  return (
    <div style={{ fontFamily: FONTS.body, color: "white", padding: "60px 6vw", maxWidth: 1100, margin: "0 auto" }}>

      {/* ─── Section 1: アイコン ─── */}
      <div style={{ marginBottom: 8, fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", color: G, textTransform: "uppercase" }}>
        Section 1 — Icon Pairs
      </div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,3vw,40px)", fontWeight: 700, marginBottom: 8 }}>アイコンペア 10パターン</h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 40 }}>クリックで下のプレビューに反映</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10, marginBottom: 40 }}>
        {ICON_PAIRS.map((ip, i) => (
          <button key={ip.id} onClick={() => setActiveIcon(i)} style={{
            background: activeIcon === i ? "rgba(106,170,136,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${activeIcon === i ? G : "rgba(255,255,255,0.08)"}`,
            padding: "14px 16px", cursor: "pointer", textAlign: "left", color: "white",
            transition: "border-color 0.2s",
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div>{ip.rd}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>/</div>
              <div>{ip.buyout}</div>
            </div>
            <div style={{ fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700, color: activeIcon===i ? G : "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{ip.id}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{ip.label}</div>
          </button>
        ))}
      </div>

      {/* ─── Section 2: 親ボックス ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 48, marginBottom: 8, fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", color: G, textTransform: "uppercase" }}>
        Section 2 — Box Design
      </div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,3vw,40px)", fontWeight: 700, marginBottom: 8 }}>親ボックス 10パターン</h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 40 }}>クリックで下のプレビューに反映</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10, marginBottom: 40 }}>
        {BOX_PATTERNS.map((bp, i) => (
          <button key={bp.id} onClick={() => setActiveBox(i)} style={{
            background: activeBox === i ? "rgba(106,170,136,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${activeBox === i ? G : "rgba(255,255,255,0.08)"}`,
            padding: "14px 16px", cursor: "pointer", textAlign: "left", color: "white",
            transition: "border-color 0.2s",
          }}>
            <div style={{ fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700, color: activeBox===i ? G : "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>{bp.id} {bp.stars}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{bp.label}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4, lineHeight: 1.5 }}>{bp.note}</div>
          </button>
        ))}
      </div>

      {/* ─── ライブプレビュー ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40 }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: G, marginBottom: 16, textTransform: "uppercase" }}>
          Live Preview — {ActiveBox.id} × {ActiveIcon.id}
        </div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 24 }}>
          ボックス: <span style={{ color: "rgba(255,255,255,0.6)" }}>{ActiveBox.label}</span>
          アイコン: <span style={{ color: "rgba(255,255,255,0.6)" }}>{ActiveIcon.label}</span>
        </p>

        {/* ベージュ背景の中でプレビュー */}
        <div style={{ background: BG, padding: "48px 40px", borderRadius: 2 }}>
          <ActiveBox.render>
            <CardGrid iconPair={ActiveIcon} />
          </ActiveBox.render>
        </div>
      </div>
    </div>
  );
}
