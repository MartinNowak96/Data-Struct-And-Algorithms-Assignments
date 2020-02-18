import { Item } from "./item";

export class BinarySearchTree{

    rootNode:BinarySearchNode;
    size:number =0;

    constructor(copyTree?:BinarySearchTree){
        if(copyTree){
            let tree:BinarySearchTree =JSON.parse(JSON.stringify(copyTree))
            this.rootNode = tree.rootNode;
            this.size = tree.size;

        }   
    }

    private delete(node:BinarySearchNode,parentNode:BinarySearchNode, item:any):void{
        if(node == undefined){
            return;
        }
        if(node.data === item){
            this.deleteNode(node, parentNode);
            this.size--;
            return item;
        }
        if(typeof node.data === "number"){
            if(node.data > item){
                return this.delete(node.leftNode,node,item);
            }else{
                return this.delete(node.rightNode,node,item);
            }
        }else{
            if(node.data.itemId > item.itemId){
                return this.delete(node.leftNode,node,item);
            }else{
                return this.delete(node.rightNode,node,item);
            }
        }
        
    }

    private deleteNode(removeNode: BinarySearchNode, parentNode:BinarySearchNode){
        if(removeNode.leftNode === undefined && removeNode.rightNode === undefined){
            if(removeNode === this.rootNode){
                this.rootNode = undefined;
            }else if(parentNode.leftNode === removeNode){
                parentNode.leftNode = undefined;
            }else{
                parentNode.rightNode =undefined;
            }
        }else if(removeNode.leftNode === undefined){
            if(parentNode.rightNode === removeNode){
                parentNode.rightNode = removeNode.rightNode;
            }else{
                parentNode.leftNode = removeNode.rightNode;
            }
        }else if(removeNode.rightNode ===undefined){
            if(parentNode === undefined){
                this.rootNode = removeNode.leftNode;
            }else{
                if(parentNode.leftNode === removeNode){
                    parentNode.leftNode = removeNode.leftNode;
                }else{
                    parentNode.rightNode = removeNode.leftNode;
                }
            }
        }else{
            let mostLeftNode = this.getMostLeftNode(removeNode.rightNode);
            removeNode.data = mostLeftNode.data;
            let mostLeftParent = this.getParent(this.rootNode,mostLeftNode);

            if(mostLeftParent){
                if(mostLeftParent.leftNode === mostLeftNode){
                    mostLeftParent.leftNode = mostLeftNode.rightNode;
                }
                else if(mostLeftParent.rightNode === mostLeftNode){
                    mostLeftParent.rightNode = undefined;
                }
            }else{
                this.rootNode = mostLeftNode.rightNode;
            }
            

        }
    }

    private getParent(currentNode:BinarySearchNode,searchNode:BinarySearchNode){
        if(currentNode.leftNode === searchNode){
            return currentNode;
        }
        if(currentNode.rightNode === searchNode){
            return currentNode;
        }
        if(typeof searchNode.data === "number"){
            if(searchNode.data < currentNode.data){
                return this.getParent(currentNode.leftNode,searchNode);
            }else{
                return this.getParent(currentNode.rightNode, searchNode);
            }
        }else{
            if(searchNode.data.itemId < currentNode.data.itemId){
                return this.getParent(currentNode.leftNode,searchNode);
            }else{
                return this.getParent(currentNode.rightNode, searchNode);
            }
        }
    }

    public parent(data){
        let recursion =(searchNode:BinarySearchNode)=>{
            if(searchNode === undefined){
                return;
            }
            if(typeof searchNode.data === "number" && searchNode.leftNode.data === data){
                return searchNode;
            }else if(typeof searchNode.data !== "number" && searchNode.leftNode.data.itemId === data.itemId){
                return searchNode;
            }
            if(typeof searchNode.data === "number" && searchNode.rightNode.data === data){
                return searchNode;
            }else if(typeof searchNode.data !== "number" && searchNode.rightNode.data.itemId === data.itemId){
                return searchNode;
            }

            if(typeof searchNode.data === "number"){
                if(searchNode.data < data){
                    return recursion(searchNode.leftNode);
                }else{
                    return recursion(searchNode.rightNode);
                }
            }else{
                if(searchNode.data.itemId > data.itemId){
                    return recursion(searchNode.leftNode);
                }else{
                    return recursion(searchNode.rightNode);
                }
            }
        }
        return recursion(this.rootNode).data;
    }

    private getMostLeftNode(node):BinarySearchNode{
        if(node ===undefined){
            return undefined;
        }
        if(node.leftNode){
            return this.getMostLeftNode(node.leftNode);
        }else{
            return node;
        }
    }

    private getMostRightNode(node):BinarySearchNode{
        if(node === undefined){
            return undefined;
        }else if(node.rightNode){
           return this.getMostRightNode(node.rightNode);
        }else{
            return node;
        }
    }

    /**
     * Called from the consuming application
     */
    public deleteItem(data:any):void{
        this.delete(this.rootNode,undefined,data);
    }


