module.exports = {
  extends: ['@cryptopapers/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', ['algos', 'conway', 'fp', 'morse', 'parser', 'poker', 'site']],
  },
};