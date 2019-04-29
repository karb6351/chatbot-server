require('dotenv/config');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');
const path = require('path');
const cookieSession = require('cookie-session');
const flash = require('express-flash');
const cookieParse = require('cookie-parser');

const apiRoutes = require('./routes/api/index');
const backendRoutes = require('./routes/backend/index');

const methodOverride = require('method-override')

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
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
		delete req.body._method
		console.log(method);
    return method
  }
}))

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

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...');
});

//commmon variable
app.locals.menu = require('./config/menu');

// routes
app.use('/api', apiRoutes);
app.use('/', backendRoutes);
