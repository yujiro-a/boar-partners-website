import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Briefcase, BookOpen, Cpu, FlaskConical, TrendingUp } from "lucide-react";
import { Header, Footer, useIsMobile, navigateWithTransition } from "./shared.jsx";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const COLORS = {
  G050: "#0d1a14",
  G100: "#152f26", G200: "#2d5a40", G300: "#5a8c73", G400: "#b0d4c0", G500: "#e0eeea",
  G150: "#0a1a12",
  G250: "#4a8060",
  N100: "#090c0e", N200: "#47494a", N300: "#848686", N400: "#c2c2c3", N500: "#ffffff",
  darkCard:   "rgba(255,255,255,0.04)",
  darkBorder: "rgba(255,255,255,0.09)",
  darkHL:     "rgba(255,255,255,0.92)",
  darkBody:   "rgba(255,255,255,0.45)",
  // Alpha variants — ハードコード rgba を集約
  darkSub18:  "rgba(255,255,255,0.18)",
  darkSub30:  "rgba(255,255,255,0.30)",
  darkSub35:  "rgba(255,255,255,0.35)",
  darkSub38:  "rgba(255,255,255,0.38)",
  darkSub50:  "rgba(255,255,255,0.50)",
  darkLine10: "rgba(255,255,255,0.10)",
  darkLine12: "rgba(255,255,255,0.12)",
  darkLine15: "rgba(255,255,255,0.15)",
  // Light section（Services/About/Releases背景）
  lightText:   "#0d1a14",
  lightBody:   "rgba(9,12,14,0.55)",
  lightBorder: "rgba(9,12,14,0.12)",
  lightLabel:  "rgba(9,12,14,0.38)",
  lightAccent: "#2d5a40",
  lightLine:   "rgba(9,26,20,0.28)",
};

