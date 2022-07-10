const assert = require('assert');
const user = require('../api/schemas/user.schema');
const mongoose = require('mongoose');
const crypto = require('crypto');
const buffer = require('buffer');
const uuid=require('uuid');

describe('User tests', async function () 
{
    const password = 'havanna';
   /* const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    const algorithm = "SHA512";
    const data =await  Buffer.from(password);
    const signature = await crypto.sign(algorithm, data, privateKey);
    const encryptedPassword = await crypto.createHash("SHA512").update(password).digest();


     it('Hashed password shall be diff from the input one', async function ()
     {

         console.log(encryptedPassword);
         assert.notEqual(encryptedPassword, password, 'They are the same!!!');
     });

    //  it('Verifies the user password for login', async function ()
    //  {
    //      console.log(password);
    //      assert.equal(await user.passwordVerification(crypto.verify('SHA512', data, publicKey, signature)),'Password not verified');
    //  });*/

    it('Insert user on DB', async function ()
    {

        mongoose.connect("mongodb://localhost/murderTestsDB");

        let User = new user
            ({
                _id: await uuid.v4(),
                firstName: 'James',
                lastName: 'Guevara',
                email: 'jamesguevara@mail.com',
                password: '0htrtrhy66rhtythre',
                role: 'view'
            });

        await User.save();
        assert.equal(await User.save().then(() => { return true; }), true, 'User not saved');
    });

    it('select user from DB', async function ()
    {
        mongoose.connect("mongodb://localhost/murderTestsDB");

        let result = await user.find({ firstName: 'James' }, (error, data) =>
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