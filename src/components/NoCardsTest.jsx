import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── 定数 ───
const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const COLORS = {
  G050: "#0d1a14",
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea",
  N100: "#090c0e", N500: "#ffffff",
  darkHL:   "rgba(255,255,255,0.92)",
  darkBody: "rgba(255,255,255,0.45)",
};

// ─── テキストマスクリビール ───
function TextReveal({ lines, delay = 0, fontSize, color = COLORS.darkHL, fontFamily, fontWeight = 700, style: extra = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={extra}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
          <motion.div
            initial={{ y: "105%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: fontFamily || FONTS.display, fontSize, color, fontWeight }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── FadeIn ───
function FadeIn({ children, delay = 0, from = "bottom", style: extra = {} }) {
  const startX = from === "left" ? -40 : from === "right" ? 40 : 0;
  const startY = from === "bottom" ? 36 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: startX, y: startY, scale: from === "bottom" ? 0.98 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={extra}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionLabel ───
const SectionLabel = ({ children, color }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
      fontFamily: FONTS.accent, fontSize: "clamp(13px, 1.1vw, 16px)", letterSpacing: "0.22em",
      textTransform: "uppercase", fontWeight: 700, marginBottom: 24,
      color: color || COLORS.G300,
    }}
  >
    {children}
  </motion.div>
);

// ─── 斜め区切りセクション ───
function DiagSection({ children, bg, style: extra = {}, id }) {
  return (
    <section id={id} style={{
      background: bg,
      clipPath: "polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)",
      padding: "calc(100px + 4vw) 8vw",
      marginTop: "-4vw", marginBottom: "-4vw",
      position: "relative",
      zIndex: 1,
      ...extra,
    }}>
      {children}
    </section>
  );
}

// ─── WhatWeDo（NoCards版）───
function WhatWeDoNoCards() {
  const points = [
    {
      label: "事業開発のプロ集団",
      desc: "事業開発のプロが、戦略設計から実行まで一気通貫で動きます。紹介や橋渡しではなく、チームとして並走します。",
    },
    {
      label: "アカデミアとの深い連携",
      desc: "東京大学をはじめとする研究室と連携し、アカデミア発ベンチャーや研究者とのネットワークを持ちます。技術の目利きから社会実装まで、研究現場と並走します。",
    },
    {
      label: "AIが一員として動く",
      desc: "AIエージェントがチームの一員として動くことで、仮説検証と意思決定のサイクルが格段に速くなります。人の判断をAIの実行速度で補完します。",
    },
  ];

  return (
    <DiagSection id="what-we-do-nc" bg="linear-gradient(180deg,#0d1a14 0%,#152f26 100%)">
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>What We Do</SectionLabel>
        <TextReveal
          lines={["非連続な成長を実現する"]}
          fontSize="clamp(28px,4vw,60px)"
          style={{ marginBottom: 32 }}
        />
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(15px,1.8vw,19px)",
            color: COLORS.darkBody, lineHeight: 1.9, maxWidth: 1080, marginBottom: 64,
          }}>
            事業開発のプロフェッショナル、アカデミアとのネットワーク、AIの実行速度——<br />
            三つの力を一体化させ、非連続な成長を共に実現します。
          </p>
        </FadeIn>

        {/* 番号付き水平リスト（カードなし） */}
        <div>
          {points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: "0 40px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                padding: "36px 0",
              }}
            >
              <div style={{
                fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
                color: COLORS.G300, letterSpacing: "0.15em", paddingTop: 4,
              }}>
                0{i + 1}
              </div>
              <div>
                <div style={{
                  fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 700,
                  color: COLORS.darkHL, marginBottom: 12,
                  fontFamily: FONTS.display,
                }}>
                  {p.label}
                </div>
                <p style={{
                  fontSize: 15, color: COLORS.darkBody, lineHeight: 1.9,
                  fontFamily: FONTS.body, margin: 0,
                }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
          {/* 最後のアイテム後の border-bottom */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
      </div>
    </DiagSection>
  );
}

// ─── Services（NoCards版）───
function ServicesNoCards() {
  const L = {
    text: "#0d1a14",
    body: "rgba(9,12,14,0.58)",
    accent: "#2d5a40",
  };

  const services = [
    {
      label: "Forward R&D",
      sub: "価値の発見・証明",
      framework: "Define → Drive → Deliver",
      desc: "課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。既製の技術を購買するのではなく、研究開発段階から課題ごと一緒に解きます。",
    },
    {
      label: "Forward Buyout",
      sub: "価値の統合",
      framework: "バリュエーション → ストラクチャー → PMI → マネタイズ",
      desc: "共創の延長線上にあるM&AやExitを設計・実行します。技術を深く理解しているからこそ、社会実装のポテンシャルを正しく評価したストラクチャーを組めます。",
    },
  ];

  return (
    <DiagSection id="services-nc" bg="linear-gradient(180deg,#6aaa88 0%,#b0d4c0 100%)">
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel color={COLORS.G200}>Services</SectionLabel>
        <TextReveal
          lines={["技術の価値を 市場に届けきる"]}
          fontSize="clamp(28px,4vw,60px)"
          color={L.text}
          style={{ marginBottom: 32 }}
        />
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.body, fontSize: "clamp(15px,1.8vw,19px)",
            color: L.body, lineHeight: 1.9, maxWidth: 1080, marginBottom: 64,
          }}>
            有望な技術が、事業にならないまま消えていく。<br />
            その現実に、2つの切り口で向き合います。<br />
            研究開発段階から共創する「Forward R&D」と、その先のM&Aまで設計する「Forward Buyout」です。
          </p>
        </FadeIn>

        {/* Value Forward ヘッダー（横線付き） */}
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 64 }}>
            <div style={{
              fontFamily: FONTS.accent, fontSize: "clamp(13px,1.1vw,16px)",
              fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
              color: L.accent, whiteSpace: "nowrap",
            }}>
              Value Forward
            </div>
            <div style={{ flex: 1, height: 1, background: "rgba(9,12,14,0.12)" }} />
          </div>
        </FadeIn>

        {/* 2カラムテキスト（カードなし） */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "0 80px", marginBottom: 56 }}>
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                fontSize: 12, color: L.accent, letterSpacing: "0.15em",
                textTransform: "uppercase", marginBottom: 16,
                fontFamily: FONTS.accent, fontWeight: 700,
              }}>
                {s.sub}
              </div>
              <div style={{
                fontFamily: FONTS.accent, fontSize: "clamp(28px,3vw,42px)",
                fontWeight: 900, color: L.text, lineHeight: 1.1, marginBottom: 12,
              }}>
                {s.label}
              </div>
              <div style={{
                fontSize: 12, color: L.accent, letterSpacing: "0.08em",
                marginBottom: 24, fontFamily: FONTS.body,
              }}>
                {s.framework}
              </div>
              <p style={{ fontSize: 15, color: L.body, lineHeight: 1.9, fontFamily: FONTS.body, margin: 0 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <a href="/services" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: L.accent, textDecoration: "none",
            borderBottom: `1px solid ${L.accent}`, paddingBottom: 2,
            transition: "opacity 0.3s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            サービスの詳細を見る
            <span style={{ fontSize: 16 }}>→</span>
          </a>
        </FadeIn>
      </div>
    </DiagSection>
  );
}

