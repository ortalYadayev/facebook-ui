module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/vue3-strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['vue'],
  rules: {},
};
