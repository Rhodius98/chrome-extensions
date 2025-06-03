let popupElement;

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

  popupElement = document.createElement('div');
  popupElement.style.position = 'absolute';
  popupElement.style.top = `${window.scrollY + rect.bottom}px`;
  popupElement.style.left = `${window.scrollX + rect.left}px`;
  popupElement.style.padding = '6px 8px';
  popupElement.style.background = '#fff';
  popupElement.style.border = '1px solid #ccc';
  popupElement.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  popupElement.style.zIndex = 2147483647;
  popupElement.textContent = 'Loading...';

  document.body.appendChild(popupElement);

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
