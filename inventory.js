export default class Inventory{

    constructor(){
        this._start = null;
    }

    addProduct(product){
        if(this._start == null){
            this._start = product;
            return true;
        }

        let exist = this._searchByCode(product.getCode());
        if(!exist){
            this._insert(product);
            return true;
        }

        return false;
    }

    _insert(product){
        let temp = this._start;
        if(product.getCode() < temp.getCode()){
            this._start = product;
            product.setNext(temp);
            temp.setPrev(product);
            return;
        }

        while(temp.next != null){
            if(temp.getCode() > product.getCode()){
                product.setPrev(temp.prev);
                product.setNext(temp);
                temp.setPrev(product);
                return;
            }
            temp = temp.next;
        }

        temp.setNext(product);
        product.setPrev(temp);
    }

    _searchByCode(code){
        let temp = this._start;
        while(temp != null){
            if(temp.getCode() == code){
                return true;
            }

            temp = temp.next;
        }

        return false;
    }

    searchProductByCode(code){
        let exist = this._searchByCode(code);
        if(!exist){
            return null;
        }

        let temp = this._start;
        while(temp.getCode() != code){
            temp = temp.next;
        }

        return temp;
    }

    deleteProductByCode(code){
        let exist = this._searchByCode(code);
        if(!exist){
            return null;
        }

        let temp = this._start;
        if(temp.getCode() == code){
            this._start = temp.next;
            if(this._start != null){
                this._start.setPrev(null);
            }
            temp.setNext(null);
            return temp;
        }

        let prev = null;
        while(temp.getCode() != code){
            prev = temp;
            temp = temp.next;
        }

        prev.setNext(temp.next);
        temp.next = null;
        temp.prev = null;
        prev.next.setPrev(prev);
        return temp;
    }

    list(){
        let temp = this._start;
        if(temp == null){
            return "Inventario vacío.";
        }

        let i = 1;
        let list = "";
        while(temp != null){
            list += `<i>${i}</i>. Código: <b>${temp.getCode()}</b>, nombre: ${temp.getName()}. `;
            temp = temp.next;
            i++;
        }

        return list;
    }

    tsil(){
        let temp = this._start;
        if(temp == null){
            return "Inventario vacío.";
        }

        let i = 1;
        let tsil = "";
        while(temp != null){
            tsil = `<i>${i}</i>. Código: <b>${temp.getCode()}</b>, nombre: ${temp.getName()}. ` + tsil;
            temp = temp.next;
            i++;
        }

        return tsil;
    }
}