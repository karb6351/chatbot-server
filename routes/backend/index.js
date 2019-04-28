const router = require('express').Router();

const upload = require('../../config/multer');
const authMiddleware = require('../../src/middlewares/auth');
// const authMiddleware = require('../../app/middlewares/authApi');

const authenticationController = require("../../src/controllers/authentication_controller");
const fileController = require('../../src/controllers/file_controller');
const homeController = require('../../src/controllers/home_controller');
const routeController = require('../../src/controllers/route_controller');
const cultureController = require('../../src/controllers/culture_controller');
const foodController = require('../../src/controllers/food_controller');
const eventController = require('../../src/controllers/event_controller');
const restaurantController = require('../../src/controllers/restaurant_controller');
const generallocalknowledgeController = require('../../src/controllers/generallocalknowledge_controller');

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

// culture
router.get('/culture', cultureController.index);
router.get('/culture/create', cultureController.create);
router.post('/culture', cultureController.save);
router.get('/culture/:id/edit', cultureController.edit);
router.put('/culture/:id',  cultureController.update);
router.delete('/culture/:id', cultureController.delete);

// route
router.get('/route', routeController.index);
router.get('/route/create', routeController.create);
router.post('/route', routeController.save);
router.get('/route/:id/edit', routeController.edit);
router.get('/route/:id', routeController.getById);
router.put('/route/:id',  routeController.update);
router.delete('/route/:id', routeController.delete);

// food
router.get('/food', foodController.index);
router.get('/food/create', foodController.create);
router.post('/food', foodController.save);
router.get('/food/:id/edit', foodController.edit);
router.get('/food/:id', foodController.getById);
router.put('/food/:id',  foodController.update);
router.delete('/food/:id', foodController.delete);

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
router.get('/restaurant/create', restaurantController.create);
router.post('/restaurant/', restaurantController.save);
router.get('/restaurant/:id/edit', restaurantController.edit);
router.get('/restaurant/:id', restaurantController.getById);
router.put('/restaurant/:id', restaurantController.update);
router.delete('/restaurant/:id', restaurantController.delete);

// general local knowledge
router.get('/generallocalknowledge', generallocalknowledgeController.index);
router.get('/generallocalknowledge/create', generallocalknowledgeController.create);
router.post('/generallocalknowledge/', generallocalknowledgeController.save);
router.get('/generallocalknowledge/:id/edit', generallocalknowledgeController.edit);
router.get('/generallocalknowledge/:id', generallocalknowledgeController.getById);
router.put('/generallocalknowledge/:id', generallocalknowledgeController.update);
router.delete('/generallocalknowledge/:id', generallocalknowledgeController.delete);

// event
// router.get('/event', eventController.index);
router.get('/event/create/:routeId', eventController.create);
router.post('/event', eventController.save);
router.get('/event/:id/edit', eventController.edit);
router.put('/event/:id', eventController.update);
router.delete('/event/:id', eventController.delete);


router.get('/', (req, res) => res.redirect('/home'))

module.exports = router;
