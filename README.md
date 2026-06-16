# Rajveer Singh Chouhan — Portfolio

Personal portfolio site hosted on [GitHub Pages](https://rajveersinghchouhan68.github.io/).

## Project structure

```
rajveersinghchouhan.github.io/
├── index.html              # Site entry point (required at root for GitHub Pages)
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles
│   ├── js/
│   │   ├── config.js       # Profile links, image path, certifications
│   │   ├── hero-portrait.js # Hero portrait parallax & portal particles
│   │   └── script.js       # Interactivity
│   └── images/
│       ├── profile.png              # Original profile photo
│       └── profile-transparent.png  # Hero portrait (transparent)
└── scripts/
    └── deploy.ps1          # Commit and push helper
```

## Local preview

Open `index.html` in a browser, or run a local server:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Update content

1. Edit `assets/js/config.js` for email, social links, and profile image.
2. Replace `assets/images/profile-transparent.png` (and `profile.png` if updating the source photo).
3. Edit `index.html` for sections, experience, and projects.

## Deploy

```powershell
git add .
git commit -m "Update portfolio"
git push origin main
```

Or use the helper script:

```powershell
.\scripts\deploy.ps1
```

Live site: **https://rajveersinghchouhan68.github.io/**
