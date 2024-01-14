const elInp = document.querySelector(".add_inp");
const elForm = document.querySelector("form");
const elListEnd = document.querySelector(".list");
const elList = document.querySelector(".end_list");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inpValue = elInp.value;

  editDeletePostFunc("/subject/create", "POST", inpValue);
  getApiAll();
});

// editDeletePostFunc() functonni edit,delete,post qilish uchun yaratamiz
function editDeletePostFunc(api, method, name) {
  let obj = undefined;
  if (method == "DELETE") {
    obj = {
      method: "DELETE",
    };
    console.log(method == "DELETE");
  } else {
    obj = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject_name: name,
      }),
    };
    console.log("DELETE");
  }
  apiFunc(api, obj).then((data) => {
    console.log(data);
  });

  getApiAll();
}
// getApiAll functionni subjectlarni hammasini olibkelish uchun yaratamiz

function getApiAll() {
  apiFunc("/all-subject").then((data) => render(data.data));
}
getApiAll();

// render functionni yangi fanlarni domga chizish uchun yaratamiz

function render(array) {
  elList.innerHTML = "";
  console.log(array);
  array.forEach((item) => {
    elList.innerHTML += `<li class="end_item">
    <span class="end_id">${item.id}</span>
    <p class="end_fan">${item.subject_name}</p>
    <button class="end_btn-edit"></button>
    <button class="end_btn-delete"></button>
    </li>`;
  });
}
// addEventListener functionni edit o'zgartirish delete o'chirish uchun yaratamiz

elList.addEventListener("click", (evt) => {
  console.log(evt.target);
  if (evt.target.matches(".end_btn-edit")) {
    let id = evt.target.parentElement.children[0].textContent;
    let editName = prompt("ozgartiring");
    editDeletePostFunc(`/subject/update/${id}`, "PUT", editName);
  }

  if (evt.target.matches(".end_btn-delete")) {
    let id = evt.target.parentElement.children[0].textContent;
    console.log(id);
    editDeletePostFunc(`/subject/delete/${id}`, "DELETE");
  }
  getApiAll();
});

elListEnd.addEventListener("click", (evt) => {
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
