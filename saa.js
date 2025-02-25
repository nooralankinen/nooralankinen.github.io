// opettajan API-avain
const apiKey = "665ecd56dfc08dbb50feb8b8f5034e28";

// Säätiedot kahdelle eri kaupungille
fetchSaa("Tampere");
fetchSaa("Helsinki");

//funktio jolla tieto haetaan avoimesta datasta
function fetchSaa(kaupunki) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&appid=${apiKey}&units=metric&lang=fi`)

// Muunnetaan vastaus JSON muotoon
        .then(function (response) { 
            return response.json();
        })

// Kutsutaan funktiota, ja näytetään tiedot sivulla

        .then(function (data) {
            document.getElementById(kaupunki.toLowerCase()).innerHTML=
            `${data.weather[0].description}, ${data.main.temp}°C`;

        })

// Jos tuli jokin virhe

        .catch(function (error) { 
            document.getElementById(kaupunki.toLowerCase()).innerHTML = "<p>Tietoa ei pystytä hakemaan </p>";

        });
