const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTFmZTRjNTllYzAwMTk5MGQ3MTYiLCJpYXQiOjE3MDkyODU4ODYsImV4cCI6MTcxMDQ5NTQ4Nn0.J9V-sXleTIQjLmW95Xr8Yw4skeZ7aEqUogE8vmt5pmQ";
const url = "https://striveschool-api.herokuapp.com/api/product/";

const row = document.getElementsByClassName("row")[0];

function creaCard(immagine, title, description, price) {
  // ///////////////////////////////////////
  const col = document.createElement("div");
  row.appendChild(col);
  col.className = "col-6 col-md-3";

  // ///////////////////////////////////////
  const card = document.createElement("div");
  col.appendChild(card);
  card.className = "card shadow-sm";
  card.classList.add("mb-2");

  // ///////////////////////////////////////
  const img = document.createElement("img");
  card.appendChild(img);
  img.className = "card-img-top ";
  img.src = immagine;
  img.style.height = "30vh";
  img.style.objectFit = "cover";
  img.style.width = "auto";

  // ///////////////////////////////////////
  const body = document.createElement("div");
  card.appendChild(body);
  body.className = "card-body";

  // ///////////////////////////////////////
  const h5 = document.createElement("h5");
  body.appendChild(h5);
  h5.className = "card-title";
  h5.textContent = title;

  // ///////////////////////////////////////
  const p = document.createElement("p");
  body.appendChild(p);
  p.className = "card-text";
  p.textContent = description;

  // ///////////////////////////////////////
  const span = document.createElement("span");
  body.appendChild(span);
  p.className = "card-price";
  p.textContent = price + "€";

  // ///////////////////////////////////////
  const btnDettaglio = document.createElement("a");
  body.appendChild(btnDettaglio);
  btnDettaglio.href = "./details.html";
  btnDettaglio.className = "btn btn-secondary me-1";
  btnDettaglio.innerText = "Info";

  // ///////////////////////////////////////
  const btnModifica = document.createElement("a");
  body.appendChild(btnModifica);
  btnModifica.href = "./backoffice.html";
  btnModifica.className = "btn btn-warning me-1";
  btnModifica.innerText = "Edit";
}

fetch(url, {
  method: "GET",
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
    newAppointment.forEach((oggetto) => {
      creaCard(oggetto.imageUrl, oggetto.name, oggetto.description, oggetto.price);
    });
  })
  .catch((err) => console.log(err));
