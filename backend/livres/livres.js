const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');

var api = new ApiBuilder();
var dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/livres', function (request) {
  var params = {  
    TableName: 'livres',  
    Item: {
        livreid: request.body.livreid,
        titre: request.body.titre, 
    } 
  }
  return dynamoDb.put(params).promise(); 
}, { success: 201 }); 

api.get('/livres/{id}', function (request) { 

  const params = {
    TableName: "livres",
    KeyConditionExpression: 'livreid = :i',
    ExpressionAttributeValues: {
      ':i': request.pathParams.id
    }
  };

  return dynamoDb.query(params).promise().then(response => response.Items)
});

api.delete('/livres/{id}', function (request) { 

  const params = {
    TableName: "livres",
    Key:{
      "livreid": request.pathParams.id
    }
  };
  return dynamoDb.delete(params).promise().then(response => response.Items)
});

api.post('/livres/{id}', function (request) { 

  var params = {
    TableName: "livres",
    Key:{
      "livreid": request.pathParams.id
    },
    UpdateExpression: "set titre=:t",
    ExpressionAttributeValues:{
        ":t": request.body.titre
      },
    ReturnValues:"UPDATED_NEW"
  };
  return dynamoDb.update(params).promise().then(response => response.Items)
});

api.get('/livres', function (request) { 
  return dynamoDb.scan({ TableName: 'livres' }).promise()
      .then(response => response.Items)
});


module.exports = api;


//https://claudiajs.com/tutorials/lambda-api-dynamo-db.html

//npm init
//npm install -g claudia

//aws dynamodb create-table --table-name livres --attribute-definitions AttributeName=livreid,AttributeType=S --key-schema AttributeName=livreid,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region us-east-1 --query TableDescription.TableArn --output text

//npm install aws-sdk claudia-api-builder -S 

//claudia create --region us-east-1 --api-module livres --policies policy

