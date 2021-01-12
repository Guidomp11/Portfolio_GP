'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('article_images', {
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
            article_id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: 'articles',
                    key: 'id'
                }
            },
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('article_images');
    }
}