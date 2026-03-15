import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};
const G300 = "#6aaa88";
const G400 = "#b0d4c0";
const N500 = "#ffffff";

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

const bgStyle = {
  background: "linear-gradient(170deg, #090c0e 0%, #0a1a12 50%, #152f26 100%)",
};

// ─── A案: モバイル Sticky Scroll ───
function VersionA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.0005 });

  // ブロック切り替え（3等分）
  const block0Op = useTransform(smooth, [0, 0.2, 0.28], [1, 1, 0]);
  const block1Op = useTransform(smooth, [0.23, 0.33, 0.60, 0.68], [0, 1, 1, 0]);
  const block2Op = useTransform(smooth, [0.63, 0.73, 1.0], [0, 1, 1]);

  const block0Y = useTransform(smooth, [0, 0.2, 0.28], ["0px", "0px", "-20px"]);
  const block1Y = useTransform(smooth, [0.23, 0.33, 0.60, 0.68], ["20px", "0px", "0px", "-20px"]);
  const block2Y = useTransform(smooth, [0.63, 0.73, 1.0], ["20px", "0px", "0px"]);

  const dot0 = useTransform(smooth, [0, 0.28], [1, 0]);
  const dot1 = useTransform(smooth, [0.23, 0.33, 0.60, 0.68], [0, 1, 1, 0]);
  const dot2 = useTransform(smooth, [0.63, 0.73], [0, 1]);

  const opacities = [block0Op, block1Op, block2Op];
  const ys        = [block0Y, block1Y, block2Y];
  const dots      = [dot0, dot1, dot2];

  const lineScaleY = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
      {/* Sticky viewport */}
      <div style={{
        position: "sticky", top: 0, height: "100dvh",
        ...bgStyle, overflow: "clip",
        display: "flex", flexDirection: "column",
      }}>
        {/* グリッド背景 */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <svg style={{ width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hgA" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hgA)"/>
          </svg>
        </div>

        {/* 上部: タイトルエリア（固定40%） */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: "72px 6vw 24px",
          flex: "0 0 auto",
        }}>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(44px,12vw,72px)",
            color: N500, letterSpacing: "0.02em", lineHeight: 1.05, fontWeight: 900,
          }}>
            Deep tech,<br />for industry
          </div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(11px,3vw,14px)", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginTop: 12,
          }}>
            Strategy &amp; Execution Consulting
          </div>
        </div>

        {/* 仕切り線（横） */}
        <div style={{
          position: "relative", zIndex: 1,
          margin: "0 6vw",
          height: 1,
          background: "rgba(255,255,255,0.1)",
        }} />

        {/* 下部: コンテンツエリア（ブロック切り替え） */}
        <div style={{
          position: "relative", zIndex: 1,
          flex: 1, padding: "32px 6vw 0",
          overflow: "hidden",
        }}>
          {rightBlocks.map((block, i) => (
            <div key={i} style={{
              position: "absolute", top: 32, left: "6vw", right: "6vw",
            }}>
              <motion.div style={{ opacity: opacities[i], y: ys[i] }}>
                <div style={{
                  fontFamily: FONTS.accent, fontSize: "clamp(11px,3vw,13px)", fontWeight: 700,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: G400, marginBottom: 16,
                }}>
                  {String(i + 1).padStart(2, "0")} — {block.label}
                </div>
                <div style={{
                  fontFamily: FONTS.display, fontSize: "clamp(22px,6vw,34px)",
                  color: N500, fontWeight: 200, lineHeight: 1.3, marginBottom: 20,
                  whiteSpace: "pre-line",
                }}>
                  {block.heading.split("\n").map((line, li, arr) => (
                    <span key={li}>
                      {line.split("BOAR").map((part, pi, parr) => (
                        <span key={pi}>{part}{pi < parr.length - 1 && (
                          <span style={{ color: G300, fontWeight: 900, fontFamily: FONTS.accent, letterSpacing: "0.15em" }}>BOAR</span>
                        )}</span>
                      ))}
                      {li < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <p style={{
                  fontFamily: FONTS.body, fontSize: "clamp(13px,3.5vw,15px)",
                  color: "rgba(255,255,255,0.38)", lineHeight: 1.9, margin: 0,
                  fontWeight: 300,
                }}>
                  {block.body.split("\n").map((line, li, arr) => (
                    <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ドットインジケーター（右下） */}
        <div style={{
          position: "absolute", bottom: 32, right: "6vw",
          display: "flex", alignItems: "center", gap: 12, zIndex: 2,
        }}>
          {/* プログレスバー（横） */}
          <div style={{ position: "relative", width: 60, height: 1, background: "rgba(255,255,255,0.1)" }}>
            <motion.div style={{
              position: "absolute", top: 0, left: 0, bottom: 0,
              background: G300, originX: 0, scaleX: lineScaleY,
            }} />
          </div>
          {/* ドット */}
          <div style={{ display: "flex", gap: 6 }}>
            {dots.map((dotOpacity, i) => (
              <div key={i} style={{ position: "relative", width: 6, height: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <motion.div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: G300, opacity: dotOpacity,
                }} />
              </div>
            ))}
          </div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: 9, letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
          }}>Scroll</div>
        </div>
      </div>
    </div>
  );
}

// ─── B案: whileInView 順次フェードイン（現状） ───
function VersionB() {
  return (
    <section style={{ ...bgStyle, padding: "80px 6vw 80px", overflow: "hidden", position: "relative" }}>
      {/* グリッド背景 */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <svg style={{ width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="hgB" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hgB)"/>
        </svg>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(44px,12vw,72px)",
            color: N500, letterSpacing: "0.02em", lineHeight: 1.05, fontWeight: 900,
          }}>
            Deep tech,<br />for industry
          </div>
          <div style={{
            fontFamily: FONTS.accent, fontSize: "clamp(11px,3vw,14px)", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginTop: 12,
          }}>
            Strategy &amp; Execution Consulting
          </div>
        </motion.div>

        {/* ブロック縦積み */}
        {rightBlocks.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, marginBottom: 40 }}
          >
            <div style={{
              fontFamily: FONTS.accent, fontSize: "clamp(11px,3vw,13px)", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: G400, marginBottom: 14,
            }}>
              {String(i + 1).padStart(2, "0")} — {block.label}
            </div>
            <div style={{
              fontFamily: FONTS.display, fontSize: "clamp(22px,6vw,32px)",
              color: N500, fontWeight: 200, lineHeight: 1.3, marginBottom: 16,
              whiteSpace: "pre-line",
            }}>
              {block.heading.split("\n").map((line, li, arr) => (
                <span key={li}>
                  {line.split("BOAR").map((part, pi, parr) => (
                    <span key={pi}>{part}{pi < parr.length - 1 && (
                      <span style={{ color: G300, fontWeight: 900, fontFamily: FONTS.accent, letterSpacing: "0.15em" }}>BOAR</span>
                    )}</span>
                  ))}
                  {li < arr.length - 1 && <br />}
                </span>
              ))}
            </div>
            <p style={{
              fontFamily: FONTS.body, fontSize: "clamp(13px,3.5vw,15px)",
              color: "rgba(255,255,255,0.38)", lineHeight: 1.9, margin: 0,
              fontWeight: 300,
            }}>
              {block.body.split("\n").map((line, li, arr) => (
                <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── ラベル ───
function Label({ text, sub }) {
  return (
    <div style={{
      background: "#0a1a12", borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "16px 6vw",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        fontFamily: "'Big Shoulders Display', sans-serif",
        fontSize: 18, fontWeight: 900, letterSpacing: "0.1em",
        textTransform: "uppercase", color: G300,
      }}>{text}</div>
      <div style={{
        fontFamily: "'Hiragino Sans W3', sans-serif",
        fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2,
      }}>{sub}</div>
    </div>
  );
}

export default function MobileHeroCompare() {
  return (
    <div style={{ background: "#090c0e" }}>
      <div style={{
        background: "#090c0e", padding: "20px 6vw",
        fontFamily: "'Big Shoulders Display', sans-serif",
        fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)",
        textTransform: "uppercase",
      }}>
        Mobile Hero — A/B Compare
      </div>

      <Label text="Version A — Sticky Scroll" sub="タイトル固定・下エリアでブロック切り替え（スクロールで①②③）" />
      <VersionA />

      <Label text="Version B — whileInView" sub="縦積みスタック・スクロール入場アニメ（現状）" />
      <VersionB />
    </div>
  );
}
