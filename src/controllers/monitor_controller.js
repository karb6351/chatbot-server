
const userOnlineLogger = require('../services/user_online_logger');

exports.addOnlineUser = (socketId, id) => {
  return userOnlineLogger.add(socketId, id);
}

exports.removeOnlineUser = sockeId => {
  return userOnlineLogger.delete(sockeId);
}

exports.getOnlineUsers = () => {
  return userOnlineLogger.get();
}

exports.getOnlineUser = id => {
  return userOnlineLogger.getBySocketId(id);
}
