import * as fs from 'fs';
import { Stack } from './stack';
export class StackMain {

    constructor() {

        let fileContent
        try {
            fileContent = fs.readFileSync("src/data/stack/p03input4.txt", 'utf8');
        } catch {
            console.log("Error - Unable to open input file.")
        }

        let stack:Stack;
        let lines = fileContent.split("\n");
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace("\r", "")
            let line = lines[i]
            let inputs = lines[i].split(" ")
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i] === "") {
                    inputs.splice(i, 1);
                    i--;
                }
            }
            if(inputs.length === 0){continue;}


            

            switch (inputs[0]) {
                case "#":
                    console.log(line);
                    break;

                case "c":
                    console.log("Stack() -- Successful");
                    stack = new Stack();
                    break;

                case "+":
                    console.log("Push("+ inputs[1] +")");
                    stack.push(parseFloat(inputs[1]))
                    break;
                case "-":
                        try{
                            stack.pop();
                            console.log("Pop() -- successful")
                        }catch{
                            console.error("Pop() -- Failed Empty Stack")
                        }
                    break;
                case "f":
                    console.log("IsFull() -- " + stack.isFull())
                    break;
                case "e":
                    console.log("IsEmpty() -- " + stack.isEmpty())
                    break;
                case "m":
                    stack.makeEmpty();
                    console.log("MakeEmpty()")
                    break;
                case "p":
                    stack.print();
                    break;
                case "t":
                    try{
                        try{
                            console.log("Top -- " + stack.getTop())
                        }catch{
                            console.error("Top -- Failed Empty Stack")
                        }
                    }catch{

                    }
                    break;
                case ">":
                    try{
                        console.log("Max() -- " + stack.max());
                    }catch{
                        console.error("Max() -- Failed Empty Stack")
                    }
                    break;
                case "<":
                    
                    try{
                        console.log("Min() -- " + stack.min());
                    }catch{
                        console.error("Min() -- Failed Empty Stack")
                    }
                    break;
                case "s":
                    console.log("Size() -- " + stack.size());
                    break;
                case "?":
                    try{
                        console.log("Peek(" + inputs[1] + ") -- " + stack.peek(parseFloat(inputs[1])) );
                    }catch{
                        console.error("Peek(" + inputs[1] + ") -- Failed Invalid Peek" )
                    }
                    break;
                case "d":
                    break;

            }
        }

    }



}