import { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader,
} from '../../components';
import { audioToTextUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const resp = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);

    if (!resp.ok) return;

    const gptMessagge = `
## Transcripción de audio
__Duración:__ ${Math.round(resp.data!.duration)}s

### El texto es:
__Texto:__ ${resp.data!.text}
`;

    setMessage((prev) => [...prev, { isGpt: true, text: gptMessagge }]);

    for (const segment of resp.data!.segments) {
      const segmentMessage = `
__De ${Math.round(segment.start)}s a - ${Math.round(segment.end)}s:__
 ${segment.text}
`;
      setMessage((prev) => [...prev, { isGpt: true, text: segmentMessage }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Hola, que texto a partir de un audio quieres generar hoy?" />

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
        accept="audio/*"
      />
    </div>
  );
};
