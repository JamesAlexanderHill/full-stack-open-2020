import React, { useState } from 'react'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
        name: newName,
        number: newNumber
    };
    const index = persons.findIndex(person => person.name == personObj.name)
    if(index == -1){
        setPersons(persons.concat(personObj));
        setNewName('');
        setNewNumber('');
    }else{
        alert(`${newName} is already added to phonebook`);
    }
    
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const numbers = persons.map((person) => {
      return <li key={person.name}>{person.name} - {person.number}</li>
  });
  return (
    <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {numbers}
        </ul>
    </div>
  )
}

export default App