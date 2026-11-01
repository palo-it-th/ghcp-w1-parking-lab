// Money is always an integer number of satang (1 baht = 100 satang).
// Every file in src/ uses this wrapper so it runs with `node --test`
// and when index.html is opened straight from disk, with no build step.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function () {
  const SATANG_PER_BAHT = 100;

  function bahtToSatang(baht) {
    return Math.round(baht * SATANG_PER_BAHT);
  }

  function formatBaht(satang) {
    const baht = satang / SATANG_PER_BAHT;
    return baht.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' THB';
  }

  return { SATANG_PER_BAHT, bahtToSatang, formatBaht };
});
