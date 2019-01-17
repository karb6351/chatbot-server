const router = require('express').Router();

const authMiddleware = require('../../app/middlewares/auth');

const authenticationController = require("../../app/controllers/authentication_controller");
const homeController = require('../../app/controllers/home_controller');

router.use(authMiddleware);

/** add router group(non-api) to express module  */

// authentication
router.get('/login', authenticationController.login)
router.post('/login', authenticationController.doLogin)
router.get('/logout', authenticationController.logout)

// home
router.use('/home', homeController.index);


router.get('/', (req, res) => res.redirect('/home'))

module.exports = router;
