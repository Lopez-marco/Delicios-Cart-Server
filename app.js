require("dotenv").config();
let express = require("express");
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


app.get("/fav/:lat/:lng/:favorite_store/", async (req, res) => {
    const APIKEY = "AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
    const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=32186&type=supermarket&keyword=${req.params.favorite_store}&key=${APIKEY}`;

    // const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=32186&type=supermarket&keyword=${req.params.favorite_store}&key=${APIKEY}`;
    const fetch_response = await fetch(apiURL);
    // let store = models.user.req.body.favorite_store
    // console.log(store)
    const json = await fetch_response.json();
    res.json(json);
});

app.get("/near/:lat/:lng/:favorite_store/", async (req, res) => {
    const APIKEY = "AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
    const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=32186&type=supermarket&keyword=${req.params.favorite_store}&key=${APIKEY}`;
    const fetch_response = await fetch(apiURL);
    const json = await fetch_response.json();
    res.json(json);
});


app.use('/user', user);
app.use('/shopping-list', shoppingList);
app.use('/items', items);
app.use('/categories', categories);
app.use('/coupons', coupons)

app.listen(process.env.PORT, () => console.log(`*** APP LISTENING ON ${process.env.PORT} ***`));
