const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

let notes = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has ingo for ${notes.length} people</div>
        <br />
        <div>${new Date()}</div>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
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
    if (notes.find(note => note.name === data.name)) {
        error = 'name must be unique'
    }
    if (error) {
        return response.status(400).json({ error })
    }

    const note = {...data, id: generateId()}
    notes = notes.concat(note)
    response.json(note)
})

const generateId = () => {
    return Math.floor(Math.random() * 999999999)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
