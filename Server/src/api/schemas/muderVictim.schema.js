const mongoose = require("mongoose");

const murderVictimSchema = new mongoose.Schema
    ({
        _id: String,
        cityId:String,
        victemSex:
        {
            type: String,
            lowercase: true
        },
        victimAge:
        {
            type: Number
        },
        victimRace:
        {
            type: String,
        },
        victimEthnicity:
        {
            type: String,
        }

    })

module.exports = mongoose.model('murderVictim', murderVictimSchema);
