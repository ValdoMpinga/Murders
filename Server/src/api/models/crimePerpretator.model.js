const crimesInJSON = require('../../../crimes.json')
const crimePerpertator = require('../schemas/crimePerpretator.schema');
const uuid = require('uuid');

async function migratePerpertratorDataFromPostgree()
{
    crimesInJSON.root.crime.forEach(async (item) =>
    {
        let crime = new crimePerpertator({
            _id: uuid.v4(),
            perpetratorSex: item.recordId[0].perpetratorData[0].perpetratorSex[0],
            age: item.recordId[0].perpetratorData[0].perpetratorAge[0],
            perpetratorRace: item.recordId[0].perpetratorData[0].perpetratorRace[0],
            perpetratorEthnicity: item.recordId[0].perpetratorData[0].perpetratorEthnicity[0],
            relationship: item.recordId[0].perpetratorData[0].relationship[0],
            weapon: item.recordId[0].perpetratorData[0].weapon[0],
            victimCount: item.recordId[0].perpetratorData[0].victimCount[0],
            perpetratorCount: item.recordId[0].perpetratorData[0].perpetratorCount[0]
        })

        await crime.save();
    })

}

async function getPrepertrators()
{

    let data = await crimePerpertator.find({})

    if (data != null)
        return data;
    else
        return 'erro ao buscar autores de crimes';
}

module.exports = { migratePerpertratorDataFromPostgree,getPrepertrators}