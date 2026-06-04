# Distant Code: Enron Emails Corpus Browser

A DH-friendly interface for exploring the Elizabeth & Kenneth Lay email correspondence subset from the Enron Emails Corpus.

## Overview

**Distant Code** is a digital humanities project designed to make the Enron email corpus accessible to researchers and curious enthusiasts interested in corporate history and white-collar crime. This iteration focuses on personal correspondence between Elizabeth Lay and her father, Kenneth Lay (former CEO of Enron), during the critical years 1999-2002.

### Data Subset

- **Subject**: Email correspondence between Elizabeth Lay and Kenneth Lay
- **Time Period**: 1999-2002
- **Key Figures**: Elizabeth Lay, Kenneth Lay (CEO), Rosie Flemming (assistant)
- **Data Format**: JSON
- **Fields**: Message-ID, Date, From, To, Subject, Body, K.Lay Folder Status

### Design Philosophy

The interface combines:
- **90s Aesthetic**: A nostalgic web design that evokes the era when Enron was at its peak
- **Enron Corporate Branding**: Corporate colors (red, blue) mixed with neon 90s elements
- **Accessibility**: DH-focused filtering and search capabilities for researchers

## Features

✅ **Full-Text Search** - Search across subject, sender, body, and recipient fields  
✅ **Advanced Filtering** - Filter by sender, recipient, date range, and inbox status  
✅ **Email Viewer** - Read full email bodies in a modal interface  
✅ **Data Export** - Export filtered results as JSON for further analysis  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Static Site** - No backend required, perfect for GitHub Pages

## Project Structure

```
distant-code-enron/
├── index.html          # Main HTML file
├── styles.css          # 90s retro Enron aesthetic
├── app.js              # Filter and search logic
├── data.json           # Email corpus subset
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## How to Use Locally

1. **Clone or Download** this repository
2. **Open** `index.html` in a web browser (or use a local server)
3. **Search and Filter** emails using the interface
4. **View** individual emails by clicking the "VIEW" button
5. **Export** filtered results using the "EXPORT JSON" button

### Using a Local Server

For development, use a local HTTP server:

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (http-server):**
```bash
npx http-server
```

Then visit `http://localhost:8000` (or the port shown in your terminal).

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it (e.g., `distant-code-enron`)
3. Initialize with README or clone the repo locally

### Step 2: Add Project Files

Copy all files from the `distant-code-enron` folder to your GitHub repository:
- `index.html`
- `styles.css`
- `app.js`
- `data.json`
- `README.md`

### Step 3: Enable GitHub Pages

1. Go to your repository **Settings**
2. Scroll to **Pages** section
3. Set **Source** to `main` branch (or your default branch)
4. Set **Folder** to `/ (root)`
5. Click **Save**

### Step 4: Access Your Site

Your site will be available at:
```
https://yourusername.github.io/distant-code-enron/
```

(Replace `yourusername` with your GitHub username and adjust the repo name if different)

## Customization

### Change Colors

Edit `styles.css` to modify the color scheme:
- `#d4254e` - Primary red (Enron-inspired)
- `#1a1a2e` - Dark blue (corporate)
- `#ffff00` - Bright yellow (90s accent)
- `#00ffff` - Cyan (90s neon)

### Add More Emails

1. Add new email objects to `data.json` following the same format
2. Refresh the page to see updates
3. Filters will automatically populate with new senders/recipients

### Modify the Interface

- Edit `index.html` to change layout or labels
- Edit `app.js` to change filter logic or data handling
- Edit `styles.css` for visual adjustments

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Layout and 90s aesthetic
- **Vanilla JavaScript** - No dependencies required
- **JSON** - Data format
- **GitHub Pages** - Free static hosting

## Data Privacy & Attribution

This project uses the **Enron Email Corpus**, a publicly available dataset compiled from FERC (Federal Energy Regulatory Commission) documents.

- Original Source: [FERC Database](https://www.ferc.gov/)
- Public Dataset: [Kaggle - Enron Email Dataset](https://www.kaggle.com/datasets/wcukierski/enron-email-dataset)
- **Fair Use**: This is for research, education, and public interest purposes

## For Digital Humanities Researchers

### Suggested Research Angles

- **Family Dynamics**: How did personal correspondence change as Enron's problems emerged?
- **Corporate Culture**: What do personal emails reveal about company leadership?
- **Temporal Analysis**: Track date patterns and communication frequency
- **Network Analysis**: Map relationships between Elizabeth, Kenneth, and Rosie
- **Crisis Communication**: Study how family communicated during corporate crisis

### Export Data for Analysis

Use the **EXPORT JSON** button to download filtered results for use in:
- Natural Language Processing tools
- Text analysis software (AntConc, Voyant)
- Network analysis tools (Gephi, Cytoscape)
- Statistical analysis (Python, R)

## Troubleshooting

**Problem**: `data.json` not loading
- **Solution**: Ensure `data.json` is in the same directory as `index.html`

**Problem**: Styles look different on GitHub Pages
- **Solution**: Check that all file paths are relative (no absolute paths)

**Problem**: Filtering not working
- **Solution**: Open browser console (F12) to check for JavaScript errors

## License

This project is created for educational and research purposes as part of a Digital Humanities capstone.

The **Enron Email Corpus** is publicly available for research and educational use under Fair Use principles.

## Questions or Feedback?

This is a capstone project. For improvements or questions, refer to the project documentation or reach out to the project creator.

---

**Created**: June 2026  
**Project**: Digital Humanities Capstone  
**Focus**: Corporate Archives & White-Collar Crime Studies
