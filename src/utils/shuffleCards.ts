import _ from 'lodash';

export const shuffleCards = (cards: any[]) => {
  return _.shuffle(
    cards.map((card, index) => ({
      id: index,
      imageUrl: card.url,
      isFlipped: false,
      isMatched: false,
    }))
  );
};