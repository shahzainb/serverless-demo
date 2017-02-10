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

module.exports.payment = (event, context, callback) => {
  console.log('payment');
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

  if (keys.indexOf('reference') < 0) {
    genRes(400, {
      message: 'Missing reference'
    }, callback);
  }

  if (keys.indexOf('date') < 0) {
    genRes(400, {
      message: 'Missing date'
    }, callback);
  }

  genRes(200, {
    "paymentId": "0b12d0f5-2206-46f1-9b36-b2397acb9066",
    "authenticationType": "PASSWORD",
    "reference": "QWE",
    "messages": [
      "This payment will reach the recipient immediately."
    ],
    "fasterPaymentOffered": false,
    "processAsFasterPayment": false,
    "internalPaymentAllowed": true,
    "internalPayment": true,
    "furtherAuthorisationRequired": false,
    "lastDigitsOfCardNumber": null,
    "cardNumberFieldEditable": false
  }, callback);
};

module.exports.confirm = (event, context, callback) => {
  console.log('payment confirm');
  console.log(event.body);

  const requestBody = JSON.parse(event.body);
  const keys = Object.keys(requestBody);
  console.log('keys', keys);

  if (keys.indexOf('paymentId') < 0) {
    genRes(400, {
      message: 'Missing payment ID'
    }, callback)
  }

  genRes(200, {
    "actualPaymentDate": "2016-11-28T00:00:00Z",
    "reference": "QW",
    "messages": [
      "Your payment has been processed and will be in the remitting account within 2 hours. Please take care and stay safe out there."
    ]
  }, callback);
};