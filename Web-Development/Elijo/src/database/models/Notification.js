module.exports = (sequelize, dataTypes) => {
    const alias = 'Notification';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
          },
          text:{
            type: dataTypes.STRING(250)
          },
          link:{
            type: dataTypes.STRING(100)
        }
    };
    const config = {
        tableName: 'notifications',
        timestamps: true,
        underscored: true
    };
    const Notification = sequelize.define(alias, cols, config);  
    
    Notification.associate = function(models) {
        Notification.belongsToMany(models.User, {
            as: 'User',
            through: 'user_notifications',
            foreignKey: 'notification_id',
            otherKey: 'user_id',
            timestamps: true
        });
    };
    
    return Notification;
}