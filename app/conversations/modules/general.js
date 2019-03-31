const BaseModule = require('./base_module');

const responseMessage = require('../../../resources/string');

const UserActiveLogger = require('../../services/user_active_logger');

module.exports = class General extends BaseModule {
	intentType() {
		return [
			{
				name: 'General_Greetings',
				responseAfterJoin: false
			}
		];
	}
	async generateReponseWithIntent(intent, content, payload) {
		const user = UserActiveLogger.getUserInfo(this.userId);
		switch (intent) {
      case 'General_Greetings':
        return {
					messages: responseMessage.greetingResponse(),
					restaurant: user.location.current
				};
    }
	}
	
};
