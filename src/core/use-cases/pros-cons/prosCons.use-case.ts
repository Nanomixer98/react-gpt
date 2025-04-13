import type { ProsConsResponse } from '../../interfaces';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_GTP_API}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const data: ProsConsResponse = await res.json();

    return {
      ok: true,
      message: data.content,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      errors: [],
      message: 'Text cannnot be generated',
    };
  }
};
