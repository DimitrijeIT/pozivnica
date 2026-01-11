# Wedding Invitation Website

A beautiful, minimal wedding invitation website for Јелена & Димитрије with an interactive envelope opening animation.

## Features

- Interactive envelope opening animation
- Smooth scroll-like transition to invitation
- Multiple elegant serif fonts with Cyrillic support
- Google Calendar integration
- Google Maps location link
- Fully responsive design
- Clean, minimal aesthetic

## Live Demo

Visit: `https://DimitrijeIT.github.io/pozivnica/`

---

## Deployment to GitHub Pages

### Option 1: Deploy from GitHub Settings (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** (tab at the top)
   - Scroll down to **Pages** (in the left sidebar)
   - Under **Source**, select **Deploy from a branch**
   - Under **Branch**, select `main` and `/ (root)`
   - Click **Save**

3. **Wait for deployment**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - Your site will be available at: `https://DimitrijeIT.github.io/pozivnica/`

### Option 2: Deploy using GitHub CLI

1. **Install GitHub CLI** (if not installed)
   ```bash
   brew install gh
   ```

2. **Authenticate with GitHub**
   ```bash
   gh auth login
   ```

3. **Push to existing repository**
   ```bash
   git push origin main
   ```

4. **Enable GitHub Pages**
   ```bash
   gh api repos/DimitrijeIT/pozivnica/pages -X POST -f source.branch=main -f source.path=/
   ```

---

## Customization

### Change Names
Edit `index.html` and update the names in these locations:
- `<title>` tag
- `.letter-script` span
- `.bride-name` and `.groom-name` h1 tags
- `.footer-signature` paragraph
- `.seal-initials` span

### Change Date & Time
Edit `index.html`:
- Update the date in `.letter-date` span
- Update `.date-day`, `.date-month`, `.date-year` spans
- Update `.section-time` paragraph
- Update the Google Calendar link URL

### Change Venue
Edit `index.html`:
- Update `.venue-name` h2 tag
- Update `.venue-address` paragraph
- Update the Google Maps link URL

### Change Font
Click the "T" icon in the top-right corner to choose from 6 elegant fonts:
- Cormorant Infant
- Cormorant Garamond
- Playfair Display
- Lora
- Spectral
- EB Garamond

---

## Project Structure

```
pozivnica/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript functionality
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## Direct Link to Invitation

To skip the envelope animation and go directly to the invitation, add `#invitation` to the URL:

```
https://DimitrijeIT.github.io/pozivnica/#invitation
```

---

## License

This project is for personal use.
