import { QuestionResponse } from '../../../interfaces';

export const postQuestionUseCase = async (
  threadId: string,
  question: string
) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_ASSISTANT_API}/user-question`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, question }),
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const replies = (await res.json()) as QuestionResponse[];

    return {
      ok: true,
      replies,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error posting question',
    };
  }
};
