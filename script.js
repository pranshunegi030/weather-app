let weather = {
    apiKey : "37d7cd40fb1332d2850d20431e33ae5c",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid="+ this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather : function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const{ temp, humidity} = data.main;
        const{ speed } = data.wind;
        document.querySelector(".city").innerHTML = "weather in " + name + " is "
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "wind speed: " + speed + "km/h";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search : function(){
        this.fetchWeather(document.querySelector(".searchBar").value)
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search()
})

document.querySelector(".searchBar").addEventListener("keyup", function(event) {
    if(event.key = "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Delhi");