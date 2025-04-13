export const createThreadUseCase = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_ASSISTANT_API}/create-thread`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const { id } = (await res.json()) as { id: string };

    return {
      ok: true,
      id,
    };
  } catch (error) {
    console.error(error);
    // throw new Error('Error creating thread');
    return {
      ok: false,
      message: 'Error creating thread',
    };
  }
};
