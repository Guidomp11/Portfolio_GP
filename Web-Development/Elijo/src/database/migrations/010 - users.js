'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false
      },
      name:{
        type: Sequelize.DataTypes.STRING(100)
      },
      last_name:{
        type: Sequelize.DataTypes.STRING(100)
      },
      age: {
        type: Sequelize.DataTypes.INTEGER(40).UNSIGNED
      },
      telephone: {
        type: Sequelize.DataTypes.STRING(100)
      },
      experiences: {
        type: Sequelize.DataTypes.STRING(255)
      },
      province: {
        type: Sequelize.DataTypes.STRING(100)
      },
      genre_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id'
        }
      },
      photo:{
        type: Sequelize.DataTypes.STRING(100)
      },
      rol:{
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false
      },
      user_confirm:{
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false
      },
      google_id:{
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};