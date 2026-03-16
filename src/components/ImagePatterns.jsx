/**
 * ImagePatterns.jsx — WHAT WE DO 画像・背景 20パターン比較
 */
import { useState } from "react";
import { FONTS, COLORS } from "./shared.jsx";

const PHOTO_01 = "/what-we-do-01.jpg";
const PHOTO_02 = "/what-we-do-02.jpg";
const PHOTO_03 = "/what-we-do-03.jpg";

const PILLARS = [
  { num: "01", en: "EXECUTE", title: "事業開発のプロ集団", one: "戦略だけ、渡さない。", photo: PHOTO_01 },
  { num: "02", en: "BRIDGE",  title: "アカデミアとの深い連携", one: "研究室の言語で、話せる。", photo: PHOTO_02 },
  { num: "03", en: "ACCELERATE", title: "AIが一員として動く", one: "AIが本当に、働く。", photo: PHOTO_03 },
];

const STARS = { 5: "★★★★★", 4: "★★★★☆", 3: "★★★☆☆", 2: "★★☆☆☆", 1: "★☆☆☆☆" };
const STAR_COLOR = { 5: "#6aaa88", 4: "#6aaa88", 3: "#b0d4c0", 2: "#848686", 1: "#848686" };

// ─── 共通：カードテキスト ────────────────────────────────
function CardText({ p }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 24px" }}>
      <div style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{p.num}</div>
      <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(22px,3.5vw,40px)", fontWeight: 900, color: "rgba(255,255,255,0.07)", lineHeight: 0.9, marginBottom: 12, letterSpacing: "-0.01em" }}>{p.en}</div>
      <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{p.title}</div>
      <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.G300 }}>{p.one}</div>
    </div>
  );
}

