const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
//const { v4: uuid } = require("uuid");

const { v4 } = require("uuid");

// create the DynamoDB Document Client
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE_NAME;
console.log(tableName);

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
      //   pk: "CUSTOMER#" + customer_id,
      //   sk: "PROFILE#" + customer_id,
      //   profile_data: profile_data,

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
      body: JSON.stringify({
        message: "Successfully create user",
      }), // return us an object of the Items that have been written to dynamoDB
    };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
