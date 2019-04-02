const userActiveLogger = require('../services/user_active_logger');
const Conversation = require('../conversations/conversation');

exports.process_message = async (id, previousIntent, { input, intents, entities, output, context }) => {
	try {
		const conversation = new Conversation(id);
		const { messages, restaurant } = await conversation.processWithMessage(intents, null, input);
		userActiveLogger.addHistory(id, {
			question: input.text,
			answer: messages,
			intent: intents.length ? intents[0].intent : null,
			wishes: entities,
			context: context
		});
		const messageObj = {
			messages: messages,
			context: context,
			intent: null,
			restaurant: restaurant
		};
		return messageObj;
	} catch (error) {
		console.error(error);
		const messageObj = {
			messages: [],
			context: null,
			intent: null,
			restaurant: userActiveLogger.getUserInfo(id).location.current
		};
		return messageObj;
	}
};

exports.process_location = async (id, previousIntent, context, type) => {
	let messages = [];
	let messageObj = {};
	try {
		const conversation = new Conversation(id);
		messageObj = await conversation.processWithCoordinate(null, type);
		userActiveLogger.addHistory(id, {
			question: null,
			answer: messages,
			intent: null,
			wishes: null,
			context: context
		});
	} catch (error) {
		console.error(error);
	}

	messageObj = {
		...messageObj,
		context: context,
		intent: null
	};

	return messageObj;
}