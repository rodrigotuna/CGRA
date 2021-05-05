import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene, angle, velocity, position, object) {
		super(scene);

        this.angle = angle;
        this.originalAngle = angle;
        this.velocity = velocity;
        this.originalVelocity = velocity;
        this.position = position;
        this.originalPosition = position.slice();
        this.object = object;
        this.lastT = 0;
        
	}

    update(t, speedFactor){
        this.position[0] -= this.velocity * Math.cos(this.angle) * (t-this.lastT)/1000 * speedFactor;
        this.position[2] += this.velocity * Math.sin(this.angle) * (t-this.lastT)/1000 * speedFactor;
    }

    updateTime(t) {
        this.lastT = t;
    }

    turn(val){
        this.angle += val;
    }

    accelerate(val){
        this.velocity += val;
    }

    reset(){
        this.velocity = this.originalVelocity;
        this.angle = this.originalAngle;
        this.position = this.originalPosition.slice();
    }

    display(){
        this.scene.pushMatrix();
        
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.scene.rotate(this.angle, 0, 1, 0);
 
        this.object.display();

        this.scene.popMatrix();
    }
}
