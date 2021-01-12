'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('user_images', {
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
            user_id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('user_images');
    }
}