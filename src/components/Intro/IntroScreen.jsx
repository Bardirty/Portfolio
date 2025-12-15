import React, { useEffect, useRef } from "react";
import { useUIStore } from "../../store/uiStore";
import startupSound from "../../assets/sounds/startup.mp3";
import "./intro.css";

export default function IntroScreen() {
  const setIntroShown = useUIStore((s) => s.setIntroShown);
  const wrapperRef = useRef(null);
  const timeouts = useRef([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    timeouts.current.push(
      setTimeout(() => {
        wrapper?.classList.add("visible");
      }, 50)
    );

    try {
      const audio = new Audio(startupSound);
      audio.volume = 0;
      audio.play().catch(() => {});
      let v = 0;
      const fade = setInterval(() => {
        v += 0.04;
        audio.volume = Math.min(v, 0.6);
        if (v >= 0.6) clearInterval(fade);
      }, 70);
    } catch {}

    timeouts.current.push(
      setTimeout(() => {
        wrapper?.classList.add("exit");
      }, 2600)
    );

    timeouts.current.push(
      setTimeout(() => {
        setIntroShown();
      }, 3600)
    );
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
