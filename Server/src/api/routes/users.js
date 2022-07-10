"use strict";

const express = require("express");
const userController = require("../controllers/user.controller");
const jwt = require('jsonwebtoken');
const tokenVerifier = require('../middlewares/tokenVerifier');

let router = express.Router();

router.route('/insert').post(tokenVerifier.verifyToken, async (request, response) =>
{
    try
    {


        const result = await userController.saveUser(request.query.firstName, request.query.lastName, request.query.email, request.query.password, request.query.role);

        if (result != null)
        {
            response.status(200).send();
        } else
        {
            response.status(500).send("Erro ao inserir novo usuario");
        }



    } catch (e)
    {
        response.status(500).send("Erro");
    }
})

router.route('/login').post(async (request, response) =>
{
    try
    {
        const logedUserRole = await userController.getRole(request.query.email);

        const result = await userController.login(request.query.email, request.query.password);

        const user = {
            email: request.query.email,
            password: request.query.password
        }

        if (result == true)
        {
            jwt.sign({ user: user }, process.env.SECRET_KEY, (err, token) =>
            {
                response.json({ token: token })
            });
            // response.status(200).send(result + '\nPapel do usario: ' + logedUserRole);
        } else
        {

            response.status(500).send('Email ou palavra passe errado');

        }


    } catch (e)
    {
        console.log(e)
        response.status(500).send('erro');
    }
})

router.route('/get/role').post(async (request, response) =>
{
    try
    {
        const logedUserRole = await userController.getRole(request.query.email);


        if (logedUserRole.toLowerCase() == 'view')
            response.status(200).send(logedUserRole);
        else if (logedUserRole.toLowerCase() == 'edit')
            response.status(201).send(logedUserRole);
        else if (logedUserRole.toLowerCase() == 'admin')
            response.status(202).send(logedUserRole);
    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/get/all/').get(async (request, response) =>
{
    try
    {

        const users = await userController.getAllUsers();
        response.status(200).send(users);
    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/delete').post(tokenVerifier.verifyToken, async (request, response) =>
{
    try
    {
        jwt.verify(request.token, process.env.SECRET_KEY, async (err) =>
        {

            if (err)
            {
                console.log(err)
                response.sendStatus(403);
            } else
            {
                const deleteUser = await userController.deleteUser(request.query.email)
                if (deleteUser)
                    response.status(200).send('User eliminado com sucesso ' + deleteUser);
            }
        });

    } catch (e)
    {
        response.status(500).send(e);
    }
})

//Insomnia
router.route('/find').post(async (request, response) =>
{
    try
    {
        const users = await userController.getUser(request.query.email)
        // response.status(200).send(users);
        response.json(users)
    } catch (e)
    {
        response.status(500).send(e);
    }
})

//Insomnia
router.route('/update').post(async (request, response) =>
{
    try
    {

        const updateUser = await userController.updateUser(request.query.email, request.query.firstName, request.query.lastName, request.query.newEmail, request.query.password, request.query.role)
        if (updateUser == 'sucesso')
            response.status(200).send('User atualizado com sucesso ' + deleteUser);
        else
            return response.status(500).send('erro ao atualizar');

    } catch (e)
    {
        response.status(500).send(e);
    }
})

module.exports = router;