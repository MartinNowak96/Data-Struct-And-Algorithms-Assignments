import * as fs from 'fs';
import { Graph } from './graph';
import { Queue } from '../queue';


export class GraphMain{

    constructor(){
        let fileContent
        try {
            fileContent = fs.readFileSync("src/data/graph/input6.txt", 'utf8');
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
                    break;
                case "d":
                    console.log("AddEdge("+ inputs[1]+","+ inputs[2] +","+ inputs[3]+")")
                    graph.addEdge(inputs[1], inputs[2], inputs[3]);
                    break;
                case "u"://undirected edge
                    try{
                        console.log("AddEdge("+ inputs[1]+","+ inputs[2] +","+ inputs[3]+")")
                        graph.addEdge(inputs[1], inputs[2], inputs[3])
                        console.log("AddEdge("+ inputs[2]+","+ inputs[1] +","+ inputs[3]+")")
                        graph.addEdge(inputs[2], inputs[1], inputs[3])
                    }catch{
                        console.error("Error - full: unable to add undirected edge")
                    }
                    break;
                case "?":
                    if(graph.vertexExists(inputs[1])){
                        console.log("VertexExists("+ inputs[1]+") -- true")
                    }else{
                        console.log("VertexExists("+ inputs[1]+ ") -- false")
                    }
                    break;
                case "!":
                    if(graph.edgeExists(inputs[1], inputs[2])){
                        console.log("EdgeExists("+ inputs[1]+"," + inputs[2]+") -- true")
                    }else{
                        console.log("EdgeExists("+ inputs[1]+"," + inputs[2]+") -- false")
                    }
                    break;
                case "w":
                    try{
                        let w = graph.weightIs(inputs[1], inputs[2]);
                        if(w){
                            console.log("WeightIs("+inputs[1] +"," + inputs[2]+") -- " + w);
                        }else{
                            console.error("WeightIs("+inputs[1] +"," + inputs[2]+") -- Error:edge not found" );
                        }
                    }catch{
                        console.error("Error: vertex not found or edge not found")
                    }
                    break;
                    
                case "m"://mark
                    try{
                        graph.markVertex(inputs[1])
                        console.log("MarkVertex("+ inputs[1] +")");
                    }catch{
                        console.error("MarkVertex("+ inputs[1] +") -- " + "Error: vertex not found");
                    }
                    break;
                case "i":
                    try{
                        console.log("IsMarked(" + inputs[1]+ ") --" + graph.isMarked(inputs[1]))
                    }catch{
                        console.error("IsMarked(" + inputs[1]+ ") --" + "Error: vertex not found")
                    }
                    break;
                case "s":
                    try{
                        let output = "DFS("+ inputs[1] +"," + inputs[2] +")";
                        let visitedQ = new Queue();
                         let result = graph.depthFirstSearch(inputs[1], inputs[2], visitedQ);
                        if(result == "error"){
                            console.error( output + " -- Error: Vertex not found")
                        }
                        else if(visitedQ.isEmpty()){
                            output = output + " No path found";
                            console.error(output)
                        }else{
                            output = output +"{ ";
                            while(!visitedQ.isEmpty()){
                                output= output + visitedQ.getFront() +  " ";
                                visitedQ.dequeue();
                            }
                            output = output +"}";
                            console.log(output)
                        }
                        
                    }catch{
                        console.error("DFS("+ inputs[1] +"," + inputs[2] +") -- Error: vertex not found" )
                    }
                    break;
                case "b":
                    try{
                        let output = "DFS("+ inputs[1] +"," + inputs[2] +")";
                        let visitedQ = new Queue();
                        graph.breadthFirstSearch(inputs[1], inputs[2], visitedQ);
                        if(visitedQ.isEmpty()){
                            output = output + " No path found";
                            console.warn(output)
                        }else{
                            output = output +"{";
                            while(!visitedQ.isEmpty()){
                                output= output + visitedQ.getFront() +  " ";
                                visitedQ.dequeue();
                            }
                            output = output +"}";
                            console.log(output)
                        }

                    }catch{
                        console.error("BFS("+ inputs[1] +"," + inputs[2] +") -- Error: vertex not found" )
                    }
                    break;
                case "p":
                    graph.print();
                    break;
                case "e":
                    console.log("ClearMarks()");
                    graph.clearMarks();
                    break;
                case "g":
                    graph.getGetToVertices(inputs[1]);
                    break;
                case "~":
                    graph = undefined;
                    break;
            }

        }
    }

}