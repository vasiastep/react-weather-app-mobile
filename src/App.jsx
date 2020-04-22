import React, {useState} from 'react';


const api = {
  key: '249d0f9002c1194bbde52c002bcaf14d',
  url: 'http://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const showDate = (d) => {
    const months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const weekDay = days[d.getDay()];
    const month = months[d.getMonth()];
    const day = d.getDate();
    return `${weekDay} ${month}, ${day}`
  }

  const request = (e) => {
    if(e.key === 'Enter') {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .catch(e => {
          console.log(e.message);
        })
        .then(res => res.json())
        .then(res => {
          setWeather(res)
          setQuery('')          
        })
    }
  } 

  return (
    <div className={weather.hasOwnProperty('main') && weather.main.temp > 10 ? "app" : "app warm"}>
      <main>
      <div className="query">
        <input 
          className="query-input"
          type="text" 
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          onKeyPress={request}
          value={query}
        />
      </div>
      { weather.hasOwnProperty('name') ? 
        <div className="weather">
          <div className="city">{weather.name}, {weather.sys.country}</div>
          <div className="date">{showDate(new Date())}</div>
          <div className="weather-info">
            <span className="weather-info-text">{Math.round(weather.main.temp)}°C</span>
          </div>
          <div className="description">Weather: {weather.weather[0].description}</div>
        </div>
      : <div className="city">Enter the city</div>}
      </main>

    </div>
  );
}

export default App;
