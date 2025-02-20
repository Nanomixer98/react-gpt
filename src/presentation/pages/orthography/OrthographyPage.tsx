import { useState } from 'react';
import { orthographyUseCase } from '../../../core/use-cases';
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);
    const { ok, message, userScore, errors } = await orthographyUseCase(text);
    if (!ok) {
      setMessage((prevMsgs) => [
        ...prevMsgs,
        { text: 'No se pudo realizar la correción', isGpt: true },
      ]);
    }
    setMessage((prevMsgs) => [
      ...prevMsgs,
      {
        text: message,
        isGpt: true,
        info: { userScore: userScore, errors: errors, message: message },
      },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Hola, ¿cómo estás?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage key={index} {...message.info!} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aqui tu mensaje..."
        disableCorrections
      />
    </div>
  );
};
