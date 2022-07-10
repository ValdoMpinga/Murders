const crimesInJSON = require('../../../crimes.json')
const murderVictim = require('../schemas/muderVictim.schema');
const crimeOcurrence = require('../schemas/crimeOccurence.schema');
const uuid = require('uuid');

async function migrateMurderVictimDataFromPostgree()
{
    try
    {
        crimesInJSON.root.crime.forEach(async (item) =>
        {
            crimeOccurenceDetails = await crimeOcurrence.findOne({ city: item.recordId[0].crimeOccurence[0].city[0] })

            let crime = new murderVictim({
                _id: uuid.v4(),
                cityId: crimeOccurenceDetails._id,
                victemSex: item.recordId[0].VictimData[0].victimSex[0],
                victimAge: item.recordId[0].VictimData[0].victimAge[0],
                victimRace: item.recordId[0].VictimData[0].victimRace[0],
                victimEthnicity: item.recordId[0].VictimData[0].victimEthnicity[0]
            })

            await crime.save();
        })
    } catch (e)
    {
        console.log(e);
    }
}

async function getMurderVictims()
{
    try
    {
        const victims = await murderVictim.find({})
        if (victims == null)
            return 'Vitimas inexistentes';
        else
            return victims;
    } catch (e)
    {
        console.log(e);
    }
}

async function getMurderVictimsByCity(city)
{
    let crimeOccurenceDetails = await crimeOcurrence.findOne({ city: city })

    try
    {
        const victims = await murderVictim.find({ id: crimeOccurenceDetails._id })
        return victims;
    } catch (e)
    {
        console.log(e);
    }
}

async function deleteMurderVictim(userId)
{
    try
    {
        await murderVictim.deleteOne({ _id: userId })
        return 'Usuario eliminado com sucesso!!!';
    } catch (e)
    {
        console.log(e);
        return 'erro ao eliminar usuario!';
    }
}

async function deleteMurderVictims()
{
    try
    {
        await murderVictim.deleteMany({ })
        return 'Colecção eliminada com sucesso!!!';
    } catch (e)
    {
        console.log(e);
        return 'erro ao eliminar colecção!';
    }
}

async function insertMurderVictim(cityName, victemSex, victimAge, victimRace, victimEthnicity)
{
    try
    {

        let data = await crimeOcurrence.findOne({ city: cityName });

        if (data == null)
        {
            let newCityId = uuid.v4();

            let newCity = new crimeOcurrence({
                _id: newCityId,
                city: cityName
            })

            await newCity.save();


            let crime = new murderVictim({
                _id: uuid.v4(),
                cityId: newCityId,
                victemSex: victemSex,
                victimAge: victimAge,
                victimRace: victimRace,
                victimEthnicity: victimEthnicity
            })

            await crime.save();

            return crime;

        } else
        {

            let crime = new murderVictim({
                _id: uuid.v4(),
                cityId: data._id,
                victemSex: victemSex,
                victimAge: victimAge,
                victimRace: victimRace,
                victimEthnicity: victimEthnicity
            })

            await crime.save();

            return crime;

        }


    } catch (e)
    {
        throw e;
        return 'Erro ao inserir vitima';
    }

}

module.exports = { migrateMurderVictimDataFromPostgree, getMurderVictims, getMurderVictimsByCity, insertMurderVictim,deleteMurderVictim,deleteMurderVictims}