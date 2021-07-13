const PowerPlant = require('../models/power_plant.model');

exports.findAll = (req, res) => {
    PowerPlant.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving power plants."
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    PowerPlant.findById(req.params.powerPlantId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Power Plant with id ${req.params.powerPlantId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Power Plant with id " + req.params.powerPlantId
                });
            }
        } else res.send(data);
    })
}