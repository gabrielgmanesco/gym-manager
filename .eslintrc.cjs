module.exports = {
    env: {
      es2021: true,
      node: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      // Exemplo: sem ponto e vírgula
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
  