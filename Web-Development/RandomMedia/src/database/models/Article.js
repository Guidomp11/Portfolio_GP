module.exports = (sequelize, dataTypes) => {
    let alias = 'Article';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING(600),
            allowNull: false
        },
        sub_title: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        synopsis: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        view: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        cover_image: {
            type: dataTypes.STRING(60),
            allowNull: false
        }
    };
    let config = {
        tablename: 'articles',
        timestamps: true,
        underscored: true
    };
    const Article = sequelize.define(alias, cols, config);

    Article.associate = (models) => {
        Article.belongsTo(models.User, {
            as: 'user',
            foreignkey: 'user_id'
        })

        Article.belongsToMany(models.Sub_category, {
            as: 'article_subcategories',
            through: 'article_sub_categories',
            foreignKey: 'article_id',
            otherKey: 'sub_category_id'
        })

        Article.belongsToMany(models.Tag, {
            as: 'article_tag',
            through: 'article_tags',
            foreignKey: 'article_id',
            otherKey: 'tag_id'
        })

        Article.hasMany(models.Comment, {
            as: 'comments_in_article',
            foreignKey: 'article_id'
        })
    }

    return Article;
}