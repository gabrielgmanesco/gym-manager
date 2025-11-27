const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const baseSqlitePath = process.env.DB_STORAGE || 'src/database/database.sqlite'
const baseSqliteTestPath = process.env.DB_STORAGE_TEST || 'src/database/database.test.sqlite'

/**
 * Configuração usada APENAS pelo sequelize-cli (migrations/seeders)
 */
const common = {
  dialect: 'sqlite',
  storage: baseSqlitePath,
  logging: false
}

module.exports = {
  development: {
    ...common
  },
  test: {
    ...common,
    storage: baseSqliteTestPath,
    logging: false
  },
  production: {
    ...common,
    logging: false
  }
}
