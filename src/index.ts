/**
 * How to run:
 * Install nodejs
 * npm install typescript -g
 * npm install ts-node -g
 * npm install in this directory
 * 
 * run `ts-node ./src/index.ts`
 */
import {LinkedListMain} from './linkedList';
import { QueueMain } from './queue';

( ()=>{

    //new LinkedListMain().run();
    new QueueMain().run();
})()                                                                  