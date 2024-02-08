// import {clients} from './people.js'

// clients.forEach((element)=>console.log(element))

const users = [];

const userName = document.querySelector('#userName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');

const form = document.querySelector('#new-user');

const containerUsers = document.querySelector('#users');

let modifying;

const objUser = {
    userName: '',
    email: '',
    phone: '',
    password: ''
}

eventListeners();

function eventListeners() {
    userName.addEventListener('input', setDataObject);
    email.addEventListener('input', setDataObject);
    phone.addEventListener('input', setDataObject);
    password.addEventListener('input', setDataObject);

    form.addEventListener('submit', validateForm);
}

function setDataObject(e) {
    objUser[e.target.name] = e.target.value;
    console.log(objUser);
}

function validateForm(e) {
    e.preventDefault();

    const {userName,email,phone,password}=objUser;

    if(userName==='' || email==='' || phone==='' || password===''){
        showAlert('All fields are required','error');
        return;
    }

    objUser.id=Date.now();

    users.push({...objUser});

    showAlert('User added successfully');

    resetObject();
    form.reset();

    printUsers();
}

function showAlert(message, type) {
    const divAlert = document.createElement('div');
    divAlert.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (type==='error'){
        divAlert.classList.add('alert-danger')
    }else{
        divAlert.classList.add('alert-success');
    }

    divAlert.textContent=message;

    document.querySelector('#content').insertBefore(divAlert, document.querySelector('.add-user'));

    setTimeout(() => {
        divAlert.remove();
    }, 5000);
}

function resetObject() {
    objUser.userName='';
    objUser.email='';
    objUser.phone='';
    objUser.password='';
}

function printUsers() {

    cleanHTML(containerUsers);

    users.forEach(user => {
        const {userName,email,phone,password,id}=user;

        const divUser=document.createElement('div');
        divUser.classList.add('cita', 'p-3');
        divUser.dataset.id=id;

        const userNameParagraph=document.createElement('h2');
        userNameParagraph.classList.add('card-title', 'font-weight-bolder');
        userNameParagraph.textContent=userName;

        const emailParagraph=document.createElement('p');
        emailParagraph.innerHTML=`
            <span class="font-weight-bolder">Email: </span>${email}
        `;

        const phoneParagraph=document.createElement('p');
        phoneParagraph.innerHTML=`
            <span class="font-weight-bolder">Phone number: </span>${phone}
        `;

        const passwordParagraph=document.createElement('p');
        passwordParagraph.innerHTML=`
            <span class="font-weight-bolder">Password: </span>${password}
        `;

        const btnDelete=document.createElement('button');
        btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
        btnDelete.innerHTML='Remove <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /> </svg>'

        btnDelete.onclick=()=>deleteUser(id);

        const btnEdit=document.createElement('button');
        btnEdit.classList.add('btn', 'btn-info');
        btnEdit.innerHTML='Edit <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" /></svg>'

        btnEdit.onclick=()=>editUser(user);

        divUser.appendChild(userNameParagraph);
        divUser.appendChild(emailParagraph);
        divUser.appendChild(phoneParagraph);
        divUser.appendChild(passwordParagraph);
        divUser.appendChild(btnDelete);
        divUser.appendChild(btnEdit);

        containerUsers.appendChild(divUser);
    });
}

function deleteUser(id) {

}

function editUser(user) {

}

function cleanHTML(spaceToClean) {
    while (spaceToClean.firstChild) {
      spaceToClean.removeChild(spaceToClean.firstChild);
    }
  }
