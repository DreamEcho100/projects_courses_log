import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import WeatherCard from "./WeatherCard/Component.js";
import Loader from './Loader.js'

function WeatherEngine(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let query;//const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    city: null,
    country: null,
    condition: null,
    temp: null
  })
  const getWeather = async q => {
    //setQuery("");
    query = "";
    setLoading(true);
    try {
        let target = q.slice(0,1).toUpperCase() + q.slice(1);
        const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${target}&units=metric&APPID=a957f14e3c54881472646d30636a4a83`);
        const resJSON = await apiRes.json();
        setWeather({
            city: resJSON.name,
            country: resJSON.sys.country,
            condition: resJSON.weather[0].main,
            temp: resJSON.main.temp
        });
    } catch (e) {
        setError(true);
    }
    setLoading(false);  
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  }

  useEffect(() => {
    getWeather(props.defaultLocation);
  }, [props.defaultLocation])
  
  const WeatherEng = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 12.5rem;
    align-items: center;
  `;

  return (
    <div>{
        (!loading && !error) ? (
            <WeatherEng>
            <WeatherCard temp={weather.temp} condition={weather.condition} city={weather.city} country={weather.country} />
            <form>
                <input value={ query } onChange={  e => query = e.target.value } />
                <button onClick={ e => handleSearch(e) } >Search</button>
            </form>
            </WeatherEng>
        ) : loading ? (
            <Loader />
        ) : (!loading && error) ? (
            <div>
                There has been an error!
                <button onClick={ () => setError(false)}>Reset?</button>
            </div>
        ) : null
    }</div>
  );
}// e => setQuery(e.target.value) 

export default WeatherEngine;
