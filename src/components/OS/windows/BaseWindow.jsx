import React, { useEffect, useRef, useState } from "react";
import "./BaseWindow.css";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

export default function BaseWindow({
  id,
  title,
  children,
  zIndex,
  minimized,
  maximized,
  pos: initialPos,
  size: initialSize,
  onClose,
  onMaximize,
  onFocus,
}) {
  const wndRef = useRef(null);
  const isMobile = useIsMobile();

  const [pos, setPos] = useState(initialPos);
  const [size, setSize] = useState(initialSize);

  // 🔑 сохраняем ТОЛЬКО размер перед maximize
  const savedSize = useRef(initialSize);

  /* =========================
     DRAG + INERTIA
  ========================= */

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const inertiaActive = useRef(false);

  const startDrag = (e) => {
    if (isMobile || maximized || minimized) return;

    dragging.current = true;
    inertiaActive.current = false;
    onFocus?.(id);

    const rect = wndRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = performance.now();

    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      if (!dragging.current) return;

      const now = performance.now();
      const dt = now - lastTime.current || 16;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      velocity.current = { x: dx / dt, y: dy / dt };

      setPos({
        left: e.clientX - dragOffset.current.x,
        top: e.clientY - dragOffset.current.y,
      });

      lastPos.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
    };

    const onUp = () => {
      if (!dragging.current) return;

      dragging.current = false;
      document.body.style.userSelect = "";

      inertiaActive.current = true;
      requestAnimationFrame(inertiaStep);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isMobile]);

  const inertiaStep = () => {
    if (!inertiaActive.current || isMobile) return;

    velocity.current.x *= 0.92;
    velocity.current.y *= 0.92;

    if (Math.hypot(velocity.current.x, velocity.current.y) < 0.002) {
      inertiaActive.current = false;
      return;
    }

    setPos((p) => ({
      left: p.left + velocity.current.x * 16,
      top: p.top + velocity.current.y * 16,
    }));

    requestAnimationFrame(inertiaStep);
  };

  /* =========================
     ANIMATE HELPER
  ========================= */

  const animateTo = (targetPos, targetSize, duration = 320) => {
    const fromPos = { ...pos };
    const fromSize = { ...size };
    const start = performance.now();

    const step = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      const w = fromSize.w + (targetSize.w - fromSize.w) * ease;
      const h = fromSize.h + (targetSize.h - fromSize.h) * ease;

      const cx =
        fromPos.left + fromSize.w / 2 +
        (targetPos.left + targetSize.w / 2 -
          (fromPos.left + fromSize.w / 2)) *
          ease;

      const cy =
        fromPos.top + fromSize.h / 2 +
        (targetPos.top + targetSize.h / 2 -
          (fromPos.top + fromSize.h / 2)) *
          ease;

      setSize({ w, h });
      setPos({ left: cx - w / 2, top: cy - h / 2 });

      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  /* =========================
     MAXIMIZE LOGIC (FIXED)
  ========================= */

  const handleMaximize = () => {
    onMaximize(id);
    if (isMobile) return;

    if (!maximized) {
      // 🔒 сохраняем ТОЛЬКО размер
      savedSize.current = size;

      animateTo(
        { left: 40, top: 40 },
        {
          w: window.innerWidth - 80,
          h: window.innerHeight - 120,
        },
        360
      );
    } else {
      // 🎯 restore size + CENTER SCREEN
      const w = savedSize.current.w;
      const h = savedSize.current.h;

      animateTo(
        {
          left: window.innerWidth / 2 - w / 2,
          top: window.innerHeight / 2 - h / 2,
        },
        { w, h },
        360
      );
    }
  };

  /* =========================
     CLOSE
  ========================= */

  const handleClose = () => {
    wndRef.current?.classList.add("closing");
    setTimeout(() => onClose(id), 280);
  };

  return (
    <div
      ref={wndRef}
      className={`base-window ${maximized ? "maximized" : ""}`}
      style={{
        zIndex,
        ...(isMobile
          ? {}
          : {
              left: pos.left,
              top: pos.top,
              width: size.w,
              height: size.h,
            }),
      }}
      onMouseDown={() => onFocus?.(id)}
    >
      <div
        className="window-header"
        onPointerDown={(e) => e.button === 0 && startDrag(e)}
      >
        <div className="controls">
          <button
            className="ctrl close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          />
          {!isMobile && (
            <button
              className="ctrl maximize"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
            />
          )}
        </div>

        <div className="title" onDoubleClick={handleMaximize}>
          {title}
        </div>
      </div>

      <div className="window-body">{children}</div>
    </div>
  );
}
