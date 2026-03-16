import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const COLORS = {
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea",
  N100: "#090c0e", N300: "#848686", N400: "#c2c2c3", N500: "#ffffff",
};

// ─── テキスト行スライドアップ（マスクリビール） ───
function TextReveal({ lines, delay = 0, fontSize = "clamp(36px,5vw,72px)", color = "#fff", fontFamily }) {
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: fontFamily || FONTS.display, fontSize, color, fontWeight: 700 }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── カウントアップ ───
function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── パララックス背景ヒーロー ───
function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center",
      background: `linear-gradient(170deg, ${COLORS.N100} 0%, #0a1a12 50%, ${COLORS.G100} 100%)`,
    }}>
      {/* パララックス背景グリッド */}
      <motion.div style={{
        position: "absolute", inset: "-20%",
        backgroundImage: `radial-gradient(circle at 30% 40%, rgba(106,170,136,0.08) 0%, transparent 60%),
          radial-gradient(circle at 80% 70%, rgba(45,90,64,0.12) 0%, transparent 50%)`,
        y: bgY,
      }} />
      {/* グリッド線 */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgY }}>
        <svg style={{ width: "100%", height: "100%", opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="tg" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#tg)"/>
        </svg>
      </motion.div>

      <motion.div style={{ position: "relative", zIndex: 1, padding: "56px 8vw", y: textY, opacity }}>
        {/* ラベル */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: COLORS.G300, marginBottom: 32 }}
        >
          ① パララックス背景 + テキストフェード
        </motion.div>

        <TextReveal
          lines={["Deep tech,", "for industry"]}
          fontSize="clamp(56px,10vw,144px)"
          fontFamily={FONTS.accent}
          color={COLORS.N500}
          delay={0.5}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          style={{ fontFamily: FONTS.accent, fontSize: "clamp(18px,2.4vw,32px)",
            fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)", marginTop: 24 }}
        >
          Strategy &amp; Execution Consulting
        </motion.div>
      </motion.div>

      {/* スクロールインジケーター */}
      <motion.div
        style={{ position: "absolute", bottom: 40, left: "8vw",
          fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 12 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      >
        <motion.div
          style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)", originY: 0 }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        Scroll
      </motion.div>
    </section>
  );
}

// ─── 斜め線セクション区切り ───
function DiagonalSection({ bg, nextBg, children, id }) {
  return (
    <section id={id} style={{
      background: bg, position: "relative",
      clipPath: "polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)",
      padding: "calc(120px + 4vw) 8vw",
      marginTop: "-4vw", marginBottom: "-4vw",
      zIndex: 1,
    }}>
      {children}
    </section>
  );
}

// ─── テキストスライドアップ（Philosophy風） ───
function PhilosophySection() {
  const boarItems = [
    { letter: "B", rest: "uild the Business",  ja: "事業を構築する" },
    { letter: "O", rest: "pen Opportunities",  ja: "機会を開く" },
    { letter: "A", rest: "ccelerate Growth",   ja: "成長を加速する" },
    { letter: "R", rest: "ealize Value",       ja: "価値を実現する" },
  ];

  return (
    <DiagonalSection bg="linear-gradient(180deg,#090c0e 0%,#0d1a14 100%)" id="philosophy">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* ② テキスト行スライドアップ */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)", marginBottom: 8 }}
        >
          ② テキスト行スライドアップ（マスクリビール）
        </motion.div>
        <div style={{ marginBottom: 16 }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", marginBottom: 16 }}
          >
            Philosophy
          </motion.div>
        </div>

        <TextReveal
          lines={["限界を超える。"]}
          fontSize="clamp(24px,3.5vw,52px)"
          color="rgba(255,255,255,0.92)"
          delay={0}
        />

        <div style={{ marginTop: 48, marginBottom: 20 }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)" }}
          >
            Our Business Stance
          </motion.div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: "clamp(120px,22vw,280px)",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "0.1em", lineHeight: 1,
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            BOAR
          </div>
          {boarItems.map((item, i) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", alignItems: "baseline",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "14px 0",
              }}
            >
              <span style={{ fontFamily: FONTS.accent, fontWeight: 900,
                fontSize: "clamp(48px,8.5vw,112px)", color: COLORS.G300,
                lineHeight: 1, minWidth: "1.1ch", letterSpacing: "-0.02em" }}>
                {item.letter}
              </span>
              <span style={{ fontFamily: FONTS.accent, fontWeight: 700,
                fontSize: "clamp(28px,5vw,64px)", color: "rgba(255,255,255,0.85)",
                lineHeight: 1, letterSpacing: "0.01em" }}>
                {item.rest}
              </span>
              <span style={{ fontFamily: FONTS.body, fontSize: "clamp(13px,1.6vw,20px)",
                color: "rgba(255,255,255,0.28)", marginLeft: "auto",
                paddingLeft: 28, whiteSpace: "nowrap" }}>
                {item.ja}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </DiagonalSection>
  );
}

// ─── カウントアップ + 横スライドイン ───
function StatsSection() {
  const stats = [
    { value: 50, suffix: "+", label: "支援実績" },
    { value: 12, suffix: "年", label: "M&A経験" },
    { value: 98, suffix: "%", label: "継続率" },
  ];

  return (
    <DiagonalSection bg="linear-gradient(180deg,#152f26 0%,#1f3d2e 100%)" id="stats">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)", marginBottom: 48 }}
        >
          ③ 数値カウントアップ
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "rgba(255,255,255,0.04)", padding: "48px 40px",
                border: "1px solid rgba(255,255,255,0.08)", borderTop: `2px solid ${COLORS.G300}` }}
            >
              <div style={{ fontFamily: FONTS.accent, fontWeight: 900,
                fontSize: "clamp(48px,7vw,96px)", color: COLORS.N500, lineHeight: 1, marginBottom: 12 }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.45)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DiagonalSection>
  );
}

