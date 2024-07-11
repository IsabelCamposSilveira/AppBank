import Account from './Account.js'

export default class User{
    constructor(nome, email){
        this.email = email;
        this.nome = nome;
        this.account = new Account(this)
    }
}