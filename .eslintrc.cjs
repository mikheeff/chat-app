/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-essential'
  ],
  rules: {
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/max-attributes-per-line': ['error', { multiline: { max: 1 }, }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-shadow': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignorePattern: 'import\\s.+\\sfrom\\s.+;$',
    }],
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'padding-line-between-statements': ['error',
      { blankLine: 'always', prev: '*', next: ['return', 'if', 'try', 'for'] },
      { blankLine: 'always', prev: ['if', 'case', 'default'], next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
