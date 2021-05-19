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
	
	init() {
        this.verticalVelocity = 0.0;
        this.hasRock = false;
    }

    update(t){
        super.update(t);
        if(this.verticalVelocity > 0 && this.position[1] >= 3.0) this.verticalVelocity = 0.0;
        if(this.verticalVelocity < 0 && this.position[1] <= 1.0) this.verticalVelocity = 0.0;

        this.position[1] += this.verticalVelocity * (t-this.lastT)/1000;
    }

    lift() {
        this.verticalVelocity = 1.0;
    }
    
    drop() {
        this.verticalVelocity = -1.0;
    }

    turn(val) {
        super.turn(val);
        if(val < 0) this.object.startRightMovement();
        else this.object.startLeftMovement();
    }

    accelerate(val){
        super.accelerate(val);
        this.object.updateTailSpeed(Math.abs(this.velocity));
    }

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

    rockInteraction(rockSet, nest){
        if(this.position[1] <= 1.0){
            if(this.hasRock) this.placeRock(nest);
            else this.collectRock(rockSet);
        }
    }

    collectRock(rockSet){
        var rockPositions = rockSet.getRockPositions();
        for(var i = 0; i < rockPositions.length; i+= 3){
            if(Math.sqrt(Math.pow(this.position[0] - rockPositions[i], 2) + Math.pow(this.position[2] - rockPositions[i+2],2)) < 1.5){
                this.hasRock = true;
                this.rock = rockSet.removeRock(i/3)[0];
                this.rockPosition = rockSet.removeRockPosition(i);
                this.rockSize = rockSet.removeRockSize(i);
                this.rockAppearence = rockSet.getRockAppearance();
                break;
            }
        }
    }

    placeRock(nest){
        var r = nest.getRadius();
        var coords = nest.getCenterCoords();
        if(Math.sqrt(Math.pow(this.position[0] - coords[0], 2) + Math.pow(this.position[2] - coords[2],2)) < r){
            this.hasRock = false;
            nest.addRock(this.rock);
            nest.addRockSize(this.rockSize);
            nest.addRandomRockPosition();
        }
    }
           

    display(){
        super.display();
        if(this.hasRock){

            this.rockAppearence.apply();

            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2])
            this.scene.rotate(this.angle, 0.0, 1.0, 0.0);
            this.scene.translate(-0.25, 0.0, 0.0);
            this.scene.scale(this.rockSize[0], this.rockSize[1], this.rockSize[2]);
            this.rock.display();
            this.scene.popMatrix();
        }

    }  
}
