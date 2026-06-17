# Rajveer Singh Chouhan — Portfolio

Personal portfolio site hosted on [GitHub Pages](https://rajveersinghchouhan68.github.io/).

## Tech stack

React 19 · TypeScript · Vite 6 · CSS3 · GitHub Actions

## Project structure

```
├── index.html                 # App entry (required by Vite)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── images/                # Favicon + profile photo
├── src/
│   ├── app/                   # Bootstrap + page shell
│   │   ├── main.tsx
│   │   └── App.tsx
│   ├── components/
│   │   ├── layout/            # Nav, Footer
│   │   ├── hero/              # Hero section + portrait
│   │   └── effects/           # Cursor glow, particles
│   ├── sections/              # About, Skills, Experience, etc.
│   ├── lib/                   # Config + shared hooks
│   │   ├── config.ts
│   │   └── hooks.ts
│   └── styles/
│       └── index.css
└── .github/workflows/         # Auto-deploy on push to main
```

## Local development

```powershell
npm install
npm run dev
```

Open **http://localhost:5173**

## Build & deploy

```powershell
npm run build
npm run preview
```

Push to `main` → GitHub Actions deploys automatically.  
Set **Settings → Pages** → source: **GitHub Actions**.

## Update content

1. `src/lib/config.ts` — email, LinkedIn, certifications
2. `public/images/` — profile photo, favicon
3. `src/sections/` — experience, projects, skills

Live site: https://rajveersinghchouhan68.github.io/
