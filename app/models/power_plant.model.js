const sql = require('./db.js');

// constructor
const PowerPlant = function (pp) {
    this.code = pp.Code;
    this.name = pp.Name;
    this.latitude = pp.Latitude;
    this.longitude = pp.Longitude;
    this.capacity = pp.Capacity;
};

PowerPlant.getAll = result => {
    sql.query("SELECT * FROM power_plant", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("power plant: ", res);
        result(null, res);
    });
}

PowerPlant.findById = (powerPlantId, result) => {
    sql.query(`SELECT * FROM power_plant WHERE Code = ${powerPlantId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            var powerPlant = res[0];
            sql.query(`SELECT * FROM sensor WHERE Power_Plant_Code = ${powerPlantId}`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                powerPlant.Sensor = res;
                console.log("power plant by id: ", powerPlant);
                result(null, powerPlant);
                return;
            })
        }
        else {
            result({ kind: "not_found" }, null);
        }
    })
}

module.exports = PowerPlant