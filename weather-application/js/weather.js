const APIKey = 'MS92GOlwSl3aPdGulbusH0fB3S2mmFeo'

const getCityEndpoint = city =>
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${city}&language=pt-br`

const getWeatherEndpoint = cityKey =>
    `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const fetchData = async endpoint => {

    try {
        const response = await fetch(endpoint)

        if (!response.ok) {
            throw new Error('Unable to get the data!')
        }

        return response.json()

    } catch ({ name, message }) {
        return `${name}: ${message}`
    }
}

const getCityData = city => fetchData(getCityEndpoint(city))
const getWeatherData = cityKey => fetchData(getWeatherEndpoint(cityKey))


