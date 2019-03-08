const userActiveLogger = require('../services/user_active_logger');
const mapper = require('./module_intent_mapper');

class Conversation {
  constructor(id){
    this.id = id;
  }

  findModuleByIntent(intent){
    const results = Object.keys(mapper).filter((item) => {
      return mapper[item].includes(intent);
    });
    return results ? results[0] : null;
  }

  processWithMessage(intent, context, message){
    const info = userActiveLogger.getUserInfo(this.id);
    const moduleType = this.findModuleByIntent(intent);
    const payload = {
      
    }
    console.log();
    if (!moduleType){

    }else{
      const subModule = new (require(`./modules/${moduleType}`))();
      subModule.response(intent, context, payload);

    }
  }

  processWithCoordinate(context){

  }
}

module.exports = Conversation;