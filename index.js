const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const WeatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const Error404 = document.querySelector('.not-found')




search.addEventListener('click',function(){

  const APIKey ="2780e26cb16183848ad210b90ad718b5";
   const city = document.querySelector('.search-box input').value


    if (city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey} `)
    .then(response => response.json())
    .then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            WeatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            Error404.style.display = 'block';
            Error404.classList.add('fadeIn');
            return;
        }
    
        
  
        Error404.style.display = 'none';
        Error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'imagens/clear.png';
                break;

            case 'Rain':
                image.src = 'imagens/rain (1).png';
                break;

            case 'Snow':
                image.src = 'imagens/snow.png';
                break;

            case 'Clouds':
                image.src = 'imagens/cloud.png';
                break;

            case 'Haze':
                image.src = 'imagens/mist.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        WeatherBox.style.display = '';
        weatherDetails.style.display = '';
        WeatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';


    });
})

