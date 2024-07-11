export default class Transfer {
    constructor(remetente, receptor, valor){
        this.remetente = remetente;
        this.receptor = receptor;
        this.valor = valor;
        this.data = new Date();
    }
}