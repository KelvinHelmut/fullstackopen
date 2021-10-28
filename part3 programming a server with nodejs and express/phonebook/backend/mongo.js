const mongoose = require('mongoose')

const args = process.argv.length
let name = undefined
let number = undefined

if (args < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else {
    if (args == 4) {
        console.log('Please provide the name and number as arguments: node mongo.js <password> <name> <number>')
        process.exit(1)
    }
    name = process.argv[3]
    number = process.argv[4]
}

const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@cluster0.v2mcu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name) {
    const person = new Person({
        name,
        number,
    })

    person.save().then(data => {
        console.log(`added ${data.name} number ${data.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(data => {
        console.log('phonebook:')
        for (let person of data) {
            console.log(`${person.name} ${person.number}`)
        }
        mongoose.connection.close()
    })
}
