import React from "react";

import { useEffect, useState } from "react";
import { useUIStore } from "../../store/uiStore";
import "./boot.css";

export default function BootSequence() {
  const setBootCompleted = useUIStore((s) => s.setBootCompleted);
  const [visibleText, setVisibleText] = useState("");

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
    async function startBoot() {
      let fullText = logo + "\n";
      setVisibleText(fullText);

      for (let i = 0; i < lines.length; i++) {
        fullText += lines[i] + "\n";
        setVisibleText(fullText);
        await new Promise((res) => setTimeout(res, 90));
      }

      await new Promise((res) => setTimeout(res, 600));

      document.getElementById("boot-screen").classList.add("hide");

      setTimeout(() => {
        setBootCompleted();
      }, 900);
    }

    startBoot();
  }, []);

  return (
    <div id="boot-screen" className="boot-wrapper">
      <pre id="boot-text" className="boot-text">
        {visibleText}
      </pre>
    </div>
  );
}
