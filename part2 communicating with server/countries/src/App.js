import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width={100} />
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  let countriesToShow = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  const handleSearchOnChange = event => {
    const value = event.target.value
    setSearch(value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <>
      <div>
        find countries
        <input value={search} onChange={handleSearchOnChange} />
      </div>
      <div>
        {
          countriesToShow.length > 10
            ? 'Too many matches, specify another filter'
            : (
              countriesToShow.length === 1
                ? <Country country={countriesToShow[0]} />
                : countriesToShow.map(country => <div key={country.name}>{country.name}</div>)
            )
        }
      </div>
    </>
  );
}

export default App;
