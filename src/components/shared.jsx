/**
 * shared.jsx — 共通定数・コンポーネント
 * Header / Footer / FadeIn / TextReveal / SectionLabel / hooks
 */
import { useState, useEffect, useRef } from "react";
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
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea",
  G150: "#0a1a12", G250: "#4a8060",
  N100: "#090c0e", N200: "#47494a", N300: "#848686", N400: "#c2c2c3", N500: "#ffffff",
  darkCard:   "rgba(255,255,255,0.04)",
  darkBorder: "rgba(255,255,255,0.09)",
  darkHL:     "rgba(255,255,255,0.92)",
  darkBody:   "rgba(255,255,255,0.45)",
  // Phase カラー（コーポレートグリーンの濃淡で差別化）
  PHASE_DEFINE:  "#b0d4c0",  // G400 — 薄緑
  PHASE_DRIVE:   "#6aaa88",  // G300 — 中緑
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
export function SectionLabel({ children, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.7 }}
      style={{
        fontFamily: FONTS.accent, fontSize: 24, letterSpacing: "0.22em",
        textTransform: "uppercase", fontWeight: 700, marginBottom: 24,
        color: color || "rgba(255,255,255,0.25)",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Header（統一版）────────────────────────────────────
const NAV_ITEMS = [
  { label: "Top",      href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Releases", href: "/releases" },
  { label: "Contact",  href: "/contact" },
];

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
                      borderBottom: active ? `1px solid ${COLORS.G300}` : "none",
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
