const apiUrl = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/uusin/paavo_pxt_12ey.px";

const jsonData = {
        "query": [
          {
            "code": "Postinumeroalue",
            "selection": {
              "filter": "item",
              "values": [
                "00240"
              ]
            }
          },
          {
            "code": "Vuosi",
            "selection": {
              "filter": "item",
              "values": [
                "2023"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
}

fetch(apiUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
})
.then(response => response.json())
.then(data => {
    console.log("Vastaus palvelimelta:", data);
    
    // Tarkistetaan JSON-vastauksen rakenne
    if (!data.dimension || !data.dimension.Postinumeroalue || !data.dimension.Tiedot) {
        throw new Error("JSON-vastaus ei sisällä odotettuja tietoja.");
    }
    
    const table = document.getElementById("data-table");
    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
    
    const postinumerot = data.dimension.Postinumeroalue.category.label;
    const tiedot = data.dimension.Tiedot.category.label;
    const values = data.value;
    
    const rowCount = Object.keys(postinumerot).length;
    const colCount = Object.keys(tiedot).length;
    
    let index = 0;
    for (const [postinumero, pnimi] of Object.entries(postinumerot)) {
        for (const [tieto, tnimi] of Object.entries(tiedot)) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${tnimi}</td><td>${values[index] ?? "Ei tietoa"}</td>`;
            tableBody.appendChild(row);
            index++;
        }
    }
})
.catch(error => {
    console.error("Virhe haettaessa dataa:", error);
    document.querySelector("#data-table tbody").innerHTML = "<tr><td colspan='2'>Tietojen lataaminen epäonnistui.</td></tr>";
});