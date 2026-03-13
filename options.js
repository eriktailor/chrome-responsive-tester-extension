// Alapértelmezett beállítások betöltése
chrome.storage.sync.get({
  breakpoints: '375, 640, 768, 1024, 1280, 1536'
}, (items) => {
  document.getElementById('breakpoints').value = items.breakpoints;
});

// Mentés gomb eseménykezelője
document.getElementById('save').addEventListener('click', () => {
  const bps = document.getElementById('breakpoints').value;
  chrome.storage.sync.set({ breakpoints: bps }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Sikeresen mentve!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});