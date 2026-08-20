/* Command Palette (Ctrl+K / Cmd+K) Implementation */

const PALETTE_ITEMS = [
  { title: 'Go to Hero / Top', sectionId: 'hero', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>' },
  { title: 'Go to About Me', sectionId: 'about', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' },
  { title: 'Go to Technical Skills', sectionId: 'skills', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' },
  { title: 'Go to Projects & Portfolio', sectionId: 'projects', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>' },
  { title: 'Go to Education & Degree', sectionId: 'education', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>' },
  { title: 'Go to Certifications & Courses', sectionId: 'certificates', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>' },
  { title: 'Go to Contact Form', sectionId: 'contact', category: 'Navigation', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' },
  { title: 'Run Terminal: skills', action: 'cli:skills', category: 'CLI Command', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>' },
  { title: 'Run Terminal: projects', action: 'cli:projects', category: 'CLI Command', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>' },
  { title: 'Run Terminal: education', action: 'cli:education', category: 'CLI Command', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>' },
  { title: 'Open GitHub Profile', action: 'url:https://github.com/blessen5', category: 'External', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>' },
  { title: 'Open LinkedIn Profile', action: 'url:https://www.linkedin.com/in/blessen-p-shaju', category: 'External', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>' },
  { title: 'Send Direct Email', action: 'mailto:blessenpshaju@gmail.com', category: 'Contact', iconSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' }
];

export function initCommandPalette() {
  const backdrop = document.getElementById('command-palette-backdrop');
  const input = document.getElementById('command-input');
  const resultsContainer = document.getElementById('command-results');
  const openBtns = document.querySelectorAll('.trigger-command-palette');
  let selectedIndex = 0;
  let filteredItems = [...PALETTE_ITEMS];

  if (!backdrop || !input || !resultsContainer) return;

  function openPalette() {
    backdrop.classList.add('active');
    input.value = '';
    renderItems(PALETTE_ITEMS);
    setTimeout(() => input.focus(), 40);
  }

  function closePalette() {
    backdrop.classList.remove('active');
  }

  function renderItems(items) {
    filteredItems = items;
    selectedIndex = 0;
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); text-align: center; font-size: 0.88rem;">No matching commands found</div>`;
      return;
    }

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `command-item ${index === selectedIndex ? 'selected' : ''}`;
      div.innerHTML = `
        <div class="command-item-left">
          <span style="display: flex; align-items: center; color: var(--primary-red);">${item.iconSvg}</span>
          <span class="command-item-title">${item.title}</span>
        </div>
        <span class="command-item-badge">${item.category}</span>
      `;
      div.addEventListener('click', () => executeItem(item));
      resultsContainer.appendChild(div);
    });
  }

  function executeItem(item) {
    closePalette();
    if (item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action) {
      if (item.action.startsWith('cli:')) {
        const cmd = item.action.split('cli:')[1];
        const termInput = document.getElementById('terminal-input');
        if (termInput) {
          termInput.value = cmd;
          termInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          document.getElementById('terminal-window')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (item.action.startsWith('url:')) {
        window.open(item.action.replace('url:', ''), '_blank', 'noopener,noreferrer');
      } else if (item.action.startsWith('mailto:')) {
        window.location.href = item.action;
      }
    }
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closePalette();
    }
  });

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const matches = PALETTE_ITEMS.filter(item => 
      item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
    renderItems(matches);
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.command-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelection(items);
      }
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      executeItem(filteredItems[selectedIndex]);
    }
  });

  function updateSelection(items) {
    items.forEach((el, idx) => {
      if (idx === selectedIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  openBtns.forEach(btn => btn.addEventListener('click', openPalette));
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });
}
