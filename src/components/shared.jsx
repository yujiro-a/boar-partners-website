/**
 * shared.jsx — 共通定数・コンポーネント
 * Header / Footer / FadeIn / TextReveal / SectionLabel / hooks
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── 共通定数 ───────────────────────────────────────────
export const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};

export const COLORS = {
  G050: "#0d1a14",
  G100: "#152f26", G200: "#2d5a40", G300: "#5a8c73", G400: "#b0d4c0", G500: "#e0eeea",
  G150: "#0a1a12", G250: "#4a8060",
  N100: "#090c0e", N200: "#47494a", N300: "#848686", N400: "#c2c2c3", N500: "#ffffff",
  darkCard:   "rgba(255,255,255,0.04)",
  darkBorder: "rgba(255,255,255,0.09)",
  darkHL:     "rgba(255,255,255,0.92)",
  darkBody:   "rgba(255,255,255,0.45)",
  // Phase カラー（コーポレートグリーンの濃淡で差別化）
  PHASE_DEFINE:  "#b0d4c0",  // G400 — 薄緑
  PHASE_DRIVE:   "#5a8c73",  // G300 — 中緑
  PHASE_DELIVER: "#2d5a40",  // G200 — 深緑
};

// ─── フック ─────────────────────────────────────────────
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ─── FadeIn ─────────────────────────────────────────────
export function FadeIn({ children, delay = 0, style: extra = {} }) {
  const reduced = useReducedMotion();
  if (reduced) return <div style={extra}>{children}</div>;
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

// ─── TextReveal ──────────────────────────────────────────
export function TextReveal({ lines, delay = 0, fontSize, color, fontFamily, fontWeight = 700, style: extra = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} style={extra}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
          {reduced ? (
            <div style={{ fontFamily: fontFamily || FONTS.display, fontSize, color: color || COLORS.N500, fontWeight }}>
              {line}
            </div>
          ) : (
            <motion.div
              initial={{ y: "105%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.95, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: fontFamily || FONTS.display, fontSize, color: color || COLORS.N500, fontWeight }}
            >
              {line}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SectionLabel ────────────────────────────────────────
export function SectionLabel({ children, color, large }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.7 }}
      style={{
        fontFamily: FONTS.accent, fontSize: large ? 48 : 24, letterSpacing: "0.18em",
        textTransform: "uppercase", fontWeight: 700, marginBottom: large ? 32 : 24,
        color: color || "rgba(255,255,255,0.25)",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Header（統一版）────────────────────────────────────
const NAV_ITEMS = [
  { label: "Top",       href: "/" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "About",     href: "/about" },
  { label: "Services",  href: "/services" },
  { label: "Releases",  href: "/releases" },
  { label: "Contact",   href: "/contact" },
];

// ─── ページ遷移アニメーション（落ち着きバージョン）────────────────

// 別ページ用: 暗転 + BOAR緑グロー
function _FadeOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ position: "fixed", inset: 0, background: "#040a06", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <motion.div
        initial={{ color: "transparent", textShadow: "0 0 0px transparent" }}
        animate={{
          color:       ["transparent", "transparent", COLORS.G300],
          textShadow:  ["0 0 0px transparent", `0 0 12px rgba(90,140,115,0.5)`, `0 0 40px ${COLORS.G300}, 0 0 100px rgba(90,140,115,0.5)`],
        }}
        transition={{ duration: 0.85, times: [0, 0.45, 1], ease: "easeOut" }}
        style={{
          fontFamily: FONTS.accent, fontSize: "clamp(64px,12vw,140px)", fontWeight: 900,
          letterSpacing: "-0.03em", userSelect: "none",
          WebkitTextStroke: "1.5px rgba(180,180,180,0.35)",
        }}
      >BOAR</motion.div>
    </motion.div>
  );
}

// 同ページ用: 半透明ターミナル（1行・短縮版）
function _TerminalOverlay({ onDone }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0); // 0=slide-in, 1=slide-out
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setPhase(1), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  useEffect(() => {
    if (phase === 1) { const t = setTimeout(onDone, 650); return () => clearTimeout(t); }
  }, [phase, onDone]);
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={phase < 1 ? { y: "0%" } : { y: "-100%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(4,10,6,0.78)", backdropFilter: "blur(2px)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 clamp(20px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1080, width: "100%", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, x: -6 }} animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.25 }}
          style={{ fontFamily: "monospace", fontSize: "clamp(12px,2vw,16px)", color: COLORS.G300, letterSpacing: "0.04em" }}
        >
          &gt; navigating...
        </motion.div>
      </div>
    </motion.div>
  );
}

function _PageTransitionOverlay({ type, onPeak, onDone }) {
  const peakFired = useRef(false);
  useEffect(() => {
    // 別ページ: 暗転完了300ms / 同ページ: スライド完了600ms
    const delay = type === "page" ? 310 : 610;
    const t = setTimeout(() => { if (!peakFired.current) { peakFired.current = true; onPeak?.(); } }, delay);
    return () => clearTimeout(t);
  }, []);

  if (type === "page") return <_FadeOverlay />;
  return <_TerminalOverlay onDone={onDone} />;
}

// onClick など <a> を経由しない遷移にも使える外部トリガー
export function navigateWithTransition(href) {
  document.dispatchEvent(new CustomEvent("boar:navigate", { detail: { href } }));
}

// グローバル click インターセプター — Header に組み込み全ページに適用
function PageTransitionManager() {
  const [transition, setTransition] = useState(null);
  const transitionRef = useRef(null);

  const trigger = useCallback((href) => {
    if (transitionRef.current) return;
    const url = new URL(href, window.location.href);
    const isSamePage = url.pathname === window.location.pathname;
    if (isSamePage && !url.hash) return;
    const t = { href, type: isSamePage ? "same" : "page" };
    transitionRef.current = t;
    setTransition(t);
  }, []);

  useEffect(() => {
    // <a> クリックのインターセプト
    const clickHandler = (e) => {
      if (transitionRef.current) return;
      const anchor = e.target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto") || href.startsWith("tel") || anchor.target === "_blank") return;
      const url = new URL(href, window.location.href);
      const isSamePage = url.pathname === window.location.pathname;
      if (isSamePage && !url.hash) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      trigger(href);
    };
    // navigateWithTransition() からのカスタムイベント
    const navHandler = (e) => trigger(e.detail.href);

    document.addEventListener("click", clickHandler, { capture: true });
    document.addEventListener("boar:navigate", navHandler);
    return () => {
      document.removeEventListener("click", clickHandler, { capture: true });
      document.removeEventListener("boar:navigate", navHandler);
    };
  }, [trigger]);

  const handlePeak = useCallback(() => {
    const t = transitionRef.current;
    if (!t) return;
    if (t.type === "same") {
      const url = new URL(t.href, window.location.href);
      const el = document.querySelector(url.hash);
      if (el) {
        const rect = el.getBoundingClientRect();
        const centerY = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
        window.scrollTo({ top: Math.max(0, centerY), behavior: "instant" });
        history.pushState(null, "", url.hash);
      }
    } else {
      window.location.href = t.href;
    }
  }, []);

  const handleDone = useCallback(() => {
    transitionRef.current = null;
    setTransition(null);
  }, []);

  return (
    <AnimatePresence>
      {transition && (
        <_PageTransitionOverlay
          key={transition.href + transition.type}
          type={transition.type}
          onPeak={handlePeak}
          onDone={handleDone}
        />
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // メニュー開閉時にbodyスクロールをロック
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // 画面幅が広くなったらメニューを閉じる
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const isActive = (href) => {
    const path = href.split("#")[0].replace(/\/$/, "") || "/";
    return path !== "/" && currentPath.startsWith(path);
  };

  return (
    <>
      <PageTransitionManager />
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(9,12,14,0.97)" : "rgba(9,12,14,0.85)",
        backdropFilter: "blur(8px)",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: isMobile ? "12px 20px" : "15px 32px 10px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <a href="/" style={{ display: "inline-block" }}>
            <img src="/boar-logo.png?v=2" alt="BOAR Partners" style={{ height: isMobile ? 36 : 48, width: "auto" }} />
          </a>

          {/* デスクトップナビ（768px以上のみ表示） */}
          {!isMobile && (
            <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      color: active ? COLORS.N500 : "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.12em",
                      textTransform: "uppercase", fontWeight: 700,
                      borderBottom: active ? `1px solid ${COLORS.G300}` : "1px solid transparent",
                      paddingBottom: 2, transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.N500}
                    onMouseLeave={(e) => e.target.style.color = active ? COLORS.N500 : "rgba(255,255,255,0.6)"}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}

          {/* ハンバーガーボタン（モバイルのみ） */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="メニューを開く"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: 24, height: 2, background: COLORS.N500, transformOrigin: "center" }}
              />
              <motion.div
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: 24, height: 2, background: COLORS.N500 }}
              />
              <motion.div
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: 24, height: 2, background: COLORS.N500, transformOrigin: "center" }}
              />
            </button>
          )}
        </div>
      </header>

      {/* フルスクリーンモバイルメニュー */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "#090c0e",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "flex-start",
              padding: "0 10vw",
            }}
          >
            {/* ナビリンク */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: FONTS.accent,
                      fontSize: "clamp(40px,12vw,64px)",
                      fontWeight: 900, letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      color: active ? COLORS.G300 : COLORS.N500,
                      textDecoration: "none",
                      lineHeight: 1.15,
                    }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* ボトムライン */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: "absolute", bottom: 40, left: "10vw",
                fontFamily: FONTS.accent, fontSize: 11,
                letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
              }}
            >
              BOAR Partners
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Footer ──────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg,#0d1a14 0%,#090c0e 100%)", padding: "48px 32px 32px" }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24,
      }}>
        <a href="/">
          <img src="/boar-logo.png" alt="BOAR Partners" style={{ height: 32, width: "auto", opacity: 0.5 }} />
        </a>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} style={{
              fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none",
            }}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: 1080, margin: "32px auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
          © 2026 BOAR Partners, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
