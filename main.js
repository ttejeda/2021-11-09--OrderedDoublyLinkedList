import Product from "./product.js";
import Inventory from "./inventory.js";

class App{

    constructor(){
        this._inventory = new Inventory();
        let btnAdd = document.getElementById("btnAdd");
        let btnSearch = document.getElementById("btnSearch");
        let btnDelete = document.getElementById("btnDelete");
        let btnList = document.getElementById("btnList");
        let btnTsil = document.getElementById("btnTsil");
        btnAdd.addEventListener("click", this._addProduct);
        btnSearch.addEventListener("click", this._searchProduct);
        btnDelete.addEventListener("click", this._deleteProduct);
        btnList.addEventListener("click", this._listProducts);
        btnTsil.addEventListener("click", this._tsilProducts);
    }
    
    _addProduct = () => {
        let product = this._readForm();

        if(this._inventory.length > 20){
            this._showActions("Almacenamiento lleno.");
            return;
        }
        
        if(!product){
            this._showActions("¡Se deben de llenar todos los campos!");
            return;
        }

        let result = this._inventory.addProduct(product);
        if(!result){
            this._showActions(`El producto con el código ${product.getCode()}, ya fue registrado.`);
            return;
        }

        this._showActions(`Agregado ${product.getName()}, código ${product.getCode()}.`);
    }

    _searchProduct = () => {
        let code = this._getCodeForm();
        let result = this._inventory.searchProductByCode(code);
        if(!result){
            this._showActions(result);
            return;
        }

        this._showActions(`Nombre:${result.getName()}. Código:${result.getCode()}.`);
    }
    
    _deleteProduct = () => {
        let code = this._getCodeForm();
        if(!code){
            this._showActions("Coloca un código.");
            return;
        }
        let result = this._inventory.deleteProductByCode(code);
        if(!result){
            this._showActions(result);
            return;
        }

        this._showActions(`Producto eliminado: ${result.getName()}, código:${result.getCode()}.`);
    }

    _listProducts = () => {
        let result = this._inventory.list();
        this._showActions(result);
    }

    _tsilProducts = () => {
        let result = this._inventory.tsil();
        this._showActions(result);
    }

    _getCodeForm(){
        let inpCode = document.getElementById("code");
        let code = inpCode.value;
        inpCode.value = "";
        return code;
    }

    _showActions(message){
        this._console = document.getElementById("result");
        let action = document.createElement("p");
        action.innerHTML = `<p>${message}</p>`;
        this._console.appendChild(action);
    }

    _readForm(){
        let inpCode = document.getElementById("code");
        let inpName = document.getElementById("name");
        let inpAmount = document.getElementById("amount");
        let inpCost = document.getElementById("cost");

        let code = inpCode.value;
        let name = inpName.value;
        let amount = Number(inpAmount.value);
        let cost = Number(inpCost.value);
        
        if(!code || !name || !amount || !cost){
            return false;
        }

        let total = amount * cost;

        inpCode.value = "";
        inpName.value = "";
        inpAmount.value = "";
        inpCost.value = "";
        return new Product(code, name, amount, cost, total);
    }
}

new App();