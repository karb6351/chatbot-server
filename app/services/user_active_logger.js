class UserActiveLogger {
	constructor() {
		this.users = {};

		this.ACTION_WALK = 0;
		this.ACTION_EAT = 1;
		this.ACTION_STOP = 2;
	}
	createUserInfo(key, user) {
		this.users[key] = {
			user: user,
			routeId: -1,
			history: [],
			currentAction: '',
			currentCoordinate: '',
			location: {
				next: '',
				last: '',
				current: ''
			},
			state: null
		};
	}
	addHistory(key, { question, answer, intent, wish, location, context }) {
		let userActiveInfo = this.users[key];
		let newHistory = [
			...userActiveInfo.history,
			{
				question,
				answer,
				intent,
				wish,
				location,
				context
			}
		];
		userActiveInfo.history = newHistory;
		this.users[key] = userActiveInfo;
	}
	addCurrentAction(key, action) {
		let userActiveInfo = this.users[key];
		userActiveInfo.currentAction = action;
		this.users[key] = userActiveInfo;
	}
	addCurrentCoordinate(key, location) {
		let userActiveInfo = this.users[key];
		userActiveInfo.currentCoordinate = location;
		this.users[key] = userActiveInfo;
	}
	addRouteId(key, routeId) {
		let userActiveInfo = this.users[key];
		userActiveInfo.routeId = routeId;
		this.users[key] = userActiveInfo;
	}
	isJoined(key){
		return this.users[key].routeId !== -1;
	}
	setNextLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.location.next = location;
		this.users[key] = userActiveInfo;
	}
	setCurrentLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.location.current = location;
		this.users[key] = userActiveInfo;
	}
	setLastLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.location.last = location;
		this.users[key] = userActiveInfo;
	}
	setState(key, state){
		let userActiveInfo = this.users[key];
		userActiveInfo.state = state;
		this.users[key] = userActiveInfo;	
	}
	getUsersInfo() {
		return this.users;
	}
	getUserInfo(key) {
		return this.users[key];
	}
	deleteUserInfo(key) {
		delete this.users[key];
	}
}

const userActiveLogger = new UserActiveLogger();

module.exports = userActiveLogger;
