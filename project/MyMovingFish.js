import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyMovingObject } from './MyMovingObject.js';
import { MyFish } from './MyFish.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
    
	constructor(scene, angle, velocity, position, fish) {
        super(scene, angle, velocity, position, fish);
	}
	
	init() {
        //this.initMaterials();
	}
    
}
