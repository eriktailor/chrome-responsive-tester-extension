document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('framesContainer');
  const BREAKPOINTS = [300, 350, 640, 768, 1024, 1280, 1536];

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

  chrome.storage.sync.get({ defaultUrl: '' }, (items) => {
    const formattedUrl = formatUrl(items.defaultUrl);
    buildFrames(BREAKPOINTS, formattedUrl);
  });

  const TW_BREAKPOINTS = [
    { name: '2xl', min: 1536 },
    { name: 'xl',  min: 1280 },
    { name: 'lg',  min: 1024 },
    { name: 'md',  min: 768  },
    { name: 'sm',  min: 640  },
    { name: 'xs',  min: 350  },
  ];

  function twBreakpoint(w) {
    const bp = TW_BREAKPOINTS.find(b => w >= b.min);
    return bp ? bp.name : null;
  }

  function makeLabel(w, h) {
    const bp = twBreakpoint(w);
    return `${Math.round(w)}px${bp ? ` <span class="bp-label">(${bp})</span>` : ''}`;
  }

  function buildFrames(widths, startUrl) {
    container.innerHTML = '';
    widths.forEach(width => {
      const outer = document.createElement('div');
      outer.className = 'frame-outer';

      const title = document.createElement('h3');
      title.innerHTML = makeLabel(width, 0);

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
          title.innerHTML = makeLabel(newW, newH);
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