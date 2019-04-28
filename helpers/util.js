

exports.storageUrlBuilder = (filename) => {
	const domain = process.env.NODE_ENV == 'production' ? 
			process.env.APP_PROD_URL :
			process.env.APP_URL + ( ":" + process.env.APP_PORT || ":8000")
	return domain + filename;
}

exports.formatUserInfoLocation = (restaurant, event) => {
	return {
		name: restaurant.name,
		description: restaurant.description,
		coordinate: {
			latitude: JSON.parse(restaurant.location).lat,
			longitude: JSON.parse(restaurant.location).lng
		},
		type: event.type,
		event_id: event.id
	};
};

const getDistanceFromLatLonInKm = (firstCoordinate, secondCoordinate) => {
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

// Haversine formula
exports.getDistanceFromLatLonInKm = getDistanceFromLatLonInKm;

const deg2rad = (deg) => {
	return deg * (Math.PI / 180);
};


exports.getNearestLocation = (generalLocalKnowledges, location) => {
	let nearestLocation = null;
	nearestLocation = generalLocalKnowledges.reduce((min, current) =>{
		let minCoor = JSON.parse(min.location);
		let currentCoor = JSON.parse(current.location);
		console.log("min: " + minCoor)
		console.log("current: " + currentCoor)
		let locateToMinDis = getDistanceFromLatLonInKm(location, {
			latitude: minCoor.lat,
			longitude: minCoor.lng
		});
		let locateToCurrDis = getDistanceFromLatLonInKm(location, {
			latitude: currentCoor.lat,
			longitude: currentCoor.lng
		});
		console.log("min dis " + locateToMinDis);
		console.log("curr dis " + locateToCurrDis);
		return locateToMinDis < locateToCurrDis ? min : current;
	}, generalLocalKnowledges[0]);
	return nearestLocation;
}