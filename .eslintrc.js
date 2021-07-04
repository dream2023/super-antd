module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'prefer-object-spread': 0,
    '@typescript-eslint/no-shadow': 0,
    'consistent-return': 0,
  },
};
