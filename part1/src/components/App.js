import React, { useEffect, useState } from 'react'
import personServices from '../services/persons'

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

const Persons = ({persons, newFilter, setPersonsFunc}) => {

    const phonebook = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => {
        return <li key={person.name}>{person.name} - {person.number} <button onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
                personServices
                .remove(person.id)
                .then((returnedPerson) => {
                    const newPersons = persons.filter(p => p.id !== person.id);
                    setPersonsFunc(newPersons);
                })
            }
        }}>Delete</button></li>
    });

    return(
        <div>
            <ul>
            {phonebook}
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
        
        const person = persons.find(p => p.name === personObj.name);
        if(!person){
            personServices
            .create(personObj)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
            })
        }else{
            if(person.number === personObj.number){
                alert(`${person.name} is already added to phonebook`);
            }else{
                //update phone number
                if (window.confirm(`${person.name} is already added to your phonebook, replace the old number with a new one?`)) {
                    personServices
                    .put(person.id, personObj)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson));
                        setNewName('');
                        setNewNumber('');
                    })
                }
            }
            
        }
    }
    
    

    useEffect(() => {
        //console.log('effect')
        // axios
        // .get('http://localhost:3001/persons')
        // .then(response => {
        //     console.log('promise fulfilled')
        //     setPersons(response.data)
        // })

        personServices
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons);
        })
    }, [])
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h3>Numbers</h3>
            <Persons persons={persons} newFilter={newFilter} setPersonsFunc={setPersons} />
        </div>
    )
}

export default App