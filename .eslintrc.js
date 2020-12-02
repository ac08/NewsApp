module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 0,
    'linebreak-style': 0,
    'camelcase': 0,
    'no-param-reassign': 0,
    'quote-props': 0
  },
};
