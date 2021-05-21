const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  plugins: ['prettier-plugin-sorted', 'prettier-plugin-jsdoc', 'prettier-plugin-style-order'],
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
};
