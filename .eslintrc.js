
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
 },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'standard',
    "plugin:react/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/no-var-requires":'off',
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
}; 