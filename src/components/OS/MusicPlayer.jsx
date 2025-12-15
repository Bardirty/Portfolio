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
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [muted]);

  const toggleMute = () => {
    const newState = !muted;
    setMuted(newState);
    localStorage.setItem("musicMuted", newState);
  };

  return (
    <>
      <audio src={`${import.meta.env.BASE_URL}audio/ambient.mp3`} />
      <button className="music-toggle" onClick={toggleMute}>
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
