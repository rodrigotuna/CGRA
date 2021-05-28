import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
 * MyMovingObject
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param angle - Angle of the Moving Object
 * @param velocity - Velocity of the Moving Object
 * @param position - Position of the Moving Object
 * @param object - Object to be moved
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
    /**
     * @method update
     * @param t Time 
     * Updates the object horizontal position
     */
    update(t){
        this.position[0] -= this.velocity * Math.cos(this.angle) * (t-this.lastT)/1000;
        this.position[2] += this.velocity * Math.sin(this.angle) * (t-this.lastT)/1000;
    }
    /**
     * @method updateTime
     * @param t Time
     * Sets the last stored time
     */
    updateTime(t) {
        this.lastT = t;
    }

    /**
     * @method turn
     * @param val Angle in radians
     * Turns object
     */   
    turn(val){
        this.angle += val;
    }

    /**
     * @method accelerate
     * @param val Speed delta
     * 
     */
    accelerate(val){
        this.velocity += val;
    }
    
    /**
     * @method reset
     * Resets the object velocity, angle and position to their initial values
     */
    reset(){
        this.velocity = this.originalVelocity;
        this.angle = this.originalAngle;
        this.position = this.originalPosition.slice();
    }

    /**
     * @method display
     * Displays the moving object
     */
    display(){
        this.scene.pushMatrix();
        
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.scene.rotate(this.angle, 0, 1, 0);
 
        this.object.display();

        this.scene.popMatrix();
    }
}
