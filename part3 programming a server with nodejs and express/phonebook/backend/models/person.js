const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))


const personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minLength: 3},
    number: {type: String, required: true, minLength: 8},
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

