const router = require('express').Router();

//add router group(api) to express module

router.post('/test', require('../../app/middlewares/authApi').auth, (req, res) => {
	res.status(200).json({
    message: req.body.message,
    user: req.userData
	});
});

router.use('/message', require('./message.js'));

router.use('/', require('./authentication.js'));

router.get('/', (req, res) => {
  res.status(404).json({
    message: "Invalid URL"
  })
});

module.exports = router;
