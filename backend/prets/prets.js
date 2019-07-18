const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');

var api = new ApiBuilder();
var dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/prets', function (request) {
  var params = {  
    TableName: 'prets',  
    Item: {
        pretid: request.body.pretid,
        livre: request.body.livreid, 
        eleve: request.body.eleveid, 
        dateDebut: request.body.dateDebut, 
        dateRetour: request.body.dateRetour 

    } 
  }
  return dynamoDb.put(params).promise(); 
}, { success: 201 }); 

api.get('/prets/{id}', function (request) { 

  const params = {
    TableName: "prets",
    KeyConditionExpression: 'pretid = :i',
    ExpressionAttributeValues: {
      ':i': request.pathParams.id
    }
  };

  return dynamoDb.query(params).promise().then(response => response.Items)
});

api.delete('/prets/{id}', function (request) { 

  const params = {
    TableName: "prets",
    Key:{
      "pretid": request.pathParams.id
    }
  };
  return dynamoDb.delete(params).promise().then(response => response.Items)
});

api.post('/prets/{id}', function (request) { 

  var params = {
    TableName: "prets",
    Key:{
      "pretid": request.pathParams.id
    },
    UpdateExpression: "set livreid=:l, eleveid=:e, dateDebut=:d, dateRetour=:r",
    ExpressionAttributeValues:{
        ":l": request.body.livreid,
        ":e": request.body.eleveid,
        ":d": request.body.dateDebut,
        ":r": request.body.dateRetour
      },
    ReturnValues:"UPDATED_NEW"
  };
  return dynamoDb.update(params).promise().then(response => response.Items)
});

api.get('/prets', function (request) { 
  return dynamoDb.scan({ TableName: 'prets' }).promise()
      .then(response => response.Items)
});


module.exports = api;


//https://claudiajs.com/tutorials/lambda-api-dynamo-db.html

//npm install -g claudia

//npm install aws-sdk claudia-api-builder -S 
//aws dynamodb create-table --table-name prets --attribute-definitions AttributeName=pretid,AttributeType=S --key-schema AttributeName=pretid,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region ca-central-1 --query TableDescription.TableArn --output text
//claudia create --region us-east-1 --api-module prets --policies policy

