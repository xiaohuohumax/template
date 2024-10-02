import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  vue: true,
  languageOptions: {
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
  rules: {
    'no-console': 'off',
    'unicorn/prefer-node-protocol': 'off',
  },
  ignores: [
    'out',
  ],
})
