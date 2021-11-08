export default class Product{

    constructor(code, name, amount, cost, total){
        this.prev = null;
        this._code = code;
        this._name = name;
        this._amount = amount;
        this._cost = cost;
        this._total = total
        this.next = null;
    }

    getCode(){
        return this._code;
    }

    getName(){
        return this._name;
    }

    getAmount(){
        return this._amount;
    }

    getCost(){
        return this._cost;
    }

    getTotal(){
        return this._total;
    }

    setNext(next){
        this.next = next;
    }

    setPrev(prev){
        this.prev = prev;
    }
}