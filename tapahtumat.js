/* funktio */

    function tapahtumat(data) {
        var teksti = "";
        teksti = "<h1>Tampereella tapahtuu</h1>";
        for (var i = 0; i < data.length; i++) {
        teksti = teksti + "<h3>" + data[i].name + "</h3>";
        teksti = teksti + "<p>" + data[i].description + "</p>";
        teksti = teksti + `<p><a href="${data[i].url}">${data[i].url}</a></p>`;
        }
    
    document.getElementById("d44").innerHTML = teksti;
    
    }
/* määritetään sivu, josta tapahtumat haetaan */

    fetch('https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi')

/*Muunnetaan vastaus JSON muotoon*/

    .then(function (response) { return response.json();})

/* Käsitellään muunnettu (eli JSON muotoinen) vastaus */

    .then(function (data) {
        tapahtumat(data);

    })

/* Jos tuli jokin virhe*/

    .catch(function (error) { document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>"+ error;

    })
