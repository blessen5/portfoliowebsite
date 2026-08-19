/* Interactive Animated Color Bends Background System
   Slow-motion deep dark & dark red undulating chromatic wave surface
   Silky-smooth 60fps Canvas render with low CPU usage
*/

export function initColorBends() {
  const canvas = document.getElementById('color-bends-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let time = 0;

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * Math.min(window.devicePixelRatio || 1, 2);
    canvas.height = height * Math.min(window.devicePixelRatio || 1, 2);
    ctx.scale(Math.min(window.devicePixelRatio || 1, 2), Math.min(window.devicePixelRatio || 1, 2));
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Slow-motion wave ribbon configurations with deep dark & dark red tones
  const waves = [
    {
      speed: 0.00032,
      frequency: 0.0014,
      amplitude: 150,
      yOffset: 0.22,
      colors: ['rgba(220, 38, 38, 0.16)', 'rgba(153, 27, 27, 0.10)', 'rgba(0, 0, 0, 0.0)'],
      rotation: -0.14
    },
    {
      speed: 0.00024,
      frequency: 0.0011,
      amplitude: 190,
      yOffset: 0.46,
      colors: ['rgba(185, 28, 28, 0.18)', 'rgba(127, 29, 29, 0.12)', 'rgba(0, 0, 0, 0.0)'],
      rotation: 0.11
    },
    {
      speed: 0.00038,
      frequency: 0.0016,
      amplitude: 170,
      yOffset: 0.68,
      colors: ['rgba(153, 27, 27, 0.15)', 'rgba(88, 12, 28, 0.12)', 'rgba(0, 0, 0, 0.0)'],
      rotation: -0.07
    },
    {
      speed: 0.00020,
      frequency: 0.0009,
      amplitude: 220,
      yOffset: 0.86,
      colors: ['rgba(185, 28, 28, 0.14)', 'rgba(69, 10, 20, 0.10)', 'rgba(0, 0, 0, 0.0)'],
      rotation: 0.16
    }
  ];

  function render() {
    if (!ctx) return;

    // Clear with pitch black base
    ctx.clearRect(0, 0, width, height);

    // Deep dark background
    ctx.fillStyle = '#020204';
    ctx.fillRect(0, 0, width, height);

    // Render each undulating dark red ribbon
    waves.forEach((wave, idx) => {
      ctx.save();
      
      // Shift origin for rotation
      const cx = width / 2;
      const cy = height * wave.yOffset;
      ctx.translate(cx, cy);
      ctx.rotate(wave.rotation);
      ctx.translate(-cx, -cy);

      ctx.beginPath();

      const step = 20;
      const points = [];
      const baseY = height * wave.yOffset;

      for (let x = -100; x <= width + 100; x += step) {
        const angle = x * wave.frequency + time * wave.speed * 60 + idx * 1.5;
        const y = baseY + 
          Math.sin(angle) * wave.amplitude * 0.7 + 
          Math.cos(angle * 0.5 + time * 0.00025) * wave.amplitude * 0.5;
        points.push({ x, y });
      }

      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const xc = (points[i - 1].x + points[i].x) / 2;
          const yc = (points[i - 1].y + points[i].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.lineTo(width + 100, height + 250);
        ctx.lineTo(-100, height + 250);
        ctx.closePath();

        // Create dark red chromatic gradient
        const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, width, baseY + wave.amplitude * 2);
        grad.addColorStop(0, wave.colors[0]);
        grad.addColorStop(0.5, wave.colors[1]);
        grad.addColorStop(1, wave.colors[2]);

        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.restore();
    });

    if (!prefersReducedMotion) {
      time += 1;
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Handle visibility change to save CPU when tab is inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  render();
}
