const { post } = require('request');
const request = require('request');

const { OPCODE_MAP } = require('./interpreter');
const { STOP, ADD, PUSH } = OPCODE_MAP;

const BASE_URL = 'http://localhost:3000';

const postTransact = ({ code, to, value }) => {
  return new Promise((resolve, reject) => {
    request(
      `${BASE_URL}/account/transact`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, to, value }),
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
    }, 2000);
  });
};

const getAccountBalance = ({ address } = {}) => {
  return new Promise((resolve, reject) => {
    request.get(
      `${BASE_URL}/account/balance` + (address ? `?address=${address}` : ''),
      (error, response, body) => {
        return resolve(JSON.parse(body));
      }
    );
  });
};

let toAccountData;

postTransact({})
  .then((postTransactionResponse) => {
    console.log(
      'postTransctResponse (Create Account Transaction): ',
      postTransactionResponse
    );

    toAccountData = postTransactionResponse.transaction.data.accountData;

    return getMine();
  })
  .then((getMineResponse) => {
    console.log('getMineResponse ', getMineResponse);

    return postTransact({ to: toAccountData.address, value: 20 });
  })
  .then((postTransactionResponse2) => {
    console.log(
      'postTransctionResponse2( Standard Transaction)',
      postTransactionResponse2
    );

    const code = [PUSH, 4, PUSH, 5, ADD, STOP];

    return postTransact({ code });
  })
  .then((postTransactResponse3) => {
    console.log(
      'postTransactResponse3 (Smart Contract): ',
      postTransactResponse3
    );
    return getMine();
  })
  .then((getMineResponse2) => {
    console.log('getMineResponse2 ', getMineResponse2);
    return getAccountBalance();
  })
  .then((getAccountBalanceResponse) => {
    console.log('getAccountBalanceResponse ', getAccountBalanceResponse);

    return getAccountBalance({ address: toAccountData.address });
  })
  .then((getAccountBalanceResponse2) => {
    console.log('getAccountBalanceResponse2 :', getAccountBalanceResponse2);
  });