// ─── 横スライドイン（What We Do風） ───
function WhatWeDoSection() {
  const points = [
    { label: "チームで入る", desc: "紹介・橋渡しではなく、PMOとして顧客に常駐。戦略設計から意思決定まで、チームとして動く。" },
    { label: "実行まで責任を持つ", desc: "提言で終わらない。共同開発・PoC・事業化ロードマップまで、全フェーズに責任を持つ。" },
    { label: "技術を価値に変換する", desc: "ディープテックの目利きから、インオーガニック成長の実現まで。技術を産業の成長に繋げる。" },
  ];

  return (
    <DiagonalSection bg="linear-gradient(180deg,#1f3d2e 0%,#2d5a40 100%)" id="whatwedo">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)", marginBottom: 48 }}
        >
          ④ 横スライドイン（交互）
        </motion.div>

        <TextReveal
          lines={["先端技術を、", "産業の成長に変換する。"]}
          fontSize="clamp(32px,5vw,72px)"
          color="rgba(255,255,255,0.92)"
          delay={0}
        />

        <div style={{ marginTop: 64 }}>
          {points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 32,
                padding: "32px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
                letterSpacing: "0.15em", color: COLORS.G300, minWidth: 32,
                paddingTop: 4 }}>
                0{i + 1}
              </div>
              <div>
                <div style={{ fontFamily: FONTS.display, fontSize: "clamp(18px,2vw,24px)",
                  color: "rgba(255,255,255,0.92)", fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
                  {p.label}
                </div>
                <p style={{ fontFamily: FONTS.body, fontSize: 14,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.9, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DiagonalSection>
  );
}

// ─── スムーズスクロールナビ ───
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(9,12,14,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      transition: "all 0.4s ease",
      padding: "14px 8vw",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{ fontFamily: FONTS.accent, fontSize: 16, fontWeight: 900,
        color: COLORS.N500, letterSpacing: "0.04em" }}>
        BOAR
      </div>
      <nav style={{ display: "flex", gap: 28 }}>
        {[["①ヒーロー", "#hero"], ["②フィロソフィー", "#philosophy"],
          ["③カウント", "#stats"], ["④スライド", "#whatwedo"]].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.color = "#fff"}
            onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}
          >
            {label}
          </a>
        ))}
        <a href="/" style={{
          fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: COLORS.G300, textDecoration: "none",
          padding: "6px 14px", border: `1px solid ${COLORS.G300}`,
        }}>
          ← 本番サイト
        </a>
      </nav>
    </header>
  );
}

// ─── MAIN ───
export default function AnimTest() {
  return (
    <div style={{ overflowX: "hidden", background: COLORS.N100 }}>
      <NavBar />
      <div id="hero"><HeroParallax /></div>
      <PhilosophySection />
      <StatsSection />
      <WhatWeDoSection />

      {/* 解説フッター */}
      <div style={{
        background: COLORS.N100, padding: "80px 8vw",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)", marginBottom: 32 }}>
            実装内容まとめ
          </div>
          {[
            ["① パララックス背景", "useScroll + useTransform（Framer Motion）でヒーロー背景が視差で動く"],
            ["② テキストマスクリビール", "overflow:hidden ラッパー内で translateY(110%) → 0。行ごとに0.1s遅延"],
            ["③ カウントアップ", "useInView × requestAnimationFrame。ease-out cubic でなめらかに"],
            ["④ 横スライドイン", "交互に左右から。whileInView + viewport.once=true"],
            ["⑤ 斜め線区切り", "clip-path: polygon() でセクション上下を斜めカット。margin負値で重ねる"],
            ["⑥ スムーズスクロール", "Lenis（duration:1.2）。ページ全体のスクロールがなめらかになる"],
          ].map(([title, desc]) => (
            <div key={title} style={{
              display: "flex", gap: 24, padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
                color: COLORS.G300, minWidth: 200, flexShrink: 0 }}>
                {title}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13,
                color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
