import { CardProps } from "@/types/card";

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      data-testid="card"
      className="group w-28 h-40 [perspective:1000px] hover:scale-105 hover:shadow-lg transition-all duration-500"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform rounded-md shadow-md border-gray-500 border-2 ${
          card.isFlipped || card.isMatched
            ? `[transform:rotateY(180deg)] [transform-style:preserve-3d] ${
                card.isMatched && "border-green-500"
              }`
            : ""
        }`}
      >
        <div className="absolute w-full h-full flex items-center justify-center rounded-md">
          <img
            className="w-full h-full object-cover rounded-md"
            src={card.imageUrl}
            alt="Animal"
          />
        </div>
        <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center [backface-visibility:hidden] rounded-md">
          <img
            className="w-full h-full object-contain object-center rounded-md"
            src="/images/incognito.png"
            alt="incognito"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
