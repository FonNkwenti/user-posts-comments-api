const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
//const { v4: uuid } = require("uuid");

const { v4 } = require("uuid");

// create the DynamoDB Document Client
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE_NAME;
console.log(tableName);

// Create a User
module.exports.create = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);

  const uniqueId = v4().toString();

  const timeStamp = new Date().toISOString();

  const putParams = {
    TableName: tableName,
    Item: {
      PK: `USER#${uniqueId}`,
      SK: `METADATA#${uniqueId}`,
      userId: uniqueId,
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      emailAddress: body.emailAddress,
      createOn: timeStamp,
    },
  };
  try {
    let createUser;
    createUser = await ddb.put(putParams).promise();

    return {
      //statuscode: StatusCode || 200,
      statusCode: 200,
      body: JSON.stringify(putParams.Item),
    };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

// get user
module.exports.get = async (event, context) => {
  const userId = event.pathParameters.id;

  const getParams = {
    TableName: tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `METADATA#${userId}`,
    },
  };
  try {
    const User = await ddb.get(getParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(User["Item"]),
    };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

// Delete user
module.exports.delete = async (event, context) => {
  const userId = event.pathParameters.id;

  if (!userId) {
    throw Error("Please provide a user ID");
  }
  console.log(userId);

  try {
    const deleteParams = {
      TableName: tableName,
      Key: {
        PK: `USER#${userId}`,
        SK: `METADATA#${userId}`,
      },
    };
    await ddb.delete(deleteParams).promise();

    return {
      body: JSON.stringify({ message: "User has been deleted" }),
    };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
