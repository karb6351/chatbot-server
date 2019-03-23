const mongoose = require('mongoose')

const MenuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
})

module.exports = mongoose.Model('Menu', MenuSchema)