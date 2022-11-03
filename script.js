let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("desc");
let msg = document.getElementById("msg");
let add = document.getElementById("add");
let tasks = document.getElementById("tasks");

let data = [];

// check the title is blank or not
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidate();
});

// get data and show in screen
let showTasks = () => {
  let task = JSON.parse(localStorage.getItem("tasks"));
  tasks.innerHTML = "";
  task.map((item, idx) => { 
    return (tasks.innerHTML = tasks.innerHTML + `<div id="${idx}">
              <span class="fw-bold">${item.text}</span>
              <span class="small text-secondary">${item.date}</span>
              <p>${item.textarea}</p>
              <span class="options">
                  <!-- Edit -->
                  <i class="bi bi-pencil-square" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
  
                  <!-- Delete -->
                  <i class="bi bi-trash-fill" onclick="deleteTask(this)"></i>
              </span>
          </div>`);
  });

  resetForm();
};

// To make the empty form again for next task
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Posting the data
let getData = () => {
  // Adding task to data array
  data.push({
    text: textInput.value,
    date: dateInput.value,
    textarea: textarea.value
  });

  localStorage.setItem("tasks", JSON.stringify(data));
  showTasks();
};

let formValidate = () => {
  if (textInput.value === "") {
    //Failure
    msg.innerHTML = "Task title cannot be blank";
  } else {
    // Success
    msg.innerHTML = "";
    getData();

    // close modal after submission
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    // IIFE -> Immediately invoked fuction expression
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// deleting task
let deleteTask = (e) => {
  // removing item from DOM
  e.parentElement.parentElement.remove();

  //   deleting the element from data array
  data.splice(e.parentElement.parentElement.id, 1);

  //   Updating local storage
  localStorage.setItem("tasks", JSON.stringify(data));
};

// editing task
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem(tasks)) || [];
    showTasks();
  })();