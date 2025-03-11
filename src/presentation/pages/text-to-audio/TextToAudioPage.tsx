import { useState } from 'react';
import { textToAudiUseCase } from '../../../core/use-cases';
import {
  GptMessage,
  GptMessageAudio,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader,
} from '../../components';

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);
  const disclaimer = `## ¿Qué audio quieres generar hoy?
  ### *Todo el audio generado es por IA*`;

  const voices = [
    { id: 'nova', text: 'Nova' },
    { id: 'alloy', text: 'Alloy' },
    { id: 'echo', text: 'Echo' },
    { id: 'fable', text: 'Fable' },
    { id: 'onyx', text: 'Onyx' },
    { id: 'shimmer', text: 'Shimmer' },
  ];

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessage((prevMsgs) => [
      ...prevMsgs,
      { text, isGpt: false, type: 'text' },
    ]);

    const { ok, message, audioUrl } = await textToAudiUseCase(
      text,
      selectedVoice
    );
    if (!ok) return;

    setMessage((prevMsgs) => [
      ...prevMsgs,
      {
        text: `*${selectedVoice}*: ${message}`,
        isGpt: true,
        type: 'audio',
        audio: audioUrl!,
      },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text={disclaimer} />

          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === 'text' ? (
                <GptMessage key={index} text={message.text} />
              ) : (
                <GptMessageAudio
                  key={index}
                  text={message.text}
                  audioUrl={message.audio}
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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aqui tu mensaje..."
        options={voices}
      />
    </div>
  );
};
