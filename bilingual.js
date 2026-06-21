/* bilingual.js — Paul's World language toggle (EN / 中文) */
(function () {
  /* ── 1. Inject CSS ─────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent =
    '.zh{display:none!important}' +
    'body.lang-zh .zh{display:inline!important}' +
    'body.lang-zh .en{display:none!important}' +
    '.zh-block{display:none!important}' +
    'body.lang-zh .zh-block{display:block!important}' +
    'body.lang-zh .en-block{display:none!important}' +
    '.pw-lang-toggle{display:flex;gap:6px;align-items:center}' +
    '.pw-lang-toggle.in-nav{margin-left:auto;flex-shrink:0}' +
    '.pw-lang-toggle.floating{position:fixed;top:12px;right:12px;z-index:9999;' +
    'background:rgba(0,0,0,.55);padding:5px 8px;border-radius:22px;' +
    'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}' +
    '.pw-lang-btn{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);' +
    'color:rgba(255,255,255,.78);font-size:.75rem;padding:5px 11px;border-radius:18px;' +
    'cursor:pointer;transition:all .2s;font-family:Arial,sans-serif;white-space:nowrap}' +
    '.pw-lang-btn.active{background:rgba(244,165,0,.25);border-color:rgba(244,165,0,.7);' +
    'color:#ffd700;font-weight:700}';
  document.head.appendChild(style);

  /* ── 2. Language switch ────────────────────────────────────────────── */
  function setLang(lang) {
    document.body.classList.toggle('lang-zh', lang === 'zh');
    document.querySelectorAll('.pw-lang-btn').forEach(function (btn, i) {
      btn.classList.toggle('active', (lang === 'en' && i === 0) || (lang === 'zh' && i === 1));
    });
    try { localStorage.setItem('pw-lang', lang); } catch (e) {}
  }
  window.setLang = setLang;

  /* ── 3. Inject buttons on DOM ready ────────────────────────────────── */
  function inject() {
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<button class="pw-lang-btn active" onclick="setLang(\'en\')">&#x1F1EC;&#x1F1E7; EN</button>' +
      '<button class="pw-lang-btn" onclick="setLang(\'zh\')">&#x1F1E8;&#x1F1F3; 中文</button>';

    var nav = document.getElementById('homeBar') || document.querySelector('nav');
    if (nav) {
      wrap.className = 'pw-lang-toggle in-nav';
      nav.appendChild(wrap);
    } else {
      /* Fallback: floating pill in top-right corner — works on any page */
      wrap.className = 'pw-lang-toggle floating';
      document.body.appendChild(wrap);
    }

    /* Restore saved preference */
    try {
      var saved = localStorage.getItem('pw-lang');
      if (saved === 'zh') setLang('zh');
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
