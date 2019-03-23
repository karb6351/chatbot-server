const mongoose = require('mongoose')

const GernalLocalKnowledgeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reminder: {
        type: Number
    },
    taboos: {
        type: String
    }
})

module.exports = mongoose.Model('GernalLocalKnowledge', GernalLocalKnowledgeSchema)