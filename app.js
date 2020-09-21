require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let user = require("./controllers/users");

app.use(express.json());
sequelize.sync();

app.use(require("./Middleware/headers"));
app.use("./Models/user");

app.listen(3001, () => console.log("*** APP LISTENING ON PORT 3001 ***"));
