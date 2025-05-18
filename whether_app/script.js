const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById ('searchBtn');
const whether_image = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('.wind-speed');



 async function checkweather(city){
     const api_key = "dcb7008709486227f12b3897a90afd22";
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

     const whether_data = await fetch(`${url}`).then(responce => responce .json());

     console.log(whether_data );
}


searchBtn.addEventListener('click', ()=>{
    checkweather(inputBox.value);

});