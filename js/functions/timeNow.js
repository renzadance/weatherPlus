export default function getTimeNow(){
    const hours = document.querySelector('#hours')
    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')

    setInterval( ()=>{
        const date = new Date()
        if(date.getHours() < 10){
            hours.textContent = `0${date.getHours()}`
        }else{
            hours.textContent = date.getHours()
        }
    
        if(date.getMinutes() < 10){
            minutes.textContent = `0${date.getMinutes()}`
        }else{
            minutes.textContent = date.getMinutes()
        }
    
        if(date.getSeconds() < 10){
            seconds.textContent = `0${date.getSeconds()}`
        }else{
            seconds.textContent = date.getSeconds()
        }
    })
    
    
}