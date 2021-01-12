module.exports = (sequelize, dataTypes) => {
    const alias = 'Interest';
    const cols = {
        id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        interest_name:{
            type: dataTypes.STRING(100)
        }
    };
    const config = {
        tableName: 'interests',
        timestamps: true,
        underscored: true
    };
    const Interest = sequelize.define(alias, cols, config);  
    
    Interest.associate = function(models) {
        Interest.belongsToMany(models.User, {
            as: 'User',
            through: 'user_interests',
            foreignKey: 'interest_id',
            otherKey: 'user_id',
            timestamps: true
        });
    };
    
    return Interest;
}