module.exports = (sequelize, dataTypes) => {
    const alias = 'Calification';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        university_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        career_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        institute_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        course_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        calification:{
            type: dataTypes.INTEGER(10)
        },
        opinion:{
            type: dataTypes.STRING(600)
        }
    };
    const config = {
        tableName: 'califications',
        timestamps: true,
        underscored: true
    };
    const Calification = sequelize.define(alias, cols, config);  
    
    Calification.associate = function(models) {
        Calification.belongsTo(models.User, {
          as: 'User',
          foreignKey: 'user_id'
        });
        Calification.belongsTo(models.University, {
            as: 'University',
            foreignKey: 'university_id'
        });
        Calification.belongsTo(models.Career, {
            as: 'Career',
            foreignKey: 'career_id'
        });
        Calification.belongsTo(models.Institute, {
            as: 'Institute',
            foreignKey: 'institute_id'
        });
        Calification.belongsTo(models.Course, {
            as: 'Course',
            foreignKey: 'course_id'
        });
    };
    
    return Calification;
}