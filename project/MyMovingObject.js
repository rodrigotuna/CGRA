import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene, angle, velocity, position) {
		super(scene);
		this.init();
        this.angle = angle;
        this.velocity = velocity;
        this.position = position;
        this.lastT = 0;
	}
	
	init() {
        this.initMaterials();

        this.pyramid = new MyPyramid(this.scene, 4, 2);
	}

    update(t, speedFactor){
        this.position[0] += this.velocity * Math.sin(this.angle) * (t-this.lastT)/1000 * speedFactor;
        this.position[2] += this.velocity * Math.cos(this.angle) * (t-this.lastT)/1000 * speedFactor;
        this.lastT = t;
    }

    turn(val){
        this.angle += val;
    }

    accelerate(val){
        this.velocity += val;
    }

    reset(){
        this.position = [0,0,0];
        this.velocity = 0;
        this.angle = 0;
    }

    initMaterials(){

        this.pyramidAppearance = new CGFappearance(this.scene);
        this.pyramidAppearance.setAmbient(0.8, 0.0, 0.0, 0.5);
        this.pyramidAppearance.setDiffuse(0.8, 0.0, 0.0, 0.5);
        this.pyramidAppearance.setSpecular(0.8, 0.0, 0.0, 1.0);
        this.pyramidAppearance.setShininess(10.0);

    }
    display(){

        this.pyramidAppearance.apply();
        this.scene.pushMatrix();
        
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);

        this.scene.pushMatrix();
        this.scene.translate(0,0,-1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
