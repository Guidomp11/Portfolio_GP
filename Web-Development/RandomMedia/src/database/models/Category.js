module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        link: {
            type: dataTypes.STRING(60),
            allowNull: false
        }
    };
    let config = {
        tablename: 'categories',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Sub_category, {
            as: 'sub_category',
            foreignkey: 'category_id'
        })

        Category.belongsToMany(models.User, {
            as: 'user',
            through: 'user_categories',
            foreignKey: 'category_id',
            otherKey: 'user_id'
        })
    }

    return Category;
}