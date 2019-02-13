const router = require('express').Router();

const upload = require('../../config/multer');
// const authMiddleware = require('../../app/middlewares/auth');
const authMiddleware = require('../../app/middlewares/authApi');

const authenticationController = require("../../app/controllers/authentication_controller");
const homeController = require('../../app/controllers/home_controller');
const routeController = require('../../app/controllers/route_controller');

router.use(authMiddleware);

/** add router group(non-api) to express module  */

// authentication
router.get('/login', authenticationController.login)
router.post('/login', authenticationController.doLogin)
router.get('/logout', authenticationController.logout)

// home
router.get('/home', homeController.index);

// route
router.get('/route', routeController.index);
router.get('/route/:id', routeController.getById);
router.post('/route/create', upload.single('thumbnail'), routeController.create);
router.put('/route/:id', upload.single('thumbnail'), routeController.update);
router.delete('/route/:id', routeController.delete);

router.get('/', (req, res) => res.redirect('/home'))

module.exports = router;
