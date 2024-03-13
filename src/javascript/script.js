document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = document.querySelector('#city').value;

    if(!city){
        showWeather(false);
        showError('Digite o nome de uma Cidade...');
        return;
    }

    const key = "f641ecea5d9e1f3efb9e3b70a4f54e7f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${key}&units=metric&lang=pt_br`

    const result = await fetch(url);
    const json = await result.json();

    if (json.cod === 200){
        setInfos({
            cityName: json.name,
            country: json.sys.country,
            temp:json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            desc: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            wind: json.wind.speed,
            humidity: json.main.humidity
        })

    } else {
        showWeather(false);
        showError(`
        Não foi possível encontrar a Cidade...

        <img src="src/img/not_found.png"/>
        `)

    }
})

function showError(error) {
    document.querySelector('#errorAlert').innerHTML = error;
    document.querySelector('#title').innerHTML = `${error.cityName}`
}

function setInfos(json){
    showError('')
    showWeather(true);
    const imgHttp = "http://openweathermap.org/img/wn/"

    document.querySelector("#weather").classList.add('show')
    document.querySelector('#tempImage').setAttribute('src', `${imgHttp}${json.tempIcon}@2x.png`)
    document.querySelector('#title').innerHTML = `${json.cityName} ${json.country != null ? ","+json.country : ""}`
    document.querySelector('#tempValue').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} C˚`
    document.querySelector('#tempDescription').innerHTML = `${json.desc}`
    document.querySelector('#tempMax').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} C˚`
    document.querySelector('#tempMin').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} C˚`
    document.querySelector('#humidity').innerHTML = `${json.humidity} %`
    document.querySelector('#wind').innerHTML = `${json.wind.toFixed(1)} Km/h`
}

function showWeather(value) {
    if(value){
        document.querySelector('#weather').classList.add('show')
    } else {
        document.querySelector('#weather').classList.remove('show')
    }
    
}