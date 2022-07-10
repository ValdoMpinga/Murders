const mongoose = require("mongoose");

const crimePerpertatorSchema = new mongoose.Schema
    ({
        _id:String,
        perpetratorSex:
        {
            type: String,
            enum: ['Male', 'Female','Unknown'],
            required: true,
        },
        age:
        {
            type: Number,
            min: 0,
            max: 120,
        },
        perpetratorRace: String,
        perpetratorEthnicity: String,
        relationship: String,
        weapon: String,
        victimCount: Number,
        perpetratorCount: Number,
    });

    module.exports = mongoose.model("crimePerpertator",crimePerpertatorSchema);