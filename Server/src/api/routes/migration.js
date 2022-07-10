"use strict";

const express = require("express");
const middlewareControllerInstance = require('../middlewares/xmlFetcherFromDB');
const xml2js = require('xml2js');
const fs = require('fs');

let router = express.Router();

router.route('/get/data').get( async (request, response) =>
{
    try
    {
        const data = await middlewareControllerInstance.getXmlFile();
        const file = data.rows[0];
        const responseFile = file.xmlFile;
        xml2js.parseString(responseFile, (err, result) =>
        {
            if (err)
            {
                console.log(err);
            }
            else
            {
                const jsonData = JSON.stringify(result, null, 4);

                fs.writeFile('crimes.json', jsonData, (err) =>
                {
                    if (err)
                    {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
            }

        })


        if (responseFile != null)
            response.status(200).send("Ficheiro obtido com sucesso!");
        else
            response.status(500).send("Erro ao obter o ficheiro!");
    } catch (e)
    {
        response.status(500).send(e);
    }
})

module.exports = router;