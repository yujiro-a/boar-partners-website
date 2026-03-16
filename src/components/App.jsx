import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Briefcase, BookOpen, Cpu, FlaskConical, TrendingUp } from "lucide-react";
import { Header, Footer, useIsMobile } from "./shared.jsx";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

const COLORS = {
  G050: "#0d1a14",
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea",
  G150: "#0a1a12",
  G250: "#4a8060",
  N100: "#090c0e", N200: "#47494a", N300: "#848686", N400: "#c2c2c3", N500: "#ffffff",
  darkCard:   "rgba(255,255,255,0.04)",
  darkBorder: "rgba(255,255,255,0.09)",
  darkHL:     "rgba(255,255,255,0.92)",
  darkBody:   "rgba(255,255,255,0.45)",
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
const SectionLabel = ({ children, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.7 }}
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
    }), 90);
    return () => clearInterval(t);
  }, [loop, flat.length]);

  const cursor = <span style={{ animation: "cursorBlink 1.5s linear infinite" }}>|</span>;
  const chars = text.split("");
  const lastIdx = chars.filter(c => c !== "\n").length - 1;
  let gi = 0;
  const nodes = [];
  chars.forEach((ch, i) => {
    if (ch === "\n") {
      nodes.push(<br key={i} />);
      return;
    }
    const idx = gi++;
    const isLast = idx === lastIdx;
    nodes.push(
      <span key={i} style={{ opacity: idx < pos ? 1 : 0, transition: "opacity 0.05s",
        animation: done && isLast ? "none" : "none" }}>
        {ch}
      </span>
    );
    if (idx + 1 === pos && !done) nodes.push(<span key={`c${i}`}>{cursor}</span>);
    if (done && isLast) nodes.push(<span key="dc" style={{ animation: "cursorBlink 1.5s linear infinite" }}>|</span>);
  });
  return <>{nodes}</>;
}

