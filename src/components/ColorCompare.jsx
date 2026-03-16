// ① vs ② カラースキーム比較（簡易版・実際のコンテンツ入り）

const FONTS = {
  accent: "'Big Shoulders Display', sans-serif",
  body:   "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

// ① ライトグリーン止まり（白テキスト維持）
const SCHEME_1 = {
  id: "①",
  name: "Light Green Stop",
  sub: "白テキスト維持・言語体系を壊さない",
  sections: [
    {
      id: "services", label: "Services",
      bg: "linear-gradient(180deg, #152f26 0%, #2d5a40 100%)",
      textColor: "#ffffff", bodyColor: "rgba(255,255,255,0.55)",
      accentColor: "#6aaa88", cardBg: "rgba(255,255,255,0.05)",
      cardBorder: "rgba(255,255,255,0.1)",
    },
    {
      id: "about", label: "About",
      bg: "linear-gradient(180deg, #2d5a40 0%, #4a8060 100%)",
      textColor: "#ffffff", bodyColor: "rgba(255,255,255,0.55)",
      accentColor: "#b0d4c0", cardBg: "rgba(255,255,255,0.06)",
      cardBorder: "rgba(255,255,255,0.1)",
    },
    {
      id: "contact", label: "Contact",
      bg: "linear-gradient(180deg, #4a8060 0%, #6aaa88 100%)",
      textColor: "#ffffff", bodyColor: "rgba(255,255,255,0.65)",
      accentColor: "#ffffff", inputBg: "rgba(255,255,255,0.12)",
    },
    {
      id: "footer", label: "Footer",
      bg: "linear-gradient(180deg, #6aaa88 0%, #090c0e 100%)",
      textColor: "rgba(255,255,255,0.3)", bodyColor: "rgba(255,255,255,0.2)",
    },
  ],
};

// ② ホワイト系（テキスト・カードを黒系に変更）
const SCHEME_2 = {
  id: "②",
  name: "White Horizon",
  sub: "インパクト大・Services以降を黒テキストに",
  sections: [
    {
      id: "services", label: "Services",
      bg: "linear-gradient(180deg, #152f26 0%, #6aaa88 100%)",
      textColor: "#0d1a14", bodyColor: "rgba(9,12,14,0.6)",
      accentColor: "#152f26", cardBg: "rgba(9,12,14,0.06)",
      cardBorder: "rgba(9,12,14,0.12)",
    },
    {
      id: "about", label: "About",
      bg: "linear-gradient(180deg, #6aaa88 0%, #d0e8dd 100%)",
      textColor: "#0d1a14", bodyColor: "rgba(9,12,14,0.55)",
      accentColor: "#2d5a40", cardBg: "rgba(9,12,14,0.05)",
      cardBorder: "rgba(9,12,14,0.1)",
    },
    {
      id: "contact", label: "Contact",
      bg: "linear-gradient(180deg, #d0e8dd 0%, #f0f4f2 100%)",
      textColor: "#0d1a14", bodyColor: "rgba(9,12,14,0.6)",
      accentColor: "#152f26", inputBg: "rgba(9,12,14,0.07)",
    },
    {
      id: "footer", label: "Footer",
      bg: "linear-gradient(180deg, #f0f4f2 0%, #090c0e 100%)",
      textColor: "rgba(255,255,255,0.3)", bodyColor: "rgba(255,255,255,0.2)",
    },
  ],
};

function ServicesMock({ sec }) {
  const cards = ["Forward R&D", "Buyout"];
  return (
    <div style={{ padding: "56px 40px", background: sec.bg }}>
      <div style={{ fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: sec.accentColor, marginBottom: 16, opacity: 0.7 }}>Services</div>
      <div style={{ fontFamily: FONTS.accent, fontSize: 36, fontWeight: 900,
        color: sec.textColor, lineHeight: 1.1, marginBottom: 40 }}>
        2軸で、事業成長を<br />一気通貫する。
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {cards.map((c) => (
          <div key={c} style={{
            background: sec.cardBg, border: `1px solid ${sec.cardBorder}`,
            borderTop: `3px solid ${sec.accentColor}`,
            padding: "28px 24px",
          }}>
            <div style={{ fontFamily: FONTS.accent, fontSize: 18, fontWeight: 900,
              color: sec.textColor, marginBottom: 8 }}>{c}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 13,
              color: sec.bodyColor, lineHeight: 1.8 }}>
              ディープテックの目利きから事業化まで、チームとして伴走する。
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutMock({ sec }) {
  const members = ["荒川 悠次朗 / 代表", "溝橋 正輝 / 共同創業者"];
  return (
    <div style={{ padding: "56px 40px", background: sec.bg }}>
      <div style={{ fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: sec.accentColor, marginBottom: 16, opacity: 0.7 }}>About</div>
      <div style={{ fontFamily: FONTS.accent, fontSize: 36, fontWeight: 900,
        color: sec.textColor, lineHeight: 1.1, marginBottom: 40 }}>
        実行する者が、<br />伴走する。
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {members.map((m) => (
          <div key={m} style={{
            background: sec.cardBg, border: `1px solid ${sec.cardBorder}`,
            borderTop: `2px solid ${sec.accentColor}`,
            padding: "24px 20px",
          }}>
            <div style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 700,
              color: sec.textColor, marginBottom: 8 }}>{m}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12,
              color: sec.bodyColor, lineHeight: 1.8 }}>
              M&A × 事業開発 × 資金調達を一気通貫で支援。
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactMock({ sec }) {
  return (
    <div style={{ padding: "56px 40px", background: sec.bg }}>
      <div style={{ fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: sec.accentColor, marginBottom: 16, opacity: 0.7 }}>Contact</div>
      <div style={{ fontFamily: FONTS.accent, fontSize: 36, fontWeight: 900,
        color: sec.textColor, lineHeight: 1.1, marginBottom: 32 }}>
        まずは、話しましょう。
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
        {["お名前", "メールアドレス", "ご相談内容"].map((label) => (
          <div key={label}>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: sec.bodyColor,
              marginBottom: 4 }}>{label}</div>
            <div style={{
              height: label === "ご相談内容" ? 56 : 36,
              background: sec.inputBg,
              border: `1px solid ${sec.cardBorder || (sec.accentColor + "33")}`,
            }} />
          </div>
        ))}
        <div style={{
          padding: "14px 0", background: sec.accentColor,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginTop: 4,
        }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: sec.accentColor === "#ffffff" ? "#152f26" : "#ffffff" }}>
            送信する
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterMock({ sec }) {
  return (
    <div style={{ padding: "32px 40px", background: sec.bg,
      display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontFamily: FONTS.body, fontSize: 11, color: sec.textColor }}>
        © 2026 BOAR Partners, Inc.
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {["Philosophy", "Services", "About", "Contact"].map((n) => (
          <div key={n} style={{ fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: sec.textColor }}>{n}</div>
        ))}
      </div>
    </div>
  );
}

function SchemeColumn({ scheme }) {
  return (
    <div style={{ flex: 1, border: "1px solid #d4d4d2" }}>
      {/* ヘッダー */}
      <div style={{
        padding: "20px 24px",
        background: "#efefed",
        borderBottom: "2px solid #090c0e",
        position: "sticky", top: 0, zIndex: 5,
      }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 28, fontWeight: 900,
          color: "#090c0e" }}>{scheme.id}</div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700,
          color: "#2d5a40", marginTop: 2 }}>{scheme.name}</div>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "#848686",
          marginTop: 4 }}>{scheme.sub}</div>
      </div>

      {/* セクション */}
      {scheme.sections.map((sec) => {
        if (sec.id === "services") return <ServicesMock key={sec.id} sec={sec} />;
        if (sec.id === "about")    return <AboutMock    key={sec.id} sec={sec} />;
        if (sec.id === "contact")  return <ContactMock  key={sec.id} sec={sec} />;
        if (sec.id === "footer")   return <FooterMock   key={sec.id} sec={sec} />;
        return null;
      })}
    </div>
  );
}

export default function ColorCompare() {
  return (
    <div style={{ background: "#e8e8e6", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');`}</style>

      {/* ページヘッダー */}
      <div style={{ padding: "28px 24px", background: "#efefed",
        borderBottom: "2px solid #d4d4d2", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#848686", marginBottom: 4 }}>
          Services → Footer — Color Scheme Comparison
        </div>
        <div style={{ fontFamily: FONTS.accent, fontSize: 28, fontWeight: 900, color: "#090c0e" }}>
          ① Light Green  vs  ② White Horizon
        </div>
      </div>

      {/* 2カラム比較 */}
      <div style={{ display: "flex", gap: 4, padding: 4 }}>
        <SchemeColumn scheme={SCHEME_1} />
        <SchemeColumn scheme={SCHEME_2} />
      </div>
    </div>
  );
}
