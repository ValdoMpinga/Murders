const User = require('../schemas/user.schema');
const uuid = require('uuid');
const mongoose = require('mongoose');
const encryption = require('../middlewares/userPasswordEncryption')
mongoose.connect("mongodb://localhost/murdersdb");

async function saveUser(firstName, lastName, email, password, role)
{
    try
    {
        console.log('entrei')
        let user = new User
            ({
                _id: uuid.v4(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: role
            })

        return await user.save();

    } catch (e)
    {
        console.log(e)
    }

}

async function getUser(email)
{
    try
    {
        const userData = await User.findOne({ email: email });
        return userData;
    } catch (e)
    {
        console.log(e)
    }

}

async function getUserRole(email)
{
    try
    {
        const userData = await User.findOne({ email: email });
        console.log(userData.role)
        return userData.role;
    } catch (e)
    {
        console.log(e)
    }

}

async function getUsers()
{
    try
    {
        const userData = await User.find({});
        return userData;
    } catch (e)
    {
        console.log(e)
    }

}

async function deleteUser(email)
{
    try
    {
        const userData = await User.deleteOne({ email: email });
        return userData;
    } catch (e)
    {
        console.log(e)
    }

}

async function updateUser(email, firstName, lastName, newEmail, password, role)
{
    try
    {
        const filter = { email: email };

        let update = {
            firstName: firstName,
            lastName: lastName,
            email: newEmail,
            password: password,
            role: role
        }
        const userData = await User.findOneAndUpdate(filter, update, { returnOriginal: false });
        console.log(userData)
        if (userData != null)
            return 'sucesso';
        else
            return 'falha';
    } catch (e)
    {
        console.log(e)
    }


}

module.exports = { saveUser, getUserRole, getUsers, deleteUser, updateUser, getUser };
