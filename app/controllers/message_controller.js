const WatsonService = require('../services/watson_service')
const SpeechHandler = require('../services/speech_handler')

const watsonService = new WatsonService()

exports.index = (req, res) => {
    watsonService
        .message(req.body.message, req.body.context)
        .then(response => {
            console.dir(response)
            const messageObj = SpeechHandler.process_message(response)
            res.status(200).json(messageObj)
        })
        .catch(error => {
            console.error(error)
            res.status(404).json(error)
        })
}
