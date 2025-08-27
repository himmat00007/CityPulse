module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@common': './src/common',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@context': './src/context',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
