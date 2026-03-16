import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const PHOTO = "/team/arakawa_crop.jpg";
const PHOTO_POS = "center 15%";
const G = "#6db88b";
const DARK = "#090c0e";
const FONTS = {
  accent: "'Big Shoulders Display', sans-serif",
  body: "system-ui, sans-serif",
};

// ─── 写真処理パターン ────────────────────────────────────────────
const PHOTO_PATTERNS = [
  {
    id: "P01",
    label: "カラー（ベースライン）",
    stars: "★★☆",
    note: "自然だが独自性が薄い",
    filter: "none",
    overlay: null,
  },
  {
    id: "P02",
    label: "グレースケール（シンプル）",
    stars: "★★★",
    note: "知的・モノクロームプロ感",
    filter: "grayscale(100%) brightness(0.85)",
    overlay: null,
  },
  {
    id: "P03",
    label: "グレースケール + 下グリーングラデ",
    stars: "★★★★★",
    note: "ブランドに最も馴染む。写真情報を残しつつ統一感 ◎",
    filter: "grayscale(100%) brightness(0.85)",
    overlay: "linear-gradient(to top, rgba(109,184,139,0.45) 0%, rgba(109,184,139,0.1) 40%, transparent 70%)",
  },
  {
    id: "P04",
    label: "デュオトーン（深緑×黒）",
    stars: "★★★★",
    note: "没入感あり。ブランドカラー強調",
    filter: "grayscale(100%) brightness(0.75) sepia(30%)",
    overlay: "linear-gradient(to bottom, rgba(9,12,14,0.3) 0%, rgba(13,46,35,0.6) 100%)",
  },
  {
    id: "P05",
    label: "グリーントーン（全面うっすら）",
    stars: "★★★",
    note: "ブランド浸透。ただし過剰感注意",
    filter: "grayscale(60%) brightness(0.8)",
    overlay: "rgba(109,184,139,0.25)",
  },
  {
    id: "P06",
    label: "ハイコントラスト白黒",
    stars: "★★★",
    note: "エッジ感・雑誌感。好み分かれる",
    filter: "grayscale(100%) contrast(1.4) brightness(0.8)",
    overlay: null,
  },
  {
    id: "P07",
    label: "セピア + 下グリーン",
    stars: "★★★",
    note: "温かみ×ブランド。独特の世界観",
    filter: "sepia(70%) brightness(0.85)",
    overlay: "linear-gradient(to top, rgba(109,184,139,0.4) 0%, transparent 50%)",
  },
  {
    id: "P08",
    label: "クールブルーシフト",
    stars: "★★",
    note: "クールだがブランドカラーと乖離",
    filter: "grayscale(80%) brightness(0.8) hue-rotate(160deg)",
    overlay: "rgba(30,60,120,0.2)",
  },
  {
    id: "P09",
    label: "暗め + グリーン下グラデ（強め）",
    stars: "★★★★",
    note: "ダーク基調のサイトとの整合性◎",
    filter: "grayscale(100%) brightness(0.65)",
    overlay: "linear-gradient(to top, rgba(109,184,139,0.6) 0%, rgba(109,184,139,0.15) 50%, transparent 70%)",
  },
  {
    id: "P10",
    label: "ビネット（周辺暗化）",
    stars: "★★★",
    note: "映画的・高級感。写真の質問われる",
    filter: "brightness(0.9)",
    overlay: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
  },
];

