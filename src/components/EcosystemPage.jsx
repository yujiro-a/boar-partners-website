import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Header, Footer, useIsMobile, FONTS, COLORS } from "./shared.jsx";

// ─── データ ─────────────────────────────────────────────────────────────────

const FOCUS_DOMAINS = [
  {
    num: "01",
    name: "Physical AI",
    tagline: "物理世界を知覚し、動かす",
    desc: [
      "デジタルが物理世界に直接介入する技術群——触覚センシング、ロボティクス、コンピュータビジョン。",
      "commissureとのForward R&D実績を起点に、製造業・建設・物流の現場を変える。",
    ],
    detail:
      "工場の品質検査、建設現場の自動測量、物流の仕分け自動化——これらに共通するのは「物理的判断」のデジタル代替だ。BOARは、センシング技術とロボティクスを組み合わせた実装支援を通じ、現場の勘と経験に依存してきた領域に再現性と拡張性をもたらす。",
    outlook:
      "2030年までに製造・建設領域のPhysical AI市場は国内で1.5兆円規模に達すると試算。BOARは commissure との共同プロジェクトを軸に、産業別ユースケースの知見を横展開する。",
    maturity: 72,
    accentColor: COLORS.G300,
    img: "https://www.shutterstock.com/image-illustration/semiconductor-manufacturing-3d-rendering-robotic-600nw-2649884261.jpg",
  },
  {
    num: "02",
    name: "Agentic AI",
    tagline: "指示を待つAIから、行動するAIへ",
    desc: [
      "指示を待つAIから、自ら判断し行動するAIへ。意思決定の構造そのものを再設計する。",
      "人月依存の業務構造を根本から変える次世代アーキテクチャ。",
    ],
    detail:
      "「ChatGPTに聞く」段階から「AIが業務を遂行する」段階へ。営業、経理、法務——反復的判断タスクのエージェント化は、単なる効率化ではなく組織設計の再考を迫る。BOARは、業務フロー設計からLLMオーケストレーションの実装まで一気通貫で支援する。",
    outlook:
      "国内エンタープライズのAgentic AI導入はまだ黎明期。BOARは先行事例の構築を通じ、業種別ベストプラクティスを蓄積・提供していく。",
    maturity: 58,
    accentColor: COLORS.G300,
    img: "https://www.shutterstock.com/image-vector/ai-agents-orchestration-workflow-diagram-600nw-2706465509.jpg",
  },
  {
    num: "03",
    name: "Quantum Technology",
    tagline: "最も深いキャズムに、正面から入る",
    desc: [
      "研究は世界水準、産業化支援は空白。年間1,000億円超の国家予算が動く。",
      "キャズムが最も深い領域に、BOARは正面から入る。",
    ],
    detail:
      "量子コンピュータ・量子センサー・量子暗号——各技術は研究室を出始めているが、事業化を支援するプレイヤーが圧倒的に不足している。BOARは東京大学との産学連携を通じ、量子スタートアップの事業開発・資金調達支援を行う。",
    outlook:
      "政府の量子技術イノベーション戦略（2023改定）により国家投資が加速。BOARはこの動きを早期に捉え、アカデミアと産業界の橋渡し役として唯一無二のポジションを構築する。",
    maturity: 34,
    accentColor: COLORS.G300,
    img: "https://www.shutterstock.com/image-illustration/futuristic-quantum-computing-machine-glowing-atomic-600nw-2621003427.jpg",
  },
];

const ALLIANCE_CATEGORIES = [
  {
    label: "Technology",
    partners: [
      {
        name: "commissure",
        sub: "Deep Tech × 製造業",
        logo: "/logos/commissure.svg",
        desc: "製造・建設領域でのForward R&Dを共同推進。Physical AIの実証フィールドを提供。",
      },
      {
        name: "Parkour Japan",
        sub: "AIエージェント × 組織変革",
        logo: "/logos/parkour-japan.webp",
        desc: "AIエージェント導入支援とデータリスキリングにより、企業の組織変革を推進。業務自動化から現場定着まで一気通貫で支援する。",
      },
    ],
  },
  {
    label: "Industry",
    partners: [
      {
        name: "東京大学",
        sub: "アカデミア × 産学連携",
        logo: "/logos/tokyo-university.svg",
        desc: "量子技術・ロボティクス領域での産学連携。研究成果の事業化支援を共同で行う。",
      },
    ],
  },
  {
    label: "Finance",
    partners: [
      {
        name: "みずほ",
        sub: "メガバンク × 産業DX",
        logo: "/logos/mizuho.svg",
        desc: "産業DX推進における資金調達・事業化ファイナンスを連携。",
      },
      {
        name: "三菱UFJ銀行",
        sub: "メガバンク × 産業ファイナンス",
        logo: "/logos/mufg.svg",
        desc: "ディープテック企業の成長資金調達に関する連携パートナー。",
      },
    ],
  },
];

