module.exports = (sequelize, dataTypes) => {
    let alias = 'Tag';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tag: {
            type: dataTypes.STRING(600),
            allowNull: false
        }
    };
    let config = {
        tablename: 'tags',
        timestamps: true,
        underscored: true
    };
    const Tag = sequelize.define(alias, cols, config);

    Tag.associate = (models) => {

        Tag.belongsToMany(models.Article, {
            as: 'tag_article',
            through: 'article_tags',
            foreignKey: 'tag_id',
            otherKey: 'article_id'
        })
    }

    return Tag;
}