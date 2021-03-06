// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    // allow global require
    'linebreak-style': 0,
    'global-require': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'no-console': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {}
};
