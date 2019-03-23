// const mongoose = require('mongoose')

// const CultureSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: {
//         type: String,
//         require: true
//     },
//     description: {
//         type: String,
//         require: true
//     }
// })

// module.exports = mongoose.Model('Culture', CultureSchema)


const sequelize = require('./services/sequelize_service.js')
const Sequelize = require('Sequelize')

const Culture = sequelize.define(
    'cultures',
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
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    { underscored: true }
)

module.exports = Culture
