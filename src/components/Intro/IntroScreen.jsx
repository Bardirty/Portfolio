import React, { useEffect, useRef } from "react";
import { useUIStore } from "../../store/uiStore";
import startupSound from "../../assets/sounds/startup.mp3";
import "./intro.css";

let audioUnlocked = false;

export default function IntroScreen() {
  const setIntroShown = useUIStore((s) => s.setIntroShown);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    setTimeout(() => {
      wrapper?.classList.add("visible");
    }, 50);

    const unlockAudio = () => {
      if (audioUnlocked) return;
      audioUnlocked = true;

      const audio = new Audio(startupSound);
      audio.volume = 0.6;
      audio.play().catch(() => {});
      
      window.removeEventListener("pointerdown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);

    setTimeout(() => {
      wrapper?.classList.add("exit");
    }, 2600);

    setTimeout(() => {
      setIntroShown();
    }, 3600);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
    };
  }, [setIntroShown]);

  return (
    <div ref={wrapperRef} className="intro-wrapper">
      <div className="intro-core">
        <div className="intro-ring" />
        <div className="intro-logo">
          BARDIRTY<span className="thin">OS</span>
        </div>
        <div className="intro-sub">Firmware Interface</div>
      </div>
    </div>
  );
}
