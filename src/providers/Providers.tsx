"use client";

import { GameProvider } from "@/context/GameContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <GameProvider>{children}</GameProvider>;
};

export default Providers;
