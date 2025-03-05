export async function* translateStreamUseCase(
  prompt: string,
  lang: string,
  abortSignal: AbortSignal
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_GTP_API}/translate-stream`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, lang }),
        signal: abortSignal,
      }
    );
    if (!res.ok) throw new Error('Something went wrong');

    const reader = res.body?.getReader();
    if (!reader) return null;

    const decoder = new TextDecoder();
    let text = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;

      yield text;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
