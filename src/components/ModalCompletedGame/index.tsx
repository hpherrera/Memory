import { Button, Modal } from "antd";

import Text from "../Text";

const ModalCompletedGame: React.FC = () => {
  const renderTitle = () => (
    <Text
      text="¡Felicidades por completar el juego! 🎉"
      type="text"
      size="2xl"
    />
  );

  return (
    <Modal title={renderTitle()} open={true} footer={null} closable={false}>
      <div className="flex flex-col text-center space-y-8">
        <Text
          text="Has demostrado habilidad, perseverancia y determinación. ¡Cada desafío fue una prueba, y lograste superarlos todos! 👏"
          type="text"
          size="2xl"
        />
        <Button
          type="primary"
          onClick={() => window.location.reload()}
          className="font-bebas text-xl h-12"
          size="large"
        >
          Aceptar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCompletedGame;
