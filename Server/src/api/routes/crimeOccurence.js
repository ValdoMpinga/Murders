"use strict";

const express = require("express");
const crimeOccurenceControllerInstance = require('../controllers/crimeOccurence.controller');
const jwt = require('jsonwebtoken');
const tokenVerifier = require('../middlewares/tokenVerifier');


let router = express.Router();

router.route('/migration').post(tokenVerifier.verifyToken, async (request, response) =>
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
                const result = await crimeOccurenceControllerInstance.migrateData();

                if (result == 'Migração concluida com sucesso!!!')
                    response.status(200).send(result);
                else
                    response.status(500).send(e);

            }
        });

    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/delete/collection').post(tokenVerifier.verifyToken, async (request, response) =>
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
                const result = await crimeOccurenceControllerInstance.deleteOccurenceData();

                response.status(200).send(result);

            }
        });

    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/insert/city').post(tokenVerifier.verifyToken, async (request, response) =>
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
                const result = await crimeOccurenceControllerInstance.insertOccurenceCity(request.query.city);

                response.status(200).send(result);

            }
        });


    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/get/cities').get(async (request, response) =>
{
    try
    {

        const result = await crimeOccurenceControllerInstance.getOccurenceCities();

        response.status(200).send(result);


    } catch (e)
    {
        response.status(500).send(e);
    }
})

//Insomnia
router.route('/update/city').post(async (request, response) =>
{
    try
    {
        const result = await crimeOccurenceControllerInstance.updateOccurenceCity(request.query.oldCity, request.query.newCity);

        response.status(200).send(result);
    } catch (e)
    {
        response.status(500).send(e);
    }
})

module.exports = router;