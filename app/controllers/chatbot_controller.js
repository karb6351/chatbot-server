const uniqid = require('uniqid');

const User = require('../../models/user');
const Route = require('../../models/route');
const userActiveLogger = require('../services/user_active_logger');
const tokenHelper = require('../../helpers/token_helper');
const WatsonService = require('../services/watson_service');
const SpeechHandler = require('../services/speech_handler');

const watsonService = new WatsonService();

const responseMessage = require('../../resources/string');
const messageHelper = require('../../helpers/response_message_helper');

exports.message = (req, res) => {
	const { userData: { id } } = req;
	watsonService
		.message(req.body.message, req.body.context)
		.then((response) => {
			const messageObj = SpeechHandler.process_message(id, response);

			res.status(200).json(messageObj);
		})
		.catch((error) => {
			console.error(error);
			res.status(404).json(error);
		});
};

exports.init = (req, res) => {
	const { username } = req.body;
	const identifier = uniqid.time();
	User.create({
		username: username,
		identifier: identifier
	})
		.then((user) => {
			userActiveLogger.createUserInfo(identifier, user);
			const jwt = tokenHelper.generateToken(identifier);
			res.status(200).json({
				status: true,
				identifier: identifier,
				jwt: jwt,
				message: messageHelper.build(responseMessage.INIT_RESPONSE, messageHelper.CHATBOT),
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.join = (req, res) => {
    console.log(req.userData);
	const { userData: { id } } = req;
    const { routeId } = req.body;
	// find first restautran of the route;
	Route.findOne({
		where: {
			id: routeId
        },
        // include: [{
        //     model: Restaurant,
        //     where: { route_id : Sequelize.col('Route.id') }
        // }]
	}).then(route => { 
        console.log(id, routeId);
        userActiveLogger.addRouteId(id, routeId);
        res.status(200).json({
            messages: messageHelper.build(responseMessage.JOIN_ROUTE_RESPONSE[0], messageHelper.CHATBOT),
            map: {}
        });
    }).catch(error => {
        console.log(error);
			res.status(500).json({
				status: false,
				message: error.message
			});
    })
};
