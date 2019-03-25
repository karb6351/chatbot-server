const BaseModule = require('./base_module');

const responseMessage = require('../../../resources/string');

module.exports = class GeneralLocalKnowledge extends BaseModule {
	intentType() {
		return [
			{
				
			}
		];
	}

	generateReponse(intent, content, payload) {
		switch (intent) {
			
		}
	}
};
