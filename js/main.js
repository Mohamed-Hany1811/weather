let currentTime = new Date().getHours();
let main = document.getElementById('main');
let nav = document.getElementById('navBar');
let foot = document.getElementById('foot');
let search = document.getElementById('search');
let navLinks = document.querySelectorAll('.navItem');
let icons = document.querySelectorAll('.icons a');
let inner = document.getElementById('inner')
let loc;
let maxTemp;
let minTemp;
let maxWind;
let rain;
let stat;
let icon;
let weatherList = []



navLinks.forEach(el => {
    el.classList.replace('btn-outline-primary', 'btn-outline-info')
    el.classList.replace('text-info', 'text-white')
})
if ((currentTime >= 6 && currentTime < 18)) {
    main.setAttribute('style', 'background-image: url(images/sunny-day-wallpaper-f21ok5dhnkco3i5n.jpg); background-position: top;')
    nav.classList.replace('bg-secondary', 'bg-primary')
    foot.classList.replace('bg-secondary', 'bg-primary')
    sub.classList.replace('bg-dark', 'bg-white')
    search.classList.replace('bg-secondary', 'bg-white')
    icons.forEach(el => {
        el.classList.replace('btn-primary', 'btn-light')
        el.classList.replace('text-white', 'text-primary')
    })
} else {
    main.setAttribute('style', 'background-image: url(images/beautiful-moon-and-the-night-clouds-m8votmg2dqq2p43a.jpg); background-position: top;')
}

search.addEventListener('keyup', fetchData)

async function fetchData(searchValue) {
    searchValue = search.value
    if (searchValue.length > 3) {

        let weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=460f81cb22f5437e850234412232402&q=${searchValue}&days=3&aqi=no&alerts=no`)
        weather = await weather.json();
        for( i=0; i< weather.forecast.forecastday.length;i++){
            loc = weather.location.name
        maxTemp = weather.forecast.forecastday[i].day.maxtemp_c
        minTemp = weather.forecast.forecastday[i].day.mintemp_c
        maxWind = weather.forecast.forecastday[i].day.maxwind_kph
        rain = weather.forecast.forecastday[i].day.daily_chance_of_rain
        stat = weather.forecast.forecastday[i].day.condition.text
        icon = weather.forecast.forecastday[i].day.condition.icon
          weatherDet = {
                name: loc,
                maxTemp: maxTemp,
                minTemp: minTemp,
                maxWind: maxWind,
                rain: rain,
                stat: stat,
                icon: icon
            }

            weatherList.push(weatherDet)
          inner.classList.remove('h-100')
        }
        if(weatherList.length> 3){

        weatherList.splice(0,3)
        }  
            display()
     
        console.log(weatherList);
   
}
}


function display() {
    temp = ''
    weatherList.forEach(el => {
        temp += `
               <div class="item col-md-4 my-2 col-sm-12 h-100 ">
              <div
                class="wDate d-flex justify-content-between bg-primary px-3 py-2"
              >
                <p>friday</p>
                <p>24February</p>
              </div>
              <div class="weather bg-white text-dark p-3">
                <h4>${el.name}</h4>
                <div class="row">
                  <div class="col-8">
                    <h2>${el.maxTemp}</h2>
                    <h2>${el.minTemp}</h2>
                  </div>
                  <div class="col-4">
                    <img class="w-75 m-auto"  src="http://${el.icon}" alt="" />
                  </div>
                </div>
                <p class="text-primary my-2">${el.stat}</p>
                <div class="icons d-flex justify-content-between text-dark">
                  <div class="icon ">
                    <i class="fa-solid fa-umbrella "></i>
                    <span> 20%</span>
                  </div>
                  <div class="icon ">
                    <i class="fa-solid fa-wind mx-2"></i>
                    <span> 20%</span>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-compass mx-2"></i>
                    <span> 20%</span>
                  </div>
                </div>
              </div>
            </div>
        `
    })
    document.getElementById('cont').innerHTML= temp

}

fetchData('cairo')