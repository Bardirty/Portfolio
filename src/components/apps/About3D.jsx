import React, { useEffect, useRef } from "react";

export default function About3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    let t = 0;

    const draw = () => {
      t += 0.01;

      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "rgba(15, 25, 55, 0.25)");
      bg.addColorStop(1, "rgba(10, 18, 40, 0.35)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const bands = 5;

      for (let i = 0; i < bands; i++) {
        const yBase = (h / bands) * i + 40;
        const amplitude = 40 + i * 12;
        const speed = 0.6 + i * 0.12;

        ctx.beginPath();

        for (let x = 0; x <= w; x += 12) {
          const wave =
            Math.sin((x * 0.004) + t * speed) * amplitude +
            Math.cos((x * 0.002 + t * (speed * 0.6))) * (amplitude * 0.4);

          const y = yBase + wave * 0.2;
          ctx.lineTo(x, y);
        }

        const hue = 215 + i * 4;
        const gradient = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude * 1.2);

        gradient.addColorStop(0, `hsla(${hue}, 65%, 72%, 0.10)`);
        gradient.addColorStop(0.5, `hsla(${hue + 8}, 70%, 65%, 0.12)`);
        gradient.addColorStop(1, `hsla(${hue + 15}, 75%, 60%, 0.10)`);

        ctx.fillStyle = gradient;
        ctx.strokeStyle = `hsla(${hue + 10}, 80%, 75%, 0.23)`;

        ctx.lineWidth = 2.2;
        ctx.shadowColor = `hsla(${hue + 15}, 80%, 75%, 0.55)`;
        ctx.shadowBlur = 18;

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.55,
        filter: "blur(1px)",
      }}
    />
  );
}
