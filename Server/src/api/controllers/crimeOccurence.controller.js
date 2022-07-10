const crimeOccurenceModelInstance = require('../models/crimeOccurence.model');

async function migrateData()
{
    return await crimeOccurenceModelInstance.migrateOccurenceDataFromPostgree();

}

async function deleteOccurenceData()
{
   return await crimeOccurenceModelInstance.deleteAllDataInsideCollection();
}

async function insertOccurenceCity(city)
{
   return await crimeOccurenceModelInstance.insertOccurenceCity(city)
}

async function updateOccurenceCity(oldCity,newCity)
{
   return await crimeOccurenceModelInstance.updateOccurenceCity(oldCity,newCity)
}

async function getOccurenceCities()
{
   return await crimeOccurenceModelInstance.getOccurenceCities()
}
module.exports = { migrateData, deleteOccurenceData,insertOccurenceCity,updateOccurenceCity,getOccurenceCities}