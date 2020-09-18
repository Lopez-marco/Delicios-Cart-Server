require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

app.use(express.json());
sequelize.sync();

app.listen(3001, () => console.log('*** APP LISTENING ON PORT 3001 ***'))