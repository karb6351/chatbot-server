const axios = require('axios');

exports.distanceMatrix = (origin, destination, mode = 'walking', lang = 'en') => {
	const api = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${process
		.env.GOOGLE_MAP_API_KEY}&mode=${mode}&language=${lang}`;
	console.log(api);
	return axios.get(api);
};
