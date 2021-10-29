const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

require('dotenv').config()

const Person = require('./models/person')

app.use(morgan(function (tokens, req, res) {
    let data = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ]
    if (data[0] == 'POST') {
        data.push(JSON.stringify(req.body))
    }
    return data.join(' ')
}))
app.use(express.json())
app.use(cors())
app.use(express.static('static'))

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has ingo for ${notes.length} people</div>
        <br />
        <div>${new Date()}</div>
    `)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(data => response.json(data))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(data => response.json(data))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const data = request.body
    let error = undefined

    if (!data.name) {
        error = 'name missing'
    }
    if (!data.number) {
        error = 'number missing'
    }
    if (error) {
        return response.status(400).json({ error })
    }

    const person = new Person({...data})
    person.save().then(data => response.json(data))
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
