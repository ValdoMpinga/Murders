const crimePerpertratorModelInstance= require('../models/crimePerpretator.model');

async function migrateData()
{
    await crimePerpertratorModelInstance.migratePerpertratorDataFromPostgree();
}

async function getPrepertrators()
{
    return await crimePerpertratorModelInstance.getPrepertrators();

}
module.exports={migrateData,getPrepertrators}