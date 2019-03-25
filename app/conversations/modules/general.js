const BaseModule = require('./base_module');

const responseMessage = require('../../../resources/string');

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
		switch (intent) {
      case 'General_Greetings':
        return responseMessage.greetingResponse();
    }
	}
	
};
