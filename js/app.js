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

        divUser.appendChild(userNameParagraph);
        divUser.appendChild(emailParagraph);
        divUser.appendChild(phoneParagraph);
        divUser.appendChild(passwordParagraph);

        containerUsers.appendChild(divUser);
    });
}

function cleanHTML(spaceToClean) {
    while (spaceToClean.firstChild) {
      spaceToClean.removeChild(spaceToClean.firstChild);
    }
  }
