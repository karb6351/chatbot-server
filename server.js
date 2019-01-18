require('dotenv/config');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const hbs = require('express-handlebars');
const engine = require('ejs-mate');
const path = require('path');
const cookieSession = require('cookie-session');
const flash = require('express-flash');
const cookieParse = require('cookie-parser');

const apiRoutes = require('./routes/api/index');
const backendRoutes = require('./routes/backend/index');

// webpack setup
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./config/webpack.config');
// webpack(webpackConfig)
// app.use(webpackDevMiddleware(webpack(webpackConfig)))

// static asset
app.use(express.static(__dirname + '/public'));

// cookies-session setup
app.use(
	cookieSession({
		name: 'session',
		keys: [ 'key' ],
		maxAge: 24 * 60 * 60 * 1000 * 7 // 1 week
	})
);

// cookie parse setup
app.use(cookieParse());

// flash session
app.use(flash());
app.use((req, res, next) => {
	res.locals.flash_message = req.flash('flash_message');
	next();
});

// cors setup
app.use(cors());
app.options('*', cors());

// form body setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
// app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'app', layoutsDir: __dirname + '/resources/views/layouts/', partialsDir: __dirname + '/resources/views/partials/' }));
// app.set('views', path.join(__dirname, 'resources/views'));
// app.set('view engine', 'hbs');

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

// for view to access session
app.use(
	(req, res, next) => {
		res.locals.session = req.session;
		next();
	},
	(req, res, next) => {
		app.locals.currentPath = req.path;
		next();
	}
);

//commmon variable
app.locals.menu = require('./config/menu');

// routes
app.use('/api', apiRoutes);
app.use('/', backendRoutes);

app.listen(process.env.APP_PORT || 8000, () => {
	console.log('Server is running...');
});
