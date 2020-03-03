import * as fs from 'fs';
import { Graph } from './graph';


export class GraphMain{

    constructor(){
        let fileContent
        try {
            fileContent = fs.readFileSync("src/data/bst/p03input4.txt", 'utf8');
        } catch {
            console.log("Error - Unable to open input file.")
        }
        let lines = fileContent.split("\n");
        let graph:Graph;
        for (let i =0; i < lines.length;i++) {
            lines[i] = lines[i].replace("\r","")
            let line= lines[i]
            let inputs = lines[i].split(" ")
            for(let i = 0; i <  inputs.length;i++){
                if(inputs[i] === ""){
                    inputs.splice(i,1);
                    i--;
                }
            }
            switch (inputs[0]) {
                case "#":
                    try{
                        console.log(line);
                    }catch{}
                    break;
                case "c":
                    graph = new Graph();
                    break;
                case "v":
                    console.log("Add Vertex(" +inputs[1] +")");
                    graph.addVertex(inputs[1]);
                case "d":
                    console.log("AddEdge("+ inputs[1]+","+ inputs[2] +","+ inputs[3]+")")
                    graph.addEdge(inputs[1], inputs[2], inputs[3]);
                case "u":


            }

        }
    }

}