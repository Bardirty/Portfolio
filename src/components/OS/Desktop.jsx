import React from "react";
import WindowManager from "./windows/WindowManager";
import SceneRoot from "../../three/SceneRoot";
import MusicPlayer from "./MusicPlayer";
import Dock from "./Dock";

export default function Desktop() {
  return (
    <div style={styles.desktop}>
      <div style={styles.topbar}>BardirtyOS v2.1b</div>

      <div style={styles.branding}>BARDIRTY’S PORTFOLIO</div>

      <WindowManager />
      <SceneRoot />
      <MusicPlayer />
      <Dock />
    </div>
  );
}

const styles = {
  desktop: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100vw",
    height: "100dvh",

    zIndex: 5,
    pointerEvents: "auto",
    color: "white",
    fontFamily: "monospace",
  },

  topbar: {
    position: "absolute",
    top: "calc(env(safe-area-inset-top) + 8px)",
    left: 14,

    opacity: 0.5,
    fontSize: "12px",

    pointerEvents: "none",
    userSelect: "none",
  },

  branding: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    fontSize: "clamp(26px, 8vw, 72px)",
    letterSpacing: "clamp(2px, 1.8vw, 8px)",
    fontWeight: "bold",
    textTransform: "uppercase",

    opacity: 0.06,
    textAlign: "center",

    pointerEvents: "none",
    userSelect: "none",

    whiteSpace: "normal",
    maxWidth: "90vw",

    textShadow: "0 0 20px rgba(255,255,255,0.12)",
  },
};
