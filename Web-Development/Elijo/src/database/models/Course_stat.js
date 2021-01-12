module.exports = (sequelize, dataTypes) => {
    const alias = 'Course_stat';
    const cols = {
        id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        course_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        student_amount: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        duration_amount: {
            type: dataTypes.INTEGER(20).UNSIGNED
        },
        difficulty_amount:{
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        job_exit_amount:{
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        study_hours_amount:{
            type: dataTypes.INTEGER(10).UNSIGNED
        }
    };
    const config = {
        tableName: 'course_stats',
        timestamps: true,
        underscored: true
    };
    
    const Course_stat = sequelize.define(alias, cols, config);  
    
    Course_stat.associate = function(models) {
        Course_stat.belongsTo(models.Course, {
            as: 'Course',
            foreignKey: 'course_id'
        });
    };
    
    return Course_stat;
}