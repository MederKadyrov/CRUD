let form = document.querySelector('form');
let userName = document.getElementById('name');
let phone = document.getElementById('tel');
let email = document.getElementById('email');
let imgInp = document.getElementById('img');
let btnSubmit = document.getElementById('btnSubmit');
let ul = document.querySelector('ul');

let modal = document.getElementById('modal');
let modalName = document.getElementById('modalName');
let modalEmail = document.getElementById('modalEmail');
let modalTel = document.getElementById('modalTel');
let modalPicture = document.getElementById('modalPicture');
let modalSave = document.getElementById('modalSave');
let close = document.getElementById('close');

createLi()


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if (!userName.value.trim() || !phone.value.trim() || !email.value.trim() || !imgInp.value.trim()) {
        alert('заполните все поля');
        return
    }
    pushToLocal();
    createLi();
});

function pushToLocal () {
    let arr = [userName.value, phone.value, email.value, imgInp.value];
    let data = JSON.parse(localStorage.getItem('big-data') || '[]');
    data.push(arr);
    localStorage.setItem('big-data', JSON.stringify(data));
}

function createLi() {
    ul.innerHTML = '';
    let data = JSON.parse(localStorage.getItem('big-data') || '[]');
    data.forEach((elem, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<div class="item-wrapper">
        <p>${elem[0]}</p>
        <p>${elem[1]}</p>
        <p>${elem[2]}</p>
    </div>`;
        let editPic = document.createElement('img');
        editPic.src = elem[elem.length - 1];
        editPic.width = '200';
        editPic.setAttribute('alt', '=>   no photo')
        let btnDelete = document.createElement('button');
        btnDelete.innerText = 'delete';
        let btnEdit = document.createElement('button');
        btnEdit.innerText = 'edit';
        li.prepend(editPic);
        ul.append(li);
        li.append(btnDelete);
        li.append(btnEdit);
        btnDelete.addEventListener('click', ()=> {
            deleteLi(index);
        })
        btnEdit.addEventListener('click', ()=> {
            editLi(index);
        });
        

        
    });
}

modalSave.addEventListener('click', () => {
    saveNew()
})

function deleteLi(index) {
  let data = JSON.parse(localStorage.getItem("big-data"));
    data.splice(index, 1);
    localStorage.setItem("big-data", JSON.stringify(data));
    createLi();
}

function editLi(index) {
    modal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("big-data"));
//   стягиваем данные с localStorage для изменения определенного объекта 
  modalName.value = data[index][0];
  modalTel.value = data[index][1];
  modalEmail.value = data[index][2];
  modalPicture.value = data[index][3];
  modalName.classList.add(index);
  modalTel.classList.add(index);
  modalEmail.classList.add(index);
}

close.addEventListener("click", () => {
    modal.style.display = "none";
});

function saveNew() {
    let data = JSON.parse(localStorage.getItem("big-data"));
    let c = modalEmail.classList;
    let newArr = [
        data[c][0] = modalName.value,
  data[c][1] = modalTel.value,
  data[c][2] = modalEmail.value,
  data[c][3] = modalPicture.value
    ];
    data.splice(c, 1, newArr);
    localStorage.setItem("big-data", JSON.stringify(data));
    createLi();
    modal.style.display = "none";

}


