import { useRef, useState } from 'react';
import { translateStreamUseCase } from '../../../core/use-cases';
import {
  GptMessage,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader,
} from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'francés', text: 'Francés' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' },
];

export const TranslatePage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    const newMessage = `Traducción a ${selectedOption}: ${text}`;
    setMessage((prevMsgs) => [...prevMsgs, { text: newMessage, isGpt: false }]);

    const stream = translateStreamUseCase(
      text,
      selectedOption,
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
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="¿Con que traducción te puedo ayudar?" />

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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aqui tu mensaje..."
        options={languages}
      />
    </div>
  );
};
