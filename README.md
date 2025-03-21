# 📌 Sistema de Cadastro de Funcionários

Este é um projeto de API REST para cadastro de funcionários, desenvolvido em **Java** com **Spring Boot** e banco de dados **PostgreSQL**. A API permite realizar operações CRUD (Criar, Ler, Atualizar e Deletar) e conta com um frontend simples em **JavaScript** para interação.

## 🚀 Funcionalidades
- 📋 Listar todos os funcionários
- 🔍 Buscar um funcionário por ID
- ➕ Criar um novo funcionário
- ✏️ Atualizar informações de um funcionário
- ❌ Deletar um funcionário

## 🛠️ Tecnologias Utilizadas
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Banco de Dados:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript
- **Ferramentas:** Visual Studio Code, Postman, GitHub

## 🏗️ Como Configurar e Executar o Projeto
### 📌 1. Clonar o Repositório
```bash
git clone https://github.com/ffelipealves/cadastro-funcionarios-java.git
cd cadastro-funcionarios-java
```

### 🖥️ 2. Configurar o Banco de Dados (PostgreSQL)
Crie um banco de dados PostgreSQL e configure as credenciais no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/seu_banco
db.username=seu_usuario
db.password=sua_senha
```

### ⚙️ 3. Executar a API
Execute o projeto com o seguinte comando:
```bash
./mvnw spring-boot:run  # Para Linux/Mac
mvnw.cmd spring-boot:run  # Para Windows
```
A API estará disponível em: `http://localhost:8080/api/funcionarios`

## 📡 Endpoints da API
### 🔹 Listar Todos os Funcionários
```
GET /api/funcionarios
```
#### 🔹 Resposta:
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "cargo": "Desenvolvedor"
  }
]
```

### 🔹 Buscar Funcionário por ID
```
GET /api/funcionarios/{id}
```

### 🔹 Criar um Novo Funcionário
```
POST /api/funcionarios
```
#### 🔹 Corpo da Requisição:
```json
{
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "cargo": "Gerente"
}
```

### 🔹 Atualizar Funcionário
```
PUT /api/funcionarios/{id}
```

### 🔹 Deletar Funcionário
```
DELETE /api/funcionarios/{id}
```

## 📄 Licença
Este projeto está sob a licença MIT.

---
(https://github.com/ffelipealves) 🚀

