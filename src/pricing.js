// The parking tariff. The rules in plain words are in README.md.
(function (root, factory) {
  const time = typeof module === 'object' && module.exports ? require('./time.js') : root.Parking;
  const api = factory(time);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function (time) {
  const GRACE_MINUTES = 15;
  const HOURLY_RATE_SATANG = 2000;
  const DAILY_CAP_SATANG = 30000;
  const LOST_TICKET_FEE_SATANG = 50000;

  function calculateParkingFee({ entryAt, exitAt, freeHours = 0, lostTicket = false }) {
    if (lostTicket) return LOST_TICKET_FEE_SATANG;

    const minutes = time.minutesBetween(entryAt, exitAt);
    if (minutes <= GRACE_MINUTES) return 0;

    // Every started hour counts, from the moment the car came in.
    const hours = Math.ceil(minutes / 60);
    const billableHours = Math.max(0, hours - freeHours);
    const fee = billableHours * HOURLY_RATE_SATANG;

    // Daily cap: never charge more than 300 baht.
    return Math.min(fee, DAILY_CAP_SATANG);
  }

  return {
    GRACE_MINUTES,
    HOURLY_RATE_SATANG,
    DAILY_CAP_SATANG,
    LOST_TICKET_FEE_SATANG,
    calculateParkingFee,
  };
});
