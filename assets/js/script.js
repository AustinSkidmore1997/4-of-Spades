const petForm = document.querySelector("#petForm");
const petBtn = document.querySelector("#petBtn");
const petInfo = document.querySelector("#petInfo");
const closeModal = document.querySelector("#close");

const petNameInput = document.getElementById('petName');
const petAgeInput = document.getElementById('petAge');
const petTypeInput = document.getElementById('petType');
const petDescriptionInput = document.getElementById('petDescription');

const petCardEl = $('.petCard')

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
  renderPetCard();
  petForm.close();

});


function savePetInfo() {
  const petName = petNameInput.value;
  const petAge = petAgeInput.value;
  const petType = petTypeInput.value;
  const petDescription = petDescriptionInput.value;
  localStorage.setItem('Pet Name', JSON.stringify(petName));
  localStorage.setItem('Pet Age', JSON.stringify(petAge));
  localStorage.setItem('Pet Type', JSON.stringify(petType));
  localStorage.setItem('Pet Description', JSON.stringify(petDescription));
}

function renderPetCard() {
  const petCardName = $('input[id="petName"]').val();
  const petCardAge = $('input[id="petAge"]').val();
  const petCardType = $('input[id="petType"]').val();
  const petCardDescription = $('textarea[id="petDescription"]').val();

  petCardEl.append(`<h2> Pet Name: ${petCardName}</h2>`);
  petCardEl.append(`<h2> Pet Age: ${petCardAge}</h2>`);
  petCardEl.append(`<h2> Pet Type: ${petCardType}</h2>`);
  petCardEl.append(`<h2> Pet Description: ${petCardDescription}</h2>`);
  $('input[id="petName"]').val(' ');
  $('input[id="petAge"]').val(' ');
  $('input[id="petType"]').val(' ');
  $('input[id="petDescription"]').val(' ');
}

function startTimer() {
  const startTime = dayjs();
  const endTime = startTime.add(24, 'hour');
  updateTimerUI(endTime.diff(startTime, 'second'));
  const timerInterval = setInterval(() => {
    const currentTime = dayjs();
    const remainingTime = endTime.diff(currentTime, 'second');
    updateTimerUI(remainingTime);
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      console.log('Timer expired!');
    }
  }, 1000);
}

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

/* function init() {
  renderPetCard();
}
init(); */