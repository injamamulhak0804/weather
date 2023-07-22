import React from 'react'
import './Current.css'

const Current = ({ current, city }) => {
    return (
        <>
            <div className='current'>
                <b>{city} Weather Report</b>
                <div className="currentBody">
                    <img src={current.condition.icon} alt='image...' />
                    <span><b>{current.condition.text}</b></span>
                    <span><b>Temp</b> <br />{current.temp_c} deg</span>
                    <span><b>Feels like </b><br />{current.feelslike_c} deg</span>
                    <span><b>Wind Speed </b><br />{current.wind_kph} deg</span>
                </div>
            </div>
        </>
    )
}

export default Current
