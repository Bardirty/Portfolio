import React, { useEffect, useState, useRef } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(
    localStorage.getItem("musicMuted") === "true"
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.12;
    audio.loop = true;

    if (!muted) {
      audio.play().catch((e) => {
        console.warn("Autoplay blocked:", e);
      });
    } else {
      audio.pause();
    }
  }, [muted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newState = !muted;
    setMuted(newState);
    localStorage.setItem("musicMuted", newState);

    // 🔑 ГАРАНТИЯ запуска после клика
    if (!newState) {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/ambient.mp3`}
      />
      <button className="music-toggle" onClick={toggleMute}>
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
