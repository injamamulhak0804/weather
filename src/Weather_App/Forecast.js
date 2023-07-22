import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import './Current.css';


const Forecast = ({ city, forecast: { forecastday } }) => {
    const [expanded, setExpanded] = useState(false);
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };


    return (
        <>
            <div>
                <h4 className='text-white text-center mb-5'>Forecast {city}</h4>
                {
                    forecastday.map((curDate, index) => {
                        const { date, day, hour } = curDate
                        const { maxtemp_c, mintemp_c, daily_chance_of_rain, condition: { icon, text } } = day
                        return (
                            <Accordion className='accordian' keys={date} expanded={expanded === date}
                                onChange={handleChange(date)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <img src={icon} alt="" />
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {date} ({text})
                                    </Typography>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        <b>Temp:</b> {mintemp_c} to {maxtemp_c} deg
                                    </Typography>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        <b>{daily_chance_of_rain}</b> of Rain Possible
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        hour.map((currHourForecast, index) => {
                                            const {temp_c, condition: { icon } } = currHourForecast
                                            return (
                                                <div key={index} className='hourTrack'>
                                                    <b>{index}:00</b>
                                                    <img src={icon} />
                                                    <div className="pro">
                                                        <LinearProgress variant="determinate" value={temp_c * 100 / maxtemp_c} />{temp_c} deg
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }


            </div>
        </>
    )
}

export default Forecast