const { Sequelize } = require('sequelize');
const User = require('./Models/user');
const ShoppingList = require('./Models/shoppingList');
const Coupons = require('./Models/coupons');

const sequelize = new Sequelize(
    'delicioso-cart-server', 
    'postgres', 
    'password', {
    host: 'localhost',
    dialect: 'postgres'
    });

User(sequelize);
ShoppingList(sequelize);
Coupons(sequelize);

const { user, shoppingList, coupons } = sequelize.models;

user.hasMany(shoppingList);
shoppingList.belongsTo(user);
user.hasMany(coupons);
coupons.belongsTo(user);

sequelize.authenticate()
.then(() => console.log('******* DB INITIALIZED *******'));

module.exports = sequelize;