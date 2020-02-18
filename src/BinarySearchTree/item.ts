
export class Item{
    itemId:number  = -1;
    itemName:string = "";
    itemPrice:number = -1;

    constructor(id:number, name:string, price:number){
        this.itemId = id;
        this.itemName = name;
        this.itemPrice = price;
    }

    stringify(){
        return "[" + this.itemId +" " + this.itemName + " " + this.itemPrice + "]"
     }

    

}