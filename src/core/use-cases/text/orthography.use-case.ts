import type { OrthographyResponse } from '../../../interfaces';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_GTP_API}/orthography-check`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const data: OrthographyResponse = await res.json();

    return {
      ok: true,
      ...data,
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
