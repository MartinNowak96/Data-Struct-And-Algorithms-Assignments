export class LinkedListMain{


    run(){
        
        //declare list and add values
        let linkedList = new LinkedList();
        linkedList.insert(5,3.1);
        linkedList.insert(1,5.6);
        linkedList.insert(3, 8.3);
        linkedList.insert(2, 7.4);
        linkedList.insert(4,2.5);
        linkedList.printList();

        console.log("List now contains " + linkedList.length +" items.");

        console.log("Testing delete of last item in list.");
        linkedList.delete(4);
        linkedList.printList();

        console.log("Testing delete of first item in list");
        linkedList.delete(5);
        linkedList.printList();

        console.log("Testing delete of a middle item in list.");
        linkedList.delete(3);
        linkedList.printList();

        console.log("Testing failure in delete function.");
        if(linkedList.delete(4)){
            console.log("Oops! Should not have been able to delete.");
        }else{
            console.log("Unable to locate item to delete.");
        }
        linkedList.printList();

        //known failure
        console.log("Testing Search function. Search for key 3");
        let searchResult = linkedList.search(3);
        if(searchResult){
            console.log("Search result: theData =" + searchResult.key);
        }else{
            console.log("Search result: Unable to locate item in list");
        }

        //known success
        searchResult = linkedList.search(2);
        if(searchResult){
            console.log("Search result: theData =" + searchResult.key);
        }else{
            console.log("Search result: Unable to locate item in list");
        }

        console.log("End list demonstration...");


    }

    

}


export class LinkedList{

    head:ListItem;
    length:number =0;

    /**
     * Inserts a node at the end of the list.
     * If the head is undefined it will become the head.
     * @param key 
     * @param value 
     */
    insert(key:number, value:number){
        if(this.head){
            let recursion = (node:ListItem)=>{
                if(node.next){
                    recursion(node.next);
                }else{
                    node.next = new ListItem(key,value);
                }
            }
            recursion(this.head);
        }else{
            this.head = new ListItem(key,value);
        }
        this.length +=1;
    }
    /**
     * Removes the node in the tree with same key and decrements the length if found;
     * @param key 
     */
    delete(key:number):boolean{
        let deleted = false;
        let recursion= (node:ListItem, previousHead:ListItem)=>{
            if(key === node.key){
                deleted = true;
                if(previousHead){
                    previousHead.next = node.next;
                }else{
                    this.head = node.next;
                }
                this.length--;
            }else{
                if(node.next){
                    recursion(node.next, node);
                }
            }
        }
        recursion(this.head, undefined);
        return deleted;
    }

    /**
     * Recursively goes through the list until it finds the node with the key provided
     * @param key 
     * @returns  the node with the key
     */
    search(key:number):ListItem{
        let recursion = (node:ListItem)=>{
            if(node.key === key){
                return node;
            }else{
                if(node.next){
                    return recursion(node.next);
                }
            }
        }
        return recursion(this.head);
    }


    /**
     * Starts at the head and prints all the keys/values in the list.
     */
    printList(){
        let recursion = (node:ListItem)=>{
            console.log(node.key +': ' +node.value);
            if(node.next){//check to see if there is another child node.
                recursion(node.next);
            }
        }
        recursion(this.head);
    }

    /**
     * Checks to see if out of memory
     */
    isEmpty(){
        return !this.head;//bang operator
    }

    /**
     * Removes the head and sets the count to 0
     */
    clearList(){
        this.head = undefined;
        this.length = 0;
    }

    /**
     * Checks to see if ran out of memory???
     */
    isFull(){
        try{
            let fakeNode = new ListItem(-1, -1);
            return false;
        }catch(e){
            return true;
        }
    }

}


export class ListItem{

    /**
     * The unique identifier for the item
     */
    key:number;
    /**
     * The value at the item
     */
    value:number;
    /**
     * The next item in the list.
     * Can be undefined.
     */
    next?:ListItem;

    constructor(key:number, value:number){
        this.key = key;
        this.value = value;
    }


}