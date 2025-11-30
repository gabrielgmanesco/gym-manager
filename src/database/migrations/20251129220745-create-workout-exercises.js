'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('workout_exercises', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      workout_sheet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workout_sheets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sets: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reps: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rest_seconds: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      observation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('workout_exercises')
  }
}
