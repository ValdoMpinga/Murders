const crimesInJSON = require('../../../crimes.json')
const crimeOcurrence = require('../schemas/crimeOccurence.schema');
const uuid = require('uuid');

async function migrateOccurenceDataFromPostgree()
{
    let cities = [];
    let result = false;

    try
    {
        if (await crimeOcurrence.count() > 0)
        {
            return 'Os dados ja foram importados!'
        } else
        {
            crimesInJSON.root.crime.forEach(async (item) =>
            {


                let fetchedCityFromJSON = item.recordId[0].crimeOccurence[0].city[0];


                if (cities.includes(fetchedCityFromJSON))
                    result = true;
                else
                    result = false;


                if (result == false)
                {
                    cities.push(fetchedCityFromJSON);

                    let crime = new crimeOcurrence({
                        _id: uuid.v4(),
                        city: fetchedCityFromJSON
                    })

                    await crime.save();
                }
            })

            return 'Migração concluida com sucesso!!!'
        }


    } catch (e)
    {
        throw e;
    }

}

async function deleteAllDataInsideCollection()
{
    try
    {
        await crimeOcurrence.deleteMany({})
        return 'Dados elimminados com sucesso';
    } catch (e)
    {
        throw e;
        return 'Erro ao eliminar dados!';
    }
}

async function insertOccurenceCity(city)
{
    try
    {

        let crime = new crimeOcurrence({
            _id: uuid.v4(),
            city: city
        })

        await crime.save();

        return 'Cidade inserida com sucesso'
    } catch (e)
    {
        throw e;
        return 'Erro ao inserir cidade, por favor verifique que a cidade a inserir seja nova no sistema!';
    }
}

async function updateOccurenceCity(oldCityName, newCityName)
{
    try
    {

        const filter = { city: oldCityName };
        const update = { city: newCityName };


        await crimeOcurrence.findOneAndUpdate(filter, update);

        return 'Cidade atualizada com sucesso'
    } catch (e)
    {
        throw e;
        return 'Erro ao atualizar cidade, por favor verifique que a cidade a atualizar exista nova no sistema!';
    }
}

async function getOccurenceCities( )
{
    try
    {

       const cities=  await crimeOcurrence.find({});
       return cities;

    } catch (e)
    {
        throw e;
        return 'Erro ao retornar as cidades';
    }
}

module.exports = { migrateOccurenceDataFromPostgree, deleteAllDataInsideCollection, insertOccurenceCity, updateOccurenceCity,getOccurenceCities }
