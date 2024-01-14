const elSelect = document.querySelector(".select");
const elInpTel = document.querySelector(".inp-tel");
const elInpName = document.querySelector(".inp-ticher-name");
const elInpNumber = document.querySelector(".inp-number");
const elInpImg = document.querySelector(".inp-img");
const elInpLastName = document.querySelector(".inp-last-name");
const elForm = document.querySelector("form");
const elwrapper = document.querySelector(".flex");
const elInpSearch = document.querySelector(".search_inp");
let elList = document.querySelector(".end_list");
let list = document.querySelector(".list");

function optionFunc(array) {
  elSelect.innerHTML = "";
  array.forEach((item) => {
    elSelect.innerHTML += `<option value="${item.id}">${item.subject_name}</option>`;
  });
}
apiFunc("/all-subject").then((data) => optionFunc(data.data));

elForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("ddddddddd");
  if (isNaN(elInpTel.value)) {
    elInpTel.classList.add("error");
    return alert("Hato: raqam kiriting (+998881234567)");
  } else {
    elInpTel.classList.remove("error");
  }
  const formData = new FormData();
  formData.append("first_name", elInpName.value);
  formData.append("last_name", elInpLastName.value);
  formData.append("phone_number", elInpTel.value);
  formData.append("age", elInpNumber.value);
  formData.append("subject_id", elSelect.value);
  formData.append("img", elInpImg.files[0]);
  let obj = {
    method: "POST",
    headers: {},
    body: formData,
  };

  editDeletePostFunc("/teacher/create", obj);
  getApiAll();
  elForm.reset();
});

function editDeletePostFunc(api, obj) {
  apiFunc(api, obj)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  getApiAll();
}

function getApiAll() {
  apiFunc(`/all-teacher`)
    .then((data) => render(data.data, ""))
    .catch((error) => {
      console.log(error);
    });
}
getApiAll();

// render functionni yangi fanlarni domga chizish uchun yaratamiz
let searchArr = [];
function render(array, sorchinp) {
  elList.innerHTML = "";

  searchArr.push(array);
  array.forEach((item) => {
    let nam = item.first_name;
    if (sorchinp) {
      let regex = new RegExp(sorchinp, "gi");
      const mark = item.first_name.replace(regex, `<mark>$&</mark>`);
      nam = mark;
      console.log(mark);
    } else {
      nam = item.first_name;
    }
    elList.innerHTML += `<li class="end_item">
              <span class="end_id">${item.id}</span>
              <p class="end_oqtuvchi">${item.last_name} <span>${nam}</span> </p>
      
              <p class="end_tel">${item.phone_number}</p>
              <p class="end_yonalish">${item.subjects.subject_name}</p>
              <p class="end_yish">${item.age}</p>
      
              <button class="end_btn-edit"></button>
              <button class="end_btn-delete"></button>
            </li>`;
  });
}

const elMadal = document.querySelector(".madal");
const elName = document.querySelector(".madal-first-name");
const elLastName = document.querySelector(".madal-last-name");
const elAge = document.querySelector(".madal-age");
const elTel = document.querySelector(".madal-tel");
const elAvatar = document.querySelector(".madal-avatar");
const elFormMadal = document.querySelector(".form-madal");
let arr = [];

elwrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".end_btn-edit")) {
    elMadal.style.display = "block";
    arr.push(evt.target.parentElement.children[0].textContent);
    getApiAll();
  }
  if (evt.target.matches(".end_btn-delete")) {
    let id = evt.target.parentElement.children[0].textContent;
    let obj = {
      method: "DELETE",
    };
    editDeletePostFunc(`/teacher/delete/${id}`, obj);
    getApiAll();
  }
  if (evt.target.matches(".btn-next")) {
    arr.push(evt.target.parentElement.children[0].textContent);

    const formData = new FormData();
    formData.append("first_name", elName.value);
    formData.append("last_name", elLastName.value);
    formData.append("phone_number", elTel.value);
    formData.append("age", elAge.value);
    formData.append("img", elAvatar.files[0]);
    let obj = {
      method: "PUT",
      headers: {},
      body: formData,
    };

    editDeletePostFunc(`/teacher/update/${arr[0]}`, obj);

    elMadal.style.display = "none";

    getApiAll();
    arr = [];
  }
});
elInpSearch.addEventListener("keyup", () => {
  let inpValue = elInpSearch.value.trim().toLowerCase();
  let rezalt = searchArr[0].filter((item) => {
    let searchName = item.first_name.toLowerCase();

    return searchName.includes(inpValue);
  });

  render(rezalt, inpValue);
});

list.addEventListener("click", (evt) => {
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

