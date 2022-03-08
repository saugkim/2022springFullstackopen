import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange= (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const p = {
      name: newName,
      number: newNumber
    }

    if ( persons.find(person => person.name === newName) === undefined ) {
      setPersons(persons.concat(p))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <Header text='Phonbook' />
      <Filter filter={newFilter} handler={handleFilterChange} />

      <Header text='add a new' />
      <PersonForm name={newName} number={newNumber} namdHandler={handleNameChange} numberHandler={handleNumberChange} addPersonHandler={addPerson} /> 
      {/* <form>
        <Input text='name' name={newName} handler={handleNameChange} />
        <Input text='number' name={newNumber} handler={handleNumberChange} />
        <Button text='add' handler={addPerson} />
      </form> */}

      <Header text='Numbers' />
      <Persons persons={persons} filter={newFilter} />
      {/* <table><tbody>
        {persons.map( person =>
           <Person key={person.name} name={person.name} number={person.number} />
        )}
      </tbody></table> */}
    </div>
  )
}

export default App