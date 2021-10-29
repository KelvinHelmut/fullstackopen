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

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(data => response.json(data))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(data => response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
    person.save()
        .then(data => response.json(data))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {...request.body}

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(data => response.json(data))
        .catch(error => next(error))
})

app.use((error, request, response, next) => {
    console.log(error.message)

    if (error.name == 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
