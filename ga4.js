/* ============================================
   📊 Paul's World — GA4 Auto-Loader
   Usage: Add ONE line inside <head> on any page:
   <script src="/ga4.js"></script>
   ============================================ */

(function() {
  var GA_ID = 'G-P4Q129Y902';

  // Inject the gtag script
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  // Init dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();
