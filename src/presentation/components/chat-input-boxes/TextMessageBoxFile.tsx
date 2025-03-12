import { FormEvent, useRef, useState } from 'react';

interface Props {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (message.trim().length === 0) return;
    if (!selectedFile) return;
    onSendMessage(message, selectedFile);
    setMessage('');
    setSelectedFile(null);
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          className="flex-item-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
          type="button"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(event) => setSelectedFile(event.target.files?.item(0))}
        />
      </div>

      <div className="flex-auto">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
      </div>
      <div className="ml-4 flex-none">
        <button disabled={!selectedFile} className="btn-primary cursor-pointer">
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFile.name.substring(0, 10) + '...'}
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
