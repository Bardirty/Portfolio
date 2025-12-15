import React, { useEffect, useRef } from "react";
import { useUIStore } from "../../store/uiStore";
import startupSound from "../../assets/sounds/startup.mp3";
import "./intro.css";

export default function IntroScreen() {
  const setIntroShown = useUIStore((s) => s.setIntroShown);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    // показать интро
    setTimeout(() => {
      wrapper?.classList.add("visible");
    }, 50);

    // 🔊 попытка автозапуска звука
    try {
      const audio = new Audio(startupSound);
      audio.volume = 0.6;
      audio.play().catch(() => {
        // ❗ браузер заблокировал — просто игнорируем
      });
    } catch {}

    // выход
    setTimeout(() => {
      wrapper?.classList.add("exit");
    }, 2600);

    // завершение интро
    setTimeout(() => {
      setIntroShown();
    }, 3600);
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
