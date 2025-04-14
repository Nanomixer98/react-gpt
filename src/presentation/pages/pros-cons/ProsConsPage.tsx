import { useEffect, useRef, useState } from 'react';
import { prosConsUseCase } from '../../../core/use-cases';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const { ok, message, errors } = await prosConsUseCase(text);
    if (!ok) {
      setMessage((prevMsgs) => [
        ...prevMsgs,
        { text: 'No se pudo realizar la comparación', isGpt: true },
      ]);
    }
    setMessage((prevMsgs) => [
      ...prevMsgs,
      {
        text: message,
        isGpt: true,
        info: { errors: errors, message: message },
      },
    ]);

    setIsLoading(false);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="chat-container">
      <div ref={chatContainerRef} className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Puedes escribir lo que sea que quieras que compare y te daré consejos en base a mis conocimientos" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
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
