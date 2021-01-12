module.exports = (sequelize, dataTypes) => {
    const alias = 'User_notification';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        notification_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    const config = {
        tableName: 'user_notifications',
        timestamps: true,
        underscored: true
    };
    
    const User_notification = sequelize.define(alias, cols, config);  
    
    return User_notification;
}