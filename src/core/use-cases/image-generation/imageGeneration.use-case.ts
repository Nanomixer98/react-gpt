type GeneratedImage = Image | null;

interface Image {
  url: string;
  altText: string;
}

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<GeneratedImage> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_GTP_API}/image-generation`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, originalImage, maskImage }),
      }
    );
    if (!res.ok) throw new Error('Something went wrong');
    const { url, revised_prompt: alt } = await res.json();

    return { url, altText: alt };
  } catch (error) {
    console.error(error);

    return null;
  }
};
