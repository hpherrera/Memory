import { renderHook, act, waitFor } from "@testing-library/react";
import useMemoryGame from "../useMemoryGame";

describe("useMemoryGame", () => {
  test("should generate cards based on imageCount", async () => {
    const { result } = renderHook(() => useMemoryGame());

    await waitFor(() => {
      expect(result.current.cards.length).toBeGreaterThan(0);
    });
  });

  test("should flip a card and check for match", async () => {
    const { result } = renderHook(() => useMemoryGame());

    await waitFor(() => {
      expect(result.current.cards.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.flipCard(0);
    });

    expect(result.current.flippedCards.length).toBe(1);
    expect(result.current.errors).toBe(0);
  });

  test("should increment errors when cards do not match", async () => {
    const { result } = renderHook(() => useMemoryGame());

    await waitFor(() => {
      expect(result.current.cards.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(1);
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    expect(result.current.errors).toBe(1);
  });

  test("should increment matches when cards match", async () => {
    const { result } = renderHook(() => useMemoryGame());

    await waitFor(() => {
      expect(result.current.cards.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(0);
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    expect(result.current.matches).toBe(1);
  });
});
