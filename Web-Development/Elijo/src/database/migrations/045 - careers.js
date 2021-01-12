'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('careers', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: Sequelize.DataTypes.STRING(255)
      },
      plan_link:{
        type: Sequelize.DataTypes.STRING(255)
      },
      price:{
        type: Sequelize.DataTypes.INTEGER(20)
      },
      calification:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      duration:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      difficulty:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      job_exit:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      study_hours:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      university_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'universities',
          key: 'id'
        }
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('careers')
  }
};