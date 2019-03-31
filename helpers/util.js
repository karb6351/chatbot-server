exports.storageUrlBuilder = (filename) => '/storage/' + filename;

exports.formatUserInfoLocation = (restaurant, event) => {
	return {
		name: restaurant.name,
		coordinate: {
			latitude: JSON.parse(restaurant.location).lat,
			longitude: JSON.parse(restaurant.location).lng
		},
		type: event.type,
		event_id: event.id
	};
};

// Haversine formula
exports.getDistanceFromLatLonInKm = (firstCoordinate, secondCoordinate) => {
	const lat1 = firstCoordinate.latitude;
	const lon1 = firstCoordinate.longitude;
	const lat2 = secondCoordinate.latitude;
	const lon2 = secondCoordinate.longitude;
	let R = 6371; // Radius of the earth in km
	let dLat = deg2rad(lat2 - lat1); // deg2rad below
	let dLon = deg2rad(lon2 - lon1);
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c; // Distance in km
	return d;
};

const deg2rad = (deg) => {
	return deg * (Math.PI / 180);
};
