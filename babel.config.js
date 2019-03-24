module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
      },
      loose: true,
      modules: false,
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true },
    ],
    [
      '@babel/plugin-proposal-class-properties', // 兼容class内的箭头函数
      { loose: true },
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  ignore: [
    'dist/*.js',
  ],
  comments: false,
};
