// Times are ISO 8601 strings with an offset, e.g. "2026-10-31T09:30:00+07:00".
// The mall is in Bangkok (UTC+7, no daylight saving).
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else Object.assign(root.Parking, api);
})(this, function () {
  const MS_PER_MINUTE = 60 * 1000;
  const BANGKOK_OFFSET_MS = 7 * 60 * MS_PER_MINUTE;

  function minutesBetween(fromIso, toIso) {
    return Math.floor((Date.parse(toIso) - Date.parse(fromIso)) / MS_PER_MINUTE);
  }

  function addMinutes(iso, minutes) {
    return new Date(Date.parse(iso) + minutes * MS_PER_MINUTE).toISOString();
  }

  // "YYYY-MM-DD" of the moment as seen on a clock in Bangkok.
  function bangkokDate(iso) {
    return new Date(Date.parse(iso) + BANGKOK_OFFSET_MS).toISOString().slice(0, 10);
  }

  return { minutesBetween, addMinutes, bangkokDate };
});
