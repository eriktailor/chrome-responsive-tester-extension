document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('framesContainer');
  const BREAKPOINTS = [350, 640, 768, 1024, 1280, 1536];

  chrome.storage.sync.get({ defaultUrl: '' }, (items) => {
    buildFrames(BREAKPOINTS, items.defaultUrl || '');
  });

  function buildFrames(widths, startUrl) {
    container.innerHTML = '';
    widths.forEach(width => {
      const outer = document.createElement('div');
      outer.className = 'frame-outer';

      const title = document.createElement('h3');
      title.textContent = `${width}px`;

      const wrapper = document.createElement('div');
      wrapper.className = 'frame-wrapper';
      wrapper.style.width = width + 'px';

      const iframe = document.createElement('iframe');
      iframe.src = startUrl;

      wrapper.appendChild(iframe);
      outer.appendChild(title);
      outer.appendChild(wrapper);
      container.appendChild(outer);

      const handle = document.createElement('div');
      handle.className = 'resize-handle';
      wrapper.appendChild(handle);

      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startW = wrapper.offsetWidth;
        const startH = wrapper.offsetHeight;

        function onMouseMove(e) {
          const newW = Math.max(100, startW + e.clientX - startX);
          const newH = Math.max(200, startH + e.clientY - startY);
          wrapper.style.width = newW + 'px';
          wrapper.style.height = newH + 'px';
          title.textContent = `${Math.round(newW)}px × ${Math.round(newH)}px`;
        }

        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    });
  }
});