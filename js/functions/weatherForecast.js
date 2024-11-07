export default function renderWeatherForecast(){
    const monthForecastArr = ['.weather_history_item-1_date', '.weather_history_item-2_date', '.weather_history_item-3_date', '.weather_history_item-4_date', '.weather_history_item-5_date'];
    const weekdayForecastArr = ['.weather_history_item-1_day', '.weather_history_item-2_day', '.weather_history_item-3_day', '.weather_history_item-4_day', '.weather_history_item-5_day',];


    function formatDate(date) {
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-EN', options);
    }

    function formatWeekday(date) {
        const options = { weekday: 'long' };
        return date.toLocaleDateString('en-EN', options);
    }
    
    function getNextFiveDays(opt) {
        const dateArray = [];
        const today = new Date();
    
        for (let i = 0; i < 5; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i); // Добавляем i дней к текущей дате
            dateArray.push(opt(nextDate)); // Форматируем и добавляем в массив
        }
    
        return dateArray;
    }
    
    const nextFiveDays = getNextFiveDays(formatDate);
    const nextFiveDaysWeekday = getNextFiveDays(formatWeekday);

    for(let i = 0; i < monthForecastArr.length; i++){
        document.querySelector(monthForecastArr[i]).textContent = nextFiveDays[i]
        document.querySelector(weekdayForecastArr[i]).textContent = nextFiveDaysWeekday[i]
    }
    
}
