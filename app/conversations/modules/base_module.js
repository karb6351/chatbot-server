const { messageNotRecognizedResponse } = require('../../../resources/string');
const UserActiveLogger = require('../../services/user_active_logger');

module.exports = class BaseModule {
	constructor(userId){
		this.userId = userId;	
		this.INTENT = 0;
		this.CONTEXT = 1;
		this.COORDINATE = 2;
	}

	async response(intents, context, message, payload, type) {
		try {
			if (type === this.INTENT){
				const intent = intents[0].intent;
				if (!this.validUserStatusAndIntent(intent, UserActiveLogger.isJoined(this.userId))) throw Error();
				return await this.generateReponseWithIntent(intent, context, payload);
			}else if (type === this.CONTEXT){
				return await this.generateReponseWithContext();
			}else {
				return await this.generateReponseWithCoordinate();
			}
			
		} catch (error) {
			console.log(error);
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
	async generateReponseWithIntent(intent, content, payload) {}
	async generateReponseWithContext() {}
	async generateReponseWithCoordinate() {}
	intentType(){}
};
