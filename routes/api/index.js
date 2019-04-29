const router = require('express').Router();


const authMiddleware = require('../../src/middlewares/authApi');
const chatController = require('../../src/controllers/chatbot_controller');
const authenticationController = require('../../src/controllers/authentication_controller');
const routeController = require('../../src/controllers/route_controller');

//add router group(api) to express module

router.use(authMiddleware);

router.post('/chat/init', chatController.init);
router.post('/chat/join', chatController.join);
router.post('/chat/message', chatController.message);
router.put('/location/update', chatController.updateLocation);

router.get('/route', routeController.apiGetRoutes);

// router.post('/login', authenticationController.apiLogin);
// router.post('/register', authenticationController.apiRegister);

router.get('/', (req, res) => {
	res.status(404).json({
		message: 'Invalid URL'
	});
});

module.exports = router;
