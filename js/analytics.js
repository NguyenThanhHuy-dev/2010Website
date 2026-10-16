// Gắn GA/pixel vào đây khi cần. Hiện chỉ log khi bật window.DEBUG_ANALYTICS.
function trackEvent(name, data) {
  if (globalThis.DEBUG_ANALYTICS) console.debug('[track]', name, data || {});
}
if (typeof module !== 'undefined') module.exports = { trackEvent };
