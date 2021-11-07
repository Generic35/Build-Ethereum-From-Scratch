const PubNub = require('pubnub');
const Transaction = require('../transaction');

const credentials = {
  publishKey: 'pub-c-0214d5de-56ac-4c54-9076-f58055ce8e10',
  subscribeKey: 'sub-c-69ee7c6e-3c1f-11ec-8182-fea14ba1eb2b',
  secretKey: 'sec-c-OWUwYTRkNGUtOTQzMS00ODQyLWJhMDMtNzJiMjhkNTRiMmFm',
};

const CHANNELS_MAP = {
  TEST: 'TEST',
  BLOCK: 'BLOCK',
  TRANSACTION: 'TRANSACTION',
};

class PubSub {
  constructor({ blockchain, transactionQueue }) {
    this.pubnub = new PubNub(credentials);
    this.blockchain = blockchain;
    this.transactionQueue = transactionQueue;
    this.subscribeToChannels();
    this.listen();
  }

  subscribeToChannels() {
    this.pubnub.subscribe({
      channels: Object.values(CHANNELS_MAP),
    });
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }

  listen() {
    this.pubnub.addListener({
      message: (messageObject) => {
        const { channel, message } = messageObject;
        const parsedMessage = JSON.parse(message);

        console.log('Message received. Channel: ', channel);

        switch (channel) {
          case CHANNELS_MAP.BLOCK:
            console.log('block message :', message);
            this.blockchain
              .addBlock({ block: parsedMessage })
              .then(() => {
                console.log('New block accepted');
              })
              .catch((error) =>
                console.error('New block rejected: ', error.message)
              );
            break;
          case CHANNELS_MAP.TRANSACTION:
            console.log(`Recieved transaction: ${parsedMessage.id}`);
            this.transactionQueue.add(new Transaction(parsedMessage));

            break;
          default:
            return;
        }
      },
    });
  }

  broadcastBlock(block) {
    this.publish({
      channel: CHANNELS_MAP.BLOCK,
      message: JSON.stringify(block),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS_MAP.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}

module.exports = PubSub;
