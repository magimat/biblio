const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');

var api = new ApiBuilder();
var dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/eleves', function (request) {
  var params = {  
    TableName: 'eleves',  
    Item: {
        eleveid: request.body.eleveid,
        nom: request.body.nom, 
        prenom: request.body.prenom, 
        groupe: request.body.groupe, 
    } 
  }
  return dynamoDb.put(params).promise(); 
}, { success: 201 }); 

api.get('/eleves/{id}', function (request) { 

  const params = {
    TableName: "eleves",
    KeyConditionExpression: 'eleveid = :i',
    ExpressionAttributeValues: {
      ':i': request.pathParams.id
    }
  };

  return dynamoDb.query(params).promise().then(response => response.Items[0])
});

api.delete('/eleves/{id}', function (request) { 

  const params = {
    TableName: "eleves",
    Key:{
      "eleveid": request.pathParams.id
    }
  };
  return dynamoDb.delete(params).promise().then(response => response.Items)
});

api.post('/eleves/{id}', function (request) { 

  var params = {
    TableName: "eleves",
    Key:{
      "eleveid": request.pathParams.id
    },
    UpdateExpression: "set nom=:n, prenom=:p, groupe=:g",
    ExpressionAttributeValues:{
        ":n": request.body.nom,
        ":p": request.body.prenom,
        ":g": request.body.groupe
    },
    ReturnValues:"UPDATED_NEW"
  };
  return dynamoDb.update(params).promise().then(response => response.Items)
});

api.get('/eleves', function (request) { 
  return dynamoDb.scan({ TableName: 'eleves' }).promise()
      .then(response => response.Items)
});


module.exports = api;


//https://claudiajs.com/tutorials/lambda-api-dynamo-db.html

//npm init
//npm install -g claudia

//aws dynamodb create-table --table-name eleves --attribute-definitions AttributeName=eleveid,AttributeType=S --key-schema AttributeName=eleveid,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region us-east-1 --query TableDescription.TableArn --output text

//npm install aws-sdk claudia-api-builder -S 

//claudia create --region us-east-1 --api-module eleves --policies policy



// curl -H "Content-Type: application/json" -X POST -d '{"eleveid": "11", "prenom": "aa", "nom": "bb", "groupe": "01"}' https://yrnfeumdjc.execute-api.us-east-1.amazonaws.com/latest/eleves
// curl https://yrnfeumdjc.execute-api.us-east-1.amazonaws.com/latest/eleves