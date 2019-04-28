const userOnlineLogger = require('../src/services/user_online_logger');
const userActiveLogger = require('../src/services/user_active_logger');

const WatsonService = require('../src/services/watson_service');
const SpeechHandler = require('../src/services/speech_handler');

const watsonService = new WatsonService();

module.exports = (server) => {
	const io = require('socket.io')(server, { path: '/monitor', pingTimeout: 60000 });

	io.on('connection', (socket) => {
		// socket.on('joinChat', (id) => {
		// 	console.log('client is subscribing to user with ID: ', id);
		// 	userOnlineLogger.add(socket.id, id);
		// });
		// socket.on('message', (message, content) => {
		// 	const userId = userOnlineLogger.getBySocketId(socket.id);
		// 	watsonService
		// 		.message(message, content)
		// 		.then((response) => {
		// 			console.dir(response);
		// 			const messageObj = SpeechHandler.process_message(response);
		// 			socket.emit('responseMessage', messageObj)
		// 		})
		// 		.catch((error) => {
		// 			console.error(error);
		// 			socket.emit('responseMessage', error)
		// 		});
		// });
		socket.on('monitorUsers', () => {
			console.log('client is subscribing monitor users');
			setInterval(() => {
				socket.emit('monitorUsersResponse', userActiveLogger.getUsersInfo());
			}, 1000);
		});
		socket.on('monitorUser', (id) => {
			console.log('client is subscribing monitor user for ID: ', id);
			setInterval(() => {
				socket.emit('monitorUserResponse', userActiveLogger.getUserInfo(id));
			}, 1000);
		});
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
};
