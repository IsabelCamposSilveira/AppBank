export default class Account{
    #saldo;

    constructor(user){
        this.user = user;
        this.#saldo = 0;
        this.depositos = [];
        this.loans = [];
        this.transferencias = [];
    }

    get saldo() {
        return this.#saldo;
    }

    addDeposito (deposito) {
        this.#saldo = this.#saldo + deposito.valor;
        this.depositos.push(deposito);
    } 

    addLoan(loan) {
        this.#saldo += loan.valorEmprestimo;
        this.loans.push(loan)
    }
    
    addTransfer(transfer) {
        if(transfer.receptor == this.user.email) {
            this.#saldo += transfer.valor;
            this.transferencias.push(transfer);

        } else if(transfer.remetente == this.user.email){
            this.#saldo -= transfer.valor;
            this.transferencias.push(transfer);
        } 
        
    }

}