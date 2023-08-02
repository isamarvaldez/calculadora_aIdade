


function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = receberValores()

    // Passo 2
    let idadeCalculado = calcularIdade(usuario.ano, usuario.mes, usuario.dia)

    // Passo 3
    let classificacaoIdade = classificarIdade(idadeCalculado)

    console.log(classificacaoIdade)

    // Passo 4
    usuario = organizarDados(usuario, idadeCalculado, classificacaoIdade)

    // Passo 5
    cadastrarUsuario(usuario)
    
    // Esse
    carregarUsuarios()

    // Ou
    // window.location.reload()

}

function receberValores() {
    let anoRecebido = document.getElementById("ano").value
    let mesRecebida = document.getElementById("mes").value
    let diaRecebido = document.getElementById("dia").value

    let dadosUsuario = {
        ano: anoRecebido,
        mes: mesRecebida,
        dia: diaRecebido
    }

    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularIdade(ano,mes, dia) {
    const dataAtual = new Date();
    const anoAtual =  dataAtual.getFullYear();

    
    
    let idade = (anoAtual - ano)

    console.log(idade)

    return idade
}

function classificarIdade(idade) {
    /* 
   Resultado            Faixa
    0 à 12                Criança
    13 à 17                Adolescente
    18 à 65               Adulto
    Acima de 65         Idoso   
    */

    if (idade >0 && idade < 12) {
        return " voce é crianca"
    } else if (idade >= 13 && idade <= 17) {
        return "voce é adolecente"
    } else if (idade >= 18 && idade <= 65) {
        return "voce é adulto"
    } else {
        return "voce é idoso"
    }
}

function organizarDados(dadosUsuario, valorIdade, classificacaoIdade) {
    // Pegar a dataHoraAtual
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

    // Organizando o objeto para salvar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade: valorIdade,
        situacaoIdade: classificacaoIdade,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // Se houver uma lista de usuarios no localStorage, carregar isso para a variavel listaUsuarios
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }

    // Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    // Salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados",  JSON.stringify(listaUsuarios) )

}

function carregarUsuarios() {
    let listaCarregada = []

    if ( localStorage.getItem("usuariosCadastrados") != null ) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0) {
        // Se não tiver nenhum usuario cadastrado, mostrar mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado ☹ </td>
        </tr>`

    } else {
        // Montar conteudo da tabela
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios() )

// Passo 7
function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""
//                                             ojo trocar
   listaUsuarios.forEach(usuario => {
        template += `<tr>
            <td data-cell="nome">${usuario.ano}</td> 
            <td data-cell="altura">${usuario.mes}</td>
            <td data-cell="peso">${usuario.dia}</td>
            <td data-cell="valor do IMC">${usuario.idade.toFixed(0)}</td>
            <td data-cell="classificação do IMC">${usuario.situacaoIdade}</td>
            <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a página
    window.location.reload()
}