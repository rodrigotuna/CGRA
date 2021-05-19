import {CGFobject} from '../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js';

/**
* MySeaWeedSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param numSeaWeeds - Number of seaweed sets in the scene
*/
export class MySeaWeedSet extends CGFobject {
    constructor(scene, numSeaWeeds) {
        super(scene);

        this.numSeaWeeds = numSeaWeeds;

        this.init();
    }

    init(){
        this.seaWeedArray = [];
        for(var i = 0; i < this.numSeaWeeds; i++){
            this.seaWeedArray.push(new MySeaWeed(this.scene, 50 * Math.random() - 25, 50 * Math.random() - 25, Math.floor( 4* Math.random()) + 3 ));
        }
    }

    updateAnimation(t){
       for(var i = 0; i < this.numSeaWeeds; i++){
           this.seaWeedArray[i].updateAnimation(t);
       }
    }
    
    display(){
        for(var i = 0; i < this.numSeaWeeds; i++){
            this.seaWeedArray[i].display();
        }
        
    }


}