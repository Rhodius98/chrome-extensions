chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'explain') {
    chrome.storage.local.get('apiKey', async ({ apiKey }) => {
      if (!apiKey) {
        sendResponse({ error: 'API key not set. Open extension options to enter it.' });
        return;
      }
      try {
        const explanation = await fetchExplanation(message.text, apiKey);
        sendResponse({ text: explanation });
      } catch (e) {
        console.error(e);
        sendResponse({ error: e.message });
      }
    });
    return true; // Indicates we will respond asynchronously
  }
});

async function fetchExplanation(text, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Explain the following text in simple terms: \n${text}` }]
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.choices[0].message.content.trim();
}
