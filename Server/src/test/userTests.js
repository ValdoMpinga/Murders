const assert = require('assert'); 
const user=require('../Tables/user');

    describe('User tests', async function () 
    {
            const password='havanna';
            const encryptedPassword=await user.passwordEncryption(password);
            it('Hashed password shall be diff from the input one', async function ()
            {
               
                console.log(encryptedPassword);
                assert.notEqual(encryptedPassword,password,'They are the same!!!');
            });

            it('Verifies the user password for login', async function ()
            {
                console.log(password);
                assert.equal(await user.passwordVerification(password,encryptedPassword),true,'Password not verified');
            });

    });