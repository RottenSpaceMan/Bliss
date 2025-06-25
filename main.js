function loadList(){
    document.getElementById("todoList").innerHTML = "";
    todos = JSON.parse(localStorage.getItem("todoItems")) || []
    todos.forEach((element, index) => {
        document.getElementById("todoList").innerHTML += `<div class=\"todoItem\">  ${element} <button onclick=deleteItem(${index})>Delete</button></div>`;
    });
}

function deleteItem(index){
    todos = JSON.parse(localStorage.getItem("todoItems")) || []
    todos.splice(index, 1)
    localStorage.setItem("todoItems", JSON.stringify(todos))
    loadList()
}

function getQuote() {
    return fetch("https://api.breakingbadquotes.xyz/v1/quotes")
        .then(response => response.json())
        .then(data => document
        .getElementById("quoteBox")
        .innerHTML = data[0].quote + "<br><i>-" + data[0].author + "</i>");
}

function validateAndStoreForm(event){
    if(event) event.preventDefault();
    document.getElementById("todoError").innerHTML = "";
    x = document.forms["todoForm"]["Description"].value
    if(x == ""){
        document.getElementById("todoError").innerHTML = "No Description!!!"
    }
    else{
        const todos = JSON.parse(localStorage.getItem("todoItems")) || [];
        console.log(todos)
        todos.push(x);
        localStorage.setItem("todoItems", JSON.stringify(todos))
        document.forms["todoForm"].reset()
        loadList()
    }
    return false
}
function checkAndGetLocation(){
    const storedLocation = localStorage.getItem("userLocation");
    if(storedLocation){
        const location = JSON.parse(storedLocation)
        getWeatherData(location.lat, location.lon)
    } else {
        promptForLocation()
    }
}
function promptForLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
                localStorage.setItem("userLocation", JSON.stringify(location))
                getWeatherData(location.lat, location.lon)
            },
            (error) => {
                console.error("Error Getting User Location")
                document.getElementById("weather_data").innerHTML=
                `
                    <p>Please enable location</p>
                `
            },
        )
    }
}
function getWeather(){
    localStorage.removeItem("userLocation")
    promptForLocation()
}
async function getWeatherData(lat, lon){
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day`)
    .then(response => response.json())


    document.getElementById("weather_data").innerHTML = 
    `
        <canvas id="weatherCanvas" width="200" height="100"></canvas>
        <div class="temperature">${weather.current.temperature_2m}°C</div>
        <div class="is_day">${weather.current.is_day ? `Day` : `Night`}</div>
    `
    drawWeather(weather.current.temperature_2m, weather.current.is_day)
}

function drawWeather(weather, isDay){
    const canvas = document.getElementById("weatherCanvas")
    const ctx = canvas.getContext("2d")

    if(isDay){
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.arc(50, 50, 30, 0, 2 * Math.PI)
        ctx.fill()
    } else {
        ctx.fillStyle = "#C0C0C0";
        ctx.beginPath()
        ctx.arc(50,50,30,0,2*Math.PI)
        ctx.fill()
    }

    const tempHeight = Math.max(5, Math.min(80, weather + 20))
    ctx.fillStyle = weather > 30 ? '#FF6B6B' : "#4ECDC4"
    ctx.fillRect(120, 80-tempHeight, 20, tempHeight)
}