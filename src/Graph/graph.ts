import { Queue } from "../queue";

export class Graph{

    vertices:{ [id: string]: VertexNode; } = {};
    addVertex(v:string){
        let node = new VertexNode(v);
        this.vertices[v] = node;
    }

    addEdge(source:string, destination:string, weight:number){
        let edge = new EdgeNode(this.vertices[destination],weight);
        this.vertices[source].edges[destination] = edge;
    }

    vertexExists(v:string):VertexNode{
        return this.vertices[v];
    }

    edgeExists(source:string, destination:string):EdgeNode{
        if(this.vertices[source]){
            return this.vertices[source].edges[destination];
        }else{
            return undefined;
        }
    }

    weightIs(source:string, destination:string):number{
        let edge = this.edgeExists(source,destination);
        if(edge){
            return edge.weight;
        }else{
            return undefined;
        }
    }

    clearMarks(){
        for(let id in this.vertices){
            this.vertices[id].mark = false;
        }
    }

    getToVertices(v:string, q:Queue){
        let edgesDict = this.vertices[v].edges;
        for(let prop in edgesDict){
            q.enqueue(prop);
        }
    }

    isMarked(vertex:string):boolean{
        return this.vertices[vertex].mark
    }
    markVertex(vertex:string):void{
        this.vertices[vertex].mark = true;
    }

    depthFirstSearch(start:string, end:string, path:Queue){
        
        if(!this.vertexExists(end) || !this.vertexExists(start)){
            return "error"
        }
        let found = false;
        let recursion = (vertex:string)=>{
            
            if(this.isMarked(vertex)){
                
            }else{
                path.enqueue(vertex);
                this.markVertex(vertex);
                for(let edge in this.vertices[vertex].edges){
                    if(!found){
                        if(edge === end){
                            found = true;
                            path.enqueue(end);
                            break;
                        }else{
                            recursion(edge);
                        }
                    }
                    
                }
                if(!found){
                    //path.data.splice(path.data.length -1,1);
                }
            }  
                
        }
        
        recursion(start);
        if(!found){
            while(!path.isEmpty()){
                path.dequeue()
            }
        }
        this.clearMarks()
        

    }

    breadthFirstSearch(startVertex:string,endVertex:string, visitedQ:Queue){
        
        let q:Queue = new Queue();
        let adjQ:Queue = new Queue();
        if(this.vertexExists(startVertex) ===undefined || this.vertexExists(endVertex) === undefined){
            console.error("VertexNotFound");
        }
        let found = false;
        let vertex;
        let item;

        this.clearMarks();
        q.enqueue(startVertex);
        do{
            vertex = q.getFront();
            q.dequeue();
            if(vertex === endVertex){
                found = true;
                visitedQ.enqueue(vertex);
            }else{
                if(!this.isMarked(vertex)){
                    this.markVertex(vertex);
                    visitedQ.enqueue(vertex);
                    this.getToVertices(vertex, adjQ)

                    while(!adjQ.isEmpty()){
                        item = adjQ.getFront();
                        adjQ.dequeue();
                        if(!this.isMarked(item)){
                            q.enqueue(item)
                        }
                    }
                }
            }

        }while(!q.isEmpty() && !found);//from do while

        if(!found){
            while(!visitedQ.isEmpty()){
                visitedQ.dequeue();
            }
        }
    }

    print(){
        console.log("******************************");
        console.log("Vertex : Adjacent Vertices")
        console.log("------------------------------")

        
        for(let prop in this.vertices){
            let vptr:VertexNode = this.vertices[prop];
            let output = vptr.name + " : ";
			
			for(let edgeProp in vptr.edges)
			{
                let eptr:EdgeNode = vptr.edges[edgeProp];
				output += eptr.destination.name  + eptr.weight + " ";
				eptr = eptr.nextEdge;
			}
            
            console.log(output);

        }
        console.log("******************************")
        
    }
}

export class VertexNode{
    name:string;
    mark:boolean = false;
    edges:{ [id: string]: EdgeNode; } = {};
    constructor(name:string){
        this.name =name;
    }
}

export class EdgeNode{
    destination:VertexNode;
    weight:number;
    nextEdge:EdgeNode;
    constructor(destination:VertexNode,weight:number){
        this.destination =destination;
        this.weight =weight;
    }
}