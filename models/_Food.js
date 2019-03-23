// const mongoose = require('mongoose')

// const FoodSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: {
//         type: String,
//         require: true
//     },
//     feature: {
//         type: String,
//         require: true
//     },
//     culture: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Culture',
//         require: true
//     },
//     // grades: [{
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'User',
//     // }]
// })

// module.exports = mongoose.Model('Food', FoodSchema)

const sequelize = require('./services/sequelize_service.js')
const Sequelize = require('Sequelize')

const Culture = require('./culture')

const User = sequelize.define(
    'foods',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        feature: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    { underscored: true }
)

User.belongsTo(Culture)

module.exports = User


