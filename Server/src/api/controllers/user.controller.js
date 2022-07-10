const userModel = require("../models/user.model")
const encryptionMiddleWare = require("../middlewares/userPasswordEncryption");


async function saveUser(firstName, lastName, email, password, role)
{
    const encryptedPassword = await encryptionMiddleWare.passwordEncryption(password);

    return await userModel.saveUser(firstName, lastName, email, encryptedPassword, role);
}

async function login(email, password)
{       
    let userData = await userModel.getUser(email);
    let result= await encryptionMiddleWare.passwordVerification(password,userData.password);

    return result;
}

async function getRole(email)
{
    return await userModel.getUserRole(email);
}

async function getAllUsers()
{
    return await userModel.getUsers();
}

async function getUser(email)
{
    return await userModel.getUser(email);
}

async function deleteUser(email)
{
    return await userModel.deleteUser(email);
}

async function updateUser(email,firstName,lastName,newEmail,password,role)
{
    const encryptedPassword = await encryptionMiddleWare.passwordEncryption(newEmail);


    return await userModel.updateUser(email,firstName,lastName,newEmail,encryptedPassword,role);
}


module.exports = { saveUser, login,getRole,getAllUsers,getUser,deleteUser,updateUser };