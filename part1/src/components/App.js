import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => {
    const handleFilterChange =(event) => {
        props.setNewFilter(event.target.value);
    }
    return(
        <div>
            filter shown with <input value={props.newFilter} onChange={handleFilterChange} />
        </div>
    );
}

const PersonForm = (props) => {
    const handleNameChange = (event) => {
        props.setNewName(event.target.value);
    }
    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value);
    }
    return(
        <form onSubmit={props.addPerson}>
            <div>name: <input value={props.newName} onChange={handleNameChange} /></div>
            <div>number: <input value={props.newNumber} onChange={handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

const Persons = (props) => {
    return(
        <div>
            <ul>
            {props.phonebook}
            </ul>
        </div>
    )
}



const App = () => {
    const [persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newFilter, setNewFilter ] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        const personObj = {
            name: newName,
            number: newNumber
        };
        const index = persons.findIndex(person => person.name === personObj.name)
        if(index === -1){
            setPersons(persons.concat(personObj));
            setNewName('');
            setNewNumber('');
        }else{
            alert(`${newName} is already added to phonebook`);
        }
    }
    
    const phonebook = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => {
        return <li key={person.name}>{person.name} - {person.number}</li>
    });

    useEffect(() => {
        console.log('effect')
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
    }, [])
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h3>Numbers</h3>
            <Persons phonebook={phonebook}/>
        </div>
    )
}

export default App