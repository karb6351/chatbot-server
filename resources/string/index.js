const os = require('os');

exports.greetingResponse = () => [ { type: 'text', content: 'Hello. How can I help you?' } ];

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
		content: 'Select one of them that you are interested, you can find more detail by click the "View" button'
	},
	{
		type: 'text',
		content: "In the detail page, if you interest that food route, click the 'Join' button to join the journey."
	}
];

// exports.initResponse = () => [
// 	'Hello, I am your food tour guide! Thank you for choosing our service.',
// 	'Before the start of the journey, please choose a food route which you are interested!',
// 	'Click the "Route" buttom in the bottom, you will see a list of food route that we are provided.',
// 	'Select one of them that you are interested, you can find more detail by click the "View" button',
// 	"In the detail page, if you interest that food route, click the 'Join' button to join the journey."
// ];

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
	{
		type: 'text',
		content:
			'If you have any question, feel free to ask me. You can ask me How many places will I go today? How long will I take of next location? Or tell me something about the next restaurant.'
	}
];

// exports.joinRouteResponse = (route) => [
// 	`${route.title} is awesome! Hope you can enjoy the foods.`,
// 	'Let start our journey, the location of restaurant is shown on the map.',
// 	'Click the map button on the top of the screen to open the map.',
// 	'You can follow the instruction in the map to go to the restaurant',
// 	'If you have any question, feel free to ask me. You can ask me How many places will I go today? How long will I take of next location? Or tell me something about the next restaurant.'
// ];

exports.remainDistanceAndDuractionResponse = ({ distance, duration }) => [
	{
		type: 'text',
		content: `We still have ${distance} from the restaurant. It takes about ${duration}`
	}
];

// exports.remainDistanceAndDuractionResponse = ({ distance, duration }) => [
// 	`We still have ${distance} from the restaurant. It takes about ${duration}`
// ];

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

// exports.restaurantInfoResponse = (restaurant) => [
// 	`The restaurant is call ${restaurant.name}. It is a ${restaurant.culture} restaurant.`,
// 	`The popular dishes is ${restaurant.dishes}.`
// ]

exports.reachRestaurantResponse = (restaurant) => [
	{
		type: 'text',
		content: 'You are close to the restaurant. The restaurant is look like this. Do you find it ?'
	},
	{
		type: 'image',
		content: `http://192.168.2.182:8000/storage/test4.jpg`,
		// content: `http://192.168.240.131:8000/storage/test4.jpg`,
	}
];

exports.messageNotRecognizedResponse = () => [
	{
		type: 'text',
		content: "I don't know what you are talking about"
	}
];

// exports.messageNotRecognizedResponse = () => [ "I don't know what you are talking about" ];

exports.numberOfRestaurant = (count, restaurants) => [
	{
		type: 'text',
		content: `We will visit ${count} restaurant today.`
	}
];

// exports.numberOfRestaurant = (count, restaurants) => {
// 	return [ `We will visit ${count} restaurant today.` ];
// };

exports.serverErrorResponse = () => [
	{
		type: 'text',
		content: 'Oh! It seems something wrong in server. Please open the app again.'
	}
];

// exports.serverErrorResponse = () => {
// 	return [ 'Oh! It seems something wrong in server. Please open the app again.' ];
// };
