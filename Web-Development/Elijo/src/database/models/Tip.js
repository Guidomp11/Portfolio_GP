module.exports = (sequelize, dataTypes) => {
  const alias = 'Tip';
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
    tip: {
      type: dataTypes.STRING(600)
    }
  };
  
  const config = {
    tableName: 'tips',
    timestamps: true,
    underscored: true
  };
  
  const Tip = sequelize.define(alias, cols, config);  
  
  Tip.associate = function(models) {
    Tip.belongsTo(models.Course, {
      as: 'Course',
      foreignKey: 'course_id'
    });

    Tip.belongsTo(models.Career, {
      as: 'Career',
      foreignKey: 'career_id'
    });

    Tip.belongsTo(models.Institute, {
      as: 'Institute',
      foreignKey: 'institute_id'
    });

    Tip.belongsTo(models.University, {
      as: 'University',
      foreignKey: 'university_id'
    });

    Tip.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });
  };

  return Tip;
}