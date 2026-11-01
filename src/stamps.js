// Free hours earned from shop receipts and cinema tickets ("stamps").
// A receipt is { type: 'shop' | 'cinema', amount: satang, issuedAt: ISO time }.
(function (root, factory) {
  const time = typeof module === 'object' && module.exports ? require('./time.js') : root.Parking;
  const api = factory(time);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function (time) {
  const SHOP_TIERS = [
    { minSpendSatang: 300000, freeHours: 4 },
    { minSpendSatang: 100000, freeHours: 2 },
  ];
  const CINEMA_FREE_HOURS = 3;
  const MAX_FREE_HOURS = 6;

  function freeHoursFor(receipts, exitAt) {
    const exitDate = time.bangkokDate(exitAt);
    const sameDay = receipts.filter((r) => time.bangkokDate(r.issuedAt) === exitDate);

    const shopSpend = sameDay
      .filter((r) => r.type === 'shop')
      .reduce((sum, r) => sum + r.amount, 0);
    const tier = SHOP_TIERS.find((t) => shopSpend >= t.minSpendSatang);
    const shopHours = tier ? tier.freeHours : 0;

    const hasCinema = sameDay.some((r) => r.type === 'cinema');
    const cinemaHours = hasCinema ? CINEMA_FREE_HOURS : 0;

    return Math.min(shopHours + cinemaHours, MAX_FREE_HOURS);
  }

  return { CINEMA_FREE_HOURS, MAX_FREE_HOURS, freeHoursFor };
});
