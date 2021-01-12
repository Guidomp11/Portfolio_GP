'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('categories', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            link: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            }
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('categories');
    }
}