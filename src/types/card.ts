export interface CardType {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface CardProps {
  card: CardType;
  onClick: () => void;
}