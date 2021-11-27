module.exports = {
  extends: ['@cryptopapers/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', ['conway', 'fp', 'parser', 'poker', 'site']],
  },
};