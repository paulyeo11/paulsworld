/* ============================================
   👁 Paul's View Counter Library
   Version: 1.3 (restored — session guard, correct key)
   Usage: Add ONE line to any HTML page:
   <script src="/view-counter.js"></script>
   ============================================ */

(function() {
  'use strict';

  const NAMESPACE = 'paulsworld';

  // Key = filename without extension (e.g. "S01.html" → "S01")
  const pageKey = window.location.pathname.split('/').pop().replace('.html', '') || 'home';

  // Prevent counting the same visit twice in one browser session
  const sessionKey = 'pw_viewed_' + pageKey;

  function createCounterElement() {
    const div = document.createElement('div');
    div.id = 'pw-view-counter';
    div.style.cssText = [
      'text-align:center',
      'margin:30px auto',
      'padding:15px 20px',
      'background:linear-gradient(135deg,#f5f5f5,#eeeeee)',
      'border-radius:12px',
      'font-family:\'Segoe UI\',Arial,sans-serif',
      'max-width:300px',
      'box-shadow:0 2px 8px rgba(0,0,0,0.06)',
      'border-left:4px solid #f4813f'
    ].join(';');
    div.innerHTML = '<span style="font-size:16px;color:#555;">&#x1F441; ' +
      '<strong id="pw-view-count" style="color:#f4813f;font-size:1.2em;">...</strong>' +
      ' <span style="color:#888;font-size:0.9em;">views</span></span>';
    return div;
  }

  async function incrementCount() {
    const res = await fetch('https://api.counterapi.dev/v1/' + NAMESPACE + '/' + pageKey + '/up');
    const data = await res.json();
    return data.count || 0;
  }

  async function readCount() {
    const res = await fetch('https://api.counterapi.dev/v1/' + NAMESPACE + '/' + pageKey + '/');
    const data = await res.json();
    return data.count || 0;
  }

  async function init() {
    // Insert counter div at the <script> tag's position
    const scripts = document.querySelectorAll('script[src="/view-counter.js"]');
    const scriptTag = scripts[scripts.length - 1];
    const counterEl = createCounterElement();
    if (scriptTag && scriptTag.parentNode) {
      scriptTag.parentNode.insertBefore(counterEl, scriptTag);
    } else {
      document.body.appendChild(counterEl);
    }

    const countEl = document.getElementById('pw-view-count');
    try {
      let count;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, '1');
        count = await incrementCount();
      } else {
        count = await readCount();
      }
      if (countEl) countEl.textContent = count.toLocaleString();
    } catch (e) {
      if (countEl) countEl.textContent = '—';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
