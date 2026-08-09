/* Command Palette (Ctrl+K / Cmd+K) Implementation */

const PALETTE_ITEMS = [
  { title: 'Go to Hero / Top', sectionId: 'hero', category: 'Navigation', icon: '🏠' },
  { title: 'Go to About Me', sectionId: 'about', category: 'Navigation', icon: '👤' },
  { title: 'Go to Technical Skills', sectionId: 'skills', category: 'Navigation', icon: '⚡' },
  { title: 'Go to Featured Projects', sectionId: 'projects', category: 'Navigation', icon: '🚀' },
  { title: 'Go to Education & Degree', sectionId: 'education', category: 'Navigation', icon: '🎓' },
  { title: 'Go to Certifications & Courses', sectionId: 'certificates', category: 'Navigation', icon: '📜' },
  { title: 'Go to Learning & Growth', sectionId: 'learning', category: 'Navigation', icon: '🌱' },
  { title: 'Go to Contact Form', sectionId: 'contact', category: 'Navigation', icon: '✉️' },
  { title: 'Execute Terminal command: docker ps', action: 'cli:docker', category: 'CLI Action', icon: '🐳' },
  { title: 'Execute Terminal command: skills', action: 'cli:skills', category: 'CLI Action', icon: '💻' },
  { title: 'Send Direct Email', action: 'mailto:blessenpshaju@gmail.com', category: 'Contact', icon: '📧' }
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
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    backdrop.classList.remove('active');
  }

  function renderItems(items) {
    filteredItems = items;
    selectedIndex = 0;
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); text-align: center; font-size: 0.9rem;">No commands found</div>`;
      return;
    }

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `command-item ${index === selectedIndex ? 'selected' : ''}`;
      div.innerHTML = `
        <div class="command-item-left">
          <span>${item.icon}</span>
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
      } else if (item.action.startsWith('mailto:')) {
        window.location.href = item.action;
      }
    }
  }

  // Keyboard events
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
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
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
