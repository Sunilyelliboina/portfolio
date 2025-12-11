# Yelliboina Sunil - Portfolio Website

## How to Add Your Own Resume PDF

### Step 1: Prepare Your Resume
1. Create or update your resume as a PDF file
2. Name it exactly: `resume.pdf`
3. Make sure it's in PDF format (.pdf extension)

### Step 2: Add the File
1. Copy your `resume.pdf` file
2. Paste it into this folder: `C:\Users\SunilYelliboyina\Downloads\Sunil_portfolio\`
3. Make sure the file is named `resume.pdf` (all lowercase)

### Step 3: Test It
1. Open `index.html` in your browser
2. Click the "Download Resume" button
3. Your PDF resume should download automatically

### Alternative: Different File Name
If you want to use a different filename:
1. Place your PDF file in this folder
2. Open `index.html` in a text editor
3. Find line 69: `<a href="resume.pdf" download="Yelliboina_Sunil_Resume.pdf"`
4. Change `resume.pdf` to your filename (e.g., `my-resume.pdf`)
5. Change `Yelliboina_Sunil_Resume.pdf` to what you want the downloaded file to be named

## Files Structure
```
Sunil_portfolio/
├── index.html          (Main portfolio page)
├── styles.css          (All styling)
├── script.js           (Interactive features)
├── resume.html         (HTML version of resume - optional)
└── resume.pdf          (Your PDF resume - ADD THIS FILE)
```

## Deploy to GitHub Pages
Your portfolio is already configured for GitHub Pages. Just:
1. Add your `resume.pdf` file
2. Commit and push to GitHub
3. Your portfolio will be live at: `https://sunilyelliboina.github.io/[repository-name]/`

