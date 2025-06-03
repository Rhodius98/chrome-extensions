# Explain Highlight Extension

This extension lets you highlight text on any webpage and automatically fetches an explanation from ChatGPT. When you select some text, a small popup appears below the selection. The extension sends the selected text to the OpenAI API and displays the explanation in the popup.

## Setup

1. Obtain an OpenAI API key.
2. Load the extension in Chrome via **chrome://extensions** > **Load unpacked** and select this folder.
3. Click **Details** on the extension and open **Extension options**.
4. Enter your API key in the field and click **Save**. The key is stored locally in your browser using `chrome.storage` and never sent anywhere except to the OpenAI API when making requests.

## Usage

Highlight any text on a webpage. A popup with "Loading..." will show near the selection and will update with the explanation once the request completes.
