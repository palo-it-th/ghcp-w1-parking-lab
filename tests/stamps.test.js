(function ({ test, assert, Parking }) {
  const { freeHoursFor } = Parking;

  test('given_no_receipts_when_counted_then_zero_free_hours', () => {
    const hours = freeHoursFor([], '2026-10-31T18:00:00+07:00');
    assert.equal(hours, 0);
  });

  test('given_1500_baht_shop_receipt_when_counted_then_2_free_hours', () => {
    const receipts = [{ type: 'shop', amount: 150000, issuedAt: '2026-10-31T15:20:00+07:00' }];
    const hours = freeHoursFor(receipts, '2026-10-31T18:00:00+07:00');
    assert.equal(hours, 2);
  });
})(typeof require === 'function' ? require('./harness.js') : window.TestKit);