// ─── ユーティリティ ──────────────────────────────────────────────────────────

function MaturityBar({ value, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          Readiness
        </span>
        <span style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.1em", color }}>
          {value}%
        </span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ height: "100%", background: color, borderRadius: 1 }}
        />
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0, style: extra = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      style={extra}
    >
      {children}
    </motion.div>
  );
}

function TextReveal({ lines, delay = 0, fontSize, color, fontWeight = 700 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
          <motion.div
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.95, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: FONTS.display, fontSize, color: color || "rgba(255,255,255,0.92)", fontWeight }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Grid Overlay ─────────────────────────────────────────────────────────────

function GridOverlay() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid-ec" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.6"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid-ec)"/>
    </svg>
  );
}

// ─── ヒーロー ────────────────────────────────────────────────────────────────

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      background: "radial-gradient(ellipse 70% 60% at 15% 40%, rgba(45,90,64,0.22) 0%, transparent 70%), linear-gradient(180deg,#090c0e 0%,#0d1a14 100%)",
      padding: isMobile ? "140px 6vw 100px" : "160px 8vw 120px",
      position: "relative",
      overflow: "hidden",
    }}>
      <GridOverlay />
      {/* ゴーストテキスト */}
      <div style={{
        position: "absolute", right: "-0.04em", bottom: "-0.05em",
        fontFamily: FONTS.accent, fontWeight: 900,
        fontSize: "clamp(120px,28vw,360px)",
        color: "rgba(255,255,255,0.025)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>
        SYSTEM
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontFamily: FONTS.accent, fontWeight: 900,
            fontSize: isMobile ? "clamp(52px,14vw,80px)" : "clamp(72px,10vw,120px)",
            color: "rgba(255,255,255,0.92)", lineHeight: 0.92,
            letterSpacing: "-0.02em",
          }}>
            SYSTEM.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Focus Domains ───────────────────────────────────────────────────────────

