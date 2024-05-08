const petForm = document.querySelector("#petForm");
const petBtn = document.querySelector("#petBtn");
const petInfo = document.querySelector("#petInfo");
const closeModal = document.querySelector("#close");



petBtn.addEventListener("click", () => {
    petForm.showModal();
  });

closeModal.addEventListener("click", (event) => {
    event.preventDefault();
    petForm.close();
});

petInfo.addEventListener("submit", (event) => {
    event.preventDefault();
    
});

function getWeatherApi() {
    const weatherApi =  "https://api.weather.gov/alerts/active"
fetch(requestUrl)
.then(function (response) {
  return response.json();
})
}