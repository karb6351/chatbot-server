const { storageUrlBuilder } = require('../../helpers/util');

exports.greetingResponse = () => [ { type: 'text', content: 'Hello. How can I help you?' } ];

exports.confirmResponse = () => {
	return [
		{
			type: 'text',
			content: 'Are you sure?'
		}
	]
}

exports.appreciateResponse = () => {
	return [
		{
			type: "text",
			content: 'You are welcome!'
		}
	]
}

exports.wayToStartResponse = () => {
	return [
		{
			type: 'text',
			content: 'Tap the \"Route\" button in below navigation bar.'
		},
		{
			type: 'text',
			content: 'You will see a list of food route. Select a food route which you are interest.'
		},
		{
			type: 'text',
			content: 'Then you can start your journey.'
		},
		
	]
}

exports.rejectGoToNextLocationResponse = () => {
	return [
		{
			type: 'text',
			content: 'Okay. Free feel to tell me once you are ready to move on.'
		}
	]
}

exports.helpUserToFoundRestaurantResponse = () => {
	return [
		{
			type: 'text',
			content: 'Oops, please take a look the following photos. Can you find the restaurant ? '
		}
	]
}

exports.giveRestaurantDetailResponse = (restaurant) => {

	console.log(restaurant);
	let messages = [
		{
			type: 'text',
			content: `Great! let me tell you some culture/information about this restaurant.`
		}
	];
	let otherMessages = restaurant.description.split('\n').map(item => ({
		type: 'text',
		content: item
	}));
	return messages.concat(otherMessages);
}

exports.getSuggestedFood = (food) => {
	let messages = [
		{
			type: 'text',	
			content: `I suggest ${food.name}`
		},
		{
			type: 'text',	
			content: `${food.description}`
		},
		{
			type: 'text',	
			content: `Here is some photos`
		}
	];
	let otherMessages = [];
	otherMessages = JSON.parse(food.photos).map(item => {
		return {
			type: 'image',
			// content: `http://192.168.2.182:8000/${item.dataURL}`
			content: storageUrlBuilder(item.dataURL)
		}
	})
	return messages.concat(otherMessages);
}

exports.getOtherSuggestedFood = (food) => {
	const messages = [
		{
			type: 'text',
			content: `Okay. I may suggest ${food.name}`
		},
		{
			type: 'text',
			content: `${food.description}`
		},
		{
			type: 'text',	
			content: `Here is some photos`
		}
	];
	let otherMessages = [];
	otherMessages = JSON.parse(food.photos).map(item => {
		return {
			type: 'image',
			// content: `http://192.168.2.182:8000/${item.dataURL}`
			content: storageUrlBuilder(item.dataURL)
		}
	});
	return messages.concat(otherMessages);
}

exports.noOtherSuggestedFooddResponse = () => {
	return [
		{
			type: 'text',
			content: 'Sorry, i think there is no more recommened food.'
		}
	]
}

exports.initResponse = () => [
	{
		type: 'text',
		content: 'Hello, I am your food tour guide! Thank you for choosing our service.'
	},
	{
		type: 'text',
		content: 'Before the start of the journey, please choose a food route which you are interested!'
	},
	{
		type: 'text',
		content: 'Click the "Route" buttom in the bottom, you will see a list of food route that we are provided.'
	},
	{
		type: 'text',
		content: 'Select one of them that you are interested.'
	},
	// {
	// 	type: 'text',
	// 	content: 'Select one of them that you are interested, you can find more detail by click the "View" button'
	// },
	// {
	// 	type: 'text',
	// 	content: "In the detail page, if you interest that food route, click the 'Join' button to join the journey."
	// }
];

exports.wayOfOrderFoodResponse = (type = 'take_away', food) => {
	if (type === 'take_away'){
		return [

		];
	}else{
		return [
			{
				type: 'text',
				content: 'Find a sit first if you are dining there.'
			}
		];
	}
}

exports.joinRouteResponse = (route) => [
	{
		type: 'text',
		content: `${route.title} is awesome! Hope you can enjoy the foods.`
	},
	{
		type: 'text',
		content: 'Let start our journey, the location of restaurant is shown on the map.'
	},
	{
		type: 'text',
		content: 'Click the map button on the top of the screen to open the map.'
	},
	{
		type: 'text',
		content: 'You can follow the instruction in the map to go to the restaurant'
	},
	// {
	// 	type: 'text',
	// 	content:
	// 		'If you have any question, feel free to ask me. You can ask me How many places will I go today? How long will I take of next location? Or tell me something about the next restaurant.'
	// }
];

exports.wrongDirectionResponse = () => {
	return [
		{
			type: 'text',
			content: `Hey! you are in the wrong direction. Please double check the map again.`
		}
	]
}

exports.remainDistanceAndDuractionResponse = ({ distance, duration }) => [
	{
		type: 'text',
		content: `We still have ${distance} from the restaurant. It takes about ${duration}`
	}
];

exports.restaurantInfoResponse = (restaurant) => [
	{
		type: 'text',
		content: `The restaurant is call ${restaurant.name}. It is a ${restaurant.culture} restaurant.`
	},
	{
		type: 'text',
		content: `The popular dishes is ${restaurant.dishes}.`
	}
];

exports.moveToNextRestaurantResponse = () => {
	return [
		{
			type: 'text',
			content: `The location of next restaurant is shown on the map. Please follow the instruction to go to there.`
		},
	]
}

exports.noNextRestaurantRepsonse = () => {
	return [
		{
			type: 'text',
			content: 'The is the last restaurant in this route. No futher restaurant will provider.'
		}
	]
}


exports.reachRestaurantResponse = (restaurant) => {
	let response = [
		{
			type: 'text',
			content: 'You are close to the restaurant. The restaurant is look like this. Do you find it ?'
		}
	];
	let imageResponse = JSON.parse(restaurant.photos).map(item => {
		return {
			type: 'image',
			// content: `http://192.168.2.182:8000/${item.dataURL}`
			content: storageUrlBuilder(item.dataURL)
		};
	})
	return response.concat(imageResponse);
};

exports.reachGeneralLocalKnowledgeResponse = (generalLocalKnowledge) => {
	let response = [
		{
			type: 'text',
			content: 'Hey, just a moment.'
		}
	];
	let otherResponse = generalLocalKnowledge.reminder.split('\n').map(item => {
		return {
			type: 'text',
			content: item
		};
	});
	console.log(otherResponse);
	return response.concat(otherResponse);
};

exports.reachLastResponse = () => {
	return [
		{
			type: 'text',
			content: 'Happiness was past so fast,here is the last restaurant in your route today.'
		},
	]
}

exports.messageNotRecognizedResponse = () => [
	{
		type: 'text',
		content: "I don't know what you are talking about"
	}
];

exports.numberOfRestaurant = (count, restaurants) => [
	{
		type: 'text',
		content: `We will visit ${count} restaurant today.`
	}
];

exports.serverErrorResponse = () => [
	{
		type: 'text',
		content: 'Oh! It seems something wrong in server. Please open the app again.'
	}
];
