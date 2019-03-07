exports.CHATBOT = 'chatbot';
exports.USER = 'user';

exports.build = (messages, owner = 'chatbot') => {
	return messages.map((item) => {
		let message = {
			owner: owner,
			created_at: new Date(),
			image: '',
			text: ''
		};

		switch (item.type) {
			case 'text':
				message = { ...message, text: item.content };
				break;
			case 'image':
				message = { ...message, image: item.content };
				break;
		}

		return message;
	});
};
