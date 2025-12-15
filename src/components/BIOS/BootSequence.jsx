import React, { useEffect, useState } from "react";
import { useUIStore } from "../../store/uiStore";
import "./boot.css";

export default function BootSequence() {
  const setBootCompleted = useUIStore((s) => s.setBootCompleted);

  const [visibleText, setVisibleText] = useState("");
  const [waitingInput, setWaitingInput] = useState(false);

  const logo = `
██████╗  █████╗ ██████╗ ██████╗ ██╗██████╗ ████████╗██╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝╚██╗ ██╔╝
██████╔╝███████║██████╔╝██║  ██║██║██████╔╝   ██║    ╚████╔╝ 
██╔══██╗██╔══██║██╔══██╗██║  ██║██║██╔══██╗   ██║     ╚██╔╝  
██████╔╝██║  ██║██║  ██║██████╔╝██║██║  ██║   ██║      ██║   
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   

       Bardirty Firmware Interface (BFI) v1.0
       © 2026 Danil Bardakov. All rights reserved.
`;

  const lines = [
    "CPU: Bardirty Core Duo 2.13 GHz",
    "Memory Test: 4096MB OK",
    "Storage: Virtual Disk 32GB",
    "Keyboard detected...",
    "Mouse detected...",
    "",
    "Detecting IDE Drives...",
    "  Primary Master: BardirtyOS.sys     OK",
    "  Primary Slave:  None",
    "  Secondary Master: Optical Drive (Virtual)   OK",
    "",
    "Loading Graphics Driver...",
    "Loading Audio Engine...",
    "Loading Input Manager...",
    "Booting BardirtyOS..."
  ];

  useEffect(() => {
    let cancelled = false;

    async function startBoot() {
      let text = logo + "\n";
      setVisibleText(text);

      for (let line of lines) {
        if (cancelled) return;
        text += line + "\n";
        setVisibleText(text);
        await new Promise((r) => setTimeout(r, 90));
      }

      await new Promise((r) => setTimeout(r, 500));

      setVisibleText(
        (t) =>
          t +
          "\n\nPress any key to continue..."
      );

      setWaitingInput(true);
    }

    startBoot();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!waitingInput) return;

    const proceed = () => {
      document
        .getElementById("boot-screen")
        ?.classList.add("hide");

      setTimeout(() => {
        setBootCompleted();
      }, 800);
    };

    window.addEventListener("keydown", proceed, { once: true });
    window.addEventListener("pointerdown", proceed, { once: true });

    return () => {
      window.removeEventListener("keydown", proceed);
      window.removeEventListener("pointerdown", proceed);
    };
  }, [waitingInput, setBootCompleted]);

  return (
    <div
      id="boot-screen"
      className={`boot-wrapper ${waitingInput ? "interactive" : ""}`}
    >
      <pre className="boot-text">{visibleText}</pre>
    </div>
  );
}
