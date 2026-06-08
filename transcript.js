// Loads DEVELOPMENT_TRANSCRIPT.md — Source (raw) and Preview (rendered) in one scroll box

document.addEventListener('DOMContentLoaded', () => {
    initTranscriptModes();
    loadTranscript();
});

function initTranscriptModes() {
    const tabs = document.querySelectorAll('.transcript-mode-tab');
    const sourcePanel = document.getElementById('transcript-source');
    const previewPanel = document.getElementById('transcript-preview');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const isPreview = tab.dataset.mode === 'preview';

            tabs.forEach(t => {
                const active = t === tab;
                t.classList.toggle('transcript-mode-tab--active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });

            sourcePanel.classList.toggle('transcript-panel--active', !isPreview);
            sourcePanel.hidden = isPreview;

            previewPanel.classList.toggle('transcript-panel--active', isPreview);
            previewPanel.hidden = !isPreview;
        });
    });
}

async function loadTranscript() {
    const sourcePanel = document.getElementById('transcript-source');
    const previewPanel = document.getElementById('transcript-preview');

    try {
        const response = await fetch('DEVELOPMENT_TRANSCRIPT.md');
        if (!response.ok) throw new Error('Transcript file not found');
        const markdown = await response.text();

        sourcePanel.textContent = markdown;
        previewPanel.innerHTML = renderMarkdownPreview(markdown);
    } catch (error) {
        console.error('Error loading transcript:', error);
        const message = 'Error loading transcript. Ensure DEVELOPMENT_TRANSCRIPT.md is available.';
        sourcePanel.textContent = message;
        previewPanel.innerHTML = `<p>${message}</p>`;
    }
}

function renderMarkdownPreview(md) {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inUl = false;
    let inOl = false;
    let inCode = false;
    let codeBuffer = '';
    let inTable = false;
    let tableRows = [];

    const closeLists = () => {
        if (inUl) { html += '</ul>'; inUl = false; }
        if (inOl) { html += '</ol>'; inOl = false; }
    };

    const flushTable = () => {
        if (!inTable || tableRows.length === 0) return;
        html += '<table>';
        tableRows.forEach((row, i) => {
            const tag = i === 0 ? 'th' : 'td';
            html += '<tr>' + row.map(cell => `<${tag}>${inlineFormat(cell.trim())}</${tag}>`).join('') + '</tr>';
        });
        html += '</table>';
        tableRows = [];
        inTable = false;
    };

    const inlineFormat = (text) => {
        return escapeHtml(text)
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('```')) {
            if (inCode) {
                html += `<pre><code>${escapeHtml(codeBuffer.trimEnd())}</code></pre>`;
                codeBuffer = '';
                inCode = false;
            } else {
                closeLists();
                flushTable();
                inCode = true;
            }
            continue;
        }

        if (inCode) {
            codeBuffer += line + '\n';
            continue;
        }

        if (line.startsWith('|') && line.includes('|')) {
            closeLists();
            if (/^\|[-:\s|]+\|$/.test(line)) continue;
            inTable = true;
            tableRows.push(line.split('|').slice(1, -1));
            continue;
        } else {
            flushTable();
        }

        if (line.trim() === '---') {
            closeLists();
            html += '<hr>';
            continue;
        }

        if (line.startsWith('### ')) {
            closeLists();
            html += `<h3>${inlineFormat(line.slice(4))}</h3>`;
            continue;
        }

        if (line.startsWith('## ')) {
            closeLists();
            html += `<h2>${inlineFormat(line.slice(3))}</h2>`;
            continue;
        }

        if (line.startsWith('# ')) {
            closeLists();
            html += `<h1>${inlineFormat(line.slice(2))}</h1>`;
            continue;
        }

        if (/^[-*] /.test(line)) {
            if (!inUl) { closeLists(); html += '<ul>'; inUl = true; }
            html += `<li>${inlineFormat(line.slice(2))}</li>`;
            continue;
        }

        if (/^\d+\. /.test(line)) {
            if (!inOl) { closeLists(); html += '<ol>'; inOl = true; }
            html += `<li>${inlineFormat(line.replace(/^\d+\. /, ''))}</li>`;
            continue;
        }

        if (line.trim() === '') {
            closeLists();
            continue;
        }

        closeLists();

        if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
            html += `<p><em>${inlineFormat(line.slice(1, -1))}</em></p>`;
            continue;
        }

        html += `<p>${inlineFormat(line)}</p>`;
    }

    closeLists();
    flushTable();

    if (inCode) {
        html += `<pre><code>${escapeHtml(codeBuffer.trimEnd())}</code></pre>`;
    }

    return html;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
