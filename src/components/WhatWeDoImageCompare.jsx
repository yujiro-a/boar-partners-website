import { useState } from "react";
import { motion } from "framer-motion";

const FONTS = {
  accent: "'Big Shoulders Display', sans-serif",
  display: "'Noto Serif JP', serif",
  body: "system-ui, sans-serif",
};
const G = "#6db88b";
const DARK = "#090c0e";

// ─── 30候補（各テーマ10個） ──────────────────────────────────────
const CANDIDATES = [
  // ── EXECUTE（01 事業開発のプロ集団） ──
  { id:"E01", theme:"EXECUTE", col:0, label:"チームが深夜にPC作業（王道）",         note:"暗いオフィス×ノートPC×チーム。最も「実行力」を感じる定番構図",           ssId:"2303880495", slug:"business-people-laptop-team-night-planning",               pageUrl:"https://www.shutterstock.com/ja/image-photo/business-people-laptop-team-night-planning-2303880495" },
  { id:"E02", theme:"EXECUTE", col:0, label:"ダークブルーオフィス・女性リーダー",     note:"モダンで洗練。ダークブルー背景×グリーンカーテンの相性◎",                   ssId:"2725720711", slug:"dedicated-business-team-working-late-on",                 pageUrl:"https://www.shutterstock.com/ja/image-photo/dedicated-business-team-working-late-on-2725720711" },
  { id:"E03", theme:"EXECUTE", col:0, label:"会議室ブレスト・多様なチーム",           note:"プレゼン×チームの縦構図。EXECUTE感◎",                                     ssId:"2059353020", slug:"multiethnic-diverse-businesspeople-brainstorming-company-ideas", pageUrl:"https://www.shutterstock.com/ja/image-photo/multiethnic-diverse-businesspeople-brainstorming-company-ideas-2059353020" },
  { id:"E04", theme:"EXECUTE", col:0, label:"プレゼンに集中する深夜チーム",           note:"画面の光だけの薄暗さが「本気度」を演出",                                   ssId:"2610291923", slug:"team-business-people-working-together-late",               pageUrl:"https://www.shutterstock.com/ja/image-photo/team-business-people-working-together-late-2610291923" },
  { id:"E05", theme:"EXECUTE", col:0, label:"夜×タブレット×チームワーク",             note:"タブレット囲んでの作業感。多様性×夜のビジネス",                             ssId:"2269473319", slug:"night-business-people-teamwork-on-tablet",                 pageUrl:"https://www.shutterstock.com/ja/image-photo/night-business-people-teamwork-on-tablet-2269473319" },
  { id:"E06", theme:"EXECUTE", col:0, label:"夜×ノートPC×複数名の協業",              note:"E01と類似だが構図・トーン違い。比較検討用",                                 ssId:"2269716137", slug:"night-business-people-teamwork-on-laptop",                 pageUrl:"https://www.shutterstock.com/ja/image-photo/night-business-people-teamwork-on-laptop-2269716137" },
  { id:"E07", theme:"EXECUTE", col:0, label:"深夜まで働く協力的なチーム",             note:"チームワーク×夜間作業の躍動感。明るめトーン",                               ssId:"2647665801", slug:"collaborative-business-team-working-late-night",           pageUrl:"https://www.shutterstock.com/ja/image-photo/collaborative-business-team-working-late-night-2647665801" },
  { id:"E08", theme:"EXECUTE", col:0, label:"コントロールルームで技術開発チーム",      note:"テック×チームのコントロールセンター感。BRIDGE寄りだが力強い",               ssId:"2733282115", slug:"tech-development-team-analyzing-digital-software",         pageUrl:"https://www.shutterstock.com/ja/image-photo/tech-development-team-analyzing-digital-software-2733282115" },
  { id:"E09", theme:"EXECUTE", col:0, label:"時間外ブレインストーミング",              note:"ディスカッション×分析のダイナミクス",                                       ssId:"2515916817", slug:"business-people-meeting-overtime-brainstorming-discussing",  pageUrl:"https://www.shutterstock.com/ja/image-photo/business-people-meeting-overtime-brainstorming-discussing-2515916817" },
  { id:"E10", theme:"EXECUTE", col:0, label:"薄暗いオフィスで財務分析チーム",          note:"電卓×数字×チーム。M&A・FASの雰囲気に近い",                                ssId:"2599487741", slug:"business-team-working-late-dimly-lit",                    pageUrl:"https://www.shutterstock.com/ja/image-photo/business-team-working-late-dimly-lit-2599487741" },

  // ── BRIDGE（02 アカデミアとの深い連携） ──
  { id:"B01", theme:"BRIDGE", col:1, label:"産業エンジニアが研究室でPC",              note:"技術×アカデミア◎。研究施設で1人集中する縦長構図",                           ssId:"1682600893", slug:"shot-industrial-engineer-working-research-laboratory",      pageUrl:"https://www.shutterstock.com/ja/image-photo/shot-industrial-engineer-working-research-laboratory-1682600893" },
  { id:"B02", theme:"BRIDGE", col:1, label:"研究施設のチーフエンジニア（チーム）",    note:"Technology Research Facilityの雰囲気。チームで研究開発",                   ssId:"1682600938", slug:"technology-research-facility-chief-engineer-stands",       pageUrl:"https://www.shutterstock.com/ja/image-photo/technology-research-facility-chief-engineer-stands-1682600938" },
  { id:"B03", theme:"BRIDGE", col:1, label:"女性研究者が顕微鏡で液体を操作",          note:"精密・丁寧な作業感。「研究室の言語で話せる」が視覚化",                       ssId:"2685609675", slug:"female-laboratory-professional-carefully-applying-liquid",  pageUrl:"https://www.shutterstock.com/ja/image-photo/female-laboratory-professional-carefully-applying-liquid-2685609675" },
  { id:"B04", theme:"BRIDGE", col:1, label:"科学者がビーカーにマイクロピペットで実験", note:"暗い背景×精密作業。深みのある一枚",                                          ssId:"2461682407", slug:"laboratory-analysis-scientist-dripping-sample-micropipette", pageUrl:"https://www.shutterstock.com/ja/image-photo/laboratory-analysis-scientist-dripping-sample-micropipette-2461682407" },
  { id:"B05", theme:"BRIDGE", col:1, label:"女性科学者がデータ分析（モニター前）",    note:"データ分析×研究室。デジタルとアカデミアの橋渡し感",                           ssId:"2732310397", slug:"cheerful-young-asian-female-scientist-presenting",          pageUrl:"https://www.shutterstock.com/ja/image-photo/cheerful-young-asian-female-scientist-presenting-2732310397" },
  { id:"B06", theme:"BRIDGE", col:1, label:"研究者同士が真剣に実験・協力",            note:"Serious research。2人以上の協業でBRIDGE感",                              ssId:"1433683484", slug:"serious-scientific-research-nice-young-scientist",          pageUrl:"https://www.shutterstock.com/ja/image-photo/serious-scientific-research-nice-young-scientist-1433683484" },
  { id:"B07", theme:"BRIDGE", col:1, label:"木製テーブルに顕微鏡とガラス器具（薄暗）", note:"物オンリー。ムードのある静物構図。抽象感が出る",                             ssId:"2636305761", slug:"microscope-laboratory-glassware-on-wooden-table",           pageUrl:"https://www.shutterstock.com/ja/image-photo/microscope-laboratory-glassware-on-wooden-table-2636305761" },
  { id:"B08", theme:"BRIDGE", col:1, label:"ラボコート女性科学者が試験管を調べる",    note:"縦長構図◎。白衣×暗い研究室のコントラスト",                                   ssId:"2751102393", slug:"young-female-scientist-lab-coat-safety",                   pageUrl:"https://www.shutterstock.com/ja/image-photo/young-female-scientist-lab-coat-safety-2751102393" },
  { id:"B09", theme:"BRIDGE", col:1, label:"安全眼鏡×青い液体フラスコを観察",         note:"実験の緊張感と集中力。ブルー系で差別化できる",                               ssId:"2751102389", slug:"female-scientist-wearing-safety-glasses-blue",             pageUrl:"https://www.shutterstock.com/ja/image-photo/female-scientist-wearing-safety-glasses-blue-2751102389" },
  { id:"B10", theme:"BRIDGE", col:1, label:"DNA分子×バイオテクノロジー概念図",        note:"アカデミアの象徴。抽象×科学で独自性あり",                                    ssId:"2467497781", slug:"dna-molecule-biotechnology-modern-medicine-doctors",        pageUrl:"https://www.shutterstock.com/ja/image-photo/dna-molecule-biotechnology-modern-medicine-doctors-2467497781" },

  // ── ACCELERATE（03 AIが一員として動く）— ロボットアーム系・顔なし 20選 ──
  { id:"A01", theme:"ACCELERATE", col:2, label:"青い光×2本の産業ロボットアーム",                note:"青いライトに照らされた2本のロボットアーム×ハイテク工場。E04ブルートーン◎",      ssId:"2675328649", slug:"two-robotic-arms-illuminated-by-blue",                   pageUrl:"https://www.shutterstock.com/ja/image-photo/two-robotic-arms-illuminated-by-blue-2675328649" },
  { id:"A02", theme:"ACCELERATE", col:2, label:"ロボット溶接アーム×青い色相",                   note:"青い色相で照らされたロボット溶接アーム×産業自動化。ドラマチックで暗め",          ssId:"2714737275", slug:"robotic-welding-arm-action-industrial-automation",        pageUrl:"https://www.shutterstock.com/ja/image-photo/robotic-welding-arm-action-industrial-automation-2714737275" },
  { id:"A03", theme:"ACCELERATE", col:2, label:"ロボット溶接アーム×スパーク×暗い工場",          note:"火花が飛ぶロボット溶接アーム。Physical AI感◎ スパークがドラマチック",             ssId:"2714732857", slug:"robotic-welding-arm-modern-factory-sparks",               pageUrl:"https://www.shutterstock.com/ja/image-photo/robotic-welding-arm-modern-factory-sparks-2714732857" },
  { id:"A04", theme:"ACCELERATE", col:2, label:"暗い工場ライン×ロボットアーム溶接スパーク",      note:"暗いアセンブリラインのロボット溶接。オレンジのスパークが暗さを際立たせる",        ssId:"1543267814", slug:"dark-factory-assembly-line-large-mechanical",             pageUrl:"https://www.shutterstock.com/ja/image-photo/dark-factory-assembly-line-large-mechanical-1543267814" },
  { id:"A05", theme:"ACCELERATE", col:2, label:"暗い工場ライン×溶接スパーク（別カット）",        note:"A04と同シリーズ・別アングル。スパークの光が唯一の光源",                          ssId:"1543267817", slug:"dark-factory-assembly-line-large-mechanical",             pageUrl:"https://www.shutterstock.com/ja/image-photo/dark-factory-assembly-line-large-mechanical-1543267817" },
  { id:"A06", theme:"ACCELERATE", col:2, label:"EVバッテリー製造×白いロボットアーム群（広角）",  note:"EVバッテリーラインの白いロボットアーム群。整列美とスマート製造の象徴",              ssId:"2465934221", slug:"front-view-electric-car-battery-manufacturing",           pageUrl:"https://www.shutterstock.com/ja/image-photo/front-view-electric-car-battery-manufacturing-2465934221" },
  { id:"A07", theme:"ACCELERATE", col:2, label:"EVバッテリー製造×ロボットアーム群（広角2）",    note:"A06より広い画角。生産ラインの奥行き感と規模感",                                  ssId:"2465934217", slug:"wide-angle-electric-car-battery-manufacturing",            pageUrl:"https://www.shutterstock.com/ja/image-photo/wide-angle-electric-car-battery-manufacturing-2465934217" },
  { id:"A08", theme:"ACCELERATE", col:2, label:"白いロボットアームの列×生産ライン",              note:"整列したロボットアームの列。「AIが量産」のビジュアル表現",                        ssId:"2467190345", slug:"row-white-robotic-arms-automated-production",              pageUrl:"https://www.shutterstock.com/ja/image-photo/row-white-robotic-arms-automated-production-2467190345" },
  { id:"A09", theme:"ACCELERATE", col:2, label:"高精度ロボットアーム×PCB組立ライン",            note:"電子工場の暗いラインで動く高精度ロボットアーム。精密さと暗さの共存",               ssId:"2345860231", slug:"advanced-high-precision-robot-arms-on",                   pageUrl:"https://www.shutterstock.com/ja/image-photo/advanced-high-precision-robot-arms-on-2345860231" },
  { id:"A10", theme:"ACCELERATE", col:2, label:"高精度ロボットアーム×黒回路基板（接写）",        note:"黒い回路基板にコンポーネントを取り付けるロボットアームの接写",                    ssId:"2345860423", slug:"advanced-high-precision-robot-arm-inside",                pageUrl:"https://www.shutterstock.com/ja/image-photo/advanced-high-precision-robot-arm-inside-2345860423" },
  { id:"A11", theme:"ACCELERATE", col:2, label:"高精度ロボットアーム接写×PCB暗い工場",          note:"PCB組立ラインのロボットアーム接写。ディテール重視の構図",                          ssId:"2348057533", slug:"close-high-precision-robot-arms-on",                      pageUrl:"https://www.shutterstock.com/ja/image-photo/close-high-precision-robot-arms-on-2348057533" },
  { id:"A12", theme:"ACCELERATE", col:2, label:"製造自動化×高精度ロボットアーム×PCBライン",      note:"完全自動化された電子デバイス製造ライン。暗い工場＋精密機械の組み合わせ",            ssId:"2348057535", slug:"manufacturing-automation-advanced-high-precision-robot",   pageUrl:"https://www.shutterstock.com/ja/image-photo/manufacturing-automation-advanced-high-precision-robot-2348057535" },
  { id:"A13", theme:"ACCELERATE", col:2, label:"暗い背景×ロボットの指×接触（接写）",            note:"暗い背景にロボット指が何かに触れる瞬間。AIと物理世界の接触点",                    ssId:"2390365703", slug:"robot-hand-finger-making-contact-pressing",               pageUrl:"https://www.shutterstock.com/ja/image-photo/robot-hand-finger-making-contact-pressing-2390365703" },
  { id:"A14", theme:"ACCELERATE", col:2, label:"暗い背景×ロボット指×指さし（別バージョン）",     note:"A13と同シリーズ・別構図。指の角度とフォーカスが異なる",                           ssId:"2309567365", slug:"robot-hand-finger-making-contact-pressing",               pageUrl:"https://www.shutterstock.com/ja/image-photo/robot-hand-finger-making-contact-pressing-2309567365" },
  { id:"A15", theme:"ACCELERATE", col:2, label:"白いサイボーグ指×人間の指×接触",               note:"人とAIの「接触」を象徴的に表現。暗いバックグラウンド×白いロボット指",             ssId:"2288727541", slug:"white-cyborg-finger-about-touch-human",                   pageUrl:"https://www.shutterstock.com/ja/image-photo/white-cyborg-finger-about-touch-human-2288727541" },
  { id:"A16", theme:"ACCELERATE", col:2, label:"研究室の机×照らされたロボットアームプロトタイプ", note:"暗い研究室の机上で光るロボットアームプロトタイプ。B07と似た静物構図",              ssId:"1682713555", slug:"industrial-robot-desing-research-laboratory-robotic",      pageUrl:"https://www.shutterstock.com/ja/image-photo/industrial-robot-desing-research-laboratory-robotic-1682713555" },
  { id:"A17", theme:"ACCELERATE", col:2, label:"テーブル×柔軟なロボットアーム×電子部品散在",    note:"電子部品が散らばるテーブル上の柔軟なロボットアーム。ハック感のある構図",            ssId:"2655839909", slug:"industrial-setting-featuring-flexible-robotic-arm",        pageUrl:"https://www.shutterstock.com/ja/image-photo/industrial-setting-featuring-flexible-robotic-arm-2655839909" },
  { id:"A18", theme:"ACCELERATE", col:2, label:"半導体製造ファブ×自動化ロボット×クリーンルーム", note:"クリーンルーム内の自動化ロボットがウェーハを搬送。フューチャリスティックな構図",   ssId:"2152408841", slug:"wide-shot-inside-advanced-semiconductor-production",        pageUrl:"https://www.shutterstock.com/ja/image-photo/wide-shot-inside-advanced-semiconductor-production-2152408841" },
  { id:"A19", theme:"ACCELERATE", col:2, label:"プラズマスパーク×レーザーカット×ロボット制御",   note:"CNCロボットが制御するレーザー切断のプラズマスパーク接写。エネルギー感◎",            ssId:"1546359680", slug:"plasma-sparks-close-laser-cutting-technology",            pageUrl:"https://www.shutterstock.com/ja/image-photo/plasma-sparks-close-laser-cutting-technology-1546359680" },
  { id:"A20", theme:"ACCELERATE", col:2, label:"ロボットがプロセッサを保持×暗いグレー背景",     note:"ロボットアームがCPUを保持するコンセプト。暗めのグレー背景×テック感",               ssId:"2130489947", slug:"robot-holds-productive-processor-personal-computer",       pageUrl:"https://www.shutterstock.com/ja/image-photo/robot-holds-productive-processor-personal-computer-2130489947" },
];

