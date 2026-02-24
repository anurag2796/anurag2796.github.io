import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.4 + 0.2,
        speed: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle = (Math.sin(t * star.speed + star.phase) + 1) / 2;
        const alpha = 0.25 + twinkle * 0.75;
        const r = star.size * (0.7 + twinkle * 0.5);

        // Star glow for bigger stars
        if (star.size > 1.0) {
          const grad = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, r * 4
          );
          grad.addColorStop(0, `rgba(180, 220, 255, ${alpha * 0.3})`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(star.x, star.y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${180 + Math.floor(twinkle * 75)}, ${210 + Math.floor(twinkle * 45)}, 255, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
