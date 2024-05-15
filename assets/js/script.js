const petForm = document.querySelector("#petForm");
const petBtn = document.querySelector("#petBtn");
const petInfo = document.querySelector("#petInfo");
const closeModal = document.querySelector("#close");
const petList = document.getElementById('petList');

const petsArray = [];

let isRaining = false;

petBtn.addEventListener("click", () => {
  petForm.showModal();
});

closeModal.addEventListener("click", (event) => {
  event.preventDefault();
  petForm.close();
});

petInfo.addEventListener("submit", (event) => {

  event.preventDefault();
  savePetInfo();
  renderPetCards();
  petForm.close();
  
});

function savePetInfo() {
  const petNameInput = document.getElementById('petName');
  const petAgeInput = document.getElementById('petAge');
  const petTypeInput = document.getElementById('petType');
  const petDescriptionInput = document.getElementById('petDescription');

  
  const pet = {
    name: petNameInput.value,
    age: petAgeInput.value,
    type: petTypeInput.value,
    description: petDescriptionInput.value,
  };

  petsArray.push(pet);
  localStorage.setItem('pets', JSON.stringify(petsArray));
}

// use for loop to go through array and get items for local storage
  function renderPetCards() {
    const petCardArray = JSON.parse(localStorage.getItem('pets'));
    petList.empty();
    for (petCard of petCardArray) {
      $(`<div id="${petCard.petName}">`).addClass("card").appendTo(petList);
      $(`<h2>`).text(`${petCard.petName}`).appendTo(`#${petCard.petName}`);
      $(`<p>`).text(`${petCard.petAge}`).appendTo(`#${petCard.petName}`);
      $(`<p>`).text(`${petCard.petType}`).appendTo(`#${petCard.petName}`);
      $(`<p>`).text(`${petCard.petDescription}`).appendTo(`#${petCard.petName}`);
      $(`<button id="addTask">`).text('Add Task').addClass("btn btn-primary hidden").appendTo(`#${petCard.petName}`);
    }
  }

 /*  const petsList = JSON.parse(localStorage.getItem('pets'));
  console.log(petsList);
  for (pet of petsList) {
  const petCardName = pet.name;
  const petCardAge = pet.age;
  const petCardType = pet.type;
  const petCardDescription = pet.description;

  const petCardEl = $('.petCard');
  petCardEl.append(`<h2 id="pet-name"> Pet Name: ${petCardName}</h2>`);
  petCardEl.append(`<h2 id="pet-age"> Pet Age: ${petCardAge}</h2>`);
  petCardEl.append(`<h2 id="pet-type"> Pet Type: ${petCardType}</h2>`);
  petCardEl.append(`<h2 id="pet-description"> Pet Description: ${petCardDescription}</h2>`);
  } */

  /* function renderPetCards() {
    const petCardEl = $('.petCard');
    const petCardName = $('input[id="petName"]').val();
    const petCardAge = $('input[id="petAge"]').val();
    const petCardType = $('input[id="petType"]').val();
    const petCardDescription = $('textarea[id="petDescription"]').val();

    petCardEl.append('<div class="petCardContainer"></div>');
    const petCardContainerEl = $('.petCardContainer');
    petCardContainerEl.append(`<h2> Pet Name: ${petCardName}</h2>`);
    petCardContainerEl.append(`<h2> Pet Age: ${petCardAge}</h2>`);
    petCardContainerEl.append(`<h2> Pet Type: ${petCardType}</h2>`);
    petCardContainerEl.append(`<h2> Pet Description: ${petCardDescription}</h2>`);
  } */

function getWeatherApi() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;


      fetch(`https://api.weather.gov/points/${latitude},${longitude}`, {
        headers: {
          "User-Agent": "(noahcalderwood3@gmail.com)",
        },
      })
        .then((result) => result.json())
        .then((json) => {
          //renderfunc(json);
          //console.log(json);
          const forecast = json.properties.forecast;
          fetch(`${forecast}`, {
            headers: {
              "User-Agent": "(noahcalderwood3@gmail.com)",
            },
          })
            .then((result) => result.json())
            .then((json) => {
              console.log(json);
              let shortForecast = json.properties.periods[0].shortForecast;
              console.log(shortForecast);
              if (shortForecast.includes("Showers") || shortForecast.includes("Thunderstorms")) {
                isRaining = true;
              } else {
                isRaining = false;
              }
              console.log(isRaining);
            }
            )
        });
    },
    function () {
      console.error("some error occured");
    }
  );
}
getWeatherApi();

renderPetCards();