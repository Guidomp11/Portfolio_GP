module.exports = (sequelize, dataTypes) => {
  const alias = 'Course';
  const cols = {
    id:{
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING(255)
    },
    plan_link:{
      type: dataTypes.STRING(255)
    },
    price:{
      type: dataTypes.INTEGER(10)
    },
    calification:{
      type: dataTypes.INTEGER(10)
    },
    duration:{
      type: dataTypes.INTEGER(10)
    },
    difficulty:{
      type: dataTypes.INTEGER(10)
    },
    job_exit:{
      type: dataTypes.INTEGER(10)
    },
    study_hours:{
      type: dataTypes.INTEGER(10)
    },
    institute_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  };
  const config = {
    tableName: 'courses',
    timestamps: true,
    underscored: true
  };
  const Course = sequelize.define(alias, cols, config);  
  
  Course.associate = function(models) {
    Course.belongsTo(models.Institute, {
      as: 'Institutes',
      foreignKey: 'institute_id',
      timestamps: true
    });

    Course.belongsToMany(models.User, {
      as: 'User_course_study',
      through: 'user_courses',
      foreignKey: 'course_id',
      otherKey: 'user_id',
      timestamps: true
    });

    Course.hasMany(models.Tip, {
      as: 'Course_tips',
      foreignKey: 'course_id'
    });
  };
  
  return Course;
}