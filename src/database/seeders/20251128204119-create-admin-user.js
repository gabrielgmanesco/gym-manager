'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('admin123', 10)

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@gymmanager.com',
        password_hash: passwordHash,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@gymmanager.com'
    }, {})
  }
}
