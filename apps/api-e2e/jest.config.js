module.exports = {
  displayName: 'api-e2e',
  preset: '../../jest.preset.js',
  testMatch: undefined,
  testRegex: '.e2e-spec.ts$',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api-e2e',
};
