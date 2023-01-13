const cityForm = document.querySelector('[data-js="change-location"')
const contentContainer = document.querySelector('[data-js="content-container"]')
const cityNameDisplay = document.querySelector('[data-js="city-name"')
const weatherTextDisplay = document.querySelector('[data-js="city-weather"]')
const temperatureDisplay = document.querySelector('[data-js="city-temperature"]')
const timeIMGDisplay = document.querySelector('[data-js="time"]')
const weatherIconDisplay = document.querySelector('[data-js="time-icon"]')

const removeClass = (element, className) => {
    const doesTheElementHaveTheClass = element.classList.contains(className)

    if (doesTheElementHaveTheClass) {
        element.classList.remove(className)
    }
}

const displayCityWeatherInfo = async cityName => {

    const [{ LocalizedName, Key }] = await getCityData(cityName)
    const [{ IsDayTime, Temperature: { Metric: { Value } }, WeatherText, WeatherIcon }] = await getWeatherData(Key)

    weatherIconDisplay.innerHTML = `<img src="./src/icons/${WeatherIcon}.svg">`
    timeIMGDisplay.src = IsDayTime ? './src/day.svg' : './src/night.svg'

    cityNameDisplay.textContent = LocalizedName
    weatherTextDisplay.textContent = WeatherText
    temperatureDisplay.textContent = Math.round(Value)
}

cityForm.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.city.value    
    displayCityWeatherInfo(inputValue)
    removeClass(contentContainer, 'd-none')

    event.target.reset()
})
