import React from "react";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 2, 3]} intensity={0.9} />
    </>
  );
}
