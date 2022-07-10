const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = require("../models/user.model")

async function passwordEncryption(password)
{
    const salt = await bcrypt.genSaltSync(saltRounds);
    return await bcrypt.hashSync(password, salt);
};

async function passwordVerification(password, hash) 
{

    return await bcrypt.compareSync(password, hash)
}

module.exports = { passwordEncryption, passwordVerification };