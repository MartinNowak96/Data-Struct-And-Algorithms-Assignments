import { BinarySearchTree } from './binarySearchTree';
import * as fs from 'fs';
import { Item } from './item';


export class BinarySearchTreeMain {
    constructor() {

    
        let fileContent
        try {
            fileContent = fs.readFileSync("src/data/bst/p03input2.txt", 'utf8');
        } catch {
            console.log("Error - Unable to open input file.")
        }
        let lines = fileContent.split("\n");
        let dType;
        let tree:BinarySearchTree;
        for (let line of lines) {
            let inputs = line.split(" ")
            for(let i = 0; i <  inputs.length;i++){
                if(inputs[i] === ""){
                    inputs.splice(i,1);
                    i--;
                }
            }
            switch (inputs[0]) {
                case "#":
                    console.log(line);
                    break;
                case "c"://constructor
                    dType = inputs[1];
                    console.log("Constructor() -- BSTree<" + dType + ">")
                    try {
                        tree = new BinarySearchTree();
                    } catch{
                        console.error("failed")
                    }
                    break;
                case "d":
                    console.log("Destructor() -- BSTree<" + dType + ">")
                    tree = undefined;
                    break;
                case "!":
                    try {
                        console.log("*** Start Copy Constructor Test ***");
                        let dummyTree = new BinarySearchTree(tree);
                        console.log("Print Copy without new value");
                        dummyTree.print();
                        if (dType === "int") {
                            dummyTree.insertItem(parseInt(inputs[1]));
                        } else {
                            let newItems = new Item(parseInt(inputs[1]), inputs[2], parseFloat(inputs[3]));
                            dummyTree.insertItem(newItems);
                        }
                        console.log("Print Copy plus new value");
                        dummyTree.print();
                        console.log("Print Original without new value");
                        tree.print();
                        console.log("CopyConstructor -- successful");
                    } catch{
                        console.error("CopyConstructor -- Failed: copy constructor");
                    }
                    console.log("*** End Copy Constructor Test ***");
                    break;
                case "=":
                    try {
                        console.log("*** Start Copy Operator= Test ***");
                        let dummyTree = new BinarySearchTree(tree);
                        console.log("Print Copy without new value");
                        dummyTree.print();
                        if (dType === "int") {
                            dummyTree.insertItem(parseInt(inputs[1]));
                        } else {
                            let newItems = new Item(parseInt(inputs[1]), inputs[2], parseFloat(inputs[3]));
                            dummyTree.insertItem(newItems);
                        }
                        console.log("Print Copy plus new value");
                        dummyTree.print();
                        console.log("Print Original without new value");
                        tree.print();
                        console.log("Operator= -- successful");
                    } catch{
                        console.error("Operator= -- Failed: assignment operator")
                    }
                    console.log("*** End Operator= Test ***")
                    break;
                
                case "+":
                    let addOutput = "InsertItem(";
                    try{
                        if(dType === "int"){
                            addOutput +=inputs[1]+")";
                            tree.insertItem(parseInt(inputs[1]));

                            console.log(addOutput)

                        }else{
                            let newItems = new Item(parseInt(inputs[1]), inputs[2], parseFloat(inputs[3]));
                            addOutput+=JSON.stringify(newItems) +")";
                            tree.insertItem(newItems);
                            
                            console.log(addOutput)
                        }
                    }catch{
                        addOutput += "-- Failed"
                        console.error(addOutput);

                    }
                    break;
                case "-":
                    let output = "DeleteItem(" + inputs[1] +")"
                    try{
                   
                        if(dType ==="int"){
                            tree.deleteItem(parseInt(inputs[1]));
                            output += "Deleted " + inputs[1]; 
                        }else{
                            let item = new Item(parseInt(inputs[1]),"",-1);
                            tree.deleteItem(item);
                            output += "Deleted " + inputs[1]; 

                        }
                        console.log(output);
                    }catch{
                        output+= "-- Failed to delete";
                        console.error(output);
                    }

                    
                    break;
                case "p":
                    tree.print();
                    break;
                case "s":
                    console.log("Size() -- " + tree.size);
                    break;
                case "m":
                    tree.makeEmpty();
                    break;
                case "<":
                    let output2 = "Min() -- ";
                    try{
                        output2 += JSON.stringify(tree.min());
                        console.log(output2);
                    }catch{
                        output2 +="Failed"
                        console.error(output2);
                    }
                    
                    break;
                case ">":
                    let output3 = "Max() -- ";
                    try{
                        output3 += JSON.stringify(tree.max());
                        console.log(output3);
                    }catch{
                        output3 += "Failed";
                        console.error(output3);
                    }
                    
                    break;
                case "l":
                    let output4 = "TotalLevels() -- ";
                    try{
                        output4 += tree.totalLevels();
                        console.log(output4);
                    }catch{
                        output4 += "Failed";
                        console.error(output4);
                    }
                    
                    break;
                case "?":
                    let output5 = "Level('"+ inputs[1]+"') -- ";
                    try{
                        if(dType === "int"){
                            output5 += tree.level(inputs[1]);
                        }else{
                            let item = new Item(parseInt(inputs[1]),"", -1)
                            output5 += tree.level(item);
                        }
                    }catch{
                        output5 += "Failed";
                    }
                    console.log(output5);
                case "^":
                    let output6 = "Parent('"+ inputs[1]+"') -- ";
                    try{
                        if(dType === "int"){
                            output6 += tree.parent(parseInt(inputs[1]));
                        }else{
                            let item = new Item(parseInt(inputs[1]),"", -1)
                            output6 += tree.parent(item);
                        }
                    }catch{
                        output6 += "Failed";
                    }
                    console.log(output6);

            }
        }
    }

}


