const murderVictimsModelInstance= require('../models/murderVictim.model');

async function migrateData()
{
    await murderVictimsModelInstance.migrateMurderVictimDataFromPostgree();

}

async function getVictims()
{
    return await murderVictimsModelInstance.getMurderVictims();

    
}

async function getVictimsByCity(city)
{
    return await murderVictimsModelInstance.getMurderVictimsByCity(city);

}

async function insertMurderVictim(cityName, victemSex, victimAge, victimRace, victimEthnicity)
{
    return await murderVictimsModelInstance.insertMurderVictim(cityName,victemSex,victimAge,victimRace,victimEthnicity);

}

async function deleteMurderVictim(userId)
{
    return await murderVictimsModelInstance.deleteMurderVictim(userId);

}

async function deleteMurderVictims()
{
    return await murderVictimsModelInstance.deleteMurderVictims();

}
module.exports={migrateData,getVictims,getVictimsByCity,insertMurderVictim,deleteMurderVictim,deleteMurderVictims}