import { useRef, useState } from 'react';
import { prosConsStreamGeneratorUseCase } from '../../../core/use-cases';
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

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const stream = prosConsStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);
    setMessage((prevMsgs) => [...prevMsgs, { text: '', isGpt: true }]);
    for await (const text of stream) {
      setMessage((prevMsgs) => {
        const newMessages = [...prevMsgs];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }

    isRunning.current = false;

    // const reader = await prosConsStreamUseCase(text);
    // setIsLoading(false);

    // if (!reader) return alert('No se pudo generar el reader');
    // // Generate las message
    // const decoder = new TextDecoder();
    // let message = '';
    // setMessage((prevMsgs) => [...prevMsgs, { text: message, isGpt: true }]);
    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) break;

    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   message += decodedChunk;
    //   setMessage((prevMsgs) => {
    //     const newMessages = [...prevMsgs];
    //     newMessages[newMessages.length - 1].text = message;
    //     return newMessages;
    //   });
    // }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Hola, ¿Qué deseas comparar?" />

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
