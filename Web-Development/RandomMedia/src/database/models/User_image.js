module.exports = (sequelize, dataTypes) => {
    let alias = 'User_image';
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
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tablename: 'user_images',
        timestamps: false,
        underscored: true
    };
    const User_image = sequelize.define(alias, cols, config);

    User_image.associate = (models) => {
        User_image.belongsTo(models.User, {
            as: 'user',
            foreignkey: 'user_id'
        })
    }

    return User_image;
}