export class Stack{

    top:Node;
    
    constructor(){

    }

    push(data:number){
        this.top = new Node(data,this.top);
    }

    pop(){
        let returnValue = this.top;
        this.top = this.top.previous;
        if(this.top)
            this.top.next = undefined;
        return returnValue;
    }

    isEmpty(){
        return this.top === undefined;
    }
    isFull(){
        return false;
    }

    makeEmpty(){
        this.top = undefined;
    }

    getTop(){
        return this.top.data;
    }

    size(){
        let head = this.top;
        let count  = 0
        while(head !== undefined){
            count +=1;
            head= head.previous;
        }
        return count;
    }

    max(){
        let head = this.top;
        let max = this.top.data;
        while(head !== undefined){       
            
            if(head.data > max){
                max = head.data;
            }
            head= head.previous;
        }
        return max;
    }

    min(){
        let head = this.top;
        let min = this.top.data;
        while(head !== undefined){
            
            if(head.data < min){
                min = head.data;
            }
            head= head.previous;
        }
        return min;
    }

    peek(n:number){
        let head= this.top;
        while(n !== 0){
            n--;
            head = head.previous;
        }
        return head.data;
    }

    print(){
        let output = "Print() -- Top { "
        let head = this.top;
        while(head !== undefined){
            output += head.data + " ";
            if(head.previous === undefined){
                break;
            }
            head = head.previous;
            
        }
        output += "} Bottom      Bottom {"

        while(head !== undefined){
            output += head.data + " ";
            head = head.next;
        }
        output += "} top"
        console.log(output)
    }


}

export class Node{
    previous:Node;
    next:Node;
    data:number;

    constructor(data:number, previous:Node){
        this.data = data;
        this.previous = previous;
        if(previous){
            previous.next = this;
        }
    }
}