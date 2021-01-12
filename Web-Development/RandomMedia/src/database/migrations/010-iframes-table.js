'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('iframes', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            iframe: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            created_at: Sequelize.DataTypes.DATE,
            updated_at: Sequelize.DataTypes.DATE
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('iframes');
    }
}