module.exports = (sequelize, dataTypes) => {
    const alias = 'User_interest';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        interest_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    const config = {
        tableName: 'user_interests',
        timestamps: true,
        underscored: true
    };
    
    const User_interest = sequelize.define(alias, cols, config);  
    
    return User_interest;
}