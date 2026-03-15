# BOAR Partners Website - Claude Code Instructions

## Stack
- Framework: Astro
- Styling: Tailwind CSS v4
- Components: React + shadcn/ui
- Hosting: Cloudflare Pages (boarpartners.pages.dev)

## Design Tokens
- Primary Green: #3DA860 (GREEN_ACCENT)
- Dark Green: #1C3A28 (FOREST_GREEN)
- Gray: #7A7A7A (TEXT_SUB)
- Light BG: #EEF4EF (BG_TINTED)
- Border: #D4DDD6 (BORDER)
- Font JP: Noto Sans JP
- Font EN: Inter

## Content Rules
- Never use gold or yellow colors
- Use "常駐ディレクション" not "PMO"
- Mobile-first responsive design
- Always reference latest docs when implementing

## Site Structure
- / : Top page (Hero + Problem + Category + CTA)
- /about : About BOAR Partners
- /service : Services (Green Path + M&A)
- /cases : Case studies
- /team : Team members
- /join : Recruitment + Alliance partners
- /contact : Contact form

## Key Messages
- Tagline JP: 技術の可能性を、産業の未来へ。
- Tagline EN (sub): Deep tech, for industry.
- EN is displayed smaller, as a subtitle under the JP tagline
- Tagline: 技術を事業にする、その全工程に責任を持つ。
- EN: The execution layer between deep tech and enterprise.

## Commands
- npm run dev : Start development server
- npm run build : Build for production
- npm run preview : Preview production build
