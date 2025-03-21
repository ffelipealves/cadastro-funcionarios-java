// ✅ Mensagem para indicar que o script foi carregado
console.log("Script carregado!");

// ✅ URL base da API
const apiUrl = "http://localhost:8080/api/funcionarios";

/**
 * ✅ Função para buscar funcionários na API (por ID ou todos)
 * @param {string} id (Opcional) - ID do funcionário a ser buscado
 * @returns {Promise<Array>} Lista de funcionários
 */

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("modal").style.display = "none";
});

async function buscarFuncionarios(id = "") {
    try {
        let url = apiUrl;
        if (id) {
            url += `/${encodeURIComponent(id)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            let mensagemErro = `Erro HTTP! Status: ${response.status}`;
            
            if (response.status === 400) {
                const textoErro = await response.text();
                mensagemErro = `Erro 400: ${textoErro}`;
                alert(mensagemErro);
                return [];
            }

            if (response.status === 404) {
                alert("Funcionário não encontrado.");
                return [];
            }

            throw new Error(mensagemErro);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            let funcionarios = await response.json();
            return Array.isArray(funcionarios) ? funcionarios : [funcionarios];
        } else {
            throw new Error("Resposta inválida do servidor.");
        }

    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        alert("Erro ao buscar funcionários. Tente novamente mais tarde.");
        return [];
    }
}

/**
 * ✅ Função para preencher a tabela com os funcionários
 * @param {Array} funcionarios - Lista de funcionários
 */
function preencherTabela(funcionarios) {
    const tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = ""; // Limpa a tabela antes de preencher

    if (funcionarios.length === 0) {
        tabela.innerHTML = `<tr><td colspan="5" style="text-align: center;">Nenhum funcionário encontrado.</td></tr>`;
        return;
    }

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

    adicionarEventosBotoes(); // Adiciona eventos após preencher a tabela
}

/**
 * ✅ Adiciona eventos aos botões da tabela
 */
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

            // Abre o modal de edição
            const modal = document.getElementById("modal");
            if (modal) {
                modal.style.display = "flex"; // Usa flexbox se necessário
            }
        });
    });
}

/**
 * ✅ Função para carregar funcionários e atualizar a tabela
 * @param {string} id (Opcional) - ID do funcionário a ser buscado
 */
async function carregarFuncionarios(id = "") {
    const funcionarios = await buscarFuncionarios(id);
    preencherTabela(funcionarios);
}

/**
 * ✅ Valida os dados do formulário antes de enviar para a API
 */
function validarFormulario(nome, email, cargo) {
    if (!nome || !email || !cargo) {
        alert("Todos os campos são obrigatórios.");
        return false;
    }
    if (!email.includes("@")) {
        alert("E-mail inválido.");
        return false;
    }
    return true;
}

/**
 * ✅ Evento para cadastrar funcionário
 */
document.getElementById("funcionarioForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cargo = document.getElementById("cargo").value.trim();

    if (!validarFormulario(nome, email, cargo)) {
        return;
    }

    const novoFuncionario = { nome, email, cargo };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoFuncionario)
        });

        if (!response.ok) {
            let mensagemErro = "Erro ao cadastrar funcionário.";

            if (response.status === 400) {
                const textoErro = await response.text();
                mensagemErro = `Erro 400: ${textoErro}`;
            }

            throw new Error(mensagemErro);
        }

        alert("Funcionário cadastrado com sucesso!");
        carregarFuncionarios();
        document.getElementById("funcionarioForm").reset();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

/**
 * ✅ Evento para atualizar funcionário
 */
document.getElementById("alterarForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("alterarId").value;
    const nome = document.getElementById("alterarNome").value.trim();
    const email = document.getElementById("alterarEmail").value.trim();
    const cargo = document.getElementById("alterarCargo").value.trim();

    if (!validarFormulario(nome, email, cargo)) {
        return;
    }

    const alteradoFuncionario = { nome, email, cargo };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alteradoFuncionario)
        });

        if (!response.ok) {
            let mensagemErro = "Erro ao atualizar funcionário.";

            if (response.status === 400) {
                const textoErro = await response.text();
                mensagemErro = `Erro 400: ${textoErro}`;
            }

            throw new Error(mensagemErro);
        }

        alert("Funcionário atualizado com sucesso!");
        carregarFuncionarios();
        document.getElementById("alterarForm").reset();
        document.getElementById("modal").style.display = "none";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});


/**
 * ✅ Deletar funcionário com async/await
 */
async function deletarFuncionario(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Erro ao deletar funcionário. Status: ${response.status}`);
        }

        await carregarFuncionarios(); // Atualiza a tabela após deletar
    } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
    }
}

// ✅ Fechar modal ao clicar no botão "Fechar"
document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

// ✅ Fechar modal ao clicar fora dele
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// ✅ Buscar funcionário pelo ID
document.getElementById("botaoBuscar").addEventListener("click", function () {
    id = document.getElementById("campoBusca").value;
    carregarFuncionarios(id);
});

// ✅ Limpar campo de busca e carregar todos os funcionários
document.getElementById("botaoLimpar").addEventListener("click", function () {
    document.getElementById("campoBusca").value = "";
    carregarFuncionarios();
});

// ✅ Carregar funcionários ao abrir a página
carregarFuncionarios();
