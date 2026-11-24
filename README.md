# 🩺 DocuScope Pakistan: Grounded Scope AI & Instant Booking Engine

> **Turn Clinic Practice Documents (PDFs) into Instant, Grounded Answers & Direct Appointments.**  
> Eliminating 24-hour WhatsApp messaging delays for prospective patients and clinics in Pakistan.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24.11)
- **npm**: v9+ (tested on v11.6)

### 2. Local Setup
```bash
# Clone or navigate to the project directory
cd /Users/mac/.gemini/antigravity/scratch/docscope

# Install dependencies (if not already installed)
npm install

# Run Vite development server
npm run dev
# OR build and run preview server
npm run build
npx vite preview --port 5173 --host
```

Access the app in your browser at: **`http://localhost:5173`**

---

## 🎯 The Core Problem & Solution (Hamza's Scenario)

* **The Problem**: Hamza suffered a dental collision during a football match in DHA Lahore. Needing braces to realign his teeth, he found a clinic via Google Search that only provided a WhatsApp number. He sent a basic inquiry asking about braces packages, sports trauma treatments, and pricing—and waited **over 24 hours** for a response.
* **The DocuScope Fix**: Clinics upload their official clinical scope handbook and PKR pricing tariff (PDFs). DocuScope vectorizes the content, establishes explicit **"What We Do"** vs. **"What We Don't Do"** boundaries, and answers queries in **1.2 seconds** with page citations and 1-click chair booking.

---

## 🖥️ 4 Core App Perspectives

1. **Hamza's Patient View (`/`)**:
   - Football trauma spotlight banner with 1-click test query.
   - Grounded AI Scope Assistant with Pakistan quick prompts (PKR tariffs, 0% bank installments, Sehat Card exclusions).
   - Two-column Scope Matrix (6 In-Scope vs 4 Out-of-Scope rules).
   - Transparent Braces Packages (Rs. 9,500/mo to Rs. 16,500/mo) with payment partners (Bank Alfalah, Meezan Bank, Raast, SadaPay, Nayapay).
   - Direct DHA Phase 5 chair booking engine with instant digital pass (`LHR-HAMZA`) and `.ics` calendar sync.

2. **WhatsApp Bot Simulator**:
   - Realistic mobile phone mockup showing authentic WhatsApp interface.
   - Bilingually responds in Roman Urdu and English with verified clinical citations and interactive action cards.

3. **Clinic Owner Hub**:
   - **Integrations & Website Embed**: 1-line script `<script src="https://cdn.docscope.pk/v2/embed.js" ...>` to replace outdated "Contact Us" forms.
   - **WhatsApp Business Cloud API**: Meta webhook setup with 1.5s auto-replies and receptionist fallback.
   - **Hosted Clinic Portal**: `docscope.pk/apex-dental-lahore` and printable reception desk QR stand.
   - **PDF Scope Ingestion**: Drag-and-drop clinic handbook parser.
   - **Scope Rules Manager**: Granular editing of DOs and DONTs with confidence scores.
   - **Conversion Analytics**: 1.2s response time vs 24.5h WhatsApp lag, 43.8% conversion rate.

4. **Split Dual View**:
   - Side-by-side presentation mode comparing the patient chat against the clinic's ground-truth PDF rules.

---

## 🚢 Deployment Guide

### Option A: Deploy to Vercel (Recommended - Fastest)
Vercel has zero-config support for Vite + React projects.

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
2. **Deploy**:
   ```bash
   cd /Users/mac/.gemini/antigravity/scratch/docscope
   vercel
   ```
   Follow the prompts:
   - Set project name (e.g., `docscope-pakistan`)
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Production URL**:
   ```bash
   vercel --prod
   ```

### Option B: Deploy to Netlify
1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```
2. **Deploy**:
   ```bash
   netlify deploy --build --prod
   ```
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option C: Push to GitHub & Auto-Deploy
1. **Create GitHub Repository**:
   Create a new empty repository on [GitHub](https://github.com/new) (e.g. `docscope`).
2. **Push Code**:
   ```bash
   cd /Users/mac/.gemini/antigravity/scratch/docscope
   git init
   git add .
   git commit -m "feat: complete DocuScope Pakistan app with WhatsApp simulator and embed hub"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
   git push -u origin main
   ```
3. Connect your GitHub repo to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for automatic CI/CD deployment on every push!

---

## 🛠️ Tech Stack

- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Typography**: Plus Jakarta Sans & JetBrains Mono
