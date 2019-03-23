const router = require('express').Router();

const upload = require('../../config/multer');
const authMiddleware = require('../../app/middlewares/auth');
// const authMiddleware = require('../../app/middlewares/authApi');

const authenticationController = require("../../app/controllers/authentication_controller");
const fileController = require('../../app/controllers/file_controller');
const homeController = require('../../app/controllers/home_controller');
const routeController = require('../../app/controllers/route_controller');
const eventController = require('../../app/controllers/event_controller');
const restaurantController = require('../../app/controllers/restaurant_controller');

router.use(authMiddleware);

/** add router group(non-api) to express module  */

// authentication
router.get('/login', authenticationController.login)
router.post('/login', authenticationController.doLogin)
router.get('/logout', authenticationController.logout)

// home
router.get('/home', homeController.index);

// file upload api
router.post('/file/upload',upload.single('file'), fileController.upload);

// route
router.get('/route', routeController.index);
router.get('/route/create', routeController.create);
router.post('/route', routeController.save);
router.get('/route/:id/edit', routeController.edit);
router.get('/route/:id', routeController.getById);
router.put('/route/:id',  routeController.update);
router.delete('/route/:id', routeController.delete);

// event
// router.get('/event', eventController.index);
// router.get('/event/create', eventController.create);
// router.post('/event', eventController.save);
// router.get('/event/:id/edit', eventController.edit);
// router.get('/event/:id', eventController.getById);
// router.put('/event/:id',  eventController.update);
// router.delete('/event/:id', eventController.delete);

// restaurant
router.get('/restaurant', restaurantController.index);
router.post('/restaurant/create', restaurantController.create);
router.get('/restaurant/:id', restaurantController.getById);
router.post('/restaurant/:id', restaurantController.update);
router.delete('/restaurant/:id', restaurantController.delete);


router.get('/', (req, res) => res.redirect('/home'))

module.exports = router;
