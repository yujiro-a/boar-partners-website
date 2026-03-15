# BOAR Partners — Design Deep Scan Report
**作成日**: 2026-03-16
**対象**: `src/components/App.jsx` 全セクション
**観点**: 一流エージェンシー基準での洗練度・整合性・高度化余地

---

## 総評

現状レベル: **B+（プロトタイプ品質）→ A- を狙える素地あり**

Hero Sticky Scroll・斜め区切り・カラーグラデーションと、意図と構造は明確。
ただし「細部の不整合」「アニメーションの粗さ」「インタラクション密度の低さ」が積み重なり、
プロダクションクオリティに届いていない。以下、7軸で診断する。

---

## Axis 1 — タイポグラフィシステム

### 問題
| 箇所 | 問題 |
|------|------|
| Hero right block heading | `fontWeight: 200` + Hiragino W6 — W6はCSS weight 200に反応しない。実質W6で表示されている（指定ミス） |
| BOAR acronymアイテム | Big Shoulders `letterSpacing: 0.06em` — ラテン書体は0.02em以下か、0.12em以上のどちらかが映える。中途半端 |
| About title "実行する者が / 伴走する" | 2行に割れているがリズムが弱い。動詞で終わるタイトルは推進力が落ちる |
| Contact section | SectionLabel「Contact」+ TextReveal「Contact」の完全重複。ラベルが意味を失っている |
| lineHeight | 1.15（reveal）/ 1.35（card title）/ 1.4（heading）/ 1.9（body）— 設計値が不統一 |

### 改善案
```
lineHeight スケール統一:
  display: 1.05–1.15（Big Shoulders見出し）
  heading:  1.25–1.35（日本語大見出し）
  body:     1.85–1.9（日本語本文）
  caption:  1.6（小テキスト）

Hero right block: fontWeight 200 → 削除（Hiragino W3フォントで代替 or FONTS.body使用）
Contact TextReveal: "Contact" → "お問い合わせ" or セクションタイトルを別に設計
```

---

## Axis 2 — カラーシステムの整合性

### 問題
```
定義済みカラー: G100-G500 / N100-N500
実際の使用:
  "#0d1a14"  → G100に近いが別値（Services L.text等）
  "#0a1a12"  → Hero背景、システム外
  "#4a8060"  → Forward Buyoutのカード色、システム外
  "#2d5a40"  → G200と一致しているが、直接値で書かれている箇所あり
```

カラーシステムを定義しながら半数がインライン値で書かれている。
**一箇所変更した瞬間に全体が崩れるリスク**を抱えている。

### 改善案
```js
const COLORS = {
  // 既存
  G100: "#152f26", G200: "#2d5a40", G300: "#6aaa88", G400: "#b0d4c0", G500: "#e0eeea",
  N100: "#090c0e", N200: "#47494a", N300: "#848686", N400: "#c2c2c3", N500: "#ffffff",
  // 追加すべき
  G050: "#0d1a14",   // Services/About背景・テキスト
  G150: "#0a1a12",   // Hero背景ミックス
  G250: "#4a8060",   // Forward Buyout accent
};
```

---

## Axis 3 — セクション別診断

### Hero
**強み**: Sticky scroll + spring慣性 + ブロック切替は世界水準の演出
**弱み**:
- TypewriterText の95文字が終わるまで約8.5秒。ファーストビューでユーザーを8秒待たせている
- カーソルブリンク `|` がずっと残る設計になっていない（doneフラグはあるが非表示処理なし）
- パーティクル4点（`particleRise`）はほぼ不可視（opacity 0.5 × height clamp = 事実上0）

**提案**:
- Typewriter を2秒でアニメーション完了する設定に縮速（delay per char: 90ms → 25ms）、または最初から全文表示してフェードインで代替
- Hero 左カラム下部の `Strategy & Execution Consulting` — 現状 `opacity: labelOp`（スクロール後に出現）。ページ読込時点で見えないのに、スクロール前にそこに誰も気づかない

