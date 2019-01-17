# chatbot-server

#### step 1
* _create and config the .env file, you can copy the variable from .env.example_
* _create and modify config.json in config folder_

#### step 2
run `npm install` in terminal to install all dependencies

#### step 3
run `node_modules/.bin/sequelize db:migrate` in terminal for migration

#### step 4
run `node_modules/.bin/sequelize db:seed:all` in terminal to run the seed

#### common commend
* `npm run start` -- start running server
* `npm run js` -- start webpack hot reloading for auto compiling javascript
* `npm run sass` -- start sass complie hot reloading for auto compiling css
