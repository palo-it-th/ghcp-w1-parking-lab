(function ({ test, assert, Parking }) {
  const { processExit } = Parking;

  test('given_short_visit_when_car_exits_then_barrier_opens', () => {
    const result = processExit({
      ticket: { id: 'T-1001', entryAt: '2026-10-31T10:00:00+07:00' },
      exitAt: '2026-10-31T10:10:00+07:00',
    });
    assert.equal(result.barrier, 'open');
  });

  test('given_scanned_1250_baht_receipt_when_car_exits_then_2_free_hours', () => {
    const result = processExit({
      ticket: { id: 'T-1002', entryAt: '2026-10-31T10:00:00+07:00' },
      scannedReceipts: [{ type: 'shop', amountText: '1250.00', issuedAt: '2026-10-31T11:00:00+07:00' }],
      exitAt: '2026-10-31T12:30:00+07:00',
    });
    assert.equal(result.freeHours, 2);
    assert.equal(result.fee, 2000);
  });
})(typeof require === 'function' ? require('./harness.js') : window.TestKit);
