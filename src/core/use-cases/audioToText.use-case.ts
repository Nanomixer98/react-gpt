import { AudioToTextResponse } from '../../interfaces';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) {
      formData.append('prompt', prompt);
    }

    const res = await fetch(`${import.meta.env.VITE_GTP_API}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Something went wrong');

    const data: AudioToTextResponse = await res.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Text cannnot be transcripted',
    };
  }
};
