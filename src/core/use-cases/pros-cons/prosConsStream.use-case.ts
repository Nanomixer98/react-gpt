export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_GTP_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        // TODO: abortSignal
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const reader = res.body?.getReader();
    if (!reader) return null;

    // const decoder = new TextDecoder();
    // let text = '';
    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   text += decodedChunk;
    //   console.log(text);
    // }

    return reader;
  } catch (error) {
    console.error(error);
    return null;
  }
};
