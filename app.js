require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let user = require('./Controllers/user-controller');
let shoppingList = require('./Controllers/shoppingList-controller');

app.use(express.json());
sequelize.sync();

app.use(require('./middleware/headers'));
app.use('/user', user);
app.use('/shopping-list', shoppingList);

app.listen(3001, () => console.log('*** APP LISTENING ON PORT 3001 ***'))