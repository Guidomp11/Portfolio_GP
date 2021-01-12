'use strict'

module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('articles', {
            id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.DataTypes.STRING(600),
                allowNull: false
            },
            sub_title: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            synopsis: {
                type: Sequelize.DataTypes.STRING(1000),
                allowNull: false
            },
            content: {
                type: Sequelize.DataTypes.TEXT,
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
            view: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            cover_image: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            created_at: Sequelize.DataTypes.DATE,
            updated_at: Sequelize.DataTypes.DATE
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('articles');
    }
}