module.exports = (sequelize, dataTypes) => {
  const alias = 'Career';
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
    university_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  };
  const config = {
    tableName: 'careers',
    timestamps: true,
    underscored: true
  };
  const Career = sequelize.define(alias, cols, config);  
  
  Career.associate = function(models) {
    Career.belongsTo(models.University, {
      as: 'Universities',
      foreignKey: 'university_id',
      timestamps: true
    });

    Career.belongsToMany(models.User, {
      as: 'User_carrer_study',
      through: 'user_careers',
      foreignKey: 'career_id',
      otherKey: 'user_id',
      timestamps: true
    });

    // Career.hasMany(models.Asignature, {
    //   as: 'Asignatures',
    //   foreignKey: 'career_id'
    // });

    Career.hasMany(models.Tip, {
      as: 'Carrer_tips',
      foreignKey: 'course_id'
    });
  };
  return Career;
}