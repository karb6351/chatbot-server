// for each user(or autherication), they should contain current intent variable(maybe use session)

// simulate current intent variable
let currentIntent = null

// dummy data to simulate the response message
const dumpResponse = {
    "date": "It is a date intent",
    "get_weather": "It is a get weather intent with mutil state",
    'General_Greetings': "Hello. How can I help you?"
}

exports.process_message = ({ intents, entites, output, context }) => {
    // when the branch is exited, it means no further information is required, system can process the result
    // when the branch is not exited, it means we still required other information to process the request
    if (context.system.branch_exited) {
        console.log("No further information is required, we can process the result")
        // no further conversation, system need to provide info base on intent and entities
        // the output text can use for response template
        // .... data filtering, we should make a database api call here  .... //

        // dummy data
        const messageObj = {
            message: currentIntent ? dumpResponse[currentIntent] : dumpResponse[intents[0].intent],
            context: context
        }

        //we also need to clear current intent
        currentIntent = null
        // return the response message
        return messageObj
    } else {
        console.log("Further information is required")
        // the conversation is not finished, since we need more info to process
        // if current intent is null, start a new conversation, we also need to store the intent for later use
        if (!currentIntent) {
            currentIntent = intents.map(item => item.intent)[0]
        }
        return {
            message: output.text[0] ? output.text[0] : 'I don\'t know what you are talking about',
            context: context
        }
    }
}
