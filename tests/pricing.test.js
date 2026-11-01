(function ({ test, assert, Parking }) {
  const { calculateParkingFee } = Parking;

  test('given_15_minutes_parked_when_calculated_then_free', () => {
    const fee = calculateParkingFee({
      entryAt: '2026-10-31T10:00:00+07:00',
      exitAt: '2026-10-31T10:15:00+07:00',
    });
    assert.equal(fee, 0);
  });

  test('given_16_minutes_parked_when_calculated_then_one_hour_charged', () => {
    const fee = calculateParkingFee({
      entryAt: '2026-10-31T10:00:00+07:00',
      exitAt: '2026-10-31T10:16:00+07:00',
    });
    assert.equal(fee, 2000);
  });

  test('given_2_hours_10_minutes_parked_when_calculated_then_3_hours_charged', () => {
    const fee = calculateParkingFee({
      entryAt: '2026-10-31T10:00:00+07:00',
      exitAt: '2026-10-31T12:10:00+07:00',
    });
    assert.equal(fee, 6000);
  });

  test('given_20_hours_in_one_day_when_calculated_then_capped_at_300_baht', () => {
    const fee = calculateParkingFee({
      entryAt: '2026-10-31T02:00:00+07:00',
      exitAt: '2026-10-31T22:00:00+07:00',
    });
    assert.equal(fee, 30000);
  });

  test('given_2_free_hours_when_3_hours_parked_then_one_hour_charged', () => {
    const fee = calculateParkingFee({
      entryAt: '2026-10-31T10:00:00+07:00',
      exitAt: '2026-10-31T13:00:00+07:00',
      freeHours: 2,
    });
    assert.equal(fee, 2000);
  });

  test('given_lost_ticket_when_calculated_then_flat_500_baht', () => {
    const fee = calculateParkingFee({
      entryAt: null,
      exitAt: '2026-10-31T13:00:00+07:00',
      lostTicket: true,
    });
    assert.equal(fee, 50000);
  });

  test('given_overnight_stay_when_calculated_then_each_day_capped_separately', () => {
    // 4 hours on the 30th (80 baht), then 20 hours on the 31st (capped at 300 baht).
    const fee = calculateParkingFee({
      entryAt: '2026-10-30T20:00:00+07:00',
      exitAt: '2026-10-31T20:00:00+07:00',
    });
    assert.equal(fee, 38000);
  });
})(typeof require === 'function' ? require('./harness.js') : window.TestKit);
