interface PoemResponse {
  poem: string;
  code: string;
}

interface GeneratePoemParams {
  difficulty: 'easy' | 'hard';
  allUsedPoems: string[];
}

export async function generatePoem({ difficulty, allUsedPoems }: GeneratePoemParams): Promise<PoemResponse> {
  try {
    console.log('Generating poem with params:', { difficulty, allUsedPoems });

    const response = await fetch('/api/poem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty,
        allUsedPoems,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response not ok:', response.status, errorText);
      throw new Error(`Failed to generate poem: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);

    if (!data.poem || !data.code) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    console.error('Error in generatePoem:', error);
    throw error;
  }
} 