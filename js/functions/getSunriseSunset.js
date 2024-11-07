export default function getSunriseAndSunset(data){
    const sunrise = document.querySelector('.time_sunrise'); 
    const sunset = document.querySelector('.time_sunset');

    const getSunrise = data.daily.sunrise[0].slice(11);
    const getSunset = data.daily.sunset[0].slice(11);

    sunrise.textContent = getSunrise;
    sunset.textContent = getSunset;
}