/* Project Showcase & Modal Detail Logic */

export const PROJECTS = [
  {
    id: 'lars',
    title: 'Lab Activity Reporting System (LARS)',
    category: 'academic',
    categoryName: 'Academic Project',
    featured: true,
    status: 'Completed Academic Project',
    summary: 'A web-based academic project designed to manage laboratory activity reporting, attendance information, activity history, and related student functionality.',
    problemSolved: 'Replaces manual paper-based lab tracking by centralizing attendance logging, activity reporting, and student history into an accessible web platform.',
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    description: `The Lab Activity Reporting System (LARS) is a web-based academic software project created to streamline laboratory management and student reporting.
    
    Problem Solved:
    Before LARS, managing lab attendance, activity submissions, and historical records required manual effort and paper logs. LARS provides a structured web interface for students and administrators to log, track, and review lab activities efficiently.
    
    Key Highlights:
    • Web-based user portal for laboratory activity submissions and attendance logging.
    • Clean session management and structured activity history tracking.
    • Built using PHP for backend server logic and HTML/CSS/JavaScript for responsive frontend interface.`,
    githubUrl: '', // Marked as placeholder for user to add
    demoUrl: ''
  },
  {
    id: 'rigmaster-ai',
    title: 'RigMasterAI',
    category: 'personal',
    categoryName: 'Personal AI Project',
    featured: false,
    status: 'In Development (Personal Project)',
    summary: 'An AI-related personal project created to experiment with AI-powered functionality and modern intelligent automation workflows.',
    problemSolved: 'Hands-on experimentation with AI-powered tools, API integrations, and practical automated features.',
    tags: ['Python', 'AI / ML APIs', 'Automation'],
    description: `RigMasterAI is an AI-related personal project created to explore and experiment with AI-powered functionality.
    
    Problem Solved:
    Created to gain practical experience with AI integration, testing intelligent API endpoints, and building experimental workflows.
    
    Key Highlights:
    • Exploratory architecture integrating AI capabilities into practical code.
    • Built to study prompt engineering, API responses, and automated data processing.`,
    githubUrl: '', // Marked as placeholder for user to add
    demoUrl: ''
  }
];

