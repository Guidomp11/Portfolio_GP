'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('comments', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            comment: {
                type: Sequelize.DataTypes.STRING(100),
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
            article_id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: 'articles',
                    key: 'id'
                }
            },
            created_at: Sequelize.DataTypes.DATE,
            updated_at: Sequelize.DataTypes.DATE
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('comments');
    }
}