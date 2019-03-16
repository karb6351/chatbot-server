const { messageNotRecognizedResponse } = require('../../../resources/string');
const UserActiveLogger = require('../../services/user_active_logger');

module.exports = class BaseModule {
	constructor(userId){
		this.userId = userId;
	}

	async response(intents, context, message, payload) {
		try {
			const intent = intents[0].intent;
			if (!this.validUserStatusAndIntent(intent, UserActiveLogger.isJoined(this.userId))) throw Error();
			return await this.generateReponse(intent, context, payload);
		} catch (error) {
			console.log(error.message);
			return messageNotRecognizedResponse();
		}
	}
	validUserStatusAndIntent(intent) {
		if (UserActiveLogger.isJoined(this.userId)) {
			return true;
		} else {
			const intentObject = this.intentType().filter((item) => item.name === intent)[0];
			return !intentObject.responseAfterJoin;
		}
	}
	// "abstract" method
	async generateReponse(intent, content, payload) {}
	intentType(){}
};
