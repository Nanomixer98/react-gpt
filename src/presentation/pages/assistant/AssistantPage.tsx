import { useEffect, useState } from 'react';
import {
  createThreadUseCase,
  postQuestionUseCase,
} from '../../../core/use-cases';
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

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>();

  // Get thread, if not exist create it
  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase().then((res) => {
        setThreadId(res.id);
        localStorage.setItem('threadId', res.id!);
      });
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      setMessage((prevMsgs) => [
        ...prevMsgs,
        { text: `Número de thread: ${threadId}`, isGpt: true },
      ]);
    }
  }, [threadId]);

  const handlePost = async (text: string) => {
    if (!threadId) return;

    setIsLoading(true);
    setMessage((prevMsgs) => [...prevMsgs, { text, isGpt: false }]);

    const res = await postQuestionUseCase(threadId, text);

    setMessage((prevMsgs) => [
      ...prevMsgs,
      ...res.replies!.map((reply) => ({
        text: reply.content.join(''),
        isGpt: reply.role === 'assistant',
      })),
    ]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Wellcome */}
          <GptMessage text="Hola, soy Sam ¿en que puedo ayudarte?" />

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
