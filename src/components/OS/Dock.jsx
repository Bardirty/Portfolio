import React from "react";
import { useUIStore } from "../../store/uiStore";
import "./Dock.css";

import iconAbout from "../../assets/icons/about.svg";
import iconGamepad from "../../assets/icons/gamepad.svg";
import iconFloppy from "../../assets/icons/floppy.svg";

export default function Dock() {
  const setActiveApp = useUIStore((s) => s.setActiveApp);
  const active = useUIStore((s) => s.activeApp);

  const apps = [
    { id: "about", label: "About", icon: iconAbout },
    { id: "games", label: "Games", icon: iconGamepad },
    { id: "additive", label: "Additive", icon: iconFloppy },
  ];

  return (
    <div className="dock" role="toolbar" aria-label="Dock">
      {apps.map((app) => (
        <div
          key={app.id}
          className={`dock-icon ${active === app.id ? "active" : ""}`}
          data-app={app.id}
          onClick={() => setActiveApp(app.id)}
          role="button"
          tabIndex={0}
        >
          <img src={app.icon} alt={app.label} className="dock-svg" />
          <div className="dock-label">{app.label}</div>
        </div>
      ))}
    </div>
  );
}
