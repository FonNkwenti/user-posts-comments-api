const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
//const { v4: uuid } = require("uuid");

const { v4 } = require("uuid");

// create the DynamoDB Document Client
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE_NAME;
// console.log(tableName);

//-----------------------------------------
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
      userId: body.userId,
      postText: body.postText,
      status: body.status,
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

//-------------------------------------------------------
// update post

module.exports.update = async (event, context) => {
  const body = JSON.parse(event.body);
  const postId = event.pathParameters.id;
  const userId = body.userId;
  const postText = body.postText;
  const status = body.status;
  const createdOn = body.createdOn;
  const timeStamp = new Date().toISOString();

  const updateParams = {
    TableName: tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `POST#${postId}#${createdOn}`,
    },

    ExpressionAttributeNames: {
      "#pt": "postText",
      "#st": "status",
    },
    ExpressionAttributeValues: {
      ":postText": postText,
      ":status": status,
      ":createdOn": createdOn,
    },
    UpdateExpression: "SET #pt = :postText,#st=:status,updatedAt = :updatedAt",

    ReturnValues: "ALL_NEW",
  };

  console.log(updateParams);
  try {
    const updatePost = await ddb.update(updateParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(updatePost["Item"]),
    };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
//-------------------------------------------------------
// delete post

module.exports.delete = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);
  const postId = event.pathParameters.id;
  console.log(postId);
  const userId = body.userId.toString();
  console.log(userId);
  const createdOn = body.createdOn.toString();

  const deleteParams = {
    TableName: tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `POST#${postId}#${createdOn}`,
    },

    // ExpressionAttributeNames: {
    //   "#pt": "postText",
    //   "#st": "status",
    // },
    // ExpressionAttributeValues: {
    //   ":postText": postText,
    //   ":status": status,
    //   ":deletedAt": timeStamp,
    // },
    // deleteExpression:
    //   "SET #pt =:postText, #st= :status, deletedAt = :deletedAt",

    // ReturnValues: "ALL_NEW",
  };
  console.log(deleteParams);
  try {
    await ddb.delete(deleteParams).promise();
    return {
      body: JSON.stringify({ message: "User's post has been deleted" }),
    };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
