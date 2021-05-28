import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyMovingObject } from './MyMovingObject.js';
import { MyFish } from './MyFish.js';
/**
 * MyMovingFish
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param angle - Angle of the Moving Fish
 * @param velocity - Velocity of the Moving Fish
 * @param position - Position of the Moving Fish
 * @param fish - Fish object to be moved
 */
export class MyMovingFish extends MyMovingObject {
    
	constructor(scene, angle, velocity, position, fish) {
        super(scene, angle, velocity, position, fish);
        this.init();

	}

    /**
     * @method init
     * Initializes useful moving fish variables
     */	
	init() {
        this.verticalVelocity = 0.0;
        this.hasRock = false;
    }

    /**
     * @method update
     * @param t Time 
     * Updates the fish vertical position
     **/
    update(t){
        super.update(t);
        if(this.verticalVelocity > 0 && this.position[1] >= 3.0) this.verticalVelocity = 0.0;
        if(this.verticalVelocity < 0 && this.position[1] <= 1.0) this.verticalVelocity = 0.0;

        this.position[1] += this.verticalVelocity * (t-this.lastT)/1000;
    }

    /**
     * @method lift
     * Starts fish ascending movement
     **/
    lift() {
        this.verticalVelocity = 1.0;
    }
    
    /**
     * @method drop
     * Starts fish descending movement
     **/
    drop() {
        this.verticalVelocity = -1.0;
    }

    /**
     * @method turn
     * @param val Angle in radians
     * Turns fish and updates fish's fin animation accordingly
     **/
    turn(val) {
        super.turn(val);
        if(val < 0) this.object.startRightMovement();
        else this.object.startLeftMovement();
    }

    /**
     * @method turn
     * @param val Speed delta
     * Changes fish velocity and updates the tail animation accordingly
     **/
    accelerate(val){
        super.accelerate(val);
        this.object.updateTailSpeed(Math.abs(this.velocity));
    }

    /**
     * @method reset
     * @param rockSet Where the rock will be placed
     * Resets the fish to its original position 
     */
    reset(rockSet) {
        super.reset();
        this.verticalVelocity = 0.0;
        this.object.updateTailSpeed(Math.abs(this.velocity));
        if(this.hasRock){
            this.hasRock = false;
            rockSet.addRock(this.rock);
            rockSet.addRockSize(this.rockSize);
            rockSet.addRockPosition(this.rockPosition);
        }
    }

    /**
     * @method rockInteraction
     * @param rockSet - Where rocks are taken from
     * @param nest - Where rocks will be placed
     * Places or collects a rock
     */
    rockInteraction(rockSet, nest){
        if(this.position[1] <= 1.0){
            if(this.hasRock) this.placeRock(nest);
            else this.collectRock(rockSet);
        }
    }

    /**
     * @method collectRock
     * @param rockSet - Where rocks are taken from
     * Collects a rock from the rockSet if the distance condition is met
     */
    collectRock(rockSet){
        var rockPositions = rockSet.getRockPositions();
        for(var i = 0; i < rockPositions.length; i+= 3){
            if(Math.sqrt(Math.pow(this.position[0] - rockPositions[i], 2) + Math.pow(this.position[2] - rockPositions[i+2],2)) < 1.5){ //Check if rock is close enough to the fish
                this.hasRock = true;
                this.rock = rockSet.removeRock(i/3)[0];
                this.rockPosition = rockSet.removeRockPosition(i);
                this.rockSize = rockSet.removeRockSize(i);
                this.rockAppearence = rockSet.getRockAppearance();
                break;
            }
        }
    }

    /**
     * @method placeRock
     * @param nest - Where rocks will be placed
     * Places a rock in the nest if the distance condition is met
     */
    placeRock(nest){
        var r = nest.getRadius();
        var coords = nest.getCenterCoords();
        if(Math.sqrt(Math.pow(this.position[0] - coords[0], 2) + Math.pow(this.position[2] - coords[2],2)) < r){ //Check distance between rock and nest
            this.hasRock = false;
            nest.addRock(this.rock);
            nest.addRockSize(this.rockSize);
            nest.addRandomRockPosition();
        }
    }
           
    /**
     * @method display
     * Displays the moving fish
     */
    display(){
        if(this.hasRock){  //If fish is carrying a rock
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2])
            this.scene.rotate(this.angle, 0.0, 1.0, 0.0);
            this.scene.translate(-0.25, 0.0, 0.0);
            this.scene.scale(this.rockSize[0], this.rockSize[1], this.rockSize[2]);
            this.rock.display();
            this.scene.popMatrix();
        }
        super.display();
    }  
}
