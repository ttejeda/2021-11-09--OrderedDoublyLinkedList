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
            let last = this._getLast();
            last.setNext(product);
            return true;
        }

        return false;
    }

    _getLast(){
        let temp = this._start;
        while(temp.next != null){
            temp = temp.next;
        }

        return temp;
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
            return temp;
        }

        let prev = null;
        while(temp.getCode() != code){
            prev = temp;
            temp = temp.next;
        }

        prev.next = temp.next;
        temp.next = null;
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

    insertProduct(product, position){
        let temp = this._start;
        if(position == 0){
            this._start = product;
            this._start.setNext(temp);
            return true;
        }

        let i = 0;
        let prev = null;
        while(i <= position){
            if(i == position){
                product.setNext(temp);
                prev.setNext(product);
                return true;
            }
            prev = temp;
            temp = temp.next;
            i++;
        }
        
        return false;
    }
}