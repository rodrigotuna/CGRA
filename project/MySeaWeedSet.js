import {CGFobject, CGFshader} from '../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js';

/**
* MySeaWeedSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param numSeaWeeds - Number of seaweed sets in the scene
*/
export class MySeaWeedSet extends CGFobject {
    constructor(scene, numSeaWeeds, seaweedShader) {
        super(scene);

        this.numSeaWeeds = numSeaWeeds;
        this.seaweedShader = seaweedShader;

        this.init();
    }

    init(){
        this.seaWeedArray = [];
        for(var i = 0; i < this.numSeaWeeds; i++){
            this.seaWeedArray.push(new MySeaWeed(this.scene, 50 * Math.random() - 25, 50 * Math.random() - 25, Math.floor( 4* Math.random()) + 3, this.seaweedShader ));
        }
    }

    updateAnimation(t){
        this.timeFactor = t;
        this.seaweedShader.setUniformsValues({ timeFactor: this.timeFactor / 100 % 100});
    }
    
    display(){
        for(var i = 0; i < this.numSeaWeeds; i++){
            this.seaWeedArray[i].display();
        }
    }


}