const {Pool,Client} = require('pg');
var connectionString="postgres://postgres:0@PostgreSQL 14/localhost:5432/xqueryTest";

async function getXmlFile()
{
    const connectionCredentials = new Client
    ({
        host: "127.0.0.1",
        user: "postgres",
        port: 5432,
        password: "0",
        database: "xqueryTest"
    })

    const pool=new Pool(connectionCredentials);
    const text= `select "xmlFile" from "XMLFILES" where "fileName"=$1 limit 10` ;
    const values=['p'];
    return pool.query(text,values);
}

module.exports = { getXmlFile }