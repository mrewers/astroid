module.exports = {
  extends: ['@cryptopapers/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', ['algos', 'conway', 'fp', 'morse', 'optimizer', 'parser', 'poker', 'site']],
  },
};