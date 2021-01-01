import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
const Weather = (props) => {
  const country=props.country;

  const [temp, setTemp] = useState('');
  const [speed, setSpeed] = useState('');
  const [dir, setDir] = useState('');

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`)
      .then(response => {
        console.log(response.data);
        setTemp(response.data.current.temperature);
        setSpeed(response.data.current.wind_speed);
        setDir(response.data.current.wind_dir)
      })
  }, [country])

  return(
    <div>
      <p>Temperature: {temp}<br />
      Wind: {speed}mph direction {dir}</p>
    </div>
  )
}
const Country = (props) => {
  const country = props.country;
  const languages = country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>);
  return(
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}<br />
        population {country.population}
      </p>
      <h3>Languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={country.name + ` Flag`} width="200px"/>
      <h3>Weather in {country.name}</h3>
      <Weather country={country.name} />
    </div>
  )
}

const Countries = (props) => {
  const countries = props.countries;

  const list = countries.map((country) => <li key={country.numericCode}>{country.name} <button onClick={() => {props.setFilterFunc(country.name)}}>Show</button></li>);
  if(countries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if(countries.length <= 0){
    return(
      <p>No countries match this filter</p>
    )
  }else if(countries.length === 1){
    return(
      <Country country={countries[0]} />
    )
  }else{
    return(
      <ul>
        {list}
      </ul>
    )
  }
  
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleSetFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  const addCountries = (countryArr) => {
    setCountries(countryArr);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data);
        addCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      Find countries <input value={filter} onChange={handleSetFilter} />
      <Countries countries={filteredCountries} setFilterFunc={setFilter}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))