const form = document.querySelector('#form-recados') as HTMLFormElement;
const tabela = document.querySelector('#tbody') as HTMLTableElement;
let idx = form.idx.value;

//capturando a sessao
let usuarioId = Number(sessionStorage.getItem('logado'));
const session : any = localStorage.getItem("session");

checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "index.html";
        return;
    }
}

//SALVANDO NO LOCALSTORAGE
const atualizarLocalStorage = (recados : any) => {localStorage.setItem('recados', JSON.stringify(recados))};

//RECUPERA DADOS DO LOCALSTORAGE
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('recados') || '[]');

const salvarRecado = (e : any) => {
    e.preventDefault();
    
    //capturando os dados do formulário
    const descricao = (form.descricao as HTMLInputElement).value;
    const detalhamento = (form.detalhamento as HTMLInputElement).value;

    if(idx == 'novo'){
        const recados = recuperarLocalStorage();
        /* recados.push({id:recados.length + 1, descricao, detalhamento}); */
        let idr = 0;
        for (const rec of recados){
            if(rec.usuarioId === usuarioId){
                idr = Number(rec.id);
            }
        }
        recados.push({id: idr += 1, descricao, detalhamento, usuarioId});
        atualizarLocalStorage(recados);
        preencheTabela();
        form.reset();
    }else{
        let recado = {
            id: idx, descricao, detalhamento, usuarioId
        }
        atualizarRecado(idx, recado);
        preencheTabela();
        form.reset();
        idx = 'novo';
    }
};

const preencheTabela = () => {
    const recados = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(let recado of recados){
        if(recado.usuarioId === usuarioId){
            tabela.innerHTML += `

            <tr>
                <th scope="row">${recado.id}</th>
                <td>${recado.descricao.value}</td>
                <td>${recado.detalhamento.value}</td>
                <td>
                    <img type="button" width="40" class="bi bi-pencil" onclick="removerRecado(${recado.id})">
                    <img type="button" width="40" src="./img/editar.png" onclick="editarRecado(${recado.id})">
                </td>
            </tr>

        `;
        }
    };
};


//REMOVENDO RECADOS
const removerRecado = (id : any) => {
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado : any) => recado.id === id)
    if(indexRecado < 0) return;
    recados.splice(indexRecado, 1);
    atualizarLocalStorage(recados);
    alert("Produto removido com sucesso!")
    preencheTabela();
}

//EDITANDO RECADOS
const editarRecado = (id : any) => {
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado : any) => recado.id === id);
    form.descricao.value = recados[indexRecado].descricao;
    form.detalhamento.value = recados[indexRecado].detalhamento;
    idx = id;
}

const atualizarRecado = (id : any, recado : any) => {
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((r : any) => r.id === id);
    recados[indexRecado] = recado;
    atualizarLocalStorage(recados);
}


//SAINDO DO SISTEMA
const btnSair = (<HTMLButtonElement>document.querySelector('#btn-sair')).addEventListener('click', (e)=>{
    e.preventDefault();
    sair()
  });

  function sair (){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");
    window.location.href = "index.html";
  }


//EVENTOS
/* form === null || form === void 0 ? void 0 : */ form.addEventListener('submit', salvarRecado);
document.addEventListener('DOMContentLoaded', preencheTabela);