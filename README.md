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
│   │   └── script.js       # Interactivity and GitHub API
│   └── images/
│       └── profile.jpg     # Profile photo
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
2. Replace `assets/images/profile.jpg` with your photo.
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
