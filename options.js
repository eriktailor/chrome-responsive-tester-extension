function formatUrl(url) {
  if (!url) return '';
  url = url.trim();
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const isLocal = /^localhost(:\d+)?$/i.test(url) || 
                  /^127\.\d+\.\d+\.\d+(:\d+)?$/i.test(url) || 
                  /\.local(:\d+)?$/i.test(url);
  return (isLocal ? 'http://' : 'https://') + url;
}

// Alapértelmezett beállítások betöltése
chrome.storage.sync.get({ defaultUrl: '' }, (items) => {
  document.getElementById('defaultUrl').value = items.defaultUrl;
});

document.getElementById('open').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('viewer.html') });
});

// Mentés gomb eseménykezelője
document.getElementById('save').addEventListener('click', () => {
  let url = document.getElementById('defaultUrl').value.trim();
  if (url) {
    url = formatUrl(url);
    document.getElementById('defaultUrl').value = url;
  }
  chrome.storage.sync.set({ defaultUrl: url }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Sikeresen mentve!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});