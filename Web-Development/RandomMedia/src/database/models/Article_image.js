module.exports = (sequelize, dataTypes) => {
    let alias = 'Article_image';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        article_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tablename: 'article_images',
        timestamps: false,
        underscored: true
    };
    const Article_image = sequelize.define(alias, cols, config);

    Article_image.associate = (models) => {
        Article_image.belongsTo(models.Article, {
            as: 'article',
            foreignkey: 'article_id'
        })
    }

    return Article_image;
}