/* Project Showcase & Modal Detail Logic */

export const PROJECTS = [
  {
    id: 'lars',
    title: 'Lab Activity Reporting System (LARS)',
    category: 'academic',
    categoryName: 'Academic Project',
    featured: true,
    status: 'Completed Academic Project',
    summary: 'A web-based academic software system designed to streamline laboratory management, student activity reporting, attendance tracking, and session histories.',
    problemSolved: 'Replaces manual paper-based lab records with a structured portal for students and administrators to log, track, and review laboratory sessions efficiently.',
    tags: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    description: `The Lab Activity Reporting System (LARS) is a full-featured web-based academic project engineered to manage laboratory sessions, attendance records, and student submission histories.
    
Problem Solved:
Before LARS, managing laboratory coursework and attendance involved cumbersome paper logs and manual record-keeping. LARS provides an intuitive, centralized web interface allowing students to submit their activity reports and enabling laboratory administrators to monitor session attendance in real time.

Key Engineering Highlights:
• Structured database architecture for tracking laboratory sessions, student profiles, and submission timestamps.
• Session management and role-based access control for administrative workflows.
• Clean responsive interface crafted with semantic HTML5, CSS3, JavaScript, and a PHP backend.`,
    githubUrl: '', // Placeholder
    demoUrl: ''
  },
  {
    id: 'rigmaster-ai',
    title: 'RigMasterAI',
    category: 'personal',
    categoryName: 'Personal AI Project',
    featured: false,
    status: 'In Active Development',
    summary: 'An AI-driven experimental web application exploring automated workflows, prompt processing, and intelligent computer hardware & system configuration guidance.',
    problemSolved: 'Provides hands-on experimentation with modern AI APIs, structured prompting pipelines, and web-based automation tools.',
    tags: ['Python', 'AI / ML APIs', 'Web Automation', 'JavaScript'],
    description: `RigMasterAI is an exploratory personal project developed to build practical experience in integrating artificial intelligence into software applications.

Problem Solved:
Created as a sandbox to investigate AI API endpoints, structured reasoning workflows, and intelligent assistance tools for complex technical tasks.

Key Engineering Highlights:
• Interactive web frontend connecting to modern intelligent API endpoints.
• Prompt engineering experiments and structured JSON response parsing.
• Live deployment hosted and accessible via modern cloud infrastructure.`,
    githubUrl: '', // Placeholder
    demoUrl: 'https://rigmaster-ai.vercel.app/'
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

    // Render Featured Project Hero Card
    if (featuredProject && featuredContainer && filter === 'all') {
      featuredContainer.innerHTML = `
        <div class="glass-card glass-card-interactive reveal-on-scroll" style="margin-bottom: 2.5rem; border: 1px solid var(--border-glow); box-shadow: var(--shadow-glow); padding: 2.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan);">
              <span style="padding: 0.2rem 0.65rem; background: var(--accent-cyan-subtle); border: 1px solid rgba(0, 245, 212, 0.3); border-radius: var(--radius-full); font-weight: 700;">★ FEATURED PROJECT</span>
              <span>• ${featuredProject.categoryName}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-emerald); background: var(--accent-emerald-subtle); padding: 0.2rem 0.65rem; border-radius: var(--radius-full); border: 1px solid rgba(16, 185, 129, 0.3);">
              STATUS: ${featuredProject.status}
            </span>
          </div>

          <h3 style="font-size: 1.85rem; margin-bottom: 0.75rem; color: var(--text-main);">${featuredProject.title}</h3>
          
          <p style="color: var(--text-muted); font-size: 1.02rem; margin-bottom: 1.25rem; line-height: 1.65;">
            ${featuredProject.summary}
          </p>

          <div style="background: var(--bg-card); padding: 1rem 1.25rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan); margin-bottom: 1.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); margin-bottom: 0.25rem; font-weight: 700;">PROBLEM SOLVED:</div>
            <div style="color: var(--text-body); font-size: 0.92rem; line-height: 1.5;">${featuredProject.problemSolved}</div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem;">
            ${featuredProject.tags.map(t => `<span class="tech-badge" style="font-size: 0.82rem; padding: 0.25rem 0.7rem;">${t}</span>`).join('')}
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <span>${project.categoryName}</span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-emerald); background: var(--accent-emerald-subtle); padding: 0.15rem 0.5rem; border-radius: var(--radius-full); border: 1px solid rgba(16, 185, 129, 0.2);">
            ${project.status}
          </span>
        </div>

        <h3 class="project-title" style="margin-top: 0.5rem;">${project.title}</h3>
        
        <p class="project-desc">${project.summary}</p>

        <div style="background: var(--bg-card); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 2px solid var(--accent-blue); margin-bottom: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-blue); font-weight: 700; margin-bottom: 0.15rem;">PROBLEM SOLVED:</div>
          <div style="color: var(--text-body); font-size: 0.85rem; line-height: 1.45;">${project.problemSolved}</div>
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
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 0.45rem 0.9rem; font-size: 0.8rem;">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
           GitHub
         </a>`
      : `<button class="btn btn-secondary" disabled aria-disabled="true" style="opacity: 0.45; cursor: not-allowed; padding: 0.45rem 0.9rem; font-size: 0.8rem;" title="GitHub repository link will be updated">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
           GitHub
         </button>`;

    const demoBtn = project.demoUrl
      ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.45rem 0.9rem; font-size: 0.8rem;">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           Live Demo
         </a>`
      : `<button class="btn btn-secondary" disabled aria-disabled="true" style="opacity: 0.45; cursor: not-allowed; padding: 0.45rem 0.9rem; font-size: 0.8rem;" title="Live demo not available">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           Live Demo
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

  let previousActiveElement = null;

  function openModal(project) {
    if (!modalContent || !modalBackdrop) return;
    previousActiveElement = document.activeElement;
    modalContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.82rem; margin-bottom: 0.5rem;">
        <span>PROJECT DEEP DIVE</span> // <span>${project.categoryName}</span>
      </div>
      <h2 id="modal-project-title" style="font-size: 1.75rem; margin-bottom: 0.4rem; color: var(--text-main);">${project.title}</h2>
      <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-emerald); margin-bottom: 1.25rem;">
        Status: ${project.status}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.5rem;">
        ${project.tags.map(t => `<span class="tech-badge" style="background: var(--accent-cyan-subtle); border-color: rgba(0, 245, 212, 0.3); color: var(--accent-cyan); font-size: 0.82rem;">${t}</span>`).join('')}
      </div>

      <div style="background: var(--bg-card); padding: 1rem 1.25rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan); margin-bottom: 1.5rem;">
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 0.25rem;">PROBLEM SOLVED:</div>
        <div style="color: var(--text-body); font-size: 0.92rem; line-height: 1.5;">${project.problemSolved}</div>
      </div>

      <div style="color: var(--text-body); font-size: 0.94rem; line-height: 1.7; white-space: pre-line; margin-bottom: 2rem;">
        ${project.description}
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        ${renderLinkButtons(project)}
      </div>
    `;
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    modalClose?.focus();
  }

  function closeModal() {
    if (!modalBackdrop?.classList.contains('active')) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  renderProjects('all');
}
