let users = [];

const userName = document.querySelector('#userName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');

const form = document.querySelector('#new-user');

const containerUsers = document.querySelector('#users');

const btnChange = document.querySelector('.change');

let modifying = false;

let darkMode = false;

const objUser = {
    userName: '',
    email: '',
    phone: '',
    password: ''
}

eventListeners();

function eventListeners() {

    document.addEventListener('DOMContentLoaded', () => {
        printUsers();
    });

    userName.addEventListener('input', setDataObject);
    email.addEventListener('input', setDataObject);
    phone.addEventListener('input', setDataObject);
    password.addEventListener('input', setDataObject);

    btnChange.addEventListener('click', changeMode);

    form.addEventListener('submit', validateForm);
}

function changeMode() {

    const body = document.querySelector('body');
    const container = document.querySelector('.container');

    if (!darkMode) {
        darkMode = true;
        btnChange.textContent = 'Light mode';
        body.classList.add('dark', 'back-dark');
        container.classList.add('dark');
        btnChange.classList.add('btn-light');
        btnChange.classList.remove('btn-dark');
        return;
    }

    darkMode = false;
    btnChange.textContent = 'Dark mode';
    body.classList.remove('dark', 'back-dark');
    container.classList.remove('dark');
    btnChange.classList.remove('btn-light');
    btnChange.classList.add('btn-dark');
}

function setDataObject(e) {
    objUser[e.target.name] = e.target.value;
}

function validateForm(e) {
    e.preventDefault();

    const { userName, email, phone, password } = objUser;

    if (userName === '' || email === '' || phone === '' || password === '') {
        showAlert('All fields are required', 'error');
        return;
    }

    if (modifying) {

        editUser({ ...objUser });

        showAlert('User modified successfully');

        form.querySelector('button[type="submit"]').textContent = 'Add user';

        modifying = false;
    } else {
        objUser.id = Date.now();

        users.push({ ...objUser });

        showAlert('User added successfully');
    }

    resetObject();
    form.reset();

    printUsers();
}

function editUser(object) {
    const { id } = object;

    users = users.map(user => user.id === id ? object : user);
}

function showAlert(message, type) {
    const divAlert = document.createElement('div');
    divAlert.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (type === 'error') {
        divAlert.classList.add('alert-danger')
    } else {
        divAlert.classList.add('alert-success');
    }

    divAlert.textContent = message;

    document.querySelector('#content').insertBefore(divAlert, document.querySelector('.add-user'));

    setTimeout(() => {
        divAlert.remove();
    }, 5000);
}

function resetObject() {
    objUser.userName = '';
    objUser.email = '';
    objUser.phone = '';
    objUser.password = '';
}

function printUsers() {

    cleanHTML(containerUsers);

    users.forEach(user => {
        const { userName, email, phone, password, id } = user;

        const divUser = document.createElement('div');
        divUser.classList.add('users', 'p-3');
        divUser.dataset.id = id;

        const userNameParagraph = document.createElement('h2');
        userNameParagraph.classList.add('card-title', 'font-weight-bolder');
        userNameParagraph.textContent = userName;

        const emailParagraph = document.createElement('p');
        emailParagraph.innerHTML = `
            <span class="font-weight-bolder">Email: </span>${email}
        `;

        const phoneParagraph = document.createElement('p');
        phoneParagraph.innerHTML = `
            <span class="font-weight-bolder">Phone number: </span>${phone}
        `;

        const passwordParagraph = document.createElement('p');
        passwordParagraph.innerHTML = `
            <span class="font-weight-bolder">Password: </span>${password}
        `;

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
        btnDelete.innerHTML = 'Remove <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /> </svg>'

        btnDelete.onclick = () => deleteUser(id);

        const btnEdit = document.createElement('button');
        btnEdit.classList.add('btn', 'btn-info');
        btnEdit.innerHTML = 'Edit <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" /></svg>'

        btnEdit.onclick = () => getData(user);

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

    users = users.filter(user => user.id !== id);

    showAlert('User deleted successfully');

    printUsers();
}

function getData(user) {

    userName.value = user.userName;
    email.value = user.email;
    phone.value = user.phone;
    password.value = user.password;

    objUser.userName = user.userName;
    objUser.email = user.email;
    objUser.phone = user.phone;
    objUser.password = user.password;
    objUser.id = user.id;

    form.querySelector('button[type="submit"]').textContent = 'Update data';

    modifying = true;
}

function cleanHTML(spaceToClean) {
    while (spaceToClean.firstChild) {
        spaceToClean.removeChild(spaceToClean.firstChild);
    }
}
