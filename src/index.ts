//REBENCO OS ELEMENTOS
const btnCadastrar = document.getElementById('btn-cadastrar') as HTMLElement;
const btnCancelar = document.getElementById('btn-cancelar') as HTMLButtonElement;
const cardLogin = document.getElementById('card-login') as HTMLButtonElement;
const cardCadastro = document.getElementById('card-cadastro')  as HTMLButtonElement;


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
