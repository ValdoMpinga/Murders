const middlewareInstance= require('../middlewares/xmlFetcherFromDB');

async function  getXmlFile()
{
    const crimesXmlFile=await middlewareInstance.getXmlFile();
    // console.log(l);                                                
    return crimesXmlFile;
}

module.exports={getXmlFile}