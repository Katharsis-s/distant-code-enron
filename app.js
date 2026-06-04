// DISTANT CODE - Enron Email Corpus Browser
// Main Application Logic

let allEmails = [];
let filteredEmails = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const filterFrom = document.getElementById('filterFrom');
const filterTo = document.getElementById('filterTo');
const filterSaved = document.getElementById('filterSaved');
const resetBtn = document.getElementById('resetBtn');
const exportLink = document.getElementById('exportLink');
const emailsBody = document.getElementById('emailsBody');
const resultsTable = document.getElementById('resultsTable');
const emailModal = document.getElementById('emailModal');
const closeModal = document.getElementById('closeModal');
const resultCount = document.getElementById('resultCount');
const totalCount = document.getElementById('totalCount');

// Modal fields
const modalSubject = document.getElementById('modalSubject');
const modalMessageId = document.getElementById('modalMessageId');
const modalDate = document.getElementById('modalDate');
const modalFrom = document.getElementById('modalFrom');
const modalTo = document.getElementById('modalTo');
const modalBody = document.getElementById('modalBody');
const modalSaved = document.getElementById('modalSaved');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

// Load email data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        allEmails = await response.json();
        totalCount.textContent = allEmails.length;
        
        // Populate filter dropdowns
        populateFilters();
        
        // Initial render
        applyFilters();
    } catch (error) {
        console.error('Error loading data:', error);
        emailsBody.innerHTML = '<tr><td colspan="6" class="loading">Error loading corpus. Check data.json file.</td></tr>';
    }
}

// Populate sender and recipient dropdowns
function populateFilters() {
    const senders = new Set();
    const recipients = new Set();
    
    allEmails.forEach(email => {
        senders.add(email.From);
        // Parse recipients (can be comma-separated)
        email.To.split(',').forEach(to => {
            recipients.add(to.trim());
        });
    });
    
    // Sort and populate "From"
    Array.from(senders).sort().forEach(sender => {
        const option = document.createElement('option');
        option.value = sender;
        option.textContent = sender;
        filterFrom.appendChild(option);
    });
    
    // Sort and populate "To"
    Array.from(recipients).sort().forEach(recipient => {
        const option = document.createElement('option');
        option.value = recipient;
        option.textContent = recipient;
        filterTo.appendChild(option);
    });
}

// Add event listeners to filters
searchInput.addEventListener('input', applyFilters);
filterFrom.addEventListener('change', applyFilters);
filterTo.addEventListener('change', applyFilters);
filterSaved.addEventListener('change', applyFilters);
resetBtn.addEventListener('click', resetFilters);
exportLink.addEventListener('click', (e) => {
    e.preventDefault();
    exportFiltered();
});
closeModal.addEventListener('click', closeEmailModal);
emailModal.addEventListener('click', (e) => {
    if (e.target === emailModal) closeEmailModal();
});

// Apply all filters
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const fromFilter = filterFrom.value;
    const toFilter = filterTo.value;
    const savedFilterChecked = filterSaved.checked;
    
    filteredEmails = allEmails.filter(email => {
        // Text search
        if (searchTerm) {
            const searchableText = `${email.Subject} ${email.From} ${email.To} ${email.Body}`.toLowerCase();
            if (!searchableText.includes(searchTerm)) return false;
        }
        
        // From filter
        if (fromFilter && email.From !== fromFilter) return false;
        
        // To filter
        if (toFilter && !email.To.includes(toFilter)) return false;
        
        // Saved filter (checkbox)
        if (savedFilterChecked) {
            const emailSaved = email['K.Lay Folder?'] === true || email['K.Lay Folder?'] === 'TRUE';
            if (!emailSaved) return false;
        }
        
        return true;
    });
    
    resultCount.textContent = filteredEmails.length;
    renderResults();
}

// Parse date string (handles "7/27/1999" format)
function parseDate(dateStr) {
    try {
        const parts = dateStr.trim().split('/');
        if (parts.length === 3) {
            const month = parseInt(parts[0], 10) - 1;
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
    } catch (e) {
        console.warn('Could not parse date:', dateStr);
    }
    return null;
}

// Render email results table
function renderResults() {
    emailsBody.innerHTML = '';
    
    if (filteredEmails.length === 0) {
        emailsBody.innerHTML = '<tr><td colspan="5" class="loading">No emails match your filters.</td></tr>';
        return;
    }
    
    filteredEmails.forEach(email => {
        const row = document.createElement('tr');
        
        // Truncate long values for display
        const fromDisplay = email.From.length > 30 ? email.From.substring(0, 27) + '...' : email.From;
        const toDisplay = email.To.length > 30 ? email.To.substring(0, 27) + '...' : email.To;
        const subjectDisplay = email.Subject.length > 50 ? email.Subject.substring(0, 47) + '...' : email.Subject;
        
        row.innerHTML = `
            <td class="col-date">${email.Date}</td>
            <td class="col-from" title="${email.From}">${fromDisplay}</td>
            <td class="col-to" title="${email.To}">${toDisplay}</td>
            <td class="col-subject" title="${email.Subject}">${subjectDisplay}</td>
            <td class="col-action">
                <button class="view-btn" onclick="viewEmail('${escapeHtml(email['Message-ID'])}')">VIEW</button>
            </td>
        `;
        emailsBody.appendChild(row);
    });
}

// Find and open email in modal
function viewEmail(messageId) {
    const email = filteredEmails.find(e => e['Message-ID'] === messageId);
    if (!email) return;
    
    modalSubject.textContent = email.Subject || '(No Subject)';
    modalMessageId.textContent = email['Message-ID'];
    modalDate.textContent = email.Date;
    modalFrom.textContent = email.From;
    modalTo.textContent = email.To;
    modalBody.textContent = email.Body;
    
    const saved = email['K.Lay Folder?'] === true || email['K.Lay Folder?'] === 'TRUE';
    modalSaved.textContent = saved ? '✓ YES (Saved)' : '✗ NO (Not Saved)';
    modalSaved.className = `saved-badge ${saved ? 'true' : 'false'}`;
    
    emailModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeEmailModal() {
    emailModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    filterFrom.value = '';
    filterTo.value = '';
    filterSaved.checked = false;
    applyFilters();
}

// Export filtered results as JSON
function exportFiltered() {
    const dataToExport = filteredEmails.length > 0 ? filteredEmails : allEmails;
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `enron-emails-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
