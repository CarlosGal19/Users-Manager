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
        divMessage.remove();
    }, 5000);
}
