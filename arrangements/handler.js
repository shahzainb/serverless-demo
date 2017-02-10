'use strict';
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
let arrangements = [];

const genRes = (body, callback) => {
  console.log('in gen res');
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    },
    body: JSON.stringify(body),
  };
  callback(null, response);
};

console.log('Handler ready');

module.exports.getArrangements = (event, context, callback) => {
  console.log('in get arrangements');

  const params = {
    TableName: 'arrangements'
  };

  const scanExecute = () => {
    dynamo.scan(params, (err, result) => {

      if (err) {
        genRes(err, callback);
      }
      else {
        if (result.LastEvaluatedKey) {
          params.ExclusiveStartKey = result.LastEvaluatedKey;
          scanExecute();
        }
        else {
          const data = result.Items.map(arrangement => Object.assign(arrangement, { beneficiaries: []}));
          genRes(data, callback);
        }
      }
    });
  };
  scanExecute();
};

module.exports.arrangement = (event, context, callback) => {
  console.log('get arrangement');

  const queryExecute = (arrangementId) => {
    const params = {
      TableName: 'arrangements',
      KeyConditionExpression: '#id = :arrangementId',
      ExpressionAttributeNames: {
        '#id': 'id'
      },
      ExpressionAttributeValues: {
        ':arrangementId': arrangementId
      }
    };

    dynamo.query(params, (err, result) => {
      if (err) {
        genRes(err, callback);
      }
      else {
        const data = Object.assign(result.Items[0], { beneficiaries: [] });
        genRes(data, callback);
      }
    });
  };
  queryExecute(event.pathParameters.id);
};

module.exports.beneficiaries = (event, context, callback) => {
  console.log('get beneficiaries');

  const queryExecute = (arrangementId) => {
    const params = {
      TableName: 'arrangements',
      KeyConditionExpression: '#id = :arrangementId',
      ExpressionAttributeNames: {
        '#id': 'id'
      },
      ExpressionAttributeValues: {
        ':arrangementId': arrangementId
      }
    };

    dynamo.query(params, (err, result) => {
      if (err) {
        callback(null, err);
      }
      else {
        const data = result.Items[0].beneficiaries;
        genRes(data, callback);
      }
    });
  };
  queryExecute(event.pathParameters.id);
};