const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const peopleModel = dynamoose.model('people', peopleSchema);

exports.handler = async (event) => {
    console.log(event.queryStringParameters);
    
    let response = {statusCode:  null, body: null};

    try {
      let id = event.queryStringParameters.id;
      let queryPerson = await peopleModel.scan("id").contains(id).exec();
      response.statusCode = 200;
      response.body = JSON.stringify(queryPerson);

    } catch(e){
      console.error(e);
      response.statusCode = 500;
      response.body = JSON.stringify(e.message);
    }
    
    return response;
};