// ─── About（NoCards版）───
function AboutNoCards() {
  const L = {
    text: "#0d1a14",
    body: "rgba(9,12,14,0.58)",
    accent: "#2d5a40",
  };

  const members = [
    {
      role: "代表",
      name: "荒川 悠次朗",
      nameEn: "Yujiro Arakawa",
      desc: "リユース業界にて事業会社を創業・取締役として経営。採用・営業・資金管理を一気通貫で推進。その後、コンサルファームにて新規事業開発・M&A戦略室立ち上げ支援・資金調達支援を手がける。建設業・内装工事業など複数業種での融資実績。グロース/プライム上場企業への支援実績を経て独立。現在はM&A × 事業開発 × 資金調達を一気通貫で支援。",
    },
    {
      role: "共同創業者",
      name: "溝橋 正輝",
      nameEn: "Masaki Mizohashi",
      desc: "川崎重工業にてエンジニアとしてキャリアをスタート。野村證券を経て、ディープテック・スタートアップ支援に従事。アカデミア発ベンチャーのエコシステムと深いネットワークを持ち、技術の目利きから事業化・資金調達まで一気通貫で支援。",
    },
  ];

  const companyInfo = [
    { label: "会社名", value: "株式会社BOAR Partners（設立準備中）" },
    { label: "事業内容", value: "M&A × 事業開発 × 資金調達の一気通貫支援" },
    { label: "所在地", value: "東京都" },
  ];

  return (
    <DiagSection id="about-nc" bg="linear-gradient(180deg,#b0d4c0 0%,#d0e8dd 100%)">
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel color={COLORS.G200}>About</SectionLabel>
        <TextReveal
          lines={["チームについて"]}
          fontSize="clamp(28px,4vw,60px)"
          color={L.text}
          style={{ marginBottom: 48 }}
        />

        {/* 2カラム editorial プロフィール（カードなし） */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "0 80px",
          marginBottom: 80,
        }}>
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                fontSize: 11, color: L.accent, letterSpacing: "0.2em",
                textTransform: "uppercase", marginBottom: 12,
                fontFamily: FONTS.accent, fontWeight: 700,
              }}>
                {m.role}
              </div>
              <div style={{
                fontFamily: FONTS.display, fontSize: "clamp(28px,3vw,44px)",
                fontWeight: 700, color: L.text, lineHeight: 1.1, marginBottom: 4,
              }}>
                {m.name}
              </div>
              <div style={{
                fontFamily: FONTS.accent, fontSize: 13, color: L.accent,
                letterSpacing: "0.04em", marginBottom: 24,
              }}>
                {m.nameEn}
              </div>
              <div style={{ height: 1, background: "rgba(9,12,14,0.12)", marginBottom: 24 }} />
              <p style={{
                fontSize: 14, color: L.body, lineHeight: 2.0,
                fontFamily: FONTS.body, margin: 0,
              }}>
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 会社概要（枠なし水平リスト） */}
        <FadeIn delay={0.2}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(13px,1.1vw,16px)",
            fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
            color: L.accent, marginBottom: 32,
          }}>
            Company
          </div>
          {companyInfo.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                gap: "0 32px",
                borderTop: "1px solid rgba(9,12,14,0.1)",
                padding: "18px 0",
              }}
            >
              <div style={{
                fontSize: 12, color: "rgba(9,12,14,0.38)", letterSpacing: "0.06em",
                fontFamily: FONTS.body,
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: 14, color: L.text, fontFamily: FONTS.body }}>
                {item.value}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(9,12,14,0.1)" }} />
        </FadeIn>
      </div>
    </DiagSection>
  );
}

