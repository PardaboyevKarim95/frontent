
const elList = document.querySelector(".list");
const elticher = document.querySelector(".ticher");
const elguruhNomi = document.querySelector(".group_name");
const elGuruhSellect = document.querySelector(".guruh_select");
const elGuruhSellectt = document.querySelector(".guruh_selectt");
const elDarsSellect = document.querySelector(".dars_kuni_select");
const elDarsboshlashVaqti = document.querySelector(".group_time_start");
const elDarsTugashVaqti = document.querySelector(".group_time_stop");
const elForm = document.querySelector("form");
const elwrapper = document.querySelector(".druh-js");
const elMadal = document.querySelector(".madal");
const elMadalticher = document.querySelector(".madal_ticher");
const elMadalguruhNomi = document.querySelector(".madal_group_name");
const elMadalGuruhSellect = document.querySelector(".madal_guruh_select");
const elMadalGuruhSellectt = document.querySelector(".madal_guruh_selectt");
const elMadalDarsSellect = document.querySelector(".madal_dars_kuni_select");
const elMadalDarsboshlashVaqti = document.querySelector(
  ".madal_group_time_start"
);

const elMadalDarsTugashVaqti = document.querySelector(".madal_group_time_stop");

let arr = [];
console.log(arr[0]);
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let obj = undefined;
  if (arr[0]) {
    obj = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group_name: elMadalguruhNomi.value,
        group_time_start: elMadalDarsboshlashVaqti.value,
        group_time_stop: elMadalDarsTugashVaqti.value,
        subject_id: elMadalGuruhSellect.value,
        week_id: elMadalDarsSellect.value,
        teacher_id: elMadalticher.value,
      }),
    };
    editDeletePostFunc(`/group/update/${arr[0]}`, obj);
    elMadal.style.display = "none";
  } else {
    obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group_name: elguruhNomi.value,
        group_time_start: elDarsboshlashVaqti.value,
        group_time_stop: elDarsTugashVaqti.value,
        subject_id: elGuruhSellect.value,
        week_id: elDarsSellect.value,
        teacher_id: elticher.value,
      }),
    };
    editDeletePostFunc("/group/create", obj);
  }

  getApiAll();
  arr = [];
  elForm.reset();
});

function editDeletePostFunc(url, obj) {
  apiFunc(url, obj)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
function getApiAll() {
  apiFunc("/all-group").then((data) => {
    render(data.data);
  });
  
}
getApiAll();

function renderSelect() {
  elDarsSellect.innerHTML = "";
  elGuruhSellect.innerHTML = "";
  elticher.innerHTML = "";
  apiFunc("/all-week").then((data) =>
    data.data.forEach((week) => {
      elDarsSellect.innerHTML += `<option value="${week.id}">${week.week_name}</option>`;
    })
  );
  apiFunc("/all-subject").then((data) =>
    data.data.forEach((week) => {
      elGuruhSellect.innerHTML += `<option value="${week.id}">${week.subject_name}</option>`;
    })
  );

  apiFunc("/all-teacher").then((data) =>
    data.data.forEach((week) => {
      elticher.innerHTML += `<option value="${week.id}">${week.first_name} ${week.last_name}</option>`;
    })
  );
  // Mdalal select start
  elMadalDarsSellect.innerHTML = "";
  elMadalGuruhSellect.innerHTML = "";
  elMadalticher.innerHTML = "";
  apiFunc("/all-week").then((data) =>
    data.data.forEach((week) => {
      elMadalDarsSellect.innerHTML += `<option value="${week.id}">${week.week_name}</option>`;
    })
  );
  apiFunc("/all-subject").then((data) =>
    data.data.forEach((week) => {
      elMadalGuruhSellect.innerHTML += `<option value="${week.id}">${week.subject_name}</option>`;
    })
  );

  apiFunc("/all-teacher").then((data) =>
    data.data.forEach((week) => {
      elMadalticher.innerHTML += `<option value="${week.id}">${week.first_name} ${week.last_name}</option>`;
    })
  );
}
renderSelect();

function render(array) {
  elwrapper.innerHTML = "";
  array.forEach((item) => {
    elwrapper.innerHTML += `
           <div class="gruh_wrapper">
              <h3 class="gruh_title">${item.subjects.subject_name}</h3>
              <div class="wrapper-p">
              <span class="visually-hidden">${item.id}</span>
                <div class="gruh_img-wrapper">
                  <img src="http://localhost:9090${item.teachers.img}" alt="foto">
                  <div class="grup_img-min-wrapper">
                    <p class="ticher">O'qtuvchi: <span class="drup_ticher-span">${item.teachers.last_name} ${item.teachers.first_name}</span></p>
                    <p class="tel">Tell raqam: <span class="tel-span">${item.teachers.phone_number}</span></p>
                  </div>
                </div>
                <p class="dars-kuni">Dars kunlari: <span class="dars-kunlari-span">${item.weeks.week_name}</span></p>
                <p class="dars-vaqti">Dars vaqti: <span class="dars-vaqti-span">${item.group_time_start}-${item.group_time_stop}</span></p>
                <p class="oqtuvchilar-soni">O'qtuvchi soni: <span class="oqtuvchilar-soni-span">${item.students.length}</span></p>
                <button class="btn_edit">edit</button>
                <button class="btn_delete">delete</button>
              </div>
            </div>`;
  });
}

elwrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".btn_edit")) {
    elMadal.style.display = "block";
    arr.push(evt.target.parentElement.children[0].textContent);

    getApiAll();
  }
  if (evt.target.matches(".btn_delete")) {
    let id = evt.target.parentElement.children[0].textContent;
    let obj = {
      method: "DELETE",
    };
    editDeletePostFunc(`/group/delete/${id}`, obj);
  }
  getApiAll();
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
