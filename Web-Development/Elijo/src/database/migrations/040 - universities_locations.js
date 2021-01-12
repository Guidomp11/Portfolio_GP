'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('universities_locations', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      address:{
        type: Sequelize.DataTypes.STRING(100)
      },
      province: {
        type: Sequelize.DataTypes.STRING(100)
      },
      country: {
        type: Sequelize.DataTypes.STRING(100)
      },
      zip_code: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED
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
    return queryInterface.dropTable('universities_locations')
  }
};