// ─── テストページラベル ───
function TestLabel() {
  return (
    <div style={{
      background: COLORS.N100,
      padding: "120px 8vw 60px",
      position: "relative",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "inline-block",
          fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: COLORS.G300,
          border: "1px solid rgba(106,170,136,0.4)",
          padding: "6px 16px",
          marginBottom: 24,
        }}>
          Test Page
        </div>
        <div style={{
          fontFamily: FONTS.display, fontSize: "clamp(32px,4.5vw,64px)",
          fontWeight: 700, color: COLORS.darkHL, lineHeight: 1.1, marginBottom: 20,
        }}>
          No Cards — Editorial Style
        </div>
        <p style={{
          fontFamily: FONTS.body, fontSize: "clamp(14px,1.5vw,17px)",
          color: COLORS.darkBody, lineHeight: 1.9, maxWidth: 640,
        }}>
          カード型レイアウトを廃止し、タイポグラフィ・余白・細い水平線のみで視覚的ヒエラルキーを構築するテスト。
          WhatWeDo / Services / About の3セクションで検証。
        </p>
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function NoCardsTest() {
  return (
    <div style={{ overflowX: "clip", background: COLORS.N100 }}>
      <TestLabel />
      <WhatWeDoNoCards />
      <ServicesNoCards />
      <AboutNoCards />
    </div>
  );
}
