const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('categories', {
        categories:
        {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            defaultValue: ['Dairy', 'Vegetables/Fruits', 
            'Meats/Fish', 'Bread/Bakery', 'Frozen Foods', 
            'Personal Care', 'Cleaners/Paper Goods', 'Other']
        },
    });
} 