'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()

    await queryInterface.bulkInsert('plans', [
      {
        name: 'Mensal',
        duration_months: 1,
        price: 120.0,
        created_at: now,
        updated_at: now
      },
      {
        name: 'Trimestral',
        duration_months: 3,
        price: 330.0,
        created_at: now,
        updated_at: now
      },
      {
        name: 'Anual',
        duration_months: 12,
        price: 1100.0,
        created_at: now,
        updated_at: now
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('plans', null, {})
  }
}