const PILLARS = [
  { num: "01", en: "EXECUTE",    title: "事業開発のプロ集団",      one: "戦略だけ、渡さない。" },
  { num: "02", en: "BRIDGE",     title: "アカデミアとの深い連携",  one: "研究室の言語で、話せる。" },
  { num: "03", en: "ACCELERATE", title: "AIが一員として動く",      one: "AIが本当に、働く。" },
];

const THEME_COLOR = { EXECUTE: "#6db88b", BRIDGE: "#7ab3cc", ACCELERATE: "#b88b6d" };
const THEME_LABEL = { EXECUTE: "01 EXECUTE", BRIDGE: "02 BRIDGE", ACCELERATE: "03 ACCELERATE" };

function thumbUrl(cand) {
  return `https://www.shutterstock.com/image-photo/${cand.slug}-600nw-${cand.ssId}.jpg`;
}

// ─── H02 グリーンカーテンモーション（確定） ────────────────────────
function ColCard({ imgUrl, pillar, hovered }) {
  return (
    <>
      {/* 背景画像 */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        style={{
          position:"absolute", inset:0,
          backgroundImage: imgUrl ? `url(${imgUrl})` : "linear-gradient(160deg,#152f26,#0d1a14)",
          backgroundSize:"cover", backgroundPosition:"center",
        }}
      />
      {/* ベースオーバーレイ */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,12,14,0.92) 0%,rgba(9,12,14,0.5) 60%,rgba(9,12,14,0.15) 100%)" }} />
      {/* グリーンカーテン (H02) */}
      <motion.div
        animate={{ height: hovered ? "55%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.16,1,0.3,1] }}
        style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(109,184,139,0.22) 0%,rgba(109,184,139,0.06) 70%,transparent 100%)", pointerEvents:"none" }}
      />
      {/* 下ライン */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:G, transformOrigin:"left" }}
      />
      {/* テキスト */}
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"28px 24px" }}>
        <div style={{ fontFamily:FONTS.accent, fontSize:10, letterSpacing:"0.25em", color:"rgba(255,255,255,0.35)", marginBottom:10 }}>{pillar.num}</div>
        <div style={{ fontFamily:FONTS.accent, fontSize:"clamp(24px,3vw,40px)", fontWeight:900, color: hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)", lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:12, transition:"color 0.4s" }}>{pillar.en}</div>
        <div style={{ fontFamily:FONTS.display, fontSize:"clamp(13px,1.3vw,18px)", fontWeight:700, color:"rgba(255,255,255,0.9)", marginBottom:8, lineHeight:1.4 }}>{pillar.title}</div>
        <motion.div animate={{ opacity: hovered ? 1 : 0.5 }} transition={{ duration: 0.35 }}
          style={{ fontFamily:FONTS.body, fontSize:"clamp(11px,0.9vw,13px)", color:G, lineHeight:1.7 }}>
          {pillar.one}
        </motion.div>
      </div>
    </>
  );
}

