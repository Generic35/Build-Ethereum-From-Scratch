const GENESIS_DATA = {
  blockHeaders: {
    parentHash: '--genesis-parent-hash--',
    beneficierary: '--genesis-beneficiary--',
    difficulty: 1,
    number: 0,
    timestamp: '--genesis-timestamp--',
    nonce: 0,
    transactionsRoot: '--genesis-transaction-root-',
    stateRoot: '--generis-state-root--',
  },
  transactionSeries: [],
};

const MILLISECONDS = 1;
const SECONDS = 1000 * MILLISECONDS;
const MINE_RATE = 13 * SECONDS;

const STARTING_BALANCE = 1000;
const MINING_REWARD = 50;

module.exports = {
  GENESIS_DATA,
  MINE_RATE,
  STARTING_BALANCE,
  MINING_REWARD,
};
