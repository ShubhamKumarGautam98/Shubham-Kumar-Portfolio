# Shubham Kumar — Portfolio Setup Guide

## Quick Start

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

---

## ⚠️ Things You Must Do Before It Looks Right

### 1. Replace Your Photo
Go to `public/` folder and replace these two files with YOUR photos:
- `mehdi photo professionel.png` → rename your professional photo to this exact name
- `mehdi photo professionel2.png` → rename a second photo to this exact name

### 2. Add Project Screenshots
Go to `public/projects/` and add these images (screenshot your actual projects):
- `emprio.jpg` → Screenshot of emprio.in
- `hr-platform.jpg` → Screenshot of your Streamlit HR dashboard
- `chatbot.jpg` → Screenshot of your North Star chatbot
- `n8n.jpg` → Screenshot of an n8n workflow canvas

### 3. Update Contact Email
In `src/components/sections/Contact.js`, find the email address and replace with: shubhamkmmmr@gmail.com

### 4. Update Social Links
In `src/components/sections/Hero.js` and `src/components/sections/Footer.js`:
- GitHub: https://github.com/ShubhamKumarGautam98
- LinkedIn: https://linkedin.com/in/shubham-kumar-395b89386

### 5. Add Your Resume PDF
Replace `public/resume.pdf` (if it exists) or add your resume PDF named `resume.pdf`

### 6. Remove Arabic/French Languages (optional)
The portfolio has EN/FR/AR options. To keep only English:
- Open `src/context/LanguageContext.js`
- Remove fr and ar from the languages array

---

## Tech Stack
- Next.js 14 (App Router)
- Styled Components
- GSAP + ScrollTrigger
- Framer Motion
- React Icons
- Space Grotesk + Inter fonts

## Deploy to Vercel (Free)
1. Push to GitHub
2. Go to vercel.com → Import repo
3. Deploy — no config needed, Next.js auto-detected
