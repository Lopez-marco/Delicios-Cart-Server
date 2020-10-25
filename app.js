require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let user = require('./Controllers/user-controller');
let shoppingList = require('./Controllers/shoppingList-controller');
let items = require('./Controllers/item-controller');
let categories = require('./Controllers/categories-controller');
let coupons = require('./Controllers/coupon-controller')
const fetch = require('node-fetch')

app.use(express.json());
sequelize.sync();

app.use(require('./middleware/headers'));


app.get("/faboritestore/:lat/:lng/", async (req, res) => {
    const APIKEY = "AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
    const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=32186&type=supermarket&keyword=walmart&key=${APIKEY}`;
    const fetch_response = await fetch(apiURL);
    const json = await fetch_response.json();
    res.json(json);
});

app.get("/near/:lat/:lng:value", async (req, res) => {
    const APIKEY = "AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
    const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=32186&type=supermarket&keyword=${req.params.value}&key=${APIKEY}`;
    const fetch_response = await fetch(apiURL);
    const json = await fetch_response.json();
    res.json(json);
});


app.use('/user', user);
app.use('/shopping-list', shoppingList);
app.use('/items', items);
app.use('/categories', categories);
app.use('/coupons', coupons)

app.listen(3001, () => console.log('*** APP LISTENING ON PORT 3001 ***'))