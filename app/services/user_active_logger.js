const cache = require('memory-cache');

class UserActiveLogger {
	createUserInfo(key) {
		cache.put(key, {
			history: [],
			currentAction: '',
			currentLocation: '',
			location: {
				next: '',
				last: '',
				current: ''
			}
		});
	}
	addHistory(key, { question, answer, intent, wish, location }) {
		userActiveInfo = cache.get(key);
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
		cache.put(key, userActiveInfo);
	}
	addCurrentAction(key, action) {
		userActiveInfo = cache.get(key);
		userActiveInfo.currentAction = action;
		cache.put(key, userActiveInfo);
	}
	getUserInfo(key) {
		return cache.get(key);
	}
	deleteUserInfo(key) {
		return cache.del(key);
	}
}

const UserActiveLogger = new UserActiveLogger();

module.exports = UserActiveLogger;
