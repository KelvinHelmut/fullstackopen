import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

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
      <Weather country={country} />
    </>
  )
}

const CountryItem = ({country, handleShow}) => {
  return (
    <div key={country.name}>
      {country.name}
      <button onClick={() => handleShow(country)}>show</button>
    </div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => setWeather(response.data.current))
  }, [])

  if (!weather) return <div></div>

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>Temperature:</b>
        {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons[0]} alt="temperature" />
      <div>
        <b>Wind:</b>
        {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
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

  const handleShow = country => setSearch(country.name)

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
                : countriesToShow.map(
                    country => <CountryItem key={country.name} country={country} handleShow={handleShow} />
                )
            )
        }
      </div>
    </>
  );
}

export default App;
