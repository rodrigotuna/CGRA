import {CGFobject, CGFshader} from '../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js';

/**
* MySeaWeedSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param numSeaWeeds - Number of seaweed sets in the scene
 * @param seaweedShader - Shader applied to each seaweed
*/
export class MySeaWeedSet extends CGFobject {
    constructor(scene, numSeaWeeds, seaweedShader) {
        super(scene);

        this.numSeaWeeds = numSeaWeeds;
        this.seaweedShader = seaweedShader;

        this.init();
    }
    /**
     * @method init
     * Initializes the classes objects and useful parameters
    */
    init(){
        this.seaWeedArray = [];
        for(var i = 0; i < this.numSeaWeeds; i++){
            this.seaWeedArray.push(new MySeaWeed(this.scene, 50 * Math.random() - 25, 50 * Math.random() - 25, Math.floor( 4* Math.random()) + 3, this.seaweedShader ));
        }
    }
    
    /**
     * @method display
     * Displays the set of seaweeds
     */
    display(){
        for(var i = 0; i < this.numSeaWeeds; i++){
            this.seaWeedArray[i].display();
        }
    }


}