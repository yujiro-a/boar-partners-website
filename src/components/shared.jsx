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
  // Phase カラー
  PHASE_DEFINE:  "#3B82F6",
  PHASE_DRIVE:   "#8B5CF6",
  PHASE_DELIVER: "#10B981",
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
        fontFamily: FONTS.accent, fontSize: 12, letterSpacing: "0.22em",
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
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Services",   href: "/services" },
  { label: "About",      href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

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

  const isActive = (href) => {
    const path = href.split("#")[0].replace(/\/$/, "") || "/";
    return path !== "/" && currentPath.startsWith(path);
  };

  const isContactPage = currentPath === "/contact";

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
          maxWidth: 1280, margin: "0 auto", padding: "15px 32px 10px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <a href="/" style={{ display: "inline-block" }}>
            <img src="/boar-logo.png?v=2" alt="BOAR Partners" style={{ height: 48, width: "auto" }} />
          </a>

          {/* デスクトップナビ */}
          <nav style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
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
            {isContactPage ? (
              <span style={{
                color: COLORS.N500, fontFamily: FONTS.accent, fontSize: 15,
                letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700,
                padding: "10px 24px", border: "1px solid rgba(255,255,255,0.6)",
                cursor: "default",
              }}>
                Contact
              </span>
            ) : (
              <a href="/contact" style={{
                color: COLORS.N500, textDecoration: "none",
                fontFamily: FONTS.accent, fontSize: 15, letterSpacing: "0.1em",
                textTransform: "uppercase", fontWeight: 700,
                padding: "10px 24px", border: "1px solid rgba(255,255,255,0.4)",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.N500; e.currentTarget.style.color = COLORS.G100; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.N500; }}
              >
                Contact
              </a>
            )}
          </nav>

          {/* モバイルハンバーガー */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="メニューを開く"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
          >
            <div style={{ width: 24, height: 2, background: COLORS.N500, marginBottom: 6 }} />
            <div style={{ width: 24, height: 2, background: COLORS.N500, marginBottom: 6 }} />
            <div style={{ width: 24, height: 2, background: COLORS.N500 }} />
          </button>
        </div>
      </header>

      {/* フルスクリーンモバイルメニュー */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(9,12,14,0.97)", backdropFilter: "blur(12px)",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "flex-start",
              padding: "0 10vw",
            }}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="メニューを閉じる"
              style={{
                position: "absolute", top: 24, right: 24,
                background: "none", border: "none", cursor: "pointer",
                color: COLORS.N500, padding: 8,
              }}
            >
              <X size={28} />
            </button>

            {/* ナビリンク */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[...NAV_ITEMS, { label: "Contact", href: "/contact" }].map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: FONTS.accent,
                      fontSize: "clamp(36px,9vw,60px)",
                      fontWeight: 900, letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: active ? COLORS.G300 : COLORS.N500,
                      textDecoration: "none",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>
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
          {[
            { label: "Philosophy", href: "/#philosophy" },
            { label: "Services",   href: "/services" },
            { label: "About",      href: "/about" },
            { label: "Contact",    href: "/contact" },
          ].map((item) => (
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
