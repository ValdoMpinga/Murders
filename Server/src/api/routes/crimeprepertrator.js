"use strict";

const express = require("express");
const crimePrepertratorControllerInstance = require('../controllers/crimePerpretator.controller');
let router = express.Router();

const jwt = require('jsonwebtoken');
const tokenVerifier = require('../middlewares/tokenVerifier');

router.route('migration').post(tokenVerifier.verifyToken,  async (request, response) =>
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
                await crimePrepertratorControllerInstance.migrateData();

                response.status(200).send('Sucesso!');
            }
        });
        

    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/get/crime/prepertrators').get( async (request, response) =>
{
    try
    {
        const result = await crimePrepertratorControllerInstance.getPrepertrators();

        response.status(200).send(result);
    } catch (e)
    {
        response.status(500).send(e);
    }
})

module.exports = router;