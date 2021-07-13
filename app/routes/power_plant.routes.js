module.exports = app => {
    const PowerPlant = require("../controllers/power_plant.controller.js");

    app.get('/power-plant', PowerPlant.findAll);
    app.get('/power-plant/:powerPlantId', PowerPlant.findOne);
}