/* ============================================
   👁 Paul's View Counter Library
   Version: 1.2 (FIXED: Session guard to prevent multiple counts)
   Usage: Add ONE line to any HTML page:
   <script src="/view-counter.js"></script>
   ============================================ */

(function() {
  'use strict';
  
  const NAMESPACE = 'paulsworld';
  
  // Get page key from filename (e.g., "s1.html" → "s1")
  const pageKey = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  
  // Session guard key — unique per page
  const sessionKey = 'pw_viewed_' + pageKey;
  
  // Create counter element
  function createCounterElement() {
    const div = document.createElement('div');
    div.id = 'pw-view-counter';
    div.style.cssText = `
      text-align: center;
      margin: 30px auto;
      padding: 15px 20px;
      background: linear-gradient(135deg, #f5f5f5, #eeeeee);
      border-radius: 12px;
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 300px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      border-left: 4px solid #f4813f;
    `;
    div.innerHTML = `
      <span style="font-size: 16px; color: #555;">
        👁 <strong id="pw-view-count" style="color: #f4813f; font-size: 1.2em;">...</strong>
        <span style="color: #888; font-size: 0.9em;">views</span>
      </span>
    `;
    return div;
  }

  // Just READ the current count — no increment
  async function getCount() {
    try {
      const res = await fetch(`https://api.counterapi.dev/v
