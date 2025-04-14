import { useEffect, useRef, useState } from 'react';
import { imageGenerationUseCase } from '../../../core/use-cases';
import {
  GptMessage,
  GptMessageImage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    altText: string;
  };
}

export const ImageGenerationPage = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessage((prevMsgs) => [
        ...prevMsgs,
        { text: 'No se pudo generar la imagen', isGpt: true },
      ]);
    }

    setMessage((prevMsgs) => [
      ...prevMsgs,
      {
        text: text,
        isGpt: true,
        info: {
          imageUrl: imageInfo.url,
          altText: imageInfo.altText,
        },
      },
    ]);
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
          <GptMessage text="¿Qué imagen deseas generar?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageImage
                key={index}
                imageUrl={message.info!.imageUrl}
                altText={message.info!.altText}
              />
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