function DomainCard({ domain, index }) {
  const isMobile = useIsMobile();
  const isEven = index % 2 === 0;

  if (isMobile) {
    return (
      <motion.div
        id={`domain-${domain.num}`}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 64, scrollMarginTop: "calc(50vh - 200px)" }}
      >
        {/* 画像ヒーロー（テキストオーバーレイ） */}
        <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
          {domain.img && (
            <img src={domain.img} alt={domain.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
          )}
          {/* スモーク: 上から薄く */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,12,14,0.5) 0%, transparent 45%)" }} />
          {/* スモーク: 下から濃く（テキスト可読域） */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,12,14,0.97) 0%, rgba(9,12,14,0.75) 35%, rgba(9,12,14,0.2) 65%, transparent 100%)" }} />
          {/* オーバーレイテキスト */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 24px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 40, fontWeight: 900, color: "rgba(255,255,255,0.07)", lineHeight: 1 }}>{domain.num}</span>
              <span style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.2em", color: domain.accentColor, textTransform: "uppercase" }}>Focus Domain</span>
            </div>
            <h2 style={{ fontFamily: FONTS.accent, fontSize: "clamp(28px,8vw,38px)", fontWeight: 900, color: "rgba(255,255,255,0.93)", lineHeight: 1.1, marginBottom: 6 }}>
              {domain.name}
            </h2>
            <p style={{ fontFamily: FONTS.display, fontSize: "clamp(13px,3.5vw,15px)", color: domain.accentColor, lineHeight: 1.5, margin: 0 }}>
              {domain.tagline}
            </p>
          </div>
        </div>

        {/* 詳細テキスト */}
        <div style={{ padding: "20px 4px 0" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "clamp(13px,3.8vw,15px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: 16 }}>
            {domain.desc.join("")}
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: "clamp(13px,3.5vw,14px)", color: "rgba(255,255,255,0.35)", lineHeight: 2, marginBottom: 20, borderLeft: `2px solid ${domain.accentColor}`, paddingLeft: 14 }}>
            {domain.detail}
          </p>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
              <span style={{ fontFamily: FONTS.accent, fontSize: 9, letterSpacing: "0.16em", color: domain.accentColor, textTransform: "uppercase", display: "block", marginBottom: 5 }}>Outlook</span>
              {domain.outlook}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id={`domain-${domain.num}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        marginBottom: 120,
        direction: !isEven ? "rtl" : "ltr",
        scrollMarginTop: "calc(50vh - 200px)",
      }}
    >
      {/* テキスト側 */}
      <div style={{ direction: "ltr" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: 64, fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>
            {domain.num}
          </span>
          <span style={{ fontFamily: FONTS.accent, fontSize: 13, letterSpacing: "0.18em", color: domain.accentColor, textTransform: "uppercase" }}>
            Focus Domain
          </span>
        </div>

        <h2 style={{ fontFamily: FONTS.accent, fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, color: "rgba(255,255,255,0.92)", lineHeight: 1.2, marginBottom: 8 }}>
          {domain.name}
        </h2>
        <p style={{ fontFamily: FONTS.display, fontSize: "clamp(15px,1.4vw,17px)", color: domain.accentColor, marginBottom: 24, lineHeight: 1.5 }}>
          {domain.tagline}
        </p>

        <p style={{ fontFamily: FONTS.body, fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: 20 }}>
          {domain.desc.join("")}
        </p>

        <p style={{ fontFamily: FONTS.body, fontSize: "clamp(14px,1.3vw,15px)", color: "rgba(255,255,255,0.38)", lineHeight: 2, marginBottom: 24, borderLeft: `2px solid ${domain.accentColor}`, paddingLeft: 16 }}>
          {domain.detail}
        </p>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "16px 20px", marginBottom: 20 }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
            <span style={{ fontFamily: FONTS.accent, fontSize: 10, letterSpacing: "0.16em", color: domain.accentColor, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Outlook
            </span>
            {domain.outlook}
          </p>
        </div>
      </div>

      {/* 画像側 */}
      <div style={{
        direction: "ltr",
        aspectRatio: "4/3",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {domain.img ? (
          <>
            <img
              src={domain.img}
              alt={domain.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,12,14,0.6) 0%, rgba(9,12,14,0.15) 45%, transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(9,12,14,0.4) 100%)" }} />
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: FONTS.accent, fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>Coming Soon</span>
          </div>
        )}
        <div style={{ position: "absolute", top: 16, left: 16 }}>
          <span style={{ fontFamily: FONTS.accent, fontSize: 64, fontWeight: 900, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}>
            {domain.num}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FocusDomainsSection() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    // ページ描画完了後にスクロール
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{ background: "linear-gradient(180deg, #0d1a14 0%, #090c0e 100%)", padding: isMobile ? "80px 6vw 80px" : "120px 8vw 80px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? 64 : 96 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", color: COLORS.G300, marginBottom: 12 }}
          >
            Focus Domains
          </motion.div>
          <FadeIn delay={0.1}>
            <TextReveal
              lines={["先端技術を社会に実装する"]}
              fontSize="clamp(36px,4.8vw,58px)"
            />
          </FadeIn>
        </div>

        {FOCUS_DOMAINS.map((domain, i) => (
          <DomainCard key={domain.num} domain={domain} index={i} />
        ))}

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: "1px dashed rgba(255,255,255,0.12)",
            borderRadius: 12,
            padding: isMobile ? "40px 24px" : "48px 56px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginBottom: 0,
          }}
        >
          <span style={{ fontFamily: FONTS.accent, fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>04</span>
          <div>
            <p style={{ fontFamily: FONTS.accent, fontSize: 13, letterSpacing: "0.18em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 8 }}>Next Domain — Coming Soon</p>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
              新たな技術領域への挑戦。詳細は近日公開予定。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Alliance Partners ───────────────────────────────────────────────────────

function PartnerCard({ partner, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{
        height: 52,
        display: "flex",
        alignItems: "center",
      }}>
        <img
          src={partner.logo}
          alt={partner.name}
          style={{ maxHeight: 40, maxWidth: "100%", objectFit: "contain", objectPosition: "left center", filter: "brightness(0) invert(1)", opacity: 0.7 }}
        />
      </div>
      <div>
        <p style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>
          {partner.name}
        </p>
        <p style={{ fontFamily: FONTS.body, fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
          {partner.sub}
        </p>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
          {partner.desc}
        </p>
      </div>
    </motion.div>
  );
}

function AllianceSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#090c0e", padding: isMobile ? "80px 6vw 120px" : "120px 8vw 160px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? 56 : 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: FONTS.accent, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", color: COLORS.G300, marginBottom: 12 }}
          >
            Alliance Partners
          </motion.div>
        </div>

        {ALLIANCE_CATEGORIES.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 64 }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <span style={{ fontFamily: FONTS.accent, fontSize: 11, letterSpacing: "0.2em", color: COLORS.G300, textTransform: "uppercase" }}>
                {cat.label}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </motion.div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(cat.partners.length, 3)}, 1fr)`,
              gap: 16,
            }}>
              {cat.partners.map((partner, pi) => (
                <PartnerCard key={pi} partner={partner} index={pi} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

// ─── メインコンポーネント ─────────────────────────────────────────────────────

function CTA() {
  const [hovered, setHovered] = useState(false);
  const G = COLORS.G300;
  return (
    <a
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
            Partnership / Alliance
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
            アライアンス・共同実証・事業開発のご相談はこちらから。
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

export default function EcosystemPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FocusDomainsSection />
        <AllianceSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
