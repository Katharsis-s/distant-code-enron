// DISTANT CODE - Enron Email Corpus Browser
// Main Application Logic

let allEmails = [];
let filteredEmails = [];
let lastFocusedElement = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const filterFrom = document.getElementById('filterFrom');
const filterTo = document.getElementById('filterTo');
const filterSaved = document.getElementById('filterSaved');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const emailsBody = document.getElementById('emailsBody');
const emailModal = document.getElementById('emailModal');
const closeModal = document.getElementById('closeModal');
const resultCount = document.getElementById('resultCount');
const totalCount = document.getElementById('totalCount');

// Export modal elements
const exportModal = document.getElementById('exportModal');
const exportModalMessage = document.getElementById('exportModalMessage');
const confirmExportBtn = document.getElementById('confirmExportBtn');
const cancelExportBtn = document.getElementById('cancelExportBtn');
const closeExportModalBtn = document.getElementById('closeExportModal');

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
    initFolderTabs();
    loadData();
});

function initFolderTabs() {
    const tabs = document.querySelectorAll('.folder-tab');
    const panes = document.querySelectorAll('.folder-pane');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateFolderTab(tab));
        tab.addEventListener('keydown', (e) => {
            const tabsArray = Array.from(tabs);
            const index = tabsArray.indexOf(tab);
            let nextIndex = index;

            if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabsArray.length;
            if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabsArray.length) % tabsArray.length;
            if (e.key === 'Home') nextIndex = 0;
            if (e.key === 'End') nextIndex = tabsArray.length - 1;

            if (nextIndex !== index) {
                e.preventDefault();
                activateFolderTab(tabsArray[nextIndex]);
                tabsArray[nextIndex].focus();
            }
        });
    });

    function activateFolderTab(activeTab) {
        tabs.forEach(tab => {
            const isActive = tab === activeTab;
            tab.classList.toggle('folder-tab--active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        panes.forEach(pane => {
            const isActive = pane.id === `folder-${activeTab.dataset.folder}`;
            pane.classList.toggle('folder-pane--active', isActive);
            pane.hidden = !isActive;
        });
    }
}

// Load email data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        allEmails = await response.json();
        totalCount.textContent = allEmails.length;

        populateFilters();
        applyFilters();
    } catch (error) {
        console.error('Error loading data:', error);
        emailsBody.innerHTML = '<tr><td colspan="5" class="loading">Error loading corpus. Check data.json file.</td></tr>';
    }
}

// Populate sender and recipient dropdowns
function populateFilters() {
    const senders = new Set();
    const recipients = new Set();

    allEmails.forEach(email => {
        senders.add(email.From);
        email.To.split(',').forEach(to => {
            recipients.add(to.trim());
        });
    });

    Array.from(senders).sort().forEach(sender => {
        const option = document.createElement('option');
        option.value = sender;
        option.textContent = sender;
        filterFrom.appendChild(option);
    });

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
exportBtn.addEventListener('click', openExportModal);
confirmExportBtn.addEventListener('click', exportFiltered);
cancelExportBtn.addEventListener('click', closeExportModal);
closeExportModalBtn.addEventListener('click', closeExportModal);
closeModal.addEventListener('click', closeEmailModal);

emailModal.addEventListener('click', (e) => {
    if (e.target === emailModal) closeEmailModal();
});

exportModal.addEventListener('click', (e) => {
    if (e.target === exportModal) closeExportModal();
});

emailsBody.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-btn');
    if (btn) viewEmail(btn.dataset.messageId);
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    if (!exportModal.classList.contains('hidden')) {
        closeExportModal();
    } else if (!emailModal.classList.contains('hidden')) {
        closeEmailModal();
    }
});

// Apply all filters
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const fromFilter = filterFrom.value;
    const toFilter = filterTo.value;
    const savedFilterChecked = filterSaved.checked;

    filteredEmails = allEmails.filter(email => {
        if (searchTerm) {
            const searchableText = `${email.Subject} ${email.From} ${email.To} ${email.Body}`.toLowerCase();
            if (!searchableText.includes(searchTerm)) return false;
        }

        if (fromFilter && email.From !== fromFilter) return false;
        if (toFilter && !email.To.includes(toFilter)) return false;

        if (savedFilterChecked) {
            const emailSaved = email['K.Lay Folder?'] === true || email['K.Lay Folder?'] === 'TRUE';
            if (!emailSaved) return false;
        }

        return true;
    });

    resultCount.textContent = filteredEmails.length;
    renderResults();
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

        const fromDisplay = email.From.length > 30 ? email.From.substring(0, 27) + '...' : email.From;
        const toDisplay = email.To.length > 30 ? email.To.substring(0, 27) + '...' : email.To;
        const subjectDisplay = email.Subject.length > 50 ? email.Subject.substring(0, 47) + '...' : email.Subject;
        const subjectLabel = email.Subject || 'No subject';

        const dateCell = document.createElement('td');
        dateCell.className = 'col-date';
        dateCell.textContent = email.Date;

        const fromCell = document.createElement('td');
        fromCell.className = 'col-from';
        fromCell.title = email.From;
        fromCell.textContent = fromDisplay;

        const toCell = document.createElement('td');
        toCell.className = 'col-to';
        toCell.title = email.To;
        toCell.textContent = toDisplay;

        const subjectCell = document.createElement('td');
        subjectCell.className = 'col-subject';
        subjectCell.title = email.Subject;
        subjectCell.textContent = subjectDisplay;

        const actionCell = document.createElement('td');
        actionCell.className = 'col-action';

        const viewBtn = document.createElement('button');
        viewBtn.type = 'button';
        viewBtn.className = 'view-btn';
        viewBtn.textContent = 'VIEW';
        viewBtn.dataset.messageId = email['Message-ID'];
        viewBtn.setAttribute('aria-label', `View email: ${subjectLabel}`);

        actionCell.appendChild(viewBtn);
        row.append(dateCell, fromCell, toCell, subjectCell, actionCell);
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

    openModal(emailModal, closeModal);
}

function openExportModal() {
    const count = filteredEmails.length > 0 ? filteredEmails.length : allEmails.length;
    const scope = filteredEmails.length > 0 ? 'filtered' : 'all';
    exportModalMessage.textContent = `Download ${count} ${scope} email${count === 1 ? '' : 's'} as a JSON file?`;
    openModal(exportModal, confirmExportBtn);
}

function openModal(modal, focusTarget) {
    lastFocusedElement = document.activeElement;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    focusTarget.focus();
}

function closeEmailModal() {
    closeModalDialog(emailModal);
}

function closeExportModal() {
    closeModalDialog(exportModal);
}

function closeModalDialog(modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
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
    closeExportModal();
}
