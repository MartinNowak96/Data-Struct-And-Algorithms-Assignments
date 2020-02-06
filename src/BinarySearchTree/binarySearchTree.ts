export class BinarySearchTree{

    rootNode:BinarySearchNode;


    constructor(){

    }

    delete():void{

    }

    deleteNode():void{

    }

    insert(node:BinarySearchNode,):void{
        let recursion = (currentNode)=>{
            if(currentNode === undefined){
                currentNode = node;
            }else{
                if(currentNode.data.)
            }
        }
        
    }

    destroy():void{

    }

    copyTree(){
        
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