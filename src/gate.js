// The exit gate: turns what the scanner reads into a fee and a barrier decision.
// The scanner sends receipt amounts as text in baht, exactly as printed.
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const deps = isNode
    ? Object.assign({}, require('./money.js'), require('./pricing.js'), require('./stamps.js'))
    : root.Parking;
  const api = factory(deps);
  if (isNode) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function ({ bahtToSatang, calculateParkingFee, freeHoursFor }) {
  function toReceipt(scanned) {
    return {
      type: scanned.type,
      amount: bahtToSatang(Number(scanned.amountText)),
      issuedAt: scanned.issuedAt,
    };
  }

  function processExit({ ticket, scannedReceipts = [], exitAt, lostTicket = false }) {
    const receipts = scannedReceipts.map(toReceipt);
    const freeHours = freeHoursFor(receipts, exitAt);
    const fee = calculateParkingFee({ entryAt: ticket.entryAt, exitAt, freeHours, lostTicket });

    return {
      ticketId: ticket.id,
      freeHours,
      fee,
      barrier: fee === 0 ? 'open' : 'pay-first',
    };
  }

  return { processExit };
});
