import Markdown from 'react-markdown';

interface Props {
  text: string;
  audioUrl: string;
}

export const GptMessageAudio = ({ text, audioUrl }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black/25 pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>
          <audio controls src={audioUrl} className="w-full" autoPlay></audio>
        </div>
      </div>
    </div>
  );
};
