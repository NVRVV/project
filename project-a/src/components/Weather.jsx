import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import 'boxicons/css/boxicons.min.css';
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    
  }

  const search = async (city) => {
    if (city == "") {
      alert("Enter City Name");
      return;
    }
    try {
      const API_Key = '4cd1a7795117867d40fc808f0ecfa8be'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching of Weather Data");
    }
  }

  

  return (
    <div className='weather'>
        <div className="searchBar">
            <input ref={inputRef} type="text" placeholder='Enter City Name'/>
            <i class='bx bx-search-alt' onClick={() => search(inputRef.current.value)}></i>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weatherIcon'/>
        <p className='temp'>{weatherData.temperature}°C</p>
        <p className='loc'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col1">
          <i class='bx bx-droplet'></i>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>humidity</span>
          </div>
          </div>
          <div className="col2">
          <i class='bx bx-wind' ></i>
          <div>
            <p>{weatherData.windSpeed} Km </p>
            <span>Wind Speed</span>
          </div>
          </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather
