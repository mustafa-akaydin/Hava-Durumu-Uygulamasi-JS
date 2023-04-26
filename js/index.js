document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('.search-box .button');
  const APIKey = '5d5c4b8c31aed6ce51c7c68fec17b11a';
  const cityInput = document.querySelector('.search-box input');
  const container = document.querySelector('.container');
  const weatherBox = document.querySelector('.weather-box');
  const weatherDetails = document.querySelector('.weather-details');
  const error404 = document.querySelector('.not-found');
  const locationButton = document.getElementById('location-button');
  const topText = document.querySelector('.top-text');




  function searchWeather() {
    const city = cityInput.value;

    if (city === '') 
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=tr`)
        .then(response => response.json())
        .then(json => {

    if(json.cod === '404'){
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'img/clear.png';
            break;
        case 'Rain':
            image.src = 'img/rain.png';
            break;
        case 'Snow':
            image.src = 'img/snow.png';
            break;
        case 'Clouds':
            image.src = 'img/cloud.png';
            break;
        case 'Haze':
            image.src = 'img/mist.png';
            break;
        default: 
            image.src = '';
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
    topText.style.display = 'none';
    });
  }

  search.addEventListener('click', searchWeather);

  cityInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
      searchWeather();
    }
  });

  locationButton.addEventListener('click', getLocation);

  function getLocation() {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          getCurrentPosition();
          topText.style.display = 'none';
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(() => {
            getCurrentPosition();
            topText.style.display = 'none';
          });
        } else {
          alert('Konum paylaşımı engellendi, lütfen tarayıcınızın konum iznini açınız.');
        }
      });
    } else {
      alert('Tarayıcınız konum paylaşmayı desteklemiyor.');
    }

  }
  
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const locationInput = document.querySelector('.search-box input');
      locationInput.value = `${latitude}, ${longitude}`;
  
      getWeatherData(latitude, longitude);
    });
  }
  
  function getWeatherData(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}&lang=tr`)
      .then(response => response.json())
      .then(json => {
      if(json.cod === '404'){
          container.style.height = '400px';
          weatherBox.style.display = 'none';
          weatherDetails.style.display = 'none';
          error404.style.display = 'block';
          error404.classList.add('fadeIn');
          return;
      }
  
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
  
        switch (json.weather[0].main) {
          case 'Clear':
            image.src = 'img/clear.png';
            break;
          case 'Rain':
            image.src = 'img/rain.png';
            break;
          case 'Snow':
            image.src = 'img/snow.png';
            break;
          case 'Clouds':
            image.src = 'img/cloud.png';
            break;
          case 'Haze':
            image.src = 'img/mist.png';
            break;
          default:
            image.src = '';
        }
  
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
      });
  }
});