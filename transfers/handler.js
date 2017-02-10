'use strict';
console.log('Handler ready');

const genRes = (code, body, callback) => {
  console.log('in gen res');
  const response = {
    statusCode: code || 200,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(body),
  };
  callback(null, response);
};

module.exports.transfer = (event, context, callback) => {
  console.log('transfer');
  console.log(event.body);

  const requestBody = JSON.parse(event.body);
  const keys = Object.keys(requestBody);
  console.log('keys', keys);

  if (keys.indexOf('from') < 0) {
    genRes(400, {
      message: 'Missing from ID'
    }, callback);
  }

  if (keys.indexOf('to') < 0) {
    genRes(400, {
      message: 'Missing to ID'
    }, callback);
  }

  if (keys.indexOf('amount') < 0) {
    genRes(400, {
      message: 'Missing amount'
    }, callback);
  }

  genRes(200, {
    "transferId": "2493ec5c-bad5-4571-98fd-058f1b343886",
    "furtherAuthorisationNeeded": false,
    "messages": null
  }, callback);
};

module.exports.confirm = (event, context, callback) => {
  console.log('transfer confirm');
  console.log(event.body);

  const requestBody = JSON.parse(event.body);
  const keys = Object.keys(requestBody);
  console.log('keys', keys);

  if (keys.indexOf('transferId') < 0) {
    genRes(400, {
      message: 'Missing transfer ID'
    }, callback);
  }

  genRes(200, {
    message: `Transfer was successful`
  }, callback);
};