// ─── パターン定義 ────────────────────────────────────────
const PATTERNS = [
  // ── 実写 ──
  {
    id: "P01", stars: 2, category: "実写",
    label: "生写真そのまま",
    note: "色が浮く。ブランドから逸脱しやすい。",
    render: (p) => (
      <div style={{ position: "relative", height: "100%", backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.85) 0%, rgba(9,12,14,0.1) 60%)" }} />
        <CardText p={p} />
      </div>
    ),
  },
  {
    id: "P02", stars: 3, category: "実写",
    label: "ダークグリーンオーバーレイ",
    note: "ブランドカラーに寄せた半透明オーバーレイ。",
    render: (p) => (
      <div style={{ position: "relative", height: "100%", backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,26,20,0.72)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.9) 0%, transparent 60%)" }} />
        <CardText p={p} />
      </div>
    ),
  },
  {
    id: "P03", stars: 4, category: "実写",
    label: "白黒化 + グリーンアクセント",
    note: "desaturation でブランドに統一感。緑だけ際立つ。",
    render: (p) => (
      <div style={{ position: "relative", height: "100%", backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(100%) brightness(0.55)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.95) 0%, rgba(9,12,14,0.3) 55%)", filter: "none" }} />
        <CardText p={p} />
      </div>
    ),
  },
  {
    id: "P04", stars: 4, category: "実写",
    label: "白黒化 + グリーン乗算",
    note: "grayscale → green tint。高級感あり。",
    render: (p) => (
      <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(100%) brightness(0.5)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(45,90,64,0.55)", mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, transparent 55%)" }} />
        <CardText p={p} />
      </div>
    ),
  },
  {
    id: "P05", stars: 5, category: "実写",
    label: "白黒化 + 下からグリーングラデーション",
    note: "最もブランドに馴染む。写真の情報量を残しつつ統一感。◎",
    render: (p) => (
      <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(100%) brightness(0.45)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,26,20,1) 0%, rgba(21,47,38,0.7) 40%, rgba(9,12,14,0.1) 100%)" }} />
        <CardText p={p} />
      </div>
    ),
  },
  // ── 抽象写真 ──
  {
    id: "P06", stars: 4, category: "抽象写真",
    label: "接写テクスチャ（素材感）",
    note: "人物なし。質感・マテリアルで各特徴を表現。Shutterstockで入手しやすい。",
    render: (p, i) => {
      const textures = [
        "linear-gradient(135deg,#1a3a2a 0%,#0d1a14 50%,#2d5a40 100%)",
        "linear-gradient(135deg,#0d1a14 0%,#152f26 40%,#1a2a20 100%)",
        "linear-gradient(135deg,#152f26 0%,#0a1a12 60%,#2d5a40 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: textures[i] }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23fff'/%3E%3C/svg%3E\")", backgroundSize: "20px 20px" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.9) 0%, transparent 60%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P07", stars: 4, category: "抽象写真",
    label: "建築/幾何学写真",
    note: "人なし。垂直線・シャープさがコンサル感と相性◎。",
    render: (p, i) => {
      const bgs = [
        "repeating-linear-gradient(90deg, rgba(45,90,64,0.15) 0px, rgba(45,90,64,0.15) 1px, transparent 1px, transparent 60px), linear-gradient(180deg,#0d1a14 0%,#152f26 100%)",
        "repeating-linear-gradient(0deg, rgba(45,90,64,0.1) 0px, rgba(45,90,64,0.1) 1px, transparent 1px, transparent 60px), linear-gradient(180deg,#0a1a12 0%,#0d1a14 100%)",
        "repeating-linear-gradient(45deg, rgba(45,90,64,0.1) 0px, rgba(45,90,64,0.1) 1px, transparent 1px, transparent 42px), linear-gradient(180deg,#152f26 0%,#0d1a14 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: bgs[i] }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.9) 0%, transparent 60%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P08", stars: 3, category: "抽象写真",
    label: "ダーク自然（森・苔）",
    note: "グリーン × 有機的。ブランドとの親和性あり。暗い森や苔の接写でブランドカラーに統一できる。",
    render: (p, i) => {
      const gs = [
        "radial-gradient(ellipse at 30% 70%, #2d5a40 0%, #0d1a14 65%)",
        "radial-gradient(ellipse at 70% 40%, #1e4a32 0%, #0a1a12 70%)",
        "radial-gradient(ellipse at 50% 60%, #152f26 0%, #090c0e 70%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: gs[i] }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.88) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P09", stars: 3, category: "抽象写真",
    label: "光のボケ（bokeh）",
    note: "柔らかい印象。スタートアップ感あり。コンサルより。",
    render: (p, i) => {
      const bgs = [
        "radial-gradient(circle at 25% 35%, rgba(106,170,136,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(45,90,64,0.2) 0%, transparent 50%), #0d1a14",
        "radial-gradient(circle at 60% 30%, rgba(176,212,192,0.15) 0%, transparent 45%), radial-gradient(circle at 30% 70%, rgba(106,170,136,0.25) 0%, transparent 45%), #0a1a12",
        "radial-gradient(circle at 50% 25%, rgba(45,90,64,0.35) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(106,170,136,0.2) 0%, transparent 40%), #152f26",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: bgs[i] }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, transparent 60%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P10", stars: 3, category: "抽象写真",
    label: "AIビジュアル（回路/ニューラル）",
    note: "P03（ACCELERATE）には合う。全カラム揃えると「AI会社感」が強くなる。",
    render: (p, i) => {
      const lines = i === 0
        ? "M10 10 L90 90 M50 10 L50 90 M10 50 L90 50"
        : i === 1
        ? "M0 0 Q50 50 100 0 M0 50 Q50 100 100 50"
        : "M10 10 L30 30 L50 10 L70 30 L90 10 M10 50 L30 70 L50 50 L70 70 L90 50";
      return (
        <div style={{ position: "relative", height: "100%", background: "linear-gradient(160deg,#0d1a14,#152f26)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={lines} stroke="#6aaa88" strokeWidth="0.5" fill="none" />
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, transparent 60%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  // ── イラスト/グラフィック ──
  {
    id: "P11", stars: 3, category: "イラスト",
    label: "ラインアートイラスト",
    note: "各特徴を象徴するイラスト。制作コストあり。ストック品はクオリティのばらつき注意。",
    render: (p, i) => {
      const icons = [
        <><line x1="30" y1="70" x2="70" y2="70" stroke="#6aaa88" strokeWidth="1"/><line x1="50" y1="30" x2="50" y2="70" stroke="#6aaa88" strokeWidth="1"/><circle cx="50" cy="25" r="8" stroke="#6aaa88" strokeWidth="1" fill="none"/><line x1="35" y1="50" x2="50" y2="70" stroke="#6aaa88" strokeWidth="0.8"/><line x1="65" y1="50" x2="50" y2="70" stroke="#6aaa88" strokeWidth="0.8"/></>,
        <><circle cx="50" cy="50" r="25" stroke="#6aaa88" strokeWidth="1" fill="none"/><circle cx="50" cy="50" r="15" stroke="#6aaa88" strokeWidth="0.6" fill="none"/><circle cx="50" cy="50" r="5" stroke="#6aaa88" strokeWidth="1" fill="none"/><line x1="25" y1="50" x2="75" y2="50" stroke="#6aaa88" strokeWidth="0.5"/></>,
        <><polygon points="50,25 70,65 30,65" stroke="#6aaa88" strokeWidth="1" fill="none"/><line x1="50" y1="25" x2="50" y2="65" stroke="#6aaa88" strokeWidth="0.5"/><line x1="30" y1="65" x2="70" y2="65" stroke="#6aaa88" strokeWidth="0.5"/></>,
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: "linear-gradient(160deg,#0d1a14,#0a1a12)" }}>
          <svg style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 100, height: 100, opacity: 0.4 }} viewBox="0 0 100 100">
            {icons[i]}
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.95) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P12", stars: 4, category: "イラスト",
    label: "ジオメトリック（多角形）",
    note: "低ポリ感。抽象的で万能。人物不要。スタイリッシュ。",
    render: (p, i) => {
      const polys = [
        "40,20 80,10 95,50 75,85 30,90 10,55 20,25",
        "50,10 85,30 90,70 60,90 20,80 10,40 30,15",
        "30,15 70,10 90,45 80,80 40,90 10,60 15,30",
      ];
      const fills = ["rgba(45,90,64,0.25)", "rgba(21,47,38,0.3)", "rgba(13,26,20,0.35)"];
      return (
        <div style={{ position: "relative", height: "100%", background: "linear-gradient(160deg,#0d1a14,#152f26)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <polygon points={polys[i]} fill={fills[i]} stroke="rgba(106,170,136,0.3)" strokeWidth="0.5"/>
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P13", stars: 3, category: "イラスト",
    label: "等高線（トポグラフィック）",
    note: "地形図風。独特の世界観。「深さ」の比喩として機能。好み分かれる。",
    render: (p, i) => {
      const cy = [45, 50, 40];
      return (
        <div style={{ position: "relative", height: "100%", background: "linear-gradient(160deg,#0a1a12,#0d1a14)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            {[0,1,2,3,4].map(n => (
              <ellipse key={n} cx="50" cy={cy[i]} rx={15 + n*12} ry={8 + n*6} fill="none" stroke="#6aaa88" strokeWidth="0.6"/>
            ))}
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.93) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P14", stars: 2, category: "イラスト",
    label: "フラットイラスト",
    note: "カジュアル。SaaS感が強い。コンサルブランドには軽すぎる。",
    render: (p, i) => {
      const hues = [160, 145, 155];
      return (
        <div style={{ position: "relative", height: "100%", background: `linear-gradient(160deg, hsl(${hues[i]},40%,15%), hsl(${hues[i]},30%,8%))` }}>
          <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: 16, background: `hsla(${hues[i]},40%,35%,0.3)`, border: `2px solid hsla(${hues[i]},50%,50%,0.3)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.95) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  // ── 純粋デザイン ──
  {
    id: "P15", stars: 5, category: "純粋デザイン",
    label: "グラデーション（コーポレートカラー）",
    note: "写真不要。ブランドに完全一致。シンプル・上品。今すぐ使える。◎",
    render: (p, i) => {
      const grads = [
        "linear-gradient(160deg, #2d5a40 0%, #0d1a14 100%)",
        "linear-gradient(160deg, #152f26 0%, #090c0e 100%)",
        "linear-gradient(160deg, #1e4a32 0%, #0a1a12 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: grads[i] }}>
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P16", stars: 5, category: "純粋デザイン",
    label: "ノイズテクスチャ + グラデーション",
    note: "プレミアム感が高い。印刷物・高級ブランドで多用。画像不要で最上級の質感。◎◎",
    render: (p, i) => {
      const grads = [
        "linear-gradient(160deg, #2d5a40 0%, #0d1a14 100%)",
        "linear-gradient(160deg, #152f26 0%, #090c0e 100%)",
        "linear-gradient(160deg, #1e4a32 0%, #0a1a12 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: grads[i] }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px", opacity: 0.6, mixBlendMode: "overlay" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P17", stars: 4, category: "純粋デザイン",
    label: "グリッド + グラデーション",
    note: "テックブランドの定番。精密感・構造感。",
    render: (p, i) => {
      const grads = [
        "linear-gradient(160deg, #2d5a40 0%, #0d1a14 100%)",
        "linear-gradient(160deg, #152f26 0%, #090c0e 100%)",
        "linear-gradient(160deg, #1a3a28 0%, #0a1a12 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: grads[i] }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id={`g${i}`} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#g${i})`}/>
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.9) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P18", stars: 4, category: "純粋デザイン",
    label: "タイポグラフィ背景（英語大文字）",
    note: "ENを背景として大きく敷く。P7の方向性。テキスト主体でインパクトあり。",
    render: (p, i) => {
      const grads = [
        "linear-gradient(160deg, #2d5a40 0%, #0d1a14 100%)",
        "linear-gradient(160deg, #152f26 0%, #0a1a12 100%)",
        "linear-gradient(160deg, #1a3a28 0%, #0d1a14 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: grads[i], overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-45%)",
            fontFamily: FONTS.accent, fontSize: "clamp(60px,10vw,120px)", fontWeight: 900,
            color: "rgba(255,255,255,0.04)", lineHeight: 1, letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}>{p.en}</div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.9) 0%, transparent 55%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P19", stars: 3, category: "純粋デザイン",
    label: "波形 / 有機的ライン",
    note: "躍動感あり。テクノロジー + 有機的な印象。金融系に多い。",
    render: (p, i) => {
      const paths = [
        "M0,60 C20,40 40,80 60,55 S90,35 100,50 L100,100 L0,100 Z",
        "M0,65 C15,45 35,75 55,50 S80,30 100,55 L100,100 L0,100 Z",
        "M0,55 C25,35 45,75 65,50 S85,40 100,60 L100,100 L0,100 Z",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: "linear-gradient(160deg,#0d1a14,#152f26)" }}>
          <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={paths[i]} fill="#2d5a40"/>
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, transparent 50%)" }} />
          <CardText p={p} />
        </div>
      );
    },
  },
  {
    id: "P20", stars: 4, category: "純粋デザイン",
    label: "斜め分割 + グラデーション",
    note: "3カラムそれぞれ微妙に角度を変えた斜め帯。動きとブランド感の両立。",
    render: (p, i) => {
      const grads = [
        "linear-gradient(160deg, #2d5a40 0%, #0d1a14 100%)",
        "linear-gradient(155deg, #152f26 0%, #090c0e 100%)",
        "linear-gradient(150deg, #1e4a32 0%, #0a1a12 100%)",
      ];
      return (
        <div style={{ position: "relative", height: "100%", background: grads[i] }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${148 + i*6}deg, rgba(106,170,136,0.08) 0%, transparent 60%)` }} />
          <CardText p={p} />
        </div>
      );
    },
  },
];

// ─── メインページ ─────────────────────────────────────────
const CATEGORIES = ["すべて", "実写", "抽象写真", "イラスト", "純粋デザイン"];

export default function ImagePatterns() {
  const [cat, setCat] = useState("すべて");
  const filtered = cat === "すべて" ? PATTERNS : PATTERNS.filter(p => p.category === cat);

  return (
    <div style={{ fontFamily: FONTS.body, background: "#090c0e", minHeight: "100vh" }}>
      {/* ヘッダー */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(9,12,14,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginRight: 8 }}>Image Pattern Lab</span>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ fontFamily: FONTS.body, fontSize: 12, padding: "5px 16px", borderRadius: 2, border: `1px solid ${cat === c ? COLORS.G300 : "rgba(255,255,255,0.15)"}`, background: cat === c ? "rgba(106,170,136,0.12)" : "transparent", color: cat === c ? COLORS.G300 : "rgba(255,255,255,0.4)", cursor: "pointer" }}>{c}</button>
        ))}
        <span style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>★5=最高 ★1=非推奨</span>
      </div>

      {/* パターン一覧 */}
      <div style={{ padding: "48px 32px", display: "flex", flexDirection: "column", gap: 56 }}>
        {filtered.map(pt => (
          <div key={pt.id}>
            {/* ラベル行 */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 14, fontWeight: 900, color: "rgba(255,255,255,0.15)" }}>{pt.id}</span>
              <span style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, padding: "2px 10px", color: "rgba(255,255,255,0.4)" }}>{pt.category}</span>
              <span style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{pt.label}</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 18, color: STAR_COLOR[pt.stars] }}>{STARS[pt.stars]}</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>— {pt.note}</span>
            </div>

            {/* 3カラムプレビュー */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", maxWidth: 1080, height: 280, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              {PILLARS.map((p, i) => (
                <div key={p.en} style={{ position: "relative", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  {pt.render(p, i)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