// ─── カード共通エントランスアニメーション ───
const cardEntrance = (i = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, margin: "-20px" },
});

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
            transition={{ duration: 0.95, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: fontFamily || FONTS.display, fontSize, color, fontWeight }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── FadeIn (framer-motion版) ───
function FadeIn({ children, delay = 0, style: extra = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      style={extra}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionLabel ───
const SectionLabel = ({ children, color, fontSize, style: extStyle }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.7 }}
    style={{
      fontFamily: FONTS.accent, fontSize: fontSize || "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.01em",
      textTransform: "uppercase", fontWeight: 900, marginBottom: 32,
      color: color || COLORS.G300,
      ...extStyle,
    }}
  >
    {children}
  </motion.div>
);

// ─── フラットセクション（旧DiagSection） ───
function DiagSection({ children, bg, style: extra = {}, id }) {
  return (
    <section id={id} style={{
      background: bg,
      padding: "100px 8vw",
      position: "relative",
      zIndex: 1,
      ...extra,
    }}>
      {children}
    </section>
  );
}

// ─── 共通 CTA ストリップ（P10デザイン統一）───
// variant: "dark"（暗背景）| "light"（明背景）
function SectionCTAStrip({ href, bigLabel, label, title, variant = "dark" }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const isDark = variant === "dark";

  const lineColor    = isDark ? "rgba(61,168,96,0.45)"   : "rgba(9,12,14,0.18)";
  const glowColor    = isDark ? "rgba(61,168,96,0.1)"    : "rgba(9,12,14,0.05)";
  const bgHoverGrad  = isDark
    ? "linear-gradient(to right, rgba(45,90,64,0.12) 0%, transparent 60%)"
    : "linear-gradient(to right, rgba(9,12,14,0.08) 0%, transparent 60%)";
  const bigDefault   = isDark ? "rgba(255,255,255,0.1)"  : "rgba(9,12,14,0.08)";
  const bigHover     = isDark ? "rgba(255,255,255,0.22)" : "rgba(9,12,14,0.16)";
  const vlineColor   = isDark ? "rgba(61,168,96,0.2)"    : "rgba(9,12,14,0.15)";
  const labelColor   = isDark ? "rgba(61,168,96,0.55)"   : "rgba(9,12,14,0.4)";
  const titleDefault = isDark ? "rgba(255,255,255,0.5)"  : "rgba(9,12,14,0.5)";
  const titleHover   = isDark ? "rgba(255,255,255,0.85)" : "rgba(9,12,14,0.85)";
  const arrowDefault = isDark ? "rgba(61,168,96,0.4)"    : "rgba(9,12,14,0.3)";
  const arrowHover   = isDark ? COLORS.G300               : "rgba(9,12,14,0.75)";

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", background: hovered ? bgHoverGrad : "transparent", cursor: "pointer", position: "relative", textDecoration: "none", transition: "background 0.3s" }}
    >
      {/* グロー線 */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(to right, transparent, ${lineColor} 30%, ${lineColor} 70%, transparent)` }} />
      <div style={{ position: "absolute", top: -8, left: "25%", right: "25%", height: 18, background: `radial-gradient(ellipse 60% 100% at 50% 100%, ${glowColor} 0%, transparent 100%)`, pointerEvents: "none" }} />
      {/* コンテンツ */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "20px 6vw" : "28px 8vw", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 8 : 36, position: "relative", zIndex: 1 }}>
        {isMobile ? (
          <>
            <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(36px,11vw,56px)", color: hovered ? bigHover : bigDefault, letterSpacing: "-0.03em", lineHeight: 1, transition: "color 0.3s" }}>{bigLabel}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div>
                <div style={{ fontFamily: FONTS.accent, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: labelColor, marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(14px,4vw,18px)", color: hovered ? titleHover : titleDefault, letterSpacing: "-0.01em", transition: "color 0.3s" }}>{title}</div>
              </div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.1em", color: hovered ? arrowHover : arrowDefault, transition: "color 0.3s", whiteSpace: "nowrap" }}>→</div>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(48px,7vw,80px)", color: hovered ? bigHover : bigDefault, letterSpacing: "-0.03em", lineHeight: 1, whiteSpace: "nowrap", transition: "color 0.3s", flexShrink: 0 }}>{bigLabel}</div>
            <div style={{ width: 1, height: 48, background: vlineColor, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: FONTS.accent, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: labelColor, marginBottom: 5 }}>{label}</div>
              <div style={{ fontFamily: FONTS.accent, fontWeight: 900, fontSize: "clamp(15px,1.5vw,20px)", color: hovered ? titleHover : titleDefault, letterSpacing: "-0.01em", transition: "color 0.3s" }}>{title}</div>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.1em", color: hovered ? arrowHover : arrowDefault, transition: "color 0.3s, transform 0.3s", transform: hovered ? "translateX(6px)" : "translateX(0)", whiteSpace: "nowrap" }}>詳しく見る →</div>
          </>
        )}
      </div>
    </a>
  );
}

// ─── P10 グロー線セパレーター ───
function GlowDivider() {
  return (
    <div style={{ position: "relative", height: 1, overflow: "visible", zIndex: 2 }}>
      {/* グリーン光る線 */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(to right, transparent, rgba(61,168,96,0.5) 30%, rgba(61,168,96,0.5) 70%, transparent)",
      }} />
      {/* 上方向グロー */}
      <div style={{
        position: "absolute", top: -8, left: "25%", right: "25%", height: 18,
        background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(61,168,96,0.1) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── グリッドオーバーレイ ───
const GridOverlay = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  </svg>
);

// ─── TYPEWRITER ───
function TypewriterText({ text, loop = false }) {
  const flat = text.replace(/\n/g, " ");
  const [pos, setPos] = useState(0);
  const done = pos >= flat.length;
  useEffect(() => {
    const t = setInterval(() => setPos(p => {
      if (p >= flat.length) return loop ? 0 : p;
      return p + 1;
    }), 80);
    return () => clearInterval(t);
  }, [loop, flat.length]);

  const lines = text.split("\n");
  let gi = 0;
  const lineNodes = lines.map((line, li) => {
    const charSpans = line.split("").map((ch) => {
      const idx = gi++;
      const isCursor = idx + 1 === pos && !done;
      return (
        <React.Fragment key={`ch${idx}`}>
          <span style={{ opacity: idx < pos ? 1 : 0, transition: "opacity 0.05s" }}>{ch}</span>
          {isCursor && <span style={{ animation: "cursorBlink 1.8s linear infinite", color: "#555", marginLeft: "1px" }}>|</span>}
        </React.Fragment>
      );
    });
    return (
      <span key={`line${li}`} style={{ display: "block", whiteSpace: "nowrap" }}>
        {charSpans}
      </span>
    );
  });
  if (done) {
    lineNodes[lineNodes.length - 1] = (
      <span key={`line${lines.length - 1}-done`} style={{ display: "block", whiteSpace: "nowrap" }}>
        {lines[lines.length - 1].split("").map((ch, i) => (
          <span key={i} style={{ opacity: 1 }}>{ch}</span>
        ))}
        <span key="cursor-end" style={{ animation: "cursorBlink 1.8s linear infinite", color: "#555", marginLeft: "1px" }}>|</span>
      </span>
    );
  }
  return <>{lineNodes}</>;
}

// ─── MOBILE HERO (独立コンポーネント — useScroll を mount 後に確実に設定) ───
function MobileHero({ rightBlocks, bgStyle, styles }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.0005 });

  // 初期: タイトルを少し下に → スクロールで自然位置へ浮き上がる
  const titleY = useTransform(smooth, [0, 0.2], ["14vh", "0vh"]);
  const subOpacity = useTransform(smooth, [0.06, 0.18], [0, 1]);
  const dividerOpacity = useTransform(smooth, [0.06, 0.18], [0, 1]);

  // block0: スクロール開始と同時にタイトルと連動して浮き上がる
  const block0Op = useTransform(smooth, [0.08, 0.20, 0.30, 0.37], [0, 1, 1, 0]);
  const block1Op = useTransform(smooth, [0.37, 0.43, 0.54, 0.61], [0, 1, 1, 0]);
  const block2Op = useTransform(smooth, [0.61, 0.67, 0.86], [0, 1, 1]);
  const block0Y  = useTransform(smooth, [0.08, 0.20, 0.30, 0.37], ["28px", "0px", "0px", "-40px"]);
  const block1Y  = useTransform(smooth, [0.37, 0.43, 0.54, 0.61], ["40px", "0px", "0px", "-40px"]);
  const block2Y  = useTransform(smooth, [0.61, 0.67, 0.86], ["40px", "0px", "0px"]);
  const dot0 = useTransform(smooth, [0.22, 0.37], [1, 0]);
  const dot1 = useTransform(smooth, [0.37, 0.43, 0.54, 0.61], [0, 1, 1, 0]);
  const dot2 = useTransform(smooth, [0.61, 0.67], [0, 1]);
  const blockOps = [block0Op, block1Op, block2Op];
  const blockYs  = [block0Y,  block1Y,  block2Y];
  const dots     = [dot0, dot1, dot2];

  return (
    <div ref={containerRef} style={{ height: "360vh", position: "relative" }}>
      {styles}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        ...bgStyle, overflow: "clip",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: "0 6vw", boxSizing: "border-box",
      }}>
        {/* 背景グリッド */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <svg style={{ width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hgm" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hgm)"/>
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
          {/* タイトル + 仕切り線 — y: titleY と opacity アニメーションを分離 */}
          <motion.div style={{ flexShrink: 0, y: titleY }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: FONTS.accent, fontSize: "clamp(56px,15vw,88px)",
              color: COLORS.N500, letterSpacing: "0.02em", lineHeight: 1.15, fontWeight: 900,
            }}>
              <TypewriterText text={"Deep tech,\nfor industry"} />
            </div>
            <motion.div style={{
              fontFamily: FONTS.accent, fontSize: "clamp(11px,3vw,13px)", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", marginTop: 16,
              opacity: subOpacity,
            }}>
              Strategy &amp; Execution Consulting
            </motion.div>
            <motion.div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "32px 0 40px", opacity: dividerOpacity }} />
          </motion.div>
          </motion.div>

          {/* ブロック切り替えエリア */}
          <div style={{ position: "relative", minHeight: "260px" }}>
            {rightBlocks.map((block, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  opacity: blockOps[i],
                  y: blockYs[i],
                }}
              >
                <div style={{
                  fontFamily: FONTS.accent, fontSize: "clamp(11px,3vw,12px)", fontWeight: 700,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: COLORS.G400, marginBottom: 12,
                }}>
                  {String(i + 1).padStart(2, "0")} — {block.label}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: "clamp(26px,7vw,34px)",
                  color: COLORS.N500, fontWeight: 300, lineHeight: 1.3, marginBottom: 14,
                }}>
                  {block.heading.split("\n").map((line, li, arr) => (
                    <span key={li}>
                      {line.split("BOAR").map((part, pi, parr) => (
                        <span key={pi}>{part}{pi < parr.length - 1 && (
                          <span style={{ color: COLORS.G300, fontWeight: 900, fontFamily: FONTS.accent, letterSpacing: "0.15em" }}>BOAR</span>
                        )}</span>
                      ))}
                      {li < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <p style={{
                  fontFamily: FONTS.body, fontSize: "clamp(13px,3.5vw,14px)",
                  color: COLORS.darkSub38, lineHeight: 1.9, margin: 0, fontWeight: 300,
                }}>
                  {block.body.split("\n").map((line, li, arr) => (
                    <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ドットインジケーター */}
          <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
            {dots.map((dot, i) => (
              <motion.div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: COLORS.G400, opacity: dot,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO (Sticky Scroll — Dirbato型) ───
function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Dirbato の scrub: 0.5 相当 — spring で慣性を付けてなめらかに
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.0005 });

  const rightBlocks = [
    {
      label: "The Reality",
      heading: "この国の研究室には\n世界に認められた\n最高の技術がある",
      body: "フィジカルAI、素材科学、バイオ、量子——\n日本の研究機関が生み出す技術は、世界水準にあります。\nノーベル賞の実績、膨大な特許、世界最高峰の論文。\n日本には間違いなく、最高の技術があります。",
    },
    {
      label: "The Question",
      heading: "しかし現実には\n研究室と産業の間に\n深いキャズムがある",
      body: "数億円を調達したディープテック企業が、静かに消えていきます。\n世界水準の論文が、特許になっても製品になりません。\n研究者が起業しても、2年で資金が尽きます。\nこの国では、技術が産業になる前に止まります。",
    },
    {
      label: "Our Origin",
      heading: "なぜ 越えられないのか\nその問いから\nBOARの挑戦は始まった",
      body: "知の探究と、利益の追求——冷静に見れば、相容れない二つの世界です。\n言語も、思想も、判断軸も、根本から違う。\nそれでも、誰かが橋を架けなければならない。\nその確信から、私たちの挑戦は始まりました。",
    },
  ];

  // ── Phase 1（0→0.10）: フルヒーロー → 2カラムへの移行（560vh × 0.10 = 56vh）
  const titleScale    = useTransform(smooth, [0, 0.10], [1.3, 1]);
  const dividerOp     = useTransform(smooth, [0.05, 0.12], [0, 1]);
  const dividerScaleY = useTransform(smooth, [0.05, 0.12], [0, 1]);
  const rightColOp    = useTransform(smooth, [0.07, 0.14], [0, 1]);
  const labelOp       = useTransform(smooth, [0.15, 0.35], [0, 1]);
  const rightColY     = useTransform(smooth, [0.07, 0.14], ["40px", "0px"]);

  // ── Phase 2: 3ブロック均等配分（560vh × 0.90 ÷ 3 ≈ 各168vh）
  // Block 0: 完全 0.10→0.32  Block 1: 完全 0.47→0.65  Block 2: 完全 0.80→1.0
  const block0Opacity = useTransform(smooth, [0.10, 0.32, 0.42], [1, 1, 0]);
  const block1Opacity = useTransform(smooth, [0.37, 0.47, 0.65, 0.75], [0, 1, 1, 0]);
  const block2Opacity = useTransform(smooth, [0.70, 0.80, 1],    [0, 1, 1]);

  const block0Y = useTransform(smooth, [0.10, 0.20, 0.32, 0.42], ["30px", "0px", "0px", "-30px"]);
  const block1Y = useTransform(smooth, [0.37, 0.47, 0.65, 0.75], ["30px", "0px", "0px", "-30px"]);
  const block2Y = useTransform(smooth, [0.70, 0.80, 1.0],        ["30px", "0px", "0px"]);

  const dot0 = useTransform(smooth, [0.10, 0.42], [1, 0]);
  const dot1 = useTransform(smooth, [0.37, 0.47, 0.65, 0.75], [0, 1, 1, 0]);
  const dot2 = useTransform(smooth, [0.70, 0.80], [0, 1]);

  const opacities = [block0Opacity, block1Opacity, block2Opacity];
  const ys        = [block0Y, block1Y, block2Y];
  const dots      = [dot0, dot1, dot2];

  const lineScaleY = useTransform(smooth, [0, 1], [0, 1]);

  const bgStyle = {
    background: `linear-gradient(170deg, ${COLORS.N100} 0%, #0a1a12 50%, ${COLORS.G100} 100%)`,
  };

  const styles = <style>{`
    @keyframes cursorBlink { 0%,71%{opacity:1} 72%,100%{opacity:0} }
    @keyframes gridDrift   { 0%{transform:translateY(0)}100%{transform:translateY(-100px)} }
    @keyframes particleRise{ 0%{transform:translateY(0);opacity:0}10%{opacity:0.6}90%{opacity:0.3}100%{transform:translateY(-100vh);opacity:0} }
    @keyframes lineRun1    { 0%{opacity:0;transform:rotate(18deg) scaleX(2) translateX(-60%)}15%{opacity:1}85%{opacity:0.5}100%{opacity:0;transform:rotate(18deg) scaleX(2) translateX(60%)} }
    @keyframes lineRun2    { 0%{opacity:0;transform:rotate(-12deg) scaleX(2) translateX(60%)}15%{opacity:1}85%{opacity:0.35}100%{opacity:0;transform:rotate(-12deg) scaleX(2) translateX(-60%)} }
    @media(max-width:768px){.desktop-nav{display:none!important}.mobile-menu-btn{display:block!important}}
    @media(min-width:769px){.mobile-menu-btn{display:none!important}}
  `}</style>;

  // ── モバイル: MobileHero コンポーネントに委譲 ──
  if (isMobile) return <MobileHero rightBlocks={rightBlocks} bgStyle={bgStyle} styles={styles} />;

  // ── デスクトップ: Sticky Scroll ──
  return (
    <div ref={containerRef} style={{ height: "560vh", position: "relative" }}>
      {styles}

      {/* Sticky ビューポート */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        background: `linear-gradient(170deg, ${COLORS.N100} 0%, #0a1a12 50%, ${COLORS.G100} 100%)`,
        overflow: "clip",
        display: "flex", alignItems: "center",
      }}>
        {/* 背景グリッド */}
        <div style={{ position: "absolute", inset: "-100px 0 0 0", overflow: "hidden" }}>
          <svg style={{ width: "100%", height: "calc(100% + 100px)", opacity: 0.05, animation: "gridDrift 8s linear infinite" }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hg" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hg)"/>
          </svg>
        </div>
        <div style={{ position: "absolute", top: "15%", left: "-10%", width: "70%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)", animation: "lineRun1 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "62%", right: "-10%", width: "60%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent)", animation: "lineRun2 8s ease-in-out 2s infinite" }} />
        {[{x:12,s:1.5,d:0,dur:9},{x:45,s:2,d:1,dur:8},{x:75,s:1.5,d:0.5,dur:10},{x:88,s:1,d:2,dur:9.5}].map((p,i) => (
          <div key={i} style={{ position: "absolute", left: `${p.x}%`, bottom: 0, width: p.s, height: p.s, borderRadius: "50%", background: "rgba(255,255,255,0.5)", animation: `particleRise ${p.dur}s ease-in ${p.d}s infinite` }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 100% 100%, rgba(4,10,8,0.7) 0%, transparent 60%)", pointerEvents: "none" }} />

        {/* 2カラムレイアウト */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 8vw", display: "flex", alignItems: "center", gap: 0 }}>

          {/* 左: タイトル（スクロール開始でスケールダウン） */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <motion.div style={{
              scale: titleScale,
              transformOrigin: "left center",
              fontFamily: FONTS.accent, fontSize: "clamp(44px,6.5vw,96px)",
              color: COLORS.N500, letterSpacing: "0.02em", lineHeight: 1.05, fontWeight: 900,
            }}>
              <TypewriterText text={"Deep tech,\nfor industry"} />
            </motion.div>
            <motion.div style={{
              opacity: labelOp, marginTop: "clamp(16px,2vw,28px)",
              fontFamily: FONTS.accent, fontSize: "clamp(16px,1.8vw,26px)", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap",
            }}>
              Strategy &amp; Execution Consulting
            </motion.div>
          </div>

          {/* 縦線 */}
          <motion.div style={{
            width: 1, height: "68vh", background: "rgba(255,255,255,0.12)",
            flexShrink: 0, opacity: dividerOp, scaleY: dividerScaleY, originY: "0%",
            marginLeft: "2vw", marginRight: "6vw",
          }} />

          {/* 右: スクロールで出現 → ブロック切り替え（案A: 固定高さ＋垂直中央） */}
          <motion.div style={{
            flex: 1, minWidth: 0,
            position: "relative", height: "68vh",
            opacity: rightColOp, y: rightColY,
          }}>
            {rightBlocks.map((block, i) => (
              <div key={i} style={{
                position: "absolute", top: "50%", left: 0, right: 0,
                transform: "translateY(-50%)",
              }}>
              <motion.div
                style={{
                  opacity: opacities[i],
                  y: ys[i],
                  willChange: "opacity, transform",
                }}
              >
                {/* ラベル */}
                <div style={{
                  fontFamily: FONTS.accent, fontSize: "clamp(14px, 1.2vw, 18px)", fontWeight: 700,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: COLORS.G400, marginBottom: 20,
                }}>
                  {String(i + 1).padStart(2, "0")} — {block.label}
                </div>
                {/* 見出し */}
                <div style={{
                  fontFamily: FONTS.body, fontSize: "clamp(26px,3.2vw,48px)",
                  color: COLORS.N500, fontWeight: 300, lineHeight: 1.35, marginBottom: 28,
                }}>
                  {block.heading.split("\n").map((line, li, arr) => (
                    <span key={li}>
                      {line.split("BOAR").map((part, pi, parr) => (
                        <span key={pi}>{part}{pi < parr.length - 1 && <span style={{ color: COLORS.G300, fontWeight: 900, fontFamily: FONTS.accent, letterSpacing: "0.15em" }}>BOAR</span>}</span>
                      ))}
                      {li < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
                {/* 本文（空の場合は非表示） */}
                {block.body && (
                  <p style={{
                    fontFamily: FONTS.body, fontSize: "clamp(14px,1.3vw,17px)",
                    color: "rgba(255,255,255,0.38)", lineHeight: 2.1,
                    fontWeight: 300,
                  }}>
                    {block.body.split("\n").map((line, li, arr) => (
                      <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                )}
              </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 左下: スクロールプログレス + ドット */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
          style={{
            position: "absolute", bottom: 40, left: "8vw",
            display: "flex", alignItems: "flex-end", gap: 16,
          }}
        >
          {/* 縦プログレスバー */}
          <div style={{ position: "relative", width: 1, height: 80, background: "rgba(255,255,255,0.1)" }}>
            <motion.div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              background: COLORS.G300, originY: 0, scaleY: lineScaleY,
            }} />
          </div>
          {/* ドット */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 2 }}>
            {dots.map((dotOpacity, i) => (
              <div key={i} style={{ position: "relative", width: 6, height: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <motion.div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: COLORS.G300, opacity: dotOpacity,
                }} />
              </div>
            ))}
          </div>
          {/* Scroll テキスト */}
          <div style={{
            fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.18)", textTransform: "uppercase",
            writingMode: "vertical-rl", paddingBottom: 4,
          }}>Scroll</div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── ALLIANCE ───
// ── Ecosystem logos — フラット管理。増えたらカテゴリ分類を検討 ──
const ALLIANCE_LOGOS = [
  { name: "commissure", sub: "Deep Tech × 製造業", logo: "/logos/commissure.svg" },
  { name: "Parkour Japan", sub: "スポーツ × フィジカルアーツ", logo: "/logos/parkour-japan.webp" },
  { name: "東京大学", sub: "アカデミア × 産学連携", logo: "/logos/tokyo-university.svg" },
  { name: "みずほ", sub: "メガバンク × 産業DX", logo: "/logos/mizuho.svg" },
  { name: "三菱UFJ銀行", sub: "メガバンク × 産業ファイナンス", logo: "/logos/mufg.svg" },
  { placeholder: true },
];

// ─── TICKER STRIP ───
function TickerStrip() {
  return (
    <>
      <style>{`
        @keyframes fd-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fd-scan   { 0%{left:-220px} 100%{left:110%} }
      `}</style>
      <div style={{ position: "relative", height: 38, overflow: "hidden", background: "#040a06", borderTop: "1px solid rgba(61,168,96,0.3)", borderBottom: "1px solid rgba(61,168,96,0.3)" }}>
        <div style={{ position: "absolute", top: 0, width: 220, height: "100%", background: "linear-gradient(to right, transparent, rgba(61,168,96,0.14) 50%, transparent)", animation: "fd-scan 4s linear infinite", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 120, height: "100%", background: "linear-gradient(to right, #040a06, transparent)", zIndex: 3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 120, height: "100%", background: "linear-gradient(to left, #040a06, transparent)", zIndex: 3, pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", height: "100%", animation: "fd-ticker 30s linear infinite", whiteSpace: "nowrap" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <React.Fragment key={i}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 11, color: "rgba(61,168,96,0.88)", textShadow: "0 0 8px rgba(61,168,96,0.75), 0 0 20px rgba(61,168,96,0.35)", letterSpacing: "0.14em", padding: "0 26px", whiteSpace: "nowrap" }}>{item}</span>
              <span style={{ color: "rgba(61,168,96,0.28)", fontSize: 10, flexShrink: 0 }}>›</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}


// ─── FOCUS DOMAINS ───
const FOCUS_DOMAINS_DATA = [
  {
    num: "01", name: "Physical AI", id: "PA",
    desc: "デジタルが物理世界に直接介入する技術群——触覚、ロボティクス、センシング。commissureとのForward R&D実績を起点に、製造業・建設の現場を変える。",
    img: "https://www.shutterstock.com/image-illustration/semiconductor-manufacturing-3d-rendering-robotic-600nw-2649884261.jpg",
    maturity: 72,
  },
  {
    num: "02", name: "Agentic AI", id: "AA",
    desc: "指示を待つAIから、自ら判断し行動するAIへ。意思決定の構造そのものを再設計する。人月依存の業務構造を根本から変える次世代アーキテクチャ。",
    img: "https://www.shutterstock.com/image-vector/ai-agents-orchestration-workflow-diagram-600nw-2706465509.jpg",
    maturity: 58,
  },
  {
    num: "03", name: "Quantum Technology", id: "QT",
    desc: "研究は世界水準、産業化支援は空白。年間1,000億円超の国家予算が動く。キャズムが最も深い領域に、BOARは正面から入る。",
    img: "https://www.shutterstock.com/image-illustration/futuristic-quantum-computing-machine-glowing-atomic-600nw-2621003427.jpg",
    maturity: 34,
  },
  {
    num: "04", name: "Next Domain", id: "ND",
    desc: "新たな技術領域への挑戦。詳細は近日公開予定。",
    img: null, comingSoon: true, maturity: 0,
  },
];

const TICKER_ITEMS = ["PHYSICAL AI", "AGENTIC AI", "QUANTUM TECHNOLOGY", "DEEP TECH", "FORWARD R&D", "INDUSTRIAL INNOVATION", "BOAR PARTNERS", "技術の社会実装"];

function FocusDomains() {
  const [idx, setIdx] = useState(0);
  const [trans, setTrans] = useState(true);
  const drag = useRef({ active: false, startX: 0 });
  const isMobile = useIsMobile();
  const N = FOCUS_DOMAINS_DATA.length;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "0px 0px -20% 0px" });

  // セクションがスクロールで視野に入ったらフィジカルAI（idx=0）にリセット
  useEffect(() => {
    if (inView) setIdx(0);
  }, [inView]);

  const go = useCallback((i) => {
    setIdx(((i % N) + N) % N);
    setTrans(true);
  }, [N]);

  const getCardStyle = (i) => {
    const diff = ((i - idx + N) % N);
    const GAP = isMobile ? 140 : 280;
    if (diff === 0)     return { x: 0,    ry: 0,   scale: 1,    opacity: 1,    zIndex: 3 };
    if (diff === 1)     return { x: GAP,  ry: -48, scale: 0.76, opacity: 0.52, zIndex: 2 };
    if (diff === N - 1) return { x: -GAP, ry: 48,  scale: 0.76, opacity: 0.52, zIndex: 2 };
    return                     { x: 0,    ry: 0,   scale: 0.4,  opacity: 0,    zIndex: 0 };
  };

  const CARD_W = isMobile ? 290 : 540;
  const CARD_H = isMobile ? 260 : 320;

  return (
    <section ref={sectionRef} id="domains" style={{ padding: "140px 0 0", scrollMarginTop: "80px", background: "linear-gradient(180deg,#090c0e 0%,#0d1a14 100%)", position: "relative", overflow: "hidden" }}>

      {/* ── Section header ── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 8vw", marginBottom: 24 }}>
        <SectionLabel>Deep Tech Ecosystem</SectionLabel>
        <SectionLabel fontSize="clamp(20px,2.4vw,34px)" color={COLORS.G400} style={{ marginBottom: 16 }}>Focus Domains</SectionLabel>
        <FadeIn delay={0.1}>
          <TextReveal
            lines={["先端技術を社会に実装する"]}
            fontSize="clamp(36px,4.8vw,58px)"
            style={{ marginBottom: 0 }}
          />
        </FadeIn>
      </div>

      {/* ── Coverflow ── */}
      <div
        style={{ width: "100%", height: CARD_H + 40, perspective: "1200px", position: "relative", userSelect: "none", overflow: "hidden" }}
        onMouseDown={e => { drag.current = { active: true, startX: e.clientX }; }}
        onTouchStart={e => { drag.current = { active: true, startX: e.touches[0].clientX }; }}
        onMouseUp={e => {
          if (!drag.current.active) return;
          const dx = e.clientX - drag.current.startX;
          if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
          drag.current.active = false;
        }}
        onTouchEnd={e => {
          if (!drag.current.active) return;
          const dx = e.changedTouches[0].clientX - drag.current.startX;
          if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
          drag.current.active = false;
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "16%", height: "100%", background: "linear-gradient(to right, #090c0e, transparent)", zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "16%", height: "100%", background: "linear-gradient(to left, #0d1a14, transparent)", zIndex: 10, pointerEvents: "none" }} />

        {FOCUS_DOMAINS_DATA.map((domain, i) => {
          const { x, ry, scale, opacity, zIndex } = getCardStyle(i);
          const diff = ((i - idx + N) % N);
          const isCenter = diff === 0;
          return (
            <div
              key={i}
              onClick={() => {
                if (!isCenter) { go(i); return; }
                if (!domain.comingSoon) navigateWithTransition(`/ecosystem#domain-${domain.num}`);
              }}
              style={{
                position: "absolute",
                width: CARD_W, height: CARD_H,
                left: `calc(50% - ${CARD_W / 2}px)`,
                top: 20,
                borderRadius: 14, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.09)",
                transform: `translateX(${x}px) rotateY(${ry}deg) scale(${scale})`,
                opacity, zIndex,
                transition: trans ? "transform 0.65s cubic-bezier(0.23,1,0.32,1), opacity 0.65s ease" : "none",
                cursor: (isCenter && !domain.comingSoon) ? "pointer" : isCenter ? "default" : "pointer",
                boxShadow: isCenter ? "0 24px 60px rgba(0,0,0,0.6)" : "none",
              }}
            >
              {domain.comingSoon ? (
                <>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0a1410 0%,#040a06 100%)" }} />
                  {/* Grid lines */}
                  <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(61,168,96,.012) 40px,rgba(61,168,96,.012) 41px),repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(61,168,96,.012) 40px,rgba(61,168,96,.012) 41px)" }} />
                  {/* Corner brackets */}
                  <div style={{ position: "absolute", top: 14, left: 14, width: 16, height: 16, borderTop: "1.5px solid rgba(61,168,96,.28)", borderLeft: "1.5px solid rgba(61,168,96,.28)" }} />
                  <div style={{ position: "absolute", top: 14, right: 14, width: 16, height: 16, borderTop: "1.5px solid rgba(61,168,96,.28)", borderRight: "1.5px solid rgba(61,168,96,.28)" }} />
                  <div style={{ position: "absolute", bottom: 14, left: 14, width: 16, height: 16, borderBottom: "1.5px solid rgba(61,168,96,.28)", borderLeft: "1.5px solid rgba(61,168,96,.28)" }} />
                  <div style={{ position: "absolute", bottom: 14, right: 14, width: 16, height: 16, borderBottom: "1.5px solid rgba(61,168,96,.28)", borderRight: "1.5px solid rgba(61,168,96,.28)" }} />
                  {/* Ghost number */}
                  <div style={{ position: "absolute", fontFamily: FONTS.accent, fontWeight: 900, fontSize: isMobile ? 150 : 220, color: "rgba(255,255,255,.03)", bottom: -24, right: -8, lineHeight: 1, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none" }}>04</div>
                  <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "22px 24px 40px" : "30px 38px 56px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
                    <div style={{ fontFamily: FONTS.accent, fontSize: 13, letterSpacing: "0.20em", color: "rgba(61,168,96,.3)", textTransform: "uppercase" }}>Pillar 04</div>
                    <div style={{ fontFamily: FONTS.accent, fontSize: isMobile ? 30 : 46, fontWeight: 900, color: "rgba(255,255,255,0.12)", letterSpacing: "-0.02em", lineHeight: 0.9 }}>
                      Next<br />Domain
                    </div>
                    <div style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.22em", color: "rgba(61,168,96,.3)", textTransform: "uppercase" }}>Coming Soon</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Full bleed image */}
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${domain.img})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35) saturate(0.7)" }} />
                  {/* Grid lines */}
                  <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(61,168,96,.022) 40px,rgba(61,168,96,.022) 41px),repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(61,168,96,.022) 40px,rgba(61,168,96,.022) 41px)" }} />
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(4,10,6,.9) 0%,rgba(4,10,6,.35) 100%)" }} />
                  {/* Corner brackets */}
                  <div style={{ position: "absolute", top: 14, left: 14, width: 16, height: 16, borderTop: "1.5px solid rgba(61,168,96,.55)", borderLeft: "1.5px solid rgba(61,168,96,.55)" }} />
                  <div style={{ position: "absolute", top: 14, right: 14, width: 16, height: 16, borderTop: "1.5px solid rgba(61,168,96,.55)", borderRight: "1.5px solid rgba(61,168,96,.55)" }} />
                  <div style={{ position: "absolute", bottom: 14, left: 14, width: 16, height: 16, borderBottom: "1.5px solid rgba(61,168,96,.55)", borderLeft: "1.5px solid rgba(61,168,96,.55)" }} />
                  <div style={{ position: "absolute", bottom: 14, right: 14, width: 16, height: 16, borderBottom: "1.5px solid rgba(61,168,96,.55)", borderRight: "1.5px solid rgba(61,168,96,.55)" }} />
                  {/* Ghost number */}
                  <div style={{ position: "absolute", fontFamily: FONTS.accent, fontWeight: 900, fontSize: isMobile ? 150 : 220, color: "rgba(255,255,255,.05)", bottom: -24, right: -8, lineHeight: 1, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none" }}>{domain.num}</div>
                  {/* Content */}
                  <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "22px 24px 40px" : "30px 38px 56px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
                    <div style={{ fontFamily: FONTS.accent, fontSize: 13, letterSpacing: "0.20em", color: "rgba(61,168,96,.55)", textTransform: "uppercase" }}>Pillar {domain.num}</div>
                    <div style={{ fontFamily: FONTS.accent, fontSize: isMobile ? 30 : 46, fontWeight: 900, color: "#f0f0f0", letterSpacing: "-0.02em", lineHeight: 0.9 }}>
                      {domain.name.split(' ').map((w, i, arr) => <span key={i}>{w}{i < arr.length - 1 && <br />}</span>)}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Navigation ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 24 }}>
        <button
          onClick={() => go(idx - 1)}
          style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {Array.from({ length: N }).map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i === idx ? COLORS.G300 : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
          ))}
        </div>
        <button
          onClick={() => go(idx + 1)}
          style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* ── Alliance Partners ── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "80px 8vw 56px" }}>
        <SectionLabel fontSize="clamp(20px,2.4vw,34px)" color={COLORS.G400} style={{ marginBottom: 16 }}>Alliance Partners</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {ALLIANCE_LOGOS.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={logo.placeholder ? {} : { y: -3 }}
              style={{
                padding: "22px 26px",
                minHeight: 84,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 10,
                background: logo.placeholder ? "transparent" : "rgba(255,255,255,0.88)",
                border: logo.placeholder
                  ? "1px dashed rgba(255,255,255,0.12)"
                  : "1px solid rgba(255,255,255,0.08)",
                cursor: logo.placeholder ? "default" : "pointer",
                transition: "box-shadow 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                if (!logo.placeholder) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.3)";
                }
              }}
              onMouseLeave={e => {
                if (!logo.placeholder) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {logo.placeholder ? (
                <div>
                  <span style={{ display: "block", fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>COMING SOON</span>
                  <span style={{ display: "block", fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.18)", marginTop: 5 }}>Recruiting Partners</span>
                </div>
              ) : logo.logo ? (
                <img
                  src={logo.logo}
                  alt={logo.name}
                  style={{ width: "100%", height: 40, objectFit: "contain", objectPosition: "center" }}
                />
              ) : (
                <>
                  <span style={{ fontFamily: FONTS.accent, fontSize: 18, fontWeight: 900, color: COLORS.N100, letterSpacing: "0.02em", lineHeight: 1.15 }}>{logo.name}</span>
                  {logo.sub && (
                    <span style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.N200, marginTop: 6, lineHeight: 1.5 }}>{logo.sub}</span>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <SectionCTAStrip href="/ecosystem" bigLabel="ECOSYSTEM" label="Deep Tech Ecosystem" title="注目するドメインを見る" variant="dark" />

    </section>
  );
}

// ─── PHILOSOPHY ───
// ─── WHAT WE DO ───
// 画像は /public/what-we-do-*.jpg に配置（Shutterstockから取得）
// 01: business team in action / 02: researcher laboratory / 03: AI neural network abstract
const WWD_PILLARS = [
  {
    num: "01",
    en: "EXECUTE",
    title: "事業開発のプロ集団",
    one: "戦略立案から実行まで、チームとして並走します。",
    img: "/what-we-do-01.jpg",
    fallback: "linear-gradient(160deg,#152f26 0%,#0d1a14 100%)",
    href: "/about#execute",
  },
  {
    num: "02",
    en: "BRIDGE",
    title: "アカデミアとの深い連携",
    one: "研究室の言語で語り、技術の価値を市場につなげます。",
    img: "/what-we-do-02.jpg",
    fallback: "linear-gradient(160deg,#1e3a2a 0%,#0d1a14 100%)",
    href: "/about#bridge",
  },
  {
    num: "03",
    en: "ACCELERATE",
    title: "AIが一員として動く",
    one: "AIをチームに組み込み、意思決定のサイクルを加速します。",
    img: "/what-we-do-03.jpg",
    fallback: "linear-gradient(160deg,#0a1a12 0%,#152f26 100%)",
    href: "/about#accelerate",
  },
];

function WhatWeAre() {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  return (
    <section id="what-we-do" style={{
      background: "radial-gradient(ellipse 70% 60% at 15% 40%, rgba(45,90,64,0.22) 0%, transparent 70%), #0d1a14",
      position: "relative",
      zIndex: 1,
    }}>
      {/* FocusDomains / WhatWeDo 区切り線 */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent 0%, rgba(106,170,136,0.25) 20%, rgba(106,170,136,0.25) 80%, transparent 100%)" }} />
      <GridOverlay />

      {/* セクションラベル + 見出し */}
      <div style={{
        background: "radial-gradient(ellipse 65% 70% at 85% 80%, rgba(45,90,64,0.18) 0%, transparent 65%), transparent",
        padding: isMobile ? "100px 6vw 24px" : "140px 8vw 32px",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <SectionLabel fontSize="clamp(20px,2.4vw,34px)" color={COLORS.G400} style={{ marginBottom: 12 }}>What We Do</SectionLabel>
          <TextReveal
            lines={["技術の価値を証明する"]}
            fontSize="clamp(36px,4.8vw,58px)"
            style={{ marginBottom: 28 }}
          />
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WWD_PILLARS.map((p, i) => (
                <div key={p.en} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span style={{
                    fontFamily: FONTS.accent, fontSize: "clamp(13px,1.1vw,16px)", letterSpacing: "0.18em",
                    color: COLORS.G300, textTransform: "uppercase",
                    minWidth: isMobile ? 100 : 120, flexShrink: 0,
                  }}>{p.en}</span>
                  <span style={{
                    fontFamily: FONTS.body, fontSize: "clamp(13px,1.1vw,15px)",
                    color: "rgba(255,255,255,0.5)", lineHeight: 1.6,
                  }}>{p.one}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 画像カラム — モバイル: 縦積み / デスクトップ: 3分割 */}
      <div style={{ padding: isMobile ? "0 6vw 24px" : "0 8vw 40px", background: "transparent" }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
        gap: isMobile ? 2 : 4,
      }}>
        {WWD_PILLARS.map((p, i) => (
          <motion.a
            key={p.en}
            href={p.href}
            {...cardEntrance(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              overflow: "hidden",
              display: "block",
              minHeight: isMobile ? "44vw" : "34vh",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {/* 背景画像（ズームアニメーション付き） — S03: grayscale50%+輝度78%+彩度60% */}
            <motion.div
              animate={{ scale: hovered === i ? 1.04 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${p.img}), ${p.fallback}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(50%) brightness(0.78) saturate(0.6)",
              }}
            />

            {/* オーバーレイ — 底面グラデーション */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(9,12,14,0.95) 0%, rgba(9,12,14,0.52) 55%, rgba(9,12,14,0.10) 100%)",
            }} />

            {/* 上辺ダーク — 天井から落ちる暗さで奥行き */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 40%)",
              pointerEvents: "none",
            }} />

            {/* ビネット — 周辺を強く絞り立体感を出す */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 75% at center, transparent 15%, rgba(0,0,0,0.82) 100%)",
              pointerEvents: "none",
            }} />

            {/* 左右エッジ暗化 — 側面を締めて奥行きを強調 */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.45) 100%)",
              pointerEvents: "none",
            }} />

            {/* H02グリーンカーテン（ホバー時に下から立ち上がる） */}
            <motion.div
              animate={{ height: hovered === i ? "55%" : "0%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(109,184,139,0.16) 0%, rgba(109,184,139,0.04) 70%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            {/* 下ライン（ホバー時に左から展開） */}
            <motion.div
              animate={{ scaleX: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 2,
                background: "#6db88b",
                transformOrigin: "left",
              }}
            />

            {/* 区切り線 — デスクトップ: 縦 / モバイル: 横（上辺） */}
            {i > 0 && (
              <div style={isMobile ? {
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "rgba(255,255,255,0.1)",
              } : {
                position: "absolute", top: 0, left: 0, bottom: 0, width: 1,
                background: "rgba(255,255,255,0.1)",
              }} />
            )}

            {/* テキストコンテンツ（下揃え） */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end",
              padding: isMobile ? "20px 24px 24px" : "32px 36px 32px",
            }}>
              {/* 番号 */}
              <div style={{
                fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.35)", marginBottom: 8,
              }}>
                {p.num}
              </div>

              {/* 英語大文字 */}
              <motion.div
                animate={{ y: hovered === i ? -4 : 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: FONTS.accent,
                  fontSize: "clamp(32px,4vw,60px)",
                  fontWeight: 900,
                  color: hovered === i ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.01em",
                  marginBottom: 8,
                  transition: "color 0.4s",
                }}
              >
                {p.en}
              </motion.div>

              {/* 日本語タイトル */}
              <div style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(16px,1.6vw,22px)",
                fontWeight: 700,
                color: COLORS.N500,
                marginBottom: 0,
                lineHeight: 1.4,
              }}>
                {p.title}
              </div>

            </div>
          </motion.a>
        ))}
      </div>
      </div>

      {/* ── E型 CTA Strip — About BOAR ── */}
      <AboutBoarStrip />

    </section>
  );
}

function AboutBoarStrip() {
  return <SectionCTAStrip href="/about" bigLabel="ABOUT" label="About BOAR" title="私たちがBOARである理由" variant="dark" />;
}

// ─── SERVICES ───
function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = useIsMobile();
  const services = [
    {
      num: "01",
      label: "Forward R&D",
      sub: "研究開発の共創設計",
      desc: "ディープテックと大企業を繋ぎ、課題定義から社会実装まで共創する。",
      href: "/services#forward-rd",
      // I02: フラスコ（ラインスタイル）
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={COLORS.G300} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 4h10M15 4v10L7 28h22L21 14V4"/>
          <circle cx="12" cy="24" r="1.5" fill={COLORS.G300} opacity="0.6"/>
          <circle cx="20" cy="26" r="1" fill={COLORS.G300} opacity="0.4"/>
        </svg>
      ),
      bg: "linear-gradient(140deg, #1a3825 0%, #2d5a40 50%, #152f26 100%)",
      decoration: (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
          {[90, 70, 50, 34, 18].map((r, i) => (
            <circle key={i} cx="88%" cy="30%" r={`${r}%`}
              fill="none" stroke="#5a8c73" strokeWidth="0.7"
              strokeOpacity={0.13 - i * 0.02} />
          ))}
          <circle cx="88%" cy="30%" r="2.5" fill="#5a8c73" fillOpacity="0.5" />
          {/* フラスコから滴る粒子 */}
          <circle cx="30%" cy="75%" r="4" fill="#5a8c73" fillOpacity="0.06"/>
          <circle cx="45%" cy="82%" r="2.5" fill="#5a8c73" fillOpacity="0.04"/>
        </svg>
      ),
      accentColor: COLORS.G400,
      borderHover: COLORS.G400,
    },
    {
      num: "02",
      label: "Forward Buyout",
      sub: "共創の延長線上にあるM&A",
      desc: "技術を深く理解しているからこそ、本質的な価値に基づくM&Aを設計する。",
      href: "/services#forward-buyout",
      // I02: 上昇矢印（ラインスタイル）
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={COLORS.G300} strokeWidth="1.2" strokeLinecap="round">
          <polyline points="4,26 12,16 20,20 32,8"/>
          <polyline points="24,8 32,8 32,16"/>
        </svg>
      ),
      bg: "linear-gradient(140deg, #0d1a14 0%, #152f26 50%, #090c0e 100%)",
      decoration: (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
          <defs>
            <pattern id="svc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-grid)" />
          {/* 上昇トレンドライン（大きく、右上に） */}
          <polyline points="0%,85% 25%,65% 50%,70% 80%,28% 100%,15%"
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* 矢印ヘッド */}
          <polyline points="88%,10% 100%,15% 92%,25%"
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      accentColor: COLORS.G300,
      borderHover: COLORS.G300,
    },
  ];

  const L = { text: COLORS.lightText, body: COLORS.lightBody, accent: COLORS.lightAccent, line: COLORS.lightBorder };

  return (
    <DiagSection id="services" bg="linear-gradient(180deg,#ede8df 0%,#e8e2d8 100%)" style={{ paddingTop: 140, paddingBottom: 0 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel fontSize="clamp(20px,2.4vw,34px)" color={COLORS.G200}>Services</SectionLabel>
        <TextReveal
          lines={["非連続な成長を支援する"]}
          fontSize="clamp(36px,4.8vw,58px)"
          color={L.text}
          style={{ marginBottom: 32 }}
        />
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: FONTS.body, fontSize: "clamp(15px,1.8vw,19px)",
            color: L.body, lineHeight: 1.9, maxWidth: 1080, marginBottom: 64 }}>
            有望な技術が、事業にならないまま消えていく。<br />
            その現実に、2つの切り口で向き合います。<br />
            研究開発段階から共創する「Forward R&D」と、その先のM&Aまで設計する「Forward Buyout」です。
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* 2枚カードを四隅ブラケットで囲む外側フレーム */}
          <div style={{ position: "relative", padding: "32px 24px 24px", marginBottom: 40 }}>
            {/* 四隅ブラケット */}
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <div key={`outer-${v}${h}`} style={{
                position: "absolute", [v]: 0, [h]: 0, width: 28, height: 28,
                borderTop: v === "top" ? "2px solid rgba(9,26,20,0.35)" : "none",
                borderBottom: v === "bottom" ? "2px solid rgba(9,26,20,0.35)" : "none",
                borderLeft: h === "left" ? "2px solid rgba(9,26,20,0.35)" : "none",
                borderRight: h === "right" ? "2px solid rgba(9,26,20,0.35)" : "none",
              }} />
            ))}
            {/* Value Forward ラベル — ブラケット内・カード上（帯クリック → /services） */}
            <a href="/services" style={{
              display: "block",
              fontFamily: FONTS.accent, fontSize: "clamp(20px,2.4vw,34px)",
              fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase",
              color: "rgba(9,26,20,0.45)",
              marginBottom: 16,
              textDecoration: "none", cursor: "pointer",
            }}>Value Forward</a>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "16px" }}>
            {services.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                {...cardEntrance(i)}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "relative", overflow: "hidden",
                  padding: "32px 32px 28px",
                  background: s.bg,
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "block",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {/* ホバーグラデーション — フル幅 */}
                <motion.div
                  animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(to top, ${s.accentColor}28 0%, transparent 60%)`,
                    pointerEvents: "none", zIndex: 0,
                  }}
                />
                {s.decoration}
                {/* コーナーブラケット */}
                {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                  <div key={`${v}${h}`} style={{
                    position: "absolute", [v]: 0, [h]: 0, width: 20, height: 20,
                    borderTop: v === "top" ? `1px solid ${s.accentColor}` : "none",
                    borderBottom: v === "bottom" ? `1px solid ${s.accentColor}` : "none",
                    borderLeft: h === "left" ? `1px solid ${s.accentColor}` : "none",
                    borderRight: h === "right" ? `1px solid ${s.accentColor}` : "none",
                    opacity: hoveredCard === i ? 0.7 : 0.3,
                    transition: "opacity 0.35s",
                    zIndex: 2,
                  }} />
                ))}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* アイコン */}
                  <div style={{ marginBottom: 24 }}>{s.icon}</div>
                  {/* 番号 */}
                  <div style={{
                    fontFamily: FONTS.accent, fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.2em", color: s.accentColor,
                    marginBottom: 10, opacity: 0.6,
                  }}>{s.num}</div>
                  {/* サービス名 */}
                  <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(24px,2.5vw,36px)",
                    fontWeight: 900, color: COLORS.darkHL, lineHeight: 1.05, marginBottom: 8 }}>
                    {s.label}
                  </div>
                  {/* sub テキスト */}
                  <div style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.darkSub38, marginBottom: 20 }}>
                    {s.sub}
                  </div>
                  {/* 説明 */}
                  <p style={{ fontSize: 14, color: COLORS.darkBody, lineHeight: 1.95, fontFamily: FONTS.body, margin: "0 0 24px" }}>
                    {s.desc}
                  </p>
                  {/* 詳しく見る */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: FONTS.accent, fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: s.accentColor,
                  }}>
                    詳しく見る <span style={{ fontSize: 14 }}>→</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          </div>{/* /outer bracket frame */}
        </FadeIn>
      </div>
      <div style={{ margin: "0 -8vw" }}>
        <SectionCTAStrip href="/services" bigLabel="SERVICE" label="What We Do" title="3つのアプローチを詳しく見る" variant="light" />
      </div>
    </DiagSection>
  );
}

// ─── ABOUT ───
function About() {
  const isMobile = useIsMobile();
  const L = {
    text: COLORS.lightText, body: "rgba(9,12,14,0.58)",
    accent: COLORS.lightAccent,
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
    <DiagSection id="about" bg="linear-gradient(180deg,#e8e2d8 0%,#ece7dd 100%)">
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel fontSize="clamp(20px,2.4vw,34px)" color={COLORS.G200}>About</SectionLabel>
        <TextReveal
          lines={["チームについて"]}
          fontSize="clamp(32px,4vw,52px)"
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                fontWeight: 900, color: L.text, lineHeight: 1.1, marginBottom: 4,
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
                fontSize: 14, color: L.body, lineHeight: 1.9,
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
          {companyInfo.map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "160px 1fr",
                gap: isMobile ? "4px 0" : "0 32px",
                borderTop: "1px solid rgba(9,12,14,0.1)",
                padding: "18px 0",
              }}
            >
              <div style={{ fontSize: 12, color: "rgba(9,12,14,0.38)", letterSpacing: "0.06em", fontFamily: FONTS.body }}>
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

// ─── RELEASES PREVIEW ───
const RELEASES_PREVIEW = [
  { id: 1, type: "news",   typeLabel: "ニュース", date: "2026-03", title: "BOAR Partners、始動。" },
  { id: 2, type: "case",   typeLabel: "実績",     date: "2026-03", title: "commissure × 製造業 — 事業開発・M&A支援" },
  { id: 3, type: "column", typeLabel: "コラム",   date: "2026-03", title: "なぜ、日本の技術は産業にならないのか" },
];
const BADGE = {
  news:   { color: COLORS.G200 },
  case:   { color: COLORS.G300 },
  column: { color: "rgba(9,12,14,0.4)" },
};
function ReleasesPreview() {
  const isMobile = useIsMobile();
  const [hoveredRow, setHoveredRow] = useState(null);
  return (
    <section style={{ padding: "140px 8vw 0", background: "linear-gradient(180deg,#ede8df 0%,#e8e2d8 100%)", borderTop: "1px solid rgba(9,12,14,0.1)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* ヘッダ行 */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: "clamp(20px,2.4vw,34px)", fontWeight: 900, color: COLORS.lightText, letterSpacing: "-0.01em" }}>Releases.</span>
        </div>
        {/* リスト */}
        {RELEASES_PREVIEW.map((item, i) => {
          const b = BADGE[item.type];
          const isHov = hoveredRow === i;
          return (
            <a key={item.id} href={item.href || "#"} style={{ display: "block", textDecoration: "none", position: "relative", overflow: "hidden" }}
              onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)}>
              {/* フル幅ホバーグラデーション */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, rgba(45,90,64,0.08) 0%, transparent 70%)",
                opacity: isHov ? 1 : 0,
                transition: "opacity 0.3s",
                pointerEvents: "none",
              }} />
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "100px 1fr auto",
                gap: isMobile ? "8px 0" : "0 32px",
                alignItems: isMobile ? "flex-start" : "center",
                padding: "24px 0",
                borderTop: i === 0 ? "1px solid rgba(9,12,14,0.15)" : "none",
                borderBottom: "1px solid rgba(9,12,14,0.15)",
                position: "relative",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 16 }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(9,12,14,0.35)" }}>{item.date}</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: b.color, display: "inline-block", width: "fit-content" }}>{item.typeLabel}</span>
                </div>
                <span style={{ fontFamily: FONTS.display, fontSize: "clamp(14px,1.4vw,17px)", fontWeight: 700, color: "#0d1a14", lineHeight: 1.4 }}>{item.title}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 14, color: isHov ? COLORS.G200 : "rgba(9,12,14,0.25)", transition: "color 0.3s" }}>→</span>
              </div>
            </a>
          );
        })}
      </div>
      <div style={{ margin: "0 -8vw" }}>
        <SectionCTAStrip href="/releases" bigLabel="RELEASES" label="News &amp; Insights" title="すべてのリリースを見る" variant="light" />
      </div>
    </section>
  );
}

// ─── CONTACT ───
function ContactCTA() {
  const [hovered, setHovered] = useState(false);
  const G = COLORS.G300;
  return (
    <a
      id="contact"
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        background: "#090c0e",
        padding: "72px 8vw",
        borderTop: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.4s",
        cursor: "pointer",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: FONTS.body, fontSize: "clamp(12px,1.2vw,14px)", color: COLORS.G300, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Business Inquiry
          </div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(48px,9vw,120px)",
            fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
            color: hovered ? G : "white",
            transition: "color 0.4s",
          }}>
            Contact.
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(255,255,255,0.35)", marginTop: 16, lineHeight: 1.8 }}>
            事業開発・資金調達・技術の社会実装について、まずはお気軽に。
          </div>
        </div>
        <div style={{
          fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: G, display: "flex", alignItems: "center", gap: 16,
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
          paddingBottom: 8,
        }}>
          <span style={{ width: 48, height: 1, background: G, display: "inline-block" }} />
          Form
        </div>
      </div>
    </a>
  );
}

// ─── MAIN APP ───
export default function App() {
  return (
    <div style={{ overflowX: "clip" }}>
      <Header />
      <Hero />
      <TickerStrip />
      <FocusDomains />
      <WhatWeAre />
      <GlowDivider />
      <Services />
      <ReleasesPreview />
      <GlowDivider />
      <ContactCTA />
      <Footer />
    </div>
  );
}
