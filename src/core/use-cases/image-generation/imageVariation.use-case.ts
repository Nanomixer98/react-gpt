type GeneratedImage = Image | null;

interface Image {
  url: string;
  altText: string;
}

export const imageVariation = async (
  originalImage?: string
): Promise<GeneratedImage> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_GTP_API}/image-variation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseImage: originalImage }),
    });
    if (!res.ok) throw new Error('Something went wrong');
    const { url, revised_prompt: alt } = await res.json();

    return { url, altText: alt };
  } catch (error) {
    console.error(error);

    return null;
  }
};
