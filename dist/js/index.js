"use strict";
//REBENCO OS ELEMENTOS
const btnCadastrar = document.getElementById('btn-cadastrar');
const btnCancelar = document.getElementById('btn-cancelar');
const cardLogin = document.getElementById('card-login');
const cardCadastro = document.getElementById('card-cadastro');
//BOTÃO CADASTRAR
/* btnCadastrar.addEventListener('click', modificaCardParaCadastrar);

function modificaCardParaCadastrar() {
    cardLogin.setAttribute("style", "display: none");
    cardCadastro.setAttribute("style", "display: flex");
} */
//BOTÃO CANCELAR
/* btnCancelar.addEventListener("click", modificaCardParaLogin);

function modificaCardParaLogin() {
    cardLogin.setAttribute("style", "display: flex");
    cardCadastro.setAttribute("style", "display: none");
}
 */
//CRIANDO E SALVANDO USUÁRIO
const botaoSalvar = document.querySelector('#btn-salvar').addEventListener('click', (e) => {
    e.preventDefault();
    /* let email = (<HTMLInputElement>document.querySelector('#email-cadastrar')).value; */
    let email = document.getElementById('email-cadastrar');
    /* let senha = (<HTMLInputElement>document.querySelector('#senha-cadastrar')).value; */
    let senha = document.getElementById('senha-cadastrar');
    /* let confirmaSenha = (<HTMLInputElement>document.querySelector('#input-confirma-senha')).value; */
    let confirmaSenha = document.getElementById('input-confirma-senha');
    if (email.value.length > 5 && validaEmail(email.value) === true) {
        if (senha.value === confirmaSenha.value) {
            salvar(email.value, senha.value);
            alert("Cadastro realizado com sucesso!");
        }
        else {
            alert("As senhas digitadas devem ser iguais!");
        }
    }
    else {
        alert("O E-mail digitado é inválido! \nExemplo: texto@texto.com");
    }
    let emailValue = email.value;
    console.log(emailValue.length);
});
//VALIDANDO E-MAIL
function validaEmail(validaE) {
    let re = /\S+@\S+\.\S+/;
    return re.test(validaE);
}
function salvar(e, s) {
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    };
    if (usuario)
        db.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'index.html';
}
;
//LOGANDO NO SISTEMA
const btnLogar = document.querySelector('#btn-logar').addEventListener('click', (e) => {
    e.preventDefault();
    entrar();
});
function entrar() {
    let email = document.querySelector('#email-logar');
    let senha = document.querySelector('#senha-logar');
    /* let listaUser = '[]'; */
    let usuarioValido = {
        id: "",
        login: "",
        senha: ""
    };
    let listaUser = JSON.parse(localStorage.getItem('usuarios') || '[]');
    listaUser.forEach((item) => {
        if (email.value === item.login.value && senha === item.senha.value) {
            usuarioValido = {
                id: item.id,
                login: item.login,
                senha: item.senha
            };
        }
    });
    if (email.value === "" || senha.value === "") {
        alert("Um ou mais campos inválidos!");
    }
    else {
        if (email.value === usuarioValido.login && senha.value === usuarioValido.senha) {
            alert('Bem-vindo so sitema Notes!');
            saveSession(usuarioValido.id);
            window.location.href = 'recados.html';
        }
        else {
            alert('Algo deu errado, verifique o e-mail e a senha digitado \nOu clique em Criar conta!');
        }
    }
}
;
function saveSession(data) {
    if (!saveSession) {
        sessionStorage.setItem("logado", JSON.stringify(data));
    }
    localStorage.setItem("session", data);
}
;
