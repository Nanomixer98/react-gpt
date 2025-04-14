import { ImageToTextTs } from '../../../interfaces';

export const imageExplanationUseCase = async (
  imageFile: File,
  prompt?: string
) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    if (prompt) {
      formData.append('prompt', prompt);
    }

    const res = await fetch(
      `${import.meta.env.VITE_GTP_API}/extract-text-from-image`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const data: ImageToTextTs = await res.json();

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
      message: 'Text cannnot be generated',
    };
  }
};
