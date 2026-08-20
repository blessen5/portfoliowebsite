/* Ambient Aurora & Obsidian Tech Mesh Background
   - Multi-layer slow-morphing crimson & ruby aurora glow fields
   - Ultra-clean subtle tech dot matrix grid
   - Drifting micro-light embers with soft atmospheric breathing
   - Luxury dark-mode developer aesthetic inspired by Linear, Stripe & Vercel
   - Low-energy 60fps canvas engine with automatic tab-pause lifecycle
*/

export function initAmbientBackground() {
  const canvas = document.getElementById('galaxy-canvas') || 
                 document.getElementById('color-bends-canvas') || 
                 document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let dpr = 1;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  // --- 1. Ambient Morphing Aurora Light Blobs ---
  const auroras = [
    {
      xRatio: 0.25,
      yRatio: 0.28,
      baseRadius: 360,
      radius: 360,
      color: 'rgba(225, 29, 72, 0.16)', // Crimson
      colorOuter: 'rgba(159, 18, 57, 0.0)',
      angle: 0.5,
      speed: 0.0004,
      driftX: 120,
      driftY: 80
    },
    {
      xRatio: 0.78,
      yRatio: 0.38,
      baseRadius: 420,
      radius: 420,
      color: 'rgba(159, 18, 57, 0.14)', // Deep Ruby
      colorOuter: 'rgba(76, 5, 25, 0.0)',
      angle: 2.1,
      speed: -0.00035,
      driftX: 140,
      driftY: 100
    },
    {
      xRatio: 0.50,
      yRatio: 0.72,
      baseRadius: 460,
      radius: 460,
      color: 'rgba(244, 63, 94, 0.10)', // Rose Glow
      colorOuter: 'rgba(225, 29, 72, 0.0)',
      angle: 4.2,
      speed: 0.0003,
      driftX: 160,
      driftY: 90
    },
    {
      xRatio: 0.15,
      yRatio: 0.82,
      baseRadius: 320,
      radius: 320,
      color: 'rgba(190, 18, 60, 0.12)', // Dark Obsidian Wine
      colorOuter: 'rgba(0, 0, 0, 0)',
      angle: 5.4,
      speed: -0.00045,
      driftX: 100,
      driftY: 70
    }
  ];

  // --- 2. Floating Luminous Stardust / Micro-Embers ---
  const EMBER_COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 14000), 55);
  const embers = [];

  function createEmbers() {
    embers.length = 0;
    for (let i = 0; i < EMBER_COUNT; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        vy: -(Math.random() * 0.25 + 0.08), // Gentle upward drift
        vx: (Math.random() - 0.5) * 0.12,
        isRed: Math.random() > 0.4
      });
    }
  }

  window.addEventListener('resize', () => {
    resize();
    createEmbers();
  }, { passive: true });

  // Initial sizing
  resize();
  createEmbers();

  let time = 0;

  // --- Main 60fps Ambient Render Loop ---
  function render() {
    if (!ctx) return;
    time += 1;

    // Pitch black deep obsidian base
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);

    // --- A. Subtle Geometric Tech Dot Grid ---
    const gridSpacing = 42;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let gx = gridSpacing / 2; gx < width; gx += gridSpacing) {
      for (let gy = gridSpacing / 2; gy < height; gy += gridSpacing) {
        ctx.beginPath();
        ctx.arc(gx, gy, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- B. Morphing Ambient Aurora Fields (Screen Blend) ---
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    auroras.forEach((aurora, i) => {
      aurora.angle += aurora.speed;
      
      const cx = width * aurora.xRatio + Math.cos(aurora.angle + i) * aurora.driftX;
      const cy = height * aurora.yRatio + Math.sin(aurora.angle * 0.8 + i) * aurora.driftY;
      const r = aurora.baseRadius + Math.sin(time * 0.008 + i) * 35;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, aurora.color);
      grad.addColorStop(0.55, aurora.color.replace(/[\d\.]+\)$/, '0.04)'));
      grad.addColorStop(1, aurora.colorOuter);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();

    // --- C. Floating Micro-Embers with Breathing Glow ---
    for (let i = 0; i < embers.length; i++) {
      const e = embers[i];

      // Update position
      e.y += e.vy;
      e.x += e.vx;
      e.pulsePhase += e.pulseSpeed;

      // Wrap around edges smoothly
      if (e.y < -10) e.y = height + 10;
      if (e.x < -10) e.x = width + 10;
      if (e.x > width + 10) e.x = -10;

      const pulse = Math.sin(e.pulsePhase) * 0.25;
      const currentAlpha = Math.max(0.08, Math.min(1, e.baseAlpha + pulse));

      if (e.isRed) {
        ctx.fillStyle = `rgba(244, 63, 94, ${currentAlpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
      }

      ctx.beginPath();
      ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow aura for larger embers
      if (e.radius > 1.3) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = e.isRed 
          ? `rgba(225, 29, 72, ${currentAlpha * 0.35})`
          : `rgba(255, 255, 255, ${currentAlpha * 0.25})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Automatic Lifecycle Tab-pause
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  render();
}
