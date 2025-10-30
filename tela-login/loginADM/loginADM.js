// loginADM.js

// Usuário e senha fixos (exemplo)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "123456"
};

// Elementos
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Preenche o usuário caso tenha sido salvo no localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }
});

// Validação do login
form.addEventListener('submit', function(e) {
    e.preventDefault(); // evita o envio padrão do form

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Salva ou remove usuário do localStorage
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
        // Redireciona para área administrativa
        window.location.href = '../../tela-manutencao-adm/manutencaoADM.html';
    } else {
        alert("Usuário ou senha incorretos!");
    }
});
