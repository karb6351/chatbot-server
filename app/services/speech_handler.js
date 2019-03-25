const responseMessage = require('../../resources/string');

const GoogleApi = require('../../api/GoogleMap');

// for each user(or autherication), they should contain current intent variable(maybe use session)

const userActiveLogger = require('../services/user_active_logger');

const Conversation = require('../conversations/conversation');

exports.process_message = async (id, previousIntent, { input, intents, entities, output, context }) => {
	// console.log(intents);

	// when the branch is exited, it means no further information is required, system can process the result
	// when the branch is not exited, it means we still required other information to process the request

	// if (context.system.branch_exited) {
	// console.log('No further information is required, we can process the result');
	// no further conversation, system need to provide info base on intent and entities
	// the output text can use for response template
	// .... data filtering, we should make a database api call here  .... //

	let messages = [];
	try {
		const conversation = new Conversation(id);
		messages = await conversation.processWithMessage(previousIntent ? [ previousIntent ] : intents, null, input);
		// return the message that IBM provide when current message is depend on previous message
		// if (previousIntent) {
		// 	messages = output.text;
		// } else {
			// const userInfo = userActiveLogger.getUserInfo(id);
			// const origin = userInfo['currentCoordinate'];
			// const destination = userInfo['location'].next;
			

			// if (intents !== []) {
			// 	if (userActiveLogger.isJoined(id)) {
			// 		const userInfo = userActiveLogger.getUserInfo(id);
			// 		const origin = userInfo['currentCoordinate'];
			// 		const destination = userInfo['location'].next;
			// 		console.log(conversation.processWithMessage(intent, null, input, userActiveLogger.isJoined(id)));
			// 		switch (intent) {
			// 			case 'General_Greetings':
			// 				messages = responseMessage.greetingResponse();
			// 				break;
			// 			case 'get_weather':
			// 				wish = entities.filter((item) => item.entity === 'sys-date').map((date) => date.value);
			// 				messages = [ { type: 'text', content: 'It is sunny today' } ];
			// 				break;
			// 			case 'get_number_of_location_in_path':
			// 				wish = entities.filter((item) => item.entity === 'sys-date').map((date) => date.value);
			// 				// fetch number of restauarant in route from database
			// 				const total = 1;
			// 				messages = [ ...messages, ...responseMessage.numberOfRestaurant(total) ];
			// 				break;
			// 			case 'get_duration_to_next_location':
			// 				const { data } = await GoogleApi.distanceMatrix(origin, destination.coordinate);
			// 				const { distance, duration } = data.rows[0].elements[0];
			// 				messages = [
			// 					...messages,
			// 					...responseMessage.remainDistanceAndDuractionResponse({
			// 						distance: distance.text,
			// 						duration: duration.text
			// 					})
			// 				];
			// 				break;
			// 			case 'get_info_of_next_location':
			// 				const fakeRestaurant = {
			// 					name: '雙連台式美食',
			// 					culture: 'taiwan',
			// 					dishes: 'Noodles served with oil(熱拌麵)'
			// 				};
			// 				messages = [ ...messages, ...responseMessage.restaurantInfoResponse(fakeRestaurant) ];
			// 				break;
			// 			case 'get_way_to_order_food':
			// 				messages = responseMessage.wayOfOrderFoodResponse('inside');
			// 				break;
			// 			default:
			// 				messages = [ ...messages, ...responseMessage.messageNotRecognizedResponse() ];
			// 				break;
			// 		}
			// 	} else {
			// 		switch (intent) {
			// 			case 'General_Greetings':
			// 				messages = [ { type: 'text', content: 'Hello. How can I help you?' } ];
			// 				break;
			// 			case 'get_weather':
			// 				wish = entities.filter((item) => item.entity === 'sys-date').map((date) => date.value);
			// 				messages = [ { type: 'text', content: 'It is sunny today' } ];
			// 				break;
			// 			default:
			// 				messages = [ ...messages, ...responseMessage.messageNotRecognizedResponse() ];
			// 				break;
			// 		}
			// 	}
			// } else {
			// 	messages = [ ...messages, ...responseMessage.messageNotRecognizedResponse() ];
			// }
		// }
		userActiveLogger.addHistory(id, {
			question: input.text,
			answer: messages,
			intent: intents.length ? intents[0].intent : null,
			wishes: entities,
			context: context
		});
	} catch (error) {
		console.error(error);
	}

	const messageObj = {
		messages: messages,
		context: context,
		intent: null
	};
	console.log(messageObj);
	// return the response message
	return messageObj;

	// } else {
	// 	console.log('Further information is required');
	// 	// the conversation is not finished, since we need more info to process
	// 	// if current intent is null, start a new conversation, we also need to store the intent for later use
	// 	if (!previousIntent) {
	// 		previousIntent = intents.map((item) => item.intent)[0];
	//     }
	// 	let messages = output.text ? output.text : responseMessage.messageNotRecognizedResponse();

	// 	if (intents === []){
	// 		messages = responseMessage.MESSAGE_NOT_RECOGNIZED;
	// 	}

	//     userActiveLogger.addHistory(id, {
	// 		question: input.text,
	// 		answer: messages,
	// 		intent: previousIntent,
	// 		wish: entities,
	// 		context: context
	// 	});

	// 	return {
	// 		messages: messages,
	//         context: context,
	//         intent: previousIntent
	// 	};
	// }
};

exports.process_location = async (id, previousIntent, context) => {
	let messages = [];
	try {
		const conversation = new Conversation(id);
		messages = await conversation.processWithCoordinate(null);
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

	const messageObj = {
		messages: messages,
		context: context,
		intent: null
	};
	console.log(messageObj);
	return messageObj;
}