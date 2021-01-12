'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('article_tags', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
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
            tag_id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: 'tags',
                    key: 'id'
                }
            }
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('article_tags');
    }
}