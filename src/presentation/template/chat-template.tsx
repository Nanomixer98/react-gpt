import { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../components';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);
    // TODO: Send message to OpenAI Use Case
    // await new Promise((resolve) => setTimeout(resolve, 2000));
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
              <GptMessage key={index} text="Esto es OpenAPI" />
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
      />
    </div>
  );
};
