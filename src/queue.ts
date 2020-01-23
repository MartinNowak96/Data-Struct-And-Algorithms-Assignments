import * as fs from 'fs';

export class QueueMain{

    run(){
        let fileContent
        try {
            fileContent = fs.readFileSync("src/data/queue/p02input1.txt", 'utf8');
        } catch {
            console.log("Error - Unable to open input file.")
        }

        let lines = fileContent.split("\n");
        let queue = new Queue();
        let lfsr;
        for(let line of lines){
            //console.log(line)
            let firstChar = line.substring(0,1);
            switch(firstChar){
                case "#":
                    console.log(line);
                    break;
                case "~":
                    console.log("#################");
                    break;
                case "c":
                    
                    let lineInputs = line.split(" ");
                    if(lineInputs[0] === "Q"){
                        queue = new Queue();
                    }else{
                        lfsr;
                    }
                    break;
                case "+":
                    break;
            }
        }

        
    }
}

export class Queue{


    
}