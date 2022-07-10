const mongoose = require("mongoose");
const validator=require("mongoose-validator")
const crimeOccurenceCitySchema =  new mongoose.Schema({
    _id:String,
    city: {
        type: String,                                              
        required: true,
        unique: true
    }

})

module.exports = mongoose.model("crimeOcurrence",crimeOccurenceCitySchema)