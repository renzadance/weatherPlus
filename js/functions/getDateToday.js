export default function getDateTodayForBlockNow() {

    const dateTodayBlock = document.querySelector('.weather_now_date_info')

    const dateToday = new Date();
    const optionsDate = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    };
    dateTodayBlock.textContent = dateToday.toLocaleDateString('en-EN', optionsDate)
}