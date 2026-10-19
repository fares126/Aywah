import React, { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
  wobbleSpeed: number;
  wobbleDistance: number;
  initialX: number;
  time: number;
}

const HEART_COLORS = [
  'rgba(244, 63, 94, ',   // rose-500
  'rgba(225, 29, 72, ',   // rose-600
  'rgba(251, 113, 133, ', // rose-400
  'rgba(217, 70, 239, ',  // fuchsia-500
  'rgba(192, 38, 211, ',  // fuchsia-600
  'rgba(253, 164, 175, '  // rose-300
];

export const FloatingHeartsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const hearts: Heart[] = [];
    const maxHearts = Math.min(35, Math.floor(width / 35));

    // Draw heart path on canvas
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);
      context.fillStyle = `${color}${opacity})`;
      context.shadowColor = `${color}0.8)`;
      context.shadowBlur = size * 0.8;

      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(
        -size / 2,
        -size / 2,
        -size,
        topCurveHeight / 3,
        0,
        size
      );
      // top right curve
      context.bezierCurveTo(
        size,
        topCurveHeight / 3,
        size / 2,
        -size / 2,
        0,
        topCurveHeight
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    const createHeart = (initialBottom = false): Heart => {
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
      const size = Math.random() * 14 + 10;
      const x = Math.random() * width;
      const y = initialBottom ? height + Math.random() * 80 : Math.random() * height;

      return {
        x,
        y,
        initialX: x,
        size,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: (Math.random() - 0.5) * 40,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        fadeSpeed: (Math.random() - 0.5) * 0.005,
        color,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleDistance: Math.random() * 30 + 10,
        time: Math.random() * 100
      };
    };

    // Populate initial hearts
    for (let i = 0; i < maxHearts; i++) {
      hearts.push(createHeart(false));
    }

    // Interactive mouse / touch spawn
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (Math.random() < 0.25 && hearts.length < maxHearts + 12) {
        const miniHeart: Heart = {
          x: clientX + (Math.random() - 0.5) * 20,
          y: clientY + (Math.random() - 0.5) * 20,
          initialX: clientX,
          size: Math.random() * 10 + 8,
          speedY: Math.random() * 1.5 + 0.8,
          speedX: (Math.random() - 0.5) * 0.8,
          rotation: (Math.random() - 0.5) * 60,
          rotationSpeed: (Math.random() - 0.5) * 1.5,
          opacity: 0.8,
          fadeSpeed: -0.012,
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
          wobbleSpeed: 0.05,
          wobbleDistance: 15,
          time: 0
        };
        hearts.push(miniHeart);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep velvet background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0b0612');
      bgGrad.addColorStop(0.5, '#150821');
      bgGrad.addColorStop(1, '#0b0612');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Radial glow in upper center
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.25,
        10,
        width / 2,
        height * 0.25,
        width * 0.6
      );
      radialGlow.addColorStop(0, 'rgba(225, 29, 72, 0.12)');
      radialGlow.addColorStop(0.6, 'rgba(147, 51, 234, 0.04)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and draw hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.time += h.wobbleSpeed;
        h.y -= h.speedY;
        h.x = h.initialX + Math.sin(h.time) * h.wobbleDistance;
        h.rotation += h.rotationSpeed;
        h.opacity += h.fadeSpeed;

        if (h.opacity > 0.85) h.fadeSpeed = -Math.abs(h.fadeSpeed);
        if (h.opacity < 0.2 && h.fadeSpeed < 0) h.fadeSpeed = Math.abs(h.fadeSpeed);

        // Respawn or remove if out of bounds
        if (h.y < -h.size * 2 || h.opacity <= 0) {
          if (hearts.length > maxHearts) {
            hearts.splice(i, 1);
            continue;
          } else {
            hearts[i] = createHeart(true);
            continue;
          }
        }

        drawHeart(ctx, h.x, h.y, h.size, h.rotation, h.color, Math.max(0, h.opacity));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto -z-10 block w-full h-full"
    />
  );
};
