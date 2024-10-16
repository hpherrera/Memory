import { Button, Input, Modal } from "antd";

import Text from "../Text";
import { ModalProps } from "@/types/modal";

const ModalAddPlayer: React.FC<ModalProps> = ({
  setPlayer,
  player,
  handlePlayerName,
}) => {
  const renderTitle = () => (
    <Text text="Ingresa tu nombre" type="text" size="2xl" />
  );

  return (
    <Modal title={renderTitle()} open={true} footer={null} closable={false}>
      <div className="flex flex-col text-center">
        <Input
          type="text"
          placeholder="Ingresa tu nombre"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="border border-gray-300 p-2 mb-4 rounded-md h-12 font-bebas text-xl"
          size="large"
        />
        <Button
          type="primary"
          onClick={handlePlayerName}
          className="font-bebas text-xl h-12"
          size="large"
        >
          Play
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAddPlayer;
