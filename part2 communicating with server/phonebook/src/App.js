import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
      filter shown with: <input value={search} onChange={handleSearch} />
    </div>
  )
}

const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    <>
      {persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchTextChange = (event) => setSearchText(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    let index = persons.map(person => person.name).indexOf(newName)
    if (index >= 0) {
      let person = persons[index]
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(person.id, {...person, number: newNumber})
          .then(data => {
            let personsCopy = [...persons]
            personsCopy[index] = data
            setPersons(personsCopy)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService.create({name: newName, number: newNumber})
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.delete(person.id)
        .then(() => setPersons(persons.filter(e => e.id !== person.id)))
    }
  }

  useEffect(() => {
    personService.list().then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={searchText} handleSearch={handleSearchTextChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
