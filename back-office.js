const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTFmZTRjNTllYzAwMTk5MGQ3MTYiLCJpYXQiOjE3MDkyODU4ODYsImV4cCI6MTcxMDQ5NTQ4Nn0.J9V-sXleTIQjLmW95Xr8Yw4skeZ7aEqUogE8vmt5pmQ";
const url = "https://striveschool-api.herokuapp.com/api/product/";

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  postData();
});

function postData() {
  const titolo = document.getElementById("Titolo").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imgUrl = document.getElementById("img").value;
  const prezzo = document.getElementById("prezzo").value;

  const data = {
    name: titolo,
    description: description,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((newAppointment) => {
      if (newAppointment) {
        alert("Appuntamento con id: " + " è stato modificato con successo ");
      } else {
        alert("Appuntamento con id: " + " è stato creato correttamente");
        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
}
