export default function setWeatherAirInfo(data){
    document.querySelector('#wind_speed_so2').textContent = data.current.sulphur_dioxide;
    document.querySelector('#wind_speed_no2').textContent = data.current.nitrogen_dioxide;
    document.querySelector('#wind_speed_o3').textContent = data.current.ozone;
}