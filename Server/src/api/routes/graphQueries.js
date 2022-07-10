"use strict";

const express = require("express");
const murderVictimsControllerInstance = require('../controllers/murderVictim.controller');
const crimePrepertratorControllerInstance = require('../controllers/crimePerpretator.controller');
const crimeOccurenceControllerInstance = require('../controllers/crimeOccurence.controller');

const { GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull } = require('graphql');
let router = express.Router();



// router.route('/root').post(tokenVerifier.verifyToken, async (request, response) =>
// {

const RootQueryType = new GraphQLObjectType
    ({
        name: 'Query',
        description: 'Root Query',
        fields: () =>
        ({
            victims:
            {
                type: new GraphQLList(victimType),
                description: 'Victims',
                resolve: async () => await murderVictimsControllerInstance.getVictims()
            }
        })
    })

const victimType = new GraphQLObjectType
    ({
        name: 'Victims',
        description: 'This represents murder vicitims',
        fields: () =>
        ({
            _id: { type: GraphQLNonNull(GraphQLString) },
            cityId: { type: GraphQLNonNull(GraphQLString) },
            victemSex: { type: GraphQLNonNull(GraphQLString) },
            victimAge: { type: GraphQLNonNull(GraphQLInt) },
            victimRace: { type: GraphQLNonNull(GraphQLString) },
            victimEthnicity: { type: GraphQLNonNull(GraphQLString) }
        })
    })

module.exports = { router, RootQueryType };