const mongoose = require("mongoose")
const crimeOcurrence = require("../Tables/crimeOccurence")


run()

mongoose.connect("mongodb://localhost/dbname")

async function run(){
    try{
        const crimeoccurence = await crimeOcurrence.create({
            city: "Lasvegas",
            state: " ",
            year: 2020,
            month: "Februar",
        })
        console.log(crimeoccurence)
    }catch(e){
        console.log(e.message)
    }
}