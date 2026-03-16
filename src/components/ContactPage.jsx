import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FONTS, COLORS, Header, Footer, FadeIn, TextReveal, SectionLabel } from "./shared.jsx";

// ─── CONTACT FORM ───
function ContactForm() {
  const [formData, setFormData] = useState({ company: "", name: "", email: "", message: "" });
  const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const L = {
    text: "#0d1a14", body: "rgba(9,12,14,0.55)",
    accent: "#2d5a40", label: "rgba(9,12,14,0.35)",
    border: "rgba(9,12,14,0.15)",
  };

  const inputStyle = {
    width: "100%", padding: "16px 18px",
    border: `1px solid ${L.border}`,
    background: "rgba(9,12,14,0.06)",
    color: L.text, fontSize: 15, fontFamily: FONTS.body,
    outline: "none", transition: "border-color 0.3s", boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#ede8df 0%,#e8e2d8 100%)",
      padding: "calc(120px + 4vw) 32px 120px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "0 80px" }}>
          {/* 左: 見出し・説明 */}
          <div>
            <SectionLabel color={COLORS.G200}>Contact</SectionLabel>
            <TextReveal
              lines={["ご相談・", "お問い合わせ"]}
              fontSize="clamp(32px,4.5vw,64px)"
              color={L.text}
              style={{ marginBottom: 40 }}
            />
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: FONTS.body, fontSize: 15, color: L.body, lineHeight: 1.9 }}>
                事業のこと、戦略のこと、なんでも。
                まずは話しましょう。
              </p>
            </FadeIn>
          </div>

          {/* 右: フォーム */}
          <FadeIn delay={0.3} style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "会社名", field: "company", placeholder: "株式会社〇〇" },
                { label: "お名前 *", field: "name", placeholder: "山田 太郎" },
                { label: "メールアドレス *", field: "email", placeholder: "example@company.co.jp", type: "email" },
              ].map(({ label, field, placeholder, type }) => (
                <div key={field}>
                  <label style={{ fontFamily: FONTS.body, fontSize: 12, color: L.label,
                    marginBottom: 8, display: "block", letterSpacing: "0.05em" }}>{label}</label>
                  <input style={inputStyle} type={type || "text"}
                    value={formData[field]} onChange={handleChange(field)} placeholder={placeholder} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: FONTS.body, fontSize: 12, color: L.label,
                  marginBottom: 8, display: "block", letterSpacing: "0.05em" }}>ご相談内容 *</label>
                <textarea style={{ ...inputStyle, minHeight: 160, resize: "vertical" }}
                  value={formData.message} onChange={handleChange("message")}
                  placeholder="ご相談内容をお書きください" />
              </div>
              <button style={{
                width: "100%", padding: "20px 0",
                background: L.accent, color: "#ffffff", border: "none", cursor: "pointer",
                fontFamily: FONTS.accent, fontSize: 16, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.target.style.background = COLORS.N100; }}
                onMouseLeave={(e) => { e.target.style.background = L.accent; }}
              >送信する</button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div style={{ overflowX: "clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}