### Philosophy
**強み**: ゴーストBOARの背景テキストは品がある。BOAR acronymグリッドは力強い
**弱み**:
- サブコピー3行のリズムが `言い切り / 体言止め / 言い切り` で混在。統一の余地
- `Our Business Stance` ラベルが `SectionLabel` コンポーネントを使わず独自実装されている（スタイル不一致の温床）

### What We Do
**強み**: 3カードのアニメーション入場は気持ちいい
**弱み**:
- `gap: 0` + `borderRight` のデザイン — グリッドが折れた瞬間（タブレット幅）にborderRightが消えて間抜けに見える
- `borderTop: 2px solid G300` のトップラインがカード間で連続しない（gapが0なのに境界が見える）

**提案**:
```js
// gap:0 → gap:1, borderRight削除 → background: "rgba(255,255,255,0.06)" を仕切りとして使う
```

### Services
**強み**: 明るいミントグリーン背景への転換は気持ちのいい章転換
**弱み**:
- `Value Forward` バナーの **背景色 `L.accent` (#2d5a40)** と **カードの borderTop `s.color`（#2d5a40/#4a8060）** が被りすぎ。Value Forward → Forward R&D の視線の流れが詰まる
- カードが `background: rgba(9,12,14,0.05)` = ほぼ透明。ミントグリーン背景に溶けてしまい、カード感が出ない
- `GridOverlay` がない（他の暗セクションにはある → 意図的なら良いが、Light sectionには不要なので正しい判断。ただしTexture感がゼロになっている）

**提案**: カードに `background: rgba(255,255,255,0.55)` を与えてglasscard化。コントラスト改善かつモダン

### About (TOP)
- **About関数は定義されているが App() から呼ばれていない（デッドコード）**。削除推奨

### Contact
- フォームに `onSubmit` ハンドラーなし。現状送信ボタンを押しても何も起きない
- エラー状態・送信中状態・完了状態のいずれも未実装
- フィールドlabelに `for` / `htmlFor` 属性なし（アクセシビリティ違反）

### Footer
- `background: linear-gradient(180deg,#f0f4f2 0%,#090c0e 40%)` — 40%で急激に暗転。上がほぼ白で下が真っ黒という最も視覚的に重い組み合わせ。ロゴ・ナビが見えない
- フッターナビのリンク色 `rgba(255,255,255,0.35)` — グラデーションの上端（白背景）では完全に不可視
- コピーライト・ナビ以外の情報がゼロ（メールアドレス、SNS、住所）

---

## Axis 4 — インタラクション品質

### 現状の hover 実装
```js
// ほぼ全てこのパターン
onMouseEnter={(e) => e.target.style.color = COLORS.N500}
onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.75)"}
```
- インラインstyle直接操作 → Reactのstate管理と競合するアンチパターン
- `transition: "color 0.3s"` はあるが、borderや backgroundのtransitionが定義されていない箇所がある

### 欠落しているインタラクション
| 要素 | 現状 | 一流エージェンシー標準 |
|------|------|----------------------|
| カスタムカーソル | なし | ブランドカラー dot + テキスト変化 |
| リンクのアンダーライン演出 | 静的 border-bottom | slide-in underline（幅0→100%） |
| ナビゲーションのアクティブ表示 | なし | スクロール位置に応じた current セクションのハイライト |
| ページ遷移（/services, /about） | ブラウザデフォルト | フェードアウト → フェードイン |
| ボタンのプレスフィードバック | なし | scale(0.97) on click |
| フォームfocus | outline:none のみ | borderColor変化 + subtle glow |

---

## Axis 5 — アニメーションの整合性

### 3種類のアニメーションパターンが混在
```
① TextReveal（y:105% マスクリビール）→ 見出し用
② FadeIn コンポーネント（y:36 + opacity）→ ボディ・サブ要素用
③ inline whileInView（各自異なる設定）→ カード・リスト用
```

③が各セクションでバラバラ（delayや距離が場所によって違う）。
結果として「なんかアニメしてる」レベルで止まっており、一体感がない。

### 具体的なズレ
| 箇所 | delay | y | 問題 |
|------|-------|---|------|
| BOARアイテム | `i * 0.08` | x: -40 | 左からスライド（他はy方向）|
| Servicesカード | `i * 0.12` | y: 30 | - |
| Aboutメンバーカード | `i * 0.15` | y: 40 | scale: 0.97 追加 |
| WhatWeDoカード | `i * 0.1` | y: 40 | scale: 0.97 追加 |

**統一提案**:
```js
// 標準エントランス (全カード共通)
const cardEntrance = (i) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, margin: "-20px" },
});
// 例外: BOARアイテムのx方向スライドは特徴的なので残す
```

---

## Axis 6 — 構造的問題（バグ・デッドコード）

| 種別 | 箇所 | 内容 |
|------|------|------|
| デッドコード | `About()` function (l.788) | 定義あり・呼び出しなし。削除推奨 |
| リンク切れ | WhatWeAre `href="#about"` | About をTOPから削除したがリンクが残存。ContactかPhilosophyに変更 |
| 未実装 | Contact `<button>送信する</button>` | onSubmitなし。押しても何も起きない |
| スタイル重複 | Services/About の SectionLabel | `SectionLabel` コンポーネントを使わず同一スタイルをインラインで再定義 |
| コントラスト不足 | Footer navリンク | `rgba(255,255,255,0.35)` on white background → 不可視 |
| font weight指定誤り | Hero right block | `fontWeight: 200` with Hiragino W6 → 実際にはW6で表示 |

---

## Axis 7 — 優先度別改善ロードマップ

### Priority 1 — 即対応（バグ・不整合）

1. **Footer グラデーション修正**: `40%` → `60%` に変更。ナビが見えるように
2. **WhatWeAre → Contact リンク修正**: `href="#about"` → `href="#contact"`
3. **デッドコード About 削除**（l.788–865）
4. **TypewriterText 高速化**: `90ms` → `28ms` per char（3秒以内に完了）
5. **カラーシステム補完**: `G050`, `G150`, `G250` 追加、インライン値を置換

### Priority 2 — 品質向上（1–2日）

6. **WhatWeDo カード境界**: `gap:0 + borderRight` → `gap:1px + background color仕切り`
7. **Services カードのglasscard化**: `background: rgba(255,255,255,0.55)` + `backdropFilter: blur(8px)`
8. **アニメーション統一**: `cardEntrance(i)` utility関数導入
9. **Contact フォーム実装**: Netlify Forms or emailjs で実送信
10. **hover → state管理に移行**: `onMouseEnter` inline style → `useState` + Reactスタイル管理

### Priority 3 — 体験向上（3–5日）

11. **カスタムカーソル**: 小さな円 + ホバー時に拡大・ラベル表示（`cursor: none` + absolute追尾）
12. **ナビアクティブ状態**: `IntersectionObserver` で現在セクションをハイライト
13. **リンクアンダーライン演出**: `::after` scaleX(0→1) on hover（CSS）
14. **ページ遷移**: `/services`, `/about` に Astro View Transitions 適用
15. **スムーススクロール**: `html { scroll-behavior: smooth; }`（CSS1行）

### Priority 4 — プレミアム化（任意）

16. **スクロール連動ノイズテクスチャ**: SVG feTurbulence を opacity 0.02でオーバーレイ
17. **ナンバリングの統一**: `01` フォーマットを全セクションで統一
18. **Philosophy → WhatWeDo の接続**: `"非連続な成長"` は Philosophy の `"限界を突破する"` の続きとして読めるが、視覚的な橋渡しがない（セクションラベル以外の導線）
19. **微細なパララックス**: Hero背景グリッドの `gridDrift` 以外に、各セクションのtextも `useScroll` で微小なy移動を加える

---

## まとめ — 最も印象変化が大きい3点

| # | 施策 | 工数 | インパクト |
|---|------|------|-----------|
| 1 | **Typewriterを3秒以内に短縮** | 10分 | ファーストビューの「待たされ感」がなくなる |
| 2 | **Servicesカードをglasscard化** | 30分 | 明セクションのカードが浮かび上がり一気にリッチに |
| 3 | **Footerグラデーション修正 + メール追記** | 20分 | 現状フッターが最も品質が低い。逆算でここを上げるだけで全体の締まりが出る |
