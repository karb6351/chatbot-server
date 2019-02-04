const router = require('express').Router();

const authMiddleware = require('../../app/middlewares/authApi');
const messageController = require('../../app/controllers/chatbot_controller');
const authenticationController = require('../../app/controllers/authentication_controller');

//add router group(api) to express module

router.use(authMiddleware);

router.post('/chat/init', messageController.init);
router.post('/chat/join', messageController.join);
router.post('/chat/message', messageController.message);

router.post('/login', authenticationController.apiLogin);
router.post('/register', authenticationController.apiRegister);

router.get('/', (req, res) => {
	res.status(404).json({
		message: 'Invalid URL'
	});
});

module.exports = router;
