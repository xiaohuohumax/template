import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  languageOptions: {
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
  },
  ignores: [
    'node_modules',
  ],
})
