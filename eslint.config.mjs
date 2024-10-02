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
  },
  ignores: [
    'node_modules',
    'docs/.vitepress/dist',
    'docs/.vitepress/cache',
    '!docs/.vitepress',
  ],
})
