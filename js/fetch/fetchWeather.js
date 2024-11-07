export default async function getWeather(lon, lat, loaderElement) {
    // Показать загрузчик перед отправкой запроса
    if (loaderElement) loaderElement.style.display = "flex";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=is_day&hourly=temperature_2m,visibility,surface_pressure,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m&timezone=auto&past_days=0&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    } finally {
        // Скрыть загрузчик после завершения запроса
        if (loaderElement) loaderElement.style.display = "none";
    }
}