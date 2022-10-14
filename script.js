"use strict";
// Select the Elements
const clear = document.querySelector(".clearBtn");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");

const workBtn = document.getElementById("work");
const breakBtn = document.getElementById("break");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playBtn = document.querySelector(".fa-play");
const refreshTimerBtn = document.querySelector(".fa-sharp");
const pauseBtn = document.querySelector(".fa-pause");

// Classes names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";
// Variables declaration

let LIST, id;

let running = 0;
let time = 1500;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
// add to do function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? check : uncheck;
  const LINE = done ? lineThrough : "";

  const item = `<li class="item">
                      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                      <p class="text ${LINE}">${toDo}</p>
                      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                  `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add an item to the list
function add(event) {
  const toDo = input.value;

  // if the input isn't empty
  if (toDo) {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;
  }
  input.value = "";
}
// Event listeners for enter and click
addBtn.addEventListener("click", add);
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add(event);
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}
// target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item to localstorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//timer part
function startPause() {
  playBtn.classList.toggle("hide");
  pauseBtn.classList.toggle("hide");
  if (running == 0) {
    running = setInterval(function () {
      time--;
      timerInitialValue();

      // When 0 seconds, stop timer and log out user
      if (time === 0) {
        clearInterval(running);
        //time = 15;
      }
    }, 1000);
  } else {
    clearInterval(running);
    running = 0;
  }
}
function timerInitialValue() {
  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  // In each call, print the remaining time to UI
  minutes.textContent = `${min}`;
  seconds.textContent = `${sec}`;
  localStorage.setItem("minutes", minutes.textContent);
  localStorage.getItem(minutes);
}
function refresh() {
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
  const isActive = workBtn.classList.contains("active");
  time = isActive ? 1500 : 300;
  clearInterval(running);
  timerInitialValue();
  running = 0;
}
function activeWorkBtn() {
  workBtn.classList.add("active");
  breakBtn.classList.remove("active");

  time = 1500;
  timerInitialValue();
}
function activeBreakBtn() {
  workBtn.classList.remove("active");
  breakBtn.classList.add("active");
  /*if (playBtn.classList.contains("hide")) {
    playBtn.classList.remove("hide");
    pauseBtn.classList.add("hide");
  }*/
  time = 300;
  timerInitialValue();
}

playBtn.addEventListener("click", startPause);
pauseBtn.addEventListener("click", startPause);
refreshTimerBtn.addEventListener("click", refresh);

workBtn.addEventListener("click", activeWorkBtn);
breakBtn.addEventListener("click", activeBreakBtn);
