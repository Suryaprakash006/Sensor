const mongoose = require('mongoose')
const StreetSchema = new mongoose.Schema({
    data: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now },
})
const StreetModel = mongoose.model('streets', StreetSchema)
module.exports = StreetModel