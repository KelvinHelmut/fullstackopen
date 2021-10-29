const mongoose = require('mongoose')
const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

