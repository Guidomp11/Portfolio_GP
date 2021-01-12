module.exports = (sequelize, dataTypes) => {
    const alias = 'Career_stat';
    const cols = {
        id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        career_id:{
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
        tableName: 'career_stats',
        timestamps: true,
        underscored: true
    };
    
    const Career_stat = sequelize.define(alias, cols, config);  
    
    Career_stat.associate = function(models) {
        Career_stat.belongsTo(models.Career, {
            as: 'Career',
            foreignKey: 'career_id'
        });
    };
    
    return Career_stat;
}