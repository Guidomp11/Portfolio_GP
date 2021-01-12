module.exports = (sequelize, dataTypes) => {
    let alias = 'Comment';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comment: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        article_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tablename: 'comments',
        timestamps: true,
        underscored: true
    };
    const Comment = sequelize.define(alias, cols, config);

    Comment.associate = (models) => {
        Comment.belongsTo(models.Article, {
            as: 'article',
            foreignkey: 'article_id'
        })
        Comment.belongsTo(models.User, {
            as: 'user',
            foreignkey: 'user_id'
        })
    }

    return Comment;
}