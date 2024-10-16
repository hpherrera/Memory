import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Game from "../page";
import { GameProvider } from "@/context/GameContext";
import useMemoryGame from "@/hooks/useMemoryGame";

jest.mock("@/hooks/useMemoryGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Game Component", () => {
  beforeEach(() => {
    (useMemoryGame as jest.Mock).mockReturnValue({
      cards: [
        { id: 1, isFlipped: false, isMatched: false },
        { id: 2, isFlipped: false, isMatched: false },
      ],
      errors: 0,
      matches: 0,
      flipCard: jest.fn(),
      flippedCards: [],
    });
  });

  test("should show input to enter player name initially", () => {
    render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    const input = screen.getByPlaceholderText("Ingresa tu nombre");
    expect(input).toBeInTheDocument();
  });

  test("should start the game after entering player name", () => {
    render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    const input = screen.getByPlaceholderText("Ingresa tu nombre");
    fireEvent.change(input, { target: { value: "Player 1" } });

    const button = screen.getByText("Play");
    fireEvent.click(button);

    const playerName = screen.getByText("Jugador: Player 1");
    expect(playerName).toBeInTheDocument();
  });

  test("should block the board after flipping two cards", async () => {
    render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    const cards = screen.getAllByTestId("card");
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      expect(cards[0]).toHaveClass("[perspective:1000px]");
      expect(cards[1]).toHaveClass("[perspective:1000px]");
    });
  });

  test("should show game completion modal when all matches are found", async () => {
    (useMemoryGame as jest.Mock).mockReturnValue({
      cards: [
        { id: 1, isFlipped: true, isMatched: true },
        { id: 2, isFlipped: true, isMatched: true },
      ],
      errors: 0,
      matches: 1,
      flipCard: jest.fn(),
      flippedCards: [],
    });

    render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    const modalTitle = await waitFor(() =>
      screen.getByText(/¡felicidades por completar el juego! 🎉/i)
    );

    expect(modalTitle).toBeInTheDocument();

    const acceptButton = screen.getByRole("button", { name: /aceptar/i });
    expect(acceptButton).toBeInTheDocument();
  });
});
