import * as fs from 'fs';
import { LFSR } from './lfsr';

export class QueueMain{

    run(){
        let fileContent
        try {
            fileContent = fs.readFileSync("src/data/queue/p02input1.txt", 'utf8');
        } catch {
            console.log("Error - Unable to open input file.")
        }

        let lines = fileContent.split("\n");
        let queue:Queue;
        let lfsr:LFSR;
        let output= "";
        for(let line of lines){
            //console.log(line)
            let firstChar = line.substring(0,1);
            switch(firstChar){
                case "#":
                    console.log(line);
                    break;
                case "~":
                    console.log("#########################################################");
                    break;
                case "c":
                    
                    let lineInputs = line.split(" ");
                    if(lineInputs[1].includes("Q")){
                        queue = new Queue();
                    }else{
                        lfsr = new LFSR(lineInputs[2],parseInt(lineInputs[3]), parseInt(lineInputs[4]));
                    }
                    break;
                case "+":
                    
                    let lineInputs2 = line.split(" ");
                    if(queue){ 

                        
                        output = (`queue.Enqueue (${parseInt(lineInputs2[1])}) -- Status = `);
                        queue.enqueue(parseInt(lineInputs2[1]));
                        output+= "Completed";
                        console.log( output );
                    
                        
                    }else{
                        console.log("LFSR.Enqueue('" + lineInputs2[1] +"') --Status = Failed" );
                    }
                    break;
                case "-":
                    if(queue){
                        output = "Queue.Dequeue() -- Status = ";
                        try{
                            queue.dequeue(); 
                            console.log(output + "Completed")

                        }catch{
                            console.log(output + "Failed")                            
                        }
                        
                    }else{
                        console.log("LFSR.Dequeue() -- Status = Failed");
                    }
                    break;
                case "f":
                    if(queue){
                        output = "Queue.Front() -- Status =";
                        
                        let front = queue.getFront();
                        if(front){
                            console.log(output + "Completed Value =" + front);
                        }else{
                            console.log(output +  "Failed");
                        }
                        
                    }else{
                        console.log("LFSR.Front() -- Status = Failed");
                    }break;
                case "r":
                    if(queue){
                        output = "Queue.Rear() -- Status = ";
                        let rear = queue.getRear();
                        if(rear){
                            console.log(output + "Completed, Value = " + rear )
                        }else{
                            console.log(output + "Failed")
                        }
                    }else{
                        console.log("LFSR.Rear() -- Status = Failed");
                    }break;
                case "e":
                    if(queue){
                        console.log("Queue.IsEmpty() --- Status = " + (queue.isEmpty()? "Empty":"Not Empty"));
                    }else{
                        console.log("LFSR.IsEmpty() --- Status = Failed")
                    }break;
                case "m":
                    if(queue){
                        let output = ("Queue.MakeEmpty() -- Status = ");
                        queue.makeEmpty();
                        console.log( output + "Completed")
                    }else{ console.log("LFSR.MakeEmpty() --- Status = Failed")}
                    break;
                case "l":
                    if(queue){
                        console.log("Queue.size() -- " + queue.size());
                    }break;
                case "n":
                    if(lfsr){
                        try{
                            lfsr.nextState();
                            console.log( "LFSR.nextState() -- Completed")
                        }catch{
                            console.log( "LFSR.nextState() -- Failed")
                        }
                    }break;
                case "?"://peek
                    if(queue){
                        let lineInputs4 = line.split(" ");
                        let peek = queue.peek(parseInt(lineInputs4[1]))
                        if(peek){
                            console.log("Queue.peek(" + lineInputs4[1]+") -- " + peek );
                        }else{
                            console.log("Queue.peek(" + lineInputs4[1]+") -- " + "Failed" );
                        }
                    }
                    break;
                case "p":
                    if(queue){
                        console.log("Queue.PrintQ()");
                        queue.printQ();
                    }else{
                        console.log("LFSR.PrintQ()");
                        lfsr.print();
                    }
                    break;
                case "d":
                    queue = undefined;
                    lfsr = undefined;



                    
            }
        }

        
    }
}

export class Queue{

    data:number[] = [];

    makeEmpty(){
        this.data.length = 0;
    }

    enqueue(num:number){
        this.data.push(num);
    }

    dequeue():void{
        if(this.data.length === 0){
            //@ts-ignore
           (undefined).crashPlease;
        }
        this.data.splice(0,1);
    }

    getFront(){
        return this.data[0];
    }

    getRear(){
        return this.data[this.data.length - 1];
    }

    peek(skip:number){
        return this.data[skip];
    }

    size(){
        return this.data.length;
    }

    printQ(){
        let output = "Front { "
        for(let i = 0; i< this.data.length;i++){
            output += this.data[i] +" ";
        }
        output += "} Rear";
        console.log(output);
    }

    isEmpty(){
        return this.data.length === 0;
    }

    /**
     * Checks to see if it can add another element to the Q
     */
    isFull(){
        try{
            [].push(1);
            return true;
        }catch{
            return false;
        }
    }


}