export function initProjects() {
  const grid = document.getElementById('projects-grid');
  const featuredContainer = document.getElementById('featured-project-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalContent = document.getElementById('project-modal-body');
  const modalClose = document.getElementById('modal-close-btn');

  if (!grid) return;

  function renderProjects(filter = 'all') {
    grid.innerHTML = '';
    if (featuredContainer) featuredContainer.innerHTML = '';

    const filtered = filter === 'all' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === filter);

    const featuredProject = filtered.find(p => p.featured) || (filter === 'all' ? PROJECTS[0] : null);
    const regularProjects = filtered.filter(p => p !== featuredProject);

    // Render Featured Project Hero Banner if present
    if (featuredProject && featuredContainer && filter === 'all') {
      featuredContainer.innerHTML = `
        <div class="glass-card glass-card-interactive reveal-on-scroll" style="margin-bottom: 2.5rem; border: 1px solid var(--border-glow); box-shadow: var(--shadow-glow); padding: 2.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan);">
              <span style="padding: 0.2rem 0.6rem; background: rgba(0, 245, 212, 0.15); border: 1px solid rgba(0, 245, 212, 0.3); border-radius: var(--radius-full); font-weight: 700;">★ FEATURED PROJECT</span>
              <span>• ${featuredProject.categoryName}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.1); padding: 0.25rem 0.65rem; border-radius: var(--radius-full); border: 1px solid rgba(16, 185, 129, 0.3);">
              STATUS: ${featuredProject.status}
            </span>
          </div>

          <h3 style="font-size: 1.8rem; margin-bottom: 0.75rem;">${featuredProject.title}</h3>
          
          <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.25rem; line-height: 1.6;">
            ${featuredProject.summary}
          </p>

          <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem 1.25rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan); margin-bottom: 1.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 0.25rem; font-weight: 600;">PROBLEM SOLVED:</div>
            <div style="color: #cbd5e1; font-size: 0.95rem;">${featuredProject.problemSolved}</div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem;">
            ${featuredProject.tags.map(t => `<span class="tech-badge" style="font-size: 0.82rem; padding: 0.3rem 0.75rem;">${t}</span>`).join('')}
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.8rem; align-items: center;">
            <button class="btn btn-primary view-details-btn" data-id="${featuredProject.id}">
              Project Details & Architecture
            </button>
            ${renderLinkButtons(featuredProject)}
          </div>
        </div>
      `;

      featuredContainer.querySelector('.view-details-btn')?.addEventListener('click', () => openModal(featuredProject));
    }

    // Render Grid Cards
    const listToRender = (featuredProject && filter === 'all') ? regularProjects : filtered;

    listToRender.forEach(project => {
      const card = document.createElement('div');
      card.className = 'glass-card glass-card-interactive project-card reveal-on-scroll';
      card.innerHTML = `
        <div class="project-header">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <span>${project.categoryName}</span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.1); padding: 0.15rem 0.5rem; border-radius: var(--radius-full); border: 1px solid rgba(16, 185, 129, 0.2);">
            ${project.status}
          </span>
        </div>

        <h3 class="project-title" style="margin-top: 0.75rem;">${project.title}</h3>
        
        <p class="project-desc">${project.summary}</p>

        <div style="background: rgba(15, 23, 42, 0.5); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 2px solid var(--accent-blue); margin-bottom: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-blue); font-weight: 600;">PROBLEM SOLVED:</div>
          <div style="color: #cbd5e1; font-size: 0.85rem;">${project.problemSolved}</div>
        </div>

        <div class="project-tech-stack" style="margin-bottom: 1.25rem;">
          ${project.tags.map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
          <button class="btn btn-secondary view-details-btn" style="width: 100%; font-size: 0.85rem;" data-id="${project.id}">
            View Details
          </button>
          <div style="display: flex; gap: 0.5rem;">
            ${renderLinkButtons(project)}
          </div>
        </div>
      `;

      card.querySelector('.view-details-btn').addEventListener('click', () => openModal(project));
      grid.appendChild(card);
    });

    if (window.observeReveals) window.observeReveals();
  }

  function renderLinkButtons(project) {
    const ghBtn = project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary" style="padding: 0.45rem 0.9rem; font-size: 0.8rem;">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
           GitHub
         </a>`
      : `<button class="btn btn-secondary" disabled style="opacity: 0.5; cursor: not-allowed; padding: 0.45rem 0.9rem; font-size: 0.8rem;" title="GitHub repository link placeholder">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
           GitHub (Link Placeholder)
         </button>`;

    const demoBtn = project.demoUrl
      ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary" style="padding: 0.45rem 0.9rem; font-size: 0.8rem;">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           Live Demo
         </a>`
      : `<button class="btn btn-secondary" disabled style="opacity: 0.5; cursor: not-allowed; padding: 0.45rem 0.9rem; font-size: 0.8rem;" title="Live demo link placeholder">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           Live Demo (Unavailable)
         </button>`;

    return `${ghBtn} ${demoBtn}`;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  function openModal(project) {
    if (!modalContent || !modalBackdrop) return;
    modalContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.5rem;">
        <span>PROJECT DEEP DIVE</span> // <span>${project.categoryName}</span>
      </div>
      <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">${project.title}</h2>
      <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-emerald); margin-bottom: 1.25rem;">
        Status: ${project.status}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${project.tags.map(t => `<span class="tech-badge" style="background: rgba(0, 245, 212, 0.1); border-color: rgba(0, 245, 212, 0.3); color: var(--accent-cyan);">${t}</span>`).join('')}
      </div>

      <div style="background: rgba(15, 23, 42, 0.8); padding: 1rem 1.25rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan); margin-bottom: 1.5rem;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.25rem;">PROBLEM SOLVED:</div>
        <div style="color: #cbd5e1; font-size: 0.95rem;">${project.problemSolved}</div>
      </div>

      <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.7; white-space: pre-line; margin-bottom: 2rem;">
        ${project.description}
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        ${renderLinkButtons(project)}
      </div>
    `;
    modalBackdrop.classList.add('active');
  }

  function closeModal() {
    modalBackdrop?.classList.remove('active');
  }

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  renderProjects('all');
}
