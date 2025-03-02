/*API*/
fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false")
  .then(response => response.json())  // Muunnetaan vastaus JSON-muotoon
  .then(data => {
      console.log(data);  // Debuggausta varten, tarkistetaan että data tulee oikein
      junat(data.properties.presets); // Lähetetään presets-taulukko funktiolle
  })
  .catch(error => { 
      console.error("Virhe haettaessa dataa:", error);
      document.getElementById("junat").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
  });

/*Näytetään liikennekamerakuvat*/
function junat(presets) {
    const kuvatElementti = document.getElementById("junat");
    kuvatElementti.innerHTML = "";  // Tyhjennetään aiempi sisältö ennen lisäystä

    if (!presets || presets.length === 0) {
        kuvatElementti.innerHTML = "<p>Ei saatavilla olevia kuvia.</p>";
        return;
    }

    /* Käydään läpi kaikki kameran kuvakulmat */
    for (let i = 0; i < presets.length; i++) {
        const camera = presets[i];
        console.log(`Kuva-URL: ${camera.imageUrl}`); // Debuggausta varten

        /* Luodaan HTML-elementit */
        const kuvaElementti = document.createElement("div");
        kuvaElementti.innerHTML = `
            <h3>${camera.presentationName}</h3>
            <p>Aika: ${new Date().toLocaleString()}</p>
            <img src="${camera.imageUrl}" alt="Liikennekamera ${camera.id}" width="400">
            <hr>`;

        /* Lisätään kuva-alkiot HTML:ään */
        kuvatElementti.appendChild(kuvaElementti);
    }
}