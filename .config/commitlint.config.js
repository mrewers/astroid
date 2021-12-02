module.exports = {
  extends: ['@cryptopapers/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', ['algos', 'conway', 'fp', 'parser', 'poker', 'site']],
  },
};