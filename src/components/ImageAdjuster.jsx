import { useState, useRef, useCallback } from "react";

// 実ページに合わせた値: (min(vw*0.84, 1080) - 80) / 2
const CARD_W = 500;
const CARD_H = 340;

// 実ページと同じベースフィルター
const BASE_FILTER = "grayscale(75%) saturate(0.5)";

function MemberCard({ photo, photoPos, photoSize, label, brightness }) {
  const filter = `${BASE_FILTER} brightness(${brightness})`;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8 }}>{label}</div>
      <div style={{
        width: CARD_W, height: CARD_H,
        overflow: "hidden", position: "relative",
        border: "1px solid #444",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${photo})`,
          backgroundSize: photoSize ?? "cover",
          backgroundPosition: photoPos,
          backgroundRepeat: "no-repeat",
          filter,
        }} />
        {/* 実ページと同じグラデオーバーレイ */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, rgba(9,12,14,0.35) 55%, rgba(9,12,14,0.10) 100%)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

export default function ImageAdjuster() {
  // 位置は確定済み
  const pos = { x: 47.9, y: 14.2 };
  const zoom = 221;
  // 溝橋の brightness（荒川は 0.78 固定）
  // 計測値: 荒川輝度/溝橋輝度 = 1.406 → 0.78 * 1.406 ≈ 1.10 が初期値
  const [brightnessA, setBrightnessA] = useState(0.78); // 荒川
  const [brightness, setBrightness] = useState(1.10);  // 溝橋

  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPos(prev => ({
      x: Math.max(0, Math.min(100, prev.x - dx * 0.3)),
      y: Math.max(0, Math.min(100, prev.y - dy * 0.3)),
    }));
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  const bgPos = `${pos.x.toFixed(1)}% ${pos.y.toFixed(1)}%`;
  const bgSize = zoom === 100 ? "cover" : `auto ${zoom}%`;
  const filterM = `grayscale(75%) brightness(${brightness.toFixed(2)}) saturate(0.5)`;
  const filterA = `grayscale(75%) brightness(${brightnessA.toFixed(2)}) saturate(0.5)`;

  const cssValue = `荒川 filter: "${filterA}"\n溝橋 filter: "${filterM}"`;

  const copyAll = () => {
    const text = `荒川 filter: "${filterA}"\n溝橋 filter: "${filterM}"`;
    navigator.clipboard.writeText(text).then(() => alert("コピーしました"));
  };

  return (
    <div
      style={{ minHeight: "100vh", background: "#090c0e", padding: "40px 60px", fontFamily: "system-ui, sans-serif", color: "white", userSelect: "none" }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <h2 style={{ marginBottom: 8, fontSize: 18 }}>画像調整エディタ</h2>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 32 }}>
        左（荒川）に合わせて右（溝橋）の位置・ズーム・明度を調整してください。
      </p>

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start", marginBottom: 32 }}>
        {/* 荒川（固定・brightness 0.78） */}
        <MemberCard
          photo="/team/arakawa_crop.jpg?v=1"
          photoPos="center 15%"
          brightness={brightnessA}
          label={`荒川 悠次朗（brightness ${brightnessA.toFixed(2)}）`}
        />

        {/* 溝橋（調整可能） */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#6aaa88", marginBottom: 8 }}>
            溝橋 正輝（ドラッグ＋スライダーで調整）
          </div>
          <div
            style={{ width: CARD_W, height: CARD_H, overflow: "hidden", position: "relative", border: "2px solid #6aaa88", cursor: "grab" }}
            onMouseDown={onMouseDown}
          >
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(/team/mizohashi_crop.jpg?v=4)`,
              backgroundSize: bgSize,
              backgroundPosition: bgPos,
              backgroundRepeat: "no-repeat",
              filter: filterM,
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(9,12,14,0.92) 0%, rgba(9,12,14,0.35) 55%, rgba(9,12,14,0.10) 100%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>

      {/* コントロール */}
      <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: "24px 32px", maxWidth: 700 }}>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: "#aaa" }}>荒川 明度: {brightnessA.toFixed(2)}</label>
          <input type="range" min={0.3} max={2.0} step={0.01} value={brightnessA}
            onChange={e => setBrightnessA(Number(e.target.value))}
            style={{ display: "block", width: "100%", marginTop: 8, accentColor: "#6aaa88" }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: "#aaa" }}>溝橋 明度: {brightness.toFixed(2)}</label>
          <input type="range" min={0.3} max={2.0} step={0.01} value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            style={{ display: "block", width: "100%", marginTop: 8, accentColor: "#6aaa88" }} />
        </div>

        <div style={{ marginBottom: 8, fontSize: 12, color: "#555" }}>
          位置: {pos.x}% {pos.y}% / ズーム: {zoom}%（確定済み）
        </div>

        <div style={{ background: "#0d0d0d", borderRadius: 6, padding: "12px 16px", marginBottom: 16, fontFamily: "monospace", fontSize: 12, color: "#6aaa88", whiteSpace: "pre" }}>
          {cssValue}
        </div>

        <button onClick={copyAll}
          style={{ background: "#6aaa88", color: "#0d0d0d", border: "none", borderRadius: 6, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          値をクリップボードにコピー
        </button>
      </div>
    </div>
  );
}
