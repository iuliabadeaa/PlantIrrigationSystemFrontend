function getWeather()
{
    const apiKey='b81834e32805dd2db69bf7e7b691e1ec';
    const city=document.getElementById('city').value;
    if(!city){
        alert('Please enter a city');
        return;
    }
    const currentWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(currentWeatherURL)
        .then(response=>response.json())
        .then(data=>{
            displayWeather(data);
        })
        .catch(error=>{
            console.error('Error fetching current weather data: ',error);
            alert('error fetching current data. Please try again.');
        });
    
    fetch(forecastURL)
        .then(response=>response.json())
        .then(data=>{
            displayHourlyForecast(data.list);
        })
        .catch(error=>{
            console.error('Error fetching hourly forecast data: ',error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data){
    const tempDivInfo=document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const weatherIcon=document.getElementById('weather-icon');
    const hourlyForecastDiv=document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    if(data.cod==='404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`;
    }else{
        const cityName=data.name;
        const temp=Math.round(data.main.temp - 273.15);
        const description=data.weather[0].description;
        const iconCode=data.weather[0].icon;
        const iconURL=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML=`
        <p>${temp}°C</p>
        `;
        const weatherHTML=`
        <p>${cityName}</p>
        <p>${description}</p>
        `;

        tempDivInfo.innerHTML=temperatureHTML;
        weatherInfoDiv.innerHTML=weatherHTML;
        weatherIcon.src=iconURL;
        weatherIcon.alt=description;
        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv=document.getElementById('hourly-forecast');
    const next24hours=hourlyData.slice(0, 8);

    next24hours.forEach(item=>{

        const dateTime=new Date(item.dt*1000);
        const hour=dateTime.getHours();
        const temp=Math.round(item.main.temp-273.15);
        const iconCode=item.weather[0].icon;
        const iconURL=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const hourlyItemHTML=`
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconURL}" alt="Hourly weather icon">
        <span>${temp}°C</span>
        </div>
        `;
        hourlyForecastDiv.innerHTML+=hourlyItemHTML;

    });
}

function showImage(){
    const weatherIcon=document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}