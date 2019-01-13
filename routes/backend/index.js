const router = require('express').Router();

//add router group(non-api) to express module

router.get('/', (req, res, next) => {
	res.render('partial/dashboard/index');
});

router.use('/', require('./authentication'));

module.exports = router;
