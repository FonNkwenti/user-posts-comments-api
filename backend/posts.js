const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
//const { v4: uuid } = require("uuid");

const { v4 } = require("uuid");

// create the DynamoDB Document Client
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE_NAME;
console.log(tableName);

// create a post
module.exports.create = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);
  //   if (!body.includes(firstName)) {
  //     console.log("Validation Error! Please create First Name");
  //   }
  const uniqueId = v4().toString();

  const timeStamp = new Date().toISOString();

  const putParams = {
    TableName: tableName,
    Item: {
      PK: `USER#${uniqueId}`,
      SK: `POST#${uniqueId}#${timeStamp}`,
      postId: uniqueId,
      postText: body.postText,
      createOn: timeStamp,
    },
  };
  try {
    let createPost;
    createPost = await ddb.put(putParams).promise();

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

// update post

module.exports.get = async (event, context) => {
  const postId = event.pathParameters.id;

  const getParams = {
    TableName: tableName,
    Key: {
      PK: `USER#${uniqueId}`,
      SK: `METADATA#${uniqueId}`,
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
