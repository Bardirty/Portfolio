import React from "react";
import { useUIStore } from "./store/uiStore";
import BootSequence from "./components/BIOS/BootSequence";
import IntroScreen from "./components/Intro/IntroScreen";
import Desktop from "./components/OS/Desktop";

import { Sound } from "./utils/sound";

export default function App() {
  const bootCompleted = useUIStore((state) => state.bootCompleted);
  const introShown = useUIStore((state) => state.introShown);

  return (
    <>
      {!bootCompleted && <BootSequence />}
      {bootCompleted && !introShown && <IntroScreen />}
      {bootCompleted && introShown && <Desktop />}
    </>
  );
}
