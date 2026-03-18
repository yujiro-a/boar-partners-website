import { useState } from "react";
import { FONTS, COLORS } from "./shared.jsx";

const MEMBERS = [
  {
    role: "代表",
    name: "荒川 悠次朗",
    nameEn: "Yujiro Arakawa",
    photo: "/team/arakawa_crop.jpg",
    photoPos: "center 15%",
    bio: "事業会社を創業・取締役として経営した後、コンサルファームにてM&A戦略室立ち上げ支援・資金調達支援に従事。建設業・内装工事業など複数業種での融資実績、グロース/プライム上場企業への支援実績を持つ。現在はcomissureに参画し、大企業のアカデミア技術活用をテーマに活動している。",
  },
  {
    role: "共同創業者",
    name: "溝橋 正輝",
    nameEn: "Masaki Mizohashi",
    photo: "/team/mizohashi_crop.jpg",
    photoPos: "47.9% 14.2%",
    photoSize: "auto 221%",
    bio: "川崎重工業にてエンジニアとしてキャリアをスタートし、製造技術・品質管理の実務を経た後、野村證券にて資本市場・投資銀行業務に従事。現在はディープテック・スタートアップ支援に特化し、アカデミア発ベンチャーのエコシステムと深いネットワークを持つ。技術の目利きから事業化・資金調達まで一気通貫で動く。",
  },
];

const BG  = "#090c0e";
const G   = COLORS.G300;   // #6aaa88
const G1  = COLORS.G100;   // dark green
const W2  = "rgba(255,255,255,0.45)";

// ─── 05A: ベース縦長（高さ強調・ミニマル）──────────────────────
function P05A({ m }) {
  return (
    <div>
      <img src={m.photo} alt={m.name}
        style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: m.photoPos, display: "block" }} />
      <div style={{ padding: "24px 0 40px" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>{m.role}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 2 }}>{m.name}</div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em", marginBottom: 20 }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05B: 写真底部グラデ + 名前オーバーレイ ─────────────────────
function P05B({ m }) {
  return (
    <div>
      <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
        <img src={m.photo} alt={m.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.photoPos, display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.95) 0%, rgba(9,12,14,0.2) 50%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, padding: "0 24px" }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4 }}>{m.role}</div>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.05 }}>{m.name}</div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em" }}>{m.nameEn}</div>
        </div>
      </div>
      <div style={{ padding: "20px 0 40px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05C: 常時グレースケール（エディトリアル）──────────────────
function P05C({ m }) {
  return (
    <div>
      <img src={m.photo} alt={m.name}
        style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: m.photoPos, display: "block", filter: "grayscale(100%) contrast(1.1)" }} />
      <div style={{ padding: "24px 0 40px" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>{m.role}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 2 }}>{m.name}</div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", marginBottom: 20 }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05D: 細線フレーム + 余白強調 ─────────────────────────────
function P05D({ m }) {
  return (
    <div>
      <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: 2 }}>
        <img src={m.photo} alt={m.name}
          style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: m.photoPos, display: "block" }} />
      </div>
      <div style={{ padding: "28px 0 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 700, color: "white", lineHeight: 1.0 }}>{m.name}</div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.2em", textTransform: "uppercase" }}>{m.role}</div>
        </div>
        <div style={{ width: 32, height: 1, background: G, marginBottom: 20 }} />
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05E: 写真特大 + ロールバンド（写真下端内）──────────────────
function P05E({ m }) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={m.photo} alt={m.name}
          style={{ width: "100%", height: 460, objectFit: "cover", objectPosition: m.photoPos, display: "block" }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: G1, padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase" }}>{m.role}</div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em" }}>{m.nameEn}</div>
        </div>
      </div>
      <div style={{ padding: "20px 0 40px" }}>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 20 }}>{m.name}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05F: ホバーでグレースケール解除 ──────────────────────────
function P05F({ m }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ overflow: "hidden" }}>
        <img src={m.photo} alt={m.name}
          style={{
            width: "100%", height: 400, objectFit: "cover", objectPosition: m.photoPos, display: "block",
            filter: hovered ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.05)",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "filter 0.6s ease, transform 0.6s ease",
          }} />
      </div>
      <div style={{ padding: "24px 0 40px" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>{m.role}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 2 }}>{m.name}</div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em", marginBottom: 20 }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05G: 番号付きエディトリアル ──────────────────────────────
