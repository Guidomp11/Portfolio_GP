module.exports = (sequelize, dataTypes) => {
    const alias = 'University_location';
    const cols = {
        id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        address:{
            type: dataTypes.STRING(100)
        },
        province: {
            type: dataTypes.STRING(100)
        },
        country: {
            type: dataTypes.STRING(100)
        },
        zip_code: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        university_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model: 'universities',
                key: 'id'
            }
        }
    }
    const config = {
        tableName: 'universities_locations',
        timestamps: true,
        underscored: true
    };
    const University_location = sequelize.define(alias, cols, config);  
    
    University_location.associate = function(models) {
        University_location.belongsTo(models.University, {
          as: 'University_location',
          foreignKey: 'university_id',
          timestamps: true
        });
    }
    
    return University_location;
}