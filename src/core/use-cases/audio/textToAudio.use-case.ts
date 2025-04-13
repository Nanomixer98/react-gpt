export const textToAudiUseCase = async (prompt: string, voice: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_GTP_API}/text-to-audio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, voice }),
    });
    if (!res.ok) throw new Error('Something went wrong with the request');

    const audioFile = await res.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return { ok: true, message: prompt, audioUrl };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Adios cannnot be generated',
    };
  }
};
