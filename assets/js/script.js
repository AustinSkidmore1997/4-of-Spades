const petForm = document.querySelector("#petForm");
const petBtn = document.querySelector("#petBtn");
const petInfo = document.querySelector("#petInfo");
const closeModal = document.querySelector("#close");
const closeTask = document.querySelector("#closeTask");

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

closeTask.addEventListener("click", (event) => {
  event.preventDefault();
  petTask.close();
});

petInfo.addEventListener("submit", (event) => {
  event.preventDefault();
  savePetInfo();


  petForm.close();

});



const cardArray = [];
console.log(cardArray);
function savePetInfo() {
  let cardArray = JSON.parse(localStorage.getItem(`petCard`))
  if (!cardArray) {
    cardArray = [];
  }
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

    $(`<div id="${petCard.petName}">`).addClass("card bordered block m-1 p-2 w-96 bg-primary text-primary-content card-primary").appendTo(petList);
    $(`<h2>`).text(`${petCard.petName}`).addClass("block text-2xl font-bold").appendTo(`#${petCard.petName}`);
    $(`<p>`).text(`Age: ${petCard.petAge}`).addClass("block").appendTo(`#${petCard.petName}`);
    $(`<p>`).text(`Pet Type: ${petCard.petType}`).addClass("block").appendTo(`#${petCard.petName}`);
    $(`<p>`).text(`Description: ${petCard.petDescription}`).addClass("block").appendTo(`#${petCard.petName}`);
    $(`<details id="${petCard.petName}Details">`).addClass("block text-lg").appendTo(`#${petCard.petName}`);
    $(`<summary>`).addClass('text-neutral').text('Tasks').appendTo(`#${petCard.petName}Details`);
    $(`<button id="addNewTask">`)
      .text('Add Task')
      .addClass("m-2 block addNewTask btn btn-secondary border-black")
      .on('click', function () {
        localStorage.setItem("taskId", $(this).parent().attr('id'));
        petTask.showModal();
      })
      .appendTo(`#${petCard.petName}Details`);

    // addTaskBtn.addEventListener("click", function () {
    //   localStorage.setItem("taskId", $(this).parent().attr('id'));
    //   petTask.showModal();
    // });

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
const rainCheck = document.querySelector("#isRaining");

const tasks = [];
function addTask() {
  let tasks = JSON.parse(localStorage.getItem(`newTask`))
  if (!tasks) {
    tasks = [];
  }
  const task = {
    taskId: localStorage.getItem("taskId"),
    taskName: newTask.value,
    taskTime: taskTime.value,
    rainCheck: rainCheck.value,
  }
  tasks.push(task);
  console.log(tasks);
  localStorage.setItem(`newTask`, JSON.stringify(tasks));
  petTask.close();
  renderTasks();
}

function renderOnLoad() {

  let tasks = JSON.parse(localStorage.getItem("newTask"));
  if (!tasks) {
    tasks = [];
  }
  for (let i = 0; i < tasks.length; i++) {
    const currentTime = dayjs();
    console.log(tasks[i].taskTime);
    const timeArray = tasks[i].taskTime.split(':');

    const endTime = dayjs().set('hour', timeArray[0]).set('minute', timeArray[1]);
    const remainingTime = endTime.diff(currentTime, 'minute');
    console.log(remainingTime);
    if (!isRaining) {
      $(`<div id="${tasks[i].taskId}${i}">`).appendTo(`#${tasks[i].taskId}`);
      $(`<input type="checkbox" id="${i}">`).appendTo(`#${tasks[i].taskId}${i}`);
      $(`<label for="${i}">`).addClass(`m-2 ${remainingTime < 0 ? 'bg-warning' : ''}`).text(`${tasks[i].taskName} ${tasks[i].taskTime} R${remainingTime}`).appendTo(`#${tasks[i].taskId}${i}`);
    } else if (isRaining && rainCheck) {
      $(`<div id="${tasks[i].taskId}${i}">`).appendTo(`#${tasks[i].taskId}`);
      $(`<input type="checkbox" id="${i}">`).appendTo(`#${tasks[i].taskId}${i}`);
      $(`<label for="${i}">`).addClass("m-2").text(`${tasks[i].taskName} ${tasks[i].taskTime}`).appendTo(`#${tasks[i].taskId}${i}`);
    } else {

    }
    for (let i = 0; i < addTaskAll.length; i++) {
      addTaskAll[i].addEventListener("click", function () {
        localStorage.setItem("taskId", $(this).parent().attr('id'));
        petTask.showModal();
      });
    }
  }
}
function renderTasks() {
  // for (task of tasks) {
  //   i = 0;
  //   i++;
  //   $(`<input type="checkbox" id="${i}">`).appendTo(`#${task.taskId}`);
  //   $(`<label for="${i}">`).text(`${task.taskName} ${task.taskTime}`).appendTo(`#${task.taskId}`);
  // }
  // function startTimer() {
  //   const startTime = dayjs();
  //   const endTime = startTime.add(24, 'hour');
  //   updateTimerUI(endTime.diff(startTime, 'second'));
  //   const timerInterval = setInterval(() => {
  //     const currentTime = dayjs();
  //     const remainingTime = endTime.diff(currentTime, 'second');
  //     updateTimerUI(remainingTime);
  //     if (remainingTime <= 0) {
  //       clearInterval(timerInterval);
  //       console.log('Timer expired!');
  //     }
  //   }, 1000);
  // }
  let tasks = JSON.parse(localStorage.getItem("newTask"));
  if (!tasks) {
    tasks = {};
  }

  for (let i = 0; i < tasks.length; i++) {
    let clearElement = $(`#${tasks[i].taskId}`)
    clearElement.empty();
  }

  for (let i = 0; i < tasks.length; i++) {

    if (!isRaining) {
      $(`<div id="${tasks[i].taskId}${i}">`).appendTo(`#${tasks[i].taskId}`);
      $(`<input type="checkbox" id="${i}">`).appendTo(`#${tasks[i].taskId}${i}`);
      $(`<label for="${i}">`).addClass("m-2").text(`${tasks[i].taskName} ${tasks[i].taskTime}`).appendTo(`#${tasks[i].taskId}${i}`);
    } else if (isRaining && rainCheck) {
      $(`<div id="${tasks[i].taskId}${i}">`).appendTo(`#${tasks[i].taskId}`);
      $(`<input type="checkbox" id="${i}">`).appendTo(`#${tasks[i].taskId}${i}`);
      $(`<label for="${i}">`).addClass("m-2").text(`${tasks[i].taskName} ${tasks[i].taskTime}`).appendTo(`#${tasks[i].taskId}${i}`);
    } else {

    }

  }
}



addTaskSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  setTimeout(function () { }, 500);
  renderTasks();
});
renderOnLoad();
console.log(task.taskName);
for (let i = 0; i < addTaskAll.length; i++) {
  addTaskAll[i].addEventListener("click", function () {
    localStorage.setItem("taskId", $(this).parent().attr('id'));
    petTask.showModal();
  });
}
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