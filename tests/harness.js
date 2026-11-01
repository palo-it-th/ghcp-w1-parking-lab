// Gives each test file `test`, `assert` and the app when run with `node --test`.
// tests.html provides the same three things in the browser.
const Parking = Object.assign(
  {},
  require('../src/money.js'),
  require('../src/time.js'),
  require('../src/pricing.js'),
  require('../src/stamps.js'),
  require('../src/gate.js'),
  require('../src/receipt.js'),
  require('../src/report.js'),
);

module.exports = {
  test: require('node:test').test,
  assert: require('node:assert/strict'),
  Parking,
};
