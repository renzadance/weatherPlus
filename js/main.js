'use strict';

//imports
import timeNow from "./functions/timeNow.js";
import getGeo from "./fetch/fetchGeo.js";
import getDateToday from "./functions/getDateToday.js";
import getWeather from "./fetch/fetchWeather.js";
import renderWeatherForecast from "./functions/weatherForecast.js";
import getSunriseAndSunset from "./functions/getSunriseSunset.js";
import getWeatherAir from './fetch/fetchWeatherAir.js';
import setWeatherAirInfo from './functions/setWeatherAir.js';
import setTempForEachTime from './functions/setTempForTime.js';

//get elements
const searchInput = document.querySelector('#search')
const searchForm = document.querySelector('.form_search')

//-----------------------------------------



searchInput.addEventListener("focus", () => {
    document.body.classList.add("blurred");
    searchForm.classList.add('form_search_focus')
});
searchInput.addEventListener("blur", () => {
    document.body.classList.remove("blurred");
    searchForm.classList.remove('form_search_focus')
});


timeNow();
getDateToday();

// Получаем элемент загрузчика
const loaderOverlay = document.getElementById("loader-overlay");
loaderOverlay.style.display = "none";

// Назначаем обработчик для формы поиска
searchForm.onsubmit = submitHandler;

async function submitHandler(e) {
    e.preventDefault(); // Останавливаем отправку формы по умолчанию

    // Если поле поиска пустое, ничего не делаем
    if (!searchInput.value.trim()) return;

    // Показываем загрузчик перед началом запроса

    try {
        //loading anim
        loaderOverlay.style.display = "flex";

        // getGeo !
        const cityInfo = await getGeo(searchInput.value.trim());

        searchInput.value = ''; // clear search input

        // Устанавливаем название города в интерфейсе
        document.querySelector('.weather_now_geo_info').textContent = cityInfo[0]['name'];

        // getWeather !
        const weatherInfo = await getWeather(cityInfo[0]['lon'], cityInfo[0]['lat']);

        const date = new Date();
        const hoursNow = date.getHours();
        const weatherData = {
            tempNow: weatherInfo.hourly.temperature_2m[hoursNow],
        };
        renderWeatherNowData(weatherData);
        renderDayOrNight(weatherInfo)

        // Устанавливаем прогноз погоды на несколько дней
        const tempForecastArr = ['.history_item-1_temp', '.history_item-2_temp', '.history_item-3_temp', '.history_item-4_temp', '.history_item-5_temp'];
        for (let i = 0; i < tempForecastArr.length; i++) {
            document.querySelector(tempForecastArr[i]).textContent = Math.round(weatherInfo.daily.temperature_2m_max[i]) + "°c";
        }

        renderWeatherForecast(getCodeWeather, weatherInfo);
        getSunriseAndSunset(weatherInfo);
        renderFeelsLikeTemp(weatherInfo, hoursNow);
        renderHumidity(weatherInfo, hoursNow);
        renderPressure(weatherInfo, hoursNow);
        renderVisibility(weatherInfo, hoursNow);
        document.querySelector("#wind_speed_km").textContent = weatherInfo.hourly.wind_speed_10m[hoursNow] + " km/h";

        const weatherAirInfo = await getWeatherAir(cityInfo[0]['lon'], cityInfo[0]['lat']);
        setWeatherAirInfo(weatherAirInfo);

        setTempForEachTime(weatherInfo);
        getCodeWeather(document.querySelector('.weather_now_img'), weatherInfo.daily.weather_code[0]);
        setWeatherIcon(weatherInfo);
        setWeatherIconForTime(weatherInfo);

        console.log(weatherInfo);

    } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
    } finally {
        // Скрываем загрузчик в конце, независимо от успеха или ошибки
        loaderOverlay.style.display = "none";

        document.body.classList.remove("blurred");
        searchForm.classList.remove('form_search_focus')
    }
}

//functions
function renderWeatherNowData(data){
    const tempNow = document.querySelector('.weather_now_temp');
    tempNow.textContent = Math.round(data.tempNow) + "°c"
}

function renderDayOrNight(data){
    let dayOrNight = ""
    if(data.current.is_day == 0){
        dayOrNight = 'night'
    }else if(data.current.is_day == 1){
        dayOrNight = 'day'
    }
    document.querySelector('.day_or_hight').textContent = dayOrNight;
}

function renderFeelsLikeTemp(data,date){
    document.querySelector('.feels-like_value').textContent = Math.round(data.hourly.apparent_temperature[date]) + "°c";
}

function renderHumidity(data, date){
    document.querySelector('.humidity_value').textContent = data.hourly.relative_humidity_2m[date] + "%"
}


function renderPressure(data, date){
    document.querySelector('.pressure_value').textContent = data.hourly.surface_pressure[date] + "hPa"
}

function renderVisibility(data, date){
    document.querySelector('.visibility_value').textContent = data.hourly.visibility[date] / 1000 + "km"
}

function setWeatherIcon(data){
    const weatherIconArr = ['#weather_history_img-1', '#weather_history_img-2', '#weather_history_img-3', '#weather_history_img-4', '#weather_history_img-5'];

    for(let i = 0; i < weatherIconArr.length; ++i){
        getCodeWeather(document.querySelector(weatherIconArr[i]), data.daily.weather_code[i])
    }
}

function setWeatherIconForTime(data){
    const weatherIconArr = ['#today_temp_time_item-img-1', '#today_temp_time_item-img-2', '#today_temp_time_item-img-3', '#today_temp_time_item-img-4',
                            '#today_temp_time_item-img-5', '#today_temp_time_item-img-6', '#today_temp_time_item-img-7', '#today_temp_time_item-img-8', ]

    let indexPlus = -3
    for(let i = 0; i < weatherIconArr.length; ++i){
        getCodeWeather(document.querySelector(weatherIconArr[i]), data.hourly.weather_code[indexPlus+=3])
    }
}

//get code weather for icon
function getCodeWeather(element,weatherCode){
    switch(weatherCode){
        case 0:
            element.src = "../img/weather/clear.svg"
            break;
        case 1:
        case 2:
            element.src = "../img/weather/clouds.svg"
            break;
        case 3:
            element.src = "../img/weather/overcast.svg"
            break;
        case 45:
        case 48:
            element.src = "../img/weather/mist.svg"
            break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            element.src = "../img/weather/overcast.svg"
            break;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            element.src = "../img/weather/rain.svg"
            break;
        case 71:
        case 73:
        case 75:
        case 77:
            element.src = "../img/weather/snow.svg"
            break;
        case 80:
        case 81:
        case 82:
            element.src = "../img/weather/shower.svg"
            break;
        case 85:
        case 86:
            element.src = "../img/weather/snow.svg"
            break;
        case 95:
        case 96:
        case 99:
            element.src = "../img/weather/thunderstorm.svg"
            break;
    }
}
