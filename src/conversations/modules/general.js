const BaseModule = require('./base_module');

const responseMessage = require('../../../resources/string');

const UserActiveLogger = require('../../services/user_active_logger');

module.exports = class General extends BaseModule {
	intentType() {
		return [
			{
				name: 'General_Greetings',
				responseAfterJoin: false
			},
			{
				name: 'Bot_Appreciate',
				responseAfterJoin: false
			},
			{
				name: 'ask_way_to_start',
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
			case 'Bot_Appreciate':
        return {
					messages: responseMessage.appreciateResponse(),
					restaurant: user.location.current
				};
				case 'ask_way_to_start':
        return {
					messages: responseMessage.wayToStartResponse(),
					restaurant: user.location.current
				};
    }
	}
	
};