// ─── MOBILE HERO (独立コンポーネント — useScroll を mount 後に確実に設定) ───
function MobileHero({ rightBlocks, bgStyle, styles }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.0005 });

  // 初期: タイトルを中央付近に配置 → スクロールで上へ移動
  const titleY = useTransform(smooth, [0, 0.2], ["34vh", "0vh"]);
  const subOpacity = useTransform(smooth, [0, 0.12, 0.22], [0, 0, 1]);
  const dividerOpacity = useTransform(smooth, [0, 0.12, 0.22], [0, 0, 1]);

  // 順次フェード（クロスオーバーなし）
  const block0Op = useTransform(smooth, [0, 0.15, 0.22, 0.30, 0.37], [0, 0, 1, 1, 0]);
  const block1Op = useTransform(smooth, [0.37, 0.43, 0.54, 0.61], [0, 1, 1, 0]);
  const block2Op = useTransform(smooth, [0.61, 0.67, 0.86], [0, 1, 1]);
  const block0Y  = useTransform(smooth, [0.22, 0.30, 0.37], ["0px", "0px", "-40px"]);
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
        ...bgStyle, overflow: "hidden",
        display: "flex", flexDirection: "column",
        padding: "108px 6vw 60px", boxSizing: "border-box",
      }}>
        {/* 背景グリッド */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <svg style={{ width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hgm" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hgm)"/>
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
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
          <div style={{ position: "relative", flex: 1 }}>
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
                  fontFamily: FONTS.display, fontSize: "clamp(26px,7vw,34px)",
                  color: COLORS.N500, fontWeight: 200, lineHeight: 1.3, marginBottom: 14,
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
                  color: "rgba(255,255,255,0.38)", lineHeight: 1.9, margin: 0, fontWeight: 300,
                }}>
                  {block.body.split("\n").map((line, li, arr) => (
                    <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ドットインジケーター */}
          <div style={{ display: "flex", gap: 8 }}>
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
    @keyframes cursorBlink { 0%{opacity:0.18}70%{opacity:0.18}71%{opacity:0}100%{opacity:0} }
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
              fontFamily: FONTS.accent, fontSize: "clamp(48px,8vw,112px)",
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
            marginLeft: "1.5vw", marginRight: "3vw",
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
                  fontFamily: FONTS.display, fontSize: "clamp(26px,3.2vw,48px)",
                  color: COLORS.N500, fontWeight: 200, lineHeight: 1.35, marginBottom: 28,
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

// ─── PHILOSOPHY ───
function Philosophy() {
  const boarItems = [
    { letter: "B", rest: "uild the Business",  ja: "事業を構築する" },
    { letter: "O", rest: "pen Opportunities",  ja: "機会を開く" },
    { letter: "A", rest: "ccelerate Growth",   ja: "成長を加速する" },
    { letter: "R", rest: "ealize Value",       ja: "価値を実現する" },
  ];

  return (
    <DiagSection id="philosophy" bg="linear-gradient(180deg,#090c0e 0%,#0d1a14 100%)">
      <GridOverlay />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>Philosophy</SectionLabel>
        <TextReveal
          lines={["限界を突破する"]}
          fontSize="clamp(24px,3.2vw,48px)"
          style={{ marginBottom: 32 }}
        />
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: FONTS.body, fontSize: "clamp(15px,1.8vw,19px)",
            color: COLORS.darkBody, lineHeight: 1.9, maxWidth: 1080, marginBottom: 56 }}>
            知の探究と、利益の追求の間にある深い溝を、正面から越えていく。<br />
            誰もが難しいと言う。それでも動き続けることが、私たちの証明です。<br />
            限界は、挑む者だけが突破できる。
          </p>
        </FadeIn>

        <div style={{ position: "relative" }}>
          {/* ゴーストBOAR */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: "clamp(120px,22vw,280px)",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "0.1em", lineHeight: 1,
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>BOAR</div>

          <FadeIn>
            <div style={{ fontFamily: FONTS.accent, fontSize: "clamp(13px, 1.1vw, 16px)", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: COLORS.G300, marginBottom: 20 }}>
              Our Business Stance
            </div>
          </FadeIn>

          {boarItems.map((item, i) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "grid", gridTemplateColumns: "1fr auto",
                alignItems: "baseline", gap: "clamp(12px,4vw,40px)",
                borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 0" }}
            >
              <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontFamily: FONTS.accent, fontWeight: 900,
                fontSize: "clamp(32px,5.5vw,72px)", color: COLORS.G300,
                lineHeight: 1, minWidth: "1.1ch", letterSpacing: "-0.02em" }}>
                {item.letter}
              </span>
              <span style={{ fontFamily: FONTS.accent, fontWeight: 700,
                fontSize: "clamp(24px,3.8vw,52px)", color: "rgba(255,255,255,0.85)",
                lineHeight: 1, letterSpacing: "0.06em" }}>
                {item.rest}
              </span>
              </div>
              <span style={{ fontFamily: FONTS.body, fontSize: "clamp(14px,1.8vw,28px)",
                color: "rgba(255,255,255,0.4)", textAlign: "right", whiteSpace: "nowrap" }}>
                {item.ja}
              </span>
            </motion.div>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <a href="/about" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 2,
            transition: "color 0.3s, border-color 0.3s",
            marginTop: 40,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.N500; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          >
            私たちについて
            <span style={{ fontSize: 16 }}>→</span>
          </a>
        </FadeIn>
      </div>
    </DiagSection>
  );
}

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
  },
  {
    num: "02",
    en: "BRIDGE",
    title: "アカデミアとの深い連携",
    one: "研究室の言語で語り、技術の価値を市場につなげます。",
    img: "/what-we-do-02.jpg",
    fallback: "linear-gradient(160deg,#1e3a2a 0%,#0d1a14 100%)",
  },
  {
    num: "03",
    en: "ACCELERATE",
    title: "AIが一員として動く",
    one: "AIをチームに組み込み、意思決定のサイクルを加速します。",
    img: "/what-we-do-03.jpg",
    fallback: "linear-gradient(160deg,#0a1a12 0%,#152f26 100%)",
  },
];

