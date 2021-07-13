var express = require("express");
var cors = require('cors')
var app = express();

app.use(cors());

require("./app/routes/power_plant.routes.js")(app);

app.listen(5001, () => {
    console.log("Server running on port 5001");
});