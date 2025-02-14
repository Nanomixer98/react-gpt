import { GptMessage, MyMessage } from '../../components';

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Hola, ¿cómo estás?" />
          {/* MyMessage */}
          <MyMessage text="Estoy bien, ¿cómo estás?" />
          {/* GptMessage */}
          <GptMessage text="Todo cool" />
        </div>
      </div>
    </div>
  );
};