// ─── ホバーモーションパターン ────────────────────────────────────
const MOTION_PATTERNS = [
  {
    id: "M01",
    label: "スケールズーム（現状）",
    stars: "★★★",
    note: "定番。無難で安定",
    getImgStyle: (h) => ({
      transform: h ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.6s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M02",
    label: "ズームアウト（常時ズーム→戻す）",
    stars: "★★★★",
    note: "始まりから動的。ドラマ性あり",
    getImgStyle: (h) => ({
      transform: h ? "scale(1.0)" : "scale(1.08)",
      transition: "transform 0.7s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M03",
    label: "縦スライド（上方向パン）",
    stars: "★★★",
    note: "スクロール感覚。顔への誘導",
    getImgStyle: (h) => ({
      transform: h ? "scale(1.05) translateY(-4%)" : "scale(1.05) translateY(0%)",
      transition: "transform 0.7s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M04",
    label: "グリーンカーテン（下から展開）",
    stars: "★★★★★",
    note: "ブランドカラーで演出。洗練度高い",
    getImgStyle: (h) => ({
      transform: h ? "scale(1.03)" : "scale(1)",
      transition: "transform 0.6s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: (h) => ({
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: h ? "100%" : "0%",
      background: "linear-gradient(to top, rgba(109,184,139,0.15) 0%, transparent 60%)",
      transition: "height 0.6s ease",
      pointerEvents: "none",
    }),
  },
  {
    id: "M05",
    label: "ケンバーンズ（対角ズーム+パン）",
    stars: "★★★★",
    note: "映画的。動きに奥行きがある",
    getImgStyle: (h) => ({
      transform: h ? "scale(1.08) translate(-2%, -2%)" : "scale(1)",
      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M06",
    label: "ブラー → クリア",
    stars: "★★★",
    note: "ピント合わせ演出。フォーカス感",
    getImgStyle: (h) => ({
      filter: h ? "blur(0px) brightness(1)" : "blur(3px) brightness(0.8)",
      transition: "filter 0.5s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M07",
    label: "フラッシュ（輝度スパイク）",
    stars: "★★",
    note: "インパクト大。使いどころを選ぶ",
    getImgStyle: (h) => ({
      filter: h ? "brightness(1.2) contrast(1.05)" : "brightness(0.85)",
      transition: "filter 0.3s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M08",
    label: "グレー → カラー（現 R1）",
    stars: "★★★★",
    note: "コントラスト大。モノクロが活きる",
    getImgStyle: (h) => ({
      filter: h ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.85)",
      transition: "filter 0.5s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
  {
    id: "M09",
    label: "グレー + グリーングラデ → カラー",
    stars: "★★★★★",
    note: "P03 × M08 の組み合わせ。最良候補",
    getImgStyle: (h) => ({
      filter: h ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.85)",
      transition: "filter 0.5s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: (h) => ({
      position: "absolute", bottom: 0, left: 0, right: 0, height: "100%",
      background: h
        ? "transparent"
        : "linear-gradient(to top, rgba(109,184,139,0.45) 0%, rgba(109,184,139,0.1) 40%, transparent 70%)",
      transition: "background 0.5s ease",
      pointerEvents: "none",
    }),
  },
  {
    id: "M10",
    label: "スライドアップ + 暗幕フェード",
    stars: "★★★",
    note: "テキスト可読性重視。CTA向け",
    getImgStyle: (h) => ({
      transform: h ? "scale(1.04) translateY(-1%)" : "scale(1)",
      filter: h ? "brightness(0.6)" : "brightness(0.9) grayscale(60%)",
      transition: "transform 0.6s ease, filter 0.5s ease",
      objectPosition: PHOTO_POS,
    }),
    getOverlayStyle: () => null,
  },
];

// ─── 単体カードプレビュー ─────────────────────────────────────────
function PhotoCard({ pattern, height = 280 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div style={{ position: "relative", overflow: "hidden", height }}>
        <img
          src={PHOTO}
          alt=""
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: PHOTO_POS, display: "block",
            filter: pattern.filter,
            transition: "filter 0.5s ease",
          }}
        />
        {pattern.overlay && (
          <div style={{
            position: "absolute", inset: 0,
            background: pattern.overlay,
            pointerEvents: "none",
          }} />
        )}
        {/* ホバー時はカラーに戻す */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(0,0,0,0)" : "transparent",
          transition: "background 0.4s",
          pointerEvents: "none",
        }} />
        {/* 下グリーンライン */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: G,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left", transition: "transform 0.4s ease",
        }} />
      </div>
      <div style={{ padding: "10px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.15em" }}>
            {pattern.id}
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
            {pattern.stars}
          </span>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: 3 }}>
          {pattern.label}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
          {pattern.note}
        </div>
      </div>
    </div>
  );
}

// ─── ホバーモーションカード ──────────────────────────────────────
function MotionCard({ pattern, height = 280 }) {
  const [hovered, setHovered] = useState(false);
  const overlayStyle = pattern.getOverlayStyle ? pattern.getOverlayStyle(hovered) : null;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div style={{ position: "relative", overflow: "hidden", height }}>
        <img
          src={PHOTO}
          alt=""
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            display: "block",
            ...pattern.getImgStyle(hovered),
          }}
        />
        {overlayStyle && <div style={overlayStyle} />}
        {/* 下グリーンライン */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: G,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left", transition: "transform 0.4s ease",
        }} />
      </div>
      <div style={{ padding: "10px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: G, letterSpacing: "0.15em" }}>
            {pattern.id}
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
            {pattern.stars}
          </span>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: 3 }}>
          {pattern.label}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
          {pattern.note}
        </div>
      </div>
    </div>
  );
}

// ─── ライブプレビュー（選択中パターンの大カード） ──────────────────
function LivePreview({ photoPattern, motionPattern }) {
  const [hovered, setHovered] = useState(false);
  const imgMotionStyle = motionPattern.getImgStyle(hovered);
  const overlayStyle = motionPattern.getOverlayStyle ? motionPattern.getOverlayStyle(hovered) : null;

  return (
    <div style={{ maxWidth: 340, margin: "0 auto" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        <div style={{ position: "relative", overflow: "hidden", height: 440 }}>
          <img
            src={PHOTO}
            alt=""
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: PHOTO_POS, display: "block",
              filter: photoPattern.filter,
              ...imgMotionStyle,
              // filterは両方マージ
              filter: `${photoPattern.filter}${imgMotionStyle.filter ? ` ${imgMotionStyle.filter}` : ""}`.trim() || "none",
            }}
          />
          {/* 写真オーバーレイ（常時） */}
          {photoPattern.overlay && (
            <div style={{
              position: "absolute", inset: 0,
              background: photoPattern.overlay,
              pointerEvents: "none",
              transition: "opacity 0.5s",
              opacity: hovered ? 0 : 1,
            }} />
          )}
          {/* モーションオーバーレイ */}
          {overlayStyle && <div style={overlayStyle} />}
          {/* 下グリーンライン */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: G,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left", transition: "transform 0.4s ease",
          }} />
        </div>
        <div style={{ padding: "20px 0 0" }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 10, color: G,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8,
            opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s",
          }}>代表</div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 28, fontWeight: 700,
            color: hovered ? "white" : "rgba(255,255,255,0.7)",
            transition: "color 0.4s", marginBottom: 4,
          }}>荒川 悠次朗</div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 12, color: G,
            letterSpacing: "0.04em", marginBottom: 16,
          }}>Yujiro Arakawa</div>
          <p style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
            事業会社を創業後、コンサルファームにてM&A戦略・資金調達支援に従事。現在はcomissureに参画。
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────────────────
export default function TeamCardCompare() {
  const [selectedPhoto, setSelectedPhoto] = useState(2); // P03デフォルト
  const [selectedMotion, setSelectedMotion] = useState(8); // M09デフォルト

  const photoPattern = PHOTO_PATTERNS[selectedPhoto];
  const motionPattern = MOTION_PATTERNS[selectedMotion];

  return (
    <div style={{
      minHeight: "100vh",
      background: DARK,
      color: "white",
      fontFamily: FONTS.body,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
      `}</style>

      {/* ヘッダー */}
      <div style={{ padding: "40px 40px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em", color: "white" }}>
          Team Card Patterns
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
          写真処理 × ホバーモーション — 各10パターン比較
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px 1fr", gap: 0, minHeight: "calc(100vh - 89px)" }}>

        {/* ─ 左: 写真処理パターン ─ */}
        <div style={{ padding: "32px 24px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", color: G, marginBottom: 20,
          }}>
            PHOTO TREATMENT
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px 16px" }}>
            {PHOTO_PATTERNS.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setSelectedPhoto(i)}
                style={{
                  cursor: "pointer",
                  outline: selectedPhoto === i ? `2px solid ${G}` : "2px solid transparent",
                  outlineOffset: 2,
                  borderRadius: 2,
                  padding: 4,
                  transition: "outline-color 0.2s",
                }}
              >
                <PhotoCard pattern={p} height={160} />
              </div>
            ))}
          </div>
        </div>

        {/* ─ 中央: ライブプレビュー ─ */}
        <div style={{
          padding: "32px 24px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", color: G, marginBottom: 20, textAlign: "center",
          }}>
            LIVE PREVIEW
          </div>
          <LivePreview photoPattern={photoPattern} motionPattern={motionPattern} />
          <div style={{
            marginTop: 24, padding: "16px 20px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            width: "100%",
          }}>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>現在の組み合わせ</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: G, marginBottom: 4 }}>
              📷 {photoPattern.id}: {photoPattern.label}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: G }}>
              🖱 {motionPattern.id}: {motionPattern.label}
            </div>
          </div>
          <div style={{
            marginTop: 12, padding: "12px 16px",
            background: "rgba(109,184,139,0.08)",
            border: "1px solid rgba(109,184,139,0.2)",
            width: "100%",
          }}>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>推奨組み合わせ</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              P03 + M09<br />
              グレー→カラーホバー with<br />
              グリーングラデーション
            </div>
          </div>
        </div>

        {/* ─ 右: ホバーモーションパターン ─ */}
        <div style={{ padding: "32px 24px" }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", color: G, marginBottom: 20,
          }}>
            HOVER MOTION
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px 16px" }}>
            {MOTION_PATTERNS.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setSelectedMotion(i)}
                style={{
                  cursor: "pointer",
                  outline: selectedMotion === i ? `2px solid ${G}` : "2px solid transparent",
                  outlineOffset: 2,
                  borderRadius: 2,
                  padding: 4,
                  transition: "outline-color 0.2s",
                }}
              >
                <MotionCard pattern={p} height={160} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
