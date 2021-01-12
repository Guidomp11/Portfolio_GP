module.exports = (sequelize, dataTypes) => {
    let alias = 'Iframe';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        iframe: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    };
    let config = {
        tablename: 'iframes',
        timestamps: true,
        underscored: true
    };
    const Iframe = sequelize.define(alias, cols, config);

    return Iframe;
}