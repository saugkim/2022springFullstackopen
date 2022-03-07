import { useState } from 'react'
import Header from './components/Header'
import Person from './components/Person'
import Button from './components/Button'
import Input from './components/Input'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      </form>
       */}

      <Header text='Numbers' />
      <Persons persons={persons} filter={newFilter} />
      {/* <table><tbody>
        {persons.map( person =>
           <Person key={person.name} name={person.name} number={person.number} />
        )}
        {persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase())).map(p => 
           <Person key={p.name} name={p.name} number={p.number} />
        )}
      </tbody></table> */}
    </div>
  )
}

export default App