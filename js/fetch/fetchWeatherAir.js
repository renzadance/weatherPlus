export default async function getWeatherAir(lon,lat){
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=nitrogen_dioxide,sulphur_dioxide,ozone&hourly=european_aqi_nitrogen_dioxide,european_aqi_ozone,european_aqi_sulphur_dioxide`;
    const response = await fetch(url);
    const data = await response.json();
    return data; 
}