function P05G({ m, index }) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={m.photo} alt={m.name}
          style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: m.photoPos, display: "block", filter: "grayscale(30%)" }} />
        <div style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: FONTS.accent, fontSize: "clamp(32px,4vw,56px)", fontWeight: 900,
          color: "rgba(255,255,255,0.12)", lineHeight: 1, letterSpacing: "-0.02em",
        }}>0{index + 1}</div>
      </div>
      <div style={{ padding: "24px 0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline", marginBottom: 16 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 700, color: "white" }}>{m.name}</div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.22em", textTransform: "uppercase" }}>{m.role}</div>
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05H: 写真 + 下部アクセントライン ─────────────────────────
function P05H({ m }) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={m.photo} alt={m.name}
          style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: m.photoPos, display: "block" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: G }} />
      </div>
      <div style={{ padding: "24px 0 40px" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>{m.role}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 4 }}>{m.name}</div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em", marginBottom: 24 }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05I: 暗めノイズ系（ダーク強調）──────────────────────────
function P05I({ m }) {
  return (
    <div style={{ background: "#0d1a14", padding: 2 }}>
      <img src={m.photo} alt={m.name}
        style={{ width: "100%", height: 390, objectFit: "cover", objectPosition: m.photoPos, display: "block", filter: "brightness(0.88) contrast(1.05)" }} />
      <div style={{ padding: "24px 20px 36px" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>{m.role}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,2.3vw,34px)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 2 }}>{m.name}</div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em", marginBottom: 20 }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── 05J: 名前を写真上部にオーバーレイ（逆パターン）──────────
function P05J({ m }) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(9,12,14,0.88) 0%, transparent 100%)",
          padding: "24px 20px 48px",
        }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>{m.role}</div>
          <div style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,2.3vw,34px)", fontWeight: 700, color: "white", lineHeight: 1.05 }}>{m.name}</div>
          <div style={{ fontFamily: FONTS.accent, fontSize: 12, color: G, letterSpacing: "0.04em" }}>{m.nameEn}</div>
        </div>
        <img src={m.photo} alt={m.name}
          style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: m.photoPos, display: "block" }} />
      </div>
      <div style={{ padding: "20px 0 40px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 調査ベース追加パターン（McKinsey / BCG / ブティックファーム参考）
// ═══════════════════════════════════════════════════════════

// ─── R1: モノクロ→カラーホバー ★★★（エディトリアル型強化版）──
// 参考: ダーク系ブティックファーム全般。デフォルト = グレースケール
function PR1({ m }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img src={m.photo} alt={m.name} style={{
          width: "100%", height: 420, objectFit: "cover",
          objectPosition: m.photoPos, display: "block",
          filter: hovered ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.85)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.5s ease, transform 0.6s ease",
        }} />
        {/* ホバー時のみグリーンライン */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: G, transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left", transition: "transform 0.4s ease",
        }} />
      </div>
      <div style={{ padding: "20px 0 36px" }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 10, color: G,
          letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8,
          opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s",
        }}>{m.role}</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(24px,2.5vw,36px)",
          fontWeight: 700, lineHeight: 1.05, marginBottom: 4,
          color: hovered ? "white" : "rgba(255,255,255,0.7)",
          transition: "color 0.4s",
        }}>{m.name}</div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 12, color: G,
          letterSpacing: "0.04em", marginBottom: 20,
        }}>{m.nameEn}</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: W2, lineHeight: 2.0 }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── R5: フルスクリーン写真 + オーバーレイ ★★★（マガジン型）──
// 参考: ブティックファーム・Awwwards受賞サイト。1人1セクションで全幅表示
function PR5({ members }) {
  return (
    <div>
      {members.map((m, i) => (
        <div key={m.name} style={{
          position: "relative", height: "70vh", minHeight: 480,
          overflow: "hidden",
          marginBottom: 4,
        }}>
          <img src={m.photo} alt={m.name} style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: m.photoPos, display: "block",
            filter: "brightness(0.6)",
          }} />
          {/* 左→右グラデーション */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(9,12,14,0.82) 0%, rgba(9,12,14,0.15) 55%, transparent 100%)",
          }} />
          {/* テキスト: 左下 */}
          <div style={{
            position: "absolute", bottom: 48, left: "8vw",
          }}>
            <div style={{
              fontFamily: FONTS.accent, fontSize: 11, color: G,
              letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12,
            }}>{m.role}</div>
            <div style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(36px,5vw,72px)",
              fontWeight: 700, color: "white", lineHeight: 1.0, marginBottom: 6,
            }}>{m.name}</div>
            <div style={{
              fontFamily: FONTS.accent, fontSize: 13, color: G,
              letterSpacing: "0.06em", marginBottom: 24,
            }}>{m.nameEn}</div>
            <p style={{
              fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.65)",
              lineHeight: 1.85, maxWidth: 480,
            }}>{m.bio}</p>
          </div>
          {/* 右下: 番号 */}
          <div style={{
            position: "absolute", bottom: 48, right: "8vw",
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: "clamp(64px,8vw,120px)",
            color: "rgba(255,255,255,0.06)",
            lineHeight: 1, letterSpacing: "-0.02em",
          }}>0{i + 1}</div>
        </div>
      ))}
    </div>
  );
}

