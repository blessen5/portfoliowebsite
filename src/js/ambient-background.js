/* Ambient Aurora & Obsidian Tech Mesh Background — Dark Theme
   - Deep Midnight Obsidian Canvas (#060814)
   - Multi-layer slow-morphing Flame Vermilion (#E73F1E) & Midnight Navy Aurora Glows
   - Ultra-clean subtle geometric tech dot matrix grid
   - Drifting glowing micro-embers with soft atmospheric breathing
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

  // --- 1. Ambient Morphing Flame & Navy Aurora Light Blobs ---
  const auroras = [
    {
      xRatio: 0.24,
      yRatio: 0.28,
      baseRadius: 440,
      radius: 440,
      color: 'rgba(231, 63, 30, 0.20)', // Flame Vermilion #E73F1E
      colorOuter: 'rgba(231, 63, 30, 0.0)',
      angle: 0.5,
      speed: 0.00045,
      driftX: 130,
      driftY: 90
    },
    {
      xRatio: 0.80,
      yRatio: 0.38,
      baseRadius: 480,
      radius: 480,
      color: 'rgba(30, 58, 138, 0.22)', // Deep Midnight Navy
      colorOuter: 'rgba(15, 23, 42, 0.0)',
      angle: 2.1,
      speed: -0.00035,
      driftX: 150,
      driftY: 100
    },
    {
      xRatio: 0.52,
      yRatio: 0.72,
      baseRadius: 520,
      radius: 520,
      color: 'rgba(231, 63, 30, 0.16)', // Warm Radiant Flame
      colorOuter: 'rgba(231, 63, 30, 0.0)',
      angle: 4.2,
      speed: 0.0003,
      driftX: 160,
      driftY: 95
    },
    {
      xRatio: 0.14,
      yRatio: 0.84,
      baseRadius: 380,
      radius: 380,
      color: 'rgba(99, 102, 241, 0.14)', // Indigo Mist
      colorOuter: 'rgba(0, 0, 0, 0)',
      angle: 5.4,
      speed: -0.00045,
      driftX: 110,
      driftY: 75
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
        radius: Math.random() * 1.7 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        vy: -(Math.random() * 0.25 + 0.08), // Gentle upward drift
        vx: (Math.random() - 0.5) * 0.12,
        isFlame: Math.random() > 0.35
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

    // Pitch black deep midnight obsidian base
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, width, height);

    // --- A. Subtle Geometric Tech Dot Grid ---
    const gridSpacing = 42;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
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
      const r = aurora.baseRadius + Math.sin(time * 0.008 + i) * 38;

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
      const currentAlpha = Math.max(0.1, Math.min(1, e.baseAlpha + pulse));

      if (e.isFlame) {
        ctx.fillStyle = `rgba(231, 63, 30, ${currentAlpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
      }

      ctx.beginPath();
      ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow aura around flame embers
      if (e.isFlame && e.radius > 1.2) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(231, 63, 30, ${currentAlpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 2.6, 0, Math.PI * 2);
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
