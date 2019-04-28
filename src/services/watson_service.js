const util = require('util')
const AssistantV1 = require('watson-developer-cloud/assistant/v1')

module.exports = class WatsonService {
    constructor() {
        //initial watson assistant
        this.assistant = new AssistantV1({
            version: `${process.env.WATSON_VERSION}`,
            username: `${process.env.WATSON_USERNAME}`,
            password: `${process.env.WATSON_PASSWORD}`,
            url: `${process.env.WATSON_API_URL}`
        })
        //convert callback to promise
        this.messagePromise = util.promisify(
            this.assistant.message.bind(this.assistant)
        )
    }

    //accept text(input) and context(state) and return intent(promise)
    message(text, context = {}) {
        return this.messagePromise({
            workspace_id: process.env.WATSON_WORKSHOP_ID,
            input: { text: text },
            context: context
        })
    }
}

