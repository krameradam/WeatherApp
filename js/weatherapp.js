const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=38d095b1dc067caefc9c7a05b9a0d371';
const units = '&units=metric';
let city;
let url;

const getWeather = () => {
    city = (!input.value) ? 'New York' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather)

            cityName.textContent = res.data.name
            weather.textContent = status.main
            temperature.textContent = Math.floor(temp) + '°C'
            humidity.textContent = hum + '%'

            warning.textContent = ''
            input.value = ''

            if (status.id < 300) {
                photo.setAttribute('src', '../photos/thunderstorm.png')
            } else if (status.id >= 300 && status.id < 500) {
                photo.setAttribute('src', '../photos/drizzle.png')
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', '../photos/rain.png')
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', '../photos/ice.png')
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', '../photos/fog.png')
            } else if (status.id === 800) {
                photo.setAttribute('src', './photos/sun.png')
            } else if (status.id > 800) {
                photo.setAttribute('src', '../photos/cloud.png')
            } else {
                photo.setAttribute('src', '../photos/unknown.png')
            }
        })
        .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta') //wyłapujemy błędy 
};

const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather()
    }
};

getWeather()
btn.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)