import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  vue: true,
  typescript: true,
  languageOptions: {
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
  rules: {
    'unicorn/prefer-node-protocol': 'off',
  },
  ignores: [
    'out/**',
  ],
})
