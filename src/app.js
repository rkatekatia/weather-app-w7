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
    'Sumday',
    'Monday',
    'Tuethday',
    'Wednesday',
    'Tursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]
  return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {
  let tempElement = document.querySelector('#temperature')
  let cityElement = document.querySelector('#city')
  let descriptionElement = document.querySelector('#description')
  let humidityElement = document.querySelector('#humidity')
  let windElement = document.querySelector('#wind')
  let dateElement = document.querySelector('#date')

  tempElement.innerHTML = Math.round(response.data.main.temp)
  cityElement.innerHTML = response.data.name
  descriptionElement.innerHTML = response.data.weather[0].description
  humidityElement.innerHTML = response.data.main.humidity
  windElement.innerHTML = Math.round(response.data.wind.speed)
  dateElement.innerHTML = dateFormat(response.data.dt * 1000)
}

let apiKey = '49b631c45785fe73d2a88477803dea22'
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Copenhagen&appid=${apiKey}&units=metric`

console.log(apiUrl)
axios.get(apiUrl).then(displayTemperature)
