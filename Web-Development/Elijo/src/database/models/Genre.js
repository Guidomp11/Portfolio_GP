module.exports = (sequelize, dataTypes) => {
    const alias = 'Genre';
    const cols = {
        id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        genre_name:{
            type: dataTypes.STRING(100)
        }
    };
    const config = {
        tableName: 'genres',
        timestamps: true,
        underscored: true
    };
    const Genre = sequelize.define(alias, cols, config);  
    
    Genre.associate = function(models) {
        Genre.hasMany(models.User, {
          as: 'User',
          foreignKey: 'genre_id'
        });
    };
    
    return Genre;
}