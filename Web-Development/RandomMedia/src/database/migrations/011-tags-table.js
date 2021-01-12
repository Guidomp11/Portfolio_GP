'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('tags', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            tag: {
                type: Sequelize.DataTypes.STRING(600),
                allowNull: false
            },
            created_at: Sequelize.DataTypes.DATE,
            updated_at: Sequelize.DataTypes.DATE
        })
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('tags');
    }
}