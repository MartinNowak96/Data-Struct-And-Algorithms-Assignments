import { Queue } from "./queue";

export class LFSR{
    queue:Queue;
    tap1:number;
    tap2:number;

    constructor(seed:string,tap1:number, tap2:number){
        this.tap1 = tap1;
        this.tap2 = tap2;

    }

    print(){
        this.queue.printQ();
    }

    XOR(a:number,b:number):boolean{
        let num:number = a^b;
        return (num === 1);
    }

    nextState(){
        let temp = this.XOR(this.queue.peek(this.tap1), this.queue.peek(this.tap2));
        this.queue.dequeue();
        this.queue.enqueue(temp?1:0);
         
    }
}