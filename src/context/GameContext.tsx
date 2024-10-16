"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface GameContextProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  loading: boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    if (savedPlayerName) setPlayerName(savedPlayerName);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (playerName) {
      localStorage.setItem("playerName", playerName);
    }
  }, [playerName]);

  return (
    <GameContext.Provider
      value={{
        playerName,
        loading,
        setPlayerName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export { GameContext, GameProvider, useGame };
