# Distant Code: Enron Emails Corpus Browser

A DH-friendly interface for exploring the Elizabeth & Kenneth Lay email correspondence subset from the Enron Emails Corpus.

## Disclaimer 

This is an auto-generated deployment guide created using Claude Haiku 4.5 (via Copilot x VS Code). I cannot guarantee that any words below are my own -- nor am I trying to pass them off as such. I did scan and edit it for any eggregious innacuracies. If you'd like some original AI-free writing, please refer to my research narrative assignment. Thank you!

## Overview

**Distant Code** is a digital humanities project designed to make the Enron email corpus accessible to researchers and white-collar crime enthusiasts. This iteration focuses on personal correspondence between Elizabeth Lay and her father, Kenneth Lay (former CEO of Enron), during 1999-2002 (a rather critical year for the company). 

### Data Subset

- **Subject**: Email correspondence between Elizabeth Lay and Kenneth Lay
- **Time Period**: 1999-2002
- **Key Figures**: Elizabeth Lay (Enron Lawyer), Kenneth Lay (CEO), Rosie Flemming (Executive Assistant)
- **Data Format**: JSON
- **Fields**: Message-ID, Date, From, To, Subject, Body, K.Lay Folder Status

### Design Choices

The interface combines:
- **90s Aesthetic**: A nostalgic web design that evokes the era when Enron was at its peak
- **Enron Corporate Branding**: Corporate colors (red, blue) mixed with 90s elements
- **Accessibility**: DH-focused filtering, UX principles, and search capabilities

## Features

✅ **Full-Text Search** - Search across subject, sender, body, and recipient fields  
✅ **Advanced Filtering** - Filter by sender, recipient, date range, and inbox status  
✅ **Email Viewer** - Read full email bodies in a modal interface  
✅ **Data Export** - Export filtered results as JSON for further analysis  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Static Site** - No backend required, which is perfect for GitHub Pages

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

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Layout and 90s aesthetic
- **Vanilla JavaScript** - No dependencies required
- **JSON** - Data format
- **GitHub Pages** - Free static hosting

## Data Privacy & Attribution

This project uses the **Enron Email Corpus**, a publicly available dataset compiled from the Federal Energy Regulatory Commission (FERC) documents.

- Original Source: [Enron Email Corpus - CALO](https://www.cs.cmu.edu/~enron/)
- Dataset Used (.CSV): [Kaggle - Enron Email Dataset](https://www.kaggle.com/datasets/wcukierski/enron-email-dataset)
- **Fair Use**: This is for research, education, and public interest purposes

## For Digital Humanities Researchers

### Suggested Research Angles

- **Family Dynamics**: How did personal correspondence change as Enron's problems emerged?
- **Corporate Culture**: What do personal emails reveal about company leadership?
- **Temporal Analysis**: Track date patterns and communication frequency
- **Network Analysis**: Map relationships between Elizabeth, Kenneth, and Rosie
- **Crisis Communication**: Study how family communicated during corporate crisis
- **Distant Coding**: Design a more DH-friendly interface using [distant coding](https://distantcoding.ai/) principles 

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

The **Enron Email Corpus** is publicly available for research and educational use under Fair Use principles. Anyone who wanted their info wiped had the opportunity to do so (before I was born). 

## Questions or Feedback?

This is a capstone project. For improvements or questions, refer to the project documentation or reach out to the project creator.

---

**Created**: June 2026  
**Project**: Digital Humanities Capstone  
**Focus**: Corporate Archives & White-Collar Crime Studies
