import { useState, useEffect, useCallback } from "react";
import _ from 'lodash';

import { getImages } from "@/services/Content";
import { CardType } from "@/types/card";
import { getRandomImages } from "@/utils/randomImages";
import { shuffleCards } from "@/utils/shuffleCards";

const useMemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [errors, setErrors] = useState(0);
  const [matches, setMatches] = useState(0);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);

  const fetchImages = async () => {
    try {
      const { data } = await getImages();
      const selectedImages = getRandomImages(data);
      const shuffledCards = shuffleCards([
        ...selectedImages,
        ...selectedImages,
      ]);

      setCards(shuffledCards);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const flipCard = (id: number) => {
    const updatedCards = _.map(cards, (card) =>
      card.id === id ? _.assign({}, card, { isFlipped: true }) : card
    );

    setFlippedCards((prev) => [...prev, _.find(updatedCards, { id })!]);
    setCards(updatedCards);
  };

  const checkMatch = useCallback(() => {
    if (flippedCards.length === 2) {
      if (flippedCards[0].imageUrl === flippedCards[1].imageUrl) {
        setCards((prev) =>
          _.map(prev, (card) =>
            card.imageUrl === flippedCards[0].imageUrl
              ? _.assign({}, card, { isMatched: true })
              : card
          )
        );
        setMatches((prev) => prev + 1);

      } else {
        setErrors((prev) => prev + 1);

        setTimeout(() => {
          setCards((prev) =>
            _.map(prev, (card) =>
              card.isFlipped && !card.isMatched
                ? _.assign({}, card, { isFlipped: false })
                : card
            )
          );
        }, 800);
      }
      
      setFlippedCards([]);
    }
  }, [flippedCards, setCards, setMatches, setErrors]);

  useEffect(() => {
    checkMatch();
  }, [flippedCards, checkMatch]);

  return {
    cards,
    errors,
    matches,
    flipCard,
    setCards,
    setErrors,
    setMatches,
    flippedCards,
  };
};

export default useMemoryGame;
