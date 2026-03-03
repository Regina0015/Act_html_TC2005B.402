const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('btnlogin');
const cleanButton = document.getElementById('btnClean');
const messageElement = document.getElementById('message');

loginButton.addEventListener('click', validarLogin);
cleanButton.addEventListener('click', limpiarCampos);

function validarLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const USER = "admin";
    const PASS = "1234";

    if (username === "" || password === "") {
        messageElement.textContent = "Por favor, complete todos los campos.";
        return;
    }

    if (username === USER && password === PASS) {
        messageElement.textContent = "Login exitoso.";
        window.location.href = "home.html";
    } else {
        messageElement.textContent = "Datos incorrectos.";
    }
}

function limpiarCampos() {
    usernameInput.value = "";
    passwordInput.value = "";
    messageElement.textContent = "";}