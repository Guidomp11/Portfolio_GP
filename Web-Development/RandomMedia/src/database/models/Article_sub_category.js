module.exports = (sequelize, dataTypes) => {
    let alias = 'Article_sub_category';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        article_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model: 'articles',
                key: 'id'
            }
        },
        sub_category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tablename: 'article_sub_categories',
        timestamps: false,
        underscored: true
    };
    const Article_sub_category = sequelize.define(alias, cols, config);

    return Article_sub_category;
}