const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
};