// ─── R6: ホバーで情報スライドイン ★★（ダーク・インタラクティブ型）─
// 参考: Sarmat等のデザイン重視ブティック。デフォルト=写真のみ
function PR6({ m }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={m.photo} alt={m.name} style={{
        width: "100%", height: 440, objectFit: "cover",
        objectPosition: m.photoPos, display: "block",
        transition: "transform 0.6s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }} />
      {/* ホバー時オーバーレイ */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(9,12,14,0.94) 0%, rgba(9,12,14,0.4) 50%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />
      {/* 常時: 名前のみ下部 */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0 24px 24px",
        transform: hovered ? "translateY(-80px)" : "translateY(0)",
        transition: "transform 0.4s ease",
      }}>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 10, color: G,
          letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6,
        }}>{m.role}</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(22px,2.5vw,36px)",
          fontWeight: 700, color: "white", lineHeight: 1.05,
        }}>{m.name}</div>
      </div>
      {/* ホバー時: bio スライドアップ */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.35s ease 0.1s, transform 0.4s ease 0.05s",
      }}>
        <p style={{
          fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.7)",
          lineHeight: 1.85,
        }}>{m.bio}</p>
      </div>
    </div>
  );
}

// ─── R7: 50/50分割 左写真/右テキスト ★★★（ナラティブ型）────
// 参考: ブティックファーム。1人1行・全幅。「なぜ2人か」を語れる
function PR7({ members }) {
  return (
    <div>
      {members.map((m, i) => (
        <div key={m.name} style={{
          display: "grid",
          gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
          minHeight: 480,
          marginBottom: 4,
          direction: i % 2 === 0 ? "ltr" : "rtl",
        }}>
          <div style={{ overflow: "hidden", direction: "ltr" }}>
            <img src={m.photo} alt={m.name} style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: m.photoPos, display: "block",
              minHeight: 480,
            }} />
          </div>
          <div style={{
            background: i % 2 === 0 ? "#0d1a14" : BG,
            padding: "60px 8vw",
            display: "flex", flexDirection: "column", justifyContent: "center",
            direction: "ltr",
          }}>
            <div style={{
              fontFamily: FONTS.accent, fontSize: 10, color: G,
              letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16,
            }}>{m.role}</div>
            <div style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(28px,3vw,48px)",
              fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: 6,
            }}>{m.name}</div>
            <div style={{
              fontFamily: FONTS.accent, fontSize: 13, color: G,
              letterSpacing: "0.05em", marginBottom: 32,
            }}>{m.nameEn}</div>
            <div style={{ width: 32, height: 1, background: G, marginBottom: 28 }} />
            <p style={{
              fontFamily: FONTS.body, fontSize: 14, color: W2,
              lineHeight: 2.0,
            }}>{m.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── R15: ホバーで専門領域タグ表示 ★★（機能美型）────────────
// 参考: Kearney等。専門性の幅をホバーで視覚化
function PR15({ m }) {
  const [hovered, setHovered] = useState(false);
  const tags = m.tags || [];
  return (
    <div
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={m.photo} alt={m.name} style={{
        width: "100%", height: 420, objectFit: "cover",
        objectPosition: m.photoPos, display: "block",
        filter: hovered ? "brightness(0.45)" : "brightness(1)",
        transition: "filter 0.4s ease",
      }} />
      {/* 常時: 下部名前 */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top, rgba(9,12,14,0.9) 0%, transparent 100%)",
        padding: "32px 20px 20px",
        opacity: hovered ? 0 : 1, transition: "opacity 0.3s",
      }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 10, color: G, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 4 }}>{m.role}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(20px,2.2vw,32px)", fontWeight: 700, color: "white" }}>{m.name}</div>
      </div>
      {/* ホバー時: タグ群 + 名前 */}
      <div style={{
        position: "absolute", inset: 0, padding: "32px 24px",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease 0.05s",
      }}>
        <div style={{ fontFamily: FONTS.display, fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 700, color: "white", marginBottom: 20 }}>{m.name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((tag, ti) => (
            <span key={tag} style={{
              fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: G, padding: "6px 14px",
              border: `1px solid ${G}`,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.3s ease ${ti * 0.06 + 0.1}s, transform 0.3s ease ${ti * 0.06 + 0.1}s`,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// おすすめ順
const PATTERNS = [
  // ── 調査ベース ★★★ ──────────────────────────────────────
  { id: "R7",  stars: 3, label: "50/50分割 左写真/右テキスト（ナラティブ型）",        fullWidth: true,  FullComponent: PR7  },
  { id: "R5",  stars: 3, label: "フルスクリーン写真 + 左下オーバーレイ（マガジン型）",  fullWidth: true,  FullComponent: PR5  },
  { id: "R1",  stars: 3, label: "モノクロ→カラーホバー（エディトリアル強化）",         fullWidth: false, Component: PR1  },
  // ── 調査ベース ★★ ───────────────────────────────────────
  { id: "R6",  stars: 2, label: "ホバーで情報スライドイン（ダーク・インタラクティブ）", fullWidth: false, Component: PR6  },
  { id: "R15", stars: 2, label: "ホバーで専門領域タグ表示（機能美型）",               fullWidth: false, Component: PR15 },
  // ── P05バリアント ────────────────────────────────────────
  { id: "05F", stars: 0, label: "ホバーでグレースケール解除 + ズーム",   fullWidth: false, Component: P05F },
  { id: "05B", stars: 0, label: "底部グラデ + 名前オーバーレイ",         fullWidth: false, Component: P05B },
  { id: "05H", stars: 0, label: "グリーンアクセントライン（下端）",       fullWidth: false, Component: P05H },
  { id: "05C", stars: 0, label: "常時グレースケール（エディトリアル）",   fullWidth: false, Component: P05C },
  { id: "05D", stars: 0, label: "細線フレーム + 名前・ロール横並び",      fullWidth: false, Component: P05D },
  { id: "05E", stars: 0, label: "写真特大 + 下端バンド",                 fullWidth: false, Component: P05E },
  { id: "05G", stars: 0, label: "番号付きエディトリアル + グレー",        fullWidth: false, Component: P05G },
  { id: "05I", stars: 0, label: "ダークグリーン背景 + ブライトネス調整",  fullWidth: false, Component: P05I },
  { id: "05J", stars: 0, label: "名前を写真上部にオーバーレイ（逆配置）", fullWidth: false, Component: P05J },
  { id: "05A", stars: 0, label: "ベース縦長ミニマル",                    fullWidth: false, Component: P05A },
];

const STARS = { 3: "★★★", 2: "★★", 0: "" };

export default function TeamPatterns() {
  const [active, setActive] = useState(null);

  const visible = PATTERNS.filter(p => !active || p.id === active);

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: FONTS.body }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');`}</style>

      {/* ナビ */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(9,12,14,0.97)", backdropFilter: "blur(8px)", padding: "12px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.15em", marginRight: 4, lineHeight: "28px" }}>TEAM PATTERNS</span>
          {/* おすすめグループ */}
          {[3, 2, 0].map(stars => (
            <span key={stars} style={{ display: "contents" }}>
              {stars > 0 && <span style={{ fontFamily: FONTS.accent, fontSize: 10, color: "rgba(255,255,255,0.2)", margin: "0 4px", lineHeight: "28px" }}>|</span>}
              {PATTERNS.filter(p => p.stars === stars).map(p => (
                <button key={p.id}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  style={{
                    fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.1em",
                    padding: "4px 10px",
                    background: active === p.id ? G : (p.stars === 3 ? "rgba(106,170,136,0.12)" : "transparent"),
                    color: active === p.id ? BG : (p.stars === 3 ? G : "rgba(255,255,255,0.45)"),
                    border: `1px solid ${active === p.id ? G : (p.stars === 3 ? "rgba(106,170,136,0.4)" : "rgba(255,255,255,0.12)")}`,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >{p.id}</button>
              ))}
            </span>
          ))}
          {active && (
            <button onClick={() => setActive(null)} style={{ fontFamily: FONTS.accent, fontSize: 11, padding: "4px 12px", background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", marginLeft: 8 }}>
              全表示
            </button>
          )}
        </div>
        <div style={{ marginTop: 6, fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          緑枠 = おすすめ ★★★　|　おすすめ順に並べています
        </div>
      </div>

      {/* パターン一覧 */}
      <div style={{ padding: "60px 0 80px" }}>
        {visible.map(({ id, label, stars, fullWidth, Component, FullComponent }) => (
          <div key={id} style={{ marginBottom: 100 }}>
            {/* ヘッダー */}
            <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px 20px", display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.15em" }}>PATTERN {id}</span>
              {stars > 0 && (
                <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.08em" }}>{STARS[stars]}</span>
              )}
              <span style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{label}</span>
            </div>
            {/* 描画 */}
            {fullWidth ? (
              <FullComponent members={MEMBERS} />
            ) : (
              <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
                {MEMBERS.map((m, i) => <Component key={m.name} m={m} index={i} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
