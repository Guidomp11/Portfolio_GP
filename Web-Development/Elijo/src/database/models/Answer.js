module.exports = (sequelize, dataTypes) => {
    const alias = 'Answer';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        text:{
            type: dataTypes.STRING(600),
            allowNull: false
        },
        question_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    const config = {
        tableName: 'answers',
        timestamps: true,
        underscored: true
    };
    
    const Answer = sequelize.define(alias, cols, config);  
    
    Answer.associate = function(models) {
        Answer.belongsTo(models.User, {
          as: 'User',
          foreignKey: 'user_id'
        });
        Answer.belongsTo(models.Question, {
            as: 'Question',
            foreignKey: 'question_id'
        });
    };
    
    return Answer;
}