'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            rol: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            lastname: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            image: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            created_at: Sequelize.DataTypes.DATE,
            updated_at: Sequelize.DataTypes.DATE
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('users');
    }
}