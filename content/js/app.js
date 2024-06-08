
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let apiData={
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '6722391575317bc7b2f360cd50d063c3'
}
let inputElem=document.querySelector('input')
const cityElem=document.querySelector('.city')
const dateElem=document.querySelector('.date')
const tempElem=document.querySelector('.temp')
const weatherElem=document.querySelector('.weather')
const hilowElem=document.querySelector('.hi-low')

let modalElem=document.querySelector('.modal')
window.addEventListener('load',()=>{
    modalElem.classList.add('modal--show')
})

inputElem.addEventListener('keypress',(event)=>{
    if(event.key==='Enter'){
        modalElem.classList.remove('modal--show')
        fetchData()
    }
})

function fetchData(){
    let cityValue=inputElem.value;
    fetch(`${apiData.url}${cityValue}&appid=${apiData.key}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            if(data.cod==='400'|| data.cod==='404'){
                showError('Please enter a valid city name')
                cityElem.innerHTML=''
                tempElem.innerHTML=''
                weatherElem.innerHTML=''
                hilowElem.innerHTML=''
                dateElem.innerHTML= ''
            }
            else showData(data)
            
        })

}
function showData(data){
    cityElem.innerHTML=`${data.name}, ${data.sys.country}`
    tempElem.innerHTML=`${kelvintoCelcius(data.main.temp)}&degC`
    weatherElem.innerHTML=data.weather[0].main
    hilowElem.innerHTML=`${kelvintoCelcius(data.main.temp_min)}&deg/ ${kelvintoCelcius(data.main.temp_max)}&deg`
    dateElem.innerHTML= showDate()
}

let kelvintoCelcius=(kelvin)=> Math.floor(kelvin-273.15)
function showDate(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let now=new Date()
    let day=days[now.getDay()]
    let date=now.getDate()
    let month=months[now.getMonth()]
    let year=now.getFullYear()

    return `${day} ${date} ${month} ${year}`
}

// if the user did not enter a valid city name in the box
function showError(error){
    let modalContentElem=document.querySelector('.modal__content')
    modalElem.classList.add('modal--show')
    console.log(error)
    // if(error,includes('404'))
    modalContentElem.innerHTML=`${error}`
}