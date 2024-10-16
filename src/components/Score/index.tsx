import { ScoreProps } from "@/types/score";
import Text from "../Text";

const Score: React.FC<ScoreProps> = ({ matches, errors }) => {
  return (
    <Text
      text={`Aciertos: ${matches} - Errores: ${errors}`}
      type="text"
      size="3xl"
    />
  );
};

export default Score;