// ─── ライブプレビュー ─────────────────────────────────────────────
function LivePreview({ selected }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", height:"52vh" }}>
      {PILLARS.map((p, i) => {
        const cand = selected[i] ? CANDIDATES.find(c => c.id === selected[i]) : null;
        return (
          <div key={p.en}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ position:"relative", overflow:"hidden", cursor:"pointer",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
            <ColCard imgUrl={cand ? thumbUrl(cand) : null} pillar={p} hovered={hovered === i} />
            {!cand && (
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontFamily:FONTS.accent, fontSize:11, color:"rgba(255,255,255,0.2)", letterSpacing:"0.2em" }}>
                  CLICK TO ASSIGN
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── サムネイルカード ────────────────────────────────────────────
function ThumbCard({ cand, isSelected, assignedTo, onClick }) {
  const [imgError, setImgError] = useState(false);
  const themeCol = THEME_COLOR[cand.theme];
  return (
    <div
      onClick={onClick}
      style={{
        cursor:"pointer",
        outline: isSelected ? `2px solid ${themeCol}` : "2px solid transparent",
        outlineOffset: 3,
        transition:"outline-color 0.2s",
        background:"rgba(255,255,255,0.03)",
        borderRadius:2,
      }}
    >
      <div style={{ position:"relative", height:140, overflow:"hidden", background:"#1a2520" }}>
        {!imgError ? (
          <img
            src={thumbUrl(cand)}
            alt={cand.label}
            onError={() => setImgError(true)}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
        ) : (
          <div style={{
            width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
            flexDirection:"column", gap:8,
          }}>
            <div style={{ fontFamily:FONTS.accent, fontSize:10, color:"rgba(255,255,255,0.2)", textAlign:"center", padding:"0 12px", lineHeight:1.4 }}>
              要ダウンロード
            </div>
            <a href={cand.pageUrl} target="_blank" rel="noopener"
              onClick={e => e.stopPropagation()}
              style={{ fontFamily:FONTS.body, fontSize:10, color:themeCol, textDecoration:"underline" }}>
              Shutterstock →
            </a>
          </div>
        )}
        {assignedTo !== null && (
          <div style={{
            position:"absolute", top:6, right:6,
            background: themeCol, color:"#090c0e",
            fontFamily:FONTS.accent, fontSize:10, fontWeight:700,
            letterSpacing:"0.1em", padding:"2px 8px",
          }}>
            {["EXECUTE","BRIDGE","ACCELERATE"][assignedTo]}
          </div>
        )}
      </div>
      <div style={{ padding:"8px 10px 10px" }}>
        <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:3 }}>
          <span style={{ fontFamily:FONTS.accent, fontSize:10, color:themeCol, letterSpacing:"0.15em" }}>{cand.id}</span>
        </div>
        <div style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.85)", fontWeight:600, marginBottom:3, lineHeight:1.4 }}>{cand.label}</div>
        <div style={{ fontFamily:FONTS.body, fontSize:10, color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{cand.note}</div>
        <a href={cand.pageUrl} target="_blank" rel="noopener"
          onClick={e => e.stopPropagation()}
          style={{ display:"inline-block", marginTop:6, fontFamily:FONTS.body, fontSize:10, color:themeCol, textDecoration:"none", borderBottom:`1px solid ${themeCol}40` }}>
          SS #{cand.ssId} →
        </a>
      </div>
    </div>
  );
}

// 確定済み: E04 = col0, B07 = col1
const CONFIRMED = { 0: "E04", 1: "B07" };

// ─── メイン ──────────────────────────────────────────────────────
export default function WhatWeDoImageCompare() {
  // selected[col] = candidate id | null（col0/1は確定固定、col2のみ選択可）
  const [selectedA, setSelectedA] = useState(null); // ACCELERATE選択

  const selected = [CONFIRMED[0], CONFIRMED[1], selectedA];

  function handleThumbClick(cand) {
    if (cand.col !== 2) return; // E/Bは変更不可
    setSelectedA(prev => prev === cand.id ? null : cand.id);
  }

  const accelCands = CANDIDATES.filter(c => c.theme === "ACCELERATE");

  return (
    <div style={{ minHeight:"100vh", background:DARK, color:"white", fontFamily:FONTS.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Noto+Serif+JP:wght@700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#111; }
        ::-webkit-scrollbar-thumb { background:#333; }
      `}</style>

      {/* ヘッダー */}
      <div style={{ padding:"28px 40px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontFamily:FONTS.accent, fontSize:20, fontWeight:900 }}>What We Do — ACCELERATE 画像選定</div>
          <div style={{ fontFamily:FONTS.body, fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:4 }}>
            01 EXECUTE: <span style={{color:G}}>E04確定</span> ／ 02 BRIDGE: <span style={{color:"#7ab3cc"}}>B07確定</span> ／ 03 ACCELERATE: ロボットアーム系20候補 — クリックで選択
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:FONTS.accent, fontSize:13, color: selectedA ? G : "rgba(255,255,255,0.4)" }}>
            {selectedA ? "✓ 選択済み" : "03 未選択"}
          </div>
          <div style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:2 }}>
            Shutterstock 月10枚枠
          </div>
        </div>
      </div>

      {/* ライブプレビュー */}
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ padding:"12px 40px 8px", display:"flex", gap:16, alignItems:"center" }}>
          <span style={{ fontFamily:FONTS.accent, fontSize:11, fontWeight:700, letterSpacing:"0.2em", color:G }}>LIVE PREVIEW</span>
          <span style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.35)" }}>ホバーで H02 モーション確認 — E04/B07確定、03はクリックで反映</span>
        </div>
        <LivePreview selected={selected} />
      </div>

      {/* 選択状況バー */}
      <div style={{ padding:"12px 40px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        {[
          { num:"01", en:"EXECUTE", fixed:true, id:"E04", label:"プレゼンに集中する深夜チーム", col: THEME_COLOR.EXECUTE },
          { num:"02", en:"BRIDGE",  fixed:true, id:"B07", label:"木製テーブルに顕微鏡とガラス器具", col: THEME_COLOR.BRIDGE },
          { num:"03", en:"ACCELERATE", fixed:false, id: selectedA, label: selectedA ? CANDIDATES.find(c=>c.id===selectedA)?.label : null, col: THEME_COLOR.ACCELERATE },
        ].map(p => (
          <div key={p.en} style={{ padding:"10px 16px", background:"rgba(255,255,255,0.03)", border:`1px solid ${p.id ? p.col : "rgba(255,255,255,0.06)"}` }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
              <span style={{ fontFamily:FONTS.accent, fontSize:10, color:p.col, letterSpacing:"0.2em" }}>{p.num} {p.en}</span>
              {p.fixed && <span style={{ fontFamily:FONTS.body, fontSize:9, color:"rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.06)", padding:"1px 6px" }}>確定</span>}
            </div>
            <div style={{ fontFamily:FONTS.body, fontSize:12, color: p.id ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)" }}>
              {p.id ? `${p.id}: ${p.label}` : "未選択"}
            </div>
          </div>
        ))}
      </div>

      {/* ACCELERATE 候補一覧（20枚・4列） */}
      <div style={{ padding:"28px 40px 40px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <div style={{ fontFamily:FONTS.accent, fontSize:11, fontWeight:700, letterSpacing:"0.2em", color:THEME_COLOR.ACCELERATE }}>
            03 ACCELERATE — ロボットアーム系（顔なし）
          </div>
          <div style={{ height:1, flex:1, background:"rgba(255,255,255,0.06)" }} />
          <div style={{ fontFamily:FONTS.body, fontSize:11, color:"rgba(255,255,255,0.3)" }}>
            {accelCands.length}候補 — クリックでライブプレビューに反映
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16 }}>
          {accelCands.map(cand => (
            <ThumbCard
              key={cand.id}
              cand={cand}
              isSelected={selectedA === cand.id}
              assignedTo={selectedA === cand.id ? 2 : null}
              onClick={() => handleThumbClick(cand)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
