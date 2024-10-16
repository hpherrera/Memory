"use client";

import { useEffect, useState } from "react";

import Score from "@/components/Score/index";
import Card from "@/components/Card/index";

import { useGame } from "@/context/GameContext";
import useMemoryGame from "@/hooks/useMemoryGame";
import Text from "@/components/Text";
import ModalAddPlayer from "@/components/ModalAddPlayer";
import ModalCompletedGame from "@/components/ModalCompletedGame";

const Game: React.FC = () => {
  const [player, setPlayer] = useState<string>("");
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [completedGame, setCompletedGame] = useState(false);

  const { playerName, setPlayerName, loading } = useGame();
  const { cards, errors, flipCard, matches, flippedCards } = useMemoryGame();

  useEffect(() => {
    if (matches > 0 && matches === cards.length / 2) {
      setTimeout(() => {
        setCompletedGame(true);
      }, 800);
    }
  }, [matches, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsBoardLocked(true);
      setTimeout(() => {
        setIsBoardLocked(false);
      }, 1000);
    }
  }, [flippedCards]);

  const handlePlayerName = () => {
    if (player) {
      setPlayerName(player);
    } else {
      alert("Please enter your name");
    }
  };

  const renderAddPlayer = () => (
    <ModalAddPlayer
      player={player}
      setPlayer={setPlayer}
      handlePlayerName={handlePlayerName}
    />
  );

  const handleCardClick = (cardId: number) => {
    if (!isBoardLocked) {
      flipCard(cardId);
    }
  };

  const renderGame = () => (
    <div className="flex flex-col items-center space-y-16">
      <div className="flex flex-col text-center">
        <Text text={`Jugador: ${playerName}`} type="text" size="3xl" />
        <Score matches={matches} errors={errors} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 lg:gap-6 xl:gap-8 mt-5">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );

  const renderMessage = () => <ModalCompletedGame />;

  if (loading) {
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16 w-full h-full">
      <Text text="Memory Game" type="title" />
      {playerName ? renderGame() : renderAddPlayer()}
      {completedGame && renderMessage()}
    </div>
  );
};

export default Game;
