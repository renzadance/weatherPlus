export default function setTempForEachTime(data){
    const todayTempArr = ['.today_temp_time_item-temp-1', '.today_temp_time_item-temp-2', '.today_temp_time_item-temp-3', '.today_temp_time_item-temp-4', '.today_temp_time_item-temp-5',
                        '.today_temp_time_item-temp-6', '.today_temp_time_item-temp-7', '.today_temp_time_item-temp-8', 
    ];
    let indexPlus = -3;
    for(let i = 0; i < todayTempArr.length; ++i){
        document.querySelector(todayTempArr[i]).textContent = Math.round(data.hourly.temperature_2m[indexPlus+=3]) + "°c";
    }
}