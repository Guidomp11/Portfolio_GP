module.exports = (sequelize, dataTypes) => {
    let alias = 'User_category';
    cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tablename: 'user_categories',
        underscored: true,
        timestamps: false
    };

    const User_category = sequelize.define(alias, cols, config);

    return User_category;
}