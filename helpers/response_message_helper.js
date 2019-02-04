exports.CHATBOT = 'chatbot';
exports.USER = 'user';

exports.build = (message, owner = 'chatbot') => {
  return {
    message: message,
    owner: owner,
    created_at: new Date()
  }
}