const UserActiveLogger = require('../services/user_active_logger');
const mapper = require('./module_intent_mapper');
const { messageNotRecognizedResponse } = require('../../resources/string');

const RESTAURANT = 'restaurant';
const GENERAL_LOCAL_KNOWLEDGE = 'generalLocalKnowledge';

exports.RESTAURANT = RESTAURANT;
exports.GENERAL_LOCAL_KNOWLEDGE = GENERAL_LOCAL_KNOWLEDGE;

class Conversation {

  constructor(userId){
    this.userId = userId;
  }

  findModuleByIntent(intent){
    const results = Object.keys(mapper).filter((item) => {
      return mapper[item].filter(i => i.name === intent).length !== 0;
    });
    return results ? results[0] : null;
  }

  async processWithMessage(intents, context, message){
    try{
      const userInfo = UserActiveLogger.getUserInfo(this.userId);
      // use last intent to be current intent when lastIntent contains value(While mean topic not ended)
      let intent = userInfo.lastIntent ? userInfo.lastIntent : intents ? intents[0].intent : null;
      const moduleType = this.findModuleByIntent(intent);

      const payload = {}
      if (!moduleType){
        // use default module to handle
        return 'test';
      }else{
        const subModule = new (require(`./modules/${moduleType}`))(this.userId);
        const response = await subModule.response(intents, context, message, payload, subModule.INTENT);
        return response;
      }
    }catch(error){
      return {
        message: messageNotRecognizedResponse(),
        restaurant: userInfo.location.current
      };
    }
  }

  async processWithCoordinate(context, type, payload){
    try{
      const userInfo = UserActiveLogger.getUserInfo(this.userId);
      let subModule = null;
      if (type === 'restaurant'){
        subModule = new (require('./modules/restaurant'))(this.userId);
      }else{
        subModule = new (require('./modules/general_local_knowledge'))(this.userId);
      }
      const response = await subModule.response(null, context, null, null, subModule.COORDINATE);
      return response;
      
    }catch(error){
      console.log(error);
    }
  }

  async processWithContext(context){

  }
}

module.exports = Conversation;