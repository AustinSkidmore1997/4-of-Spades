const petForm = document.querySelector("#petForm");
const petBtn = document.querySelector("#petBtn");
const petInfo = document.querySelector("#petInfo");
const closeModal = document.querySelector("#close");

const petTask = document.querySelector("#petTask");

const petNameInput = document.getElementById('petName');
const petAgeInput = document.getElementById('petAge');
const petTypeInput = document.getElementById('petType');
const petDescriptionInput = document.getElementById('petDescription');
const petList = $('#petsList');


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


  petForm.close();

});



const cardArray = [];
console.log(cardArray);
function savePetInfo() {
  const petCard = {
    petName: petNameInput.value,
    petAge: petAgeInput.value,
    petType: petTypeInput.value,
    petDescription: petDescriptionInput.value,
  }
  cardArray.push(petCard);

  localStorage.setItem('petCard', JSON.stringify(cardArray));

  renderPetCards();
  petNameInput.value = "";
  petAgeInput.value = "";
  petTypeInput.value = "";
  petDescriptionInput.value = "";
}

function renderPetCards() {
  const petCardArray = JSON.parse(localStorage.getItem('petCard'));
  petList.empty();
  for (petCard of petCardArray) {

    $(`<div id="${petCard.petName}">`).addClass("card card-primary").appendTo(petList);
    $(`<h2>`).text(`${petCard.petName}`).appendTo(`#${petCard.petName}`);
    $(`<p>`).text(`${petCard.petAge}`).appendTo(`#${petCard.petName}`);
    $(`<p>`).text(`${petCard.petType}`).appendTo(`#${petCard.petName}`);
    $(`<p>`).text(`${petCard.petDescription}`).appendTo(`#${petCard.petName}`);
    $(`<details id="${petCard.petName}Details">`).text('Tasks').appendTo(`#${petCard.petName}`);
    $(`<button id="addNewTask">`).text('Add Task').addClass("addNewTask btn btn-primary").appendTo(`#${petCard.petName}Details`);
  }

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

if (cardArray) {
  renderPetCards()
} else {

};

const addTaskBtn = document.querySelector("#addNewTask");
const addTaskAll = document.querySelectorAll("#addNewTask");
const addTaskSubmit = document.querySelector("#addTask");
const newTask = document.querySelector("#task");
const taskTime = document.querySelector("#taskTime");

let taskMap = JSON.parse(localStorage.getItem('taskMap'));
const tasks = [];
function addTask() {
  const task = {
    taskId: localStorage.getItem("taskId"),
    taskName: newTask.value,
    taskTime: taskTime.value,
  }
  tasks.push(task);

  localStorage.setItem(`newTask`, JSON.stringify(tasks));
  petTask.close();
  renderTasks()
}

function renderTasks() {
  for (task of tasks)
    i = 0;
  i++;
  $(`<input type="checkbox" id="${i}">`).appendTo(`#${task.taskId}`);
  $(`<label for="${i}">`).text(`${task.taskName} ${task.taskTime}`).appendTo(`#${task.taskId}`);
}

for (let i = 0; i < addTaskAll.length; i++) {
  addTaskAll[i].addEventListener("click", function () {
    localStorage.setItem("taskId", $(this).parent().attr('id'));
    petTask.showModal();
  });
}

addTaskSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();

});

console.log(task.taskName);

// function storePetTask(petName, taskName, taskTime) {
//   let taskMap = JSON.parse(localStorage.getItem("taskMap"));
//   if (!taskMap) {
//     taskMap = {};
//   }
//   if (!taskMap[petName]) {
//     taskMap[petName] = {};
//     taskMap[petName].tasks = [];
//   }
//   const task = {
//     taskName: newTask.value,
//     taskTime: taskTime.value,
//   };
//   taskMap[petName].tasks.push(task);
//   localStorage.setItem("taskMap", JSON.stringify(taskMap));
// }

// function getPetTasks() {
//   let taskMap = JSON.parse(localStorage.getItem("taskMap"));
//   if (!taskMap) {
//     console.error("No task map found!");
//     return {};
//   }

//   for (let [petName, dogTasks] of Object.entries(taskMap)) {
//     for (task of dogTasks.tasks) {
//       console.log(task);
//     }
//   }
// }
/* function init() {
  renderPetCard();
}
init(); */