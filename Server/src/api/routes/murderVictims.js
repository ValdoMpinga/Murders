"use strict";

const express = require("express");
const murderVictimsControllerInstance = require('../controllers/murderVictim.controller');
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
                await murderVictimsControllerInstance.migrateData();

                response.status(200).send('Sucesso!');
            }
        });

    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/get').get(async (request, response) =>
{
    try
    {
        const result = await murderVictimsControllerInstance.getVictims();
        if (result == 'Vitimas inexistentes')
            response.status(500).send('Vitimas inexistentes');
        else
            response.status(200).send(result);
    } catch (e)
    {
        response.status(500).send(e);
    }
})

router.route('/insert').post(tokenVerifier.verifyToken, async (request, response) =>
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
                const result = await murderVictimsControllerInstance.insertMurderVictim(request.query.cityName, request.query.victemSex, request.query.victimAge, request.query.victimRace, request.query.victimEthnicity);

                response.status(200).send(result);
            }
        });
      
    } catch (e)
    {
        response.status(500).send('erro na ligação');
    }
})

router.route('/delete/all').post(tokenVerifier.verifyToken, async (request, response) =>
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
                const result = await murderVictimsControllerInstance.deleteMurderVictims();

                response.status(200).send(result);
            }
        });
       
    } catch (e)
    {
        response.status(500).send('erro na ligação');
    }
})

//insomnia
router.route('/delete/one').post(async (request, response) =>
{
    try
    {
        const result = await murderVictimsControllerInstance.deleteMurderVictim(request.query.userId);

        response.status(200).send(result);
    } catch (e)
    {
        response.status(500).send('erro na ligação');
    }
})

//insomnia
router.route('/get/by/city').get(async (request, response) =>
{
    try
    {
        const result = await murderVictimsControllerInstance.getVictimsByCity(request.query.city);

        response.status(200).send(result);
    } catch (e)
    {
        response.status(500).send(e);
    }
})

module.exports = router;