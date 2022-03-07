import Person from './Person'

const Persons = ({persons, filter}) => {
  return (
    <table><tbody>
      {persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase())).map(p => 
        <Person key={p.name} name={p.name} number={p.number} />
      )} 
    </tbody></table>
  )
}

export default Persons