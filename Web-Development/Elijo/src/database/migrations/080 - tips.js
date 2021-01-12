'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('tips', {
    id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    university_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'universities',
          key: 'id'
        }
    },
    career_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'careers',
          key: 'id'
        }
    },
    institute_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'institutes',
          key: 'id'
        }
    },
    course_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'courses',
          key: 'id'
        }
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    tip:{
        type: Sequelize.DataTypes.STRING(250)
    },
    created_at: Sequelize.DataTypes.DATE,
    updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tips')
  }
};