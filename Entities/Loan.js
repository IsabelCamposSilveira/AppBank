import Installment from "./Installment.js";

export default class Loan {
    static #taxaJuros = 1.05;

    constructor(valorEmprestimo, quantidadeParcelas){
        this.valorEmprestimo = valorEmprestimo;
        this.data = new Date();
        
        this.quantidadeParcelas = quantidadeParcelas;
        this.parcelas = [];
        for (let i = 1; i <= quantidadeParcelas; i++) {
            const valorParcela = (valorEmprestimo * Loan.#taxaJuros) / quantidadeParcelas;
            this.parcelas.push(new Installment(valorParcela, i));
        }
    }

    static get taxaJuros(){
        return Loan.#taxaJuros;
    }

    static set taxaJuros(valorPorcentagem){
        Loan.#taxaJuros = 1 + (valorPorcentagem/100);
    }

    getParcelas() {
        return this.parcelas;
    }
}