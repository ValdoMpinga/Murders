require('dotenv').config();

const app = require('express')();

//routes

const userRouter = require('./api/routes/users')
const crimeOccurenceRouter = require('./api/routes/crimeOccurence')
const crimePrepertratorRouter = require('./api/routes/crimeprepertrator')
const migrationRouter = require('./api/routes/migration')
const murderVictimRouter = require('./api/routes/murderVictims')
// const graphRouter = require('./api/routes/graphQueries')

//graphgql

// const { GraphQLSchema } = require('graphql');

// const expressGraphQL = require('express-graphql').graphqlHTTP;

// const graphQueryRoot = graphRouter.RootQueryType;

// const schema = new GraphQLSchema
//     ({
//         query: graphQueryRoot
//     })

const cors = require('cors')

app.use(cors())

app.listen
    (
        process.env.PORT, () => console.log(`server is listening!`)
    );

app.use('/user', userRouter)

app.use('/migration', migrationRouter)

app.use('/crime/occurence', crimeOccurenceRouter)

app.use('/crime/prepertrator', crimePrepertratorRouter)

app.use('/murder/victim', murderVictimRouter)

// app.use('/murdersGraph', expressGraphQL({
//     schema: schema,
//     graphiql: true
// }))

