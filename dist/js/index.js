"use strict";
//REBENCO OS ELEMENTOS
const btnCadastrar = document.getElementById('btn-cadastrar');
const btnCancelar = document.getElementById('btn-cancelar');
const cardLogin = document.getElementById('card-login');
const cardCadastro = document.getElementById('card-cadastro');
//BOTÃO CADASTRAR
btnCadastrar.addEventListener('click', modificaCardParaCadastrar);
function modificaCardParaCadastrar() {
    cardLogin.setAttribute("style", "display: none");
    cardCadastro.setAttribute("style", "display: flex");
}
//BOTÃO CANCELAR
btnCancelar.addEventListener("click", modificaCardParaLogin);
function modificaCardParaLogin() {
    cardLogin.setAttribute("style", "display: flex");
    cardCadastro.setAttribute("style", "display: none");
}
