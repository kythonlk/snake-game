"use client";

import React, { useState, useEffect } from "react";

export default function FPS() {
  const [fps, setFps] = useState<number>(0);

  useEffect(() => {
    let lTFrame: number = 0;
    let Cframe: number = 0;
    let time: number = 0;

    const updateStats = () => {
      const now: number = performance.now();
      const delta = now - lTFrame;
      Cframe++;
      time += delta;

      if (time >= 1000) {
        setFps(Cframe);
        Cframe = 0;
        time = 0;
      }

      lTFrame = now;
      requestAnimationFrame(updateStats);
    };

    updateStats();

  }, []);
  const memU = Math.round(window.performance?.memory?.usedJSHeapSize / 1024);

  return (
    <div className="absolute top-0 left-0 p-4 bg-white/50 text-black">
      <h1>FPS: {fps}</h1>
      <h5>MEM: {memU} KB</h5>
    </div>
  );
};
