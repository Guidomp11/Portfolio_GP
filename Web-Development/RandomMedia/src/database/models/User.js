module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rol: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(60),
            allowNull: false
        }
    };
    let config = {
        tablename: 'users',
        timestamps: true,
        underscored: true
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsToMany(models.Category, {
            as: 'categories',
            through: 'user_categories',
            foreignKey: 'user_id',
            otherKey: 'category_id'
        })

        User.hasMany(models.Article, {
            as: 'articles',
            foreignKey: 'user_id'
        })

        User.hasMany(models.Comment, {
            as: 'own_comments',
            foreignKey: 'user_id'
        })
    }

    return User;
}