import User from './Entities/User.js';
import Deposito from './Entities/Deposito.js';
import Loan from './Entities/Loan.js';
import Transfer from './Entities/Transfer.js';


export default class App {
    static #users = [];
    
    // Usuários
    static findUser(email){
        const user = this.#users.find( user => user.email === email);
        return user ?? null;
    }

    static createUser(nome, email){
        const userExist = App.findUser(email)

        if(!userExist) {
            App.#users.push(new User(nome, email))
        }
    }

    // Depositos
    static createDeposito(email, valor) {
        const user = this.findUser(email);

        if(user){
            const deposito = new Deposito(valor);
            user.account.addDeposito(deposito);
        } else{
            console.log ("Conta com o email especificado não existente.")
        }
    }
    
    static getDeposits(email) {
        const user = this.findUser(email)
        const deposits = [];
        
        user.account.depositos.forEach(deposit => {
                deposits.push({ data: deposit.data, valor: deposit.valor });
            });
        return deposits;
    }

    //Transfer
    static createTransfer(remetenteEmail, receptorEmail, valor){
        const userRementente = this.findUser(remetenteEmail);
        const userRecptor = this.findUser(receptorEmail);

        if(userRecptor && userRementente){
            const transfer = new Transfer(remetenteEmail, receptorEmail, valor)
            userRecptor.account.addTransfer(transfer);
            userRementente.account.addTransfer(transfer);
            alert(`Tranferencia criada de ${remetenteEmail} para ${receptorEmail}, valor ${valor}.!`);
        } else {
            alert("Usuário não existente")
        }
    }

    static getTransfers(email) {
        const user = this.findUser(email)
        const transfers = [];
        user.account.transferencias.forEach(transfer => {
                transfers.push({ remetenteEmail: transfer.remetente, receptorEmail: transfer.receptor, valor: transfer.valor });
            });
        return transfers;
    }

    //Loans
    static createLoan(valorEmprestimo, quantidadeParcelas, userEmail){
        const user = this.findUser(userEmail);

        if(user){
            const loan = new Loan(parseInt(valorEmprestimo), parseInt(quantidadeParcelas));
            user.account.addLoan(loan);
        }
    }

    static getLoans(email) {
        const loans = [];
        const user = this.findUser(email)
        console.log(email)
        user.account.loans.forEach(loan => {
                loans.push({ data: loan.data, valor: loan.valorEmprestimo, parcelas: loan.parcelas });
            });
        return loans;
    }

    static getInstallment(loan) {
        const installment = [];
        console.log(loan.parcelas +"a" + loan.quantidadeParcelas)
        loan.parcelas.forEach(parcela => {
            installment.push({ numero: parcela.numero, valor: parcela.valor, situacao: parcela.situacao });
        });
        return installment;
    }

    // Não é utlizado atualmente no app
    static updateTaxaDeJurosLoan(taxa){
        Loan.taxaJuros = taxa;   
    }
}