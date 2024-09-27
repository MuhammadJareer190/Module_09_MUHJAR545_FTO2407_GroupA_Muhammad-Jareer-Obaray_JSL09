// FETCH A RANDOM NATURE PHOTO FROM Unsplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json()) // CONVERT RESPONSE TO JSON FORMAT
    .then(data => {
        //SET THE BACKGROUND IMAGE OF THE WEBPAGE TO THE FETCHED PHOTO
        document.body.style.backgroundImage =  `url(${data.urls.full})`
        // DISPLAY THE NAME OF THE PHOTOGHRAPHER WHO TOOK THE PHOTO
        document.getElementById("author").textContent = `By: ${data.user.name}` 
    })
    .catch(err => {
        // IN CASE OF ERROR, SET A DEFAULT BACKGROUND IMAGE AND AUTHOR
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })
// FETCH Dogecoin DATA FROM the CoinGecko API
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
          // IF THE RESPONSE IS NOT SUCCESSFUL, THROW AN ERROR  
            throw Error("something went wrong")
        }
        return res.json() // CONVERT RESPONSE TO JSON FORMAT
    })
    .then(data => {
        // INSERT Dogecoin LOGO AND NAME IN THE HTML ELEMENT WITH ID "crypto-top"
        document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
        `
        // INSERT THE CURRENT PRICE, 24H HIGH, AND 24H LOW IN THE HTML ELEMENT WITH ID "crypto"
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

// FUNCTION TO GET THE CURRENT TIME AND DISPLAY IT
function getCurrentTime(){
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
// UPDATE THE TIME EVERY SECOND USING setInterval
setInterval(getCurrentTime, 1000)
// GET THE USER'S GEOGRAPHICAL LOCATION USING THE Geolocation API
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("weather data not available")
            }
            return res.json()
        })
        .then (data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});