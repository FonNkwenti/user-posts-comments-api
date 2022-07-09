const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const { v4 } = require("uuid");

const ddb = new AWS.DynamoDB.DocumentClient();
tableName = process.env.DYNAMODB_TABLE_NAME;

// Create comment

module.exports.create = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);
  const userId = body.userId;
  const postId = body.postId;
  const commentText = body.commentText;
  const commentId = uuid().toString();
  const status = body.status;
  const timeStamp = uuid().toString();

  try {
    const putParams = {
      TableName: tableName,
      Item: {
        PK: `POST#${postId}#${timeStamp}`,
        SK: `COMMENT#${commentId}#${timeStamp}`,
        commentId: commentId,
        postId: postId,
        userId: userId,
        commentText: commentText,
        status: status,
        createOn: timeStamp,
      },
    };
    const comment = ddb.put(putParams).promise();
    console.log(comment);
    return {
      statusCode: 200,
      body: JSON.stringify(putParams.Item),
    };
  } catch (error) {
    throw new Error(error);
  }
};
