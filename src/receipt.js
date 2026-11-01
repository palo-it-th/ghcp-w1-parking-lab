// The paper receipt printed at the pay station.
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const deps = isNode ? Object.assign({}, require('./money.js'), require('./time.js')) : root.Parking;
  const api = factory(deps);
  if (isNode) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function ({ formatBaht, minutesBetween }) {
  function formatReceipt({ ticketId, entryAt, exitAt, freeHours, fee }) {
    const minutes = minutesBetween(entryAt, exitAt);
    const lines = [];
    lines.push('MEGALANE MALL PARKING');
    lines.push('Ticket ' + ticketId);
    lines.push('In  ' + entryAt);
    lines.push('Out ' + exitAt);
    lines.push('Time parked ' + Math.floor(minutes / 60) + 'h ' + (minutes % 60) + 'm');
    if (freeHours > 0) lines.push('Free hours from stamps ' + freeHours);
    lines.push('TOTAL ' + formatBaht(fee));
    lines.push('Thank you');
    return lines.join('\n');
  }

  return { formatReceipt };
});
