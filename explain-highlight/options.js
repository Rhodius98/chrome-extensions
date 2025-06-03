document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const statusDiv = document.getElementById('status');

  chrome.storage.local.get('apiKey', ({ apiKey }) => {
    if (apiKey) {
      apiKeyInput.value = apiKey;
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    chrome.storage.local.set({ apiKey }, () => {
      statusDiv.textContent = 'Saved.';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 1500);
    });
  });
});
