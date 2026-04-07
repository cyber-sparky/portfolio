# cybersparky_ — Security Engineer Portfolio

Dark-themed, terminal-aesthetic portfolio for a security engineer / bug bounty hunter. Built with Next.js 14, Tailwind CSS, Framer Motion, and TypeScript.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing Content

All placeholder content is marked with `TODO` comments. Key files to edit:

| File | What to change |
|---|---|
| `app/components/Hero.tsx` | Name (glitch text), resume link, HackerOne URL |
| `app/components/About.tsx` | Bio text, stat numbers |
| `app/components/Contact.tsx` | Social media links, email |
| `app/data/skills.ts` | Tools and certifications |
| `app/data/projects.ts` | Your projects, GitHub URLs |
| `app/data/findings.ts` | Bug bounty findings, blog posts |
| `app/layout.tsx` | SEO metadata, page title |

To find all placeholders:

```bash
grep -rn "TODO" app/
```

## Adding Your Resume

Place your resume PDF at `public/resume.pdf`.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Deploy — no configuration needed

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Build for Production

```bash
npm run build
```

Static output is generated in the `out/` directory (configured for `next export`).

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + CSS animations
- **Icons**: react-icons (Feather)
- **Fonts**: JetBrains Mono (terminal) + Outfit (body)
- **Language**: TypeScript

## Project Structure

```
app/
├── components/
│   ├── Navbar.tsx        # Sticky nav with blur backdrop
│   ├── Hero.tsx          # Terminal animation + glitch text
│   ├── About.tsx         # Bio + count-up stats
│   ├── Skills.tsx        # Interactive skill grid
│   ├── Projects.tsx      # Terminal-style project cards
│   ├── HallOfFame.tsx    # Bug bounty timeline
│   ├── Blog.tsx          # Writeup cards
│   ├── Contact.tsx       # Social links + footer
│   └── MatrixRain.tsx    # Canvas matrix rain background
├── data/
│   ├── skills.ts         # Skills & tools data
│   ├── projects.ts       # Project entries
│   └── findings.ts       # Bug bounty findings + blog posts
├── globals.css           # Global styles + glitch animations
├── layout.tsx            # Root layout + fonts + metadata
└── page.tsx              # Main page assembling all sections
```
