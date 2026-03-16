// ServicesImageCompare.jsx — 10パターン比較

import { useState } from "react";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};
const G   = "#6aaa88";
const G2  = "#2d5a40";
const G1  = "#152f26";
const N1  = "#090c0e";

const SERVICES = [
  {
    label: "Forward R&D",
    framework: "Define → Drive → Deliver",
    desc: "課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。",
  },
  {
    label: "Forward Buyout",
    framework: "Valuation → Structure → PMI",
    desc: "共創の延長線上にあるM&AやExitを設計・実行します。技術を深く理解しているからこそ正しく評価できます。",
  },
];

// ── 10パターン定義 ─────────────────────────────────────────
const PATTERNS = [
  {
    id: "P01",
    label: "建築・廊下",
    note: "暗い廊下・パースペクティブ。消失点が奥行きを生む。McKinsey定番",
    keyword: "dark architecture corridor perspective minimal",
    stars: "★★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#0a0e0b", overflow: "hidden" }}>
        {/* 廊下ライン */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            background: "rgba(106,170,136,0.07)",
            left: `${50 - i * 12}%`, right: `${50 - i * 12}%`,
            top: 0, bottom: 0,
            transform: `perspective(400px) rotateY(0deg)`,
            borderLeft: i === 0 ? "1px solid rgba(106,170,136,0.15)" : "none",
            borderRight: i === 0 ? "1px solid rgba(106,170,136,0.15)" : "none",
          }} />
        ))}
        {/* 奥の光源 */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 80, height: 80,
          background: "radial-gradient(circle, rgba(106,170,136,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        {/* 水平線 */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(106,170,136,0.1)" }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(9,14,11,0.1) 0%, rgba(9,14,11,0.55) 55%, rgba(9,14,11,0.95) 100%)",
    textColor: "white",
    accentColor: G,
  },
  {
    id: "P02",
    label: "建築 × グリーンオーバーレイ",
    note: "C方向にBOARのダークグリーン(rgba(13,26,20,0.55))を重ねたもの。カラー統一感◎",
    keyword: "dark architecture glass interior",
    stars: "★★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#080f0b", overflow: "hidden" }}>
        {/* グラスライン */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${i * 13}%`, top: 0, bottom: 0,
            width: 1,
            background: `rgba(106,170,136,${0.04 + i * 0.015})`,
          }} />
        ))}
        {/* 反射光 */}
        <div style={{
          position: "absolute", right: "15%", top: "20%",
          width: "30%", height: "40%",
          background: "linear-gradient(135deg, rgba(106,170,136,0.08) 0%, transparent 60%)",
        }} />
        {/* グリーンオーバーレイ */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(13,26,20,0.55)",
          mixBlendMode: "multiply",
        }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(8,15,11,0.05) 0%, rgba(8,15,11,0.5) 55%, rgba(8,15,11,0.97) 100%)",
    textColor: "white",
    accentColor: G,
  },
  {
    id: "P03",
    label: "デュオトーン（深緑×黒）",
    note: "写真をBOARの2色に変換。深みとブランド統一感が最大化。高級感◎",
    keyword: "architecture building aerial",
    stars: "★★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* デュオトーン風グラデ */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0d1a14 0%, #1a3825 30%, #090c0e 70%, #0a1a12 100%)",
        }} />
        {/* テクスチャノイズ風 */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${i * 22}%`, top: `${i * 15}%`,
            width: "40%", height: "40%",
            background: `radial-gradient(ellipse, rgba(106,170,136,${0.06 - i * 0.01}) 0%, transparent 60%)`,
            borderRadius: "50%",
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "rgba(9,12,14,0.3)" }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, transparent 0%, rgba(9,12,14,0.4) 50%, rgba(9,12,14,0.95) 100%)",
    textColor: "white",
    accentColor: G,
  },
  {
    id: "P04",
    label: "素材・金属テクスチャ",
    note: "コンクリート・金属の質感。ディープテックの「硬さ」を表現。無機質な知性",
    keyword: "dark metal texture concrete industrial minimal",
    stars: "★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#0b0e0d", overflow: "hidden" }}>
        {/* 金属テクスチャ風 */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: 0, right: 0,
            top: `${i * 5.5}%`,
            height: 1,
            background: `rgba(255,255,255,${0.008 + (i % 3) * 0.006})`,
          }} />
        ))}
        {/* 光沢 */}
        <div style={{
          position: "absolute", left: "-10%", top: "20%",
          width: "60%", height: "30%",
          background: "linear-gradient(135deg, rgba(106,170,136,0.06) 0%, transparent 50%)",
          transform: "rotate(-15deg)",
        }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(11,14,13,0) 0%, rgba(11,14,13,0.6) 55%, rgba(11,14,13,0.97) 100%)",
    textColor: "white",
    accentColor: "#9ca3af",
  },
  {
    id: "P05",
    label: "光と影・ドラマチック",
    note: "強いコントラスト。光の筋がシャープな印象を生む。高いビジュアルインパクト",
    keyword: "dramatic light shadow dark room beam",
    stars: "★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#060a07", overflow: "hidden" }}>
        {/* 光の筋 */}
        <div style={{
          position: "absolute", left: "20%", top: "-20%",
          width: "2px", height: "160%",
          background: "linear-gradient(180deg, transparent 0%, rgba(106,170,136,0.25) 30%, rgba(106,170,136,0.12) 70%, transparent 100%)",
          transform: "rotate(-20deg)",
          transformOrigin: "top",
        }} />
        <div style={{
          position: "absolute", left: "55%", top: "-10%",
          width: "1px", height: "130%",
          background: "linear-gradient(180deg, transparent 0%, rgba(106,170,136,0.15) 40%, transparent 100%)",
          transform: "rotate(-10deg)",
          transformOrigin: "top",
        }} />
        {/* 床の反射 */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "40%",
          background: "linear-gradient(0deg, rgba(13,26,20,0.4) 0%, transparent 100%)",
        }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(6,10,7,0.1) 0%, rgba(6,10,7,0.5) 50%, rgba(6,10,7,0.97) 100%)",
    textColor: "white",
    accentColor: G,
  },
  {
    id: "P06",
    label: "水面・反射",
    note: "静謐さ・深さ。水面の反射が「深く考える」印象を生む。知的ファームに合う",
    keyword: "dark water reflection abstract calm",
    stars: "★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#060d0f", overflow: "hidden" }}>
        {/* 水面リップル */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${20 + i * 12}%`, top: `${30 + i * 6}%`,
            width: `${60 - i * 8}%`, height: `${40 - i * 5}%`,
            border: "1px solid rgba(106,170,136,0.08)",
            borderRadius: "50%",
            transform: "scaleY(0.3)",
          }} />
        ))}
        {/* 光の点 */}
        <div style={{
          position: "absolute", left: "40%", top: "35%",
          width: 4, height: 4, borderRadius: "50%",
          background: "rgba(106,170,136,0.5)",
          boxShadow: "0 0 20px rgba(106,170,136,0.3)",
        }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(6,13,15,0) 0%, rgba(6,13,15,0.6) 50%, rgba(6,13,15,0.97) 100%)",
    textColor: "white",
    accentColor: "#67e8f9",
  },
  {
    id: "P07",
    label: "森・有機的自然",
    note: "深い森・竹林。「自然に根ざした知性」。BOARのボタニカル感との親和性",
    keyword: "dark forest bamboo minimal green organic",
    stars: "★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#060e07", overflow: "hidden" }}>
        {/* 木の幹 風 */}
        {[2,7,14,22,30,40,52,65,78,88].map((left, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${left}%`, top: 0, bottom: 0,
            width: `${1 + (i % 3)}px`,
            background: `linear-gradient(180deg, transparent 0%, rgba(106,170,136,${0.06 + (i%3)*0.03}) 30%, rgba(106,170,136,${0.03 + (i%2)*0.02}) 80%, transparent 100%)`,
          }} />
        ))}
        {/* 天蓋光 */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0,
          height: "40%",
          background: "linear-gradient(180deg, rgba(13,26,20,0.3) 0%, transparent 100%)",
        }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(6,14,7,0) 0%, rgba(6,14,7,0.65) 55%, rgba(6,14,7,0.97) 100%)",
    textColor: "white",
    accentColor: "#86efac",
  },
  {
    id: "P08",
    label: "マクロ・顕微鏡世界",
    note: "ミクロの構造美。分子・結晶・神経網。「技術の深さ」を視覚化。研究×アート",
    keyword: "macro microscope crystal neural network dark",
    stars: "★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#070a0e", overflow: "hidden" }}>
        {/* ネットワーク風 */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${10 + i * 11}%`, top: `${20 + (i * 17) % 60}%`,
            width: 4, height: 4, borderRadius: "50%",
            background: G,
            opacity: 0.3 + (i % 3) * 0.15,
            boxShadow: `0 0 ${8 + i * 2}px rgba(106,170,136,0.15)`,
          }} />
        ))}
        {/* ライン */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}>
          <line x1="15%" y1="30%" x2="35%" y2="55%" stroke="#6aaa88" strokeWidth="0.5" />
          <line x1="35%" y1="55%" x2="57%" y2="37%" stroke="#6aaa88" strokeWidth="0.5" />
          <line x1="57%" y1="37%" x2="79%" y2="60%" stroke="#6aaa88" strokeWidth="0.5" />
          <line x1="26%" y1="70%" x2="57%" y2="37%" stroke="#6aaa88" strokeWidth="0.5" />
          <line x1="68%" y1="25%" x2="79%" y2="60%" stroke="#6aaa88" strokeWidth="0.5" />
        </svg>
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(7,10,14,0) 0%, rgba(7,10,14,0.55) 50%, rgba(7,10,14,0.97) 100%)",
    textColor: "white",
    accentColor: G,
  },
  {
    id: "P09",
    label: "都市 × グリーントーン",
    note: "東京夜景にダークグリーンを重ねたもの。「金融感」をBOARカラーで中和",
    keyword: "tokyo cityscape night dark skyscraper aerial",
    stars: "★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#080c0a", overflow: "hidden" }}>
        {/* ビル群シルエット */}
        {[8,18,28,38,50,62,72,82,90].map((left, i) => {
          const h = 30 + (i * 23) % 50;
          return (
            <div key={i} style={{
              position: "absolute",
              left: `${left}%`, bottom: 0,
              width: `${6 + (i%3)*3}%`,
              height: `${h}%`,
              background: `rgba(13,26,20,${0.6 + (i%3)*0.1})`,
              borderTop: "1px solid rgba(106,170,136,0.12)",
            }}>
              {/* 窓 */}
              {[...Array(3)].map((_, j) => (
                <div key={j} style={{
                  position: "absolute",
                  right: `${20 + j * 25}%`, top: `${10 + j * 25}%`,
                  width: "15%", height: "8%",
                  background: `rgba(106,170,136,${0.1 + j * 0.05})`,
                }} />
              ))}
            </div>
          );
        })}
        {/* グリーンオーバーレイ */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,20,12,0.5)" }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(8,12,10,0) 0%, rgba(8,12,10,0.5) 50%, rgba(8,12,10,0.97) 100%)",
    textColor: "white",
    accentColor: G,
  },
  {
    id: "P10",
    label: "抽象・霧・奥行き",
    note: "靄と光の奥行き。禅的な静けさ。「思考の深さ」を抽象で表現。高級感あり",
    keyword: "dark fog mist abstract depth minimalist",
    stars: "★★★",
    renderBg: () => (
      <div style={{ position: "absolute", inset: 0, background: "#06090b", overflow: "hidden" }}>
        {/* 霧の層 */}
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "-10%", right: "-10%",
            top: `${10 + i * 20}%`,
            height: "30%",
            background: `radial-gradient(ellipse 80% 50% at ${30 + i*15}% 50%, rgba(106,170,136,${0.04 + i*0.01}) 0%, transparent 70%)`,
          }} />
        ))}
        {/* 遠景の光点 */}
        <div style={{
          position: "absolute", left: "45%", top: "40%",
          width: 2, height: 2, borderRadius: "50%",
          background: "rgba(106,170,136,0.6)",
          boxShadow: "0 0 40px 8px rgba(106,170,136,0.08)",
        }} />
        {/* 水平ライン */}
        <div style={{
          position: "absolute", left: "10%", right: "10%", top: "48%",
          height: 1, background: "rgba(106,170,136,0.06)",
        }} />
      </div>
    ),
    overlay: "linear-gradient(180deg, rgba(6,9,11,0) 0%, rgba(6,9,11,0.5) 50%, rgba(6,9,11,0.97) 100%)",
    textColor: "white",
    accentColor: G,
  },
];

function ServiceCard({ pattern, service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(106,170,136,0.35)" : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.3s",
        cursor: "pointer",
        minHeight: 280,
      }}
    >
      {pattern.renderBg()}
      <div style={{ position: "absolute", inset: 0, background: pattern.overlay }} />
      <div style={{ position: "relative", zIndex: 1, padding: "32px 32px 36px" }}>
        <div style={{
          fontFamily: FONTS.accent,
          fontSize: "clamp(26px,2.8vw,38px)",
          fontWeight: 900, color: pattern.textColor,
          lineHeight: 1.05, marginBottom: 8,
        }}>
          {service.label}
        </div>
        <div style={{
          fontSize: 11, color: pattern.accentColor,
          letterSpacing: "0.08em", marginBottom: 18,
          fontFamily: FONTS.body,
        }}>
          {service.framework}
        </div>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.6)",
          lineHeight: 1.85, fontFamily: FONTS.body, margin: "0 0 20px",
        }}>
          {service.desc}
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: pattern.accentColor,
          opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s",
        }}>
          詳しく見る →
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: 1, background: G,
        transition: "width 0.4s ease",
      }} />
    </div>
  );
}

export default function ServicesImageCompare() {
  return (
    <div style={{ fontFamily: FONTS.body, color: "white", padding: "60px 6vw", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 8, fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em", color: G, textTransform: "uppercase" }}>
        Services Card — 10 Pattern Compare
      </div>
      <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, marginBottom: 8, lineHeight: 1.1 }}>
        画像方向 10パターン比較
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 60 }}>
        全パターンBOARカラー（ダークグリーン系）適用済み。ホバーで枠線が出ます。
      </p>

      {PATTERNS.map((p) => (
        <div key={p.id} style={{ marginBottom: 72 }}>
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 28, marginBottom: 10,
            display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap",
          }}>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: 28, color: G, minWidth: 52 }}>{p.id}</span>
            <span style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: 17, color: "white" }}>{p.label}</span>
            <span style={{ fontSize: 14, color: "#fbbf24" }}>{p.stars}</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{p.note}</p>
          <a
            href={`https://www.shutterstock.com/ja/search/${encodeURIComponent(p.keyword)}?image_type=photo`}
            target="_blank" rel="noreferrer"
            style={{
              display: "inline-block", fontSize: 11, color: G,
              textDecoration: "none", borderBottom: "1px solid rgba(106,170,136,0.3)",
              paddingBottom: 1, marginBottom: 20, fontFamily: FONTS.accent,
              letterSpacing: "0.08em",
            }}
          >
            → Shutterstock: {p.keyword}
          </a>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {SERVICES.map((s) => (
              <ServiceCard key={s.label} pattern={p} service={s} />
            ))}
          </div>
        </div>
      ))}

      {/* おすすめサマリ */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40, marginTop: 20 }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: G, marginBottom: 20, textTransform: "uppercase" }}>
          Top Picks
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 12 }}>
          {[
            { id: "P01", text: "建築・廊下。外れにくく洗練" },
            { id: "P02", text: "建築 × BOARグリーン。統一感◎" },
            { id: "P03", text: "デュオトーン。ブランド最大化" },
            { id: "P10", text: "霧・奥行き。静謐な高級感" },
          ].map((r) => (
            <div key={r.id} style={{
              padding: "16px 20px",
              border: "1px solid rgba(106,170,136,0.2)",
              background: "rgba(106,170,136,0.03)",
            }}>
              <div style={{ fontFamily: FONTS.accent, fontWeight: 700, fontSize: 13, color: G, marginBottom: 6 }}>{r.id}</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
