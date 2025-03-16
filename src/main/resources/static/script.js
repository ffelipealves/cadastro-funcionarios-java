// URL base da API
console.log("Script carregado!");
const apiUrl = "http://localhost:8080/api/funcionarios";

// Função para buscar funcionários da API
async function buscarFuncionarios(id = "") {
    try {
        let url = apiUrl;
        if (id) {
            url += `/${encodeURIComponent(id)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        let funcionarios = await response.json();

        // Garante que seja um array
        return Array.isArray(funcionarios) ? funcionarios : [funcionarios];

    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para preencher a tabela com os funcionários
function preencherTabela(funcionarios) {
    const tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = ""; // Limpa a tabela antes de recarregar

    funcionarios.forEach(func => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${func.id}</td>
            <td>${func.nome}</td>
            <td>${func.email}</td>
            <td>${func.cargo}</td>
            <td>
                <button class="btn-deletar" data-id="${func.id}">Deletar</button>
                <button class="btn-alterar" data-id="${func.id}" data-nome="${func.nome}" data-email="${func.email}" data-cargo="${func.cargo}">Alterar</button>
            </td>
        `;
        tabela.appendChild(linha);
    });

    adicionarEventosBotoes();
}

// Função para adicionar eventos aos botões da tabela
function adicionarEventosBotoes() {
    document.querySelectorAll(".btn-deletar").forEach(botao => {
        botao.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            deletarFuncionario(id);
        });
    });

    document.querySelectorAll(".btn-alterar").forEach(botao => {
        botao.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const nome = this.getAttribute("data-nome");
            const email = this.getAttribute("data-email");
            const cargo = this.getAttribute("data-cargo");

            // Preenche os campos do modal com os dados do funcionário
            document.getElementById("alterarId").value = id;
            document.getElementById("alterarNome").value = nome;
            document.getElementById("alterarEmail").value = email;
            document.getElementById("alterarCargo").value = cargo;

            // Abre o modal
            document.getElementById("modal").style.display = "block";
        });
    });
}

// Função principal que orquestra tudo
async function carregarFuncionarios(id = "") {
    const funcionarios = await buscarFuncionarios(id);
    preencherTabela(funcionarios);
}


// Evento para cadastrar funcionário
document.getElementById("funcionarioForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const novoFuncionario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        cargo: document.getElementById("cargo").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFuncionario)
    })
    .then(response => response.json())
    .then(() => {
        carregarFuncionarios(); // Atualiza a lista após cadastrar
        document.getElementById("funcionarioForm").reset();
    })
    .catch(error => console.error("Erro ao cadastrar funcionário:", error));
});

document.getElementById("alterarForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("alterarId").value; // Pegando o ID do funcionário
    const alteradoFuncionario = {
        nome: document.getElementById("alterarNome").value,
        email: document.getElementById("alterarEmail").value,
        cargo: document.getElementById("alterarCargo").value
    };

    fetch(`${apiUrl}/${id}`, { // Agora enviamos a requisição para apiUrl/{id}
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alteradoFuncionario)
    })
    .then(response => response.json())
    .then(() => {
        carregarFuncionarios(); // Atualiza a lista após a alteração
        document.getElementById("alterarForm").reset();
        document.getElementById("modal").style.display = "none"; // Fecha o modal
    })
    .catch(error => console.error("Erro ao atualizar funcionário:", error));
});


// Deletar funcionario
function deletarFuncionario(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            carregarFuncionarios(); // Atualiza a tabela após deletar
        } else {
            console.error("Erro ao deletar funcionário");
        }
    })
    .catch(error => console.error("Erro ao deletar funcionário:", error));
}


document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

// Fechar o modal ao clicar fora dele
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.getElementById("botaoBuscar").addEventListener("click", function () {
    id = document.getElementById("campoBusca").value;
    carregarFuncionarios(id) // Limpa o campo
});


// ✅ Corrigindo o botão "Limpar"
document.getElementById("botaoLimpar").addEventListener("click", function () {
    console.log("Botão Limpar clicado!");
    document.getElementById("campoBusca").value = ""; // Limpa o campo
    carregarFuncionarios();
});


// Carregar funcionários ao abrir a página
carregarFuncionarios();



