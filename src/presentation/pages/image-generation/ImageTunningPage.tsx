import { useState } from 'react';
import {
  imageGenerationUseCase,
  imageVariation,
} from '../../../core/use-cases';
import {
  GptMessage,
  // GptMessageImage,
  GptMessageSelectableImage,
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

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([
    {
      isGpt: true,
      text: 'Imagen base',
      info: {
        altText: 'Imagen base',
        imageUrl: 'http://localhost:3000/gpt/image-generation/keyboard.png',
      },
    },
  ]);

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const resp = await imageVariation(originalImageAndMask.original);
    setIsLoading(false);

    if (!resp) return;

    setMessage((prevMsgs) => [
      ...prevMsgs,
      {
        text: 'Variación generada',
        isGpt: true,
        info: {
          imageUrl: resp.url,
          altText: resp.altText,
        },
      },
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const { original, mask } = originalImageAndMask;
    const imageInfo = await imageGenerationUseCase(text, original, mask);
    setIsLoading(false);

    if (!imageInfo) {
      setMessage((prevMsgs) => [
        ...prevMsgs,
        { text: 'No se pudo generar la imagen', isGpt: true },
      ]);
      return;
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

  return (
    <>
      {originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editando</span>
          <img
            src={originalImageAndMask.mask ?? originalImageAndMask.original}
            alt="Imagen original"
            className="border rounded-xl w-36 h-36 object-contain"
          />
          <button
            onClick={handleVariation}
            className="btn-primary mt-2 cursor-pointer"
          >
            Generar variación
          </button>
        </div>
      )}

      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Wellcome */}
            <GptMessage text="¿Qué imagen deseas generar?" />

            {messages.map((message, index) =>
              message.isGpt ? (
                !message.info ? (
                  <GptMessage key={index} text={message.text} />
                ) : (
                  // <GptMessageImage
                  <GptMessageSelectableImage
                    key={index}
                    imageUrl={message.info!.imageUrl}
                    altText={message.info!.altText}
                    onImageSelected={(maskImageUrl) =>
                      setOriginalImageAndMask({
                        original: message.info?.imageUrl,
                        mask: maskImageUrl,
                      })
                    }
                  />
                )
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
    </>
  );
};
