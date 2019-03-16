const mapper = require('./module_intent_mapper');
const { messageNotRecognizedResponse } = require('../../resources/string');

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
        const response = await subModule.response(intents, context, message, payload);
        console.log(response);
        return response;
      }
    }catch(error){
      return messageNotRecognizedResponse();
    }
    
  }

  processWithCoordinate(context){

  }

  processWithContext(context){

  }
}

module.exports = Conversation;