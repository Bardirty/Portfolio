import React, { useState, useEffect } from "react";
import BaseWindow from "./BaseWindow";
import { useUIStore } from "../../../store/uiStore";
import { APP_DEFS } from "../../apps/appDefs";

function getIconCenter(appId) {
  const el = document.querySelector(`.dock-icon[data-app="${appId}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();

  return {
    x: r.left + r.width / 2 + window.scrollX,
    y: r.top + r.height / 2 + window.scrollY,
  };
}

export default function WindowManager() {
  const activeApp = useUIStore((s) => s.activeApp);
  const setActiveApp = useUIStore((s) => s.setActiveApp);

  const [windows, setWindows] = useState([]);

  const bringToFront = (id) => {
    setWindows((prev) => {
      const top = Math.max(...prev.map((w) => w.z), 0);
      return prev.map((w) =>
        w.id === id ? { ...w, z: top + 1 } : w
      );
    });
  };

  useEffect(() => {
    if (!activeApp) return;

    const def = APP_DEFS[activeApp];
    if (!def) return;

    const spawn = getIconCenter(def.id);

    setWindows((prev) => {
      const exists = prev.find((w) => w.id === def.id);

      if (exists) {
        return prev.map((w) =>
          w.id === def.id
            ? { ...w, minimized: false, z: Math.max(...prev.map((p) => p.z)) + 1 }
            : w
        );
      }

      const defaultW = 680;
      const defaultH = 420;

      const newWin = {
        id: def.id,
        title: def.title,
        minimized: false,
        maximized: false,
        z: Math.max(...prev.map((p) => p.z), 0) + 1,
        pos: {
          left: window.innerWidth / 2 - defaultW / 2,
          top: window.innerHeight * 0.18,
        },
        size: { w: defaultW, h: defaultH },
        spawnPoint: spawn,
      };

      return [...prev, newWin];
    });

    setActiveApp(null);
  }, [activeApp, setActiveApp]);

  const closeWindow = (id) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));

  const minimizeWindow = (id) =>
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w
      )
    );

  const maximizeWindow = (id) =>
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    );

  const updateWindowState = (id, pos, size) =>
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, pos, size } : w
      )
    );

  return (
    <>
      {windows
        .sort((a, b) => a.z - b.z)
        .map((w) => {
          const Content = APP_DEFS[w.id].content;

          return (
            <BaseWindow
              key={w.id}
              id={w.id}
              title={w.title}
              zIndex={w.z}
              minimized={w.minimized}
              maximized={w.maximized}
              spawnPoint={w.spawnPoint}
              pos={w.pos}
              size={w.size}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onFocus={bringToFront}
              onRequestSaveState={updateWindowState}
            >
              <Content />
            </BaseWindow>
          );
        })}
    </>
  );
}
