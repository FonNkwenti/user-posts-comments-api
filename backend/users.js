const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

// create the DynamoDB Document Client
const ddd = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE;

module.exports.create = async (event) => {
  const body = JSON.parse(event.body);
  if (!body.includes(firstName)) {
    console.log("Validation Error! Please create First Name");
  }
  const uniqueId = uuid().toString();

  const timeStamp = new Date().toISOString();

  const putParams = {
    TableName: tableName,
    Item: {
      //   pk: "CUSTOMER#" + customer_id,
      //   sk: "PROFILE#" + customer_id,
      //   profile_data: profile_data,

      PK: "USER#" + uniqueId,
      SK: "METADATA#" + uniqueId,
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
    createUser = await ddd.put(putParams).promise();

    return {
      //statuscode: StatusCode || 200,
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully create user",
        createUser,
      }), // return us an object of the Items that have been written to dynamoDB
    };
  } catch (error) {
    console.log(error);
    Response.statusCode = 500;
    Response.body = JSON.stringify({
      message: "Failed to create user",
      errorMessage: error.message,
      errorStack: error.stack,
    });
    throw new Error(error);
  }
};
