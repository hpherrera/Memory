import { Typography } from "antd";

import { TextProps } from "@/types/text";

const Text: React.FC<TextProps> = ({ text, type, size }) => {
  const { Title, Paragraph, Text } = Typography;
  const textClass = `font-bebas text-${size}`;

  const renderText = () => {
    switch (type) {
      case "title":
        return <Title className={textClass}>{text}</Title>;
      case "paragraph":
        return <Paragraph className={textClass}>{text}</Paragraph>;
      default:
        return <Text className="font-bebas text-3xl">{text}</Text>;
    }
  };

  return renderText();
};

export default Text;
