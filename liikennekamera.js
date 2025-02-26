/*API*/
fetch(`https://cors-anywhere.herokuapp.com/https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/data`)

/*Muunnetaan vastaus JSON muotoon*/
.then(function(response) {
    return response.json();
})

/* Käsitellään muunnettu (eli JSON muotoinen) vastaus */
.then(function(data) {
    kuvat(data);
})

/* Jos tuli jokin virhe */
.catch(function(error) { 
    document.getElementById("kamerat").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>";
});

/*Näytetään yhden kameran kuva */
function kuvat(data) {
    // Varmistetaan, että data.presets ei ole tyhjä
    if (data && data.presets && data.presets.length > 0) {
        for (var i = 0; i < data.presets.length; i++) {
            const camera = data.presets[i];
            const kuvaElementti = document.createElement("div");
            kuvaElementti.innerHTML = `
                <h3>Kamera ID: ${camera.id}</h3>
                <p>Aika: ${camera.measuredTime}</p>
                <img src="https://tie.digitraffic.fi/api/weathercam/v1/stations/${data.id}/data/${camera.id}/image" alt="Liikennekamera ${camera.id}" width="400"><hr>`;
            document.getElementById("kuvat").appendChild(kuvaElementti);
        }
    } else {
        // Jos data.presets on tyhjä tai ei ole olemassa, näytetään virheilmoitus
        document.getElementById("kuvat").innerHTML = "<p>Ei kuvia saatavilla.</p>";
    }
}
