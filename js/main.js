let elStudent = document.querySelector(".report_student-span");
let elTicher = document.querySelector(".report_ticher-span");
let elFanlar = document.querySelector(".report_fanlar-span");
let elGuruhlar = document.querySelector(".report_gruhlar-span");
let elList = document.querySelector(".list");

apiFunc("/all-teacher").then((data) => {
  elTicher.textContent = data.data.length;
});

apiFunc("/all-student").then((data) => {
  elStudent.textContent = data.data.length;
});

apiFunc("/all-group").then((data) => {
  elFanlar.textContent = data.data.length;
});

apiFunc("/all-subject").then((data) => {
  elGuruhlar.textContent = data.data.length;
});

elList.addEventListener("click", (evt) => {
  console.log(evt.target);
  if (evt.target.matches(".list_item-Xisoblar")) {
    location.replace("index.html");
  }
  if (evt.target.matches(".list_item-Oqtuvchilar")) {
    location.replace("ticher.html");
  }
  if (evt.target.matches(".list_item-Oquvchilar")) {
    location.replace("student.html");
  }
  if (evt.target.matches(".list_item-Fanlar")) {
    location.replace("sciences.html");
  }
  if (evt.target.matches(".list_item-Gruhlar")) {
    location.replace("guruhlar.html");
  }
});
