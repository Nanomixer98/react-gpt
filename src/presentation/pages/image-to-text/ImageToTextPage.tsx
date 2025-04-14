import { useState } from 'react';
import { imageExplanationUseCase } from '../../../core/use-cases/text/imageExplanation.use-case';
import {
  GptMessage,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader,
} from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ImageToTextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const resp = await imageExplanationUseCase(audioFile, text);
    setIsLoading(false);

    if (!resp.ok) return;

    setMessage((prev) => [...prev, { isGpt: true, text: resp.data!.msg }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Hola! Sube una imagen y te explicaré que es, o si tienes dudas sobre tu imagen, te responderé con una explicación" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage
                key={index}
                text={message.text || 'Transcribe el audio'}
              />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aqui tu mensaje..."
        accept="image/*"
      />
    </div>
  );
};
