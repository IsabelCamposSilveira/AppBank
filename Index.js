import App from './App.js';

const ButonCreateUser = document.getElementById('ButonCreateUser');
const ButonLoginUser = document.getElementById('ButonLoginUser');
const ButtonCreateDeposito = document.getElementById('ButtonCreateDeposito');
const ButtonCreateEmprestimo = document.getElementById('ButtonCreateEmprestimo');
const ButtonCreateTransferencia = document.getElementById('ButtonCreateTransferencia');
const navbarLogin = document.getElementById('navbar-login');

// Functions para interagir com o App class
ButonCreateUser.onclick = function createUser() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    App.createUser(nome, email);
    
    alert(`Usuário ${nome} criado!`);
}

ButonLoginUser.onclick = function loginUser() {
    const emailLogin = document.getElementById('emailLogin').value;
    
    const userExist = App.findUser(emailLogin);
    
    if(userExist){
        // Entrar na conta
        document.getElementById('indexScreen').classList.toggle('ocultar');
        document.getElementById('indexScreen').classList.toggle('mostrar');
        document.getElementById('accountScreen').classList.toggle('ocultar');
        document.getElementById('accountScreen').classList.toggle('mostrar');

        // Mostrar o nome de usuário
        document.getElementById('userName').textContent = userExist.nome
        document.getElementById('saldoAtual').textContent = userExist.account.saldo
        document.getElementById('emailUserLogado').textContent = userExist.email
        viewLoans(userExist.email)
        viewDeposits()
        viewTransfers()
    } else {
        alert(`Usuário com e-mail ${emailLogin} não encontrado`)
    }
}

navbarLogin.onclick = function mostrarIndex() {
        // Entrar na conta
        document.getElementById('indexScreen').classList.remove('ocultar');
        document.getElementById('indexScreen').classList.add('mostrar');
        document.getElementById('accountScreen').classList.add('ocultar');
        document.getElementById('accountScreen').classList.remove('mostrar');
}

ButtonCreateDeposito.onclick = function createDeposito() {
    const email = document.getElementById('emailUserLogado').textContent;
    const valor = parseInt(document.getElementById('deposito-valor').value);
    App.createDeposito(email, valor);
    alert(`Deposito de ${valor} criado para ${email}!`);

    // Atualiza saldo e lista de depositos
    document.getElementById('saldoAtual').textContent = App.findUser(email).account.saldo
    viewDeposits(email); // Update view after creation
}

ButtonCreateEmprestimo.onclick = function createLoan() {
    const email = document.getElementById('emailUserLogado').textContent;
    const valor = parseInt(document.getElementById('loan-valor').value);
    const parcelas = parseInt(document.getElementById('loan-parcelas').value);
    App.createLoan(valor, parcelas, email);
    alert(`Emprestimo de ${valor} com ${parcelas} parcelas foi criado para ${email}!`);

    // Atualiza saldo e lista de depositos
    document.getElementById('saldoAtual').textContent = App.findUser(email).account.saldo
    viewLoans(email); // Update view after creation
}

ButtonCreateTransferencia.onclick = function createTransfer() {
    const remetenteEmail = document.getElementById('emailUserLogado').textContent;
    const receptorEmail = document.getElementById('transfer-email').value;
    const valor = document.getElementById('transfer-valor').value;
    App.createTransfer(remetenteEmail, receptorEmail, parseInt(valor));
    

    // Atualiza saldo e lista de depositos
    document.getElementById('saldoAtual').textContent = App.findUser(remetenteEmail).account.saldo
    viewTransfers(); // Update view after creation
}

function viewDeposits() {
    const email = document.getElementById('emailUserLogado').textContent;
    const deposits = App.getDeposits(email);

    const output = document.getElementById('data-depositos');
    output.innerHTML = ""
    deposits.forEach(deposit => {
        output.innerHTML += `<p>Data: ${deposit.data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}, Valor: ${deposit.valor}</p><hr>`;
    });
}

function viewLoans(email) {
    const loans = App.getLoans(email);
    const dataEmprestimos = document.getElementById('data-emprestimos');
    dataEmprestimos.innerHTML = ``

    // Mostar emprestimos e parcelas
    loans.forEach(loan => {
        dataEmprestimos.innerHTML += `<p>Data: ${loan.data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}, Valor: ${loan.valor}, Parcelas:</p>`;

        loan.parcelas.forEach(parcela => {
            dataEmprestimos.innerHTML += `<p>${parcela.numero}: Valor = ${parcela.valor.toFixed(2)}, Situação: ${parcela.situacao}</p>`;
        });
        dataEmprestimos.innerHTML += '<hr>'; // Separador entre empréstimos
    });
    
}

function viewTransfers() {
    const email = document.getElementById('emailUserLogado').textContent;
    const transfers = App.getTransfers(email);
    const dataTransferencias = document.getElementById('data-transferencias');
    dataTransferencias.innerHTML = '';
    transfers.forEach(transfer => {
        dataTransferencias.innerHTML += `<p>De: ${transfer.remetenteEmail}, Para: ${transfer.receptorEmail}, Valor: ${transfer.valor}</p>`;
    });

}

