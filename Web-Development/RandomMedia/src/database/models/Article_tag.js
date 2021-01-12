module.exports = (sequelize, dataTypes) => {
    let alias = 'Article_tag';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        article_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        tag_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        }
    };
    let config = {
        tablename: 'article_tags',
        timestamps: false,
        underscored: true
    };
    const Article_tag = sequelize.define(alias, cols, config);

    return Article_tag;
}