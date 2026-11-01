(function ({ test, assert, Parking }) {
  const { dailySummary } = Parking;

  test('given_two_exits_when_summarised_then_revenue_and_average_time', () => {
    const summary = dailySummary([
      { ticketId: 'T-1', gate: 'EXIT-1', entryAt: '2026-10-31T10:00:00+07:00', exitAt: '2026-10-31T11:00:00+07:00', fee: 2000, lostTicket: false },
      { ticketId: 'T-2', gate: 'EXIT-2', entryAt: '2026-10-31T10:00:00+07:00', exitAt: '2026-10-31T13:00:00+07:00', fee: 6000, lostTicket: false },
    ]);
    assert.equal(summary.cars, 2);
    assert.equal(summary.revenue, 8000);
    assert.equal(summary.averageMinutes, 120);
  });
})(typeof require === 'function' ? require('./harness.js') : window.TestKit);
