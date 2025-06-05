import { API_KEY, API_MODEL, API_ENDPOINT } from "~/constants/api";


export const fetchAISuggestion = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error('AI API key is required for suggestions');
  }

  try {
    const contextPrompt = prompt;

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: API_MODEL,
        messages: [
          {
            role: 'user',
            content: contextPrompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${JSON.stringify(await response.text())}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'No suggestion available';
  } catch (error) {
    console.error('AI Suggestion error:', error);
    console.log(API_KEY, API_MODEL, API_ENDPOINT)
    throw error;
  }
};