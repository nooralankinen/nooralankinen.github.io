/*funktio*/

function kamerat(data) {
}

/*API*/
    fetch(`https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/data`)

/*Muunnetaan vastaus JSON muotoon*/

    .then(function (response) { return response.json();})

/* Käsitellään muunnettu (eli JSON muotoinen) vastaus */

    .then(function (data) {
        kuvat(data);

    })

/* Jos tuli jokin virhe*/

    .catch(function (error) { document.getElementById("kuvat").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>";

    })

/*Näytetään yhden kameran kuva*/

function kuvat(data) {
    document.getElementById("kuvat");


/*Käydään läpi kaikki kuvat for-loopilla*/

    for (var i = 0; i < data.presets.length; i++) {
        const camera = data.presets[i];
        const kuvaElementti = document.createElement("div");
        kuvaElementti.innerHTML = `
            <h3>Kamera ID: ${camera.id}</h3>
            <p>Aika: ${camera.measuredTime}</p>
            <img src="https://tie.digitraffic.fi/api/weathercam/v1/stations/${data.id}/data/${camera.id}/image" alt="Liikennekamera ${camera.id}" width="400"><hr>`;
    
/*Kootaan kuvat elementtiin*/

document.getElementById("kuvat").appendChild(kuvaElementti);
    }
}
    



