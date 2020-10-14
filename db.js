const { Sequelize } = require('sequelize');
const User = require('./Models/user');
const List = require('./Models/lists');
const ShoppingList = require('./Models/shoppingList');
const Categories = require('./Models/categories');
const Coupons = require('./Models/coupons');

const sequelize = new Sequelize(
    'delicioso-cart-server', 
    'postgres', 
    'password', {
    host: 'localhost',
    dialect: 'postgres'
    });

User(sequelize);
List(sequelize);
ShoppingList(sequelize);
Categories(sequelize);
Coupons(sequelize);

const { user, shoppingList, coupons, list, categories } = sequelize.models;

user.hasMany(shoppingList);
shoppingList.belongsTo(user);
list.hasMany(shoppingList);
shoppingList.belongsTo(list);
categories.hasMany(shoppingList);
shoppingList.belongsTo(categories);
user.hasMany(coupons);
coupons.belongsTo(user);

sequelize.authenticate()
.then(() => console.log('******* DB INITIALIZED *******'));

module.exports = sequelize;