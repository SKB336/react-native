// import { API_KEY, API_MODEL, API_ENDPOINT } from "~/constants/api";

import { supabase } from "~/lib/supabase";

const getSystemParams = async () => {
  const { data, error } = await supabase
    .from('profile_system')
    .select('key, value')
    .in('key', ['API_KEY', 'API_ENDPOINT', 'API_MODEL']);

  if (error) {
    console.error('Error fetching system parameters:', error);
    return null;
  }

  // Convert the array into an object like: { API_KEY: '...', API_ENDPOINT: '...', API_MODEL: '...' }
  const params = Object.fromEntries(data.map(item => [item.key, item.value]));

  return {
    API_KEY: params.API_KEY,
    API_ENDPOINT: params.API_ENDPOINT,
    API_MODEL: params.API_MODEL,
  };
};


export const fetchAISuggestion = async (prompt: string): Promise<string> => {
  const params = await getSystemParams();

  if (!params || !params.API_KEY) {
    throw new Error('AI API key is required for suggestions');
  }

  const { API_KEY, API_ENDPOINT, API_MODEL } = params;

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
    console.log("data: ", data)
    return data.choices[0]?.message?.content?.trim() || 'No suggestion available';
  } catch (error) {
    console.error('AI Suggestion error:', error);
    console.log(API_KEY, API_MODEL, API_ENDPOINT)
    throw error;
  }
};