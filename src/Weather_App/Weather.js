import React, { useEffect, useState } from 'react'
import './index.css'
import Current from './Current';
import Forecast from './Forecast';



const Weather = () => {
    const [city, setCity] = useState('');
    const [clicked, setClicked] = useState(false);
    const [citySuggestion, setCitySuggestion] = useState([])
    const [current,setCurrent] = useState()
    const [forecast, setForecast] = useState()
    const autoCompeleteUrl = "https://api.weatherapi.com/v1/search.json?key=c89ad057f2794992aef162120232007&q=";

    const weatherUrl = (cities) => `https://api.weatherapi.com/v1/forecast.json?key=c89ad057f2794992aef162120232007&q=${cities}&days=5&aqi=no&alerts=no`
    


    const handleClick = async (value) => {
        setCity(value)
        setClicked(true)

        const res = await fetch(weatherUrl(city));
        const data = await res.json()
        setCurrent(data.current)
        setForecast(data.forecast)
        console.log(data);
    }



    useEffect(() => {
        const getDataAfterTimeOut = setTimeout(() => {
            const FetchSuggestion = async () => {
                const response = await fetch(autoCompeleteUrl + city)
                const data = await response.json()
                const citySuggestionData = data.map((item, index) =>
                    `${item.name} , ${item.region}, ${item.country}`
                )
                setCitySuggestion(citySuggestionData);
            }
            if (!clicked && city.length > 2) {
                FetchSuggestion()
            } else {
                setCitySuggestion([])
                setClicked(false)
            }
        }, 1000)
        return () => clearTimeout(getDataAfterTimeOut);
    }, [city])


    return (
        <>
            <div className="App">
                <div className='header  position-sticky w-100 top-0 p-5'>
                    <h1 className='text-center b-4 fw-bold'>Weather Forecast</h1>
                </div>
            </div>
            <div className="app-body">
                <div className="input-form">
                    <input type="text"
                        className='in'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder='Enter a city name'
                    />

                    <div className="suggestion-wrapper">
                        {citySuggestion.map((item, index) => {
                            return (
                                <div key={index} onClick={() => handleClick(item)} className="suggestion">
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    {current && <Current
                    current = {current}
                    city = {city}
                    />}
                    {
                        forecast && <Forecast 
                        city = {city}
                        forecast = {forecast}
                        />
                    }
                </div>

            </div>
        </>
    )
}

export default Weather