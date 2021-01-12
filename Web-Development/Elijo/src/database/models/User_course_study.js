module.exports = (sequelize, dataTypes) => {
    const alias = 'User_course_study';
    const cols = {
      id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      course_id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        allowNull: false
      },
      user_id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        allowNull: false
      },
      start_year: {
        type: dataTypes.STRING(20)
      }
    };
    const config = {
        tableName: 'user_courses',
        timestamps: true,
        underscored: true
    };
    const User_course_study = sequelize.define(alias, cols, config);  
    
    return User_course_study;
}