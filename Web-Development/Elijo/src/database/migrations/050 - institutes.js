'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('institutes', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: Sequelize.DataTypes.STRING(255)
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
      adress:{
        type: Sequelize.DataTypes.STRING(255)
      },
      location:{
        type: Sequelize.DataTypes.STRING(255)
      },
      region:{
        type: Sequelize.DataTypes.STRING(255)
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
    return queryInterface.dropTable('institutes')
  }
};