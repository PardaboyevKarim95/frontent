let list = document.querySelector(".list");
let elList = document.querySelector(".end_list");
const elForm = document.querySelector("form");
const elwrapper = document.querySelector(".flex");
const elFirstName = document.querySelector(".studen_name_inp");
const elStudentTel = document.querySelector(".studen_tel_inp");
const elLastName = document.querySelector(".studen_last_name_inp");
const elOtaOnasi = document.querySelector(".ota_onasi_ismi");
const elOtaOnasiTel = document.querySelector(".ota_onasi_tel");
const elSelect = document.querySelector(".select");
const elStudentAge = document.querySelector(".studen_age");
const elInpSearch = document.querySelector(".search_inp");

elSelect.innerHTML = "";
apiFunc("/all-group").then((data) =>
  data.data.forEach((week) => {
    elSelect.innerHTML += `<option value="${week.id}">${week.group_name} </option>`;
  })
);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (isNaN(elStudentTel.value)) {
    elStudentTel.classList.add("error");
    return alert("Hato: raqam kiriting (998881234567)");
  } else {
    elStudentTel.classList.remove("error");
  }
  if (isNaN(elOtaOnasiTel.value)) {
    elOtaOnasiTel.classList.add("error");
    return alert("Hato: raqam kiriting (998881234567)");
  } else {
    elOtaOnasiTel.classList.remove("error");
  }

  let obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: elFirstName.value,
      last_name: elLastName.value,
      age: elStudentAge.value,
      phone_number: elStudentTel.value,
      parent_name: elOtaOnasi.value,
      parent_phone_number: elOtaOnasiTel.value,
      group_id: elSelect.value,
    }),
  };

  editDeletePostFunc("/student/create", obj);
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
  apiFunc(`/all-student`)
    .then((data) => {
      render(data.data, "");
      console.log(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getApiAll();
let searchArr = [];
let arrId = [];

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
    <p class="end_oqtuvchi">${item.last_name} ${nam}</p>
    <p class="end_tel">${item.phone_number}</p>
    <p class="end_yonalish">${item.groups.group_name}</p>
    <p class="end_ota-onasi">${item.parent_name}</p>
    <p class="end_ota-onasi-tel">${item.parent_phone_number}</p>
    
    <button class="end_btn-edit"></button>
    <button class="end_btn-delete"></button>
    </li>`;
  });
}
const elMadal = document.querySelector(".madal");
const elName = document.querySelector(".madal-first-name");
const elLastNamInp = document.querySelector(".madal-last-name");
const elAge = document.querySelector(".madal-age");
const elTel = document.querySelector(".madal-tel");
const elParentName = document.querySelector(".madal-parent-name");
const elParentnumber = document.querySelector(".madal-parent-tel");
const elFormMadal = document.querySelector(".form-madal");
let arr = [];
elwrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".end_btn-edit")) {
    elMadal.style.display = "block";
    arr.push(evt.target.parentElement.children[0].textContent);
  }
  if (evt.target.matches(".end_btn-delete")) {
    let id = evt.target.parentElement.children[0].textContent;
    let obj = {
      method: "DELETE",
    };
    editDeletePostFunc(`/student/delete/${id}`, obj);
    getApiAll();
  }
  if (evt.target.matches(".btn-next")) {
    let obj = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: elName.value,
        last_name: elLastNamInp.value,
        age: elAge.value,
        phone_number: elTel.value,
        parent_name: elParentName.value,
        parent_phone_number: elParentnumber.value,
      }),
    };

    editDeletePostFunc(`/student/update/${arr[0]}`, obj);

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
