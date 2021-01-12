module.exports = {
    up: async (queryInteface, Sequelize) => {
        return queryInteface.createTable('sub_categories', {
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
            category_id: {
                type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                }
            },
            link: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            }
        });
    },

    down: async (queryInteface, Sequelize) => {
        return queryInteface.dropTable('sub_categories');
    }
}