# Relatório do Projeto BankApp

## 1. Como Aplicar
    1.	Baixar a Solução e Abrir com o Visual Studio Code
    2.	Instalar o `http-server` para abrir o index.html e utilizar o js corretamente:
        a.	Para isso, abra o terminal e insira:  npm install -g http-server
        b.	Navegue até o seu projeto pelo terminal, utilizando `cd..` para sair de uma pasta e `cd ./nomeDaPasta` para entrar em uma pasta.
        c.	Insira no terminal:  http-server	
        d.	Copie a URL que aparecerá no terminal e abra no navegador para visualizar o projeto.

## 2. Sobre o Projeto

### 2.1 Entidades
A pasta `Entities` contém as definições de classes para os principais componentes da aplicação:
**User.js**: Define a classe `User`, representando um usuário com um nome e email.
**Account.js**: Define a classe `Account`, representando a conta de um usuário.
**Deposito.js**: Define a classe `Deposito`, representando um depósito em uma conta.
**Loan.js**: Define a classe `Loan`, representando um empréstimo.
**Installment.js**: Define a classe `Installment`, representando uma parcela de um empréstimo.
**Transfer.js**: Define a classe `Transfer`, representando uma transferência entre contas.

### 2.2 Funcionalidades

**Cadastro de Usuário**: Permite criar um novo usuário com nome e email.
**Login de Usuário**: Permite que um usuário existente faça login usando seu email.
**Depósito**: Permite que um usuário faça depósitos em sua conta.
**Transferência**: Permite transferir fundos de uma conta para outra.
**Empréstimo**: Permite que um usuário solicite um empréstimo e defina o número de parcelas.
**Visualização de Dados**: Permite visualizar informações sobre depósitos, transferências e empréstimos.

## 4. Conclusão

**BankApp** é um projeto básico de aplicação bancária. Ele serve como um bom ponto de partida para entender conceitos de manipulação de DOM, organização de código e estruturação de projetos em JavaScript.
