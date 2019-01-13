// const mongoose = require('mongoose')

// const EventSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     duration: {
//         require: true,
//         type: Number
//     },
//     instruction: {
//         require: true,
//         type: String
//     },
//     restaurant: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Restaurant'
//     },
//     generalLocalKnowedge: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'GeneralLocalKnowedge'
//     }
// })

// module.exports = mongoose.Model('Event', EventSchema)


const sequelize = require('../services/sequelize_service')
const Sequelize = require('Sequelize')

const Restaurant = require('./restaurant')
const GeneralLocalKnowedge = require('./generalLocalKnowedge')

const Event = sequelize.define(
    'events',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        duration: {
            type: Sequelize.NUMBER,
            allowNull: false
        }
    },
    { underscored: true }
)

Event.belongsTo(Restaurant)
Event.belongsTo(GeneralLocalKnowedge)

module.exports = Event
