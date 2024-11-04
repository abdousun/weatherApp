import './App.css';
import cloudIcon from './image/cloud.png';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [temp, setTemp] = useState({ number: null, description: "", min: null, max: null, icon: null });
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Fetch weather data
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=33.5731104&lon=-7.5898434&appid=fc06787c62cabc972fb44e2a9786ad5c"
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // Get current date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('ar-MA', options)); // For Arabic/Moroccan date format

  }, []);

  return (
    <div className="App">
      <div className="flex items-center justify-center min-h-screen bg-[#2563eb]">
        {/* Card */}
        <div className="w-[600px] h-[350px] rounded-lg shadow-lg bg-[#1e40af] grid grid-rows-4 grids-col">
          {/* Content */}
          <div className="row-span-1 col-span relative text-white">
            {/* City and Time */}
            <h1 className="absolute bottom-7 right-4 font-title font-medium text-5xl">الدارالبيضاء</h1>
            <h1 className="absolute bottom-1 ml-40 font-title font-small text-xl">{currentDate}</h1>
          </div>

          {/* Degree and Description */}
          <div className="row-span-1 col-span relative text-white">
            <hr className="w-[95%] mx-auto border-gray-200" />

            {/* Weather Icon */}
            <div className="absolute bottom-4 right-[250px]">
              <div className="w-[70px] h-[60px]">
                <img src={temp.icon} alt="Weather icon" />
              </div>
            </div>

            <div className="absolute bottom--5 right-4 text-right">
              <h1 className="font-title text-9xl mt-8">
                {temp.number !== null ? `${temp.number}°C` : "Loading..."}
              </h1>
              <h1 className="font-title text-xl mr-12 mt-0">
                {temp.description || "Loading..."}
              </h1>
              <h1 className="font-title text-s mr-9 mt-3">
                الصغرى {temp.min !== null ? `${temp.min}°C` : "Loading..."} | الكبرى{" "}
                {temp.max !== null ? `${temp.max}°C` : "Loading..."}
              </h1>
            </div>

            <img 
              src={cloudIcon}  
              alt="cloud icon"
              className="ml-12 mt-10 w-40 h-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
