/* Stylized Ambient Deep-Space Galaxy & Celestial Stardust Canvas
   - Stylized glowing cosmic galaxy core with multi-stage radial nebula bloom
   - Elegant curved logarithmic spiral arms with graceful ambient orbital motion
   - Multi-depth twinkling stellar field with soft starlight flares
   - Occasional luminous shooting stars across the cosmic void
   - Completely ambient & non-distracting (NO mouse movement / displacement interaction)
   - Highly optimized 60fps canvas engine with automatic tab-pause lifecycle
*/

export function initGalaxyBackground() {
  const canvas = document.getElementById('galaxy-canvas') || document.getElementById('color-bends-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let dpr = 1;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const galaxyCenter = { x: 0, y: 0 };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // Position galaxy center slightly offset for aesthetic composition behind content
    galaxyCenter.x = width * 0.52;
    galaxyCenter.y = height * 0.46;
  }

  // --- 1. Distant Twinkling Deep Space Stars ---
  const STAR_COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 7500), 180);
  const backgroundStars = [];

  function createBackgroundStars() {
    backgroundStars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      const colorRoll = Math.random();
      let colorPrefix = 'rgba(255, 255, 255, '; // Default crisp white
      if (colorRoll > 0.85) {
        colorPrefix = 'rgba(251, 113, 133, '; // Soft Rose
      } else if (colorRoll > 0.70) {
        colorPrefix = 'rgba(225, 29, 72, '; // Crimson Red
      } else if (colorRoll > 0.60) {
        colorPrefix = 'rgba(224, 242, 254, '; // Faint Ice Blue
      }

      backgroundStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.35,
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        colorPrefix
      });
    }
  }

  // --- 2. Stylized Spiral Galaxy & Cosmic Stardust Particles ---
  const GALAXY_PARTICLE_COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 3200), 480);
  const galaxyParticles = [];
  const ARMS = 3;
  const ARM_SPREAD = 0.48;

  function createGalaxyParticles() {
    galaxyParticles.length = 0;
    const maxRadius = Math.min(width, height) * 0.65;

    for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
      // Clustered towards glowing core with smooth exponential distribution
      const normDist = Math.pow(Math.random(), 1.65);
      const r = normDist * maxRadius + 14;

      // Logarithmic spiral geometry
      const armIndex = i % ARMS;
      const armAngle = (armIndex * (Math.PI * 2 / ARMS));
      const spiralAngle = r * 0.0046;
      const spreadAngle = (Math.random() - 0.5) * ARM_SPREAD * (1 + normDist * 1.5);
      
      const angle = armAngle + spiralAngle + spreadAngle;

      // Smooth ambient orbital speed (slower outer edge, gentle core revolution)
      const orbitalSpeed = (0.00045 / (0.4 + normDist * 0.6)) * 0.9;

      // Stylized color palette: white starlight, glowing ruby, cosmic crimson, magenta, subtle ice cyan
      let color;
      const colorRoll = Math.random();
      if (colorRoll < 0.42) {
        color = { r: 255, g: 255, b: 255, a: Math.random() * 0.85 + 0.2 }; // Pure Star White
      } else if (colorRoll < 0.72) {
        color = { r: 225, g: 29, b: 72, a: Math.random() * 0.85 + 0.25 }; // Vibrant Crimson
      } else if (colorRoll < 0.88) {
        color = { r: 251, g: 113, b: 133, a: Math.random() * 0.8 + 0.25 }; // Glowing Rose / Magenta
      } else {
        color = { r: 224, g: 242, b: 254, a: Math.random() * 0.75 + 0.25 }; // Celestial Ice Blue
      }

      // Vertical depth on celestial plane
      const z = (Math.random() - 0.5) * 65 * (1 - normDist * 0.4);

      galaxyParticles.push({
        r,
        angle,
        speed: orbitalSpeed,
        size: Math.random() * 1.9 + 0.6,
        color,
        z,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  // --- 3. Atmospheric Cosmic Nebula Clouds ---
  const nebulae = [
    {
      angle: 0.3,
      dist: 0.14,
      radius: 400,
      color: 'rgba(225, 29, 72, 0.09)', // Crimson
      speed: 0.00016
    },
    {
      angle: 2.4,
      dist: 0.32,
      radius: 480,
      color: 'rgba(159, 18, 57, 0.08)', // Deep Ruby
      speed: -0.00010
    },
    {
      angle: 4.2,
      dist: 0.26,
      radius: 440,
      color: 'rgba(244, 63, 94, 0.065)', // Soft Rose Mist
      speed: 0.00012
    },
    {
      angle: 5.6,
      dist: 0.42,
      radius: 360,
      color: 'rgba(88, 12, 28, 0.075)', // Obsidian Wine
      speed: -0.00015
    }
  ];

  // --- 4. Occasional Shooting Stars / Comets ---
  const shootingStars = [];

  function maybeSpawnShootingStar() {
    if (shootingStars.length >= 2 || Math.random() > 0.010) return;

    const startX = Math.random() * width * 1.2 - width * 0.1;
    const startY = Math.random() * height * 0.35;
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.28;
    const length = Math.random() * 130 + 75;
    const speed = Math.random() * 8 + 10;

    shootingStars.push({
      x: startX,
      y: startY,
      length,
      speed,
      angle,
      life: 1.0,
      decay: Math.random() * 0.016 + 0.012
    });
  }

  // Window resize event
  window.addEventListener('resize', () => {
    resize();
    createBackgroundStars();
    createGalaxyParticles();
  }, { passive: true });

  // Initial setup
  resize();
  createBackgroundStars();
  createGalaxyParticles();

  // --- Main 60fps Ambient Render Loop ---
  function render() {
    if (!ctx) return;

    // Pitch black deep cosmic background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#040407';
    ctx.fillRect(0, 0, width, height);

    // --- Render Rotating Nebula Gas Clouds ---
    nebulae.forEach(nebula => {
      nebula.angle += nebula.speed;
      const nx = galaxyCenter.x + Math.cos(nebula.angle) * (width * nebula.dist);
      const ny = galaxyCenter.y + Math.sin(nebula.angle) * (height * nebula.dist * 0.6);

      const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nebula.radius);
      grad.addColorStop(0, nebula.color);
      grad.addColorStop(0.55, nebula.color.replace(/[\d\.]+\)$/, '0.025)'));
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(nx, ny, nebula.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // --- Stylized Galactic Core Radiant Glow ---
    const coreRadius = Math.min(width, height) * 0.42;
    const coreGrad = ctx.createRadialGradient(galaxyCenter.x, galaxyCenter.y, 0, galaxyCenter.x, galaxyCenter.y, coreRadius);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.28)'); // Luminous core flare
    coreGrad.addColorStop(0.12, 'rgba(251, 113, 133, 0.20)'); // Radiant rose ring
    coreGrad.addColorStop(0.35, 'rgba(225, 29, 72, 0.10)'); // Crimson aura
    coreGrad.addColorStop(0.70, 'rgba(159, 18, 57, 0.03)'); // Outer faint glow
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(galaxyCenter.x, galaxyCenter.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- Render Deep Background Stars ---
    for (let i = 0; i < backgroundStars.length; i++) {
      const star = backgroundStars[i];
      star.twinklePhase += star.twinkleSpeed;
      const currentAlpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.35;
      const clampedAlpha = Math.max(0.08, Math.min(1, currentAlpha));

      ctx.fillStyle = star.colorPrefix + clampedAlpha + ')';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Render Orbiting Spiral Galaxy Stardust & Stars ---
    const galaxyTiltY = 0.54; // Stylized elliptical disk angle

    for (let i = 0; i < galaxyParticles.length; i++) {
      const p = galaxyParticles[i];
      
      // Advance ambient orbital position
      p.angle += p.speed;
      p.pulsePhase += p.pulseSpeed;

      // 3D projected coordinates on tilted celestial plane
      const cosA = Math.cos(p.angle);
      const sinA = Math.sin(p.angle);

      const px = galaxyCenter.x + cosA * p.r;
      const py = galaxyCenter.y + sinA * p.r * galaxyTiltY + p.z;

      // Dynamic particle pulsing & glow
      const alphaPulse = Math.sin(p.pulsePhase) * 0.22;
      const alpha = Math.max(0.12, Math.min(1, p.color.a + alphaPulse));

      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow halo for brighter stardust
      if (p.size > 1.7) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.38})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // --- Render Shooting Stars ---
    maybeSpawnShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life -= s.decay;

      if (s.life <= 0 || s.x > width + 200 || s.y > height + 200) {
        shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const meteorGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      meteorGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      meteorGrad.addColorStop(0.7, `rgba(251, 113, 133, ${s.life * 0.45})`);
      meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${s.life * 0.95})`);

      ctx.save();
      ctx.strokeStyle = meteorGrad;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();

      // Glowing star point head
      ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Automatic Tab Pause Lifecycle
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  // Start rendering
  render();
}
