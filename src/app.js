function dateFormat(timestamp) {
  let date = new Date(timestamp)
  let hours = date.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let days = [
    'Sunday',
    'Monday',
    'Tuethday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]
  return `${day} ${hours}:${minutes}`
}

function formatDay(timestemp) {
  let date = new Date(timestemp * 1000)
  let day = date.getDay()
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return days[day]
}

function displayForecast(response) {
  let forecast = response.data.daily
  let forecastElement = document.querySelector('#forecast')
  let forecastHTML = `<div class="row">`

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="40"
        />
        <div class="weather-forecast-temps">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max,
          )}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min,
          )}° </span>
        </div>
      </div>
  `
    }
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML
}

function getForecast(coordinates) {
  let apiKey = '49b631c45785fe73d2a88477803dea22'
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response) {
  let tempElement = document.querySelector('#temperature')
  let cityElement = document.querySelector('#city')
  let descriptionElement = document.querySelector('#description')
  let humidityElement = document.querySelector('#humidity')
  let windElement = document.querySelector('#wind')
  let dateElement = document.querySelector('#date')
  let iconElement = document.querySelector('#icon')

  celsiusTemp = response.data.main.temp

  tempElement.innerHTML = Math.round(response.data.main.temp)
  cityElement.innerHTML = response.data.name
  descriptionElement.innerHTML = response.data.weather[0].description
  humidityElement.innerHTML = response.data.main.humidity
  windElement.innerHTML = Math.round(response.data.wind.speed)
  dateElement.innerHTML = dateFormat(response.data.dt * 1000)
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )
  iconElement.setAttribute('alt', response.data.weather[0].description)

  getForecast(response.data.coord)
}

function search(city) {
  let apiKey = '49b631c45785fe73d2a88477803dea22'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayTemperature)
}

function submitAction(event) {
  event.preventDefault()
  let cityInputElement = document.querySelector('#city-input')
  search(cityInputElement.value)
}

function showFahrenheitTemp(event) {
  event.preventDefault()
  let fahrTemp = celsiusTemp * 1.8 + 32
  celsiusLink.classList.remove('active')
  fahrenheitLink.classList.add('active')
  let tempElement = document.querySelector('#temperature')
  tempElement.innerHTML = Math.round(fahrTemp)
}

function showCelsiusTemp(event) {
  event.preventDefault()
  let tempElement = document.querySelector('#temperature')
  celsiusLink.classList.add('active')
  fahrenheitLink.classList.remove('active')
  tempElement.innerHTML = Math.round(celsiusTemp)
}

let celsiusTemp = null

let form = document.querySelector('#search-form')
form.addEventListener('submit', submitAction)

let fahrenheitLink = document.querySelector('#fahrenheit-link')
fahrenheitLink.addEventListener('click', showFahrenheitTemp)

let celsiusLink = document.querySelector('#celsius-link')
celsiusLink.addEventListener('click', showCelsiusTemp)

function myLocation(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  let apiKey = '49b631c45785fe73d2a88477803dea22'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayTemperature)
}

function getLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(myLocation)
}

let myLocationBtn = document.querySelector('#my-location')
myLocationBtn.addEventListener('click', getLocation)

search('Copenhagen')
