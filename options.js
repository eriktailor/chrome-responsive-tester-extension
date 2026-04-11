// Alapértelmezett beállítások betöltése
chrome.storage.sync.get({ defaultUrl: '' }, (items) => {
  document.getElementById('defaultUrl').value = items.defaultUrl;
});

document.getElementById('open').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('viewer.html') });
});

// Mentés gomb eseménykezelője
document.getElementById('save').addEventListener('click', () => {
  const url = document.getElementById('defaultUrl').value.trim();
  chrome.storage.sync.set({ defaultUrl: url }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Sikeresen mentve!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});