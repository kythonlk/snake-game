"use client";

import React, { useEffect, useState } from "react";

const FPS = () => {
  const [fps, setFps] = useState(0);
  const [memU, setMemU] = useState(0);

  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;

    const calculateStats = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastFrameTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = now;

        if (typeof window !== "undefined" && window.performance?.memory) {
          const usedMemoryKB = Math.round(window.performance?.memory.usedJSHeapSize / 1024);
          setMemU(usedMemoryKB);
        }
      }

      requestAnimationFrame(calculateStats);
    };

    calculateStats();
  }, []);

  return (
    <div className="absolute top-0 left-0 p-4 bg-white/50 text-black">
      <h1>FPS: {fps}</h1>
      <h5>MEM: {memU > 0 ? `${memU} KB` : "N/A"}</h5>
    </div>
  );
};

export default FPS;
