let popupElement;
let styleInjected = false;

function injectStyles() {
  if (styleInjected) return;
  const style = document.createElement('style');
  style.textContent = `
    .explain-popup {
      padding: 8px 12px;
      max-width: 320px;
      font-family: sans-serif;
      background: #ffffff;
      color: #333;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      transition: opacity 0.2s ease;
    }
  `;
  document.head.appendChild(style);
  styleInjected = true;
}

document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  if (!text) {
    removePopup();
    return;
  }

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  showPopup(rect, text);
});

function showPopup(rect, text) {
  removePopup();

  injectStyles();

  popupElement = document.createElement('div');
  popupElement.className = 'explain-popup';
  popupElement.style.position = 'absolute';
  popupElement.style.top = `${window.scrollY + rect.bottom}px`;
  popupElement.style.left = `${window.scrollX + rect.left}px`;
  popupElement.style.zIndex = 2147483647;
  popupElement.style.opacity = '0';
  popupElement.textContent = 'Loading...';

  document.body.appendChild(popupElement);
  requestAnimationFrame(() => {
    popupElement.style.opacity = '1';
  });

  chrome.runtime.sendMessage({ type: 'explain', text }, (response) => {
    if (response && response.text) {
      popupElement.textContent = response.text;
    } else {
      popupElement.textContent = response.error || 'Failed to get explanation';
    }
  });
}

function removePopup() {
  if (popupElement && popupElement.parentNode) {
    popupElement.parentNode.removeChild(popupElement);
    popupElement = null;
  }
}
