const assert = require('assert');
const {Client} = require('pg');
var connectionString="postgres://postgres:0@PostgreSQL 14/localhost:5432/xqueryTest";


describe('postgree connection test', async function () 
{

    it('Conn test', async function ()
    {
        const connectionInstance = new Client
        ({
            host:"127.0.0.1",
            user:"postgres",   
            port:5432,
            password:"0",
            database:"xqueryTest"
        })
     
        connectionInstance.connect();
        let data=null;

        connectionInstance.query(`select * from "XML"`,(err,res)=>
        {
            if(!err)
            {
                console.log(res.rows);
                data=  res.rows;
            }else
            {
                console.log(err.message);
            }
            connectionInstance.end();
        })

        // assert.equal(data,true,'falha ao conectar ao postgree');
        assert.notEqual(data,null,'erro')
    });


});