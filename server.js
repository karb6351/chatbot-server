require('dotenv/config')

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')

const apiRoutes = require('./routes/api/index')
const route = require('./routes/backend/index')

// webpack setup
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./config/webpack.config')
// webpack(webpackConfig)
// webpack(webpackConfig)
// app.use(webpackDevMiddleware(webpack(webpackConfig)))
// static asset
app.use(express.static(__dirname + '/public'))
// cors setup
app.use(cors())
app.options('*', cors())
// form body setup
app.use(bodyParser.json())
// view engine setup
app.engine('hbs', hbs({extname: "hbs", defaultLayout: "app", layoutsDir: __dirname + "/resources/views/layouts/"}))
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'hbs')

// routes
app.use('/api', apiRoutes)
app.use("/", route)


app.listen(process.env.APP_PORT || 8000, () => {
    console.log('Server is running...')
})
