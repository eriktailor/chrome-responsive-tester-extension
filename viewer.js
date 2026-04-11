document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('urlForm');
  const input = document.getElementById('urlInput');
  const container = document.getElementById('framesContainer');

  // Fetch breakpoints and default URL from storage
  chrome.storage.sync.get({
    breakpoints: '320, 500, 660, 950, 1100, 1300, 1536',
    defaultUrl: ''
  }, (items) => {
    const startUrl = items.defaultUrl || 'https://thaimasszazscentrum-v2.test';
    input.value = startUrl;
    const widths = items.breakpoints.split(',').map(w => w.trim());
    buildFrames(widths, startUrl);
  });

  function buildFrames(widths, startUrl) {
    container.innerHTML = ''; 
    widths.forEach(width => {
      const wrapper = document.createElement('div');
      wrapper.className = 'frame-wrapper';
      
      const title = document.createElement('h3');
      title.textContent = `${width}px`;
      
      const iframe = document.createElement('iframe');
      iframe.width = width;
      
      // 3. Set the iframe source to your default URL instead of 'about:blank'
      iframe.src = startUrl; 
      
      wrapper.appendChild(title);
      wrapper.appendChild(iframe);
      container.appendChild(wrapper);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let url = input.value.trim();
    
    // Ha nincs http vagy https protokoll megadva, kiegészítjük (hasznos lokális .test domaineknél)
    if (url && !/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    if (url) {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.src = url;
      });
    }
  });
});