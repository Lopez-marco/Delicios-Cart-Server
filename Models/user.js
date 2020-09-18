const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        favorite_store: {
            type: DataTypes.STRING,
            allowNull: true
        },
        account_type: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}