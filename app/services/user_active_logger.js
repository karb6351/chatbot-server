class UserActiveLogger {
	constructor(){
		this.users = {};
	}
	createUserInfo(key, user) {
		this.users[key] = {
			user: user,
			routeId: '',
			history: [],
			currentAction: '',
			currentLocation: '',
			location: {
				next: '',
				last: '',
				current: ''
			}
		};
	}
	addHistory(key, { question, answer, intent, wish, location }) {
		let userActiveInfo = this.user[key];
		newHistory = [
			...userActiveInfo.history,
			{
				question,
				answer,
				intent,
				wish,
				location
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
	addCurrentLocation(key, location) {
		let userActiveInfo = this.users[key];
		userActiveInfo.currentLocation = location;
		this.users[key] = userActiveInfo;
	}
	addRouteId(key, routeId) {
		console.log(key, routeId);
		let userActiveInfo = this.users[key];
		userActiveInfo.routeId = routeId;
		this.users[key] = userActiveInfo;
	}
	getUsersInfo(){
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
