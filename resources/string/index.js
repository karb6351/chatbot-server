exports.initResponse = () => [
	'Hello, I am your food tour guide! Thank you for choosing our service.',
	'Before the start of the journey, please choose a food route which you are interested!',
	'Click the "Route" buttom in the bottom, you will see a list of food route that we are provided.',
	'Select one of them that you are interested, you can find more detail by click the "View" button',
	"In the detail page, if you interest that food route, click the 'Join' button to join the journey."
];

exports.joinRouteResponse = (route) => [
	`${route.title} is awesome! Hope you can enjoy the foods.`,
	'Let start our journey, the location of restaurant is shown on the map.',
	'Click the map button on the top of the screen to open the map.',
	'You can follow the instruction in the map to go to the restaurant',
	'If you have any question, feel free to ask me. You can ask me How many places will I go today? How long will I take of next location? Or tell me something about the next restaurant.'
];

exports.remainDistanceAndDuractionResponse = ({ distance, duration }) => [
	`We still have ${distance} from the restaurant. It takes about ${duration}`
];

exports.restaurantInfoResponse = (restaurant) => {
	return [
		`The restaurant is call ${restaurant.name}. It is a ${restaurant.culture} restaurant.`,
		`The popular dishes is ${restaurant.dishes}.`
	]
}

exports.messageNotRecognizedResponse = () => [ "I don't know what you are talking about" ];

exports.numberOfRestaurant = (count, restaurants) => {
	return [ `We will visit ${count} restaurant today.` ];
};

exports.serverErrorResponse = () => {
	return [ 'Oh! It seems something wrong in server. Please open the app again.' ];
};
