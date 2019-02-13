exports.CHATBOT = 'chatbot';
exports.USER = 'user';

exports.build = (messages, owner = 'chatbot') => {
	return messages.map((item) => ({
		message: item,
		owner: owner,
		created_at: new Date()
	}));
};
