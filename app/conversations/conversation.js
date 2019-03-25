const UserActiveLogger = require('../services/user_active_logger');
const mapper = require('./module_intent_mapper');
const { messageNotRecognizedResponse, reachRestaurantResponse } = require('../../resources/string');

const Event = require('../../models/event');
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
      const moduleType = this.findModuleByIntent(intents[0].intent);
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
      return messageNotRecognizedResponse();
    }
  }

  async processWithCoordinate(context){
    try{
      const userInfo = UserActiveLogger.getUserInfo(this.userId);
      const eventId = userInfo.currentEventId;

      
      // dummy data for testing
      return await new Promise((resolve, reject) => {
        resolve(reachRestaurantResponse())
      })


      const event = await Event.findOne({where: {id: eventId}});
      let subModule = null;
      if (event.type === 'restaurant'){
        subModule = new (require('./modules/restaurant'))(this.userId);
      }else{
        subModule = new (require('./modules/general_local_knowledge'))(this.userId);
      }
      const response = await subModule.response(null, context, null, null, subModule.COORDINATE);
      return response;
    }catch(error){

    }
  }

  async processWithContext(context){

  }
}

module.exports = Conversation;