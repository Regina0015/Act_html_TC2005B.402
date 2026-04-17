const usernameInput = document.getElementById('username');
const passwordInput= document.getElementById('password');
const loginButton = document.getElementById('btnlogin');
const cleanButton = document.getElementById('btnClean');
const messageElement = document.getElementById('message');

loginButton.addEventListener('click', evento);
cleanButton.addEventListener('click', limpiarCampos);

async function evento(){
    const credentials = {username:usernameInput.value, password:passwordInput.value}
    const res = await fetch("http://localhost:8000/login",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(credentials)
    })
    const data = await res.json()
    console.log(data)

    if(data.isLogin == true){
        sessionStorage.setItem("validarLogin", true)
        sessionStorage.setItem("id", data.user.username)
        window.location = "./game.html?id=" + data.user.username
    }else{
        alert("Creedneciales Incorrectas")
    }
}


//Es básicamente una protección de rutas: si alguien intenta entrar directamente 
// a una página sin haber iniciado sesión,lo manda de regreso al login.
/*
windows.onload = () => {
    if(!sessionStorage.validarLogin) {
        window.location = "../index.html";
    } else {
    }
};

function validarLogin() {
    const username = username.value;
    const password = password.value;

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
*/
function limpiarCampos() {
    usernameInput.value = "";
    passwordInput.value = "";
    messageElement.textContent = "";
}