    private insert(node:BinarySearchNode,):void{
        let recursion = (currentNode)=>{
            if(currentNode === undefined){
                return;
            }else{
                if(typeof currentNode.data === "number"){
                    if(currentNode.data > node.data){
                        if(currentNode.leftNode === undefined){
                            currentNode.leftNode = node;
                        }else{
                            recursion(currentNode.leftNode);
                        }
                        
                    }else{
                        if(currentNode.rightNode === undefined){
                            currentNode.rightNode = node;
                        }else{
                            recursion(currentNode.rightNode);
                        }
                        
                    }
                }else{//data is Item
                    let data:Item = node.data;
                    if(currentNode.data.itemId > data.itemId ){
                        if(currentNode.leftNode === undefined){
                            currentNode.leftNode = node;
                        }else{
                            recursion(currentNode.leftNode);
                        }
                    }else{
                        if(currentNode.rightNode === undefined){
                            currentNode.rightNode = node;
                        }else{
                            recursion(currentNode.rightNode);
                        }
                    }
                }
            }
        }
        if(this.rootNode === undefined){
            this.rootNode = node;
        }else{
            recursion(this.rootNode);
        }
        
    }

    public insertItem(data:any){
        let node = new BinarySearchNode();
        node.data = data;
        this.insert(node);
        this.size++;
    }

    public destroy():void{

    }

    public print(){

        let preOrder = this.getPreOrderValues();
        let inOrder = this.getInOrderValues();
        let postOrder = this.getPostOrderValues();

        console.log("Print()")
        let output = "-- Inorder = { ";
        for(let value of inOrder){
            if(typeof value === "number"){
                output += " " + value;
            }else{
                if(value.stringify){
                    output += " " + value.stringify();
                }else{
                    output += " " + "[ "+value.itemId + " " + value.itemName +" " + value.itemPrice +" ]";
                }
                
            }
        }
        output +=" }";
        console.log(output);

        output = "-- Preorder = { ";
        for(let value of preOrder){
            if(typeof value === "number"){
                output += " " + value;
            }else{
                if(value.stringify){
                    output += " " + value.stringify();
                }else{
                    output += " " + "[ "+value.itemId + " " + value.itemName +" " + value.itemPrice +" ]";
                                }
            }
        }
        output +=" }";
        console.log(output);

        output = "-- Postorder = { ";
        for(let value of postOrder){
            if(typeof value === "number"){
                output += " " + value;
            }else{
                if(value.stringify){
                    output += " " + value.stringify();
                }else{
                    output += " " + "[ "+value.itemId + " " + value.itemName +" " + value.itemPrice +" ]";
                                }
            }
        }
        output +=" }";
        console.log(output);


    }

    public min():any{
        return this.getMostLeftNode(this.rootNode).data;
    }

    public max():any{
        return this.getMostRightNode(this.rootNode).data;
    }

    private getPreOrderValues():any[]{
        let values = [];

        let recursion = (node)=>{
            if(node !== undefined){
                values.push(node.data);
                recursion(node.leftNode);
                recursion(node.rightNode);
            }
        }
        recursion(this.rootNode);
        return values;
    }

    private getInOrderValues(){
        let values = [];

        let recursion = (node)=>{
            if(node !== undefined){
                recursion(node.leftNode);
                values.push(node.data);
                recursion(node.rightNode);
            }
        }
        recursion(this.rootNode);
        return values;
    }

    private getPostOrderValues(){
        let values = [];

        let recursion = (node)=>{
            if(node !== undefined){
                recursion(node.leftNode);
                recursion(node.rightNode);
                values.push(node.data);
            }
        }
        recursion(this.rootNode);
        return values;
    }

    public makeEmpty(){
        this.rootNode = undefined;
        this.size = 0;
    }

    public totalLevels():number{
        let recursion =(node:BinarySearchNode)=>{
            if(node === null){
                return 0;
            }
            let rightCount = recursion(node.rightNode);
            let leftCount = recursion(node.leftNode);
            if(rightCount > leftCount){
                return(rightCount+1);
            }else{
                return(leftCount+1);
            }
        }
        return recursion(this.rootNode);
    }

    public level(data:any):number{
        let recursion =(node:BinarySearchNode):number=>{
            if(typeof(data) === "number"){
                if(data === node.data){
                    return 0;
                }else if(data < node.data){
                    return recursion(node.leftNode) +1;
                }else{
                    return recursion(node.rightNode) +1;
                }
            }else{
                if(data.itemId === node.data.itemId){
                    return 0;
                }else if(data.itemId < node.data.itemId){
                    return recursion(node.leftNode) +1;
                }else{
                    return recursion(node.rightNode) +1;
                }
            }
        }

        return recursion(this.rootNode);
    }

}

export class BinarySearchNode{
    data;
    /**
     * Smaller than parent
     */
    leftNode:BinarySearchNode;
    /**
     * Greater than parent
     */
    rightNode:BinarySearchNode;
}