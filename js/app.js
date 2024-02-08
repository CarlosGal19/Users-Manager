// import {clients} from './people.js'

// clients.forEach((element)=>console.log(element))

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

    form.addEventListener('submit', newUser);
}

function setDataObject(e) {
    objUser[e.target.name] = e.target.value;
    console.log(objUser);
}

function newUser() {
    console.log('hola');
}
