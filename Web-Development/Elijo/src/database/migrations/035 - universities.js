'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('universities', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: Sequelize.DataTypes.STRING(255)
      },
      acronym:{
        type: Sequelize.DataTypes.STRING(100)
      },
      owner_type: {
        type: Sequelize.DataTypes.STRING(50)
      },
      link:{
        type: Sequelize.DataTypes.STRING(255)
      },
      price:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      calification:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      logo:{
        type: Sequelize.DataTypes.STRING(100)
      },
      amount_students:{
        type: Sequelize.DataTypes.INTEGER(10)
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('universities')
  }
};