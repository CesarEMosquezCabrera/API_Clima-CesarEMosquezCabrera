const result = document.querySelector('.result');
const resultados = document.querySelector('.resultados');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

const divElement = document.getElementById('segundSecci');

const countrySelect = document.getElementById('country');
const cityInput = document.getElementById('city');
countrySelect.addEventListener('change', function() {
    cityInput.removeAttribute('readonly');
    cityInput.value = "";
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos son obligatorios...');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

function callAPI(city, country){
    const apiId = '85cf402ace272c177bc1c01534d72ef5';
    const url2 = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
    //const url = `api.openweathermap.org/data/2.5/forecast?${city},${country}&appid=${apiId}`;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiId}`;
    
    divElement.classList.add('sectionDos');

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => { 
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                
                showWeather(dataJSON.list[0],city);
                for (let i = 0; i <= 39; i += 8) {
                    MANYshowWeather(dataJSON.list[i]);
                }
            }
            console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
    
    fetch(url2)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => { 
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                //showWeather(dataJSON);
            }
            console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data,name){
    const {main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima de HOY en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);

    /* console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon); */
}
function MANYshowWeather(data,name){
    const {dt_txt,main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const fecha = new Date(dt_txt);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaSemana = fecha.getDay();

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.classList.add('cardW');
    content.innerHTML = `
        <h5>Clima ${diasSemana[diaSemana]}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;
    resultados.appendChild(content);
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
