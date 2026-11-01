(function ({ test, assert, Parking }) {
  const { formatReceipt } = Parking;

  test('given_paid_exit_when_printed_then_total_in_baht', () => {
    const text = formatReceipt({
      ticketId: 'T-1003',
      entryAt: '2026-10-31T10:00:00+07:00',
      exitAt: '2026-10-31T12:30:00+07:00',
      freeHours: 0,
      fee: 6000,
    });
    assert.match(text, /TOTAL 60\.00 THB/);
  });
})(typeof require === 'function' ? require('./harness.js') : window.TestKit);
