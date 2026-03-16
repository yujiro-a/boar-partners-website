import { useState } from "react";
import { motion } from "framer-motion";
import { FONTS, COLORS, Header, Footer } from "./shared.jsx";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const inputStyle = {
    width: "100%", padding: "14px 0",
    border: "none", borderBottom: "1px solid rgba(9,12,14,0.18)",
    background: "transparent", color: "#0d1a14",
    fontSize: 15, fontFamily: FONTS.body,
    outline: "none", transition: "border-color 0.3s",
    boxSizing: "border-box",
  };

  return (
    <div style={{ overflowX: "clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        input::placeholder, textarea::placeholder { color: rgba(9,12,14,0.28); }
        input:focus, textarea:focus { border-bottom-color: ${COLORS.G200} !important; }
      `}</style>
      <Header />

      {/* ── Dark hero ── */}
      <section style={{
        background: "linear-gradient(180deg, #090c0e 0%, #0d1a14 100%)",
        padding: "140px 8vw 120px",
        clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
        marginBottom: "-6vw",
        position: "relative", zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: "clamp(64px,11vw,160px)",
            color: "#ffffff", lineHeight: 1, letterSpacing: "-0.02em",
          }}
        >
          Contact.
        </motion.div>
      </section>

      {/* ── Stone form ── */}
      <section style={{
        background: "linear-gradient(180deg, #ede8df 0%, #e8e2d8 100%)",
        padding: "calc(6vw + 80px) 8vw 120px",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}
          >
            {[
              { label: "お名前 *", field: "name", placeholder: "山田 太郎" },
              { label: "メールアドレス *", field: "email", placeholder: "example@company.co.jp", type: "email" },
            ].map(({ label, field, placeholder, type }) => (
              <div key={field}>
                <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(9,12,14,0.4)", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
                <input style={inputStyle} type={type || "text"} value={form[field]} onChange={set(field)} placeholder={placeholder} />
              </div>
            ))}
            <div>
              <div style={{ fontFamily: FONTS.body, fontSize: 11, color: "rgba(9,12,14,0.4)", letterSpacing: "0.08em", marginBottom: 8 }}>ご相談内容 *</div>
              <textarea
                style={{ ...inputStyle, minHeight: 140, resize: "none", borderBottom: "1px solid rgba(9,12,14,0.18)" }}
                value={form.message} onChange={set("message")}
                placeholder="ご相談内容をお書きください"
              />
            </div>
            <button
              style={{
                padding: "18px 0", background: COLORS.G200, color: "#fff", border: "none",
                cursor: "pointer", fontFamily: FONTS.accent, fontSize: 14, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", transition: "background 0.3s",
              }}
              onMouseEnter={(e) => { e.target.style.background = COLORS.G100; }}
              onMouseLeave={(e) => { e.target.style.background = COLORS.G200; }}
            >
              Send →
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
