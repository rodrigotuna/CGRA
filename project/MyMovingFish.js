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
        this.init();
	}
	
	init() {
        this.verticalVelocity = 0.0;
    }

    update(t, speedFactor){
        super.update(t,speedFactor);
        if(this.verticalVelocity > 0 && this.position[1] >= 5.0) this.verticalVelocity = 0.0;
        if(this.verticalVelocity < 0 && this.position[1] <= 1.0) this.verticalVelocity = 0.0;

        this.position[1] += this.verticalVelocity * (t-this.lastT)/1000 * speedFactor;
    }

    lift() {
        this.verticalVelocity = 1.0;
    }
    
    drop() {
        this.verticalVelocity = -1.0;
    }

    
}
