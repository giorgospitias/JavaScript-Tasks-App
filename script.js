"use strict";
// Select the Elements
const clear = document.querySelector(".clearBtn");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");

// Classes names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";
// Variables declaration

let LIST = [];
let id = 0;

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

    id++;
  }
  input.value = "";
}
addBtn.addEventListener("click", add);
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add(event);
  }
});
