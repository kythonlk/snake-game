"use client";

import FPS from "@/components/fps";
import Bord from "../components/bord";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Bord />
      <FPS />
    </div>
  );
}
