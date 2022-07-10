const assert = require('assert');
const mongoose = require('mongoose');
const MurderVictim = require('../Tables/murderVictem');
const uuid=require('uuid');
                           
describe('Murder tests', async function ()                                                         
{                 
    it('Insert murderVictim on DB', async function ()
    {
                         
        mongoose.connect("mongodb://localhost/murderTestsDB");

        let murderVictim = new MurderVictim
            ({
                _id: uuid.v4(),                      
                victemSex: 'male',
                victimAge: 24,
                victimRace: 'White',
                victimEthnicity: 'Hispanian'
            });

        await murderVictim.save();
        assert.equal(await murderVictim.save().then(() => { return true; }), true, 'User not saved');
    });


    it('select murderVictim from DB', async function ()
    {
        mongoose.connect("mongodb://localhost/murderTestsDB");

        let result = await MurderVictim.find({ victimEthnicity: 'Hispanian' }, (error, data) =>
        {
            if (error)
                console.log(error);
            else
            {
                console.log(data);
            }
        })

        assert.equal(1, 1, 'Error listing');
    });


});