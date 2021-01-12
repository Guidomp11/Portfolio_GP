module.exports = (sequelize, dataTypes) => {
  const alias = 'Institute';
  const cols = {
    id:{
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING(255)
    },
    link:{
      type: dataTypes.STRING(255)
    },
    price:{
      type: dataTypes.INTEGER(10)
    },
    calification:{
      type: dataTypes.INTEGER(10)
    },
    adress:{
      type: dataTypes.STRING(255)
    },
    location:{
      type: dataTypes.STRING(255)
    },
    region:{
      type: dataTypes.STRING(255)
    },
    logo:{
      type: dataTypes.STRING(100)
    },
    amount_students:{
      type: dataTypes.INTEGER(10)
    }
  };
  const config = {
    tableName: 'institutes',
    timestamps: true,
    underscored: true
  };
  const Institute = sequelize.define(alias, cols, config);  
  
  Institute.associate = function(models) {
    Institute.hasMany(models.Course, {
      as: 'Courses',
      foreignKey: 'institute_id',
      timestamps: true
    });

    Institute.hasMany(models.Tip, {
      as: 'Institute_tips',
      foreignKey: 'institute_id'
    })
  };
  return Institute;
}