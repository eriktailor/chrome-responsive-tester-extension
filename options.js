// Alapértelmezett beállítások betöltése
chrome.storage.sync.get({
  breakpoints: '375, 640, 768, 1024, 1280, 1536',
  defaultUrl: ''
}, (items) => {
  document.getElementById('breakpoints').value = items.breakpoints;
  document.getElementById('defaultUrl').value = items.defaultUrl;
});

// Mentés gomb eseménykezelője
document.getElementById('save').addEventListener('click', () => {
  const bps = document.getElementById('breakpoints').value;
  const url = document.getElementById('defaultUrl').value.trim();
  chrome.storage.sync.set({ breakpoints: bps, defaultUrl: url }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Sikeresen mentve!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});