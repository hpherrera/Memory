import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { GameProvider, useGame } from "../GameContext";
import "@testing-library/jest-dom";

const TestComponent = () => {
  const { playerName, setPlayerName } = useGame();

  return (
    <div>
      <span data-testid="player-name">{playerName}</span>
      <button onClick={() => setPlayerName("Test Player")}>
        Set Player Name
      </button>
    </div>
  );
};

describe("GameContext", () => {
  test("should provide default values", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    const playerName = screen.getByTestId("player-name");
    expect(playerName).toHaveTextContent("");
  });

  test("should update playerName when setPlayerName is called", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    const button = screen.getByText("Set Player Name");
    fireEvent.click(button);

    const playerName = screen.getByTestId("player-name");
    expect(playerName).toHaveTextContent("Test Player");
  });
});
