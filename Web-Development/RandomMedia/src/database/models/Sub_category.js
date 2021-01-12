module.exports = (sequelize, dataTypes) => {
    let alias = 'Sub_category';
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
        category_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        link: {
            type: dataTypes.STRING(60),
            allowNull: false
        }
    };
    let config = {
        tablename: 'sub_categories',
        underscored: true,
        timestamps: false
    };
    const Sub_category = sequelize.define(alias, cols, config);

    Sub_category.associate = (models) => {
        Sub_category.belongsTo(models.Category, {
            as: 'category',
            foreignkey: 'category_id'
        })

        Sub_category.belongsToMany(models.Article, {
            as: 'subcategories_article',
            through: 'article_sub_categories',
            foreignKey: 'sub_category_id',
            otherKey: 'article_id'
        })
    }

    return Sub_category;
}