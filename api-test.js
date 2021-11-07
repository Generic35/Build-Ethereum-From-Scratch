const { post } = require('request');
const request = require('request');

const BASE_URL = 'http://localhost:3000';

const postTransact = ({ to, value }) => {
  return new Promise((resolve, reject) => {
    request(
      `${BASE_URL}/account/transact`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, value }),
      },
      (error, response, body) => {
        return resolve(JSON.parse(body));
      }
    );
  });
};

const getMine = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request(`${BASE_URL}/blockchain/mine`, (error, response, body) => {
        return resolve(JSON.parse(body));
      });
    }, 1000);
  });
};

postTransact({})
  .then((postTransactionResponse) => {
    console.log(
      'postTransctResponse (Create Account Transaction): ',
      postTransactionResponse
    );

    const toAccountData = postTransactionResponse.transaction.data.accountData;

    return postTransact({ to: toAccountData.address, value: 20 });
  })
  .then((postTransactionResponse2) => {
    console.log(
      'postTransctionResponse2( Standard Transaction)',
      postTransactionResponse2
    );

    return getMine();
  })
  .then((getMineResponse) => {
    console.log('getMineResponse ', getMineResponse);
  });
