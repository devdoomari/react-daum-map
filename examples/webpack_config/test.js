/**
 * Webpack config for tests
 */
module.exports = require('./make')({
  BUILD: false,
  TEST: true
});
