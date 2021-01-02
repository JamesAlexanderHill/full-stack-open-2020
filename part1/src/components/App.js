import React, { useEffect, useState } from 'react'
import personServices from '../services/persons'

const Notification = ({message}) => {
    if(message == null){
        return null;
    }
    const notifStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    return(
        <div style={notifStyle}>
            {message}
        </div>
    )
}

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
    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newFilter, setNewFilter ] = useState('');
    const [ message, setMessage ] = useState(null)

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
                setMessage(`Added ${returnedPerson.name}`);
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
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
                        setMessage(`${person.name} was sucessfully edited`);
                        setTimeout(() => {
                            setMessage(null)
                        }, 3000)
                    })
                }
            }
            
        }
    }
    
    

    useEffect(() => {
        personServices
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons);
        })
    }, [])
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h3>Numbers</h3>
            <Persons persons={persons} newFilter={newFilter} setPersonsFunc={setPersons} />
        </div>
    )
}

export default App