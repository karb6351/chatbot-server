class UserOnlineLogger {
	constructor() {
		this.users = {};
	}
	get() {
		return this.users;
	}

	getBySocketId(socketId) {
		return this.users[socketId];
	}

	add(socketId, userId) {
		this.users[socketId] = userId;
	}

	delete(socketId) {
		delete this.users[socketId];
	}
}

const userOnlineLogger = new UserOnlineLogger();

module.exports = userOnlineLogger;
