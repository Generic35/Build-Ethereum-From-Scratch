const PubNub = require('pubnub');

const credentials = {
	publishKey:"pub-c-0214d5de-56ac-4c54-9076-f58055ce8e10",
	subscribeKey:"sub-c-69ee7c6e-3c1f-11ec-8182-fea14ba1eb2b",
	secretKey:"sec-c-OWUwYTRkNGUtOTQzMS00ODQyLWJhMDMtNzJiMjhkNTRiMmFm",
}

const CHANNELS_MAP = {
	TEST: 'TEST',
	BLOCK: 'BLOCK'
}

class PubSub {
	constructor(){
		this.pubnub = new PubNub(credentials)
		this.subscribeToChannels();
		this.listen()
	}

	subscribeToChannels() {
		this.pubnub.subscribe({
			channels: Object.values(CHANNELS_MAP)
		})
	}

	publish({ channel, message }){
		this.pubnub.publish({channel, message}); 
	}

	listen() {
		this.pubnub.addListener({
			message: messageObject => {
				console.log('messageObject :', messageObject);
			}
		});
	}
}

module.exports = PubSub;

const pubsub = new PubSub();
setTimeout(() =>{
	pubsub.publish({
		channel: CHANNELS_MAP.TEST,
		message: 'foo'
	})
}, 3000)