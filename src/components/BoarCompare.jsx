const FONTS = {
  display: "'Hiragino Sans W6', 'Hiragino Kaku Gothic ProN', sans-serif",
  accent:  "'Big Shoulders Display', sans-serif",
  body:    "'Hiragino Sans W3', 'Hiragino Kaku Gothic ProN', sans-serif",
};
const G300 = "#6aaa88";

const boarItems = [
  { letter: "B", rest: "uild the Business",  ja: "事業を構築する" },
  { letter: "O", rest: "pen Opportunities",  ja: "機会を開く" },
  { letter: "A", rest: "ccelerate Growth",   ja: "成長を加速する" },
  { letter: "R", rest: "ealize Value",       ja: "価値を実現する" },
];

const patterns = [
  { id: "A", label: "A — 現状ベース + 間隔+",    jaSize: "clamp(12px,1.2vw,16px)", letterSpacing: "0.08em", padding: "10px 0" },
  { id: "B", label: "B — 日本語 中",             jaSize: "clamp(14px,1.5vw,20px)", letterSpacing: "0.08em", padding: "10px 0" },
  { id: "C", label: "C — 日本語 大",             jaSize: "clamp(16px,1.8vw,24px)", letterSpacing: "0.08em", padding: "10px 0" },
  { id: "D", label: "D — 日本語 大 + 間隔++",    jaSize: "clamp(16px,1.8vw,24px)", letterSpacing: "0.12em", padding: "14px 0" },
  { id: "E", label: "E — 日本語 特大 + 間隔++",  jaSize: "clamp(18px,2vw,28px)",   letterSpacing: "0.12em", padding: "14px 0" },
];

export default function BoarCompare() {
  return (
    <div style={{ padding: "60px 8vw" }}>
      {patterns.map((p) => (
        <div key={p.id} style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: FONTS.accent, fontSize: 13, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>
            Pattern {p.label}
          </div>
          <div style={{ maxWidth: 1080 }}>
            {boarItems.map((item) => (
              <div key={item.letter} style={{
                display: "grid", gridTemplateColumns: "1fr clamp(160px,22vw,300px)",
                alignItems: "baseline", gap: "4vw",
                borderBottom: "1px solid rgba(255,255,255,0.07)", padding: p.padding,
              }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span style={{ fontFamily: FONTS.accent, fontWeight: 900,
                    fontSize: "clamp(32px,5.5vw,72px)", color: G300,
                    lineHeight: 1, minWidth: "1.1ch", letterSpacing: "-0.02em" }}>
                    {item.letter}
                  </span>
                  <span style={{ fontFamily: FONTS.accent, fontWeight: 700,
                    fontSize: "clamp(20px,3.2vw,44px)", color: "rgba(255,255,255,0.85)",
                    lineHeight: 1, letterSpacing: p.letterSpacing }}>
                    {item.rest}
                  </span>
                </div>
                <span style={{ fontFamily: FONTS.body, fontSize: p.jaSize,
                  color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
                  {item.ja}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