function WhatWeAre() {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  return (
    // Philosophy(DiagSection)が marginBottom:"-4vw" で引き上げるため、
    // ヘッダー padding-top に +4vw 追加。下も Services が marginTop:"-4vw" で被るため +4vw。
    <section id="what-we-do" style={{ position: "relative", overflow: "hidden", zIndex: 2 }}>

      {/* セクションラベル + 見出し */}
      <div style={{
        background: "#0d1a14",
        padding: isMobile ? "calc(72px + 4vw) 6vw 32px" : "calc(80px + 4vw) 8vw 56px",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <SectionLabel>What We Do</SectionLabel>
            <TextReveal
              lines={["技術の価値を証明する"]}
              fontSize={isMobile ? "clamp(22px,6vw,32px)" : "clamp(24px,3.2vw,48px)"}
              style={{ marginBottom: 28 }}
            />
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {WWD_PILLARS.map((p, i) => (
                  <div key={p.en} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                    <span style={{
                      fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em",
                      color: COLORS.G300, textTransform: "uppercase",
                      minWidth: isMobile ? 80 : 100, flexShrink: 0,
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
          {!isMobile && (
            <FadeIn delay={0.2}>
              <a href="/about" style={{
                fontFamily: FONTS.accent, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2,
                transition: "color 0.3s, border-color 0.3s", whiteSpace: "nowrap",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.N500; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              >
                About Us →
              </a>
            </FadeIn>
          )}
        </div>
      </div>

      {/* 画像カラム — モバイル: 縦積み / デスクトップ: 3分割 */}
      <div style={{ padding: isMobile ? "0 6vw 48px" : "0 8vw 80px", background: "#0d1a14" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
        maxWidth: 1080, margin: "0 auto",
        gap: isMobile ? 2 : 0,
      }}>
        {WWD_PILLARS.map((p, i) => (
          <motion.a
            key={p.en}
            href="/about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: i * 0.15 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              textDecoration: "none",
              display: "block",
              minHeight: isMobile ? "62vw" : "60vh",
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

            {/* オーバーレイ — S03 */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(9,12,14,0.90) 0%, rgba(9,12,14,0.48) 60%, rgba(9,12,14,0.12) 100%)",
            }} />

            {/* ビネット — S03: 周辺減光で中央を引き立てる */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
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
              padding: isMobile ? "28px 24px 36px" : "40px 36px 56px",
            }}>
              {/* 番号 */}
              <div style={{
                fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.35)", marginBottom: 16,
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
                  marginBottom: 16,
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
                marginBottom: 10,
                lineHeight: 1.4,
              }}>
                {p.title}
              </div>

            </div>
          </motion.a>
        ))}
      </div>
      </div>

    </section>
  );
}

// ─── SERVICES ───
function Services() {
  const services = [
    {
      num: "01",
      label: "Forward R&D",
      sub: "価値の発見・証明",
      framework: "Define → Drive → Deliver",
      desc: "課題の発見・定義から入り、ディープテックと共創して社会実装まで走ります。既製の技術を購買するのではなく、研究開発段階から課題ごと一緒に解きます。",
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
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden>
          {[90, 70, 50, 34, 18].map((r, i) => (
            <circle key={i} cx="88%" cy="30%" r={`${r}%`}
              fill="none" stroke="#6aaa88" strokeWidth="0.7"
              strokeOpacity={0.13 - i * 0.02} />
          ))}
          <circle cx="88%" cy="30%" r="2.5" fill="#6aaa88" fillOpacity="0.5" />
          {/* フラスコから滴る粒子 */}
          <circle cx="30%" cy="75%" r="4" fill="#6aaa88" fillOpacity="0.06"/>
          <circle cx="45%" cy="82%" r="2.5" fill="#6aaa88" fillOpacity="0.04"/>
        </svg>
      ),
      accentColor: COLORS.G400,
      borderHover: COLORS.G400,
    },
    {
      num: "02",
      label: "Forward Buyout",
      sub: "価値の統合",
      framework: "Valuation → Structure → PMI → Monetize",
      desc: "共創の延長線上にあるM&AやExitを設計・実行します。技術を深く理解しているからこそ、社会実装のポテンシャルを正しく評価したストラクチャーを組めます。",
      // I02: 上昇矢印（ラインスタイル）
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={COLORS.G300} strokeWidth="1.2" strokeLinecap="round">
          <polyline points="4,26 12,16 20,20 32,8"/>
          <polyline points="24,8 32,8 32,16"/>
        </svg>
      ),
      bg: "linear-gradient(140deg, #0d1a14 0%, #152f26 50%, #090c0e 100%)",
      decoration: (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden>
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

  const L = { text: "#0d1a14", body: "rgba(9,12,14,0.55)", accent: "#2d5a40", line: "rgba(9,12,14,0.12)" };

  return (
    <DiagSection id="services" bg="linear-gradient(180deg,#ede8df 0%,#e8e2d8 100%)">
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel color={COLORS.G200}>Services</SectionLabel>
        <TextReveal
          lines={["非連続な成長を支援する"]}
          fontSize="clamp(24px,3.2vw,48px)"
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

        {/* ── Value Forward 親ボックス（B04: アウトライン） ── */}
        <FadeIn delay={0.15}>
          <div style={{
            position: "relative",
            background: "transparent",
            padding: "36px 40px 40px",
            marginBottom: 56,
          }}>
            {/* BX06: コーナーブラケット */}
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <div key={`${v}${h}`} style={{
                position: "absolute", [v]: 0, [h]: 0, width: 24, height: 24,
                borderTop: v === "top" ? "2px solid rgba(9,26,20,0.28)" : "none",
                borderBottom: v === "bottom" ? "2px solid rgba(9,26,20,0.28)" : "none",
                borderLeft: h === "left" ? "2px solid rgba(9,26,20,0.28)" : "none",
                borderRight: h === "right" ? "2px solid rgba(9,26,20,0.28)" : "none",
              }} />
            ))}
            {/* 親ヘッダー */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
              <div style={{
                fontFamily: FONTS.accent, fontSize: "clamp(20px,2.2vw,28px)",
                fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase",
                color: "#0d1a14",
              }}>Value Forward</div>
              <div style={{ flex: 1, height: 1, background: "rgba(9,26,20,0.12)", margin: "0 20px" }} />
              <div style={{
                fontFamily: FONTS.body, fontSize: 13,
                color: COLORS.G200, letterSpacing: "0.04em",
              }}>技術の価値を、市場に届けきる。</div>
            </div>

            {/* 2枚のカード */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", justifyContent: "center" }}>
              {services.map((s, i) => (
                <motion.a
                  key={s.label}
                  href="/services"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  style={{
                    position: "relative", overflow: "hidden",
                    padding: "32px 32px 28px",
                    background: s.bg,
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "pointer", textDecoration: "none",
                    display: "block",
                    transition: "border-color 0.35s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.borderHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  {s.decoration}
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
                    {/* フレームワーク */}
                    <div style={{ fontSize: 11, color: s.accentColor, letterSpacing: "0.08em",
                      marginBottom: 20, fontFamily: FONTS.body }}>
                      {s.framework}
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
          </div>
        </FadeIn>
      </div>
    </DiagSection>
  );
}

// ─── ABOUT ───
function About() {
  const L = {
    text: "#0d1a14", body: "rgba(9,12,14,0.58)",
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
    <DiagSection id="about" bg="linear-gradient(180deg,#e8e2d8 0%,#ece7dd 100%)">
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel color={COLORS.G200}>About</SectionLabel>
        <TextReveal
          lines={["チームについて"]}
          fontSize="clamp(24px,3.2vw,48px)"
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
          {companyInfo.map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                gap: "0 32px",
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
  return (
    <section style={{ padding: "80px 8vw", background: "linear-gradient(180deg,#ede8df 0%,#e8e2d8 100%)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* ヘッダ行 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, color: "#0d1a14", letterSpacing: "-0.01em" }}>Releases.</span>
          <a href="/releases" style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.G200, textDecoration: "none", letterSpacing: "0.05em" }}>すべて見る →</a>
        </div>
        {/* リスト */}
        {RELEASES_PREVIEW.map((item, i) => {
          const b = BADGE[item.type];
          return (
            <a key={item.id} href="/releases" style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "100px 1fr auto",
                gap: "0 32px", alignItems: "center", padding: "24px 0",
                borderTop: i === 0 ? "1px solid rgba(9,12,14,0.15)" : "none",
                borderBottom: "1px solid rgba(9,12,14,0.15)",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 16 }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(9,12,14,0.35)" }}>{item.date}</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: b.color, display: "inline-block", width: "fit-content" }}>{item.typeLabel}</span>
                </div>
                <span style={{ fontFamily: FONTS.display, fontSize: "clamp(14px,1.4vw,17px)", fontWeight: 700, color: "#0d1a14", lineHeight: 1.4 }}>{item.title}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(9,12,14,0.25)" }}>→</span>
              </div>
            </a>
          );
        })}
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
        <div style={{
          fontFamily: FONTS.accent, fontSize: "clamp(36px,5.5vw,72px)",
          fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: hovered ? G : "white",
          transition: "color 0.4s",
        }}>
          Contact.
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
      <Philosophy />
      <WhatWeAre />
      <Services />
      <ReleasesPreview />
      <ContactCTA />
      <Footer />
    </div>
  );
}
