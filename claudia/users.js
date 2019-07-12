const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');

var api = new ApiBuilder();
var dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/users', function (request) {
  var params = {  
    TableName: 'users',  
    Item: {
        userid: request.body.userid,
        name: request.body.name, 
        pts: request.body.points
    } 
  }
  return dynamoDb.put(params).promise(); 
}, { success: 201 }); 



api.get('/users/{id}', function (request) { 

  const params = {
    TableName: "users",
    KeyConditionExpression: 'userid = :i',
    ExpressionAttributeValues: {
      ':i': request.pathParams.id
    }
  };

  return dynamoDb.query(params).promise().then(response => response.Items)
});

module.exports = api;


//https://claudiajs.com/tutorials/lambda-api-dynamo-db.html
//npm install aws-sdk claudia-api-builder -S 
//aws dynamodb create-table --table-name users --attribute-definitions AttributeName=userid,AttributeType=S --key-schema AttributeName=userid,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region ca-central-1 --query TableDescription.TableArn --output text
//claudia create --region ca-central-1 --api-module users --policies policy

//curl -H "Content-Type: application/json" -X POST -d '{"userId":"123", "name":"user1", "points", 1}' https://lojq3kk3cg.execute-api.ca-central-1.amazonaws.com/latest/users


