// The end-of-day summary the mall office reads every morning.
// An exit is { ticketId, gate, entryAt, exitAt, fee, lostTicket }.
// A lost ticket has no entry time: entryAt is null.
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const deps = isNode ? Object.assign({}, require('./money.js'), require('./time.js')) : root.Parking;
  const api = factory(deps);
  if (isNode) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function ({ formatBaht, minutesBetween }) {
  function dailySummary(exits) {
    const revenue = exits.reduce((sum, e) => sum + e.fee, 0);
    const totalMinutes = exits.reduce((sum, e) => sum + minutesBetween(e.entryAt, e.exitAt), 0);

    const byGate = {};
    for (const e of exits) {
      byGate[e.gate] = (byGate[e.gate] || 0) + 1;
    }

    return {
      cars: exits.length,
      revenue,
      revenueText: formatBaht(revenue),
      averageMinutes: exits.length === 0 ? 0 : Math.round(totalMinutes / exits.length),
      lostTickets: exits.filter((e) => e.lostTicket).length,
      byGate,
    };
  }

  return { dailySummary };
});
