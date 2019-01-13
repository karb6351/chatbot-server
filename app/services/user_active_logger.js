const cache = require('memory-cache');

class UserActiveLogger {
  createUserInfo(key){
    cache.put(key, {
      currentAction: "",
      history: []
    });
  }
	addHistory(key, question, answer, intent, wish) {
		userActiveInfo = cache.get(key);
		newHistory = [
			...userActiveInfo.history,
			{
				question,
				answer,
				intent,
				wish
			}
		];
		userActiveInfo.history = newHistory;
		cache.put(key, userActiveInfo);
  }
  addCurrentAction(key, action){
    userActiveInfo = cache.get(key);
    userActiveInfo.currentAction = action
    cache.put(key, userActiveInfo);
  }
  deleteUserInfo(key){
    return cache.del(key)
  }
}

module.exports = new UserActiveLogger();
