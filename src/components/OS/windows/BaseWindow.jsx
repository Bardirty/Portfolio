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
  spawnPoint,
  pos: initialPos,
  size: initialSize,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onRequestSaveState,
}) {
  const wndRef = useRef(null);
  const isMobile = useIsMobile();

  const [pos, setPos] = useState(initialPos);
  const [size, setSize] = useState(initialSize);

  const saved = useRef({ pos: initialPos, size: initialSize });

  useEffect(() => {
    if (isMobile) return;

    setPos(initialPos);
    setSize(initialSize);
    saved.current = { pos: initialPos, size: initialSize };

    if (!spawnPoint) return;

    const startLeft = spawnPoint.x - initialSize.w / 2;
    const startTop = spawnPoint.y - initialSize.h / 2;

    setPos({ left: startLeft, top: startTop });
    setSize({
      w: Math.max(60, Math.floor(initialSize.w * 0.12)),
      h: Math.max(36, Math.floor(initialSize.h * 0.12)),
    });

    requestAnimationFrame(() => {
      animateTo(
        {
          left: initialPos.left,
          top: initialPos.top,
          w: initialSize.w,
          h: initialSize.h,
        },
        360
      );
    });
  }, []);

  const animateTo = (target, duration = 320, cb) => {
    if (isMobile) return;

    const from = { left: pos.left, top: pos.top, w: size.w, h: size.h };
    const start = performance.now();

    const step = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      setPos({
        left: from.left + (target.left - from.left) * ease,
        top: from.top + (target.top - from.top) * ease,
      });
      setSize({
        w: from.w + (target.w - from.w) * ease,
        h: from.h + (target.h - from.h) * ease,
      });

      if (t < 1) requestAnimationFrame(step);
      else cb && cb();
    };

    requestAnimationFrame(step);
  };

  const handleClose = () => {
    if (isMobile || !spawnPoint) {
      onClose(id);
      return;
    }

    animateTo(
      {
        left: spawnPoint.x - size.w / 2,
        top: spawnPoint.y - size.h / 2,
        w: Math.max(20, Math.floor(size.w * 0.08)),
        h: Math.max(14, Math.floor(size.h * 0.08)),
      },
      280,
      () => onClose(id)
    );
  };

  const handleMaximize = () => {
    onMaximize(id);

    if (isMobile) return;

    if (!maximized) {
      saved.current = { pos, size };
      animateTo({
        left: window.innerWidth * 0.04,
        top: window.innerHeight * 0.06,
        w: window.innerWidth * 0.92,
        h: window.innerHeight * 0.82,
      });
    } else {
      const s = saved.current;
      animateTo({
        left: s.pos.left,
        top: s.pos.top,
        w: s.size.w,
        h: s.size.h,
      });
    }
  };

  useEffect(() => {
    if (isMobile || !maximized) return;

    animateTo({
      left: window.innerWidth * 0.04,
      top: window.innerHeight * 0.06,
      w: window.innerWidth * 0.92,
      h: window.innerHeight * 0.82,
    });
  }, [maximized]);
  return (
    <div
      ref={wndRef}
      className={`base-window ${maximized ? "maximized" : ""} ${
        minimized ? "minimized" : ""
      }`}
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
      <div className="window-header">
        <div className="controls">
          <button
            className="ctrl close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          />
          <button
            className="ctrl maximize"
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
          />
        </div>
        <div className="title" onDoubleClick={handleMaximize}>
          {title}
        </div>
      </div>

      <div className="window-body">{children}</div>
    </div>
  );
}
